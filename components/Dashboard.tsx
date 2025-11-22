import React from 'react';
import { UserProfile, AppView } from '../types';
import { ArrowRight, TrendingDown, Activity, Calendar, Scale } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onChangeView }) => {
  // Calculate BMI
  const heightInMeters = user.height / 100;
  const bmi = (user.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
  
  // Simple BMI Status logic
  const getBmiStatus = (b: number) => {
    if (b < 18.5) return { label: 'Maigreur', color: 'text-blue-500' };
    if (b < 25) return { label: 'Normal', color: 'text-green-500' };
    if (b < 30) return { label: 'Surpoids', color: 'text-orange-500' };
    return { label: 'Obésité', color: 'text-red-500' };
  };
  
  const bmiStatus = getBmiStatus(parseFloat(bmi));

  const totalLost = (user.startWeight - user.currentWeight).toFixed(1);
  const progressPercent = Math.min(100, Math.max(0, ((user.startWeight - user.currentWeight) / (user.startWeight - user.targetWeight)) * 100));

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-ikonga-text">Bonjour, {user.firstName} !</h2>
          <p className="text-gray-500 mt-1">Prête à briller aujourd'hui ? Vous êtes en phase <span className="font-semibold text-ikonga-orange">{user.currentPhase}</span>.</p>
        </div>
        <div className="text-sm bg-white px-4 py-2 rounded-full shadow-sm text-gray-600 border border-gray-100">
          Jour {user.phaseDay} du programme
        </div>
      </header>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-ikonga-orange mb-3">
                <Scale size={24} />
            </div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">Poids Actuel</span>
            <span className="text-2xl font-bold text-gray-800">{user.currentWeight} kg</span>
            <span className="text-xs text-green-500 flex items-center mt-1">
                <TrendingDown size={12} className="mr-1"/> -{totalLost} kg total
            </span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-ikonga-rose mb-3">
                <Activity size={24} />
            </div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">IMC</span>
            <span className="text-2xl font-bold text-gray-800">{bmi}</span>
            <span className={`text-xs font-medium mt-1 ${bmiStatus.color}`}>
                {bmiStatus.label}
            </span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                <Calendar size={24} />
            </div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">Objectif PISI</span>
            <span className="text-2xl font-bold text-gray-800">{user.targetWeight} kg</span>
            <span className="text-xs text-gray-400 mt-1">
                Reste {(user.currentWeight - user.targetWeight).toFixed(1)} kg
            </span>
        </div>
         
        {/* Progress Circle Mock */}
        <div className="bg-gradient-to-br from-ikonga-orange to-ikonga-rose p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
             <span className="text-white/80 text-xs uppercase tracking-wider z-10">Progression</span>
             <div className="z-10 mt-2">
                <span className="text-3xl font-bold">{Math.round(progressPercent)}%</span>
                <p className="text-xs opacity-90 mt-1">De votre objectif atteint</p>
             </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Today's Meal Preview */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer group" onClick={() => onChangeView(AppView.NUTRITION)}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-ikonga-orange transition-colors">Au menu ce midi</h3>
                    <p className="text-sm text-gray-500">Phase {user.currentPhase}</p>
                </div>
                <div className="p-2 bg-orange-50 text-ikonga-orange rounded-lg">
                    <ArrowRight size={20} />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <img src="https://picsum.photos/400/300?random=1" alt="Meal" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                    <p className="font-medium text-gray-800">Bowl Détox Avocat</p>
                    <p className="text-xs text-gray-400">350 Kcal • 15 min</p>
                </div>
            </div>
         </div>

         {/* Next Workout */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer group" onClick={() => onChangeView(AppView.FITNESS)}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-ikonga-rose transition-colors">Séance du jour</h3>
                    <p className="text-sm text-gray-500">Fitness</p>
                </div>
                <div className="p-2 bg-pink-50 text-ikonga-rose rounded-lg">
                    <ArrowRight size={20} />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                 <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <Activity />
                 </div>
                <div>
                    <p className="font-medium text-gray-800">Cardio Détox</p>
                    <p className="text-xs text-gray-400">20 min • Débutant</p>
                </div>
            </div>
         </div>

         {/* Wellness Tip */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer group" onClick={() => onChangeView(AppView.WELLNESS)}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-teal-500 transition-colors">Moment Bien-être</h3>
                    <p className="text-sm text-gray-500">Mindset</p>
                </div>
                <div className="p-2 bg-teal-50 text-teal-500 rounded-lg">
                    <ArrowRight size={20} />
                </div>
            </div>
             <div className="p-3 bg-gray-50 rounded-xl">
                <p className="italic text-gray-600 text-sm">"Le succès est la somme de petits efforts répétés jour après jour."</p>
            </div>
         </div>
      </div>
    </div>
  );
};