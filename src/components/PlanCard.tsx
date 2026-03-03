import Image from "next/image";
import Link from "next/link";
import type { Plan } from "@/lib/plans";
import { Check } from "lucide-react";

export function PlanCard({ plan }: { plan: Plan }) {
  const allItems = plan.includes.flatMap((g) => g.items);

  return (
    <Link
      href={`/${plan.slug}`}
      className="block bg-surface overflow-hidden group"
    >
      <div className="relative">
        <Image
          src={plan.image}
          alt={plan.title}
          width={800}
          height={600}
          className="object-cover aspect-[4/3] w-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-medium tracking-[0.12em] px-3 py-1 bg-white/90 text-ink backdrop-blur-sm">
          {plan.num}
        </span>
      </div>
      <div className="p-5">
        <h2 className="text-base font-bold mb-1">{plan.title}</h2>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-bold text-ink">{plan.priceNum}</span>
          <span className="text-sm text-ink-secondary">万円台〜</span>
        </div>
        <p className="text-[10px] text-ink-muted mb-3">{plan.priceTaxIn}</p>
        <p className="text-xs text-ink-secondary leading-relaxed mb-4">
          {plan.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {allItems.slice(0, 5).map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-0.5 text-[10px] px-2 py-0.5 border border-border-light text-ink-secondary"
            >
              <Check className="w-2.5 h-2.5 text-main" />
              {item}
            </span>
          ))}
          {allItems.length > 5 && (
            <span className="text-[10px] px-2 py-0.5 text-ink-muted">
              ...ほか{allItems.length - 5}項目
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-main group-hover:text-main-dark transition-colors">
          詳細を見る
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
