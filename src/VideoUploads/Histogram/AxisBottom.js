import {axisBottom} from "d3";
export const AxisBottom = ({ xScale, innerHeight, threshold, innerWidth}) =>
threshold.map((tickValue) => (
  <g className="tick" transform={`translate(${xScale(tickValue)},0)`}>
    <text
      key={tickValue+"hist"}
      dy=".32em"
      y={innerHeight + 10}
      style={{ textAnchor: 'middle' }}
      x="-10"
    >
      {tickValue}
    </text>
  </g>
));