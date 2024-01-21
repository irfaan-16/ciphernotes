import UserModel, { UserDocument } from "@/lib/Models/User";
import connect from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/lib/Models/Note";

export async function GET(req: NextRequest, res: NextResponse) {
    await connect();

    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");

    try {
        const user: UserDocument | null = await UserModel.findOne({
            email: userEmail,
        });
        const notes = await NoteModel.find({ author: user?._id });
        return new Response(JSON.stringify({ notes }), {
            status: 201,
        });
    } catch {
        return new Response(JSON.stringify("Failed to fetch the user notes"), {
            status: 500,
        });
    }
}
