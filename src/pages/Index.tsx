
import React from "react";
import TechStarForm from "@/components/TechStarForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4 bg-tech-gradient circuit-bg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-4 relative">
          <img 
            src="/lovable-uploads/a178bb12-1895-424c-8abf-f0aa874ab98f.png" 
            alt="TECH_STAR Academy" 
            className="w-full h-full object-contain animate-pulse-glow"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 neon-text">TECH_STAR ACADEMY</h1>
        <p className="text-gray-300 text-lg">Formulário de Inscrição</p>
        <div className="w-32 h-1 bg-gradient-to-r from-techstar-blue/20 via-techstar-blue to-techstar-blue/20 mx-auto my-4 rounded-full"></div>
      </div>
      
      {/* Circuit lines decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-techstar-blue/20 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-r-2 border-t-2 border-techstar-blue/20 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 border-l-2 border-b-2 border-techstar-blue/20 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-techstar-blue/20 rounded-br-3xl"></div>
      </div>
      
      {/* Form Container */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <TechStarForm />
      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>© 2025 TECH_STAR Academy. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
