import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import "@radix-ui/themes/styles.css";
import JobForm from "@/app/components/JobForm";

export default async function NewListingPageForOrgPage({ params }) {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return "Please Log in";
  }
  const { orgId } = await params;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return "no access";
  }

  return <JobForm orgId={orgId} />;
}
