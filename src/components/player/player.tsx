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
import React, { ButtonHTMLAttributes } from "react";
import { useAudioContext } from "@/context/audio-context";

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

export const MusicPlayer = () => {
  const [audioContext] = useAudioContext();

  return (
    <div className="flex bg-backdrop text-backdrop-foreground p-4 items-center justify-center gap-4">
      <PlayerButton iconProps={{ icon: faBackward }} />
      <PlayerButton
        iconProps={{
          icon: audioContext?.state == "running" ? faPause : faPlay,
          className: "brightness-100 hover:scale-110",
        }}
        buttonProps={{
          onClick: () => {
            if (audioContext?.state == "running") {
              audioContext?.suspend();
            } else {
              audioContext?.resume();
            }
          },
        }}
      />
      <PlayerButton iconProps={{ icon: faForward }} />
    </div>
  );
};
