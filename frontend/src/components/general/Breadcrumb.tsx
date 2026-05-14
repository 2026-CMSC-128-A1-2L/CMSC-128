//  usage:
{
  /* <BreadcrumbHeader 
  routes={[
    { name: 'User Profile', url: '/profile' },
    { name: 'Current Dorm', url: '/profile/dorm' },
    { name: 'Report' } // Left without a URL since it's the active page
  ]} 
/> */
}

import React from 'react';
import RightArrow from '../../../assets/iconamoon_arrow-right-2.svg';
import { Link } from 'react-router-dom';
// 1. Define the shape of your new route objects
export interface BreadcrumbRoute {
  name: string;
  url?: string; // Optional, because the last item usually doesn't need a link
}

interface BreadcrumbHeaderProps {
  routes: BreadcrumbRoute[];
}

export default function BreadcrumbHeader({ routes }: BreadcrumbHeaderProps) {
  if (!routes || routes.length === 0) return null;

  return (
    <div className="flex py-2 items-center font-inter text-num-14 font-semibold">
      {routes.map((route, index) => {
        // Check if this is the current page we are on
        const isLast = index === routes.length - 1;

        return (
          <React.Fragment key={index}>
            {/* 2. If it has a URL and isn't the last item, render an anchor tag. Otherwise, just text. */}
            {!isLast && route.url ? (
              <Link
                to={route.url}
                className="text-black hover:text-darkslategray transition-colors"
              >
                {route.name}
              </Link>
            ) : (
              // The current page text is usually darker to show it's active
              <p className={isLast ? 'text-darkslategray' : 'text-black'}>{route.name}</p>
            )}

            {/* 3. The Arrow */}
            {!isLast && <img src={RightArrow} alt="Separator" className="mx-2" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
