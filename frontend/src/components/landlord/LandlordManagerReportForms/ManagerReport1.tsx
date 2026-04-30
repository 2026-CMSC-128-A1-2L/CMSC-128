import { type FunctionComponent, useState } from 'react';
import ReportManagerShell from './ReportManagerShell.tsx';
import ReportManagerSection from './ReportManagerSection.tsx';

type Props = { onNext: () => void; onCancel: () => void };

const ITEMS = [
  { title: 'Mismanagement of Tenant Records', desc: 'Lost, incomplete, or falsified data' },
  { title: 'Failure to Enforce Dorm Policies', desc: 'Ignoring curfews, guest rules, etc.' },
  { title: 'Unauthorized Decision-Making', desc: 'Acting without landlord approval' },
  { title: 'Negligence in Duties', desc: 'Not responding to tenant concerns or issues' },
  { title: 'Conflict of Interest', desc: 'Favoring certain tenants unfairly' },
];

const ReportManager1: FunctionComponent<Props> = ({ onNext, onCancel }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setChecked((p) => {
      const n = new Set(p);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  const toggleAll = (keys: string[]) =>
    setChecked((p) => {
      const n = new Set(p);
      const allOn = keys.every((k) => n.has(k));
      keys.forEach((k) => (allOn ? n.delete(k) : n.add(k)));
      return n;
    });

  return (
    <ReportManagerShell onCancel={onCancel} onNext={onNext}>
      <ReportManagerSection
        section="Administrative & Management Issues"
        items={ITEMS}
        checked={checked}
        onToggle={toggle}
        onToggleAll={toggleAll}
      />
    </ReportManagerShell>
  );
};

export default ReportManager1;
