export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset =3}) =>
  xScale.ticks().map((tickValue) => (
    <g className="tick"
      key={tickValue}
      transform={`translate(${xScale(
        tickValue
      )},0)`}
    >
      <line y2={innerHeight} />
      <text
        y={innerHeight + tickOffset}
        style={{ textAnchor: 'middle' }}
        dy=".71em"
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));