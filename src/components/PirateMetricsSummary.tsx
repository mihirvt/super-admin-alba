import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Repeat, Clock, Activity, Upload } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface PirateMetrics {
  acquisition: { value: string; description: string; };
  retention: { value: string; description: string; };
  revenue: { value: string; description: string; };
  dailyLogins: { value: string; description: string; };
  weeklyLogins: { value: string; description: string; };
  exportsScheduled: { value: string; description: string; };
  avgLoginFrequency: { value: string; description: string; };
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon }) => (
  <Card className="flex-1 min-w-[200px] bg-card border-border shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

interface PirateMetricsSummaryProps {
  dateRange: DateRange | undefined;
  compareDateRange: DateRange | undefined;
  metrics: PirateMetrics; // New prop for metrics
}

const PirateMetricsSummary: React.FC<PirateMetricsSummaryProps> = ({ dateRange, compareDateRange, metrics }) => {
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "N/A";
    if (!range.to) return format(range.from, "LLL dd, y");
    return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`;
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold">Primary Period:</span> {formatDateRange(dateRange)}
        </p>
        <p>
          <span className="font-semibold">Comparison Period:</span> {formatDateRange(compareDateRange)}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <MetricCard
          title="Acquisition"
          value={metrics.acquisition.value}
          description={metrics.acquisition.description}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Retention"
          value={metrics.retention.value}
          description={metrics.retention.description}
          icon={<Repeat className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Revenue"
          value={metrics.revenue.value}
          description={metrics.revenue.description}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Daily Logins"
          value={metrics.dailyLogins.value}
          description={metrics.dailyLogins.description}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Weekly Logins"
          value={metrics.weeklyLogins.value}
          description={metrics.weeklyLogins.description}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Exports Scheduled"
          value={metrics.exportsScheduled.value}
          description={metrics.exportsScheduled.description}
          icon={<Upload className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Avg. Login Freq."
          value={metrics.avgLoginFrequency.value}
          description={metrics.avgLoginFrequency.description}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
};

export default PirateMetricsSummary;