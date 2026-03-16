"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Wallet,
  UserX,
  Clock,
  Flower2,
  Heart,
  Scale,
  Home,
  Building,
  Ribbon,
  Info,
  Phone,
  Mail,
} from "lucide-react";
import type { Plan } from "@/lib/plans";
import { SITE } from "@/lib/constants";
import { OtherPlans } from "@/components/OtherPlans";
import { getOtherPlans } from "@/lib/plans";

const iconMap: Record<string, React.ElementType> = {
  wallet: Wallet,
  "users-off": UserX,
  clock: Clock,
  flower: Flower2,
  heart: Heart,
  scale: Scale,
  home: Home,
  building: Building,
  ribbon: Ribbon,
};

/* ── Inline CTA (電話+フォーム 2ボタン) ── */
function InlineCta({ label }: { label: string }) {
  return (
    <div className="text-center">
      <p className="text-sm text-ink-secondary mb-5" style={{ fontFamily: "var(--font-serif)" }}>{label}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
        <a
          href={SITE.phoneTel}
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 text-white font-bold text-xl rounded-sm transition-colors shadow-xl"
          style={{ backgroundColor: "#D94F04" }}
        >
          <Phone className="w-6 h-6" />
          {SITE.phone}
        </a>
        <a
          href={SITE.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 font-bold text-lg rounded-sm transition-colors shadow-xl text-white"
          style={{ backgroundColor: "#2E7D32" }}
        >
          <Mail className="w-5 h-5" />
          お問い合わせ
        </a>
      </div>
      <p className="text-xs mt-4 text-ink-muted">24時間365日対応・相談無料</p>
    </div>
  );
}

/* ── Section Title ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 text-center">
      <h2
        className="text-2xl sm:text-3xl font-bold tracking-widest text-ink"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ── Accordion ── */
function Accordion({
  title,
  children,
  accentColor,
}: {
  title: string;
  children: React.ReactNode;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border-light overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-3 px-5 py-5 bg-surface hover:bg-base-warm transition-colors"
      >
        <span
          className="text-base sm:text-lg font-bold text-ink text-center"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: accentColor }}
        />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-4 pt-2 bg-surface">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Feathered Image: gradient mask on edges ── */
function FeatheredImage({
  src,
  alt,
  direction = "bottom",
  className = "",
}: {
  src: string;
  alt: string;
  direction?: "bottom" | "top" | "both" | "left" | "right" | "radial";
  className?: string;
}) {
  const maskMap: Record<string, string> = {
    bottom: "linear-gradient(to bottom, black 40%, transparent 100%)",
    top: "linear-gradient(to top, black 40%, transparent 100%)",
    both: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
    left: "linear-gradient(to left, black 50%, transparent 100%)",
    right: "linear-gradient(to right, black 50%, transparent 100%)",
    radial: "radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)",
  };
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          WebkitMaskImage: maskMap[direction],
          maskImage: maskMap[direction],
        }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export function PlanDetail({ plan }: { plan: Plan }) {
  const otherPlans = getOtherPlans(plan.slug);
  const t = plan.theme;

  return (
    <>
      {/* ============ HERO / FV ============ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 15% 50%, ${t.main}12 0%, transparent 70%),
              radial-gradient(ellipse 100% 100% at 85% 20%, ${t.main}08 0%, transparent 60%),
              radial-gradient(ellipse 80% 120% at 50% 90%, ${t.main}06 0%, transparent 50%),
              linear-gradient(160deg, ${t.light} 0%, #FFFFFF 40%, ${t.light} 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, ${t.dark} 0px, ${t.dark} 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(-45deg, ${t.dark} 0px, ${t.dark} 1px, transparent 1px, transparent 24px)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              radial-gradient(circle 80px at 20% 30%, ${t.main}, transparent),
              radial-gradient(circle 120px at 75% 70%, ${t.main}, transparent),
              radial-gradient(circle 60px at 60% 15%, ${t.main}, transparent)
            `,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: `linear-gradient(90deg, ${t.main}, ${t.main}88, ${t.main})` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="flex justify-center order-1">
              <div className="relative w-[320px] sm:w-[440px] aspect-square drop-shadow-2xl">
                <Image
                  src={plan.fvImage}
                  alt={`${plan.title} プラン概要`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 320px, 440px"
                />
              </div>
            </div>
            <div className="flex justify-center order-2">
              <div className="relative w-full max-w-[480px] aspect-[4/3] overflow-hidden shadow-2xl">
                <Image
                  src={plan.heroImage}
                  alt={`${plan.title}のイメージ`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1
                    className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-wide"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {plan.title}
                  </h1>
                  <p className="text-white/80 text-sm mt-2 leading-relaxed">{plan.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA 1 ============ */}
      <section className="py-10" style={{ backgroundColor: t.light }}>
        <InlineCta label="まずはお気軽にご相談ください" />
      </section>

      {/* ============ Visual strip: 祭壇+スタッフ (feathered & blended) ============ */}
      <section className="relative h-[280px] sm:h-[360px] overflow-hidden bg-base">
        {/* Left: altar image with right-side feather */}
        <FeatheredImage
          src="/images/祭壇（黄色）_4.JPG"
          alt="生花祭壇"
          direction="right"
          className="absolute inset-0 w-[60%] h-full"
        />
        {/* Right: staff image with left-side feather, overlapping */}
        <FeatheredImage
          src="/images/葬儀屋スタッフ_10.JPG"
          alt="スタッフの対応"
          direction="left"
          className="absolute top-0 right-0 w-[55%] h-full"
        />
        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
      </section>

      {/* ============ SECTION: こんな方におすすめ ============ */}
      <section className="bg-surface py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>こんな方におすすめ</SectionTitle>
          <div className="grid sm:grid-cols-3 gap-6">
            {plan.targets.map((tgt) => {
              const Icon = iconMap[tgt.icon] || Heart;
              return (
                <div
                  key={tgt.text}
                  className="flex flex-col items-center text-center px-4 py-8 bg-surface border border-border-light"
                >
                  <Icon className="w-10 h-10 mb-4" style={{ color: t.main }} />
                  <span
                    className="text-base font-bold leading-relaxed text-ink"
                    style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                  >
                    {tgt.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTION: プランの特徴 (with overlapping images) ============ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>プランの特徴</SectionTitle>

          {/* Overlapping image composition */}
          <div className="relative mb-12">
            <div className="grid sm:grid-cols-5 gap-0 items-stretch">
              {/* Main image: 3 cols, with bottom feather */}
              <div className="sm:col-span-3 relative aspect-[4/3] overflow-hidden">
                <Image
                  src={plan.image}
                  alt={`${plan.title}のイメージ`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 60vw"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  }}
                />
              </div>
              {/* Side image: 2 cols, overlapping left with feather */}
              <div className="sm:col-span-2 relative aspect-[3/4] sm:aspect-auto sm:-ml-12 mt-4 sm:mt-8 overflow-hidden">
                <Image
                  src="/images/祭壇（黄色）_25.JPG"
                  alt="祭壇のイメージ"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{
                    WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)",
                    maskImage: "linear-gradient(to left, black 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center mb-10">
            <p
              className="text-base text-ink-secondary leading-[2.0]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {plan.longDescription}
            </p>
          </div>

          <div className="border-l-4 px-6 py-6 bg-surface shadow-sm" style={{ borderColor: t.main }}>
            <h3
              className="text-base font-bold text-ink mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              なぜこの価格でご提供できるのか
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">{plan.whyThisPrice}</p>
          </div>

          <div className="mt-5 text-xs text-ink-muted bg-base-warm px-5 py-4 flex items-start gap-2 border border-border-light">
            <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: t.main }} />
            <span className="leading-relaxed">
              <strong>火葬料金は全プラン別途費用</strong>となります。地域・自治体により金額が異なるため、事前にお見積りをご提示し、ご納得いただいてから進めます。
            </span>
          </div>
        </div>
      </section>

      {/* ============ CTA 2 ============ */}
      <section className="py-10" style={{ backgroundColor: t.light }}>
        <InlineCta label="お見積り・ご相談は無料です" />
      </section>

      {/* ============ SECTION: プランに含まれるもの ============ */}
      <section className="bg-surface py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>プランに含まれるもの</SectionTitle>
          <div className="space-y-2">
            {plan.includes.map((group) => (
              <Accordion key={group.category} title={group.category} accentColor={t.main}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-base-cool px-4 py-3 border border-border-light"
                    >
                      <Check className="w-4 h-4 shrink-0" style={{ color: t.main }} />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            ))}
          </div>
          {plan.notIncluded.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-base font-bold text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                別途費用が必要なもの
              </h3>
              <div className="flex flex-wrap gap-3">
                {plan.notIncluded.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm px-5 py-3 bg-base-warm border border-border-light"
                    style={{ color: "#333" }}
                  >
                    <X className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA 3 ============ */}
      <section className="py-10" style={{ backgroundColor: t.light }}>
        <InlineCta label="含まれるものについてのご質問も承ります" />
      </section>

      {/* ============ Consultation visual (radial feather) ============ */}
      <section className="relative h-[240px] sm:h-[320px] overflow-hidden" style={{ backgroundColor: t.light }}>
        <div className="absolute inset-0">
          <Image
            src="/images/商談シーン_34.JPG"
            alt="ご相談の様子"
            fill
            className="object-cover object-top"
            sizes="100vw"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 90% 80% at center, black 20%, transparent 75%)",
              maskImage: "radial-gradient(ellipse 90% 80% at center, black 20%, transparent 75%)",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-lg sm:text-xl font-bold text-ink/80 bg-white/60 backdrop-blur-sm px-8 py-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            丁寧なご相談からはじまります
          </p>
        </div>
      </section>

      {/* ============ SECTION: ご葬儀の流れ ============ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>ご葬儀の流れ</SectionTitle>
          <div className="space-y-0">
            {plan.flow.map((f, i) => (
              <div key={f.step} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 text-white flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: t.main }}
                  >
                    {f.step}
                  </div>
                  {i < plan.flow.length - 1 && (
                    <div className="w-px flex-1 min-h-[48px]" style={{ backgroundColor: `${t.main}33` }} />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Altar full-width visual (top & bottom feather) ============ */}
      <section className="relative h-[200px] sm:h-[300px] overflow-hidden bg-surface">
        <FeatheredImage
          src="/images/祭壇（黄色）_32.JPG"
          alt="祭壇の様子"
          direction="both"
          className="absolute inset-0 w-full h-full"
        />
      </section>

      {/* ============ SECTION: よくあるご質問 ============ */}
      <section className="bg-surface py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>よくあるご質問</SectionTitle>
          <div className="divide-y divide-border">
            {plan.faq.map((item) => (
              <div key={item.q} className="py-6">
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="text-sm font-bold text-white w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: t.main }}
                  >
                    Q
                  </span>
                  <span
                    className="text-base font-bold leading-relaxed pt-0.5"
                    style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                  >
                    {item.q}
                  </span>
                </div>
                <div className="flex items-start gap-3 ml-11">
                  <span className="text-sm leading-[1.9]" style={{ color: "#333333" }}>
                    {item.a}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA 4 ============ */}
      <section className="py-10" style={{ backgroundColor: t.light }}>
        <InlineCta label="ご質問だけでもお気軽にどうぞ" />
      </section>

      {/* ============ Staff + model blended visual ============ */}
      <section className="relative h-[220px] sm:h-[280px] overflow-hidden bg-base">
        {/* Staff image with radial feather */}
        <div className="absolute inset-0">
          <Image
            src="/images/モデル切り抜き_4.JPG"
            alt="スタッフ"
            fill
            className="object-cover object-top"
            sizes="100vw"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
            }}
          />
        </div>
        {/* Color overlay for soft blend */}
        <div className="absolute inset-0" style={{ backgroundColor: `${t.light}44`, mixBlendMode: "soft-light" }} />
      </section>

      {/* ============ SECTION: ご留意事項 ============ */}
      <section className="bg-base-warm py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-ink-muted" />
            <h3 className="text-xs font-semibold text-ink-muted">ご留意事項</h3>
          </div>
          <ul className="space-y-1.5">
            {plan.notes.map((note) => (
              <li
                key={note}
                className="text-[11px] text-ink-muted leading-relaxed pl-3 relative before:content-['※'] before:absolute before:left-0 before:text-ink-muted"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CTA 5 ============ */}
      <section className="py-14" style={{ backgroundColor: t.light }}>
        <InlineCta label="まずはお気軽にご相談ください" />
      </section>

      {/* ============ LP Banner ============ */}
      <section className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Image src="/images/logo.png" alt="ファーストリーフ" width={120} height={120} className="mx-auto mb-4" />
          <p className="text-sm text-ink-secondary mb-5">斎場案内・会社概要・トータルサポートなど詳しい情報はこちら</p>
          <a
            href={SITE.lpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 px-8 py-3 text-sm font-bold tracking-wide transition-colors hover:text-white"
            style={{ borderColor: t.main, color: t.main }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = t.main;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = t.main;
            }}
          >
            ファーストリーフについて
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ============ Other plans ============ */}
      <OtherPlans plans={otherPlans} />
    </>
  );
}
