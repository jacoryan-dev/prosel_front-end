import React from "react";
import { useAuth } from "../auth/useAuth";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Carregando dados do usuário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header com botão de Logout */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end py-4">
            <button
              onClick={logout}
              className="bg-[#02274F] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1a3a5c] transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center py-12 px-4 bg-slate-100">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          {/* Profile Picture Section */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-4">Profile picture</p>
            <div className="flex justify-center">
              <img
                src={user.avatar?.medium ?? "public/assets/profile-img.png"}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200"
              />
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800">
                {user.name}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your E-mail
              </label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800">
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
