import Image from "next/image";
import {
  Check,
  X,
  ChevronRight,
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

export function PlanDetail({ plan }: { plan: Plan }) {
  const otherPlans = getOtherPlans(plan.slug);

  return (
    <>
      {/* Hero */}
      <div className="relative h-[280px] sm:h-[360px] overflow-hidden">
        <Image
          src={plan.heroImage}
          alt={plan.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/30 to-dark/10" />
        <div className="absolute inset-0 flex flex-col justify-end pb-8 px-6 max-w-5xl mx-auto">
          <div className="text-[10px] tracking-[0.15em] text-white/60 uppercase mb-2">
            {plan.num}
          </div>
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white leading-tight">
            {plan.title}
          </h1>
        </div>
      </div>

      {/* Price + Target */}
      <section className="bg-surface py-10">
        <div className="max-w-3xl mx-auto px-6">
          {/* Price block */}
          <div className="text-center mb-10">
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-5xl sm:text-6xl font-bold text-ink">
                {plan.priceNum}
              </span>
              <span className="text-lg text-ink-secondary">万円台〜</span>
            </div>
            <p className="text-xs text-ink-muted">{plan.priceTaxIn}</p>
            <p className="mt-1 text-[11px] text-ink-muted">
              ※地域・条件により変動する場合があります
            </p>
          </div>

          {/* Targets */}
          <div className="mb-10">
            <h2 className="text-xs font-semibold text-main tracking-wider uppercase mb-4 text-center">
              こんな方におすすめ
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {plan.targets.map((t) => {
                const Icon = iconMap[t.icon] || Heart;
                return (
                  <div
                    key={t.text}
                    className="flex items-start gap-3 bg-main-faint px-4 py-4"
                  >
                    <Icon className="w-5 h-5 text-main shrink-0 mt-0.5" />
                    <span className="text-sm leading-snug">{t.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-ink-secondary leading-[1.9] mb-0">
            {plan.longDescription}
          </p>
        </div>
      </section>

      {/* Included services */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-base font-bold text-ink mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-main inline-block" />
            プランに含まれるもの
          </h2>
          <div className="space-y-6">
            {plan.includes.map((group) => (
              <div key={group.category}>
                <h3 className="text-xs font-semibold text-ink-secondary tracking-wider mb-2 border-b border-border pb-2">
                  {group.category}
                </h3>
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-surface px-4 py-3 border border-border-light"
                    >
                      <Check className="w-4 h-4 text-main shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Not included */}
          {plan.notIncluded.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-xs font-semibold text-ink-muted tracking-wider mb-3">
                このプランに含まれないもの
              </h3>
              <div className="flex flex-wrap gap-2">
                {plan.notIncluded.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-base-warm text-ink-muted"
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

      {/* Mid CTA */}
      <div className="bg-surface py-10">
        <PhoneCta label="このプランについて相談する" />
      </div>

      {/* Flow */}
      <section className="bg-base-cool py-section">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-base font-bold text-ink mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent inline-block" />
            ご葬儀の流れ
          </h2>
          <div className="space-y-0">
            {plan.flow.map((f, i) => (
              <div key={f.step} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-main text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {f.step}
                  </div>
                  {i < plan.flow.length - 1 && (
                    <div className="w-px flex-1 bg-border min-h-[40px]" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-sm font-bold mb-1">{f.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base py-section">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-base font-bold text-ink mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-main inline-block" />
            よくあるご質問
          </h2>
          <div className="divide-y divide-border">
            {plan.faq.map((item) => (
              <div key={item.q} className="py-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-sm font-bold text-main shrink-0">
                    Q.
                  </span>
                  <span className="text-sm font-bold">{item.q}</span>
                </div>
                <div className="flex items-start gap-3 pl-0 sm:pl-0">
                  <span className="text-sm font-bold text-accent-dark shrink-0">
                    A.
                  </span>
                  <span className="text-sm text-ink-secondary leading-relaxed">
                    {item.a}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
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

      {/* LP Banner */}
      <section className="bg-surface py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-ink-secondary mb-4">
            斎場案内・会社概要・トータルサポートなど詳しい情報はこちら
          </p>
          <a
            href={SITE.lpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-main text-main px-8 py-3 text-sm font-bold tracking-wide hover:bg-main hover:text-white transition-colors"
          >
            ファーストリーフ 公式サイトを見る
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Phone CTA */}
      <div className="bg-dark text-dark-text py-12">
        <PhoneCta label="まずはお気軽にご相談ください" dark />
      </div>

      {/* Other plans */}
      <OtherPlans plans={otherPlans} />
    </>
  );
}
