import NoteModel from "@/lib/Models/Note";
import connect from "@/lib/db/database";
// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
function getRandomEmoji() {
    // Expand the range to include a broader selection of emojis
    const startCodePoint = 0x1f300;
    const endCodePoint = 0x1f6ff;

    // Create an array of emojis within the specified range
    const emojis = Array.from(
        { length: endCodePoint - startCodePoint + 1 },
        (_, index) => String.fromCodePoint(startCodePoint + index)
    );

    // Shuffle the array to introduce more randomness
    for (let i = emojis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
    }

    // Return a random emoji
    return emojis[Math.floor(Math.random() * emojis.length)];
}
export async function POST(req: NextRequest, res: NextResponse) {
    await connect();
    const { userId } = await req.json();

    console.log(userId);

    const newNote = new NoteModel({
        icon: getRandomEmoji(),
        content: JSON.stringify(""),
        author: userId,
        title: "untitled",
    });

    try {
        const savedNote = await newNote.save();
        return new Response(JSON.stringify(savedNote), { status: 201 });
    } catch (error) {
        return new Response("Failed to Create New Note", { status: 500 });
    }
}
