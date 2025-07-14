import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  const [hoveredSegment, setHoveredSegment] = React.useState<FunnelData | null>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ x: number; y: number } | null>(null);

  // Determine which data to use based on whether a comparison range is selected
  const currentData = compareDateRange?.from && compareDateRange.to ? compareData : baseData;
  const isComparing = !!(compareDateRange?.from && compareDateRange.to);

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
      index: index, // Add index for conversion rate calculation
    };
  });

  const handleMouseEnter = (event: React.MouseEvent<SVGPathElement>, segment: typeof funnelSegments[0]) => {
    setHoveredSegment(segment);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setTooltipPosition(null);
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
        <div className="h-[200px] flex justify-center items-center relative"> {/* Added relative for tooltip positioning */}
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
                      fill={isComparing ? "hsl(var(--accent))" : "hsl(var(--primary))"} // Dynamic fill color
                      opacity={1 - (index * 0.1)} // Slight opacity change for depth
                      onMouseEnter={(e) => handleMouseEnter(e, segment)}
                      onMouseLeave={handleMouseLeave}
                      className="transition-all duration-200 ease-in-out hover:opacity-100 hover:scale-[1.02]" // Added hover effect
                    />
                    <text
                      x={segment.x + segment.width / 2}
                      y={maxHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(var(--primary-foreground))"
                      className="text-sm font-semibold pointer-events-none" // Prevent text from interfering with hover
                    >
                      {segment.name} ({segment.value})
                    </text>
                  </React.Fragment>
                );
              })}
            </g>
          </svg>

          {hoveredSegment && tooltipPosition && (
            <div
              className="absolute bg-popover p-2 border border-border rounded-md shadow-md text-popover-foreground z-50"
              style={{ left: tooltipPosition.x + 10, top: tooltipPosition.y + 10 }} // Offset tooltip from cursor
            >
              <p className="font-bold">{hoveredSegment.name}</p>
              <p>Value: {hoveredSegment.value}</p>
              {hoveredSegment.index < currentData.length - 1 && (
                <p>Conversion to next step: {((currentData[hoveredSegment.index + 1].value / hoveredSegment.value) * 100).toFixed(1)}%</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationFunnelChart;