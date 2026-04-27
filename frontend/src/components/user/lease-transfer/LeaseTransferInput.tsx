interface LeaseTransferInputProps{
    label:string,
    inputType:string
}


export default function LeaseTransferInput(props:LeaseTransferInputProps) {
    const [label,inputType]=props
    return (
        <>
            {inputType==="select" && 
                <div className="flex flex-col gap-2">
                    <p>{label}</p>
                    <select className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " name="" id=""></select>
                </div>
            }
            
            {inputType==="date" && 
                <div className="flex flex-col gap-2">
                    <p>{label}</p>
                    <input className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " type="date" />
                </div>
            }

            {inputType==="select" && 
                <div className="flex flex-col gap-2">
                    <p>{label}</p>
                    <textarea className="border-2 border-[#f0f0f0] rounded-num-10 py-5 " name="" id=""></textarea>
                </div>
            }

            {inputType==="input" &&
                <div className="flex flex-col gap-2">
                    <p>Lease Start Date</p>
                    <input type="text" />
                </div>

            }

        </>
)
}
