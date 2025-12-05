"use client";

import { useEffect, useState } from "react";
import s from "./css/nav.module.css";
import Top from "./top/Top";
import Container from "@/app/ui/container/Container";

const Nav = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY;

      // mikro scroll neřešíme — snižuje to cukání
      if (Math.abs(diff) < 6) return;

      if (currentY < 100) {
        setIsHidden(false); // nahoře = vždy ukázat nav
      } else if (diff > 0) {
        setIsHidden(true); // scroll dolů = schovat
      } else {
        setIsHidden(false); // scroll nahoru = zobrazit
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={s.navCont}>
      <Container maxWidth={"100%"} style={{ padding: 0}}>
      <Top hidden={isHidden} />
      </Container>
    </nav>
  );
};

export default Nav;
