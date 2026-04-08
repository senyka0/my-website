export type Project = {
  name: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  liveUrl?: string;
};

export type CV = {
  photoUrl: string;
  name: string;
  surname: string;
  birthDate: string;
  position: string;
  skills: string[];
  gitHubUrl: string;
  linkedInUrl: string;
  email: string;
  bio: string;
  location: string;
  linkCV: string;
  projects: Project[];
};

export type CVResponse = {
  cv: CV;
};
