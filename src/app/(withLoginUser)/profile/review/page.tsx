import MyReview from "@/components/modules/Review/MyReview";
import { myAllReviews } from "@/services/ReviewService";

const Review = async() => {
      const reviews = await myAllReviews();
      console.log(reviews);
  return (
      <div>
    <div className="text-center mb-6">
          {/* <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="text-gray-700">FEED</span>
            <span className="text-cyan-500">BACK</span>
          </h1> */}
        </div>
    <MyReview reviews={reviews} />
      </div>
  );
};

export default Review;

export const dynamic = 'force-dynamic'