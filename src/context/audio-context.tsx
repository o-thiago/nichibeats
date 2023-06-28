"use client";

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

export type ContextValue<T> = [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>
];

const AudioBufferContext = createContext<
  ContextValue<AudioBufferSourceNode | undefined>
>([null!, null!]);

export const AudioBufferProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [audio, setAudio] = useState<AudioBufferSourceNode | undefined>();

  return (
    <AudioBufferContext.Provider value={[audio, setAudio]}>
      {children}
    </AudioBufferContext.Provider>
  );
};

const AudioFileContext = createContext<ContextValue<FileSystemFileHandle>>([
  null!,
  null!,
]);

export const AudioFileProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [audioFile, setAudioFile] = useState<
    FileSystemFileHandle | undefined
  >();

  return (
    <AudioFileContext.Provider value={[audioFile, setAudioFile]}>
      {children}
    </AudioFileContext.Provider>
  );
};

export const AudioManagerContext = createContext<ContextValue<AudioContext>>(
  null!
);

export const AudioManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();

  return (
    <AudioManagerContext.Provider value={[audioContext, setAudioContext]}>
      {children}
    </AudioManagerContext.Provider>
  );
};

export const AudioAutomation: React.FC<PropsWithChildren> = ({ children }) => {
  const [audioContext, setAudioContext] = useAudioContext();
  const [audioBuffer, setAudioBuffer] = useAudioBuffer();
  const [audioFile] = useAudioFile();

  useEffect(() => {
    if (!audioContext && audioFile) {
      setAudioContext(new AudioContext());
    }
  }, [audioFile, audioContext, setAudioContext]);

  useEffect(() => {
    if (!audioFile || !audioContext) return;

    (async () => {
      const audioBuffer = await getAudioControl(audioContext, audioFile);

      setAudioBuffer(audioBuffer);
    })();
  }, [audioFile, setAudioBuffer, audioContext]);

  useEffect(() => {
    audioBuffer?.start();

    return () => {
      audioBuffer?.stop();
    };
  }, [audioBuffer]);

  return children;
};

export const useAudioContext = () => useContext(AudioManagerContext);
export const useAudioBuffer = () => useContext(AudioBufferContext);
export const useAudioFile = () => useContext(AudioFileContext);
