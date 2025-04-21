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
        <h2 class="layout_title">{{ GUBUN }} 현금<small class="txt_date"><strong class="point_col1">{{ currentYearMonth }}</strong></small></h2>
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
              <!-- card_당월 현금 합계 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">당월 현금 합계</h4>
                  <h4 class="card_title_text" v-if="choice == 2">당년 현금 합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{ dr_H.CASH_RSLTAMT | currency }}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{ dr_H.CASH_PLNAMT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당월 현금 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">당월 현금 증감</h4>
                  <h4 class="card_title_text" v-if="choice == 2">당년 현금 증감</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    <!-- icon 빨간색 : col_danger -->
                    <i class="material-icons"
                      :class="[Number(dr_H.CASH_RSLTAMT) - Number(dr_H.CASH_LMRSLTAMT) > 0 ? 'col_primary' : 'col_danger']"
                    >{{ Number(dr_H.CASH_RSLTAMT) - Number(dr_H.CASH_LMRSLTAMT) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                    {{ Number(dr_H.CASH_RSLTAMT) - Number(dr_H.CASH_LMRSLTAMT) > 0 ? '+' : '' }}{{ Number(dr_H.CASH_RSLTAMT) - Number(dr_H.CASH_LMRSLTAMT) | currency }}
                    <small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit" v-if="choice == 1">전월현금</dt>
                    <dt class="tit" v-if="choice == 2">전년현금</dt>
                    <dd class="txt">{{ dr_H.CASH_LMRSLTAMT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <!-- 배경색 클래스 : bg_point -->
            <li class="bg_point">
              <!-- card_당월 매출합계 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">당월 매출합계</h4>
                  <h4 class="card_title_text" v-if="choice == 2">당년 매출합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{ dr_H.SALE_RSLTAMT | currency }}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{ dr_H.SALE_PLNAMT | currency }}</dd>
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
            <li v-for="(data , index) in dr_S" :key="index" @click="toDetail(data)">
              <!-- card_MI 사업부 -->
              <div class="wrapper">

                <div class="card card_shadow card04">
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
                      <div :id="'chartdiv'+index" style="position: relative; width: 100%; height: 100%;"></div>
                    </div>
                  </div>
                  <div class="card_box">
                  <div class="list_box_s">
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit" v-if="choice == 1">당월 증감</dt>
                        <dt class="tit" v-if="choice == 2">당년 증감</dt>
                        <dd class="txt">
                          <i class="material-icons" :class="[ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) > 0 ? 'col_primary' : 'col_danger']">
                            {{ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) > 0 ? 'arrow_drop_up' : 'arrow_drop_down'}}
                          </i>
                          <strong>
                            {{ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) > 0 ? '+' : ''}}
                            {{ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) | currency }}
                          </strong>
                        </dd>
                      </dl>
                    </div>
                    <div class="sum_list">
                      <dl class="list_obj">
                        <dt class="tit">정상</dt>
                        <dd class="txt">{{ Number(data.NORSTAMT) > 0 ? '+' : ''}}{{ Number(data.NORSTAMT) | currency}}</dd>
                      </dl>
                      <!-- <dl class="list_obj">
                        <dt class="tit">이월</dt>
                        <dd class="txt">{{ Number(data.FOWSTAMT) > 0 ? '+' : ''}}{{ Number(data.FOWSTAMT) | currency}}</dd>
                      </dl> -->
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
            <li class="mr10" v-for="(data , index) in dr_B" :key="index">
              <!-- card_MI 브랜드 -->
              <div class="card card_shadow">
                <div class="card_title">
                  <h4 class="card_title_text">{{data.CODNM}}</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{data.RSLTAMT | currency}}<span class="txt">백만원</span></strong>
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
                        <dt class="tit" v-if="choice == 1">당월 증감</dt>
                        <dt class="tit" v-if="choice == 2">당년 증감</dt>
                        <dd class="txt">
                          <i class="material-icons"
                            :class="[ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) > 0 ? 'col_primary' : 'col_danger']"
                          >{{ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) > 0 ? 'arrow_drop_up' : 'arrow_drop_down'}}</i>
                          <strong>{{ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) > 0 ? '+' : ''}}{{ (Number(data.NORSTAMT) - Number(data.LMNORSTAMT)) + (Number(data.FOWSTAMT) - Number(data.LMFOWSTAMT)) | currency }}</strong>
                        </dd>
                      </dl>
                    </div>
                    <div class="sum_list">
                      <dl class="list_obj">
                        <dt class="tit">정상</dt>
                        <dd class="txt">{{ Number(data.NORSTAMT) > 0 ? '+' : ''}}{{ Number(data.NORSTAMT) | currency}}</dd>
                      </dl>
                      <dl class="list_obj">
                        <dt class="tit">이월</dt>
                        <dd class="txt">{{ Number(data.FOWSTAMT) > 0 ? '+' : ''}}{{ Number(data.FOWSTAMT) | currency}}</dd>
                      </dl>
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
  name: "NEWFIN0302",
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

      // 당월현금합계, 당월현금증감, 당월매출합계
      this.getCashData()

      // 매출비중
      // this.getSaleTotRate()

      // 사업부별 매출
      this.getDeptCashData()

      // 브랜드별 매출
      this.getBrandCashData()
    },
    getCashData() {
      this.req2svr.getCashData(this.choice, this.year, this.month, this.GUBUN, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
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
    getDeptCashData() {
      let i
      this.dr_S = []
      for (let i=0;i<this.authSUCDCode.length;i++) {
        let data = _.find(this.SUCDCards, {MCODE: this.authSUCDCode[i].MCODE})
        if (data) {
          this.dr_S.push({ name: this.authSUCDCode[i].CODNM, SUCD: this.authSUCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_S[this.dr_S.length-1], "chartdiv"+(this.dr_S.length-1))
        }
      }
      // 사업부별 매출


      this.req2svr.getDeptCashData(this.choice, this.year, this.month, this.GUBUN, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_S = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_S.push(res);
            } else {
              this.dr_S = JSON.parse("[" + res + "]")
            }
            for (i=0;i<this.dr_S.length;i++) {
              this.makeChart(this.dr_S[i], "chartdiv"+i)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getBrandCashData() {
      let i
      this.dr_B = []
      for (i=0;i<this.authBRCDCode.length;i++) {
        let data = _.find(this.BRCDCards, {MCODE: this.authBRCDCode[i].MCODE})
        if (data) {
          this.dr_B.push({ name: this.authBRCDCode[i].CODNM, BRCD: this.authBRCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_B[this.dr_B.length-1], "brchartdiv"+(this.dr_B.length-1))
        }
      }
      // 브랜드별 매출
      this.req2svr.getBrandCashData(this.choice, this.year, this.month, this.GUBUN, this.fasionBRCDList.toString(), this.futureBRCDList.toString(), this.stopBRCDList.toString()).then(
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
            for (i=0;i<this.dr_B.length;i++) {
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
          name: 'NEWFIN0301',
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
        innerRadius: "50%",
        labelRadius: 0.5,
        startRadius: "20%",
        // radius: "25%",
        labelText: "[[title]]<br>([[value]]%)",
        accessibleLabel: "[[title]]: [[value]]%",
        colors: ["#3f93f5", "#c2c2c3", "#8cbef9", "#c5defc", "#c08bd9", "#dec8e3"],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "CODNM",
        valueField: "CU_MONTH",
        fontFamily: "GothamBold",
        fontSize: 12,
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
        innerRadius: "50%",
        labelRadius: 0.5,
        startRadius: "20%",
        // radius: "25%",
        labelText: "[[title]]<br>([[value]]%)",
        accessibleLabel: "[[title]]: [[value]]%",
        colors: ["#3f93f5", "#c2c2c3", "#8cbef9", "#c5defc", "#c08bd9", "#dec8e3"],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "CODNM",
        valueField: "LAST_MONTH",
        fontFamily: "GothamBold",
        fontSize: 12,
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