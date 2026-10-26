import type { Metadata } from "next";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "Your account",
  description: "Track orders, manage your subscription and keep your glow points in one place.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountClient />;
}
