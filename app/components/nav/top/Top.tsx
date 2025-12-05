import s from "./top.module.css";
import Button from "@/app/ui/cta/Button";
import LogoMark from "@/app/svgr/LogoMark";
import { PhoneCall } from "lucide-react";

const Top = ({ hidden }: { hidden?: boolean }) => {
  return (
    <div className={`${s.innerCont} ${hidden ? s.navHidden : s.navVisible}`}>
      <LogoMark />
      <ul>
        <li>Úvod</li>
        <li>O mně</li>
        <li>Reference</li>
        <li>Jak pracuji</li>
        <li>S čím pomáhám</li>
      </ul>
      <Button variant="cta" iconRight={<PhoneCall style={{ left: 0}} />} className={s.navCTA}>
        Sjednat konzultaci
      </Button>
    </div>
  );
};

export default Top;
