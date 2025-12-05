"use client";

import { useEffect, useState } from "react";

import Nav from "./components/nav/Nav";
import Hero from "./components/sections/hero/Hero";
import About from "./components/sections/about/About";
import Services from "./components/sections/services/Services";
import Process from "./components/sections/process/Process";
import Testimonials from "./components/sections/testimonials/Testimonials";
import FAQ from "./components/sections/faq/FAQ";
import FastGuide from "./components/sections/fastGuide/FastGuide";
import LeadForm from "./components/sections/leadForm/LeadForm";
import Footer from "./components/sections/footer/Footer";
import { heroVariants } from "./content/heroVariants";
import s from "./page.module.css";
import TrustBar from "./ui/trustBar/TrustBar";
const SECTION_KEYS = [
  "hero",
  "about",
  "testimonials",
  "services",
  "process",
  "faq",
  "fast-guide",
  "lead-form",
] as const;

export default function Page() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2;
      let currentKey: string | null = null;

      for (const key of SECTION_KEYS) {
        const el = document.getElementById(key);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          currentKey = key;
          break;
        }
      }

      if (currentKey && currentKey !== activeSection) {
        setActiveSection(currentKey);
        console.log("[Page] activeSection:", currentKey);
      }
    };

    handleScroll(); // initial state

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeSection]);

  return (
    <>
      <Nav />
      <main>
        <section id="hero" data-section-key="hero">
          <Hero variants={heroVariants} activeSession={activeSection} />
        </section>

        <section id="about" data-section-key="about">
          <About />
        </section>

        <section id="testimonials" data-section-key="testimonials">
          <Testimonials />
        </section>

        <section id="services" data-section-key="services">
          <Services />
        </section>

        <section id="process" data-section-key="process">
          <Process />
        </section>

        <section id="faq" data-section-key="faq">
          <FAQ />
        </section>

        <section id="fast-guide" data-section-key="fast-guide">
          <FastGuide />
        </section>

        <section id="lead-form" data-section-key="lead-form">
          <LeadForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
