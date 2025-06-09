import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-video p-4">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Description Lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Regenerate Button Skeleton */}
        <div className="flex justify-end">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center justify-between">
          {/* Primary Button */}
          <Skeleton className="h-10 w-16 rounded-full" />

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
