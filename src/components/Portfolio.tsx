import { Project } from "../models";

const Portfolio = ({
  projects,
  theme,
}: {
  projects: Project[] | undefined;
  theme: "light" | "dark";
}) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div
      id="portfolio"
      className={
        theme === "light"
          ? "w-full min-h-screen bg-slate-100 pt-40 pb-20 text-black"
          : "w-full min-h-screen bg-gray-800 pt-40 pb-20 text-white"
      }
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={
                theme === "light"
                  ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  : "bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              }
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p
                  className={
                    theme === "light"
                      ? "text-gray-600 text-sm mb-4"
                      : "text-gray-400 text-sm mb-4"
                  }
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={
                        theme === "light"
                          ? "px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          : "px-3 py-1 text-xs bg-blue-900 text-blue-200 rounded-full"
                      }
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      theme === "light"
                        ? "flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition"
                        : "flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition"
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        theme === "light"
                          ? "flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition"
                          : "flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition"
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
