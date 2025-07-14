import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, Tooltip } from 'recharts';
import { DateRange } from "react-day-picker";

interface FunnelData {
  name: string;
  value: number;
}

// Base dummy data for the primary period
const baseData: FunnelData[] = [
  { name: 'Signed Up', value: 1500 },
  { name: 'Shopify Integrated', value: 1100 },
  { name: 'Meta Ads Integrated', value: 900 },
  { name: 'Shiprocket Integrated', value: 700 },
];

// Dummy data for comparison (slightly different values to show interactivity)
const compareData: FunnelData[] = [
  { name: 'Signed Up', value: 1300 },
  { name: 'Shopify Integrated', value: 950 },
  { name: 'Meta Ads Integrated', value: 750 },
  { name: 'Shiprocket Integrated', value: 600 },
];

interface ActivationFunnelChartProps {
  dateRange: DateRange | undefined;
  compareDateRange: DateRange | undefined;
}

const ActivationFunnelChart: React.FC<ActivationFunnelChartProps> = ({ dateRange, compareDateRange }) => {
  // Use compareData if a comparison range is selected, otherwise use baseData
  const currentData = compareDateRange?.from && compareDateRange.to ? compareData : baseData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const currentIndex = currentData.findIndex(item => item.name === label);
      let conversionRate = null;
      if (currentIndex < currentData.length - 1) {
        const current = currentData[currentIndex].value;
        const next = currentData[currentIndex + 1].value;
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

  const totalWidth = 600; // Total width of the chart area
  const segmentWidth = totalWidth / currentData.length;
  const maxHeight = 150; // Max height for the widest part of the funnel (at the start)

  // Calculate the height for each segment, tapering down
  const funnelSegments = currentData.map((item, index) => {
    const topHeight = (item.value / currentData[0].value) * maxHeight;
    const bottomHeight = (index < currentData.length - 1 ? (currentData[index + 1].value / currentData[0].value) * maxHeight : topHeight);
    
    return {
      ...item,
      topHeight,
      bottomHeight,
      x: index * segmentWidth,
      width: segmentWidth,
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
        <div className="h-[200px] flex justify-center items-center"> {/* Adjusted height for horizontal layout */}
          <ResponsiveContainer width="100%" height="100%">
            <svg width="100%" height="100%" viewBox={`0 0 ${totalWidth} ${maxHeight + 50}`}> {/* Adjusted viewBox */}
              <g transform={`translate(0, ${(maxHeight + 50 - maxHeight) / 2})`}> {/* Center the funnel vertically */}
                {funnelSegments.map((segment, index) => {
                  const y1 = (maxHeight - segment.topHeight) / 2;
                  const y2 = (maxHeight + segment.topHeight) / 2;
                  const y3 = (maxHeight + segment.bottomHeight) / 2;
                  const y4 = (maxHeight - segment.bottomHeight) / 2;
                  const x1 = segment.x;
                  const x2 = segment.x + segment.width;

                  return (
                    <React.Fragment key={segment.name}>
                      <path
                        d={`M ${x1} ${y1} L ${x2} ${y4} L ${x2} ${y3} L ${x1} ${y2} Z`}
                        fill="hsl(var(--primary))"
                        opacity={1 - (index * 0.1)} // Slight opacity change for depth
                      />
                      <text
                        x={segment.x + segment.width / 2}
                        y={maxHeight / 2}
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
              <Tooltip content={<CustomTooltip />} />
            </svg>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationFunnelChart;