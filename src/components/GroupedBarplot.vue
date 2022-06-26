<template>
  <div ref="groupedbarplot"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "GroupedBarplot",
  props: {
    data: { required: true },
  },

  created() {
    setTimeout(() => {
      this.createGroupedBarplot(JSON.parse(JSON.stringify(this.data)));
    }, 200);
  },
  methods: {
    createGroupedBarplot(data) {
      // set the dimensions and margins of the graph
      var margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let checkExist = d3.select(this.$refs.groupedbarplot).select("svg");
      if (checkExist) {
        checkExist.remove();
      }
      // append the svg object to the body of the page
      var svg = d3
        .select(this.$refs.groupedbarplot)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // List of subgroups = header of the csv files = soil condition here
      var subgroups = data[0].value.map(function (d) {
        return d.key;
      });

      // List of groups = species here = value of the first column called group -> I show them on the X axis
      var groups = data.map(function (d) {
        return d.key;
      });
      // Add X axis
      var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 1000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Another scale for subgroup position?
      var xSubgroup = d3
        .scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05]);

      // color palette = one color per subgroup
      var color = d3
        .scaleOrdinal()
        .domain(subgroups)
        .range(["#e41a1c", "#377eb8", "#4daf4a"]);

      // Show the bars
      svg
        .append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + x(d.key) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
          //   return subgroups.map(function (key) {
          //     return { key: key, value: d.value };
          //   });
          return d.value.map(function (key) {
            return { key: key.key, value: key.value };
          });
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return xSubgroup(d.key);
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", function (d) {
          return color(d.key);
        });
    },
  },
};
</script>
