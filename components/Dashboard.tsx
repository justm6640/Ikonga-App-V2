
import React from 'react';
import { UserProfile, AppView } from '../types';
import { ArrowRight, TrendingDown, Activity, Calendar, Search, Bell, Plus, Droplets } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface DashboardProps {
  user: UserProfile;
  onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onChangeView }) => {
  // Calculate BMI & Stats
  const heightInMeters = user.height / 100;
  const bmi = (user.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
  const bmiNum = parseFloat(bmi);
  
  const getBmiStatus = (b: number) => {
    if (b < 18.5) return { label: 'Maigreur', color: 'text-blue-500', bg: 'bg-blue-50' };
    if (b < 25) return { label: 'Normal', color: 'text-green-500', bg: 'bg-green-50' };
    if (b < 30) return { label: 'Surpoids', color: 'text-orange-500', bg: 'bg-orange-50' };
    return { label: 'Obésité', color: 'text-red-500', bg: 'bg-red-50' };
  };
  
  const bmiStatus = getBmiStatus(bmiNum);
  const totalLost = (user.startWeight - user.currentWeight).toFixed(1);
  const progressPercent = Math.min(100, Math.max(0, ((user.startWeight - user.currentWeight) / (user.startWeight - user.targetWeight)) * 100));

  // Mock Data for Mini Charts
  const weightTrendData = [
    { value: 78 }, { value: 77.5 }, { value: 76.8 }, { value: 75 }, { value: 74.2 }, { value: 73 }, { value: 72.5 }
  ];
  
  const activityData = [
    { day: 'L', value: 40 }, { day: 'M', value: 70 }, { day: 'M', value: 50 }, { day: 'J', value: 90 }, { day: 'V', value: 60 }, { day: 'S', value: 30 }, { day: 'D', value: 80 }
  ];

  const weekDays = [
    { day: '18', name: 'Lun', active: false },
    { day: '19', name: 'Mar', active: true },
    { day: '20', name: 'Mer', active: false },
    { day: '21', name: 'Jeu', active: false },
    { day: '22', name: 'Ven', active: false },
    { day: '23', name: 'Sam', active: false },
    { day: '24', name: 'Dim', active: false },
  ];

  // Nutrition Data
  const caloriesGoal = 1500;
  const caloriesConsumed = 764;
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (caloriesConsumed / caloriesGoal) * circumference;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Header Bar - Style "App Like" */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ikonga-text">Bonjour, {user.firstName} <span className="inline-block animate-bounce">👋</span></h1>
          <p className="text-gray-400 text-sm">Prête à transformer cette journée ?</p>
        </div>
        
        <div className="flex items-center gap-4 self-end md:self-auto w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Rechercher une recette, un conseil..." 
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-white border-none shadow-sm text-sm focus:ring-2 focus:ring-ikonga-orange outline-none"
                />
            </div>
            <button className="p-3 bg-white rounded-full shadow-sm text-gray-600 hover:text-ikonga-orange transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-ikonga-rose rounded-full border border-white"></span>
            </button>
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-ikonga-text text-white rounded-full font-bold">
                {user.firstName.charAt(0)}
            </div>
        </div>
      </header>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* 1. OBJECTIF PISI (Large Card) */}
        <div className="md:col-span-3 lg:col-span-1 bg-gradient-to-br from-ikonga-orange to-ikonga-secondary rounded-3xl p-4 md:p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[180px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="flex justify-between items-start z-10">
                <div>
                    <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="text-white/80" size={16}/>
                        <span className="text-white/90 text-xs font-medium uppercase tracking-wide">Objectif PISI</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-1">{user.targetWeight} <span className="text-lg font-normal opacity-80">kg</span></h2>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <TrendingDown size={20} className="text-white" />
                </div>
            </div>

            <div className="z-10 mt-4">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium opacity-90">Progression</span>
                    <span className="text-xl font-bold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-2 mb-4">
                    <div className="bg-white h-2 rounded-full" style={{width: `${progressPercent}%`}}></div>
                </div>
                {/* Tiny Wave Chart */}
                 <div className="h-10 w-full -mx-2 opacity-50">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightTrendData}>
                            <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} fillOpacity={0} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* 2. POIDS ACTUEL */}
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-sm font-medium">Poids Actuel</span>
                <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                    <TrendingDown size={12} className="mr-1"/> -{totalLost}
                </span>
            </div>
            <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{user.currentWeight} <span className="text-base text-gray-400 font-normal">kg</span></h3>
            </div>
            <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {activityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 6 ? '#F79A32' : '#E5E7EB'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* 3. IMC (BMI) */}
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-sm font-medium">IMC</span>
                <Activity size={18} className="text-gray-300" />
            </div>
            <div className="mb-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{bmi}</h3>
                <p className={`text-xs font-semibold mt-1 inline-block px-3 py-1 rounded-full ${bmiStatus.bg} ${bmiStatus.color}`}>
                    {bmiStatus.label}
                </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-auto">
                <div 
                    className={`h-2 rounded-full ${parseFloat(bmi) > 25 ? 'bg-orange-400' : 'bg-green-400'}`} 
                    style={{width: `${Math.min(100, (parseFloat(bmi)/40)*100)}%`}}
                ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">Zone santé</p>
        </div>

        {/* ROW 2 */}

        {/* 4. DAILY INPUTS (Quick Actions) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h3 className="font-bold text-gray-800">Raccourcis</h3>
            <button className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-orange-50 rounded-2xl group transition-colors" onClick={() => onChangeView(AppView.PROGRESS)}>
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm text-gray-400 group-hover:text-ikonga-orange">
                        <Plus size={20} />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-ikonga-orange">Nouvelle pesée</span>
                </div>
            </button>
            
            <div className="p-4 bg-blue-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl text-blue-400">
                        <Droplets size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-blue-400 font-semibold uppercase">Eau</p>
                        <p className="text-lg font-bold text-blue-600">1.2L</p>
                    </div>
                </div>
                <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600">+</button>
            </div>
        </div>

        {/* 5. NUTRITION CALENDAR (Central Piece) - REVAMPED */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-gray-800 text-lg">Nutrition</h3>
                <div className="flex space-x-2 text-xs font-medium overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
                     {weekDays.map((d, i) => (
                         <div key={i} className={`flex flex-col items-center justify-center min-w-[2.5rem] h-14 rounded-full transition-colors cursor-pointer ${d.active ? 'bg-ikonga-text text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>
                             <span className="mb-1 text-[10px]">{d.name}</span>
                             <span className="font-bold text-sm">{d.day}</span>
                         </div>
                     ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Circular Progress */}
                <div className="relative w-40 h-40 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r={circleRadius} stroke="#f3f4f6" strokeWidth="10" fill="none" />
                        <circle 
                            cx="80" 
                            cy="80" 
                            r={circleRadius} 
                            stroke="#F79A32" 
                            strokeWidth="10" 
                            fill="none" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={strokeDashoffset} 
                            strokeLinecap="round" 
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">{caloriesConsumed}</span>
                        <span className="text-xs text-gray-400 font-medium">/ {caloriesGoal} Kcal</span>
                    </div>
                </div>

                {/* Macros List with Horizontal Bars */}
                <div className="flex-1 w-full space-y-5">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 font-medium">Glucides</span>
                            <span className="font-bold text-gray-800">80g <span className="text-gray-300 font-normal">/ 174g</span></span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 rounded-full" style={{width: '46%'}}></div>
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 font-medium">Protéines</span>
                            <span className="font-bold text-gray-800">68g <span className="text-gray-300 font-normal">/ 158g</span></span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{width: '43%'}}></div>
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 font-medium">Lipides</span>
                            <span className="font-bold text-gray-800">10g <span className="text-gray-300 font-normal">/ 83g</span></span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-400 rounded-full" style={{width: '12%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => onChangeView(AppView.NUTRITION)}
                className="w-full mt-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:text-ikonga-orange transition-colors"
            >
                Voir mon menu complet
            </button>
        </div>

        {/* 6. COACH / ASSISTANT */}
        <div className="md:col-span-3 bg-gradient-to-b from-gray-50 to-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group cursor-pointer" onClick={() => onChangeView(AppView.WELLNESS)}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ikonga-orange to-ikonga-rose"></div>
            
            <div className="flex flex-col md:flex-row items-center md:space-x-6 z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ikonga-rose to-purple-500 mb-4 md:mb-0 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <span className="font-script text-xl">Ik</span>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Coach Ikonga</h3>
                    <p className="text-sm text-gray-500">
                        "L'échec n'est qu'une opportunité de recommencer plus intelligemment."
                    </p>
                </div>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between md:min-w-[200px]">
                <span className="text-xs font-semibold text-gray-600 mr-2">Besoin d'aide ?</span>
                <div className="w-8 h-8 bg-ikonga-secondary rounded-full flex items-center justify-center text-white">
                    <ArrowRight size={14} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
