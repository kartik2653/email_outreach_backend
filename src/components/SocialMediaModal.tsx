"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  CheckCircle,
  Zap,
  MessageSquare,
  RefreshCw,
  Target,
  CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LinkedInModal from "./LinkedInModal";
import { promptServices } from "@/services/api/prompt";
import { postServices } from "@/services/api/post";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store";
import { formatToUTC } from "@/lib/utils";
import { linkedInService } from "@/services/api/linkedinService";

export default function SocialMediaModal({
  isOpen,
  setIsOpen,
  defaultTabValue = "content",
  post,
  postsResponse,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTabValue?: "content" | "post" | "schedule";
  post: {
    postIndex: number;
    postId: string;
    image: string;
    description: string;
    hashtags: string;
    promptText?: string;
  };
  postsResponse?: {
    _id: string;
    assetUrl: string[];
    captions: string[];
    hashtags: string[];
    promptText: string;
    variantsCount: number;
    secureAssetUrl: string[];
    assetType: string;
  };
}) {
  const { toast } = useToast();
  const [code, setCode] = useState(null);
  const { description, postId, hashtags: postHashtags, image, postIndex } = post;
  const [openLinkedInModal, setOpenLinkedInModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { linkedInCredentials }: any = useAuthStore();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const [hour, setHour] = useState<number>(currentHour % 12 || 12);
  const [minute, setMinute] = useState<number>(currentDate.getMinutes());
  const [ampm, setAmpm] = useState<"AM" | "PM">(currentHour >= 12 ? "PM" : "AM");
  const [activeTab, setActiveTab] = useState<"content" | "post" | "schedule">("content");

  const [caption, setCaption] = useState(description);
  const [hashtags, setHashtags] = useState(postHashtags);

  const writingTools = [
    {
      label: "✍️ Improve Writing",
      color: "bg-light-green text-dark-charcoal",
      font: "Manrope",
    },
    {
      label: "🫰 Fix spelling & grammar",
      color: "bg-light-green text-dark-charcoal",
      font: "Manrope",
    },
    { label: "✍️ Make longer", color: "bg-light-green text-dark-charcoal", font: "Manrope" },
    {
      label: "✍️ Make Shorter",
      color: "bg-light-green text-dark-charcoal",
      font: "Manrope",
    },
    { label: "🗣️ Change tone", color: "bg-light-green text-dark-charcoal", font: "Manrope" },
    {
      label: "🔤 Simplify Language ",
      color: "bg-light-green text-dark-charcoal",
      font: "Manrope",
    },
  ];

  const [value, setValue] = useState(0);
  const min = 0;
  const max = 59;
  const step = 15;

  const clamp = (num: number) => Math.min(max, Math.max(min, num));

  const format = (num: number) => num.toString().padStart(2, "0");

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num)) {
      setValue(clamp(Math.round(num / step) * step));
    }
  };

  const formatDateForDisplay = (date: Date | undefined) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const handleMagicPrompt = async (data: { type: string }) => {
    const { type } = data;
    if (type === "caption") {
      const response: any = await promptServices.generateMagicPrompt({
        promptText: post?.promptText,
      });
      setCaption(response);
    } else if (data.type === "hashtags") {
      const response: any = await promptServices.generateHashtags({ promptText: post?.promptText });
      setHashtags(response);
    } else if (data.type === "image") {
      const response: any = await promptServices.regeneratePostVariant({
        postId,
        variationIndex: postIndex,
      });
      setCaption(response?.captions?.[postIndex] || "");
      setHashtags(response?.hashtags?.[postIndex] || "");
    }
  };

  const handleCaptionEnhance = async (data: { action: string }) => {
    const { action } = data;
    const response: any = await promptServices.enhanceCaption({
      promptText: post?.promptText,
      actions: [action],
    });
    setCaption(response);
  };

  const handlePublishNow = async () => {
    try {
      const response = await linkedInService?.publishPostToLinkedIn({
        postId: postId,
        assetIndexOfPublication: postIndex,
      });
      toast({
        title: "Post Published Successfully",
        description: "Your post has been published on LinkedIn.",
      });
    } catch (error) {
      console.error("Error publishing post:", error);
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create updated captions array
    const updatedCaptions = [...(postsResponse?.captions || [])];
    updatedCaptions[postIndex] = caption;

    // Create updated hashtags array
    const updatedHashtags = [...(postsResponse?.hashtags || [])];
    updatedHashtags[postIndex] = hashtags;

    // Create updated image array
    const updatedImages = [...(postsResponse?.assetUrl || [])];
    updatedImages[postIndex] = image;
    const updatedSecureImages = [...(postsResponse?.secureAssetUrl || [])];
    updatedSecureImages[postIndex] = image;

    const dateOfPublication = formatToUTC(selectedDate, {
      hour: ampm === "PM" ? (hour % 12) + 12 : hour % 12,
      minute,
      period: ampm,
    });

    const formData = {
      postId: postId,
      captions: updatedCaptions,
      hashtags: updatedHashtags,
      assetUrl: updatedImages,
      secureAssetUrl: updatedSecureImages,
      dateOfPublication: activeTab === "schedule" ? dateOfPublication : null,
      assetIndexForPublication: postIndex,
    };

    try {
      const response = await postServices.updatePost(formData);
      toast({
        title: "Post Updated Successfully",
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-opacity-0">
        <div className="relative">
          <Tabs
            defaultValue={defaultTabValue}
            className="w-full p-4"
            onValueChange={(value) => {
              setActiveTab(value as "content" | "post" | "schedule");
            }}
          >
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent h-auto p-0">
              <TabsTrigger
                value="content"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-green data-[state=active]:bg-transparent bg-transparent font-20 font-bricolage-grotesque text-dark-charcoal-500"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="post"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-green data-[state=active]:bg-transparent bg-transparent font-20 text-dark-charcoal-500 font-bricolage-grotesque"
              >
                Post
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-green data-[state=active]:bg-transparent bg-transparent font-20 text-dark-charcoal-500 font-bricolage-grotesque"
              >
                Schedule
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleOnSubmit} className="p-6">
              <TabsContent value="content" className="space-y-6 mt-0">
                <div>
                  <Label
                    htmlFor="caption"
                    className="text-base font-medium mb-3 block text-dark-charcoal-500 font-16 font-manrope text-standard"
                  >
                    Caption
                  </Label>
                  <div className="space-y-4 relative">
                    <Textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-32 resize-none border-base-grey-300 rounded-2xl text-base-grey-600 font-manrope text-standard"
                      placeholder="Write your caption here..."
                    />
                    <Button
                      type="button"
                      onClick={() => handleMagicPrompt({ type: "caption" })}
                      className="bg-yellow-green hover:bg-light-yellow-green font-14 w-125 h-35 rounded-full font-manrope text-black font-medium absolute bottom-4 right-4"
                    >
                      Magic Prompt
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {writingTools.map((tool, index) => (
                    <Badge
                      onClick={() => handleCaptionEnhance({ action: tool.label.toLowerCase() })}
                      key={index}
                      variant="outline"
                      className={`${tool.color} cursor-pointer hover:opacity-80 px-3 py-1`}
                    >
                      {tool.label}
                    </Badge>
                  ))}
                </div>

                <div>
                  <div className="flex items-center relative justify-between mb-3">
                    <Label
                      htmlFor="hashtags"
                      className="text-base font-medium font-16 font-manrope text-standard text-dark-charcoal-500"
                    >
                      Hashtag
                    </Label>
                    <button
                      onClick={() => handleMagicPrompt({ type: "hashtags" })}
                      className="w-28 h-28 rounded-md border border-base-grey-300 flex items-center justify-center hover:bg-gray-200 transition-colors ml-auto absolute mt-1 top-16 right-4"
                    >
                      <img src="/src/assests/svg/anticlockwiseArrow-black.svg" alt="" />
                    </button>
                  </div>
                  <Textarea
                    id="hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="min-h-20 resize-none border-base-grey-300 text-sm rounded-2xl font-manrope text-base-grey-600 text-standard "
                    placeholder="Add your hashtags..."
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-black text-white w-standard h-standard font-16 font-manrope hover:bg-gray-800  rounded-full"
                >
                  Save changes
                </Button>
              </TabsContent>

              <TabsContent value="post" className="space-y-6 mt-0">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square relative">
                      <img
                        src={image}
                        alt="Post Preview"
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={() => handleMagicPrompt({ type: "image" })}
                        className="w-28 h-28 rounded-md bg-white border border-base-grey-300 flex items-center justify-center hover:bg-gray-200 transition-colors ml-auto absolute mt-1 top-2 right-3"
                      >
                        <img src="/src/assests/svg/anticlockwiseArrow-black.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      className="w-full h-full p-4 border border-base-gray-600 font-manrope font-16 rounded-xl text-base-grey-600"
                      placeholder="Enter your caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <button
                      onClick={() => handleMagicPrompt({ type: "image" })}
                      className="w-28 h-28 rounded-md bg-white border border-base-grey-300 flex items-center justify-center hover:bg-gray-200 transition-colors ml-auto absolute mt-1 top-2 right-3"
                    >
                      <img src="/src/assests/svg/anticlockwiseArrow-black.svg" alt="" />
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-black text-white w-standard h-standard font-16 font-manrope hover:bg-gray-800  rounded-full"
                >
                  Save changes
                </Button>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6 mt-0">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 border border-lime-400 rounded-full">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm ">{formatDateForDisplay(selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")} {ampm}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1 rounded-xl border mt-3">
                    <div className="flex items-center w-auto h-auto justify-between mb-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="ps-12 pt-8"
                      />
                    </div>
                  </div>

                  <div className="border-2 rounded-xl mt-3 p-4 w-223 h-172">
                    <p className="text-justify text-left px-3 pt-4">Enter Time</p>
                    <div className="flex p-2">
                      <div className="w-[46px] h-[38px] me-2">
                        <input
                          type="number"
                          min="1"
                          max="12"
                          value={hour}
                          onChange={(e) => setHour(parseInt(e.target.value))}
                          className="rounded-sm border border-gray-400 bg-[#F5F5F5] w-[46px] h-[38px] m-1 text-center"
                        />
                      </div>
                      <div className="absolute font-bold p-2 left-[481px]">:</div>
                      <div className="w-[46px] h-[38px] ms-2 me-2">
                        <input
                          type="number"
                          id="minutes"
                          name="minutes"
                          value={format(value)}
                          step={step}
                          onChange={handleManualChange}
                          className="rounded-sm border border-gray-400 bg-[#F5F5F5] w-[46px] h-[38px] m-1 text-center"
                          min={min}
                          max={max}
                        />
                      </div>
                      <div className="w-[27px] h-[38px] mt-1 mx-2 rounded-sm border border-grey-400 p-0">
                        <div
                          typeof="button"
                          onClick={() => setAmpm("AM")}
                          className={`rounded-t-sm w-[27px] h-[19px] font-[Bricolage Grotesque] font-bold text-[#858585] text-[11px] ps-1 ${
                            ampm === "AM" ? "bg-[#D3F26B]" : "hover:bg-[#D3F26B]"
                          }`}
                        >
                          AM
                        </div>
                        <div
                          typeof="button"
                          onClick={() => setAmpm("PM")}
                          className={`rounded-b-sm w-[27px] h-[19px] font-[Bricolage Grotesque] font-bold text-[#858585] text-[11px] ps-1 ${
                            ampm === "PM" ? "bg-[#D3F26B]" : "hover:bg-[#D3F26B]"
                          }`}
                        >
                          PM
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <p className="text-xs font-[Bricolage Grotesque] font-bold text-[#858585] px-4">
                        Hour
                      </p>
                      <p className="text-xs font-[Bricolage Grotesque] font-bold text-[#858585] px-4">
                        Minute
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    type={linkedInCredentials?.isAccessProvided ? "submit" : "button"}
                    onClick={() => {
                      if (linkedInCredentials?.isAccessProvided) {
                        setCode("true");
                      }
                      setOpenLinkedInModal(true);
                    }}
                    className="bg-black text-white w-standard h-standard font-16 font-manrope hover:bg-gray-800  rounded-full"
                  >
                    Save & schedule
                  </Button>
                  <Button
                    type={"button"}
                    onClick={() => {
                      if (linkedInCredentials?.isAccessProvided) {
                        setCode("true");
                        handlePublishNow();
                      }
                      setOpenLinkedInModal(true);
                    }}
                    className="bg-black text-white w-standard h-standard font-16 font-manrope hover:bg-gray-800  rounded-full"
                  >
                    Publish Now
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </DialogContent>
      <LinkedInModal code={code} isOpen={openLinkedInModal} setIsOpen={setOpenLinkedInModal} />
    </Dialog>
  );
}
