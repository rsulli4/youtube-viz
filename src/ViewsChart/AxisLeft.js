
export const AxisLeft = ({ yScale , textLength}) =>
  yScale.domain().map((tickValue) => (
    <g className="tick">
      <text
        key={tickValue}
        dy=".32em"
        x="-3"
        style={{ textAnchor: 'end' }}
        y={
          yScale(tickValue) +
          yScale.bandwidth() / 2
        }
      >
        {tickValue.substring(0,25)}
      </text>
    </g>
  ));