import {
  faBackward,
  faForward,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

const PlayerButton: React.FC<FontAwesomeIconProps> = (props) => (
  <FontAwesomeIcon
    {...props}
    width={24}
    className={`hover:brightness-100 ${(props.className ?? "brightness-75")}`}
  />
);

export const MusicPlayer = () => {
  return (
    <div className="flex bg-backdrop text-backdrop-foreground p-2 items-center justify-center gap-4">
      <PlayerButton icon={faBackward} />
      <PlayerButton icon={faPlay} className="brightness-100 hover:scale-110" />
      <PlayerButton icon={faForward} />
    </div>
  );
};
