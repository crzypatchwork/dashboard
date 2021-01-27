import React, { Component } from 'react'

const d3 = require('d3')
const axios = require('axios')

export default class Chart extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        
    }

    componentDidMount = async () => {
        this.drawBarChart(await axios.get('http://3.15.164.185:5000/industries_count').then(res => res.data))
    }

    drawBarChart = async (data) => {

        var keys = data.payload.map(e => e.industry).slice(0, 20)
        console.log(keys)
        
        var svg = d3.select(this.refs.bar)
            .append('svg')
            .attr('width', 1000)
            .attr('height', 1000)

        var x = d3.scalePoint()
            .domain(keys)
            .range([100, 800])

        svg.append("g")
            .attr("transform", "translate(0,800)")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(0,0)rotate(45)")
            .style("text-anchor", "start")
            .style("font-size", 20)

        var values = data.payload.map(e => e.count).slice(0, 20)
        console.log(values)

        var y = d3.scaleLinear()
            .domain([0, values[0]])
            .range([800, 100]);

        values.map((e, i) => {
            svg.append("rect")
                .attr('x', x(keys[i]))
                .attr('y', 0)
                .attr("width", 10)
                .attr("height", Math.abs(y(0) - y(values[i])))
                .attr('fill', 'black')
                .attr('transform', 'translate(0,795)scale(1, -1)')
        })

        svg.append("g")
            .attr("transform", "translate(50,0)")
            .call(d3.axisLeft(y))

    }

    render() {
        return (
            <div ref='bar'></div>
        )
    }
}
