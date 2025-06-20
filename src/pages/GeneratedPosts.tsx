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
    "content"
  );
  const [activeModal, setActiveModal] = useState<"welcome" | "linkedIn">(null);
  const [openModalSkeleton, setOpenModalSkeleton] = useState(false);
  const [generatedPostsResponse, setGeneratedPostsResponse] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setAuthData = useAuthStore((state) => state?.setAuthData);
  const postId = searchParams.get("postId");
  const isAgency = location.pathname === "/" || location.pathname.includes("agency");
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
  const generatedPostById = async (id: string) => {
    try {
      setIsLoading(true);
      // const response = await postServices.getPostById({ postId });
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
        _id: "684fb9559c79079b8faaaa36",
        createdAt: "2025-06-16T06:27:33.711Z",
        updatedAt: "2025-06-16T06:27:33.711Z",
        __v: 0,
      };
      setGeneratedPostsResponse(response);
      const postsInfo: GeneratedPost[] = Array.from(
        { length: response?.variantsCount },
        (_, index) => ({
          postIndex: index,
          postId: response?._id || "",
          image: response?.assetsData?.[index]?.assetUrl || "",
          description: response?.assetsData?.[index]?.caption || "",
          hashtags: response?.assetsData?.[index]?.hashtags || "",
          promptText: response.promptText,
        })
      );
      setPosts(postsInfo);
      toast({
        title: "Post Fetched Successfully",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to fetch post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePosts = async () => {
    try {
      setIsLoading(true);
      // const payload = {
      //   promptText: formData.prompt,
      //   variantsCount: Number(formData.variants || 1),
      //   assetType: "image",
      //   tone: formData?.selectedTones || [],
      // };

      // const response = await postServices.generatePost(payload);
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
        _id: "684fb9559c79079b8faaaa36",
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
        description: `Generated ${formData.variants} post variant(s)`,
      });
      const newParams = new URLSearchParams(searchParams);
      newParams.set("postId", response?._id);
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (code) return;
    if (postId) {
      generatedPostById(postId);
    } else {
      generatePosts();
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
      {isAgency && (
        <div className="flex items-center gap-4 mx-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md bg-yellow-green hover:bg-light-yellow-green"
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
              className="h-8 w-8 rounded-md bg-yellow-green hover:bg-light-yellow-green"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {selectedPosts.length > 0 && (
            <div className="flex items-right gap-3 ms-[50%]">
              <div className="relative w-full">
                <select className="border rounded-full bg-base-grey-100 app border-grey-300 ps-6 py-1 pr-10 appearance-none">
                  <option>Selected</option>
                </select>
                <div className="pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2">
                  <ChevronDown className="w-12 h-5 text-gray-500 px-1" />
                </div>
              </div>
              <Button className="bg-black text-white px-4 py-1 rounded-full" onClick={() => {}}>
                Schedule
              </Button>
            </div>
          )}
        </div>
      )}
      {/* post Groups */}
      <div className="flex-1 p-8">
        <div className="flex flex-wrap gap-6">
          {isLoading
            ? renderSkeletons()
            : posts.map((post, index) => (
                <PostCard
                  postsResponse={generatedPostsResponse}
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
        {/* <SocialMediaModal
          postsResponse={postsResponse}
          post={post}
          isOpen={openModal}
          setIsOpen={setOpenModal}
          defaultTabValue={defaultModalTabValue}
          allowedTabs={allowedTabs}
        /> */}
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
