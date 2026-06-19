"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type TeamCardProps = {
  member: {
    name: string;
    qualification: string;
    role: string;
    image: string;
    hoverImage: string;
  };
  index: number;
};

export function TeamCard({ member, index }: TeamCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group flex h-full overflow-hidden border border-line bg-paper focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-4"
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={0}
      aria-label={`${member.name}. Passa con il mouse o usa il focus per vedere la foto A-ROSE.`}
      onFocus={() => setIsRevealed(true)}
      onBlur={() => setIsRevealed(false)}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsRevealed(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsRevealed(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") setIsRevealed((current) => !current);
      }}
    >
      <div className="flex w-full flex-col">
        <div className="relative aspect-square overflow-hidden bg-[#eadbd3]">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isRevealed && !reducedMotion ? 1.035 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              className="object-cover object-[center_18%]"
              src={member.image}
              alt={`Ritratto professionale di ${member.name}`}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{
              clipPath: isRevealed ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
            }}
            initial={false}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Image
              className="object-cover object-center"
              src={member.hoverImage}
              alt={`${member.name} con la maglietta A-ROSE`}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
            animate={{ x: isRevealed && !reducedMotion ? "500%" : "0%", opacity: isRevealed ? 1 : 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <span className="absolute bottom-4 left-4 rounded-full bg-wine/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
            Il lato A-ROSE
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 font-serif text-[22px] font-normal leading-tight">{member.name}</h3>
          <p className="m-0 text-xs font-semibold leading-relaxed text-ink">
            {member.qualification}
          </p>
          <p className="mt-auto border-t border-rose-soft pt-5 text-[11px] font-bold leading-normal text-rose">
            {member.role}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
