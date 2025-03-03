import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user } = await withAuth();

  return (
    <>
      <Hero />
      <Jobs />
    </>
  );
}
