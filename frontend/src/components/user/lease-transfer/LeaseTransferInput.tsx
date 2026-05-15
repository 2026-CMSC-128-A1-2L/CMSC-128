interface LeaseTransferInputProps {
  label: string;
  inputType: string;
}

export default function LeaseTransferInput(props: LeaseTransferInputProps) {
  const { label, inputType } = props;
  const fieldClass =
    'border-2 border-[#f0f0f0] rounded-num-10 font-normal text-gray-400 placeholder:text-[#b9bec4]';

  return (
    <>
      {inputType === 'select' && (
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <select className={`${fieldClass} py-3`} name="" id=""></select>
        </div>
      )}

      {inputType === 'date' && (
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <input className={`${fieldClass} py-3`} type="date" />
        </div>
      )}

      {inputType === 'select' && (
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <textarea className={`${fieldClass} py-5`} name="" id=""></textarea>
        </div>
      )}

      {inputType === 'input' && (
        <div className="flex flex-col gap-2">
          <p>Lease Start Date</p>
          <input className={`${fieldClass} py-3`} type="text" />
        </div>
      )}
    </>
  );
}
