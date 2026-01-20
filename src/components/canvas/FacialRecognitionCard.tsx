import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface FacialRecognitionCardProps {
  index: number;
  name: string;
  description: string;
  tags: Array<{ name: string; color: string }>;
  image: string;
  sourceCodeLink: string;
}

const FacialRecognitionCard: React.FC<FacialRecognitionCardProps> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 230;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner l'image avec l'effet ondulant
      if (imageRef.current && imageRef.current.complete) {
        ctx.save();
        ctx.globalAlpha = 0.95;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Créer des particules fluorescentes à proximité de la souris
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - canvas.width / 2, 2) +
            Math.pow(mousePosition.y - canvas.height / 2, 2)
        );

        if (distance < 150) {
          for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            particles.push({
              x: mousePosition.x,
              y: mousePosition.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 1,
              maxLife: 1,
            });
          }
        }
      }

      // Mettre à jour et dessiner les particules
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Dessin des particules fluorescentes
        const hue = 200 + Math.sin(Date.now() * 0.005) * 60; // Bleu à cyan fluorescent
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${p.life * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();

        // Effet de traînée fluorescente
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${p.life * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
        ctx.stroke();
      }

      // Effet de glow fluorescent autour de la souris quand proche
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - canvas.width / 2, 2) +
          Math.pow(mousePosition.y - canvas.height / 2, 2)
      );

      if (distance < 150) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          80
        );
        const hue = 200 + Math.sin(Date.now() * 0.005) * 60;
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.1)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -999, y: -999 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        glareColor="#1a1a2e"
        scale={1.05}
      >
        <div className="group relative bg-tertiary w-full rounded-2xl p-5 sm:w-[300px] overflow-hidden">
          {/* Conteneur principal avec animation */}
          <div className="relative h-[230px] w-full rounded-2xl overflow-hidden">
            {/* Image cachée pour chargement */}
            <img
              ref={imageRef}
              src={image}
              alt={name}
              className="hidden"
              crossOrigin="anonymous"
            />

            {/* Canvas pour l'effet interactif */}
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="h-full w-full rounded-2xl object-cover cursor-pointer"
            />

            {/* Couche de glow au hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(100, 200, 255, 0.3) 0%, transparent 70%)",
              }}
            />

            {/* Bouton GitHub */}
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                onClick={() => window.open(sourceCodeLink, "_blank")}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:scale-110 transition-transform"
              >
                <img
                  src="/github.png"
                  alt="github"
                  className="h-1/2 w-1/2 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Infos du projet */}
          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white group-hover:text-cyan-300 transition-colors">
              {name}
            </h3>
            <p className="text-secondary mt-2 text-[14px]">{description}</p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>

          {/* Effet de bordure fluorescente */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-cyan-400/30 transition-colors" />
        </div>
      </Tilt>
    </motion.div>
  );
};

export default FacialRecognitionCard;
