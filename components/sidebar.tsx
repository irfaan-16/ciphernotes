"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Search, PlusCircle, IceCream, NotepadText } from "lucide-react";
import { ModeToggle } from "./toggle-theme";
import { useTheme } from "next-themes";
import Link from "next/link";
import SideBarView from "./sidebarview";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import "@blocknote/core/style.css";
import { useState, useEffect } from "react";

// export const getServerSideProps = async (context: any) => {
//     const dynamicPage = context.params.dynamicPage;

//     // Fetch data from external API
//     const res = await fetch(`../api/getnotes?email=${dynamicPage}`);
//     const notes = await res.json();
//     // Pass data to the page via props
//     return { props: { notes, dynamicPage } };
// };

const sidebar = ({
    notes,
    user,
    setNotes,
    setCurrentNote,
    setNoteToChange,
}: any) => {
    const { data: session } = useSession();
    const { theme } = useTheme();
    // const [notes, setNotes] = useState<any[]>([]);
    console.log("sidebar re rendered");
    // console.log(notes);

    // const user = session?.user;
    // const response = await fetch(`../api/getnotes?email=${user?.email}`);
    // const { notes } = await response.json();

    // useEffect(() => {
    //     const getNotes = async () => {
    //         const response = await fetch(
    //             `../api/getnotes?email=${session?.user?.email}`
    //         );
    //         const { notes } = await response.json();
    //         console.log("user notes:", notes);

    //         setNotes((prevNotes) => notes);
    //     };
    //     getNotes();
    // }, [session]);

    // const changeCurrentNote = (content: string) => {
    //     setCurrentNote(content);
    //     console.log(content);
    // };
    console.log(user);

    const handleCreateNote = async () => {
        try {
            // const idResponse = await fetch(
            //     `api/getId?email=${session?.user?.email}`
            // );
            // const { mongoDbId } = await idResponse.json();
            const data = { userId: user?.mongoDbId };
            const response = await fetch("../api/createnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(data);

            if (response.ok) {
                const note = await response.json();
                setNotes((prevNotes: any) => [...prevNotes, note]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SideBarView
            user={user}
            theme={theme}
            handleCreateNote={handleCreateNote}
            notes={notes}
            signOut={signOut}
            setNotes={setNotes}
            setCurrentNote={setCurrentNote}
            setNoteToChange={setNoteToChange}
        />
    );
};
export default sidebar;
