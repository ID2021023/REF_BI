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
        <button type="button" class="btn_n btn_icon btn_prev" @click="prev">
          <i class="material-icons">arrow_back_ios</i>
        </button>
        <!-- Title -->
        <h2 class="layout_title">{{ GUBUN }} 매출<small class="txt_date"><strong class="point_col1">{{ currentYearMonth }}</strong></small></h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- groups -->
        <div class="groups">
          <div class="toggle_group tg_sty01">
            <label class="tg_btn" :class="{'is-checked': choice === 1}">
              <input
                type="radio"
                id="option-m"
                class="tg_radio"
                name="select"
                :value="1"
                v-model="choice"
                style="display:none"
                @click="openYear(1)"
              >
              <span class="btn_n txt_label">당월</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': choice === 2}">
              <input
                type="radio"
                id="option-d"
                class="tg_radio"
                name="select"
                :value="2"
                v-model="choice"
                style="display:none"
                @click="closeMonth(2)"
              >
              <span class="btn_n txt_label">누적</span>
            </label>
          </div>
          <!-- select -->
          <div v-show="choice == 1 || choice == 2" class="select_box">
            <select class="select" style="min-width:120px;" v-model="year" @change="changeDate">
              <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
            </select>
          </div>
          <!-- select -->
          <div v-show="choice == 1" class="select_box" style="min-width:100px;">
            <select class="select" v-model="month" @change="changeDate">
              <option v-for="data in m_options" :key="data" :value="data">{{ data }}월</option>
            </select>
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
                  <h4 class="card_title_text" v-if="choice == 1">당월 매출 합계</h4>
                  <h4 class="card_title_text" v-if="choice == 2">당년 매출 합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ dr_H.RSLTAMT | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{ dr_H.PLNAMT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당월 영업이익B 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">월평균 할인율</h4><small  v-if="choice == 1" class="txt_box">(1-(당월 판매금액/TAG금액) * 100) : ERP 기준</small>
                  <h4 class="card_title_text" v-if="choice == 2">년평균 할인율</h4><small  v-if="choice == 2" class="txt_box">(1-(당월 판매금액/TAG금액) * 100) : ERP 기준</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ ((1-(dr_H.SILAMT/dr_H.TAGAMT)) * 100).toFixed(1) | nanToDot }}<small class="txt">%</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">판매금액</dt>
                    <dd class="txt">{{ Math.round(dr_H.SILAMT/1000000) | currency }}</dd>
                    <dt class="tit">TAG금액</dt>
                    <dd class="txt">{{ Math.round(dr_H.TAGAMT/1000000) | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당월 매출 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">당월 매출 달성률</h4><small  v-if="choice == 1" class="txt_box">(당월 매출/당월 매출 목표) * 100</small>
                  <h4 class="card_title_text" v-if="choice == 2">당년 매출 달성률</h4><small  v-if="choice == 2" class="txt_box">(당년 매출/당년 매출 목표) * 100</small>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ rate(dr_H.RSLTAMT, dr_H.PLNAMT).toFixed(1) | nanToDot }}
                    <small class="txt2">%</small>
                    <!-- 초과-->
                    <span class="chip round_chip success"
                      v-if="rate(dr_H.RSLTAMT, dr_H.PLNAMT).toFixed(0) >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span class="chip round_chip warning"
                      v-if="rate(dr_H.RSLTAMT, dr_H.PLNAMT).toFixed(0) >= 95 &&  rate(dr_H.RSLTAMT, dr_H.PLNAMT).toFixed(0) < 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span class="chip round_chip danger"
                      v-if="rate(dr_H.RSLTAMT, dr_H.PLNAMT).toFixed(0) < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_제품 전월 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">전월대비 매출 증감</h4>
                  <h4 class="card_title_text" v-if="choice == 2">전년대비 누적매출 증감</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    <!-- icon 빨간색 : col_primary -->
                    <i
                      class="material-icons"
                      :class="[Number(dr_H.RSLTAMT) - Number(dr_H.LMRSLTAMT) > 0 ? 'col_primary' : 'col_danger']"
                    >{{ Number(dr_H.RSLTAMT) - Number(dr_H.LMRSLTAMT) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                    {{ Number(dr_H.RSLTAMT) - Number(dr_H.LMRSLTAMT) > 0 ? '+' : '' }}{{ Number(dr_H.RSLTAMT) - Number(dr_H.LMRSLTAMT) | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit" v-if="choice == 1">전월실적</dt>
                    <dt class="tit" v-if="choice == 2">전년실적</dt>
                    <dd class="txt">{{ dr_H.LMRSLTAMT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- <div class="cont_head">
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
              <span class="btn_n txt_label" @click="changeGubun(2)">브랜드</span>
            </label>
          </div>
          <div class="layout_spacer"></div>
          <small class="txt_s">(단위 : 백만원)</small>
        </div> -->

        <div class="list_box lb_sty02" v-show="gubun == 1">
          <ul class="list_card">
            <li class="mr10">
              <!-- card_전체 매출비중 -->
              <div class="card card_shadow card03 card04" style="border: 1px solid #adb5bd; width:400px;">
                <div class="card_title">
                  <h4 class="card_title_text" style="font-weight: 600">{{ GUBUN }} 매출비중</h4>
                </div>
                <div class="card_content" style="min-height: 500px;">
                  <!-- 그래프 -->
                  <div id="chartdiv_cu_tot" style="height: 50%;"></div>
                  <!-- 그래프 -->
                  <div id="chartdiv_last_tot" style="height: 50%;"></div>
                </div>
              </div>
            </li>

            <li v-for="(data , index) in dr_S" :key="index" @click="toDetail(data)">
              <!-- card_MI 사업부 -->
              <div class="wrapper">

                <div class="card card_shadow card04">
                  <div class="card_title">
                    <h4 class="card_title_text">{{data.CODNM}} 사업부</h4>
                  </div>
                  <div class="card_content">
                    <strong class="em_obj">
                      {{data.RSLTAMT | currency}}<small class="txt">백만원</small>
                    </strong>
                    <dl class="list_obj">
                      <dt class="tit">목표</dt>
                      <dd class="txt">{{data.PLNAMT | currency}}</dd>
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
                          <dt class="tit" v-if="choice == 1">당월 달성률</dt>
                          <dt class="tit" v-if="choice == 2">당년 달성률</dt>
                          <dd class="txt">
                            <strong>{{ rate(data.RSLTAMT, data.PLNAMT).toFixed(1) | nanToDot }}</strong>
                            <span class="txt_s">%</span>
                          </dd>
                          <!-- <dd class="txt"><span class="txt_box">적자전환</span></dd> -->
                        </dl>
                        <!-- 그래프 -->
                        <strong class="graph line_bar">
                          <span v-show="data.RSLTAMT >= 0" class="bar" :style="{width:nanToZero(rate(data.RSLTAMT, data.PLNAMT)) +'%'}"></span>
                          <span v-show="data.RSLTAMT < 0" class="bar" style="width: 0%;"></span>
                        </strong>
                      </div>
                      <!-- 신호 -->
                      <div class="chip_list">
                        <!-- 초과-->
                        <span
                          class="chip round_chip"
                          :class="{success: rate(data.RSLTAMT, data.PLNAMT) >= 100}"
                        ></span>
                        <!-- 정상-->
                        <span
                          class="chip round_chip"
                          :class="{warning: rate(data.RSLTAMT, data.PLNAMT) >= 95 && rate(data.RSLTAMT, data.PLNAMT) < 99}"
                        ></span>
                        <!-- 주의 -->
                        <span
                          class="chip round_chip"
                          :class="{danger: rate(data.RSLTAMT, data.PLNAMT) < 95}"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="list_box lb_sty02" v-show="gubun == 2">
          <ul class="list_card">
            <li v-for="(data , index) in dr_B" :key="index">
              <!-- card_MI 브랜드 -->
              <div class="card card_shadow">
                <div class="card_title">
                  <h4 class="card_title_text">{{data.CODNM}}</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{data.RSLTAMT | currency}}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{data.PLNAMT | currency}}</dd>
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
                        <dt class="tit" v-if="choice == 1">당월 달성률</dt>
                        <dt class="tit" v-if="choice == 2">당년 달성률</dt>
                        <dd class="txt">
                          <strong>{{ rate(data.RSLTAMT, data.PLNAMT).toFixed(1) | nanToDot }}</strong>
                          <span class="txt_s">%</span>
                        </dd>
                        <!-- <dd class="txt"><span class="txt_box">적자전환</span></dd> -->
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span
                          class="bar"
                          :style="{width: rate(data.RSLTAMT, data.PLNAMT) +'%'}"
                        ></span>
                      </strong>
                    </div>
                    <!-- 신호 -->
                    <div class="chip_list">
                      <!-- 초과-->
                      <span
                        class="chip round_chip"
                        :class="{success: rate(data.RSLTAMT, data.PLNAMT) >= 100}"
                      ></span>
                      <!-- 정상-->
                      <span
                        class="chip round_chip"
                        :class="{warning: rate(data.RSLTAMT, data.PLNAMT) >= 95 && rate(data.RSLTAMT, data.PLNAMT) < 99}"
                      ></span>
                      <!-- 주의 -->
                      <span
                        class="chip round_chip"
                        :class="{danger: rate(data.RSLTAMT, data.PLNAMT) < 95}"
                      ></span>
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
import sideMenu from '@/components/sideMenu'

export default {
  name: "NEWFIN0202",
  components: {
    sideMenu
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    this.getData();
  },
  created() {
    this.year = moment().format("YYYY")
    this.month = moment().format("M")

    for (var i = 0; i < 3; i++) {
      this.y_options[i] = this.year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    for (var i = 0; i < 12; i++) {
      this.m_options[i] = 12 - i;
    }
    this.m_options = _.sortBy(this.m_options)

    this.getMakeDataDate()
    this.getRecentDate()
  },
  data() {
    return {
      drawer: null,
      y_options: [],
      m_options: [],
      choice: 1,
      gubun: 1,
      selected: {},
      month: '',
      year: '',
      dr_H: { PLNAMT: "0", RSLTAMT: "0", LMRSLTAMT: "0", SILAMT: "0", TAGAMT: "0" },
      dr_T: [],
      dr_S: [],
      dr_B: [],
      fasionSUCDList: [],
      futureSUCDList: [],
      stopSUCDList: [],
      fasionBRCDList: [],
      futureBRCDList: [],
      stopBRCDList: [],
      makeDataDate: null,
      GUBUN: null, // 패션, 미래성장, 중단
      fromMain: null // 메인에서 서브로 직접이동
    };
  },
  computed: {
    currentYearMonth() {
      let month = this.month 
      if (this.month.toString().length == 1) {
        month = "0" + this.month
      }
      if (this.choice == 2) {
        return this.year
      } else {
        return this.year + "." + month
      }
    },
    req2svr: () => req2svr,
    SUCDCards() {
      let FINList = this.$store.getters.getFINList
      let SUCDCode = this.$store.getters.getAuthSUCDCode[0]
      for(var i=0; i<FINList.length; i++){
        let data = _.find(SUCDCode, {MCODE:FINList[i].MCODE})
        if (data) {
          FINList[i].VISIBLE = true
        } else {
          FINList[i].VISIBLE = false
        }
      }
      return FINList
    },
    SUCDs() {
      return this.$store.getters.getSUCDList
    },
    BRCDCards() {
      let FINList = this.$store.getters.getFINList
      let BRCDCode = this.$store.getters.getAuthBRCDCode[0]
      for(var i=0; i<FINList.length; i++){
        let data = _.find(BRCDCode, {MCODE:FINList[i].MCODE})
        if (data) {
          FINList[i].VISIBLE = true
        } else {
          FINList[i].VISIBLE = false
        }
      }
      return FINList
    },
    BRCDs() {
      return this.$store.getters.getBRCDList
    },
    // 사업부 권한코드
    authSUCDCode() {
      return this.$store.getters.getAuthSUCDCode[0]
    },
    // 브랜드 권한코드
    authBRCDCode() {
      return this.$store.getters.getAuthBRCDCode[0]
    },
    // 패션사업코드
    FasionSUCDCode() {
      return this.$store.getters.getFasionSUCDList
    },
    // 미래성장사업코드
    FutureSUCDCode() {
      return this.$store.getters.getFutureSUCDList
    },
    // 중단사업코드
    StopSUCDCode() {
      return this.$store.getters.getStopSUCDList
    },
    // 패션사업 브랜드 CODE
    FasionBRCDCode() {
      return this.$store.getters.getFasionBRCDList
    },
    // 미래성장사업 브랜드 CODE
    FutureBRCDCode() {
      return this.$store.getters.getFutureBRCDList
    },
    // 중단사업 브랜드 CODE
    StopBRCDCode() {
      return this.$store.getters.getStopBRCDList
    }
  },
  methods: {
    initData(){
      this.choice = this.data.choice // 당월,누적
      this.year = this.data.year // 선택년
      this.month = this.data.month // 선택월
      this.gubun = this.data.gubun // 사업부,브랜드
      this.GUBUN = this.data.GUBUN // 패션,미래성장,중단
      this.fromMain = this.data.fromMain // 메인에서 서브로 직접이동

      this.getData()
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
    getRecentDate(){
      this.req2svr.getRecentDate().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.year = res.YYYY;
            this.month = res.MM;

            this.initData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getData() {
      
      this.fasionSUCDList = _.map(this.FasionSUCDCode, 'CODE')
      this.futureSUCDList = _.map(this.FutureSUCDCode, 'CODE')
      this.stopSUCDList = _.map(this.StopSUCDCode, 'CODE')
      this.fasionBRCDList = _.map(this.FasionBRCDCode, 'CODE')
      this.futureBRCDList = _.map(this.FutureBRCDCode, 'CODE')
      this.stopBRCDList = _.map(this.StopBRCDCode, 'CODE')

      // 당원매출합계, 월평균할인율, 당월매출달성률, 전월대비매출증감
      this.getSaleData()

      // 매출비중
      this.getSaleTotRate()

      // 사업부별 매출
      this.getSaleDeptData()

      // 브랜드별 매출
      this.getSaleBrandDeptData()
    },
    getSaleData() {
      // 당원매출합계, 월평균할인율, 당월매출달성률, 전월대비매출증감
      this.req2svr.getSaleData(this.choice, this.year, this.month, this.GUBUN, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
        res => {
          this.dr_H = { PLNAMT: "0", RSLTAMT: "0", LMRSLTAMT: "0", SILAMT: "0", TAGAMT: "0" }
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
    getSaleTotRate() {
      // 사업부별 매출비중
      this.dr_T = []
      this.req2svr.getSaleTotRate(this.choice, this.year, this.month, this.GUBUN, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_T = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_T.push(res);
            } else {
              this.dr_T = JSON.parse("[" + res + "]")
            }
            this.makeCuTotChart(this.dr_T, "chartdiv_cu_tot")
            this.makeLastTotChart(this.dr_T, "chartdiv_last_tot")
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );  

    },
    getSaleDeptData() {
      this.dr_S = []

      for (let i=0;i<this.authSUCDCode.length;i++) {
        let data = _.find(this.SUCDCards, {MCODE: this.authSUCDCode[i].MCODE})
        if (data) {
          this.dr_S.push({ name: this.authSUCDCode[i].CODNM, SUCD: this.authSUCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_S[this.dr_S.length-1], "chartdiv"+(this.dr_S.length-1))
        }
      }

      this.req2svr.getSaleDeptData(this.choice, this.year, this.month, this.GUBUN, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this. dr_S = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_S.push(res);
            } else {
              this.dr_S = JSON.parse("[" + res + "]")
            }
            for (let i=0;i<this.dr_S.length;i++) {
              this.makeChart(this.dr_S[i], "chartdiv"+i)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleBrandDeptData() {
      this.dr_B = []
      for (let i=0;i<this.authBRCDCode.length;i++) {
        let data = _.find(this.BRCDCards, {MCODE: this.authBRCDCode[i].MCODE})
        if (data) {
          this.dr_B.push({ name: this.authBRCDCode[i].CODNM, BRCD: this.authBRCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_B[this.dr_B.length-1], "brchartdiv"+(this.dr_B.length-1))
        }
      }

      this.req2svr.getSaleBrandDeptData(this.choice, this.year, this.month, this.GUBUN, this.fasionBRCDList.toString(), this.futureBRCDList.toString(), this.stopBRCDList.toString()).then(
        res => {
          
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_B = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_B.push(res);
            } else {
              this.dr_B = JSON.parse("[" + res + "]")
            }
            for (let i=0;i<this.dr_B.length;i++) {
              this.makeChart(this.dr_B[i], "brchartdiv"+i)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    toMain() {
      this.$router.replace("/")
    },
    prev() {
      if(this.fromMain){
        this.$router.push({
          name: 'NEWFIN0001',
          params: {
            data: 
            { 
              GUBUN : this.GUBUN // 패션,미래성장,중단
            }
          }
        })
      } else {
        this.$router.push({
          name: 'NEWFIN0201',
          params: {
            data: 
            { 
              choice : this.choice, // 당월,누적
              year : this.year, // 선택년
              month : this.month, // 선택월
            }
          }
        })
      }
    },
    openYear(value) {
      this.choice = value
      this.changeDate();
    },
    closeMonth(value) {
      this.choice = value
      this.changeDate();
    },
    changeGubun(val) {
      if (val == 2) {
        this.gubun = 2
      } else {
        this.gubun = 1
      }
    },
    changeDate() {
      this.getData()
    },
    makeCuTotChart(val, divName) {
      let data = _.orderBy(val, function(o) { return Number(o.CU_MONTH) }, 'desc');

      AmCharts.makeChart(divName, {
        type: "pie",
        startEffect: "easeOutSine",
        balloonText: "[[title]]<br>([[value]]%)</span>",
        innerRadius: "60%",
        labelRadius: 0.5,
        startRadius: "20%",
        // radius: "25%",
        labelText: "[[title]]([[value]]%)",
        accessibleLabel: "[[title]]: [[value]]%",
        colors: ["#3f93f5", "#c2c2c3", "#8cbef9", "#c5defc", "#c08bd9", "#dec8e3"],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "CODNM",
        valueField: "CU_MONTH",
        fontFamily: "GothamBold",
        fontSize: 15,
        allLabels: [
          {
            align: "center",
            id: "Label-1",
            text: "당월",
            y: "48%"
          }
        ],
        balloon: {
          adjustBorderColor: false,
          disableMouseEvents: false,
          fixedPosition: false,
          offsetY: 1
        },
        legend: {
          enabled: false,
          align: "center",
          fontSize: 16,
          markerType: "circle",
          valueText: ""
        },
        titles: [],
        dataProvider: data
      });

    },    
    makeLastTotChart(val, divName) {
      let data = _.orderBy(val, function(o) { return Number(o.LAST_MONTH) }, 'desc');

      AmCharts.makeChart(divName, {
        type: "pie",
        startEffect: "easeOutSine",
        balloonText: "[[title]]<br>([[value]]%)</span>",
        innerRadius: "60%",
        labelRadius: 0.5,
        startRadius: "20%",
        // radius: "25%",
        labelText: "[[title]]([[value]]%)",
        accessibleLabel: "[[title]]: [[value]]%",
        colors: ["#3f93f5", "#c2c2c3", "#8cbef9", "#c5defc", "#c08bd9", "#dec8e3"],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "CODNM",
        valueField: "LAST_MONTH",
        fontFamily: "GothamBold",
        fontSize: 15,
        allLabels: [
          {
            align: "center",
            id: "Label-1",
            text: "전년동월",
            y: "48%"
          }
        ],
        balloon: {
          adjustBorderColor: false,
          disableMouseEvents: false,
          fixedPosition: false,
          offsetY: 1
        },
        legend: {
          enabled: false,
          align: "center",
          fontSize: 16,
          markerType: "circle",
          valueText: ""
        },
        titles: [],
        dataProvider: data
      });

    },
    makeChart(val, divName) {
      let data
      if(this.choice == 1){
        data = [
          {category: "전년동월", value: val.LYRSLTAMT, color: Number(val.LYRSLTAMT) < 0 ? "#fbccca" : "#c5defc"},
          {category: "전월", value: val.LMRSLTAMT, color: Number(val.LMRSLTAMT) < 0 ? "#f79a95" : "#8cbef9"},
          {category: "당월목표", value: val.PLNAMT, color: Number(val.PLNAMT) < 0 ? "#c2c2c3" : "#c2c2c3"},
          {category: "당월", value: val.RSLTAMT, color: Number(val.RSLTAMT) < 0 ? "#f1574e" : "#3f93f5"}
        ]
      } else {
        data = [
          {category: "전년동기", value: val.LYRSLTAMT, color: Number(val.LYRSLTAMT) < 0 ? "#fbccca" : "#c5defc"},
          {category: "당년목표", value: val.PLNAMT, color: Number(val.PLNAMT) < 0 ? "#c2c2c3" : "#c2c2c3"},
          {category: "당년", value: val.RSLTAMT, color: Number(val.RSLTAMT) < 0 ? "#f1574e" : "#3f93f5"}
        ]
      }

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
};
</script>