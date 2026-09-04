"use client";

import { useTranslations } from '@/i18n/translation-client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

/* ──────────────────────────────────────────
   Pillar config
   ────────────────────────────────────────── */
const PILLAR_CONFIG = [
  { id: 1, color: '#00c2ff', glowColor: 'rgba(0,194,255,0.25)', levelColor: 'rgba(0,194,255,0.15)', borderColor: 'rgba(0,194,255,0.3)' },
  { id: 2, color: '#2FD9E3', glowColor: 'rgba(47,217,227,0.25)', levelColor: 'rgba(47,217,227,0.15)', borderColor: 'rgba(47,217,227,0.3)' },
  { id: 3, color: '#fbbf24', glowColor: 'rgba(251,191,36,0.25)', levelColor: 'rgba(251,191,36,0.15)', borderColor: 'rgba(251,191,36,0.3)' },
  { id: 4, color: '#a78bfa', glowColor: 'rgba(167,139,250,0.25)', levelColor: 'rgba(167,139,250,0.15)', borderColor: 'rgba(167,139,250,0.3)' },
];

/* ──────────────────────────────────────────
   Perfect Symmetrical Infinity Symbol (∞)
   Single unified path — 100% clean silhouette
   ViewBox: 800 × 380 | Center: (400, 190)
   ────────────────────────────────────────── */
const INFINITY_PATH =
  "M 400 190 C 475 100, 640 100, 640 190 C 640 280, 475 280, 400 190 C 325 100, 160 100, 160 190 C 160 280, 325 280, 400 190 Z";

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
  const positionStyles: React.CSSProperties[] = [
    { top: '0%', left: '2%' },
    { top: '0%', right: '2%' },
    { bottom: '0%', right: '2%' },
    { bottom: '0%', left: '2%' },
  ];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="absolute z-10 w-fit max-w-[46%] cursor-pointer border backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 text-center font-mono text-[9px] sm:text-[11px] md:text-xs rounded-lg transition-all"
      style={{
        ...positionStyles[index],
        borderColor: isActive ? config.color : "rgba(255,255,255,0.12)",
        backgroundColor: isActive ? `${config.color}15` : "rgba(10,10,10,0.85)",
        boxShadow: isActive ? `0 0 25px ${config.glowColor}` : "0 4px 12px rgba(0,0,0,0.4)",
      }}
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.07 }}
    >
      <span
        className="block uppercase tracking-[0.18em] text-[8px] sm:text-[9px] font-bold leading-none mb-0.5"
        style={{ color: config.color }}
      >
        {level}
      </span>
      <span className="block text-[#F4F8FB] font-bold leading-tight sm:whitespace-nowrap">
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
        style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}
      >
        {index + 1}
      </div>
      <div>
        <p className="text-[#F4F8FB] text-sm font-semibold font-mono leading-tight">{name}</p>
        <p className="text-[#8FA6C4] text-xs font-sans leading-relaxed mt-0.5">{desc}</p>
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
      className="relative rounded-xl overflow-hidden select-none"
      style={{
        background: "linear-gradient(135deg, hsl(0 0% 6%), hsl(0 0% 8%))",
        border: `1px solid ${isActive ? config.borderColor : "hsl(0 0% 12%)"}`,
        boxShadow: isActive ? `0 4px 40px ${config.glowColor}` : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-3"
              style={{
                color: config.color,
                backgroundColor: config.levelColor,
                border: `1px solid ${config.borderColor}`,
              }}
            >
              {t(`${p}Level`)}
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-[#F4F8FB] leading-tight">
              {t(`${p}Title`)}
            </h3>
            <p className="text-[#8FA6C4] text-sm font-sans mt-1">
              {t(`${p}Subtitle`)}
            </p>
          </div>
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg"
            style={{
              color: config.color,
              backgroundColor: config.levelColor,
              border: `1px solid ${config.borderColor}`,
            }}
          >
            {`0${pillarIndex}`}
          </div>
        </div>

        <p className="text-[#8FA6C4] text-sm font-sans leading-relaxed mt-4">
          {t(`${p}Description`)}
        </p>

        {/* Phases — only rendered for the active card */}
        {isActive && (
          <div className="mt-5 space-y-3 border-t border-white/5 pt-4">
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
    <section id="framework" ref={sectionRef} className="w-full max-w-7xl my-32 px-4 sm:px-6 lg:px-8 scroll-mt-28">
      {/* ── Header ── */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4">
          Framework
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] font-mono leading-tight">
          {tFramework('sectionTitle')}
        </h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg font-sans max-w-3xl mx-auto mt-4 leading-relaxed">
          {tFramework('sectionSubtitle')}
        </p>
      </motion.div>

      {/* ── Main Framework Content (Side-by-side on desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Animated Infinity Graph */}
        <motion.div
          className="lg:col-span-6 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Container matching 800×380 viewBox ratio */}
          <div className="relative mx-auto w-full max-w-[800px]" style={{ aspectRatio: '800 / 380' }}>
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
              viewBox="0 0 800 380"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              {/* Single razor-sharp background infinity path */}
              <path
                d={INFINITY_PATH}
                stroke="var(--border-strong)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* 4 Animated Pulses traveling along THE EXACT SAME PATH */}
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
              <circle cx="400" cy="190" r="14" fill="rgba(47, 217, 227, 0.1)" />
              <circle cx="400" cy="190" r="4" fill="#2FD9E3">
                <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <p className="text-[var(--text-faint)] text-xs font-sans text-center mt-4 max-w-md mx-auto">
            {tFramework('graphFlowLabel')}
          </p>
        </motion.div>

        {/* Right Column: Rolodex Card Stack & Navigation */}
        <motion.div
          className="lg:col-span-6 w-full"
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

          {/* ── Dot navigation ── */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6">
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
                    backgroundColor: activeIndex === i ? config.color : 'hsl(0 0% 20%)',
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
