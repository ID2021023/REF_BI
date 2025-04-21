<template>
  <!-- aside 붙었을때 클래스 : aside_layout -->
  <!-- <div class="wrap aside_layout"> -->
  <div class="wrap">
    <filterPopup v-if="filter" :filterData="filterData" @close="hideFilter"></filterPopup>
    <designdetailPopup v-if="showDesignDetail" :designerPopupData="designerPopupData" :rank="rank" :gubun="gubun" @close="hideDesignDetailPopup" />
    <!-- drawer_열리는 클래스 : on -->
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
    <header v-show="!filter && !showDesignDetail" class="header">
      <div class="header_inner">
        <!-- tabs -->
        <div class="toggle_group">
          <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': filterData.sucd == data.MCODE}">
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              :value="data.MCODE"
              v-model="filterData.sucd"
              style="display:none"
              @click="changeCODE(data.MCODE)"
              :disabled="!data.VISIBLE"
            >
            <span class="btn_n txt_label">{{ data.CODNM }}</span>
          </label>
        </div>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px; line-height: 50px;"><small class="txt">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- groups -->
        <div class="groups">
          <button type="button" class="btn_icon btn_filter" @click="showFilter"><i class="material-icons">tune</i></button>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="cont_head pore">
          <h2 class="tit tit_sty2">{{title}}<small class="two_line">{{title_range}}</small>
            <span class="tooltip">{{title_range}}</span>
          </h2>
          <div class="layout_spacer"></div>
          <!--search-->
          <div class="input_group input_icon_group" style="width:220px; margin-right: 10px;">
            <!-- <form action="#"> -->
              <button class="btn_icon_nl btn_search" type="button" @click="searchStyle()">
                <i class="material-icons">search</i>
              </button>
              <input class="input_text" type="text" id="search" v-model="searchText" @keyup.enter="searchStyle()">
            <!-- </form> -->
          </div>
          <!-- select -->
          <div class="select_box" style="width:220px;">
            <select class="select" v-model="orderBy" @change="chageOrderBy">
              <option v-for="(data, index) in orderByFilters" :key="index" :value="index">{{ data.NAME }}</option>
            </select>
          </div>
        </div>
        <div class="style_list2">
          <ul class="list">
            <li v-if="noResult">검색결과가 없습니다.</li>
            <li v-for="(data , index) in STYLE_LIST" :key="index">
              <div class="box teamSelector" @click="clickDetail(data)">
                <div class="inner">
                  <div class="num_box"><strong>{{ index+1 }}</strong></div>
                  <div class="img">
                    <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCODE" />
                    <img v-else-if="data.MAINDIMAGEPATH" :src="data.MAINDIMAGEPATH" :alt="data.STYCODE" />
                    <img v-else src="@/assets/images/temp_style_8.jpg" :alt="data.STYCODE" />
                  </div>
                  <!-- 리오더 표시 -->
                  <span v-if="data.STYCD != 0 && (data.STYCODE != data.MAINSTYCD) && data.RESEQ > 0" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ data.RESEQ }}</span></span>
                  <span v-if="data.STYCD != 0 && (data.STYCODE != data.MAINSTYCD) && data.RESEQ == 0" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
                  <span v-else-if="data.STYCD != 0 && (data.STYCODE == data.MAINSTYCD)" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
                  <div class="info">
                    <strong class="txt_name">{{ data.STYCODE }}</strong>
                    <span class="price">({{ data.TAGPRI | currency }}원)</span>
                    <ul class="style_info_list">
                      <li>
                        <dl>
                          <dt class="tit">출고수량</dt>
                          <dd class="txt_num">{{ data.TOTOUTQTY | currency }}<em>(개)</em></dd>
                        </dl>
                        <dl>
                          <dt class="tit">재고수량</dt>
                          <dd class="txt_num">{{ data.STOQTY | currency }}<em>(개)</em></dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt class="tit">기간판매</dt>
                          <dd class="txt_num">{{ data.SQTY | currency }}<em>(개)</em></dd>
                        </dl>
                        <dl>
                          <dt class="tit">총생산량</dt>
                          <dd class="txt_num">{{ data.INQTY | currency }}<em>(개)</em></dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt class="tit">누적판매</dt>
                          <dd class="txt_num">{{ data.ACCSQTY | currency }}<em>(개)</em></dd>
                        </dl>
                        <dl>
                          <dt class="tit">총판매량</dt>
                          <dd class="txt_num">{{ data.TOTSQTY | currency }}<em>(개)</em></dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt class="tit">누적판매율</dt>
                          <dd class="txt_num">{{ data.SALERATE }}<em>(%)</em></dd>
                        </dl>
                        <dl>
                          <dt class="tit">총판매율</dt>
                          <dd class="txt_num">{{ data.TOTSALERATE }}<em>(%)</em></dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- <div v-if="dataFullYn === false && filterData.category == 'styleTotal' && searchYn != true" style="height:50px;line-height:50px;text-align:center;background-color:dimgray;margin-bottom:20px;cursor:pointer;" @click="addList()">
            <button type="button">More ({{STYLE_LIST_CNT}}/{{STYLE_LIST_TOT}})</button>
          </div> -->
        </div>
        <div v-if="dataFullYn === false && filterData.category == 'styleTotal' && searchYn != true" @click="addList()">
          <a href="javascript:void(0);" class="btn_n btn_primary btn_xl btn_flex tc" style="border-radius: 10px;">
            <span class="w100 txt_bold h6">More ({{STYLE_LIST_CNT}}/{{STYLE_LIST_TOT}})</span>
            <div class="layout_spacer"></div>
          </a>
        </div>
      </div>

      
    </div>
    <!-- aside_designer -->
    <!-- <div class="aside">
      <strong class="aside_title"><span><em class="txt">{{ this.filterData.sucd }}</em>Top 10</span></strong>
      <div class="list_cont scroll_cont">
        <ul class="list">
          <li v-for="(data , index) in DESIGNER_TOP10" :key="data.DESIGNER" @click="toDesignDetail(data , index)">
            <a href="javascript:void(0);" class="btn_designer_view" >
              <span class="img_photo w">
                <img v-if="imageExist(data.PHOTOPATH)" :src="data.PHOTOPATH" :alt="data.EMPNAME"/>
                <img v-else src="@/assets/images/bg_designer_w.png"/>
              </span>
              <span class="txt_name">{{ data.EMPNAME }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import filterPopup from '@/pages/style/NEWSTY0301'
import designdetailPopup from '@/pages/style/STY0201'
import sideMenu from '@/components/sideMenu'

export default {
  name: "NEWSTY0001",
  components: {
    filterPopup,
    designdetailPopup,
    sideMenu
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.loadData()
  },
  data() {
    return {
      title: null,
      title_range: null,
      orderBy: 2,
      filter: false,
      date: null,      
      drawer: null,
      year: "",
      month: "",
      STYLE_CLOTH: [],
      DESIGNER: [],
      selectSucd: 1,
      foreign: null,
      filterData: {
        saleStartDate: null,
        saleEndDate: null,
        seasonStartYear: null,
        seasonStartMonth: null,
        seasonEndYear: null,
        seasonEndMonth: null,
        sucd: 1,
        category: null,
        storekindCode: null,
        storekindNm: null,
        stores: [],
        storesNm: [],
        store_a: null,
        foreign: null,
        addReOrder: true,
        addSimilar: false,
        items: [],
        itemsNm: [],
        item_a: null,
        gubuns: [],
        gubunsNm: [],
        gubun_a: null,
        cloths: [],
        cloth_a: null,
        fabrics: [],
        fabric_a: null,
        colors: [],
        color_a: null,
        releaseCodes: null,
        releaseNm: null,
        saleCodes: null,
        saleNm: null,
        changeListCode: false
      },
      categoryList: [
        { id: "styleTop", title: "Style Top 20" },
        { id: "styleWorst", title: "Style Worst 20" },
        { id: "styleTotal", title: "Style Total" }
      ],
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ],
      orderByFilters: [{ NAME: "", ITEM: ""}],
      conditionList: [ "출고수량", "재고수량", "기간판매수량", "기간판매금액", "누적판매수량", "누적판매금액", "누적판매율", "총생산량", "총판매량", "총판매율" ],
      STYLE_LIST: [],
      STYLE_LIST_TOT: null,
      STYLE_LIST_CNT: 20,
      dataFullYn: false,
      showDesignDetail: false,
      designerPopupData: null,
      rank: 0,
      gubun: "list",
      // CODE: null,
      noResult: false,
      makeDataDate: null,
      searchText: "",
      searchYn: false,
      searchKey: 0,
    }
  },
  created() {
    this.filter = false
    this.showDesignDetail = false

    this.year = moment().format("YYYY");
    this.month = moment().format("M");

    if (this.data) {
      this.filterData.first = this.data.filterData.first
      this.filterData.saleStartDate = moment(this.data.filterData.saleStartDate).format('YYYYMMDD')
      this.filterData.saleEndDate = moment(this.data.filterData.saleEndDate).format('YYYYMMDD')
      this.filterData.seasonStartYear = this.data.filterData.seasonStartYear
      this.filterData.seasonStartMonth = this.data.filterData.seasonStartMonth
      this.filterData.seasonEndYear = this.data.filterData.seasonEndYear
      this.filterData.seasonEndMonth = this.data.filterData.seasonEndMonth

      this.selectSucd = this.data.filterData.sucd
      this.filterData.sucd = this.data.filterData.sucd

      this.filterData.category = this.data.filterData.category
      
      this.filterData.storekindCode = this.data.filterData.storekindCode
      this.filterData.storekindNm = this.data.filterData.storekindNm
      this.filterData.stores = this.data.filterData.stores
      this.filterData.storesNm = this.data.filterData.storesNm
      this.filterData.store_a = this.data.filterData.store_a
      
      this.filterData.foreign = this.data.filterData.foreign
      
      this.filterData.addReOrder = this.data.filterData.addReOrder
      this.filterData.addSimilar = this.data.filterData.addSimilar
      
      this.filterData.items = this.data.filterData.items
      this.filterData.itemsNm = this.data.filterData.itemsNm
      this.filterData.item_a = this.data.filterData.item_a

      this.filterData.gubuns = this.data.filterData.gubuns
      this.filterData.gubunsNm = this.data.filterData.gubunsNm
      this.filterData.gubun_a = this.data.filterData.gubun_a

      this.filterData.cloths = this.data.filterData.cloths
      this.filterData.cloth_a = this.data.filterData.cloth_a
      this.filterData.fabrics = this.data.filterData.fabrics
      this.filterData.fabric_a = this.data.filterData.fabric_a
      this.filterData.colors = this.data.filterData.colors
      this.filterData.color_a = this.data.filterData.color_a

      this.filterData.releaseCodes = this.data.filterData.releaseCodes
      this.filterData.releaseNm = this.data.filterData.releaseNm
      this.filterData.saleCodes = this.data.filterData.saleCodes
      this.filterData.saleNm = this.data.filterData.saleNm

      this.filterData.changeListCode = this.data.filterData.changeListCode

      // 리스트 정렬 순서(필터에 없는 내용이라 filterData에 담지 않고 별개로 저장)
      this.orderBy = this.data.orderBy
      this.orderByFilters = this.data.orderByFilters
    } else {
      if (this.filterData.sucd == null && this.CODECardsList && this.CODECardsList.length > 0) {
        this.filterData.sucd = this.authCodeList[0].MCODE
      }

      // this.filterData.saleStartDate = moment().startOf("years").format('YYYYMMDD')
      this.filterData.first = true
      this.filterData.saleStartDate = moment().subtract(7, 'days').format('YYYYMMDD')
      this.filterData.saleEndDate = moment().subtract(1, 'days').format('YYYYMMDD')
      this.filterData.seasonStartYear = this.$store.getters.getYearCode(moment().format("YYYY"))
      this.filterData.seasonStartMonth = 1
      this.filterData.seasonEndYear = this.$store.getters.getYearCode(moment().format("YYYY"))
      this.filterData.seasonEndMonth = this.$store.getters.getMonthCode(moment().format("M"))

      this.selectSucd = 1
      this.filterData.sucd = 1

      this.filterData.category = this.categoryList[0].id

      this.filterData.storekindCode = "STOKINDALL"
      this.filterData.storekindNm = "매장 형태 전체"
      this.filterData.stores = []
      this.filterData.storesNm = []
      this.filterData.store_a = true

      this.filterData.foreign = this.foreignList[0].id

      this.filterData.addReOrder = true
      this.filterData.addSimilar = false

      this.filterData.items = []
      this.filterData.itemsNm = []
      this.filterData.item_a = true
      // this.filterData.gubuns = []
      // 구분 배열 하드코딩 가상매장만 디폴트 체크
      this.filterData.gubuns = ["i_except"]
      // this.filterData.gubunsNm = ["가상매장 제외"]
      this.filterData.gubunsNm = ["기간별 판매 TOP20 기준"]
      this.filterData.gubun_a = false

      this.filterData.cloths = []
      this.filterData.cloth_a = true
      this.filterData.fabrics = []
      this.filterData.fabric_a = true
      this.filterData.colors = []
      this.filterData.color_a = true

      this.filterData.releaseCodes = "RELEASEALL"
      this.filterData.releaseNm =  "출고 유형 전체"
      
      this.filterData.saleCodes = "SALEALL"
      this.filterData.saleNm =  "판매 유형 전체"

      this.filterData.changeListCode = false

      // 리스트 정렬 순서(필터에 없는 내용이라 filterData에 담지 않고 별개로 저장)
      this.orderBy = 9
      this.orderByFilters = []
      for (let i=0;i<this.conditionList.length;i++) {
        this.orderByFilters.push({NAME: this.conditionList[i], ITEM: this.conditionList[i]})
      }
    }
  },
  computed: {
    req2svr: () => req2svr,
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
      // 임시 오픈전에 스타일 DB업데이트 요청 해야함
      // return "SUCD"

      // 오픈시 주석 풀어야함
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
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    monthCodes() {
      return this.$store.getters.getMonthCodeList
    },
    DESIGNER_TOP10(){
      return this.DESIGNER.slice(0, 10)
    },
  },
  methods: {
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      this.getMakeDataDate()
      this.getStyleTopData()
      this.filter_condition()
      this.title_text()
      // this.getDesignerTopData()
    },
    title_text() {
      if(this.searchKey == 0){
        let data = _.find(this.categoryList, { id: this.filterData.category })
        if (data) {
          this.title = data.title
        } else {
          this.title = this.categoryList[0].title
        }
      } else {
        this.searchKey = 0
        this.title = "Style 검색"
      }
    },
    changeCODE(code) {
      this.selectSucd = code
      this.filterData.sucd = code

      // 사업부탭 변경시 필터 조건에서 매장형태와 매장만 리셋하기 위한 변수
      this.filterData.changeListCode = true

      // 사업부탭 변경시 검색창, 셀렉박스 리셋
      this.orderBy = 9
      this.searchText = ""
      this.searchYn = false

      // 사업부탭 변경시 more버튼 비노출
      this.dataFullYn = false

      this.loadData()
    },
    chageOrderBy(searchStyle) {
      // TOTOUTQTY 출고수량
      // SQTY 기간판매
      // ACCSQTY 누적판매
      // STOQTY 재고
      // OUTQTY ??
      // INQTY 총생산량
      // TOTSQTY 총판매량
      // SALERATE 판매율
      // TOTSALERATE 총판매율
      // ACCSILAMT 누적판매금액
      // SILAMT 기간판매금액

      // 전체개수
      this.STYLE_LIST_TOT = this.STYLE_CLOTH.length
      // 화면에 뿌려질 개수
      this.STYLE_LIST_CNT = 20

      // 전체개수 < 화면에 뿌려질 개수(디폴트20개)
      if(this.STYLE_LIST_TOT < this.STYLE_LIST_CNT) {
        this.STYLE_LIST_CNT = this.STYLE_LIST_TOT
      }

      let order = ""
      if (this.filterData.category == "styleTop" || this.filterData.category == "styleTotal") {
        order = "desc"
      } else {
        order = "asc"
      }

      if(this.orderBy == 0) {
        // 출고수량
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTOUTQTY); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTOUTQTY); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTOUTQTY); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 1) {
        // 재고수량
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.STOQTY); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.STOQTY); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.STOQTY); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 2) {
        // 기간판매수량
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SQTY); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SQTY); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SQTY); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 3) {
        // 기간판매금액
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SILAMT); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SILAMT); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SILAMT); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 4) {
        // 누적판매수량
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACCSQTY); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACCSQTY); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACCSQTY); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 5) {
        // 누적판매금액
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACCSILAMT); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACCSILAMT); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACCSILAMT); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 6) {
        // 누적판매율
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SALERATE); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SALERATE); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.SALERATE); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 7) {
        // 총생산량
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.INQTY); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.INQTY); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.INQTY); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 8) {
        // 총판매량
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTSQTY); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTSQTY); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTSQTY); }, order)).slice(0, 20)
        }
      } else if(this.orderBy == 9) {
        // 총판매율
        // this.STYLE_LIST 복사
        this.STYLE_LIST_CLONE = _.cloneDeep((_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTSALERATE); }, order)))
        if(this.searchYn == true) { // 검색일땐 전부다 보여주기
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTSALERATE); }, order))
        } else {
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.TOTSALERATE); }, order)).slice(0, 20)
        }
      }
    },
    addList(){
      if(this.STYLE_LIST_CNT < this.STYLE_LIST_TOT){ // 전체 개수보다 노출되는 개수가 작은 경우
        this.STYLE_LIST_CNT += 20 // 노출 개수 20개 증가
        if(this.STYLE_LIST_CNT > this.STYLE_LIST_TOT){ // +20 했을때 전체 개수보다 크면 마지막으로 전체 개수를 넣어줌
          this.STYLE_LIST_CNT = this.STYLE_LIST_TOT
        }
        let data = []
        for(let i=0;i<this.STYLE_LIST_CNT;i++){
          data.push(this.STYLE_LIST_CLONE[i]) // 전체에서 노출 개수만큼 데이터 추출하여 data 배열에 추가
        }
        this.STYLE_LIST = data // 객체에 data 배열 업데이트
      } else { // 전체 개수와 노출되는 개수가 같거나 전체 개수보다 노출할 개수가 더 많으면
        this.dataFullYn = true // dataFull 객체를 true 상태로 변경
        alert("더이상 표출할 데이터가 없습니다.") // 모든 데이터 출력 알림
      }
    },
    filter_condition(search_condition) {
      let title_range = ""
      title_range += "("
      title_range += this.filterData.seasonStartYear + this.filterData.seasonStartMonth
      title_range += " ~ "
      title_range += this.filterData.seasonEndYear + this.filterData.seasonEndMonth
      title_range += " / "
      title_range += moment(this.filterData.saleStartDate).format('YY.MM.DD')
      title_range += " ~ "
      title_range += moment(this.filterData.saleEndDate).format('YY.MM.DD')
      title_range += " / "

      if(this.filterData.addReOrder) {  // 리오더 포함
        title_range += "REORDER 포함"
      } else {
        title_range += "REORDER 제외"
      }

      title_range += " / "

      if(this.filterData.addSimilar) {  // 유사상품 포함
        title_range += "유사상품 포함"
      } else {
        title_range += "유사상품 제외"
      }

      title_range += " / "

      if(search_condition) { // 검색일때 필터 조건 세팅(시즌,판매기간,리오더여부,유사상품포함여부는 그대로 유지 나머지 조건은 초기화)
        // this.filterData.reset = true

        title_range += "해외매장 포함"
        title_range += " / "
        title_range += "매장 형태 전체"
        title_range += " / "
        title_range += "제품구분 전체"
        title_range += " / "
        // title_range += "'가상매장 제외'"
        title_range += "'기간별 판매 TOP20 기준'"
        title_range += " / "
        title_range += "출고 유형 전체"
        title_range += " / "
        title_range += "판매 유형 전체"
        title_range += " / "
        title_range += "복종 전체"
        title_range += " / "
        title_range += "소재 전체"
        title_range += " / "
        title_range += "매장 전체"
      } else {
        if(this.filterData.foreign == "f_except") {  // 해외매장 제외
          title_range += "해외매장 제외"
        } else if(this.filterData.foreign == "f_store") {  // 해외매장
          title_range += "해외매장"
        } else if(this.filterData.foreign == "f_include") {  // 해외매장 포함
          title_range += "해외매장 포함"
        }

        title_range += " / "
        
        if(this.filterData.storekindCode == "STOKINDALL" || this.filterData.changeListCode) {
          title_range += "매장 형태 전체"
        } else {
          title_range += this.filterData.storekindNm
        }

        title_range += " / "

        if (this.filterData.item_a) { // 제품구분 전체
          title_range += "제품구분 전체"
        } else {
          if (this.filterData.itemsNm.length > 0) { // 구분
            for (let i=0;i<this.filterData.itemsNm.length;i++) {
              title_range += "'" + this.filterData.itemsNm[i] + "'"
              if (i < this.filterData.itemsNm.length - 1) {
                title_range += ","
              }
            }
          } else {
            title_range += "제품구분 -"
          }
        }

        title_range += " / "

        if (this.filterData.gubun_a) { // 구분 전체
            title_range += "구분 전체"
        } else {
          if (this.filterData.gubunsNm.length > 0) { // 구분
            for (let i=0;i<this.filterData.gubunsNm.length;i++) {
              title_range += "'" + this.filterData.gubunsNm[i] + "'"
              if (i < this.filterData.gubunsNm.length - 1) {
                title_range += ","
              }
            }
          } else {
            title_range += "구분 -"
          }
        }

        title_range += " / "

        // 출고유형
        if(this.filterData.releaseCodes == "RELEASEALL") { // 출고유형 전체 선택
          title_range += this.filterData.releaseNm
        } else {
          title_range += "출고유형 " + this.filterData.releaseNm
        }

        title_range += " / "
        
        // 판매유형
        if(this.filterData.saleCodes == "SALEALL") { // 판매유형 전체 선택
          title_range += this.filterData.saleNm
        } else {
          title_range += "판매유형 " + this.filterData.saleNm
        }

        title_range += " / "

        if (this.filterData.cloth_a) { // 복종 전체
          title_range += "복종 전체"
        } else {
          if (this.filterData.cloths.length > 0) { // 복종
            title_range += "복종: "
            for (let i=0;i<this.filterData.cloths.length;i++) {
              title_range += "'" + this.filterData.cloths[i] + "'"
              if (i < this.filterData.cloths.length - 1) {
                title_range += ","
              }
            }
          } else {
            title_range += "복종 -"
          }
        }

        title_range += " / "

        if (this.filterData.fabric_a) { // 소재 전체
          title_range += "소재 전체"
        } else {
          if (this.filterData.fabrics.length > 0) { // 소재
            title_range += "소재: "
            for (let i=0;i<this.filterData.fabrics.length;i++) {
              title_range += "'" + this.filterData.fabrics[i] + "'"
              if (i < this.filterData.fabrics.length - 1) {
                title_range += ","
              }
            }
          } else {
            title_range += "소재 -"
          }
        }
        
        title_range += " / "

        if (this.filterData.color_a) { // 컬러 전체
          title_range += "컬러 전체"
        } else {
          if (this.filterData.colors.length > 0) { // 컬러
            title_range += "컬러: "
            for (let i=0;i<this.filterData.colors.length;i++) {
              title_range += "'" + this.filterData.colors[i] + "'"
              if (i < this.filterData.colors.length - 1) {
                title_range += ","
              }
            }
          } else {
            title_range += "컬러 -"
          }
        }
        
        title_range += " / "
        
        if(this.filterData.store_a || this.filterData.changeListCode) {
          title_range += "매장 전체"
        } else {
          for (let i=0;i<this.filterData.storesNm.length;i++) {
            title_range += "'" + this.filterData.storesNm[i] + "'"
            if (i < this.filterData.storesNm.length - 1) {
              title_range += ","
            }
          }
        }

        title_range += ")"

      }

      this.title_range = title_range

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
    searchStyle() {
      this.STYLE_CLOTH = []

      this.req2svr.searchStyle(this.tabType, this.searchText, this.filterData).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.noResult = false;
              this.STYLE_CLOTH.push(res)
            } else {
              this.noResult = false;
              this.STYLE_CLOTH = JSON.parse("[" + res + "]")
            }
            // this.searchKey = 1
            // this.searchYn = true
            // this.orderBy = 2
          }
          this.searchKey = 1
          this.searchYn = true
          this.orderBy = 9
          this.title_text()
          this.filter_condition(true)
          this.chageOrderBy()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyleTopData: function() {
      this.STYLE_CLOTH = []
      let sql = ""

      this.req2svr.getStyleTopData(this.tabType, this.filterData).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.noResult = false;
              this.STYLE_CLOTH.push(res)
            } else {
              this.noResult = false;
              this.STYLE_CLOTH = JSON.parse("[" + res + "]")
            }
          }
          this.chageOrderBy()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDesignerTopData(){
      // 디자이너 탑10
      this.req2svr.getDesignerTopData(this.tabType, this.filterData.sucd).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DESIGNER = JSON.parse("[" + res + "]");
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    showFilter() {
      this.filter = true
    },
    hideFilter(data) {
      if (data) {
        this.filterData.first = data.first
        this.filterData.saleStartDate = moment(data.saleStartDate).format('YYYYMMDD')
        this.filterData.saleEndDate = moment(data.saleEndDate).format('YYYYMMDD')
        this.filterData.seasonStartYear = data.seasonStartYear
        this.filterData.seasonStartMonth = data.seasonStartMonth
        this.filterData.seasonEndYear = data.seasonEndYear
        this.filterData.seasonEndMonth = data.seasonEndMonth
        this.filterData.category = data.category
        this.filterData.storekindCode = data.storekindCode // 매장형태
        this.filterData.storekindNm = data.storekindNm // 매장형태 텍스트
        this.filterData.stores = data.stores // 매장
        this.filterData.storesNm = data.storesNm // 매장 텍스트
        this.filterData.store_a = data.store_a // 매장전체 체크
        this.filterData.foreign = data.foreign // 해외매장
        this.filterData.addReOrder = data.addReOrder // 리오더
        this.filterData.addSimilar = data.addSimilar // 유사상품
        this.filterData.items = data.items // 제품구분
        this.filterData.itemsNm = data.itemsNm // 매장 텍스트
        this.filterData.item_a = data.item_a // 제품구분 전체 체크
        this.filterData.gubuns = data.gubuns // 구분
        this.filterData.gubunsNm = data.gubunsNm // 구분 텍스트
        this.filterData.gubun_a = data.gubun_a // 구분 전체 체크
        this.filterData.cloths = data.cloths // 복종
        this.filterData.cloth_a = data.cloth_a // 복종전체 체크
        this.filterData.fabrics = data.fabrics
        this.filterData.fabric_a = data.fabric_a // 소재전체 체크
        this.filterData.colors = data.colors
        this.filterData.color_a = data.color_a // 컬러전체 체크
        this.filterData.releaseCodes = data.releaseCodes // 출고유형
        this.filterData.releaseNm = data.releaseNm // 출고유형 텍스트
        this.filterData.saleCodes = data.saleCodes // 판매유형
        this.filterData.saleNm = data.saleNm // 판매유형 텍스트
        this.filterData.sucd = data.sucd // 사업부 
        this.selectSucd = data.sucd // 사업부 
        this.filterData.changeListCode = data.changeListCode // 사업부탭 변경여부
        this.searchText = "" // 검색어 지우기
        this.searchYn = false // 검색리스트 아닌 일반리스트 호출
        if(this.dataFullYn == true) { // 더보기 끝까지 한 다음 팝업에서 조건을 바꾸면 모어 버튼을 보여주기 위해
          this.dataFullYn = false
        }
      
        this.loadData()
      }

      this.filter = false
    },
    clickDetail(data) {
      if(this.filterData.addReOrder && !this.filterData.addSimilar){
        data.MAINSTYCD = data.STYCODE
      }
      this.$router.push({
          name: 'NEWSTY0101',
          params: {
            data: 
            {
              STYCODE: data.STYCODE,
              MAINSTYCD: data.MAINSTYCD,
              RESEQ: data.RESEQ,
              saleStartDate: this.filterData.saleStartDate,
              saleEndDate: this.filterData.saleEndDate,
              filterData: this.filterData,
              orderBy: this.orderBy,
              orderByFilters: this.orderByFilters,
              sucd: this.filterData.sucd,
              ReOrder: this.filterData.addReOrder,
              foreign: this.filterData.foreign,
              gubuns: this.filterData.gubuns,
              gubun_a: this.filterData.gubun_a
            }
          }
      })
    },
    toMain() {
      this.$router.replace("/")
    },
    toDesignDetail(data, index) {
      this.showDesignDetail = true
      this.designerPopupData = data
      this.rank = index+1
    },
    hideDesignDetailPopup() {
      this.showDesignDetail = false
    },
    imageExist(url) {
      var img = new Image();
      img.src = url;
      return img.height != 0;
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