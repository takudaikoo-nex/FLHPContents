import { SITE } from "@/lib/constants";
import { PhoneIcon } from "@/components/PhoneIcon";

export function GmbFooter() {
  return (
    <footer className="bg-dark text-dark-text py-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-9 bg-main flex items-center justify-center text-white text-base font-bold">
            一
          </div>
          <div className="text-left">
            <div className="text-sm font-bold tracking-wider text-ink-inverse">
              ファーストリーフ
            </div>
            <div className="text-[9px] tracking-[0.12em] text-dark-text opacity-60 uppercase">
              FIRST LEAF Inc.
            </div>
          </div>
        </div>
        <div className="text-xs text-dark-text opacity-60 mb-2">
          {SITE.phoneLabel}
        </div>
        <a
          href={SITE.phoneTel}
          className="inline-flex items-center gap-2 text-xl font-semibold text-cta-light tracking-wide hover:text-cta transition-colors"
        >
          <PhoneIcon className="w-5 h-5" />
          {SITE.phone}
        </a>
        <p className="text-xs text-dark-text opacity-40 mt-6">
          {SITE.address}
        </p>
        <p className="text-[10px] text-dark-text opacity-30 mt-2 tracking-wider">
          &copy; 2025 {SITE.nameEn} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
