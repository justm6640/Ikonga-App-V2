import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_WEIGHT_HISTORY, MOCK_USER } from '../constants';
import { LineChart as LineChartIcon, Plus, AlertCircle, Target } from 'lucide-react';

export const Progress: React.FC = () => {
  const [history, setHistory] = useState(MOCK_WEIGHT_HISTORY);
  const [newWeight, setNewWeight] = useState('');

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    
    const weight = parseFloat(newWeight);
    const today = new Date().toISOString().split('T')[0];
    
    setHistory(prev => [...prev, { date: today, weight }]);
    setNewWeight('');
  };

  const currentWeight = history[history.length - 1].weight;
  const startWeight = history[0].weight;
  const targetWeight = MOCK_USER.targetWeight;
  
  const diff = (startWeight - currentWeight).toFixed(1);
  const totalToLose = startWeight - targetWeight;
  const lostSoFar = startWeight - currentWeight;
  const percentage = totalToLose > 0 ? Math.min(100, Math.max(0, (lostSoFar / totalToLose) * 100)) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-ikonga-text flex items-center">
                <LineChartIcon className="mr-3 text-blue-500" />
                MON SUIVI
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Évolution du poids</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={history}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F79A32" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#F79A32" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                            <Tooltip 
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                            />
                            <Area type="monotone" dataKey="weight" stroke="#F79A32" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Nouvelle pesée</h3>
                    <form onSubmit={handleAddWeight} className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Poids (kg)</label>
                            <input 
                                type="number" 
                                step="0.1"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                placeholder="Ex: 72.5"
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-ikonga-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-3 bg-ikonga-orange text-white font-bold rounded-xl shadow-md hover:bg-orange-500 transition-colors flex justify-center items-center"
                        >
                            <Plus size={20} className="mr-2" />
                            Enregistrer
                        </button>
                    </form>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                        <div>
                            <h4 className="font-bold text-blue-800">Bravo Sophie !</h4>
                            <p className="text-sm text-blue-600 mt-1">
                                Vous avez perdu <span className="font-bold">{diff} kg</span> depuis le début. Votre courbe est régulière. Continuez comme ça, vous êtes sur la bonne voie pour atteindre votre PISI !
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                <span className="text-gray-500">Poids de départ</span>
                <span className="font-bold text-gray-800">{startWeight} kg</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                <span className="text-gray-500">PISI (Objectif)</span>
                <span className="font-bold text-ikonga-orange">{targetWeight} kg</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                <span className="text-gray-500">Perte Totale</span>
                <span className="font-bold text-green-500">-{diff} kg</span>
            </div>
        </div>

        {/* Progress Bar Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-ikonga-orange mr-3">
                        <Target size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Progression vers PISI</h3>
                        <p className="text-xs text-gray-500">Objectif : {targetWeight} kg</p>
                    </div>
                 </div>
                 <span className="text-2xl font-bold text-ikonga-orange">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 mb-2 overflow-hidden">
                 <div 
                    className="bg-gradient-to-r from-ikonga-orange to-ikonga-rose h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${percentage}%` }}
                 >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                 </div>
            </div>
             <div className="flex justify-between text-xs font-medium text-gray-400">
                <span>{startWeight} kg</span>
                <span>Reste à perdre : {(currentWeight - targetWeight).toFixed(1)} kg</span>
                <span>{targetWeight} kg</span>
            </div>
        </div>
    </div>
  );
};