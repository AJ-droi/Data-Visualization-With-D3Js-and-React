import  {useRef} from 'react';
import * as d3 from 'd3'

const PieChart = ({data}) => {
    const svgRef = useRef();

    let wordCount = []

    data.map((item) => {
        wordCount.push(item.wordcount)
        return wordCount
    })

    wordCount = wordCount.slice(4,10)

    const svg = d3.select(svgRef.current);
      
    const width = 400,
      height = 400,
      radius = Math.min(width, height) / 2;
  
    svg.attr("width", width).attr("height", height);
  
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const pie = d3.pie().value(d => d);
  
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);
  
    const chart = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const arcs = chart.selectAll(".arc").data(pie(wordCount)).enter().append("g");
  
    arcs
      .append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));
  
    arcs
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)}) rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(d => d.data);
      



      
  return (
    <div className='bg-[#fff] lg:w-[50%] flex flex-col justify-center items-center overflow-auto'>
        <h4 className='text-[#01058A] font-bold text-[1.2rem] py-[2%] underline'>WordCount Distribution</h4>
        <svg ref={svgRef} ></svg>

    </div>
  )
}

export default PieChart