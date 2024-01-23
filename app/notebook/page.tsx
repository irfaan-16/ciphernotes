"use client";

import Sidebar from "../../components/Sidebar.tsx";
import Editor from "../../components/Editor.tsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useTheme } from "next-themes";
interface User {
    name: string;
    email: string;
    image: string;
    mongoDbId: string;
}

interface Session {
    user: User;
    expires: string;
}
interface Note {
    _id: string;
    icon: string;
    content: string;
    author: string;
    title: string;
}
const Page = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const sessionData = useSession();
    const session: Session | null = sessionData.data as Session | null;
    if (!session) {
        redirect("/");
    }
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [noteToChange, setNoteToChange] = useState<Note | null>(null);
    const [contentToChange, setContentToChange] = useState<string>("");
    const [key, setKey] = useState<number>(0);
    const [inputValue, setInputValue] = useState(currentNote?.title);
    const { theme } = useTheme();
    const replaceNote = (newNote: any) => {
        setNotes((prevNotes): any => {
            const index: number = prevNotes.findIndex(
                (note: Note) => note._id === newNote?._id
            );

            if (index !== -1) {
                // Create a new array with the replaced 'currentNote'
                let updatedNotes = [...prevNotes];

                updatedNotes[index] = newNote;
                return updatedNotes;
            }
            return prevNotes;
        });
        setCurrentNote(newNote);
    };
    const replaceNoteContent = (newContent: any) => {
        // newNote?.content = newContent;
        setNotes((prevNotes): any => {
            const index: number = prevNotes.findIndex(
                (note: Note) => note._id === noteToChange?._id
            );

            if (index !== -1) {
                let updatedNotes = [...prevNotes];
                updatedNotes[index].content = newContent;
                return updatedNotes;
            }
            return prevNotes;
        });
    };
    // Debounce function implementation
    const debounce = <T extends (...args: any[]) => void>(
        func: T,
        delay: number
    ) => {
        let timeoutId: NodeJS.Timeout;

        return function (this: any, ...args: Parameters<T>) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        } as T;
    };
    const updateTitle = async (value: number) => {
        try {
            // Make an API call to your getData API route
            const response = await fetch(
                `../api/updatetitle?id=${currentNote?._id}&value=${value}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: currentNote?._id,
                        value: value,
                    }),
                }
            );

            const result = await response.json();

            if (result.success) {
                console.log(result.data);
                replaceNote(result.data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    const makeApiRequestThrottled = debounce(updateTitle, 1000); // Adjust the time interval as needed
    const handleInput = async (input: any) => {
        const value = input.value;
        updateTitle(value);
        setInputValue((prevVal) => value);
        // makeApiRequestThrottled();
    };

    useEffect(() => {
        const getNotes = async () => {
            const res = await fetch(
                `../api/getnotes?email=${session?.user?.email}`
            );
            const { notes } = await res.json();
            console.log(notes);

            setNotes((prev) => notes);
        };
        getNotes();
    }, [session]);

    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
        setInputValue((prev) => currentNote?.title);
        // setNoteToChangeId((prev): any => currentNote?._id);
    }, [currentNote]);

    const updateContent = async (value: any) => {
        try {
            // Make an API call to your getData API route
            const response = await fetch(
                `../api/updatecontent?id=${currentNote?._id}&content=${value}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: currentNote?._id,
                        content: value,
                    }),
                }
            );

            const result = await response.json();

            if (result.success) {
                console.log(result.data);
                // replaceNote(result.data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        // noteToChange.content = contentToChange;

        // replaceNote(noteToChange);
        replaceNoteContent(contentToChange);
        console.log(noteToChange?.content);
    }, [noteToChange]);

    return (
        <main className="flex max-h-screen">
            <Sidebar
                notes={notes}
                user={session?.user}
                setNotes={setNotes}
                setCurrentNote={setCurrentNote}
                setNoteToChange={setNoteToChange}
            />
            {currentNote ? (
                <div className="p-8 w-full dark:bg-zinc-950">
                    <div className="flex gap-3 items-center mb-6">
                        <p className="text-4xl dark:bg-zinc-900 bg-zinc-300 p-4 rounded-xl">
                            {currentNote.icon}
                        </p>
                        <input
                            type="text"
                            className="dark:text-white text-black text-5xl font-bold outline-none bg-transparent"
                            value={inputValue}
                            onInput={(e) => handleInput(e.target)}
                        />
                    </div>
                    <Editor
                        theme={theme}
                        currentNote={currentNote}
                        key={key}
                        updateContent={updateContent}
                        setContentToChange={setContentToChange}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center w-full dark:bg-zinc-950">
                    <h1 className="text-4xl font-bold text-center">
                        Select A Note To Start Editing It.
                    </h1>
                </div>
            )}
        </main>
    );
};
export default Page;
