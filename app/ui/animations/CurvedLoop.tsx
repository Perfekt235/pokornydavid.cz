"use client";

import { useRef, useEffect, useState, useMemo, useId } from "react";
import s from "./curvedLoop.module.css";

type CurvedLoopProps = {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
};

const CurvedLoop = ({
  marqueeText = "",
  speed = 2,
  className = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
}: CurvedLoopProps) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);

  const [spacing, setSpacing] = useState(0);
  const offsetRef = useRef(0);

  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  const ready = spacing > 0;

  // měření délky textu
  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text]);

  // nastavíme počáteční offset
  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    const initial = -spacing;
    offsetRef.current = initial;
    textPathRef.current.setAttribute("startOffset", initial + "px");
  }, [spacing]);

  // animace
  useEffect(() => {
    if (!spacing || !ready) return;

    let frame = 0;

    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;

        let newOffset = offsetRef.current + delta;
        const wrap = spacing;

        if (newOffset <= -wrap) newOffset += wrap;
        if (newOffset > 0) newOffset -= wrap;

        offsetRef.current = newOffset;
        textPathRef.current.setAttribute("startOffset", newOffset + "px");
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  // drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;

    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    let newOffset = offsetRef.current + dx;
    const wrap = spacing;

    if (newOffset <= -wrap) newOffset += wrap;
    if (newOffset > 0) newOffset -= wrap;

    offsetRef.current = newOffset;
    textPathRef.current.setAttribute("startOffset", newOffset + "px");
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  return (
    <div
      className={s.curvedLoopJacket}
      style={{ visibility: ready ? "visible" : "hidden" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className={s.curvedLoopSvg} viewBox="0 0 1440 120">
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {spacing > 0 && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              {Array(Math.ceil(1800 / spacing) + 2)
                .fill(text)
                .join("")}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
