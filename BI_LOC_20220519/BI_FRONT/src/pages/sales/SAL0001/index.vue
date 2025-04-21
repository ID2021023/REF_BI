<template>
  <div class="wrap">
    <!-- side menu -->
    <div class="layout_drawer" :class="{on: drawer}">
      <h1 class="tit_drawer teamSelector" @click="toMain"><img src="@/assets/images/img_logo.png" alt="sisun" /></h1>
      <side-menu @click="drawer = !drawer"></side-menu>
    </div>

    <!-- drawer button -->
    <div role="button" class="btn_drawer" @click.stop="drawer = !drawer">
      <i v-show="!drawer" class="material-icons">menu</i>
      <i v-show="drawer" class="material-icons">arrow_back_ios</i>
    </div>
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <!-- tabs -->
        <div class="toggle_group">
          <label
            class="tg_btn"
            v-for="data in CODECardsList"
            :class="{'is-checked': CODETab == data.MCODE}"
            :key="data.MCODE"
          >
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              style="display:none"
              :value="data.MCODE"
              v-model="CODETab"
              @click="changeCODE(data.MCODE)"
              :disabled="!data.VISIBLE"
            >
            <span class="btn_n txt_label">{{data.CODNM}}</span>
          </label>
        </div>
        <h2 class="layout_title">
          <small class="txt_date point_col1">
            ~ {{ date }}
          </small>
        </h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- groups --> 
        <div class="groups">
          <!-- date -->
          <div class="input_group input_icon_group" style="width:210px;">
            <form action="#">
              <label class="btn_icon_nl" for="date">
                <i class="material-icons">calendar_today</i>
              </label>
              <div class="input_text" type="text" id="date">
                <date-pick
                    v-model="date"
                    @input="changeDate"
                    startWeekOnSunday
                    :inputAttributes="{readonly: true}"
                  ></date-pick>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="content">
        <div class="list_box">
          <ul class="list_card">
            <li>
              <!-- card_ -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당년 매출합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj" v-if="CODETab == 1">{{Math.round((Number(dr_H.Y_SAMT)+Number(dr_H.Y_ADVDEPAMT))/1000000) | currency}}<small class="txt">백만원</small></strong>
                  <strong class="em_obj" v-else>{{Math.round(Number(dr_H.Y_SAMT)/1000000) | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{Math.round(Number(dr_H.Y_GAMT)/1000000) | currency}}</dd>
                    <dt class="tit" v-if="(CODETab == '1') || (CODETab == 'MI')">선수금</dt>
                    <dd class="txt" v-if="(CODETab == '1') || (CODETab == 'MI')">{{Math.round(Number(dr_H.Y_ADVDEPAMT)/1000000) | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_ -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당월 매출합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj" v-if="CODETab == 1">{{Math.round((Number(dr_H.M_SAMT)+Number(dr_H.M_ADVDEPAMT))/1000000) | currency}}<small class="txt">백만원</small></strong>
                  <strong class="em_obj" v-else>{{Math.round(Number(dr_H.M_SAMT)/1000000) | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{Math.round(Number(dr_H.M_GAMT)/1000000) | currency}}</dd>
                    <dt class="tit" v-if="(CODETab == '1') || (CODETab == 'MI')">선수금</dt>
                    <dd class="txt" v-if="(CODETab == '1') || (CODETab == 'MI')">{{Math.round(Number(dr_H.M_ADVDEPAMT)/1000000) | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_ -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">월평균 할인율</h4><small class="txt_box">(1-(당월 판매금액/TAG금액) * 100)</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{monthDiscountAverage | nanToDot}}<small class="txt">%</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">판매금액</dt>
                    <dd class="txt">{{Math.round(Number(this.dr_H.M_SAMT)/1000000) | currency}}</dd>
                    <dt class="tit">TAG금액</dt>
                    <dd class="txt">{{Math.round(Number(this.dr_H.M_TTAGPRI)/1000000) | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_ -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">매출 총 이익(추정치)</h4><small class="txt_box">(매출액 - 사전원가 * 1.15)</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round(Number(dr_H.M_PROFIT)/1000000) | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">전월실적</dt>
                    <dd class="txt">{{Math.round(Number(dr_H.M_LMPROFIT)/1000000) | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="row">
          <div class="col_md_6">
            <div class="cont_box">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{on: salesTab == 0}"><a href="javascript:void(0);" @click="chageSalesTab(0)">연매출추이</a></li>
                    <li :class="{on: salesTab == 1}"><a href="javascript:void(0);" @click="chageSalesTab(1)">월매출추이</a></li>
                  </ul>
                </div>
              </div>
              <div class="cont">
                <div class="graph_area">
                  <div class="graph_view">
                    <!-- 그래프 -->
                    <div class="graph" style="max-width:870px; height:400px;">
                      <div id="chartdiv1" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_6">
            <div class="cont_box">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{on: discountTab == 0}"><a href="javascript:void(0);" @click="chageDiscountTab(0)">평균할인율 추이</a></li>
                    <li :class="{on: discountTab == 1}"><a href="javascript:void(0);" @click="chageDiscountTab(1)">매출 총 이익(추정치) 추이</a></li>
                  </ul>
                </div>
              </div>
              <div class="cont">
                <div class="graph_area">
                  <div class="graph_view">
                    <!-- 그래프 -->
                    <div class="graph" style="max-width:870px; height:400px;">
                      <div id="chartdiv2" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_6">
            <a href="javascript:void(0);" @click="link('/NewStyleMain')" class="btn_n btn_primary btn_xl btn_icon_txt btn_flex tl">
              <span class="txt_thin"><i class="material-icons">local_offer</i>스타일 바로가기</span>
              <div class="layout_spacer"></div>
              <i class="material-icons">arrow_forward_ios</i>
            </a>
          </div>
          <div class="col_md_6">
            <a href="javascript:void(0);" @click="link('/StoreMain')" class="btn_n btn_primary btn_xl btn_icon_txt btn_flex tl">
              <span class="txt_thin"><i class="material-icons">store</i>매장 바로가기</span>
              <div class="layout_spacer"></div>
              <i class="material-icons">arrow_forward_ios</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"
import sideMenu from '@/components/sideMenu'

export default {
  name: "SAL0001",
  components: {
    datePick,
    sideMenu
  },
  mounted() {
    this.getData()
  },
  created() {
    this.date = moment().subtract(1, "days").format("YYYY-MM-DD");
    this.CODETab = this.authCodeList[0].MCODE
    this.getMakeDataDate()
    // this.getData();
  },
  data() {
    return {
      date: null,
      drawer: null,
      CODETab: 0,
      salesTab: 0,
      discountTab: 0,
      dr_H: { Y_SAMT: 0, Y_GAMT: 0, M_SAMT: 0, M_GAMT: 0, M_TTAGPRI: 0, M_PROFIT: 0, M_LMPROFIT: 0 },
      dr_C_1: [],
      dr_C_2: [],
      dr_S_1: [],
      dr_S_2: [],
      makeDataDate: null
    };
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
      let SALList = this.$store.getters.getSALList
      for(var i=0; i<SALList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:SALList[i].MCODE})
        if (data) {
          SALList[i].VISIBLE = true
        } else {
          SALList[i].VISIBLE = false
        }
      }
      return SALList
    },
    isTabTypeSU() {
      return this.$store.getters.getSALList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getSALList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[1]
      }
      return this.$store.getters.getAuthBRCDCode[1]
    },
    monthDiscountAverage() {
      return Math.round((1 - Number(this.dr_H.M_SAMT)/Number(this.dr_H.M_TTAGPRI)) * 100)
    }
  },
  methods: {
    getData() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      this.getTotalSalesData()
      this.getChart1Data()
      this.getChart2Data()
    },
    getChart1Data() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      this.getYearSalesData()
      this.getMonthSalesData()
    },
    getChart2Data() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      this.getMonthDiscountData()
      this.getMonthTotalSalesData()
    },
    getMakeDataDate(){
      this.req2svr.getMakeDataDate().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.makeDataDate = res.CREATEDATE;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getTotalSalesData() {
      this.dr_H = { Y_SAMT: 0, Y_GAMT: 0, M_SAMT: 0, M_GAMT: 0, M_TTAGPRI: 0, M_PROFIT: 0, M_LMPROFIT: 0 }

      this.req2svr.getTotalSalesData(this.date, this.tabType, this.CODETab).then(
        res => {
          this.dr_H = { Y_SAMT: 0, Y_GAMT: 0, M_SAMT: 0, M_GAMT: 0, M_TTAGPRI: 0, M_PROFIT: 0, M_LMPROFIT: 0 }
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.dr_H = res
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getYearSalesData() {
      this.dr_C_1 = []
      this.makeChart()

      this.req2svr.getYearSalesData(this.date, this.tabType, this.CODETab).then(
        res => {
          this.dr_C_1 = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length
            if (count <= 1) {
              this.dr_C_1.push({
                SALEDT: res.SALEDT.slice(2,4) + "/" + res.SALEDT.slice(4,6) + "월",
                VALUE1: Math.round(Number(res.LTSAMT)/1000000),
                VALUE2: Math.round(Number(res.GAMT)/1000000),
                VALUE3: Math.round((Number(res.TSAMT)+Number(res.ADVDEPAMT))/1000000)
              })
            } else {
              let list = []
              let count = (JSON.stringify(res).match(/{/g) || []).length;
              if(count < 1) {
              } else if(count == 1) {
                list.push(res);
              } else {
                list = JSON.parse("[" + res + "]")
              }
              for (let i=0;i<list.length;i++) {
                this.dr_C_1.push({
                  SALEDT: (i == 0 ? list[i].SALEDT.slice(2,4) + "/" : "") + list[i].SALEDT.slice(4,6) + "월",
                  VALUE1: Math.round(Number(list[i].LTSAMT)/1000000),
                  VALUE2: Math.round(Number(list[i].GAMT)/1000000),
                  VALUE3: Math.round((Number(list[i].TSAMT)+Number(list[i].ADVDEPAMT))/1000000)
                })
              }
            }
          }
          this.makeChart()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMonthSalesData() {
      this.dr_C_2 = []
      this.makeChart()

      this.req2svr.getMonthSalesData(this.date, this.tabType, this.CODETab).then(
        res => {
          this.dr_C_2 = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length
            if (count <= 1) {
              this.dr_C_2.push({
                SALEDT: res.SALEDT.slice(4,6) + "/" + res.SALEDT.slice(6,8),
                VALUE1: Math.round(Number(res.LTSAMT)/1000000),
                VALUE2: Math.round(Number(res.GAMT)/1000000),
                VALUE3: Math.round((Number(res.TSAMT)+Number(res.ADVDEPAMT))/1000000)
              })
            } else {
              let list = []
              let count = (JSON.stringify(res).match(/{/g) || []).length;
              if(count < 1) {
              } else if(count == 1) {
                list.push(res);
              } else {
                list = JSON.parse("[" + res + "]")
              }
              for (let i=0;i<list.length;i++) {
                this.dr_C_2.push({
                  SALEDT: (i == 0 ? list[i].SALEDT.slice(4,6) + "/" : "") + list[i].SALEDT.slice(6,8),
                  VALUE1: Math.round(Number(list[i].LTSAMT)/1000000),
                  VALUE2: Math.round(Number(list[i].GAMT)/1000000),
                  VALUE3: Math.round((Number(list[i].TSAMT)+Number(list[i].ADVDEPAMT))/1000000)
                })
              }
            }
          }
          this.makeChart()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMonthDiscountData() {
      this.dr_S_1 = []
      this.makeChart2()

      this.req2svr.getMonthDiscountData(this.date, this.tabType, this.CODETab).then(
        res => {
          this.dr_S_1 = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length
            if (count <= 1) {
              this.dr_S_1.push({
                SALEDT: res.SALEDT.slice(2,4) + "/" + res.SALEDT.slice(4,6) + "월",
                VALUE1: Math.round(((Number(res.TTAGPRI)-Number(res.TSAMT))/Number(res.TTAGPRI)) * 100),
                VALUE2: Math.round(((Number(res.LTTAGPRI)-Number(res.LTSAMT))/Number(res.LTTAGPRI)) * 100),
              })
            } else {
              let list = []
              let count = (JSON.stringify(res).match(/{/g) || []).length;
              if(count < 1) {
              } else if(count == 1) {
                list.push(res);
              } else {
                list = JSON.parse("[" + res + "]")
              }
              for (let i=0;i<list.length;i++) {
                this.dr_S_1.push({
                  SALEDT: (i == 0 ? list[i].SALEDT.slice(2,4) + "/" : "") + list[i].SALEDT.slice(4,6) + "월",
                  VALUE1: Math.round(((Number(list[i].TTAGPRI)-Number(list[i].TSAMT))/Number(list[i].TTAGPRI)) * 100),
                  VALUE2: Math.round(((Number(list[i].LTTAGPRI)-Number(list[i].LTSAMT))/Number(list[i].LTTAGPRI)) * 100),
                })
              }
            }
          }
          this.makeChart2()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMonthTotalSalesData() {
      this.dr_S_2 = []
      this.makeChart2()

      this.req2svr.getMonthTotalSalesData(this.date, this.tabType, this.CODETab).then(
        res => {
          this.dr_S_2 = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length
            if (count <= 1) {
              this.dr_S_2.push({
                SALEDT: res.SALEDT.slice(2,4) + "/" + res.SALEDT.slice(4,6) + "월",
                VALUE1: Math.round(Number(res.PROFIT)/1000000),
                VALUE2: Math.round(Number(res.LPROFIT)/1000000)
              })
            } else {
              let list = []
              let count = (JSON.stringify(res).match(/{/g) || []).length;
              if(count < 1) {
              } else if(count == 1) {
                list.push(res);
              } else {
                list = JSON.parse("[" + res + "]")
              }
              for (let i=0;i<list.length;i++) {
                this.dr_S_2.push({
                  SALEDT: (i == 0 ? list[i].SALEDT.slice(2,4) + "/" : "") + list[i].SALEDT.slice(4,6) + "월",
                  VALUE1: Math.round(Number(list[i].PROFIT)/1000000),
                  VALUE2: Math.round(Number(list[i].LPROFIT)/1000000),
                })
              }
            }
          }
          this.makeChart2()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    changeDate() {
      this.getData()
    },
    changeCODE(val) {
      this.CODETab = val
      this.getData()
    },
    chageSalesTab(val) {
      this.salesTab = val
      this.makeChart()
    },
    chageDiscountTab(val) {
      this.discountTab = val
      this.makeChart2()
    },
    makeChart(val) {
      // var data = val;
      let title = ["작년동기 월별(백만원)", "월별 목표(백만원)", "월별 실적(백만원)"]
      let data = this.dr_C_1
      if (this.salesTab == 1) {
        title = ["작년동기 일별(백만원)", "일별 목표(백만원)", "일별 실적(백만원)"]
        data = this.dr_C_2
      }

      AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#bd7adf", "#bababa", "#3f93f5"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: true,
          fontSize: 14
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: title[0] + " : [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 0.99,
            title: title[0],
            valueField: "VALUE1",
            markerType: "circle"
          },
          {
            balloonText: title[1] + " : [[value]]",
            fillAlphas: 0,
            fontSize: 0,
            id: "AmGraph-2",
            title: title[1],
            valueField: "VALUE2",
            markerType: "circle"
          },
          {
            balloonText: title[2] + " : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            id: "AmGraph-3",
            title: title[2],
            valueField: "VALUE3",
            markerType: "circle"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: false,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 18,
          position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    makeChart2(val) {
      // var data = val;
      let title = ["작년동기 월별 평균할인율(%)", "월별 평균할인율(%)"]
      let data = this.dr_S_1
      if (this.discountTab == 1) {
        title = ["작년동기 월별 매출 총 이익(백만원)", "월별 매출 총 이익(백만원)"]
        data = this.dr_S_2
      }

      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#bd7adf", "#3f93f5"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: true,
          fontSize: 14
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: title[0] + " : [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 0.99,
            title: title[0],
            valueField: "VALUE2",
            markerType: "circle"
          },
          {
            balloonText: title[1] + " : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            id: "AmGraph-2",
            title: title[1],
            valueField: "VALUE1",
            markerType: "circle"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: false,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 18,
          position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    toMain() {
      this.$router.replace("/")
    },
    link(val) {
      this.$router.push(val)
    }
  },
  filters: {
    currency: function(value) {
      var x
      if (value) {
        x = value.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      } else {
        x = 0
      }
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    },
    nanToDot: function(value) {
      let x = value ? value : 0;
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x
    }
  }
};
</script>