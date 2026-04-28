<<<<<<< HEAD
import React from 'react';
=======

>>>>>>> af025055f14b35dfeb8093ed004226db6b313833

interface FinalizeDisplayLinesProps {
  category: string;
  item?: any;
}

export default function FinalizeDisplayLines(props: FinalizeDisplayLinesProps) {
  const { category, item } = props;
  return (
    <div className="flex flex-col gap-2 font-lora">
      <div className="grid grid-cols-2">
        <p>{category}</p>
        <p>{item}</p>
      </div>
      <div className="w-full py-0.5 bg-[#f0f0f0] rounded-full"></div>
    </div>
  );
}
