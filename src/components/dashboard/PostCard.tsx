import { Button } from "@/components/ui/button";
import { Download, ThumbsUp, ThumbsDown, Pencil } from "lucide-react";
import SocialMediaModal from "../SocialMediaModal";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

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
  const [defaultModalTabValue, setDefaultModalTabValue] = useState<"content" | "post" | "schedule">(
    "content"
  );

  const handleDownload = () => {
    console.log("Download post:", post.postId);
  };

  const handleLike = () => {
    console.log("Like post:", post.postId);
  };

  const handleDislike = () => {
    console.log("Dislike post:", post.postId);
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
    <div className="bg-white p-4 rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
        <img src={post.image} alt="Generated post" className="w-full h-full object-cover" />
        {/* Regenerate Icon */}
        <button
          onClick={handleImageRegenerate}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
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
            className="min-h-32 resize-none border-gray-200 rounded-2xl text-gray-800"
            placeholder="Write your caption here..."
          />
          <button
            onClick={handleCaptionRegenerate}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors ml-auto absolute bottom-3 right-3"
          >
            <img src="/src/assests/svg/anticlockwiseArrow.svg" alt="" />
          </button>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Primary Post Button */}
          <Button
            onClick={handlePost}
            className="bg-black hover:bg-gray-800 text-white w-[76px] h-[35px] text-[18px] px-6 py-2 rounded-full font-medium"
          >
            Post
          </Button>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="w-8 h-8 border-2 border-light-yellow-green rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleLike}
              className="w-8 h-8 border-2 border-light-yellow-green rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <ThumbsUp className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleDislike}
              className="w-8 h-8 border-2 border-light-yellow-green rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <ThumbsDown className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleEdit}
              className="w-8 h-8 border-2 border-light-yellow-green rounded-lg flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
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
    </div>
  );
};

export default PostCard;
