export const Marks = ({
    data,
    xScale,
    yScale,
    yValue,
    xValue,
    nameValue,
    circleRadius
  }) =>
    data.map((d) => (
      <circle
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        key={nameValue(d)}
        fill={`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`}
        fillOpacity={0.7}
      >
        <title>{nameValue(d)}</title>
      </circle>
    ));
  