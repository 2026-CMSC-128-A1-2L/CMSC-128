interface LeaseTransferInputProps {
<<<<<<< HEAD
  label: string;
  inputType: string;
=======
  label: string,
  inputType: string
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
}

export default function LeaseTransferInput(props: LeaseTransferInputProps) {
  const [label, inputType] = props;
  return (
    <>
      {inputType == 'select' && (
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <select className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " name="" id=""></select>
        </div>
      )}

<<<<<<< HEAD
      {inputType == 'date' && (
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <input className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " type="date" />
        </div>
      )}

      {inputType == 'select' && (
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <textarea
            className="border-2 border-[#f0f0f0] rounded-num-10 py-5 "
            name=""
            id=""
          ></textarea>
        </div>
      )}

      {inputType == 'input' && (
=======
export default function LeaseTransferInput(props: LeaseTransferInputProps) {
  const { label, inputType } = props
  return (
    <>
      {inputType === "select" &&
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <select className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " name="" id=""></select>
        </div>
      }

      {inputType === "date" &&
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <input className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " type="date" />
        </div>
      }

      {inputType === "select" &&
        <div className="flex flex-col gap-2">
          <p>{label}</p>
          <textarea className="border-2 border-[#f0f0f0] rounded-num-10 py-5 " name="" id=""></textarea>
        </div>
      }

      {inputType === "input" &&
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
        <div className="flex flex-col gap-2">
          <p>Lease Start Date</p>
          <input type="text" />
        </div>
<<<<<<< HEAD
      )}
    </>
  );
=======

      }

    </>
  )
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
}
