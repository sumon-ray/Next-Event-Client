import ReviewForm from "../ReviewForm"
import ReviewCard from "../ReviewCard"

const ReviewButton = () => {
  return (
    <div className="flex justify-center items-center">
    {/* <div className=" text-end m-6"><ReviewButton></ReviewButton></div>
                          */}
        <div>
            <div>
                <ReviewCard />
            </div>
        </div>
       
        <button className="bg-blue-800 text-white p-2 rounded-lg"><ReviewForm></ReviewForm></button>
    </div>
  )
}

export default ReviewButton