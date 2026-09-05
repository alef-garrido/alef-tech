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
   Pillar Tag — Technical Blueprint Badge over the SVG
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
      className="absolute z-10 w-fit max-w-[46%] cursor-pointer border px-3 py-2 text-left font-mono rounded-lg transition-all backdrop-blur-md"
      style={{
        ...positionStyles[index],
        borderColor: isActive ? config.color : "var(--border)",
        backgroundColor: isActive ? "var(--surface-2)" : "color-mix(in srgb, var(--surface) 90%, transparent)",
        boxShadow: isActive ? `0 0 24px ${config.glowColor}, 0 0 0 1px ${config.borderColor}` : "0 4px 12px rgba(0,0,0,0.25)",
      }}
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07 }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: config.color }}
        />
        <span
          className="uppercase tracking-[0.18em] text-[9px] sm:text-[10px] font-bold leading-none"
          style={{ color: config.color }}
        >
          {level}
        </span>
      </div>
      <span className="block text-[var(--text)] font-mono font-semibold text-[11px] sm:text-xs md:text-sm leading-tight sm:whitespace-nowrap">
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
        style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}
      >
        {index + 1}
      </div>
      <div>
        <p className="text-[var(--text)] text-sm font-semibold font-mono leading-tight">{name}</p>
        <p className="text-[var(--text-muted)] text-xs font-sans leading-relaxed mt-0.5">{desc}</p>
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
      className="relative rounded-xl overflow-hidden select-none bg-[var(--surface)] border border-[var(--border)] transition-colors"
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
            <h3 className="t-h2 text-[var(--text)]">
              {t(`${p}Title`)}
            </h3>
            <p className="t-body text-sm mt-1">
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

        <p className="text-[var(--text-muted)] text-sm font-sans leading-relaxed mt-4">
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
    <section id="framework" ref={sectionRef} className="w-full my-64 px-4 sm:px-6 lg:px-8 scroll-mt-28">
      {/* ── Header ── */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow inline-flex mb-4">
          Framework
        </span>
        <h2 className="t-h1 text-[var(--text)]">
          {tFramework('sectionTitle')}
        </h2>
        <p className="t-body-lg max-w-3xl mx-auto mt-4">
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

            {/* SVG Animated Technical Blueprint Infinity Graph */}
            <svg
              role="presentation"
              viewBox="0 0 800 380"
              className="dwg absolute inset-0 h-full w-full select-none"
              fill="none"
            >
              {/* Background Technical Grid Guidelines */}
              <rect className="isogrid" x="40" y="20" width="720" height="340" opacity="0.35" />

              {/* Axis & Centerlines */}
              <path className="ctr" d="M 60 190 H 740" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <path className="ctr" d="M 400 40 V 340" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

              {/* Construction Outer Guidelines */}
              <path className="cons" d="M 160 100 H 640 V 280 H 160 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

              {/* Primary Base Technical Infinity Loop */}
              <path
                d={INFINITY_PATH}
                stroke="var(--border-strong)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              {/* Secondary Dashed Guideline Loop */}
              <path
                d={INFINITY_PATH}
                className="hid"
                stroke="var(--accent)"
                strokeWidth="0.65"
                strokeDasharray="6 4"
                opacity="0.35"
              />

              {/* 4 Dual-Layer Laser Pulses traveling along THE EXACT SAME PATH */}
              {PILLAR_CONFIG.map((config, i) => {
                const offsetStart = i * 0.25;
                const isCurrentPillar = activeIndex === i;
                return (
                  <g key={config.id}>
                    {/* Glow backdrop pulse */}
                    <motion.path
                      d={INFINITY_PATH}
                      fill="none"
                      pathLength={1}
                      stroke={config.color}
                      strokeWidth={isCurrentPillar ? 6 : 3}
                      strokeLinecap="round"
                      strokeDasharray={`${SEGMENT_LENGTH} ${GAP_LENGTH}`}
                      initial={{ strokeDashoffset: -offsetStart }}
                      animate={{
                        strokeDashoffset: -(1 + offsetStart),
                        opacity: isCurrentPillar ? 0.35 : 0.15,
                      }}
                      transition={{
                        strokeDashoffset: {
                          duration: 4,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop",
                        },
                        opacity: { duration: 0.3 },
                      }}
                      style={{ filter: 'blur(3px)' }}
                    />
                    {/* Sharp core laser beam */}
                    <motion.path
                      d={INFINITY_PATH}
                      fill="none"
                      pathLength={1}
                      stroke={config.color}
                      strokeWidth={isCurrentPillar ? 3 : 1.75}
                      strokeLinecap="round"
                      strokeDasharray={`${SEGMENT_LENGTH} ${GAP_LENGTH}`}
                      initial={{ strokeDashoffset: -offsetStart }}
                      animate={{
                        strokeDashoffset: -(1 + offsetStart),
                        opacity: isCurrentPillar ? 1 : 0.5,
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
                  </g>
                );
              })}

              {/* 4 Pillar Target Reticles (Node Coordinates along infinity loop) */}
              {[
                { cx: 250, cy: 115, id: 0 },
                { cx: 550, cy: 115, id: 1 },
                { cx: 550, cy: 265, id: 2 },
                { cx: 250, cy: 265, id: 3 },
              ].map((node) => {
                const isAct = activeIndex === node.id;
                const cfg = PILLAR_CONFIG[node.id];
                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle className="surf" cx={node.cx} cy={node.cy} r={isAct ? 18 : 12} fill="color-mix(in srgb, currentColor 12%, transparent)" />
                    <circle className="c2" cx={node.cx} cy={node.cy} r={isAct ? 14 : 9} stroke={isAct ? cfg.color : "currentColor"} strokeWidth={isAct ? 1.5 : 1} fill="none" />
                    <circle className="c3" cx={node.cx} cy={node.cy} r={isAct ? 7 : 4} stroke={isAct ? cfg.color : "currentColor"} strokeWidth="0.65" fill="none" opacity="0.8" />
                    <circle className="node" cx={node.cx} cy={node.cy} r={isAct ? 3 : 2} fill={isAct ? cfg.color : "currentColor"} />
                    {/* Reticle Ticks */}
                    <path
                      className="c3"
                      d={`M ${node.cx} ${node.cy - (isAct ? 22 : 15)} V ${node.cy - (isAct ? 16 : 11)} M ${node.cx} ${node.cy + (isAct ? 16 : 11)} V ${node.cy + (isAct ? 22 : 15)} M ${node.cx - (isAct ? 22 : 15)} ${node.cy} H ${node.cx - (isAct ? 16 : 11)} M ${node.cx + (isAct ? 16 : 11)} ${node.cy} H ${node.cx + (isAct ? 22 : 15)}`}
                      stroke={isAct ? cfg.color : "currentColor"}
                      strokeWidth="0.65"
                      opacity={isAct ? 1 : 0.5}
                    />
                  </g>
                );
              })}

              {/* Glowing Central Hub Node (400, 190) */}
              <g>
                <circle cx="400" cy="190" r="22" fill="color-mix(in srgb, var(--accent) 12%, transparent)" />
                <circle className="c2" cx="400" cy="190" r="14" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.75" />
                <circle className="c3" cx="400" cy="190" r="7" stroke="var(--accent)" strokeWidth="0.65" fill="none" opacity="0.9" />
                <circle className="node" cx="400" cy="190" r="3.5" fill="var(--accent)">
                  <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                {/* Center Crosshair Ticks */}
                <path className="c3" d="M 400 168 V 176 M 400 204 V 212 M 378 190 H 386 M 414 190 H 422" stroke="var(--accent)" strokeWidth="0.65" opacity="0.8" />
              </g>
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
