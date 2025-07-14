import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Repeat, TrendingUp, ShoppingCart, Facebook, Truck, Activity, Clock } from "lucide-react";

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-8">
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
        title="Revenue"
        value="₹450,000 MRR"
        description="+15% from last month"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Signed Up"
        value="1,500 Users"
        description="+25% this quarter"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Shopify Integrated"
        value="1,100 Stores"
        description="75% of active stores"
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Meta Ads Integrated"
        value="900 Accounts"
        description="60% of active stores"
        icon={<Facebook className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Shiprocket Integrated"
        value="700 Accounts"
        description="45% of active stores"
        icon={<Truck className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Active Today"
        value="800 Stores"
        description="65% of total stores"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
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
    </div>
  );
};

export default PirateMetricsSummary;