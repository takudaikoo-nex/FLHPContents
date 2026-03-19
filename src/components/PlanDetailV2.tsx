"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Info,
  Phone,
  Mail,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { Plan } from "@/lib/plans";
import { SITE } from "@/lib/constants";
import { OtherPlans } from "@/components/OtherPlans";
import { getOtherPlans } from "@/lib/plans";

/* ── Inline CTA (電話+フォーム 2ボタン) ── */
function InlineCta({ label, theme }: { label: string; theme: { main: string; dark: string } }) {
  return (
    <div className="text-center">
      <p
        className="text-base sm:text-lg font-bold mb-6"
        style={{ fontFamily: "var(--font-serif)", color: theme.dark }}
      >
        {label}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <a
          href={SITE.phoneTel}
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-6 text-white font-bold text-2xl rounded-md transition-all shadow-2xl hover:scale-105"
          style={{ backgroundColor: "#D94F04" }}
        >
          <Phone className="w-7 h-7" />
          {SITE.phone}
        </a>
        <a
          href={SITE.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-6 font-bold text-xl rounded-md transition-all shadow-2xl text-white hover:scale-105"
          style={{ backgroundColor: "#2E7D32" }}
        >
          <Mail className="w-6 h-6" />
          お問い合わせ
        </a>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <Image src="/images-LP/img_cta_review.png" alt="クチコミ評価5.0" width={60} height={60} className="w-12 h-12 sm:w-14 sm:h-14" />
        <p className="text-sm" style={{ color: theme.main, fontFamily: "var(--font-serif)" }}>
          24時間365日対応・相談無料
        </p>
      </div>
    </div>
  );
}

/* ── Section Title (大きな文字のみ・英語なし・縦棒なし) ── */
function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="mb-12 text-center">
      <h2
        className="text-3xl sm:text-4xl font-bold tracking-widest"
        style={{ fontFamily: "var(--font-serif)", color }}
      >
        {children}
      </h2>
      <div className="mt-4 mx-auto w-16 h-1" style={{ backgroundColor: color }} />
    </div>
  );
}

/* ── Accordion ── */
function Accordion({
  title,
  children,
  accentColor,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  accentColor: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border-light overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-3 px-5 py-5 bg-surface hover:bg-base-warm transition-colors"
      >
        <span
          className="text-lg sm:text-xl font-bold text-center"
          style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
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

/* ── Feathered Image ── */
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

/* ── Estimate data per plan ── */
const estimateData: Record<string, { items: { label: string; amount: string; note?: string }[]; total: string; subsidy: string; realCost: string }> = {
  "simple-chokuso": {
    items: [
      { label: "プラン基本料金", amount: "110,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
    ],
    total: "122,000円",
    subsidy: "-50,000円",
    realCost: "72,000円",
  },
  "menkai-kasoshiki": {
    items: [
      { label: "プラン基本料金", amount: "165,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
    ],
    total: "177,000円",
    subsidy: "-50,000円",
    realCost: "127,000円",
  },
  "owakare-kasoshiki": {
    items: [
      { label: "プラン基本料金", amount: "275,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
    ],
    total: "287,000円",
    subsidy: "-50,000円",
    realCost: "237,000円",
  },
  "ichinichiso": {
    items: [
      { label: "プラン基本料金", amount: "385,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
      { label: "式場利用料（公営斎場の場合）", amount: "40,000円" },
    ],
    total: "437,000円",
    subsidy: "-50,000円",
    realCost: "387,000円",
  },
  "jitakuso": {
    items: [
      { label: "プラン基本料金", amount: "440,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
    ],
    total: "452,000円",
    subsidy: "-50,000円",
    realCost: "402,000円",
  },
  "jisha-saijo": {
    items: [
      { label: "プラン基本料金", amount: "495,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
      { label: "式場利用料", amount: "0円", note: "自社斎場" },
    ],
    total: "507,000円",
    subsidy: "-50,000円",
    realCost: "457,000円",
  },
  "kazokuso": {
    items: [
      { label: "プラン基本料金", amount: "550,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
      { label: "式場利用料（公営斎場の場合）", amount: "50,000円" },
    ],
    total: "612,000円",
    subsidy: "-50,000円",
    realCost: "562,000円",
  },
  "futukaso": {
    items: [
      { label: "プラン基本料金", amount: "770,000円", note: "税込" },
      { label: "火葬料金（横浜市民の場合）", amount: "12,000円", note: "非課税" },
      { label: "式場利用料（公営斎場の場合）", amount: "67,000円" },
    ],
    total: "849,000円",
    subsidy: "-50,000円",
    realCost: "799,000円",
  },
};

export function PlanDetailV2({ plan }: { plan: Plan }) {
  const otherPlans = getOtherPlans(plan.slug);
  const t = plan.theme;
  const est = estimateData[plan.slug];

  return (
    <>
      {/* ============ HEADER ============ */}
      <header
        className="py-3 px-4 sm:px-8"
        style={{ backgroundColor: t.dark }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Image
            src="/images/logoFL.png"
            alt="ファーストリーフ"
            width={180}
            height={40}
            className="h-8 sm:h-10 w-auto"
          />
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-2 text-white text-sm font-bold"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{SITE.phone}</span>
          </a>
        </div>
      </header>

      {/* ============ HERO / FV ============ */}
      <section className="relative overflow-hidden">
        {/* 背景壁紙：和紙風テクスチャ + プランカラー */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 140% 100% at 20% 40%, ${t.main}18 0%, transparent 60%),
              radial-gradient(ellipse 100% 120% at 80% 80%, ${t.main}10 0%, transparent 50%),
              linear-gradient(170deg, ${t.light} 0%, #FAFAF7 35%, #F5F3EE 65%, ${t.light} 100%)
            `,
          }}
        />
        {/* 和紙風の細かい模様 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(circle 2px at 20% 30%, ${t.dark}, transparent),
              radial-gradient(circle 1px at 50% 60%, ${t.dark}, transparent),
              radial-gradient(circle 2px at 80% 20%, ${t.dark}, transparent),
              radial-gradient(circle 1px at 35% 80%, ${t.dark}, transparent),
              radial-gradient(circle 1.5px at 65% 45%, ${t.dark}, transparent)
            `,
            backgroundSize: "120px 100px",
          }}
        />
        {/* 上部アクセントライン */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${t.main}, transparent)` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-center">
            {/* 商品画像（背景透過・正方形） */}
            <div className="flex justify-center order-1">
              <div className="relative w-[300px] sm:w-[460px] aspect-square drop-shadow-2xl">
                <Image
                  src={plan.fvImage}
                  alt={`${plan.title} プラン概要`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 300px, 460px"
                />
              </div>
            </div>
            {/* イメージ写真（テキストなし・画像のみ） */}
            <div className="flex justify-center order-2">
              <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden shadow-2xl">
                <Image
                  src={plan.heroImage}
                  alt={`${plan.title}のイメージ`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, 500px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CP: 10,000円OFFキャンペーン ============ */}
      <section
        className="py-10 sm:py-14 relative overflow-hidden"
        style={{ backgroundColor: t.dark }}
      >
        {/* 金色の装飾ライン */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9902A, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9902A, transparent)" }} />
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <p className="text-sm sm:text-base tracking-[0.3em] mb-3" style={{ color: "#C9902A", fontFamily: "var(--font-serif)" }}>
            事前相談・資料請求で
          </p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-lg sm:text-xl font-bold">全プラン</span>
            <span
              className="text-5xl sm:text-7xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-serif)", color: "#C9902A" }}
            >
              10,000
            </span>
            <span className="text-2xl sm:text-3xl font-black text-red-500">円OFF</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            お電話またはお問い合わせフォームから<br />
            「ホームページを見た」とお伝えください
          </p>
        </div>
      </section>

      {/* ============ CP: 3大特典 ============ */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: t.main }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white text-center tracking-widest mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            ファーストリーフだけの 3つの安心
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { img: "/images-LP/img_proposal_03.png", title: "ご遺体搬送 無料", note: "20km圏内" },
              { img: "/images-LP/img_greeting_01.png", title: "ご安置 無料", note: "24時間対応" },
              { img: "/images-LP/img_proposal_02.png", title: "役所届出代行 無料", note: "面倒な手続きすべてお任せ" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center px-4 py-8 bg-white/15 backdrop-blur-sm border border-white/20 rounded-sm"
              >
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover" sizes="80px" />
                </div>
                <span
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </span>
                <span className="text-sm text-white/70">{item.note}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/50 mt-6">
            ※火葬料金はすべてのプランで別途かかります
          </p>
        </div>
      </section>

      {/* ============ CTA 1 ============ */}
      <section className="py-12" style={{ backgroundColor: t.light }}>
        <InlineCta label="まずはお気軽にご相談ください" theme={t} />
      </section>

      {/* ============ CP: 信頼バッジ（仮） ============ */}
      <section className="py-10 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { num: "98", unit: "%", label: "お客様満足度" },
              { num: "85", unit: "%", label: "ご紹介率" },
              { num: "200", unit: "件+", label: "年間施行実績" },
            ].map((item) => (
              <div key={item.label} className="py-6">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span
                    className="text-4xl sm:text-5xl font-black"
                    style={{ fontFamily: "var(--font-serif)", color: t.main }}
                  >
                    {item.num}
                  </span>
                  <span className="text-lg font-bold" style={{ color: t.main }}>
                    {item.unit}
                  </span>
                </div>
                <p className="text-xs text-ink-muted mt-2">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-ink-muted mt-2">※数値は仮のものです。実績確認後に差し替えます。</p>
        </div>
      </section>

      {/* ============ Visual strip: 祭壇+スタッフ ============ */}
      <section className="relative h-[280px] sm:h-[360px] overflow-hidden bg-base">
        <FeatheredImage
          src="/images/祭壇（黄色）_4.JPG"
          alt="生花祭壇"
          direction="right"
          className="absolute inset-0 w-[60%] h-full"
        />
        <FeatheredImage
          src="/images/葬儀屋スタッフ_10.JPG"
          alt="スタッフの対応"
          direction="left"
          className="absolute top-0 right-0 w-[55%] h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
      </section>

      {/* ============ SECTION: こんな方におすすめ ============ */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle color={t.dark}>こんな方におすすめ</SectionTitle>
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {plan.targets.map((tgt, i) => {
              const photos = [
                "/images-LP/img_worry_01.png",
                "/images-LP/img_proposal_01.png",
                "/images-LP/img_proposal_03.png",
              ];
              return (
                <div
                  key={tgt.text}
                  className="flex items-center gap-6 px-6 py-8 bg-surface border border-border-light shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: `${t.main}40` }}>
                    <Image src={photos[i % photos.length]} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <span
                    className="text-xl font-bold leading-relaxed"
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

      {/* ============ SECTION: プランの特徴 ============ */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: t.light }}>
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle color={t.dark}>プランの特徴</SectionTitle>

          {/* 画像コンポジション */}
          <div className="relative mb-12">
            <div className="grid sm:grid-cols-5 gap-0 items-stretch">
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

          <div className="mb-10">
            <p
              className="text-lg leading-[2.2]"
              style={{ fontFamily: "var(--font-serif)", color: "#333" }}
            >
              {plan.longDescription}
            </p>
          </div>

          {/* なぜこの価格 */}
          <div className="px-6 py-8 bg-white shadow-sm" style={{ borderLeft: `5px solid ${t.main}` }}>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "var(--font-serif)", color: t.dark }}
            >
              なぜこの価格でご提供できるのか
            </h3>
            <p className="text-base leading-[1.9]" style={{ color: "#444" }}>
              {plan.whyThisPrice}
            </p>
          </div>

          <div className="mt-6 text-sm bg-white px-6 py-5 flex items-start gap-3 border border-border-light">
            <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: t.main }} />
            <span className="leading-relaxed" style={{ color: "#333" }}>
              <strong>火葬料金は全プラン別途費用</strong>となります。地域・自治体により金額が異なるため、事前にお見積りをご提示し、ご納得いただいてから進めます。
            </span>
          </div>
        </div>
      </section>

      {/* ============ CP: 見積もり実例 ============ */}
      {est && (
        <section className="py-16 sm:py-20 bg-surface">
          <div className="max-w-xl mx-auto px-6">
            <SectionTitle color={t.dark}>お見積もり例</SectionTitle>
            <p className="text-center text-sm text-ink-muted mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              横浜市でのご利用を想定した参考例です
            </p>
            <div className="bg-white border-2 shadow-lg overflow-hidden" style={{ borderColor: `${t.main}40` }}>
              {/* ヘッダー帯 */}
              <div className="py-4 px-6 text-center" style={{ backgroundColor: t.dark }}>
                <span className="text-white font-bold text-lg tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
                  {plan.title}
                </span>
              </div>
              {/* 明細 */}
              <div className="px-6 py-6">
                {est.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-baseline py-3 border-b border-dashed" style={{ borderColor: `${t.main}20` }}>
                    <span className="text-sm" style={{ color: "#555" }}>
                      {item.label}
                      {item.note && <span className="text-xs text-ink-muted ml-1">（{item.note}）</span>}
                    </span>
                    <span className="text-base font-bold" style={{ color: "#333" }}>{item.amount}</span>
                  </div>
                ))}
                {/* 合計 */}
                <div className="flex justify-between items-baseline py-4 mt-2 border-t-2" style={{ borderColor: t.main }}>
                  <span className="text-base font-bold" style={{ color: t.dark }}>お支払い総額</span>
                  <span className="text-xl font-black" style={{ color: t.main, fontFamily: "var(--font-serif)" }}>
                    {est.total}
                  </span>
                </div>
                {/* 給付金控除 */}
                <div className="flex justify-between items-baseline py-3">
                  <span className="text-sm text-ink-muted">葬祭費給付金（横浜市）</span>
                  <span className="text-lg font-bold text-red-600">{est.subsidy}</span>
                </div>
              </div>
              {/* 実質負担額 */}
              <div className="py-6 px-6 text-center" style={{ backgroundColor: t.dark }}>
                <p className="text-sm text-white/70 mb-2">実質ご負担額</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" style={{ color: "#C9902A" }} />
                  <span
                    className="text-4xl sm:text-5xl font-black text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {est.realCost}
                  </span>
                  <Star className="w-5 h-5" style={{ color: "#C9902A" }} />
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-ink-muted text-center space-y-1">
              <p>※火葬料金は地域により異なります</p>
              <p>※葬祭費の給付額は自治体により異なります</p>
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA 2 ============ */}
      <section className="py-12" style={{ backgroundColor: t.light }}>
        <InlineCta label="お見積り・ご相談は無料です" theme={t} />
      </section>

      {/* ============ SECTION: プランに含まれるもの ============ */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle color={t.dark}>プランに含まれるもの</SectionTitle>
          <div className="space-y-2">
            {plan.includes.map((group, i) => (
              <Accordion key={group.category} title={group.category} accentColor={t.main} defaultOpen={i === 0}>
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
              <h3 className="text-lg font-bold mb-4 text-center" style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}>
                別途費用が必要なもの
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
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
      <section className="py-12" style={{ backgroundColor: t.light }}>
        <InlineCta label="含まれるものについてのご質問も承ります" theme={t} />
      </section>

      {/* ============ CP: 価格補足（給付金説明）仮 ============ */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: t.light }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="bg-white border border-border-light shadow-sm px-8 py-10">
            <ShieldCheck className="w-10 h-10 mx-auto mb-4" style={{ color: t.main }} />
            <h3
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "var(--font-serif)", color: t.dark }}
            >
              横浜市の場合、葬祭費 5万円 が給付されます
            </h3>
            <div className="space-y-3 text-left max-w-xs mx-auto">
              <div className="flex justify-between text-base">
                <span>プラン価格</span>
                <span className="font-bold">{plan.priceTaxIn}</span>
              </div>
              <div className="flex justify-between text-base text-red-600">
                <span>葬祭費給付</span>
                <span className="font-bold">- 50,000円</span>
              </div>
              <div className="border-t-2 pt-3" style={{ borderColor: t.main }}>
                <div className="flex justify-between text-lg">
                  <span className="font-bold" style={{ color: t.dark }}>実質ご負担</span>
                  <span className="font-black text-xl" style={{ color: t.main, fontFamily: "var(--font-serif)" }}>
                    {est?.realCost || "---"}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm mt-6" style={{ color: "#666", fontFamily: "var(--font-serif)" }}>
              申請方法もスタッフがサポートいたします
            </p>
          </div>
        </div>
      </section>

      {/* ============ Consultation visual ============ */}
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
            className="text-xl sm:text-2xl font-bold bg-white/60 backdrop-blur-sm px-10 py-5"
            style={{ fontFamily: "var(--font-serif)", color: t.dark }}
          >
            丁寧なご相談からはじまります
          </p>
        </div>
      </section>

      {/* ============ SECTION: ご葬儀の流れ ============ */}
      <section className="bg-base py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle color={t.dark}>ご葬儀の流れ</SectionTitle>
          <div className="space-y-0">
            {plan.flow.map((f, i) => (
              <div key={f.step} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-14 h-14 text-white flex items-center justify-center text-base font-bold shrink-0"
                    style={{ backgroundColor: t.main }}
                  >
                    {f.step}
                  </div>
                  {i < plan.flow.length - 1 && (
                    <div className="w-px flex-1 min-h-[48px]" style={{ backgroundColor: `${t.main}33` }} />
                  )}
                </div>
                <div className="pb-10">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#555" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Altar visual ============ */}
      <section className="relative h-[200px] sm:h-[300px] overflow-hidden bg-surface">
        <FeatheredImage
          src="/images/祭壇（黄色）_32.JPG"
          alt="祭壇の様子"
          direction="both"
          className="absolute inset-0 w-full h-full"
        />
      </section>

      {/* ============ SECTION: よくあるご質問 ============ */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle color={t.dark}>よくあるご質問</SectionTitle>
          <div className="divide-y divide-border">
            {plan.faq.map((item) => (
              <div key={item.q} className="py-7">
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className="text-base font-bold text-white w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: t.main }}
                  >
                    Q
                  </span>
                  <span
                    className="text-lg font-bold leading-relaxed pt-1"
                    style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                  >
                    {item.q}
                  </span>
                </div>
                <div className="ml-[52px]">
                  <span className="text-base leading-[2.0]" style={{ color: "#333333" }}>
                    {item.a}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA 4 (CTA帯バナー風) ============ */}
      <section
        className="py-12 sm:py-16 relative overflow-hidden"
        style={{ backgroundColor: t.dark }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9902A, transparent)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lg sm:text-xl text-white font-bold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            24時間 365日対応
          </p>
          <p className="text-sm text-white/60 mb-8">まずはお気軽にご相談ください</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <a
              href={SITE.phoneTel}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-6 text-white font-bold text-2xl rounded-md transition-all shadow-2xl hover:scale-105"
              style={{ backgroundColor: "#D94F04" }}
            >
              <Phone className="w-7 h-7" />
              {SITE.phone}
            </a>
            <a
              href={SITE.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-6 font-bold text-xl rounded-md transition-all shadow-2xl text-white hover:scale-105"
              style={{ backgroundColor: "#2E7D32" }}
            >
              <Mail className="w-6 h-6" />
              お問い合わせ
            </a>
          </div>
          <p className="text-xs mt-6 text-white/40">相談無料・お見積り無料</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9902A, transparent)" }} />
      </section>

      {/* ============ Staff visual ============ */}
      <section className="relative h-[220px] sm:h-[280px] overflow-hidden bg-base">
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
        <div className="absolute inset-0" style={{ backgroundColor: `${t.light}44`, mixBlendMode: "soft-light" }} />
      </section>

      {/* ============ ご留意事項 ============ */}
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
        <InlineCta label="まずはお気軽にご相談ください" theme={t} />
      </section>

      {/* ============ LP Banner ============ */}
      <section className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Image src="/images/logo.png" alt="ファーストリーフ" width={120} height={120} className="mx-auto mb-4" />
          <p className="text-sm mb-5" style={{ color: "#666", fontFamily: "var(--font-serif)" }}>
            斎場案内・会社概要・トータルサポートなど詳しい情報はこちら
          </p>
          <a
            href={SITE.lpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 px-8 py-4 text-base font-bold tracking-wide transition-colors hover:text-white"
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
