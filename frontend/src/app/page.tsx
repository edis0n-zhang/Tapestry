"use client";

import { redirect } from "next/navigation";

export default function Home() {
  const today = new Date();
  today.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  const year = twoDaysAgo.getFullYear();
  const month = String(twoDaysAgo.getMonth() + 1).padStart(2, "0");
  const day = String(twoDaysAgo.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  redirect(`/${formattedDate}`);
}
