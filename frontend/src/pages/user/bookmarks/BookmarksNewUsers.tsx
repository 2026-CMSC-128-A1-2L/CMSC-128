import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../pages/utilities/DarkMode';

const BookmarksNewUsers: FunctionComponent = () => {
  const { toggle } = useTheme();
  return (
    <div className="w-full h-screen flex flex-col font-inter text-black overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="sticky top-0 h-screen shrink-0 z-10">
          <SideBar onToggleDarkMode={toggle} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1` overflow-y-auto">
            <div className="flex flex-col min-h-full max-h-[1192px]">
              <div className="flex-1 flex flex-col px-4 sm:px-8 pt-16 pr-4 sm:pr-20">
                <div className="flex flex-col gap-8 flex-1">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                          <b className="text-2xl leading-8">Bookmarks</b>
                          <b className="text-2xl leading-8 text-teal">0</b>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-0.5 rounded-[100px] bg-whitesmoke-200" />
                  </div>
                  <div className="flex-1 flex items-center justify-center py-16 text-center text-sm">
                    <div className="flex items-center gap-2">
                      <b>
                        <span>No bookmarked listings yet. </span>
                        <Link to="/home">
                          <span className="text-teal">Browse listings</span>
                        </Link>
                      </b>

                      <Link to="/home">
                        <Icon icon="radix-icons:arrow-top-right" className="h-6 w-6 relative" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarksNewUsers;
