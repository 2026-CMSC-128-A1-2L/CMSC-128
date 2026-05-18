import { Icon } from '@iconify/react';
import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';

const SYSTEM_UPDATE_OPTIONS = [
  'New Login Attempts',
  'Verification Updates',
  'Maintenance Updates',
  'Account Alerts',
];

const LISTING_UPDATE_OPTIONS = [
  'Application Approval',
  'Direct Messages',
  'Rent Fee Reminders',
  'Pasalo Listings',
  'Ocular Visit Reminders',
];

type DropdownProps = {
  options: string[];
  selected: string | null;
  onSelect: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

const EmailDropdown: FunctionComponent<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = 'Select email',
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`rounded-num-12 bg-aliceblue border-solid border flex items-center justify-center py-2 px-8 gap-2 transition-all duration-200 ${
          disabled
            ? 'opacity-50 cursor-not-allowed border-whitesmoke-200'
            : 'cursor-pointer border-whitesmoke-200 hover:border-teal-100 hover:bg-azure hover:shadow-sm'
        }`}
      >
        <span className="relative font-semibold text-teal cursor-pointer">{selected ?? placeholder}</span>
        <Icon
          icon="tabler:chevron-down-filled"
          className="w-5 h-5 text-teal transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && !disabled && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 bg-white border-whitesmoke-200 border-solid border rounded-xl shadow-lg z-50 min-w-[200px] overflow-hidden">
            {options.length === 0 ? (
              <div className="px-4 py-2 text-sm text-dimgray">No emails available</div>
            ) : (
              options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onSelect(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold cursor-pointer border-none bg-transparent transition-all duration-150 hover:bg-azure hover:text-teal hover:pl-5 ${
                    selected === opt ? 'text-teal bg-azure' : 'text-black'
                  }`}
                >
                  {opt}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

type MultiDropdownProps = {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
};

const MultiSelectDropdown: FunctionComponent<MultiDropdownProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  const label = selected.length === 0 ? 'Select updates' : selected.join(', ');

  return (
    <div className="relative inline-block cursor-pointer" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border flex items-center justify-center py-2 px-8 gap-2 cursor-pointer hover:border-teal-100 hover:bg-azure hover:shadow-sm transition-all duration-200 max-w-xs"
      >
        <span className="relative font-semibold text-teal truncate max-w-[200px]">{label}</span>
        <Icon
          icon="tabler:chevron-down-filled"
          className="w-5 h-5 text-teal flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 bg-white border-whitesmoke-200 border-solid border rounded-xl shadow-lg z-50 min-w-[220px] overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className="w-full text-left px-4 py-2 text-sm font-semibold cursor-pointer border-none bg-transparent flex items-center gap-2 transition-all duration-150 hover:bg-azure hover:pl-5"
              >
                <div
                  className="w-4 h-4 rounded-sm border-solid border flex-shrink-0 flex items-center justify-center"
                  style={{
                    borderColor: selected.includes(opt) ? '#024338' : '#096c5b',
                    backgroundColor: selected.includes(opt) ? '#024338' : 'transparent',
                  }}
                >
                  {selected.includes(opt) && (
                    <Icon icon="mdi:check" className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={selected.includes(opt) ? 'text-teal' : 'text-black'}>{opt}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CheckboxRow: FunctionComponent<{
  checked: boolean;
  onToggle: () => void;
  label: string;
}> = ({ checked, onToggle, label }) => (
  <button
    type="button"
    onClick={onToggle}
    className="self-stretch flex items-center gap-2.5 text-left text-dimgray cursor-pointer bg-transparent border-none p-0 transition-all duration-150 hover:text-darkslategray group"
  >
    <div
      className={`h-[18px] w-[18px] rounded-sm border-solid border box-border flex items-center justify-center transition-all duration-150 flex-shrink-0 group-hover:shadow-sm ${
        checked
          ? 'bg-darkslategray border-darkslategray'
          : 'border-teal group-hover:border-teal-200 group-hover:bg-azure'
      } cursor-pointer`}
    >
      {checked && <Icon icon="mdi:check" className="w-3 h-3 text-white" />}
    </div>
    <div className="relative font-semibold">{label}</div>
  </button>
);

const Notification: FunctionComponent = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);

  // System notification prefs
  const [systemEmail, setSystemEmail] = useState<string | null>(null);
  const [systemSms, setSystemSms] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState<string[]>([
    'New Login Attempts',
    'Verification Updates',
  ]);

  // Listing notification prefs
  const [listingEmail, setListingEmail] = useState<string | null>(null);
  const [listingSms, setListingSms] = useState(false);
  const [listingUpdates, setListingUpdates] = useState<string[]>([
    'Application Approval',
    'Direct Messages',
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Not authenticated');
        const json = await res.json();
        const userEmails: string[] = json.data?.emails ?? [];
        setEmails(userEmails);
        if (userEmails.length > 0) {
          setSystemEmail(userEmails[0]);
          setListingEmail(userEmails[0]);
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  if (loadingUser) {
    return (
      <div className="rounded-t-none rounded-b-num-16 border-whitesmoke-200 border-solid border flex items-center justify-center py-16 text-dimgray text-sm">
        Loading notification preferences…
      </div>
    );
  }

  return (
    <div className="rounded-t-none rounded-b-num-16 border-whitesmoke-200 border-solid border flex flex-col py-6 px-8 gap-8 text-center text-black">
      {/* System Notifications */}
      <div className="self-stretch flex flex-col items-start gap-6">
        <b className="text-[1.5rem] leading-8">System Notifications</b>

        <div className="self-stretch flex flex-col items-start gap-6">
          {/* Default email */}
          <div className="self-stretch flex flex-col items-start gap-3">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="relative text-num-14">Default System Notifications Email</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left text-num-14">
                Decide where you want to receive your system updates. System notifications may
                include account verification approval/rejection, maintenance updates, and new login
                attempts. You can only choose emails already linked to your ATLAS account.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start py-2.5 px-0 text-left text-teal">
              <EmailDropdown
                options={emails}
                selected={systemEmail}
                onSelect={setSystemEmail}
                placeholder="Select email"
                disabled={emails.length === 0}
              />
              {emails.length === 0 && (
                <span className="text-num-12 text-dimgray mt-1">
                  No emails linked to your account yet.
                </span>
              )}
            </div>
          </div>

          {/* SMS */}
          <CheckboxRow
            checked={systemSms}
            onToggle={() => setSystemSms((v) => !v)}
            label="Receive SMS updates on your saved mobile number"
          />

          {/* Customize updates */}
          <div className="self-stretch flex flex-col items-start gap-3">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="relative text-num-14">Customize Updates</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left text-num-14">
                Choose which updates you'll receive related to the system notifications.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start py-2.5 px-0 text-left text-teal">
              <MultiSelectDropdown
                options={SYSTEM_UPDATE_OPTIONS}
                selected={systemUpdates}
                onChange={setSystemUpdates}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="self-stretch h-0.5 rounded-[100px] border-whitesmoke-200 border-solid border box-border" />

      {/* Listing Notifications */}
      <div className="self-stretch flex flex-col items-start gap-6">
        <b className="text-[1.5rem] leading-8">Listing Notifications</b>

        <div className="self-stretch flex flex-col items-start gap-6 text-left text-num-14">
          {/* Default email */}
          <div className="self-stretch flex flex-col items-start gap-3">
            <div className="self-stretch flex flex-col items-start gap-2 text-center">
              <b className="relative">Default Listings Notifications Email</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
                Decide where you want to receive your listing/dorm updates. Listing notifications
                include direct messages from landlord/dorm manager, rent fee reminders, your
                bookmarked listings that are posted as pasalo units, and ocular visit reminders. You
                can only choose emails already linked to your ATLAS account.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start py-2.5 px-0 text-teal">
              <EmailDropdown
                options={emails}
                selected={listingEmail}
                onSelect={setListingEmail}
                placeholder="Select email"
                disabled={emails.length === 0}
              />
              {emails.length === 0 && (
                <span className="text-num-12 text-dimgray mt-1">
                  No emails linked to your account yet.
                </span>
              )}
            </div>
          </div>

          {/* SMS */}
          <CheckboxRow
            checked={listingSms}
            onToggle={() => setListingSms((v) => !v)}
            label="Receive SMS updates on your saved mobile number"
          />

          <div className="self-stretch flex flex-col items-start gap-3 text-center">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="relative">Customize Updates</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
                Choose which updates you'll receive related to the listings.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start py-2.5 px-0 text-left text-teal">
              <MultiSelectDropdown
                options={LISTING_UPDATE_OPTIONS}
                selected={listingUpdates}
                onChange={setListingUpdates}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
