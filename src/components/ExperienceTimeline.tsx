import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import experienceData from "../data/experience.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Experience & Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            My professional journey and qualifications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <BriefcaseIcon className="w-6 h-6 mr-2 text-blue-500" />
              Work Experience
            </h3>
            <div className="space-y-8">
              {experienceData.experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-blue-500"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full" />
                  <div className="mb-1">
                    <h4 className="text-xl font-semibold">{exp.role}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.period}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-1 mr-2">•</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2 text-purple-500" />
              Education
            </h3>
            <div className="space-y-8">
              {experienceData.education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-purple-500"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                  <div className="mb-1">
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.institution} • {edu.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {edu.period}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-1 mr-2">•</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <CheckBadgeIcon className="w-6 h-6 mr-2 text-green-500" />
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experienceData.certifications.map((cert) => (
                <a
                  href={cert.url}
                  target="_blank"
                  key={cert.id}
                  rel="noopener noreferrer"
                >
                  <motion.div
                    key={cert.id}
                    variants={itemVariants}
                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-semibold mb-1">{cert.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cert.date}
                    </p>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
