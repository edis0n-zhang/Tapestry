"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
  const cur_date = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = cur_date.toLocaleDateString("en-US", options);

  return (
    <Popover>
      <div className="flex items-center">
        <div className="text-3xl font-bold">
          {date ? format(date, "PPP") : <span>{formattedDate}</span>}
        </div>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "dark:bg-background bg-background ml-3 h-16 justify-start bg-opacity-0 hover:bg-gray-100 dark:hover:bg-gray-700",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-10 w-10 stroke-black dark:stroke-white" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
