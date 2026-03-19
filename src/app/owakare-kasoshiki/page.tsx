import type { Metadata } from "next";
import { getPlanBySlug } from "@/lib/plans";
import { PlanDetailV2 } from "@/components/PlanDetailV2";

const plan = getPlanBySlug("owakare-kasoshiki")!;

export const metadata: Metadata = {
  title: `${plan.title}（${plan.price}）`,
  description: `${plan.longDescription} 24時間365日対応。`,
};

export default function OwakareKasoshikiPage() {
  return <PlanDetailV2 plan={plan} />;
}
