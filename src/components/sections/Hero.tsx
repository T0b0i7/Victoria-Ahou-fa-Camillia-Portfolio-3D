import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { config } from "../../constants/config";

const Hero = () => {
  return (
    <section className={`relative mx-auto h-screen w-full flex items-center`}>
      <div
        className={`mx-auto max-w-7xl ${styles.paddingX} w-full flex flex-row items-center justify-between gap-8`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <div className="flex items-center gap-8">
            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Bonjour, je suis <span className="text-[#915EFF]">{config.hero.name}</span>
              </h1>
              <p className={`${styles.heroSubText} text-white-100 mt-2`}>
                {config.hero.p[0]} <br className="hidden sm:block" />
                {config.hero.p[1]}
              </p>
            </div>
            <img
              src={config.contact_info.profileImage}
              alt={config.hero.name}
              className="h-[300px] w-[300px] rounded-full object-cover border-4 border-[#915EFF] flex-shrink-0"
            />
          </div>
          
          <a
            href={config.contact_info.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-[#915EFF] hover:bg-[#7e4ed8] transition-colors text-white font-bold py-3 px-8 rounded-lg"
          >
            Visiter LinkedIn
          </a>
        </div>
      </div>

      <div className="xs:bottom-10 absolute bottom-10 left-1/2 transform -translate-x-1/2 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
