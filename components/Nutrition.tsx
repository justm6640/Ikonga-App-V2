import React, { useState } from 'react';
import { MOCK_MEAL_PLAN } from '../constants';
import { Recipe } from '../types';
import { Clock, Flame, ChefHat, ShoppingCart, CheckCircle } from 'lucide-react';

export const Nutrition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'shopping'>('menu');
  const [selectedDay, setSelectedDay] = useState(0);
  
  // Mock logic for shopping list generation
  const generateShoppingList = () => {
    const items = new Set<string>();
    MOCK_MEAL_PLAN.forEach(day => {
        day.breakfast.ingredients.forEach(i => items.add(i));
        day.lunch.ingredients.forEach(i => items.add(i));
        day.dinner.ingredients.forEach(i => items.add(i));
    });
    return Array.from(items).sort();
  };

  const shoppingList = generateShoppingList();
  const currentPlan = MOCK_MEAL_PLAN[selectedDay];

  const renderRecipeCard = (type: string, recipe: Recipe) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
      <div className="h-32 overflow-hidden relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700">
            {type}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-1">{recipe.title}</h4>
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center"><Clock size={12} className="mr-1"/> 20 min</span>
            <span className="flex items-center"><Flame size={12} className="mr-1"/> {recipe.calories} kcal</span>
        </div>
        <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase">Ingrédients:</p>
            <p className="text-xs text-gray-600 truncate">{recipe.ingredients.join(', ')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-ikonga-text flex items-center">
            <ChefHat className="mr-3 text-ikonga-orange" />
            IKONUTRITION
        </h2>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button 
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'menu' ? 'bg-ikonga-orange text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Mes Menus
            </button>
            <button 
                onClick={() => setActiveTab('shopping')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${activeTab === 'shopping' ? 'bg-ikonga-orange text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <ShoppingCart size={16} className="mr-2" />
                Liste de courses
            </button>
        </div>
      </div>

      {activeTab === 'menu' ? (
        <>
             {/* Day Selector */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {MOCK_MEAL_PLAN.map((plan, index) => (
                    <button
                        key={plan.day}
                        onClick={() => setSelectedDay(index)}
                        className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                            selectedDay === index 
                            ? 'bg-gray-800 text-white shadow-lg transform scale-105' 
                            : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                        }`}
                    >
                        {plan.day}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderRecipeCard('Petit-déjeuner', currentPlan.breakfast)}
                {renderRecipeCard('Déjeuner', currentPlan.lunch)}
                {renderRecipeCard('Dîner', currentPlan.dinner)}
            </div>

            {/* Detailed View of selected meal (mocked as just showing lunch details for now) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Préparation : {currentPlan.lunch.title}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-ikonga-orange mb-3">Ingrédients</h4>
                        <ul className="space-y-2">
                            {currentPlan.lunch.ingredients.map((ing, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 rounded-full bg-ikonga-orange mr-3"></div>
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-ikonga-orange mb-3">Instructions</h4>
                         <ol className="space-y-4">
                            {currentPlan.lunch.instructions.map((inst, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                    <span className="font-bold text-gray-300 mr-4">0{idx + 1}</span>
                                    {inst}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Ma liste de courses pour la semaine</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoppingList.map((item, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg group cursor-pointer hover:bg-orange-50 transition-colors">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 group-hover:border-ikonga-orange"></div>
                        <span className="text-gray-700 group-hover:text-gray-900">{item}</span>
                    </div>
                ))}
            </div>
             <div className="mt-8 flex justify-end">
                <button className="px-6 py-3 bg-ikonga-secondary text-white rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-md">
                    Télécharger PDF
                </button>
            </div>
        </div>
      )}
    </div>
  );
};