"use client";

import { useAudioFile } from "@/context/audio-context";
import { NichiFolder, useNichiStorage } from "@/hooks/storage";
import { MusicRecommendation } from "@/server/routers/recommendations";
import { MusicType } from "@/shared/enum";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

export const MusicPlayButton: React.FC<MusicRecommendation> = ({
  id,
  type,
}) => {
  const [, setAudioFile] = useAudioFile();

  const { storage } = useNichiStorage();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    if (type != MusicType.Local || !storage) return;

    const dir = await storage.getDirectoryHandle(NichiFolder.Songs);
    const file = await dir.getFileHandle(id);

    setAudioFile(file);
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon
        icon={faPlayCircle}
        width={32}
        size="2x"
        className="drop-shadow-lg stroke-black stroke-2"
      />
    </button>
  );
};
