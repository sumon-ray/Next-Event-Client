import ReviewForm from "../ReviewForm"
import ReviewCarosal from "./ReviewCarousal"

const ReviewButton = () => {
  return (
    <div className="lg:flex gap-4 justify-center items-center">
    {/* <div className=" text-end m-6"><ReviewButton></ReviewButton></div>
                          */}
        <div>
            <div className="flex justify-center items-center">
                 <ReviewCarosal />    </div>
        </div>
       
       <div className="flex justify-center items-center">
         <button className="bg-blue-800 text-white p-2 rounded-lg"><ReviewForm></ReviewForm></button>
       </div>
    </div>
  )
}

export default ReviewButton