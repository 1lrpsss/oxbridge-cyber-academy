import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Menu, ShieldCheck, Terminal, X } from "lucide-react";
import { useState } from "react";
import { FreeModule } from "@/components/FreeModule";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oxbridge | Ethical Hacking Academy" },
      { name: "description", content: "Master ethical hacking through guided cyber ranges, practical labs, and expert mentorship at Oxbridge." },
      { property: "og:title", content: "Oxbridge | Ethical Hacking Academy" },
      { property: "og:description", content: "Practical, legal cybersecurity training built for tomorrow's defenders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tracks = [
  { code: "01 · WEB", title: "Web App Penetration", copy: "Master Burp, SQL injection, XSS, authentication flaws, and the OWASP Top 10 in isolated target labs.", detail: "12 lessons · 3 labs", tone: "cy" },
  { code: "02 · NET", title: "Network & Active Directory", copy: "Practice recon, privilege escalation, pivoting, and lateral movement through a simulated enterprise domain.", detail: "10 lessons · 4 labs", tone: "vio" },
  { code: "03 · REV", title: "Reverse Engineering", copy: "Use Ghidra, assembly, and malware triage to understand binaries from an adversary's point of view.", detail: "9 lessons · 2 labs", tone: "cy" },
];

const curriculum = [
  ["01", "Reconnaissance", "Map attack surfaces, enumerate services, and document scope before a single test begins."],
  ["02", "Exploitation", "Move from finding to proof inside guarded sandboxes, with every action logged and reviewable."],
  ["03", "Reporting", "Turn technical findings into clear remediation plans that security teams can act on."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="ox-grid pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="ox-noise pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="ox-scan pointer-events-none fixed inset-x-0 z-40" aria-hidden="true" />
      <div className="ox-aura ox-aura-one" aria-hidden="true" />
      <div className="ox-aura ox-aura-two" aria-hidden="true" />

      <header className="relative z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2 font-mono text-lg font-bold" aria-label="Oxbridge home">
            <span className="text-primary">&gt;_</span><span>oxbridge</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-xs text-muted-foreground md:flex" aria-label="Main navigation">
            <a className="ox-nav-link" href="#curriculum">curriculum</a>
            <a className="ox-nav-link" href="#labs">labs</a>
            <a className="ox-nav-link" href="#mentors">mentors</a>
            <a className="ox-nav-link" href="#enroll">enroll</a>
          </nav>
          <a className="ox-glass hidden items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-primary transition hover:border-primary/50 sm:flex" href="#enroll">
            secure your place <ArrowRight className="size-3.5" />
          </a>
          <button className="grid size-10 place-items-center rounded-full border border-border text-foreground md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="ox-glass mx-5 mb-4 grid gap-1 rounded-lg p-3 font-mono text-sm md:hidden" aria-label="Mobile navigation">
            {[["curriculum", "curriculum"], ["labs", "labs"], ["mentors", "mentors"], ["enroll", "enroll"]].map(([label, target]) => (
              <a key={label} href={`#${target}`} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-muted-foreground transition hover:bg-secondary hover:text-primary">{label}</a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-2 lg:pt-20">
        <div>
          <div className="ox-rise ox-glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase text-primary sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-success shadow-[0_0_10px_var(--success)] ox-pulse" /> ethical hacking · cohort 08 open
          </div>
          <h1 className="ox-rise ox-delay-1 mt-7 text-5xl font-bold leading-[0.94] sm:text-6xl lg:text-7xl">
            Learn to <span className="text-primary ox-glitch" data-text="break in">break in</span>,<br />so you can<br />defend out.
          </h1>
          <div className="ox-type mt-7 max-w-full font-mono text-xs text-muted-foreground sm:text-sm">sudo apt install red-team-mindset</div>
          <p className="ox-rise ox-delay-2 mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            A hands-on academy for responsible security professionals. Train in legal cyber ranges, solve realistic attacks, and learn from working practitioners.
          </p>
          <div className="ox-rise ox-delay-3 mt-9 flex flex-wrap items-center gap-5">
            <button className="ox-primary-button group inline-flex items-center gap-2 rounded-md px-6 py-3 font-semibold" onClick={() => setModuleOpen(true)}>start free module <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></button>
            <a className="inline-flex items-center gap-2 font-mono text-sm text-foreground transition hover:text-primary" href="#curriculum">view syllabus <span aria-hidden="true">↗</span></a>
          </div>
          <div className="ox-rise ox-delay-4 mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] uppercase text-muted-foreground">
            <span className="flex items-center gap-2"><Check className="size-3 text-success" /> isolated labs</span>
            <span className="flex items-center gap-2"><Check className="size-3 text-success" /> expert reviews</span>
            <span className="flex items-center gap-2"><Check className="size-3 text-success" /> ethical by design</span>
          </div>
        </div>

        <div className="ox-rise ox-delay-3 relative">
          <div className="ox-terminal-glow absolute -inset-8" aria-hidden="true" />
          <div className="ox-glass relative overflow-hidden rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <span className="size-2.5 rounded-full bg-danger" /><span className="size-2.5 rounded-full bg-warning" /><span className="size-2.5 rounded-full bg-success" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground">student@oxbridge: ~/range-07</span>
              <span className="ml-auto hidden font-mono text-[9px] text-success sm:block">● ENCRYPTED</span>
            </div>
            <div className="min-h-[315px] p-5 font-mono text-[11px] leading-7 sm:p-7 sm:text-[13px]">
              <p className="text-muted-foreground"># target authorized: range-07.oxbridge.local</p>
              <p className="ox-terminal-line ox-terminal-1 text-primary">[*] enumerating services... complete</p>
              <p className="ox-terminal-line ox-terminal-2 text-accent">[+] access control weakness located</p>
              <p className="ox-terminal-line ox-terminal-3 text-primary">[*] validating impact... confirmed</p>
              <p className="ox-terminal-line ox-terminal-4 text-foreground">report_id::OXB-2048</p>
              <p className="ox-terminal-line ox-terminal-5 text-success">[✓] remediation note submitted</p>
              <p className="ox-terminal-line ox-terminal-6 text-primary ox-caret">[+] flag&#123;scope_respected&#125;</p>
            </div>
            <div className="border-t border-border px-5 py-4">
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground"><span>LAB PROGRESS</span><span>78%</span></div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary"><div className="ox-progress h-full bg-primary" /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 overflow-hidden border-y border-border bg-secondary/40 py-3 font-mono text-[10px] uppercase text-muted-foreground">
        <div className="ox-marquee flex w-max gap-12 whitespace-nowrap">
          {[0, 1].map((group) => <div className="flex gap-12" key={group} aria-hidden={group === 1}><span>48 cyber ranges online</span><span className="text-primary">● all systems operational</span><span>2,400+ learners trained</span><span>zero live targets</span><span>mentor review in every track</span></div>)}
        </div>
      </div>

      <section id="curriculum" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="mb-11 flex items-end justify-between gap-6">
          <div><p className="ox-kicker">// choose your discipline</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Tracks you can finish in weeks.</h2></div>
          <span className="hidden font-mono text-xs text-muted-foreground sm:block">03 / SPECIALIZATIONS</span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {tracks.map((track, index) => <article key={track.code} className="ox-track ox-glass group rounded-lg p-6">
            <div className={`font-mono text-xs ${track.tone === "vio" ? "text-accent" : "text-primary"}`}>{track.code}</div>
            <h3 className="mt-4 text-xl font-semibold">{track.title}</h3><p className="mt-3 min-h-24 text-sm leading-6 text-muted-foreground">{track.copy}</p>
            <div className="ox-line mt-6" /><div className="mt-5 flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>{track.detail}</span><span className="transition-transform group-hover:translate-x-1">0{index + 1} ↗</span></div>
          </article>)}
        </div>
      </section>

      <section id="labs" className="relative z-10 border-y border-border bg-secondary/20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><p className="ox-kicker">// capability protocol</p><h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">Practice is the only proof.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">Each concept ends in an isolated exercise, an instructor review, and a professional finding report. No passive video marathons.</p>
            <div className="mt-8 grid grid-cols-3 gap-3"><div><strong className="text-2xl text-primary">48</strong><span className="mt-1 block font-mono text-[9px] text-muted-foreground">LIVE LABS</span></div><div><strong className="text-2xl">24/7</strong><span className="mt-1 block font-mono text-[9px] text-muted-foreground">ACCESS</span></div><div><strong className="text-2xl text-success">100%</strong><span className="mt-1 block font-mono text-[9px] text-muted-foreground">IN-SCOPE</span></div></div>
          </div>
          <div className="ox-glass rounded-lg p-3 sm:p-5">
            <div className="ox-network relative min-h-[390px] overflow-hidden rounded-md border border-border bg-background/80 p-5">
              <div className="absolute inset-0 ox-mini-grid" aria-hidden="true" />
              <div className="relative flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>RANGE TOPOLOGY / 07</span><span className="text-success">LIVE ●</span></div>
              <div className="relative mt-10 grid grid-cols-3 gap-4 text-center font-mono text-[9px]">
                {['EDGE', 'GATEWAY', 'VAULT', 'CLIENT-A', 'DOMAIN', 'CLIENT-B'].map((node, index) => <div key={node} className={`ox-node mx-auto grid size-20 place-items-center rounded-md border ${index === 4 ? "border-primary text-primary" : "border-border text-muted-foreground"}`}><Terminal className="mb-1 size-4" /><span>{node}</span></div>)}
              </div>
              <div className="relative mt-8 flex items-center gap-3 rounded-md border border-border bg-secondary/60 p-3 font-mono text-[10px]"><span className="text-primary">$</span><span className="text-muted-foreground">route verified · scope loaded · begin safely</span><span className="ox-caret text-primary" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <p className="ox-kicker">// learning sequence</p><div className="mt-8 divide-y divide-border border-y border-border">
          {curriculum.map(([number, title, copy]) => <div className="group grid gap-4 py-7 sm:grid-cols-[70px_240px_1fr] sm:items-center" key={number}><span className="font-mono text-xs text-primary">{number}</span><h3 className="text-xl font-medium transition group-hover:text-primary">{title}</h3><p className="max-w-2xl text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
        </div>
      </section>

      <section id="mentors" className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="ox-glass grid gap-10 rounded-xl p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div><p className="ox-kicker">// operators, not lecturers</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Mentors who work the field.</h2><p className="mt-4 max-w-xl leading-7 text-muted-foreground">Learn from penetration testers, security engineers, and vulnerability researchers who teach the same disciplined methods they use professionally.</p></div>
          <div className="grid grid-cols-2 gap-3">
            {[['AV', 'Avery Voss', 'Red Team Lead'], ['NK', 'Noor Khan', 'AppSec Engineer'], ['TM', 'Theo Mensah', 'Threat Researcher'], ['RS', 'Rina Shah', 'DFIR Specialist']].map(([initials, name, role]) => <div className="rounded-md border border-border bg-secondary/40 p-4" key={name}><div className="grid size-9 place-items-center rounded-md bg-primary/10 font-mono text-xs text-primary">{initials}</div><p className="mt-3 text-sm font-medium">{name}</p><p className="mt-1 font-mono text-[9px] text-muted-foreground">{role}</p></div>)}
          </div>
        </div>
      </section>

      <section id="enroll" className="relative z-10 border-y border-border bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><div className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] text-success"><ShieldCheck className="size-4" /> AUTHORIZED TRAINING ENVIRONMENT</div><h2 className="text-4xl font-semibold sm:text-6xl">Your first range is ready.</h2><p className="mt-5 max-w-xl text-lg text-muted-foreground">Start with a free guided reconnaissance module. No experience required—only curiosity and respect for the scope.</p></div>
          <a href="mailto:admissions@oxbridge.academy" className="ox-primary-button group inline-flex items-center justify-center gap-3 rounded-md px-7 py-4 font-semibold">request access <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <p className="ox-kicker text-center">// frequently asked</p><h2 className="mt-3 text-center text-3xl font-semibold">Before you connect.</h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {[['Is the training legal?', 'Yes. Every exercise runs inside isolated systems owned and controlled for education, under explicit rules of engagement.'], ['Do I need cybersecurity experience?', 'No. The foundation track starts with networking, Linux, and security fundamentals before introducing offensive techniques.'], ['Will I earn a certificate?', 'Complete the labs, reports, and final assessment to earn a verifiable Oxbridge track certificate.']].map(([question, answer]) => <details className="group py-5" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium"><span>{question}</span><ChevronDown className="size-4 text-primary transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-2xl pr-8 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border bg-background/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8"><div className="font-mono text-sm text-muted-foreground"><span className="text-primary">&gt;_</span> oxbridge — hack the planet, ethically.</div><div className="font-mono text-[10px] text-muted-foreground">© 2026 OXBRIDGE ACADEMY · ALL SYSTEMS NOMINAL</div></div>
      </footer>

      <FreeModule open={moduleOpen} onClose={() => setModuleOpen(false)} />
    </main>
  );
}
