import { addDoc, updateDoc } from "backend/lib";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method === "POST") {
    console.log("POST");
    const res = await request.json();

    const data = res.data;

    try {
      await addDoc("form-data", {
        data,
        ...res,
      });

      return Response.json({
        data: { message: "Form submitted successfully" },
      });
    } catch (error) {
      return Response.json({ data: { error } });
    }
  }
}

export async function PUT(request: NextRequest) {
  if (request.method === "PUT") {
    console.log("PUT");
    const res = await request.json();

    const id = res.docId;

    try {
      await updateDoc("form-data", id, res);

      return Response.json({
        data: { message: "Form updated successfully" },
      });
    } catch (error) {
      return Response.json({ data: { error } });
    }
  }
}
