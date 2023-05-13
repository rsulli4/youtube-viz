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
    extent,
    timeFormat
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
  const xAxisTickFormat = timeFormat('%H:%M');
  
  export const Scatterplot = ({data}) => {
  
    const innerHeight =
      height - margin.top - margin.bottom;
    const innerWidth =
      width - margin.left - margin.right;
    
    const titleValue = (d) => (d.videoTitle);
    const xValue = (d) => (d.duration);
    const xAxisLabel = "Duration of Video";
    const yValue1 = (d) => (d.views);
    const yValue2 = (d) => (d.likes);
    const yValue3 = (d) => (d.comments);
    const yAxisLabel = "Count";
    const colorArray = ['cyan','lime', 'blue'];
    const typeArray = ['views','likes', 'comments'];
    const legendOffset = 20;
    const siFormat = format('.2s');
    const yAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');

    const xScale = scaleLinear()
      .domain([ new Date(0,0,0,0,0,0,0) ,max(data,xValue)])
      .range([0, innerWidth]);
  
    const yScale = scaleLinear()
      .domain([0,max(data,yValue1)])
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
          <AxisLeft yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={5} 
          yAxisTickFormat={yAxisTickFormat}/>
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
            yValue={yValue1}
            xValue={xValue}
            color={colorArray[0]}
            type={typeArray[0]}
            circleRadius={7}
            xFormat={xAxisTickFormat}
            titleValue={titleValue}
            yAxisTickFormat={yAxisTickFormat}
          />

          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue2}
            xValue={xValue}
            color={colorArray[1]}
            type={typeArray[1]}
            circleRadius={7}
            xFormat={xAxisTickFormat}
            titleValue={titleValue}
            yAxisTickFormat={yAxisTickFormat}
          />

            <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue3}
            xValue={xValue}
            color={colorArray[2]}
            type={typeArray[2]}
            circleRadius={7}
            xFormat={xAxisTickFormat}
            titleValue={titleValue}
            yAxisTickFormat={yAxisTickFormat}
          />
          <Legend nameArray={typeArray} 
          colorArray={colorArray} 
          offset={legendOffset} 
          width={innerWidth} 
          height={innerHeight}/>
        </g>
      </svg>
    );
  };