"use client";

import { TDashboardMeta } from "@/app/types/dashboard.type";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, DollarSign, Mail, Star, Ticket, Users } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const LineChart = dynamic(() => import("./LineChart"), { ssr: false });

export default function DashboardAnalysis({ metaData }: { metaData: TDashboardMeta }) {
  const cards = [
    {
      title: "Total Users",
      value: metaData.totalUser,
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Total Events",
      value: metaData.totalEvent,
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      title: "Total Participants",
      value: metaData.totalParticipant,
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "Total Invites",
      value: metaData.totalInvite,
      icon: <Mail className="w-5 h-5" />,
    },
    {
      title: "Total Reviews",
      value: metaData.totalReview,
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "Total Payments",
      value: metaData.totalPayment,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Total Payment Amount",
      value: `${metaData.totalPaymentAmount} BDT`,
      icon: <DollarSign className="w-5 h-5" />,
    },
  ];

  function formatMonth(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }); // e.g., "May 2025"
  }

  function mergeChartData(barChartData: TDashboardMeta["barChartData"]) {
    const allMonths = [
      ...barChartData.eventData,
      ...barChartData.paymentData,
      ...barChartData.userData,
      ...barChartData.reviewData,
      ...barChartData.sentInviteData,
    ].map((d) => d.month);

    const uniqueRawMonths = Array.from(new Set(allMonths));

    return uniqueRawMonths.map((monthRaw) => ({
      month: formatMonth(monthRaw),
      event: barChartData.eventData.find((d) => d.month === monthRaw)?.count || 0,
      payment: barChartData.paymentData.find((d) => d.month === monthRaw)?.count || 0,
      user: barChartData.userData.find((d) => d.month === monthRaw)?.count || 0,
      review: barChartData.reviewData.find((d) => d.month === monthRaw)?.count || 0,
      invite: barChartData.sentInviteData.find((d) => d.month === monthRaw)?.count || 0,
    }));
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <StatCard key={index} title={card.title} value={card.value} icon={card.icon} />
          ))}
        </div>

        {/* Chart Section */}
        <div className="mt-6">
          <Card className="bg-white">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
              <div className="h-96">
                <LineChart data={mergeChartData(metaData.barChartData)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 text-indigo-500 bg-indigo-100 rounded-md">
          {icon}
        </div>
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
