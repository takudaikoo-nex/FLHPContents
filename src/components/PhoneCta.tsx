import { SITE } from "@/lib/constants";
import { PhoneIcon } from "@/components/PhoneIcon";

interface PhoneCtaProps {
  label?: string;
  dark?: boolean;
  className?: string;
}

export function PhoneCta({
  label = "このプランについて相談する",
  dark = false,
  className = "",
}: PhoneCtaProps) {
  return (
    <div className={`text-center ${className}`}>
      <a
        href={SITE.phoneTel}
        className="inline-flex items-center justify-center gap-2 bg-cta text-white rounded-pill px-8 py-4 text-sm font-bold tracking-wide hover:bg-cta-hover transition-colors shadow-md"
      >
        <PhoneIcon className="w-5 h-5" />
        {label}
      </a>
      <div
        className={`mt-2 text-xs ${dark ? "text-dark-text opacity-60" : "text-ink-muted"}`}
      >
        <span className="font-semibold">{SITE.phone}</span>
        <span className="ml-2">{SITE.phoneLabel}</span>
      </div>
    </div>
  );
}
