import UserModel, { UserDocument } from "@/lib/Models/User";
import connect from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel, { NoteDocument } from "@/lib/Models/Note";

export async function GET(req: NextRequest, res: NextResponse) {
    await connect();

    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("id");

    try {
        const note: NoteDocument | null = await NoteModel.findById(noteId);

        return new Response(JSON.stringify({ note }), {
            status: 201,
        });
    } catch {
        return new Response(JSON.stringify("Failed to fetch the note"), {
            status: 500,
        });
    }
}
