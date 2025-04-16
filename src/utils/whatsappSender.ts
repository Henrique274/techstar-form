
import { FormData } from "@/types/form";

export const sendToWhatsApp = (pdfBlob: Blob, data: FormData): void => {
  // Create a URL for the PDF blob
  const pdfUrl = URL.createObjectURL(pdfBlob);
  
  // Format courses as a bulleted list
  const coursesList = data.coursesOfInterest.map(course => `• ${course}`).join("\n");
  
  // Create WhatsApp message text
  const message = `*NOVA INSCRIÇÃO - TECH_STAR ACADEMY*
  
*Nome:* ${data.fullName}
*Idade:* ${data.age}
*WhatsApp:* ${data.whatsapp}
*Email:* ${data.email || "Não fornecido"}
*Escolaridade:* ${data.education}
*Nível:* ${data.knowledgeLevel}
*Fonte:* ${data.referralSource}

*Cursos de interesse:*
${coursesList}

Veja o formulário em anexo.`;
  
  // Open WhatsApp with pre-filled message (PDF needs to be downloaded and sent separately)
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/244952993627?text=${encodedMessage}`;
  
  // Open links in new tabs
  window.open(pdfUrl, "_blank"); // Open PDF for download
  window.open(whatsappUrl, "_blank"); // Open WhatsApp
};
