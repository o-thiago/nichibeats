import { MusicRecommendation } from "@/server/routers/recommendations";
import { MusicCard } from "./music-card/card";
import React from "react";

type MusicRowProps = {
  musics: MusicRecommendation[];
};

export const MusicRow: React.FC<MusicRowProps> = ({ musics }) => {
  return (
    <div className="flex flex-row overflow-x-auto overflow-x-scroll p-2 justify-start gap-8">
      {musics.map((m, i) => (
        <MusicCard key={i} {...m} />
      ))}
    </div>
  );
};
