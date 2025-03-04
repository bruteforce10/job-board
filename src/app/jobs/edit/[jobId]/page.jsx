import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

export default async function EditJobPage({ params }) {
  const { jobId } = await params;
  const { user } = await withAuth();
  await mongoose.connect(process.env.MONGO_URI);
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  if (!jobDoc) {
    return "Job not found";
  }
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return "Please Log in";
  }

  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });

  if (oms.data.length === 0) {
    return "no access";
  }

  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
    </div>
  );
}
