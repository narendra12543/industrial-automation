import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
const session = await auth();
const user = session?.user;

if (!user) {
return null;
}

return ( <div className="min-h-screen bg-slate-50"> <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
<div className="mb-8"> <h1 className="text-3xl font-bold text-slate-900">
Welcome back, {user.name} </h1>

      <p className="mt-2 text-slate-600">
        Manage your enquiries, downloads, and account information from your dashboard.
      </p>
    </div>

    
  </div>
</div>


);
}
