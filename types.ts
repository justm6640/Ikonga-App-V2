export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  NUTRITION = 'NUTRITION',
  FITNESS = 'FITNESS',
  WELLNESS = 'WELLNESS',
  PROGRESS = 'PROGRESS',
  ADMIN = 'ADMIN'
}

export enum Phase {
  DETOX = 'Détox',
  EQUILIBRE = 'Équilibre',
  CONSOLIDATION = 'Consolidation',
  ENTRETIEN = 'Entretien'
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  height: number; // cm
  startWeight: number; // kg
  currentWeight: number; // kg
  targetWeight: number; // PISI
  subscriptionType: 'Standard' | 'VIP' | 'VIP++';
  currentPhase: Phase;
  phaseDay: number;
  avatarUrl?: string;
}

export interface WeightLog {
  date: string;
  weight: number;
}

export interface Recipe {
  id: string;
  title: string;
  calories: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export interface MealPlan {
  day: string;
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  snack?: Recipe;
}

export interface Workout {
  id: string;
  title: string;
  duration: string; // e.g., "20 min"
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  image: string;
  completed: boolean;
}

export interface WellnessItem {
  id: string;
  title: string;
  type: 'Audio' | 'Video' | 'Article';
  category: 'Sleep' | 'Stress' | 'Beauty' | 'Mindset';
  completed: boolean;
}