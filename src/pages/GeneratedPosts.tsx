import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PostCard from "@/components/dashboard/PostCard";
import PostCardSkeleton from "@/components/dashboard/PostCardSkeleton";
import { useToast } from "@/hooks/use-toast";
import LinkedInModal from "@/components/LinkedInModal";
import { linkedInService } from "@/services/api/linkedinService";
import { postServices } from "@/services/api/post";

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
  const [generatedPostsResponse, setGeneratedPostsResponse] = useState(null);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get the form data from navigation state
  const formData = location.state?.formData;

  useEffect(() => {
    if (code) {
      const response = linkedInService.linkedInVerifyCode({
        code,
        redirectUri: `${window.location.origin}/dashboard/personal/generated-posts`,
      });
      setOpenLinkedInModal(true);
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
        };

        // const response = await postServices.generatePost(payload);
        const response = {
          userId: "6847c409128407240203d327",
          promptText: "fish in a bowl",
          variantsCount: 1,
          captions: ["Just keep swimming in this tiny blue world!"],
          hashtags: ["#FishLife, #AquariumGoals, #UnderwaterVibes, #PetLove, #MarineMagic"],
          assetUrl: [
            "http://res.cloudinary.com/dhvsscmw8/image/upload/v1749727714/cezipzka6tqcshe390ys.png",
          ],
          secureAssetUrl: [
            "https://res.cloudinary.com/dhvsscmw8/image/upload/v1749727714/cezipzka6tqcshe390ys.png",
          ],
          assetType: "image",
          isPublished: false,
          dateOfPublication: null,
          assetIndexForPublication: 0,
          _id: "684ab9e3cbb2725eb6d581b1",
          createdAt: "2025-06-12T11:28:35.235Z",
          updatedAt: "2025-06-12T11:28:35.235Z",
          __v: 0,
        };
        setGeneratedPostsResponse(response);
        const postsInfo: GeneratedPost[] = Array.from(
          { length: response?.variantsCount },
          (_, index) => ({
            postIndex: index,
            postId: response?._id || "",
            image: response?.assetUrl?.[index] || "",
            description: response.captions[index],
            hashtags: response.hashtags[index],
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
    return Array.from({ length: count }, (_, index) => (
      <PostCardSkeleton key={`skeleton-${index}`} />
    ));
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
      <LinkedInModal code={code} isOpen={openLinkedInModal} setIsOpen={setOpenLinkedInModal} />
    </div>
  );
};

export default GeneratedPosts;
