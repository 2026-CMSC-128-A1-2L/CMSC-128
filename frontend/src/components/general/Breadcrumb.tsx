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

import React from "react";
import { Icon } from '@iconify/react';
// import RightArrow from "../../../assets/iconamoon_arrow-right-2.svg";
import { Link } from "react-router-dom";

export interface BreadcrumbRoute {
  name: string;
  url?: string;
}

interface BreadcrumbHeaderProps {
  routes: BreadcrumbRoute[];
}

export default function BreadcrumbHeader({ routes }: BreadcrumbHeaderProps) {
  if (!routes || routes.length < 3) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center py-2 font-inter text-num-12 font-semibold"
    >
      {routes.map((route, index) => {
        const isLast = index === routes.length - 1;

        return (
          <React.Fragment key={`${route.name}-${index}`}>
            {!isLast && route.url ? (
              <Link
                to={route.url}
                className="text-black hover:text-darkslategray transition-colors"
              >
                {route.name}
              </Link>
            ) : (
              <p className={isLast ? "text-darkslategray" : "text-black"}>
                {route.name}
              </p>
            )}

            {!isLast && (
              <Icon icon="iconamoon:arrow-right-2" className="mx-2 h-4 w-4" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
