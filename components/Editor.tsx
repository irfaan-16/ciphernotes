"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

const Editor = ({
    theme,
    currentNote,
    updateContent,
    setContentToChange,
}: any) => {
    const tempEditor: BlockNoteEditor | null = useBlockNote({
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
            <BlockNoteView editor={tempEditor} theme={theme} />
        </div>
    );
};

export default Editor;
