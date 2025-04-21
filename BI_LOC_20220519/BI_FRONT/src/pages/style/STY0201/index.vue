<template>
  <!-- 팝업용 레이아웃 클래스 : popup_layout -->
  <div class="wrap popup_layout">
    <!-- popup close button -->
    <div class="btn_pop_close" role="button" @click="toBack"><i class="material-icons">close</i></div>
      <div class="container cont_info">
        <div class="content">
        <div class="row">
          <div class="col_md_3 info_view">
            <div class="box">
              <div class="inner">
                <div v-show="gubun == 'list'" class="num_box">
                  <strong>{{ rank }}</strong>
                  <small>누적판매액<br />랭킹</small>
                </div>
                <div class="img_photo w">
                  <img v-if="imageExist(designerPopupData.PHOTOPATH)" :src="designerPopupData.PHOTOPATH" :alt="designerPopupData.STYCD" />
                </div>
                <div class="box_info">
                  <p class="txt">{{designerPopupData.EMPNAME}}</p>
                </div>
              </div>
            </div>

            <div class="box">
              <div class="inner">
                <div class="graph_list">
                  <ul class="list">
                    <li v-for="data in RECNENT_YEAR_RATE" :key="data.INOUTDT">
                      <em class="txt_month">{{ data.OUTYEAR }}</em>
                      <span class="graph_cont">
                        <span class="view">
                          <span class="title">누적판매율(금액)</span>
                          <span class="cont">{{ Number(data.금액기준).toFixed(1) }}%</span>
                        </span>
                        <strong class="graph line_bar">
                          <span class="bar" :style="{width: Number(data.금액기준) +'%'}"></span>
                        </strong>
                      </span>
                    </li>
                  </ul>                  
                </div>
              </div>
            </div>

            <div class="info_list list_sty01">
              <ul class="list">
                <li>
                  <strong class="title">사업부</strong>
                  <span class="cont">{{ DESIGNER_INFO.디자이너사업부 }}</span>
                </li>
                <li>
                  <strong class="title">입사일</strong>
                  <span class="cont">{{ ENTERDATE }}</span>
                </li>
                <li>
                  <strong class="title">연락처</strong>
                  <span class="cont">{{ DESIGNER_INFO.연락처 }}</span>
                </li>
                <li>
                  <strong class="title">이메일</strong>
                  <span class="cont">{{ DESIGNER_INFO.이메일 }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col_md_9">
            <div class="inner">
              <div class="slide_img_wrap">
                <div class="slide_btns">
                  <a class="btn_slide btn_prev teamSelector" @click="slide_prev"><i class="material-icons">arrow_back_ios</i></a>
                  <a class="btn_slide btn_next teamSelector" @click="slide_next"><i class="material-icons">arrow_forward_ios</i></a>
                </div>
                <div class="slide_view">
                  <ul ref="slideArea" style="position:relative;" :style="{left: slidePosition+'px'}">
                    <li class="all_num" @click="clothRate(null, null, 0)">최근1년<br />스타일 전체<br />({{ YEAR_CLOTH.length }})</li>
                    <li 
                      v-for="(data, index) in YEAR_CLOTH"
                      :key="data.STYCD"
                      :class="{on: clickedImg == data.STYCD}"
                      @click="clothRate('clothRate', data.STYCD, index+1)"
                      style="background: #fff; align-items: center;"
                    >
                      <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCD" />
                      <img v-else src="@/assets/images/bg_clothes.png" style="max-width: 30%; height: auto;" />
                      <span class="txt_name">{{ data.STYCD }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="cont_head" style="margin-bottom:10px;">
                <div v-if="clickedImg" class="tit">{{ clickedImg }}</div>
                <div v-else class="tit">스타일 전체</div>
                <div class="txt_s" style="margin-left: 8px; height: 100%;">
                  <span v-if="clothSUCDList.length > 0 && clothSUCDList[0].MRGU == 'R'" style="height: 24px;" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ clothSUCDList[0].RESEQ }}</span></span>
                  <span v-if="clothSUCDList.length > 0 && clothSUCDList[0].MRGU == 'M'" style="height: 24px;" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
                </div>
                <div class="layout_spacer"></div>
                <!-- select -->
                <div v-if="clothSUCDList.length > 0" class="select_box" style="width:150px;">
                  <select class="select" v-model="selectSUCD" @change="changeSUCD">
                    <option value="0">사업부 전체</option>
                    <option
                      v-for="data in clothSUCDList"
                      :key="data.SUCD"
                      :value="data.SUCD"
                    >{{ getSUCDCODNM(data.SUCD) }} 사업부</option>
                  </select>
                </div>
              </div>
              <div class="row row_box">
                <div class="col_md_6">
                  <!-- box1 -->
                  <div class="cont_box">
                    <div class="tit">
                      <strong class="tit_txt">누적 판매실적</strong>
                      <div class="layout_spacer"></div>
                      <span class="txt">(물류입고 : {{ ACC_SALE_DATA.INAMT | currency }}개 | 물류출고 : {{ ACC_SALE_DATA.OUTQTY | currency }}개)</span>
                    </div>
                    <div class="cont">
                      <div class="row">
                        <div class="col_md_7">
                          <div class="graph_cont">
                            <span class="view">
                              <span class="tit">수량기준<small>(누적판매율)</small></span>
                              <span class="txt_num">{{ Number(ACC_SALE_DATA.수량기준).toFixed(1) | nanToDot }}<small>%</small></span>
                            </span>
                            <strong class="graph line_bar">
                              <span class="bar" :style="{width: Number(ACC_SALE_DATA.수량기준) +'%'}"></span>
                            </strong>
                          </div>
                          <div class="graph_cont">
                            <span class="view">
                              <span class="tit">금액기준<small>(누적판매율)</small></span>
                              <span class="txt_num">{{ Number(ACC_SALE_DATA.금액기준).toFixed(1) | nanToDot }}<small>%</small></span>
                            </span>
                            <strong class="graph line_bar">
                              <span class="bar" :style="{width: Number(ACC_SALE_DATA.금액기준) +'%'}"></span>
                            </strong>
                          </div>
                        </div>
                        <div class="col_md_5">
                          <div class="result_view">
                            <dl>
                              <dt class="tit">누적판매금액</dt>
                              <dd class="txt_result">{{ Math.round(ACC_SALE_DATA.SAMT/1000000) | currency }}<small class="txt">백만원</small></dd>
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
                      <strong class="tit_txt">당월 판매실적</strong>
                    </div>
                    <div class="cont">
                    <div class="graph_area">
                      <!-- 그래프 1 -->
                      <div class="graph_view" style="width:50%;">
                        <!-- 텍스트 값 -->
                        <div class="graph_result gr_s">
                          <dl>
                            <dt class="tit">수량</dt>
                            <dd class="txt_result txt_s">{{ dr_S.TOT_QTY | currency }}<small>개</small></dd>
                          </dl>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph">
                          <div style="position:relative; width:100%; height:105px; float:left;">
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
                            <dd class="txt_result txt_s">{{ Math.round(dr_S.TOT_AMT/1000) | currency }}<small>천원</small></dd>
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
                          <div style="position:relative; width:100%; height:105px; float:left;">
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
              <div class="cont_box min_h400">
                <div class="tit">
                  <strong class="tit_txt">누적판매율 추이</strong>
                  <div class="layout_spacer"></div>
                </div>
                <div class="cont" style="height:300px;">
                <div class="graph_area">
                  <div class="graph_view">
                    <div class="graph" style="position:relative; width:100%; height:260px;">
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
    </div>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"

export default {
  name: "STY0201",
  props: {
    designerPopupData: {
      type: Object,
      default: null
    },
    rank: {
      type: Number,
      default: null
    },
    gubun: {
      type: String,
      default: null
    },
    CODE: {
      type: String,
      default: null
    },
    ReOrder: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.loadData()

    // this.makeChart1()
    // this.makeChart2()
    // this.makeChart3()

    this.onResize()
    // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  data() {
    return {
      clickedImg: "",
      date: null,      
      year: "",
      month: "",
      YEAR_ACC_SALE_RATE: [],
      DESIGNER_INFO: {},
      ACC_SALE_DATA: {},
      ACC_SALE_RATE: [],
      YEAR_CLOTH: [],
      // 기판실적
      dr_S: {
        JSQTY: 0, DCSQTY: 0, GSQTY: 0, JSAMT: 0, DCSAMT: 0, GSAMT: 0,
        JRQTY: 0, DCRQTY: 0, GRQTY: 0, JRAMT: 0, DCRAMT: 0, GRAMT: 0,
        SQTY: 0, INQTY: 0, OUTQTY: 0
      },
      slideCount: 14,
      slidePosition: 0,
      slideWidth: 0,
      selectSUCD: null,
      clothSUCDList: []
    }
  },
  computed: {
    req2svr: () => req2svr,
    RECNENT_YEAR_RATE(){
      return this.YEAR_ACC_SALE_RATE.slice(0, 2)
    },
    THISYEAR(){
      return moment().format("YYYY")
    },
    ENTERDATE(){
      return  moment(this.DESIGNER_INFO.입사일).format("YYYY-MM-DD")
    }
  },
  methods: {
    toBack() {
      this.$emit("close")
    },
    loadData() {
      // 디자이너 최근2년간 누적판매율 정보
      this.getYearSaleRateData()
      // 디자이너 개인 정보
      this.getDesignerInfo()
      // 누적판매 실적
      this.getAccClothSaleData()
      // 당월판매실적
      this.getClothJRData()
      // 누적 판매율 추이
      this.getAccClothSaleRate()
      // 디자이너의 해당연도 의류
      this.madebyDesigner()
    },
    getYearSaleRateData: function() {
      this.YEAR_ACC_SALE_RATE
      // 디자이너 최근2년간 누적판매율 정보
      let sql = "SELECT A.OUTYEAR "
      sql += "      ,CASE WHEN SUM(B.'입고수량') = 0 THEN 0 ELSE ROUND(SUM(A.'매출수량')/SUM(B.'입고수량') * 100,1) END AS '수량기준' "
      sql += "      ,CASE WHEN SUM(B.'입고금액') = 0 THEN 0 ELSE ROUND(SUM(A.'매출금액')/SUM(B.'입고금액') * 100,1) END AS '금액기준' "
      sql += "FROM (      "
      sql += "    SELECT DESIGNER "
      sql += "        , SUBSTR(OUTDT,1,4) AS OUTYEAR "
      sql += "        , SUM(SQTY) AS '매출수량' "
      sql += "        , SUM(SILAMT) AS '매출금액' "
      sql += "    FROM BISY021 "
      sql += "    WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      sql += "    GROUP BY DESIGNER, SUBSTR(OUTDT,1,4) "
      sql += "    ) A "
      sql += "    ,( "
      sql += "    SELECT DESIGNER "
      sql += "        , SUBSTR(OUTDT,1,4) AS OUTYEAR "
      sql += "        , SUM(INQTY) AS '입고수량' "
      sql += "        , SUM(STAGPRI) AS '입고금액' "
      sql += "    FROM BISY021 "
      sql += "    WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      sql += "    GROUP BY DESIGNER, SUBSTR(OUTDT,1,4) "
      sql += "    ) B "
      sql += "WHERE A.DESIGNER = B.DESIGNER "
      sql += "AND A.OUTYEAR = B.OUTYEAR "
      sql += "GROUP BY A.OUTYEAR, A.'매출수량', A.'매출금액' "
      sql += "ORDER BY A.OUTYEAR DESC "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.YEAR_ACC_SALE_RATE = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.YEAR_ACC_SALE_RATE.push(res);
            } else {
              this.YEAR_ACC_SALE_RATE = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getDesignerInfo: function() {
      this.DESIGNER_INFO = []
      // 디자이너 개인 정보
      let sql = "SELECT DISTINCT "
      sql += "      SDCDNM AS '디자이너사업부' "
      sql += "      ,TO_CHAR(TO_DATE(ENTERDATE,'YYYYMMDD'),'YYYY-MM-DD') AS '입사일' "
      sql += "      ,TEL AS '연락처' "
      sql += "      ,EMAIL AS '이메일' "
      sql += "FROM   BISY021 "
      sql += "WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DESIGNER_INFO = []
            this.DESIGNER_INFO = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getAccClothSaleData: function(gubun, STYCD) {
      this.ACC_SALE_DATA = []
      // 누적판매실적
      let sql = "SELECT CASE WHEN B.'입고수량' = 0 THEN 0 ELSE ROUND(A.'판매수량'/B.'입고수량' * 100,1) END AS '수량기준' "
      sql += "      , CASE WHEN B.'입고금액' = 0 THEN 0 ELSE ROUND(A.'판매금액'/B.'입고금액' * 100,1) END AS '금액기준' "
      sql += "      , A.'판매금액' AS SAMT "
      sql += "    ,B.'입고수량' AS INAMT "
      sql += "    ,B.'출고수량' AS OUTQTY "
          /*
          ,A."판매수량" AS SQTY
          ,B."입고수량" AS INAMT
          ,B."출고수량" AS OUTQTY
          */
      sql += "FROM ( "
      sql += "    SELECT DESIGNER "
      if (gubun == "clothRate") {
        sql += "        ,STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "          ,SUM(SQTY) AS '판매수량' "
      sql += "          ,SUM(SILAMT) AS '판매금액' "
      sql += "    FROM BISY021 "
      sql += "    WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      // sql += "    AND    OUTDT > SUBSTR(TO_CHAR(TO_NUMBER(TO_CHAR(SYSDATE ,'YYYY'))-1),1,4) ||TO_CHAR(SYSDATE ,'MM') ||TO_CHAR(SYSDATE ,'DD') " /* 최근 1년 */
      sql += "    AND    OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */
      if (gubun == "clothRate") {
        sql += "    AND    STYCD = '" + STYCD + "' " /* 스타일 선택 시 추가 */
      }
      if (this.selectSUCD > 0) {
        sql += "      AND SUCD = '" + this.selectSUCD + "' " /*사업부 선택시 추가*/
      }
      sql += "    GROUP BY DESIGNER "
      if (gubun == "clothRate") {
        sql += "      , STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "    ) A "
      sql += "    ,( "
      sql += "    SELECT DESIGNER "
      if (gubun == "clothRate") {
        sql += "        ,STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "          ,SUM(INQTY) AS '입고수량' "
      sql += "          ,SUM(STAGPRI) AS '입고금액' "
      sql += "          ,SUM(OUTQTY) AS '출고수량' "
      sql += "    FROM BISY021 "
      sql += "    WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      // sql += "    AND    OUTDT > SUBSTR(TO_CHAR(TO_NUMBER(TO_CHAR(SYSDATE ,'YYYY'))-1),1,4) ||TO_CHAR(SYSDATE ,'MM') ||TO_CHAR(SYSDATE ,'DD') " /* 최근 1년 */
      sql += "    AND    OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */
      if (gubun == "clothRate") {
        sql += "    AND    STYCD = '" + STYCD + "' " /* 스타일 선택 시 추가 */
      }
      if (this.selectSUCD > 0) {
        sql += "      AND SUCD = '" + this.selectSUCD + "' " /*사업부 선택시 추가*/
      }
      sql += "    GROUP BY DESIGNER "
      if(gubun == "clothRate") {
        sql += "      , STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "    ) B "
      sql += "WHERE A.DESIGNER = B.DESIGNER "
      if(gubun == "clothRate") {
        sql += "  AND A.STYCD = B.STYCD " /* 스타일 선택 시 추가 */
      }

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.ACC_SALE_DATA = []
            this.ACC_SALE_DATA = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getClothJRData: function(gubun, STYCD) {
      // 당월판매실적
      let sql ="SELECT SUM(SQTY) AS '매출수량' "
      sql += "      ,SUM(SILAMT) AS '매출금액' "
      sql += "      ,SUM(JSQTY) AS '정상수량' "
      sql += "      ,SUM(JSAMT) AS '정상금액' "
      sql += "      ,SUM(DCSQTY) AS '할인수량' "
      sql += "      ,SUM(DCSAMT) AS '할인금액' "
      sql += "      ,SUM(GSQTY) AS '균일수량' "
      sql += "      ,SUM(GSAMT) AS '균일금액' "
      sql += "      ,SUM(JRQTY) AS '정상반품수량' "
      sql += "      ,SUM(JRAMT) AS '정상반품금액' "
      sql += "      ,SUM(DCRQTY) AS '할인반품수량' "
      sql += "      ,SUM(DCRAMT) AS '할인반품금액' "
      sql += "      ,SUM(GRQTY) AS '균일반품수량' "
      sql += "      ,SUM(GRAMT) AS '균일반품금액' "
      sql += "FROM BISY021 "
      sql += "WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      // sql += "AND    OUTDT > SUBSTR(TO_CHAR(TO_NUMBER(TO_CHAR(SYSDATE ,'YYYY'))-1),1,4) ||TO_CHAR(SYSDATE ,'MM') ||TO_CHAR(SYSDATE ,'DD') " /* 최근 1년 */
      sql += "    AND    OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */
      if(gubun == "clothRate") {
        sql += "AND    STYCD = '" + STYCD + "' "/* 스타일 */
      }
      if (this.selectSUCD > 0) {
        sql += "  AND SUCD = '" + this.selectSUCD + "' " /*사업부 선택시 추가*/
      }
      sql += "AND    SUBSTR(INOUTDT,1,6) = TO_CHAR(SYSDATE,'YYYYMM') "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.TOT_QTY = Number(res.매출수량)
              this.dr_S.TOT_AMT = Number(res.매출금액)
              this.dr_S.JSQTY = Number(res.정상수량)
              this.dr_S.JSAMT = Number(res.정상금액)
              this.dr_S.DCSQTY = Number(res.할인수량)
              this.dr_S.DCSAMT = Number(res.할인금액)
              this.dr_S.GSQTY = Number(res.균일수량)
              this.dr_S.GSAMT = Number(res.균일금액)
              this.dr_S.JRQTY = Number(res.정상반품수량) 
              this.dr_S.JRAMT = Number(res.정상반품금액)
              this.dr_S.DCRQTY = Number(res.할인반품수량) 
              this.dr_S.DCRAMT = Number(res.할인반품금액)
              this.dr_S.GRQTY = Number(res.균일반품수량) 
              this.dr_S.GRAMT = Number(res.균일반품금액)
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
    getAccClothSaleRate: function(gubun, STYCD) {
      let sql = "SELECT A.INOUTDT "
      sql += "      ,CASE WHEN MIN(C.'입고') = 0 THEN 0  "
      sql += "      ELSE ROUND(SUM(B.'일별판매수량')/MIN(C.'입고') * 100,1) "
      sql += "      END AS '수량기준판매율' "
      sql += "      ,CASE WHEN MIN(C.'입고금액') = 0 THEN 0 "
      sql += "      ELSE ROUND(SUM(B.'일별판매금액')/MIN(C.'입고금액') * 100,1) "
      sql += "      END AS '금액기준판매율' "
      sql += "FROM "
      sql += "( "
      sql += "    SELECT A.DESIGNER "
      if (gubun == "clothRate") {
        sql += "      , A.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "        , A.INOUTDT "
      sql += "    FROM BISY021 A "
      sql += "    WHERE  A.DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      if (gubun == "clothRate") {
        sql += "    AND    A.STYCD = '" + STYCD + "' " /* 스타일 선택 시 추가 */
      }
      if (this.selectSUCD > 0) {
        sql += "      AND SUCD = '" + this.selectSUCD + "' " /*사업부 선택시 추가*/
      }
      sql += "      AND A.SQTY <> 0 "
      sql += "      AND A.SILAMT <> 0 "
      sql += "    AND    A.OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */
      sql += "    GROUP BY A.DESIGNER, A.INOUTDT "
      if (gubun == "clothRate") {
        sql += "      , A.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += ") A "   
      sql += ",( "
      sql += "    SELECT A.DESIGNER "
      if (gubun == "clothRate") {
        sql += "      , A.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "        , A.INOUTDT "
      sql += "        , SUM(A.SQTY) AS '일별판매수량' "
      sql += "        , SUM(A.SILAMT) AS '일별판매금액' "
      sql += "    FROM BISY021 A "
      sql += "    WHERE  A.DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      if (gubun == "clothRate") {
        sql += "    AND    A.STYCD = '" + STYCD + "' " /* 스타일 선택 시 추가 */
      }
      if (this.selectSUCD > 0) {
        sql += "      AND SUCD = '" + this.selectSUCD + "' " /*사업부 선택시 추가*/
      }
      sql += "    AND    A.OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */
      sql += "    GROUP BY A.DESIGNER, A.INOUTDT "
      if (gubun == "clothRate") {
        sql += "      , A.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += ") B "
      sql += ",( "
      sql += "    SELECT A.DESIGNER "
      if (gubun == "clothRate") {
        sql += "      , A.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "        , SUM(A.INQTY) AS '입고' "
      sql += "        , SUM(A.STAGPRI) AS '입고금액' "
      sql += "    FROM BISY021 A "
      sql += "    WHERE  A.DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      if (gubun == "clothRate") {
        sql += "    AND    A.STYCD = '" + STYCD + "' " /* 스타일 선택 시 추가 */
      }
      sql += "    AND    A.OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */
      if (this.selectSUCD > 0) {
        sql += "      AND SUCD = '" + this.selectSUCD + "' " /*사업부 선택시 추가*/
      }
      sql += "    GROUP BY A.DESIGNER "
      if (gubun == "clothRate") {
        sql += "      , A.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += ") C "
      sql += "WHERE A.INOUTDT >= B.INOUTDT "
      sql += "AND   A.DESIGNER = B.DESIGNER "
      sql += "AND   B.DESIGNER = C.DESIGNER "
      if (gubun == "clothRate") {
        sql += "AND   A.STYCD = B.STYCD " /* 스타일 선택 시 추가 */
        sql += "AND   B.STYCD = C.STYCD " /* 스타일 선택 시 추가 */
      }
      sql += "GROUP BY A.INOUTDT "
      sql += "ORDER BY A.INOUTDT "

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
                    ACC_QTY_RATE: list[i].수량기준판매율,
                    ACC_AMT_RATE: list[i].금액기준판매율,
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
    madebyDesigner: function() {
      let currentYear = moment().format("YYYY")
      let yearCode = this.$store.getters.getYearCode(Number(currentYear))

      let today = moment().format("YYYYMMDD")
      let lastYearToday = moment(today).subtract(1, 'year').format("YYYYMMDD")

      // 디자이너의 해당연도 의류
      let sql = "SELECT DISTINCT "
      sql += "      STYCD "
      sql += "      ,DIMAGEPATH  "
      sql += "FROM   BISY021 "
      sql += "WHERE  DESIGNER = '" + this.designerPopupData.DESIGNER + "' " /* 디자이너사번 */
      // sql += "AND    OUTDT > SUBSTR(TO_CHAR(TO_NUMBER(TO_CHAR(SYSDATE ,'YYYY'))-1),1,4) ||TO_CHAR(SYSDATE ,'MM') ||TO_CHAR(SYSDATE ,'DD') " /* 최근 1년 */
      sql += "    AND    OUTDT BETWEEN '" + moment().subtract(1, 'year').add(1, 'day').format("YYYYMMDD") + "' AND '" + moment().format("YYYYMMDD") + "' " /* 최근 1년 */

      sql += "ORDER BY STYCD "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.YEAR_CLOTH = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.YEAR_CLOTH.push(res);
            } else {
              this.YEAR_CLOTH = JSON.parse("[" + res + "]")
            }
            this.slideCount = this.YEAR_CLOTH.length + 1
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSUCDReorderData(gubun, STYCD) {
      this.selectSUCD = 0
      this.clothSUCDList = []
      if (gubun != "clothRate") {
        return
      }
      // 리오더 정보 가져오기
      let sql = "SELECT TO_NUMBER(SUCD) SUCD, MAINSTYCD, RESEQ, CASE WHEN MRGU IS NULL THEN '' ELSE MRGU END AS MRGU FROM BISY021 "
      sql += "   WHERE STYCD = '" + STYCD + "' "
      sql += "   GROUP BY SUCD, MAINSTYCD, RESEQ, MRGU "
      sql += "   ORDER BY SUCD "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.clothSUCDList = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.clothSUCDList.push(res);
            } else {
              this.clothSUCDList = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    changeSUCD() {
      let gubun = "clothRate"
      let STYCD = this.clickedImg
      // 누적판매 실적
      this.getAccClothSaleData(gubun, STYCD)
      // 당월판매실적
      this.getClothJRData(gubun, STYCD)
      // 누적 판매율 추이
      this.getAccClothSaleRate(gubun, STYCD)
    },
    clothRate: function(gubun, STYCD, index) {
      this.clickedImg = STYCD
      this.selectSUCD = 0
      // 사업부/리오더 가져오기
      this.getSUCDReorderData(gubun, STYCD)
      // 누적판매 실적
      this.getAccClothSaleData(gubun, STYCD)
      // 당월판매실적
      this.getClothJRData(gubun, STYCD)
      // 누적 판매율 추이
      this.getAccClothSaleRate(gubun, STYCD)

      this.changeSlidePosition(index)
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
    getSUCDCODNM(sucd) {
      return this.$store.getters.getSUCDCODNM(sucd)
    },
    onResize() {
      if (this.$refs.slideArea) {
        this.slideWidth = this.$refs.slideArea.clientWidth
      } else {
        this.slideWidth = 0
      }
    },
    changeSlidePosition(index) {
      if (this.slidePosition > (-(108 * (index+1)) + this.slideWidth)) {
        this.slidePosition = -(108 * (index+1)) + this.slideWidth
      } else if ((-108 * (index)) > this.slidePosition) {
        this.slidePosition = -108 * (index)
      }
      if (index == 0) {
        this.slidePosition = 0
      }
      if (this.slidePosition > 0) {
        this.slidePosition = 0
      }
      if ((this.slideCount * 108) < (this.slideWidth - this.slidePosition)) {
        this.slidePosition = this.slideWidth  - (this.slideCount * 108)
      }
    },
    slide_next() {
      let count = Math.floor(this.slideWidth / 108) - Math.floor(this.slidePosition / 108) + 6
      this.slidePosition = -(108 * count) + this.slideWidth
      if ((this.slideCount * 108) < (this.slideWidth - this.slidePosition)) {
        this.slidePosition = this.slideWidth  - (this.slideCount * 108)
      }
    },
    slide_prev() {
      let count = Math.floor(this.slidePosition / 108) + 6
      this.slidePosition = (108 * count) 
      if (this.slidePosition > 0) {
        this.slidePosition = 0
      }
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