import Jobs from "@/app/components/Jobs";
import { addOrgAndUserData, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

export default async function CompanyJobsPage({ params }) {
  const { orgId } = await params;
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(orgId);
  const { user } = await withAuth();
  let jobDocs = JSON.parse(JSON.stringify(await JobModel.find({ orgId })));
  jobDocs = await addOrgAndUserData(jobDocs, user);

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
