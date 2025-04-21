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
          <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': filterData.CODE == data.MCODE}">
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              :value="data.MCODE"
              v-model="filterData.CODE"
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
        <div class="layout_spacer"></div>
        <!-- groups -->
        <div class="groups">
          <button type="button" class="btn_icon btn_filter" @click="showFilter"><i class="material-icons">tune</i></button>
        </div>
      </div>
    </header>
    <div v-show="!filter && !showDesignDetail" class="container">
      <div class="content">
        <div class="cont_head">
          <h2 class="tit">{{title_text}}<small>{{title_range}}</small></h2>
          <div class="layout_spacer"></div>
          <div style="margin-right: 10px; line-height: 50px;"><small class="txt">데이터 기준일 : {{ makeDataDate }}</small></div>
          <!-- select -->
          <div class="select_box" v-if="filterData.CODE != 'CO'" style="margin-right:10px;">
            <select class="select" v-model="selectSucd" @change="changeSucd()" style="min-width: 200px;">
              <option :value="0">사업부 전체</option>
              <option v-for="data in styleSUData" :key="data.SUCD" :value="data.SUCD">{{ data.CODNM }}사업부</option>
            </select>
          </div>
          <div class="select_box" style="width:220px;margin-right:10px;">
            <select class="select" v-model="selectFilter" @change="chageCondition">
              <option v-for="(data, index) in selectionFilters" :key="index" :value="index">{{ data.NAME }}</option>
            </select>
          </div>
          <div class="select_box" >
            <select class="select" v-model="selectChina" @change="changeChina()" style="min-width: 200px;">
              <option v-for="data in ft_china" :key="data.CODE" :value="data.CODE">{{ data.TEXT }}</option>
            </select>
          </div>
        </div>
        <div class="style_list">
          <ul class="list">
            <li v-if="noResult">검색결과가 없습니다.</li>
            <li v-for="(data , index) in STYLE_LIST" :key="index">
              <div class="box teamSelector" @click="clickDetail(data)">
                <div class="inner">
                  <div v-show="filterData.category == 'styleTop' || filterData.category == 'styleWorst'" class="num_box"><strong>{{ index+1 }}</strong></div>
                  <!-- 리오더 표시 -->
                  <span v-if="data.MRGU == 'R'" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ data.RESEQ }}</span></span>
                  <span v-else-if="data.MRGU == 'M'" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
                  <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCD" />
                  <img v-else :src="data.MAINDIMAGEPATH" :alt="data.STYCD" />
                  <div class="info">
                    <strong class="txt_name">{{ data.STYCD }}</strong>
                    <ul class="style_info_list">
                      <li v-if="((filterData.category == 'styleTop' || filterData.category == 'styleWorst') && selectFilter == 0)
                       || (filterData.category == 'c_style' || filterData.category == 'f_style')">
                        <div class="sales_view circle">
                          <dl>
                            <dt class="tit">조회기간판매수량</dt>
                            <dd class="txt_num">{{ data.ACC_SALEQTY | currency }}<small class="txt_s">개</small></dd>
                          </dl>
                        </div>
                      </li>
                      <li class="graph_view" v-else-if="(filterData.category == 'styleTop' || filterData.category == 'styleWorst') && selectFilter == 1">
                        <dl >
                          <dt class="tit">조회기간판매율</dt>
                          <dd class="txt_num">{{ data.ACC_SALERATE }}<em>%</em><small class="txt_s">(금액)</small></dd>
                        </dl>
                        <div class="graph circle">
                          <div class="c100" :class="'p'+ Math.round(data.ACC_SALERATE > 100 ? 100 : data.ACC_SALERATE)">
                            <div class="slice">
                              <div class="bar"></div>
                              <div class="fill"></div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li v-else-if="(filterData.category == 'styleTop' || filterData.category == 'styleWorst') && selectFilter == 2">
                        <div class="sales_view circle">
                          <dl>
                            <dt class="tit">조회기간매출금액</dt>
                            <dd class="txt_num">{{ Math.round(data.ACC_SALEAMT/1000000) | currency }}<small class="txt_s">백만원</small></dd>
                          </dl>
                        </div>
                      </li>
                      <li>
                        <dl v-if="(filterData.category == 'styleTop' || filterData.category == 'styleWorst') && (selectFilter == 1 || selectFilter == 2)">
                          <dt class="tit">조회기간판매수량</dt>
                          <dd class="txt_num">{{ data.ACC_SALEQTY | currency }} 개</dd>
                        </dl>
                        <dl v-if="(filterData.category == 'c_style' || filterData.category == 'f_style') || selectFilter == 0 || selectFilter == 2">
                          <dt class="tit">조회기간판매율</dt>
                          <dd class="txt_num">{{ data.ACC_SALERATE }} %</dd>
                        </dl>
                        <dl v-if="(filterData.category == 'c_style' || filterData.category == 'f_style') || selectFilter == 0 || selectFilter == 1">
                          <dt class="tit">조회기간매출금액</dt>
                          <dd class="txt_num">{{ Math.round(data.ACC_SALEAMT/1000000) | currency }} 백만원</dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- aside_designer -->
    <!-- <div class="aside">
      <strong class="aside_title"><span><em class="txt">{{ this.filterData.CODE }}</em>Top 10</span></strong>
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
import filterPopup from '@/pages/style/STY0301'
import designdetailPopup from '@/pages/style/STY0201'
import sideMenu from '@/components/sideMenu'

export default {
  name: "STY0001",
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
      filter: false,
      date: null,      
      drawer: null,
      year: "",
      month: "",
      STYLE_CLOTH: [],
      DESIGNER: [],
      styleSUData: [],
      selectSucd: 1,
      selectChina: 0,
      filterData: {
        CODE: null,
        saleStartDate: null,
        saleEndDate: null,
        seasonStartYear: null,
        seasonStartMonth: null,
        seasonEndYear: null,
        seasonEndMonth: null,
        addReOrder: true,
        category: null,
        categorySub: 0,
        cloths: [],
        fabrics: [],
        condition: null,
        sucd: 1
      },
      categoryList: [
        { id: "styleTop", title: "Style Top 20", subList: [
            { id: "styleTop20", title: "Style Top 20" },
            { id: "c_styleTop20", title: "복종별 Style Top 20" },
            { id: "f_styleTop20", title: "소재별 Style Top 20" }
          ]
        },
        { id: "styleWorst", title: "Style Worst 20", subList: [
            { id: "styleWorst20", title: "Style Worst 20" },
            { id: "c_styleWorst20", title: "복종별 Style Worst 20" },
            { id: "f_styleWorst20", title: "소재별 Style Worst 20" }
          ]
        },
        { id: "c_style", title: "복종별 Style" },
        // { id: "f_style", title: "소재별 Style" },
      ],
      selectionFilters: [{ NAME: "", ITEM: ""}],
      conditionList: [ "판매수량별", "판매율별", "매출금액별" ],
      c_f_FilterList: [ { ITEM: "", STYCD: "" } ],
      STYLE_LIST: [],
      showDesignDetail: false,
      designerPopupData: null,
      rank: 0,
      gubun: "list",
      CODE: null,
      noResult: false,
      makeDataDate: null,
      ft_china: [
        {CODE: 0, TEXT: "해외매장 포함"},
        {CODE: 1, TEXT: "해외매장 제외"},
        {CODE: 2, TEXT: "해외매장 "}
      ]
    }
  },
  created() {
    this.filter = false
    this.showDesignDetail = false

    this.year = moment().format("YYYY");
    this.month = moment().format("M");

    if (this.data) {
      this.filterData.CODE = this.data.filterData.CODE
      this.filterData.saleStartDate = moment(this.data.filterData.saleStartDate).format('YYYYMMDD')
      this.filterData.saleEndDate = moment(this.data.filterData.saleEndDate).format('YYYYMMDD')
      this.filterData.seasonStartYear = this.data.filterData.seasonStartYear
      this.filterData.seasonStartMonth = this.data.filterData.seasonStartMonth
      this.filterData.seasonEndYear = this.data.filterData.seasonEndYear
      this.filterData.seasonEndMonth = this.data.filterData.seasonEndMonth
      this.filterData.addReOrder = this.data.filterData.addReOrder
      this.filterData.category = this.data.filterData.category
      this.filterData.categorySub = this.data.filterData.categorySub
      this.filterData.cloths = this.data.filterData.cloths
      this.filterData.fabrics = this.data.filterData.fabrics
      this.filterData.condition = this.data.filterData.condition

      this.selectFilter = this.data.selectFilter
      this.selectionFilters = this.data.selectionFilters
      this.selectChina = this.data.selectChina

      this.selectSucd = this.data.filterData.sucd
      this.filterData.sucd = this.data.filterData.sucd
    } else {
      if (this.filterData.CODE == null && this.CODECardsList && this.CODECardsList.length > 0) {
        this.filterData.CODE = this.authCodeList[0].MCODE
      }

      // this.filterData.saleStartDate = moment().startOf("years").format('YYYYMMDD')
      this.filterData.saleStartDate = moment().subtract(7, 'days').format('YYYYMMDD')
      this.filterData.saleEndDate = moment().subtract(1, 'days').format('YYYYMMDD')
      this.filterData.seasonStartYear = this.$store.getters.getYearCode(moment().format("YYYY"))
      this.filterData.seasonStartMonth = 1
      this.filterData.seasonEndYear = this.$store.getters.getYearCode(moment().format("YYYY"))
      this.filterData.seasonEndMonth = this.$store.getters.getMonthCode(moment().format("M"))
      this.filterData.addReOrder = true
      this.filterData.category = this.categoryList[0].id
      this.filterData.categorySub = 0
      this.filterData.cloths = []
      this.filterData.fabrics = []
      this.filterData.condition = 0

      this.selectFilter = 0
      this.selectChina = 0
      this.selectionFilters = []
      for (let i=0;i<this.conditionList.length;i++) {
        this.selectionFilters.push({NAME: this.conditionList[i], ITEM: this.conditionList[i]})
      }

      if(this.filterData.CODE == 'MI'){
        this.selectSucd = 1
        this.filterData.sucd = 1
      } else {
        this.selectSucd = 0
        this.filterData.sucd = 0
      }  
    }
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
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
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[1]
      }
      return this.$store.getters.getAuthBRCDCode[1]
    },
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    monthCodes() {
      return this.$store.getters.getMonthCodeList
    },
    DESIGNER_TOP10(){
      return this.DESIGNER.slice(0, 10)
      // return _.orderBy(this.STYLE_CLOTH, function(o) { return o.ACC_SALERATE }, 'desc').slice(0, 10)
    },
    title_text() {
      let data = _.find(this.categoryList, { id: this.filterData.category })
      if (data) {
        if (data.subList) {
          return data.subList[this.filterData.categorySub].title
        } else {
          return data.title
        }
      } else {
        return this.categoryList[0].title
      }
    },
    title_range() {
      let ReOrderYN = ""
      if(this.filterData.addReOrder) {
        ReOrderYN = "REORDER 포함"
      } else {
        ReOrderYN = "REORDER 제외"
      }

      return "(STYLE SEASON : " + this.filterData.seasonStartYear + this.filterData.seasonStartMonth + " ~ " + this.filterData.seasonEndYear + this.filterData.seasonEndMonth + 
      " / SALE PERIOD : " + moment(this.filterData.saleStartDate).format('YY.MM.DD') + " ~ " + moment(this.filterData.saleEndDate).format('YY.MM.DD') + 
      "/ " + ReOrderYN +
      ")"
    }
  },
  methods: {
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }

      // 상세에서 넘어 오는 경우 제외하고 미샤외의 브랜드 선택시 사업부 리셋
      // if (!this.data) {
      //   if(this.filterData.CODE == 'MI'){
      //     this.selectSucd = 1
      //     this.filterData.sucd = 1
      //   } else {
      //     this.selectSucd = 0
      //     this.filterData.sucd = 0
      //   }  
      // }
      
      this.getMakeDataDate()
      this.getSucd()
      this.getStyleTopData()
      this.getDesignerTopData()
    },
    changeCODE(code) {
      this.filterData.CODE = code
      // 미샤외의 브랜드 선택시 사업부 리셋
      if(code == 'MI'){
        this.selectSucd = 1
        this.filterData.sucd = 1
      } else {
        this.selectSucd = 0
        this.filterData.sucd = 0
      }

      // 브랜드탭 선택시 판매수량별, 해외매장 포함으로 셀렉박스 리셋
      this.selectFilter = 0
      this.selectChina = 0

      this.loadData()
    },
    chageCondition() {
      if (this.filterData.category == "styleTop") {
        if(this.selectFilter == 0) {
          // 판매수량별
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACC_SALEQTY); }, 'desc')).slice(0, 20)
        } else if(this.selectFilter == 1) {
          // 판매율별
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACC_SALERATE); }, 'desc')).slice(0, 20)
        } else if(this.selectFilter == 2) {
          // 매출금액별
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACC_SALEAMT); }, 'desc')).slice(0, 20)
        }
        this.filterData.condition = this.selectFilter
      } else if(this.filterData.category ==  "styleWorst") {
        if(this.selectFilter == 0) {
          // 판매수량별
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACC_SALEQTY); }, 'asc')).slice(0, 20)
        } else if(this.selectFilter == 1) {
          // 판매율별
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACC_SALERATE); }, 'asc')).slice(0, 20)
        } else if(this.selectFilter == 2) {
          // 매출금액별
          this.STYLE_LIST = (_.orderBy(this.STYLE_CLOTH, function(o) { return Number(o.ACC_SALEAMT); }, 'asc')).slice(0, 20)
        }
        this.filterData.condition = this.selectFilter

      } else {
        if (this.selectFilter > 0) {
          this.STYLE_LIST = []
          let array = _.filter(this.c_f_FilterList, _.matches({ITEM: this.selectionFilters[this.selectFilter].ITEM}))
          let item
          for (let i=0;i<array.length;i++) {
            item = _.find(this.STYLE_CLOTH, {STYCD: array[i].STYCD})
            if (item) {
              this.STYLE_LIST.push(item)
            }
          }
          // 판매수량별
          this.STYLE_LIST = _.orderBy(this.STYLE_LIST, function(o) { return Number(o.ACC_SALEQTY); }, 'desc')
        } else {
          this.STYLE_LIST = this.STYLE_CLOTH
        }
      }
    },
    changeSucd() {
      this.getStyleTopData()
      this.filterData.sucd = this.selectSucd
    },
    changeChina() {
      this.getStyleTopData()
    },
    convertPercent(value) {
      var x
      if (value) {
        x = Number(value) > 100 ? 100 : Number(value)
      } else {
        x = 0
      }
      return x
    },
    getMakeDataDate(){
      let sql = "SELECT TO_CHAR(MAX(CREATEDATE), 'YY.MM.DD HH24:MI') CREATEDATE FROM BISY011";

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
    getSucd: function() {
      // 사업부 조회
      let sql = "SELECT SUCD, LENGTH(SUCD) CNT FROM BISH010 ";
      if(this.filterData.CODE == "IT" || this.filterData.CODE == "SO") {
        sql += "WHERE (BRCD = '" + this.filterData.CODE + "' OR SUCD = '21')";  
      } else {
        sql += "WHERE BRCD = '" + this.filterData.CODE + "' ";  
      }
      sql += "GROUP BY SUCD, CNT ";
      sql += "ORDER BY CNT";

      this.req2svr.getData(sql).then(
        res => {
          this.styleSUData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.styleSUData.push(res)
              this.styleSUData[0].CODNM = this.$store.getters.getSUCDCODNM(res.SUCD)
            } else {
              this.styleSUData = JSON.parse("[" + res + "]")
              for (let i=0;i<this.styleSUData.length;i++) {
                this.styleSUData[i].CODNM = this.$store.getters.getSUCDCODNM(this.styleSUData[i].SUCD)
              }
            }
            // this.filterData.styleSUData = this.styleSUData
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyleTopData: function() {
      this.STYLE_CLOTH = []
      let sql = ""

      let c_sql = "";
      if(this.selectChina == 1){  //해외매장 제외
        c_sql += "AND NVL(SHTP,'-1') <> '10' ";
      }else if(this.selectChina == 2){  //해외매장
        c_sql += "AND NVL(SHTP,'-1') = '10' ";
      }
      // 스타일 TOP10
      if(!this.filterData.addReOrder) {

        sql += "SELECT ST." + this.tabType + ", ST.STYCD, ST.DIMAGEPATH, ST.MAINDIMAGEPATH, ST.RESEQ, ";
        sql += "CASE WHEN STAGPRI > 0 THEN ROUND(SILAMT/STAGPRI*100,1) ELSE 0 END AS ACC_SALERATE, ";
        sql += "CASE WHEN MRGU IS NULL THEN '' ELSE MRGU END AS MRGU, ";
        sql += "SILAMT AS ACC_SALEAMT, SQTY AS ACC_SALEQTY FROM ";
        sql += "(SELECT " + this.tabType + ", STYCD, DIMAGEPATH, MAINDIMAGEPATH, MRGU, RESEQ, SUM(SQTY) SQTY, SUM(SILAMT) SILAMT FROM BISY011 ";  
        sql += "WHERE " + this.tabType + " = '" + this.filterData.CODE + "' ";
        if(this.selectSucd == 0){
        } else {
          sql += "AND SUCD = '" + this.selectSucd + "' ";
        }
        sql += "AND INOUTDT BETWEEN '" + this.filterData.saleStartDate + "' AND '" + this.filterData.saleEndDate + "' ";
        sql += "AND YSCD BETWEEN '" + this.filterData.seasonStartYear + this.filterData.seasonStartMonth + "' AND '" + this.filterData.seasonEndYear + this.filterData.seasonEndMonth + "' ";
        sql += c_sql  //해외매장 조건
        
        if (this.filterData.category == "styleTop" || this.filterData.category ==  "styleWorst") {
          if (this.filterData.categorySub == 1) {
            sql += "AND ITEM IN ("
            for (let i=0;i<this.filterData.cloths.length;i++) {
              sql += "'" + this.filterData.cloths[i] + "'"
              if (i < this.filterData.cloths.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 복종
          } else if (this.filterData.categorySub == 2) {
            sql += "AND SOJAE IN ("
            for (let i=0;i<this.filterData.fabrics.length;i++) {
              sql += "'" + this.filterData.fabrics[i] + "'"
              if (i < this.filterData.fabrics.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 소재
          }
        } else if (this.filterData.category == "c_style") {
          sql += "AND ITEM IN ("
          for (let i=0;i<this.filterData.cloths.length;i++) {
            sql += "'" + this.filterData.cloths[i] + "'"
            if (i < this.filterData.cloths.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 복종
        } else if (this.filterData.category == "f_style") {
          sql += "AND SOJAE IN ("
          for (let i=0;i<this.filterData.fabrics.length;i++) {
            sql += "'" + this.filterData.fabrics[i] + "'"
            if (i < this.filterData.fabrics.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 소재
        }
        sql += "GROUP BY " + this.tabType + ", STYCD, DIMAGEPATH, MAINDIMAGEPATH, MRGU, RESEQ) ST ";
        sql += "LEFT OUTER JOIN ";
        sql += "(SELECT STYCD, DIMAGEPATH, SUM(SQTY) INQTY, SUM(STAGPRI) STAGPRI FROM BISY011 ";
        sql += "WHERE " + this.tabType + " = '" + this.filterData.CODE + "' ";
        if(this.selectSucd == 0){
        } else {
          sql += "AND SUCD = '" + this.selectSucd + "' ";
        }
        if (this.filterData.category == "styleTop" || this.filterData.category ==  "styleWorst") {
          if (this.filterData.categorySub == 1) {
            sql += "AND ITEM IN ("
            for (let i=0;i<this.filterData.cloths.length;i++) {
              sql += "'" + this.filterData.cloths[i] + "'"
              if (i < this.filterData.cloths.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 복종
          } else if (this.filterData.categorySub == 2) {
            sql += "AND SOJAE IN ("
            for (let i=0;i<this.filterData.fabrics.length;i++) {
              sql += "'" + this.filterData.fabrics[i] + "'"
              if (i < this.filterData.fabrics.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 소재
          }
        } else if (this.filterData.category == "c_style") {
          sql += "AND ITEM IN ("
          for (let i=0;i<this.filterData.cloths.length;i++) {
            sql += "'" + this.filterData.cloths[i] + "'"
            if (i < this.filterData.cloths.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 복종
        } else if (this.filterData.category == "f_style") {
          sql += "AND SOJAE IN ("
          for (let i=0;i<this.filterData.fabrics.length;i++) {
            sql += "'" + this.filterData.fabrics[i] + "'"
            if (i < this.filterData.fabrics.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 소재
        }
        sql += c_sql  //해외매장 조건
        sql += "GROUP BY STYCD, DIMAGEPATH) IT ";
        sql += "ON ST.STYCD = IT.STYCD ";
        sql += "ORDER BY ACC_SALEQTY DESC ";
      } else {
        sql += "SELECT ST." + this.tabType + ", ST.MAINSTYCD STYCD, ST.DIMAGEPATH, ";
        sql += "CASE WHEN STAGPRI > 0 THEN ROUND(SILAMT/STAGPRI*100, 1) ELSE 0 END AS ACC_SALERATE, ";
        sql += "SILAMT AS ACC_SALEAMT, SQTY AS ACC_SALEQTY FROM ";
        sql += "(SELECT " + this.tabType + ", MAINSTYCD, MIN(DIMAGEPATH) DIMAGEPATH, SUM(SQTY) SQTY, SUM(SILAMT) SILAMT FROM BISY011 ";
        sql += "WHERE " + this.tabType + " = '" + this.filterData.CODE + "' ";
        if(this.selectSucd == 0){
        } else {
          sql += "AND SUCD = '" + this.selectSucd + "' ";
        }
        sql += "AND INOUTDT BETWEEN '" + this.filterData.saleStartDate + "' AND '" + this.filterData.saleEndDate + "' ";
        sql += "AND YSCD BETWEEN '" + this.filterData.seasonStartYear + this.filterData.seasonStartMonth + "' AND '" + this.filterData.seasonEndYear + this.filterData.seasonEndMonth + "' ";
        sql += c_sql  //해외매장 조건
        
        if (this.filterData.category == "styleTop" || this.filterData.category ==  "styleWorst") {
          if (this.filterData.categorySub == 1) {
            sql += "AND ITEM IN ("
            for (let i=0;i<this.filterData.cloths.length;i++) {
              sql += "'" + this.filterData.cloths[i] + "'"
              if (i < this.filterData.cloths.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 복종
          } else if (this.filterData.categorySub == 2) {
            sql += "AND SOJAE IN ("
            for (let i=0;i<this.filterData.fabrics.length;i++) {
              sql += "'" + this.filterData.fabrics[i] + "'"
              if (i < this.filterData.fabrics.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 소재
          }
        } else if (this.filterData.category == "c_style") {
          sql += "AND ITEM IN ("
          for (let i=0;i<this.filterData.cloths.length;i++) {
            sql += "'" + this.filterData.cloths[i] + "'"
            if (i < this.filterData.cloths.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 복종
        } else if (this.filterData.category == "f_style") {
          sql += "AND SOJAE IN ("
          for (let i=0;i<this.filterData.fabrics.length;i++) {
            sql += "'" + this.filterData.fabrics[i] + "'"
            if (i < this.filterData.fabrics.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 소재
        }
        sql += "GROUP BY BRCD, MAINSTYCD) ST ";
        sql += "LEFT OUTER JOIN ";
        sql += "(SELECT MAINSTYCD, MIN(DIMAGEPATH) DIMAGEPATH, SUM(SQTY) INQTY, SUM(STAGPRI) STAGPRI FROM BISY011 ";
        sql += "WHERE " + this.tabType + " = '" + this.filterData.CODE + "' ";
        if(this.selectSucd == 0){
        } else {
          sql += "AND SUCD = '" + this.selectSucd + "' ";
        }
        if (this.filterData.category == "styleTop" || this.filterData.category ==  "styleWorst") {
          if (this.filterData.categorySub == 1) {
            sql += "AND ITEM IN ("
            for (let i=0;i<this.filterData.cloths.length;i++) {
              sql += "'" + this.filterData.cloths[i] + "'"
              if (i < this.filterData.cloths.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 복종
          } else if (this.filterData.categorySub == 2) {
            sql += "AND SOJAE IN ("
            for (let i=0;i<this.filterData.fabrics.length;i++) {
              sql += "'" + this.filterData.fabrics[i] + "'"
              if (i < this.filterData.fabrics.length - 1) {
                sql += ","
              }
            }
            sql += ") "; // 소재
          }
        } else if (this.filterData.category == "c_style") {
          sql += "AND ITEM IN ("
          for (let i=0;i<this.filterData.cloths.length;i++) {
            sql += "'" + this.filterData.cloths[i] + "'"
            if (i < this.filterData.cloths.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 복종
        } else if (this.filterData.category == "f_style") {
          sql += "AND SOJAE IN ("
          for (let i=0;i<this.filterData.fabrics.length;i++) {
            sql += "'" + this.filterData.fabrics[i] + "'"
            if (i < this.filterData.fabrics.length - 1) {
              sql += ","
            }
          }
          sql += ") "; // 소재
        }
        sql += c_sql  //해외매장 조건
        sql += "GROUP BY MAINSTYCD) IT ";
        sql += "ON ST.MAINSTYCD = IT.MAINSTYCD ";
        sql += "ORDER BY ACC_SALEQTY DESC";
      }

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            this.noResult = false;
            this.STYLE_CLOTH = JSON.parse("[" + res + "]")
          }
          this.loadFilter()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    createSelectionFilters() {
      if (this.filterData.category == "c_style") {
        this.selectionFilters = []
        let array, totalCount = 0
        for (let i=0;i<this.filterData.cloths.length;i++) {
          array = _.filter(this.c_f_FilterList, _.matches({ITEM: this.filterData.cloths[i]}))
          if (array.length > 0) {
            this.selectionFilters.push({NAME: this.filterData.cloths[i] + " (" + array.length + ")", ITEM: this.filterData.cloths[i]})
            totalCount += array.length
          }
        }
        this.selectionFilters.unshift({NAME: "전체 (" + totalCount + ")"})
        this.chageCondition()
      } else if (this.filterData.category == "f_style") {
        this.selectionFilters = []
        let array, totalCount = 0
        for (let i=0;i<this.filterData.fabrics.length;i++) {
          array = _.filter(this.c_f_FilterList, _.matches({ITEM: this.filterData.fabrics[i]}))
          if (array.length > 0) {
            this.selectionFilters.push({NAME: this.filterData.fabrics[i] + " (" + array.length + ")", ITEM: this.filterData.fabrics[i]})
            totalCount += array.length
          }
        }
        this.selectionFilters.unshift({NAME: "전체 (" + totalCount + ")"})
        this.chageCondition()
      }
    },
    loadFilter() {
      if (this.filterData.category == "styleTop" || this.filterData.category ==  "styleWorst") {
        this.selectionFilters = []
        for (let i=0;i<this.conditionList.length;i++) {
          this.selectionFilters.push({NAME: this.conditionList[i]})
        }
        this.chageCondition()
      } else if (this.filterData.category == "c_style") {
        this.selectFilter = 0
        this.selectionFilters = []
        this.getItemFilterData()
      } else if (this.filterData.category == "f_style") {
        this.selectFilter = 0
        this.selectionFilters = []
        this.getSojaeFilterData()
      }
    },
    getItemFilterData: function() {
      this.c_f_FilterList = []

      let sql = "SELECT STYCD, ITEM FROM BISY011 "
      sql += "WHERE " + this.tabType + " = '" + this.filterData.CODE + "' ";
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += "AND YSCD BETWEEN '" + this.filterData.seasonStartYear + this.filterData.seasonStartMonth + "' AND '" + this.filterData.seasonEndYear + this.filterData.seasonEndMonth + "' ";
      sql += "AND INOUTDT BETWEEN '" + this.filterData.saleStartDate + "' AND '" + this.filterData.saleEndDate + "' ";
      sql += "AND ITEM IN ("
      for (let i=0;i<this.filterData.cloths.length;i++) {
        sql += "'" + this.filterData.cloths[i] + "'"
        if (i < this.filterData.cloths.length - 1) {
          sql += ","
        }
      }
      sql += ") "; // 복종
      sql += "GROUP BY STYCD, ITEM ";
      
      this.req2svr.getData(sql).then(
        res => {
          this.c_f_FilterList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.c_f_FilterList = JSON.parse("[" + res + "]");
          }
          this.createSelectionFilters()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSojaeFilterData: function() {
      this.c_f_FilterList = []

      let sql = "SELECT STYCD, SOJAE ITEM FROM BISY011 "
      sql += "WHERE " + this.tabType + " = '" + this.filterData.CODE + "' ";
      sql += "AND YSCD BETWEEN '" + this.filterData.seasonStartYear + this.filterData.seasonStartMonth + "' AND '" + this.filterData.seasonEndYear + this.filterData.seasonEndMonth + "' ";
      sql += "AND INOUTDT BETWEEN '" + this.filterData.saleStartDate + "' AND '" + this.filterData.saleEndDate + "' ";
      sql += "AND SOJAE IN ("
      for (let i=0;i<this.filterData.fabrics.length;i++) {
        sql += "'" + this.filterData.fabrics[i] + "'"
        if (i < this.filterData.fabrics.length - 1) {
          sql += ","
        }
      }
      sql += ") "; // 소재
      sql += "GROUP BY STYCD, SOJAE ";
      
      this.req2svr.getData(sql).then(
        res => {
          this.c_f_FilterList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.c_f_FilterList = JSON.parse("[" + res + "]");
          }
          this.createSelectionFilters()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDesignerTopData(){
      // 디자이너 탑10
      let today = moment().format("YYYYMMDD")
      let lastYearToday = moment(today).subtract(1, 'year').format("YYYYMMDD")

      let sql = "SELECT A.DESIGNER ";
	    sql += ",A.EMPNAME ";
	    sql += ",A.PHOTOPATH ";
      sql += ",CASE WHEN A.ACC_STAGPRI = 0 THEN 0 ELSE ROUND(A.ACC_SALEAMT/A.ACC_STAGPRI * 100,1) END AS ACC_SALERATE ";
	    sql += ",A.ACC_SALEQTY AS ACC_SALEQTY ";
      sql += ",A.ACC_SALEAMT AS ACC_SALEAMT ";
      sql += "FROM ( ";
      sql += "SELECT DESIGNER ";
  		sql += ",EMPNAME ";
  		sql += ",PHOTOPATH ";
      sql += ",SUM(SQTY) AS ACC_SALEQTY ";
      sql += ",SUM(SILAMT) AS ACC_SALEAMT ";
      sql += ",SUM(STAGPRI) AS ACC_STAGPRI ";
      sql += "FROM BISY021 ";
      sql += "WHERE DESIGNER IS NOT NULL ";
      sql += "AND OUTDT >= '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' "; /* 최근 1년 데이터를 추출하기 위함으로, 1년전 내일 날짜를 입력해주시기 바랍니다. */
      sql += "AND " + this.tabType + " = '" + this.filterData.CODE + "' ";
      sql += "GROUP BY DESIGNER,EMPNAME,PHOTOPATH ";
      sql += ") A ";
      sql += "ORDER BY ACC_SALERATE DESC "; /* 판매율별 */

      this.req2svr.getData(sql).then(
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
        this.filterData.CODE = data.CODE
        this.filterData.saleStartDate = moment(data.saleStartDate).format('YYYYMMDD')
        this.filterData.saleEndDate = moment(data.saleEndDate).format('YYYYMMDD')
        this.filterData.seasonStartYear = data.seasonStartYear
        this.filterData.seasonStartMonth = data.seasonStartMonth
        this.filterData.seasonEndYear = data.seasonEndYear
        this.filterData.seasonEndMonth = data.seasonEndMonth
        this.filterData.addReOrder = data.addReOrder
        this.filterData.category = data.category
        this.filterData.categorySub = data.categorySub
        this.filterData.cloths = data.cloths
        this.filterData.fabrics = data.fabrics
        this.filterData.condition = data.condition
        this.selectFilter = data.condition
        this.filterData.sucd = data.sucd
        this.selectSucd = data.sucd
      
        this.loadData()
      }

      this.filter = false
    },
    clickDetail(data) {
      this.$router.push({
          name: 'STY0101',
          params: {
            data: 
            { 
              STYCD: data.STYCD,
              saleStartDate: this.filterData.saleStartDate,
              saleEndDate: this.filterData.saleEndDate,
              filterData: this.filterData,
              selectFilter: this.selectFilter,
              selectionFilters: this.selectionFilters,
              CODE: this.filterData.CODE,
              ReOrder: this.filterData.addReOrder,
              selectChina: this.selectChina,
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