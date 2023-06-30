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

const PlayerButton: React.FC<FontAwesomeIconProps> = (props) => (
  <button className="btn btn-ghost">
    <FontAwesomeIcon
      {...props}
      size="2x"
      className={`hover:brightness-100 ${props.className ?? "dimmed"}`}
    />
  </button>
);

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

  const progressStyle = "p-1 rounded-lg";

  return (
    <div className="p-1 flex flex-row" onClick={handleProgressBarClick}>
      <div
        style={{ width: `${percentComplete}%` }}
        className={`${progressStyle} bg-primary transition-all duration-300`}
      />
      <div className={`${progressStyle} flex-grow bg-primary/20`} />
    </div>
  );
};

export const MusicBottomPlayer = () => {
  const [audioPlaying] = useAudioPlaying(AudioAccess.Music);
  const audioSwitcher = useAudioSwitcher(AudioAccess.Music);

  return (
    <div className="bg-base-200">
      <MusicProgressDisplayer />
      <div className="flex items-center justify-center">
        <PlayerButton icon={faBackward} />
        <PlayerButton
          icon={audioPlaying ? faPause : faPlay}
          className="brightness-100 hover:scale-110"
          onClick={audioSwitcher}
        />
        <PlayerButton icon={faForward} />
      </div>
    </div>
  );
};
