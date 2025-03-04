"use server";
import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData) {
  await mongoose.connect(process.env.MONGO_URI);
  const {id, ...jobData} = Object.fromEntries(formData)
  const job = id ? await JobModel.findByIdAndUpdate(id, jobData) : await JobModel.create(jobData);
 
  if ("orgId" in jobData) {
    revalidatePath("/jobs/" + jobData?.orgId);
  }
  return JSON.parse(JSON.stringify(job));
}
