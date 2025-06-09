import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RightSidebar from "@/components/dashboard/RightSidebar";
import PostCard from "@/components/dashboard/PostCard";
import PostCardSkeleton from "@/components/dashboard/PostCardSkeleton";
import { postServices } from "@/services/api/post";
import { useToast } from "@/hooks/use-toast";
import arrowLogo from "@/assests/svg/arrow.svg";

interface GeneratedPost {
  id: string;
  image: string;
  description: string;
}

const GeneratedPosts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection] = useState("create");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get the form data from navigation state
  const formData = location.state?.formData;

  useEffect(() => {
    if (!formData) {
      navigate("/dashboard/personal");
      return;
    }

    const generatePosts = async () => {
      try {
        setIsLoading(true);
        const payload = {
          promptText: formData.prompt,
          variantsCount: Number(formData.variants || 1),
          assetType: "image",
        };

        const response = await postServices.generatePost(payload);

        // Mock response structure - replace with actual API response structure
        const mockPosts: GeneratedPost[] = Array.from(
          { length: Number(formData.variants) },
          (_, index) => ({
            id: `post-${index + 1}`,
            image: "/lovable-uploads/d5081d4f-31ec-4f96-b0ff-f0572fa0526e.png",
            description: formData.prompt,
          })
        );

        setPosts(mockPosts);

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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-row w-full bg-white">
        <DashboardSidebar activeItem={activeSection} onItemSelect={() => {}} />
        <div className="flex-1 flex flex-col h-full">
          <DashboardHeader
            isRightSidebarOpen={isRightSidebarOpen}
            onToggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          />
          <div className="flex flex-1">
            <div className="flex-1 p-8 px-16">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 font-bricolage-grotesque">
                  Choose Post
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? renderSkeletons()
                  : posts.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            </div>

            {isRightSidebarOpen && <RightSidebar onClose={() => setIsRightSidebarOpen(false)} />}
            {!isRightSidebarOpen && (
              <div
                onClick={() => setIsRightSidebarOpen(true)}
                className="cursor-pointer w-[32px] h-[40px] bg-gray-100 flex justify-center items-center rounded-tl-md rounded-bl-md"
              >
                <img src={arrowLogo} alt="expand" className="rotate-180 w-[6px] h-[12px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GeneratedPosts;
