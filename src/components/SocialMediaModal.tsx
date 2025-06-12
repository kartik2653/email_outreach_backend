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
  const [selectedTime, setSelectedTime] = useState({
    hour: new Date().getHours() % 12 || 12,
    minute: new Date().getMinutes(),
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  });
  const [caption, setCaption] = useState(description);
  const [hashtags, setHashtags] = useState(postHashtags);

  const writingTools = [
    {
      icon: PenTool,
      label: "Improve Writing",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    {
      icon: CheckCircle,
      label: "Fix spelling & grammar",
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    { icon: Zap, label: "Make longer", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    {
      icon: MessageSquare,
      label: "Make Shorter",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    { icon: RefreshCw, label: "Change tone", color: "bg-blue-100 text-blue-700 border-blue-200" },
    {
      icon: Target,
      label: "Simplify Language",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
  ];

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
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

    const dateOfPublication = formatToUTC(selectedDate, selectedTime);

    const formData = {
      postId: postId,
      captions: updatedCaptions,
      hashtags: updatedHashtags,
      assetUrl: updatedImages,
      secureAssetUrl: updatedSecureImages,
      dateOfPublication,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <div className="relative">
          <Tabs defaultValue={defaultTabValue} className="w-full p-4">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent h-auto p-0">
              <TabsTrigger
                value="content"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-green data-[state=active]:bg-transparent bg-transparent"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="post"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-green data-[state=active]:bg-transparent bg-transparent"
              >
                Post
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-green data-[state=active]:bg-transparent bg-transparent"
              >
                Schedule
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleOnSubmit} className="p-6">
              <TabsContent value="content" className="space-y-6 mt-0">
                <div>
                  <Label htmlFor="caption" className="text-base font-medium mb-3 block">
                    Caption
                  </Label>
                  <div className="space-y-4 relative">
                    <Textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-32 resize-none border-gray-200 rounded-2xl text-gray-400"
                      placeholder="Write your caption here..."
                    />
                    <Button
                      type="button"
                      onClick={() => handleMagicPrompt({ type: "caption" })}
                      className="bg-lime-400 hover:bg-lime-500 text-black font-medium absolute bottom-4 right-4"
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
                      <tool.icon className="w-3 h-3 mr-1" />
                      {tool.label}
                    </Badge>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="hashtags" className="text-base font-medium">
                      Hashtag
                    </Label>
                    <RefreshCw
                      onClick={() => handleMagicPrompt({ type: "hashtags" })}
                      className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                    />
                  </div>
                  <Textarea
                    id="hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="min-h-20 resize-none border-gray-200 text-sm rounded-2xl text-gray-400"
                    placeholder="Add your hashtags..."
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 font-medium rounded-full"
                >
                  Save changes
                </Button>
              </TabsContent>

              <TabsContent value="post" className="space-y-6 mt-0">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <div className="bg-black rounded-lg overflow-hidden aspect-square relative">
                      <img src={image} alt="Post Preview" className="w-full h-full object-cover" />
                      <RefreshCw
                        onClick={() => handleMagicPrompt({ type: "image" })}
                        className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 absolute top-3 right-3 bg-white rounded-full p-1"
                      />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      className="w-full h-full p-4 border border-gray-200 text-sm rounded-2xl text-gray-400"
                      placeholder="Enter your caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    {/* <RefreshCw
                      onClick={() => handleMagicPrompt({ type: "caption" })}
                      className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 absolute top-3 right-6"
                    /> */}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 font-medium rounded-full"
                >
                  Save changes
                </Button>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6 mt-0">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 border border-lime-400 rounded-full">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {selectedTime.hour}:{selectedTime.minute} {selectedTime.period}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="default" size="sm">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <h3 className="font-medium">June, 2025</h3>
                      <Button variant="default" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="w-48">
                    <h4 className="font-medium mb-4">Enter Time</h4>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">Hour</Label>
                          <Input
                            value={selectedTime.hour}
                            onChange={(e) =>
                              setSelectedTime((prev) => ({ ...prev, hour: Number(e.target.value) }))
                            }
                            className="text-center"
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">Minute</Label>
                          <Input
                            value={selectedTime.minute}
                            onChange={(e) =>
                              setSelectedTime((prev) => ({
                                ...prev,
                                minute: Number(e.target.value),
                              }))
                            }
                            className="text-center"
                          />
                        </div>
                        <div className="w-16">
                          <Label className="text-xs text-gray-500">Period</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-lime-400 text-black hover:bg-lime-500"
                            onClick={() =>
                              setSelectedTime((prev) => ({
                                ...prev,
                                period: prev.period === "AM" ? "PM" : "AM",
                              }))
                            }
                          >
                            {selectedTime.period}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type={linkedInCredentials?.isAccessProvided ? "submit" : "button"}
                  onClick={() => {
                    if (linkedInCredentials?.isAccessProvided) {
                      setCode("true");
                    }
                    setOpenLinkedInModal(true);
                  }}
                  className="bg-black text-white hover:bg-gray-800 font-medium rounded-full"
                >
                  Save & schedule
                </Button>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </DialogContent>
      <LinkedInModal code={code} isOpen={openLinkedInModal} setIsOpen={setOpenLinkedInModal} />
    </Dialog>
  );
}
