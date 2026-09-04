"use client";

import { useTranslations } from '@/i18n/translation-client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

/* ──────────────────────────────────────────
   Capsula Dynamics Pillar Config
   Cathode Aqua (#2FD9E3), Deep Aqua (#0B6E77), Hazard Orange (#FF6B1A), Deep Orange (#B44405)
   ────────────────────────────────────────── */
const PILLAR_CONFIG = [
  { id: 1, color: '#2FD9E3', glowColor: 'rgba(47,217,227,0.25)', levelColor: 'rgba(47,217,227,0.15)', borderColor: 'rgba(47,217,227,0.4)' },
  { id: 2, color: '#0B6E77', glowColor: 'rgba(11,110,119,0.25)', levelColor: 'rgba(11,110,119,0.15)', borderColor: 'rgba(11,110,119,0.4)' },
  { id: 3, color: '#FF6B1A', glowColor: 'rgba(255,107,26,0.25)', levelColor: 'rgba(255,107,26,0.15)', borderColor: 'rgba(255,107,26,0.4)' },
  { id: 4, color: '#B44405', glowColor: 'rgba(180,68,5,0.25)', levelColor: 'rgba(180,68,5,0.15)', borderColor: 'rgba(180,68,5,0.4)' },
];

/* ──────────────────────────────────────────
   Perfect Symmetrical Infinity Symbol (∞)
   ViewBox: 800 × 360 | Center: (400, 180)
   ────────────────────────────────────────── */
const INFINITY_PATH =
  "M 400 180 C 475 90, 640 90, 640 180 C 640 270, 475 270, 400 180 C 325 90, 160 90, 160 180 C 160 270, 325 270, 400 180 Z";

const SEGMENT_LENGTH = 0.12;
const GAP_LENGTH = 1 - SEGMENT_LENGTH;

/* ──────────────────────────────────────────
   Pillar Tag — HTML element over the SVG
   ────────────────────────────────────────── */
function PillarTag({ index, label, level, config, isActive, onClick }: {
  index: number;
  label: string;
  level: string;
  config: typeof PILLAR_CONFIG[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const positions = [
    "left-[16%] sm:left-[22%] top-[4%] sm:top-[6%] -translate-x-1/2",
    "right-[16%] sm:right-[22%] top-[4%] sm:top-[6%] translate-x-1/2",
    "right-[16%] sm:right-[22%] bottom-[4%] sm:bottom-[6%] translate-x-1/2",
    "left-[16%] sm:left-[22%] bottom-[4%] sm:bottom-[6%] -translate-x-1/2",
  ];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`absolute z-10 w-fit max-w-[48%] cursor-pointer border backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 text-center font-mono text-[9px] sm:text-[11px] md:text-xs rounded-[var(--radius-capsule)] transition-all ${positions[index]}`}
      style={{
        borderColor: isActive ? config.color : "var(--border)",
        backgroundColor: isActive ? "var(--surface-2)" : "var(--surface)",
        boxShadow: isActive ? `0 0 25px ${config.glowColor}` : "var(--shadow)",
      }}
      animate={{ scale: isActive ? 1.06 : 1 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.08 }}
    >
      <span
        className="block uppercase tracking-[0.2em] text-[8px] sm:text-[9px] font-bold"
        style={{ color: config.color }}
      >
        {level}
      </span>
      <span className="block text-[var(--text)] font-bold mt-0.5 whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );
}

/* ──────────────────────────────────────────
   Phase Item
   ────────────────────────────────────────── */
function PhaseItem({ name, desc, color, index }: {
  name: string;
  desc: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.12 + index * 0.08 }}
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold mt-0.5"
        style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
      >
        {index + 1}
      </div>
      <div>
        <p className="text-[var(--text)] text-sm font-semibold font-mono leading-tight">{name}</p>
        <p className="text-[var(--text-muted)] text-xs leading-relaxed mt-0.5">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Pillar Card — content for the rolodex
   ────────────────────────────────────────── */
function PillarCard({ pillarIndex, t, config, isActive }: {
  pillarIndex: number;
  t: (key: string) => string;
  config: typeof PILLAR_CONFIG[0];
  isActive: boolean;
}) {
  const p = `pillar${pillarIndex}`;

  return (
    <div
      className="capsule-card relative select-none"
      style={{
        borderColor: isActive ? config.borderColor : "var(--border)",
        boxShadow: isActive ? `0 4px 40px ${config.glowColor}` : "var(--shadow)",
      }}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
      />

      <div className="cap-head">
        <span className="dot" style={{ background: config.color, boxShadow: `0 0 0 4px ${config.color}33` }} />
        <h4>{t(`${p}Title`)}</h4>
        <span className="id">0{pillarIndex}</span>
      </div>

      <div className="cap-body">
        <span
          className="badge b-on"
          style={{
            color: config.color,
            borderColor: config.color,
            background: config.levelColor,
          }}
        >
          {t(`${p}Level`)}
        </span>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          {t(`${p}Subtitle`)}
        </p>
        <p className="text-[var(--text-faint)] text-xs mt-2">
          {t(`${p}Description`)}
        </p>

        {/* Phases — only rendered for the active card */}
        {isActive && (
          <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-4">
            {[1, 2, 3, 4].map((phase) => (
              <PhaseItem
                key={`${pillarIndex}-${phase}`}
                name={t(`${p}Phase${phase}`)}
                desc={t(`${p}Phase${phase}Desc`)}
                color={config.color}
                index={phase - 1}
              />
            ))}
          </div>
        )}
      </div>

      <div className="cap-foot">
        <span className="label">PILLAR ID: 0{pillarIndex}</span>
        <span className="ml-auto font-mono text-xs" style={{ color: config.color }}>[ACTIVE SPEC]</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   Rolodex Stack
   ────────────────────────────────────────── */
function RolodexStack({ activeIndex, t, onCardClick }: {
  activeIndex: number;
  t: (key: string) => string;
  onCardClick: () => void;
}) {
  const [containerHeight, setContainerHeight] = useState(420);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = cardRefs.current[activeIndex];
    if (!el) return;

    const measure = () => setContainerHeight(el.offsetHeight + 48);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeIndex]);

  function stackPosition(cardIndex: number): number {
    return (cardIndex - activeIndex + 4) % 4;
  }

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      animate={{ height: containerHeight }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {PILLAR_CONFIG.map((config, i) => {
        const pos = stackPosition(i);
        return (
          <motion.div
            key={config.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute inset-x-0 top-0"
            animate={{
              y: pos * 14,
              scale: 1 - pos * 0.03,
              opacity: pos === 0 ? 1 : Math.max(0.08, 0.7 - pos * 0.25),
              zIndex: 10 - pos,
              filter: pos === 0 ? "blur(0px)" : `blur(${pos * 0.5}px)`,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: pos === 0 ? "auto" : "none" }}
            onClick={pos === 0 ? onCardClick : undefined}
          >
            <PillarCard
              pillarIndex={config.id}
              t={t}
              config={config}
              isActive={pos === 0}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Main Services Component
   ────────────────────────────────────────── */
export default function Services() {
  const tFramework = useTranslations('framework');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll-trigger entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle every 6 s, paused on interaction
  useEffect(() => {
    if (!isInView || isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(id);
  }, [isInView, isPaused]);

  const selectPillar = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), 12000);
  }, []);

  const advancePillar = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 4);
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), 12000);
  }, []);

  useEffect(() => {
    return () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, []);

  const pillarLabels = [1, 2, 3, 4].map((i) => tFramework(`pillar${i}Title`));
  const levelLabels = [1, 2, 3, 4].map((i) => tFramework(`pillar${i}Level`));

  return (
    <section ref={sectionRef} id="services" className="w-full wrap my-24">
      {/* ── Header ── */}
      <motion.div
        className="sec-head mb-10 sm:mb-14"
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">
          Framework
        </p>
        <h2>{tFramework('sectionTitle')}</h2>
        <p>{tFramework('sectionSubtitle')}</p>
      </motion.div>

      {/* ── 2-Column Layout: Graph + Rolodex ── */}
      <div className="grid-2 gap-8 items-start">
        {/* Left: Animated Infinity Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full panel" style={{ aspectRatio: '800 / 360' }}>
            {/* HTML Pillar Tags */}
            {PILLAR_CONFIG.map((config, i) => (
              <PillarTag
                key={config.id}
                index={i}
                label={pillarLabels[i]}
                level={levelLabels[i]}
                config={config}
                isActive={activeIndex === i}
                onClick={() => selectPillar(i)}
              />
            ))}

            {/* SVG Animated Infinity Loop */}
            <svg
              role="presentation"
              viewBox="0 0 800 360"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              {/* Background infinity path */}
              <path
                d={INFINITY_PATH}
                stroke="var(--border-strong)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* 4 Animated Pulses traveling along the path */}
              {PILLAR_CONFIG.map((config, i) => {
                const offsetStart = i * 0.25;
                const isCurrentPillar = activeIndex === i;
                return (
                  <motion.path
                    key={config.id}
                    d={INFINITY_PATH}
                    fill="none"
                    pathLength={1}
                    stroke={config.color}
                    strokeWidth={isCurrentPillar ? 3 : 2}
                    strokeLinecap="round"
                    strokeDasharray={`${SEGMENT_LENGTH} ${GAP_LENGTH}`}
                    initial={{ strokeDashoffset: -offsetStart }}
                    animate={{
                      strokeDashoffset: -(1 + offsetStart),
                      opacity: isCurrentPillar ? 1 : 0.4,
                    }}
                    transition={{
                      strokeDashoffset: {
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                      },
                      opacity: { duration: 0.3 },
                      strokeWidth: { duration: 0.3 },
                    }}
                  />
                );
              })}

              {/* Glowing Center Intersection Point */}
              <circle cx="400" cy="180" r="14" fill="rgba(47, 217, 227, 0.1)" />
              <circle cx="400" cy="180" r="4" fill="#2FD9E3">
                <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <p className="t-caption text-center mt-4">
            {tFramework('graphFlowLabel')}
          </p>
        </motion.div>

        {/* Right: Rolodex Card Stack + Dot Nav */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <RolodexStack
            activeIndex={activeIndex}
            t={tFramework}
            onCardClick={advancePillar}
          />

          {/* Dot navigation */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-8">
            {PILLAR_CONFIG.map((config, i) => (
              <button
                key={config.id}
                type="button"
                onClick={() => selectPillar(i)}
                className="cursor-pointer bg-transparent border-none p-1"
                aria-label={`View ${pillarLabels[i]}`}
              >
                <motion.div
                  className="rounded-full h-2"
                  animate={{
                    width: activeIndex === i ? 32 : 8,
                    backgroundColor: activeIndex === i ? config.color : 'var(--border)',
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

