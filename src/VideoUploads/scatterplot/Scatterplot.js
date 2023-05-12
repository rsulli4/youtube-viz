import React, {
    useState,
    useCallback,
    useEffect,
  } from 'react';
  import ReactDOM from 'react-dom';
  import {
    csv,
    scaleLinear,
    max,
    format,
    extent
  } from 'd3';
  import { AxisBottom } from './AxisBottom';
  import { AxisLeft } from './AxisLeft';
  import { Marks } from './Marks';
  import { Legend } from './Legend';
  
  const width = 960;
  const height = 500;
  const margin = {
    top: 20,
    right: 100,
    bottom: 65,
    left: 105,
  };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 70;
  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');
  
  export const Scatterplot = ({data}) => {
  
    const innerHeight =
      height - margin.top - margin.bottom;
    const innerWidth =
      width - margin.left - margin.right;
    
    const xValue = (d) => (d.hour);
    const xAxisLabel = "hour of upload";
    const yValue = (d) => (d.count);
    const yAxisLabel = "times uploaded";
    const colorValue = (d) => d.day;
    const colorArray = ['#FF69B4','#40E0D0', 'green', '#00A7E1', 'orange', 'red', 'yellow'];
    const nameArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const legendOffset = 20;

    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
        .nice();
  
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
  
    return (
      <svg width={width} height={height}>
        <g
          transform={`translate(${margin.left},${margin.top})`}
        >
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform = {`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90) `}
            
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + xAxisLabelOffset}
          >
            {xAxisLabel}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue}
            xValue={xValue}
            colorValue={colorValue}
            colorArray={colorArray}
            circleRadius={7}
            nameArray={nameArray}
          />
          <Legend nameArray={nameArray} 
          colorArray={colorArray} 
          offset={legendOffset} 
          width={innerWidth} 
          height={innerHeight}/>
        </g>
      </svg>
    );
  };