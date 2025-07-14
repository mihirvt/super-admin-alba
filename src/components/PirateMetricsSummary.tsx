import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Repeat, Clock, Activity, Upload } from "lucide-react"; // Added Activity and Upload icons
import { DateRange } from "react-day-picker"; // Import DateRange type
import { format } from "date-fns"; // Import format for date display

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
}

const PirateMetricsSummary: React.FC<PirateMetricsSummaryProps> = ({ dateRange, compareDateRange }) => {
  // Frontend is now ready to receive date ranges for comparison.
  // A developer can use dateRange and compareDateRange here to fetch/filter actual data.
  // For now, the dummy data remains static.

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
          value="1,250 New Stores"
          description="+20.1% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Retention"
          value="92% Retained"
          description="-1.2% from last month"
          icon={<Repeat className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Revenue"
          value="₹450,000 MRR"
          description="+15% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Daily Logins"
          value="1,200"
          description="Avg. 1.5 logins/store"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Weekly Logins"
          value="7,500"
          description="Avg. 9.3 logins/store"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Exports Scheduled"
          value="350"
          description="+5% from last month"
          icon={<Upload className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Avg. Login Freq."
          value="3 times/week"
          description="Consistent engagement"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
};

export default PirateMetricsSummary;