import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated",
        }, {
            status: 401,
        });
    }
    const userId = user._id
    const { acceptMessages } = await request.json();
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        );
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user",
            }, {
                status: 401,
            });
        }
        return Response.json({
            success: true,
            message: "User updated successfully",
            updatedUser
        }
            , {
                status: 200,
            });
    } catch (error) {
        console.log("failed to update user", error);
        return Response.json({
            success: false,
            message: "Failed to update user",
        }, {
            status: 500,
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated",
        }, {
            status: 401,
        });
    }
    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId)
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found",
            }, {
                status: 404,
            });
        }
        return Response.json({
            success: true,
            isAcceptiongMessages: foundUser.isAcceptingMessage,
            message: "User found",
            user: foundUser
        }, {
            status: 200,
        });
    } catch (error) {
        console.log("failed to update user status to accept messages", error);
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages",
        }, {
            status: 500,
        });
    }
}