"use client";
import { useState } from "react";
import s from "./hero.module.css";
import Button from "@/app/ui/cta/Button";
import {
  ChevronRight,
  PhoneCall,
  ShieldCheck,
  Home,
  Lock,
  ShieldAlert,
  User2,
  HeartHandshake,
  Workflow,
  Quote,
  Play,
} from "lucide-react";
import GradientText from "@/app/ui/animations/GradientText";
import LogoMark from "@/app/svgr/LogoMark";

export type HeroContent = {
  eyebrow: string;
  title: {
    line1: string;
    line2: string;
    highlight?: string;
  };
  description: string;
  cta: {
    primary: { label: string; href?: string };
    secondary?: { label: string; href?: string };
  };
};

type HeroProps = {
  variants: HeroContent[];
  activeSession: string;
};

const Hero = ({ variants, activeSession }: HeroProps) => {
  const [index, setIndex] = useState(6);
  const content = variants[index];

  const { line1, line2, highlight } = content.title;
  const hasHighlight = highlight && line1.includes(highlight);
  const [before, after] = hasHighlight ? line1.split(highlight) : [line1, ""];

  const next = () => setIndex((i) => (i + 1) % variants.length);
  const prev = () =>
    setIndex((i) => (i - 1 + variants.length) % variants.length);

  return (
    <section className={s.heroCont}>
      <div className={s.bgLayer} />
      <div className={s.heroNoise} />

      <div className={s.heroInner}>
        <div className={s.heroGlass} />

        <p className={s.eyebrow}>{content.eyebrow}</p>

        <h1 className={s.title}>
          <span className={s.titleLine}>
            {hasHighlight ? (
              <>
                {before}
                <GradientText
                  gradientVar="--text-gradient-hero"
                  className={s.highlight}
                  animationSpeed={1}
                >
                  {highlight}
                </GradientText>
                {after}
              </>
            ) : (
              line1
            )}
          </span>
          <span className={s.titleLine}>{line2}</span>
        </h1>

        <p className={s.description}>{content.description}</p>

        <div className={s.actions}>
          <Button
            variant="cta"
            label={content.cta.primary.label}
            href={content.cta.primary.href}
            iconRight={<PhoneCall style={{ color: "var(--brand-dark)" }} />}
            size="md"
            className={s.heroCta}
          />
          <div className={s.playCont}>
            <Play />
          </div>
        </div>

        {/* 🔥 NOVÝ BOTTOM STRIP – elegantně posazený na dně hero */}
      </div>

      <div className={s.serviceStrip}>
        <div className={s.serviceItem}>
          <Home className={s.serviceIcon} />
          Hypotéka & bydlení
        </div>
        <div className={s.serviceItem}>
          <ShieldCheck className={s.serviceIcon} />
          Zajištění příjmu
        </div>
        <div className={s.serviceItem}>
          <Lock className={s.serviceIcon} />
          Ochrana majetku
        </div>
        <div className={s.serviceItem}>
          <ShieldAlert className={s.serviceIcon} />
          Pojištění odpovědnosti
        </div>
      </div>
      <div className={s.topStrip}>
        <div className={s.leftBox}>
          <LogoMark />

          <div className={s.brandText}>
            <span className={s.name}>David Pokorný</span>
            <span className={s.role}>Finanční plánování</span>
          </div>
        </div>
        <div className={s.rightBox}>
          <a href="#about" className={s.topLink}>
            <User2 className={s.topIcon} />
            <span>Kdo jsem</span>
          </a>
          <a href="#help" className={s.topLink}>
            <HeartHandshake className={s.topIcon} />
            <span>S čím pomáhám</span>
          </a>
          <a href="#process" className={s.topLink}>
            <Workflow className={s.topIcon} />
            <span>Jak pracuji</span>
          </a>
          <a href="#testimonials" className={s.topLink}>
            <Quote className={s.topIcon} />
            <span>Reference</span>
          </a>
        </div>
      </div>

      {/* switcher */}
      {/* <div className={s.variantSwitcher}>
        <button onClick={prev}>←</button>
        <span>{index + 1} / {variants.length}</span>
        <button onClick={next}>→</button>
      </div> */}
    </section>
  );
};

export default Hero;
