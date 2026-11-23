"use client";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Motion (eski adıyla Framer Motion, MIT lisanslı, ücretsiz).
 * LazyMotion + `m` bileşenleri ile yalnızca gereken özellikler yüklenir (küçük paket).
 * reducedMotion="user": işletim sistemindeki "hareketi azalt" tercihine uyulur.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
