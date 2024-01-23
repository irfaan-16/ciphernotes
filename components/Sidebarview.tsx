import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { Search, PlusCircle, IceCream, NotepadText } from "lucide-react";
import { FormEvent, Key, useEffect, useState } from "react";
import { Button } from "./ui/button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebarview = ({
    user,
    theme,
    handleCreateNote,
    notes,
    signOut,
    setNotes,
    setCurrentNote,
    setNoteToChange,
}: any) => {
    const [notesToRender, setNotesToRender] = useState([]);
    useEffect(() => {
        setNotesToRender(notes);
    }, [notes]);
    const filterNotes = (e: any) => {
        const searchValue = e.target.value.toLowerCase().trim();
        const filteredNotes = notes?.filter((note: any) =>
            note.title.toLowerCase().includes(searchValue)
        );
        setNotesToRender(filteredNotes);
    };

    return (
        <aside className="dark:bg-[#09090B]  min-h-screen max-w-xs p-4 min-w-64 dark:text-white border-r-4 dark:border-r-zinc-900 border-r-zinc-300">
            <div className=" hover:bg-slate-200 dark:hover:bg-zinc-900 flex items-center gap-2 p-2  rounded-sm cursor-pointer  transition ease-in-out duration-200">
                <Image
                    src={user?.image as string}
                    height={40}
                    width={40}
                    alt="User Profile Picture"
                    className="rounded-md"
                />
                <span className="font-bold">{user?.name}&apos;s notebook</span>
            </div>

            <ul>
                <li className="flex items-center gap-2 cursor-pointer p-3 hover:bg-slate-200 dark:hover:bg-zinc-900 rounded-sm transition ease-in-out duration-200 ">
                    <span className="text-sm font-bold">
                        Theme: {theme as string}
                    </span>
                    <ModeToggle />
                </li>

                <li className="flex items-center gap-2 cursor-pointer p-3 hover:bg-slate-200 dark:hover:bg-zinc-900 rounded-sm transition ease-in-out duration-200 ">
                    <Search size={26} strokeWidth={2.75} absoluteStrokeWidth />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-2 focus:outline-none max-w-40 p-2 rounded-md focus:border-[#4C00FFC0] bg-zinc-900"
                        onInput={(e) => filterNotes(e)}
                    />
                    {/* <span className="text-sm font-bold">search</span> */}
                </li>

                <li
                    className="flex items-center gap-2 cursor-pointer p-3 hover:bg-slate-200 dark:hover:bg-zinc-900 rounded-sm transition ease-in-out duration-200 "
                    onClick={() => handleCreateNote()}
                >
                    <PlusCircle
                        size={26}
                        strokeWidth={2.75}
                        absoluteStrokeWidth
                    />
                    <span className="text-sm font-bold">new sheet</span>
                </li>
            </ul>
            <div className=" flex items-center gap-2 p-2 dark:bg-slate-900  bg-slate-300 rounded-md mt-2 mb-4">
                <NotepadText size={26} strokeWidth={2.75} absoluteStrokeWidth />
                <h5 className=" font-bold ">Sheets</h5>
            </div>

            {notesToRender?.length === 0 ? (
                <p className="text-center font-bold dark:bg-zinc-900 bg-zinc-300 rounded-sm p-1">
                    Nothing to show here :(
                </p>
            ) : (
                <ul className="max-h-[40%] overflow-auto pr-4">
                    {notesToRender?.map(
                        (note: any, index: Key | null | undefined) => {
                            return (
                                <li
                                    onClick={() =>
                                        setCurrentNote((prev: any) => {
                                            setNoteToChange(prev);
                                            return note;
                                        })
                                    }
                                    key={index}
                                    className="flex items-center gap-2 cursor-pointer p-3 hover:bg-slate-200 dark:hover:bg-zinc-900 rounded-sm transition ease-in-out duration-200 animate-in"
                                >
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <span>{note.icon}</span>
                                                    <span className="text-sm font-bold text-ellipsis overflow-hidden text-nowrap">
                                                        {note.title}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {note.title}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </li>
                            );
                        }
                    )}
                </ul>
            )}

            <Button
                className="bg-red-500 text-white font-bold hover:bg-red-700 mt-4"
                onClick={() => signOut()}
            >
                Logout
            </Button>
        </aside>
    );
};

export default Sidebarview;
