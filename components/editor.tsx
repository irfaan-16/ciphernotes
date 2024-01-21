"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEffect, useRef, useState } from "react";
// import Editorview from "./editorview";
import dynamic from "next/dynamic";
import React from "react";
const Editorview = dynamic(() => import("./editorview"), { ssr: false });

// Our <Editor> component we can reuse later
const Editor = ({
    theme,
    currentNote,
    updateContent,
    setContentToChange,
}: any) => {
    const editorRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        // Focus the editor when the component mounts
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, [currentNote]);

    return (
        <div className="w-full dark:bg-zinc-950" ref={editorRef}>
            <BlockNoteView editor={editor} theme={theme} />
        </div>
    );
};

export default Editor;
