import { appRouter } from "@/server/root";
import React, { Suspense } from "react";
import { MusicRow } from "./components/music-row";
import { LocalMusics } from "./components/local-musics";

export const revalidate = Infinity;

export default async function Home() {
  const recommended_music = await appRouter
    .createCaller({})
    .recommendations.get();

  return (
    <main>
      <div className="animate__animated animate__fadeIn">
          <LocalMusics />
        {recommended_music.map((musics, i) => (
          <MusicRow key={i} musics={musics} />
        ))}
      </div>
    </main>
  );
}
