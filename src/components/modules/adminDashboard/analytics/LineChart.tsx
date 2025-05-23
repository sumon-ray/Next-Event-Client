/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function LineChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="event" stroke="#6366f1" strokeWidth={2} name="Events" />
        <Line type="monotone" dataKey="payment" stroke="#10b981" strokeWidth={2} name="Payments" />
        <Line type="monotone" dataKey="user" stroke="#3b82f6" strokeWidth={2} name="Users" />
        <Line type="monotone" dataKey="review" stroke="#f59e0b" strokeWidth={2} name="Reviews" />
        <Line type="monotone" dataKey="invite" stroke="#ef4444" strokeWidth={2} name="Invites" />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
