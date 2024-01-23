"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Search, PlusCircle, IceCream, NotepadText } from "lucide-react";
import { ModeToggle } from "./toggle-theme";
import { useTheme } from "next-themes";
import Link from "next/link";
// import SideBarView from "./Sidebarview";
// import Sidebarview from "./Sidebarview";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import "@blocknote/core/style.css";
import { useState, useEffect } from "react";
import Sidebarview from "@/components/Sidebarview";

// export const getServerSideProps = async (context: any) => {
//     const dynamicPage = context.params.dynamicPage;

//     // Fetch data from external API
//     const res = await fetch(`../api/getnotes?email=${dynamicPage}`);
//     const notes = await res.json();
//     // Pass data to the page via props
//     return { props: { notes, dynamicPage } };
// };

const Sidebar = ({
    notes,
    user,
    setNotes,
    setCurrentNote,
    setNoteToChange,
}: any) => {
    const { theme } = useTheme();
    console.log("Sidebar re rendered");

    console.log(user);

    const handleCreateNote = async () => {
        try {
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
                setCurrentNote(note);
                setNotes((prevNotes: any) => [...prevNotes, note]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Sidebarview
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

export default Sidebar;
