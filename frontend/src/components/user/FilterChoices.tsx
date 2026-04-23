import { FunctionComponent } from "react";

export type ChoicesType = {
  className?: string;
};

const Choices: FunctionComponent<ChoicesType> = ({ className = "" }) => {
  return (
    <div
      className={`relative rounded-num-12 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start py-[0.75rem] pl-[1rem] pr-[1.25rem] gap-[0.5rem] max-w-full max-h-full text-left text-[0.75rem] text-teal font-lora ${className}`}
    >
      <div className="rounded flex items-center justify-center">
        <div className="flex items-center justify-center gap-[0.625rem]">
          <div className="h-[1rem] w-[1rem] rounded-num-100 flex items-center justify-center relative isolate">
            <div className="h-[1.125rem] w-[1.125rem] relative rounded-num-2 bg-darkslategray-200 z-[0] shrink-0" />
            <img
              className="h-[1.5rem] w-[1.5rem] absolute !!m-[0 important] top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] z-[1] shrink-0"
              alt=""
            />
          </div>
          <div className="relative tracking-num-0_02 font-semibold">
            Visitors Allowed in Common Area
          </div>
        </div>
      </div>
      <div className="rounded flex items-center justify-center">
        <div className="flex items-center justify-center gap-[0.625rem]">
          <div className="h-[1rem] w-[1rem] rounded-num-100 flex items-center justify-center relative isolate">
            <div className="h-[1.125rem] w-[1.125rem] relative rounded-num-2 bg-darkslategray-200 z-[0] shrink-0" />
            <img
              className="h-[1.5rem] w-[1.5rem] absolute !!m-[0 important] top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] z-[1] shrink-0"
              alt=""
            />
          </div>
          <div className="relative tracking-num-0_02 font-semibold">
            Visitors Allowed in Unit (Relatives Only)
          </div>
        </div>
      </div>
      <div className="rounded flex items-center justify-center">
        <div className="flex items-center justify-center gap-[0.625rem]">
          <div className="h-[1rem] w-[1rem] rounded-num-100 flex items-center justify-center relative isolate">
            <div className="h-[1.125rem] w-[1.125rem] relative rounded-num-2 bg-darkslategray-200 z-[0] shrink-0" />
            <img
              className="h-[1.5rem] w-[1.5rem] absolute !!m-[0 important] top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] z-[1] shrink-0"
              alt=""
            />
          </div>
          <div className="relative tracking-num-0_02 font-semibold">{`Visitors Allowed in Unit `}</div>
        </div>
      </div>
      <div className="flex items-center justify-center text-slategray">
        <div className="flex items-center justify-center gap-[0.625rem]">
          <div className="h-[1rem] w-[1rem] rounded-num-100 flex items-center justify-center">
            <div className="h-[1.125rem] w-[1.125rem] relative rounded-num-2 border-slategray border-solid border-[1px] box-border" />
          </div>
          <div className="relative tracking-num-0_02 font-semibold">{`No Visitors Allowed in Common Area `}</div>
        </div>
      </div>
      <div className="flex items-center justify-center text-slategray">
        <div className="flex items-center justify-center gap-[0.625rem]">
          <div className="h-[1rem] w-[1rem] rounded-num-100 flex items-center justify-center">
            <div className="h-[1.125rem] w-[1.125rem] relative rounded-num-2 border-slategray border-solid border-[1px] box-border" />
          </div>
          <div className="relative tracking-num-0_02 font-semibold">{`No Visitors Allowed in Unit `}</div>
        </div>
      </div>
    </div>
  );
};

export default Choices;
