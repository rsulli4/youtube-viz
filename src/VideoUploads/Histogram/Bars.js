export const Bars = ({buckets, xScale, yScale, height}) =>
buckets.map((bucket, i) => {
    return (
      <rect
        key={i}
        fill="#69b3a2"
        stroke="black"
        x={xScale(bucket.x0)}
        width={xScale(bucket.x1) - xScale(bucket.x0)}
        y={yScale(bucket.length)}
        height={height - yScale(bucket.length)}
      >
        <title>{"hour: "+bucket.x1+" times uploaded: "+bucket.length}</title>
      </rect>
    );
  });