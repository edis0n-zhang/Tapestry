"use client";

import { redirect } from "next/navigation";

export default function Home() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 2);

  // Set the timezone to PST
  const pstTimezone = "America/Los_Angeles";
  yesterday.toLocaleString("en-US", { timeZone: pstTimezone });

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  redirect(`/${formattedDate}`);
}
