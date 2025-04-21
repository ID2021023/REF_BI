<template>
  <div class="wrap">
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <div class="layout_spacer"></div>
        <!-- groups -->
        <div class="groups">
          <button type="button" class="btn_icon btn_filter filter_blue" @click="close(false)"><i class="material-icons">tune</i></button>
          <!-- filter -->
          <div class="filter_wrap filter_style2">
            <div class="filter_cont">

              <div class="filter_view col_md_2">
                <!-- filter_DIVISION -->
                <strong class="tit">Division</strong>
                <div class="filter_box toggle_group tg_sty02 f_col">
                  <label v-for="(data, index) in CODECardsList" :key="data.MCODE" class="tg_btn" :for="'filter-op-5-' + (index+2)" @click="changeSucd(data.MCODE)">
                    <input type="radio" :id="'filter-op-5-' + (index+2)" class="tg_radio" :value="data.MCODE" v-model="sucd" />
                    <span class="btn_n txt_label">{{ data.CODNM }}</span>
                    <i class="material-icons">done </i>
                  </label>
                </div>
                <!-- filter_CATEGORY -->
                <strong class="tit">category</strong>
                <div class="filter_box toggle_group tg_sty02 f_col">
                  <label v-for="(data, index) in categoryList" :key="data.id" class="tg_btn" :for="'filter-op-2-' + (index+2)">
                    <input type="radio" :id="'filter-op-2-' + (index+2)" class="tg_radio" :value="data.id" v-model="category">
                    <span class="btn_n txt_label">{{ data.title }}</span>
                    <i class="material-icons">done </i>
                  </label>
                </div>
              </div>



              <div class="filter_view col_md_3">
                <!-- filter_STYLESEASON -->
                <strong class="tit">style season</strong>
                <div class="filter_box toggle_group tg_sty02 f_col">
                  <div class="groups list_div4">
                    <div class="select_box">
                      <select class="select" v-model="seasonStartYear" @change="changeSeason" >
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box">
                      <select class="select" v-model="seasonStartMonth" @change="changeSeason">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box">
                      <select class="select" v-model="seasonEndYear" @change="changeSeason">
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box">
                      <select class="select" v-model="seasonEndMonth" @change="changeSeason">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                  </div>
                </div>                

                <!-- filter_SALEPERIOD -->
                <strong class="tit">sale period</strong>
                <div class="filter_box toggle_group tg_sty02 f_col">
                  <div class="groups list_div2">
                    <div class="input_group input_icon_group">
                      <form action="#">
                        <label class="btn_icon_nl" for="startDate">
                          <i class="material-icons">calendar_today</i>
                        </label>
                        <div class="input_text" type="text" id="startDate">
                          <date-pick
                            v-model="saleStartDate"
                            @input="changeDate"
                            :displayFormat="'YYYYMMDD'"
                            :inputAttributes="{readonly: true}"
                            :selectableYearRange="5"
                            startWeekOnSunday
                          ></date-pick>
                        </div>
                      </form>
                    </div>
                    <div class="input_group input_icon_group">
                      <form action="#">
                        <label class="btn_icon_nl" for="endDate">
                          <i class="material-icons">calendar_today</i>
                        </label>
                        <div class="input_text" type="text" id="endDate">
                          <date-pick
                            v-model="saleEndDate"
                            :displayFormat="'YYYYMMDD'"
                            @input="changeDate"
                            :inputAttributes="{readonly: true}"
                            :selectableYearRange="5"
                            startWeekOnSunday
                          ></date-pick>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <!-- filter_STORE -->
                <strong class="tit">store</strong>
                <div class="filter_box toggle_group tg_type1 f_col">
                  <label class="tg_btn mb20" for="filter-sto-1-1">
                    <input type="checkbox" id="filter-sto-1-1" class="tg_radio" value="1" />
                    <span class="btn_n txt_label2">{{ storekindNm }}</span>
                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown">
                      <span class="drop_menu" @click="changeStoreKind('STOKINDALL','매장 형태 전체')">매장 형태 전체</span>
                      <span class="drop_menu" v-for="(data, index) in storekindCodes" :key="index" @click="changeStoreKind(data.SHTP , data.SHTPNM)">{{ data.SHTPNM }}</span>
                    </span>
                  </label>
                  <label class="tg_btn tg_btn_st2" for="filter-sto-2-2" style="max-width:354.75px;">
                    <input type="checkbox" id="filter-sto-2-2" class="tg_radio" name="filter-sto-2" />
                    <span class="btn_n txt_label2"><div style="width: 90%; overflow: hidden; text-overflow: ellipsis; white-space:nowrap;">{{ store }}</div></span>
                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown cg_sty03 scroll_cont">
                      <span class="drop_menu">
                        <label class="tg_btn" for="filter-st-1">
                          <input type="checkbox" id="filter-st-1" class="cg_check" v-model="store_a" @click="changeStoreAll(null)" />
                          <span class="cg_box"><i class="material-icons">done</i></span>
                          <span class="txt_label">매장전체</span>
                        </label>
                      </span>
                      <span class="drop_menu" v-for="(data, index) in storeCodes" :key="index">
                        <label class="tg_btn" :for="'filter-st-' + (index+2)">
                          <input type="checkbox" :id="'filter-st-' + (index+2)" class="cg_check" :checked="data.checked" @click="changeStore(data)">
                          <span class="cg_box"><i class="material-icons">done</i></span>
                          <span class="txt_label">{{ data.codenm }}</span>
                        </label>
                      </span>
                    </span>
                  </label>
                </div>

                <!-- filter_REORDER -->
                <div class="filter_box toggle_group tg_sty02 f_col">
                  <label v-for="(data, index) in foreignList" :key="index" class="tg_btn" :for="data.id">
                    <input type="radio" :id="data.id" class="tg_radio" name="filter-op-2" :value="data.id" v-model="foreign">
                    <span class="btn_n txt_label">{{ data.title }}</span>
                    <i class="material-icons">done </i>
                  </label>
                </div>
                <div class="ct_check_item">
                  <label class="tg_btn" for="reorder">
                    <input type="checkbox" id="reorder" class="cg_check" :checked="addReOrder" @click="reorderClick()"/>
                    <span class="cg_box"><i class="material-icons">done</i></span>
                    <span class="txt_label">REORDER 포함</span>
                  </label>
                </div>
                <div style="margin-top:10px;"></div>
                <div class="ct_check_item">
                  <label class="tg_btn" for="similar">
                    <input type="checkbox" id="similar" class="cg_check" :checked="addSimilar" @click="similarClick()"/>
                    <span class="cg_box"><i class="material-icons">done</i></span>
                    <span class="txt_label">유사상품 포함</span>
                  </label>
                </div>
              </div>


              
              <!-- filter_제품구분 및 구분 -->
              <div class="filter_view col_md_3">
                <strong class="tit">제품구분 및 구분</strong>
                <div class="filter_box check_group cg_sty02">
                  <label class="tg_btn btn_all" for="pro_div-1">
                    <input type="checkbox" id="pro_div-1" class="cg_check" v-model="item_a" @click="changeItemAll(null)" />
                    <span class="cg_box"><i class="material-icons">done</i></span>
                    <span class="btn_n btn_s txt_label">제품구분 전체</span>
                  </label>
                  <div class="scroll_cont" style="width:100%;">
                    <div class="list">
                      <label class="tg_btn" v-for="(data, index) in itemCodes" :key="index" :for="'pro_div-1-' + index">
                        <input type="checkbox" class="cg_check" :id="'pro_div-1-' + index" :checked="data.checked" @click="changeItem(data)" />
                        <span class="cg_box"><i class="material-icons">done</i></span>
                        <span class="btn_n btn_s txt_label">{{ data.codenm }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="filter_box check_group cg_sty02">
                  <label class="tg_btn btn_all" for="pro_div-2">
                    <input type="checkbox" id="pro_div-2" class="cg_check" v-model="gubun_a" @click="changeGubunAll(null)" />
                    <span class="cg_box"><i class="material-icons">done</i></span>
                     <span class="btn_n btn_s txt_label">구분 전체</span>
                  </label>
                  <div class="scroll_cont">
                    <div class="list">
                      <label class="tg_btn" v-for="(data, index) in gubunCodes" :key="index" :for="'pro_div-2-' + index" :style="{'width': index > 5 ? '100%' : ''}">
                        <input type="checkbox" class="cg_check" :id="'pro_div-2-' + index" :checked="data.checked" @click="changeGubun(data)" />
                        <span class="cg_box"><i class="material-icons">done</i></span>
                        <span class="btn_n btn_s txt_label">{{ data.codenm }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>



              <!-- filter_cloth -->
              <div class="filter_view col_md_4">
                <strong class="tit">cloth</strong>
                <div class="filter_box toggle_group tg_type1 f_col">
                  <label class="tg_btn tg_btn_st2 mb20" for="filter-con-1">
                    <input type="checkbox" id="filter-con-1" class="tg_radio" name="filter-co-1" value="1" />
                    <span class="btn_n txt_check">
                      <div class="ct_check_item">
                        <label class="tg_btn" for="filter-con-1-0">
                          <input type="checkbox" id="filter-con-1-0" class="cg_check"  v-model="cloth_a" @click="changeClothAll(null)" />
                          <span class="cg_box"><i class="material-icons">done</i></span>
                          <span class="txt_label">복종 전체</span>
                        </label>
                      </div>
                    </span>

                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown cg_sty03" style="height: 390px;">
                      <div class="scroll_cont">
                        <div class="list">
                          <label class="tg_btn" v-for="(data, index) in clothCodes" :key="index" :for="'filter-cl-' + index">
                            <input type="checkbox" class="cg_check" :id="'filter-cl-' + index" @click="changeCloth(data)" :checked="data.checked" />
                            <span class="cg_box"><i class="material-icons">done</i></span>
                            <span class="btn_n btn_s txt_label">{{ data.code }}</span>
                          </label>
                        </div>
                      </div>
                    </span>
                  </label>
                  <!-- filter_fabric -->
                  <label class="tg_btn tg_btn_st2 mb20" for="filter-con-2">
                    <input type="checkbox" id="filter-con-2" class="tg_radio" name="filter-con" value="1" />
                    <span class="btn_n txt_check">
                      <div class="ct_check_item">
                        <label class="tg_btn" for="filter-con-2-0">
                          <input type="checkbox" id="filter-con-2-0" class="cg_check" v-model="fabric_a" @click="changeFabricAll(null)" />
                          <span class="cg_box"><i class="material-icons">done</i></span>
                          <span class="txt_label">소재 전체</span>
                        </label>
                      </div>
                    </span>
                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown cg_sty03" style="height: 390px;">
                      <div class="scroll_cont">
                        <div class="list">
                          <label class="tg_btn" v-for="(data, index) in fabricCodes" :key="index" :for="'filter-fa-' + index">
                            <input type="checkbox" class="cg_check" :id="'filter-fa-' + index" @click="changeFabric(data)" :checked="data.checked" />
                            <span class="cg_box"><i class="material-icons">done</i></span>
                            <span class="btn_n btn_s txt_label">{{ data.code }}</span>
                          </label>
                        </div>
                      </div>
                    </span>
                  </label>
                  <!-- filter_color -->
                  <label class="tg_btn tg_btn_st2" for="filter-con-3">
                    <input type="checkbox" id="filter-con-3" class="tg_radio" name="filter-co-3" value="1" />
                    <span class="btn_n txt_check">
                      <div class="ct_check_item">
                        <label class="tg_btn" for="filter-con-3-0">
                          <input type="checkbox" id="filter-con-3-0" class="cg_check" v-model="color_a" @click="changeColorAll(null)" />
                          <span class="cg_box"><i class="material-icons">done</i></span>
                          <span class="txt_label">컬러 전체</span>
                        </label>
                      </div>
                    </span>
                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown cg_sty03" style="height: 390px;">
                      <div class="scroll_cont">
                        <div class="list">
                          <label class="tg_btn" v-for="(data, index) in colorCodes" :key="index" :for="'filter-co-' + index">
                            <input type="checkbox" class="cg_check" :id="'filter-co-' + index" @click="changeColor(data)" :checked="data.checked" />
                            <span class="cg_box"><i class="material-icons">done</i></span>
                            <span class="btn_n btn_s txt_label">{{ data.code }}</span>
                          </label>
                        </div>
                      </div>
                    </span>
                  </label>
                </div>
                <!-- filter_sale -->
                <strong class="tit">출고유형 및 판매유형</strong>
                <div class="filter_box toggle_group tg_type1 f_col">
                  <label class="tg_btn mb20" for="filter-con-3">
                    <input type="checkbox" id="filter-con-3" class="tg_radio" name="filter-cond-3" value="1" />
                    <span class="btn_n txt_label2">{{ releaseNm }}</span>
                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown">
                      <span class="drop_menu" @click="changeRelease('RELEASEALL','출고 유형 전체')">출고 유형 전체</span>
                      <span class="drop_menu" @click="changeRelease('00','정상')">정상</span>
                      <span class="drop_menu" @click="changeRelease('30','균일')">균일</span>
                    </span>
                  </label>
                  <label class="tg_btn" for="filter-con-4">
                    <input type="checkbox" id="filter-con-4" class="tg_radio" name="filter-cond-4" value="1" />
                    <span class="btn_n txt_label2">{{ saleNm }}</span>
                    <span class="btn_n btn_dropdown"><i class="material-icons">arrow_drop_down</i></span>
                    <span class="dropdown">
                      <span class="drop_menu" @click="changeSale('SALEALL','판매 유형 전체')">판매 유형 전체</span>
                      <span class="drop_menu" @click="changeSale('00','정상')">정상</span>
                      <span class="drop_menu" @click="changeSale('2','행사')">행사</span>
                      <span class="drop_menu" @click="changeSale('002','정상+행사')">정상+행사</span>
                      <span class="drop_menu" @click="changeSale('30','균일')">균일</span>
                    </span>
                  </label>
                </div>
              </div>
              
            </div>
            <div class="filter_btns">
              <button type="button" class="btn_n" @click="reset">초기화</button>
              <button type="button" class="btn_n" @click="close(true)">필터적용</button>
            </div>
          </div>
          <div class="bg_popup_wrap"></div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"

export default {
  name: "NEWSTY0301",
  components: {
    datePick
  },
  props: {
    filterData: Object
  },
  created() {
    // this.saleStartDate = moment().startOf("years").format('YYYY-MM-DD')
    // this.saleEndDate = moment().format('YYYY-MM-DD')
    this.saleStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
    this.saleEndDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

    let cuerrentYear = Number(moment().format("YYYY"))
    let code
    for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(cuerrentYear - (4 - i))
      this.yearList.push(String(code))
    }
    this.seasonStartYear = this.yearList[this.yearList.length-1]
    this.seasonEndYear = this.yearList[this.yearList.length-1]

    for (let i = 1; i < 13; i++) {
      code = this.$store.getters.getMonthCode(i)
      this.monthList.push(String(code))
    }
    this.seasonStartMonth = 1
    this.seasonEndMonth = this.$store.getters.getMonthCode(moment().format('M'))

    if (this.sucd == null && this.CODECardsList && this.CODECardsList.length > 0) {
      this.sucd = this.authCodeList[0].MCODE
    }

    this.category = this.categoryList[0].id

    this.foreign = this.foreignList[0].id

    // 순차진행(매장형태, 매장)
    this.getStoreKind()
  },
  data() {
    return {
      sucd: 1, // 사업부
      saleStartDate: null,
      saleEndDate: null,
      yearList: [],
      monthList: [],
      seasonStartYear: null,
      seasonStartMonth: null,
      seasonEndYear: null,
      seasonEndMonth: null,
      category: null, // 선택한 카테고리
      categoryList: [ // 카테고리 배열 하드코딩
        { id: "styleTop", title: "Style Top 20" },
        { id: "styleWorst", title: "Style Worst 20" },
        { id: "styleTotal", title: "Style Total" }
      ],
      storekindCodes: [], // 매장형태 목록
      storekindNm: "매장 형태 전체", // 선택한 매장형태 텍스트
      storekindCode: null, // 선택한 매장형태 code
      storeCodes: [{code:"", codenm:"", checked:false}], // 매장 목록
      store: "매장 전체", // 선택한 매장 텍스트
      store_a: false,
      stores: [],
      storesNm: [],
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ],
      foreign: null, // 해외매장 여부
      addReOrder: true, // 리오더 여부
      addSimilar: false, // 유사상품 여부
      itemCodes: [{code:"", codenm:"", checked:false}], // 제품구분
      item_a: false, // 제품구분 전체
      items: [], // 제품구분 
      itemsNm: [], // 제품구분 텍스트
      gubunCodes: [ // 구분 배열 하드코딩
        {code:"s_except", codenm:"sample 제외", checked:false},
        {code:"b_except", codenm:"B품 제외", checked:false},
        {code:"d_except", codenm:"동영물류 제외", checked:false},
        {code:"l_except", codenm:"로스매장 제외", checked:false},
        {code:"t_except", codenm:"이관매장 제외", checked:false},
        {code:"w_except", codenm:"창고반품 제외", checked:false},
        {code:"f_except", codenm:"기간별 판매현황 기준", checked:false},
        {code:"i_except", codenm:"기간별 판매 TOP20 기준", checked:true},
        // {code:"f_except", codenm:"불량매장 제외", checked:false},
        // {code:"i_except", codenm:"가상매장 제외", checked:true},
      ],
      gubun_a: false, // 구분 전체
      gubuns: [], // 구분
      gubunsNm: [], // 구분 텍스트
      clothCodes: [{code:"", checked:false}], // 복종
      cloth_a: false,
      cloths: [],
      fabricCodes: [{code:"", checked:false}], // 소재
      fabric_a: false,
      fabrics: [],
      colorCodes: [{code:"", checked:false}], // 컬러
      color_a: false,
      colors: [],
      releaseNm: "출고 유형 전체", // 선택한 출고 유형 텍스트
      releaseCodes: "RELEASEALL", // 선택한 출고 유형 code
      saleNm: "판매 유형 전체", // 선택한 판매 유형 텍스트
      saleCodes: "SALEALL", // 선택한 판매 유형 code,
      first: null, // 처음 팝업 연 경우
      changeListCode: false, // 리스트화면에서 사업부탭 변경여부(매장형태,매장 리셋을 위한 변수)
      resetYn: false
    }
  },
  computed: {
    req2svr: () => req2svr,
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    monthCodes() {
      return this.$store.getters.getMonthCodeList
    },
    CODECardsList() {
      // 임시로 영업의 사업부를 가져옴 오픈전에 스타일 DB업데이트 요청 해야함
      let STYList = this.$store.getters.getSTYList
      for(var i=0; i<STYList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:STYList[i].MCODE})
        if (data) {
          STYList[i].VISIBLE = true
        } else {
          STYList[i].VISIBLE = false
        }
      }
      return STYList
    },
    isTabTypeSU() {
      return this.$store.getters.getSTYList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getSTYList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      // 임시 오픈전에 스타일 DB업데이트 요청 해야함
      // return this.$store.getters.getAuthSUCDCode[1]

      // 오픈시 주석 풀어야함
      if(this.isTabTypeSU) {
        // 스타일 메뉴 사업부 코드
        return this.$store.getters.getAuthSUCDCode[1]
      } else {
        return this.$store.getters.getAuthBRCDCode[1]
      }
    },
    cloneFilterData() {
      return _.cloneDeep(this.filterData)
    }
  },
  methods: {
    reset() {
      // this.saleStartDate = moment().startOf("years").format('YYYY-MM-DD')
      // this.saleEndDate = moment().format('YYYY-MM-DD')
      this.saleStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
      this.saleEndDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

      let cuerrentYear = Number(moment().format("YYYY"))
      let code
      this.yearList = []
      for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(cuerrentYear - (4 - i))
        this.yearList.push(String(code))
      }
      this.seasonStartYear = this.yearList[this.yearList.length-1]
      this.seasonEndYear = this.yearList[this.yearList.length-1]

      this.monthList = []
      for (let i = 1; i < 13; i++) {
        code = this.$store.getters.getMonthCode(i)
        this.monthList.push(String(code))
      }
      this.seasonStartMonth = 1
      this.seasonEndMonth = this.$store.getters.getMonthCode(moment().format('M'))

      // 초기화시 MI 사업부 Default
      this.sucd = 1

      // 초기화시 category Default
      this.category = this.categoryList[0].id

      // 순차진행(매장형태, 매장)
      this.resetYn = true
      this.getStoreKind(true)

      // 초기화시 가상매장만 체크되게 오픈 당일 바꿈 changeGubunAll() 안태움
      // 구분 배열 하드코딩
      this.gubunCodes = [ 
        {code:"s_except", codenm:"sample 제외", checked:false},
        {code:"b_except", codenm:"B품 제외", checked:false},
        {code:"d_except", codenm:"동영물류 제외", checked:false},
        {code:"l_except", codenm:"로스매장 제외", checked:false},
        {code:"t_except", codenm:"이관매장 제외", checked:false},
        {code:"w_except", codenm:"창고반품 제외", checked:false},
        {code:"f_except", codenm:"기간별 판매현황 기준", checked:false},
        {code:"i_except", codenm:"기간별 판매 TOP20 기준", checked:true},
        // {code:"f_except", codenm:"불량매장 제외", checked:false},
        // {code:"i_except", codenm:"가상매장 제외", checked:true},
      ]
      
      // 초기화시 리스트로 넘길 구분 배열 하드코딩
      this.gubun_a = false 
      this.gubuns = []
      this.gubuns.push(this.gubunCodes[7].code)
      this.gubunsNm = []
      this.gubunsNm.push(this.gubunCodes[7].codenm)

      // 순차진행(제품구분, 구분, 복종, 소재)
      // this.getItemCodeList()

      // 초기화시 해외매장 Default
      this.foreign = this.foreignList[0].id

      // 초기화시 ReOrder Default
      this.addReOrder = true

      // 초기화시 Similar Default
      this.addSimilar = false

      // 출고유형 선택
      this.changeRelease('RELEASEALL' , '출고 유형 전체')
      
      // 판매유형 선택
      this.changeSale('SALEALL' , '판매 유형 전체')
    },
    getStoreKind(changeSucd){
      // 매장 형태

      this.req2svr.getStoreKind(changeSucd, this.sucd, this.cloneFilterData.sucd).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.storekindCodes = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.storekindCodes.push(res);
            } else {
              this.storekindCodes = JSON.parse("[" + res + "]");
            }
            // getStoreKind() 호출시 마다 셀렉박스 옵션 초기화
            this.storekindNm = "매장 형태 전체"
            this.storekindCode = "STOKINDALL"
          }
          
          // 매장리스트 다시 불러오기
          if(this.cloneFilterData.changeListCode) { // 리스트 화면에서 사업부 바꿧을때 매장 전체로 리셋
            this.getstoreList("STOKINDALL" , changeSucd)
          } else {
            if(changeSucd){ // 팝업 화면에서 사업부 바꿧을때 매장 리셋
              this.getstoreList("STOKINDALL" , changeSucd)
            } else { // 리스트,팝업 두화면에서 사업부 안바꾸고 팝업만 열고 닫을때 매장 리셋
              this.getstoreList(this.cloneFilterData.storekindCode , changeSucd)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getstoreList(changeStore , changeSucd){
      // 매장      
      this.req2svr.getstoreList(changeSucd, this.sucd, this.cloneFilterData.sucd, changeStore).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.storeCodes = []
            this.storesNm = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.storeCodes.push({code: res.VDCD, codenm: res.VDNM, checked: false});
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.storeCodes.push({code: list[i].VDCD, codenm: list[i].VDNM, checked: false});
              }
            }

            // getstoreList() 호출시 마다 셀렉박스 옵션 초기화
            this.store = "매장 전체"

            // 매장 전부 체크
            this.changeStoreAll(true)

            if(!changeSucd){ // 팝업내 사업부 변경이 아닐시 제품구분 및 구분 호출
              this.getItemCodeList(changeSucd)  
            }

            if(this.resetYn){ // 초기화시 리셋
              this.getItemCodeList(changeSucd)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getItemCodeList(changeSucd){
      // 제품구분
      this.itemCodes = [
        {code:1 , codenm:"정상" , checked:false},
        {code:2 , codenm:"기획" , checked:false},
        {code:3 , codenm:"동영기획" , checked:false},
        {code:4 , codenm:"PR" , checked:false},
        {code:5 , codenm:"BS" , checked:false},
      ] 

      // 제품구분 전부 체크
      this.changeItemAll(true)

      // 리트로 넘길 구분 배열 하드코딩 changeGubunAll() 호출안하기 때문
      // 초기화시 리셋하기떄문에 두번 안태울려고 분기 처리
      if(!this.resetYn){
        this.gubuns.push(this.gubunCodes[7].code)
        this.gubunsNm.push(this.gubunCodes[7].codenm)
      }

      // 구분 전부 체크(default 해제)
      // this.changeGubunAll(false)

      // 복종
      this.getClothCodeList(changeSucd)

      // let sql = "SELECT ITEMGU, ITEMGUNM FROM BISY021_DEV "
      // sql += "WHERE ITEMGU IS NOT NULL "
      // sql += "GROUP BY ITEMGU, ITEMGUNM "
      // sql += "ORDER BY ITEMGU"

      // this.req2svr.getData(sql).then(
      //   res => {
      //     if (res.MACHBASE_ERROR) {
      //       console.log("res", res);
      //     } else {
      //       this.itemCodes = []
      //       let count = (JSON.stringify(res).match(/{/g) || []).length;
      //       if(count < 1) {
      //       } else if(count == 1) {
      //         this.itemCodes.push({code: res.ITEMGU, codenm: res.ITEMGUNM, checked: false});
      //       } else {
      //         let list = JSON.parse("[" + res + "]");
      //         for (let i=0;i<list.length;i++) {
      //           this.itemCodes.push({code: list[i].ITEMGU, codenm: list[i].ITEMGUNM, checked: false});
      //         }
      //       }
      //     }
      //   },
      //   rej => {
      //     console.log("rej", rej);
      //   }
      // )
    },
    getClothCodeList(changeSucd) {
      // 복종
      this.req2svr.getClothCodeList().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.clothCodes = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.clothCodes.push({code: res.CODE, checked: false});
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.clothCodes.push({code: list[i].CODE, checked: false});
              }
            }
          }

          // 복종 전부 체크
          this.changeClothAll(true)

          // 소재
          this.getFabricsCodeList(changeSucd)
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getFabricsCodeList(changeSucd) {
      // 소재
      this.req2svr.getFabricsCodeList().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.fabricCodes = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.fabricCodes.push({code: res.CODE, checked: false});
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.fabricCodes.push({code: list[i].CODE, checked: false});
              }
            }
          }

          // 소재 전체 선택
          this.changeFabricAll(true)

          // color
          this.getColorsCodeList(changeSucd)
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getColorsCodeList(changeSucd) {

      // color
      this.req2svr.getColorsCodeList().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.colorCodes = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.colorCodes.push({code: res.COLCD, checked: false});
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.colorCodes.push({code: list[i].COLCD, checked: false});
              }
            }
          }

          // color 전체 선택
          this.changeColorAll(true)

          if(!this.cloneFilterData.first && !changeSucd){
            this.initData()
          } else {
            if(this.cloneFilterData.first && this.cloneFilterData.changeListCode && !changeSucd){ // 처음 팝업 오픈 && 리스트에서 사업부 변경 && 팝업내 사업부변경이 아닐시
              this.sucd = this.cloneFilterData.sucd
            }
            this.first = false
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    initData() {
      if (this.cloneFilterData) {
        this.saleStartDate = moment(this.cloneFilterData.saleStartDate).format('YYYY-MM-DD')
        this.saleEndDate = moment(this.cloneFilterData.saleEndDate).format('YYYY-MM-DD')

        this.seasonStartYear = this.cloneFilterData.seasonStartYear
        this.seasonStartMonth = this.cloneFilterData.seasonStartMonth
        this.seasonEndYear = this.cloneFilterData.seasonEndYear
        this.seasonEndMonth = this.cloneFilterData.seasonEndMonth

        this.sucd = this.cloneFilterData.sucd

        this.category = this.cloneFilterData.category

        this.changeListCode = this.cloneFilterData.changeListCode

        if(!this.changeListCode){ // 리스트 화면에서 사업부 안바꿧을때만 필터 세팅
          this.storekindCode = this.cloneFilterData.storekindCode
          this.storekindNm = this.cloneFilterData.storekindNm

          this.stores = this.cloneFilterData.stores
          this.storesNm = this.cloneFilterData.storesNm

          if (this.cloneFilterData.store_a) {
            this.store = "매장 전체"
          } else {
            this.store = []
            for(let i=0; i<this.storesNm.length; i++){
              if(i == 0){
                this.store += this.storesNm[i]
              } else {
                this.store += "," + this.storesNm[i]
              }
            }
          }
          if (this.stores.length > 0) {
            for (let i=0;i<this.storeCodes.length;i++) {
              if (_.indexOf(this.cloneFilterData.stores, this.storeCodes[i].code) > -1) {
                this.storeCodes[i].checked = true
              } else {
                this.storeCodes[i].checked = false
              }
            }
          } else {
            for (let i=0;i<this.storeCodes.length;i++) {
              this.storeCodes[i].checked = false
            }
          }
          if (this.cloneFilterData.store_a) {
            this.store_a = true
          } else {
            this.store_a = false
          }
        }
        
        // 리스트 사업부탭 변경여부 다시 세팅
        this.changeListCode = false

        this.foreign = this.cloneFilterData.foreign

        this.addReOrder = this.cloneFilterData.addReOrder
        this.addSimilar = this.cloneFilterData.addSimilar 

        this.items = this.cloneFilterData.items
        this.itemsNm = this.cloneFilterData.itemsNm
        if (this.items.length > 0) {
          for (let i=0;i<this.itemCodes.length;i++) {
            if (_.indexOf(this.cloneFilterData.items, this.itemCodes[i].code) > -1) {
              this.itemCodes[i].checked = true
            } else {
              this.itemCodes[i].checked = false
            }
          }
        } else {
          for (let i=0;i<this.itemCodes.length;i++) {
            this.itemCodes[i].checked = false
          }
        }
        if (this.cloneFilterData.item_a) {
          this.item_a = true
        } else {
          this.item_a = false
        }

        this.gubuns = this.cloneFilterData.gubuns
        this.gubunsNm = this.cloneFilterData.gubunsNm
        if (this.gubuns.length > 0) {
          for (let i=0;i<this.gubunCodes.length;i++) {
            if (_.indexOf(this.cloneFilterData.gubuns, this.gubunCodes[i].code) > -1) {
              this.gubunCodes[i].checked = true
            } else {
              this.gubunCodes[i].checked = false
            }
          }
        } else {
          for (let i=0;i<this.gubunCodes.length;i++) {
            this.gubunCodes[i].checked = false
          }
        }
        if (this.cloneFilterData.gubun_a) {
          this.gubun_a = true
        } else {
          this.gubun_a = false
        }

        this.cloths = this.cloneFilterData.cloths
        if (this.cloths.length > 0) {
          for (let i=0;i<this.clothCodes.length;i++) {
            if (_.indexOf(this.cloneFilterData.cloths, this.clothCodes[i].code) > -1) {
              this.clothCodes[i].checked = true
            } else {
              this.clothCodes[i].checked = false
            }
          }
        } else {
          for (let i=0;i<this.clothCodes.length;i++) {
            this.clothCodes[i].checked = false
          }
        }
        if (this.cloneFilterData.cloth_a) {
          this.cloth_a = true
        } else {
          this.cloth_a = false
        }

        this.fabrics = this.cloneFilterData.fabrics
        if (this.fabrics.length > 0) {
          for (let i=0;i<this.fabricCodes.length;i++) {
            if (_.indexOf(this.fabrics, this.fabricCodes[i].code) > -1) {
              this.fabricCodes[i].checked = true
            } else {
              this.fabricCodes[i].checked = false
            }
          }
        } else {
          for (let i=0;i<this.fabricCodes.length;i++) {
            this.fabricCodes[i].checked = false
          }
        }
        if (this.cloneFilterData.fabric_a) {
          this.fabric_a = true
        } else {
          this.fabric_a = false
        }

        this.colors = this.cloneFilterData.colors
        if (this.colors.length > 0) {
          for (let i=0;i<this.colorCodes.length;i++) {
            if (_.indexOf(this.colors, this.colorCodes[i].code) > -1) {
              this.colorCodes[i].checked = true
            } else {
              this.colorCodes[i].checked = false
            }
          }
        } else {
          for (let i=0;i<this.colorCodes.length;i++) {
            this.colorCodes[i].checked = false
          }
        }
        if (this.cloneFilterData.color_a) {
          this.color_a = true
        } else {
          this.color_a = false
        }

        this.releaseCodes = this.cloneFilterData.releaseCodes
        this.releaseNm = this.cloneFilterData.releaseNm

        this.saleCodes = this.cloneFilterData.saleCodes
        this.saleNm = this.cloneFilterData.saleNm
      }
    },
    // 날짜 선택
    changeDate(value) {
      this.date = moment(value).format('YYMMDD')
    },
    // 시즌 선택
    changeSeason() {
      this.$emit("changeSeason")
    },
    // 사업부 선택
    changeSucd(code) {
      this.sucd = code
      // 팝업내에서 사업부 변경여부 변수
      let changeSucd = true
      this.getStoreKind(changeSucd)
    },
    // 매장형태 선택
    changeStoreKind(SHTP , SHTPNM){
      this.storekindCode = SHTP
      this.storekindNm = SHTPNM
      // 팝업내에서 사업부 변경여부 변수
      let changeSucd = true
      this.getstoreList(SHTP , changeSucd)
    },
    // 매장 전체 선택
    changeStoreAll(isAll){
      if (isAll == null) {
        isAll = document.getElementById("filter-st-1").checked
      }
      if (!isAll) {
        this.stores = []
        this.storesNm = []
        for (let i=0;i<this.storeCodes.length;i++) {
          this.storeCodes[i].checked = false
        }
      } else {
        this.stores = []
        this.storesNm = []
        for (let i=0;i<this.storeCodes.length;i++) {
          this.storeCodes[i].checked = true
          this.stores.push(this.storeCodes[i].code)
          this.storesNm.push(this.storeCodes[i].codenm)
        }
      }
      if (this.stores.length == this.storeCodes.length) {
        this.store_a = true
      } else {
        this.store_a = false
      }
      this.store = "매장 전체"
    },
    // 매장별 선택
    changeStore(data){
      data.checked = !data.checked
      
      if (data.checked) {
        this.stores.push(data.code)
        this.storesNm.push(data.codenm)
      } else {
        let index = this.stores.indexOf(data.code)
        if (index > -1) {
          this.stores.splice(index, 1)
        }
        let index2 = this.storesNm.indexOf(data.codenm)
        if (index2 > -1) {
          this.storesNm.splice(index2, 1)
        }
      }

      if (this.stores.length == this.storeCodes.length) {
        this.store_a = true
        this.store = "매장 전체"
      } else {
        this.store_a = false
        this.store = ""
        for(let i=0; i<this.storesNm.length; i++){
          if(i == 0){
            this.store += this.storesNm[i]
          } else {
            this.store += "," + this.storesNm[i]
          }
        }
      }
    },
    // 리오더 선택
    reorderClick(){
      if(this.addReOrder) {
        this.addReOrder = false
      } else {
        this.addReOrder = true
      }
    },
    // 유사상품 선택
    similarClick(){
      if(this.addSimilar) {
        this.addSimilar = false
      } else {
        this.addSimilar = true
      }
    },
    // 제품구분 전체 선택
    changeItemAll(isAll){
      if (isAll == null) {
        isAll = document.getElementById("pro_div-1").checked
      }
      if (!isAll) {
        this.items = []
        this.itemsNm = []
        for (let i=0;i<this.itemCodes.length;i++) {
          this.itemCodes[i].checked = false
        }
      } else {
        this.items = []
        this.itemsNm = []
        for (let i=0;i<this.itemCodes.length;i++) {
          this.itemCodes[i].checked = true
          this.items.push(this.itemCodes[i].code)
          this.itemsNm.push(this.itemCodes[i].codenm)
        }
      }
      if (this.items.length == this.itemCodes.length) {
        this.item_a = true
      } else {
        this.item_a = false
      }
    },
    // 제품구분 개별 선택
    changeItem(data) {
      data.checked = !data.checked
      if (data.checked) {
        this.items.push(data.code)
        this.itemsNm.push(data.codenm)
      } else {
        let index = this.items.indexOf(data.code)
        if (index > -1) {
          this.items.splice(index, 1)
        }
        let index2 = this.itemsNm.indexOf(data.codenm)
        if (index2 > -1) {
          this.itemsNm.splice(index2, 1)
        }
      }
      if (this.items.length == this.itemCodes.length) {
        this.item_a = true
      } else {
        this.item_a = false
      }
    },
    // 구분 전체 선택
    changeGubunAll(isAll){
      if (isAll == null) {
        isAll = document.getElementById("pro_div-2").checked
      }
      if (!isAll) {
        this.gubuns = []
        this.gubunsNm = []
        for (let i=0;i<this.gubunCodes.length;i++) {
          this.gubunCodes[i].checked = false
        }
      } else {
        this.gubuns = []
        this.gubunsNm = []
        for (let i=0;i<this.gubunCodes.length;i++) {
          this.gubunCodes[i].checked = true
          this.gubuns.push(this.gubunCodes[i].code)
          this.gubunsNm.push(this.gubunCodes[i].codenm)
        }
      }
      if (this.gubuns.length == this.gubunCodes.length) {
        this.gubun_a = true
      } else {
        this.gubun_a = false
      }
    },
    // 구분 개별 선택
    changeGubun(data){
      data.checked = !data.checked
      if (data.checked) {
        this.gubuns.push(data.code)
        this.gubunsNm.push(data.codenm)
      } else {
        let index = this.gubuns.indexOf(data.code)
        if (index > -1) {
          this.gubuns.splice(index, 1)
        }
        let index2 = this.gubunsNm.indexOf(data.codenm)
        if (index2 > -1) {
          this.gubunsNm.splice(index2, 1)
        }
      }
      if (this.gubuns.length == this.gubunCodes.length) {
        this.gubun_a = true
      } else {
        this.gubun_a = false
      }
    },
    // 복종 전체 선택
    changeClothAll(isAll) {
      if (isAll == null) {
        isAll = document.getElementById("filter-con-1-0").checked
      }
      if (!isAll) {
        this.cloths = []
        for (let i=0;i<this.clothCodes.length;i++) {
          this.clothCodes[i].checked = false
        }
      } else {
        this.cloths = []
        for (let i=0;i<this.clothCodes.length;i++) {
          this.clothCodes[i].checked = true
          this.cloths.push(this.clothCodes[i].code)
        }
      }
      if (this.cloths.length == this.clothCodes.length) {
        this.cloth_a = true
      } else {
        this.cloth_a = false
      }
    },
    // 복종 개별 선택
    changeCloth(data) {
      data.checked = !data.checked
      if (data.checked) {
        this.cloths.push(data.code)
      } else {
        let index = this.cloths.indexOf(data.code)
        if (index > -1) {
          this.cloths.splice(index, 1)
        }
      }
      if (this.cloths.length == this.clothCodes.length) {
        this.cloth_a = true
      } else {
        this.cloth_a = false
      }
    },
    // 소재 전체 선택
    changeFabricAll(isAll) {
      if (isAll == null) {
        isAll = document.getElementById("filter-con-2-0").checked
      }
      if (isAll == false) {
        this.fabrics = []
        for (let i=0;i<this.fabricCodes.length;i++) {
          this.fabricCodes[i].checked = false
        }
      } else if (isAll == true) {
        this.fabrics = []
        for (let i=0;i<this.fabricCodes.length;i++) {
          this.fabricCodes[i].checked = true
          this.fabrics.push(this.fabricCodes[i].code)
        }        
      }
      if (this.fabrics.length == this.fabricCodes.length) {
        this.fabric_a = true
      } else {
        this.fabric_a = false
      }
    },
    // 소재 개별 선택
    changeFabric(data) {
      data.checked = !data.checked
      if (data.checked) {
        this.fabrics.push(data.code)
      } else {
        let index = this.fabrics.indexOf(data.code)
        if (index > -1) {
          this.fabrics.splice(index, 1)
        }
      }
      if (this.fabrics.length == this.fabricCodes.length) {
        this.fabric_a = true
      } else {
        this.fabric_a = false
      }
    },
    // 컬러 전체 선택
    changeColorAll(isAll) {
      if (isAll == null) {
        isAll = document.getElementById("filter-con-3-0").checked
      }
      if (isAll == false) {
        this.colors = []
        for (let i=0;i<this.colorCodes.length;i++) {
          this.colorCodes[i].checked = false
        }
      } else if (isAll == true) {
        this.colors = []
        for (let i=0;i<this.colorCodes.length;i++) {
          this.colorCodes[i].checked = true
          this.colors.push(this.colorCodes[i].code)
        }        
      }
      if (this.colors.length == this.colorCodes.length) {
        this.color_a = true
      } else {
        this.color_a = false
      }
    },
    // 컬러 개별 선택
    changeColor(data) {
      data.checked = !data.checked
      if (data.checked) {
        this.colors.push(data.code)
      } else {
        let index = this.colors.indexOf(data.code)
        if (index > -1) {
          this.colors.splice(index, 1)
        }
      }
      if (this.colors.length == this.colorCodes.length) {
        this.color_a = true
      } else {
        this.color_a = false
      }
    },
    // 출고유형 선택
    changeRelease(code , codenm) {
      this.releaseNm = codenm
      this.releaseCodes = code
    },
    // 판매유형 선택
    changeSale(code , codenm) {
      this.saleNm = codenm
      this.saleCodes = code
    },
    
    close(isSave) {
      let data = null

      if (isSave) {
        data = {
          first: this.first,
          saleStartDate: this.saleStartDate,
          saleEndDate: this.saleEndDate,
          seasonStartYear: this.seasonStartYear,
          seasonStartMonth: this.seasonStartMonth,
          seasonEndYear: this.seasonEndYear,
          seasonEndMonth:this.seasonEndMonth,
          sucd: this.sucd, // 사업부 
          category: this.category, // category
          storekindCode: this.storekindCode, // 매장형태
          storekindNm: this.storekindNm, // 매장형태 텍스트
          stores: this.stores, // 매장
          storesNm: this.storesNm, // 매장 텍스트
          store_a: this.store_a, // 매장전체 체크
          foreign: this.foreign, // 해외매장
          addReOrder: this.addReOrder, // 리오더
          addSimilar: this.addSimilar, // 유사상품
          items: this.items, // 제품구분
          itemsNm: this.itemsNm, // 제품구분 텍스트
          item_a: this.item_a, // 제품구분 전체 체크
          gubuns: this.gubuns, // 구분
          gubunsNm: this.gubunsNm, // 구분 텍스트
          gubun_a: this.gubun_a,// 구분전체 체크
          cloths: this.cloths, // 복종
          cloth_a: this.cloth_a, // 복종전체 체크
          fabrics: this.fabrics, // 소재
          fabric_a: this.fabric_a, // 소재전체 체크
          colors: this.colors, // 소재
          color_a: this.color_a, // 소재전체 체크
          releaseCodes: this.releaseCodes, // 출고유형
          releaseNm: this.releaseNm, // 출고유형 텍스트
          saleCodes: this.saleCodes, // 판매유형
          saleNm: this.saleNm, // 판매유형 텍스트
          changeListCode: this.changeListCode // 리스트화면에서 사업부탭 변경여부(매장형태,매장 리셋을 위한 변수)
        }
      }
      this.$emit("close", data)
    },
  }
}
</script>