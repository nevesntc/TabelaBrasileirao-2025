import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Calendar, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy size={28} className="text-yellow-400" />
            <span className="text-2xl font-bold">Serie A</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-yellow-300 transition-colors ${
                isActive('/') ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : ''
              }`}
            >
              Classificação
            </Link>
            <Link 
              to="/jogos" 
              className={`font-medium hover:text-yellow-300 transition-colors ${
                isActive('/jogos') ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : ''
              }`}
            >
              Jogos
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium py-2 hover:text-yellow-300 transition-colors ${
                isActive('/') ? 'text-yellow-300' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Trophy size={20} />
                <span>Classificação</span>
              </div>
            </Link>
            <Link 
              to="/jogos" 
              className={`font-medium py-2 hover:text-yellow-300 transition-colors ${
                isActive('/jogos') ? 'text-yellow-300' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>Jogos</span>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;