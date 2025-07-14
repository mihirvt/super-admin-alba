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
  const getConversionRate = (index: number) => {
    if (index >= data.length - 1) return null; // No next step
    const current = data[index].value;
    const next = data[index + 1].value;
    return ((next / current) * 100).toFixed(1);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentIndex = data.findIndex(item => item.name === label);
      const conversionRate = getConversionRate(currentIndex);
      return (
        <div className="bg-popover p-2 border border-border rounded-md shadow-md text-popover-foreground">
          <p className="font-bold">{label}</p>
          <p>Value: {payload[0].value}</p>
          {conversionRate && <p>Conversion to next step: {conversionRate}%</p>}
        </div>
      );
    }
    return null;
  };

  // Calculate max value for scaling the funnel bars
  const maxValue = Math.max(...data.map(item => item.value));

  // Custom Bar shape to create a funnel effect
  const CustomFunnelBar = (props: any) => {
    const { x, y, width, height, fill, value } = props;
    const barWidth = (value / maxValue) * width; // Scale width based on value
    const offset = (width - barWidth) / 2; // Center the bar

    return (
      <rect
        x={x + offset}
        y={y}
        width={barWidth}
        height={height}
        fill={fill}
        rx={4} // Rounded corners for a softer look
        ry={4}
      />
    );
  };

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
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="hsl(var(--primary))" shape={<CustomFunnelBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationFunnelChart;