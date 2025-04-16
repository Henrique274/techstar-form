
import { FormData } from "@/types/form";

export const sendToWhatsApp = (pdfBlob: Blob, data: FormData): void => {
  // Format courses as a bulleted list
  const coursesList = data.coursesOfInterest.map(course => `• ${course}`).join("\n");
  
  // Create WhatsApp message text
  const message = `*NOVA INSCRIÇÃO - TECH_STAR ACADEMY*
  
*Nome:* ${data.fullName}
*Idade:* ${data.age}
*WhatsApp:* ${data.whatsapp}
*Email:* ${data.email || "Não fornecido"}
*Nível:* ${data.knowledgeLevel}

*Cursos de interesse:*
${coursesList}

Veja o formulário em anexo.`;
  
  // Open WhatsApp directly with pre-filled message
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/244952993627?text=${encodedMessage}`;
  window.location.href = whatsappUrl;
};
