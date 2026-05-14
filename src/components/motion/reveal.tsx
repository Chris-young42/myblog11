"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const easeCurve = [0.22, 1, 0.36, 1] as const;

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  offsetY?: number;
  as?: "div" | "section";
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  offsetY = 20,
  as = "div",
}: MotionRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    if (as === "section") {
      return <section className={className}>{children}</section>;
    }

    return <div className={className}>{children}</div>;
  }

  if (as === "section") {
    return (
      <motion.section
        className={className}
        initial={{ opacity: 0, y: offsetY }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay, ease: easeCurve }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: easeCurve }}
    >
      {children}
    </motion.div>
  );
}

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  stagger?: number;
};

export function MotionStagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
}: MotionStaggerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    if (as === "section") {
      return <section className={className}>{children}</section>;
    }

    return <div className={className}>{children}</div>;
  }

  const commonProps = {
    className,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.2 },
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          ease: easeCurve,
        },
      },
    },
  };

  if (as === "section") {
    return <motion.section {...commonProps}>{children}</motion.section>;
  }

  return <motion.div {...commonProps}>{children}</motion.div>;
}

type MotionStaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function MotionStaggerItem({ children, className }: MotionStaggerItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: easeCurve,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
