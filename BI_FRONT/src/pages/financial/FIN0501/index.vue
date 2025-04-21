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
        <button
          type="button"
          class="btn_n btn_icon btn_prev"
          @click="prev"
        ><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">재고<small class="txt_date"><strong class="point_col1">{{ currentYearMonth }} 기준</strong></small></h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="list_box">
          <ul class="list_card">
            <li>
              <!-- card_제품 재고 누적액 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">제품 재고 누적합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{ dr_H.TOT1 | currency }}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT | currency }}</dd>
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_제품 전월 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">제품 재고 전월증감 합계</h4>
                </div>
                <div class="card_content">
                  <strong v-if="dr_H.TOT1 - dr_H.TOT2 != 0" class="em_obj">
                    <!-- icon 빨간색 : col_primary -->
                    <i
                      class="material-icons"
                      :class="[dr_H.TOT1 - dr_H.TOT2 > 0 ? 'col_primary' : 'col_danger']"
                    >{{ dr_H.TOT1 - dr_H.TOT2 > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                    {{ dr_H.TOT1 - dr_H.TOT2 > 0 ? '+' : '' }}{{ dr_H.TOT1 - dr_H.TOT2 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <strong v-else class="em_obj">
                    {{ dr_H.TOT1 - dr_H.TOT2 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT - dr_H.LM_2_TOT | currency }}</dd>
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT - dr_H.CU_2_TOT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_제품 전년동월증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">제품 재고 전년동월증감 합계</h4>
                </div>
                <div class="card_content">
                  <strong v-if="dr_H.TOT1 - dr_H.TOT3 != 0" class="em_obj">
                    <i 
                      class="material-icons"
                      :class="[dr_H.TOT1 - dr_H.TOT3 > 0 ? 'col_primary' : 'col_danger']"
                    >{{ dr_H.TOT1 - dr_H.TOT3 > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                    {{ dr_H.TOT1 - dr_H.TOT3 > 0 ? '+' : '' }}{{ dr_H.TOT1 - dr_H.TOT3 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <strong v-else class="em_obj">
                    {{ dr_H.TOT1 - dr_H.TOT3 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT - dr_H.LM_3_TOT | currency }}</dd>
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT - dr_H.CU_3_TOT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_제품 기말 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">제품 재고 기말증감 합계</h4>
                </div>
                <div class="card_content">
                  <strong v-if="dr_H.TOT1 - dr_H.TOT4 != 0" class="em_obj">
                    <i 
                      class="material-icons"
                      :class="[dr_H.TOT1 - dr_H.TOT4 > 0 ? 'col_primary' : 'col_danger']"
                    >{{ dr_H.TOT1 - dr_H.TOT4 > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                    {{ dr_H.TOT1 - dr_H.TOT4 > 0 ? '+' : '' }}{{ dr_H.TOT1 - dr_H.TOT4 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <strong v-else class="em_obj">
                    {{ dr_H.TOT1 - dr_H.TOT4 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT - dr_H.LM_4_TOT | currency }}</dd>
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT - dr_H.CU_4_TOT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cont_head">
          <!-- tabs -->
          <div class="toggle_group">
            <label
              class="tg_btn"
              :class="{'is-checked': gubun == 1}"
            >
              <input
                type="radio"
                id="option-1"
                class="tg_radio"
                name="options"
                :value="1"
                v-model="gubun"
                style="display:none"
              >
              <span class="btn_n txt_label" @click="changeGubun(1)">제품 재고</span>
            </label>
            <label
              class="tg_btn"
              :class="{'is-checked': gubun == 2}"
            >
              <input
                type="radio"
                id="option-2"
                class="tg_radio"
                name="options"
                :value="2"
                v-model="gubun"
                style="display:none"
              >
              <span class="btn_n txt_label" @click="changeGubun(2)">원자재 재고</span>
            </label>
          </div>
          <div class="layout_spacer"></div>
          <small class="txt_s">(단위 : 백만원)</small>
        </div>

        <div class="list_box lb_sty02">
          <ul class="list_card">
            <li
              v-for="(data, index) in dr_C"
              :key="data.SUCD"
            >
              <!-- card_MI 사업부 -->
              <div class="card card_shadow">
                <div class="card_title">
                  <h4 class="card_title_text">{{ data.DEPT }} 사업부</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{ data.TOT1  | currency }}<small class="txt">백만원</small></strong>
                  <!-- 그래프 -->
                  <div class="graph">
                    <div :id="'chartdiv'+index" style="position: relative; width: 100%; height: 260px;"></div>
                  </div>
                </div>
                <div class="card_box col_box">
                  <div class="list_box_s">
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit">전월 증감</dt>
                        <dd v-if="data.TOT1 - data.TOT2 != 0" class="txt">
                          <!-- icon 빨간색 : col_danger -->
                          <i class="material-icons"
                            :class="[data.TOT1 - data.TOT2 >= 0 ? 'col_primary' : 'col_danger']"
                          >{{ data.TOT1 - data.TOT2 >= 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                          <strong>{{ data.TOT1 - data.TOT2 >= 0 ? '+' : '' }}{{ data.TOT1 - data.TOT2 | currency }}</strong>
                        </dd>
                        <dd v-else class="txt">
                          <strong>{{ data.TOT1 - data.TOT2 | currency }}</strong>
                        </dd>
                      </dl>
                    </div>
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit">전년동월증감</dt>
                        <dd v-if="data.TOT1 - data.TOT3 != 0" class="txt">
                          <i
                            class="material-icons"
                            :class="[data.TOT1 - data.TOT3 >= 0 ? 'col_primary' : 'col_danger']"
                          >{{ data.TOT1 - data.TOT3 >= 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                          <strong>{{ data.TOT1 - data.TOT3 > 0 ? '+' : '' }}{{ data.TOT1 - data.TOT3 | currency }}</strong>
                        </dd>
                        <dd v-else class="txt">
                          <strong>{{ data.TOT1 - data.TOT3 | currency }}</strong>
                        </dd>
                      </dl>
                    </div>
                    <div class="view">
                      <dl class="list_var">
                        <dt class="tit">기말 증감</dt>
                        <dd v-if="data.TOT1 - data.TOT4 != 0" class="txt">
                          <!-- icon 빨간색 : col_danger -->
                          <i
                            class="material-icons"
                            :class="[data.TOT1 - data.TOT4 >= 0 ? 'col_primary' : 'col_danger']"
                          >{{ data.TOT1 - data.TOT4 >= 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                          <strong>{{ data.TOT1 - data.TOT4 > 0 ? '+' : '' }}{{ data.TOT1 - data.TOT4 | currency }}</strong>
                        </dd>
                        <dd v-else class="txt">
                          <strong>{{ data.TOT1 - data.TOT4 | currency }}</strong>
                        </dd>
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
import moment from "moment";
import req2svr from "./req2svr";
import sideMenu from '@/components/sideMenu'

export default {
  name: "FIN0501",
  components: {
    sideMenu
  },
  mounted() {
    this.getData();
  },
  created() {
    this.year = moment().format("YYYY")
    this.month = moment().format("M")
    this.getMakeDataDate()
    this.getRecentDate()
  },
  data() {
    return {
      drawer: null,
      gubun: 1,
      month: '',
      year: '',
      // 재품제고 누적합계, 전월증감함계, 기말증감합계
      dr_H: { LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0" },
      // 사업부별 재품제고 누적합계, 전월증감함계, 기말증감합계 그래프
      dr_C: [],
      dr_S: [],
      makeDataDate: null
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
    BRCDs() {
      return this.$store.getters.getBRCDList
    },
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    // 사업부 권한코드
    authSUCDCode() {
      return this.$store.getters.getAuthSUCDCode[0]
    },
    // 브랜드 권한코드
    authBRCDCode() {
      return this.$store.getters.getAuthBRCDCode[0]
    }
  },
  methods: {
    getMakeDataDate(){
      let sql = "SELECT TO_CHAR(MAX(CREATEDATE), 'YY.MM.DD HH24:MI') CREATEDATE FROM BIFN051";

      this.req2svr.getData(sql).then(
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
    getRecentDate() {
      let sql = "SELECT MAX(TO_NUMBER(YYYY)) YYYY, MAX(TO_NUMBER(MM)) MM FROM BIFN051 ";
      sql += "WHERE YYYY = (SELECT MAX(YYYY) FROM BIFN051)";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.year = res.YYYY;
            this.month = res.MM;

            this.getData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    initData() {
      this.dr_H = { LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0" }
      this.dr_C = []
      for (let i=0;i<this.authSUCDCode.length;i++) {
        let data = _.find(this.SUCDCards, {MCODE: this.authSUCDCode[i].MCODE})
        if (data) {
          this.dr_C.push({ SUCD: this.authSUCDCode[i].MCODE, DEPT: this.authSUCDCode[i].CODNM, LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0" })
        }
      }
    },
    getData() {
      this.initData()
      let month = this.month
      if (this.month.toString().length == 1) {
        month = "0" + this.month
      } else {
        month = this.month
      }
      let date = this.year + "" + month + "15"

      this.getStockData(date)
      
      for (let i=0;i<this.authSUCDCode.length;i++) {
        this.getDeptStockData(this.authSUCDCode[i].MCODE, date)
      }
    },
    getStockData(date) {
      let i
      let currentYear = moment(date).format("YYYY")
      let currentMonth = moment(date).format("M")
      let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      let lastMonth = moment(date).subtract(1, 'month').format("M")
      let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      let yearCode = this.$store.getters.getYearCode(Number(currentYear))

      // 재품제고 누적합계, 전월증감함계, 기말증감합계
      let sql = "SELECT SUCD, PRDTYY, LM_1_TOT, CU_1_TOT, (LM_1_TOT+CU_1_TOT) TOT1, LM_2_TOT, CU_2_TOT, (LM_2_TOT+CU_2_TOT) TOT2, LM_3_TOT, CU_3_TOT, (LM_3_TOT+CU_3_TOT) TOT3, LM_4_TOT, CU_4_TOT, (LM_4_TOT+CU_4_TOT) TOT4 FROM ( "
      sql += "SELECT SUCD, PRDTYY, SUM(LM_1_TOT) LM_1_TOT, SUM(CU_1_TOT) CU_1_TOT, SUM(LM_2_TOT) LM_2_TOT, SUM(CU_2_TOT) CU_2_TOT, SUM(LM_3_TOT) LM_3_TOT, SUM(CU_3_TOT) CU_3_TOT, SUM(LM_4_TOT) LM_4_TOT, SUM(CU_4_TOT) CU_4_TOT FROM ( "
      sql += "SELECT SUCD, PRDTYY, LM_1_TOT, LM_2_TOT, LM_3_TOT, LM_4_TOT, 0 AS CU_1_TOT, 0 AS CU_2_TOT, 0 AS CU_3_TOT, 0 AS CU_4_TOT FROM ( ";
      sql += "SELECT SUCD, PRDTYY, SUM(STAMT) LM_1_TOT, SUM(LMSTAMT) LM_2_TOT, SUM(LYSTAMT) LM_3_TOT, SUM(LESTAMT) LM_4_TOT FROM BIFN051 ";
      sql += "WHERE SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND PRDTYY < '" + yearCode + "' ";
      if(this.gubun == 1){
        sql += "AND SECGBN = '04' ";
      } else {
        sql += "AND SECGBN = '03' ";
      }
      sql += "AND YYYY = '" + currentYear + "' ";
      sql += "AND MM = '" + currentMonth + "' ";
      // sql += "AND TO_CHAR(CREATEDATE , 'YYYYMMDD') = (SELECT MAX(TO_CHAR(CREATEDATE , 'YYYYMMDD')) FROM BIFN051)";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY SUCD, PRDTYY) ";
      sql += "UNION ALL ";
      sql += "SELECT SUCD, PRDTYY, 0 AS LM_1_TOT, 0 AS LM_2_TOT, 0 AS LM_3_TOT, 0 AS LM_4_TOT, CU_1_TOT, CU_2_TOT, CU_3_TOT, CU_4_TOT FROM ( ";
      sql += "SELECT SUCD, PRDTYY, SUM(STAMT) CU_1_TOT, SUM(LMSTAMT) CU_2_TOT, SUM(LYSTAMT) CU_3_TOT, SUM(LESTAMT) CU_4_TOT FROM BIFN051 ";
      sql += "WHERE SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND PRDTYY >= '" + yearCode + "' ";
      if(this.gubun == 1){
        sql += "AND SECGBN = '04' ";
      } else {
        sql += "AND SECGBN = '03' ";
      }
      sql += "AND YYYY = '" + currentYear + "' ";
      sql += "AND MM = '" + currentMonth + "' ";
      // sql += "AND TO_CHAR(CREATEDATE , 'YYYYMMDD') = (SELECT MAX(TO_CHAR(CREATEDATE , 'YYYYMMDD')) FROM BIFN051) ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY SUCD, PRDTYY) ";
      sql += ")GROUP BY SUCD, PRDTYY ";
      sql += ")";

      this.req2svr.getData(sql).then(
        res => {
          // if (res.MACHBASE_ERROR) {
          // } else {
          //   this.dr_H = res;
          // }

          let list = [
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"},
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"},
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"},
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            list = JSON.parse("[" + res + "]");
            this.dr_H.LM_1_TOT = _.sumBy(list, function(o) { return Number(o.LM_1_TOT) })
            this.dr_H.CU_1_TOT = _.sumBy(list, function(o) { return Number(o.CU_1_TOT) })
            this.dr_H.TOT1 = _.sumBy(list, function(o) {return Number(o.TOT1)})
            this.dr_H.LM_2_TOT = _.sumBy(list, function(o) {return Number(o.LM_2_TOT)})
            this.dr_H.CU_2_TOT = _.sumBy(list, function(o) {return Number(o.CU_2_TOT)})
            this.dr_H.TOT2 = _.sumBy(list, function(o) {return Number(o.TOT2)})
            this.dr_H.LM_3_TOT = _.sumBy(list, function(o) {return Number(o.LM_3_TOT)})
            this.dr_H.CU_3_TOT = _.sumBy(list, function(o) {return Number(o.CU_3_TOT)})
            this.dr_H.TOT3 = _.sumBy(list, function(o) {return Number(o.TOT3)})
            this.dr_H.LM_4_TOT = _.sumBy(list, function(o) {return Number(o.LM_4_TOT)})
            this.dr_H.CU_4_TOT = _.sumBy(list, function(o) {return Number(o.CU_4_TOT)})
            this.dr_H.TOT4 = _.sumBy(list, function(o) {return Number(o.TOT4)})
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDeptStockData(SUCD, date) {
      let currentYear = moment(date).format("YYYY")
      let currentMonth = moment(date).format("M")
      let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      let lastMonth = moment(date).subtract(1, 'month').format("M")
      let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      let yearCode = this.$store.getters.getYearCode(Number(currentYear))

      // 사업부별 재품제고 누적합계, 전월증감함계, 기말증감합계 그래프
      let sql = "SELECT SUCD, PRDTYY, LM_1_TOT, CU_1_TOT, (LM_1_TOT+CU_1_TOT) TOT1, LM_2_TOT, CU_2_TOT, (LM_2_TOT+CU_2_TOT) TOT2, LM_3_TOT, CU_3_TOT, (LM_3_TOT+CU_3_TOT) TOT3, LM_4_TOT, CU_4_TOT, (LM_4_TOT+CU_4_TOT) TOT4 FROM ( "
      sql += "SELECT SUCD, PRDTYY, SUM(LM_1_TOT) LM_1_TOT, SUM(CU_1_TOT) CU_1_TOT, SUM(LM_2_TOT) LM_2_TOT, SUM(CU_2_TOT) CU_2_TOT, SUM(LM_3_TOT) LM_3_TOT, SUM(CU_3_TOT) CU_3_TOT, SUM(LM_4_TOT) LM_4_TOT, SUM(CU_4_TOT) CU_4_TOT FROM ( "
      sql += "SELECT SUCD, PRDTYY, LM_1_TOT, LM_2_TOT, LM_3_TOT, LM_4_TOT, 0 AS CU_1_TOT, 0 AS CU_2_TOT, 0 AS CU_3_TOT, 0 AS CU_4_TOT FROM ( "
      sql += "SELECT SUCD, PRDTYY, SUM(STAMT) LM_1_TOT, SUM(LMSTAMT) LM_2_TOT, SUM(LYSTAMT) LM_3_TOT, SUM(LESTAMT) LM_4_TOT FROM BIFN051 "
      sql += "WHERE SUCD = '" + SUCD + "' "
      sql += "AND PRDTYY < '" + yearCode + "' ";
      if(this.gubun == 1){
        sql += "AND SECGBN = '04' ";
      } else {
        sql += "AND SECGBN = '03' ";
      }
      sql += "AND YYYY = '" + currentYear + "' "
      sql += "AND MM = '" + currentMonth + "' "
      // sql += "AND TO_CHAR(CREATEDATE , 'YYYYMMDD') = (SELECT MAX(TO_CHAR(CREATEDATE , 'YYYYMMDD')) FROM BIFN051) ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY SUCD, PRDTYY) "
      sql += "UNION ALL "
      sql += "SELECT SUCD, PRDTYY, 0 AS LM_1_TOT, 0 AS LM_2_TOT, 0 AS LM_3_TOT, 0 AS LM_4_TOT, CU_1_TOT, CU_2_TOT, CU_3_TOT, CU_4_TOT FROM ( "
      sql += "SELECT SUCD, PRDTYY, SUM(STAMT) CU_1_TOT, SUM(LMSTAMT) CU_2_TOT, SUM(LYSTAMT) CU_3_TOT, SUM(LESTAMT) CU_4_TOT FROM BIFN051 "
      sql += "WHERE SUCD = '" + SUCD + "' "
      sql += "AND PRDTYY >= '" + yearCode + "' "
      if(this.gubun == 1){
        sql += "AND SECGBN = '04' ";
      } else {
        sql += "AND SECGBN = '03' ";
      }
      sql += "AND YYYY = '" + currentYear + "' "
      sql += "AND MM = '" + currentMonth + "' "
      // sql += "AND TO_CHAR(CREATEDATE , 'YYYYMMDD') = (SELECT MAX(TO_CHAR(CREATEDATE , 'YYYYMMDD')) FROM BIFN051) ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY SUCD, PRDTYY) "
      sql += ")GROUP BY SUCD, PRDTYY "
      sql += ") ORDER BY PRDTYY"

      this.req2svr.getData(sql).then(
        res => {
          let list = [
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"},
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"},
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"},
            {CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", PRDTYY: "0", SUCD: "1", TOT1: "0", TOT2: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0"}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            list = JSON.parse("[" + res + "]");
            let data = _.find(this.dr_C, { SUCD: SUCD })
            data.LM_1_TOT = _.sumBy(list, function(o) { return Number(o.LM_1_TOT) })
            data.CU_1_TOT = _.sumBy(list, function(o) { return Number(o.CU_1_TOT) })
            data.TOT1 = _.sumBy(list, function(o) {return Number(o.TOT1)})
            data.LM_2_TOT = _.sumBy(list, function(o) {return Number(o.LM_2_TOT)})
            data.CU_2_TOT = _.sumBy(list, function(o) {return Number(o.CU_2_TOT)})
            data.TOT2 = _.sumBy(list, function(o) {return Number(o.TOT2)})
            data.LM_3_TOT = _.sumBy(list, function(o) {return Number(o.LM_3_TOT)})
            data.CU_3_TOT = _.sumBy(list, function(o) {return Number(o.CU_3_TOT)})
            data.TOT3 = _.sumBy(list, function(o) {return Number(o.TOT3)})
            data.LM_4_TOT = _.sumBy(list, function(o) {return Number(o.LM_4_TOT)})
            data.CU_4_TOT = _.sumBy(list, function(o) {return Number(o.CU_4_TOT)})
            data.TOT4 = _.sumBy(list, function(o) {return Number(o.TOT4)})
          }
          let index = _.findIndex(this.dr_C, { SUCD: SUCD })
          this.makeChart("chartdiv" + index, list, yearCode)
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    prev() {
      this.$router.replace("/DailyReport");
    },
    changeGubun(val) {
      if (this.gubun != val) {
        if (val == 2) {
          this.gubun = 2
        } else {
          this.gubun = 1
        }
        this.getData()
      }
    },
    makeChart(divName, val, yearCode) {
      let alpha = [1, 0.7, 0.45, 0.3, 0.15]

      let prevCount = 0
      let data = [ { category: "이월" }, { category: "정상" } ]
      for (let i=0;i<val.length;i++) {
        if (val[i].PRDTYY < yearCode) {
          data[0]["value"+i] = Number(val[i].TOT1)
          data[0].PRDTYY = val[i].PRDTYY
          val[i].color = "#23c4d2"
          val[i].alpha = alpha[i]

          data[1]["value"+i] = 0
          prevCount = i
        } else {
          data[1]["value"+i] = Number(val[i].TOT1)
          data[1].PRDTYY = val[i].PRDTYY
          val[i].color = "#9879e8"
          val[i].alpha = alpha[i - prevCount - 1]

          data[0]["value"+i] = 0
        }
      }

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 30,
        columnWidth: 0.35,
        startDuration: 0.3,
        fontSize: 15,
        categoryAxis: {
          autoRotateAngle: 0,
          autoGridCount: false,
          axisAlpha: 0,
          fontSize: 18,
          gridAlpha: 0,
          gridThickness: 0,
          titleBold: false
        },
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[0] ? val[0].alpha : 1,
            id: "AmGraph-1",
            title: val[0] ? val[0].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value0",
            labelPosition: "middle",
            labelText: val[0] ? val[0].PRDTYY : "",
            lineColor: val[0] ? val[0].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[1] ? val[1].alpha : 1,
            id: "AmGraph-2",
            title: val[1] ? val[1].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value1",
            labelPosition: "middle",
            labelText: val[1] ? val[1].PRDTYY : "",
            lineColor: val[1] ? val[1].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[2] ? val[2].alpha : 1,
            id: "AmGraph-3",
            title: val[2] ? val[2].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value2",
            labelPosition: "middle",
            labelText: val[2] ? val[2].PRDTYY : "",
            lineColor: val[2] ? val[2].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[3] ? val[3].alpha : 1,
            id: "AmGraph-4",
            title: val[3] ? val[3].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value3",
            labelPosition: "middle",
            labelText: val[3] ? val[3].PRDTYY : "",
            lineColor: val[3] ? val[3].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[4] ? val[4].alpha : "",
            id: "AmGraph-5",
            title: val[4] ? val[4].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value4",
            labelPosition: "middle",
            labelText: val[4] ? val[4].PRDTYY : "",
            lineColor: val[4] ? val[4].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[5] ? val[5].alpha : 1,
            id: "AmGraph-6",
            title: val[5] ? val[5].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value5",
            labelPosition: "middle",
            labelText: val[5] ? val[5].PRDTYY : "",
            lineColor: val[5] ? val[5].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[6] ? val[6].alpha : 1,
            id: "AmGraph-7",
            title: val[6] ? val[6].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value6",
            labelPosition: "middle",
            labelText: val[6] ? val[6].PRDTYY : "",
            lineColor: val[6] ? val[6].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[7] ? val[7].alpha : 1,
            id: "AmGraph-8",
            title: val[7] ? val[7].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value7",
            labelPosition: "middle",
            labelText: val[7] ? val[7].PRDTYY : "",
            lineColor: val[7] ? val[7].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[8] ? val[8].alpha : 1,
            id: "AmGraph-9",
            title: val[8] ? val[8].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value8",
            labelPosition: "middle",
            labelText: val[8] ? val[8].PRDTYY : "",
            lineColor: val[8] ? val[8].color : ""
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            stackType: "regular",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false
          }
        ],
        dataProvider: data
      });
    },
    currency(value) {
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
    toMain() {
      this.$router.replace("/")
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