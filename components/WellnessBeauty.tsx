import React, { useState } from 'react';
import { MOCK_WELLNESS } from '../constants';
import { Heart, Sparkles, Play, BookOpen, Moon } from 'lucide-react';

export const WellnessBeauty: React.FC = () => {
    const [items, setItems] = useState(MOCK_WELLNESS);

    const toggleItem = (id: string) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Wellness Section */}
            <div>
                <h2 className="text-2xl font-bold text-ikonga-text flex items-center mb-6">
                    <Heart className="mr-3 text-teal-500" />
                    IKOWELLNESS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.filter(i => i.category !== 'Beauty').map(item => (
                        <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                             <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full transition-colors ${item.completed ? 'bg-green-100' : 'bg-gray-50'}`}>
                                 {item.completed && <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full"></div>}
                             </div>
                             
                             <div className="mb-4 w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                {item.category === 'Sleep' ? <Moon size={24}/> : <Heart size={24}/>}
                             </div>
                             
                             <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                             <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">{item.type}</p>
                             
                             <button 
                                onClick={() => toggleItem(item.id)}
                                className={`w-full py-2 rounded-lg text-sm font-medium border transition-colors ${
                                    item.completed 
                                    ? 'border-green-200 text-green-600 bg-green-50' 
                                    : 'border-gray-200 text-gray-500 hover:border-teal-500 hover:text-teal-500'
                                }`}
                             >
                                {item.completed ? 'Complété' : 'Commencer'}
                             </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Beauty Section */}
            <div>
                <h2 className="text-2xl font-bold text-ikonga-text flex items-center mb-6">
                    <Sparkles className="mr-3 text-purple-500" />
                    IKOBEAUTY
                </h2>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-2">Routine Éclat Visage</h3>
                        <p className="text-white/80 max-w-md">
                            Un guide étape par étape pour retrouver un teint lumineux après votre perte de poids. Hydratation et massage.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold shadow-md hover:bg-gray-50 transition-colors">
                        Découvrir ma routine
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                     <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4">
                        <div className="bg-purple-50 p-3 rounded-xl text-purple-500">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Conseil Cheveux</h4>
                            <p className="text-sm text-gray-500 mt-1">Comment fortifier vos cheveux pendant la phase Détox.</p>
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4">
                        <div className="bg-purple-50 p-3 rounded-xl text-purple-500">
                            <Play size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Tuto Relooking</h4>
                            <p className="text-sm text-gray-500 mt-1">Choisir les bonnes coupes pour votre nouvelle silhouette.</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};