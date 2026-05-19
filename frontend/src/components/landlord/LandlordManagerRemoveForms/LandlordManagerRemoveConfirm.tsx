import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  managerName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const LandlordManagerRemoveConfirm: FunctionComponent<Props> = ({
  managerName,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="relative flex w-[480px] flex-col items-start overflow-hidden rounded-[16px] bg-white p-[32px]">
      <div className="flex w-full flex-col items-center gap-[24px] overflow-hidden px-[10px] pt-[40px] pb-[16px]">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-center bg-white px-[3px] py-[5px]">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#fef2f2]">
              <Icon
                icon="solar:trash-bin-trash-bold"
                className="h-[56px] w-[56px] text-[#dc2626]"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[10px] p-[10px] text-center">
            <b className="w-full font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">
              Remove Manager?
            </b>
            <p className="w-full font-['Inter',sans-serif] text-[14px] leading-[20px] font-medium text-black">
              You are about to remove <b>{managerName}</b> as a manager. They will lose access to
              all assigned properties and permissions.
            </p>
            <p className="w-full font-['Inter',sans-serif] text-[14px] leading-[20px] font-medium text-[#666]">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-[12px] p-[10px]">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[12px] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#666] transition-opacity hover:opacity-70 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-[12px] bg-[#fef2f2] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#dc2626] transition-opacity hover:opacity-80 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordManagerRemoveConfirm;
