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

  const handleClick = async () => {
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
    <button className="outline-none">
      <FontAwesomeIcon
        onClick={handleClick}
        icon={
          audioState == "running" &&
          audioFile &&
          audioFileMatchesID(audioFile, id)
            ? faCirclePause
            : faCirclePlay
        }
        width={32}
        size="2x"
        className="ring-2 ring-primary-vibrant rounded-full"
      />
    </button>
  );
};
