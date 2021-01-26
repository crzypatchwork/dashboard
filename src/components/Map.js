import { svg } from 'd3'
import React, { Component } from 'react'

const d3 = require('d3')
const axios = require('axios')
const d3geo = require('d3-geo')
const d3scale = require('d3-scale')

export default class Map extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount = async () => {
        this.drawBarChart(await axios.get('http://3.15.164.185:5000/industries_count').then(res => res.data))
    }

    componentWillMount = () => {


        // The svg
        var svg = d3.select(this.refs.div)

        // Map and projection
        /*         var projection = d3.geoMercator()
                    .center([2, 47])                // GPS of location to zoom on
                    .scale(980)                       // This is like the zoom
                    .translate([width / 2, height / 2]) */

        // Load external data and boot
        var projection = d3.geoMercator()
            .center([2, 47])                // GPS of location to zoom on
            .scale(980)                       // This is like the zoom
            .translate([800 / 2, 800 / 2])

        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {

            // Filter data
            data.features = data.features.filter(function (d) { console.log(d.properties.name); return d.properties.name == "France" })

            // Draw the map
            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("fill", "grey")
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "none")
        })

    }

    drawBarChart = async (data) => {

        var arr = data.payload.map(e => e.industry)
        arr = arr.slice(0, 20)
        console.log(arr)
        var svg = d3.select(this.refs.bar)
            .append('svg')
            .attr('width', 1000)
            .attr('height', 1000)

        var x = d3.scalePoint()
            .domain(arr)
            .range([100, 800])

        svg
            .append("g")
            .attr("transform", "translate(0,800)")      // This controls the rotate position of the Axis
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(0,0)rotate(45)")
            .style("text-anchor", "start")
            .style("font-size", 20)

        var values = data.payload.map(e => e.count)
        values = values.slice(0, 20)
        console.log(values)

        var y = d3.scaleLinear()
            .domain([0, values[0]])
            .range([800, 100]);


        values.map((e, i) => {
            svg
                .append("rect")
                .attr('x', x(arr[i]))
                .attr('y', 0)
                .attr("width", 10)
                .attr("height", Math.abs(y(0) - y(values[i])))
                .attr('fill', 'black')
                .attr('transform', 'translate(0,795)scale(1, -1)')
        })

        svg
            .append("g")
            .attr("transform", "translate(50,0)")
            .call(d3.axisLeft(y));

    }

    render() {
        return (
            <div ref='bar'>
            </div>
        )
    }
}
