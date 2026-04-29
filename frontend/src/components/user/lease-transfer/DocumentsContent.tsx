import InfoIcon from '../../../../assets/infoicon_icon.svg'
import FileUploadCard from '../../general/FileUploadCard'
interface DocumentsContentProps{
  leaseTransferStages:number,
  setLeaseTransferStages:any
}

export default function DocumentsContent(props:DocumentsContentProps) {

  const {leaseTransferStages,setLeaseTransferStages}=props

  return (
     <><div className="flex text-lora font-bold items-end px-15 gap-2 mb-2">
                    <img src={InfoIcon} alt="" className='w-5 h-5 '/>
                    <p className=' text-[18px]'>Transfer Details</p>
        </div>
        <div className="flex flex-col gap-3 w-full px-15 py-4  border-[#f0f0f0] border-2 rounded-num-10">
            
            <div className="flex flex-col gap-10  font-bold text-inter text-[14px] text-gray-100 pt-4">
                <div className="flex flex-col gap-4">
                    <p className='font-bold text-black'>FINANCIAL TERMS</p>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                            <p>Transfer Fee</p>
                            <input className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " disabled={false} type="text" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>Deposit Handling</p>
                            <select className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " disabled={false}  />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <p>Advance Rent Status</p>
                            <select className="border-2 border-[#f0f0f0] rounded-num-10 py-3 "  />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <p>Outstanding Balance</p>
                            <input className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " disabled={true} type="text" />
                        </div>
                    </div>

                </div>

                <div className="w-full py-0.5 bg-[#f0f0f0] rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <p className='font-bold text-black'>DOCUMENTS</p>
                  <FileUploadCard title="Current Lease Agreement" isRequired={true} desc=".jpg or .png less than 500KB"/>
                  <FileUploadCard title="Transfer Request Letter" isRequired={true} desc=".jpg or .png less than 500KB"/>
                </div>
            </div>
            <div className="flex gap-10  font-inter font-bold py-20 justify-center">
                            <button className="px-4 py-1 cursor-pointer text-crimson rounded-full" onClick={()=>{
                                setLeaseTransferStages(leaseTransferStages-1)
                            }}>Go Back</button>
                            <button className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full" onClick={()=>{
                                setLeaseTransferStages(leaseTransferStages+1)
                            }}>Proceed</button>
                        </div>
        </div>
    
                        
    </>
   
  )
}
