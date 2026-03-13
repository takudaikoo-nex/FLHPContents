import { SITE } from "@/lib/constants";
import { PhoneIcon } from "@/components/PhoneIcon";
import { Mail } from "lucide-react";

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
      <p
        className={`text-sm font-bold mb-4 ${dark ? "text-dark-text" : "text-ink"}`}
      >
        {label}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Phone button */}
        <a
          href={SITE.phoneTel}
          className="inline-flex items-center justify-center gap-2 bg-cta text-white rounded-pill px-8 py-4 text-sm font-bold tracking-wide hover:bg-cta-hover transition-colors shadow-md w-full sm:w-auto max-w-xs"
        >
          <PhoneIcon className="w-5 h-5" />
          電話で相談する
        </a>
        {/* Form button */}
        <a
          href={SITE.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 text-sm font-bold tracking-wide transition-colors shadow-md w-full sm:w-auto max-w-xs ${
            dark
              ? "border-2 border-white/40 text-white hover:bg-white/10"
              : "border-2 border-main text-main hover:bg-main hover:text-white"
          }`}
        >
          <Mail className="w-5 h-5" />
          メールで相談する
        </a>
      </div>
      <div
        className={`mt-3 text-xs ${dark ? "text-dark-text opacity-60" : "text-ink-muted"}`}
      >
        <span className="font-semibold">{SITE.phone}</span>
        <span className="ml-2">{SITE.phoneLabel}</span>
      </div>
    </div>
  );
}
