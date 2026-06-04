import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingActions from "@/components/shared/LandingActions";
import Navbar from "@/components/shared/Navbar";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/workspace");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-semibold tracking-normal sm:text-6xl">
          Write Better Cold Emails.
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Personalized outreach powered by AI.
        </p>

        <LandingActions />
      </section>
    </main>
  );
}
