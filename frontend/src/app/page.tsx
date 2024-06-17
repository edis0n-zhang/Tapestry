"use client";

import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default function Home() {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const formattedPastDate = twoDaysAgo.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [month, day, year] = formattedPastDate.split("/");
  const formattedPreviousDate = `${year}-${month}-${day}`;

  redirect(`/${formattedPreviousDate}`);
}
