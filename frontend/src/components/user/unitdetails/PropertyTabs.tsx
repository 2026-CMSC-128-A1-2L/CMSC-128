import { type FunctionComponent, useEffect, useRef, useState } from 'react';

interface TabProps {
  text: string;
  element: React.ReactNode;
}

const PropertyTabs: FunctionComponent<{ children: React.ReactElement<TabProps>[] }> = (props) => {
  const tabs = props.children.map((x) => x.props.text);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const activeIndex = tabs.indexOf(activeTab);
  const [width, setWidth] = useState(0);
  const tabContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabContainer.current) return;
    const observer = new ResizeObserver(() => {
      if (!tabContainer.current) return;
      setWidth(tabContainer.current.clientWidth / tabs.length);
    });
    observer.observe(tabContainer.current);
  }, [tabs.length]);

  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] font-inter">
      <div className="flex w-full flex-1">
        <div className="flex flex-col w-full text-center">
          <div ref={tabContainer} className="flex w-full items-start z-[1]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-4 flex-1 relative tracking-num--0_01 flex items-center justify-center cursor-pointer transition-colors duration-200
                ${activeTab === tab ? 'text-teal-600' : 'text-gray hover:text-teal-600'}`}
              >
                <b>{tab}</b>
              </button>
            ))}
          </div>
          <div className="w-full relative h-[2px] bg-gainsboro">
            <div
              className="absolute top-0 h-full bg-teal-600 transition-all duration-300 ease-in-out"
              style={{
                width: `${width}px`,
                transform: `translateX(${activeIndex * width}px)`,
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
export type { TabProps };
