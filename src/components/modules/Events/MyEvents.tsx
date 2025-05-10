/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { InviteModal } from "@/components/modules/Invite/InviteModal";
import { UpdateModal } from "@/components/modules/Events/UpdateModal";
import { DeleteModal } from "@/components/modules/Events/DeleteModal";

import Title from "@/components/shared/Title";
import NextButton from "@/components/shared/NextButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { IEvent } from "@/app/types";

const MyEvents = ({ events }: { events: IEvent[] | any }) => {
  return (
    <div className="px-4 py-6 mb-20 md:px-10">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <Title title="My Events" />
           <Link href="/events/create-event" >
          <NextButton name="Create Event" />
        </Link>
      </div>

      {/* Table */}
      <Table>
        <TableCaption>A list of events you have created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Title</TableHead>
            <TableHead className="w-[160px]">Start Date</TableHead>
            <TableHead className="w-[160px]">End Date</TableHead>
            <TableHead className="w-[140px]">Event Type</TableHead>
            <TableHead className="w-[180px]">Paid / Free</TableHead>
            <TableHead className="text-center w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events?.map((event: IEvent | any) => (
            <React.Fragment key={event.id}>
              {/* Main Event Row */}
              <TableRow>
                <TableCell className="font-medium truncate text-gray-800">
                  <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </TableCell>
                <TableCell className="text-gray-700">
                  {format(new Date(event.startDate), "PPP p")}
                </TableCell>
                <TableCell className="text-gray-700">
                  {format(new Date(event.endDate), "PPP p")}
                </TableCell>
                <TableCell className="capitalize text-gray-700">
                  {event.type}
                </TableCell>
                <TableCell className="text-gray-700">
                  {event.isPaid ? `Paid (${event.fee})` : "Free"}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 transition rounded hover:bg-gray-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <InviteModal id={event.id!} />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UpdateModal id={event.id!} />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DeleteModal id={event.id!} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

              {/* Accordion for Participants */}
              <TableRow>
                <TableCell colSpan={6} className="bg-gray-50 p-0">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`participants-${event.id}`}>
                      <AccordionTrigger className="px-6 py-2 text-left text-sm font-medium text-blue-600 hover:underline">
                        Show Participants ({event.participants?.length ?? 0})
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-white">
                        {event.participants?.length ? (
                          <ul className="space-y-2">
                            {event.participants.map((p: any, index: number) => (
                              <li key={index} className="flex items-center gap-3">
                                <Image
                                  src={p.user.profileImage}
                                  alt={p.user.name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <div className="font-medium">{p.user.name}</div>
                                  <div className="text-sm text-gray-500">{p.user.email}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">No participants yet.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyEvents;
