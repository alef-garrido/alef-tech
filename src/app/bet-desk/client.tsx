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
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            We buy problems instead of selling solutions.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-sans leading-relaxed">
            Bring one real, measurable business problem. We diagnose it free,
            agree a milestone in writing — and put our fee at risk against it.
          </p>

          {/* Primary CTA Button */}
          <button
            onClick={() => setShowRSVPModal(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--primary)] text-black font-mono font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[var(--primary)]/25 flex items-center justify-center gap-2"
          >
            <span>{messages?.betDesk?.rsvpCta || 'PITCH YOUR PROBLEM →'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Counter Badge */}
          <div className="pt-4 text-xs font-mono text-[var(--text-muted)]">
            Month [N]: [X]/5 bets placed.
          </div>
        </div>
      </section>

          {/* HOW IT WORKS */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">HOW IT WORKS</h2>
            <ol className="space-y-8">
              <li>
                <p className="font-mono text-lg font-bold">1 — You pitch the problem.</p>
                <p className="text-sm text-[var(--text-muted)]">
                  One real problem from your business. Two numbers required: what it costs you, and what you’d accept as "solved."
                </p>
              </li>
              <li>
                <p className="font-mono text-lg font-bold">2 — We diagnose it. Free.</p>
                <p className="text-sm text-[var(--text-muted)]">
                  A real examination, not a sales call. If it’s not our strike zone, we tell you straight and point you to someone who can help. That opinion is yours either way.
                </p>
              </li>
              <li>
                <p className="font-mono text-lg font-bold">3 — We agree on the milestone. In writing.</p>
                <p className="text-sm text-[var(--text-muted)]">
                  One specific, measurable target — defined together before any work starts. You’ll know exactly what success looks like.
                </p>
              </li>
              <li>
                <p className="font-mono text-lg font-bold">4 — We do the work. You hold the pen.</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Nothing goes out or changes without your approval. Every message, every move — you sign off first.
                </p>
              </li>
              <li>
                <p className="font-mono text-lg font-bold">5 — The scoreboard decides who pays.</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Milestone hit → we get paid. Missed → you don’t pay. Dead end → we both sign that declaration, in writing.
                </p>
              </li>
            </ol>
          </section>


      {/* THE GUARANTEE STRIP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">THE BET, IN ONE LINE EACH</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Escrow */}
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-[var(--primary)] mb-4" />
            <p className="font-mono font-bold">Escrow</p>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              Our fee sits in escrow before work begins. It only moves when the milestone does.
            </p>
          </div>
          {/* Missed */}
          <div className="flex flex-col items-center">
            <ArrowRight className="w-12 h-12 text-[var(--primary)] mb-4" />
            <p className="font-mono font-bold">Missed</p>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              Milestone missed → every cent comes back to you. Not a trial that expires. A fee that never existed.
            </p>
          </div>
          {/* Dead end */}
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-[var(--primary)] mb-4" />
            <p className="font-mono font-bold">Dead end</p>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              If the problem turns out exhausted, we both sign the declaration. In writing. You owe nothing.
            </p>
          </div>
        </div>
      </section>

            {/* LIVE SCOREBOARD */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">THE SCOREBOARD — WE PUBLISH EVERYTHING</h2>
        <div className="bg-card rounded-lg c-cyber-border p-4"><pre className="font-mono text-left text-sm whitespace-pre text-[var(--text-muted)]">{`
MONTH [N]
Bets placed ......... [5]
Milestones hit ...... [X]
Missed .............. [Y] → still working, free, as promised
Declared exhausted .. [Z] → signed by both sides
Invoices sent before results .. 0
`}</pre></div>
      </section>

            {/* WHO QUALIFIES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">IS YOUR PROBLEM READY FOR A BET?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="font-mono text-lg font-bold">A bet needs a scoreboard. That means two numbers:</p>
            <ul className="list-none space-y-2 text-sm text-[var(--text-muted)]">
              <li>→ What does this problem cost you?<br/><span className="font-mono">("About $4k a month in proposals that die after the quote.")</span></li>
              <li>→ What number would you accept as "solved"?<br/><span className="font-mono">("8 of those proposals reaching a signed decision.")</span></li>
            </ul>
            <p className="text-sm text-[var(--text-muted)]">If you can't answer both yet — that's normal, and it's fixable.<br/>Tell us what you have and we'll help you find the number first.<br/>Free either way.</p>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-lg font-bold">Not sure it fits?</p>
            <p className="text-sm text-[var(--text-muted)]">The FAQ below covers the catch, the cap, and what we do when a problem isn't ours.</p>
          </div>
        </div>
      </section>


      {/* WHO QUALIFIES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">IS YOUR PROBLEM READY FOR A BET?</h3>
            <p className="text-[var(--text-muted)]">A bet needs a scoreboard. That means two numbers:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)]">
              <li className="mt-2">→ What does this problem cost you?
                <span className="font-mono block mt-1">("About $4k a month in proposals that die after the quote.")</span>
              </li>
              <li className="mt-2">→ What number would you accept as “solved”?
                <span className="font-mono block mt-1">("8 of those proposals reaching a signed decision.")</span>
              </li>
            </ul>
            <p className="mt-4 text-[var(--text-muted)]">If you can't answer both yet — that's normal, and it's fixable. Tell us what you have and we'll help you find the number first. Free either way.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Not sure it fits?</h4>
            <p className="text-[var(--text-muted)]">The FAQ below covers the catch, the cap, and what we do when a problem isn't ours.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          <details open>
            <summary className="font-mono text-lg font-bold cursor-pointer">What's the catch?</summary>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Two: your problem has to be real (we verify the numbers), and you approve everything before it goes out. That's the entire catch. If a deal feels like it has a third one, ask us — we'll answer in the open.</p>
          </details>
          <details>
            <summary className="font-mono text-lg font-bold cursor-pointer">How do you make money?</summary>
            <p className="mt-2 text-sm text-[var(--text-muted)]">We only get paid when the scoreboard moves. That's not a bug in the model — it IS the model. It also means we'll tell you honestly if we don't believe we can move your number. A bet we can't win is just free work with extra steps.</p>
          </details>
          <details>
            <summary className="font-mono text-lg font-bold cursor-pointer">What if my problem is outside your strike zone?</summary>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Then the diagnosis ends with a straight answer and, where we can, a referral to someone who lives in that problem. You'd be surprised how valuable a clear "this isn't it, that is" can be. No charge.</p>
          </details>
          <details>
            <summary className="font-mono text-lg font-bold cursor-pointer">Why only 5 bets a month?</summary>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Arithmetic. Every missed milestone costs us real work at $0, and we keep that promise — so we only take as many bets as we can absorb if every single one misses. When the month fills, the next pitch becomes next month's. The waitlist is real, and it moves.</p>
          </details>
          <details>
            <summary className="font-mono text-lg font-bold cursor-pointer">What do I actually have to do?</summary>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Answer the two numbers honestly, give us access to the situation, and review our work as it happens. You hold veto power on every message. Expect roughly [2–3 hours] of your time across the month.</p>
          </details>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--primary)] selection:text-black font-sans flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-center mb-6">The risk is ours. The problem is yours.</h1>
        <h2 className="text-2xl font-bold text-center mb-4">Let's find out if it can move.</h2>
        <button
          onClick={() => setShowRSVPModal(true)}
          className="mt-4 px-8 py-4 rounded-xl bg-[var(--primary)] text-black font-mono font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-[var(--primary)]/25 flex items-center justify-center gap-2"
        >
          <span>{messages?.betDesk?.rsvpCta || 'PITCH YOUR PROBLEM →'}</span>
        </button>
        <div className="mt-4 text-xs font-mono text-[var(--text-muted)]">Month [N]: [X]/5 bets placed.</div>
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
