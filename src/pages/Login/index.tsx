import React, { useState } from 'react';

// Definindo os tipos para o estado do formulário
interface FormData {
  email: string;
  password: string;
}

// Componente funcional LoginScreen
const LoginScreen: React.FC = () => {
  // Gerenciamento de estado usando useState
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  // Função para atualizar os valores dos campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para manipular o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento
    
    // Exibe os valores no console
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Container Principal (Card) */}
      <div className="bg-white rounded-2xl shadow-[0px_10px_30px_10px_rgba(0,0,0,0.2)] p-8 w-full max-w-md">
        
        {/* Logo b2bit */}
        <div className="flex justify-center items-center mb-8">
          <img className="content-center align-center justify-center" src="src/assets/logo.png" alt="Logo b2bit" />
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo E-mail */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-poppins-600 text-lg font-medium text-black mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="@gmail.com"
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02274F] focus:bg-white transition-all duration-200"
              required
            />
          </div>

          {/* Campo Password */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-poppins-600 text-lg font-medium text-black mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="****************"
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02274F] focus:bg-white transition-all duration-200"
              required
            />
          </div>

          {/* Botão Sign In */}
          <button
            type="submit"
            className="w-full bg-[#02274F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a3a5c] focus:outline-none focus:ring-2 focus:ring-[#02274F] focus:ring-offset-2 transition-all duration-200 mt-8 cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;