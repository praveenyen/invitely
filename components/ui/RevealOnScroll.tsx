"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
