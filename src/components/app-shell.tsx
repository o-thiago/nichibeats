import { faBook, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { PropsWithChildren } from "react";
import { BottomMusicPlayer } from "./player/bottom-player";
import { NavItem, TopNav, BottomNav } from "./app-nav";

export const AppShell: React.FC<PropsWithChildren> = ({ children }) => {
  const navigationItems: NavItem[] = [
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

  const navWrapperStyle = "fixed z-50 w-full";

  return (
    <>
      <div className={`${navWrapperStyle} top-0`}>
        <TopNav items={navigationItems} />
      </div>
      <div className="md:mt-24 mt-8 mb-40 md:mb-24">
        <div>{children}</div>
      </div>
      <div className={`${navWrapperStyle} bottom-0`}>
        <BottomMusicPlayer />
        <BottomNav items={navigationItems} />
      </div>
    </>
  );
};
