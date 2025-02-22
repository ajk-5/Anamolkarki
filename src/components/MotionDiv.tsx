"use client";

import { motion } from "framer-motion";
import { MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

// Typage pour combiner les props de motion et HTML
type MotionDivProps = Omit<MotionProps, 'children'> & HTMLAttributes<HTMLDivElement>;

export const MotionDiv = ({ children, className, ...props }: MotionDivProps) => {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
};