import InfoIcon from '../../../assets/infoicon_icon.svg'
import CommIcon from '../../../assets/comments-regular-full.svg'
import DiamondPlusIcon from '../../../assets/DiamondPlus.png'
import CheckboxItem from './CheckboxItem'
import { useState } from 'react'


interface ReviewContentProps{
    reportStages:number,
    setReportStages: any
    reportJsonData:string,
    setReportJsonData:any
}

interface reportBoxField{
    label:string,
    id:number,
    is_checked:boolean,
    category:string
}



export default function ReviewContent(props: ReviewContentProps) {

    const [textReport,setTextReport]=useState('')
    const [reportField, setReportField]=useState<reportBoxField[]>(
        [
            {label:"Misinformation",id:1,is_checked:false,category:"Information"},
            {label:"Misinformation",id:2,is_checked:false,category:"Information"},
            {label:"Misinformation",id:3,is_checked:false,category:"Information"},
            {label:"Misinformation",id:4,is_checked:false,category:"Communication"},
            {label:"Misinformation",id:5,is_checked:false,category:"Communication"},
            {label:"Misinformation",id:6,is_checked:false,category:"Communication"},
            {label:"Misinformation",id:7,is_checked:false,category:"Others"},
            {label:"Misinformation",id:8,is_checked:false,category:"Others"},
            {label:"Misinformation",id:9,is_checked:false,category:"Others"},
        ]
    )
    
    function toggleField(id:number){
        // let item=reportField.filter((field)=>{return field.id===id})
        // item[0].is_checked=!item[0].is_checked
        // const index=reportField.findIndex((field)=>{return field.id===id})
        // const newReportField=[...reportField]
        // newReportField[index]=item[0]
        // setReportField(newReportField)
        setReportField(reportField.map((field) => 
        field.id === id 
            ? { ...field, is_checked: !field.is_checked }
            : field
    ))

    }
    const {reportStages,setReportStages,reportJsonData, setReportJsonData}=props
    return (
        <>
            <div className="flex flex-col max-w-[714px]  text-black  font-inter py-10 gap-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                    
                    <div className='flex flex-col items-center gap-4'>
                        <img src={InfoIcon} alt="" className="w-7 h-7"/>
                        <p className="text-[#224c25] text-[24px]">Information</p>
                            {reportField.filter((field,fieldIndex)=>{return field.category==="Information"}).map((field,fieldIndex)=>{
                                return(
                                <CheckboxItem key={field.id}
                                    label={field.label}
                                    isChecked={field.is_checked}
                                    onToggle={()=>{
                                        toggleField(field.id)
                                    }}
                                />
                                )
                                
                            })}
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <img src={CommIcon} alt="" className="w-7 h-7"/>
                        <p className="text-[#224c25] text-[24px]">Communication</p>
                        {reportField.filter((field,fieldIndex)=>{return field.category==="Communication"}).map((field,fieldIndex)=>{
                                return(
                                <CheckboxItem key={field.id}
                                    label={field.label}
                                    isChecked={field.is_checked}
                                    onToggle={()=>{
                                        toggleField(field.id)
                                    }}
                                />
                                )
                                
                            })}
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <img src={DiamondPlusIcon} alt="" className="w-7 h-7"/>
                        <p className="text-[#224c25] text-[24px]">Others</p>
                        {reportField.filter((field,fieldIndex)=>{return field.category==="Others"}).map((field,fieldIndex)=>{
                                return(
                                <CheckboxItem key={field.id}
                                    label={field.label}
                                    isChecked={field.is_checked}
                                    onToggle={()=>{
                                        toggleField(field.id)
                                    }}
                                />
                                )
                                
                            })}
                    </div>
                </div>
                <div className="flex px-4 gap-4">
                    <input type="text" 
                        className=" text-[14px] font-inter text-black placeholder-dimgray rounded-full w-[70%] shadow px-4 py-2" 
                        placeholder="Report..."
                        onChange={(e)=>{
                            setTextReport(e.target.value)
                        }}
                    />
                    <button
                        className="bg-teal-900 hover:bg-teal-800 active:bg-teal-950 text-white text-[14px] text-sm px-5 py-2 rounded transition-colors duration-150 cursor-pointer select-none"
                        onClick={()=>{
                            const payload=
                            {
                                "text-report":textReport,
                                "report-fields-data":reportField
                            }
                            setReportJsonData(JSON.stringify(payload))
                            console.log(reportJsonData)
                            setReportStages(reportStages+1)
                        }}
                    >
                        Submit
                    </button>

                </div>
            </div>
        </>
    )
}
