import { type FunctionComponent, useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PortalPopup from '../../../components/general/PortalPopup';
import { BillingService } from '../../../service/BillingService';
import { FileService } from '../../../service/FileService';
import { FacilityService } from '../../../service/FacilityService';

type PaymentMethodData = {
  name: string;
  accountNumber: string;
  qrImage: string;
};

type FacilityPayment = {
  enabled: boolean;
  gcash: PaymentMethodData | null;
  bank: PaymentMethodData | null;
};

export type SubmitReceiptType = {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  billingId: string;
  facilityId?: string;
  dueDate?: string;
  dueAmount?: number;
  onSubmit?: (data: {
    referenceNo: string;
    paymentMethod: string;
    receiptFile: File | null;
    accountName?: string;
  }) => void;
};

const resolveQrUrl = (value: string): string => {
  if (!value) return '';
  if (value.startsWith('http') || value.startsWith('/api/')) return value;
  return `/api/files/public?key=${encodeURIComponent(value)}`;
};

function extractPayment(facilityData: any): FacilityPayment {
  const p = facilityData?.payment;
  if (!p || !p.enabled) return { enabled: false, gcash: null, bank: null };

  const gcash: PaymentMethodData | null = p.gcash
    ? {
        name: p.gcash.name ?? '',
        accountNumber: p.gcash.accountNumber ?? '',
        qrImage: p.gcash.qrImage ? resolveQrUrl(p.gcash.qrImage) : '',
      }
    : null;

  const bank: PaymentMethodData | null = p.bank
    ? {
        name: p.bank.name ?? '',
        accountNumber: p.bank.accountNumber ?? '',
        qrImage: p.bank.qrImage ? resolveQrUrl(p.bank.qrImage) : '',
      }
    : null;

  return { enabled: true, gcash, bank };
}

//  Component 

const SubmitReceipt: FunctionComponent<SubmitReceiptType> = ({
  className = '',
  isOpen = false,
  onClose,
  billingId,
  facilityId,
  dueDate = '',
  dueAmount = 0,
  onSubmit,
}) => {
  //  Payment method data (fetched from landlord's facility) 
  const [facilityPayment, setFacilityPayment] = useState<FacilityPayment | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  //  Form state 
  const [referenceNo, setReferenceNo] = useState('');
  const [accountName, setAccountName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //  Fetch landlord payment config whenever the modal opens 
  useEffect(() => {
    if (!isOpen || !facilityId) return;

    let cancelled = false;
    setIsLoadingPayment(true);
    setFacilityPayment(null);

    FacilityService.getFacility(facilityId)
      .then((res) => {
        if (!cancelled) {
          const data = res.data ?? res;
          setFacilityPayment(extractPayment(data));
        }
      })
      .catch(() => {
        if (!cancelled) setFacilityPayment({ enabled: false, gcash: null, bank: null });
      })
      .finally(() => {
        if (!cancelled) setIsLoadingPayment(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, facilityId]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setReferenceNo('');
      setAccountName('');
      setPaymentMethod('');
      setReceiptFile(null);
      setSubmitError(null);
    }
  }, [isOpen]);

  //  Derive available payment methods from facility config 
  const availableMethods: string[] = [];
  if (facilityPayment?.gcash) availableMethods.push('GCash');
  if (facilityPayment?.bank) availableMethods.push('Bank Transfer');
  // Always allow Cash as a fallback option
  availableMethods.push('Cash');

  const toApiMethod = (label: string): 'gcash' | 'bank_transfer' | 'cash' => {
    if (label === 'GCash') return 'gcash';
    if (label === 'Bank Transfer') return 'bank_transfer';
    if (label === 'Cash') return 'cash';
    return 'cash';
  };

  //  Handlers 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setReceiptFile(file);
  };

  const handleSubmit = async () => {
    if (!receiptFile || !paymentMethod) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const uploadRes = await FileService.uploadFile(receiptFile);
      const fileKey: string = uploadRes.key;

      await BillingService.submitBillingPayment(billingId, {
        paymentMethod: toApiMethod(paymentMethod),
        file: fileKey,
      });

      onSubmit?.({ referenceNo, paymentMethod, receiptFile, accountName });
      onClose?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit payment. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const canSubmit = !!receiptFile && !!paymentMethod && !isSubmitting;

  //  Selected method details 
  const selectedGcash = paymentMethod === 'GCash' ? facilityPayment?.gcash : null;
  const selectedBank = paymentMethod === 'Bank Transfer' ? facilityPayment?.bank : null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.5)"
      placement="Centered"
      onOutsideClick={onClose}
      zIndex={100}
    >
      <div
        className={`relative w-[480px] max-h-[90vh] rounded-2xl bg-white overflow-y-auto flex flex-col items-start p-8 box-border text-left text-2xl text-black font-inter ${className}`}
      >
        {/*  Header  */}
        <div className="flex flex-col items-start gap-2.5 w-full shrink-0">
          <div className="self-stretch flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Icon icon="boxicons:receipt" className="w-6 h-6" />
              <b className="text-2xl leading-8">Pay Now</b>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-dimgray">
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

        {/*  Content  */}
        <div className="w-full overflow-y-auto flex-1 py-3 px-2.5 gap-4 text-center text-sm text-dimgray">
          {/* Due Amount */}
          <div className="w-full flex flex-col items-start gap-2 text-left mb-4">
            <div className="flex items-center w-full">
              <b>
                <span>Due: </span>
                <span className="text-lg tracking-[-0.01em] text-teal">
                  ₱{dueAmount.toFixed(2)}
                </span>
              </b>
            </div>

            {/* Loading state */}
            {isLoadingPayment && (
              <p className="text-xs text-dimgray animate-pulse">Loading payment options…</p>
            )}

            {/* Form Fields */}
            <div className="w-full flex flex-col items-start gap-3 font-lora">
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Account Name"
                className="w-full rounded-lg bg-white border-whitesmoke-200 border-solid border-2 p-3 focus:outline-none focus:border-teal transition-colors"
              />
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="Reference/Transaction No."
                className="w-full rounded-lg bg-white border-whitesmoke-200 border-solid border-2 p-3 focus:outline-none focus:border-teal transition-colors"
              />

              {/* Payment Method Dropdown */}
              <div className="relative w-full">
                <div
                  onClick={() => setIsMethodDropdownOpen((v) => !v)}
                  className="w-full rounded-lg bg-white border-whitesmoke-200 border-solid border-2 flex items-center justify-between p-3 cursor-pointer hover:border-teal transition-colors"
                >
                  <div className={paymentMethod ? 'text-black' : 'text-dimgray'}>
                    {paymentMethod || 'Select Payment Method'}
                  </div>
                  <Icon icon="mdi-light:chevron-down" className="h-5 w-5 text-gray-400" />
                </div>

                {isMethodDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsMethodDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
                      {availableMethods.map((method) => (
                        <div
                          key={method}
                          onClick={() => {
                            setPaymentMethod(method);
                            setIsMethodDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-whitesmoke-100 transition-colors text-left"
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

          {/*  GCash details (from landlord)  */}
          {selectedGcash && (
            <div className="flex flex-col items-start gap-2 w-full mb-4 animate-fade-in">
              <b className="text-base tracking-[-0.01em]">GCASH QR CODE</b>
              <div className="w-full rounded-2xl bg-white border-whitesmoke-200 border-solid border-2 flex flex-col items-center py-6 px-4 gap-3 text-center text-2xl text-gray">
                {selectedGcash.qrImage ? (
                  <img
                    src={selectedGcash.qrImage}
                    alt="GCash QR Code"
                    className="h-32 w-32 object-contain rounded-lg border border-whitesmoke-200"
                  />
                ) : (
                  <Icon icon="grommet-icons:qr" className="w-20 h-20" />
                )}
                <div className="flex flex-col items-center">
                  {selectedGcash.accountNumber && (
                    <div className="flex items-center justify-center p-2.5">
                      <b className="text-xl leading-8">{selectedGcash.accountNumber}</b>
                    </div>
                  )}
                  {selectedGcash.name && (
                    <div className="flex items-center justify-center p-2.5 mt-[-16px] text-lg text-silver">
                      <b className="tracking-[-0.01em]">{selectedGcash.name}</b>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/*  Bank Transfer details (from landlord)  */}
          {selectedBank && (
            <div className="flex flex-col items-start gap-2 w-full mb-4 animate-fade-in">
              <b className="text-base tracking-[-0.01em]">BANK TRANSFER</b>
              <div className="w-full rounded-2xl bg-white border-whitesmoke-200 border-solid border flex flex-col items-start py-3 px-1.5 text-sm text-silver">
                <div className="w-full flex flex-col items-center justify-between gap-2">
                  {[
                    selectedBank.name ? ['Account Name', selectedBank.name] : null,
                    selectedBank.accountNumber ? ['Account No.', selectedBank.accountNumber] : null,
                  ]
                    .filter((row): row is [string, string] => row !== null)
                    .map(([label, value], i, arr) => (
                      <div key={label} className="w-full flex flex-col items-start gap-1">
                        <div className="flex items-center justify-between w-full">
                          <b>{label}</b>
                          <b className="text-teal">{value}</b>
                        </div>
                        {i < arr.length - 1 && <div className="w-full h-0.5 bg-whitesmoke-200" />}
                      </div>
                    ))}
                  {/* QR if the landlord uploaded one */}
                  {selectedBank.qrImage && (
                    <div className="w-full flex flex-col items-center pt-2">
                      <div className="w-full h-0.5 bg-whitesmoke-200 mb-3" />
                      <img
                        src={selectedBank.qrImage}
                        alt="Bank QR Code"
                        className="h-28 w-28 object-contain rounded-lg border border-whitesmoke-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/*  Cash selected — no extra info needed  */}
          {paymentMethod === 'Cash' && (
            <div className="flex flex-col items-start gap-2 w-full mb-4 animate-fade-in">
              <div className="w-full rounded-2xl bg-aliceblue border-whitesmoke-200 border-solid border flex items-center gap-3 py-4 px-4 text-sm text-dimgray">
                <Icon icon="mdi-light:cash" className="w-6 h-6 text-teal shrink-0" />
                <span className="font-medium">
                  Please hand your cash payment directly to your landlord and upload your receipt
                  below.
                </span>
              </div>
            </div>
          )}

          {/* Upload Receipt */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-2xl bg-white border-whitesmoke-200 border-dashed border-2 flex flex-col items-center py-6 px-0 gap-1 text-silver cursor-pointer hover:border-teal transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <Icon icon="mdi-light:cloud-upload" className="w-10 h-10" />
            <div className="flex items-center justify-center p-2.5">
              <b>{receiptFile ? receiptFile.name : 'Upload receipt screenshot'}</b>
            </div>
            {receiptFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setReceiptFile(null);
                }}
                className="text-xs text-crimson hover:underline cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          {/* Error message */}
          {submitError && <p className="text-crimson text-xs font-semibold pt-2">{submitError}</p>}

          {/* Submit Button */}
          <div className="w-full overflow-hidden flex flex-col items-center justify-center pt-2 text-center text-sm text-teal">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full rounded-xl bg-lightcyan overflow-hidden flex items-center justify-center p-3 transition-all duration-200 ${
                !canSubmit
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-teal hover:text-white hover:scale-[1.02] active:scale-95 cursor-pointer'
              }`}
            >
              <div className="font-semibold cursor-pointer">
                {isSubmitting ? 'Submitting…' : 'Submit Payment'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </PortalPopup>
  );
};

export default SubmitReceipt;