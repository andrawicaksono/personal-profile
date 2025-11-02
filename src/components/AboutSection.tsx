import { motion } from "framer-motion";
import {
  CloudIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import skills from "../data/skills.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Bio Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              About Me
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200">
              Hey there! I'm a software engineer working in the banking world,
              where I help build systems that keep things running smoothly
              behind the scenes. I love solving problems, writing clean code,
              and finding better ways to make complex systems feel simple. I'm
              passionate about building things that actually work — fast,
              reliable, and easy to maintain. Outside of coding, I'm always
              learning new tools and exploring how technology can make life a
              little smarter (and a lot more fun). Let's build something cool!
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {["Frontend", "Backend", "DevOps", "Cloud"].map((category) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  {category === "Frontend" && (
                    <CodeBracketIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 transition-colors duration-200" />
                  )}
                  {category === "Backend" && (
                    <ServerIcon className="w-6 h-6 text-purple-500 dark:text-purple-400 transition-colors duration-200" />
                  )}
                  {category === "DevOps" && (
                    <CpuChipIcon className="w-6 h-6 text-green-500 dark:text-green-400 transition-colors duration-200" />
                  )}
                  {category === "Cloud" && (
                    <CloudIcon className="w-6 h-6 text-orange-500 dark:text-orange-400 transition-colors duration-200" />
                  )}
                  <h3 className="ml-2 font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-200">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-200"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CV Download */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.a
              href="/andra-wicaksono-cv.pdf"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
