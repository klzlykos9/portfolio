export interface Project {
  id: number;
  title: string;
  description: string;
  goal: string;
  tech: string[];
  dataset?: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}