import type { FunctionComponent } from 'react';
import allowed from '../../../../assets/allowed.svg';
import not_allowed from '../../../../assets/not_allowed.svg';

const rules = [
  { text: 'No overnight visitors of the opposite gender', ok: false },
  { text: 'No smoking inside the building', ok: false },
  { text: 'Curfew: 10 PM', ok: true },
  { text: 'No pets allowed', ok: false },
  { text: '1-month advance + 2-month deposit on move-in', ok: true },
];

const RuleDetails: FunctionComponent = () => (
  <div className="w-full flex flex-col gap-4 font-inter">
    <div className="px-5 py-2">
      <b className="text-xl text-black">House Rules</b>
    </div>
    <div className="px-5 flex flex-col gap-3">
      {rules.map(({ text, ok }) => (
        <div
          key={text}
          className="rounded-xl border border-whitesmoke bg-white flex items-center gap-3 px-4 py-3"
        >
          <img
            src={ok ? allowed : not_allowed}
            alt={ok ? 'allowed' : 'not allowed'}
            className="h-5 w-5 shrink-0"
          />
          <span className="text-sm font-medium">{text}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RuleDetails;
