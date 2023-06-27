import { MusicCard } from "@/components/player/music-card";
import { appRouter } from "@/server/root";
import { MusicRecommendation } from "@/server/routers/recommendations";
import React from "react";

export default async function Home() {
  const musics = await appRouter.createCaller({}).recommendations.get();

  return (
    <main>
      <div>
        <div>
          {musics.map((m, i) => (
            <div key={i} className="flex flex-row p-8 gap-8 overflow-x-scroll justify-center">
              {m.map((m, j) => (
                <MusicCard key={j} {...m} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
