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
} from "lucide-react";
import type { Plan } from "@/lib/plans";
import { SITE } from "@/lib/constants";
import { PhoneCta } from "@/components/PhoneCta";
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
        className="w-full flex items-center justify-between px-5 py-4 bg-surface hover:bg-base-warm transition-colors text-left"
      >
        <span className="text-sm font-semibold text-ink flex items-center gap-2">
          <span
            className="w-1 h-5 rounded-full inline-block shrink-0"
            style={{ backgroundColor: accentColor }}
          />
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: t.dark }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* FV Square Image (Canva 1080x1080) */}
            <div className="w-[280px] sm:w-[340px] shrink-0">
              <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src={plan.fvImage}
                  alt={`${plan.title} プラン概要`}
                  fill
                  className="object-cover"
                  priority
                  sizes="340px"
                />
              </div>
            </div>

            {/* FV Text */}
            <div className="text-center sm:text-left flex-1">
              <div
                className="inline-block text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full mb-3"
                style={{
                  backgroundColor: t.main,
                  color: "#fff",
                }}
              >
                {plan.num}
              </div>
              <h1 className="text-[clamp(1.6rem,5vw,2.6rem)] font-bold text-white leading-tight mb-3">
                {plan.title}
              </h1>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {plan.description}
              </p>
              {/* Price badge */}
              <div
                className="inline-flex items-baseline gap-2 px-6 py-3 shadow-lg"
                style={{ backgroundColor: t.light }}
              >
                <span
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: t.dark }}
                >
                  {plan.priceNum}
                </span>
                <span
                  className="text-base font-semibold"
                  style={{ color: t.main }}
                >
                  万円台〜
                </span>
                <span className="text-[11px] ml-1 opacity-60" style={{ color: t.dark }}>
                  {plan.priceTaxIn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA 1 (FV直後) ============ */}
      <section
        className="py-8 border-b-2"
        style={{
          backgroundColor: t.light,
          borderColor: `${t.main}33`,
        }}
      >
        <PhoneCta label="まずはお気軽にご相談ください" />
      </section>

      {/* ============ SECTION: こんな方におすすめ ============ */}
      <section className="bg-surface py-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-1.5 h-8 inline-block rounded-full"
              style={{ backgroundColor: t.main }}
            />
            <h2 className="text-lg font-bold text-ink">
              こんな方におすすめ
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {plan.targets.map((tgt) => {
              const Icon = iconMap[tgt.icon] || Heart;
              return (
                <div
                  key={tgt.text}
                  className="flex items-start gap-3 px-4 py-5 border-l-4"
                  style={{
                    backgroundColor: t.light,
                    borderColor: t.main,
                  }}
                >
                  <Icon
                    className="w-6 h-6 shrink-0 mt-0.5"
                    style={{ color: t.main }}
                  />
                  <span className="text-sm leading-snug font-medium">
                    {tgt.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTION: なぜこの価格？ + 説明 ============ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
              <Image
                src={plan.image}
                alt={`${plan.title}のイメージ`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm text-ink-secondary leading-[1.9]">
                {plan.longDescription}
              </p>
            </div>
          </div>

          <div
            className="border-l-4 px-6 py-5 bg-surface"
            style={{ borderColor: t.main }}
          >
            <h2 className="text-sm font-bold text-ink mb-2">
              なぜこの価格？
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {plan.whyThisPrice}
            </p>
          </div>

          <div className="mt-4 text-[11px] text-ink-muted bg-base-warm px-4 py-3 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              火葬料・搬送料など地域により変動する費用は別途かかります。事前にお見積りをご提示し、ご納得いただいてから進めます。
            </span>
          </div>
        </div>
      </section>

      {/* ============ CTA 2 ============ */}
      <section
        className="py-8"
        style={{ backgroundColor: t.dark }}
      >
        <PhoneCta label="お見積り・ご相談は無料です" dark />
      </section>

      {/* ============ SECTION: プランに含まれるもの (accordion) ============ */}
      <section className="bg-surface py-section">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="w-1.5 h-8 inline-block rounded-full"
              style={{ backgroundColor: t.main }}
            />
            <h2 className="text-lg font-bold text-ink">
              プランに含まれるもの
            </h2>
          </div>
          <p className="text-xs text-ink-muted mb-6 ml-4">
            各カテゴリをタップして詳細を確認できます
          </p>
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
                      className="flex items-center gap-2 bg-base px-4 py-3 border border-border-light"
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
              <h3 className="text-xs font-bold text-ink-muted tracking-wider mb-3 uppercase">
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
        className="py-8 border-y-2"
        style={{
          backgroundColor: t.light,
          borderColor: `${t.main}33`,
        }}
      >
        <PhoneCta label="含まれるものについてのご質問も承ります" />
      </section>

      {/* ============ SECTION: ご葬儀の流れ ============ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span
              className="w-1.5 h-8 inline-block rounded-full"
              style={{ backgroundColor: t.main }}
            />
            <h2 className="text-lg font-bold text-ink">ご葬儀の流れ</h2>
          </div>
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
                  <h3 className="text-base font-bold mb-1">{f.title}</h3>
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
      <section className="bg-surface py-section border-t-2 border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span
              className="w-1.5 h-8 inline-block rounded-full"
              style={{ backgroundColor: t.main }}
            />
            <h2 className="text-lg font-bold text-ink">よくあるご質問</h2>
          </div>
          <div className="divide-y divide-border">
            {plan.faq.map((item) => (
              <div key={item.q} className="py-6">
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="text-base font-bold text-white w-7 h-7 flex items-center justify-center shrink-0 text-xs"
                    style={{ backgroundColor: t.main }}
                  >
                    Q
                  </span>
                  <span className="text-sm font-bold leading-relaxed pt-0.5">
                    {item.q}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base font-bold text-white bg-accent w-7 h-7 flex items-center justify-center shrink-0 text-xs">
                    A
                  </span>
                  <span className="text-sm text-ink-secondary leading-relaxed pt-0.5">
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
        className="py-8"
        style={{ backgroundColor: t.dark }}
      >
        <PhoneCta label="ご質問だけでもお気軽にどうぞ" dark />
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
        className="py-12"
        style={{ backgroundColor: t.dark }}
      >
        <PhoneCta label="まずはお気軽にご相談ください" dark />
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
