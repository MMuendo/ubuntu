"use client";

import Link from "next/link";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CourseBadgeRow } from "@/components/site-kit";

const availableMentors = new Set(["ezra muinde", "jacktone etemesi"]);

function isAvailable(mentor) {
  return availableMentors.has(String(mentor.name || "").toLowerCase());
}

function unavailablePopup() {
  window.alert("Mentor not available. Available mentors: Ezra and Jacktone.");
}

export function MentorSelection({ mentors, checkoutByMentor }) {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-3">
      {mentors.map((mentor) => {
        const available = isAvailable(mentor);
        const card = (
          <Card className={`h-full transition ${available ? "hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm" : "border-neutral-200 bg-neutral-50"}`}>
            <CardHeader className="space-y-3 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <img src={mentor.avatar} alt={mentor.name} className="size-10 rounded-lg object-cover ring-1 ring-neutral-200" />
                  <div>
                    <h2 className="text-base font-semibold text-neutral-950">{mentor.name}</h2>
                    <p className="line-clamp-1 text-sm text-neutral-600">{mentor.currentRole || mentor.title}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {mentor.company} - {mentor.location}
                    </p>
                  </div>
                </div>
                <Badge tone={available ? "green" : "default"} className="shrink-0">
                  <Star size={13} className="mr-1" />
                  {available ? mentor.rating : "TBC"}
                </Badge>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-neutral-600">{mentor.bio}</p>
            </CardHeader>
            <CardContent className="space-y-3 p-3">
              <CourseBadgeRow items={mentor.specialties.slice(0, 3)} />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-white p-2.5">
                  <p className="font-semibold text-neutral-950">{mentor.experience}</p>
                  <p className="text-xs text-neutral-500">experience</p>
                </div>
                <div className="rounded-lg bg-white p-2.5">
                  <p className="font-semibold text-neutral-950">To Be Discussed</p>
                  <p className="text-xs text-neutral-500">{mentor.mentorshipDuration}</p>
                </div>
                <div className="rounded-lg bg-white p-2.5">
                  <p className="font-semibold text-neutral-950">{available ? mentor.sessionsThisWeek : "TBC"}</p>
                  <p className="text-xs text-neutral-500">sessions this week</p>
                </div>
                <div className="rounded-lg bg-white p-2.5">
                  <p className="font-semibold text-neutral-950">Projects</p>
                  <p className="text-xs text-neutral-500">free access</p>
                </div>
              </div>
              <div className="line-clamp-2 rounded-lg bg-[#e8f8fb] p-2.5 text-sm leading-6 text-slate-700">
                <span className="font-semibold text-[#1e1616]">Availability:</span> {available ? mentor.availability : "Mentor not available"}
              </div>
              {available ? (
                <Button asChild variant="accent" size="sm" className="w-full">
                  <Link href={checkoutByMentor[mentor.id]}>Book this mentor</Link>
                </Button>
              ) : (
                <Button type="button" variant="outline" size="sm" className="w-full" onClick={unavailablePopup}>
                  Mentor not available
                </Button>
              )}
            </CardContent>
          </Card>
        );

        return (
          <div
            key={mentor.id}
            role={available ? undefined : "button"}
            tabIndex={available ? undefined : 0}
            onClick={available ? undefined : unavailablePopup}
            onKeyDown={available ? undefined : (event) => {
              if (event.key === "Enter" || event.key === " ") unavailablePopup();
            }}
            className={available ? "" : "h-full cursor-pointer"}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
