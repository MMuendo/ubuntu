import Link from "next/link";
import { Database, ShieldCheck, UsersRound, WalletCards } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuickStat } from "@/components/site-kit";
import { getAdminWorkspaceData, getConnectedTableStatus, getPaystackEvents, getSubscriptionPlans } from "@/lib/db/loaders";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

function priorityTone(priority) {
  if (priority === "High") return "red";
  if (priority === "Medium") return "amber";
  return "teal";
}

export default async function AdminPage() {
  await requireUser({ role: "admin", redirectTo: "/admin" });

  const [adminWorkspace, paystackEvents, subscriptionPlans, postgresModel] = await Promise.all([
    getAdminWorkspaceData(),
    getPaystackEvents(),
    getSubscriptionPlans(),
    getConnectedTableStatus()
  ]);

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Badge tone="red">Back office</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              Platform control room
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
              Role access, content operations, billing events, mentor verification, and AI usage controls.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <QuickStat icon={WalletCards} label="plans" value={subscriptionPlans.length} />
            <QuickStat icon={Database} label="tables" value={postgresModel.length} />
            <QuickStat icon={UsersRound} label="roles" value={adminWorkspace.roleCounts.length} />
            <QuickStat icon={ShieldCheck} label="events" value={paystackEvents.length} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Admin queues</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {adminWorkspace.queues.map(([name, count, priority]) => (
                  <div key={name} className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 p-3">
                    <div>
                      <p className="text-sm font-semibold text-neutral-950">{name}</p>
                      <p className="text-xs text-neutral-500">{count}</p>
                    </div>
                    <Badge tone={priorityTone(priority)}>{priority}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Role counts</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {adminWorkspace.roleCounts.map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
                    <span className="text-sm font-medium text-neutral-700">{role}</span>
                    <span className="text-sm font-semibold text-neutral-950">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">PostgreSQL model</h2>
              </CardHeader>
              <CardContent className="overflow-x-auto p-0">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-neutral-100 text-xs uppercase tracking-[0.12em] text-neutral-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Table</th>
                      <th className="px-4 py-3 font-medium">Purpose</th>
                      <th className="px-4 py-3 font-medium">Fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postgresModel.map((table) => (
                      <tr key={table.table} className="border-b border-neutral-100 last:border-0">
                        <td className="px-4 py-3 font-semibold text-neutral-950">{table.table}</td>
                        <td className="px-4 py-3 text-neutral-600">{table.purpose}</td>
                        <td className="px-4 py-3 text-neutral-500">
                          {table.status ? `${table.status}${table.count === null ? "" : ` - ${table.count} rows`}` : table.fields.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Payment events</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {paystackEvents.map((event) => (
                  <div key={event.id} className="grid gap-3 rounded-lg bg-neutral-50 p-3 md:grid-cols-[1fr_0.8fr_0.7fr] md:items-center">
                    <div>
                      <p className="text-sm font-semibold text-neutral-950">{event.customer}</p>
                      <p className="text-xs text-neutral-500">{event.reference}</p>
                    </div>
                    <p className="text-sm text-neutral-600">{event.plan}</p>
                    <div className="md:text-right">
                      <p className="text-sm font-semibold text-neutral-950">KES {event.amountKes.toLocaleString()}</p>
                      <p className="text-xs text-neutral-500">{event.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

