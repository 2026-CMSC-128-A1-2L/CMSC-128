import type { FunctionComponent } from 'react';

interface InvitationButtonsProps {
  onAccept: () => void;
  onCancel?: () => void;
}

const InvitationButtons: FunctionComponent<InvitationButtonsProps> = ({ onAccept, onCancel }) => {
  return (
    <div className="flex items-center text-left text-[20.87px] text-crimson">
      <div className="flex items-center gap-[23.9px]">
        <div
          className="w-[148px] rounded-[17.89px] flex items-center justify-center py-[11.9px] px-[35.8px] box-border cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onCancel}
        >
          <div className="relative font-semibold inline-block max-w-[401.25px]">Cancel</div>
        </div>
        <div
          className="w-[148px] rounded-[17.89px] bg-lightcyan overflow-hidden shrink-0 flex items-center justify-center py-[11.9px] px-[35.8px] box-border cursor-pointer text-teal-200 hover:opacity-90 transition-opacity"
          onClick={onAccept}
        >
          <div className="relative font-semibold inline-block max-w-[401.25px]">Accept</div>
        </div>
      </div>
    </div>
  );
};

export default InvitationButtons;
