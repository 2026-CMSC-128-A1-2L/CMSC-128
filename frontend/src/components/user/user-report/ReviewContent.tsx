import InfoIcon from '../../../../assets/infoicon_icon.svg';
import { Icon } from '@iconify/react';
import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';

interface ReviewContentProps {
  reportStages: number;
  setReportStages: Dispatch<SetStateAction<number>>;
  reportJsonData: string;
  setReportJsonData: Dispatch<SetStateAction<string>>;
}

interface reportBoxField {
  label: string;
  id: number;
  is_checked: boolean;
  category: string;
}

const REPORT_CATEGORIES = [
  {
    title: 'Misinformation',
    icon: <img src={InfoIcon} alt="" className="w-7 h-7" />,
    items: ['Wrong Address', 'False Amenities', 'Misleading Photos'],
  },
  {
    title: 'Maintenance & Habitability',
    icon: <Icon icon="ic:round-home-repair-service" className="w-7 h-7" />,
    items: ['Structural Issues', 'Utility Failures', 'Pest Infestation', 'Sanitation Problems'],
  },
  {
    title: 'Safety & Security Hazards',
    icon: <Icon icon="uiw:safety" className="w-7 h-7" />,
    items: ['Fire Safety', 'Insecure Access', 'Privacy Breach'],
  },
  {
    title: 'Financial Misconduct',
    icon: <Icon icon="tdesign:money-filled" className="w-7 h-7" />,
    items: ['Unfair Deposit Retention', 'Illegal Fee Hikes', 'Utility Overcharging'],
  },
  {
    title: 'Social & Behavioral Issues',
    icon: <Icon icon="ic:round-groups" className="w-7 h-7" />,
    items: ['Excessive Noise', 'Harassment'],
  },
];

const initialReportFields: reportBoxField[] = REPORT_CATEGORIES.flatMap((category, categoryIndex) =>
  category.items.map((label, itemIndex) => ({
    label,
    id: categoryIndex * 100 + itemIndex + 1,
    is_checked: false,
    category: category.title,
  })),
);

export default function ReviewContent(props: ReviewContentProps) {
  const [textReport, setTextReport] = useState('');
  const [reportField, setReportField] = useState<reportBoxField[]>(initialReportFields);
  const [activeCategory, setActiveCategory] = useState(REPORT_CATEGORIES[0].title);
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  function toggleField(id: number) {
    setReportField(
      reportField.map((field) =>
        field.id === id ? { ...field, is_checked: !field.is_checked } : field,
      ),
    );
  }
  function handleMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTextReport(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const { reportStages, setReportStages, setReportJsonData } = props;
  const activeCategoryFields = reportField.filter((field) => field.category === activeCategory);
  const selectedCount = reportField.filter((field) => field.is_checked).length;

  return (
    <div className="flex w-full max-w-[1000px] flex-col text-black font-inter py-8 gap-10">
      <div className="flex w-full flex-col gap-3 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-bold leading-none text-black">Tags</h2>
          {selectedCount > 0 && (
            <span className="rounded-full bg-[#2f8677] px-3 py-1 text-[13px] font-bold leading-none text-[#005b51]">
              {selectedCount} selected
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {REPORT_CATEGORIES.map((category) => (
            <button
              key={category.title}
              type="button"
              onClick={() => setActiveCategory(category.title)}
              className={`flex min-h-[34px] items-center gap-2 rounded-[9px] border px-4 text-[13px] font-bold transition-colors ${
                activeCategory === category.title
                  ? 'border-[#00796b] bg-[#eaf8f4] text-[#00695c]'
                  : 'border-gainsboro bg-white text-[#62728b] hover:border-[#95cfc5]'
              } cursor-pointer`}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4 [&_img]:h-4 [&_img]:w-4 cursor-pointer">
                {category.icon}
              </span>
              <span className="whitespace-nowrap">{category.title}</span>
              {reportField.some(
                (field) => field.category === category.title && field.is_checked,
              ) && (
                <span className="rounded-full bg-[#707070] px-2 py-0.5 text-[11px] leading-none text-white">
                  {
                    reportField.filter(
                      (field) => field.category === category.title && field.is_checked,
                    ).length
                  }
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex min-h-[78px] flex-wrap content-start gap-2">
          {activeCategoryFields.map((field) => (
            <button
              key={field.id}
              type="button"
              onClick={() => toggleField(field.id)}
              className={`min-h-[32px] rounded-[16px] border px-4 text-[13px] font-bold transition-colors ${
                field.is_checked
                  ? 'border-[#00a897] bg-[#eafffb] text-[#00695c]'
                  : 'border-gainsboro bg-white text-[#62728b] hover:border-[#95cfc5]'
              } cursor-pointer`}
            >
              <span className="flex items-center gap-2 cursor-pointer">
                {field.is_checked && (
                  <Icon icon="ic:round-check" className="h-4 w-4 text-[#00a897]" />
                )}
                <span>{field.label}</span>
                {field.is_checked && (
                  <Icon icon="ic:round-close" className="h-4 w-4 text-[#00a897]" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-[736px] items-end gap-4 px-4 mt-10 font-inter">
        <div className="relative flex-1 group">
          <div className="absolute inset-0 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[18px] bg-white pointer-events-none" />
          <textarea
            ref={messageTextareaRef}
            placeholder="Additional message..."
            value={textReport}
            rows={1}
            maxLength={200}
            className="relative min-h-9 max-h-32 w-full resize-none overflow-auto bg-transparent px-4 py-2 border-none outline-none focus:ring-0 placeholder-dimgray text-[14px] font-medium leading-5 text-black"
            onChange={handleMessageChange}
          />
          <span className="absolute -bottom-5 right-3 text-[11px] font-medium text-[#62728b]">
            {textReport.length}/200
          </span>
        </div>
        <button
          type="button"
          className="w-fit rounded-full bg-[#f1f5f9] px-4 py-1 text-center text-[14px] font-bold text-[#096c5b] transition-all hover:bg-[#e5edf3] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          onClick={() => {
            const payload = {
              'text-report': textReport,
              'report-fields-data': reportField,
            };
            setReportJsonData(JSON.stringify(payload));
            setReportStages(reportStages + 1);
          }}
          disabled={!textReport && !reportField.some((f) => f.is_checked)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
