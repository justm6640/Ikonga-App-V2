import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth delay
    setTimeout(() => {
        onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-ikonga-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        
        <div className="h-32 bg-gradient-to-r from-ikonga-orange to-ikonga-rose flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <h1 className="text-4xl text-white font-script drop-shadow-md">Ikonga</h1>
        </div>

        <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                {isLogin ? 'Bon retour !' : 'Rejoindre la tribu'}
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
                {isLogin ? 'Connectez-vous pour suivre votre progression.' : 'Commencez votre transformation aujourd\'hui.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Prénom</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-ikonga-orange focus:ring-1 focus:ring-ikonga-orange outline-none transition-colors" required />
                         </div>
                         <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Nom</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-ikonga-orange focus:ring-1 focus:ring-ikonga-orange outline-none transition-colors" required />
                         </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-ikonga-orange focus:ring-1 focus:ring-ikonga-orange outline-none transition-colors" placeholder="votre@email.com" required />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Mot de passe</label>
                    <input type="password" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-ikonga-orange focus:ring-1 focus:ring-ikonga-orange outline-none transition-colors" placeholder="••••••••" required />
                </div>

                {isLogin && (
                    <div className="flex justify-end">
                        <a href="#" className="text-xs text-ikonga-secondary hover:underline">Mot de passe oublié ?</a>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full py-3 bg-ikonga-orange text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-500 hover:shadow-orange-300 transform transition-all active:scale-95"
                >
                    {isLogin ? 'Se connecter' : "S'inscrire"}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="ml-2 text-ikonga-rose font-semibold hover:underline focus:outline-none"
                    >
                        {isLogin ? "Créer un compte" : "Se connecter"}
                    </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};