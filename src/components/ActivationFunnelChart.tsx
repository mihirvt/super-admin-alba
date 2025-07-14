import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FunnelData {
  name: string;
  value: number;
}

const data: FunnelData[] = [
  { name: 'Signed Up', value: 1500 },
  { name: 'Shopify Integrated', value: 1100 },
  { name: 'Meta Ads Integrated', value: 900 },
  { name: 'Shiprocket Integrated', value: 700 },
];

const ActivationFunnelChart: React.FC = () => {
  return (
    <Card className="bg-card border-border shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Activation Funnel</CardTitle>
        <CardDescription className="text-muted-foreground">
          Track user progression through key integration stages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={120} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Conversion from Signed Up to Shopify Integrated: {((1100 / 1500) * 100).toFixed(1)}%</p>
          <p>Conversion from Shopify Integrated to Meta Ads Integrated: {((900 / 1100) * 100).toFixed(1)}%</p>
          <p>Conversion from Meta Ads Integrated to Shiprocket Integrated: {((700 / 900) * 100).toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationFunnelChart;