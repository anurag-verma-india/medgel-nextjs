// file_name: "@/app/api/page/route.ts"

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import News from "@/models/news";
// import handleError from "@/helpers/handleError";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import LogError from "@/helpers/LogError";

async function checkAdmin(): Promise<NextResponse | null> {
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    console.log("Error while checking authorization level");
    console.log(error);
  }

  if (!isAdmin) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  // console.log("Admin is authorized");
  return null;
}

export async function POST(request: NextRequest) {
  const adminResponse = await checkAdmin();
  if (adminResponse) return adminResponse;

  try {
    await dbConnect();
    const body = await request.json();

    const { title, description } = body;

    const Newsdata = new News({
      title: title,
      description: description,
    });

    const savedNews = await Newsdata.save();

    return NextResponse.json({
      success: true,
      message: "News Created SuccessFully",
      news: savedNews,
    });
  } catch (error) {
    // console.error("Error in adding News: ", error); // Log the complete error object
    // return handleError(error, "Failed to Add News");
    LogError(error, "Failed to Add News");
    return NextResponse.json(
      {
        success: false,
        error: "Failed to Add News, please refresh the page and try again",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(searchParams);
    if (id) {
      const newsItem = await News.findById(id);
      console.log("newsItem", newsItem);
      if (!newsItem) {
        return NextResponse.json(
          { success: false, error: "News not found" },
          { status: 404 },
        );
      }
      return NextResponse.json({ success: true, data: newsItem });
    }
    const allNews = await News.find();
    return NextResponse.json({ success: true, data: allNews });
  } catch (error) {
    console.error("Error in getting News: ", error); // Log the complete error object
    return NextResponse.json({
      success: false,
      error: "Unknown error occurred while getting news",
    });
  }
}

export async function PUT(request: NextRequest) {
  const adminResponse = await checkAdmin();
  if (adminResponse) return adminResponse;

  try {
    await dbConnect();
    const body = await request.json();

    const { _id, title, description } = body;

    const updatedNews = await News.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          description,
        },
      },
      { new: true },
    );

    if (!updatedNews) {
      return NextResponse.json(
        { success: false, error: "News item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error) {
    console.error("Error in Upadting News: ", error); // Log the complete error object
    // return handleError(error, "Failed to Update News");
    LogError(error, "Failed to Update News");
    return NextResponse.json(
      {
        success: false,
        error: "Failed to Update News, please refresh the page and try again",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const adminResponse = await checkAdmin();
  if (adminResponse) return adminResponse;

  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const updatedNews = await News.findByIdAndDelete(id);

    if (!updatedNews) {
      return NextResponse.json(
        { success: false, error: "News item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error) {
    console.error("Error in Deleting News: ", error); // Log the complete error object
    LogError(error, "Failed to Delete News");
    return NextResponse.json(
      {
        success: false,
        error: "Failed to Delete News, please refresh the page and try again",
      },
      { status: 500 },
    );
  }
}
