import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, ShieldCheck, Terminal, X } from "lucide-react";

type CommandId = "whoami" | "nmap" | "dns" | "report";

const commands: { id: CommandId; label: string; output: string[]; finding?: string }[] = [
  {
    id: "whoami",
    label: "whoami",
    output: ["operator@oxbridge · role: student · scope: range-00 (authorized)"],
  },
  {
    id: "dns",
    label: "dig range-00.lab any",
    output: [
      ";; ANSWER SECTION:",
      "range-00.lab. 300 IN A 10.0.0.14",
      "range-00.lab. 300 IN TXT \"lab environment - no live systems\"",
      "range-00.lab. 300 IN MX 10 mail.range-00.lab",
    ],
    finding: "DNS records exposed the mail host — added to scope notes.",
  },
  {
    id: "nmap",
    label: "nmap -sV 10.0.0.14",
    output: [
      "PORT     STATE SERVICE  VERSION",
      "22/tcp   open  ssh      OpenSSH 9.6",
      "80/tcp   open  http     nginx 1.25",
      "8080/tcp open  http     Oxbridge Lab Portal",
    ],
    finding: "Three services mapped; the lab portal on 8080 is the exercise target.",
  },
  {
    id: "report",
    label: "report submit --draft",
    output: [
      "validating scope... ok",
      "findings attached... 2",
      "report_id::OXB-0000 saved to your workspace",
      "[✓] flag{recon_is_a_habit}",
    ],
  },
];

const lessons = [
  {
    step: "01",
    title: "What reconnaissance actually is",
    body: "Recon is the disciplined act of looking before touching. You map what exists — domains, hosts, services — and document it, so every later test has a defined boundary.",
    points: ["Passive first, active second", "Everything goes in your notes", "Scope is a promise, not a suggestion"],
  },
  {
    step: "02",
    title: "Your first authorized range",
    body: "Below is a live-style terminal pointed at range-00, an isolated lab built for this lesson. Run each command, read the output, and collect the two findings.",
    points: ["Click a command to execute it", "Output appears as it would in a real shell", "No system outside the lab is ever contacted"],
  },
  {
    step: "03",
    title: "Write it up like a professional",
    body: "A finding nobody can read is a finding that never gets fixed. Submit your draft report and see how practitioners phrase impact without jargon.",
    points: ["State what you found", "State why it matters", "State what to do about it"],
  },
];

export function FreeModule({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lesson, setLesson] = useState(0);
  const [history, setHistory] = useState<{ id: CommandId; label: string; lines: string[] }[]>([]);
  const [findings, setFindings] = useState<CommandId[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setLesson(0);
      setHistory([]);
      setFindings([]);
      setTyping(false);
    }
  }, [open]);

  const reportUnlocked = findings.length >= 2;
  const complete = findings.includes("report");
  const progress = complete ? 100 : Math.round(((lesson + (findings.length ? 1 : 0)) / 4) * 100);

  const runCommand = (command: (typeof commands)[number]) => {
    if (typing || history.some((entry) => entry.id === command.id)) return;
    if (command.id === "report" && !reportUnlocked) return;
    setTyping(true);
    setHistory((current) => [...current, { id: command.id, label: command.label, lines: command.output }]);
    window.setTimeout(() => {
      if (command.finding) setFindings((current) => [...current, command.id as CommandId]);
      setTyping(false);
    }, 500);
  };

  const available = useMemo(() => commands.filter((command) => !history.some((entry) => entry.id === command.id)), [history]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label="Free module: reconnaissance">
      <div className="ox-rise relative my-6 w-full max-w-3xl">
        <div className="ox-terminal-glow absolute -inset-6" aria-hidden="true" />
        <div className="ox-glass relative overflow-hidden rounded-xl shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <span className="size-2.5 rounded-full bg-danger" /><span className="size-2.5 rounded-full bg-warning" /><span className="size-2.5 rounded-full bg-success" />
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">student@oxbridge: ~/module-00-free</span>
            <span className="ml-auto flex items-center gap-3">
              <span className="hidden font-mono text-[9px] text-success sm:block">● FREE MODULE</span>
              <button onClick={onClose} className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition hover:border-primary/50 hover:text-primary" aria-label="Close module">
                <X className="size-3.5" />
              </button>
            </span>
          </div>

          <div className="border-b border-border px-5 py-3">
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground"><span>MODULE PROGRESS</span><span>{progress}%</span></div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary"><div className="ox-progress h-full bg-primary" /></div>
          </div>

          <div className="p-5 sm:p-8">
            <p className="ox-kicker">// module 00 · guided reconnaissance · free</p>
            <div className="mt-6 flex gap-1.5">
              {lessons.map((item, index) => (
                <button key={item.step} onClick={() => setLesson(index)} className={`flex-1 rounded-sm border-t-2 py-2 font-mono text-[10px] transition ${index === lesson ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
                  {item.step}
                </button>
              ))}
              <div className={`flex-1 rounded-sm border-t-2 py-2 text-center font-mono text-[10px] transition ${complete ? "border-success text-success" : "border-border text-muted-foreground"}`}>✓</div>
            </div>

            {lesson < 3 ? (
              <div className="ox-rise mt-7" key={lesson}>
                <h3 className="text-2xl font-semibold sm:text-3xl">{lessons[lesson].title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{lessons[lesson].body}</p>
                <ul className="mt-6 grid gap-2.5">
                  {lessons[lesson].points.map((point) => (
                    <li key={point} className="flex items-center gap-3 font-mono text-xs text-foreground"><Check className="size-3.5 shrink-0 text-success" />{point}</li>
                  ))}
                </ul>

                {lesson === 1 && (
                  <div className="mt-7 rounded-lg border border-border bg-background/80 p-4">
                    <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                      <span>RANGE-00 · ISOLATED · SAFE</span><span className="text-success">AUTHORIZED ●</span>
                    </div>
                    <div className="mt-3 min-h-[90px] font-mono text-[11px] leading-6">
                      {history.length === 0 && <p className="text-muted-foreground">$ pick a command below to begin</p>}
                      {history.map((entry) => (
                        <div key={entry.id} className="ox-rise">
                          <p className="text-primary">$ {entry.label}</p>
                          {entry.lines.map((line) => <p key={line} className="text-muted-foreground">{line}</p>)}
                        </div>
                      ))}
                      {typing && <p className="ox-caret text-primary" />}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {available.map((command) => {
                        const locked = command.id === "report" && !reportUnlocked;
                        return (
                          <button key={command.id} onClick={() => runCommand(command)} disabled={locked || typing} className={`ox-glass rounded-full px-3.5 py-2 font-mono text-[11px] transition ${locked ? "cursor-not-allowed text-muted-foreground/50" : "text-primary hover:border-primary/50"}`}>
                            <Terminal className="mr-2 inline size-3" />{command.label}{locked ? " · locked" : ""}
                          </button>
                        );
                      })}
                    </div>
                    {findings.filter((id) => id !== "report").length > 0 && (
                      <div className="mt-4 rounded-md border border-success/30 bg-success/5 p-3 font-mono text-[11px] text-success">
                        {[...new Set(commands.filter((c) => c.finding && findings.includes(c.id)).map((c) => c.finding!))].map((finding) => <p key={finding} className="flex gap-2"><Check className="mt-0.5 size-3 shrink-0" />{finding}</p>)}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setLesson((value) => Math.max(0, value - 1))} disabled={lesson === 0} className="font-mono text-xs text-muted-foreground transition hover:text-primary disabled:opacity-30">← back</button>
                  <button onClick={() => setLesson((value) => Math.min(3, value + 1))} className="ox-primary-button group inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold">
                    {lesson === 2 ? "open the debrief" : "next lesson"} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="ox-rise mt-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1.5 font-mono text-[10px] uppercase text-success">
                  <ShieldCheck className="size-3.5" /> module complete
                </div>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">You just worked like a recon analyst.</h3>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  You scoped a target, mapped its services, collected findings, and wrote them up — the exact loop every track at Oxbridge builds on. The full foundation track takes this further: scanning methodology, web basics, and your first graded lab.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[["Scope & ethics", "done"], ["Hands-on lab", "done"], ["Draft report", "done"]].map(([label, state]) => (
                    <div key={label} className="rounded-md border border-border bg-secondary/40 p-3 font-mono text-[10px]">
                      <p className="text-foreground">{label}</p><p className="mt-1 text-success">✓ {state}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a href="#enroll" onClick={onClose} className="ox-primary-button group inline-flex items-center gap-2 rounded-md px-6 py-3 font-semibold">continue with cohort 08 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
                  <button onClick={onClose} className="font-mono text-sm text-muted-foreground transition hover:text-primary">replay module <ChevronDown className="inline size-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
