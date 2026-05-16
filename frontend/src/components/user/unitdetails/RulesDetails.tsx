import type { FunctionComponent } from 'react';
import allowed from '../../../../assets/allowed.svg';
import not_allowed from '../../../../assets/not_allowed.svg';

type Rule = {
  text: string;
  ok: boolean;
};

type RuleDetailsProps = {
  rules: Rule[];
};

const RuleDetails: FunctionComponent<RuleDetailsProps> = ({ rules }) => (
  <div className="w-full flex flex-col gap-4 font-inter">
    <div className="px-5 py-2">
      <b className="text-xl text-black dark:text-[#edf6f4]">House Rules</b>
    </div>
    <div className="px-5 flex flex-col gap-3">
      {rules.length > 0 ? (
        rules.map(({ text, ok }) => (
          <div
            key={text}
            className="rounded-xl border border-whitesmoke bg-white flex items-center gap-3 px-4 py-3 dark:border-[#303331] dark:bg-[#101111]"
          >
            <img
              src={ok ? allowed : not_allowed}
              alt={ok ? 'allowed' : 'not allowed'}
              className="h-5 w-5 shrink-0"
            />
            <span className="text-sm font-medium dark:text-[#edf6f4]">{text}</span>
          </div>
        ))
      ) : (
        <div className="rounded-xl border border-whitesmoke bg-white px-4 py-3 text-sm font-medium text-silver dark:border-[#303331] dark:bg-[#101111]">
          No house rules have been added for this room type yet.
        </div>
      )}
    </div>
  </div>
);

export default RuleDetails;
