import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SolarSystem, 
  MorphingProfile, 
  NeuralNetwork, 
  QuantumTimeline, 
  LivingEcosystem 
} from '../canvas';
import { projects, experiences, skills } from '../../constants';
import { config } from '../../constants/config';
import { fadeIn } from '../../utils/motion';

const UltraInnovativeShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const animations = [
    {
      title: "Système Solaire de Projets",
      description: "Vos projets orbitent autour de votre univers personnel",
      component: (
        <SolarSystem
          onProjectSelect={setSelectedProject}
          selectedProject={selectedProject}
        />
      )
    },
    {
      title: "Morphing 3D Interactif",
      description: "Votre profil qui se transforme en objets technologiques",
      component: (
        <MorphingProfile
          profileImage={config.contact_info.profileImage}
        />
      )
    },
    {
      title: "Réseau Neuronal Visuel",
      description: "Un cerveau 3D connecté à vos compétences",
      component: (
        <NeuralNetwork
          skills={skills}
          onSkillSelect={setActiveSkill}
          activeSkill={activeSkill}
        />
      )
    },
    {
      title: "Timeline Quantique",
      description: "Votre expérience dans une ligne temporelle 4D",
      component: (
        <QuantumTimeline
          experiences={experiences}
          onExperienceSelect={setSelectedExperience}
          selectedExperience={selectedExperience}
        />
      )
    },
    {
      title: "Écosystème de Particules",
      description: "Univers intelligent qui réagit à vos interactions",
      component: (
        <LivingEcosystem
          projects={projects}
          skills={skills}
        />
      )
    }
  ];

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  const prevAnimation = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  return (
    <section className="relative w-full min-h-screen mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="text-center mb-8"
        >
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Portfolio Ultra-Innovant
          </h2>
          <p className="text-secondary text-[17px] max-w-3xl mx-auto mt-4">
            Découvrez des animations 3D jamais vues qui transforment votre portfolio en une expérience immersive
          </p>
        </motion.div>

        {/* Contrôles de navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={prevAnimation}
            className="bg-tertiary px-6 py-3 rounded-lg text-white hover:bg-[#915EFF] transition-colors"
          >
            ← Précédent
          </button>
          <div className="text-white font-medium">
            {animations[currentAnimation].title}
          </div>
          <button
            onClick={nextAnimation}
            className="bg-tertiary px-6 py-3 rounded-lg text-white hover:bg-[#915EFF] transition-colors"
          >
            Suivant →
          </button>
        </div>

        {/* Animation actuelle */}
        <motion.div
          key={currentAnimation}
          variants={fadeIn("up", "spring", 0.3, 0.75)}
          className="w-full h-[600px] bg-tertiary rounded-2xl overflow-hidden relative"
        >
          {animations[currentAnimation].component}
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className="text-center mt-6"
        >
          <p className="text-secondary text-[16px]">
            {animations[currentAnimation].description}
          </p>
        </motion.div>

        {/* Sélecteurs d'animation */}
        <div className="flex justify-center gap-2 mt-8">
          {animations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAnimation(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentAnimation ? 'bg-[#915EFF]' : 'bg-tertiary'
              }`}
            />
          ))}
        </div>

        {/* Informations contextuelles */}
        {selectedProject && (
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 0.75)}
            className="mt-8 p-6 bg-tertiary rounded-2xl"
          >
            <h3 className="text-white text-[24px] font-bold mb-2">
              {selectedProject.name}
            </h3>
            <p className="text-secondary text-[14px]">
              {selectedProject.description}
            </p>
          </motion.div>
        )}

        {selectedExperience && (
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 0.75)}
            className="mt-8 p-6 bg-tertiary rounded-2xl"
          >
            <h3 className="text-white text-[24px] font-bold mb-2">
              {selectedExperience.title}
            </h3>
            <p className="text-secondary text-[14px]">
              {selectedExperience.companyName} • {selectedExperience.date}
            </p>
          </motion.div>
        )}

        {activeSkill && (
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 0.75)}
            className="mt-8 p-6 bg-tertiary rounded-2xl text-center"
          >
            <h3 className="text-white text-[24px] font-bold">
              Compétence Activée: {activeSkill}
            </h3>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UltraInnovativeShowcase;
