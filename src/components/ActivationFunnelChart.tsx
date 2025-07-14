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

  // Custom Bar shape to create a funnel effect for vertical bars
  const CustomFunnelBar = (props: any) => {
    const { x, y, width, height, fill, value } = props;
    // Calculate the desired width for this bar based on its value relative to the max value
    // Let's make the widest bar (maxValue) take up 80% of the available category width
    const maxAllowedWidth = width * 0.8;
    const currentBarWidth = (value / maxValue) * maxAllowedWidth;

    // Calculate the offset to center the bar within its allocated category width
    const offsetX = x + (width - currentBarWidth) / 2;

    return (
      <rect
        x={offsetX}
        y={y}
        width={currentBarWidth}
        height={height}
        fill={fill}
        rx={4} // Rounded corners
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
              layout="horizontal" // Changed to horizontal layout for vertical bars
              barCategoryGap="10%" // Add some gap between bars for visual separation
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis type="category" dataKey="name" tickLine={false} axisLine={false} />
              <YAxis type="number" hide />
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