import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <main className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Sohazur Islam</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4 max-w-xs"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        <span className="block">Entrepreneur &amp; AI engineer.</span>
        <span className="mt-1 block">
          Co-founder &amp; CEO of{" "}
          <a
            className="underline decoration-indigo-600 decoration-2 underline-offset-4"
            href="https://www.reachllm.com/"
            target="_blank"
            rel="noreferrer"
          >
            ReachLLM
          </a>
          .<br /> Co-founder of{" "}
          <a
            className="underline decoration-indigo-600 decoration-2 underline-offset-4"
            href="https://tryfoyer.ai/"
            target="_blank"
            rel="noreferrer"
          >
            Foyer
          </a>
          .
        </span>
      </motion.p>
      <motion.button
        type="button"
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "AI Search / GEO",
    level: 90,
  },
  {
    title: "Product & AI Engineering",
    level: 90,
  },
  {
    title: "AI Agents",
    level: 85,
  },
  {
    title: "Growth Systems",
    level: 85,
  },
  {
    title: "Web Development",
    level: 90,
  },
];

const focusAreas = [
  {
    title: "Entrepreneurship & Product",
    level: 90,
  },
  {
    title: "Scalable AI Systems",
    level: 85,
  },
  {
    title: "Open-source Prototyping",
    level: 80,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={skill.title}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
            Interests
          </h2>
          <div className="mt-8 space-y-4">
            {focusAreas.map((lng, index) => (
              <div className="w-full md:w-64" key={lng.title}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          type="button"
          aria-label="Show previous project"
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
        <button
          type="button"
          aria-label="Show next project"
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const profileLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/sohazur/" },
  { label: "GitHub", url: "https://github.com/sohazur" },
  { label: "X", url: "https://x.com/islam_sohazur" },
  { label: "Instagram", url: "https://www.instagram.com/sohazurislam/" },
  { label: "Product Hunt", url: "https://www.producthunt.com/@sohazur" },
];

const ContactSection = () => {
  const [state, handleSubmit] = useForm("mayzgjbd");
  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
      <p className="mt-3 text-gray-700 max-w-md">
        Building in San Francisco and Dubai. Reach out about AI search,
        product, partnerships, or founder collaborations.
      </p>
      <nav
        className="mt-3 flex max-w-md flex-wrap gap-x-4 gap-y-2"
        aria-label="Sohazur Islam's profiles"
      >
        {profileLinks.map((profile) => (
          <a
            className="font-semibold text-indigo-700 underline underline-offset-4"
            href={profile.url}
            key={profile.label}
            target="_blank"
            rel="me noreferrer"
          >
            {profile.label}
          </a>
        ))}
      </nav>
      <div className="mt-4 p-5 md:p-6 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-4"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label
              htmlFor="message"
              className="font-medium text-gray-900 block mb-1 mt-4"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="h-24 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-bold text-lg mt-5 disabled:cursor-wait disabled:opacity-60"
            >
              {state.submitting ? "Sending…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
