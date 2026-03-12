import type { Metadata } from "next";
import { getPlanBySlug } from "@/lib/plans";
import { PlanDetail } from "@/components/PlanDetail";

const plan = getPlanBySlug("jitakuso")!;

export const metadata: Metadata = {
  title: `${plan.title}（${plan.price}）`,
  description: `${plan.longDescription} 24時間365日対応。`,
};

export default function JitakusoPage() {
  return <PlanDetail plan={plan} />;
}
