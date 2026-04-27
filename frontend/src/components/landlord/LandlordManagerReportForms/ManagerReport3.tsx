import { type FunctionComponent, useState } from 'react';
import ReportManagerShell from './ReportManagerShell.tsx';
import ReportManagerSection from './ReportManagerSection.tsx';

type Props = { onNext: () => void; onCancel: () => void };

const ITEMS = [
  { title: 'Failure to Maintain Cleanliness' },
  { title: 'Ignoring Repair Requests' },
  { title: 'Improper Handling of Maintenance Staff' },
  { title: 'Safety Hazards Not Addressed' },
];

const ReportManager3: FunctionComponent<Props> = ({ onNext, onCancel }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) => setChecked((p) => { const n = new Set(p); n.has(key) ? n.delete(key) : n.add(key); return n; });
  const toggleAll = (keys: string[]) => setChecked((p) => { const n = new Set(p); const allOn = keys.every((k) => n.has(k)); keys.forEach((k) => allOn ? n.delete(k) : n.add(k)); return n; });

  return (
    <ReportManagerShell onCancel={onCancel} onNext={onNext}>
      <ReportManagerSection section="Property & Maintenance Issues" items={ITEMS} checked={checked} onToggle={toggle} onToggleAll={toggleAll} />
    </ReportManagerShell>
  );
};

export default ReportManager3;