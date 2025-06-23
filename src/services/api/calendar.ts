import apiClient from "./apiClient";

export const calendarService = {
  getCalendar: async (data: { startDate: string; endDate: string }) => {
    try {
      const { startDate, endDate } = data;
      const response: any = await apiClient.get(
        `/calendar/get?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch calendar data");
    }
  },

  generateCalendarAndPosts: async ({ month, timeZone = "UTC" }) => {
    try {
      const response: any = await apiClient.post(`/calendar/bulk/create-calendar-and-posts`, {
        month,
        timeZone,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch calendar data");
    }
  },
};
