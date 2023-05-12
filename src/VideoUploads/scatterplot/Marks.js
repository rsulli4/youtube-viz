export const Marks = ({
    data,
    xScale,
    yScale,
    yValue,
    xValue,
    colorValue,
    colorArray,
    circleRadius,
    nameArray
  }) =>{
    const setColor = (value) =>{
      return colorArray[value];
    }
    return data.map((d) => (
      <circle
        className="markUpload"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))-colorValue(d)*3}//offset slightly for better visualization
        r={circleRadius}
        key={d.id}
        fill={setColor(colorValue(d))}
        fillOpacity={0.7}
      >
        <title>{nameArray[colorValue(d)]}</title>
      </circle>
    ));
  }
  