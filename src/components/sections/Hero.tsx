"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TextType from "@/components/band/TextType";

const skills = ["C++", "Python", "React.js", "Node.js", "Supabase", "TailwindCSS"];

export default function Hero() {
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    const heroPlayed = sessionStorage.getItem("heroPlayed");

    if (heroPlayed === "true") {
      setStartAnim(true);
      return;
    }

    const delay = 3600;

    const textTimer = setTimeout(() => {
      setStartAnim(true);
    }, delay);

    const appTimer = setTimeout(() => {
      sessionStorage.setItem("heroPlayed", "true");
    }, delay + 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(appTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="px-6 md:pl-[60px] md:pr-[120px]"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", // Keeps text on the right
        position: "relative",
        // CHANGED: Removed overflow: "hidden" here
      }}
    >
      {/* HALFTONE PORTRAIT IMAGE */}
      <motion.div
        initial={false}
        animate={
          startAnim
            ? { opacity: 1, x: 0, filter: "blur(0px)" }
            : { opacity: 0, x: -60, filter: "blur(10px)" }
        }
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "0.5%",
          height: "90%",
          width: "55%",  
          zIndex: -20, // CHANGED: Pushed backward behind the grid
          pointerEvents: "none", 
        }}
        className="hidden md:block" 
      >
        <img
          src="/portrait-halftone.png" 
          alt="Himanshu Sharma"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom left",
            // CHANGED: Removed mixBlendMode because it sits cleanly behind now
          }}
        />
      </motion.div>

      {/* TEXT BLOCK */}
      <div
        className="md:max-w-[600px]"
        style={{
          width: "100%",
          position: "relative",
          zIndex: 5, // Ensures text stays on top of the image if they overlap
        }}
      >
        {/* LABEL */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 30, filter: "blur(12px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 20 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "var(--text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            ✦ Available for work
          </span>
        </motion.div>

        {/* HEADING */}
        <div>
          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 50 }
            }
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(32px, 6vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginBottom: 0,
            }}
          >
            Full-Stack
          </motion.h1>

          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, x: 0, rotate: 0 }
                : { opacity: 0, x: -80, rotate: -4 }
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(32px, 6vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "var(--text-secondary)",
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Developer
          </motion.h1>
        </div>

        {/* STATUS */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: 12 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 15,
              color: "var(--text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            <TextType
              text={["Computer Engineering Undergrad", "Optimizing algorithms", "Crafting digital experiences"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </span>
        </motion.div>

        {/* DESC */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.96 }
          }
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            marginBottom: 28,
            width: "100%",
            maxWidth: 460, 
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              letterSpacing: "0.01em",
              textWrap: "pretty",
            }}
          >
            Building robust web applications and real-time platforms with clean, efficient code. Transforming complex algorithms and modern designs into seamless digital experiences.
          </p>
        </motion.div>

        {/* SKILLS */}
        <motion.div
          initial="hidden"
          animate={startAnim ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.7,
              },
            },
          }}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.85 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "5px 12px",
                backgroundColor: "var(--bg-card)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: "var(--text-muted)",
            }}
          >
            ↓ explore my work below
          </span>

          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: "var(--text-muted)",
            }}
          >
            ↗ open to full-time & freelance opportunities
          </span>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={false}
        animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.9,
          delay: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          bottom: 38,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            y: [0, 6, 0],
            opacity: [1, 0.65, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex items-center justify-center gap-2"
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Scroll
          </span>

          <span
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1,
            }}
          >
            ↓
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}