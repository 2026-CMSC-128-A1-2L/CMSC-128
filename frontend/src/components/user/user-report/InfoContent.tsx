interface InfoContentProps {
  reportStage: number;
  setReportStages: any;
}

export default function InfoContent(props: any) {
  const { reportStages, setReportStages } = props;
  return (
    <>
      <p className="flex max-w-4xl text-center font-inter text-[14px] py-5">
        Your safety and comfort are our top priorities. If something isn't right, let us know. This
        simple three-step process helps us understand the issue clearly so we can take the necessary
        steps to resolve it quickly and keep our community secure.
      </p>
      <div className="flex flex-col max-w-[714px]  text-black  font-lora gap-4 py-10">
        <p className="text-[20px] font-bold mb-1">Frequently asked questions</p>

        <div className="grid grid-cols-2 gap-x-5 gap-y-4 font-semibold ">
          <button
            className="w-full md:w-85 px-6 py-3 text-left  transition-colors bg-whitesmoke-200 cursor-pointer hover:bg-[#e0e0e0]"
            onClick={() => {}}
          >
            <p>What happens next?</p>
          </button>
          <button
            className="w-full md:w-85 px-6 py-3 text-left transition-colors bg-whitesmoke-200 cursor-pointer hover:bg-[#e0e0e0]"
            onClick={() => {}}
          >
            <p>What happens next?</p>
          </button>
          <button
            className="w-full md:w-85 px-6 py-3 text-left transition-colors bg-whitesmoke-200 cursor-pointer hover:bg-[#e0e0e0]"
            onClick={() => {}}
          >
            <p>What happens next?</p>
          </button>
          <button
            className="w-full md:w-85 px-6 py-3 text-left transition-colors bg-whitesmoke-200 cursor-pointer hover:bg-[#e0e0e0]"
            onClick={() => {}}
          >
            <p>What happens next?</p>
          </button>
        </div>
      </div>
      <div className="flex gap-10  font-inter font-bold py-10">
        <button
          className="px-4 py-1 cursor-pointer text-crimson rounded-full"
          onClick={() => {
            // ideally route back to Current Dorm page
          }}
        >
          Go Back
        </button>
        <button
          className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full"
          onClick={() => {
            setReportStages(reportStages + 1);
          }}
        >
          Proceed
        </button>
      </div>
    </>
  );
}
