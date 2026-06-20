export type LessonLevel = "beginner" | "intermediate" | "advanced";

export type Lesson = {
  id: string;
  level: LessonLevel;
  chapter: string;
  category: string;
  title: string;
  description: string;
  goals: string[];
  webUseCase: string;
  htmlConnection: string;
  jsReactConnection: string;
  tailwindConnection: string;
  explanation: string;
  cssExample: string;
  htmlExample?: string;
  cssFileName?: string;
  previewDescription: string;
  visualChange: string;
  codeExplanation: string[];
  commonMistakes: string[];
  practice: {
    title: string;
    task: string;
    hint: string;
    answer: string;
  };
  quiz: {
    question: string;
    choices: string[];
    answerIndex: number;
    explanation: string;
  };
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export type Chapter = {
  id: string;
  level: LessonLevel;
  title: string;
  description: string;
  lessonIds: string[];
};
