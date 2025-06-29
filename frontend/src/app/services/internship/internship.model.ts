export interface Internship {
  id: number;
  intern_title: string;
  company: string;
  // Because backend will return as strings
  start_date: string;
  end_date: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: number;
  details: string;
}
