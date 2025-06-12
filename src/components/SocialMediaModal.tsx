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
  Globe,
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

export default function SocialMediaModal({
  isOpen,
  setIsOpen,
  defaultTabValue = "content",
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTabValue?: "content" | "post" | "schedule";
}) {
  const [openLinkedInModal, setOpenLinkedInModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState({ hour: "11", minute: "00", period: "AM" });
  const [caption, setCaption] = useState(
    "Augmented Reality is taking over design, and if you're not on top of it, you're already behind. And that's why we've broken down the latest trends, challenges, and real-world examples in one infographic—so you can stay ahead, inspired, and ready to design for the future."
  );
  const [hashtags, setHashtags] = useState(
    "hashtag#AugmentedReality hashtag#ARDesign hashtag#DesignTrends hashtag#FutureOfDesign hashtag#UXDesign hashtag#ARExperience"
  );

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
    { icon: Globe, label: "Translate to", color: "bg-blue-100 text-blue-700 border-blue-200" },
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

            <div className="p-6">
              <TabsContent value="content" className="space-y-6 mt-0">
                <div>
                  <Label htmlFor="caption" className="text-base font-medium mb-3 block">
                    caption
                  </Label>
                  <div className="space-y-4 relative">
                    <Textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-32 resize-none border-gray-200 rounded-2xl text-gray-400"
                      placeholder="Write your caption here..."
                    />
                    <Button className="bg-lime-400 hover:bg-lime-500 text-black font-medium absolute bottom-4 right-4">
                      Magic Prompt
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {writingTools.map((tool, index) => (
                    <Badge
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
                    <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                  <Textarea
                    id="hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="min-h-20 resize-none border-gray-200 text-sm rounded-2xl text-gray-400"
                    placeholder="Add your hashtags..."
                  />
                </div>

                <Button className="bg-black text-white hover:bg-gray-800 font-medium rounded-full">
                  Save changes
                </Button>
              </TabsContent>

              <TabsContent value="post" className="space-y-6 mt-0">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="bg-black rounded-lg overflow-hidden aspect-square relative">
                      <img
                        src="/placeholder.svg?height=400&width=400"
                        alt="AR Trends Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm font-medium mb-1">Top AR Trends & Challenges</div>
                        <div className="text-xs opacity-80">Every Designer Should Know</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-black rounded aspect-square relative overflow-hidden"
                      >
                        <img
                          src="/placeholder.svg?height=100&width=100"
                          alt={`Preview ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <Button variant="outline" size="icon" className="w-full aspect-square">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RefreshCw className="w-4 h-4 text-gray-400 mt-1 cursor-pointer hover:text-gray-600" />
                  <p className="text-sm text-gray-600 leading-relaxed">{caption}</p>
                </div>

                <Button className="bg-black text-white hover:bg-gray-800 font-medium rounded-full">
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
                      <Button variant="ghost" size="icon">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <h3 className="font-medium">May, 2025</h3>
                      <Button variant="ghost" size="icon">
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
                              setSelectedTime((prev) => ({ ...prev, hour: e.target.value }))
                            }
                            className="text-center"
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">Minute</Label>
                          <Input
                            value={selectedTime.minute}
                            onChange={(e) =>
                              setSelectedTime((prev) => ({ ...prev, minute: e.target.value }))
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
                  onClick={() => setOpenLinkedInModal(true)}
                  className="bg-black text-white hover:bg-gray-800 font-medium rounded-full"
                >
                  Save & schedule
                </Button>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
      <LinkedInModal isOpen={openLinkedInModal} setIsOpen={setOpenLinkedInModal} />
    </Dialog>
  );
}
