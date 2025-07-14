import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DateRange } from "react-day-picker";

interface FunnelData {
  name: string;
  value: number;
}

interface ActivationFunnelChartProps {
  dateRange: DateRange | undefined;
  compareDateRange: DateRange | undefined;
  primaryData: FunnelData[]; // New prop for primary funnel data
  compareData: FunnelData[]; // New prop for comparison funnel data
}

const ActivationFunnelChart: React.FC<ActivationFunnelChartProps> = ({ dateRange, compareDateRange, primaryData, compareData }) => {
  const [hoveredSegment, setHoveredSegment] = React.useState<FunnelData | null>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ x: number; y: number } | null>(null);

  // Determine which data to use based on whether a comparison range is selected
  const currentData = compareDateRange?.from && compareDateRange.to ? compareData : primaryData;
  const isComparing = !!(compareDateRange?.from && compareDateRange.to);

  const totalWidth = 600; // Total width of the chart area
  const segmentWidth = totalWidth / currentData.length;
  const maxHeight = 150; // Max height for the widest part of the funnel (at the start)
  const curveOffset = 10; // Small offset for the Bezier control points to create a subtle curve

  // Calculate the height for each segment, tapering down
  const funnelSegments = currentData.map((item, index) => {
    const currentTopValue = item.value;
    const nextValue = index < currentData.length - 1 ? currentData[index + 1].value : item.value;

    const topHeight = (currentTopValue / currentData[0].value) * maxHeight;
    const bottomHeight = (nextValue / currentData[0].value) * maxHeight;
    
    return {
      ...item,
      topHeight,
      bottomHeight,
      x: index * segmentWidth,
      width: segmentWidth,
      index: index,
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

  // Determine fill color based on comparison state
  const fillColor = isComparing ? "hsl(var(--accent))" : "hsl(var(--primary))";
  const strokeColor = isComparing ? "hsl(var(--accent-foreground))" : "hsl(var(--primary-foreground))";

  return (
    <Card className="bg-card border-border shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Activation Funnel</CardTitle>
        <CardDescription className="text-muted-foreground">
          Track user progression through key integration stages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex justify-center items-center relative">
          <svg width="100%" height="100%" viewBox={`0 0 ${totalWidth} ${maxHeight + 50}`}>
            <g transform={`translate(0, ${(maxHeight + 50 - maxHeight) / 2})`}>
              {funnelSegments.map((segment, index) => {
                const y1 = (maxHeight - segment.topHeight) / 2; // Top-left Y
                const y2 = (maxHeight + segment.topHeight) / 2; // Bottom-left Y
                const y4 = (maxHeight - segment.bottomHeight) / 2; // Top-right Y
                const y3 = (maxHeight + segment.bottomHeight) / 2; // Bottom-right Y
                const x1 = segment.x;
                const x2 = segment.x + segment.width;

                // Calculate vertical center for text within the segment
                const segmentCenterY = (y1 + y2 + y3 + y4) / 4;

                // Path with curved vertical edges using cubic Bezier
                const pathData = `
                  M ${x1} ${y1}
                  L ${x2} ${y4}
                  C ${x2 + curveOffset}, ${y4 + (y3 - y4) / 3},
                    ${x2 + curveOffset}, ${y4 + 2 * (y3 - y4) / 3},
                    ${x2} ${y3}
                  L ${x1} ${y2}
                  C ${x1 - curveOffset}, ${y2 - (y2 - y1) / 3},
                    ${x1 - curveOffset}, ${y2 - 2 * (y2 - y1) / 3},
                    ${x1} ${y1}
                  Z
                `;

                return (
                  <React.Fragment key={segment.name}>
                    <path
                      d={pathData}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="1"
                      opacity={1 - (index * 0.1)}
                      onMouseEnter={(e) => handleMouseEnter(e, segment)}
                      onMouseLeave={handleMouseLeave}
                      className="transition-all duration-200 ease-in-out hover:opacity-100 hover:scale-[1.02]"
                    />
                    <text
                      x={segment.x + segment.width / 2}
                      y={segmentCenterY - 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(var(--primary-foreground))"
                      className="text-xs font-semibold pointer-events-none"
                    >
                      {segment.name}
                    </text>
                    <text
                      x={segment.x + segment.width / 2}
                      y={segmentCenterY + 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(var(--primary-foreground))"
                      className="text-sm font-bold pointer-events-none"
                    >
                      ({segment.value})
                    </text>
                  </React.Fragment>
                );
              })}
            </g>
          </svg>

          {hoveredSegment && tooltipPosition && (
            <div
              className="absolute bg-popover p-2 border border-border rounded-md shadow-md text-popover-foreground z-50"
              style={{ left: tooltipPosition.x + 10, top: tooltipPosition.y + 10 }}
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