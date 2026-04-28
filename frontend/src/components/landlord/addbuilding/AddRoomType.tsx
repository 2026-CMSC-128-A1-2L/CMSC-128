<<<<<<< HEAD
import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

const AddRoomType: FunctionComponent = () => {
  <div className="w-full h-[100px] rounded-xl border border-whitesmoke overflow-hidden flex flex-col items-center justify-center">
    <Icon icon="material-symbols:add-rounded" className="w-8 h-8" color="#096C5B" />
  </div>;
=======
import type { FunctionComponent } from "react";
import { Icon } from "@iconify/react";

const AddRoomType: FunctionComponent = () => {
  return (
    <div className="w-full h-[100px] rounded-xl border border-whitesmoke overflow-hidden flex flex-col items-center justify-center">
      <Icon icon="material-symbols:add-rounded" className="w-8 h-8" color="#096C5B" />
    </div>


  );
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
};

export default AddRoomType;
