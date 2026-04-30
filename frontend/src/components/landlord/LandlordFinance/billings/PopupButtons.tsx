import { type FunctionComponent } from 'react';

interface PopupButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isFormValid: boolean;
  submitText: string;
  cancelText?: string;
}

const PopupButtons: FunctionComponent<PopupButtonsProps> = ({
  onCancel,
  onSubmit,
  isFormValid,
  submitText,
  cancelText = 'CANCEL',
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <button
        onClick={onCancel}
        className="w-full sm:w-[220px] h-10 rounded-md border-whitesmoke-200 border-solid border-2 bg-white text-crimson font-inter text-[12px] sm:text-[14px] font-medium hover:bg-red-50 hover:border-crimson transition-all duration-200 cursor-pointer"
      >
        {cancelText}
      </button>
      <button
        onClick={onSubmit}
        className={`w-full sm:w-[216px] h-10 rounded-md font-inter text-[12px] sm:text-[14px] font-medium transition-all duration-200 ${
          isFormValid === true
            ? 'bg-lightcyan text-teal hover:bg-teal hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer'
            : 'bg-whitesmoke-200 text-silver cursor-not-allowed'
        }`}
        disabled={isFormValid !== true}
      >
        {submitText}
      </button>
    </div>
  );
};

export default PopupButtons;