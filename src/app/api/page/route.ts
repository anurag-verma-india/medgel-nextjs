// api/page/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Pages from "@/models/pages";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  console.log("page title: ", title);

  if (!title) {
    return NextResponse.json(
      { error: "Title parameter is required" },
      { status: 400 },
    );
  }

  try {
    await dbConnect();
    const page = await Pages.findOne({ title });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title } = body;
    console.log("creating page: ", body);

    // search title in the database
    const page = await Pages.findOne({ title });

    // if page exists send the response that it already exists
    if (page) {
      return NextResponse.json(
        { error: "Page already exists" },
        { status: 400 },
      );
    }

    // otherwise add it to database and save
    const newPage = new Pages(body);
    const savedPage = await newPage.save();

    // call revalidation function for that title
    revalidateTag(body.title);
    return new Response(JSON.stringify(savedPage), { status: 201 });
  } catch (error) {
    console.error("Error creating page: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to create page",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title } = body;

    // console.log("editing page: ", body);
    if (!title) {
      return NextResponse.json(
        { error: "Title parameter is required" },
        { status: 400 },
      );
    }

    // search title in the database
    const page = await Pages.findOne({ title });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // edit page with current details
    await Pages.findOneAndUpdate(
      { title: title },
      { $set: { content: body.content } },
    );
    const pageAfterUpdate = await Pages.findOne({ title });
    console.log("Edited page from database: ", pageAfterUpdate);
    revalidateTag(title);
    return new Response(pageAfterUpdate, { status: 200 });
  } catch (error) {
    console.error("Error editing page: ", error); // Log the complete error object
    return new Response(
      JSON.stringify({
        message: "Failed to edit page",
        error: error.toString(),
      }),
      { status: 500 },
    );
  }
}
