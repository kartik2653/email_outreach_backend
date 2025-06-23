import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PostCard from "@/components/dashboard/PostCard";
import PostCardSkeleton from "@/components/dashboard/PostCardSkeleton";
import { useToast } from "@/hooks/use-toast";
import LinkedInModal from "@/components/LinkedInModal";
import { linkedInService } from "@/services/api/linkedinService";
import { postServices } from "@/services/api/post";
import ModalSkeleton from "@/components/ModalSkeleton";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import SocialMediaModal from "@/components/SocialMediaModal";
import { calendarService } from "@/services/api/calendar";
import { formatDate } from "@/lib/utils";
interface GeneratedPost {
  postIndex: number;
  postId: string;
  image: string;
  description: string;
  hashtags: string;
}

const GeneratedPosts = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [defaultModalTabValue, setDefaultModalTabValue] = useState<"content" | "post" | "schedule">(
    "schedule"
  );
  const [activeModal, setActiveModal] = useState<"welcome" | "linkedIn">(null);
  const [openModalSkeleton, setOpenModalSkeleton] = useState(false);
  const [generatedPostsResponse, setGeneratedPostsResponse] = useState(null);
  const [calendarResponse, setCalendarResponse] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setAuthData = useAuthStore((state) => state?.setAuthData);
  const postId = searchParams.get("postId");
  const isCalendarView = location.pathname.includes("generated-calendar");
  const [selectedPosts, setSelectedPosts] = useState<GeneratedPost[] | []>([]);

  // Get the form data from navigation state
  const formData = location.state?.formData;
  const verifyLinkedInCode = async (code: string) => {
    try {
      const response = await linkedInService.linkedInVerifyCode({
        code,
        redirectUri: `${window.location.origin}${location.pathname}?${searchParams.toString()}`,
      });
      setOpenModalSkeleton(true);
      setAuthData({
        linkedInCredentials: {
          isAccessProvided: true,
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error in code verification",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (code) {
      verifyLinkedInCode(code);
    }
  }, [code, navigate]);

  const getPosts = async (postId) => {
    try {
      console.log("fomrdata", formData);

      setIsLoading(true);
      const payload = {
        promptText: formData?.prompt,
        variantsCount: Number(formData?.variants || 1),
        assetType: "image",
        tone: formData?.selectedTones || [],
      };

      // const response = postId
      //   ? await postServices?.getPostById({ postId })
      //   : await postServices.generatePost(payload);
      const response = {
        userId: "6836a1bc78c5834c58fac072",
        promptText: "Fish in a bowl",
        variantsCount: 2,
        tone: ["infomative"],
        assetsData: [
          {
            assetUrl:
              "http://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/ogxx67nbgg3gvqzmpfm0.png",
            secureAssetUrl:
              "https://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/ogxx67nbgg3gvqzmpfm0.png",
            assetType: "image",
            caption:
              "Did you know? A fishbowl requires regular cleaning to keep your aquatic friend healthy and happy.",
            hashtags: "#FishCare, #AquariumTips, #PetFish, #HealthyFish, #FishBowlFacts",
            isLiked: false,
            isDisliked: false,
            _id: "684fb9559c79079b8faaaa37",
          },
          {
            assetUrl:
              "http://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/uqthjyc28zevokt3jcht.png",
            secureAssetUrl:
              "https://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/uqthjyc28zevokt3jcht.png",
            assetType: "image",
            caption:
              "Keeping fish in a bowl? Ensure proper oxygen levels and avoid overcrowding for a balanced ecosystem.",
            hashtags: "#FishTankCare, #AquariumLife, #PetCareTips, #FishBowl, #CleanWater",
            isLiked: false,
            isDisliked: false,
            _id: "684fb9559c79079b8faaaa38",
          },
        ],
        assetType: "image",
        isPublished: false,
        dateOfPublication: null,
        assetIndexForPublication: 0,
        _id: "6857aba75e8c40f277d8097b",
        createdAt: "2025-06-16T06:27:33.711Z",
        updatedAt: "2025-06-16T06:27:33.711Z",
        __v: 0,
      };
      setGeneratedPostsResponse(response);
      const postsInfo: GeneratedPost[] = Array.from(
        { length: response?.variantsCount },
        (_, index) => ({
          postIndex: index,
          postId: response?.assetsData?.[index]?._id || "",
          image: response?.assetsData?.[index]?.assetUrl || "",
          description: response?.assetsData?.[index]?.caption || "",
          hashtags: response?.assetsData?.[index]?.hashtags || "",
          promptText: response.promptText,
        })
      );
      setPosts(postsInfo);

      toast({
        title: "Posts Generated Successfully",
        description: `Generated ${formData?.variants ?? ""} post variant(s)`,
      });
      if (!postId) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("postId", response?._id);
        navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Generation Failed",
        description: "Failed to generate posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCalendarWithPosts = async ({ startDate, endDate }) => {
    try {
      const timeRange = startDate && endDate;
      setIsLoading(true);
      if (!timeRange) {
        // await calendarService?.generateCalendarAndPosts({
        //   month: "June",
        //   timeZone: "UTC",
        // });

        const newParams = new URLSearchParams(searchParams);
        newParams.set("startDate", "2025-06-02T10:00:00.000Z");
        newParams.set("endDate", "2025-06-30T10:00:00.000Z");
        navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
      } else {
        const posts = await calendarService.getCalendar({ startDate, endDate });
        setCalendarResponse(posts);
        const postsInfo = posts?.map((post) => {
          return {
            postIndex: 0,
            postId: post?.assetsData?.[0]?._id || "",
            image: post?.assetsData?.[0]?.assetUrl || "",
            description: post?.assetsData?.[0]?.caption || "",
            hashtags: post?.assetsData?.[0]?.hashtags || "",
            promptText: post.promptText,
            dateOfPublication: post?.dateOfPublication,
            clusterId: post?._id,
          };
        });
        setPosts(postsInfo);
      }
    } catch (error) {
      toast({
        title: "Failed to Load Posts",
        description: "Could not fetch posts for the calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (code) return;
    if (isCalendarView) {
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      console.log(startDate, endDate);

      getCalendarWithPosts({ startDate, endDate });
    } else {
      getPosts(postId);
    }
  }, [formData, navigate, toast, postId, searchParams]);

  // const handleSelectPost = (postId: string) => {
  //   setSelectedPosts((prev) => {
  //     const updated = new Set(prev);
  //     updated.has(postId) ? updated.delete(postId) : updated.add(postId);
  //     return updated;
  //   });
  // };

  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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

  const formatMonthRange = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const year = new Date().getFullYear();
    const monthName = getMonthName(firstDay.getMonth());
    return `${firstDay.getDate()}${getOrdinalSuffix(firstDay.getDate())} ${monthName} ${year} - ${lastDay.getDate()}${getOrdinalSuffix(lastDay.getDate())} ${monthName} ${year}`;
  };

  const handleSelectionChange = (selectedPost: GeneratedPost) => {
    //for single post generation
    if (postId) {
      return;
    }

    const isAlreadySelected = selectedPosts?.filter(
      (post: GeneratedPost) => post?.postId == selectedPost?.postId
    );
    if (isAlreadySelected?.length) {
      const updatedSelection = selectedPosts?.filter(
        (post: GeneratedPost) => post?.postId !== selectedPost?.postId
      );
      setSelectedPosts([...updatedSelection]);
    } else {
      setSelectedPosts((prev) => [...prev, selectedPost]);
    }
  };

  // const handleSchedule = (tab: "content" | "post" | "schedule") => {
  //   setDefaultModalTabValue(tab);
  //   setAllowedTabs([tab]);
  //   setOpenModal(true);
  // };

  const renderSkeletons = () => {
    const count = formData?.variants ? Number(formData.variants) : 3;
    return (
      <div className="max-w-[80%] flex flex-wrap gap-6">
        <p className="text-xl font-semibold text-gray-900 mb-4 block font-bricolage-grotesque">
          Lots of clients are creating images right now, so this might take a bit!
        </p>
        <div className="flex flex-wrap gap-6">
          {Array.from({ length: count }, (_, index) => (
            <PostCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Top Bar */}
      {isCalendarView && (
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md bg-yellow-green hover:bg-light-yellow-green"
              onClick={() => {}}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium  text-center">
              {`${formatDate("2025-06-01T10:00:00.000Z", "do MMMM yyyy")} - ${formatDate("2025-06-30T10:00:00.000Z", "do MMMM yyyy")}`}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md bg-yellow-green hover:bg-light-yellow-green"
              onClick={() => {}}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {selectedPosts.length > 0 && (
            <div className="flex items-right gap-3">
              <div className="relative w-full">
                <select className="border rounded-full bg-base-grey-100 app border-grey-300 ps-6 py-1 pr-10 appearance-none">
                  <option>Selected</option>
                </select>
                <div className="pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2">
                  <ChevronDown className="w-12 h-5 text-gray-500 px-1" />
                </div>
              </div>
              <Button
                className="bg-black text-white px-4 py-1 rounded-full"
                onClick={() => {
                  setOpenModal((prev) => !prev);
                }}
              >
                Schedule
              </Button>
            </div>
          )}
        </div>
      )}
      {/* post Groups */}
      <div className="flex-1 p-8">
        <div className="flex-1 flex flex-row flex-wrap gap-6">
          {isLoading
            ? renderSkeletons()
            : posts.map((post, index) => (
                <PostCard
                  postsResponse={generatedPostsResponse || calendarResponse[index]}
                  post={post}
                  isSelected={
                    selectedPosts.filter(
                      (selectedPost: GeneratedPost) => selectedPost?.postId === post?.postId
                    )?.length > 0
                  }
                  handleSelectionChange={(post) => handleSelectionChange(post)}
                />
              ))}
        </div>

        <SocialMediaModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          defaultTabValue={defaultModalTabValue}
          allowedTabs={["schedule"]}
          isCalendarDisabled={true}
        />

        {openModalSkeleton && (
          <ModalSkeleton
            code={code}
            isOpen={openModalSkeleton}
            setIsOpen={setOpenModalSkeleton}
            activeModal={activeModal}
          />
        )}
      </div>
    </div>
  );
};

export default GeneratedPosts;
