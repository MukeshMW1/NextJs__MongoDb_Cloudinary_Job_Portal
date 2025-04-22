import connectDb from '@/libs/mongodb';
import applicationModel from '@/models/application';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDb();
    const form = await req.formData();
    const name = form.get('name');
    const email = form.get('email');
    const phone = form.get('phone');
    const file = form.get('file'); 
    const jobId = form.get('jobId');

    if (!jobId || !file) {
      return NextResponse.json({ message: 'Missing job ID or file URL' }, { status: 400 });
    }

    const newApp = await applicationModel.create({
      name,
      email,
      phone,
      file,
      jobId,
    });

    return NextResponse.json({ message: 'Application submitted', app: newApp }, { status: 201 });
  } catch (err) {
    console.error('Error submitting application:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
