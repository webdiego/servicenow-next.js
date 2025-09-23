"use client";

import { Card, CardHeader, CardDescription } from "../ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/app/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const STATE_CONFIG = {
  New: { label: "New", color: "#4ade80" },
  "In Progress": { label: "In Progress", color: "#3b82f6" },
  "On Hold": { label: "On Hold", color: "#f97316" },
  Resolved: { label: "Resolved", color: "#a855f7" },
  Closed: { label: "Closed", color: "#6b7280" },
  Canceled: { label: "Canceled", color: "#ef4444" },
} as const;

const STATE: Record<string, { label: string; color: string }> = {
  "1": { label: "New", color: "#4ade80" },
  "2": { label: "In Progress", color: "#3b82f6" },
  "3": { label: "On Hold", color: "#f97316" },
  "6": { label: "Resolved", color: "#a855f7" },
  "7": { label: "Closed", color: "#6b7280" },
  "8": { label: "Canceled", color: "#ef4444" },
};

export function StateChart({ data }: { data?: string[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="mt-8 p-4 max-w-lg mr-auto">
        <CardHeader>
          <h3 className="text-lg font-semibold">Incidents by State</h3>
          <CardDescription>
            No data available to display the chart.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const counts: Record<string, number> = {};
  data.forEach((state) => {
    const info = STATE[state] || { label: state, color: "#6b7280" };
    counts[info.label] = (counts[info.label] || 0) + 1;
  });
  // Prepara i dati per la chart
  const chartData = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card className="mt-8 p-4 max-w-lg mr-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold">Incidents by State</h3>
        <CardDescription>Distribution of incidents by state.</CardDescription>
      </CardHeader>

      <ChartContainer
        config={STATE_CONFIG}
        className="max-w-lg h-[240px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={36}
              paddingAngle={4}
              label={(entry) => entry.name}
            >
              {chartData.map((entry) => {
                const color =
                  Object.values(STATE).find((s) => s.label === entry.name)
                    ?.color || "#6b7280";
                return <Cell key={entry.name} fill={color} />;
              })}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
