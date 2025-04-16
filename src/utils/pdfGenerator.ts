
import { jsPDF } from "jspdf";
import { FormData } from "@/types/form";

export const generatePDF = (data: FormData): Promise<Blob> => {
  return new Promise((resolve) => {
    const doc = new jsPDF();
    
    // Add logo
    const logoSize = 50;
    doc.addImage("/lovable-uploads/a178bb12-1895-424c-8abf-f0aa874ab98f.png", "PNG", (doc.internal.pageSize.width - logoSize) / 2, 10, logoSize, logoSize);
    
    // Add title
    doc.setFontSize(22);
    doc.setTextColor(25, 25, 112);
    doc.text("TECH_STAR ACADEMY", doc.internal.pageSize.width / 2, 75, { align: "center" });
    
    // Add subtitle
    doc.setFontSize(16);
    doc.setTextColor(70, 70, 70);
    doc.text("Formulário de Inscrição", doc.internal.pageSize.width / 2, 85, { align: "center" });
    
    // Add horizontal line
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.5);
    doc.line(20, 90, doc.internal.pageSize.width - 20, 90);
    
    // Set text formatting for content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Add form data
    const startY = 100;
    const lineHeight = 10;
    let currentY = startY;
    
    // Basic info
    doc.setFont(undefined, "bold");
    doc.text("Nome completo:", 20, currentY);
    doc.setFont(undefined, "normal");
    doc.text(data.fullName, 80, currentY);
    currentY += lineHeight;
    
    doc.setFont(undefined, "bold");
    doc.text("Idade:", 20, currentY);
    doc.setFont(undefined, "normal");
    doc.text(data.age.toString(), 80, currentY);
    currentY += lineHeight;
    
    doc.setFont(undefined, "bold");
    doc.text("WhatsApp:", 20, currentY);
    doc.setFont(undefined, "normal");
    doc.text(data.whatsapp, 80, currentY);
    currentY += lineHeight;
    
    if (data.email) {
      doc.setFont(undefined, "bold");
      doc.text("Email:", 20, currentY);
      doc.setFont(undefined, "normal");
      doc.text(data.email, 80, currentY);
      currentY += lineHeight;
    }
    
    doc.setFont(undefined, "bold");
    doc.text("Escolaridade:", 20, currentY);
    doc.setFont(undefined, "normal");
    doc.text(data.education, 80, currentY);
    currentY += lineHeight;
    
    // Knowledge level
    doc.setFont(undefined, "bold");
    doc.text("Nível de conhecimento:", 20, currentY);
    doc.setFont(undefined, "normal");
    doc.text(data.knowledgeLevel, 80, currentY);
    currentY += lineHeight;
    
    // How did they hear about us
    doc.setFont(undefined, "bold");
    doc.text("Como soube da TECH_STAR:", 20, currentY);
    doc.setFont(undefined, "normal");
    doc.text(data.referralSource, 80, currentY);
    currentY += lineHeight * 1.5;
    
    // Courses of interest
    doc.setFont(undefined, "bold");
    doc.text("Cursos de interesse:", 20, currentY);
    currentY += lineHeight;
    
    doc.setFont(undefined, "normal");
    data.coursesOfInterest.forEach(course => {
      doc.text(`• ${course}`, 25, currentY);
      currentY += lineHeight;
    });
    
    // Add registration date
    currentY += lineHeight;
    doc.setFont(undefined, "italic");
    doc.setFontSize(10);
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Formulário preenchido em: ${currentDate}`, 20, currentY);
    
    // Add footer
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("TECH_STAR ACADEMY - TECHNOLLOGY", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
    
    // Get the blob directly without using then
    const blob = doc.output("blob");
    resolve(blob);
  });
};

