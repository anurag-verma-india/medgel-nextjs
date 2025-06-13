// file_name: "@/app/api/page/route.ts"

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import News from "@/models/news";
import handleError from "@/helpers/handleError";

export async function POST(request: NextRequest) {

  try {
    await dbConnect();
    const body = await request.json();

    const {
      title,
      description, 
    } = body;


    const Newsdata = new News({
      title: title,
      description: description,
    });

    const savedNews = await Newsdata.save();

    return NextResponse.json({
      message:"News Created SuccessFully",
      news:savedNews,
    });
  } catch (error) {
    console.error("Error in adding News: ", error); // Log the complete error object
    return handleError(error, "Failed to Add News");
   
  }
}


export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
    console.log(searchParams)
  if (id) {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
    return NextResponse.json(newsItem);
  }

  else{
    const allNews = await News.find();
  return NextResponse.json(allNews);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
        _id,
      title,
      description, 
    } = body;


    const updatedNews = await News.findByIdAndUpdate(
  _id,
  {
    $set: {
      title,
      description,
    },
  },
  { new: true } 
);

if (!updatedNews) {
  return NextResponse.json({ error: "News item not found" }, { status: 404 });
}

return NextResponse.json({ success: true, data: updatedNews });

  } catch (error) {
    console.error("Error in Upadting News: ", error); // Log the complete error object
    return handleError(error, "Failed to Update News");
   
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

    const updatedNews = await News.findByIdAndDelete(id);

if (!updatedNews) {
  return NextResponse.json({ error: "News item not found" }, { status: 404 });
}

return NextResponse.json({ success: true, data: updatedNews });

  } catch (error) {
    console.error("Error in Deleting News: ", error); // Log the complete error object
    return handleError(error, "Failed to Delete News");
   
  }
}
