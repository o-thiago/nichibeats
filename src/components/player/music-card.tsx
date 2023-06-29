import { MusicRecommendation } from "@/server/routers/recommendations";
import React from "react";
import { MusicPlayButton } from "./music-play-button";

export const MusicCard: React.FC<MusicRecommendation> = (props) => {
  const { artist, title } = props;

  return (
    <div className="w-48 h-92 mr-8 bg-backdrop text-backdrop-foreground rounded-lg shadow-lg flex-shrink-0">
      <div className="gap-4 p-4 flex flex-col items-center hover:backdrop-brightness-125">
        <div className="bg-white h-32 w-full rounded-lg flex text-primary justify-end items-end p-2">
          <MusicPlayButton {...props} />
        </div>
        <div className="h-16">
          <h2 className="overflow-hidden line-clamp-2">{title}</h2>
          <p className="text-sm text-backdrop-foreground dimmed overflow-hidden line-clamp-2">
            {artist.information.displayName}
          </p>
        </div>
      </div>
    </div>
  );
};
