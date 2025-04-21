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
        <!-- Title button -->
        <!-- <button type="button" class="btn_n btn_icon btn_prev" @click="prev">
          <i class="material-icons">arrow_back_ios</i>
        </button> -->
        <!-- Title -->
        <h2 class="layout_title">디지털커머스 월매출현황<small class="txt_date"><strong class="point_col1">{{ startdate }} ~ {{ enddate }}</strong></small></h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ DATAST }}</small></div>
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
                    v-model="selectDate"
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
              <!-- card_당월 영업이익B 합계 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당월 매출 합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ Math.round(dr_H.SAMT/1000000) | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">누계목표</dt>
                    <dd class="txt">{{ Math.round(dr_H.PLNAMT/1000000) | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당월목표</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ Math.round(dr_H.TOTPLNAMT/1000000) | currency }}<small class="txt">백만원</small>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당월 매출 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">누계목표대비 달성률</h4><small class="txt_box">(당월매출/당월목표) * 100</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ dr_H.ACC_RATE }}<small class="txt2">%</small>
                    <!-- 초과-->
                    <span class="chip round_chip success"
                      v-if="dr_H.ACC_RATE >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span class="chip round_chip warning"
                      v-if="dr_H.ACC_RATE >= 95 &&  dr_H.ACC_RATE < 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span class="chip round_chip danger"
                      v-if="dr_H.ACC_RATE < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당월 영업이익B 합계 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">전년동기대비 신장률</h4><small class="txt_box">((당월매출-전년동기매출)/전년동기매출) * 100</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ dr_H.UP_RATE | currency }}<small class="txt2">%</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">전년동기</dt>
                    <dd class="txt">{{ Math.round(dr_H.LYSAMT/1000000) | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cont_head">
          <!-- tabs -->
          <div class="toggle_group">
            <label class="tg_btn" :class="{'is-checked': gubun == 1}">
              <input
                type="radio"
                id="option-1"
                class="tg_radio"
                name="options"
                :value="1"
                v-model="gubun"
                style="display:none"
              >
              <span class="btn_n txt_label" @click="changeGubun(1)">사업부</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': gubun == 2}">
              <input
                type="radio"
                id="option-2"
                class="tg_radio"
                name="options"
                :value="2"
                v-model="gubun"
                style="display:none"
              >
              <span class="btn_n txt_label" @click="changeGubun(2)">온라인몰</span>
            </label>
          </div>
          <div class="layout_spacer"></div>
          <small class="txt_s">(단위 : 천원)</small>
        </div>

        <div class="list_box lb_sty02" v-show="gubun == 1">
          <ul class="list_card">
            <li v-for="(data , index) in dr_S" :key="index" class="teamSelector" @click="toDetail(data.MAINGU, data.CODNM)">
              <!-- card_MI 사업부 -->
              <div class="card card_shadow">
                <div class="card_title">
                  <h4 class="card_title_text">{{ data.CODNM }}</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ Math.round(data.SAMT/1000) | currency }}<small class="txt">천원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">누계목표</dt>
                    <dd class="txt">{{ Math.round(data.PLNAMT/1000) | currency }}</dd>
                  </dl>
                  <!-- 그래프 -->
                  <div class="graph" style="height: 250px;">
                    <div :id="'chartdiv'+index" style="position: relative; width: 100%; height: 100%;"></div>
                  </div>
                </div>
                <div class="card_box">
                  <div class="list_box_s">
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit">누계목표대비 달성률</dt>
                        <dd class="txt">
                          <strong class="txt_s">{{ data.ACC_RATE | nanToDot }}</strong><span class="txt_s">%</span>
                        </dd>
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span v-show="data.ACC_RATE >= 0" class="bar" :style="{width:nanToDot(data.ACC_RATE) +'%'}"></span>
                        <span v-show="data.ACC_RATE < 0" class="bar" style="width: 0%;"></span>
                      </strong>
                    </div>
                      <div class="view">
                      <dl class="list_var">
                        <dt class="tit">전년대비 신장률</dt>
                        <dd class="txt">
                          <strong class="txt_s">{{ data.UP_RATE | nanToDot }}</strong><span class="txt_s">%</span>
                        </dd>
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span v-show="data.UP_RATE >= 0" class="bar" :style="{width:nanToDot(data.UP_RATE) +'%'}"></span>
                        <span v-show="data.UP_RATE < 0" class="bar" style="width: 0%;"></span>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="list_box lb_sty02" v-show="gubun == 2">
          <ul class="list_card">
            <li v-for="(data , index) in dr_B" :key="index" class="teamSelector" @click="toDetail(data.SUBGU, data.CODNM)">
              <!-- card_MI 브랜드 -->
              <div class="card card_shadow">
                <div class="card_title">
                  <h4 class="card_title_text">{{ data.CODNM }}</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ Math.round(data.SAMT/1000) | currency }}<small class="txt">천원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">누계목표</dt>
                    <dd class="txt">{{ Math.round(data.PLNAMT/1000) | currency }}</dd>
                  </dl>
                  <!-- 그래프 -->
                  <div class="graph" style="height: 250px;">
                    <div :id="'brchartdiv'+index" style="position: relative; width: 100%; height: 100%;"></div>
                  </div>
                </div>
                <div class="card_box">
                  <div class="list_box_s">
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit">당월 달성률</dt>
                        <dd class="txt">
                          <strong>{{ data.ACC_RATE | nanToDot }}</strong>
                          <span class="txt_s">%</span>
                        </dd>
                        <!-- <dd class="txt"><span class="txt_box">적자전환</span></dd> -->
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span v-show="data.ACC_RATE >= 0" class="bar" :style="{width:nanToDot(data.ACC_RATE) +'%'}"></span>
                        <span v-show="data.ACC_RATE < 0" class="bar" style="width: 0%;"></span>
                      </strong>
                    </div>
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit">전년대비 신장률</dt>
                        <dd class="txt">
                          <strong>{{ data.UP_RATE | nanToDot }}</strong>
                          <span class="txt_s">%</span>
                        </dd>
                        <!-- <dd class="txt"><span class="txt_box">적자전환</span></dd> -->
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span v-show="data.UP_RATE >= 0" class="bar" :style="{width:nanToDot(data.UP_RATE) +'%'}"></span>
                        <span v-show="data.UP_RATE < 0" class="bar" style="width: 0%;"></span>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr";
import datePick from "vue-date-pick"
import sideMenu from '@/components/sideMenu'

export default {
  name: "OnLineMain",
  components: {
    sideMenu,
    datePick
  },
  props: {
    data: Object
  },
  mounted() {
    this.setLoadData()
    //this.getData()
  },
  created() {
    if (this.data) {
      this.selectDate = moment(this.data.date).format("YYYY-MM-DD");
      
      this.month = moment(this.data.date).format("YYYYMM")

      this.startdate = moment(this.data.date).format("YY.MM") + ".01"
      this.enddate = moment(this.selectDate).format("YY.MM.DD")

      this.sql_startdate = moment(this.data.date).format("YYYYMM") + "01"
      this.sql_enddate = moment(this.selectDate).format("YYYYMMDD")

      this.gubun = this.data.gubun
    } else {
      this.selectDate = moment().format("YYYY-MM-DD");
      
      this.month = moment().format("YYYYMM")

      this.startdate = moment().format("YY.MM") + ".01"
      this.enddate = moment(this.selectDate).format("YY.MM.DD")

      this.sql_startdate = moment().format("YYYYMM") + "01"
      this.sql_enddate = moment(this.selectDate).format("YYYYMMDD")
    }
  },
  data() {
    return {
      drawer: null,
      msCount: 0,
      ssCount: 0,
      selectDate: null,
      startdate: null,
      enddate: null,
      sql_startdate: null,
      sql_enddate: null,
      gubun: 1,
      dr_H: { PLNAMT: "0", SAMT: "0", LYSAMT: "0", TOTPLNAMT: "0", ACC_RATE: "0", UP_RATE:"0" },
      dr_S: [],
      dr_B: [],
      DATAST: null      
    };
  },
  computed: {
    req2svr: () => req2svr,
  },
  methods: {
    setLoadData() {
      if (this.data) {
        this.getData()
      } else { /* 처음접속 또는 새로고침 시에 0 초과인 실적이 있는 최근 날짜로 세팅하기 위함 */
        this.req2svr.getLatelySalesDate().then(
          res => {
            if (res.MACHBASE_ERROR) {
              console.log("res", res);
            } else {
              this.selectMaxSaledt = res.MAXSALEDT;
            
              /* 달력 선택일, 상단 TO 날짜, SQL TO 날짜 변경 */
              /* 19.12.02 시선 요청으로 데이터가 있는 최근날짜 기준으로 해당 월의 데이터 조회로 수정 */
              this.selectDate = this.selectMaxSaledt;
              this.startdate = moment(this.selectMaxSaledt).format("YY.MM") + ".01"
              this.enddate = moment(this.selectMaxSaledt).format("YY.MM.DD")
              this.month = moment(this.selectMaxSaledt).format("YYYYMM")
              this.sql_startdate = moment(this.selectMaxSaledt).format("YYYYMM") + "01"
              this.sql_enddate = moment(this.selectMaxSaledt).format("YYYYMMDD")

              this.getData()
            }
          },
          rej => {
            console.log("rej", rej);
          }
        )
      }

    },
    getMakeDataDate() {
      this.req2svr.getMakeDataDate().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DATAST = res.CREATEDATE;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    changeGubun(val) {
      if (val == 2) {
        this.gubun = 2
      } else {
        this.gubun = 1
      }
      this.getData()
    },
    getData() {
      this.getMakeDataDate()
      
      // 당원매출합계, 당월목표, 누계목표대비달성률, 전년동기대비신장률
      this.getSaleData()

      // 사업부별 매출
      this.getSaleDeptCount()

      // 브랜드별 매출
      this.getSaleBrandCount()
    },
    getSaleData() {
      // 당원매출합계, 당월목표, 누계목표대비달성률, 전년동기대비신장률
      this.req2svr.getSaleData(this.month, this.sql_startdate, this.sql_enddate).then(
        res => {
          this.dr_H = { YM:"0", PLNAMT: "0", SAMT: "0", LYSAMT: "0", TOTPLNAMT: "0", ACC_RATE: "0", UP_RATE:"0" }
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_H = res;
          }
        },
        rej => {
          console.log("rej", rej)
        }
      );
    },
    getSaleDeptCount() {
      this.req2svr.getSaleDeptCount().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.msCount = (JSON.stringify(res).match(/{/g) || []).length;
            this.getSaleDeptData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleDeptData() {
      this.dr_S = []
      for (var i=0; i<this.msCount; i++) {
        this.dr_S.push({ MAINGU:"", PLNAMT: "", SAMT: "", LYSAMT: "", TOTPLNAMT: "", ACC_RATE: "", UP_RATE:"" })
        this.makeChart(this.dr_S[i], "chartdiv"+i)
      }

      // 당원매출합계, 당월목표, 누계목표대비달성률, 전년동기대비신장률
      this.req2svr.getSaleDeptData(this.month, this.sql_startdate, this.sql_enddate).then(
        res => {
          
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }

            for(var i=0; i<list.length; i++){
              if (list[i]) {
                this.dr_S[i] = _.assign(this.dr_S[i], list[i])
                this.makeChart(this.dr_S[i], "chartdiv"+i)
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleBrandCount() {
      this.req2svr.getSaleBrandCount().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.ssCount = (JSON.stringify(res).match(/{/g) || []).length;
            this.getSaleBrandData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleBrandData() {
      this.dr_B = []
      for (var i=0; i<this.ssCount; i++) {
        this.dr_B.push({ SUBGU:"", PLNAMT: "", SAMT: "", LYSAMT: "", TOTPLNAMT: "", ACC_RATE: "", UP_RATE:"" })
        this.makeChart(this.dr_B[i], "brchartdiv"+i)
      }

      // 브랜드별 매출
      this.req2svr.getSaleBrandData(this.month, this.sql_enddate).then(
        res => {
          
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }

            for(var i=0; i<list.length; i++){
              if (list[i]) {
                this.dr_B[i] = _.assign(this.dr_B[i], list[i])
                this.makeChart(this.dr_B[i], "brchartdiv"+i)
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    changeDate() {
      this.month = moment(this.selectDate).format("YYYYMM")

      this.startdate = moment(this.selectDate).format("YY.MM") + ".01"
      this.enddate = moment(this.selectDate).format("YY.MM.DD")

      this.sql_startdate = moment(this.selectDate).format("YYYYMM") + "01"
      this.sql_enddate = moment(this.selectDate).format("YYYYMMDD")

      this.getData()
    },
    makeChart(val, divName) {
      let data
      data = [
        {category: "전년동기", value: Math.round(val.LYSAMT/1000), color: Number(val.LYSAMT) < 0 ? "#fbccca" : "#c5defc"},
        {category: "당월목표", value: Math.round(val.TOTPLNAMT/1000), color: Number(val.TOTPLNAMT) < 0 ? "#c2c2c3" : "#c2c2c3"},
        {category: "누계목표", value: Math.round(val.PLNAMT/1000), color: Number(val.PLNAMT) < 0 ? "#e0e0e1" : "#e0e0e1"},
        {category: "당월", value: Math.round(val.SAMT/1000), color: Number(val.SAMT) < 0 ? "#f1574e" : "#3f93f5"}
      ]

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 0,
        columnWidth: 0.5,
        startDuration: 0.7,
        fontSize: 15,
        categoryAxis: {
          autoRotateAngle: 0,
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
        guides: [],
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
        allLabels: [],
        balloon: {},
        titles: [],
        dataProvider: data
      });
    },
    toMain() {
      this.$router.replace("/")
    },
    toDetail(value, CODNM) {
      this.$router.push({
          name: 'ONL0102',
          params: {
            data: { 
              gubun: this.gubun,
              date: this.selectDate,
              MAINGU: this.gubun == 1 ? value : "",
              SUBGU: this.gubun == 2 ? value : "",
              CODNM: CODNM
            }
          }
      })
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
    nanToDot(value) {
      let x = value ? value : 0;
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
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
};
</script>