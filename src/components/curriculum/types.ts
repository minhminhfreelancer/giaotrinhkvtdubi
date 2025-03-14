export interface WeeklySchedule {
  day: string;
  morning: string;
  morningTime: string;
  afternoon: string;
  afternoonTime: string;
  evening: string;
  eveningTime: string;
}

export interface SelfAssessment {
  category: string;
  content: string;
  score: string;
}

export interface CurriculumFormData {
  evangelismGoal: string;
  evangelismPlan: string;
  educationGoal: string;
  educationPlan: string;
  managementPlan: string;
  weeklySchedules: {
    week1: WeeklySchedule[];
    week2: WeeklySchedule[];
    week3: WeeklySchedule[];
    week4: WeeklySchedule[];
  };
  assessments: SelfAssessment[];
  truthBookReflections: {
    reflection1: string;
    reflection2: string;
    reflection3: string;
    reflection4: string;
  };
  sermonBookReflections: {
    reflection1: string;
    reflection2: string;
    reflection3: string;
    reflection4: string;
  };
}
