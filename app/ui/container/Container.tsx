// src/app/ui/container/Container.tsx
import type { HTMLAttributes, PropsWithChildren, CSSProperties } from "react";
import s from "./container.module.css";

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  fullHeight?: boolean;
  maxWidth?: number | string; // px / % / rem / cokoliv
};

const Container = ({
  children,
  className = "",
  fullHeight,
  maxWidth,
  style,
  ...rest
}: ContainerProps) => {
  const mergedStyle: CSSProperties = {
    ...style,
    ...(maxWidth !== undefined && {
      maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    }),
  };

  return (
    <div
      className={`${s.container} ${fullHeight ? s.fullHeight : ""} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;