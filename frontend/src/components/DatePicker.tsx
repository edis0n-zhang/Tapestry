"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { redirect, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  const pathname = usePathname();

  // Extract date from URL path or search parameters
  const urlDateParts = pathname.split("/");
  const urlDate =
    urlDateParts.length > 2 ? urlDateParts[1] : urlDateParts[1].split("?")[0];
  const displayDate = urlDate ? parseISO(urlDate) : new Date();
  const formattedDisplayDate = format(displayDate, "PPP");

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd"); // Format date as YYYY-MM-DD
      redirect(`/${formattedDate}`); // Redirect to the new URL
    }
  }, [date]); // Dependency array includes date, so this runs only when date changes

  return (
    <Popover>
      <div className="flex items-center justify-between md:justify-normal">
        <div className="text-2xl font-bold md:text-3xl dark:text-slate-100  text-slate-900">
          <span>{formattedDisplayDate}</span>
        </div>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "dark:bg-background md:mx-1 bg-background h-16 justify-start bg-opacity-0 hover:bg-gray-100 dark:hover:bg-gray-700",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-7 w-7 md:h-10 md:w-10 stroke-black dark:stroke-white" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0 bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-700">
        <Calendar
          mode="single"
          selected={displayDate}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
