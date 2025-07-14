import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Repeat, Share2, TrendingUp } from "lucide-react";

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

const PirateMetricsSummary: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
      <MetricCard
        title="Acquisition"
        value="1,250 New Stores"
        description="+20.1% from last month"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Activation"
        value="85% Activated"
        description="+5% from last month"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Retention"
        value="92% Retained"
        description="-1.2% from last month"
        icon={<Repeat className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Referral"
        value="150 Referrals"
        description="+10% from last month"
        icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Revenue"
        value="₹450,000 MRR"
        description="+15% from last month"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default PirateMetricsSummary;