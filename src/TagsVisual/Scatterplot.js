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
  
  const width = 960;
  const height = 500;
  const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 90,
  };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 40;
  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');
  
  export const Scatterplot = ({data}) => {
  
    const innerHeight =
      height - margin.top - margin.bottom;
    const innerWidth =
      width - margin.left - margin.right;
    
    const yValue = (d) => d.uses;
    const yAxisLabel = "times tag was used";
    const xValue = (d) => d.views;
    const xAxisLabel = "views on tag";
    const nameValue = (d) => d.tag;
    
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
            nameValue={nameValue}
            circleRadius={7}
          />
        </g>
      </svg>
    );
  };