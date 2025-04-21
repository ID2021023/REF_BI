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
            <label class="tg_btn is-checked">
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
            <label class="tg_btn">
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
              <div class="input_text date_pick" type="text" id="date">
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
          <div v-show="choice == 2 || choice == 3" class="select_box" style="min-width:180px;">
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
          <ul class="list_card calc_card">
            <!-- 합계 -->
            <li class="total">
              <!-- card_ -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">당일 매출합계</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round(Number(dr_H.TOT_AMT)/1000) | currency}}<small class="txt">천원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">수량</dt>
                    <dd class="txt">{{dr_H.TOT_QTY | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">정상</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round(Number(dr_H.JAMT)/1000) | currency}}<small class="txt">천원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">수량</dt>
                    <dd class="txt">{{dr_H.JQTY | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">할인</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round(Number(dr_H.DCAMT)/1000) | currency}}<small class="txt">천원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">수량</dt>
                    <dd class="txt">{{dr_H.DCQTY | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">균일</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round(Number(dr_H.GAMT)/1000) | currency}}<small class="txt">천원</small></strong>
                  <dl class="list_obj">
                    <dt class="tit">수량</dt>
                    <dd class="txt">{{dr_H.GQTY | currency}}</dd>
                  </dl>
                </div>
              </div>
            </li>
            <!-- <li v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"> -->
            <li v-if="selectedCODE == '1'">
              <!-- card -->
              <div class="card card_mini">
                <div class="card_title">
                  <h4 class="card_title_text">선수금</h4>
                </div>
                <div class="card_content">
                  <strong class="em_obj">{{Math.round(Number(dr_H.ADVDEPAMT)/1000) | currency}}<small class="txt">천원</small></strong>
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
                    <li :class="{'on': gubun == 1}">
                      <a href="javascript:void(0);" @click="tabVal('1')">매출유형</a>
                    </li>
                    <li :class="{'on': gubun == 2}">
                      <a href="javascript:void(0);" @click="tabVal('2')">매출추이</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="cont">
                <div class="graph_area" v-show="gubun == 1">
                  <!-- 그래프 1 / graph_md : 차트 가운데 정렬용  -->
                  <div class="graph_view graph_md" style="width:50%;">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">수량 (개)</dt>
                        <dd class="txt_result txt_s">{{ dr_S_TOT_TY | currency }}</dd>
                        <dd class="txt_etc" v-if="selectedCODE == '1'">
                        <!-- <dd class="txt_etc" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"> -->
                          <em>&nbsp;</em>
                        </dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:150px; float:left;">
                        <div id="STO0102_chartdiv1" style="position:relative; width:100%; height:100%;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 그래프 2 / graph_md : 차트 가운데 정렬용 -->
                  <div class="graph_view graph_md" style="width:50%;">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">금액 (천원)</dt>
                        <dd class="txt_result txt_s">{{ dr_S_SALE_TOT | currency }}</dd>
                        <dd class="txt_etc" v-if="selectedCODE == '1'">
                        <!-- <dd class="txt_etc" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"> -->
                          <span class="chip chip_m box_chip chip_sty01">
                            <span class="chip_text">선수금</span>
                          </span>
                          <em :class="{point_col5: dr_S_ADVDEPAMT < 0, point_col1: dr_S_ADVDEPAMT >= 0}">{{ dr_S_ADVDEPAMT | currency }}</em>
                        </dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:150px; float:left;">
                        <div id="STO0102_chartdiv2" style="position:relative; width:100%; height:100%;"></div>
                      </div>
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
                <div class="graph_area" v-show="gubun == 2">
                  <div class="graph_view">
                    <div class="graph" style="position:relative; width:100%; height:485px;">
                      <div id="STO0102_chartdiv4" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_6">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">매장별 매출순위 (천원)</strong>
              </div>
              <div class="cont">
                <div class="tbl_sheet sheet_scroll" style="height:520px;">
                  <div class="thead_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col />
                        <col style="width:10%;"/>
                        <col style="width:9%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;" v-if="selectedCODE == '1'"/>
                        <!-- <col style="width:10%;" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"/> -->
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">매장명</th>
                          <th scope="col">매출합계</th>
                          <th scope="col">수량합계</th>
                          <th scope="col" colspan="2">정상</th>
                          <th scope="col" colspan="2">할인</th>
                          <th scope="col" colspan="2">균일</th>
                          <th scope="col" v-if="selectedCODE == '1'">선수금</th>
                          <!-- <th scope="col" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')">선수금</th> -->
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="tfoot_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col />
                        <col style="width:10%;"/>
                        <col style="width:9%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;" v-if="selectedCODE == '1'"/>
                        <!-- <col style="width:10%;" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"/> -->
                      </colgroup>
                      <tfoot>
                        <tr>
                          <th scope="row">합계</th>
                          <td class="tc">{{ Math.round(dailyStoreListtotalData.SALE_TOT/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">({{dailyStoreListtotalData.QTY_TOT | currency}})</small></td>
                          <td class="tc">{{ Math.round(dailyStoreListtotalData.JAMT/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">({{dailyStoreListtotalData.JQTY | currency}})</small></td>
                          <td class="tc">{{ Math.round(dailyStoreListtotalData.DCAMT/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">({{dailyStoreListtotalData.DCQTY | currency}})</small></td>
                          <td class="tc">{{ Math.round(dailyStoreListtotalData.GAMT/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">({{dailyStoreListtotalData.GQTY | currency}})</small></td>
                          <td class="tc" v-if="selectedCODE == '1'">{{ Math.round(dailyStoreListtotalData.ADVDEPAMT/1000) | currency}}</td>
                          <!-- <td class="tc" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')">{{ Math.round(dailyStoreListtotalData.ADVDEPAMT/1000) | currency}}</td> -->
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div class="tbody_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col />
                        <col style="width:10%;"/>
                        <col style="width:9%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;"/>
                        <col style="width:7%;"/>
                        <col style="width:10%;" v-if="selectedCODE == '1'"/>
                        <!-- <col style="width:10%;" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"/> -->
                      </colgroup>
                      <tbody>
                        <tr v-if="noResult">
                          <td colspan="10" style="text-align:center">No Data</td>
                        </tr>
                        <tr v-for="data in dr_L" :key="data.RN" :class="{on: store == data.VDCD}">
                          <th scope="row">
                            <span class="num_box"><strong>{{data.RN}}</strong></span>{{data.VDSNM}}
                          </th>
                          <td class="tc">{{Math.round(Number(data.SALE_TOT)/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">{{data.QTY_TOT | currency}}</small></td>
                          <td class="tc">{{Math.round(Number(data.JAMT)/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">{{data.JQTY | currency}}</small></td>
                          <td class="tc">{{Math.round(Number(data.DCAMT)/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">{{data.DCQTY | currency}}</small></td>
                          <td class="tc">{{Math.round(Number(data.GAMT)/1000) | currency}}</td>
                          <td class="tc"><small class="point_col1">{{data.GQTY | currency}}</small></td>
                          <td class="tc" v-if="selectedCODE == '1'">{{Math.round(Number(data.ADVDEPAMT)/1000) | currency}}</td>
                          <!-- <td class="tc" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')">{{Math.round(Number(data.ADVDEPAMT)/1000) | currency}}</td> -->
                        </tr>
                      </tbody>
                    </table>
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
  name: "STO0102",
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
    this.tabVal(this.gubun)
    this.loadData()
  },
  data() {
    return {
      store: 0,
      storeName: "",
      y_options: [],
      m_options: [],
      selectedCODE: null,
      selectStoreSU: null,
      choice: 1,
      gubun: 1,
      year: "",
      month: "",
      date: "",
      age_sort_type: 1,
      dr_H: {},
      // 매출유형
      dr_S: {
        JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
        R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
        ADVDEPAMT: 0
      },
      // 매출추이
      dr_P: [{ SALEDT: 0, AMT_TOT: 0 }],
      dr_LYP: [],
      // 당일 매장별 매출
      dr_L: [],
      makeDataDate: null,
      noResult: false,
    }
  },
  computed: {
    req2svr: () => req2svr,
    dr_S_TOT_TY() {
      return this.dr_S.JQTY+this.dr_S.DCQTY+this.dr_S.GQTY+this.dr_S.R_JQTY+this.dr_S.R_DCQTY+this.dr_S.R_GQTY
    },
    dr_S_SALE_TOT() {
      return Math.round((this.dr_S.JAMT+this.dr_S.DCAMT+this.dr_S.GAMT+this.dr_S.R_JAMT+this.dr_S.R_DCAMT+this.dr_S.R_GAMT)/1000)
    },
    dr_S_ADVDEPAMT() {
      return Math.round((this.dr_S.ADVDEPAMT)/1000)
    },
    dailyStoreListtotalData() {
      return {
        SALE_TOT: _.sumBy(this.dr_L, function(o) { return Number(o.SALE_TOT); }),
        QTY_TOT: _.sumBy(this.dr_L, function(o) { return Number(o.QTY_TOT); }),
        JAMT: _.sumBy(this.dr_L, function(o) { return Number(o.JAMT); }),
        JQTY: _.sumBy(this.dr_L, function(o) { return Number(o.JQTY); }),
        DCAMT: _.sumBy(this.dr_L, function(o) { return Number(o.DCAMT); }),
        DCQTY: _.sumBy(this.dr_L, function(o) { return Number(o.DCQTY); }),
        GAMT: _.sumBy(this.dr_L, function(o) { return Number(o.GAMT); }),
        GQTY: _.sumBy(this.dr_L, function(o) { return Number(o.GQTY); }),
        ADVDEPAMT: _.sumBy(this.dr_L, function(o) { return Number(o.ADVDEPAMT) })
      }
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
      this.selectStoreSU = this.data.selectStoreSU
      this.store = this.data.VDCD
      this.storeName = _.find(this.storeList, { VDCD: this.store }).VDSNM
    },
    tabVal(val) {
      if (val == "1") {
        this.gubun = 1;
      } else if (val == "2") {
        this.gubun = 2;
      }
    },
    selectType(val) {
      if (val != 1) {
        this.$emit("changeSelectType", val)
        this.date = moment().format("YYYY-MM-DD")
        this.year = moment().format("YYYY")
        this.month = moment().format("M")
      }
    },
    chageDate() {
      this.loadData()
    },
    loadData() {
      // 초기화
      this.dr_S = {
        JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
        R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
        ADVDEPAMT: 0
      }
      this.getMakeDataDate()
      this.getDailyData()
      this.getDailyChartCountData()
      this.getDailyChartAMTData()
      this.getDailyChartListData()
      this.getDailyStoreListData()
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
    getDailyData() {
      this.dr_H = {}
      this.req2svr.getDailyData(this.tabType, this.selectedCODE, this.store, this.date).then(
        res => {
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
    getDailyChartCountData() {
      this.makeChart1()
      this.req2svr.getDailyChartCountData(this.tabType, this.selectedCODE, this.store, this.date).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length
            if(count < 1) {
            } else  {
              this.dr_S.JQTY = Number(res.JQTY)
              this.dr_S.DCQTY = Number(res.DCQTY)
              this.dr_S.GQTY = Number(res.GQTY)
              this.dr_S.R_JQTY = Number(res.R_JQTY)
              this.dr_S.R_DCQTY = Number(res.R_DCQTY)
              this.dr_S.R_GQTY = Number(res.R_GQTY)
            }
            this.makeChart1()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDailyChartAMTData() {
      this.makeChart2()
      this.req2svr.getDailyChartAMTData(this.tabType, this.selectedCODE, this.store, this.date).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.JAMT = Number(res.JAMT)
              this.dr_S.DCAMT = Number(res.DCAMT)
              this.dr_S.GAMT = Number(res.GAMT)
              this.dr_S.R_JAMT = Number(res.R_JAMT)
              this.dr_S.R_DCAMT = Number(res.R_DCAMT)
              this.dr_S.R_GAMT = Number(res.R_GAMT)
              this.dr_S.ADVDEPAMT = Number(res.ADVDEPAMT)
            }
            this.makeChart2()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDailyChartListData() {
      // 매출추이
      this.dr_LYP = []
      this.dr_P = [{ SUNM: 0, SUCD: 0, LY_SALE_TOT: 0, SALE_TOT: 0, SALEDT: "" }]
      this.makeChart4()
      this.req2svr.getDailyChartListData(this.tabType, this.selectedCODE, this.store, this.date).then(
        res => {
          this.dr_LYP = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_LYP.push({
                LY_SALE_TOT: Number(res.LY_SALE_TOT),
                SALEDT: res.SALEDT,
                SALE_TOT: 0,
                SUNM: res.SUNM
              })
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<list.length;i++) {
                this.dr_LYP.push({
                  LY_SALE_TOT: Number(list[i].LY_SALE_TOT),
                  SALEDT: list[i].SALEDT,
                  SALE_TOT: 0,
                  SUNM: list[i].SUNM
                })
              }
            }
          }
          this.getCurrentYearData()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCurrentYearData() {
      this.req2svr.getCurrentYearData(this.tabType, this.selectedCODE, this.store, this.date).then(
        res => {
          this.dr_P = [{ SUNM: 0, SUCD: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_P = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              let data = _.find(this.dr_LYP, function(o) { return o.SALEDT.slice(4, 8) == res.SALEDT.slice(4, 8)})
              this.dr_P.push({
                LY_SALE_TOT: data ? data.LY_SALE_TOT : 0,
                SALEDT: Number(res.SALEDT.slice(4, 6)) + "/" + Number(res.SALEDT.slice(6, 8)),
                SALE_TOT: Number(res.SALE_TOT),
                SUNM: res.SUNM
              })
            } else {
              let currentlist = JSON.parse("[" + res + "]")
              let list = []
              for (let i=0;i<currentlist.length;i++) {
                list.push({
                  LY_SALE_TOT: 0,
                  SALEDT: currentlist[i].SALEDT,
                  SALE_TOT: currentlist[i].SALE_TOT,
                  SUNM: currentlist[i].SUNM
                })
              }
              let count = Math.max(list.length, this.dr_LYP.length)
              let l1 = list.length > this.dr_LYP.length ? list : this.dr_LYP
              let l2 = list.length > this.dr_LYP.length ? this.dr_LYP : list
              for (let i=0;i<count;i++) {
                let data = _.find(l2, function(o) { return o.SALEDT.slice(4, 8) == l1[i].SALEDT.slice(4, 8)})
                let LY_SALE_TOT2 = data ? Number(data.LY_SALE_TOT) : 0
                let SALE_TOT2 = data ? Number(data.SALE_TOT) : 0

                let _LY_SALE_TOT = Number(l1[i].LY_SALE_TOT) != 0 ? Number(l1[i].LY_SALE_TOT) : LY_SALE_TOT2
                let _SALE_TOT = Number(l1[i].SALE_TOT) != 0 ? Number(l1[i].SALE_TOT) : SALE_TOT2

                this.dr_P.push({
                  LY_SALE_TOT: _LY_SALE_TOT,
                  SALE_TOT: _SALE_TOT,
                  SALEDT: Number(l1[i].SALEDT.slice(4, 6)) + "/" + Number(l1[i].SALEDT.slice(6, 8)),
                  SUNM: l1[i].SUNM
                })
              }
            }
          }

          let currentday = moment(this.date).format("YYYYMMDD")
          let today = moment().format("YYYYMMDD")
          
          if(today >= currentday){
            this.makeChart4();
          }
          // this.makeChart4();
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDailyStoreListData() {
      this.req2svr.getDailyStoreListData(this.tabType, this.selectedCODE, this.selectStoreSU, this.date).then(
        res => {
          this.dr_L = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            this.noResult = false;
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_L.push(res);
            } else {
              this.dr_L = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeChart1() {
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: "당일판매", 
          JQTY_T: "정상", JQTY: this.dr_S.JQTY, 
          DCQTY_T: "할인", DCQTY: this.dr_S.DCQTY, 
          GQTY_T: "균일", GQTY: this.dr_S.GQTY
        },
        { category: "당일반품", 
          JQTY_T: "정상", JQTY: Math.abs(this.dr_S.R_JQTY),
          DCQTY_T: "할인", DCQTY: Math.abs(this.dr_S.R_DCQTY),
          GQTY_T: "균일", GQTY: Math.abs(this.dr_S.R_GQTY)
        },
      ];

      AmCharts.makeChart("STO0102_chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
        startDuration: 1,
        columnWidth: 0.65,
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
            valueField: "JQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GQTY"
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
            gridColor: "#AAB3B3",
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
    makeChart2() {
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: "당일판매", 
          JAMT_T: "정상", JAMT: Math.round(this.dr_S.JAMT/1000),
          DCAMT_T: "할인", DCAMT: Math.round(this.dr_S.DCAMT/1000),
          GAMT_T: "균일", GAMT: Math.round(this.dr_S.GAMT/1000)
        },
        { category: "당일반품", 
          JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_S.R_JAMT/1000)),
          DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_S.R_DCAMT/1000)),
          GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_S.R_GAMT/1000))
        },
      ];

      AmCharts.makeChart("STO0102_chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
        columnWidth: 0.65,
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
            valueField: "JAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GAMT"
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
    makeChart4() {
      let data = this.dr_P

      AmCharts.makeChart("STO0102_chartdiv4", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#bd7adf", "#3f93f5", "#bababa"],
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
            balloonText: "작년 동기 매출(천원) : [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 0.99,
            title: "작년 동기 매출(천원)",
            valueField: "LY_SALE_TOT",
            markerType: "circle"
          },
          {
            balloonText: "일별 매출액(천원) : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            fontSize: 0,
            id: "AmGraph-2",
            title: "일별 매출액(천원)",
            valueField: "SALE_TOT",
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
    chageStore() {
      this.loadData()
    },
    close() {
      this.$emit("close")
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
}
</script>