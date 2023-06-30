"use client";

import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  AudioAccess,
  useAudioElement,
  useAudioPlaying,
  useAudioSwitcher,
} from "@/context/audio-context";

const MusicProgressDisplayer = () => {
  const [audioElement] = useAudioElement(AudioAccess.Music);
  const [percentComplete, setPercentComplete] = useState(0);

  useEffect(() => {
    audioElement?.addEventListener("timeupdate", () => {
      const { currentTime, duration } = audioElement;
      const newPercentComplete = currentTime / duration;
      setPercentComplete(newPercentComplete * 100);
    });
  }, [audioElement]);

  const handleProgressBarClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!audioElement || audioElement.paused) return;

    const progressBar = event.currentTarget;
    const progressBarWidth = progressBar.offsetWidth;

    const clickPositionX =
      event.clientX - progressBar.getBoundingClientRect().left;

    const percentage = clickPositionX / progressBarWidth;

    audioElement.currentTime = percentage * audioElement.duration;
  };

  return (
    <div className="p-1 flex flex-row" onClick={handleProgressBarClick}>
      <div
        style={{ width: `${percentComplete}%` }}
        className={`p-1 rounded-lg bg-primary transition-all duration-300`}
      />
      <div className={`flex-grow bg-primary/20`} />
    </div>
  );
};

const BottomMusicPlayerButton: React.FC<FontAwesomeIconProps> = (props) => (
  <button className="btn btn-ghost">
    <FontAwesomeIcon
      {...props}
      size="2x"
      className={`hover:brightness-100 ${props.className ?? "dimmed"}`}
    />
  </button>
);

export const BottomMusicPlayer = () => {
  const [audioPlaying] = useAudioPlaying(AudioAccess.Music);
  const audioSwitcher = useAudioSwitcher(AudioAccess.Music);

  return (
    <div className="bg-base-200 p-2">
      <MusicProgressDisplayer />
      <div className="flex items-center justify-center">
        <BottomMusicPlayerButton icon={faBackward} />
        <BottomMusicPlayerButton
          icon={audioPlaying ? faPause : faPlay}
          className="brightness-100 hover:scale-110"
          onClick={audioSwitcher}
        />
        <BottomMusicPlayerButton icon={faForward} />
      </div>
    </div>
  );
};
