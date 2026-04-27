import { Icon } from '@iconify/react';
import { FunctionComponent, useState, useRef, useEffect } from 'react';
import PortalPopup from '../../../components/general/PortalPopup';

export type PaymentMethodsType = {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

const PaymentMethods: FunctionComponent<PaymentMethodsType> = ({
  className = '',
  isOpen = false,
  onClose,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const paymentMethods = ['GCash', 'Bank Transfer', 'Cash', 'Maya'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMethodDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    console.log({
      accountName,
      referenceNo,
      paymentMethod: selectedPaymentMethod,
    });
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
                <Icon icon="fluent:payment-16-regular" className="w-6 h-6" />
              </div>
              <b className="text-num-24 leading-8">Payment Methods</b>
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
          <div className="w-full h-0.5 bg-whitesmoke-200" />
        </div>

        {/* Content */}
        <div className="w-full overflow-y-auto flex-1 py-3 px-2.5 gap-4 text-num-18">
          {/* GCASH Section */}
          <div className="flex flex-col items-start gap-2 w-full mb-4">
            <div className="flex items-center w-full">
              <b className="text-num-18 tracking-num--0_01">GCASH QR CODE</b>
            </div>
            <div className="w-full rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[2px] flex flex-col items-center py-6 px-0 gap-3 text-center text-num-24 text-gray">
              <div className="overflow-hidden flex items-center justify-center">
                <Icon icon="grommet-icons:qr" className="w-20 h-20" />
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center p-2.5">
                  <b className="text-num-20 leading-8">09604709398</b>
                </div>
                <div className="flex items-center justify-center p-2.5 mt-[-16px] text-num-18 text-silver">
                  <b className="tracking-num--0_01">Quevin Custodio</b>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer Section */}
          <div className="flex flex-col items-start gap-2 w-full mb-4">
            <div className="flex items-center w-full">
              <b className="text-num-18 tracking-num--0_01">BANK TRANSFER</b>
            </div>
            <div className="w-full rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] flex flex-col items-start py-3 px-1.5 text-num-14 text-silver">
              <div className="w-full flex flex-col items-center justify-between gap-2">
                <div className="w-full flex flex-col items-start gap-1">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <b>Bank</b>
                    </div>
                    <div className="flex items-center text-teal">
                      <b>BPI</b>
                    </div>
                  </div>
                  <div className="w-full h-0.5 bg-whitesmoke-200" />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <b>Account Name</b>
                    </div>
                    <div className="flex items-center text-teal">
                      <b>Quevin Custodio</b>
                    </div>
                  </div>
                  <div className="w-full h-0.5 bg-whitesmoke-200" />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <b>Account No.</b>
                    </div>
                    <div className="flex items-center text-teal">
                      <b>0123 4567 8910</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Payment Details Section */}
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-center w-full">
              <b className="text-num-18 tracking-num--0_01">SUBMIT PAYMENT DETAILS</b>
            </div>
            <div className="w-full flex flex-col items-start gap-3 text-num-14 text-dimgray font-lora">
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Account Name"
                className="w-full rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] p-3 focus:outline-none focus:border-teal transition-colors"
              />
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="Reference/Transaction No."
                className="w-full rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] p-3 focus:outline-none focus:border-teal transition-colors"
              />

              {/* Payment Method Dropdown */}
              <div className="relative w-full" ref={dropdownRef}>
                <div
                  onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
                  className="w-full rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] flex items-center justify-between p-3 cursor-pointer hover:border-teal transition-colors"
                >
                  <div className={selectedPaymentMethod ? 'text-black' : 'text-dimgray'}>
                    {selectedPaymentMethod || 'Payment Method Used'}
                  </div>
                  <Icon icon="mdi-light:chevron-down" className="h-5 w-5 text-gray-400" />
                </div>

                {isMethodDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-whitesmoke-200 rounded-num-8 shadow-lg overflow-hidden animate-fade-in">
                    {paymentMethods.map((method) => (
                      <div
                        key={method}
                        onClick={() => {
                          setSelectedPaymentMethod(method);
                          setIsMethodDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-num-14 cursor-pointer hover:bg-whitesmoke-100 transition-colors"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Receipt Section */}
          <div className="w-full mt-4">
            <div className="w-full rounded-num-16 bg-white border-whitesmoke-200 border-dashed border-[2px] flex flex-col items-center py-6 px-0 gap-1 text-silver cursor-pointer hover:border-teal transition-all duration-200 hover:scale-[1.02] active:scale-95">
              <div className="overflow-hidden flex flex-col items-start">
                <Icon icon="mdi-light:cloud-upload" className="w-10 h-10" />
              </div>
              <div className="flex items-center justify-center p-2.5">
                <b>Upload receipt screenshot</b>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="w-full shrink-0 pt-4 mt-2 border-t border-whitesmoke-200">
          <button
            onClick={handleSubmit}
            className="w-full rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center p-3 transition-all duration-200 ease-in-out hover:bg-teal hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer group"
          >
            <div className="font-semibold text-num-14 text-teal group-hover:text-white transition-colors">
              Submit
            </div>
          </button>
        </div>
      </div>
    </PortalPopup>
  );
};

export default PaymentMethods;
