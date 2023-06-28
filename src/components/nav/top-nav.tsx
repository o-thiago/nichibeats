import React from "react";
import {
  NavigationItemComponent,
  NavigationItemParent,
  NavigationItemWrapper,
} from ".";

export const TopNavigatorItem: NavigationItemComponent = (props) => {
  const { name } = props;

  return <NavigationItemWrapper {...props}>{name}</NavigationItemWrapper>;
};

export const TopNavigator: NavigationItemParent = ({ items }) => (
  <nav className="bg-secondary text-secondary-foreground fixed top-0 left-0 w-full hidden md:block z-50">
    <div className="flex flex-row p-6 h-16 gap-8">
      {items.map((props, i) => (
        <div key={i} className="hover:dimmed">
          <TopNavigatorItem {...props} />
        </div>
      ))}
    </div>
  </nav>
);
