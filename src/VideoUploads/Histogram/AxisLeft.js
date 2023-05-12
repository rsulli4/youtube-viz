export const AxisLeft = ({yScale, innerWidth}) =>
  yScale.ticks().map((tickValue) => (
    <g className="tick"
      key={tickValue}
      transform={`translate(0,${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      
      <text
        x="-3"
        style={{ textAnchor: 'end' }}
        dy=".71em"
        y="-5"
      >
        {tickValue}
      </text>
    </g>
  ));