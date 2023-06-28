import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  NavigationItemComponent,
  NavigationItemParent,
  NavigationItemWrapper,
} from ".";

const BottomNavigatorItem: NavigationItemComponent = (props) => {
  const { name, icon } = props;
  return (
    <NavigationItemWrapper {...props}>
      <div className="flex flex-col justify-center items-center gap-2">
        <FontAwesomeIcon icon={icon} width={20} />
        <span>{name}</span>
      </div>
    </NavigationItemWrapper>
  );
};

export const BottomNavigator: NavigationItemParent = ({ items }) => {
  return (
    <div className="bg-secondary left-0 w-full md:hidden z-50">
      <div className="flex justify-between w-full p-4 shadow-lg">
        {items.map((props, i) => (
          <div
            className="flex-auto text-secondary-foreground hover:dimmed"
            key={i}
          >
            <BottomNavigatorItem {...props} />
          </div>
        ))}
      </div>
    </div>
  );
};
