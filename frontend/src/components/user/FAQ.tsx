import { useState } from 'react';
import { Icon } from '@iconify/react';

interface FAQProps {
  question: string;
  answer: string;
}

export default function FAQ(props: FAQProps) {
  const { question, answer } = props;
  const [reveal, setReveal] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <button
        className="w-full px-6 py-3 flex-1 flex justify-between items-center rounded transition-colors bg-whitesmoke-200 cursor-pointer hover:bg-[#e0e0e0]"
        onClick={() => setReveal(!reveal)}
      >
        <p>{question}</p>
        {reveal && <Icon icon="mingcute:up-line" className="ml-10 shrink-0" />}

        {!reveal && <Icon icon="mingcute:down-line" className="ml-10 shrink-0" />}
      </button>
      {reveal && <div className="text-sm leading-relaxed px-6 py-2 font-normal">{answer}</div>}
    </div>
  );
}
