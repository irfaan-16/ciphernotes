import UserModel, { UserDocument } from "@/lib/Models/User";
import connect from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connect();

    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");

    try {
        const user: UserDocument | null = await UserModel.findOne({
            email: userEmail,
        });
        if (user) {
            return new Response(
                JSON.stringify({ mongoDbId: user._id }),
                { status: 201 }
            );
        }
    } catch {
        return new Response(JSON.stringify("Failed to fetch the user id"), {
            status: 500,
        });
    }
}
