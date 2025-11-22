import React, { useState } from 'react';
import { MOCK_WORKOUTS } from '../constants';
import { Dumbbell, PlayCircle, CheckCircle2, Clock, BarChart } from 'lucide-react';

export const Fitness: React.FC = () => {
  const [workouts, setWorkouts] = useState(MOCK_WORKOUTS);

  const toggleWorkout = (id: string) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-ikonga-text flex items-center">
                <Dumbbell className="mr-3 text-ikonga-rose" />
                IKOFITNESS
            </h2>
            <span className="text-sm bg-pink-50 text-ikonga-rose px-3 py-1 rounded-full font-medium">
                Semaine 2 - Phase Équilibre
            </span>
        </div>

        <div className="grid gap-6">
            {workouts.map((workout) => (
                <div key={workout.id} className={`bg-white rounded-2xl p-4 md:p-6 shadow-sm border transition-all duration-300 ${workout.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-100 hover:shadow-md'}`}>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={workout.image} alt={workout.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <PlayCircle size={40} className="text-white opacity-80" />
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{workout.title}</h3>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center"><Clock size={14} className="mr-1"/> {workout.duration}</span>
                                <span className="flex items-center"><BarChart size={14} className="mr-1"/> {workout.difficulty}</span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                Une séance conçue pour brûler les graisses et tonifier le corps. Aucun matériel nécessaire. Prête à transpirer ?
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center pl-0 md:pl-6 md:border-l border-gray-100">
                             <button 
                                onClick={() => toggleWorkout(workout.id)}
                                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all transform active:scale-95 ${
                                    workout.completed 
                                    ? 'bg-green-500 text-white shadow-green-200 shadow-lg' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-ikonga-rose hover:text-white'
                                }`}
                             >
                                {workout.completed ? (
                                    <>
                                        <CheckCircle2 className="mr-2" />
                                        Terminé !
                                    </>
                                ) : (
                                    'Marquer fait'
                                )}
                             </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};