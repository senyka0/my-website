const Skills = ({
  skills,
  theme,
}: {
  skills: string[] | undefined;
  theme: "light" | "dark";
}) => {
  return (
    <div
      id="skills"
      className={
        theme === "light"
          ? "w-full min-h-screen bg-white pt-40 pb-20"
          : "w-full min-h-screen bg-gray-900 pt-40 pb-20"
      }
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2
            className={
              theme === "light"
                ? "text-4xl md:text-6xl font-bold text-gray-900 mb-4"
                : "text-4xl md:text-6xl font-bold text-white mb-4"
            }
          >
            My Skills
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {skills?.map((item, index) => {
            return (
              <div
                key={`${item}`}
                className={
                  theme === "light"
                    ? "group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200 hover:border-blue-400"
                    : "group bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-700 hover:border-blue-500"
                }
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={
                      theme === "light"
                        ? "w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors duration-300"
                        : "w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-blue-900 group-hover:to-purple-900 transition-colors duration-300"
                    }
                  >
                    <img
                      className="w-12 h-12 md:w-14 md:h-14 object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item}/${item}-original.svg`}
                      alt={`${item} logo`}
                      onError={(e) => {
                        e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item}/${item}-plain.svg`;
                      }}
                    />
                  </div>
                  <p
                    className={
                      theme === "light"
                        ? "text-sm md:text-base font-semibold text-gray-800 capitalize group-hover:text-blue-600 transition-colors duration-300"
                        : "text-sm md:text-base font-semibold text-gray-200 capitalize group-hover:text-blue-400 transition-colors duration-300"
                    }
                  >
                    {item}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
