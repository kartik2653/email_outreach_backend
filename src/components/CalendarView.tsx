"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CalendarView() {
  // Initialize with April 2024 as default
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month");

  // Function to get all days needed for the calendar view
  const getDaysInMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    // Convert to Monday-based index (0 = Monday, ..., 6 = Sunday)
    let firstDayIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6; // Sunday becomes 6

    const daysInMonth = lastDayOfMonth.getDate();
    const days = [];

    // Add days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        month,
        year,
        isCurrentMonth: true,
        // Special case for April 17, 2024
        hasEvent: year === 2024 && month === 3 && i === 17,
      });
    }

    // Add days from next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const remainingDays = 42 - days.length; // 6 rows of 7 days

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // Get days for the current month view
  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Format the month range for display
  const formatMonthRange = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthName = getMonthName(firstDay.getMonth());
    return `${firstDay.getDate()}${getOrdinalSuffix(firstDay.getDate())} ${monthName} - ${lastDay.getDate()}${getOrdinalSuffix(lastDay.getDate())} ${monthName}`;
  };

  // Helper to get month name
  const getMonthName = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  };

  // Helper to get ordinal suffix (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Year navigation functions
  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const goToNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="w-full p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded bg-yellow-green hover:bg-light-yellow-green"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium min-w-[200px] text-center">
              {formatMonthRange()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded bg-yellow-green hover:bg-light-yellow-green"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Year Navigation */}
          {/* <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200"
              onClick={goToPreviousYear}
            >
              <ChevronLeft className="h-4 w-4 text-blue-600" />
            </Button>
            <span className="text-lg font-semibold text-blue-600 min-w-[60px] text-center">
              {currentDate.getFullYear()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200"
              onClick={goToNextYear}
            >
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </Button>
          </div> */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 bg-gray-100 rounded-full">
              {viewMode}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setViewMode("Month")}>Month</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setViewMode("Week")}>Week</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setViewMode("Day")}>Day</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {/* Days of week header */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50 border-b border-gray-200"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`relative h-24 p-2 border-b border-r border-gray-200 bg-white hover:bg-gray-50 ${index % 7 === 6 ? "border-r-0" : ""} ${index >= 35 ? "border-b-0" : ""}`}
          >
            <div
              className={`text-sm ${
                !day.isCurrentMonth
                  ? "text-gray-400"
                  : day.date === new Date().getDate() &&
                      day.month === new Date().getMonth() &&
                      day.year === new Date().getFullYear()
                    ? "text-purple-600 font-bold"
                    : "text-gray-900"
              }`}
            >
              {day.date.toString().padStart(2, "0")}
            </div>

            {/* Event indicator */}
            {day.hasEvent && (
              <div className="mt-1">
                <div className="w-12 h-8 bg-blue-600 rounded-sm mb-1 flex items-center justify-center overflow-hidden">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="text-xs text-green-600 font-medium">Scheduled</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
CalendarView.displayName = "CalendarView";

export { CalendarView };
