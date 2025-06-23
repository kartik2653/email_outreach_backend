import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calendarService } from "@/services/api/calendar";

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month");
  const [calendarData, setCalendarData] = useState([]);

  const getCalendarData = async () => {
    try {
      const response = await calendarService.getCalendar({
        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString(),
        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString(),
      });
      setCalendarData(response);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  useEffect(() => {
    getCalendarData();
  }, [currentDate]);

  // Function to get all days needed for the calendar view
  const getDaysInMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let firstDayIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

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
      const currentDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      console.log("🚀 ~ getDaysInMonth ~ calendarData:", calendarData);
      const event = calendarData?.find(
        (item) => new Date(item.dateOfPublication).toISOString().split("T")[0] === currentDateStr
      );

      days.push({
        date: i,
        month,
        year,
        isCurrentMonth: true,
        hasEvent: !!event,
        imageUrl: event ? event.assetUrl?.[0] : null,
      });
    }

    // Add days from next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const remainingDays = 42 - days.length;

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

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const formatMonthRange = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthName = getMonthName(firstDay.getMonth());
    return `${firstDay.getDate()}${getOrdinalSuffix(firstDay.getDate())} ${monthName} - ${lastDay.getDate()}${getOrdinalSuffix(lastDay.getDate())} ${monthName}`;
  };

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

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="w-full p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
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
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50 border-b border-gray-200"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`relative h-24 p-2 border-b border-r border-gray-200 bg-white hover:bg-gray-50 ${index % 7 === 6 ? "border-r-0" : ""} ${index >= 35 ? "border-b-0" : ""}`}
            style={
              day.hasEvent && day.imageUrl
                ? {
                    backgroundImage: `url(${day.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            <div
              className={`text-sm ${
                !day.isCurrentMonth
                  ? "text-gray-400"
                  : day.date === new Date().getDate() &&
                      day.month === new Date().getMonth() &&
                      day.year === new Date().getFullYear()
                    ? "text-white font-bold"
                    : "text-gray-900"
              }`}
            >
              {day.date.toString().padStart(2, "0")}
            </div>

            {day.hasEvent && day.imageUrl && (
              <div className="text-xs font-medium absolute bottom-1 left-1/2 -translate-x-1/2 p-2 rounded-full bg-yellow-green">
                Scheduled
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
