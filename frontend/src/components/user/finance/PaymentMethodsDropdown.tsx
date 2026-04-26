import { FunctionComponent, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import PaymentMethods from "./PaymentMethods";

interface PaymentMethodsDropdownProps {
  onSelect?: (method: string) => void;
}

const PaymentMethodsDropdown: FunctionComponent<
  PaymentMethodsDropdownProps
> = ({ onSelect }) => {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className="w-[200px] rounded-[12px] bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-2.5 box-border gap-2.5 cursor-pointer text-center text-[14px] text-teal hover:opacity-90 transition-opacity"
        ref={buttonContainerRef}
        onClick={openDropdown}
      >
        <div className="overflow-hidden flex flex-col items-start">
          <Icon icon="tabler:currency-peso" className="h-5 w-5" />
        </div>
        <div className="font-semibold">Payment Methods</div>
      </div>

      <PaymentMethods isOpen={isOpen} onClose={closeDropdown} />
    </>
  );
};

export default PaymentMethodsDropdown;
