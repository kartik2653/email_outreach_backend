import { Button } from "@/components/ui/button";
import SocialMediaModal from "../SocialMediaModal";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import ModalSkeleton from "../ModalSkeleton";
import Modal from "@mui/material/Modal";
import { useToast } from "@/hooks/use-toast";
import { postServices } from "@/services/api/post";

interface PostCardProps {
  post: {
    postIndex: number;
    postId: string;
    image: string;
    description: string;
    hashtags: string;
  };
  postsResponse: {
    _id: string;
    assetUrl: string[];
    captions: string[];
    hashtags: string[];
    promptText: string;
    variantsCount: number;
    secureAssetUrl: string[];
    assetType: string;
  };
}

const PostCard = ({ postsResponse, post }: PostCardProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [caption, setCaption] = useState(`${post.description}\n\n${post.hashtags}`); // Combine description and hashtags with two newlines for gap
  const [defaultModalTabValue, setDefaultModalTabValue] = useState<"content" | "post" | "schedule" | "modal">("content");
 const [active, activeModal] = useState<"welcome" | "linkedIn">(null);
  const { toast } = useToast();
  const handleDownload = () => {
    console.log("Download post:", post.postId);
    window.open(post?.image, "_blank");
  };

  const handleLike = async () => {
    const payload = {
      postId: post.postId,
      variationIndex: post.postIndex,
      isLiked: 1,
      isDisliked: 0,
    };
    await postServices?.updatePostVariant(payload);
    toast({
      title: "Post liked!",
      description: `You liked the post variant ${post.postIndex + 1}`,
      variant: "default",
    });
  };

  const handleDislike = async () => {
    const payload = {
      postId: post.postId,
      variationIndex: post.postIndex,
      isLiked: 0,
      isDisliked: 1,
    };
    await postServices?.updatePostVariant(payload);
    toast({
      title: "Post disliked!",
      description: `You disliked the post variant ${post.postIndex + 1}`,
      variant: "default",
    });
  };

  const handleEdit = () => {
    setDefaultModalTabValue("post");
    setOpenModal(true);
  };

  const handlePost = () => {
    setDefaultModalTabValue("schedule");
    setOpenModal(true);
  };

  const handleCaptionRegenerate = () => {
    setDefaultModalTabValue("content");
    setOpenModal(true);
  };

  const handleImageRegenerate = () => {
    setDefaultModalTabValue("post");
    setOpenModal(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-2 border-base-grey-300 overflow-hidden  hover:shadow-md transition-shadow w-[120%]">
      {/* Image Container */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
        <img src={post.image} alt="Generated post" className="w-full h-full object-contain" />
        {/* Regenerate Icon */}
        <button
          onClick={handleImageRegenerate}
          className="absolute bottom-1 right-1 w-8 h-8 flex items-center justify-center transition-colors"
        >
          <img src="/src/assests/svg/anticlockwiseArrow.svg" alt="" />
        </button>
      </div>

      {/* Content */}
      <div>
        <div className="space-y-4 relative my-3">
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-32 resize-none border-base-grey-300 rounded-2xl text-dark-charcoal"
            placeholder="Write your caption here..."
          />
          <button
            onClick={handleCaptionRegenerate}
            className="w-8 h-8 rounded-md border border-base-grey-300 flex items-center justify-center hover:bg-gray-200 transition-colors ml-auto absolute bottom-2 right-2"
          >
            <img src="/src/assests/svg/anticlockwiseArrow-black.svg" alt="" />
          </button>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Primary Post Button */}
          <Button
            onClick={handlePost}
            className="bg-black hover:bg-gray-800 text-white w-76 h-35 font-18 px-6 py-2 rounded-full "
          >
            Post
          </Button>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="w-8 h-8 border-2 border-green-400 rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <img src="/src/assests/svg/Download.svg" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleLike}
              className="w-8 h-8 border-2 border-green-400 rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <img src="/src/assests/svg/thumbup.svg" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleDislike}
              className="w-8 h-8 border-2 border-green-400 rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <img src="/src/assests/svg/downthumb.svg" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleEdit}
              className="w-8 h-8 border-2 border-green-400 rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <img src="/src/assests/svg/pencil.svg" className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <SocialMediaModal
        postsResponse={postsResponse}
        post={post}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        defaultTabValue={defaultModalTabValue}
      />
      <ModalSkeleton
        isOpen={openModal}
        setIsOpen={setOpenModal}
        activeModal={active}
      />
    </div>
  );
};

export default PostCard;
