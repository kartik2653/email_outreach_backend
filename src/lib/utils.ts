import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToUTC = (
  date: Date | undefined,
  time: { hour: number; minute: number; period: string }
) => {
  if (!date) return undefined;

  // Create a copy of the selected date
  const utcDate = new Date(date);

  // Convert hour to 24-hour format based on period (AM/PM)
  let hours = time.hour;
  if (time.period === "PM" && hours !== 12) hours += 12;
  if (time.period === "AM" && hours === 12) hours = 0;

  // Set hours and minutes
  utcDate.setHours(hours, time.minute, 0, 0);

  // Convert to UTC ISO string with milliseconds and +00:00 offset
  return utcDate.toISOString();
};

export const refactorFormData = ({ formData, postsResponse, postIndex }) => {
  const {
    postId,
    captions,
    hashtags,
    assetUrl,
    secureAssetUrl,
    assetType,
    dateOfPublication,
    assetIndexForPublication,
  } = formData;
  const refactoredData = { ...postsResponse, postId, dateOfPublication, assetIndexForPublication };
  refactoredData.assetsData[postIndex] = {
    caption: captions || "",
    hashtags: hashtags || "",
    assetType: assetType || "image",
    isLiked: false,
    isDisliked: false,
    assetUrl: assetUrl || "",
    secureAssetUrl: secureAssetUrl || "",
  };
  debugger;
  return refactoredData;
};

export function formatDate(date: Date | string | number, dateFormat: string): string {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date input");
    }

    return format(parsedDate, dateFormat);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
}
