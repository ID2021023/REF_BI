<template>
  <div class="wrap">
    <!-- side menu -->
    <div class="layout_drawer" :class="{on: drawer}">
      <h1 class="tit_drawer teamSelector" @click="toMain">
        <img src="@/assets/images/img_logo.png" alt="sisun">
      </h1>
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
        <button type="button" class="btn_n btn_icon btn_prev mr10" @click="toHumMain">
          <i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <!-- tabs -->
        <div class="toggle_group">
            <label class="tg_btn" :class="{'is-checked': selectedCODE == 'our'}">
                <input 
                type="radio" 
                id="option-1"
                class="tg_radio"
                name="options" 
                value="our" 
                v-model="selectedCODE"
                style="display:none"
                @click="changeCODE('our')">
                <span class="btn_n txt_label">자사 SD전체</span>
            </label>
            <label v-for="data in BRCDList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': selectedCODE == data.MCODE}">
                <input
                type="radio"
                id="option-1"
                class="tg_radio"
                name="options"
                :value="data.MCODE"
                v-model="selectedCODE"
                style="display:none"
                @click="changeCODE(data.MCODE)"
                >
                <span class="btn_n txt_label">{{ data.CODNM }}</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': selectedCODE == 'other'}">
                <input 
                type="radio" 
                id="option-1"
                class="tg_radio"
                name="options" 
                value="other" 
                v-model="selectedCODE"
                style="display:none"
                @click="changeCODE('other')">
                <span class="btn_n txt_label">타사</span>
            </label>
        </div>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- groups -->
        <div v-show="selectedCODE != 'other'" class="groups">
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
                @click="chageType(1)"
              />
              <span class="btn_n txt_label">월간</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': choice === 2}">
              <input
                type="radio"
                id="option-a"
                class="tg_radio"
                name="select"
                :value="2"
                v-model="choice"
                style="display:none"
                @click="chageType(2)"
              />
              <span class="btn_n txt_label">누적</span>
            </label>
            </div>
            <!-- select -->
          <div v-show="choice == 1 || choice == 2" class="select_box" style="min-width:120px;">
            <select class="select" v-model="year" @change="chageDate">
              <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
            </select>
          </div>
          <!-- select -->
          <div v-show="choice == 1" class="select_box" style="min-width:90px;">
            <select class="select" v-model="month" @change="chageDate">
              <option v-for="data in m_options" :key="data" :value="data">{{ data }}월</option>
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
                                <div class="view col_md_8">
                                    <dl class="list_var">
                                        <dt class="tit">주거지역별</dt>
                                        <dd class="txt">
                                            <div class="groups">
                                                <div class="select_box" style="width:50%;">
                                                    <select class="select input_s" v-model="selectRegion" @change="changeRegion">
                                                        <option value="전국">전국(시/도)</option>
                                                        <option v-for="data in regionData" :key="data.SI" :value="data.SI">{{ data.SI }}</option>
                                                    </select>
                                                </div>
                                                <div class="select_box" style="width:50%;">
                                                    <select class="select input_s" :class="{'disabled': selectRegion == '전국'}" v-model="selectGu" @change="changeGu">
                                                        <option value="전체">구/군 전체</option>
                                                        <option v-for="(data,index) in guData" :key="index" :value="data.GU">{{ data.GU }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="view col_md_4">
                                    <dl class="list_var">
                                        <dt class="tit">유통망별</dt>
                                        <dd class="txt">
                                            <div class="select_box" style="width:100%;">
                                                <select class="select input_s" v-model="selectChgucd" @change="chageChgucd">
                                                    <option value="전체">매장형태 전체</option>
                                                    <option v-for="data in CHGUList" :key="data.CODE" :value="data.CODE">{{ data.CODNM }}</option>
                                                </select>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="map">
                                <map-view-Hr style="height:697px"
                                :CODE="this.selectedCODE"
                                v-model="selectRegion"
                                @change="changeRegion"
                                :selectRegionProp="selectRegion"
                                :selectChgucdProp="selectChgucd"
                                :selectRegionSIData="mapRegionSIData"
                                :selectRegionGUNGUData="mapRegionGUNGUData"></map-view-Hr>
                            </div>
                        </div>
                    </div>

                    <div class="col_md_7">
                        <div class="cont_box">
                            <div class="tit">
                                <strong v-if="selectedCODE == 'other'" class="tit_txt">타사인력</strong>
                                <strong v-else class="tit_txt">매출 TOP 20</strong>
                                <div class="layout_spacer"></div>
                                <button class="btn_icon btn_s btn_edge_sty01" @click="toSdSalesList()"><i class="material-icons">add</i></button>
                            </div>

                            <div class="cont">
                                <div class="list_num list_sty01 list_stripe row">



                                    <!-- 좌측 매출 1위~10위 -->
                                    <ul class="list col_md_6 npl" style="border-right: 1px solid #f7f7fb">
                                        <li v-if="noResult">검색결과가 없습니다.</li>
                                        <li v-for="(data,index) in SDList10" :key="index" :value="data.VDCD">
                                            <div class="inner" @click="selectedCODE == 'other' ? toOtherSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID) : toSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID, data.CHGUCD)">
                                                <span class="num_box">{{ index+1 }}</span>
                                                <div class="txt_name" style="flex-basis:unset">
                                                    {{ data.NAME }} SD
                                                    <div class="chip_view">
                                                        <span class="chip chip_sty04"><span class="chip_text">{{ data.CHGUNM }}</span></span>
                                                        <small v-if="selectedCODE == 'other'"><a href="javascript:void(0);">{{ data.VDSNM }}({{ data.BRNM }})</a><i class="material-icons">store</i></small>
                                                        <small v-else><a href="javascript:void(0);">{{ data.VDSNM }}({{ data.BRCD }})</a><i class="material-icons">store</i></small>
                                                    </div>
                                                </div>
                                                <span v-if="selectedCODE != 'other'" class="txt_result">{{ Math.round(data.TOT_AMT/1000) | currency }} 천원</span>
                                                <span v-else class="txt_result">{{ Math.round(data.ONEAVGAMT/1000) | currency }} 천원</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <!-- 우측 매출 11위~20위 -->
                                    <ul class="list col_md_6 npr">
                                        <li v-for="(data,index) in SDList20" :key="index" :value="data.VDCD">
                                            <div class="inner" @click="selectedCODE == 'other' ? toOtherSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID) : toSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID, data.CHGUCD)">
                                                <span class="num_box" style="background: #0f0d3c">{{ index+11 }}</span>
                                                <div class="txt_name" style="flex-basis:unset">
                                                    {{ data.NAME }} SD
                                                    <div class="chip_view">
                                                        <span class="chip chip_sty04"><span class="chip_text">{{ data.CHGUNM }}</span></span>
                                                        <small v-if="selectedCODE == 'other'"><a href="javascript:void(0);">{{ data.VDSNM }}({{ data.BRNM }})</a><i class="material-icons">store</i></small>
                                                        <small v-else><a href="javascript:void(0);">{{ data.VDSNM }}({{ data.BRCD }})</a><i class="material-icons">store</i></small>
                                                    </div>
                                                </div>
                                                <span v-if="selectedCODE != 'other'" class="txt_result">{{ Math.round(data.TOT_AMT/1000) | currency }} 천원</span>
                                                <span v-else class="txt_result">{{ Math.round(data.ONEAVGAMT/1000) | currency }} 천원</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <sdSalesListPopup
            v-if="isSdSalesListPopup"
            :data="listPopupData"
            @close="closeListPopup"
        ></sdSalesListPopup>
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
</template>


<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'
import mapViewHr from '@/components/mapViewHr'

import sdSalesListPopup from '@/pages/hum/HUM0103'
import sdDetailPopup from '@/pages/hum/HUM0201'
import otherSdDetailPopup from '@/pages/hum/HUM0301'

export default {
  name: "HUM0101",
  components: {
    sideMenu,
    mapViewHr,
    sdSalesListPopup,
    sdDetailPopup,
    otherSdDetailPopup
  },
  props: {
    data: {
      type: Object
    }
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
  },
  computed: {
    req2svr: () => req2svr,
    // 브랜드 리스트
    BRCDList() {
      let HUMList = this.$store.getters.getHUMList
      return HUMList
    },
    // 매장형태 리스트
    CHGUList() {
      let CHGUList = this.$store.getters.getCHGUCDList
      return CHGUList
    },
    // SD정보(1위~10위)
    SDList10(){
      return this.sdData.slice(0, 10)
    },
    // SD정보(10위~20위)
    SDList20(){
      return this.sdData.slice(10, 20)
    }
  },
  data() {
    return {
      drawer: null,
      y_options: [],
      m_options: [],
      selectedCODE: 'our',
      choice: 2,
      year: "",
      month: "",
      date: "",
      selectRegion: "전국",
      selectGu: "전체",
      selectChgucd: "전체",
      regionData: [],
      guData: [],
      vdcdData: [],
      sdData: [],
      mapRegionSIData: [],
      mapRegionGUNGUData: [],
      mapSelectStoreList: [],
      isOtherSdDetailPopup: false,
      isSdDetailPopup: false,
      isSdSalesListPopup: false,
      detailPopupData: {},
      otherDetailPopupData: {},
      listPopupData: {},
      makeDataDate: null,
      noResult: false,
    }
  },
  methods: {
    loadData(code) {
      if(code == undefined){
        this.selectedCODE = this.data.CODE
        this.selectChgucd = this.data.CHGUCD
      }

      // this.selectRegion = "전국"
      // this.selectGu = "전체"
      // this.selectChgucd = "전체"
      // this.guData = []

      // 데이터 기준일
      this.getMakeDataDate()

      // 시도 셀렉박스
      this.getRegionData(code)

      // 군,구 셀렉박스
      // this.getGuData()

      // 선택된 조건 조합하여 매장코드 가져오기
      // this.getVDCDArray()
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
    getRegionData(code) {
      this.regionData = []

      this.req2svr.getRegionData(this.selectedCODE, this.selectChgucd).then(
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
            this.mapRegionSIData = _.cloneDeep(this.regionData)

            if(code){ // 브랜드 바꿔서 선택할시
              // this.selectRegion = "전국"
              this.changeRegion()
            } else { // 메인에서 지역 클릭하고 처음 들어왔을시
              if(this.data.REGION != null){
                this.selectedCODE = this.data.CODE
                this.selectRegion = this.data.REGION
                this.selectChgucd = this.data.CHGUCD

                this.changeRegion()
              } else {
                this.selectedCODE = 'our'
                this.selectRegion = "전국"
                this.selectChgucd = '전체'
                
                this.changeRegion()
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getGuData() {
      this.guData = []

      this.req2svr.getSiGuData(this.selectedCODE, this.selectRegion, this.selectChgucd).then(
        res => {
          this.guData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.guData.push(res);
            } else {
              this.guData = JSON.parse("[" + res + "]")
            }
            this.mapRegionGUNGUData = _.cloneDeep(this.guData)
            // this.selectRegion = "전국"
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getChageChgucdRegionData() {
      this.mapRegionSIData = []
      
      this.req2svr.getChageChgucdRegionData(this.selectedCODE, this.selectChgucd).then(
        res => {
          this.mapRegionSIData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.mapRegionSIData.push(res);
            } else {
              this.mapRegionSIData = JSON.parse("[" + res + "]")
            }

            // if(code){ // 브랜드 바꿔서 선택할시
            //   this.selectRegion = "전국"
            //   this.changeRegion()
            // } else { // 메인에서 지역 클릭하고 처음 들어왔을시
            //   if(this.data.REGION != null){
            //     this.selectedCODE = this.data.CODE
            //     this.selectRegion = this.data.REGION
            //     this.selectChgucd = this.data.CHGUCD

            //     this.changeRegion()
            //   } else {
            //     this.selectedCODE = 'our'
            //     this.selectRegion = "전국"
            //     this.selectChgucd = '전체'
                
            //     this.changeRegion()
            //   }
            // }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getChageChgucdGuData() {
      this.mapRegionGUNGUData = []

      this.req2svr.getChageChgucdGuData(this.selectedCODE, this.selectRegion, this.selectChgucd).then(
        res => {
          this.mapRegionGUNGUData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.mapRegionGUNGUData.push(res);
            } else {
              this.mapRegionGUNGUData = JSON.parse("[" + res + "]")
            }
            // this.mapRegionGUNGUData = _.cloneDeep(this.guData)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getVDCDArray() {
        this.vdcdData = []

        this.req2svr.getVDCDList(this.selectedCODE, this.selectRegion, this.selectGu, this.selectChgucd).then(
        res => {
          this.vdcdData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
              // 결과값 없을시 기존 데이터 삭제
              this.sdData = []
            } else {
              this.noResult = false;
            }
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.vdcdData.push(res);
            } else {
              this.vdcdData = JSON.parse("[" + res + "]")
            }
            this.noResult = false;
            this.getSDInfo()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    getSDInfo() {
      this.sdData = []
      let region = this.selectRegion

      this.req2svr.getSDInfo(this.selectedCODE, this.vdcdData, this.choice, this.year, this.month, region).then(
        res => {
          this.sdData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.sdData.push(res);
            } else {
              this.sdData = JSON.parse("[" + res + "]")
            }
            this.noResult = false;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    changeCODE(code) {
      this.selectedCODE = code
      this.selectRegion = "전국"
      this.selectGu = "전체"
      this.selectChgucd = "전체"

      this.loadData(code)
    },
    chageDate() {
      // this.getVDCDArray()
      this.loadData(this.selectedCODE)
    },
    changeRegion() {
      this.getGuData()
      this.getVDCDArray()
    },
    changeGu() {
      this.getVDCDArray()
    },
    chageChgucd() {
      this.getChageChgucdRegionData()
      this.getChageChgucdGuData()
      this.getVDCDArray()
    },
    chageType(value) {
      this.choice = value
      this.date = moment().subtract(1, "days").format("YYYY-MM-DD")
      this.year = moment().format("YYYY")
      this.month = moment().format("M")
      this.loadData(this.selectedCODE)
    },  
    toMain() {
      this.$router.replace("/")
    },
    toHumMain() {
      this.$router.replace("/HumMain")
    },
    toSdSalesList(){
        this.listPopupData = {
            CODE: this.selectedCODE, // 브랜드 코드
            year: this.year, // 선택연도
            month: this.month,  // 선택월
            dateTab: this.choice,  // 월간,누적 탭
            selectRegion: this.selectRegion != '전국' ? this.selectRegion : null, // 시도
            selectGu: this.selectGu != '전체' ? this.selectGu : null, // 시구
            selectChgucd: this.selectChgucd != '전체' ? this.selectChgucd : null, // 유통망
            vdcdData: this.vdcdData // 매장코드
        }
        this.isSdSalesListPopup = true
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
      this.isSdSalesListPopup = false
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
}
</script>