"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Phone,
  LineChart,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./process.module.css";
import Container from "@/app/ui/container/Container";
import { Reveal } from "@/app/ui/animations/Reveal";
gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Úvodní konzultace",
    text: "Krátký úvodní hovor, kde si ujasníme, co aktuálně řešíte a co od spolupráce očekáváte. Bez závazků a bez tlaku na konkrétní řešení.",
    icon: Phone,
  },
  {
    title: "Analýza financí",
    text: "Podíváme se na příjmy, výdaje, rezervy a existující smlouvy. Cílem není složitý report, ale pochopení reality a jasný obraz celé situace.",
    icon: LineChart,
  },
  {
    title: "Návrh řešení",
    text: "Na základě analýzy připravím konkrétní plán. Vysvětlím souvislosti, varianty a dopady, abyste se mohli rozhodovat s klidem.",
    icon: Sparkles,
  },
  {
    title: "Úpravy a doporučení",
    text: "Návrh společně projdeme, doladíme a případně upravíme. Cílem je řešení, které je pochopitelné, proveditelné a dává vám smysl.",
    icon: SlidersHorizontal,
  },
  {
    title: "Dlouhodobá péče",
    text: "Spolupráce nekončí podpisem. Průběžně hlídáme, aby plán odpovídal vašemu životu a reagoval na změny, když nastanou.",
    icon: ShieldCheck,
  },
] as const;

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current;
      const rail = railFillRef.current;
      if (!steps || !rail) return;

      const points = gsap.utils.toArray<HTMLElement>(`.${s.stepNumber}`, steps);
      const bodies = gsap.utils.toArray<HTMLElement>(`.${s.stepBody}`, steps);

      // INIT
      gsap.set(rail, { scaleY: 0, transformOrigin: "top" });
      gsap.set(points, { scale: 0 });
      gsap.set(bodies, { y: 28, autoAlpha: 0 });

      const stepDuration = 1;
      const totalDuration = points.length * stepDuration;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: steps,
          start: "top 65%",
          end: () => `+=${Math.max(steps.scrollHeight, window.innerHeight)}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // RAIL
      tl.to(
        rail,
        {
          scaleY: 1,
          ease: "none",
          duration: totalDuration,
        },
        0
      );

      // STEPS
      points.forEach((point, i) => {
        const body = bodies[i];
        const t = i * stepDuration;

        tl.to(
          point,
          {
            scale: 1,
            ease: "back.out(1.6)",
            duration: 0.6,
          },
          t
        );

        if (body) {
          tl.to(
            body,
            {
              y: 0,
              autoAlpha: 1,
              ease: "power2.out",
              duration: 0.6,
            },
            t + 0.15
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={s.processTimeline} ref={sectionRef}>
      <Container className={s.inner}>
        <Reveal from="bottom">
          <div className={s.header}>
            <div className={s.headline}>
              <p className={s.eyebrow}>Jak probíhá spolupráce</p>
              <h2>Jednoduchý proces, který dává smysl.</h2>
              <p>Postupně si projdeme, co řešíme a jaký je další krok.</p>
            </div>
          </div>
        </Reveal>

        <div className={s.timelineArea}>
          <div className={s.steps} ref={stepsRef}>
            <div className={s.rail} aria-hidden>
              <div className={s.railTrack} />
              <div className={s.railFill} ref={railFillRef} />
            </div>

            {STEPS.map((step, idx) => (
              <div className={s.step} key={step.title}>
                <div className={s.railColumn}>
                  <div className={s.marker}>
                    <div className={s.stepNumber}>
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <div
                  className={`${s.stepBody} ${
                    idx % 2 === 0 ? s.stepBodyLeft : s.stepBodyRight
                  }`}
                >
                  <div className={s.stepHeader}>
                    <h3>{step.title}</h3>
                  </div>
                  <p className={s.copy}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
