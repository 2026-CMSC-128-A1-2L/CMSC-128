import { FunctionComponent, useState } from 'react';

const PropertyTabs: FunctionComponent<{ children: React.ReactElement[] }> = (props: {
  children: React.ReactElement[];
}) => {
  const tabs = props.children.map((x) => x.props.text);

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] font-inter">
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col items-start relative text-center">
          <div className="flex items-start py-4 z-[1]">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 w-num-150 relative tracking-num--0_01 flex items-center justify-center cursor-pointer transition-colors duration-200
                ${activeTab === tab ? 'text-teal-600' : 'text-gray hover:text-teal-600'}`}
              >
                <b>{tab}</b>
              </div>
            ))}
          </div>

          <div className="w-full relative h-[2px] bg-gainsboro">
            <div
              className="absolute top-0 h-full bg-teal-600 transition-all duration-300 ease-in-out"
              style={{
                width: '150px',
                transform: `translateX(${activeIndex * 150}px)`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full">{props.children[activeIndex].props.element}</div>
    </div>
  );
};
export default PropertyTabs;
