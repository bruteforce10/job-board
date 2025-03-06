import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

// Match against the pages
export const config = {
  matcher: [
    "/",
    "/new-listing",
    "/new-company",
    "/new-listing/:orgId*",
    "/jobs/:orgId*",
    "/jobs/edit/:jobId*",
    "/show/:jobId*",
  ],
};
