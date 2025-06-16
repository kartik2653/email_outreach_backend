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
  const [activeSection] = useState("create");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [openLinkedInModal, setOpenLinkedInModal] = useState(false);
  const [activeModal, setActiveModal] = useState<"welcome" | "linkedIn">(null);
  const [openModalSkeleton, setOpenModalSkeleton] = useState(false);
  const [generatedPostsResponse, setGeneratedPostsResponse] = useState(null);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const setAuthData = useAuthStore((state)=>state?.setAuthData)

  // Get the form data from navigation state
  const formData = location.state?.formData;

  const verifyLinkedInCode = async(code:string) =>{
    try {
      const response =  await linkedInService.linkedInVerifyCode({
        code,
        redirectUri: `${window.location.origin}/dashboard/personal/generated-posts`,
      });
     setOpenModalSkeleton(true);
       setAuthData({linkedInCredentials:{
        isAccessProvided : true
      }})
    } catch (error) {
      toast({
          title: "Error",
          description: "Error in code verification",
          variant: "destructive",
        });
    }

  }

  useEffect(() => {
    if (code) {
      verifyLinkedInCode(code)
    }
  }, [code, navigate]);

  useEffect(() => {
    if (code) return;
    const generatePosts = async () => {
      try {
        setIsLoading(true);
        const payload = {
          promptText: formData.prompt,
          variantsCount: Number(formData.variants || 1),
          assetType: "image",
          tone: formData?.selectedTones || [],
        };

        const response = await postServices.generatePost(payload);
        // const response = {
        //   userId: "6836a1bc78c5834c58fac072",
        //   promptText: "Fish in a bowl",
        //   variantsCount: 2,
        //   tone: ["infomative"],
        //   assetsData: [
        //     {
        //       assetUrl:
        //         "http://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/ogxx67nbgg3gvqzmpfm0.png",
        //       secureAssetUrl:
        //         "https://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/ogxx67nbgg3gvqzmpfm0.png",
        //       assetType: "image",
        //       caption:
        //         "Did you know? A fishbowl requires regular cleaning to keep your aquatic friend healthy and happy.",
        //       hashtags: "#FishCare, #AquariumTips, #PetFish, #HealthyFish, #FishBowlFacts",
        //       isLiked: false,
        //       isDisliked: false,
        //       _id: "684fb9559c79079b8faaaa37",
        //     },
        //     {
        //       assetUrl:
        //         "http://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/uqthjyc28zevokt3jcht.png",
        //       secureAssetUrl:
        //         "https://res.cloudinary.com/dhvsscmw8/image/upload/v1750055251/uqthjyc28zevokt3jcht.png",
        //       assetType: "image",
        //       caption:
        //         "Keeping fish in a bowl? Ensure proper oxygen levels and avoid overcrowding for a balanced ecosystem.",
        //       hashtags: "#FishTankCare, #AquariumLife, #PetCareTips, #FishBowl, #CleanWater",
        //       isLiked: false,
        //       isDisliked: false,
        //       _id: "684fb9559c79079b8faaaa38",
        //     },
        //   ],
        //   assetType: "image",
        //   isPublished: false,
        //   dateOfPublication: null,
        //   assetIndexForPublication: 0,
        //   _id: "684fb9559c79079b8faaaa36",
        //   createdAt: "2025-06-16T06:27:33.711Z",
        //   updatedAt: "2025-06-16T06:27:33.711Z",
        //   __v: 0,
        // };
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
          title: "Posts Generated Successfully",
          description: `Generated ${formData.variants} post variant(s)`,
        });
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

    generatePosts();
  }, [formData, navigate, toast]);

  const renderSkeletons = () => {
    const count = formData?.variants ? Number(formData.variants) : 3;
    return (
      <div>
        <p className="text-xl font-semibold text-gray-900 mb-4 block font-bricolage-grotesque">
          Lots of clients are creating images right now, so this might take a bit!
        </p>
        {Array.from({ length: count }, (_, index) => (
          <PostCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 p-8 px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? renderSkeletons()
          : posts.map((post) => (
              <PostCard postsResponse={generatedPostsResponse} key={post.postId} post={post} />
            ))}
      </div>
      {/* {openLinkedInModal  && <LinkedInModal code={code} isOpen={openLinkedInModal} setIsOpen={setOpenLinkedInModal} />} */}
      {openModalSkeleton  && <ModalSkeleton code={code} isOpen={openModalSkeleton} setIsOpen={setOpenModalSkeleton} activeModal={activeModal} />}
    </div>
  );
};

export default GeneratedPosts;
