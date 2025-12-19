import Container from "@/app/ui/container/Container";
import { ShieldCheck, Scale, ChevronRight } from "lucide-react";
import s from "./aboutCredentials.module.css";

const CERTS = [
  { label: "Pojištění (životní a neživotní)", href: "/pojisteni-cert.pdf" },
  {
    label: "Doplňkové penzijní spoření (III. pilíř)",
    href: "/penzijko-cert.pdf",
  },
  { label: "Investice", href: "/investice-cert.pdf" },
  { label: "Úvěry", href: "/uvery-cert.pdf" },
] as const;

const AboutCredentials = () => {
  return (
    <section className={s.section} id="opravneni">
        <div className={`${s.card} reveal`}>
          <div className={s.titleRow}>
            <span className={s.titleAccent} aria-hidden />
            <p className={s.kicker}>Odborné oprávnění a právní informace</p>
            <ShieldCheck className={s.titleCheck} aria-hidden />
          </div>
          <p className={s.lead}>
            Jsem vázaný zástupce registrovaný u České národní banky a působím v rámci
            oprávnění samostatného zprostředkovatele SAB servis s.r.o. Podrobnější informace{" "}
            <a href="/pravni-informace" target="_blank" rel="noreferrer">
              najdete zde
            </a>
            .
          </p>
          <div className={s.subTitleRow}>
            <span className={s.titleAccent} aria-hidden />
            <p className={s.subTitle}>Certifikáty</p>
          </div>
          <ul className={s.list}>
            {CERTS.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <span>{item.label}</span>
                  <span className={s.badge}>PDF</span>
                  <ChevronRight className={s.chevron} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <div className={s.subTitleRow}>
            <span className={s.titleAccent} aria-hidden />
            <p className={s.subTitle}>Právní informace</p>
          </div>
          <div className={s.footerLink}>
            <a href="/pravni-informace" target="_blank">
              <span>Právní informace</span>
              <Scale className={s.scaleIcon} aria-hidden />
              <ChevronRight className={s.chevron} aria-hidden />
            </a>
          </div>
        </div>
    </section>
  );
};

export default AboutCredentials;
