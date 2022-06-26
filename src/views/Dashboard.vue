<template>
  <div style="background-color: #d9eff5">
    <section class="welcome p-t-10">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="title-4">Dashboard</h1>
            <hr class="line-seprate" />
          </div>
        </div>
      </div>
    </section>
    <!-- STATISTIC-->
    <section class="statistic statistic2">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="statistic__item statistic__item--green">
              <h2 class="number">21.900.700</h2>
              <span class="desc">Tổng doanh thu</span>
              <div class="icon">
                <i class="zmdi zmdi-money"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="statistic__item statistic__item--orange">
              <h2 class="number">300</h2>
              <span class="desc">Số lượng sản phẩm bán ra</span>
              <div class="icon">
                <i class="zmdi zmdi-external-link-square"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="statistic__item statistic__item--blue">
              <h2 class="number">2</h2>
              <span class="desc">Course</span>
              <div class="icon">
                <i class="zmdi zmdi-calendar-note"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="statistic__item statistic__item--red">
              <h2 class="number">10</h2>
              <span class="desc">Lượng người theo dõi</span>
              <div class="icon">
                <i class="zmdi zmdi-account"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END STATISTIC-->

    <!-- STATISTIC CHART-->
    <section class="statistic-chart">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h3 class="title-5 m-b-35">statistics</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="statistic-chart-1" style="width: 100%; height: 900px">
              <h3 class="title-3 m-b-30">
                Tổng doanh số và doanh thu của cửa hàng
              </h3>
              <treeselect
                v-model="treeselectValue"
                :options="options"
                v-on:input="onClickForSaleRevenue"
                v-on:select="onClickForSaleRevenue"
                v-on:deselect="onClickForSaleRevenue"
                v-on:close="onClickForSaleRevenue"
                :multiple="false"
              />
              <div class="table-responsive">
                <div>
                  <bar-chart
                    style="display: inline-block"
                    :data="thongkeData"
                  ></bar-chart>
                  <div
                    style="display: inline-block"
                    ref="barchartForRevenue"
                  ></div>
                </div>
                <div>
                  <pie-chart
                    style="display: inline-block"
                    :data="TongBanLoaiSP"
                  ></pie-chart>
                  <horizontal-bar-chart
                    style="display: inline-block"
                    :data="TopSPBanChay"
                  ></horizontal-bar-chart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <div class="statistic-chart-1">
              <h3 class="title-3 m-b-30">Tình hình tồn kho của cửa hàng</h3>
              <!-- <treeselect
                v-model="treeselectValue"
                :options="options"
                v-on:input="onClickForSaleRevenue"
                v-on:select="onClickForSaleRevenue"
                v-on:deselect="onClickForSaleRevenue"
                v-on:close="onClickForSaleRevenue"
                :multiple="false"
              /> -->
              <div class="table-responsive">
                <!-- <area-chart :data="TinhHinhTonKho"></area-chart> -->
                <div ref="linechartForExist"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-6">
            <div class="statistic-chart-1">
              <h3 class="title-3 m-b-30">Tình hình đơn hàng của cửa hàng</h3>
              <!-- <treeselect
                v-model="treeselectValue"
                :options="options"
                v-on:input="onClickForSaleRevenue"
                v-on:select="onClickForSaleRevenue"
                v-on:deselect="onClickForSaleRevenue"
                v-on:close="onClickForSaleRevenue"
                :multiple="false"
              /> -->
              <div class="table-responsive">
                <stacked-bar-chart :data="TinhHinhDonHang"></stacked-bar-chart>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div
              class="statistic-chart-1"
              style="width: 1300px; height: 1000px"
            >
              <h3 class="title-3 m-b-30">Histogram</h3>
              <div class="table-responsive">
                <div>
                  <scatter-plot
                    style="display: inline-block"
                    :data="SoLuongBanSanPhamTheoGia"
                  ></scatter-plot>
                  <grouped-barplot
                    style="display: inline-block"
                    :data="LoaiSPTheoTungThang"
                  ></grouped-barplot>
                </div>

                <histogram></histogram>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";
import Treeselect from "vue3-treeselect";
import BarChart from "../components/BarChart";
import Histogram from "../components/Histogram";
import AreaChart from "../components/AreaChart";
import HorizontalBarChart from "../components/HorizontalBarChart";
import "vue3-treeselect/dist/vue3-treeselect.css";
import StackedBarChart from "@/components/StackedBarChart";
import PieChart from "@/components/PieChart.vue";
import ScatterPlot from "@/components/ScatterPlot.vue";
import GroupedBarplot from "@/components/GroupedBarplot.vue";

export default {
  name: "Dashboard",
  props: {},
  data() {
    return {
      filterData: [],
      show: false,
      searchEntries: [],
      currentData: [],
      currentDataCre: [],
      filename: "career",
      filenamecsv: "course",
      soLuongBanRa: [
        {
          tuan: "Week 1/6 2022",
          tongban: 150,
        },
        {
          tuan: "Week 2/6 2022",
          tongban: 300,
        },
        {
          tuan: "Week 3/6 2022",
          tongban: 240,
        },
        {
          tuan: "Week 4/6 2022",
          tongban: 210,
        },
      ],
      soLuongHangNhap: [
        {
          tuan: "Week 1/6 2022",
          tongnhap: 200,
        },
        {
          tuan: "Week 2/6 2022",
          tongnhap: 300,
        },
        {
          tuan: "Week 3/6 2022",
          tongnhap: 100,
        },
        {
          tuan: "Week 4/6 2022",
          tongnhap: 250,
        },
      ],
      soLuongTonHienTai: [
        {
          tuan: "Week 1/6 2022",
          soluongton: 222,
        },
        {
          tuan: "Week 2/6 2022",
          soluongton: 122,
        },
        {
          tuan: "Week 3/6 2022",
          soluongton: 256,
        },
        {
          tuan: "Week 4/6 2022",
          soluongton: 203,
        },
      ],
      TinhHinhTonKho: [
        {
          tuan: "Week 1/6 2022",
          soluongton: 222,
          tongnhap: 200,
          tongban: 150,
        },
        {
          tuan: "Week 2/6 2022",
          soluongton: 122,
          tongnhap: 300,
          tongban: 300,
        },
        {
          tuan: "Week 3/6 2022",
          soluongton: 256,
          tongnhap: 100,
          tongban: 240,
        },
        {
          tuan: "Week 4/6 2022",
          soluongton: 203,
          tongnhap: 250,
          tongban: 210,
        },
      ],
      time_crawl: "",
      thongkeData: [
        {
          key: 1,
          value: 10000,
        },
        {
          key: 2,
          value: 20000,
        },
        {
          key: 3,
          value: 30000,
        },
      ],
      options: [
        {
          id: "7days",
          label: "7 ngày gần nhất",
        },
        {
          id: "3months",
          label: "3 tháng vừa qua",
        },
        {
          id: "6months",
          label: "6 tháng vừa qua",
        },
      ],
      TinhHinhDonHang: [
        {
          key: "Tháng 1",
          dagiaohang: 123,
          hoantra: 200,
          dahuy: 150,
        },
        {
          key: "Tháng 2",
          dagiaohang: 153,
          hoantra: 300,
          dahuy: 250,
        },
      ],
      TongBanLoaiSP: [
        {
          value: "Do kho",
          number: 400,
        },
        {
          value: "Do dong lanh",
          number: 300,
        },
        {
          value: "Gia vi",
          number: 350,
        },
        {
          value: "Nuoc uong",
          number: 200,
        },
      ],
      TopSPBanChay: [
        {
          value: "Nước mắm",
          number: 400,
        },
        {
          value: "Mì tôm Hảo Hảo",
          number: 300,
        },
        {
          value: "Coca",
          number: 350,
        },
        {
          value: "Xúc xích",
          number: 200,
        },
      ],
      SoLuongBanSanPhamTheoGia: [
        {
          value1: 10000,
          value2: 1000,
        },
        {
          value1: 20000,
          value2: 1400,
        },
        {
          value1: 30000,
          value2: 900,
        },
        {
          value1: 50000,
          value2: 900,
        },
      ],
      LoaiSPTheoTungThang: [
        {
          key: "Tháng 1",
          value: [
            {
              key: "Đồ khô",
              value: 200,
            },
            {
              key: "Gia vị",
              value: 300,
            },
          ],
        },
        {
          key: "Tháng 2",
          value: [
            {
              key: "Đồ khô",
              value: 400,
            },
            {
              key: "Gia vị",
              value: 250,
            },
          ],
        },
        {
          key: "Tháng 3",
          value: [
            {
              key: "Đồ khô",
              value: 600,
            },
            {
              key: "Gia vị",
              value: 500,
            },
          ],
        },
      ],
      treeselectValue: "7days",
    };
  },
  components: {
    Treeselect,
    "bar-chart": BarChart,
    Histogram,
    AreaChart,
    HorizontalBarChart,
    StackedBarChart,
    PieChart,
    ScatterPlot,
    GroupedBarplot,
  },
  created() {
    setTimeout(() => {
      // this.createBarChartWithAnimated();
      this.createDotLineChartwithMany();
      this.createTwoYAxisChart(this.thongkeData);
    }, 200);
  },
  computed: {
    SumaryDBData() {
      return this.sumarydb;
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
    ConvertToString(str) {
      if (str.toString() != "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    onClickForSaleRevenue() {
      console.log(this.treeselectValue);
      this.createBarChart(this.thongkeData);
    },
    createBarChartWithAnimated() {
      let checkExist = d3.select(this.$refs.barchartForRevenue).select("svg");
      if (checkExist) {
        checkExist.remove();
      }
      let svg = d3
        .select(this.$refs.barchartForRevenue)
        .append("svg")
        .attr("width", 500)
        .attr("height", 350);
      var margin = 200;
      var width = svg.attr("width") - margin;
      var height = svg.attr("height") - margin;

      svg
        .append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Tong doanh thu");

      var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
      let data = this.thongkeData;
      x.domain(
        data.map(function (d) {
          return d.thang;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.doanhthu;
        }),
      ]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("y", height - 280)
        .attr("x", width + 10)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Thang");

      g.append("g")
        .call(
          d3
            .axisLeft(y)
            .tickFormat(function (d) {
              return "$" + d;
            })
            .ticks(5)
        )
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", 86)
        .attr("dy", "-10.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Tong doanh thu");

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .on("mouseover", function (d) {
          d3.select(this).attr("class", "highlight");
          d3.select(this)
            .transition() // adds animation
            .duration(400)
            .attr("width", x.bandwidth() + 5)
            .attr("y", function (d) {
              return y(d.doanhthu) - 10;
            })
            .attr("height", function (d) {
              return height - y(d.doanhthu) + 10;
            });

          g.append("text")
            .attr("class", "val")
            .attr("x", function () {
              return x(d.thang);
            })
            .attr("y", function () {
              return y(d.doanhthu) - 15;
            })
            .text(function () {
              return ["$" + d.doanhthu]; // value of the text
            });
        }) //Add listener for the mouseover event
        .on("mouseout", function () {
          // use the text label class to remove label on mouseout
          d3.select(this).attr("class", "bar");
          d3.select(this)
            .transition() // adds animation
            .duration(400)
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
              return y(d.doanhthu);
            })
            .attr("height", function (d) {
              return height - y(d.doanhthu);
            });

          d3.selectAll(".val").remove();
        }) //Add listener for the mouseout event
        .attr("x", function (d) {
          return x(d.thang);
        })
        .attr("y", function (d) {
          return y(d.doanhthu);
        })
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay(function (d, i) {
          return i * 50;
        })
        .attr("height", function (d) {
          return height - y(d.doanhthu);
        });
    },
    createDotLineChartwithMany() {
      let color1 = d3.schemeSet2[0];
      let color2 = d3.schemeSet2[1];
      let color3 = d3.schemeSet2[2];
      // set the dimensions and margins of the graph
      var margin = { top: 10, right: 100, bottom: 30, left: 50 },
        width = 550 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let checkExist = d3.select(this.$refs.linechartForExist).select("svg");
      if (checkExist) {
        checkExist.remove();
      }
      let svg = d3
        .select(this.$refs.linechartForExist)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      svg
        .append("circle")
        .attr("cx", 20)
        .attr("cy", 6)
        .attr("r", 6)
        .style("fill", color2);
      svg
        .append("circle")
        .attr("cx", 140)
        .attr("cy", 6)
        .attr("r", 6)
        .style("fill", color3);
      svg
        .append("circle")
        .attr("cx", 260)
        .attr("cy", 6)
        .attr("r", 6)
        .style("fill", color1);
      svg
        .append("text")
        .attr("x", 30)
        .attr("y", 10)
        .text("Tổng nhập")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
      svg
        .append("text")
        .attr("x", 150)
        .attr("y", 10)
        .text("Tổng bán")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
      svg
        .append("text")
        .attr("x", 270)
        .attr("y", 10)
        .text("Số lượng tồn")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
      //Read the data
      var data = this.TinhHinhTonKho;
      // List of groups (here I have one group per column)
      var allGroup = ["soluongton", "tongnhap", "tongban"];

      // Reformat the data: we need an array of arrays of {x, y} tuples
      var dataReady = allGroup.map(function (grpName) {
        // .map allows to do something for each element of the list
        return {
          name: grpName,
          values: data.map(function (d) {
            return { tuan: d.tuan, value: +d[grpName] };
          }),
        };
      });

      // A color scale: one color for each group
      var myColor = d3
        .scaleOrdinal()
        .domain(allGroup)
        .range([color1, color2, color3]);

      // Add X axis --> it is a date format
      var x = d3
        .scalePoint()
        .domain(
          data.map(function (d) {
            return d.tuan;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 400]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add the lines
      var line = d3
        .line()
        .x(function (d) {
          return x(d.tuan);
        })
        .y(function (d) {
          return y(d.value);
        });
      svg
        .selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("d", function (d) {
          return line(d.values);
        })
        .attr("stroke", function (d) {
          return myColor(d.name);
        })
        .style("stroke-width", 4)
        .style("fill", "none");

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function (d) {
        Tooltip.style("opacity", 1);
      };
      var mousemove = function (event, d) {
        Tooltip.html("Exact value: " + d.soluongton)
          .style("left", d3.pointer(event)[0] + 170 + "px")
          .style("top", d3.pointer(event)[1] + "px");
      };
      var mouseleave = function (d) {
        Tooltip.style("opacity", 0);
      };

      // Add the points
      svg
        // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .enter()
        .append("g")
        .style("fill", function (d) {
          return myColor(d.name);
        })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function (d) {
          return d.values;
        })
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.tuan);
        })
        .attr("cy", function (d) {
          return y(d.value);
        })
        .attr("r", 5)
        .attr("stroke", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

      // Add a legend at the end of each line
      svg
        .selectAll("myLabels")
        .data(dataReady)
        .enter()
        .append("g")
        .append("text")
        .datum(function (d) {
          return { name: d.name, value: d.values[d.values.length - 1] };
        }) // keep only the last value of each tuan series
        .attr("transform", function (d) {
          return "translate(" + x(d.value.tuan) + "," + y(d.value.value) + ")";
        }); // Put the text at the position of the last point
      // .attr("x", 12) // shift the text a bit more right
      // .text(function (d) {
      //   return d.name;
      // })
      // .style("fill", function (d) {
      //   return myColor(d.name);
      // })
      // .style("font-size", 15);
    },
    createDotLineChart() {
      // set the dimensions and margins of the graph
      var margin = { top: 10, right: 100, bottom: 30, left: 50 },
        width = 760 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      let checkExist = d3.select(this.$refs.linechartForExist).select("svg");
      if (checkExist) {
        checkExist.remove();
      }
      let svg = d3
        .select(this.$refs.linechartForExist)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Read the data
      var data = this.tinhHinhTonKho;
      var x = d3
        .scalePoint()
        .domain(
          data.map(function (d) {
            return d.tuan;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3.scaleLinear().domain([0, 350]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));
      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.tuan);
            })
            .y(function (d) {
              return y(d.soluongton);
            })
        );
      // create a tooltip
      var Tooltip = d3
        .select(this.$refs.linechartForExist)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function (d) {
        Tooltip.style("opacity", 1);
      };
      var mousemove = function (event, d) {
        Tooltip.html("Exact value: " + d.soluongton)
          .style("left", d3.pointer(event)[0] + 170 + "px")
          .style("top", d3.pointer(event)[1] + "px");
      };
      var mouseleave = function (d) {
        Tooltip.style("opacity", 0);
      };
      // Add the points
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.tuan);
        })
        .attr("cy", function (d) {
          return y(d.soluongton);
        })
        .attr("r", 5)
        .attr("fill", "#69b3a2")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    },
    createTwoYAxisChart(data) {
      let checkExist = d3.select(this.$refs.barchartForRevenue).select("svg");
      if (checkExist) {
        checkExist.remove();
      }
      let svg = d3
        .select(this.$refs.barchartForRevenue)
        .append("svg")
        .attr("width", 600)
        .attr("height", 350);
      var width = svg.attr("width") - 200;
      var height = svg.attr("height") - 200;
      var xScale = d3.scaleBand().range([0, width]).padding(0.4);
      var yScale = d3.scaleLinear().range([height, 0]);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");
      xScale.domain(
        data.map(function (d) {
          return d.key;
        })
      );
      yScale.domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        }),
      ]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
      g.append("g")
        .call(
          d3
            .axisLeft(yScale)
            .tickFormat(function (d) {
              return d + " VND";
            })
            .ticks(4) //so luong moc tren truc y
        )
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", 80)
        .attr("dy", "-10.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Revenue");

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width + 20)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Month");
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return xScale(d.key);
        })
        .attr("y", function (d) {
          return yScale(d.value);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
          return height - yScale(d.value);
        });

      //line chart

      var g2 = svg
        .append("g")
        .attr("transform", "translate(" + 500 + "," + 100 + ")");
      yScale.domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        }),
      ]);
      g2.append("g")
        .attr("transform", "translate(-400," + height + ")")
        .call(d3.axisBottom(xScale));
      g2.append("g").call(
        d3
          .axisRight(yScale)
          .tickFormat(function (d) {
            return d + " VND";
          })
          .ticks(4) //so luong moc tren truc y
      );

      // Add the points
      g.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return xScale(d.key) + xScale.bandwidth() / 2;
        })
        .attr("cy", function (d) {
          return yScale(d.value);
        })
        .attr("r", 5)
        .attr("fill", "#69b3a2");
      g.append("g")
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return xScale(d.key) + xScale.bandwidth() / 2;
            })
            .y(function (d) {
              return yScale(d.value);
            })
        );
    },
    onChangeTab(key) {
      this.type = key;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/cooladmin/vendor/font-awesome-4.7/css/font-awesome.min.css";
@import "../assets/cooladmin/vendor/font-awesome-5/css/fontawesome-all.min.css";
@import "../assets/cooladmin/vendor/mdi-font/css/material-design-iconic-font.min.css";
@import "../assets/cooladmin/vendor/bootstrap-4.1/bootstrap.min.css";
@import "../assets/cooladmin/vendor/animsition/animsition.min.css";
@import "../assets/cooladmin/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css";
@import "../assets/cooladmin/vendor/wow/animate.css";
@import "../assets/cooladmin/vendor/css-hamburgers/hamburgers.min.css";
@import "../assets/cooladmin/vendor/slick/slick.css";
@import "../assets/cooladmin/vendor/select2/select2.min.css";
@import "../assets/cooladmin/vendor/perfect-scrollbar/perfect-scrollbar.css";
@import "../assets/cooladmin/css/theme.css";
</style>
