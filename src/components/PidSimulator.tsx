"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Zap } from "lucide-react";
import { ui, type Locale } from "@/lib/i18n";

/*
  One gimbal axis, linearised around level:
    θ'' = a·sin θ − c·θ' + u + d
  The platform's offset centre of mass (a > 0) makes it fall without control.
  u comes from a PID on the angle error. Illustrative constants only.
*/
const A = 2.5;
const C = 0.6;
const LIMIT = (40 * Math.PI) / 180;
const U_MAX = 40;
const DT = 1 / 240;
const HISTORY_S = 6;
const SAMPLE_HZ = 30;
const N = HISTORY_S * SAMPLE_HZ;

const DEFAULTS = { kp: 18, ki: 3, kd: 3 };

export function PidSimulator({ locale }: { locale: Locale }) {
  const t = ui[locale].pid;

  const [gains, setGains] = useState(DEFAULTS);
  const [enabled, setEnabled] = useState(true);

  const sim = useRef({ theta: 0.35, omega: 0, integ: 0, acc: 0, sampleAcc: 0 });
  const history = useRef<number[]>(Array(N).fill(0));
  const gainsRef = useRef(gains);
  const enabledRef = useRef(enabled);
  gainsRef.current = gains;
  enabledRef.current = enabled;

  const platformRef = useRef<SVGGElement>(null);
  const traceRef = useRef<SVGPolylineElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  const disturb = useCallback((strength = 2.6) => {
    const s = sim.current;
    s.omega += (Math.random() > 0.5 ? 1 : -1) * strength * (0.8 + Math.random() * 0.4);
  }, []);

  const reset = useCallback(() => {
    sim.current = { theta: 0.35, omega: 0, integ: 0, acc: 0, sampleAcc: 0 };
    history.current = Array(N).fill(0);
    setGains(DEFAULTS);
    setEnabled(true);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);

    let raf = 0;
    let last = performance.now();
    let idle = 0;

    const step = () => {
      const s = sim.current;
      const g = gainsRef.current;
      const err = -s.theta;
      let u = 0;
      if (enabledRef.current) {
        s.integ = Math.max(-2, Math.min(2, s.integ + err * DT));
        u = g.kp * err + g.ki * s.integ - g.kd * s.omega;
        u = Math.max(-U_MAX, Math.min(U_MAX, u));
      } else {
        s.integ = 0;
      }
      const alpha = A * Math.sin(s.theta) - C * s.omega + u;
      s.omega += alpha * DT;
      s.theta += s.omega * DT;
      if (s.theta > LIMIT || s.theta < -LIMIT) {
        s.theta = Math.max(-LIMIT, Math.min(LIMIT, s.theta));
        s.omega = 0;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible.current) {
        const s = sim.current;
        s.acc += dt;
        while (s.acc >= DT) {
          step();
          s.acc -= DT;
        }
        s.sampleAcc += dt;
        while (s.sampleAcc >= 1 / SAMPLE_HZ) {
          history.current.push(-s.theta);
          history.current.shift();
          s.sampleAcc -= 1 / SAMPLE_HZ;
        }

        // Keep the model alive: a gentle disturbance when it has settled for a while.
        if (!reduce) {
          idle = Math.abs(s.theta) < 0.01 && Math.abs(s.omega) < 0.02 ? idle + dt : 0;
          if (idle > 4.5) {
            disturb(1.8);
            idle = 0;
          }
        }

        const deg = (s.theta * 180) / Math.PI;
        platformRef.current?.setAttribute("transform", `rotate(${deg.toFixed(2)})`);
        if (readoutRef.current) readoutRef.current.textContent = `${deg >= 0 ? "+" : "−"}${Math.abs(deg).toFixed(1)}°`;
        if (traceRef.current) {
          const h = history.current;
          let pts = "";
          for (let i = 0; i < N; i++) {
            const x = (i / (N - 1)) * 300;
            const y = 60 - (h[i] / LIMIT) * 54;
            pts += `${x.toFixed(1)},${y.toFixed(1)} `;
          }
          traceRef.current.setAttribute("points", pts);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [disturb]);

  const slider = (key: keyof typeof DEFAULTS, label: string, max: number) => (
    <label className="grid grid-cols-[2.25rem_1fr_2.75rem] items-center gap-3 text-[0.9375rem]">
      <span className="text-fg-muted">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        step={0.5}
        value={gains[key]}
        onChange={(e) => setGains((g) => ({ ...g, [key]: Number(e.target.value) }))}
        className="h-11 w-full cursor-pointer"
        aria-label={`${t.gains} ${label}`}
      />
      <span className="tabular text-right text-fg">{gains[key].toFixed(1)}</span>
    </label>
  );

  return (
    <div ref={rootRef} className="plate grid overflow-hidden rounded-[22px] md:grid-cols-[1.1fr_1fr]">
      {/* The axis */}
      <div className="relative flex min-h-[300px] items-center justify-center px-6 pb-4 pt-10 sm:min-h-[380px]">
        <p className="absolute left-6 top-6 text-[0.875rem] text-fg-subtle">
          {t.angle}{" "}
          <span ref={readoutRef} className="tabular ml-1 text-fg" aria-live="off">
            +20.1°
          </span>
        </p>
        <svg viewBox="-160 -120 320 240" className="w-full max-w-[420px]" aria-hidden focusable="false">
          {/* level reference */}
          <line x1="-150" y1="0" x2="150" y2="0" stroke="#2c3644" strokeDasharray="3 6" />
          {/* yoke */}
          <path d="M -96 -2 V 70 Q -96 86 -80 86 H 80 Q 96 86 96 70 V -2" fill="none" stroke="#3a4555" strokeWidth="6" strokeLinecap="round" />
          <rect x="-40" y="86" width="80" height="16" rx="5" fill="#222b37" />
          <rect x="-70" y="102" width="140" height="8" rx="4" fill="#1b232e" />
          {/* platform */}
          <g ref={platformRef} transform="rotate(20)">
            <rect x="-92" y="-7" width="184" height="14" rx="7" fill="#e9edf2" />
            <rect x="-34" y="-44" width="68" height="37" rx="7" fill="#1b232e" stroke="#3a4555" />
            <circle cx="0" cy="-25.5" r="11" fill="#0d1117" stroke="#4a5666" strokeWidth="2" />
            <rect x="52" y="-13" width="22" height="6" rx="2" fill="var(--color-live)" />
          </g>
          <circle r="7" fill="#0d1117" stroke="var(--color-live)" strokeWidth="2.5" />
          <text x="66" y="-22" fontSize="10" fill="var(--color-fg-subtle)">IMU</text>
        </svg>
      </div>

      {/* Readout and controls */}
      <div className="flex flex-col gap-6 border-t border-line p-6 sm:p-8 md:border-l md:border-t-0">
        <div>
          <p className="text-[0.875rem] text-fg-subtle">{t.error}</p>
          <svg viewBox="0 0 300 120" className="mt-3 w-full" aria-hidden focusable="false">
            <line x1="0" y1="60" x2="300" y2="60" stroke="#2c3644" />
            <line x1="0" y1="6" x2="300" y2="6" stroke="#1f2833" />
            <line x1="0" y1="114" x2="300" y2="114" stroke="#1f2833" />
            <polyline ref={traceRef} points="0,60 300,60" fill="none" stroke="var(--color-live)" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        <fieldset className="space-y-1">
          <legend className="mb-2 text-[0.875rem] text-fg-subtle">{t.gains}</legend>
          {slider("kp", "Kp", 40)}
          {slider("ki", "Ki", 10)}
          {slider("kd", "Kd", 10)}
        </fieldset>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => disturb()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 font-medium text-ink transition-transform duration-150 active:scale-[0.97]"
          >
            <Zap size={16} strokeWidth={1.75} aria-hidden />
            {t.disturb}
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((v) => !v)}
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line-strong px-4 text-[0.9375rem] text-fg transition-colors hover:bg-raised"
          >
            <span
              aria-hidden
              className={`relative block h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${enabled ? "bg-live-deep" : "bg-line-strong"}`}
            >
              <span
                className={`absolute left-0 top-0.5 h-4 w-4 rounded-full transition-transform duration-200 ease-[var(--ease-out-quart)] ${
                  enabled ? "translate-x-[18px] bg-live" : "translate-x-0.5 bg-fg-subtle"
                }`}
              />
            </span>
            {t.regulation} {enabled ? t.on : t.off}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label={t.reset}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-raised hover:text-fg"
          >
            <RotateCcw size={17} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
