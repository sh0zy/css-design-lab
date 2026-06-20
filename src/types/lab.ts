export type LabCategory =
  | "flex"
  | "grid"
  | "spacing"
  | "alignment"
  | "responsive";

export type Lab = {
  id: string;
  title: string;
  category: LabCategory;
  goal: string;
  description: string;
  cssExample: string;
  htmlExample: string;
  whereToUse: string;
  responsiveNote: string;
  commonMistakes: string[];
  practice: string;
};
