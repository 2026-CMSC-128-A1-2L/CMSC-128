import { type FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import NotificationDetail from '../../../components/general/NotificationDetail';
import { InviteService } from '../../../service/InviteService';
import { Icon } from '@iconify/react';
import logoLike from '../../../../assets/logo_like.svg';
import JoinedDormitoryPopup from '../../../components/user/user-invitation/JoinedDormitoryPopup';
import PortalPopup from '../../../components/user/user-invitation/PortalPopup';

const InviteAccomodation: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isJoinedDormitoryPopupOpen, setJoinedDormitoryPopupOpen] = useState(false);
  const openJoinedDormitoryPopup = () => setJoinedDormitoryPopupOpen(true);
  const closeJoinedDormitoryPopup = () => setJoinedDormitoryPopupOpen(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invite, setInvite] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('No invite token provided.');
      setLoading(false);
      return;
    }

    const fetchInvite = async () => {
      try {
        const response = await InviteService.getInvite(token);
        setInvite(response.data);
      } catch {
        setError('Could not load invite details. The invite may have expired or already been responded to.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [token]);

  const handleAccept = async () => {
    if (!token || !invite) return;
    setActionLoading(true);
    try {
      if (invite.inviteType === 'student') {
        await InviteService.acceptStudentInvite(token);
      } else {
        await InviteService.acceptInvite(token);
      }
      setShowSuccess(true);
      setTimeout(() => navigate('/direct-messages'), 2000);
    } catch {
      setError('Failed to accept the invite. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = async () => {
    if (!token || !invite) return;
    setActionLoading(true);
    try {
      if (invite.inviteType === 'student') {
        await InviteService.declineStudentInvite(token);
      } else {
        await InviteService.declineInvite(token);
      }
      navigate('/direct-messages');
    } catch {
      setError('Failed to decline the invite. Please try again.');
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <p className="font-['Inter'] text-num-18 text-darkslategray dark:text-[#d7e0ef]">
          Loading invite details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-transparent">
        <p className="font-['Inter'] text-num-18 text-crimson dark:text-[#e44f4f]">{error}</p>
        <button
          onClick={() => navigate('/direct-messages')}
          className="rounded-xl bg-lightcyan px-6 py-2 font-['Inter'] text-num-14 font-semibold text-teal-200 cursor-pointer hover:opacity-80 transition-opacity dark:bg-[#12342e] dark:text-[#72cbb8]"
        >
          Back to Messages
        </button>
      </div>
    );
  }

  if (!invite && !loading) {
    return null;
  }

  const isExpired = invite?.status !== 'pending';
  const dateStr = invite?.dateInvited
    ? new Date(invite.dateInvited).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  const timeStr = invite?.dateInvited
    ? new Date(invite.dateInvited).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  const isStudent = invite?.inviteType === 'student';
  const isManager = invite?.inviteType === 'manager';

  return (
    <>
      <div className="w-full h-full flex flex-col items-start py-8 sm:py-16 px-4 sm:px-8 box-border text-num-24 text-gray-200 font-inter relative overflow-hidden bg-transparent">
        <NotificationDetail
          title={isStudent ? 'Dorm Invitation' : 'Manager Invitation'}
          subtitle="System"
          date={dateStr}
          time={timeStr}
          headline={
            isManager
              ? 'You have been invited to manage a facility.'
              : isStudent
                ? 'You have been invited to join a facility.'
                : 'You received an invitation.'
          }
          message={
            invite?.facilityId?.name
              ? isManager
                ? `You've been invited to manage ${invite.facilityId.name}. Respond to accept or decline this invitation.`
                : `You've been invited to join ${invite.facilityId.name}. Respond to accept or decline this invitation.`
              : 'Respond to accept or decline this invitation.'
          }
          showButtons={!isExpired}
          onAccept={handleAccept}
          onCancel={handleDecline}
          cancelLabel="Decline"
        />
        {isExpired && (
          <p className="mt-4 self-center font-['Inter'] text-num-14 text-dimgray dark:text-[#a4acba]">
            This invitation has been {invite?.status || 'closed'}.
          </p>
        )}
  </div>
  {showSuccess && (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white dark:bg-[#141515] rounded-2xl border border-[#f0f0f0] dark:border-[#303331] p-8 flex flex-col items-center gap-4 max-w-sm w-full mx-4 shadow-xl text-center font-inter">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-lightcyan dark:bg-[#12342e]">
          <Icon icon="fluent:checkmark-circle-20-filled" className="w-10 h-10 text-teal dark:text-[#72cbb8]" />
        </div>
        <b className="text-num-20 text-darkslategray dark:text-white">
          Invite accepted!
        </b>
        <p className="text-num-14 text-dimgray dark:text-[#a4acba]">
          {isStudent
            ? 'You are now a tenant of this facility.'
            : 'You are now a manager of this facility.'}
        </p>
      </div>
    </div>
  )}
    </>
  );
};

export default InviteAccomodation;
