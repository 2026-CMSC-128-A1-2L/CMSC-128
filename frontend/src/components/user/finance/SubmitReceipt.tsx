import { type FunctionComponent, useState } from "react";
import { Icon } from "@iconify/react";
import PortalPopup from "../../../components/general/PortalPopup";

export type SubmitReceiptType = {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  dueDate?: string;
  dueAmount?: number;
  onSubmit?: (data: {
    referenceNo: string;
    paymentMethod: string;
    receiptFile: File | null;
  }) => void;
};

const SubmitReceipt: FunctionComponent<SubmitReceiptType> = ({
  className = "",
  isOpen = false,
  onClose,
  dueDate = "",
  dueAmount = 0,
  onSubmit,
}) => {
  const [referenceNo, setReferenceNo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);

  const paymentMethods = ["GCash", "Bank Transfer", "Cash", "Maya"];

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        referenceNo,
        paymentMethod,
        receiptFile: null,
      });
    }
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.5)"
      placement="Centered"
      onOutsideClick={onClose}
      zIndex={100}
    >
      <div
        className={`relative w-[480px] max-h-[90vh] rounded-num-16 bg-white overflow-y-auto flex flex-col items-start p-8 box-border text-left text-num-24 text-black font-inter ${className}`}
      >
        {/* Header */}
        <div className="flex flex-col items-start gap-2.5 w-full shrink-0">
          <div className="self-stretch flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="overflow-hidden flex items-center">
                <Icon icon="boxicons:receipt" className="w-6 h-6" />
              </div>
              <b className="text-num-24 leading-8">Submit Receipt</b>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-num-14 text-dimgray">
                <b>Due: {dueDate}</b>
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-whitesmoke-100"
              >
                <Icon
                  icon="fontisto:close"
                  className="w-5 h-5 text-darkslategray-100 hover:text-crimson transition-colors"
                />
              </button>
            </div>
          </div>
          <div className="w-full h-0.5 bg-whitesmoke-200" />
        </div>

        {/* Content */}
        <div className="w-full overflow-y-auto flex-1 py-3 px-2.5 gap-4 text-center text-num-14 text-dimgray">
          {/* Due Amount */}
          <div className="w-full flex flex-col items-start gap-2 text-left mb-4">
            <div className="flex items-center w-full">
              <b>
                <span>Due: </span>
                <span className="text-num-18 tracking-num--0_01 text-teal">
                  {dueAmount.toFixed(2)} php
                </span>
              </b>
            </div>

            {/* Form Fields */}
            <div className="w-full flex flex-col items-start gap-3 font-lora">
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="Reference/Transaction No."
                className="w-full rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] p-3 focus:outline-none focus:border-teal transition-colors"
              />

              {/* Payment Method Dropdown */}
              <div className="relative w-full">
                <div
                  onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
                  className="w-full rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] flex items-center justify-between p-3 cursor-pointer hover:border-teal transition-colors"
                >
                  <div
                    className={paymentMethod ? "text-black" : "text-dimgray"}
                  >
                    {paymentMethod || "Payment Method Used"}
                  </div>
                  <Icon
                    icon="mdi-light:chevron-down"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>

                {isMethodDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsMethodDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-whitesmoke-200 rounded-num-8 shadow-lg overflow-hidden animate-fade-in">
                      {paymentMethods.map((method) => (
                        <div
                          key={method}
                          onClick={() => {
                            setPaymentMethod(method);
                            setIsMethodDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-num-14 cursor-pointer hover:bg-whitesmoke-100 transition-colors"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Upload Receipt */}
          <div className="w-full rounded-num-16 bg-white border-whitesmoke-200 border-dashed border-[2px] flex flex-col items-center py-6 px-0 gap-1 text-silver cursor-pointer hover:border-teal transition-all duration-200 hover:scale-[1.02] active:scale-95">
            <div className="overflow-hidden flex flex-col items-start">
              <Icon icon="mdi-light:cloud-upload" className="w-10 h-10" />
            </div>
            <div className="flex items-center justify-center p-2.5">
              <b>Upload receipt screenshot</b>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full overflow-hidden flex flex-col items-center justify-center pt-2 text-center text-num-14 text-teal">
            <button
              onClick={handleSubmit}
              className="w-full rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center p-3 transition-all duration-200 ease-in-out hover:bg-teal hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer group"
            >
              <div className="font-semibold group-hover:text-white transition-colors">
                Submit
              </div>
            </button>
          </div>
        </div>
      </div>
    </PortalPopup>
  );
};

export default SubmitReceipt;
