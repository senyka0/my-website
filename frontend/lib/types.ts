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
  upworkUrl?: string;
  telegramUrl?: string;
  email: string;
  bio: string;
  location: string;
  linkCV: string;
  sectionContent: {
    heroTagline: string;
    aboutTitle: string;
    aboutCardTitle: string;
    aboutExtraParagraphOne: string;
    aboutExtraParagraphTwo: string;
    skillsTitle: string;
    skillsSubtitle: string;
    projectsTitle: string;
    projectsSubtitle: string;
  };
  projects: Project[];
};

export type CVResponse = {
  cv: CV;
};
