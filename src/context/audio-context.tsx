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

const getAudioControl = async (
  audioContext: AudioContext,
  file: FileSystemFileHandle
): Promise<AudioBufferSourceNode> => {
  const reader = new FileReader();

  return new Promise(async (res) => {
    reader.onload = () => {
      const buffer = reader.result;

      if (buffer && typeof buffer == "object") {
        audioContext.decodeAudioData(buffer, (decodedData) => {
          const source = audioContext.createBufferSource();

          source.buffer = decodedData;
          source.connect(audioContext.destination);

          res(source);
        });
      }
    };

    const blob = await file.getFile();

    reader.readAsArrayBuffer(blob);
  });
};

class FullAudioContext {
  audioBuffer = useState<AudioBufferSourceNode | null>(null);
  audioContext = useState<AudioContext | null>(null);
  audioFile = useState<FileSystemFileHandle | null>(null);
  audioState = useState<AudioContextState | null>(null!);
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

const useAudioBuffer = (key: AudioAccess) =>
  useFullAudioContext(key).audioBuffer;

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
      audioContext?.resume();
    }
  }, [audioContext]);
};

const AudioController: React.FC<PropsWithChildren<AudioContextProps>> = ({
  access,
  children,
}) => {
  const [audioContext, setAudioContext] = useAudioContext(access);
  const [audioFile] = useAudioFile(access);
  const [audioBuffer, setAudioBuffer] = useAudioBuffer(access);
  const [, setAudioState] = useAudioState(access);

  useEffect(() => {
    if (audioFile && !audioContext) {
      const audioContext = new AudioContext();

      setAudioContext(audioContext);
      setAudioState(audioContext.state);
    }
  }, [audioContext, audioFile, setAudioContext]);

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
    if (!audioFile || !audioContext) return;

    (async () => {
      const audioBuffer = await getAudioControl(audioContext, audioFile);

      setAudioBuffer(audioBuffer);
    })();
  }, [audioFile, audioContext, setAudioBuffer]);

  useEffect(() => {
    audioBuffer?.start();

    return () => {
      audioBuffer?.stop();
    };
  }, [audioBuffer]);

  return children;
};

export {
  AudioContextProvider,
  audioContextStore,
  AudioController,
  useAudioContext,
  useAudioFile,
  useAudioBuffer,
  useFullAudioContext,
  useAudioState,
  useAudioSwitcher,
};

export type { AudioContextProps };
