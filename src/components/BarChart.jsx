
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

    let wordCount = []

    data.map((item) => {
        wordCount.push(item.wordcount)
    })

    const handleSVG = () => {
        const svg = d3.select(svgRef.current);
      
        const width = 500,
          height = 600,
          margin = { top: 20, right: 20, bottom: 50, left: 50 };
      
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
      
        svg.attr("width", width).attr("height", height);
      
        const xScale = d3
          .scaleBand()
          .domain(wordCount.map((d, i) => i))
          .range([0, chartWidth])
          .padding(0.1);
      
        const yScale = d3
          .scaleLinear()
          .domain([0, 50000])
          .range([chartHeight, 0]);
      
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
      
        const chart = svg
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      
        chart
          .selectAll(".bar")
          .data(wordCount)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", (d, i) => xScale(i))
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => chartHeight - yScale(d))
          .attr("fill", "steelblue");
      
        chart
          .append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${chartHeight})`)
          .call(xAxis);
      
        chart
          .append("g")
          .attr("class", "y axis")
          .call(yAxis);
      
        chart
          .append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", chartWidth)
          .attr("y", chartHeight + margin.bottom )
          .text("No of Search Result");
      
        chart
          .append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("x", -margin.top)
          .attr("y", margin.left)
          .attr("transform", "rotate(-90)")
          .text("WordCount");
    }



    useEffect(() => {
       handleSVG()
      }, [wordCount]);
      
      
      

  return (
    <div className='bg-[#fff] lg:w-[40%] px-[5%] py-[5%] overflow-auto rounded-lg'>
        <h4 className='text-[#01058A] font-bold text-[1.2rem] underline'>Top 10 Search Vs Word Count</h4>
        <svg ref={svgRef}  />

    </div>
    
  );
};

export default BarChart;

