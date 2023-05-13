export const Legend = ({colorArray, nameArray, width, height, offset}) =>{
   return nameArray.map((d, i) => (
        <g className="legend" transform={`translate(${width+3},${height/2-(offset*nameArray.length)/2})`}>
            <text
            fill={colorArray[i]}
            y={i*offset}
            dy=".32em"
            >{d}</text>
        </g>
    ))
}