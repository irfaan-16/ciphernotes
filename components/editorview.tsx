"use client";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import Sidebar from "./sidebar";
import "@blocknote/react/style.css";

const editorview = ({editor, theme }: any) => {
    const tempEditor: BlockNoteEditor | null = useBlockNote({
        editable: true,
        // initialContent: currentNote ? JSON.parse(currentNote.content) : null,
        onEditorContentChange: (e) => {
            console.log(JSON.stringify(e.topLevelBlocks, null, 2));
        },
    });

    return (
        <main className="flex">
            <Sidebar />
            <div className="py-8 px-4 w-full dark:bg-zinc-950">
                <p>{}</p>
                <BlockNoteView editor={tempEditor} theme={theme} />
            </div>
        </main>
    );
};
export default editorview;
