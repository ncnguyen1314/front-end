<template>
  <div ref="horizontalbarchart"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "HorizontalBarChart",
  props: {
    data: { required: true },
  },

  created() {
    setTimeout(() => {
      this.createHorizontalBarChart(JSON.parse(JSON.stringify(this.data)));
    }, 200);
  },
  methods: {
    createHorizontalBarChart(data) {
      // set the dimensions and margins of the graph
      var margin = { top: 40, right: 10, bottom: 40, left: 90 },
        width = 560 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let checkExist = d3.select(this.$refs.horizontalbarchart).select("svg");
      if (checkExist) {
        checkExist.remove();
      }
      let svg = d3
        .select(this.$refs.horizontalbarchart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg
        .append("g")
        .attr("transform", "translate(" + width / 3 + "," + -20 + ")")
        .append("text")
        .text("10 sản phẩm bán chạy")
        .attr("class", "title");

      // Add X axis
      var x = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d.number;
          }),
        ])
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis
      var y = d3
        .scaleBand()
        .range([0, height])
        .domain(
          data.map(function (d) {
            return d.value;
          })
        )
        .padding(0.1);
      svg.append("g").call(d3.axisLeft(y));

      //Bars
      svg
        .selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", function (d) {
          return x(d.number);
        })
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2");
      append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
          return +d.data.value;
        });

      // .attr("x", function(d) { return x(d.value); })
      // .attr("y", function(d) { return y(d.value); })
      // .attr("width", x.bandwidth())
      // .attr("height", function(d) { return height - y(d.value); })
      // .attr("fill", "#69b3a2")
    },
  },
};
</script>
