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
function InlineCta({
  label,
  dark,
  accentColor,
}: {
  label: string;
  dark?: boolean;
  accentColor?: string;
}) {
  const bg = dark ? "bg-transparent" : "";
  const textColor = dark ? "text-white/70" : "text-ink-secondary";
  return (
    <div className={`${bg} text-center`}>
      <p className={`text-xs ${textColor} mb-4 font-serif`}>{label}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <a
          href={SITE.phoneTel}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-cta hover:bg-cta-hover text-white font-bold text-base rounded-sm transition-colors shadow-lg"
        >
          <Phone className="w-5 h-5" />
          {SITE.phone}
        </a>
        <a
          href={SITE.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 border-2 font-bold text-sm rounded-sm transition-colors"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.4)" : (accentColor || "#4A7C59"),
            color: dark ? "#fff" : (accentColor || "#4A7C59"),
          }}
        >
          <Mail className="w-4 h-4" />
          お問い合わせ
        </a>
      </div>
      <p className={`text-[10px] mt-3 ${dark ? "text-white/40" : "text-ink-muted"}`}>
        24時間365日対応・相談無料
      </p>
    </div>
  );
}

/* ── Section Title ── */
function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 pt-2 bg-surface">{children}</div>
        </div>
      </div>
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
        {/* Layered wallpaper background for transparent PNG product image */}
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
        {/* Refined geometric pattern (subtle diamond lattice) */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, ${t.dark} 0px, ${t.dark} 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(-45deg, ${t.dark} 0px, ${t.dark} 1px, transparent 1px, transparent 24px)
            `,
          }}
        />
        {/* Soft bokeh circles */}
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
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${t.main}, ${t.main}88, ${t.main})`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left: Transparent PNG product image (large, with price baked in) */}
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

            {/* Right: Hero atmosphere photo */}
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
                {/* Gradient overlay with plan title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1
                    className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-wide"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {plan.title}
                  </h1>
                  <p className="text-white/80 text-sm mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA 1 (FV直後) ============ */}
      <section
        className="py-8"
        style={{
          background: `linear-gradient(135deg, ${t.dark} 0%, ${t.dark}EE 100%)`,
        }}
      >
        <InlineCta label="まずはお気軽にご相談ください" dark accentColor={t.main} />
      </section>

      {/* ============ SECTION: こんな方におすすめ ============ */}
      <section className="bg-surface py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>
            こんな方におすすめ
          </SectionTitle>
          <div className="grid sm:grid-cols-3 gap-6">
            {plan.targets.map((tgt) => {
              const Icon = iconMap[tgt.icon] || Heart;
              return (
                <div
                  key={tgt.text}
                  className="flex flex-col items-center text-center px-4 py-8 bg-surface border border-border-light"
                >
                  <Icon
                    className="w-10 h-10 mb-4"
                    style={{ color: t.main }}
                  />
                  <span
                    className="text-base font-bold leading-relaxed"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {tgt.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTION: プランの特徴 ============ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>
            プランの特徴
          </SectionTitle>
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
              <Image
                src={plan.image}
                alt={`${plan.title}のイメージ`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p
                className="text-base text-ink-secondary leading-[2.0]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {plan.longDescription}
              </p>
            </div>
          </div>

          <div
            className="border-l-4 px-6 py-6 bg-surface shadow-sm"
            style={{ borderColor: t.main }}
          >
            <h3
              className="text-base font-bold text-ink mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              なぜこの価格でご提供できるのか
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {plan.whyThisPrice}
            </p>
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
      <section
        className="py-10"
        style={{
          background: `linear-gradient(135deg, ${t.dark} 0%, ${t.dark}DD 100%)`,
        }}
      >
        <InlineCta label="お見積り・ご相談は無料です" dark accentColor={t.main} />
      </section>

      {/* ============ SECTION: プランに含まれるもの ============ */}
      <section className="bg-surface py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>
            プランに含まれるもの
          </SectionTitle>
          <div className="space-y-2">
            {plan.includes.map((group) => (
              <Accordion
                key={group.category}
                title={group.category}
                accentColor={t.main}
              >
                <div className="grid sm:grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-base-cool px-4 py-3 border border-border-light"
                    >
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: t.main }}
                      />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            ))}
          </div>

          {plan.notIncluded.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-xs font-bold text-ink-muted tracking-wider mb-3">
                別途費用が必要なもの
              </h3>
              <div className="flex flex-wrap gap-2">
                {plan.notIncluded.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 text-xs px-3 py-2 bg-base-warm text-ink-muted border border-border-light"
                  >
                    <X className="w-3 h-3" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA 3 ============ */}
      <section
        className="py-8 border-y"
        style={{
          backgroundColor: t.light,
          borderColor: `${t.main}22`,
        }}
      >
        <InlineCta label="含まれるものについてのご質問も承ります" accentColor={t.main} />
      </section>

      {/* ============ SECTION: ご葬儀の流れ ============ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>
            ご葬儀の流れ
          </SectionTitle>
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
                    <div
                      className="w-px flex-1 min-h-[48px]"
                      style={{ backgroundColor: `${t.main}33` }}
                    />
                  )}
                </div>
                <div className="pb-10">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION: よくあるご質問 ============ */}
      <section className="bg-surface py-section border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle>
            よくあるご質問
          </SectionTitle>
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
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.q}
                  </span>
                </div>
                <div className="flex items-start gap-3 ml-11">
                  <span className="text-sm text-ink-secondary leading-[1.9]">
                    {item.a}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA 4 ============ */}
      <section
        className="py-10"
        style={{
          background: `linear-gradient(135deg, ${t.dark} 0%, ${t.dark}DD 100%)`,
        }}
      >
        <InlineCta label="ご質問だけでもお気軽にどうぞ" dark accentColor={t.main} />
      </section>

      {/* ============ SECTION: ご留意事項 ============ */}
      <section className="bg-base-warm py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-ink-muted" />
            <h3 className="text-xs font-semibold text-ink-muted">
              ご留意事項
            </h3>
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

      {/* ============ CTA 5 (bottom) ============ */}
      <section
        className="py-14"
        style={{
          background: `linear-gradient(135deg, ${t.dark} 0%, ${t.dark}EE 100%)`,
        }}
      >
        <InlineCta label="まずはお気軽にご相談ください" dark accentColor={t.main} />
      </section>

      {/* ============ LP Banner ============ */}
      <section className="bg-surface py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-ink-secondary mb-4">
            斎場案内・会社概要・トータルサポートなど詳しい情報はこちら
          </p>
          <a
            href={SITE.lpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 px-8 py-3 text-sm font-bold tracking-wide transition-colors hover:text-white"
            style={{
              borderColor: t.main,
              color: t.main,
            }}
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
