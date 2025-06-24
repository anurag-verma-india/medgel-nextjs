// file_name: "@/app/api/page/route.ts"

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/contactus";
import { revalidateTag } from "next/cache";
import handleError from "@/helpers/handleError";


// export async function GET(request: NextRequest) {
export async function GET() {


  try {
    await dbConnect();
    const contactDet = await Contact.find({ });

    if (!contactDet) {
      return NextResponse.json({ error: "Responses not found" }, { status: 404 });
    }

    return NextResponse.json(contactDet);
  } catch (error) {
    return handleError(error, "Server error");
    // return NextResponse.json(
    //   { error: "Server error", details: error.message },
    //   { status: 500 },
    // );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    console.log("Contact Data: ", body);

    const data = new Contact({
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
    });
    

    const savedData = await data.save();

    revalidateTag(body.title);
    return new Response(savedData, { status: 201 });
  } catch (error) {
    console.error("Error Storing Message: ", error); // Log the complete error object
    return handleError(error, "Failed to Storing Message");
 
  }
}
export async function DELETE(request: NextRequest) {
  // TODO: Make sure the user is admin
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

    const updatedres = await Contact.findByIdAndDelete(id);

if (!updatedres) {
  return NextResponse.json({ error: "Contact  item not found" }, { status: 404 });
}

return NextResponse.json({ success: true, data: updatedres });

  } catch (error) {
    console.error("Error in Deleting response: ", error); // Log the complete error object
    return handleError(error, "Failed to Delete response");
   
  }
}