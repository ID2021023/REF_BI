<template>
  <transition name="modal">
    <!-- 팝업용 레이아웃 클래스 : popup_layout -->
    <div class="wrap popup_layout pl_r">
      <!-- popup close button -->
      <div class="btn_pop_close" role="button" @click="close()"><i class="material-icons">close</i></div>
      <!-- header -->
      <header class="header">
        <div class="header_inner">
          <h2 class="layout_title">{{ SelectCodeName }}
            <span v-if="sortType">매장매출 TOP</span>
            <span v-else>매장매출 WORST</span>
            <small class="txt_date">
              <strong class="point_col1">{{filterName}}</strong>
            </small>
          </h2>
          <div class="layout_spacer"></div>
          <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
          <!-- groups -->
          <div class="groups">
            <div class="toggle_group tg_sty01">
              <label class="tg_btn" :class="{'is-checked': dateTab === 1}">
                <input
                  type="radio"
                  id="option-d"
                  class="tg_radio"
                  name="select"
                  :value="1"
                  v-model="dateTab"
                  checked="checked"
                  @click="tabVal(1)"
                />
                <span class="btn_n txt_label">일간</span>
              </label>
              <label class="tg_btn" :class="{'is-checked': dateTab === 2}">
                <input
                  type="radio"
                  id="option-d"
                  class="tg_radio"
                  name="select"
                  :value="2"
                  v-model="dateTab"
                  checked="checked"
                  @click="tabVal(2)"
                />
                <span class="btn_n txt_label">월간</span>
              </label>
              <label class="tg_btn" :class="{'is-checked': dateTab === 3}">
                <input
                  type="radio"
                  id="option-d"
                  class="tg_radio"
                  name="select"
                  :value="3"
                  v-model="dateTab"
                  checked="checked"
                  @click="tabVal(3)"
                />
                <span class="btn_n txt_label">누적</span>
              </label>
            </div>
            <!-- date -->
            <div v-show="dateTab == 1" class="input_group input_icon_group" style="width:200px;">
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
            <div v-show="dateTab == 2 || dateTab == 3" class="select_box" style="min-width:110px;">
              <select class="select" v-model="year" @change="chageDate">
                <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
              </select>
            </div>
            <!-- select -->
            <div v-show="dateTab == 2" class="select_box" style="min-width:90px;">
              <select class="select" v-model="month" @change="chageDate">
                <option  v-for="data in m_options" :key="data" :value="data">{{ data }}월</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="content">
          <!-- 테이블 -->
          <div class="tbl_sheet sheet_scroll tbl_right sheet_scroll_sty01" style="height:100%;">
            <div class="thead_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;" v-if="selectedCODE == '1'"/>
                  <!-- <col style="width:4%;" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"/> -->
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" rowspan="2">매장 매출순위</th>
                    <th scope="col" rowspan="2">매출합계<br>(천원)</th>
                    <th scope="col" rowspan="2" style="font-size: 13px;">수량합계<br>(개)</th>
                    <th scope="col" colspan="6">정상</th>
                    <th scope="col" colspan="6">할인</th>
                    <th scope="col" colspan="6">균일</th>
                    <th scope="col" rowspan="2" v-if="selectedCODE == '1'">선수금</th>
                    <!-- <th scope="col" rowspan="2" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')">선수금</th> -->
                  </tr>
                  <tr>
                    <th class="tc">판매액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">판매액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">판매액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc" style="font-size: 13px;">수량</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tfoot_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;" v-if="selectedCODE == '1'"/>
                  <!-- <col style="width:4%;" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"/> -->
                </colgroup>
                <tfoot>
                  <tr>
                    <th scope="col"><strong>합계</strong></th>
                    <td><strong>{{ Math.round(totalData.SALE_TOT/1000) | currency}}</strong></td>
                    <td><small class="point_col1">{{totalData.QTY_TOT | currency}}</small></td>
                    <!-- 정상(판매) -->
                    <td><strong>{{ Math.round(totalData.JAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.JQTY | currency}}</small></td>
                    <!-- 정상(반품) -->
                    <td><strong>{{ Math.round(totalData.R_JAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_JQTY | currency}}</small></td>
                    <!-- 정상(매출) -->
                    <td><strong>{{ Math.round((totalData.JAMT+totalData.R_JAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.JQTY+totalData.R_JQTY | currency}}</small></td>
                    <!-- 할인(판매) -->
                    <td><strong>{{ Math.round(totalData.DCAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.DCQTY | currency}}</small></td>
                    <!-- 할인(반품) -->
                    <td><strong>{{ Math.round(totalData.R_DCAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_DCQTY | currency}}</small></td>
                    <!-- 할인(매출) -->
                    <td><strong>{{ Math.round((totalData.DCAMT+totalData.R_DCAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.DCQTY+totalData.R_DCQTY | currency}}</small></td>
                    <!-- 균일(판매) -->
                    <td><strong>{{ Math.round(totalData.GAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.GQTY | currency}}</small></td>
                    <!-- 균일(반품) -->
                    <td><strong>{{ Math.round(totalData.R_GAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_GQTY | currency}}</small></td>
                    <!-- 균일(매출) -->
                    <td><strong>{{ Math.round((totalData.GAMT+totalData.R_GAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.GQTY+totalData.R_GQTY | currency}}</small></td>
                    <!-- 선수금 -->
                    <td v-if="selectedCODE == '1'"><strong>{{ Math.round(totalData.ADVDEPAMT/1000) | currency}}</strong></td>
                    <!-- <td v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"><strong>{{ Math.round(totalData.ADVDEPAMT/1000) | currency}}</strong></td> -->
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="tbody_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;"/>
                  <col style="width:2%;"/>
                  <col style="width:4%;" v-if="selectedCODE == '1'"/>
                  <!-- <col style="width:4%;" v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')"/> -->
                </colgroup>
                <tbody>
                  <tr v-for="(data, index) in storeList" :key="index" class="teamSelector" @click="toStoreDetail(data.VDCD)">
                    <th scope="row">
                      <span class="num_box">
                        <strong>{{data.RN}}</strong>
                      </span>
                      {{data.VDSNM}}
                    </th>
                    <!-- 합계 -->
                    <td>{{ Math.round(data.SALE_TOT/1000) | currency}}</td>
                    <td class="tr">
                      <small class="point_col1">{{data.QTY_TOT | currency}}</small>
                    </td>
                    <!-- 정상(판매) -->
                    <td>{{ Math.round(data.JAMT/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{data.JQTY | currency}}</small></td>
                    <!-- 정상(반품) -->
                    <td>{{ Math.round(data.R_JAMT/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{data.R_JQTY | currency}}</small></td>
                    <!-- 정상(매출) -->
                    <td>{{ Math.round((Number(data.JAMT)+Number(data.R_JAMT))/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{Number(data.JQTY)+Number(data.R_JQTY) | currency}}</small></td>
                    <!-- 할인(판매) -->
                    <td>{{ Math.round(data.DCAMT/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{data.DCQTY | currency}}</small></td>
                    <!-- 할인(반품) -->
                    <td>{{ Math.round(data.R_DCAMT/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{data.R_DCQTY | currency}}</small></td>
                    <!-- 정상(매출) -->
                    <td>{{ Math.round((Number(data.DCAMT)+Number(data.R_DCAMT))/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{Number(data.DCQTY)+Number(data.R_DCQTY) | currency}}</small></td>
                    <!-- 균일(판매) -->
                    <td>{{ Math.round(data.GAMT/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{data.GQTY | currency}}</small></td>
                    <!-- 균일(반품) -->
                    <td>{{ Math.round(data.R_GAMT/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{data.R_GQTY | currency}}</small></td>
                    <!-- 정상(매출) -->
                    <td>{{ Math.round((Number(data.GAMT)+Number(data.R_GAMT))/1000) | currency}}</td>
                    <td><small class="txt_num point_col1">{{Number(data.GQTY)+Number(data.R_GQTY) | currency}}</small></td>
                    <td v-if="selectedCODE == '1'">{{ Math.round(data.ADVDEPAMT/1000) | currency}}</td>
                    <!-- <td v-if="(((selectedCODE == '1') || (selectedCODE == 'MI')) && !selectStoreSU) || (selectStoreSU == '1')">{{ Math.round(data.ADVDEPAMT/1000) | currency}}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <store-month-detail-popup
        v-if="isStoreMonthDetailVisible"
        @close="closePopup"
        @changeSelectType="changeSelectType"
        :data="detailPopupData"
      />
      <store-daily-detail-popup
        v-if="isStoreDailyDetailVisible"
        @close="closePopup"
        @changeSelectType="changeSelectType"
        :data="detailPopupData"
      />
      <store-cumulative-detail-popup
        v-if="isStoreCumulativeDetailVisible"
        @close="closePopup"
        @changeSelectType="changeSelectType"
        :data="detailPopupData"
      />
    </div>
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"

import storeMonthDetailPopup from '@/pages/store/STO0101'
import storeDailyDetailPopup from '@/pages/store/STO0102'
import storeCumulativeDetailPopup from '@/pages/store/STO0103'

export default {
  name: 'STO0002',
  components: {
    datePick,
    storeMonthDetailPopup,
    storeDailyDetailPopup,
    storeCumulativeDetailPopup
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created() {
    this.initData()
    this.getMakeDataDate()
    this.getStoreList()
  },
  computed: {
    req2svr: () => req2svr,
    totalData() {
      return {
        SALE_TOT: _.sumBy(this.listData, function(o) { return Number(o.SALE_TOT); }),
        QTY_TOT: _.sumBy(this.listData, function(o) { return Number(o.QTY_TOT); }),
        JAMT: _.sumBy(this.listData, function(o) { return Number(o.JAMT); }),
        R_JAMT: _.sumBy(this.listData, function(o) { return Number(o.R_JAMT); }),
        JQTY: _.sumBy(this.listData, function(o) { return Number(o.JQTY); }),
        R_JQTY: _.sumBy(this.listData, function(o) { return Number(o.R_JQTY); }),
        DCAMT: _.sumBy(this.listData, function(o) { return Number(o.DCAMT); }),
        R_DCAMT: _.sumBy(this.listData, function(o) { return Number(o.R_DCAMT); }),
        DCQTY: _.sumBy(this.listData, function(o) { return Number(o.DCQTY); }),
        R_DCQTY: _.sumBy(this.listData, function(o) { return Number(o.R_DCQTY); }),
        GAMT: _.sumBy(this.listData, function(o) { return Number(o.GAMT); }),
        R_GAMT: _.sumBy(this.listData, function(o) { return Number(o.R_GAMT); }),
        GQTY: _.sumBy(this.listData, function(o) { return Number(o.GQTY); }),
        R_GQTY: _.sumBy(this.listData, function(o) { return Number(o.R_GQTY); }),
        ADVDEPAMT: _.sumBy(this.listData, function(o) { return Number(o.ADVDEPAMT) })
      }
    },
    storeList() {
      if (this.sortType == false) {
        return _.orderBy(this.listData, function(o) { return Number(o.SALE_TOT); }, 'asc')
      } else {
        return _.orderBy(this.listData, function(o) { return Number(o.SALE_TOT); }, 'desc')
      }
    },
    SelectCodeName() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getSUCDCODNM(this.selectedCODE)
      } else {
        return this.$store.getters.getBRCDCODNM(this.selectedCODE)
      }
    },
    filterName() {
      let value = "("
      if (this.selectRegion) {
        value += this.selectRegion
        if (this.selectStoreSU || this.selectStoreType || this.selectStoreOption) {
          value += ", "
        }
      }
      if (this.selectStoreSU) {
        value += this.$store.getters.getSUCDCODNM(this.selectStoreSU)
        if (this.selectStoreType || this.selectStoreOption) {
          value += ", "
        }
      }
      if (this.selectStoreType) {
        value += this.selectStoreType
        if (this.selectStoreOption) {
          value += ", "
        }
      }
      if (this.selectStoreOption) {
        value += this.selectStoreOption
      }
      if (!this.selectRegion && !this.selectStoreSU && !this.selectStoreType && !this.selectStoreOption) {
        value = ""
      } else {
        value += ")"
      }
      return value
    },
    isTabTypeSU() {
      return this.$store.getters.getSTOList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getSTOList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    }
  },
  data() {
    return { 
      selectedCODE: null,
      dateTab: 1,
      date: null,
      year: null,
      month: null,
      sortType: true,
      selectRegion: null,
      selectStoreType: null,
      selectStoreOption: null,
      selectStoreSU: null,
      selectStoreList: [],
      y_options: [],
      m_options: [],
      listData: [],
      isStoreMonthDetailVisible: false,
      isStoreDailyDetailVisible: false,
      isStoreCumulativeDetailVisible: false,
      makeDataDate: null,
      selectedStoreVDCDList: []
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
    initData() {
      this.year = this.data.year
      this.month = this.data.month
      this.date = this.data.date
      this.dateTab = this.data.dateTab
      this.sortType = this.data.alignType
      this.selectRegion = this.data.selectRegion
      this.selectStoreType = this.data.selectStoreType
      this.selectStoreOption = this.data.selectStoreOption
      this.selectStoreSU = this.data.selectStoreSU
      this.selectStoreList = this.data.selectStoreList

      this.selectedStoreVDCDList = _.map(this.selectStoreList, 'VDCD')

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
    },
    tabVal(val) {
      if (val == 1) {
        this.dateTab = 1
      } else if (val == 3) {
        this.dateTab = 3
      } else {
        this.dateTab = 2
      }
      this.year = this.data.year
      this.month = this.data.month
      this.date = this.data.date
      this.getStoreList()
    },
   toStoreDetail(VDCD) {
      this.detailPopupData = {VDCD: VDCD, CODE: this.data.CODE, year: this.year, month: this.month, date: this.date, storeList: this.listData}
      if (this.dateTab == 3) {
        this.isStoreMonthDetailVisible = false
        this.isStoreDailyDetailVisible = false
        this.isStoreCumulativeDetailVisible = true
      } else if (this.dateTab == 1) {
        this.isStoreMonthDetailVisible = false
        this.isStoreDailyDetailVisible = true
        this.isStoreCumulativeDetailVisible = false
      } else {
        this.isStoreMonthDetailVisible = true
        this.isStoreDailyDetailVisible = false
        this.isStoreCumulativeDetailVisible = false
      }
    },
    chageDate() {
      this.getStoreList()
    },
    closePopup() {
      this.isStoreMonthDetailVisible = false
      this.isStoreDailyDetailVisible = false
      this.isStoreCumulativeDetailVisible = false
    },
    changeSelectType(value) {
      if (value == 1) {
        this.isStoreMonthDetailVisible = false
        this.isStoreDailyDetailVisible = true
        this.isStoreCumulativeDetailVisible = false
      } else if (value == 3) {
        this.isStoreMonthDetailVisible = false
        this.isStoreDailyDetailVisible = false
        this.isStoreCumulativeDetailVisible = true
      } else {
        this.isStoreMonthDetailVisible = true
        this.isStoreDailyDetailVisible = false
        this.isStoreCumulativeDetailVisible = false
      }
    },
    getStoreList() {
      if (this.dateTab == 1) {
        this.getStoreDailyList()
      } else if (this.dateTab == 2) {
        this.getStoreMonthList()
      } else if (this.dateTab == 3) {
        this.getStoreCumulativeList()
      }
    },
    getStoreDailyList() {
      this.req2svr.getStoreDailyList(this.tabType, this.selectedCODE, this.date, this.selectedStoreVDCDList.toString()).then(
        res => {
          this.listData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.listData.push(res);
            } else {
              this.listData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStoreMonthList() {
      this.req2svr.getStoreMonthList(this.tabType, this.selectedCODE, this.year, this.month, this.selectedStoreVDCDList.toString()).then(
        res => {
          this.listData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.listData.push(res);
            } else {
              this.listData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStoreCumulativeList() {
      this.req2svr.getStoreCumulativeList(this.tabType, this.selectedCODE, this.year, this.selectedStoreVDCDList.toString()).then(
        res => {
          this.listData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.listData.push(res);
            } else {
              this.listData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    close() {
      this.$emit("close")
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