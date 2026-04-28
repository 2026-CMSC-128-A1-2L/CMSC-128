import { type FunctionComponent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';

// ─── Form shape ───────────────────────────────────────────────────────────────

interface PaymentMethodFormValues {
  name: string;
  accountNumber: string;
}

// ─── Detail Form ──────────────────────────────────────────────────────────────

interface DetailFormProps {
  title: string;
  accountLabel: string;
  existingName?: string;
  existingAccountNumber?: string;
  existingQr?: string;
  onCancel: () => void;
  onSave: (name: string, accountNumber: string, qrImage: string) => void;
}

const DetailForm: FunctionComponent<DetailFormProps> = ({
  title,
  accountLabel,
  existingName = '',
  existingAccountNumber = '',
  existingQr = '',
  onCancel,
  onSave,
}) => {
  const qrInputRef = useRef<HTMLInputElement>(null);
  const [qrPreview, setQrPreview] = useState<string>(existingQr);
  const [qrError, setQrError] = useState<string>('');

  const { register, watch } = useForm<PaymentMethodFormValues>({
    defaultValues: {
      name: existingName,
      accountNumber: existingAccountNumber,
    },
    mode: 'onChange',
  });

  // Sync every field change + current QR → parent store immediately (no Save needed)
  useEffect(() => {
    const subscription = watch((values) => {
      onSave(values.name ?? '', values.accountNumber ?? '', qrPreview);
    });
    return () => subscription.unsubscribe();
  }, [watch, qrPreview, onSave]);

  const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      setQrError('File must be less than 2 MB');
      if (qrInputRef.current) qrInputRef.current.value = '';
      return;
    }

    setQrError('');
    const url = URL.createObjectURL(file);
    setQrPreview(url);
    const current = watch();
    onSave(current.name ?? '', current.accountNumber ?? '', url);
  };

  return (
    <div className="flex-1 w-full relative flex flex-col items-start justify-center gap-4 text-left text-num-14 text-teal font-inter">
      {/* Header */}
      <div className="self-stretch flex items-center gap-2.5 text-[17.7px]">
        <div className="flex-1 flex items-center justify-center">
          <b className="flex-1 relative tracking-[-0.01em]">{title}</b>
        </div>
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center p-2.5 text-center text-num-14 cursor-pointer hover:opacity-75 transition-opacity"
          onClick={onCancel}
        >
          <div className="relative leading-6 font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Cancel
          </div>
        </div>
      </div>

      {/* Name + Account Number */}
      <div className="self-stretch flex items-start gap-10 text-black">
        <div className="flex-1 flex flex-col items-start gap-3">
          <b className="relative">Name</b>
          <div className="self-stretch rounded-xl bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-4">
            <input
              {...register('name')}
              placeholder="Aa"
              className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium leading-6"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-3">
          <b className="self-stretch h-[15.2px] relative flex items-center shrink-0">
            {accountLabel}
          </b>
          <div className="self-stretch rounded-xl bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-4">
            <input
              {...register('accountNumber')}
              placeholder="09"
              className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium leading-6"
            />
          </div>
        </div>
      </div>

      {/* QR Upload */}
      <div
        className="self-stretch rounded-2xl border-dimgray border-dashed border-[1px] overflow-hidden flex items-center py-3 px-4 text-black cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => qrInputRef.current?.click()}
      >
        {qrPreview ? (
          // Show preview once uploaded
          <div className="flex items-center gap-4">
            <img
              src={qrPreview}
              alt="QR preview"
              className="h-16 w-16 rounded-md object-cover border border-whitesmoke"
            />
            <div className="flex flex-col gap-1">
              <b className="text-sm">QR Uploaded</b>
              <span className="text-xs text-slategray font-medium">Click to replace</span>
            </div>
          </div>
        ) : (
          <div className="h-16 flex items-center gap-6">
            <div className="h-16 w-16 relative rounded-md flex items-center justify-center overflow-hidden">
              <Icon icon="icons8:upload-2" className="w-full h-full" />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <b className="relative">Upload QR</b>
              <div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">
                .jpg or .png — max 2 MB
              </div>
            </div>
          </div>
        )}
        <input
          ref={qrInputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleQrChange}
        />
      </div>

      {/* File size error */}
      {qrError && <span className="text-xs text-red-500 -mt-2">{qrError}</span>}
    </div>
  );
};

const Payments: FunctionComponent = () => {
  const { buildingInfo, setPayment } = useBuildingStore();
  const payment = buildingInfo.payment;

  const isGcashOpen = payment.gcash !== null;
  const isBankOpen = payment.bank !== null;

  const handleToggle = () => {
    const next = !payment.enabled;
    setPayment({
      enabled: next,
      ...(next === false ? { gcash: null, bank: null } : {}),
    });
  };

  const handleSaveGcash = (name: string, accountNumber: string, qrImage: string) => {
    setPayment({ gcash: { name, accountNumber, qrImage } });
  };

  const handleSaveBank = (name: string, accountNumber: string, qrImage: string) => {
    setPayment({ bank: { name, accountNumber, qrImage } });
  };

  return (
    <div
      className={`w-full relative rounded-[11.8px] flex flex-col items-start py-4 px-3 box-border [transform:_rotate(-0.3deg)] [transform-origin:0_0] text-left text-[17.7px] font-inter transition-all ${
        payment.enabled ? 'gap-[15.7px] text-teal-200' : 'text-teal'
      }`}
    >
      {/* Header & Toggle */}
      <div className="self-stretch flex items-center justify-between gap-5">
        <b className="h-[20.7px] w-[171.1px] relative tracking-[-0.01em] flex items-center shrink-0">
          Cashless Payment
        </b>
        <div className="h-[30.5px] w-[64.9px] relative cursor-pointer" onClick={handleToggle}>
          <div
            className={`absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[19.67px] transition-colors ${
              payment.enabled ? 'bg-teal-100' : 'bg-silver'
            }`}
          />
          <div
            className={`absolute h-[80.66%] w-[37.9%] top-[9.67%] bottom-[9.67%] shadow-[0px_3.93px_3.93px_rgba(0,0,0,0.25)] rounded-[50%] bg-white transition-all ${
              payment.enabled ? 'right-[6.03%] left-[56.07%]' : 'right-[56.03%] left-[6.06%]'
            }`}
          />
        </div>
      </div>

      {/* Expanded Content */}
      {payment.enabled && (
        <div className="flex flex-col items-start gap-[30px] text-slategray w-full">
          {/* GCash */}
          {!isGcashOpen ? (
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => setPayment({ gcash: { name: '', accountNumber: '', qrImage: '' } })}
            >
              <b className="relative tracking-[-0.01em]">Add GCash Details</b>
            </div>
          ) : (
            <DetailForm
              title="Add GCash Details"
              accountLabel="GCash Number"
              existingName={payment.gcash?.name}
              existingAccountNumber={payment.gcash?.accountNumber}
              existingQr={payment.gcash?.qrImage}
              onCancel={() => setPayment({ gcash: null })}
              onSave={handleSaveGcash}
            />
          )}

          {/* Bank */}
          {!isBankOpen ? (
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => setPayment({ bank: { name: '', accountNumber: '', qrImage: '' } })}
            >
              <b className="relative tracking-[-0.01em]">Add Bank Details</b>
            </div>
          ) : (
            <DetailForm
              title="Add Bank Details"
              accountLabel="Account Number"
              existingName={payment.bank?.name}
              existingAccountNumber={payment.bank?.accountNumber}
              existingQr={payment.bank?.qrImage}
              onCancel={() => setPayment({ bank: null })}
              onSave={handleSaveBank}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Payments;
