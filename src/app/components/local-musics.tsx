"use client";

import { NichiFolder, useNichiStorage } from "@/hooks/storage";
import { MusicRow } from "./music-row";
import { useEffect, useState } from "react";
import { MusicRecommendation } from "@/server/routers/recommendations";
import { MusicType } from "@/shared/enum";

export const LocalMusics = () => {
  const { storage } = useNichiStorage();

  // We do not store the file handles, this is intentional, we don't want to fill ram.
  const [localMusics, setLocalMusics] = useState<MusicRecommendation[]>([]);

  useEffect(() => {
    if (!storage || localMusics.length > 0) return;

    (async () => {
      const dir = await storage.getDirectoryHandle(NichiFolder.Songs);
      const songFiles = dir.values();

      const limitedSongFiles: FileSystemFileHandle[] = [];

      while (true) {
        const { value, done } = await songFiles.next();

        if (done) {
          break;
        }

        if (value.kind == "file") {
          limitedSongFiles.push(value);
          if (limitedSongFiles.length == 5) {
            break;
          }
        }
      }

      const recommendations: MusicRecommendation[] = limitedSongFiles.map(
        (file) => {
          return {
            id: file.name,
            title: file.name,
            type: MusicType.Local,
            genre: "Teste",
            artist: {
              name: "Local",
            },
          };
        }
      );

      setLocalMusics(recommendations);
    })().catch(() => {
      console.log("No local songs");
    });
  }, [storage, localMusics]);

  if (storage && localMusics.length <= 0) {
    return <div></div>;
  }

  return <MusicRow musics={localMusics} />;
};
