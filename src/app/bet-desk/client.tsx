'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DynamicLeadForm } from '../components/dynamic-lead-form';
import { Calendar, MapPin, Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2, Users, Trophy } from 'lucide-react';

interface BetDeskClientProps {
  messages: any;
}

export default function BetDeskClient({ messages }: BetDeskClientProps) {
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--primary)] selection:text-black font-sans">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-wider text-[var(--accent)] hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
            EXNORIA CLINIC // BET DESK
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="btn btn-ghost sm text-xs font-mono hidden sm:inline-flex">
              ← Main Site
            </Link>
            <button
              onClick={() => setShowRSVPModal(true)}
              className="btn btn-primary sm text-xs font-mono tracking-wider font-semibold shadow-lg shadow-[var(--primary)]/20"
            >
              RSVP Now →
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--primary)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EVENT CAMPAIGN 2026 // BET DESK EDITION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Stop Guessing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-cyan-400 to-emerald-300">
              Bet Big On High-LTV Growth.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-sans leading-relaxed">
            The exclusive strategy summit for operators, business leaders, and CX visionaries ready to eliminate customer leakage, deploy agentic AI workflows, and scale retention.
          </p>

          {/* Event Metadata Badges */}
          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <Calendar className="w-4 h-4 text-[var(--primary)]" />
              <span>October 24, 2026</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Hybrid Summit (Live & VIP Lounge)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Limited 50 VIP Passes</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowRSVPModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--primary)] text-black font-mono font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[var(--primary)]/25 flex items-center justify-center gap-2"
            >
              <span>CLAIM YOUR BET DESK PASS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#agenda"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center justify-center gap-2"
            >
              Explore Agenda ↓
            </a>
          </div>
        </div>
      </section>

      {/* Value Proposition / Metrics Bar */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/50 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-1 p-4">
            <div className="text-3xl font-mono font-bold text-[var(--primary)]">48 Hours</div>
            <div className="text-sm text-[var(--text-muted)] font-mono">Express CX Health Audit Guarantee</div>
          </div>
          <div className="space-y-1 p-4 border-y md:border-y-0 md:border-x border-[var(--border)]">
            <div className="text-3xl font-mono font-bold text-cyan-400">14 Days</div>
            <div className="text-sm text-[var(--text-muted)] font-mono">From Strategy to Live AI Automation</div>
          </div>
          <div className="space-y-1 p-4">
            <div className="text-3xl font-mono font-bold text-emerald-400">5x - 10x</div>
            <div className="text-sm text-[var(--text-muted)] font-mono">Target LTV ROI on Inactive Recoveries</div>
          </div>
        </div>
      </section>

      {/* Agenda & Summit Pillars */}
      <section id="agenda" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="eyebrow">// SUMMIT TRACKS & AGENDA</p>
          <h2 className="t-h2 font-bold text-3xl sm:text-4xl">
            What You'll Master at Bet Desk
          </h2>
          <p className="text-[var(--text-muted)] text-sm font-sans">
            No generic keynotes or fluff. Four intense tracks designed to transform how your company acquires, retains, and scales customer revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="panel p-8 space-y-4 border border-[var(--border)] bg-[var(--surface)] rounded-2xl hover:border-[var(--primary)]/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-mono font-bold">
              01
            </div>
            <h3 className="text-xl font-bold font-mono">CX Revenue Leakage Teardowns</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Learn how to pinpoint silent churn in under 48 hours. Live teardown of real business pipelines showing where thousands in monthly LTV quietly vanish.
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--primary)]" /> Silent Churn Detection Blueprints</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--primary)]" /> Customer Offboarding Audits</li>
            </ul>
          </div>

          <div className="panel p-8 space-y-4 border border-[var(--border)] bg-[var(--surface)] rounded-2xl hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold">
              02
            </div>
            <h3 className="text-xl font-bold font-mono">Agentic AI Architecture</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Discover how leading companies replace brittle tools with autonomous agentic workflows that handle onboarding, retention alerts, and lead triage.
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> n8n & Custom Agent Workflows</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero SaaS Sprawl Architecture</li>
            </ul>
          </div>

          <div className="panel p-8 space-y-4 border border-[var(--border)] bg-[var(--surface)] rounded-2xl hover:border-emerald-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold">
              03
            </div>
            <h3 className="text-xl font-bold font-mono">The 14-Day Recovery Engine</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Step-by-step playbook to reactivate past clients who haven't bought in 60+ days without aggressive or spammy sales tactics.
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> WhatsApp & Email Reactivation Sequences</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> High-Conversion Frictionless Intake</li>
            </ul>
          </div>

          <div className="panel p-8 space-y-4 border border-[var(--border)] bg-[var(--surface)] rounded-2xl hover:border-purple-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold">
              04
            </div>
            <h3 className="text-xl font-bold font-mono">Live Mastermind & Networking</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Connect directly with Alef Lemat and top CX strategists during our closed-door VIP Q&A and operational feedback session.
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> 1-on-1 Operational Feedback</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> VIP Networking & Resource Vault Access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Host / Keynote Speaker Spotlight */}
      <section className="py-20 bg-[var(--surface)]/30 border-t border-[var(--border)] px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[var(--primary)] to-cyan-500 p-1 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-[var(--bg)] flex items-center justify-center font-mono font-bold text-2xl text-[var(--primary)]">
              AL
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--primary)]">
              SUMMIT HOST & LEAD STRATEGIST
            </div>
            <h3 className="text-2xl font-bold font-mono">Alef Lemat</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              SEP-CONOCER certified Management Consultant (EC0249 & EC1223) and Senior Software Architect with 9+ years building customer experience infrastructure, autonomous AI workflows, and high-retention operations for growing enterprises.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-[var(--text-faint)]">
              <span>✓ 9+ Years Experience</span>
              <span>✓ SEP-CONOCER Certified</span>
              <span>✓ Exnoria CX Clinic Founder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final RSVP CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] border border-[var(--border)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full pointer-events-none"></div>

          <Trophy className="w-12 h-12 text-[var(--primary)] mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono">
            Ready to Bet on Operational Excellence?
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto font-sans text-sm sm:text-base">
            Secure your place at the Bet Desk Summit. Registrations are vetted to maintain high-signal networking and actionable strategy exchange.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowRSVPModal(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[var(--primary)] text-black font-mono font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[var(--primary)]/20"
            >
              RSVP FOR BET DESK SUMMIT →
            </button>
          </div>

          <p className="text-xs font-mono text-[var(--text-faint)] pt-2">
            No credit card required • Instant confirmation & calendar invite
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-4 text-center text-xs font-mono text-[var(--text-faint)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© 2026 EXNORIA CLINIC // BET DESK CAMPAIGN</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-[var(--text)] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>

      {/* Dynamic Lead Form RSVP Modal */}
      {showRSVPModal && (
        <DynamicLeadForm
          service="bet-desk"
          onClose={() => setShowRSVPModal(false)}
        />
      )}
    </div>
  );
}
