import { ChevronRight } from "lucide-react";
import { plans } from "@/lib/plans";
import { SITE } from "@/lib/constants";
import { PlanCard } from "@/components/PlanCard";
import { PhoneCta } from "@/components/PhoneCta";

export default function HomePage() {
  return (
    <>
      {/* Page title */}
      <section className="bg-surface pt-8 pb-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-[10px] tracking-[0.15em] text-main uppercase mb-2">
            FUNERAL PLANS
          </div>
          <h1 className="text-xl font-bold text-ink mb-2">
            ファーストリーフのご葬儀プラン
          </h1>
          <p className="text-xs text-ink-secondary">
            すべてのプランに、中立なプロの目と温かな心が込められています。
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="bg-base pb-section">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-border-light">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="text-center mt-6">
            <span className="text-xs text-main font-medium">
              &#10003;&ensp;事前相談で割引あり ─ まずはお気軽にご相談ください
            </span>
          </div>
        </div>
      </section>

      {/* LP Banner */}
      <section className="bg-surface py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-ink-secondary mb-4">
            斎場案内・会社概要・トータルサポートなど詳しい情報はこちら
          </p>
          <a
            href={SITE.lpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-main text-main px-8 py-3 text-sm font-bold tracking-wide hover:bg-main hover:text-white transition-colors"
          >
            ファーストリーフについて
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-dark text-dark-text py-12">
        <PhoneCta label="まずはお気軽にご相談ください" dark />
      </div>
    </>
  );
}
