import MyReview from "@/components/modules/Review/MyReview";

const Review = () => {
  return (
      <div>
    <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="text-gray-700">FEED</span>
            <span className="text-cyan-500">BACK</span>
          </h1>
        </div>
    <MyReview />
      </div>
  );
};

export default Review;