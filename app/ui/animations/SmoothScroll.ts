"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,   // jak moc je scroll měkký
      easing: (t) => 1 - Math.pow(1 - t, 3), 
      wheelMultiplier: 1,   // rychlost scroll kolečkem
      touchMultiplier: 1.5, // můžeš snížit/zesílit na mobilech
      orientation: "vertical",
      gestureOrientation: "vertical",
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}