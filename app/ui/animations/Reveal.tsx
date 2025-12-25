"use client";

import React, {
  useLayoutEffect,
  useCallback,
  useState,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealFrom = "bottom" | "top" | "left" | "right" | "fade";

type RenderProp = (args: {
  ref: (node: HTMLElement | null) => void;
}) => React.ReactElement;

type RevealProps<T extends ElementType = "div"> = {
  as?: T;

  /** podporuje JSX i legacy render-prop */
  children: ReactNode | RenderProp;

  from?: RevealFrom;
  delay?: number;
  duration?: number;
  once?: boolean;
  disabled?: boolean;

  start?: string;
  offset?: number;

  /** stagger podpora pro map() */
  index?: number;
  stagger?: number;

  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "ref" | "children" | "className">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  from = "bottom",
  delay = 0,
  duration = 1,
  once = true,
  disabled = false,
  start = "top 100%",
  offset = 120,
  index,
  stagger,
  className,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const [el, setEl] = useState<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    setEl(node);
  }, []);

  const computedDelay =
    typeof index === "number" && typeof stagger === "number"
      ? delay + index * stagger
      : delay;

  useLayoutEffect(() => {
    if (disabled || !el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, clearProps: "transform" });
      return;
    }

    const fromVars =
      from === "fade"
        ? {}
        : from === "bottom"
        ? { y: offset }
        : from === "top"
        ? { y: -offset }
        : from === "left"
        ? { x: -offset }
        : { x: offset };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, ...fromVars },
        {
          opacity: 1,
          x: 0,
          y: 0,
          delay: computedDelay,
          duration,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [
    el,
    from,
    computedDelay,
    duration,
    once,
    disabled,
    start,
    offset,
  ]);

  // ✅ legacy render-prop
  if (typeof children === "function") {
    return children({ ref: setRef });
  }

  // ✅ čistý režim
  return (
    <Tag ref={setRef} className={className} {...rest}>
      {children}
    </Tag>
  );
}
