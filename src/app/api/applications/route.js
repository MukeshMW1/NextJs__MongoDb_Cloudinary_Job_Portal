

import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import applicationModel from '@/models/application';
import connectDb from '@/libs/mongodb';

export async function POST(req) {
  try {
    await connectDb();

    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const file = formData.get('file');
    const jobId = formData.get('jobId'); 

    if (!jobId) {
      return new Response(
        JSON.stringify({ message: 'Job ID is required' }),
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filepath, buffer);

    const application = new applicationModel({
      name,
      email,
      phone,
      file: `/uploads/${filename}`,
      jobId, 
    });

    const savedApplication = await application.save();
    console.log('Saved application:', savedApplication);

    return new Response(
      JSON.stringify({ message: 'Application submitted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(' Error in POST /api/applications:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to submit application' }),
      { status: 500 }
    );
  }
}
