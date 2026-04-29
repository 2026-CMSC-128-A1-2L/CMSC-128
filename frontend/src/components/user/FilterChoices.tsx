import type { FunctionComponent } from 'react';

export type ChoicesType = {
  className?: string;
};

const Choices: FunctionComponent<ChoicesType> = ({ className = '' }) => {
  return (
    <div
      className={`relative rounded-num-12 bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start py-3 pl-4 pr-5 gap-2 max-w-full max-h-full text-left text-[0.75rem] text-teal font-lora ${className}`}
    >
      <div className="rounded flex items-center justify-center">
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-4 w-4 rounded-num-100 flex items-center justify-center relative isolate">
            <div className="h-4.5 w-4.5 relative rounded-num-2 bg-darkslategray-200 z-0 shrink-0" />
            <img
              className="h-6 w-6 absolute !!m-[0 important] top-[calc(50%-12px)] left-[calc(50%-12px)] z-1 shrink-0"
              alt=""
            />
          </div>
          <div className="relative tracking-num-0.02 font-semibold">
            Visitors Allowed in Common Area
          </div>
        </div>
      </div>
      <div className="rounded flex items-center justify-center">
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-4 w-4 rounded-num-100 flex items-center justify-center relative isolate">
            <div className="h-4.5 w-4.5 relative rounded-num-2 bg-darkslategray-200 z-0 shrink-0" />
            <img
              className="h-6 w-6 absolute !!m-[0 important] top-[calc(50%-12px)] left-[calc(50%-12px)] z-1 shrink-0"
              alt=""
            />
          </div>
          <div className="relative tracking-num-0.02 font-semibold">
            Visitors Allowed in Unit (Relatives Only)
          </div>
        </div>
      </div>
      <div className="rounded flex items-center justify-center">
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-4 w-4 rounded-num-100 flex items-center justify-center relative isolate">
            <div className="h-4.5 w-4.5 relative rounded-num-2 bg-darkslategray-200 z-0 shrink-0" />
            <img
              className="h-6 w-6 absolute !!m-[0 important] top-[calc(50%-12px)] left-[calc(50%-12px)] z-1 shrink-0"
              alt=""
            />
          </div>
          <div className="relative tracking-num-0.02 font-semibold">{`Visitors Allowed in Unit `}</div>
        </div>
      </div>
      <div className="flex items-center justify-center text-slategray">
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-4 w-4 rounded-num-100 flex items-center justify-center">
            <div className="h-4.5 w-4.5 relative rounded-num-2 border-slategray border-solid border box-border" />
          </div>
          <div className="relative tracking-num-0.02 font-semibold">{`No Visitors Allowed in Common Area `}</div>
        </div>
      </div>
      <div className="flex items-center justify-center text-slategray">
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-4 w-4 rounded-num-100 flex items-center justify-center">
            <div className="h-4.5 w-4.5 relative rounded-num-2 border-slategray border-solid border box-border" />
          </div>
          <div className="relative tracking-num-0.02 font-semibold">{`No Visitors Allowed in Unit `}</div>
        </div>
      </div>
    </div>
  );
};

export default Choices;
