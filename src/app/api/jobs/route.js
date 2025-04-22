import connectDb from "@/libs/mongodb";
import jobModel from "@/models/job";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, requirements, perks, salary } = await req.json();
  console.log(title, description, requirements, perks, salary);
  await connectDb();
  jobModel.create({ title, description, requirements, perks, salary });
  return NextResponse.json({ message: "New Job Created" }, { status: 201 });
}

export async function GET() {
  await connectDb();
  const jobs = await jobModel.find();
  return NextResponse.json({ jobs });
}


