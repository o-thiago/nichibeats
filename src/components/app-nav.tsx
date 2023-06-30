import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type NavItem = {
  icon: IconDefinition;
  name: string;
  href: string;
};

type NavItemParentProps = {
  items: NavItem[];
};

type NavItemParent = React.FC<NavItemParentProps>;

const TopNav: NavItemParent = ({ items }) => (
  <nav className="navbar bg-base-200 hidden md:block">
    <div className="flex flex-row gap-2">
      {items.map(({ href, name }, i) => (
        <Link key={i} href={href}>
          <div key={i} className="btn btn-ghost">
            {name}
          </div>
        </Link>
      ))}
    </div>
  </nav>
);

const BottomNav: NavItemParent = ({ items }) => {
  return (
    <div className="btm-nav bg-base-200 md:hidden">
      {items.map(({ name, icon, href }, i) => (
        <div key={i}>
          <Link href={href}>
            <div className="flex flex-col hover:dimmed">
              <FontAwesomeIcon icon={icon} size="lg" />
              <span>{name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export { BottomNav, TopNav };

export type { NavItem, NavItemParentProps };
