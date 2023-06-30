import { appRouter } from "@/server/root";
import React from "react";
import { MusicRow } from "./_components/music-row";
import { LocalMusics } from "./_components/local-musics";

export const revalidate = Infinity;

export default async function Home() {
  const recommended_music = await appRouter
    .createCaller({})
    .recommendations.get();

  return (
    <main>
      <div className="flex flex-col p-4 gap-4">
        <LocalMusics />
        {recommended_music.map((musics, i) => (
          <MusicRow key={i} musics={musics} />
        ))}
      </div>
    </main>
  );
}
