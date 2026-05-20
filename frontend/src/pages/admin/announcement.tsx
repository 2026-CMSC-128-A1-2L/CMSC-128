import { useState } from 'react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import { Icon } from '@iconify/react';
import PageBackground from '../../components/general/PageBackground';
import { NotificationService } from '../../service/NotificationService';

const ROLES = ['All', 'Student', 'Landlord', 'Manager'] as const;
type Role = (typeof ROLES)[number];

function Announcement() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState<Role>('All');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return;
    setLoading(true);
    setStatus('idle');
    try {
      await NotificationService.sendAnnouncement({
        subject: subject.trim(),
        content: message.trim(),
        role,
      });
      setSubject('');
      setMessage('');
      setRole('All');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin activeItem="announce" />
          <div className="flex-1 overflow-y-auto bg-transparent px-10 py-8 flex items-start justify-center">
            <div className="mt-10 w-full max-w-168.75 rounded-2xl bg-white dark:bg-[#141515] dark:border dark:border-[#303331] p-8 shadow-sm">
              {/* Subject */}
              <div className="mb-6">
                <label
                  htmlFor="announcement-subject"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-black dark:text-[#d7e0ef]"
                >
                  Subject
                </label>
                <input
                  id="announcement-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Input subject here"
                  className="h-8.5 w-full rounded-md border border-[#cbd5e1] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-3 py-2 font-['Inter'] text-sm text-black dark:text-[#d7e0ef] outline-none placeholder:text-[#94a3b8] dark:placeholder:text-[#a4acba]"
                />
              </div>

              {/* Target Role */}
              <div className="mb-6">
                <label className="mb-2 block font-['Inter'] text-sm font-medium text-black dark:text-[#d7e0ef]">
                  Send to
                </label>
                <div className="flex flex-wrap gap-3">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`cursor-pointer rounded-full px-5 py-1.5 font-['Inter'] text-sm font-bold transition-colors ${
                        role === r
                          ? 'bg-[#024338] text-white'
                          : 'bg-[#F0F0F0] text-[#001D18] dark:bg-[#1f2022] dark:text-[#d7e0ef] hover:bg-[#E6F7F1] dark:hover:bg-[#17201d]'
                      }`}
                    >
                      {r === 'All' ? 'All Roles' : r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  htmlFor="announcement-message"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-black dark:text-[#d7e0ef]"
                >
                  Message
                </label>
                <textarea
                  id="announcement-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here"
                  rows={16}
                  className="w-full resize-none rounded-md border border-[#cbd5e1] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-3 py-2 font-['Inter'] text-sm text-black dark:text-[#d7e0ef] outline-none placeholder:text-[#94a3b8] dark:placeholder:text-[#a4acba]"
                />
              </div>

              {/* Status feedback */}
              {status === 'success' && (
                <p className="mb-4 text-center font-['Inter'] text-sm font-medium text-green-600 dark:text-green-400">
                  Announcement sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="mb-4 text-center font-['Inter'] text-sm font-medium text-red-600 dark:text-red-400">
                  Failed to send. Please try again.
                </p>
              )}

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="button"
                  disabled={loading || !subject.trim() || !message.trim()}
                  onClick={handleSubmit}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#024338] px-6 py-2 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <span className="font-['Lora'] text-base font-medium text-white">Sending...</span>
                  ) : (
                    <>
                      <Icon icon="iconamoon:arrow-right-2-thin" className="h-5 w-5 text-white" />
                      <span className="font-['Lora'] text-base font-medium text-white">Submit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Announcement;
