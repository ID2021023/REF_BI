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
        <!-- tabs -->
        <div class="toggle_group">
          <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': selectedCODE == data.MCODE}">
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              :value="data.MCODE"
              v-model="selectedCODE"
              style="display:none"
              @click="changeCODE(data.MCODE)"
              :disabled="!data.VISIBLE"
            >
            <span class="btn_n txt_label">
              {{ data.CODNM }}
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="160" height="50" class="svg_bl">
                <path
                  class="A"
                  d="M53.06 21.13H56v8.83h-2.94zM26.02 28h-.05l-3.82-7H19v8.84h2.83l.02-6.03h.05l3.2 6.03h1.77l3.3-6.03h.04v6.03h2.58V21h-3.25L26 28zm78.4-2.9h-5.9v-4.07h-2.47v8.92h2.47v-3.8h5.9v3.8h2.5v-8.92h-2.5v4.07zM118.1 21l-4.87 9h2.08l1.45-2.45h4.74l1.45 2.45H125l-4.9-9zm1 2.43l.38.65-.4-.65zm-1.8 3.07l1.75-3.07 1.76 3.07zm18.8-5.5h-2l-4.87 9h2.08l1.45-2.45h4.74l1.4 2.45h2.1zm-2.78 5.5l1.76-3.07 1.76 3.07zm-55.6-3.95c2.1 0 2.88.88 3.24 1.42h2.44c-.44-1.26-2.35-3-5.68-3C74 21 71 23.17 71 25.46s2.86 4.46 6.73 4.46c2.6 0 4.8-1 5.68-2.9H81c-.55.87-1.6 1.2-3.24 1.2-2.53 0-4-1.3-4-2.77-.05-1.28 1.13-2.9 3.97-2.9z"
                ></path>
              </svg> -->
            </span>
          </label>
        </div>
        <button v-if="choice === 2" type="button" class="btn_n point_col1 point_box1 txt_bold pl20 pr20 ml10" @click="toSalesStatus">월 평균 매출 현황</button>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- groups -->
        <div class="groups">
          <div class="toggle_group tg_sty01">
            <label class="tg_btn" :class="{'is-checked': choice === 1}">
              <input
                type="radio"
                id="option-d"
                class="tg_radio"
                name="select"
                :value="1"
                v-model="choice"
                style="display:none"
                @click="chageType(1)"
              />
              <span class="btn_n txt_label">일간</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': choice === 2}">
              <input
                type="radio"
                id="option-m"
                class="tg_radio"
                name="select"
                :value="2"
                v-model="choice"
                style="display:none"
                @click="chageType(2)"
              />
              <span class="btn_n txt_label">월간</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': choice === 3}">
              <input
                type="radio"
                id="option-a"
                class="tg_radio"
                name="select"
                :value="3"
                v-model="choice"
                style="display:none"
                @click="chageType(3)"
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
          <div v-show="choice == 2 || choice == 3" class="select_box" style="min-width:120px;">
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
          <div class="select_box" style="min-width:200px;">
            <select class="select" v-model="store" @change="chageStore">
              <option :value="0">매장 선택</option>
              <option v-for="data in selectStoreNameSortList" :key="data.VDCD" :value="data.VDCD">{{ data.VDSNM }}</option>
            </select>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col_md_5">
            <div class="cont_box map_view">
              <div class="list_box_s shop_info">
                <div class="view col_md_9">
                  <dl class="list_var">
                    <dt class="tit">매장</dt>
                    <dd class="txt">
                      <div class="groups">
                        <div class="select_box" style="width:40%;">
                          <select class="select input_s" v-model="selectRegion" @change="changeRegion">
                            <option value="전국">전국({{ totalRegionCount }})</option>
                            <option v-for="data in regionData" :key="data.RENNM" :value="data.RENNM">{{ data.RENNM }}({{ data.CNT }})</option>
                          </select>
                        </div>
                        <!-- <div class="select_box" style="width:30%;">
                          <select class="select input_s" v-model="selectStoreSU" @change="changeStoreSU">
                            <option :value="0">사업부</option>
                            <option v-for="data in storeSUData" :key="data.SUCD" :value="data.SUCD">{{ data.CODNM }}({{ data.CNT }})</option>
                          </select>
                        </div> -->
                        <div class="select_box" style="width:40%;">
                          <select class="select input_s" v-model="selectStoreType" @change="changeStoreType">
                            <option :value="0">매장 구분</option>
                            <option v-for="data in storeTypeData" :key="data.SHGUNM" :value="data.SHGUNM">{{ data.SHGUNM }}({{ data.CNT }})</option>
                          </select>
                        </div>
                        <div class="select_box" style="width:35%;">
                          <select class="select input_s" v-model="selectStoreOption" @change="changeStoreOption">
                            <option :value="0">매장 형태</option>
                            <option v-for="data in storeOptionData" :key="data.SHTPNM" :value="data.SHTPNM">{{ data.SHTPNM }}({{ data.CNT }})</option>
                          </select>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
                <div class="view col_md_3">
                  <dl class="list_var">
                    <dt class="tit">매출합계</dt>
                    <dd class="txt">
                      <strong>{{Math.round(selectTotalAMT/1000000) | currency}}</strong><small class="txt">백만원</small>
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- <map-view style="height:697px" v-if="showMap" :points="points" :selectPoints="selectPoints" :regionCount="regionCount"></map-view> -->
              <map-view style="height:697px"
                :CODE="this.selectedMapCODE"
                :selectRegion="selectRegion"
                :orgPoints="mapOrgStoreList"
                :selectPoints="mapSelectStoreList"
                :selectPoint="selectStorePoint"
                :selectRegionData="mapRegionData"
                @toDetail="mapSelectToStoreDetail"></map-view>
            </div>
          </div>
          <div class="col_md_7">
            <div class="row row_box">
              <div class="col_md_6">
                <div class="cont_box">
                  <div class="tit">
                    <strong class="tit_txt">매출 TOP 10</strong>
                    <div class="layout_spacer"></div>
                    <button class="btn_icon btn_s btn_edge_sty01" @click="clickAddButton(true)"><i class="material-icons">add</i></button>
                  </div>
                  <div class="cont">
                    <div class="list_num list_stripe list_sty01 mb20">
                      <ul class="list">
                        <li v-for="(b_store, index) in storeBest10List" :key="b_store.VDCD">
                          <div class="inner teamSelector" @click="toStoreDetail(b_store.VDCD)">
                            <span class="num_box">{{index+1}}</span>
                            <div class="txt_name" >
                              {{ b_store.VDSNM }}
                              <div class="chip_view">
                                <span class="chip chip_sty04"><span class="chip_text">{{b_store.SHTPNM}}</span></span>
                                <span class="chip chip_sty05" v-show="b_store.SHGUNM != b_store.SHTPNM"><span class="chip_text">{{b_store.SHGUNM}}</span></span>
                              </div>
                            </div>
                            <span class="txt_result">{{Math.round(b_store.TSAMT/1000) | currency }} 천원</span>
                          </div>
                          <button
                            type="button"
                            class="btn_icon btn_s btn_round"
                            :disabled="b_store.LAT == '' || b_store.LNG == '' || b_store.LAT == 0 || b_store.LNG == 0"
                            @click="toStorePoint(b_store)"
                          ><i class="material-icons">pin_drop</i></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col_md_6">
                <div class="cont_box">
                  <div class="tit">
                    <strong class="tit_txt">매출 WORST 10</strong>
                    <div class="layout_spacer"></div>
                    <button class="btn_icon btn_s btn_edge_sty01" @click="clickAddButton(false)"><i class="material-icons">add</i></button>
                  </div>
                  <div class="cont">
                    <div class="list_num list_stripe mb20">
                      <ul class="list">
                        <li v-for="(w_store, index) in storeWorst10List" :key="w_store.VDCD">
                          <div class="inner teamSelector" @click="toStoreDetail(w_store.VDCD)">
                            <span class="num_box">{{index+1}}</span>
                            <div class="txt_name">
                              {{ w_store.VDSNM }}
                              <div class="chip_view">
                                <span class="chip chip_sty04"><span class="chip_text">{{w_store.SHTPNM}}</span></span>
                                <span class="chip chip_sty05" v-show="w_store.SHGUNM != w_store.SHTPNM"><span class="chip_text">{{w_store.SHGUNM}}</span></span>
                              </div>
                            </div>
                            <span class="txt_result">{{Math.round(w_store.TSAMT/1000) | currency }} 천원</span>
                          </div>
                          <button
                            type="button"
                            class="btn_icon btn_s btn_round"
                            :disabled="w_store.LAT == '' || w_store.LNG == '' || w_store.LAT == 0 || w_store.LNG == 0"
                            @click="toStorePoint(w_store)"
                          ><i class="material-icons">pin_drop</i></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <storeListPopup
      v-if="isStoreListPopup"
      :data="listPopupData"
      @close="closeListPopup"
    ></storeListPopup>
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
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import mapView from '@/components/mapView'
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

import storeListPopup from '@/pages/store/STO0002'
import storeMonthDetailPopup from '@/pages/store/STO0101'
import storeDailyDetailPopup from '@/pages/store/STO0102'
import storeCumulativeDetailPopup from '@/pages/store/STO0103'

export default {
  name: "STO0001",
  components: {
    sideMenu,
    mapView,
    datePick,
    storeListPopup,
    storeMonthDetailPopup,
    storeDailyDetailPopup,
    storeCumulativeDetailPopup
  },
  props: {
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.date = moment().subtract(1, "days").format("YYYY-MM-DD")

    this.year = moment().format("YYYY")
    this.month = moment().format("M")

    let year = moment().format("YYYY")
    for (var i = 0; i < 3; i++) {
      this.y_options[i] = year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    for (var i = 0; i < 12; i++) {
      this.m_options[i] = 12 - i;
    }
    this.m_options = _.sortBy(this.m_options)
    console.log(this.authCodeList)
    this.selectedCODE = this.authCodeList[0].MCODE
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
      let STOList = this.$store.getters.getSTOList
      for(var i=0; i<STOList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:STOList[i].MCODE})
        if (data) {
          STOList[i].VISIBLE = true
        } else {
          STOList[i].VISIBLE = false
        }
      }
      return STOList
    },
    isTabTypeSU() {
      return this.$store.getters.getSTOList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getSTOList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[1]
      }
      return this.$store.getters.getAuthBRCDCode[1]
    },
    totalRegionCount() {
      return _.sumBy(this.regionData, function(o) { return Number(o.CNT) })
    },
    storeBest10List() {
      let filterList = _.filter(this.selectStoreList, function(o) { return o.TSAMT != null })
      return _.orderBy(filterList, function(o) { return o.TSAMT }, 'desc').slice(0, 10)
    },
    storeWorst10List() {
      let filterList = _.filter(this.selectStoreList, function(o) { return o.TSAMT != null })
      return _.orderBy(filterList, function(o) { return o.TSAMT }, 'asc').slice(0, 10)
    },
    selectStoreNameSortList() {
      let filterList = _.filter(this.selectStoreList, function(o) { return o.TSAMT != null })
      return _.orderBy(filterList, function(o) { return o.VDSNM }, 'asc')
    }
  },
  data() {
    return {
      drawer: null,
      y_options: [],
      m_options: [],
      selectedCODE: "1",
      selectedMapCODE: "1",
      choice: 2,
      year: "",
      month: "",
      date: "",
      store: 0,
      selectRegion: "전국",
      regionData: [],
      selectPriority: 0,
      selectSubPriority: 0,
      selectStorePoint: {},
      selectStoreSU: 0,
      storeSUData: [],
      selectStoreType: 0,
      storeTypeData: [],
      selectStoreOption: 0,
      storeOptionData: [],
      selectTotalAMT: 0,
      mapRegionData: [],
      mapOrgStoreList: [],
      mapSelectStoreList: [],
      selectStoreList: [
        { LAT: "", LNG: "", ADDR1: "", ADDR2: "", RENCD: "", RENNM: "", SHGU: "", SHGUNM: "", SHTP: "", SHTPNM: "", TELNO: "", VDCD: "", VDSNM: "", ZIPCODE: "", TSAMT: 0 }
      ],
      isStoreMonthDetailVisible: false,
      isStoreDailyDetailVisible: false,
      isStoreCumulativeDetailVisible: false,
      detailPopupData: {},
      isStoreListPopup: false,
      listPopupData: {},
      makeDataDate: null,
      yesterday : moment().subtract(1, "days").format("YYYYMMDD"),
      selectedStoreVDCDList: []
    }
  },
  methods: {
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      // if(this.choice != 3){
      //   this.selectStoreSU = 0
      //   this.selectStoreType = 0
      //   this.selectStoreOption = 0
      // }
        this.selectPriority = 0
        this.selectSubPriority = 0
        this.getMakeDataDate()
        // this.getRegionData()
        // this.getStoreSUData()
        // this.getStoreTypeData()
        // this.getStoreOptionData()
        // this.getSelectVDCDStoreInfo()
        // 데이터를 순차적으로 가져와야 하므로 Promiss 적용
        // return this.getRegionData().then(() => this.getStoreSUData())
        return this.getRegionData().then(() => this.getStoreTypeData())
        .then(() => this.getStoreOptionData())
        .then(() => this.getSelectVDCDStoreInfo())
    },
    getTotalAMT() {
      this.selectedStoreVDCDList = _.map(this.selectStoreList, 'VDCD')
      if(this.choice == 1) {
        this.getDailyTotalAMT()
        this.getDailyStoreList()
      } else if(this.choice == 3) {
        this.getCumulativeTotalAMT()
        this.getCumulativeStoreList()
      } else {
        this.getMonthTotalAMT()
        this.getMonthStoreList()
      }
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
    getRegionData() {
      this.regionData = []

      return this.req2svr.getRegionData(this.choice, this.tabType, this.selectedCODE, this.date, this.year, this.month, this.yesterday).then(
        res => {
          this.regionData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.regionData.push(res);
            } else {
              this.regionData = JSON.parse("[" + res + "]")
            }
            this.mapRegionData = _.cloneDeep(this.regionData)
            // this.selectRegion = "전국"
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSelectRegionData() {
      this.mapRegionData = []

      return this.req2svr.getSelectRegionData(this.choice, this.tabType, this.selectedCODE, this.date, this.year, this.month, this.yesterday,
        this.selectRegion, this.selectStoreType, this.selectStoreOption, this.selectStoreSU).then(
        res => {
          this.mapRegionData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.mapRegionData.push(res);
            } else {
              this.mapRegionData = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStoreSUData() {      
      return this.req2svr.getStoreSUData(this.choice, this.tabType, this.selectedCODE, this.date, this.year, this.month, this.yesterday,
        this.selectRegion).then(
        res => {
          // this.storeSUData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              if(this.storeSUData.length == 0){
                this.storeSUData.push(res)
                this.storeSUData[0].CODNM = this.$store.getters.getSUCDCODNM(res.SUCD)
              }else{
                this.storeSUData.forEach(storeSUData =>{
                  if(storeSUData.SUCD === String(res.SUCD)){
                    storeSUData.CNT = res.CNT
                  }else{
                    storeSUData.CNT = 0
                  }
                  return storeSUData
                })
              }
            } else {
              if(this.storeSUData.length == 0){
                this.storeSUData = JSON.parse("[" + res + "]")
                for (let i=0;i<this.storeSUData.length;i++) {
                  this.storeSUData[i].CODNM = this.$store.getters.getSUCDCODNM(this.storeSUData[i].SUCD)
                }
              }else{
                let tempData = JSON.parse("[" + res + "]")
                this.storeSUData.forEach(storeSUData =>{
                  let suData = tempData.find(tempData => tempData.SUCD === storeSUData.SUCD)
                  if(suData)
                    storeSUData.CNT = suData.CNT
                  else
                    storeSUData.CNT = 0
                  return storeSUData
                })
              }
            }
          }
          // this.selectStoreSU = 0
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStoreTypeData() {
      return this.req2svr.getStoreTypeData(this.choice, this.tabType, this.selectedCODE, this.date, this.year, this.month, this.yesterday,
        this.selectRegion, this.selectStoreSU).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            //데이터가 없을 때 모든 CNT를 0으로 변경
            this.storeTypeData.forEach(storeTypeData =>{
              storeTypeData.CNT = 0
            })
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              if(this.storeTypeData.length == 0){
                this.storeTypeData.push(res)
              }else{
                this.storeTypeData.forEach(storeTypeData =>{
                  if(storeTypeData.SHGUNM === String(res.SHGUNM)){
                    storeTypeData.CNT = res.CNT
                  }else{
                    storeTypeData.CNT = 0
                  }
                })
              }
            } else {
              if(this.storeTypeData.length == 0){
                this.storeTypeData = JSON.parse("[" + res + "]")
              }else{
                let tempData = JSON.parse("[" + res + "]")
                this.storeTypeData.forEach(storeTypeData =>{
                  let typeData = tempData.find(tempData => tempData.SHGUNM === storeTypeData.SHGUNM)
                  if(typeData)
                    storeTypeData.CNT = typeData.CNT
                  else
                    storeTypeData.CNT = 0
                })
              }
            }
          }
          // this.selectStoreType = 0
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStoreOptionData() {
      return this.req2svr.getStoreOptionData(this.choice, this.tabType, this.selectedCODE, this.date, this.year, this.month, this.yesterday,
        this.selectRegion, this.selectStoreType, this.selectStoreSU).then(
        res => {
          // this.storeOptionData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            //데이터가 없을 때 모든 CNT를 0으로 변경
            this.storeOptionData.forEach(storeOptionData =>{
              storeOptionData.CNT = 0
            })
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              if(this.storeOptionData.length == 0){
                this.storeOptionData.push(res)
              }else{
                this.storeOptionData.forEach(storeOptionData =>{
                  if(storeOptionData.SHTPNM === String(res.SHTPNM)){
                    storeOptionData.CNT = res.CNT
                  }else{
                    storeOptionData.CNT = 0
                  }
                })
              }
            } else {
              if(this.storeOptionData.length == 0){
                this.storeOptionData = JSON.parse("[" + res + "]")
              }else{
                let tempData = JSON.parse("[" + res + "]")
                this.storeOptionData.forEach(storeOptionData =>{
                  let typeData = tempData.find(tempData => tempData.SHTPNM === storeOptionData.SHTPNM)
                  if(typeData)
                    storeOptionData.CNT = typeData.CNT
                  else
                    storeOptionData.CNT = 0
                })
              }
            }
          }
          // this.selectStoreOption = 0
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSelectVDCDStoreInfo() {
      this.selectTotalAMT = 0
      this.selectStoreList = [
        { LAT: "", LNG: "", ADDR1: "", ADDR2: "", RENCD: "", RENNM: "", SHGU: "", SHGUNM: "", SHTP: "", SHTPNM: "", TELNO: "", VDCD: "", VDSNM: "", ZIPCODE: "", TSAMT: 0}
      ]

      let region = _.find(this.regionData, {RENNM: this.selectRegion})
      let type = _.find(this.storeTypeData, {SHGUNM: this.selectStoreType})
      let option = _.find(this.storeOptionData, {SHTPNM: this.selectStoreOption})
      let su = _.find(this.storeSUData, {SUCD: this.selectStoreSU})
      
      if (!region && !type && !option && !su) {
        this.mapOrgStoreList = []
        this.mapSelectStoreList = []
        this.mapRegionData = _.cloneDeep(this.regionData)
      } else {
        this.getSelectRegionData()
      }

      return this.req2svr.getSelectVDCDStoreInfo(this.choice, this.tabType, this.selectedCODE, this.date, this.year, this.month, this.yesterday,
        this.selectRegion, this.selectStoreType, this.selectStoreOption, this.selectStoreSU).then(
        res => {
          this.selectStoreList = [
            { LAT: "", LNG: "", ADDR1: "", ADDR2: "", RENCD: "", RENNM: "", SHGU: "", SHGUNM: "", SHTP: "", SHTPNM: "", TELNO: "", VDCD: "", VDSNM: "", ZIPCODE: "", TSAMT: 0}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.selectStoreList = []
              this.selectStoreList.push(res)
            } else {
              this.selectStoreList = JSON.parse("[" + res + "]")
            }
            if (!region && !type && !option && !su) {
              this.mapOrgStoreList = _.cloneDeep(this.selectStoreList)
            } else {
              this.mapSelectStoreList = _.cloneDeep(this.selectStoreList)
            }            
            this.getTotalAMT()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDailyStoreList() {      
      this.req2svr.getDailyStoreList(this.tabType, this.selectedCODE, this.date, this.selectedStoreVDCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              let data = _.find(this.selectStoreList, { VDCD: res.VDCD })
              if (data) {
                data.TSAMT = Number(res.TSAMT)
              }
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<this.selectStoreList.length;i++) {
                let data = _.find(list, { VDCD: this.selectStoreList[i].VDCD })
                if (data) {
                  this.selectStoreList[i].TSAMT = Number(data.TSAMT)
                }
              }
            }
            this.selectStoreList.sort(function(a, b) {
              return b["TSAMT"] - a["TSAMT"]
            })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMonthStoreList() {
      this.req2svr.getMonthStoreList(this.tabType, this.selectedCODE, this.year, this.month, this.selectedStoreVDCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              let data = _.find(this.selectStoreList, { VDCD: res.VDCD })
              if (data) {
                data.TSAMT = Number(res.TSAMT) + Number(data.ADVDEPAMT)
              }
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<this.selectStoreList.length;i++) {
                let data = _.find(list, { VDCD: this.selectStoreList[i].VDCD })
                if (data) {
                  this.selectStoreList[i].TSAMT = Number(data.TSAMT) + Number(data.ADVDEPAMT)
                }
              }
            }
            this.selectStoreList.sort(function(a, b) {
              return b["TSAMT"] - a["TSAMT"]
            })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getCumulativeStoreList() {
      this.req2svr.getCumulativeStoreList(this.tabType, this.selectedCODE, this.year, this.month, this.selectedStoreVDCDList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              let data = _.find(this.selectStoreList, { VDCD: res.VDCD })
              if (data) {
                data.TSAMT = Number(res.TSAMT) + Number(data.ADVDEPAMT)
              }
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<this.selectStoreList.length;i++) {
                let data = _.find(list, { VDCD: this.selectStoreList[i].VDCD })
                if (data) {
                  this.selectStoreList[i].TSAMT = Number(data.TSAMT) + Number(data.ADVDEPAMT)
                }
              }
            }
            this.selectStoreList.sort(function(a, b) {
              return b["TSAMT"] - a["TSAMT"]
            })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDailyTotalAMT() {
      this.selectTotalAMT = 0

      this.req2svr.getDailyTotalAMT(this.tabType, this.selectedCODE, this.date, this.selectedStoreVDCDList.toString()).then(
        res => {
          this.selectTotalAMT = 0
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.selectTotalAMT = res.AMT
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMonthTotalAMT() {
      this.selectTotalAMT = 0

      this.req2svr.getMonthTotalAMT(this.tabType, this.selectedCODE, this.year, this.month, this.selectedStoreVDCDList.toString()).then(
        res => {
          this.selectTotalAMT = 0
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.selectTotalAMT = Number(res.TSAMT) + Number(res.ADVDEPAMT)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getCumulativeTotalAMT() {
      this.selectTotalAMT = 0

      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      
      if (this.year != moment().format("YYYY")) {
        month = "12"
      }

      this.req2svr.getCumulativeTotalAMT(this.tabType, this.selectedCODE, this.year, this.month, this.selectedStoreVDCDList.toString()).then(
        res => {
          this.selectTotalAMT = 0
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.selectTotalAMT = Number(res.TSAMT) + Number(res.ADVDEPAMT)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    changeRegion() {
      // this.selectStoreSU = 0
      // this.selectStoreType = 0
      // this.selectStoreOption = 0
      this.selectPriority = 0
      this.selectSubPriority = 0
      // this.getStoreSUData()
      // this.getStoreTypeData()
      // this.getStoreOptionData()
      // this.getSelectVDCDStoreInfo()
      // 데이터를 순차적으로 가져와야 하므로 Promiss 적용
      // this.getRegionData().then(() => this.getStoreSUData())
      this.getRegionData().then(() => this.getStoreTypeData())
      .then(() => this.getStoreOptionData())
      .then(() => this.getSelectVDCDStoreInfo())
      // this.getSelectVDCDStoreInfo()
    },
    changeSelectOption() {
      if (this.selectStoreSU == 0) {
        if (this.selectPriority == 1) {
          this.selectPriority = 0
        }
        if (this.selectSubPriority == 1) {
          this.selectSubPriority = 0
        }
        this.getStoreSUData()
      }
      if (this.selectStoreType == 0) {
        if (this.selectPriority == 2) {
          this.selectPriority = 0
        }
        if (this.selectSubPriority == 2) {
          this.selectSubPriority = 0
        }
        this.getStoreTypeData()
      }
      if (this.selectStoreOption == 0) {
        if (this.selectPriority == 3) {
          this.selectPriority = 0
        }
        if (this.selectSubPriority == 3) {
          this.selectSubPriority = 0
        }
        this.getStoreOptionData()
      }
    },
    changeStoreSU() {
      // if (this.selectPriority == 0) {
      //   this.selectPriority = 1
      // } else if (this.selectSubPriority == 0) {
      //   this.selectSubPriority = 1
      // }
      // if (this.selectPriority == 1) {
      //   this.selectSubPriority = 0
      //   // this.selectStoreType = 0
      //   this.getStoreTypeData()
      //   // this.selectStoreOption = 0
      //   this.getStoreOptionData()
      // } else if (this.selectSubPriority == 1) {
      //   if (this.selectPriority == 3) {
      //     this.selectStoreType = 0
      //     this.getStoreTypeData()
      //   } else if (this.selectPriority == 2) {
      //     // this.selectStoreOption = 0
      //     this.getStoreOptionData()
      //   }
      // }
      this.getStoreTypeData()
      .then(() => this.getStoreOptionData())
      .then(() => this.getSelectVDCDStoreInfo())
    },
    changeStoreType() {
      // if (this.selectPriority == 0) {
      //   this.selectPriority = 2
      // } else if (this.selectSubPriority == 0) {
      //   this.selectSubPriority = 2
      // }
      // if (this.selectPriority == 2) {
      //   this.selectSubPriority = 0
      //   // this.selectStoreSU = 0
      //   this.getStoreSUData()
      //   // this.selectStoreOption = 0
      //   this.getStoreOptionData()
      // } else if (this.selectSubPriority == 2) {
      //   if (this.selectPriority == 3) {
      //     // this.selectStoreSU = 0
      //     this.getStoreSUData()
      //   } else if (this.selectPriority == 1) {
      //     // this.selectStoreOption = 0
      //     this.getStoreOptionData()
      //   }
      // }
      // this.changeSelectOption()
      this.getStoreOptionData()
      .then(() => this.getSelectVDCDStoreInfo())
    },
    changeStoreOption() {
      // if (this.selectPriority == 0) {
      //   this.selectPriority = 3
      // } else if (this.selectSubPriority == 0) {
      //   this.selectSubPriority = 3        
      // }
      // if (this.selectPriority == 3) {
      //   this.selectSubPriority = 0
      //   // this.selectStoreSU = 0
      //   this.getStoreSUData()
      //   // this.selectStoreType = 0
      //   this.getStoreTypeData()
      // } else if (this.selectSubPriority == 3) {
      //   if (this.selectPriority == 2) {
      //     // this.selectStoreSU = 0
      //     this.getStoreSUData()
      //   } else if (this.selectPriority == 1) {
      //     // this.selectStoreType = 0
      //     this.getStoreTypeData()
      //   }
      // }
      // this.changeSelectOption()
      this.getSelectVDCDStoreInfo()
    },
    changeCODE(code) {
      this.selectedCODE = code
      this.selectStoreSU = 0
      this.selectStoreType = 0
      this.selectStoreOption = 0
      this.storeSUData = []
      this.storeTypeData = []
      this.storeOptionData = []
      this.selectRegion = "전국"
      this.selectedMapCODE = this.selectedCODE
      this.mapOrgStoreList = []
      this.mapRegionData = []
      this.loadData()
    },
    chageDate() {
      this.loadData()
    },
    chageType(value) {
      this.choice = value
      // this.date = moment().format("YYYY-MM-DD")
      this.date = moment().subtract(1, "days").format("YYYY-MM-DD")
      this.year = moment().format("YYYY")
      this.month = moment().format("M")
      this.loadData()
    },
    clickAddButton(isBest) {
      this.listPopupData = {
        CODE: this.selectedCODE, year: this.year, month: this.month, date: this.date,
        alignType: isBest, dateTab: this.choice,
        selectRegion: this.selectRegion != '전국' ? this.selectRegion : null,
        selectStoreType: this.selectStoreType != 0 ? this.selectStoreType : null,
        selectStoreSU: this.selectStoreSU != 0 ? this.selectStoreSU : null,
        selectStoreOption: this.selectStoreOption != 0 ? this.selectStoreOption : null,
        selectStoreList: this.selectStoreList
      }
      this.isStoreListPopup = true
    },
    closePopup() {
      this.store = 0
      this.isStoreMonthDetailVisible = false
      this.isStoreDailyDetailVisible = false
      this.isStoreCumulativeDetailVisible = false
      
    },
    closeListPopup() {
      this.isStoreListPopup = false
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
    toMain() {
      this.$router.replace("/")
    },
    toSalesStatus() {
      // this.$router.replace("/StoreSalesStatus")
      this.$router.push({
          name: 'STO0003',
          params: {
            data: {
              selectedCODE: this.selectedCODE, // 사업부 코드
              choice: this.choice, // 월간
              year: this.year, // 년도
              month: this.month, // 월
            }
          }
        })
    },
    chageStore() {
      this.toStoreDetail(this.store, this.choice)
    },
    mapSelectToStoreDetail(VDCD) {
      this.toStoreDetail(VDCD, this.choice)
    },
    toStoreDetail(VDCD, choice) {
      choice = choice ? choice : this.choice
      VDCD = VDCD ? VDCD : this.store
      this.detailPopupData = {VDCD: VDCD, CODE: this.selectedCODE, year: this.year, month: this.month, date: this.date, storeList: this.selectStoreList, selectStoreSU: this.selectStoreSU != 0 ? this.selectStoreSU : null}
      if (choice == 3) {
        this.isStoreMonthDetailVisible = false
        this.isStoreDailyDetailVisible = false
        this.isStoreCumulativeDetailVisible = true
      } else if (choice == 1) {
        this.isStoreMonthDetailVisible = false
        this.isStoreDailyDetailVisible = true
        this.isStoreCumulativeDetailVisible = false
      } else {
        this.isStoreMonthDetailVisible = true
        this.isStoreDailyDetailVisible = false
        this.isStoreCumulativeDetailVisible = false
      }
    },
    toStorePoint(data) {
      if (data.LAT != '' && data.LNG != '') {
        this.selectStorePoint = data
      }
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
}
</script>

