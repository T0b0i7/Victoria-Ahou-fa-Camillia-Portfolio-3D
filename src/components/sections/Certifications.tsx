import { motion } from "framer-motion";
import { certifications } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { Header } from "../atoms/Header";

interface ICertCard {
  index: number;
  name: string;
  issuer: string;
}

const CertCard: React.FC<ICertCard> = ({ index, name, issuer }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="green-pink-gradient shadow-card rounded-[20px] p-[1px] w-full"
  >
    <div className="bg-tertiary rounded-[20px] px-6 py-5 min-h-[120px] flex flex-col justify-between">
      <h3 className="text-white font-bold text-[16px]">{name}</h3>
      <p className="text-secondary text-[14px] mt-2">{issuer}</p>
    </div>
  </motion.div>
);

const Certifications = () => {
  return (
    <>
      <Header
        useMotion={true}
        p="Apprentissage Continu"
        h2="Certifications."
      />

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <CertCard key={cert.name} index={index} {...cert} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
