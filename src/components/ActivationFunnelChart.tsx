import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, Tooltip } from 'recharts';
import { DateRange } from "react-day-picker"; // Import DateRange type

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

interface ActivationFunnelChartProps {
  dateRange: DateRange | undefined;
  compareDateRange: DateRange | undefined;
}

const ActivationFunnelChart: React.FC<ActivationFunnelChartProps> = ({ dateRange, compareDateRange }) => {
  // In a real application, you would use dateRange and compareDateRange
  // to fetch and filter the actual funnel data from your backend.
  // For now, we are using static dummy data.
  console.log("Funnel Chart - Primary Date Range:", dateRange);
  console.log("Funnel Chart - Compare Date Range:", compareDateRange);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const currentIndex = data.findIndex(item => item.name === label);
      let conversionRate = null;
      if (currentIndex < data.length - 1) {
        const current = data[currentIndex].value;
        const next = data[currentIndex + 1].value;
        conversionRate = ((next / current) * 100).toFixed(1);
      }

      return (
        <div className="bg-popover p-2 border border-border rounded-md shadow-md text-popover-foreground">
          <p className="font-bold">{label}</p>
          <p>Value: {value}</p>
          {conversionRate && <p>Conversion to next step: {conversionRate}%</p>}
        </div>
      );
    }
    return null;
  };

  const totalHeight = 300; // Height of the chart area
  const segmentHeight = totalHeight / data.length;
  const maxWidth = 300; // Max width for the widest part of the funnel

  // Calculate the width for each segment, tapering down
  const funnelSegments = data.map((item, index) => {
    const topWidth = (item.value / data[0].value) * maxWidth;
    const bottomWidth = (index < data.length - 1 ? (data[index + 1].value / data[0].value) * maxWidth : topWidth); // Last segment's bottom width is its top width
    
    return {
      ...item,
      topWidth,
      bottomWidth,
      y: index * segmentHeight,
      height: segmentHeight,
    };
  });

  return (
    <Card className="bg-card border-border shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Activation Funnel</CardTitle>
        <CardDescription className="text-muted-foreground">
          Track user progression through key integration stages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <svg width="100%" height="100%" viewBox={`0 0 ${maxWidth + 100} ${totalHeight}`}>
              <g transform={`translate(${(maxWidth + 100 - maxWidth) / 2}, 0)`}> {/* Center the funnel */}
                {funnelSegments.map((segment, index) => {
                  const x1 = (maxWidth - segment.topWidth) / 2;
                  const x2 = (maxWidth + segment.topWidth) / 2;
                  const x3 = (maxWidth + segment.bottomWidth) / 2;
                  const x4 = (maxWidth - segment.bottomWidth) / 2;
                  const y1 = segment.y;
                  const y2 = segment.y + segment.height;

                  return (
                    <React.Fragment key={segment.name}>
                      <path
                        d={`M ${x1} ${y1} L ${x2} ${y1} L ${x3} ${y2} L ${x4} ${y2} Z`}
                        fill="hsl(var(--primary))"
                        opacity={1 - (index * 0.1)} // Slight opacity change for depth
                      />
                      <text
                        x={maxWidth / 2}
                        y={segment.y + segment.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="hsl(var(--primary-foreground))"
                        className="text-sm font-semibold"
                      >
                        {segment.name} ({segment.value})
                      </text>
                    </React.Fragment>
                  );
                })}
              </g>
              <Tooltip content={<CustomTooltip />} /> {/* Tooltip needs to be outside SVG for Recharts to render it */}
            </svg>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationFunnelChart;