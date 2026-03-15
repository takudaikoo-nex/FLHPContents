"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";
import { PhoneIcon } from "@/components/PhoneIcon";
import { Mail } from "lucide-react";

export function SpFixedCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={SITE.phoneTel}
        className="flex-1 flex items-center justify-center gap-2 bg-cta text-white py-4 font-bold tracking-wide text-sm"
      >
        <PhoneIcon className="w-5 h-5" />
        電話で相談
      </a>
      <a
        href={SITE.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-dark text-white py-4 font-bold tracking-wide text-sm border-l border-white/20"
      >
        <Mail className="w-5 h-5" />
        お問い合わせ
      </a>
    </div>
  );
}
