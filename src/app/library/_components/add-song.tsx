"use client";

import { useNichiStorage, NichiFolder } from "@/hooks/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { v4} from "uuid"


const saveFile = async (
    storage: FileSystemDirectoryHandle,
    file: File,
    dir: NichiFolder
) => {
    const sub = await storage.getDirectoryHandle(dir, {
        create: true,
    });

    const newFile = await sub.getFileHandle(v4() + file.name, { create: true });

    const writer = await newFile.createWritable();
    try {
        await writer.write(file);
    } finally {
        await writer.close();
    }
};

const useDisclosure = () => {
    const [open, setOpen] = useState(false);

    return [
        open,
        {
            open: () => setOpen(true),
            close: () => setOpen(false),
        },
    ] as const;
};

const schema = z.object({
    title: z.string().nonempty(),
    artist: z.string().nonempty(),
    file: z.any(),
});

type SongSchema = z.infer<typeof schema>;

export const AddSongModal = () => {
    const { storage } = useNichiStorage();
    const [show, { open, close }] = useDisclosure();

    const form = useForm({
        initialValues: {
            title: "",
            artist: "",
            file: "" as never as File,
        } satisfies SongSchema,
        validate: zodResolver(schema),
    });

    return (
        <div>
            <div className="btn" onClick={open}>
                <FontAwesomeIcon icon={faFileUpload} />
                <span>Adicionar música</span>
            </div>
            <div>
                <Dialog open={show} onClose={close} className="relative">
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-sm rounded-lg bg-base-300 p-4">
                            <Dialog.Title>Adicione uma música</Dialog.Title>
                            <Dialog.Description className="dimmed">
                                Customize ela como queira
                            </Dialog.Description>
                            <form
                                onSubmit={form.onSubmit(({ file }) => {
                                    if (storage) {
                                        saveFile(storage, file, NichiFolder.Songs);
                                    }
                                })}
                                className="flex flex-col gap-4 p-4"
                            >
                                {[
                                    ["title", "Título"],
                                    ["artist", "Artista"],
                                ].map(([key, label]) => {
                                    return (
                                        <input
                                            placeholder={label}
                                            key={key}
                                            className="input"
                                            {...form.getInputProps(key)}
                                        />
                                    );
                                })}
                                <label>Arquivo da música</label>
                                <input
                                    type="file"
                                    className="file-input"
                                    accept=".mp3,.wav"
                                    {...form.getInputProps("file")}
                                />
                                <button type="submit" className="btn btn-primary">
                                    Adicionar
                                </button>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
