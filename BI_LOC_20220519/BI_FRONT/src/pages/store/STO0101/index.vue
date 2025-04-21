<template>
  <!-- 팝업용 레이아웃 클래스 : popup_layout -->
  <div class="wrap popup_layout">
    <!-- popup close button -->
    <div class="btn_pop_close" role="button" @click="close()"><i class="material-icons">close</i></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <!-- Title -->
        <h2 class="layout_title">{{ SelectCodeName }} {{ storeName }}</h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- groups -->
        <div class="groups">
          <div class="toggle_group tg_sty01">
            <label class="tg_btn">
              <input
                type="radio"
                id="option-d"
                class="tg_radio"
                name="select"
                :value="1"
                v-model="choice"
                checked="checked"
                @click="selectType(1)"
              />
              <span class="btn_n txt_label">일간</span>
            </label>
            <label class="tg_btn is-checked">
              <input
                type="radio"
                id="option-m"
                class="tg_radio"
                name="select"
                :value="2"
                v-model="choice"
                @click="selectType(2)"
              />
              <span class="btn_n txt_label">월간</span>
            </label>
            <label class="tg_btn">
              <input
                type="radio"
                id="option-a"
                class="tg_radio"
                name="select"
                :value="3"
                v-model="choice"
                @click="selectType(3)"
              />
              <span class="btn_n txt_label">누적</span>
            </label>
          </div>
          <!-- date -->
          <div v-show="choice == 1" class="input_group input_icon_group" style="width:210px;">
            <form action="#">
              <label class="btn_icon_nl" for="date">
                <i class="material-icons">calendar_today</i>
              </label>
              <div class="input_text" type="text" id="date">
                <date-pick
                  v-model="date"
                  @input="chageDate"
                  startWeekOnSunday
                  :inputAttributes="{readonly: true}"
                ></date-pick>
              </div>
            </form>
          </div>
          <!-- select -->
          <div v-show="choice == 2 || choice == 3" class="select_box" style="min-width:150px;">
            <select class="select" v-model="year" @change="chageDate">
              <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
            </select>
          </div>
          <!-- select -->
          <div v-show="choice == 2" class="select_box" style="min-width:90px;">
            <select class="select" v-model="month" @change="chageDate">
              <option v-for="data in m_options" :key="data" :value="data">{{ data }}월</option>
            </select>
          </div>
          <!-- select -->
          <!-- <div class="select_box" style="min-width:200px;">
            <select class="select" v-model="store" @change="chageStore">
              <option v-for="data in storeList" :key="data.RN" :value="data.VDCD">{{ data.VDSNM }}</option>
            </select>
          </div> -->
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <!-- 매출합계 박스 -->
        <div class="list_box">
          <!-- 계산 카드 리스트 -->
          <ul class="list_card">
            <li>
              <!-- card_ -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당월 매출 합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round( (Number(dr_H.TSAMT) + Number(dr_H.ADVDEPAMT) ) / 1000000) | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{Math.round(Number(dr_H.GAMT)/1000000) | currency}}</dd>
                    <dt class="tit" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !data.selectStoreSU) || (data.selectStoreSU == '1')">선수금</dt>
                    <dd class="txt" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !data.selectStoreSU) || (data.selectStoreSU == '1')">{{Math.round(Number(dr_H.ADVDEPAMT)/1000000) | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당월 매출 달성률</h4><small class="txt_box">(당월 매출합계/목표금액) * 100</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{Math.round(rate(Number(dr_H.TSAMT)+Number(dr_H.ADVDEPAMT), dr_H.GAMT)) | nanToDot}}<small class="txt2">%</small>
                    <!-- 초과-->
                    <span
                      class="chip round_chip success"
                      v-if="Math.round(rate(Number(dr_H.TSAMT)+Number(dr_H.ADVDEPAMT), dr_H.GAMT)) >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span
                      class="chip round_chip warning"
                      v-else-if="Math.round(rate(Number(dr_H.TSAMT)+Number(dr_H.ADVDEPAMT), dr_H.GAMT)) >= 95 && Math.round(rate(Number(dr_H.TSAMT)+Number(dr_H.ADVDEPAMT), dr_H.GAMT)) <= 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span
                      class="chip round_chip danger"
                      v-else-if="Math.round(rate(Number(dr_H.TSAMT)+Number(dr_H.ADVDEPAMT), dr_H.GAMT)) < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                    <!-- 달성중 -->
                    <span class="chip round_chip primary" v-else>
                      <span class="chip_text">달성중</span>
                    </span>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">재고회전율</h4><small class="txt_box">(판매수량/공급수량) * 100)</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round((Number(dr_H.TQTY)/Number(dr_H.INQTY)) * 100) | nanToDot}}<small class="txt2">%</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">공급</dt>
                    <dd class="txt">{{dr_H.INQTY | currency}}</dd>
                    <dt class="tit">판매</dt>
                    <dd class="txt">{{dr_H.TQTY | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">월평균 할인율</h4><small class="txt_box">(1-(제품 매출금액/TAG금액) * 100)</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round((1 - Number(dr_H.TSAMT)/Number(dr_H.TTAGPRI)) * 100) | nanToDot}}<small class="txt2">%</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">TAG금액</dt>
                    <dd class="txt">{{Math.round(Number(dr_H.TTAGPRI)/1000000) | currency}}</dd>
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
                    <li :class="{on: salesTab == 0}"><a href="javascript:void(0);" @click="chageSalesTab(0)">{{month}}월 매출비교</a></li>
                    <li :class="{on: salesTab == 1}"><a href="javascript:void(0);" @click="chageSalesTab(1)">매출추이</a></li>
                  </ul>
                </div>
              </div>
                <div class="cont" style="min-height:440px;" v-show="salesTab == 0">
                  <div class="graph_area">
                    <!-- 그래프 1 -->
                    <div class="graph_view" style="width:50%;">
                      <!-- 텍스트 값 -->
                      <div class="graph_result gr_s">
                        <span class="point_col1">매출액 비교(백만원)</span>
                      </div>
                      <!-- 그래프 -->
                      <div class="graph" style="max-width:340px; height:280px;">
                        <div id="STO0101_chartdiv1" style="position:relative; width:100%; height:100%; float:left;"></div>
                      </div>
                      <!-- 카테고리 -->
                      <div class="graph_category">
                        <ul>
                          <li><span class="ico_dot" style="background-color:#c3c3c3;"></span>목표 매출액</li>
                          <li><span class="ico_dot" style="background-color:#3f93f5;"></span>매출실적</li>
                        </ul>
                      </div>
                    </div>
                    <!-- 그래프 2 -->
                    <div class="graph_view" style="width:50%;">
                      <!-- 텍스트 값 -->
                      <div class="graph_result gr_s">
                        <span class="point_col8">달성률 (%)</span>
                      </div>
                      <!-- 그래프 -->
                      <div class="graph" style="max-width:280px; height:280px;">
                        <div id="STO0101_chartdiv2" style="position:relative; width:100%; height:100%; float:left;"></div>
                      </div>
                      <!-- 카테고리 -->
                      <div class="graph_category">
                        <ul>
                          <li><span class="ico_dot" style="background-color:#1bcc98;"></span>달성률</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>   
                <div class="cont" v-show="salesTab == 1">
                  <div class="graph_area">
                    <div class="graph_view">
                      <!-- 그래프 -->
                      <div class="graph" style="max-width:870px; height:400px;">
                        <div id="STO0101_chartdiv3" style="position:relative; width:100%; height:100%; float:left;"></div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          <div class="col_md_6">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">매출분석</strong>
              </div>
              <div class="cont">
                <div class="row">
                  <div class="col_md_6">
                    <div class="graph_area">
                      <div class="graph_view">
                        <!-- 텍스트 값 -->
                        <div class="graph_result">
                          <dl>
                            <dt class="tit">금액 (백만원)</dt>
                            <dd class="txt_result txt_s">{{Math.round(salesTotal/1000000) | currency}}</dd>
                            <dd class="txt_etc" v-if="selectedCODE == '1'">
                              <span class="chip chip_m box_chip chip_sty01">
                                <span class="chip_text">선수금</span>
                              </span>
                              <em class="point_col5">{{Math.round(Number(dr_C.ADVDEPAMT)/1000000) | currency}} 백만원</em>
                            </dd>
                          </dl>
                        </div>
                        <div class="graph">
                          <div style="position:relative; width:100%; height:170px; float:left;">
                            <div id="STO0101_chartdiv4" style="position:relative; width:100%; height:100%;"></div>
                          </div>
                        </div>
                        <!-- 카테고리 -->
                        <div class="graph_category">
                          <ul>
                            <li><span class="ico_dot" style="background-color:#3f93f5;"></span>정상매출</li>
                            <li><span class="ico_dot" style="background-color:#ff7f92;"></span>할인</li>
                            <li><span class="ico_dot" style="background-color:#ffb83c;"></span>균일</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col_md_6 flex_c">
                    <div class="graph_view">
                    <div class="graph_cont">
                      <span class="view">
                        <span class="tit">재고회전율</span>
                        <span class="txt_num">{{Math.round((Number(dr_H.TQTY)/Number(dr_H.INQTY)) * 100) | nanToDot}}<small>%</small></span>
                      </span>
                      <strong class="graph line_bar">
                        <!-- <span class="bar bar_sty01" :style="{width:((Number(dr_H.TQTY)/Number(dr_H.INQTY)) * 100) +'%'}"></span> -->
                        <span v-show="dr_H.TQTY >= 0" class="bar bar_sty01" :style="{width:nanToZero(rate(dr_H.TQTY, dr_H.INQTY)) +'%'}"></span>
                        <span v-show="dr_H.TQTY < 0" class="bar bar_sty01" style="width: 0%;"></span>
                      </strong>
                    </div>
                    <div class="graph_cont">
                      <span class="view">
                        <span class="tit">평균할인율</span>
                        <span class="txt_num">{{Math.round((1 - (Number(dr_H.TSAMT))/Number(dr_H.TTAGPRI)) * 100) | nanToDot}}<small>%</small></span>
                      </span>
                      <strong class="graph line_bar">
                        <!-- <span class="bar bar_sty02" :style="{width:((Number(dr_H.TSAMT))/Number(dr_H.TTAGPRI) * 100) +'%'}"></span> -->
                        <span v-show="dr_H.TSAMT >= 0" class="bar bar_sty02" :style="{width:nanToZero(Math.round((1 - (Number(dr_H.TSAMT))/Number(dr_H.TTAGPRI)) * 100)) +'%'}"></span>
                        <span v-show="dr_H.TSAMT < 0" class="bar bar_sty02" style="width: 0%;"></span>
                      </strong>
                    </div>
                    <div class="graph_cont">                      
                      <span class="view">
                        <span class="tit">반품률</span>
                        <span class="txt_num">{{Math.round(Math.abs(Number(dr_H.RQTY))/Number(dr_H.SQTY) * 100) | currency}}<small>%</small></span>
                      </span>
                      <strong class="graph line_bar">
                        <span class="bar bar_sty03" :style="{width:nanToZero(rate(Math.abs(dr_H.RQTY), dr_H.SQTY)) +'%'}"></span>
                      </strong>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default {
  name: "STO0101",
  components: {
    datePick
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.initData()  
    this.loadData()
  },
  data() {
    return {
      store: 0,
      storeName: "",
      y_options: [],
      m_options: [],
      selectedCODE: null,
      choice: 2,
      salesTab: 0,
      year: "",
      month: "",
      date: "",
      age_sort_type: 1,
      dr_H: {},
      // 매출비교
      dr_S: {VDCD: "", LTSAMT: 0, LMTSAMT: 0, TSAMT: 0, LGAMT: 0, LMGAMT: 0, GAMT: 0, ADVDEPAMT: 0},
      // 매출추이
      dr_P: [{ SALEMM: 0, LTSAMT: 0, TSAMT: 0 }],
      // 매출분석
      dr_C: {},
      makeDataDate: null
    }
  },
  computed: {
    req2svr: () => req2svr,
    salesTotal() {
      return Number(this.dr_C.SJAMT) + Number(this.dr_C.SDCAMT) + Number(this.dr_C.SGAMT) + Number(this.dr_C.RJAMT) + Number(this.dr_C.RDCAMT) + Number(this.dr_C.RGAMT) + Number(this.dr_C.ADVDEPAMT)
    },
    SelectCodeName() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getSUCDCODNM(this.selectedCODE)
      } else {
        return this.$store.getters.getBRCDCODNM(this.selectedCODE)
      }
    },
    isTabTypeSU() {
      return this.$store.getters.getSTOList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getSTOList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
  },
  methods: {
    initData() {
      this.year = this.data.year
      this.month = this.data.month
      this.date = this.data.date
      this.storeList = this.data.storeList

      let year = moment().format("YYYY")
      for (let i = 0; i < 3; i++) {
        this.y_options[i] = year - i;
      }
      this.y_options = _.sortBy(this.y_options)

      for (let i = 0; i < 12; i++) {
        this.m_options[i] = 12 - i;
      }
      this.m_options = _.sortBy(this.m_options)
      
      this.selectedCODE = this.data.CODE
      this.store = this.data.VDCD
      this.storeName = _.find(this.storeList, { VDCD: this.store }).VDSNM
    },
    selectType(val) {
      if (val != 2) {
        this.$emit("changeSelectType", val)
        this.date = moment().format("YYYY-MM-DD")
        this.year = moment().format("YYYY")
        this.month = moment().format("M")
      }
    },
    chageDate() {
      this.loadData()
    },
    chageStore() {
      this.loadData()
    },
    chageSalesTab(val) {
      this.salesTab = val
      this.makeSalesLineChart()
    },
    loadData() {
      this.getMakeDataDate()
      this.getHeaderData()
      this.getSalesChartData()
      this.getSalesLineCharData()
      this.getSalesAnalysisData()
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
    getHeaderData() {
      this.req2svr.getHeaderData(this.tabType, this.selectedCODE, this.year, this.month, this.store).then(
        res => {
          this.dr_H = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_H = res
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesChartData() {
      this.req2svr.getSalesChartData(this.tabType, this.selectedCODE, this.year, this.month, this.store).then(
        res => {
          this.dr_S = {VDCD: "", LTSAMT: 0, LMTSAMT: 0, TSAMT: 0, LGAMT: 0, LMGAMT: 0, GAMT: 0}
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_S = res
          }
          this.makeSalesChart()
          this.makeSalesPercentChart()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesLineCharData() {
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }

      this.req2svr.getSalesLineCharData(this.tabType, this.selectedCODE, this.year, month, this.store).then(
        res => {
          this.dr_P = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
              this.dr_P = [{ SALEMM: 0, LTSAMT: 0, TSAMT: 0 }]
            } else if(count == 1) {
              list.push(res)
            } else {
              list = JSON.parse("[" + res + "]")
            }
            for (let i=0;i<list.length;i++) {
              this.dr_P.push({
                SALEMM: list[i].SALEMM,
                VALUE1: Math.round(Number(list[i].LTSAMT)/1000000),
                VALUE2: Math.round(Number(list[i].TSAMT)/1000000),
              })
            }
          }

          let today = moment().format("YYYYMM")
          if(today >= this.year + month){
            this.makeSalesLineChart()
          } else {
            this.dr_P = [{ SALEMM: 0, LTSAMT: 0, TSAMT: 0 }]
            this.makeSalesLineChart()
          }
          // this.makeSalesLineChart()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesAnalysisData() {
      this.req2svr.getSalesAnalysisData(this.tabType, this.selectedCODE, this.year, this.month, this.store).then(
        res => {
          this.dr_C = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C = res
          }
          this.makeSalesAnalysisChart()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeSalesLineChart() {
      let title = ["작년 동기 매출(백만원)", "월별 매출액(백만원)"]
      let data = this.dr_P

      AmCharts.makeChart("STO0101_chartdiv3", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEMM",
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
            balloonText: "작년 동기 매출(백만원) : [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 0.99,
            title: "작년 동기 매출(백만원)",
            valueField: "VALUE1",
            markerType: "circle"
          },
          {
            balloonText: "월별 매출액(백만원) : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            fontSize: 0,
            id: "AmGraph-2",
            title: "월별 매출액(백만원)",
            valueField: "VALUE2",
            markerType: "circle"
          },
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
          fontSize: 16,
          position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    makeSalesChart() {
      let data = [
        {category: "전년동월", value: Math.round(Number(this.dr_S.LTSAMT)/1000000), color: Number(this.dr_S.LTSAMT) < 0 ? "#fbccca" : "#c5defc"},
        {category: "전월", value: Math.round(Number(this.dr_S.LMTSAMT)/1000000), color: Number(this.dr_S.LMTSAMT) < 0 ? "#f79a95" : "#8cbef9"},
        {category: "당월목표", value: Math.round(Number(this.dr_S.GAMT)/1000000), color: Number(this.dr_S.GAMT) < 0 ? "#c2c2c3" : "#c2c2c3"},
        {category: "당월", value: Math.round((Number(this.dr_S.TSAMT)+Number(this.dr_S.ADVDEPAMT))/1000000), color: Number(this.dr_S.TSAMT)+Number(this.dr_S.ADVDEPAMT) < 0 ? "#f1574e" : "#3f93f5"}        
      ]

      AmCharts.makeChart("STO0101_chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 0,
        columnWidth: 0.45,
        startDuration: 0.7,
        fontSize: 16,
        categoryAxis: {
          autoGridCount: false,
          axisColor: "#AAB3B3",
          axisAlpha: 0,
          gridAlpha: 0,
          gridThickness: 0,
          titleBold: false
        },
        trendLines: [],
        graphs: [
          {
            colorField: "color",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            labelPosition: "top",
            lineColorField: "color",
            title: "graph 1",
            type: "column",
            valueField: "value",
            fontSize: 18,
            showAllValueLabels: true
          }
        ],
        valueAxes: [
          {
            stackType: "regular",
            id: "ValueAxis-1",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false
          }
        ],
        dataProvider: data
      })
    },
    makeSalesPercentChart() {
      let data = [
        { category: "전년동월", 
          // value: Math.round(this.rate((Number(this.dr_S.LGAMT)-Number(this.dr_S.LTSAMT)), Number(this.dr_S.LGAMT))),
          value: Math.round(this.rate(Number(this.dr_S.LTSAMT), Number(this.dr_S.LGAMT))),
          color: (this.rate(Number(this.dr_S.LTSAMT), Number(this.dr_S.LGAMT))) < 0 ? "#fbccca" : "#baf0e0"
        },
        { category: "전월",
          value: Math.round(this.rate(Number(this.dr_S.LMTSAMT), Number(this.dr_S.LMGAMT))),
          color: (this.rate(Number(this.dr_S.LMTSAMT), Number(this.dr_S.LMGAMT))) < 0 ? "#f79a95" : "#76e0c1"
        },
        { category: "당월",
          value: Math.round(this.rate(Number(this.dr_S.TSAMT)+Number(this.dr_S.ADVDEPAMT), Number(this.dr_S.GAMT))),
          color: (this.rate(Number(this.dr_S.TSAMT)+Number(this.dr_S.ADVDEPAMT), Number(this.dr_S.GAMT))) < 0 ? "#f1574e" : "#1bcc98"
        }
      ]

      AmCharts.makeChart("STO0101_chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 0,
        columnWidth: 0.45,
        startDuration: 0.7,
        fontSize: 16,
        categoryAxis: {
          autoGridCount: false,
          axisColor: "#AAB3B3",
          axisAlpha: 0,
          gridAlpha: 0,
          gridThickness: 0,
          titleBold: false
        },
        trendLines: [],
        graphs: [
          {
            colorField: "color",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            labelPosition: "top",
            lineColorField: "color",
            title: "graph 1",
            type: "column",
            valueField: "value",
            showAllValueLabels: true
          }
        ],
        valueAxes: [
          {
            stackType: "regular",
            id: "ValueAxis-1",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false
          }
        ],
        dataProvider: data
      })
    },
    makeSalesAnalysisChart() {
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: "판매", 
          JAMT_T: "정상", JAMT: Math.round(this.dr_C.SJAMT/1000000),
          DCAMT_T: "할인", DCAMT: Math.round(this.dr_C.SDCAMT/1000000),
          GAMT_T: "균일", GAMT: Math.round(this.dr_C.SGAMT/1000000)
        },
        { category: "반품", 
          JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_C.RJAMT/1000000)),
          DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_C.RDCAMT/1000000)),
          GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_C.RGAMT/1000000))
        },
      ]

      var chart = AmCharts.makeChart("STO0101_chartdiv4", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
        columnWidth: 0.52,
        startDuration: 1,
        fontSize: 18,
        marginRight: 100,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JAMT",
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCAMT",
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GAMT",
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            stackType: "regular",
            autoGridCount: false,
            axisAlpha: 0,
            axisThickness: 0,
            gridColor: "#e0f6fd",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false,
            titleRotation: 0,
            totalText: "[[total]]"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    close() {
      this.$emit("close")
    },
    rate(value, target) {
      let v = Number(value)
      let t = Number(target)
      if (t < 0) {
        return (1 + ((v-t)/Math.abs(t)))*100
      } else {
        return (v/t)*100
      }
    },
    nanToZero: function(value) {
      let x = value ? value : 0
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY) {
        x = 0
      }
      if (x == "NaN") {
        x = 0
      }
      return x
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
}
</script>