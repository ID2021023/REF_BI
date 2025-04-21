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
        <h2 class="layout_title">전체 영업이익B<small class="txt_date"><strong class="point_col1">{{ currentYearMonth }}</strong></small></h2>
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

        <div class="list_box lb_sty03" v-show="gubun == 1">
          <ul class="list_card">
            <li v-for="(data , index) in dr_S" :key="index">
              <div class="wrapper">
              <!-- card_MI 사업부 -->
                <div class="card card_shadow card04" style="min-height:555px;">
                  <div class="card_title teamSelector" @click="toDetail(data)">
                    <h4 class="card_title_text">{{data.GUBUN}}</h4>
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

                <div class="card card_shadow card04" v-show="!data.showYn" style="min-height:555px;">
                  <div class="sub_card_tit">
                    <span class="col_md_4 card_title_text">사업부</span>
                    <span class="col_md_8 card_title_text noline_right">영업이익B/달성률</span>
                  </div>
                  <div class="sub_card_content">
                    <dl class="col_md_4 sub_card_sty">
                      <dt v-for="(department,index) in data.departmentList" :key="index">{{department.CODNM}}</dt>
                    </dl>
                    <dl class="col_md_8 sub_card_sty noline_right">
                      <dt v-for="(department,index) in data.departmentList" :key="index"><strong class="em_obj">{{department.RSLTAMT | currency}}<small class="txt">백만원</small></strong>
                        <div v-if="rate(department.RSLTAMT, department.PLNAMT) < 95" class="sub_chip point_col5">
                          {{ rate(department.RSLTAMT, department.PLNAMT).toFixed(1) | nanToDot }}%
                        </div>
                        <div v-else-if="rate(department.RSLTAMT, department.PLNAMT) >= 95 && rate(department.RSLTAMT, department.PLNAMT) < 99" class="sub_chip point_col7">
                          {{ rate(department.RSLTAMT, department.PLNAMT).toFixed(1) | nanToDot }}%
                        </div>
                        <div v-else-if="rate(department.RSLTAMT, department.PLNAMT) >= 100" class="sub_chip point_col8">
                          {{ rate(department.RSLTAMT, department.PLNAMT).toFixed(1) | nanToDot }}%
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
  props: {
    data: {
      type: Object
    }
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
      SUCDList: [],
      fasionSUCDList: [],
      futureSUCDList: [],
      stopSUCDList: [],
      fasionBRCDList: [],
      futureBRCDList: [],
      stopBRCDList: [],
      authBRCDList: [],
      makeDataDate: null,
      modDate: true
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
    getRecentDate(){
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
    getData(modDate) {

      if (this.data && !modDate) {
        this.choice = this.data.choice // 당월,누적
        this.year = this.data.year // 선택년
        this.month = this.data.month // 선택월
      }
      
      this.SUCDList = _.map(this.SUCDs, 'CODE')
      this.fasionSUCDList = _.map(this.FasionSUCDCode, 'CODE')
      this.futureSUCDList = _.map(this.FutureSUCDCode, 'CODE')
      this.stopSUCDList = _.map(this.StopSUCDCode, 'CODE')
      this.fasionBRCDList = _.map(this.FasionBRCDCode, 'CODE')
      this.futureBRCDList = _.map(this.FutureBRCDCode, 'CODE')
      this.stopBRCDList = _.map(this.StopBRCDCode, 'CODE')
      this.authBRCDList = _.map(this.authBRCDCode, 'MCODE')

      this.getProfitData()
      this.getDeptProfitData()
      this.getDeptBrandProfitData()
    },
    getProfitData() {      
      // 당원영업이익B합계, 당월영업이익B달성률, 전월대비영업이익B, 당월매출증감, 영업이익률
      this.req2svr.getProfitData(this.choice, this.year, this.month, this.SUCDList.toString()).then(
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
      for (let i=0;i<this.authSUCDCode.length;i++) {
        let data = _.find(this.SUCDCards, {MCODE: this.authSUCDCode[i].MCODE})
        if (data) {
          this.dr_S.push({ name: this.authSUCDCode[i].CODNM, SUCD: this.authSUCDCode[i].MCODE, LYRSLTAMT: "", LMRSLTAMT: "", PLNAMT: "", RSLTAMT: "" })
          this.makeChart(this.dr_S[this.dr_S.length-1], "chartdiv"+(this.dr_S.length-1))
        }
      }
      // 사업부별 영업이익
      this.req2svr.getDeptProfitData(this.choice, this.year, this.month, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_S.push(res);
            } else {
              this.dr_S = JSON.parse("[" + res + "]")
            }
            for (let i=0;i<this.dr_S.length;i++) {
              this.makeChart(this.dr_S[i], "chartdiv"+i)
              this.getDepartmentList(this.dr_S[i] , this.dr_S[i].GUBUN)
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
      this.req2svr.getDeptBrandProfitData(this.choice, this.year, this.month, this.GUBUN, this.fasionBRCDList.toString(), this.futureBRCDList.toString(), this.stopBRCDList.toString()).then(
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
    getDepartmentList(data,gubun) {
      let list = []
      let i


      this.req2svr.getDepartmentList(this.choice, this.year, this.month, gubun, this.fasionSUCDList.toString(), this.futureSUCDList.toString(), this.stopSUCDList.toString()).then(
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
      this.getData(this.modDate)
    },
    toDetail(data) {
      this.$router.push({
          name: 'NEWFIN0402',
          params: {
            data: 
            { 
              choice: this.choice, // 당월,누적
              year: this.year, // 선택년
              month: this.month, // 선택월
              gubun: this.gubun, // 사업부,브랜드
              GUBUN: data.GUBUN, // 패션,미래성장,중단
            }
          }
      })
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