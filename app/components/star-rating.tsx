import { Star, StarIcon as StarFilled } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <StarFilled
          key={`full-${index}`}
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <div className="relative w-5 h-5">
          <Star className="w-5 h-5 text-yellow-400 absolute top-0 left-0" />

          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <StarFilled className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}

      {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map(
        (_, index) => (
          <Star key={`empty-${index}`} className="w-5 h-5 text-yellow-400" />
        )
      )}
    </div>
  );
}
