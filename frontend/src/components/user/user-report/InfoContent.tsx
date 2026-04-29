{/*interface InfoContentProps{
    reportStage:number,
    setReportStages: any
}

*/}

import { useNavigate } from "react-router-dom"
import FAQ from "../FAQ"
export default function InfoContent(props: any) {
  const navigate = useNavigate()
  const { reportStages, setReportStages } = props
  return (
    <>
      <p className="flex max-w-4xl text-center font-inter text-[14px] py-5">
        Your safety and comfort are our top priorities.
        If something isn't right, let us know. This simple three-step process
        helps us understand the issue clearly so we can take the necessary
        steps to resolve it quickly and keep our community secure.
      </p>
      <div className="flex flex-1 flex-col md:w-2xl  text-black  font-lora gap-4 py-10">

        <p className="text-[20px] font-bold mb-1">Frequently asked questions</p>

        <div className="grid grid-cols-1 w-full gap-y-4 font-semibold ">
          <FAQ question="What is the reporting process?" answer="Our reporting process is designed to be simple and effective. You can report any issues you encounter through our user-friendly interface." />
          <FAQ question="How long does it take to resolve a report?" answer="We strive to resolve all reports as quickly as possible. The timeline may vary depending on the complexity of the issue." />
          <FAQ question="Will my identity be disclosed?" answer="No, your identity will remain confidential throughout the reporting process." />
          <FAQ question="Will my report be shared with my landlord or dorm manager?" answer="Your report will be shared with your landlord or dorm manager to help them address any concerns. However, rest assured that your identity will remain confidential." />
        </div>
      </div>
      <div className="flex gap-10  font-inter font-bold py-10">
        <button className="px-4 py-1 cursor-pointer text-crimson rounded-full" onClick={() => {
          navigate(-1)
        }}>Go Back</button>
        <button className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full" onClick={() => {
          setReportStages(reportStages + 1)
        }}>Proceed</button>
      </div>
    </>
  )
}
