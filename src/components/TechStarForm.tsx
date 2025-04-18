import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { FormData } from "@/types/form";
import { generatePDF } from "@/utils/pdfGenerator";
import { sendToWhatsApp } from "@/utils/whatsappSender";

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  age: z.coerce.number().int().positive().min(5, { message: "Idade deve ser pelo menos 5 anos" }),
  whatsapp: z.string().regex(/^9\d{2}\s?\d{3}\s?\d{3}$/, { 
    message: "Formato inválido. Use: 9xx xxx xxx" 
  }),
  email: z.string().email({ message: "Email inválido" }).optional().or(z.literal("")),
  coursesOfInterest: z.array(z.string()).min(1, { message: "Selecione pelo menos um curso" }),
  otherCourse: z.string().optional(),
  knowledgeLevel: z.enum(["Iniciante", "Intermédio", "Avançado"], {
    required_error: "Selecione o nível de conhecimento",
  }),
});

const courses = [
  { id: "design", label: "Design Gráfico" },
  { id: "logic", label: "Lógica de Programação" },
  { id: "ai", label: "Inteligência Artificial" },
  { id: "programming", label: "Programação Iniciante" },
  { id: "computer", label: "Curso de Informática" },
  { id: "electronics", label: "Eletrônica Básica" },
  { id: "other", label: "Outro" },
];

const TechStarForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherCourse, setShowOtherCourse] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: undefined,
      whatsapp: "",
      email: "",
      coursesOfInterest: [],
      otherCourse: "",
      knowledgeLevel: undefined,
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const formData: FormData = {
        fullName: values.fullName,
        age: values.age,
        whatsapp: values.whatsapp,
        email: values.email || "",
        coursesOfInterest: values.coursesOfInterest.map(courseId => {
          if (courseId === "other") {
            return values.otherCourse || "Outro curso não especificado";
          }
          return courses.find(c => c.id === courseId)?.label || courseId;
        }),
        knowledgeLevel: values.knowledgeLevel,
      };
      
      const pdfBlob = await generatePDF(formData);
      
      sendToWhatsApp(pdfBlob, formData);
      
      toast({
        title: "Inscrição Enviada!",
        description: "Obrigado pela inscrição! A tua ficha foi enviada e em breve receberás o nosso contacto.",
        className: "bg-techstar-blue/20 border border-techstar-blue/30",
      });
      
      form.reset();
      setShowOtherCourse(false);
      
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao processar a inscrição. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCoursesChange = (checked: boolean, value: string) => {
    const currentValues = form.getValues("coursesOfInterest");
    
    if (checked) {
      form.setValue("coursesOfInterest", [...currentValues, value]);
      if (value === "other") {
        setShowOtherCourse(true);
      }
    } else {
      form.setValue("coursesOfInterest", currentValues.filter(v => v !== value));
      if (value === "other") {
        setShowOtherCourse(false);
        form.setValue("otherCourse", "");
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 rounded-lg bg-techstar-darker/80 backdrop-blur-sm neon-border animate-pulse-glow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nome completo*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite seu nome completo" 
                    className="tech-input" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Idade*</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Digite sua idade" 
                    className="tech-input" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Número do WhatsApp* (9xx xxx xxx)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="9xx xxx xxx" 
                    className="tech-input" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Digite seu email (opcional)" 
                    className="tech-input" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="coursesOfInterest"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel className="text-white">Curso(s) de interesse*</FormLabel>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <FormItem
                      key={course.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={form.getValues("coursesOfInterest").includes(course.id)}
                          onCheckedChange={(checked) => 
                            handleCoursesChange(checked as boolean, course.id)
                          }
                          className="data-[state=checked]:bg-techstar-blue data-[state=checked]:border-techstar-blue"
                        />
                      </FormControl>
                      <FormLabel className="text-white font-normal">
                        {course.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
                {showOtherCourse && (
                  <FormField
                    control={form.control}
                    name="otherCourse"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormControl>
                          <Input 
                            placeholder="Especifique outro curso" 
                            className="tech-input" 
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="knowledgeLevel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-white">Nível de conhecimento*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem 
                          value="Iniciante" 
                          className="text-techstar-blue border-techstar-blue/70"
                        />
                      </FormControl>
                      <FormLabel className="text-white font-normal">
                        Iniciante
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem 
                          value="Intermédio" 
                          className="text-techstar-blue border-techstar-blue/70"
                        />
                      </FormControl>
                      <FormLabel className="text-white font-normal">
                        Intermédio
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem 
                          value="Avançado" 
                          className="text-techstar-blue border-techstar-blue/70"
                        />
                      </FormControl>
                      <FormLabel className="text-white font-normal">
                        Avançado
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-techstar-blue hover:bg-techstar-blue/80 text-white font-semibold py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Enviar Inscrição"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TechStarForm;
