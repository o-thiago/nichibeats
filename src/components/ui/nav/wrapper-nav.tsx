import React, { PropsWithChildren } from "react";
import { NavigationItem } from ".";
import { BottomNavigator } from "./bottom-nav";
import { TopNavigator } from "./top-nav";
import { faBook, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { MusicPlayer } from "../player";

export const WrapperNav: React.FC<PropsWithChildren> = ({ children }) => {
  const navigationItems: NavigationItem[] = [
    {
      name: "Inicio",
      icon: faHome,
    },
    {
      name: "Busca",
      icon: faSearch,
    },
    {
      name: "Biblioteca",
      icon: faBook,
    },
  ];

  return (
    <>
      <TopNavigator items={navigationItems} />
      <div className="md:mt-24 mb-24 md:mb-12">
        {/* Margin from fixed nav bar when > md */}
        <div>{children}</div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <MusicPlayer />
        <BottomNavigator items={navigationItems} />
      </div>
    </>
  );
};
