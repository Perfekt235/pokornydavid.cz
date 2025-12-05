import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import s from "./button.module.css";

type BaseProps = {
  children?: ReactNode;
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({
  label,
  children,
  iconLeft,
  iconRight,
  loading,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: ButtonProps) => {
  const content = (
    <>
      {loading && <span className={s.loader} />}
      {!loading && iconLeft && <span className={s.iconLeft}>{iconLeft}</span>}
      <span style={{zIndex: 999}}>{label || children}</span>
      {!loading && iconRight && <span className={s.iconRight}>{iconRight}</span>}
    </>
  );

  const classNames = `
    ${s.button}
    ${s[variant]}
    ${s[size]}
    ${loading ? s.loading : ""}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={classNames} {...(rest as any)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classNames} disabled={loading} {...(rest as any)}>
      {content}
    </button>
  );
};

export default Button;
