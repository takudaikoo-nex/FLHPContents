import type { Metadata } from "next";
import { getPlanBySlug } from "@/lib/plans";
import { PlanDetail } from "@/components/PlanDetail";

const plan = getPlanBySlug("ichinichiso")!;

export const metadata: Metadata = {
  title: `${plan.title}（${plan.price}）`,
  description: `${plan.longDescription} 24時間365日対応。`,
};

export default function IchinichisoPage() {
  return <PlanDetail plan={plan} />;
}
