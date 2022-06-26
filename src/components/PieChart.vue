<template>
  <div ref="piechart"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "PieChart",
  props: {
    data: { required: true },
  },

  created() {
    setTimeout(() => {
      this.createPieChart(JSON.parse(JSON.stringify(this.data)));
    }, 200);
  },
  methods: {
    createPieChart(data) {
      var piecolor = [];
      for (let i = 0; i < data.length; i++) {
        piecolor.push(d3.schemeSet2[i]);
      }
      var categorical = data.map(function (d) {
        return d.value;
      });
      let checkExist = d3.select(this.$refs.piechart).select("svg");
      var sumValue = 0;
      data.map(function (d) {
        sumValue += d.number;
      });
      if (checkExist) {
        checkExist.remove();
      }
      // set the dimensions and margins of the graph
      var width = 500;
      var height = 400;
      var margin = 40;
      var piewidth = width / 2 + margin;

      var svg = d3
        .select(this.$refs.piechart)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + piewidth + "," + height / 2 + ")");

      let y = -126;
      let cy = -130;
      for (let i = 0; i < categorical.length; i++) {
        svg
          .append("circle")
          .attr("cx", -280)
          .attr("cy", cy)
          .attr("r", 8)
          .style("fill", piecolor[i]);
        svg
          .append("text")
          .attr("x", -260)
          .attr("y", y)
          .text(categorical[i])
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");
        y += 30;
        cy += 30;
      }

      svg
        .append("g")
        .attr("transform", "translate(" + (width / 2 - 480) + "," + -180 + ")")
        .append("text")
        .text("Tổng lượng bán theo từng loại sản phẩm")
        .attr("class", "title");

      var radius = Math.min(width, height) / 2 - margin;

      var color = d3.scaleOrdinal(piecolor);
      var color_arc = {}
      var pie = d3.pie().value(function (d) {
        return d.number;
      });

      var path = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 140);

      var arc = svg
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arc
        .append("path")
        .attr("d", path)
        .attr("fill", function (d, i) {
          color_arc[d.data.value] = color(i)
          return color(i);
        });

      arc
        .append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .style("font-size", "15px")
        .text(function (d) {
          return (d.value * 100) / sumValue + "%";
        })
      arc.on('click', function (event, d) {
        console.log(d.data.value,  color_arc[d.data.value]);
        var checkClicked = d3.select(".highlight")
        var checkSelected = d3.select(this).attr('class') != 'highlight'
        if (checkClicked._groups[0][0] != null) {
          checkClicked.attr("class", "arc");
          checkClicked.append("path")
            .attr("d", path)
            .attr("fill", color_arc[checkClicked._groups[0][0].__data__.data.value]);
          checkClicked.append("text")
            .attr("transform", function (d) {
              return "translate(" + label.centroid(d) + ")";
            })
            .style("font-size", "15px")
            .text(function (d) {
              return (d.value * 100) / sumValue + "%";
            })
        }
        if (checkSelected) {
          d3.select(this).attr("class", "highlight");
          d3.select(this).append("path")
          .attr("d", path)
          .attr("fill", red);
        }
      });
    },
  },
};
</script>
