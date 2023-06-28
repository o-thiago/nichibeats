import { appRouter } from "@/server/root";
import React from "react";
import { MusicRow } from "./components/music-row";
import { LocalMusics } from "./components/local-musics";

export const revalidate = Infinity;

export default async function Home() {
  const recommended_music = await appRouter
    .createCaller({})
    .recommendations.get();

  return (
    <main>
      <LocalMusics />
      {recommended_music.map((musics, i) => (
        <MusicRow key={i} musics={musics} />
      ))}
    </main>
  );
}
