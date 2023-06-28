"use client";

import { useNichiStorage, NichiFolder } from "@/hooks/storage";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useEffect, useState } from "react";

export const AddSongButton = () => {
  const { storage } = useNichiStorage();
  const [file, setFile] = useState<File | null>();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;

    if (files) {
      setFile(files.item(0));
    }
  };

  useEffect(() => {
    if (!(file && storage)) return;

    (async () => {
      const sub = await storage.getDirectoryHandle(NichiFolder.Songs, {
        create: true,
      });

      const newFile = await sub.getFileHandle(file.name, { create: true });

      const writer = await newFile.createWritable();
      try {
        await writer.write(file);
      } finally {
        await writer.close();
      }
    })();
  }, [storage, file]);

  return (
    <form className="flex bg-backdrop text-backdrop-foreground hover:lighten rounded-lg">
      <label className="p-4 flex flex-row gap-4 items-center justify-center">
        <FontAwesomeIcon icon={faFileUpload} />
        <span>Add to library</span>
        <input
          type="file"
          accept=".mp3,.wav"
          hidden
          onChange={handleFileChange}
        />
      </label>
    </form>
  );
};
