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
  audioPlaying = useState(false);
}

enum AudioAccess {
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

const useAudioPlaying = (key: AudioAccess) =>
  useFullAudioContext(key).audioPlaying;

const useAudioContext = (key: AudioAccess) =>
  useFullAudioContext(key).audioContext;

const useAudioSwitcher = (key: AudioAccess) => {
  const [audioPlaying, setAudioPlaying] = useAudioPlaying(key);

  return useCallback(() => {
    setAudioPlaying(!audioPlaying);
  }, [audioPlaying, setAudioPlaying]);
};

const AudioController: React.FC<PropsWithChildren<AudioContextProps>> = ({
  access,
  children,
}) => {
  const [audioPlaying, setAudioPlaying] = useAudioPlaying(access);
  const [audioElement, setAudioElement] = useAudioElement(access);
  const [audioContext, setAudioContext] = useAudioContext(access);
  const [audioFile] = useAudioFile(access);

  useEffect(() => {
    const audioElement = new Audio();

    audioElement.onloadeddata = () => {
      audioElement.play();
    };

    audioElement.onplay = () => {
      setAudioPlaying(true);
    };

    audioElement.onpause = () => {
      setAudioPlaying(false);
    };

    audioElement.onended = () => {
      setAudioPlaying(false);
    };

    setAudioElement(audioElement);
  }, [setAudioElement, setAudioPlaying]);

  useEffect(() => {
    if (!audioElement) return;

    if (audioPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [audioPlaying, audioElement]);

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
    }
  }, [audioContext, audioFile, setAudioContext]);

  useEffect(() => {
    if (!audioFile || !audioElement) return;

    (async () => {
      const sysFile = await audioFile.getFile();

      audioElement.src = URL.createObjectURL(sysFile);
    })();
  }, [audioFile, audioElement, setAudioPlaying]);

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
  useAudioPlaying,
  useAudioSwitcher,
  AudioAccess,
};

export type { AudioContextProps };
