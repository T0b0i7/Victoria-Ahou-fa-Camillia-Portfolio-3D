import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const Contact = () => {
  return (
    <>
      <div className="xl:mt-12 flex flex-col gap-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Email Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0, duration: 0.5 }}
            className="bg-tertiary rounded-2xl p-6 text-center hover:bg-[#915EFF] transition-colors cursor-pointer"
          >
            <a href={`mailto:${config.html.email}`} className="block">
              <p className="text-secondary text-sm mb-2">Email</p>
              <h3 className="text-white font-bold text-lg">{config.html.email}</h3>
            </a>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-tertiary rounded-2xl p-6 text-center hover:bg-[#915EFF] transition-colors cursor-pointer"
          >
            <a href={`tel:${config.contact_info.phone}`} className="block">
              <p className="text-secondary text-sm mb-2">Téléphone</p>
              <h3 className="text-white font-bold text-lg">{config.contact_info.phone}</h3>
            </a>
          </motion.div>

          {/* Location Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-tertiary rounded-2xl p-6 text-center hover:bg-[#915EFF] transition-colors"
          >
            <p className="text-secondary text-sm mb-2">Localisation</p>
            <h3 className="text-white font-bold text-lg">{config.contact_info.location}</h3>
          </motion.div>
        </div>

        {/* LinkedIn and Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="bg-black-100 rounded-2xl p-8"
          >
            <Header useMotion={false} {...config.contact} />

            <div className="mt-12 flex flex-col gap-6">
              <a
                href={`mailto:${config.html.email}?subject=Bonjour Victoria&body=`}
                className="bg-tertiary shadow-primary w-full rounded-xl px-8 py-4 font-bold text-white shadow-md outline-none hover:bg-[#915EFF] transition-colors text-center"
              >
                📧 Envoyer un Email
              </a>

              <a
                href={`tel:${config.contact_info.phone}`}
                className="bg-tertiary shadow-primary w-full rounded-xl px-8 py-4 font-bold text-white shadow-md outline-none hover:bg-[#915EFF] transition-colors text-center"
              >
                📱 Appeler
              </a>

              <a
                href={config.contact_info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A66C2] shadow-primary w-full rounded-xl px-8 py-4 font-bold text-white shadow-md outline-none hover:bg-[#084399] transition-colors text-center"
              >
                💼 Visiter LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="flex-1 rounded-2xl overflow-hidden bg-tertiary p-8"
          >
            <h3 className="text-white font-bold text-lg mb-4">Localisation</h3>
            <div className="w-full h-[350px] bg-black-100 rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63442.687871074755!2d2.354892739767922!3d6.3723009592959485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102354e509f894f7%3A0xc8fde921f89849f6!2sCotonou!5e0!3m2!1sfr!2sbj!4v1768904603033!5m2!1sfr!2sbj"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
