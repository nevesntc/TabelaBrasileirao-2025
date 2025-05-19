import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Serie A</h3>
            <p className="text-gray-300 text-sm">
              Acompanhe a tabela, resultados e calendário do Campeonato Brasileiro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;