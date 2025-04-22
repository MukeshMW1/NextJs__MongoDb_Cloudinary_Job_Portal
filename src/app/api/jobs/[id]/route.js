import connectDb from "@/libs/mongodb";
import jobModel from "@/models/job";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const id = await req.url.split("/").pop();
  await connectDb();
  const job = await jobModel.findByIdAndDelete(id);
  console.log(id);
  if (!job) {
    return NextResponse.json({ message: "Job was not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Job was sucessfully deleted" },
    { status: 200 }
  );
}

export async function PATCH(req) {
  const id = await req.url.split("/").pop();
  const newJob = await req.json();
  await connectDb();
  const job = await jobModel.findByIdAndUpdate(id, newJob, {
    new: true,
    runValidators: true,
  });
  console.log(id);
  if (!job) {
    return NextResponse.json({ message: "Job was not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Job was successfully updated" },
    { status: 200 }
  );
}



export async function GET(req) {
  const id = req.url.split('/').pop();
  await connectDb();
  const job = await jobModel.findById(id);
  return NextResponse.json({ job });
}