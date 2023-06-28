import { MusicCard } from "@/components/player/music-card";
import { MusicRecommendation } from "@/server/routers/recommendations";
import React from "react";

type MusicRowProps = {
  musics: MusicRecommendation[];
};

export const MusicRow: React.FC<MusicRowProps> = ({ musics }) => (
  <div className="flex flex-row p-8 overflow-x-auto overflow-x-scroll justify-start">
    {musics.map((m, i) => (
      <MusicCard key={i} {...m} />
    ))}
  </div>
);
