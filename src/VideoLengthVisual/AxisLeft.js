export const AxisLeft = ({ yScale, innerWidth, tickOffset=3, yAxisTickFormat }) =>
  yScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        dy=".32em"
        x={-tickOffset}
        style={{ textAnchor: 'end' }}
      >
        {yAxisTickFormat(tickValue)}
      </text>
    </g>
  ));