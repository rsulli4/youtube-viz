import {max, scaleLinear, bin, scaleBand} from "d3"; // we will need d3.js
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Bars } from "./Bars"



export const Histogram = ({ width, height, data, domain, threshold }) => {

  const margin = {
    top: 60,
    right: 30,
    bottom: 70,
    left: 90,
  };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const titleOffset = -15;

  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.left - margin.right;

  const bucketGenerator = bin()
  .value((d) => d)
  .domain(domain)
  .thresholds(threshold);

  const xScale = scaleLinear()
  .domain(domain)
  .range([0, innerWidth]);

  const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([innerHeight, 0]);

  const buckets = bucketGenerator(data);
  

  const AllRects = buckets.map((bucket, i) => {
    return (
      <rect
        key={i}
        fill="#69b3a2"
        stroke="black"
        x={xScale(bucket.x0)}
        width={xScale(bucket.x1) - xScale(bucket.x0)}
        y={yScale(bucket.length)}
        height={height - yScale(bucket.length)}
      >
        <title>{bucket.x1 + " count: " + bucket.length}</title>
      </rect>
    );
  });

  return (
      <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
          /> */}

          <AxisLeft yScale={yScale} innerWidth={innerWidth} innerHeight={innerHeight}/>
          <text
          className="axis-label"
          textAnchor="middle"
          transform = {`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90) `}
          
        >
          Number of Uploads
        </text>
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + xAxisLabelOffset}
            color='white'
          >
            {' '} Hour of Day {' '}
          </text>
          <Bars buckets={buckets} xScale={xScale} yScale ={yScale} height={innerHeight}/>

          <AxisBottom xScale={xScale} innerHeight={innerHeight} threshold = {threshold} innerWidth={innerWidth}/>

          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={titleOffset}
            color='white'
          >
            {' '} When does the Channel Upload {' '}
          </text>

        </g>
      </svg>
  );
};