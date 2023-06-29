"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ContextStore,
  MapContextProvider,
  useContextWithKey,
} from "./map-context";

class FullAudioContext {
  audioElement = useState<HTMLAudioElement | null>(null);
  audioContext = useState<AudioContext | null>(null);
  audioFile = useState<FileSystemFileHandle | null>(null);
  audioState = useState<AudioContextState | null>(null);
}

export enum AudioAccess {
  Music = "music",
}

const audioContextStore: ContextStore<AudioAccess, FullAudioContext> =
  new Map();

const useFullAudioContext = (key: AudioAccess) =>
  useContextWithKey(audioContextStore, key);

const AudioContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const contextKeys = Object.values(AudioAccess);

  return (
    <MapContextProvider
      contextStore={audioContextStore}
      contextKeys={contextKeys}
      contextCreator={() => new FullAudioContext()}
    >
      {contextKeys.map((key) => {
        return (
          <AudioController key={key} access={key}>
            {children}
          </AudioController>
        );
      })}
    </MapContextProvider>
  );
};

type AudioContextProps = {
  access: AudioAccess;
};

const useAudioFile = (key: AudioAccess) => useFullAudioContext(key).audioFile;

const useAudioElement = (key: AudioAccess) =>
  useFullAudioContext(key).audioElement;

const useAudioState = (key: AudioAccess) => useFullAudioContext(key).audioState;

function useAudioContext(key: AudioAccess) {
  return useFullAudioContext(key).audioContext;
}

const useAudioSwitcher = (key: AudioAccess) => {
  const [audioContext] = useAudioContext(key);

  return useCallback(() => {
    if (!audioContext) return;

    if (audioContext.state == "running") {
      audioContext.suspend();
    } else {
      audioContext.resume();
    }
  }, [audioContext]);
};

const AudioController: React.FC<PropsWithChildren<AudioContextProps>> = ({
  access,
  children,
}) => {
  const [audioElement, setAudioElement] = useAudioElement(access);
  const [audioContext, setAudioContext] = useAudioContext(access);
  const [audioFile] = useAudioFile(access);
  const [, setAudioState] = useAudioState(access);

  useEffect(() => {
    setAudioElement(new Audio());
  }, [setAudioElement]);

  useEffect(() => {
    if (!audioContext || !audioElement) return;

    const mediaElementSource =
      audioContext.createMediaElementSource(audioElement);

    mediaElementSource.connect(audioContext.destination);
  }, [audioContext, audioElement]);

  useEffect(() => {
    if (audioFile && !audioContext) {
      const audioContext = new AudioContext();

      setAudioContext(audioContext);
      setAudioState(audioContext.state);
    }
  }, [audioContext, audioFile, setAudioContext, setAudioState]);

  useEffect(() => {
    if (!audioContext) return;

    audioContext.onstatechange = () => {
      // Although we can directly access the state through the audioContext's
      // state, we also expose the audio state through here, for easy of use
      // and to also force a component update on the consumers whenever the state is changed
      setAudioState(audioContext.state);
    };
  }, [audioContext, setAudioState]);

  useEffect(() => {
    if (!audioFile || !audioElement) return;

    (async () => {
      const sysFile = await audioFile.getFile();

      audioElement.src = URL.createObjectURL(sysFile);

      audioElement.onloadeddata = () => {
        audioElement.play();
      };
    })();
  }, [audioFile, audioElement]);

  return children;
};

export {
  AudioContextProvider,
  audioContextStore,
  AudioController,
  useAudioContext,
  useAudioFile,
  useAudioElement,
  useFullAudioContext,
  useAudioState,
  useAudioSwitcher,
};

export type { AudioContextProps };
