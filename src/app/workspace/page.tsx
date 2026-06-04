import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import WorkspaceLayout from "@/components/shared/WorkspaceLayout";
import Card from "@/components/ui/Card";
import GenerateForm from "@/features/email-generator/GenerateForm";

export default async function WorkspacePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "there";

  return (
    <WorkspaceLayout>
      <div className="flex flex-col p-6 h-full overflow-y-auto">
        <h1 className="text-center text-4xl font-bold">
          Welcome, {firstName}
        </h1>

        <div className="mt-8 w-full">
          <Card className="w-full min-h-[650px] p-8">
            <h2 className="text-2xl font-semibold">
              Generate Cold Email
            </h2>

            <p className="mt-2 text-zinc-400">
              Fill in the information below.
            </p>

            <GenerateForm />
          </Card>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
