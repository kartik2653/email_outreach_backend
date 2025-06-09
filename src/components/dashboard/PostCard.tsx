import { Button } from "@/components/ui/button";
import { Download, ThumbsUp, ThumbsDown, Pencil } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    image: string;
    description: string;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const handleDownload = () => {
    console.log("Download post:", post.id);
  };

  const handleLike = () => {
    console.log("Like post:", post.id);
  };

  const handleDislike = () => {
    console.log("Dislike post:", post.id);
  };

  const handleEdit = () => {
    console.log("Edit post:", post.id);
  };

  const handlePost = () => {
    console.log("Post:", post.id);
  };

  const handleRegenerate = () => {
    console.log("Regenerate post:", post.id);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
        <img src={post.image} alt="Generated post" className="w-full h-full object-cover" />
        {/* Regenerate Icon */}
        <button
          onClick={handleRegenerate}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>

        {/* Regenerate Button */}
        <button
          onClick={handleRegenerate}
          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors mb-4 ml-auto"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Primary Post Button */}
          <Button
            onClick={handlePost}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium"
          >
            Post
          </Button>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleLike}
              className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <ThumbsUp className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleDislike}
              className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <ThumbsDown className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleEdit}
              className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-50 transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
