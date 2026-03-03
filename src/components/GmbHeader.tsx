import Link from "next/link";
import { SITE } from "@/lib/constants";
import { PhoneIcon } from "@/components/PhoneIcon";

export function GmbHeader() {
  return (
    <header className="bg-surface border-b border-border-light px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 bg-main flex items-center justify-center text-white text-base font-bold">
            一
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-ink">
              ファーストリーフ
            </div>
            <div className="text-[9px] tracking-[0.12em] text-ink-muted uppercase">
              FIRST LEAF Inc.
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={SITE.lpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 border border-main text-main px-3 py-2 text-[11px] font-semibold tracking-wide hover:bg-main hover:text-white transition-colors"
          >
            ファーストリーフについて
          </a>
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-2 bg-cta text-white rounded-pill px-4 py-2 text-xs font-semibold tracking-wide hover:bg-cta-hover transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{SITE.phone}</span>
            <span className="sm:hidden">電話する</span>
          </a>
        </div>
      </div>
    </header>
  );
}
