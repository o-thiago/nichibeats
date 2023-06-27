import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type NavigationItem = {
  icon: IconDefinition;
  name: string;
};

export type NavigationItemParentProps = {
  items: NavigationItem[];
};

export type NavigationItemComponent = React.FC<NavigationItem>;
export type NavigationItemParent = React.FC<NavigationItemParentProps>;
