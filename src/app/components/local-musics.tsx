"use client";

import { NichiFolder, useNichiStorage } from "@/hooks/storage";
import { MusicRow } from "./music-row";
import { useEffect, useState } from "react";
import { MusicRecommendation } from "@/server/routers/recommendations";
import all from "it-all";
import { MusicType } from "@/shared/enum";

export const LocalMusics = () => {
  const { storage } = useNichiStorage();

  // We do not store the file handles, this is intentional, we don't want to fill ram.
  const [localMusics, setLocalMusics] = useState<MusicRecommendation[]>([]);

  useEffect(() => {
    if (!storage || localMusics.length > 0) return;

    (async () => {
      const songs = await storage.getDirectoryHandle(NichiFolder.Songs);

      // @ts-ignore oh gosh why can't library creators do proper typing ffs.
      const awaitableSongs: Promise<never[]> = all(songs);

      const allSongs = await awaitableSongs;

      setLocalMusics(
        allSongs.map(([fileName]: [string]) => {
          return {
            id: fileName,
            title: fileName,
            type: MusicType.Local,
            artist: {
              information: {
                displayName: "Teste",
              },
            },
          };
        })
      );
    })().catch(() => {
      console.log("No local songs");
    });
  }, [storage, localMusics]);

  return <MusicRow musics={localMusics} />;
};
