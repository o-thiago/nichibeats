"use client"

import { useState, useEffect } from "react";

export enum NichiFolder {
  Songs = "songs",
}

export const useNichiStorage = () => {
  const [storage, setStorage] = useState<FileSystemDirectoryHandle | null>();

  useEffect(() => {
    navigator.storage.getDirectory().then((dir) => setStorage(dir));
  }, []);

  return { storage };
};
