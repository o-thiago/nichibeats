"use client";

import {
  AudioAccess,
  useAudioFile,
  useAudioPlaying,
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
  const [playing] = useAudioPlaying(AudioAccess.Music);

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
    <div className="btn btn-primary btn-circle rounded-full">
      <FontAwesomeIcon 
        onClick={handleClick}
        icon={
          playing && audioFile && audioFileMatchesID(audioFile, id)
            ? faCirclePause
            : faCirclePlay
        }
        size="3x"
        className="text-primary-content"
      />
    </div>
  );
};
