import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F2747]">
              User Management
            </h1>

            <p className="mt-2 text-slate-600">
              Manage all registered users.
            </p>
          </div>

          <div className="rounded-xl bg-[#0F2747] px-5 py-3 text-white">
            Total Users : <b>{users.length}</b>
          </div>
        </div>

        {/* Users Table */}

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b bg-[#0F2747] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Registered Users
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Created
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {user.name}
                    </td>

                    <td className="px-6 py-4">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "ADMIN"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">

                      <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-lg bg-[#0F2747] px-4 py-2 text-sm text-white hover:bg-[#123564]"
                      >
                        View
                      </Link>

                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}