import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { GmbHeader } from "@/components/GmbHeader";
import { GmbFooter } from "@/components/GmbFooter";
import { SpFixedCta } from "@/components/SpFixedCta";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ご葬儀プラン｜ファーストリーフ株式会社",
    template: "%s｜ファーストリーフ",
  },
  description:
    "シンプル直葬10万円台〜、お別れ火葬式20万円台〜、家族葬30万円台〜。神奈川県の葬儀ならファーストリーフ。24時間365日対応。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        <GmbHeader />
        <main>{children}</main>
        <GmbFooter />
        <SpFixedCta />
      </body>
    </html>
  );
}
