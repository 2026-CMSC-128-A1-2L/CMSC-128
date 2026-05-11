import { useState, type FunctionComponent } from 'react';
import Message from '../general/InboxMessage';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';

const DmsSidebar: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [dmFilter, setDmFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const notifications = [
    {
      id: 1,
      title: 'Invitation to Current Accommodation',
      body: 'Quevin Custodio has invited you to join...',
      time: '1:20 am',
      icon: 'iconamoon:notification',
      route: '/direct-messages/dorm-invitation',
    },
    {
      id: 2,
      title: 'Verification Status',
      body: 'Hi Daphne! Your verification has been approved!',
      time: '2m ago',
      icon: 'iconamoon:notification',
    },
    {
      id: 3,
      title: 'Welcome to ATLAS!',
      body: 'Hi Daphne! Welcome to ATLAS...',
      time: '2m ago',
      icon: 'iconamoon:notification',
    },
    {
      id: 4,
      title: 'New Message from Support',
      body: 'We have received your report and are looking into it.',
      time: '5m ago',
      icon: 'iconamoon:notification',
    },
  ];

  const directMessages = [
    {
      id: 1,
      title: 'Three Sapphire Place',
      body: 'Hi Daphne! Your application is being reviewed by our do...',
      time: '1hr ago',
      icon: 'iconamoon:email',
      unread: true,
      archived: false,
    },
    {
      id: 2,
      title: 'Narra Residences',
      body: 'Hi Daphne! Your application is being reviewed by our do...',
      time: '2m ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: false,
    },
    {
      id: 3,
      title: 'Past Dorm Stay',
      body: 'Thank you for staying with us! Please leave a review...',
      time: '1mo ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: true,
    },
  ];

  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, 2);

  const filteredDMs = directMessages.filter((dm) => {
    if (dmFilter === 'archived') return dm.archived;
    if (dmFilter === 'unread') return !dm.archived && dm.unread;
    return !dm.archived;
  });

  return (
    <div className="w-72 h-screen relative overflow-hidden flex flex-col items-start py-10 pl-4 pr-3 box-border gap-2 text-left font-inter bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:bg-[#121212] dark:text-gray-100 dark:shadow-[4px_0_24px_rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col items-start gap-8">
        {/* Header & Search */}
        <div className="w-full flex items-center gap-2 text-[0.875rem]">
          <Icon
            icon="material-symbols-light:chevron-left"
            className="w-8 h-8 cursor-pointer shrink-0 hover:text-teal transition-colors"
            onClick={() => navigate(-1)}
          />
          <div className="flex-1 px-3 py-2 rounded-num-8 bg-unavailable_action flex items-center gap-2 transition-all focus-within:ring-1 focus-within:ring-teal/30 focus-within:bg-white focus-within:shadow-sm dark:bg-[#1e1e1e] dark:focus-within:bg-[#2a2a2a]">
            <Icon icon="material-symbols:search" className="w-4 h-4 text-unselected shrink-0" />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              maxLength={50}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-num-14 font-medium text-darkgreen placeholder:text-unselected dark:text-gray-200 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="self-stretch flex flex-col items-start gap-2 font-lora">
          <div className="self-stretch flex items-center justify-between py-1 font-inter">
            <b className="relative flex items-start pl-2 text-num-18 text-[#2d3748] dark:text-gray-100">
              Notifications
            </b>
            <span className="bg-teal/10 text-teal text-[10px] font-bold px-2 py-0.5 rounded-full">
              New
            </span>
          </div>

          <div className="w-[260px] flex flex-col items-start gap-2 text-right text-[0.5rem]">
            {displayedNotifications.map((notif) => (
              <Message
                key={notif.id}
                title={notif.title}
                body={notif.body}
                time={notif.time}
                icon={notif.icon}
                onClick={notif.route ? () => navigate(notif.route) : undefined}
                active={notif.route ? location.pathname === notif.route : false}
              />
            ))}
          </div>

          <button
            className="w-full mt-1 flex items-center justify-center gap-1 group"
            onClick={() => setShowAllNotifications(!showAllNotifications)}
          >
            <div className="relative font-semibold text-num-12 text-teal group-hover:underline">
              {showAllNotifications ? 'Show Less' : 'View All'}
            </div>
            <Icon
              icon={
                showAllNotifications
                  ? 'material-symbols-light:chevron-up'
                  : 'material-symbols-light:chevron-right'
              }
              className="w-5 h-5 text-teal group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Direct Messages Section */}
        <div className="h-fit w-full flex flex-col items-start gap-4 font-lora">
          <div className="self-stretch flex items-end py-1 font-inter">
            <b className="w-full flex-1 relative flex items-start text-num-18 pl-2 text-[#2d3748] dark:text-gray-100">
              Direct Messages
            </b>
          </div>

          {/* Filter Pills */}
          <div className="w-full flex items-start gap-2 pl-2">
            <button
              className={`h-fit rounded-full flex items-center justify-center py-1.5 px-5 transition-all active:scale-95 ${
                dmFilter === 'all'
                  ? 'bg-darkgreen text-white shadow-md shadow-darkgreen/20'
                  : 'bg-lightcyan text-teal hover:bg-teal/10'
              }`}
              onClick={() => setDmFilter('all')}
            >
              <b className="relative text-num-12 font-inter">All</b>
            </button>
            <button
              className={`h-fit rounded-full flex items-center justify-center py-1.5 px-5 transition-all active:scale-95 ${
                dmFilter === 'unread'
                  ? 'bg-darkgreen text-white shadow-md shadow-darkgreen/20'
                  : 'bg-lightcyan text-teal hover:bg-teal/10'
              }`}
              onClick={() => setDmFilter('unread')}
            >
              <b className="relative text-num-12 font-inter">Unread</b>
            </button>
          </div>

          <div className="w-full flex flex-col items-start gap-2 text-right text-[0.5rem]">
            {filteredDMs.map((dm) => (
              <Message
                key={dm.id}
                title={dm.title}
                body={dm.body}
                time={dm.time}
                icon={dm.icon}
              />
            ))}
          </div>

          <button
            className="w-full flex items-center justify-center gap-1 text-center group"
            onClick={() => setDmFilter(dmFilter === 'archived' ? 'all' : 'archived')}
          >
            <div className="relative font-semibold text-num-12 text-teal group-hover:underline">
              {dmFilter === 'archived' ? 'View All Messages' : 'View Archive'}
            </div>
            <Icon
              icon="material-symbols-light:chevron-right"
              className={`w-5 h-5 text-teal transition-transform ${
                dmFilter === 'archived' ? 'rotate-180' : 'group-hover:translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DmsSidebar;
