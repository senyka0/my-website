const About = ({
  name,
  bio,
  theme,
}: {
  name: string | undefined;
  bio: string | undefined;
  theme: "light" | "dark";
}) => {
  return (
    <div
      id="about"
      className={
        theme === "light"
          ? "w-full h-screen bg-slate-100 pt-32 text-black"
          : "w-full h-screen bg-gray-800 pt-32 text-white"
      }
    >
      <div className="ml-10 w-3/4 md:ml-20 mt-24 md:w-2/4">
        <div className="text-2xl md:text-6xl font-bold">
          👋 Hi, my name is {name}!
        </div>
        <div className="text-xl mt-5 md:text-4xl font-bold">{bio}</div>
      </div>
    </div>
  );
};

export default About;
