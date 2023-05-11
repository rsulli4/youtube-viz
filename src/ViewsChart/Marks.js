export const Marks = ({data, xScale, yScale, yValue, xValue1, xValue2, xValue3, tooltipFormat}) =>
  data.map((d) => (
    <g>
    <rect
      className = "mark"
      key={d}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue1(d))}
      height={yScale.bandwidth()/3}
      fill="white"
    >
      <title>{tooltipFormat(xValue1(d))}</title>
    </rect>
    <rect
    className = "mark"
    key={d}
    x={0}
    y={yScale(yValue(d)) + yScale.bandwidth()/3}
    width={xScale(xValue2(d))}
    height={yScale.bandwidth()/3}
    fill="green"
    >
    <title>{tooltipFormat(xValue2(d))}</title>
    </rect>

    <rect
        className = "mark"
        key={d}
        x={0}
        y={yScale(yValue(d)) +2 * yScale.bandwidth()/3}
        width={xScale(xValue3(d))}
        height={yScale.bandwidth()/3}
        fill="blue"
        >
        <title>{tooltipFormat(xValue3(d))}</title>
        </rect>
    </g>
  ));