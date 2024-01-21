"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEffect, useRef, useState } from "react";
// import Editorview from "./editorview";
import dynamic from "next/dynamic";
import React from "react";
// const Editorview = dynamic(() => import("./Editorview"), { ssr: false });

// Our <Editor> component we can reuse later
const editor = ({
    theme,
    currentNote,
    updateContent,
    setContentToChange,
}: any) => {
    const editor: BlockNoteEditor | null = useBlockNote({
        editable: true,
        initialContent: JSON.parse(currentNote.content),
        onEditorContentChange: (e) => {
            console.log(JSON.stringify(e.topLevelBlocks, null, 2));
            setContentToChange((prev: any) =>
                JSON.stringify(e.topLevelBlocks, null, 2)
            );
            updateContent(JSON.stringify(e.topLevelBlocks, null, 2));
        },
    });

    return (
        <div className="w-full dark:bg-zinc-950">
            <BlockNoteView editor={editor} theme={theme} />
        </div>
    );
};

export default editor;
