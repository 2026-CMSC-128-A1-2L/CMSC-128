{/*interface InfoContentProps{
    reportStage:number,
    setReportStages: any
}

*/}

import { useNavigate } from "react-router-dom"
import FAQ from "../FAQ"

export default function RateInfoContent(props: any) {
  const navigate = useNavigate()
  const { rateStages, setRateStages } = props
  return (
    <>
      <p className="flex max-w-4xl text-center font-inter text-[14px] py-5">
        Your experience matters! Help future residents find their perfect home by sharing your honest thoughts. This quick three-step process ensures your review provides the most helpful insights for the community.
      </p>
      <div className="flex flex-1 flex-col md:w-2xl  text-black  font-lora gap-4 py-10">

        <p className="text-[20px] font-bold mb-1">Frequently asked questions</p>

        <div className="grid grid-cols-1 w-full gap-y-4 font-semibold ">
          <FAQ question="How do I submit a rating and review?" answer="You're here already..." />
          <FAQ question="How long does it take for my review to appear?" answer="While many reviews appear instantly, some may undergo a standard moderation process to ensure they meet our community guidelines. This typically takes between 24 and 48 hours. If your review hasn't appeared after this window, please ensure it doesn't contain restricted content like external links or personal contact information." />
          <FAQ question="Can I update or remove a review after it’s published?" answer="You can try." />
          <FAQ question="Can I review other people's dormitories?" answer="No." />
        </div>
      </div>
      <div className="flex gap-10  font-inter font-bold py-10">
        <button className="px-4 py-1 cursor-pointer text-crimson rounded-full" onClick={() => {
          navigate(-1)
        }}>Go Back</button>
        <button className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full" onClick={() => {
          navigate("/rate-review-form")
        }}>Proceed</button>
      </div>
    </>
  )
}
