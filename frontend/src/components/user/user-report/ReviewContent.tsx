import InfoIcon from '../../../../assets/infoicon_icon.svg';
import CommIcon from '../../../../assets/comments-regular-full.svg';
import DiamondPlusIcon from '../../../../assets/DiamondPlus.png';
import { Icon } from '@iconify/react';
import CheckboxItem from './CheckboxItem';
import { useState } from 'react';

interface ReviewContentProps {
  reportStages: number;
  setReportStages: any;
  reportJsonData: string;
  setReportJsonData: any;
}

interface reportBoxField {
  label: string;
  id: number;
  is_checked: boolean;
  category: string;
}

export default function ReviewContent(props: ReviewContentProps) {
  const [textReport, setTextReport] = useState('');
  const [reportField, setReportField] = useState<reportBoxField[]>([
    { label: 'Wrong Address', id: 1, is_checked: false, category: 'Misinformation' },
    { label: 'False Amenities', id: 2, is_checked: false, category: 'Misinformation' },
    { label: 'Misleading Photos', id: 3, is_checked: false, category: 'Misinformation' },
    { label: 'Undisclosed Fees', id: 4, is_checked: false, category: 'Financial' },
    { label: 'Suspicious Payment Demands', id: 5, is_checked: false, category: 'Financial' },
    { label: 'Lack of Transparency', id: 6, is_checked: false, category: 'Financial' },
    { label: 'Missing Permits', id: 7, is_checked: false, category: 'Safety, Legimacy, and Policy Violations' },
    { label: 'Fake Listing', id: 8, is_checked: false, category: 'Safety, Legimacy, and Policy Violations' },
    { label: 'Safety Hazards', id: 9, is_checked: false, category: 'Safety, Legimacy, and Policy Violations' },
  ]);

  function toggleField(id: number) {
    // let item=reportField.filter((field)=>{return field.id===id})
    // item[0].is_checked=!item[0].is_checked
    // const index=reportField.findIndex((field)=>{return field.id===id})
    // const newReportField=[...reportField]
    // newReportField[index]=item[0]
    // setReportField(newReportField)
    setReportField(
      reportField.map((field) =>
        field.id === id ? { ...field, is_checked: !field.is_checked } : field,
      ),
    );
  }
  const { reportStages, setReportStages, reportJsonData, setReportJsonData } = props;
  return (
    <div className="flex flex-col max-w-[714px]  text-black  font-inter py-10 gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
        <div className="flex flex-col items-center gap-4">
          <img src={InfoIcon} alt="" className="w-7 h-7" />
          <p className="text-[#224c25] text-[24px]">Misinformation</p>
          {reportField
            .filter((field, _fieldIndex) => {
              return field.category === 'Misinformation';
            })
            .map((field, _fieldIndex) => {
              return (
                <CheckboxItem
                  key={field.id}
                  label={field.label}
                  isChecked={field.is_checked}
                  onToggle={() => {
                    toggleField(field.id);
                  }}
                />
              );
            })}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Icon icon="tdesign:money-filled" className="w-7 h-7" />
          <p className="text-[#224c25] text-[24px]">Financial</p>
          {reportField
            .filter((field, _fieldIndex) => {
              return field.category === 'Financial';
            })
            .map((field, _fieldIndex) => {
              return (
                <CheckboxItem
                  key={field.id}
                  label={field.label}
                  isChecked={field.is_checked}
                  onToggle={() => {
                    toggleField(field.id);
                  }}
                />
              );
            })}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Icon icon = "uiw:safety" className="w-7 h-7" />
          <p className="text-[#224c25] text-[24px]">Safety/Policy</p>
          {reportField
            .filter((field, _fieldIndex) => {
              return field.category === 'Safety, Legimacy, and Policy Violations';
            })
            .map((field, _fieldIndex) => {
              return (
                <CheckboxItem
                  key={field.id}
                  label={field.label}
                  isChecked={field.is_checked}
                  onToggle={() => {
                    toggleField(field.id);
                  }}
                />
              );
            })}
        </div>
      </div>
     <div className="flex items-center w-full max-w-[736px] px-4 mt-12 gap-4 h-[33px] font-inter">
    <div className="relative flex-1 h-8 group">
      <div className="absolute inset-0 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[25px] bg-white pointer-events-none" />
      <input
        type="text"
        placeholder="Report..."
        value={textReport}
        className="relative w-full h-full px-4 bg-transparent border-none outline-none focus:ring-0 placeholder-dimgray text-[14px] font-medium text-black"
        onChange={(e) => setTextReport(e.target.value)}
      />
    </div>
  {/* / button is down here*/}
    <button
      className="relative w-[108px] h-8 text-center text-white font-lora border-none bg-transparent cursor-pointer p-0 group transition-transform active:scale-95"
      onClick={() => {
        const payload = {
          'text-report': textReport,
          'report-fields-data': reportField,
        };
        setReportJsonData(JSON.stringify(payload));
        setReportStages(reportStages + 1);
      }}
   
      disabled={!textReport && !reportField.some(f => f.is_checked)}
    >
   
      <div 
      className={`absolute inset-0 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[6px] transition-all 
      ${(!textReport && !reportField.some(f => f.is_checked)) 
        ? 'bg-gray-400 opacity-50' 
        : 'bg-darkslategray-200 group-hover:brightness-110'}`} 
      />
    
      <div className="relative h-full w-full font-medium flex items-center justify-center text-[14px]">
        Submit
      </div>
    </button>
  </div>
  </div>
  );
}
