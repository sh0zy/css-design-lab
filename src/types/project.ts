export type Project = {
  id: string;
  title: string;
  category: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  description: string;
  goal: string;
  requiredKnowledge: string[];
  uiDescription: string;
  cssProperties: string[];
  steps: string[];
  bonus: string[];
  htmlExample: string;
  cssExample: string;
  cssFileName?: string;
  reactConnection: string;
  tailwindConnection: string;
};
