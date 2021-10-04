<template>
  <div class="page">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人主页</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户文章数据</span>

        <!-- echarts数据可视化区域 -->
        <div id="header">
          <el-card
            shadow="hover"
            v-for="(item, index) in dataList"
            :key="index"
            :class="cList[index]"
            >{{ item.num }}</el-card
          >
          <el-tag size="medium" v-for="(item, i) in dataList" :key="i + 10">{{
            item.title
          }}</el-tag>
        </div>
        <div class="main">
          <div id="curshow"></div>
          <div id="pieshow"></div>
        </div>

       
      </div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  // 此时需要等待页面上的dom元素渲染完毕，才能进行数据可视化操作
  mounted() {
    var oChart = echarts.init(document.getElementById("curshow"));
    var aList_all = [
        { count: 52, date: "2021-09-14" },
      { count: 36, date: "2021-09-13" },
      { count: 78, date: "2021-09-15" },
      { count: 85, date: "2021-09-16" },
      { count: 65, date: "2021-09-17" },
      { count: 72, date: "2021-09-18" },
      { count: 88, date: "2021-09-19" },
      { count: 64, date: "2021-09-20" },
      { count: 72, date: "2021-09-21" },
      { count: 90, date: "2021-09-22" },
      { count: 96, date: "2021-09-23" },
      { count: 100, date: "2021-09-24" },
      { count: 102, date: "2021-09-25"},
      { count: 110, date: "2021-09-26" },
      { count: 123, date: "2021-09-27" },
      { count: 100, date: "2021-09-28" },
      { count: 132, date: "2021-09-29" },
      { count: 146, date: "2021-09-30" },
      { count: 200, date: "2021-10-01" },
      { count: 180, date: "2021-10-02" },
      { count: 163, date: "2021-10-03" },
      { count: 110, date: "2021-10-04" },
      { count: 80, date: "2021-10-05" },
      { count: 82, date: "2021-10-06" },
      { count: 70, date: "2021-10-07" },
      { count: 65, date: "2021-10-08" },
      { count: 54, date: "2021-10-09" },
      { count: 40, date: "2021-10-10" },
      { count: 45, date: "2021-10-11" },
      { count: 38, date: "2021-10-12" },
    ];

    let aCount = [];
    let aDate = [];

    for (var i = 0; i < aList_all.length; i++) {
      aCount.push(aList_all[i].count);
      aDate.push(aList_all[i].date);
    }

    oChart.setOption({
      title: {
        text: "每日新增文章数",
        left: "center",
        top: "10",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["新增文章"],
        top: "40",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          name: "日",
          type: "category",
          boundaryGap: false,
          data: aDate,
        },
      ],
      yAxis: [
        {
          name: "每日新增文章数",
          type: "value",
        },
      ],
      series: [
        {
          name: "新增文章",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: { areaStyle: { type: "default" }, color: "#f80" },
            lineStyle: { color: "#f80" },
          },
          data: aCount,
        },
      ],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255,136,0,0.39)",
            },
            {
              offset: 0.34,
              color: "rgba(255,180,0,0.25)",
            },
            {
              offset: 1,
              color: "rgba(255,222,0,0.00)",
            },
          ]),
        },
      },
      grid: {
        show: true,
        x: 50,
        x2: 50,
        y: 80,
        height: 220,
      },
    });

    var oPie = echarts.init(document.getElementById("pieshow"));
    var oPieopt = {
      title: {
        top: 10,
        text: "分类文章数量比",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      color: ["#5885e8", "#13cfd5", "#00ce68", "#ff9565"],
      legend: {
        x: "center",
        top: 65,
        data: ["奇趣事", "会生活", "爱旅行", "趣美味"],
      },
      toolbox: {
        show: true,
        x: "center",
        top: 35,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ["pie", "funnel"],
            option: {
              funnel: {
                x: "25%",
                width: "50%",
                funnelAlign: "left",
                max: 1548,
              },
            },
          },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["45%", "60%"],
          center: ["50%", "65%"],
          data: [
            { value: 300, name: "奇趣事" },
            { value: 100, name: "会生活" },
            { value: 260, name: "爱旅行" },
            { value: 180, name: "趣美味" },
          ],
        },
      ],
    };
    oPie.setOption(oPieopt);


  },
  data() {
    return {
      dataList: [
        {
          num: 6123,
          title: "总文章数(篇)",
        },
        {
          num: 125,
          title: "日新增文章数(篇)",
        },
        {
          num: 31234,
          title: "评论总数(条)",
        },
        {
          num: 350,
          title: "日新增评论数(条)",
        },
      ],
      //   header数字部分颜色列表
      cList: ["c1", "c2", "c3", "c4"],
    };
  },
};
</script>
<style lang="less" scoped>
// header数字部分颜色
.c1 {
  color: rgb(252, 74, 133);
}
.c2 {
  color: rgb(72, 189, 173);
}
.c3 {
  color: rgb(196, 73, 201);
}
.c4 {
  color: rgb(62, 185, 233);
}
.page {
  .el-card {
    margin-top: 20px;
    height: 650px;
    #header {
      width: 100%;
      height: 500px;
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      .el-card {
        display: inline-flex;
        width: 200px;
        height: 100px;
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 50px;
        font-size: 58px;
      }
      .el-tag {
        width: 202px;
        text-align: center;
        margin-left: 50px;
        margin-top: -185px;
        font-size: 16px;
      }
    }
    .main{
        display: flex;
        #curshow {
      margin-top: -300px;
      width: 50%;
      height: 400px;
    }
    #pieshow {
      margin-top: -304px;
      width: 50%;
      height: 330px;
      margin-left: 110px;
    }
    }
    
  }
}
</style>