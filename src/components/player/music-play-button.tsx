"use client";

import {
  AudioAccess,
  useAudioFile,
  useAudioState,
  useAudioSwitcher,
} from "@/context/audio-context";
import { NichiFolder, useNichiStorage } from "@/hooks/storage";
import { MusicRecommendation } from "@/server/routers/recommendations";
import { MusicType } from "@/shared/enum";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

const audioFileMatchesID = (file: FileSystemFileHandle, id: string) =>
  file.name == id;

export const MusicPlayButton: React.FC<MusicRecommendation> = ({
  id,
  type,
}) => {
  const [audioState] = useAudioState(AudioAccess.Music);
  const [audioFile, setAudioFile] = useAudioFile(AudioAccess.Music);
  const audioSwitcher = useAudioSwitcher(AudioAccess.Music);

  const { storage } = useNichiStorage();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    if (type != MusicType.Local || !storage) return;

    const dir = await storage.getDirectoryHandle(NichiFolder.Songs);
    const file = await dir.getFileHandle(id);

    if (audioFile && audioFileMatchesID(audioFile, id)) {
      audioSwitcher();
    } else {
      setAudioFile(file);
    }
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon
        icon={
          audioState == "running" && audioFile && audioFileMatchesID(audioFile, id)
            ? faCirclePause
            : faCirclePlay
        }
        width={32}
        size="2x"
        className="drop-shadow-lg stroke-black stroke-2"
      />
    </button>
  );
};
