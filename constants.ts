import { UserProfile, Phase, WeightLog, MealPlan, Workout, WellnessItem } from './types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  firstName: 'Sophie',
  lastName: 'Martin',
  email: 'sophie@example.com',
  height: 165,
  startWeight: 78,
  currentWeight: 72.5,
  targetWeight: 62,
  subscriptionType: 'VIP',
  currentPhase: Phase.EQUILIBRE,
  phaseDay: 12,
  avatarUrl: 'https://picsum.photos/100/100'
};

export const MOCK_WEIGHT_HISTORY: WeightLog[] = [
  { date: '2023-10-01', weight: 78.0 },
  { date: '2023-10-08', weight: 76.5 },
  { date: '2023-10-15', weight: 75.2 },
  { date: '2023-10-22', weight: 74.0 },
  { date: '2023-10-29', weight: 73.1 },
  { date: '2023-11-05', weight: 72.5 },
];

export const MOCK_RECIPES = [
  {
    id: 'r1',
    title: 'Bowl Détox Avocat',
    calories: 350,
    image: 'https://picsum.photos/400/300?random=1',
    ingredients: ['1 avocat', '50g quinoa', 'Tomates cerises', 'Citron vert'],
    instructions: ['Cuire le quinoa', 'Couper les légumes', 'Assembler'],
    tags: ['Détox', 'Vegan']
  },
  {
    id: 'r2',
    title: 'Poulet Grillé et Légumes',
    calories: 450,
    image: 'https://picsum.photos/400/300?random=2',
    ingredients: ['150g blanc de poulet', 'Courgettes', 'Poivrons', 'Huile d\'olive'],
    instructions: ['Griller le poulet', 'Sauter les légumes', 'Assaisonner'],
    tags: ['Protéiné', 'Sans gluten']
  },
  {
    id: 'r3',
    title: 'Smoothie Vert Énergie',
    calories: 180,
    image: 'https://picsum.photos/400/300?random=3',
    ingredients: ['Épinards', 'Pomme verte', 'Gingembre', 'Eau de coco'],
    instructions: ['Mixer tous les ingrédients', 'Servir frais'],
    tags: ['Snack', 'Détox']
  }
];

export const MOCK_MEAL_PLAN: MealPlan[] = [
  { day: 'Lundi', breakfast: MOCK_RECIPES[2], lunch: MOCK_RECIPES[0], dinner: MOCK_RECIPES[1] },
  { day: 'Mardi', breakfast: MOCK_RECIPES[2], lunch: MOCK_RECIPES[1], dinner: MOCK_RECIPES[0] },
  { day: 'Mercredi', breakfast: MOCK_RECIPES[2], lunch: MOCK_RECIPES[0], dinner: MOCK_RECIPES[1] },
];

export const MOCK_WORKOUTS: Workout[] = [
  { id: 'w1', title: 'Cardio Détox', duration: '20 min', difficulty: 'Débutant', image: 'https://picsum.photos/400/200?random=4', completed: true },
  { id: 'w2', title: 'Renforcement Abdos', duration: '15 min', difficulty: 'Intermédiaire', image: 'https://picsum.photos/400/200?random=5', completed: false },
  { id: 'w3', title: 'HIIT Burn', duration: '30 min', difficulty: 'Avancé', image: 'https://picsum.photos/400/200?random=6', completed: false },
];

export const MOCK_WELLNESS: WellnessItem[] = [
  { id: 'wl1', title: 'Méditation du Matin', type: 'Audio', category: 'Mindset', completed: true },
  { id: 'wl2', title: 'Routine Visage Éclat', type: 'Article', category: 'Beauty', completed: false },
  { id: 'wl3', title: '5 min de Gratitude', type: 'Video', category: 'Stress', completed: false },
];