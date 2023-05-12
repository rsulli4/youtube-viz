import React, {
    useState,
    useCallback,
    useEffect,
  } from 'react';
  import ReactDOM from 'react-dom';
  import {
    csv,
    scaleBand,
    scaleLinear,
    max,
    format,
  } from 'd3';
  import { AxisBottom } from './AxisBottom';
  import { AxisLeft } from './AxisLeft';
  import { Marks } from './Marks';
  
  const width = 960;
  const height = 500;
  const margin = {
    top: 50,
    right: 30,
    bottom: 40,
    left: 265,
  };
  const xAxisLabelOffset = 10;
  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');
  
export const ViewsChart = ({dataIn, sliceSize}) => {
    const data = dataIn.items.slice(0,sliceSize);
  
    if (!data) {
      return <pre>Loading...</pre>;
    }
  
    const innerHeight =
      height - margin.top - margin.bottom;
    const innerWidth =
      width - margin.left - margin.right;
    const yValue = (d) => d.snippet.title;
    const xValue1 = (d) => +d.statistics.viewCount;
    const xValue2 = (d) => +d.statistics.likeCount;
    const xValue3 = (d) => +d.statistics.commentCount;
  
    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.15);


    const xScale = scaleLinear()
      .domain([0, max(data, xValue1)])
      .range([0, innerWidth]);
  
    return (
      <svg width={width} height={height}>
        <g
          transform={`translate(${margin.left},${margin.top})`}
        >
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} textLength={50}/>
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={-xAxisLabelOffset}
            color='white'
          >
            {' '} View Likes and Comments count {' '}
          </text>
          
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue}
            xValue1={xValue1}
            xValue2={xValue2}
            xValue3={xValue3}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    );
  };