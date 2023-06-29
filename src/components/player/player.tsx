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
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import {
  AudioAccess,
  useAudioContext,
  useAudioElement,
  useAudioSwitcher,
} from "@/context/audio-context";

type PlayerButtonProps = {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  iconProps: FontAwesomeIconProps;
};

const PlayerButton: React.FC<PlayerButtonProps> = ({
  buttonProps,
  iconProps,
}) => (
  <button {...buttonProps}>
    <FontAwesomeIcon
      {...iconProps}
      size="2x"
      width={32}
      className={`hover:brightness-100 ${iconProps.className ?? "dimmed"}`}
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

  return (
    <div className="bg-backdrop dimmed p-1">
      <div
        style={{ width: `${percentComplete}%` }}
        className="bg-primary p-1 rounded-lg"
      />
    </div>
  );
};

export const MusicPlayer = () => {
  const [audioContext] = useAudioContext(AudioAccess.Music);
  const audioSwitcher = useAudioSwitcher(AudioAccess.Music);

  return (
    <div className="bg-backdrop text-backdrop-foreground">
      <MusicProgressDisplayer />
      <div className="flex p-2 items-center justify-center gap-4">
        <PlayerButton iconProps={{ icon: faBackward }} />
        <PlayerButton
          iconProps={{
            icon: audioContext?.state == "running" ? faPause : faPlay,
            className: "brightness-100 hover:scale-110",
          }}
          buttonProps={{
            onClick: audioSwitcher,
          }}
        />
        <PlayerButton iconProps={{ icon: faForward }} />
      </div>
    </div>
  );
};
