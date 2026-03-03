"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";
import { PhoneIcon } from "@/components/PhoneIcon";

export function SpFixedCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={SITE.phoneTel}
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-cta text-white py-4 font-bold tracking-wide text-base lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <PhoneIcon className="w-5 h-5" />
      今すぐ電話で相談する
    </a>
  );
}
