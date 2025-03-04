import Jobs from "@/app/components/Jobs";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

export default async function CompanyJobsPage({ params }) {
  const { orgId } = await params;
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(orgId);
  const { user } = await withAuth();

  await mongoose.connect(process.env.MONGO_URI);
  const jobDocs = JSON.parse(JSON.stringify(await JobModel.find({ orgId })));
  let oms = null;
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  }
  for (const job of jobDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;

    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find((om) => om.organizationId === job.orgId);
    }
  }

  return (
    <div>
      <div className="container">
        <h1>
          <h1 className="text-xl my-6">{org.name} Jobs</h1>
        </h1>
      </div>
      <Jobs jobs={jobDocs} header={"Jobs posted by" + org.name} />
    </div>
  );
}
