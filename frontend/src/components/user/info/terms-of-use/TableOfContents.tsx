import { type FunctionComponent, useEffect, useRef } from 'react';
import type { Section } from './TermsPrimitives';

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onNavigate: (anchor: string) => void;
}

const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  sections,
  activeSection,
  onNavigate,
}) => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    el.style.transition = 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s';
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    });
  }, []);

  return (
    <aside ref={asideRef} className="hidden lg:flex flex-col gap-2 w-[220px] shrink-0 sticky top-6">
      <span className="text-num-14 font-bold text-darkslategray-200 mb-1">In this article</span>
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onNavigate(s.anchor)}
          className={`text-left text-num-14 font-semibold py-1 px-3 rounded-num-8 cursor-pointer border-none bg-transparent ${
            activeSection === s.id
              ? 'text-teal bg-lightcyan'
              : 'text-dimgray hover:text-teal hover:bg-aliceblue'
          }`}
          style={{
            transition: 'color 0.2s ease, background-color 0.2s ease',
          }}
        >
          {s.label}
        </button>
      ))}
    </aside>
  );
};

export default TableOfContents;