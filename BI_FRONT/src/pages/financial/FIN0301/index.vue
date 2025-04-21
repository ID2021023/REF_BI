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
        <button type="button" class="btn_n btn_icon btn_prev" @click="prev"><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">영업이익B<small class="txt_date"><strong class="point_col1">{{ currentYearMonth }}</strong></small></h2>
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
            <label
              class="tg_btn"
              :class="{'is-checked': choice === 2}"
            >
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
                  <h4 class="card_title_text" v-if="choice == 1">당월 영업이익B 합계</h4>
                  <h4 class="card_title_text" v-if="choice == 2">당년 영업이익B 합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{ dr_H.PROFIT_RSLTAMT | currency }}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{ dr_H.PROFIT_PLNAMT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card_당월 영업이익B 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">당월 영업이익B 달성률</h4><small class="txt_box"  v-if="choice == 1">(당월 영업이익B합계/목표금액) * 100</small>
                  <h4 class="card_title_text" v-if="choice == 2">당년 영업이익B 달성률</h4><small class="txt_box"  v-if="choice == 2">(당년 영업이익B합계/목표금액) * 100</small>
                </div>
                <div class="card_content" v-if="Number(dr_H.PROFIT_PLNAMT) < 0 && Number(dr_H.PROFIT_RSLTAMT) > 0">
                  <strong class="em_obj">
                    <span class="txt_box2" style="border-radius:10px">흑자전환</span>
                  </strong>
                </div>
                <div class="card_content" v-else-if="Number(dr_H.PROFIT_RSLTAMT) < 0">
                  <strong class="em_obj">
                    <span class="txt_box" style="border-radius:10px" v-if="Number(dr_H.PROFIT_PLNAMT) >= 0 && Number(dr_H.PROFIT_RSLTAMT) < 0">적자전환</span>
                    <span class="txt_box" style="border-radius:10px" v-if="Number(dr_H.PROFIT_PLNAMT) < 0 && Number(dr_H.PROFIT_PLNAMT) < Number(dr_H.PROFIT_RSLTAMT)">적자감소</span>
                    <span class="txt_box" style="border-radius:10px" v-if="Number(dr_H.PROFIT_PLNAMT) < 0 && Number(dr_H.PROFIT_PLNAMT) > Number(dr_H.PROFIT_RSLTAMT)">적자증가</span>
                  </strong>
                </div>
                <div class="card_content" v-else>
                  <strong class="em_obj">
                    {{ rate(dr_H.PROFIT_RSLTAMT, dr_H.PROFIT_PLNAMT).toFixed(1) | nanToDot }}<small class="txt2">%</small>
                    <!-- 초과-->
                    <span class="chip round_chip success"
                      v-if="rate(dr_H.PROFIT_RSLTAMT, dr_H.PROFIT_PLNAMT) >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span class="chip round_chip warning"
                      v-if="rate(dr_H.PROFIT_RSLTAMT, dr_H.PROFIT_PLNAMT) >= 95 && rate(dr_H.PROFIT_RSLTAMT, dr_H.PROFIT_PLNAMT) < 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span class="chip round_chip danger"
                      v-if="rate(dr_H.PROFIT_RSLTAMT, dr_H.PROFIT_PLNAMT) < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                  </strong>
                </div>
              </div>
            </li>
            <li>
              <!-- card_전월대비 영업이익B 증감 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">전월대비 영업이익B 증감</h4>
                  <h4 class="card_title_text" v-if="choice == 2">전년대비 영업이익B 증감</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{ Number(dr_H.PROFIT_RSLTAMT) - Number(dr_H.PROFIT_LMRSLTAMT) > 0 ? '+' : '' }}{{ Number(dr_H.PROFIT_RSLTAMT) - Number(dr_H.PROFIT_LMRSLTAMT) | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit" v-if="choice == 1">전월실적</dt>
                    <dt class="tit" v-if="choice == 2">전년실적</dt>
                    <dd class="txt">{{ dr_H.PROFIT_LMRSLTAMT | currency }}</dd>
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
                  <strong class="em_obj">{{dr_H.SALE_RSLTAMT | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{dr_H.SALE_PLNAMT | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li class="bg_point">
              <!-- card_당월 매출 달성률 -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text" v-if="choice == 1">당월 영업이익률</h4>
                  <h4 class="card_title_text" v-if="choice == 2">당년 영업이익률</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{ rate(dr_H.PROFIT_RSLTAMT, dr_H.SALE_RSLTAMT).toFixed(1) | nanToDot }}<small class="txt2">%</small>
                    <!-- 초과-->
                    <span class="chip round_chip success"
                      v-if="rate(dr_H.PROFIT_RSLTAMT, dr_H.SALE_RSLTAMT) >= 100"
                    >
                      <span class="chip_text">초과</span>
                    </span>
                    <!-- 정상-->
                    <span class="chip round_chip warning"
                      v-if="rate(dr_H.PROFIT_RSLTAMT, dr_H.SALE_RSLTAMT) >= 95 && rate(dr_H.PROFIT_RSLTAMT, dr_H.SALE_RSLTAMT) < 99"
                    >
                      <span class="chip_text">정상</span>
                    </span>
                    <!-- 주의-->
                    <span class="chip round_chip danger"
                      v-if="rate(dr_H.PROFIT_RSLTAMT, dr_H.SALE_RSLTAMT) < 95"
                    >
                      <span class="chip_text">주의</span>
                    </span>
                  </strong>
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
              <span class="btn_n txt_label" @click="changeGubun(1)">사업부</span>
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
              <span class="btn_n txt_label" @click="changeGubun(2)">브랜드</span>
            </label>
          </div>
          <div class="layout_spacer"></div>
          <small class="txt_s">(단위 : 백만원)</small>
        </div>

        <div class="list_box lb_sty02" v-show="gubun == 1">
          <ul class="list_card">
            <li v-for="(data , index) in dr_S" :key="index">
              <!-- card_MI 사업부 -->
              <div class="card card_shadow">
                <div class="card_title">
                  <h4 class="card_title_text">{{data.name}} 사업부</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{data.RSLTAMT | currency}}<small class="txt">백만원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{data.PLNAMT | currency}}</dd>
                    <dt class="tit">이익율</dt>
                    <dd class="txt">{{ rate(data.RSLTAMT, data.SALE_RSLTAMT).toFixed(1) | nanToDot }}%</dd>
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
                        <dd class="txt" v-if="Number(data.PLNAMT) < 0 && Number(data.RSLTAMT) > 0">
                          <span class="txt_box2">흑자전환</span>
                        </dd>
                        <dd class="txt" v-else-if="Number(data.RSLTAMT) < 0">
                          <span class="txt_box" v-if="Number(data.PLNAMT) >= 0 && Number(data.RSLTAMT) < 0">적자전환</span>
                          <span class="txt_box" v-if="Number(data.PLNAMT) < 0 && Number(data.PLNAMT) < Number(data.RSLTAMT)">적자감소</span>
                          <span class="txt_box" v-if="Number(data.PLNAMT) < 0 && Number(data.PLNAMT) > Number(data.RSLTAMT)">적자증가</span>
                        </dd>
                        <dd class="txt" v-else>
                          <strong>{{ rate(data.RSLTAMT, data.PLNAMT).toFixed(1) | nanToDot }}</strong><span class="txt_s">%</span>
                        </dd>
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span v-show="data.RSLTAMT >= 0" class="bar" :style="{width:nanToZero(rate(data.RSLTAMT, data.PLNAMT)) +'%'}"></span>
                        <span v-show="data.RSLTAMT < 0" class="bar" style="width: 0%;"></span>
                      </strong>
                    </div>
                    <!-- 신호 -->
                    <div class="chip_list" v-if="data.RSLTAMT >= 0">
                      <!-- 초과-->
                      <span class="chip round_chip"
                        :class="{success: rate(data.RSLTAMT, data.PLNAMT) >= 100}"
                      ></span>
                      <!-- 정상-->
                      <span class="chip round_chip"
                        :class="{warning: rate(data.RSLTAMT, data.PLNAMT) >= 95 && rate(data.RSLTAMT, data.PLNAMT) < 99}"
                      ></span>
                      <!-- 주의 -->
                      <span class="chip round_chip"
                        :class="{danger: rate(data.RSLTAMT, data.PLNAMT) < 95}"
                      ></span>
                    </div>
                    <div class="chip_list" v-else>
                      <span class="chip round_chip"></span>
                      <span class="chip round_chip"></span>
                      <span class="chip round_chip danger"></span>
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
                  <h4 class="card_title_text">{{data.name}}</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">
                    {{data.RSLTAMT | currency}}
                    <small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">목표</dt>
                    <dd class="txt">{{data.PLNAMT | currency}}</dd>
                    <dt class="tit">이익율</dt>
                    <dd class="txt">{{ rate(data.RSLTAMT, data.SALE_RSLTAMT).toFixed(1) | nanToDot }}%</dd>
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
                        <dd class="txt" v-if="Number(data.PLNAMT) < 0 && Number(data.RSLTAMT) > 0">
                          <span class="txt_box2">흑자전환</span>
                        </dd>
                        <dd class="txt" v-else-if="Number(data.RSLTAMT) < 0">
                          <span class="txt_box" v-if="Number(data.PLNAMT) >= 0 && Number(data.RSLTAMT) < 0">적자전환</span>
                          <span class="txt_box" v-if="Number(data.PLNAMT) < 0 && Number(data.PLNAMT) < Number(data.RSLTAMT)">적자감소</span>
                          <span class="txt_box" v-if="Number(data.PLNAMT) < 0 && Number(data.PLNAMT) > Number(data.RSLTAMT)">적자증가</span>
                        </dd>
                        <dd class="txt" v-else>
                          <strong>{{ rate(data.RSLTAMT, data.PLNAMT).toFixed(1) | nanToDot }}</strong><span class="txt_s">%</span>
                        </dd>
                      </dl>
                      <!-- 그래프 -->
                      <strong class="graph line_bar">
                        <span v-show="data.RSLTAMT >= 0" class="bar" :style="{width:nanToZero(rate(data.RSLTAMT, data.PLNAMT)) +'%'}"></span>
                        <span v-show="data.RSLTAMT < 0" class="bar" style="width: 0%;"></span>
                      </strong>
                    </div>
                    <!-- 신호 -->
                    <div class="chip_list" v-if="data.RSLTAMT >= 0">
                      <!-- 초과-->
                      <span class="chip round_chip"
                        :class="{success: rate(data.RSLTAMT, data.PLNAMT) >= 100}"
                      ></span>
                      <!-- 정상-->
                      <span class="chip round_chip"
                        :class="{warning: rate(data.RSLTAMT, data.PLNAMT) >= 95 && rate(data.RSLTAMT, data.PLNAMT) < 99}"
                      ></span>
                      <!-- 주의 -->
                      <span class="chip round_chip"
                        :class="{danger: rate(data.RSLTAMT, data.PLNAMT) < 95}"
                      ></span>
                    </div>
                    <div class="chip_list" v-else>
                      <span class="chip round_chip"></span>
                      <span class="chip round_chip"></span>
                      <span class="chip round_chip danger"></span>
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
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'

export default {
  name: "FIN0301",
  components: {
    sideMenu
  },
  mounted() {
    this.getData()
  },
  created: function() {
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
      month: "",
      year: "",
      dr_H: { PROFIT_PLNAMT: "0", PROFIT_RSLTAMT: "0", PROFIT_LMRSLTAMT: "0", SALE_PLNAMT: "0", SALE_RSLTAMT:"0" },
      dr_S: [],
      dr_B: [],
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
    }
  },
  methods: {
    getMakeDataDate(){
      let sql = "SELECT TO_CHAR(MAX(CREATEDATE), 'YY.MM.DD HH24:MI') CREATEDATE FROM BIFN050";

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
    getRecentDate(){
      let sql = "SELECT MAX(TO_NUMBER(YYYY)) YYYY, MAX(TO_NUMBER(MM)) MM FROM BIFN050 "
      sql += "WHERE YYYY = (SELECT MAX(YYYY) FROM BIFN050)"
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050)";

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
    getData() {
      this.getProfitData()
      this.getDeptProfitData()
      this.getDeptBrandProfitData()
    },
    getProfitData() {
      
      // 당원영업이익B합계, 당월영업이익B달성률, 전월대비영업이익B, 당월매출증감, 영업이익률
      let month = moment().format("M")
      let i
      let sql = ""

      if(this.choice == 1){
        sql += "SELECT SUM(PROFIT_PLNAMT) PROFIT_PLNAMT, SUM(PROFIT_RSLTAMT) PROFIT_RSLTAMT, SUM(PROFIT_LMRSLTAMT) PROFIT_LMRSLTAMT, SUM(SALE_PLNAMT) AS SALE_PLNAMT, SUM(SALE_RSLTAMT) AS SALE_RSLTAMT FROM ( "
        sql += "SELECT PROFIT_PLNAMT, PROFIT_RSLTAMT, PROFIT_LMRSLTAMT, 0 AS SALE_PLNAMT, 0 AS SALE_RSLTAMT FROM ( "
        sql += "SELECT SUM(PLNAMT) PROFIT_PLNAMT, SUM(RSLTAMT) PROFIT_RSLTAMT, SUM(LMRSLTAMT) PROFIT_LMRSLTAMT FROM ( "
        sql += "SELECT SUCD, PLNAMT, RSLTAMT, LMRSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '05' "
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND MM = '" + this.month + "' "
        sql += "AND SUCD IN ("
        for (i=0;i<this.SUCDs.length;i++) {
          sql += "'" + this.SUCDs[i].CODE + "'"
          if (i < this.SUCDs.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "ORDER BY SUCD)) "
        sql += "UNION ALL "
        sql += "SELECT 0 AS PROFIT_PLNAMT, 0 AS PROFIT_RSLTAMT, 0 AS PROFIT_LMRSLTAMT, SALE_PLNAMT, SALE_RSLTAMT FROM ( "
        sql += "SELECT SUM(PLNAMT) SALE_PLNAMT, SUM(RSLTAMT) SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, PLNAMT, RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '01' "
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND MM = '" + this.month + "' "
        sql += "AND SUCD IN ("
        for (i=0;i<this.SUCDs.length;i++) {
          sql += "'" + this.SUCDs[i].CODE + "'"
          if (i < this.SUCDs.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "ORDER BY SUCD)) "
        sql += ")"
      } else {
         if (this.year != moment().format("YYYY")) {
          month = "12"
        }

        sql += "SELECT SUM(PROFIT_PLNAMT) PROFIT_PLNAMT, SUM(PROFIT_RSLTAMT) PROFIT_RSLTAMT, SUM(PROFIT_LMRSLTAMT) PROFIT_LMRSLTAMT, SUM(SALE_PLNAMT) AS SALE_PLNAMT, SUM(SALE_RSLTAMT) AS SALE_RSLTAMT FROM ( "
        sql += "SELECT PROFIT_PLNAMT, PROFIT_RSLTAMT, PROFIT_LMRSLTAMT, 0 AS SALE_PLNAMT, 0 AS SALE_RSLTAMT FROM ( "
        sql += "SELECT SUM(PLNAMT) PROFIT_PLNAMT, SUM(RSLTAMT) PROFIT_RSLTAMT, SUM(LYRSLTAMT) PROFIT_LMRSLTAMT FROM ( "
        sql += "SELECT SUCD, PLNAMT, RSLTAMT, LYRSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '05' "
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " "
        sql += "AND SUCD IN ("
        for (i=0;i<this.SUCDs.length;i++) {
          sql += "'" + this.SUCDs[i].CODE + "'"
          if (i < this.SUCDs.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "ORDER BY SUCD)) "
        sql += "UNION ALL "
        sql += "SELECT 0 AS PROFIT_PLNAMT, 0 AS PROFIT_RSLTAMT, 0 AS PROFIT_LMRSLTAMT, SALE_PLNAMT, SALE_RSLTAMT FROM ( "
        sql += "SELECT SUM(PLNAMT) SALE_PLNAMT, SUM(RSLTAMT) SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, PLNAMT, RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '01' "
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " "
        sql += "AND SUCD IN ("
        for (i=0;i<this.SUCDs.length;i++) {
          sql += "'" + this.SUCDs[i].CODE + "'"
          if (i < this.SUCDs.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "ORDER BY SUCD)) "
        sql += ")"
      }

      this.req2svr.getData(sql).then(
        res => {
          this.dr_H = { PROFIT_PLNAMT: "0", PROFIT_RSLTAMT: "0", PROFIT_LMRSLTAMT: "0", SALE_PLNAMT: "0", SALE_RSLTAMT:"0" };
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_H = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDeptProfitData() {
      this.dr_S = []
      for (i=0;i<this.authSUCDCode.length;i++) {
        let data = _.find(this.SUCDCards, {MCODE: this.authSUCDCode[i].MCODE})
        if (data) {
          this.dr_S.push({ name: this.authSUCDCode[i].CODNM, SUCD: this.authSUCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_S[this.dr_S.length-1], "chartdiv"+(this.dr_S.length-1))
        }
      }
      // 사업부별 영업이익
      let month = moment().format("M")
      let i
      let sql = ""

      if(this.choice == 1){
        sql += "SELECT SUCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT, SUM(SALE_RSLTAMT) SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, LYRSLTAMT, LMRSLTAMT, PLNAMT, RSLTAMT, 0 AS SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '05' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND MM = '" + this.month + "' "
        sql += "AND SUCD IN ("
        for (i=0;i<this.authSUCDCode.length;i++) {
          sql += "'" + this.authSUCDCode[i].MCODE + "'"
          if (i < this.authSUCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY SUCD "
        sql += ") "
        sql += "UNION ALL "
        sql += "SELECT SUCD, 0 AS LYRSLTAMT, 0 AS LMRSLTAMT, 0 AS PLNAMT, 0 AS RSLTAMT, SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, SUM(RSLTAMT) SALE_RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '01' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND MM = '" + this.month + "' "
        sql += "AND SUCD IN ("
        for (i=0;i<this.authSUCDCode.length;i++) {
          sql += "'" + this.authSUCDCode[i].MCODE + "'"
          if (i < this.authSUCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY SUCD "
        sql += ") "
        sql += ") "
        sql += "GROUP BY SUCD "
        sql += "ORDER BY SUCD"

      } else {
        if (this.year != moment().format("YYYY")) {
          month = "12"
        }

        sql += "SELECT SUCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT, SUM(SALE_RSLTAMT) SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, LYRSLTAMT, LMRSLTAMT, PLNAMT, RSLTAMT, 0 AS SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '05' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " "
        sql += "AND SUCD IN ("
        for (i=0;i<this.authSUCDCode.length;i++) {
          sql += "'" + this.authSUCDCode[i].MCODE + "'"
          if (i < this.authSUCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY SUCD "
        sql += ") "
        sql += "UNION ALL "
        sql += "SELECT SUCD, 0 AS LYRSLTAMT, 0 AS LMRSLTAMT, 0 AS PLNAMT, 0 AS RSLTAMT, SALE_RSLTAMT FROM ( "
        sql += "SELECT SUCD, SUM(RSLTAMT) SALE_RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '01' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " "
        sql += "AND SUCD IN ("
        for (i=0;i<this.authSUCDCode.length;i++) {
          sql += "'" + this.authSUCDCode[i].MCODE + "'"
          if (i < this.authSUCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY SUCD "
        sql += ") "
        sql += ") "
        sql += "GROUP BY SUCD "
        sql += "ORDER BY SUCD"

      }

      this.req2svr.getData(sql).then(
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
            let data
            for (i=0;i<this.authSUCDCode.length;i++) {
              let data = _.find(this.SUCDCards, {MCODE: this.authSUCDCode[i].MCODE})
              if (data) {
                this.dr_S[i] = _.assign(this.dr_S[i], _.find(list, { SUCD: this.authSUCDCode[i].MCODE }))
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
    getDeptBrandProfitData() {
      let i
      this.dr_B = []
      for (i=0;i<this.authBRCDCode.length;i++) {
        let data = _.find(this.BRCDCards, {MCODE: this.authBRCDCode[i].MCODE})
        if (data) {
          this.dr_B.push({ name: this.authBRCDCode[i].CODNM, SUCD: this.authBRCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_B[this.dr_B.length-1], "brchartdiv"+(this.dr_B.length-1))
        }
      }
      // 브랜드별 영업이익
      let month = moment().format("M")
      let sql = ""

      if(this.choice == 1){
        sql += "SELECT BRCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT, SUM(SALE_RSLTAMT) SALE_RSLTAMT FROM ( "
        sql += "SELECT BRCD, LYRSLTAMT, LMRSLTAMT, PLNAMT, RSLTAMT, 0 AS SALE_RSLTAMT FROM ( "
        sql += "SELECT BRCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '05' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND MM = '" + this.month + "' "
        sql += "AND BRCD IN ("
        for (i=0;i<this.authBRCDCode.length;i++) {
          sql += "'" + this.authBRCDCode[i].MCODE + "'"
          if (i < this.authBRCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY BRCD "
        sql += ") "
        sql += "UNION ALL "
        sql += "SELECT BRCD, 0 AS LYRSLTAMT, 0 AS LMRSLTAMT, 0 AS PLNAMT, 0 AS RSLTAMT, SALE_RSLTAMT FROM ( "
        sql += "SELECT BRCD, SUM(RSLTAMT) SALE_RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '01' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND MM = '" + this.month + "' "
        sql += "AND BRCD IN ("
        for (i=0;i<this.authBRCDCode.length;i++) {
          sql += "'" + this.authBRCDCode[i].MCODE + "'"
          if (i < this.authBRCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY BRCD "
        sql += ") "
        sql += ") "
        sql += "GROUP BY BRCD "
        sql += "ORDER BY BRCD"

      } else {
        if (this.year != moment().format("YYYY")) {
          month = "12"
        }

        sql += "SELECT BRCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT, SUM(SALE_RSLTAMT) SALE_RSLTAMT FROM ( "
        sql += "SELECT BRCD, LYRSLTAMT, LMRSLTAMT, PLNAMT, RSLTAMT, 0 AS SALE_RSLTAMT FROM ( "
        sql += "SELECT BRCD, SUM(LYRSLTAMT) LYRSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT, SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '05' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " "
        sql += "AND BRCD IN ("
        for (i=0;i<this.authBRCDCode.length;i++) {
          sql += "'" + this.authBRCDCode[i].MCODE + "'"
          if (i < this.authBRCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY BRCD "
        sql += ") "
        sql += "UNION ALL "
        sql += "SELECT BRCD, 0 AS LYRSLTAMT, 0 AS LMRSLTAMT, 0 AS PLNAMT, 0 AS RSLTAMT, SALE_RSLTAMT FROM ( "
        sql += "SELECT BRCD, SUM(RSLTAMT) SALE_RSLTAMT FROM BIFN050 "
        sql += "WHERE SECGBN = '01' " 
        sql += "AND YYYY = '" + this.year + "' "
        sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " "
        sql += "AND BRCD IN ("
        for (i=0;i<this.authBRCDCode.length;i++) {
          sql += "'" + this.authBRCDCode[i].MCODE + "'"
          if (i < this.authBRCDCode.length - 1) {
            sql += ","
          }
        }
        sql += ") "
        sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
        sql += "GROUP BY BRCD "
        sql += ") "
        sql += ") "
        sql += "GROUP BY BRCD "
        sql += "ORDER BY BRCD"

      }

      this.req2svr.getData(sql).then(
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
            let data
            for (i=0;i<this.authBRCDCode.length;i++) {
              let data = _.find(this.BRCDCards, {MCODE: this.authBRCDCode[i].MCODE})
              if (data) {
                this.dr_B[i] = _.assign(this.dr_B[i], _.find(list, { BRCD: this.authBRCDCode[i].MCODE }));
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
    prev() {
      this.$router.replace("/DailyReport");
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
    toMain() {
      this.$router.replace("/")
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