"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AnimatedTitle.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimatedTitle({ children, className, delay = 0, style }) {
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { y: "115%", rotation: 2 },
        {
          y: "0%",
          rotation: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`${styles.titleMask} ${className || ""}`} style={style}>
      <div ref={lineRef} className={styles.titleLine}>
        {children}
      </div>
    </div>
  );
}
