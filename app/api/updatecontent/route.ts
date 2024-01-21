import connect from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/lib/Models/Note";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connect();
        const { id, content } = await req.json();
        console.log("ID:", id, "VALUE:", content);

        // Replace with your actual collection name
        const newNote = await NoteModel.findByIdAndUpdate(
            id,
            { content: content },
            { new: true }
        );

        return new Response(JSON.stringify({ success: true, data: newNote }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response("Could not update the content!", {
            status: 500,
        });
    }
}
