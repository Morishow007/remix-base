import { Star, Star as StarFilled, StarHalf } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <StarFilled
          key={index}
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 text-yellow-400" fill="#FFD700" />
      )}
      {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map(
        (_, index) => (
          <Star key={index} className="w-5 h-5 text-yellow-400" />
        )
      )}
    </div>
  );
}
