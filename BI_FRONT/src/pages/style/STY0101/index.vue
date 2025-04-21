<template>
  <!-- aside 붙었을때 클래스 : aside_layout -->
  <!-- <div class="wrap aside_layout"> -->
  <div class="wrap">
    <detailPopup v-if="showDetail" 
      :data="editData"
      @close="hideDetailPopup"
    ></detailPopup>
    <designdetailPopup
      v-if="showDesignDetail"
      :designerPopupData="designerPopupData"
      :CODE="this.CODE"
      :gubun="gubun"
      :ReOrder="this.ReOrder"
      @close="hideDesignDetailPopup"
    />
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
          @click="toBack"
        ><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">{{ TITLE }}
          <span v-if="CLOTH.MRGU == 'R' && selectStyle != 0" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ CLOTH.RESEQ }}</span></span>
          <span v-if="CLOTH.MRGU == 'M' && selectStyle != 0" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
        </h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- 사업부별 추가 -->
        <div class="groups" style="padding-right: 22px;">
          <div class="select_box">
            <select class="select" v-model="selectStyle" @change="changeStyle()" style="min-width: 200px;">
              <option v-for="data in KINDOFSTYLE" :key="data.STYCD" :value="data.STYCD">{{ data.STYCD }}</option>
              <option :value="0">리오더포함 TOTAL</option>
            </select>
          </div>
          <div class="select_box" v-if="selectStyle != 0">
            <select class="select" v-model="selectSucd" @change="changeSucd()" style="min-width: 200px;">
              <option :value="0">사업부 전체</option>
              <option v-for="data in styleSUData" :key="data.SUCD" :value="data.SUCD">{{ data.CODNM }}사업부</option>
            </select>
          </div>
          <div class="select_box" v-if="selectStyle != 0">
            <select class="select" v-model="selectChina" @change="changeSucd()" style="min-width: 200px;">
              <option v-for="data in ft_china" :key="data.CODE" :value="data.CODE">{{ data.TEXT }}</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <div class="container cont_info">
      <div class="content">
        <div class="row">
          <div class="col_md_3 info_view">
            <div class="box">
              <div class="inner">
                <div class="img_photo c"><img v-if="CLOTH.DIMAGEPATH" :src="CLOTH.DIMAGEPATH" :alt="CLOTH.STYCD"/></div>
                <div class="box_info" v-if="selectStyle != 0">
                  <button
                    type="button"
                    class="btn_n"
                    @click="toDetail"
                  ><i class="material-icons">add_circle_outline</i>VIEW STYLE INFO</button>
                </div>
              </div>
            </div>

            <div class="info_list">
              <ul class="list">
                <li>
                  <strong class="title">디자이너</strong>
                  <span class="cont">{{ CLOTH.EMPNAME }}</span>
                </li>
                <li>
                  <strong class="title">소재</strong>
                  <span class="cont">{{ CLOTH.SOJAENM }}</span>
                </li>
                <li>
                  <strong class="title">소재명/소재업체</strong>
                  <span class="cont" v-if="CLOTH.PRDTGU == '1'">{{ CLOTH.SOJAENMOG }}</span>
                  <span class="cont" v-else-if="CLOTH.PRDTGU == '2'">{{ CLOTH.SOJAENMOG }} / {{ CLOTH.CUSTNM }}</span>
                </li>
                <li>
                  <strong class="title">임가공업체</strong>
                  <span class="cont" v-if="CLOTH.PRDTGU == '1'">{{ CLOTH.CUSTNM }}</span>
                  <span class="cont" v-else-if="CLOTH.PRDTGU == '2'"></span>
                </li>
                <li>
                  <strong class="title">TAG가 (원)</strong>
                  <span class="cont">{{ CLOTH.TAGPRI | currency }}</span>
                </li>
                <li>
                  <strong class="title">현재가</strong>
                  <span class="cont">{{ CLOTH.MIN_SALEPRI | currency }} ~ {{ CLOTH.MAX_SALEPRI | currency }}</span>
                </li>
                <li>
                  <strong class="title">출고일</strong>
                  <span class="cont">{{ OUTDT }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col_md_9">
            <div class="row row_box">
              <div class="col_md_6" style="min-height:320px;">
                <!-- box1 -->
                <div class="cont_box">
                  <div class="tit">
                    <strong class="tit_txt">누적 판매실적</strong>
                    <span class="txt">(출고일 ~ 현재)</span>
                    <div class="layout_spacer"></div>
                    <span class="txt">(물류입고 : {{ INOUTQTY.INQTY | currency }}개 | 물류출고 : {{ INOUTQTY.OUTQTY | currency }}개)</span>
                  </div>
                  <div class="cont">
                    <div class="row">
                      <div class="col_md_7">
                        <div class="graph_cont">
                          <span class="view">
                            <span class="tit">수량기준<small>(누적판매율)</small></span>
                            <span class="txt_num">{{ ACC_SALE_DATA.ACC_QTY_RATE | nanToDot }}<small>%</small></span>
                          </span>
                          <strong class="graph line_bar">
                            <span class="bar" :style="{width: convertPercent(ACC_SALE_DATA.ACC_QTY_RATE) +'%'}"></span>
                          </strong>
                        </div>
                        <div class="graph_cont">
                          <span class="view">
                            <span class="tit">금액기준<small>(누적판매율)</small></span>
                            <span class="txt_num">{{ ACC_SALE_DATA.ACC_AMT_RATE | nanToDot }}<small>%</small></span>
                          </span>
                          <strong class="graph line_bar">
                            <span class="bar" :style="{width: convertPercent(ACC_SALE_DATA.ACC_AMT_RATE) +'%'}"></span>
                          </strong>
                        </div>
                      </div>
                      <div class="col_md_5">
                        <div class="result_view">
                          <dl>
                            <dt class="tit">누적판매금액</dt>
                            <dd class="txt_result">{{ Math.round(ACC_SALE_DATA.SILAMT/1000000) | currency }}<small class="txt">백만원</small></dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col_md_6">
                <!-- box1 -->
                <div class="cont_box">
                  <div class="tit">
                    <strong class="tit_txt">기판실적</strong>
                    <span class="txt">({{ JRSTARTDATE }} ~ {{ JRENDDATE }})</span>
                  </div>
                  <div class="cont">
                    <div class="graph_area">
                      <!-- 그래프 1 -->
                      <div class="graph_view" style="width:50%;">
                        <!-- 텍스트 값 -->
                        <div class="graph_result gr_s">
                          <dl>
                            <dt class="tit">수량</dt>
                            <dd class="txt_result txt_s">{{ dr_S.SQTY | currency }}<small>개</small></dd>
                          </dl>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph">
                          <div style="position:relative; width:100%; height:115px; float:left;">
                            <div id="chartdiv1" style="position:relative; width:100%; height:100%;"></div>
                          </div>
                        </div>
                      </div>
                      <!-- 그래프 2 -->
                      <div class="graph_view" style="width:50%;">
                        <!-- 텍스트 값 -->
                        <div class="graph_result gr_s">
                          <dl>
                            <dt class="tit">금액</dt>
                            <dd class="txt_result txt_s">{{ Math.round(dr_S.SILAMT/1000) | currency }}<small>천원</small></dd>
                            <!-- <dd class="txt_etc">
                              <span class="chip chip_m box_chip chip_sty01">
                                  <span class="chip_text">선수금</span>
                              </span>
                              <em class="point_col1">230 천원</em>
                            </dd> -->
                          </dl>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph">
                          <div style="position:relative; width:100%; height:115px; float:left;">
                            <div id="chartdiv2" style="position:relative; width:100%; height:100%;"></div>
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
                  </div>
                </div>
              </div>
            </div>

            <!-- box2 -->
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">판매율 추이</strong>
                <div class="layout_spacer"></div>
              </div>
              <div class="cont" style="height:400px;">
                <div class="graph_area">
                  <div class="graph_view">
                    <div class="graph" style="position:relative; width:98%; height:360px;">
                      <div id="chartdiv3" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- aside_designer -->
    <!-- <div class="aside">
      < !-- <strong class="aside_title"><span><em class="txt">MI</em>Top 10</span></strong> -- >
      <div class="aside_title" style="background-color: #252733;"></div>
      <div class="list_cont scroll_cont">
        <ul class="list">
          <li v-for="data in DESIGNER" :key="data.DESIGNER" @click="toDesignDetail(data)">
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
import sideMenu from '@/components/sideMenu'
import detailPopup from '@/pages/style/STY0102'
import designdetailPopup from '@/pages/style/STY0201'

export default {
  name: "STY0101",
  components: {
    sideMenu,
    detailPopup,
    designdetailPopup
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.loadData()

    this.makeChart1()
    this.makeChart2()
    this.makeChart3()
  },
  data() {
    return {
      drawer: null,
      date: null,      
      year: "",
      month: "",
      saleStartDate: "",
      saleEndDate: "",
      MAINSTYCD: "",
      STYCD: "",
      CLOTH: {},
      ACC_SALE_DATA: {},
      ACC_SALE_RATE: {},
      DESIGNER: [],
      KINDOFSTYLE: [],
      // 기판실적
      dr_S: {
        JSQTY: 0, DCSQTY: 0, GSQTY: 0, JSAMT: 0, DCSAMT: 0, GSAMT: 0,
        JRQTY: 0, DCRQTY: 0, GRQTY: 0, JRAMT: 0, DCRAMT: 0, GRAMT: 0,
        SQTY: 0, SILAMT: 0
      },
      showDetail: false,
      showDesignDetail: false,
      designerPopupData: "",
      gubun: "detail",
      CODE: "",
      ReOrder: "",
      INOUTQTY: {},
      styleSUData: [],
      selectSucd: 0,
      selectChina: 0,
      selectStyle: null,
      flag: "",
      editData: {},
      makeDataDate: null,
      TITLE: "",
      ft_china: [
        {CODE: 0, TEXT: "해외매장 포함"},
        {CODE: 1, TEXT: "해외매장 제외"},
        {CODE: 2, TEXT: "해외매장 "}
      ]
    }
  },
  created() {
    if (!this.data) {
      this.$router.replace("/STY0001")
      return
    }

    this.editData = _.cloneDeep(this.data)

    this.showDetail = false
    this.showDesignDetail = false

    this.initData()

    this.year = moment().format("YYYY");
    this.month = moment().format("M");
  },
  computed: {
    req2svr: () => req2svr,
    OUTDT(){
      if (this.CLOTH.OUTDT) {
        return  moment(this.CLOTH.OUTDT).format("YYYY-MM-DD")
      }
      return ""
    },
    JRSTARTDATE(){
      return  moment(this.saleStartDate).format("YY-MM-DD")
    },
    JRENDDATE(){
      return  moment(this.saleEndDate).format("YY-MM-DD")
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
  },
  methods: {
    initData() {
      // this.STYCD = "MIHBWPT510"
      this.TITLE = this.data.STYCD
      this.STYCD = this.data.STYCD
      this.saleStartDate = this.data.saleStartDate
      this.saleEndDate = this.data.saleEndDate
      this.CODE = this.data.CODE
      this.ReOrder = this.data.ReOrder
    },
    loadData() {
      // 데이터 기준일
      this.getMakeDataDate()

      // 옷 상세 정보
      this.getClothData()

      // 누적판매 실적
      this.getAccClothSaleData()

      // 기판실적 입고,출고
      this.getInOutQty()

      // 기판실적
      this.getClothJRData()

      // 누적 판매율 추이
      this.getAccClothSaleRate()

      //  디자이너 정보
      this.getDesignerData()
    },
    changeStyle: function() {
      // 상세화면을 위한 가공
      this.editData.STYCD = this.selectStyle

      // 상세화면 타이틀
      if(this.selectStyle == 0){
        this.TITLE = "스타일 전체"
      } else {
        this.TITLE = this.selectStyle
      }

      // 스타일 변경시 선택한 스타일 코드 대입
      this.STYCD = this.selectStyle

      // 스타일 변경시 사업부 코드 리셋
      this.selectSucd = 0

      // 스타일별 사업부 조회
      this.getStyleSucd()

      // 사업부 변경에 따른 데이터 로드
      this.changeSucd()
    },
    changeSucd: function() {
      // 옷 상세 정보
      this.getClothData()

      // 누적판매 실적
      this.getAccClothSaleData()

      // 기판실적 입고,출고
      this.getInOutQty()

      // 기판실적
      this.getClothJRData()

      // 누적 판매율 추이
      this.getAccClothSaleRate()
    },
    changechina: function() {
      // 옷 상세 정보
      this.getClothData()

      // 누적판매 실적
      this.getAccClothSaleData()

      // 기판실적 입고,출고
      this.getInOutQty()

      // 기판실적
      this.getClothJRData()

      // 누적 판매율 추이
      this.getAccClothSaleRate()
    },
    getMakeDataDate(){
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      let sql = "SELECT TO_CHAR(MAX(CREATEDATE), 'YY.MM.DD HH24:MI') CREATEDATE FROM " + table;

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
    getMainStyle: function () {
      if (this.MAINSTYCD != "") {
        return
      }
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 메인 스타일
      let sql = "SELECT MAINSTYCD FROM " + table;
      sql += "WHERE STYCD = '" + this.STYCD + "' ";
      sql += "GROUP BY MAINSTYCD";

      this.req2svr.getData(sql).then(
        res => {
          this.MAINSTYCD = ""
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.MAINSTYCD = res.MAINSTYCD
            this.editData.MAINSTYCD = res.MAINSTYCD
          }
          this.getKindOfStyle(this.MAINSTYCD)
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getKindOfStyle: function(MAINSTYCD) {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 스타일 리오더 종류
      let sql = "SELECT MAINSTYCD, STYCD, TO_NUMBER(RESEQ) RESEQ FROM " + table;
      sql += "WHERE STYCD = '" + MAINSTYCD + "' ";
      sql += "GROUP BY MAINSTYCD, STYCD, RESEQ ";
      sql += "UNION ALL ";
      sql += "SELECT MAINSTYCD, STYCD, TO_NUMBER(RESEQ) RESEQ FROM " + table;
      sql += "WHERE MAINSTYCD = '" + MAINSTYCD + "' ";
      sql += "AND RESEQ > '0' ";
      sql += "GROUP BY MAINSTYCD, STYCD, RESEQ ";
      sql += "ORDER BY RESEQ";

      this.req2svr.getData(sql).then(
        res => {
          this.KINDOFSTYLE = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.KINDOFSTYLE.push(res)
            } else {
              this.KINDOFSTYLE = JSON.parse("[" + res + "]")
            }
          }

          // 최초 한번만 메인에서 물고 들어온 스타일 코드 디폴드 선택
          this.selectStyle = this.STYCD

          // 스타일별 사업부 조회
          this.getStyleSucd()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyleSucd: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 스타일별 사업부 조회
      let sql = "SELECT TO_NUMBER(SUCD) SUCD FROM " + table;
      sql += "WHERE STYCD = '" + this.STYCD + "' ";
      sql += "GROUP BY SUCD ";
      sql += "ORDER BY SUCD";

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
          }

          // 사업부 코드 리셋
          this.selectSucd = 0
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    getClothData: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 의상 상세 정보
      let sql = "SELECT TO_NUMBER(SUCD) SUCD, COMCD, DIMAGEPATH, STYCD, YSCD, EMPNAME, SOJAENM, SOJAENMOG ,PRDTGU, CUSTNM, TAGPRI, OUTDT, RESEQ, ";
      sql += "CASE WHEN MRGU IS NULL THEN '' ELSE MRGU END AS MRGU, ";
      sql += "MIN(SALEPRI) MIN_SALEPRI, MAX(SALEPRI) MAX_SALEPRI FROM " + table;
      if(this.selectStyle == 0){
        sql += "WHERE STYCD = '" + this.KINDOFSTYLE[0].STYCD + "' ";  
      } else {
        sql += "WHERE STYCD = '" + this.STYCD + "' ";  
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      
      sql += "GROUP BY SUCD, COMCD, DIMAGEPATH, STYCD, YSCD, EMPNAME, SOJAENM, SOJAENMOG, PRDTGU, CUSTNM, TAGPRI, OUTDT, RESEQ, MRGU ";
      sql += "ORDER BY SUCD";

      this.req2svr.getData(sql).then(
        res => {
          this.CLOTH = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.CLOTH = res
            } else {
              this.CLOTH = (JSON.parse("[" + res + "]"))[0]
            }
          }

          if (this.CLOTH.MRGU == 'R' || this.CLOTH.MRGU == 'M') {
            // 메인 스타일
            this.getMainStyle()
          } else {
            this.getKindOfStyle(this.STYCD)
          }

          if(this.selectStyle == 0){
            this.getKindOfStyle(this.KINDOFSTYLE[0].STYCD)
          }

          this.editData.MRGU = this.CLOTH.MRGU
          this.editData.RESEQ = this.CLOTH.RESEQ
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getAccClothSaleData: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";
      
      let c_sql = "";
      if(this.selectChina == 1){  //해외매장 제외
        c_sql += "AND NVL(SHTP,'-1') <> '10' ";
      }else if(this.selectChina == 2){  //해외매장
        c_sql += "AND NVL(SHTP,'-1') = '10' ";
      }

      let sql = "";

      // 누적판매실적
      if(this.selectStyle == 0) {
        sql += "SELECT ";
        sql += "CASE WHEN B.INQTY = 0 THEN 0 ELSE ROUND(B.SQTY/B.INQTY * 100,1) END ACC_QTY_RATE, ";
        sql += "CASE WHEN B.STAGPRI = 0 THEN 0 ELSE ROUND(B.SILAMT/B.STAGPRI * 100,1) END ACC_AMT_RATE, ";
        sql += "SILAMT FROM ";
        sql += "(SELECT SUM(SQTY) SQTY , SUM(SILAMT) SILAMT, SUM(INQTY) INQTY, SUM(STAGPRI) STAGPRI FROM BISY021 ";
        sql += "WHERE STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
        // sql += c_sql  //해외매장 조건
        sql += ") B";
      } else {
        sql += "SELECT CASE WHEN B.INQTY = 0 THEN 0 ELSE ROUND(A.SQTY/B.INQTY * 100,1) END ACC_QTY_RATE, ";
        sql += "CASE WHEN B.STAGPRI = 0 THEN 0 ELSE ROUND(A.SILAMT/B.STAGPRI * 100,1) END ACC_AMT_RATE, SILAMT FROM ";
        sql += "(SELECT STYCD, SUM(SQTY) SQTY , SUM(SILAMT) SILAMT FROM " + table;
        sql += "WHERE STYCD = '" + this.STYCD + "' ";
        if(this.selectSucd == 0){
        } else {
          sql += "AND SUCD = '" + this.selectSucd + "' ";
        }
        sql += c_sql  //해외매장 조건
        sql += "GROUP BY STYCD) A, ";
        sql += "(SELECT STYCD, SUM(INQTY) INQTY, SUM(STAGPRI) STAGPRI FROM " + table;
        sql += "WHERE STYCD = '" + this.STYCD + "' ";
        if(this.selectSucd == 0){
        } else {
          sql += "AND SUCD = '" + this.selectSucd + "' ";
        }
        sql += "GROUP BY STYCD) B ";
        sql += "WHERE A.STYCD = B.STYCD ";
      }

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            this.ACC_SALE_DATA = {ACC_QTY_RATE: 0, ACC_AMT_RATE: 0, SILAMT: 0};
          } else {
            this.ACC_SALE_DATA = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getInOutQty: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";
      
      // 기판실적 입고,출고
      let sql = "SELECT SUM(INQTY) INQTY, SUM(OUTQTY) OUTQTY FROM " + table;
      if(this.selectStyle == 0){
        sql += "WHERE STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.INOUTQTY = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    getClothJRData: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";
      
      // 기판실적 금액, 수량
      let sql ="SELECT SUM(SQTY) SQTY, SUM(SILAMT) SILAMT, SUM(JSQTY) JSQTY, SUM(JSAMT) JSAMT, SUM(DCSQTY) DCSQTY, SUM(DCSAMT) DCSAMT, SUM(GSQTY) GSQTY ,SUM(GSAMT) GSAMT, ";
      sql += "SUM(JRQTY) JRQTY, SUM(JRAMT) JRAMT, SUM(DCRQTY) DCRQTY, SUM(DCRAMT) DCRAMT, SUM(GRQTY) GRQTY ,SUM(GRAMT) GRAMT FROM " + table;
      if(this.selectStyle == 0){
        sql += "WHERE STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      if(this.selectChina == 0){
      } else if(this.selectChina == 1){
        sql += "AND NVL(SHTP,'-1') <> '10' ";
      }else{
        sql += "AND NVL(SHTP,'-1') = '10' ";
      }
      sql += "AND INOUTDT BETWEEN '" + this.saleStartDate + "' AND '" + this.saleEndDate + "'";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.SQTY = Number(res.SQTY) // 매출수량
              this.dr_S.SILAMT = Number(res.SILAMT) // 매출금액
              this.dr_S.JSQTY = Number(res.JSQTY) // 정상수량
              this.dr_S.DCSQTY = Number(res.DCSQTY) // 할인수량
              this.dr_S.GSQTY = Number(res.GSQTY) // 균일수량
              this.dr_S.JRQTY = Number(res.JRQTY) // 정상반품수량
              this.dr_S.DCRQTY = Number(res.DCRQTY) // 할인반품수량
              this.dr_S.GRQTY = Number(res.GRQTY) // 균일반품수량
              this.dr_S.JSAMT = Number(res.JSAMT) // 정상금액
              this.dr_S.DCSAMT = Number(res.DCSAMT) // 할인금액
              this.dr_S.GSAMT = Number(res.GSAMT) // 균일금액
              this.dr_S.JRAMT = Number(res.JRAMT) // 정상반품금액
              this.dr_S.DCRAMT = Number(res.DCRAMT) // 할인반품금액
              this.dr_S.GRAMT = Number(res.GRAMT) // 균일반품금액
            }
            this.makeChart1()
            this.makeChart2()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getAccClothSaleRate: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";
      
      let c_sql = "";
      if(this.selectChina == 1){  //해외매장 제외
        c_sql += "AND NVL(SHTP,'-1') <> '10' ";
      }else if(this.selectChina == 2){  //해외매장
        c_sql += "AND NVL(SHTP,'-1') = '10' ";
      }

      // 누적판매율 추이
      let sql = "SELECT INOUTDT ";
      sql += ", CASE WHEN INQTY = 0 THEN 0 ELSE ROUND((SQTY/INQTY)*100,1) END AS ACC_QTY_RATE ";
      sql += ", CASE WHEN INAMT = 0 THEN 0 ELSE ROUND((SAMT/INAMT)*100,1) END AS ACC_AMT_RATE ";
      sql += "FROM ";
      sql += "( ";
      sql += "SELECT A.INOUTDT ";
      sql += ",SUM(B.SQTY) AS SQTY ";
      sql += ",MIN(C.INQTY) AS INQTY ";
      sql += ",SUM(B.SAMT) AS SAMT ";
      sql += ",MIN(C.INAMT) AS INAMT ";
      sql += "FROM ";
      sql += "( ";
      sql += "SELECT A.STYCD ";
      sql += ", A.INOUTDT ";
      sql += "FROM " + table + " A ";
      if(this.selectStyle == 0){
        sql += "WHERE A.STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE A.STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += c_sql  //해외매장 조건
      sql += "AND A.SQTY <> 0 ";
      sql += "AND A.SILAMT <> 0 ";
      sql += "GROUP BY A.STYCD, A.INOUTDT ";
      sql += ") A ";
      sql += ",( ";
      sql += "SELECT A.STYCD ";
      sql += ", A.INOUTDT ";
      sql += ", SUM(A.SQTY) AS SQTY ";
      sql += ", SUM(A.SILAMT) AS SAMT ";
      sql += "FROM " + table + " A ";
      if(this.selectStyle == 0){
        sql += "WHERE A.STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE A.STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += c_sql  //해외매장 조건
      sql += "GROUP BY A.STYCD, A.INOUTDT ";
      sql += ") B ";
      sql += ",( ";
      sql += "SELECT A.STYCD ";
      sql += ", SUM(A.INQTY) AS INQTY ";
      sql += ", SUM(A.STAGPRI) AS INAMT ";
      sql += "FROM " + table + " A ";
      if(this.selectStyle == 0){
        sql += "WHERE A.STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE A.STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += "GROUP BY A.STYCD ";
      sql += ") C ";
      sql += "WHERE A.INOUTDT >= B.INOUTDT ";
      sql += "AND   A.STYCD = B.STYCD ";
      sql += "AND   B.STYCD = C.STYCD ";
      sql += "GROUP BY A.INOUTDT ";
      sql += ") ";
      sql += "ORDER BY INOUTDT ";

      /*
      let sql = "";
      sql += "SELECT A.INOUTDT ";
      sql += ",CASE WHEN MIN(C.INQTY) = 0 THEN 0 ";
      sql += "ELSE ROUND(SUM(B.SQTY)/MIN(C.INQTY) * 100,1) ";
      sql += "END AS ACC_QTY_RATE ";
      sql += ",CASE WHEN MIN(C.STAGPRI) = 0 THEN 0 ";
      sql += "ELSE ROUND(SUM(B.SILAMT)/MIN(C.STAGPRI) * 100,1) ";
      sql += "END AS ACC_AMT_RATE ";
      sql += "FROM ";
      sql += "( ";
      sql += "SELECT A.STYCD, A.INOUTDT FROM " + table + " A ";
      if(this.selectStyle == 0){
        sql += "WHERE A.STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE A.STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += "AND A.SQTY <> 0 ";
      sql += "AND A.SILAMT <> 0 ";
      sql += "GROUP BY A.STYCD, A.INOUTDT ";
      sql += ") A ";
      sql += ",( ";
      sql += "SELECT A.STYCD, A.INOUTDT ";
      sql += ", SUM(A.SQTY) AS SQTY ";
      sql += ", SUM(A.SILAMT) AS SILAMT ";
      sql += "FROM " + table + " A ";
      if(this.selectStyle == 0){
        sql += "WHERE A.STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE A.STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += "GROUP BY A.STYCD, A.INOUTDT ";
      sql += ") B ";
      sql += ",( ";
      sql += "SELECT A.STYCD ";
      sql += ", SUM(A.INQTY) AS INQTY ";
      sql += ", SUM(A.STAGPRI) AS STAGPRI ";
      sql += "FROM " + table + " A ";
      if(this.selectStyle == 0){
        sql += "WHERE A.STYCD IN (";
        for (var i=0;i<this.KINDOFSTYLE.length;i++) {
          sql += "'" + this.KINDOFSTYLE[i].STYCD + "'"
          if (i < this.KINDOFSTYLE.length - 1) {
            sql += ","
          }
        }
        sql += ") ";
      } else {
        sql += "WHERE A.STYCD = '" + this.STYCD + "' ";
      }
      if(this.selectSucd == 0){
      } else {
        sql += "AND SUCD = '" + this.selectSucd + "' ";
      }
      sql += "GROUP BY A.STYCD ";
      sql += ") C ";
      sql += "WHERE A.INOUTDT >= B.INOUTDT ";
      sql += "AND   A.STYCD = B.STYCD ";
      sql += "AND   B.STYCD = C.STYCD ";
      sql += "GROUP BY A.INOUTDT ";
      sql += "ORDER BY A.INOUTDT ";
      */
      
      this.req2svr.getData(sql).then(
        res => {
          this.ACC_SALE_RATE = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.ACC_SALE_RATE.push(res);
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.ACC_SALE_RATE.push(
                  {
                    ACC_QTY_RATE: list[i].ACC_QTY_RATE,
                    ACC_AMT_RATE: list[i].ACC_AMT_RATE,
                    INOUTDT: moment(list[i].INOUTDT).format("M/D"),
                  }
                )
              }
            }
          }
          this.makeChart3();
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDesignerData: function() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 디자이너 정보
      let sql ="SELECT DISTINCT STYCD, DESIGNER, EMPNAME, PHOTOPATH FROM " + table;
      sql += "WHERE STYCD = '" + this.STYCD + "' ";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DESIGNER = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.DESIGNER.push(res);
            } else {
              this.DESIGNER = JSON.parse("[" + res + "]");
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
        { category: "판매", 
          JQTY_T: "정상", JQTY: this.dr_S.JSQTY, 
          DCQTY_T: "할인", DCQTY: this.dr_S.DCSQTY, 
          GQTY_T: "균일", GQTY: this.dr_S.GSQTY
        },
        { category: "반품", 
          JQTY_T: "정상", JQTY: Math.abs(this.dr_S.JRQTY),
          DCQTY_T: "할인", DCQTY: Math.abs(this.dr_S.DCRQTY),
          GQTY_T: "균일", GQTY: Math.abs(this.dr_S.GRQTY)
        },
      ];

      AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
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
        { category: "판매", 
          JAMT_T: "정상", JAMT: Math.round(this.dr_S.JSAMT/1000),
          DCAMT_T: "할인", DCAMT: Math.round(this.dr_S.DCSAMT/1000),
          GAMT_T: "균일", GAMT: Math.round(this.dr_S.GSAMT/1000)
        },
        { category: "반품", 
          JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_S.JRAMT/1000)),
          DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_S.DCRAMT/1000)),
          GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_S.GRAMT/1000))
        },
      ];

      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
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
    makeChart3() {
      let data = this.ACC_SALE_RATE

      AmCharts.makeChart("chartdiv3", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "INOUTDT",
        colors: ["#bd7adf", "#bababa", "#3f93f5"],
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
            balloonText: "수량기준 누적판매율(%) : [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 0.99,
            title: "수량기준 누적판매율(%)",
            valueField: "ACC_QTY_RATE",
            markerType: "circle"
          },
          {
            balloonText: "금액기준 누적판매율(%) : [[value]]",
            fillAlphas: 0,
            fontSize: 0,
            id: "AmGraph-2",
            title: "금액기준 누적판매율(%)",
            valueField: "ACC_AMT_RATE",
            markerType: "circle"
          }
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
          fontSize: 18,
          position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    toBack() {
      this.$router.replace({
        name: 'STY0001',
        params: {
          data: 
          { 
            STYCD: this.data.STYCD,
            saleStartDate: this.data.saleStartDate,
            saleEndDate: this.data.saleEndDate,
            filterData: this.data.filterData,
            selectFilter: this.data.selectFilter,
            selectionFilters: this.data.selectionFilters,
            selectChina: this.data.selectChina,
          }
        }
      })
    },
    toDetail() {
      this.showDetail = true
    },
    toDesignDetail(data) {
      this.showDesignDetail = true
      this.designerPopupData = data
    },
    hideDetailPopup() {
      this.showDetail = false
    },
    hideDesignDetailPopup() {
      this.showDesignDetail = false
    },
    toMain() {
      this.$router.replace("/")
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
    imageExist(url) {
      var img = new Image();
      img.src = url;
      return img.height != 0;
    }
  }
}
</script>