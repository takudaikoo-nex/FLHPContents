import Image from "next/image";
import Link from "next/link";
import type { Plan } from "@/lib/plans";

export function OtherPlans({ plans }: { plans: Plan[] }) {
  return (
    <section className="py-section bg-base-cool">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-lg font-bold text-center mb-8">
          他のプランもご覧ください
        </h2>
        <div className="grid sm:grid-cols-2 gap-px bg-border-light">
          {plans.map((plan) => (
            <Link
              key={plan.slug}
              href={`/${plan.slug}`}
              className="bg-surface p-5 flex gap-4 items-center group"
            >
              <div className="relative w-24 h-18 shrink-0 overflow-hidden">
                <Image
                  src={plan.image}
                  alt={plan.title}
                  width={200}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="text-[10px] text-ink-muted tracking-wider mb-1">
                  {plan.num}
                </div>
                <h3 className="text-sm font-bold mb-0.5 group-hover:text-main transition-colors">
                  {plan.title}
                </h3>
                <div className="text-xs text-ink-secondary">{plan.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
