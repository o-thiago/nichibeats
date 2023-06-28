import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

export type NavigationItem = {
  icon: IconDefinition;
  name: string;
  href: string;
};

export type NavigationItemParentProps = {
  items: NavigationItem[];
};

export type NavigationItemComponent = React.FC<NavigationItem>;
export type NavigationItemParent = React.FC<NavigationItemParentProps>;

export const NavigationItemWrapper: React.FC<
  PropsWithChildren<NavigationItem>
> = ({ children, href }) => <Link href={href}>{children}</Link>;
