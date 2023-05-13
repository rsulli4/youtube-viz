export const Marks = ({
    data,
    xScale,
    yScale,
    yValue,
    xValue,
    type,
    color,
    circleRadius,
    xFormat,
    titleValue,
    yAxisTickFormat
  }) =>{
    return data.map((d) => (
      <circle
        className="markUpload"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}//offset slightly for better visualization
        r={circleRadius}
        key={d.id}
        fill={color}
        fillOpacity={0.7}
      >
        <title>{yAxisTickFormat(yValue(d))+" "+type+" "+ xFormat(xValue(d))+ " length Title: "+titleValue(d)}</title>
      </circle>
    ));
  }
  