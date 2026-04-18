"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TextReveal.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextReveal({ text, className }) {
  const containerRef = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = containerRef.current.querySelectorAll("span");
      gsap.fromTo(
        spans,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={containerRef} className={`${styles.revealText} ${className || ""}`}>
      {words.map((word, i) => (
        <span key={i} className={styles.word}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
