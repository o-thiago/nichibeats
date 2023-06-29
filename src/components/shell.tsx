import { faBook, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { PropsWithChildren } from "react";
import { TopNavigator } from "./nav/top-nav";
import { BottomNavigator } from "./nav/bottom-nav";
import { MusicBottomPlayer } from "./player/bottom-player";
import { NavigationItem } from "./nav";

export const AppShell: React.FC<PropsWithChildren> = ({ children }) => {
  const navigationItems: NavigationItem[] = [
    {
      name: "Inicio",
      icon: faHome,
      href: "/",
    },
    {
      name: "Busca",
      icon: faSearch,
      href: "/",
    },
    {
      name: "Biblioteca",
      icon: faBook,
      href: "/library",
    },
  ];

  return (
    <>
      <TopNavigator items={navigationItems} />
      <div className="md:mt-24 mt-8 mb-40 md:mb-24">
        {/* Margin from fixed nav bar when > md */}
        <div>{children}</div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <MusicBottomPlayer />
        <BottomNavigator items={navigationItems} />
      </div>
    </>
  );
};
