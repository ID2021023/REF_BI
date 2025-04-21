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
        <h2 class="layout_title">전체 재고<small class="txt_date"><strong class="point_col1">{{ currentYearMonth }} 기준</strong></small></h2>
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
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT | currency }}</dd>
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT | currency }}</dd>
                    <dt class="tit">불용</dt>
                    <dd class="txt">{{ dr_H.DU_1_TOT | currency }}</dd>
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
                    {{ Math.abs(dr_H.TOT1 - dr_H.TOT2) | currency }}<small class="txt">백만원</small>
                  </strong>
                  <strong v-else class="em_obj">
                    {{ dr_H.TOT1 - dr_H.TOT2 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT - dr_H.CU_2_TOT | currency }}</dd>
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT - dr_H.LM_2_TOT | currency }}</dd>
                    <dt class="tit">불용</dt>
                    <dd class="txt">{{ dr_H.DU_1_TOT - dr_H.DU_2_TOT | currency }}</dd>
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
                    {{ Math.abs(dr_H.TOT1 - dr_H.TOT3) | currency }}<small class="txt">백만원</small>
                  </strong>
                  <strong v-else class="em_obj">
                    {{ dr_H.TOT1 - dr_H.TOT3 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT - dr_H.CU_3_TOT | currency }}</dd>
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT - dr_H.LM_3_TOT | currency }}</dd>
                    <dt class="tit">불용</dt>
                    <dd class="txt">{{ dr_H.DU_1_TOT - dr_H.DU_3_TOT | currency }}</dd>
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
                    <i class="material-icons" :class="[dr_H.TOT1 - dr_H.TOT4 > 0 ? 'col_primary' : 'col_danger']">
                      {{ dr_H.TOT1 - dr_H.TOT4 > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                    </i>
                    {{ Math.abs(dr_H.TOT1 - dr_H.TOT4) | currency }}<small class="txt">백만원</small>
                  </strong>
                  <strong v-else class="em_obj">
                    {{ dr_H.TOT1 - dr_H.TOT4 | currency }}<small class="txt">백만원</small>
                  </strong>
                  <dl class="list_obj">
                    <dt class="tit">정상</dt>
                    <dd class="txt">{{ dr_H.CU_1_TOT - dr_H.CU_4_TOT | currency }}</dd>
                    <dt class="tit">이월</dt>
                    <dd class="txt">{{ dr_H.LM_1_TOT - dr_H.LM_4_TOT | currency }}</dd>
                    <dt class="tit">불용</dt>
                    <dd class="txt">{{ dr_H.DU_1_TOT - dr_H.DU_4_TOT | currency }}</dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cont_head">
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
              <span class="btn_n txt_label" @click="changeGubun(1)">제품 재고</span>
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
              <span class="btn_n txt_label" @click="changeGubun(2)">원자재 재고</span>
            </label>
          </div>
          <div class="layout_spacer"></div>
          <small class="txt_s">(단위 : 백만원)</small>
        </div>

        <div class="list_box lb_sty03">
          <ul class="list_card">
            <li v-for="(data, index) in dr_C" :key="data.GUBUN">
              <div class="wrapper">
                <!-- card_MI 사업부 -->
                <div class="card card_shadow card04">
                  <div class="card_title teamSelector" @click="toDetail(data)">
                    <h4 class="card_title_text">{{ data.GUBUN }}</h4>
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
                      <div class="view" style="height:38px;">
                        <dl class="list_var">
                          <dt class="tit">전월 증감</dt>
                          <dd v-if="data.TOT1 - data.TOT2 != 0" class="txt">
                            <!-- icon 빨간색 : col_danger -->
                            <i class="material-icons"
                              :class="[data.TOT1 - data.TOT2 >= 0 ? 'col_primary' : 'col_danger']"
                            >{{ data.TOT1 - data.TOT2 >= 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                            <strong>{{ Math.abs(data.TOT1 - data.TOT2) | currency }}</strong>
                          </dd>
                          <dd v-else class="txt">
                            <strong>{{ data.TOT1 - data.TOT2 | currency }}</strong>
                          </dd>
                        </dl>
                      </div>
                      <div class="view" style="height:38px;">
                        <dl class="list_var">
                          <dt class="tit">전년동월증감</dt>
                          <dd v-if="data.TOT1 - data.TOT3 != 0" class="txt">
                            <i
                              class="material-icons"
                              :class="[data.TOT1 - data.TOT3 >= 0 ? 'col_primary' : 'col_danger']"
                            >{{ data.TOT1 - data.TOT3 >= 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                            <strong>{{ Math.abs(data.TOT1 - data.TOT3) | currency }}</strong>
                          </dd>
                          <dd v-else class="txt">
                            <strong>{{ data.TOT1 - data.TOT3 | currency }}</strong>
                          </dd>
                        </dl>
                      </div>
                      <div class="view" style="height:38px;">
                        <dl class="list_var">
                          <dt class="tit">기말 증감</dt>
                          <dd v-if="data.TOT1 - data.TOT4 != 0" class="txt">
                            <!-- icon 빨간색 : col_danger -->
                            <i
                              class="material-icons"
                              :class="[data.TOT1 - data.TOT4 >= 0 ? 'col_primary' : 'col_danger']"
                            >{{ data.TOT1 - data.TOT4 >= 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                            <strong>{{ Math.abs(data.TOT1 - data.TOT4) | currency }}</strong>
                          </dd>
                          <dd v-else class="txt">
                            <strong>{{ data.TOT1 - data.TOT4 | currency }}</strong>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card card_shadow card04" v-show="!data.showYn">
                  <div class="sub_card_tit">
                    <span class="col_md_4 card_title_text">사업부</span>
                    <span class="col_md_8 card_title_text noline_right">재고/기말증감</span>
                  </div>
                  <div class="sub_card_content">
                    <dl class="col_md_4 sub_card_sty">
                      <dt v-for="(department,index) in data.departmentList" :key="index">{{department.CODNM}}</dt>
                    </dl>
                    <dl class="col_md_8 sub_card_sty noline_right">
                      <dt v-for="(department,index) in data.departmentList" :key="index"><strong class="em_obj">{{department.TOT1 | currency}}<small class="txt">백만원</small></strong>
                        <div v-if="department.TOT1 - department.TOT4 > 0" class="sub_chip col_primary">
                          {{ department.TOT1 - department.TOT4 > 0 ? '+' : ''}}
                          {{ department.TOT1 - department.TOT4 | currency }}
                        </div>
                        <div v-else-if="department.TOT1 - department.TOT4 < 0" class="sub_chip point_col5">
                          {{ department.TOT1 - department.TOT4 > 0 ? '+' : ''}}
                          {{ department.TOT1 - department.TOT4 | currency }}
                        </div>
                      </dt>
                    </dl>
                  </div>
                </div>
                <div class="mr50" @click="openCard(data)">
                  <span class="btn_icon btn_flex card_drawer card_drawer_shadow npr teamSelector">
                    <i v-if="data.showYn" class="material-icons">arrow_forward_ios</i>
                    <i v-else class="material-icons">arrow_back_ios</i>
                  </span>
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
      SUCDList: [],
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
    }
  },
  methods: {
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
    getRecentDate() {
      this.req2svr.getRecentDate().then(
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
      if(this.data){
        this.gubun = this.data.gubun // 제품재고,원자재재고
      }
      // this.gubun = this.data.gubun // 제품재고,원자재재고

      this.dr_H = { LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0" }
      this.dr_C = []
      this.dr_C.push({ GUBUN: "패션사업", LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0" })
      this.dr_C.push({ GUBUN: "미래성장사업", LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0" })
      this.dr_C.push({ GUBUN: "중단사업", LM_1_TOT: "0", CU_1_TOT: "0", TOT1: "0", LM_2_TOT: "0", CU_2_TOT: "0", TOT2: "0", LM_3_TOT: "0", CU_3_TOT: "0", TOT3: "0", LM_4_TOT: "0", CU_4_TOT: "0", TOT4: "0" })
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
      this.getDeptStockData(this.FasionSUCDCode, date)
      this.getDeptStockData(this.FutureSUCDCode, date)
      this.getDeptStockData(this.StopSUCDCode, date)
    },
    getStockData(date) {
      let i
      let currentYear = moment(date).format("YYYY")
      // let currentMonth = moment(date).format("M")
      this.SUCDList = _.map(this.SUCDs, 'CODE')
      // let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      // let lastMonth = moment(date).subtract(1, 'month').format("M")
      // let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      // 정상
      let yearCode = this.$store.getters.getYearCode(Number(currentYear))
      // // 이월 시작
      // let fs_yearCode = this.$store.getters.getYearCode(Number(currentYear-5))
      // // 이월 끝
      // let fe_yearCode = this.$store.getters.getYearCode(Number(currentYear-1))
      // // 불용
      // let du_yearCode = this.$store.getters.getYearCode(Number(currentYear-6))

      // 재품제고 누적합계, 전월증감함계, 기말증감합계
      this.req2svr.getStockData(date, currentYear, yearCode, this.gubun, this.SUCDList.toString()).then(
        res => {
          let list = [
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            },
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            },
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            },
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            }
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            list = JSON.parse("[" + res + "]");
            this.dr_H.LM_1_TOT = _.sumBy(list, function(o) { return Number(o.LM_1_TOT) })
            this.dr_H.CU_1_TOT = _.sumBy(list, function(o) { return Number(o.CU_1_TOT) })
            this.dr_H.DU_1_TOT = _.sumBy(list, function(o) { return Number(o.DU_1_TOT) })
            this.dr_H.TOT1 = _.sumBy(list, function(o) {return Number(o.TOT1)})
            this.dr_H.LM_2_TOT = _.sumBy(list, function(o) {return Number(o.LM_2_TOT)})
            this.dr_H.CU_2_TOT = _.sumBy(list, function(o) {return Number(o.CU_2_TOT)})
            this.dr_H.DU_2_TOT = _.sumBy(list, function(o) {return Number(o.DU_2_TOT)})
            this.dr_H.TOT2 = _.sumBy(list, function(o) {return Number(o.TOT2)})
            this.dr_H.LM_3_TOT = _.sumBy(list, function(o) {return Number(o.LM_3_TOT)})
            this.dr_H.CU_3_TOT = _.sumBy(list, function(o) {return Number(o.CU_3_TOT)})
            this.dr_H.DU_3_TOT = _.sumBy(list, function(o) {return Number(o.DU_3_TOT)})
            this.dr_H.TOT3 = _.sumBy(list, function(o) {return Number(o.TOT3)})
            this.dr_H.LM_4_TOT = _.sumBy(list, function(o) {return Number(o.LM_4_TOT)})
            this.dr_H.CU_4_TOT = _.sumBy(list, function(o) {return Number(o.CU_4_TOT)})
            this.dr_H.DU_4_TOT = _.sumBy(list, function(o) {return Number(o.DU_4_TOT)})
            this.dr_H.TOT4 = _.sumBy(list, function(o) {return Number(o.TOT4)})
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDeptStockData(SUCD, date) {
      let i
      let currentYear = moment(date).format("YYYY")
      // let currentMonth = moment(date).format("M")
      // let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      // let lastMonth = moment(date).subtract(1, 'month').format("M")
      // let lastYear = moment(date).subtract(1, 'year').format("YYYY")
      let codeList = _.map(SUCD, 'CODE')

      // 정상
      let yearCode = this.$store.getters.getYearCode(Number(currentYear))
      // 이월 시작
      let fs_yearCode = this.$store.getters.getYearCode(Number(currentYear-5))
      // 이월 끝
      let fe_yearCode = this.$store.getters.getYearCode(Number(currentYear-1))
      // 불용
      let du_yearCode = this.$store.getters.getYearCode(Number(currentYear-6))

      // 사업부별 재품제고 누적합계, 전월증감함계, 기말증감합계 그래프
      let GUBUN
      if(_.find(SUCD, function(o) { return o.CODE == 1 })) {
        GUBUN = "패션사업"
      } else if(_.find(SUCD, function(o) { return o.CODE == 23 })) {
        GUBUN = "미래성장사업"
      } else if(_.find(SUCD, function(o) { return o.CODE == 10 })) {
        GUBUN = "중단사업"
      }

      this.req2svr.getDeptStockData(date, currentYear, yearCode, fs_yearCode, fe_yearCode, du_yearCode, codeList.toString(), this.gubun, GUBUN).then(
        res => {
          let list = [
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            },
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            },
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            },
            {PRDTYY: "0", SUCD: "1",
             CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", 
             LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",
             DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", 
             TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"
            }
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              // 미래정상사업은 정상만 있어서 알파값 떄문에 list 배열 다시 세팅
              list = [{PRDTYY: "0", SUCD: "1",CU_1_TOT: "0", CU_2_TOT: "0", CU_3_TOT: "0", CU_4_TOT: "0", LM_1_TOT: "0", LM_2_TOT: "0", LM_3_TOT: "0", LM_4_TOT: "0",DU_1_TOT: "0", DU_2_TOT: "0", DU_3_TOT: "0", DU_4_TOT: "0", TOT1: "0", TOT2: "0", TOT3: "0", TOT4: "0"}]
              list.push(res)
            } else {
              list = JSON.parse("[" + res + "]");
            }
            // list = JSON.parse("[" + res + "]");
            let data = _.find(this.dr_C, { GUBUN: GUBUN })
            data.LM_1_TOT = _.sumBy(list, function(o) {return Number(o.LM_1_TOT)})
            data.CU_1_TOT = _.sumBy(list, function(o) {return Number(o.CU_1_TOT)})
            data.DU_1_TOT = _.sumBy(list, function(o) {return Number(o.DU_1_TOT)})
            data.TOT1 = _.sumBy(list, function(o) {return Number(o.TOT1)})
            data.LM_2_TOT = _.sumBy(list, function(o) {return Number(o.LM_2_TOT)})
            data.CU_2_TOT = _.sumBy(list, function(o) {return Number(o.CU_2_TOT)})
            data.DU_2_TOT = _.sumBy(list, function(o) {return Number(o.DU_2_TOT)})
            data.TOT2 = _.sumBy(list, function(o) {return Number(o.TOT2)})
            data.LM_3_TOT = _.sumBy(list, function(o) {return Number(o.LM_3_TOT)})
            data.CU_3_TOT = _.sumBy(list, function(o) {return Number(o.CU_3_TOT)})
            data.DU_3_TOT = _.sumBy(list, function(o) {return Number(o.DU_3_TOT)})
            data.TOT3 = _.sumBy(list, function(o) {return Number(o.TOT3)})
            data.LM_4_TOT = _.sumBy(list, function(o) {return Number(o.LM_4_TOT)})
            data.CU_4_TOT = _.sumBy(list, function(o) {return Number(o.CU_4_TOT)})
            data.DU_4_TOT = _.sumBy(list, function(o) {return Number(o.DU_4_TOT)})
            data.TOT4 = _.sumBy(list, function(o) {return Number(o.TOT4)})
          }
          let index = _.findIndex(this.dr_C, { GUBUN: GUBUN })
          if(this.gubun == 1){
            this.makeChart("chartdiv" + index, list)
          } else {
            this.makeChart2("chartdiv" + index, list, yearCode, fs_yearCode, fe_yearCode, du_yearCode)
          } 
          
          if(GUBUN == "패션사업"){
            this.getDepartmentList(this.dr_C[0] , this.dr_C[0].GUBUN)
          } else if(GUBUN == "미래성장사업"){
            this.getDepartmentList(this.dr_C[1] , this.dr_C[1].GUBUN)
          } else if(GUBUN == "중단사업"){
            this.getDepartmentList(this.dr_C[2] , this.dr_C[2].GUBUN)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDepartmentList(data,gubun){
      let month = this.month
      if (this.month.toString().length == 1) {
        month = "0" + this.month
      } else {
        month = this.month
      }
      let date = this.year + "" + month + "15"

      let list = []
      let i
      
      let currentYear = moment(date).format("YYYY")
      // let currentMonth = moment(date).format("M")
      // let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      // let lastMonth = moment(date).subtract(1, 'month').format("M")
      // let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      let yearCode = this.$store.getters.getYearCode(Number(currentYear))

      let fasionSUCDList = _.map(this.FasionSUCDCode, 'CODE')
      let futureSUCDList = _.map(this.FutureSUCDCode, 'CODE')
      let stopSUCDList = _.map(this.StopSUCDCode, 'CODE')

      this.req2svr.getDepartmentList(date, currentYear, yearCode, this.gubun, gubun, fasionSUCDList.toString(), futureSUCDList.toString(), stopSUCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.$set(data, 'departmentList', list)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );

    },
    openCard(data) {
      this.$set(data, 'showYn', !data.showYn)
      // if(data.showYn == true){
      //   this.getDepartmentList(data,data.GUBUN)
      // }
    },
    prev() {
      this.$router.replace("/NewDailyReport");
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
    toDetail(data) {
      this.$router.push({
          name: 'NEWFIN0502',
          params: {
            data: 
            { 
              gubun: this.gubun, // 제품재고,원자재재고
              GUBUN: data.GUBUN, // 패션,미래성장,중단
            }
          }
      })
    },
    makeChart(divName, val) {
      // let alpha = [1, 0.7, 0.45, 0.3, 0.15]
      let alpha = [1, 0.85, 0.70, 0.55, 0.40, 0.25, 0.1]

      let prevCount = 0
      let data = [ { category: "정상" }, { category: "이월" }, { category: "불용" } ]
      for (let i=0;i<val.length;i++) {
        // if(val[i].PRDTYY >= yearCode) {
        if(val[i].STOCK == "N" || val[i].STOCK == "") { // 패션사업은 STOCK=N, 미래성장사업은 STOCK값이 없음
          data[0]["value"+i] = Number(val[i].TOT1)
          data[0].PRDTYY = val[i].PRDTYY
          val[i].color = "#9879e8"
          val[i].alpha = alpha[i - prevCount - 1]

          data[1]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].STOCK == "C") {
        // } else if(val[i].PRDTYY >= fs_yearCode && val[i].PRDTYY <= fe_yearCode) {
          data[1]["value"+i] = Number(val[i].TOT1)
          data[1].PRDTYY = val[i].PRDTYY
          val[i].color = "#23c4d2"
          val[i].alpha = alpha[i]
          prevCount = i
          
          data[0]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].STOCK == "U") {
        // } else if(val[i].PRDTYY <= du_yearCode) {
          data[2]["value"+i] = Number(val[i].TOT1)
          data[2].PRDTYY = val[i].PRDTYY
          val[i].color = "#ff0000"
          val[i].alpha = alpha[i - prevCount -2]

          data[0]["value"+i] = 0
          data[1]["value"+i] = 0
        }
      }

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 30,
        columnWidth: 0.55,
        startDuration: 0.3,
        fontSize: 15,
        categoryAxis: {
          autoRotateAngle: 0,
          autoGridCount: false,
          axisAlpha: 0,
          axisColor: "#000000",
          color: "#000000",
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
            fillAlphas: val[4] ? val[4].alpha : 1,
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
    makeChart2(divName, val, yearCode, fs_yearCode, fe_yearCode, du_yearCode) {
      // let alpha = [1, 0.7, 0.45, 0.3, 0.15]
      let alpha = [1, 0.85, 0.70, 0.55, 0.40, 0.25, 0.1]

      let prevCount = 0
      let data = [ { category: "정상" }, { category: "이월" }, { category: "불용" } ]
      for (let i=0;i<val.length;i++) {
        if(val[i].PRDTYY >= yearCode) {
          data[0]["value"+i] = Number(val[i].TOT1)
          data[0].PRDTYY = val[i].PRDTYY
          val[i].color = "#9879e8"
          val[i].alpha = alpha[i - prevCount - 1]

          data[1]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].PRDTYY >= fs_yearCode && val[i].PRDTYY <= fe_yearCode) {
          data[1]["value"+i] = Number(val[i].TOT1)
          data[1].PRDTYY = val[i].PRDTYY
          val[i].color = "#23c4d2"
          val[i].alpha = alpha[i]
          prevCount = i
          
          data[0]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].PRDTYY <= du_yearCode) {
          data[2]["value"+i] = Number(val[i].TOT1)
          data[2].PRDTYY = val[i].PRDTYY
          val[i].color = "#ff0000"
          val[i].alpha = alpha[i - prevCount - 1]

          data[0]["value"+i] = 0
          data[1]["value"+i] = 0
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