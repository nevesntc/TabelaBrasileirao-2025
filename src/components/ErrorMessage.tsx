import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200 my-4">
      <AlertTriangle size={32} className="text-red-500 mb-2" />
      <h3 className="text-lg font-semibold text-red-700 mb-1">Ops! Ocorreu um erro</h3>
      <p className="text-red-600">{message}</p>
      <p className="text-sm text-gray-600 mt-2">
        Por favor, tente novamente mais tarde ou verifique sua conexão com a internet.
      </p>
    </div>
  );
};

export default ErrorMessage;