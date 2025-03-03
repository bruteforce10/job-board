"use server";
import { JobModel } from "@/models/Job";
import mongoose from "mongoose";

export async function saveJobAction(data) {
  await mongoose.connect(process.env.MONGO_URI);
  const job = new JobModel(Object.fromEntries(data));
  await job.save();
  if ("orgId" in data) {
    revalidatePath("/jobs/" + data?.orgId);
  }
  return JSON.parse(JSON.stringify(job));
}
