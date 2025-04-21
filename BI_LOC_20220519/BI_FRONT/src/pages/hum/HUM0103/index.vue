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
            <span v-if="selectedCODE == 'other'">인력</span>
            <span v-else>매출 TOP</span>
            <small class="txt_date">
              <strong class="point_col1">{{ filterName }}</strong>
            </small>
          </h2>
          <div class="layout_spacer"></div>
          <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
          <!-- groups -->
          <div v-if="selectedCODE != 'other'" class="groups">
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
                <span class="btn_n txt_label">월간</span>
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
                <span class="btn_n txt_label">누적</span>
              </label>
            </div>
            <!-- select -->
            <div v-show="dateTab == 1 || dateTab == 2" class="select_box" style="min-width:110px;">
              <select class="select" v-model="year" @change="chageDate">
                <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
              </select>
            </div>
            <!-- select -->
            <div v-show="dateTab == 1" class="select_box" style="min-width:90px;">
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
                <div class="tbl_sheet sheet_scroll tbl_right">
                    <div class="thead_wrap">
                        <table class="tbl">
                            <colgroup>
                                <col>
                                <col style="width:15%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:15%;">
                                <col style="width:10%;">
                                <col style="width:15%;">
                                <col style="width:10%;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">SD 매출순위</th>
                                    <th scope="col">매출합계(천원)</th>
                                    <th scope="col">수량(개)</th>
                                    <th scope="col">근무상태</th>
                                    <th scope="col" v-if="this.dateTab==1">일평균매출(천원)</th>
                                    <th scope="col" v-if="this.dateTab==2">월평균매출(천원)</th>
                                    <th scope="col">매출등급기준</th>
                                    <th scope="col">매장</th>
                                    <th scope="col">매장형태</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="tbody_wrap ">
                        <table class="tbl tbl_right">
                            <colgroup>
                                <col>
                                <col style="width:15%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:15%;">
                                <col style="width:10%;">
                                <col style="width:15%;">
                                <col style="width:10%;">
                            </colgroup>
                            <tbody>
                                <tr v-for="(data, index) in listData" :key="index">
                                    <th scope="row" style="cursor:pointer" @click="selectedCODE == 'other' ? toOtherSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID) : toSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID, data.CHGUCD)">
                                      <span class="num_box">
                                        <strong>{{ index +1 }}</strong>
                                      </span>{{ data.NAME }}
                                      <span v-if="selectedCODE == 'other'">({{ data.BRNM }})</span>
                                      <span v-else>({{ data.BRCD }})</span>
                                    </th>
                                    <td v-if="selectedCODE != 'other'">{{ Math.round(data.SALE_TOT/1000) | currency }}</td>
                                    <td v-else>{{ Math.round(data.ONEAVGAMT/1000) | currency }}</td>
                                    <td class="tc">{{ data.QTY_TOT }}</td>
                                    <td class="tc">{{ data.JAEJIGNM }}</td>
                                    <td v-if="selectedCODE != 'other'">{{ Math.round(data.SALE_TOT/dayPermonth/1000) | currency }}</td>
                                    <td v-else>{{ Math.round(data.ONEAVGAMT/12/1000) | currency }}</td>
                                    <td class="tc">{{ data.AMTRATINGNM }}</td>
                                    <td class="tc">{{ data.VDSNM }}</td>
                                    <td class="tc">{{ data.CHGUNM }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <sdDetailPopup
            v-if="isSdDetailPopup"
            :data="detailPopupData"
            @close="closeListPopup"
        ></sdDetailPopup>
        <otherSdDetailPopup
            v-if="isOtherSdDetailPopup"
            :data="otherDetailPopupData"
            @close="closeListPopup"
        ></otherSdDetailPopup>
    </div>
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"

import sdDetailPopup from '@/pages/hum/HUM0201'
import otherSdDetailPopup from '@/pages/hum/HUM0301'

export default {
  name: 'HUM0103',
  components: {
    sdDetailPopup,
    otherSdDetailPopup
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created() {
    this.currentYear = moment().format("YYYY")
    this.currentMonth = moment().format("M")

    // 파라미터 받기
    this.initData()
    // 데이터 기준일
    this.getMakeDataDate()
    // 매출TOP리스트
    this.getSDList()
  },
  computed: {
    req2svr: () => req2svr,
    SelectCodeName() {
      if(this.selectedCODE == "our"){
        return "자사 SD전체"
      } else if(this.selectedCODE == "other"){
        return "타사"
      } else {
        return this.$store.getters.getBRCDCODNM(this.selectedCODE)
      }
    },
    filterName() {
      let value = "("
      if (this.selectRegion) {
        value += this.selectRegion
        if (this.selectGu || this.selectChgucd) {
          value += ", "
        }
      }
      if (this.selectGu) {
        value += this.selectGu
        if (this.selectChgucd) {
          value += ", "
        }
      }
      if (this.selectChgucd) {
        value += this.$store.getters.getCHGUCDCODNM(this.selectChgucd)
      }
      if (!this.selectRegion && !this.selectGu && !this.selectChgucd) {
        value = ""
      } else {
        value += ")"
      }
      return value
    }
  },
  data() {
    return { 
      selectedCODE: null,
      dateTab: 1,
      date: null,
      year: null,
      month: null,
      selectRegion: null,
      selectGu: null,
      selectChgucd: null,
      vdcdData: [],
      y_options: [],
      m_options: [],
      listData: [],
      makeDataDate: null,
      monthavg: null,
      currentYear: null,
      currentMonth: null,
      dayPermonth: "",
      isOtherSdDetailPopup: false,
      isSdDetailPopup: false,
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
      this.dateTab = this.data.dateTab
      this.selectRegion = this.data.selectRegion
      this.selectGu = this.data.selectGu
      this.selectChgucd = this.data.selectChgucd
      this.vdcdData = this.data.vdcdData
      this.selectedCODE = this.data.CODE

      let year = moment().format("YYYY")
      for (let i = 0; i < 3; i++) {
        this.y_options[i] = year - i;
      }
      this.y_options = _.sortBy(this.y_options)

      for (let i = 0; i < 12; i++) {
        this.m_options[i] = 12 - i;
      }
      this.m_options = _.sortBy(this.m_options)

      let month = this.month
      if (this.month.toString().length == 1) {
        month = "0" + this.month
      }

      if(this.dateTab == 1){ // 월간
        let currentYearMonth = moment().format("YYYYMM")
        if(currentYearMonth == this.year + month){ // 현재 년월
          this.dayPermonth = moment().format("DD")
        } else { // 다른 년월
          this.dayPermonth = moment(this.year + month + "01").endOf("month").format("DD")
        }
      } else { // 누적
        let currentYear = moment().format("YYYY")
        if(currentYear == this.year){ // 현재 년
          this.dayPermonth = moment(currentYear+month+"15").format("MM")
        } else { // 현재 다른 년(무조건 12)
          this.dayPermonth = 12
        }
      }
    },
    tabVal(val) {
      if (val == 1) {
        this.dateTab = 1
      } else {
        this.dateTab = 2
      }
      this.year = this.data.year
      this.month = this.data.month

      let month = this.month
      if (this.month.toString().length == 1) {
        month = "0" + this.month
      }

      if(this.dateTab == 1){ // 월간
        let currentYearMonth = moment().format("YYYYMM")
        if(currentYearMonth == this.year + month){ // 현재 년월
          this.dayPermonth = moment().format("DD")
        } else { // 다른 년월
          this.dayPermonth = moment(this.year + month + "01").endOf("month").format("DD")
        }
      } else { // 누적
        let currentYear = moment().format("YYYY")
        if(currentYear == this.year){ // 현재 년
          this.dayPermonth = moment(currentYear+month+"15").format("MM")
        } else { // 현재 다른 년(무조건 12)
          this.dayPermonth = 12
        }
      }

      this.getSDList()
    },
    chageDate() {
      this.getSDList()

      let month = this.month
      if (this.month.toString().length == 1) {
        month = "0" + this.month
      }

      if(this.dateTab == 1){ // 월간
        let currentYearMonth = moment().format("YYYYMM")
        if(currentYearMonth == this.year + month){ // 현재 년월
          this.dayPermonth = moment().format("DD")
        } else { // 다른 년월
          this.dayPermonth = moment(this.year + month + "01").endOf("month").format("DD")
        }
      } else { // 누적
        let currentYear = moment().format("YYYY")
        if(currentYear == this.year){ // 현재 년
          this.dayPermonth = moment(currentYear+month+"15").format("MM")
        } else { // 현재 다른 년(무조건 12)
          this.dayPermonth = 12
        }
      }
    },
    getSDList() {
      
      this.req2svr.getSDSalesData(this.selectedCODE, this.vdcdData, this.year, this.month, this.dateTab).then(
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
    },
    toSdDetail(VDCD,SNO,BRCD,SUCD,HRID,CHGUCD){
      this.detailPopupData = {VDCD: VDCD, SNO: SNO, BRCD:BRCD, SUCD:SUCD, HRID:HRID, CHGUCD:CHGUCD}
      this.isSdDetailPopup = true
    },
    toOtherSdDetail(VDCD,SNO,BRCD,SUCD,HRID){
      this.otherDetailPopupData = {VDCD: VDCD, SNO: SNO, BRCD:BRCD, SUCD:SUCD, HRID:HRID}
      this.isOtherSdDetailPopup = true
    },
    closeListPopup() {
      this.isSdDetailPopup = false
      this.isOtherSdDetailPopup = false
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