import { motion } from "framer-motion";
import { skills } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { Header } from "../atoms/Header";

interface ISkillCategory {
  category: string;
  skills: string[];
  color: string;
  index: number;
}

const SkillCard: React.FC<ISkillCategory> = ({ category, skills: skillList, color, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="w-full"
  >
    <div
      className="bg-tertiary rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <h3 className="text-white font-bold text-xl mb-4" style={{ color }}>
        {category}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {skillList.map((skill, idx) => (
          <motion.span
            key={`${category}-skill-${idx}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-black-100 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#915EFF] transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  return (
    <>
      <Header
        useMotion={true}
        p="Mon Expertise"
        h2="Compétences."
      />

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillCategory, index) => (
          <SkillCard
            key={skillCategory.category}
            category={skillCategory.category}
            skills={skillCategory.skills}
            color={skillCategory.color}
            index={index}
          />
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 1)}
        className="mt-12 bg-tertiary rounded-2xl p-8"
      >
        <p className="text-white-100 text-center text-lg leading-relaxed">
          Je maîtrise une large gamme de technologies et méthodologies, avec une expertise particulière 
          en développement Full-stack, intelligence artificielle et systèmes cybersécurisés. Toujours en 
          apprentissage continu pour rester à jour avec les dernières tendances technologiques.
        </p>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Skills, "skills");
