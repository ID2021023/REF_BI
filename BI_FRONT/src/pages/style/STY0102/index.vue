<template>
  <!-- 팝업용 레이아웃 클래스 : popup_layout -->
  <div class="wrap popup_layout">
    <!-- popup close button -->
    <div class="btn_pop_close" role="button" @click="toBack"><i class="material-icons">close</i></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <!-- Title -->
        <h2 class="layout-title">{{data.STYCD}}</h2>
        <div style="margin-left:8px;">
          <span v-if="data.MRGU == 'R'" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ data.RESEQ }}</span></span>
          <span v-if="data.MRGU == 'M'" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
        </div>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="row h100">
          <div class="col_md_3 h100">
            <div class="cont_box h50" style="height:calc(60% - 10px);">
              <div class="tit">
                <strong class="tit_txt">출고 정보</strong>
              </div>
              <div class="cont">
                <div class="graph_area">                                  
                  <div class="graph_view">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">누적 출고수량</dt>
                        <dd class="txt_result">{{ OUTQTY }}</dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:250px; float:left;">
                        <div id="salesChartdiv" style="position:relative; width:100%; height:100%; float:left;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>                               
            </div>
            <div class="cont_box h50" style="height:calc(40% - 10px);">
              <div class="tit">
                <strong class="tit_txt">유통채널별 판매비중</strong>
              </div>
              <div class="cont">
                <div class="graph_view">
                  <!-- 그래프 -->
                  <div class="graph">
                    <div style="position:relative; width:100%; height:250px; float:left;">
                      <div id="distributionChartdiv" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_4 h100">
            <div class="cont_box h100">
              <div class="tit">
                <strong class="tit_txt">매장별 재고현황</strong>
                <div class="layout_spacer"></div>
                <!-- select -->
                <div class="select_box" style="min-width:138px; height: 40px;">
                  <select class="select" v-model="selectStore" @change="storeChange">
                    <option v-for="(data, index) in dr_L" :key="data.RN" :value="index">{{data.VDNM}}</option>
                  </select>
                </div>
              </div>
              <div class="cont">
                <div class="graph_view gv_scroll_h" style="height:310px;">
                  <div class="graph"  v-for="(data, index) in dr_C_ItemList" :key="index">
                    <div style="position:relative; width:280px; height:260px; float:left;">
                      <div :id="'pSizeChartdiv'+index" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
                <div class="tbl_sheet sheet_scroll tbl_right" style="height:calc(100% - 310px);">
                  <div class="thead_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" class="tc">색상 / 사이즈</th>
                          <th scope="col" class="tr">출고수량</th>
                          <th scope="col" class="tr">판매수량</th>
                          <th scope="col" class="tr">재고수량</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="tbody_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                      </colgroup>
                      <tbody>
                        <tr v-for="(data, index) in COLSZINFO" :key="index">
                          <th scope="row">
                            <!-- color chip -->
                            <span class="chip color_chip">
                              <span class="inner" :style="{'background-color': findColorCode(data.COLCD)}"><!-- 색상 코드 받아서 각각 넣어주기 --></span>
                            </span>
                            {{data.COLSZ}}
                          </th>
                          <td>{{Math.round(Number(data.OUTQTY)) | currency}}</td>
                          <td>{{Math.round(Number(data.SQTY)) | currency}}</td>
                          <td>{{Math.round(Number(data.STOQTY)) | currency}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_5 h100">
            <div class="cont_box h100">
              <div class="tit">
                <strong class="tit_txt">매장별 판매 순위</strong>
                <div class="layout_spacer"></div>
              </div>
              <div class="cont">
                <div class="tbl_sheet sheet_scroll tbl_right">
                  <div class="thead_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col style="width:40%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                        <!-- <col style="width:12%;" /> -->
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">매장</th>
                          <th scope="col" class="tc">출고수량</th>
                          <th scope="col" class="tc">판매수량</th>
                          <th scope="col" class="tc">재고수량</th>
                          <!-- <th scope="col" class="tc">판매율</th> -->
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="tbody_wrap">
                    <table class="tbl">
                      <colgroup>
                        <col style="width:40%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />
                        <!-- <col style="width:12%;" /> -->
                      </colgroup>
                      <tbody>
                        <tr v-for="(data, index) in dr_L" :key="data.RN" :class="{on: selectStore == index}" class="teamSelector" @click="clickSelectStore(index)">
                          <th scope="row">
                            <span class="num_box"><strong>{{index+1}}</strong></span>{{data.VDNM}}
                          </th>
                          <td class="tc">{{Math.round(Number(data.OUTQTY)) | currency}}</td>
                          <td class="tc">{{Math.round(Number(data.SQTY)) | currency}}</td>
                          <td class="tc">{{Math.round(Number(data.STOQTY)) | currency}}</td>
                          <!-- <td class="tc">{{Math.round(Number(data.QTY_RATE)) | currency}}%</td> -->
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

export default {
  name: "STY0102",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    today() {
      return moment().format("YYYY-MM-DD")
    },
    tabType() {
      return this.$store.getters.getSTYList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
  },
  data() {
    return {
      dr_D: [],
      dr_C_ItemList: [],
      dr_L: [],
      selectStore: 0,
      OUTINFO: [],
      OUTQTY: null,
      COLSZINFO: [],
      COLORCODEList: [],
      makeDataDate: null
    }
  },
  methods: {
    loadData() {
      if (this.COLORCODEList.length <= 0) {
        this.getColorCode()
        return
      }
      // 데이터 기준일
      this.getMakeDataDate()
      // 누적출고수량
      this.getOutQty()
      // 출고 정보
      this.getOutInfo()
      // 팝업 유통채널
      this.getDistributionListData()
      // 매장별 판매순위
      this.getStoreListData()
    },
    storeChange() {
      // 매장별 재고현황 색상/사이즈
      this.getStoreQTYColSz()
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
    getOutQty(){
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 누적출고 수량
      let sql = "SELECT SUM(OUTQTY) OUTQTY FROM " + table;
      sql += "WHERE STYCD = '" + this.data.STYCD + "' ";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.OUTQTY = Number(res.OUTQTY)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getOutInfo(){
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 누적출고 수량 그래프
      // let sql = "SELECT TO_NUMBER(RESEQ) + MAX(1) ORD, SUM(OUTQTY) OUTQTY FROM " + table;
      // if (this.data.MAINSTYCD) {
      //   sql += "WHERE MAINSTYCD = '" + this.data.MAINSTYCD + "' "
      // } else {
      //   sql += "WHERE STYCD = '" + this.data.STYCD + "' "
      // }
      // sql += "GROUP BY RESEQ ";
      // sql += "ORDER BY RESEQ";

      let sql = "SELECT TO_NUMBER(RESEQ) ORD, SUM(OUTQTY) OUTQTY FROM " + table;
      if (this.data.MAINSTYCD) {
        sql += "WHERE MAINSTYCD = '" + this.data.MAINSTYCD + "' "
      } else {
        sql += "WHERE STYCD = '" + this.data.STYCD + "' "
      }
      sql += "GROUP BY ORD ";
      sql += "ORDER BY ORD";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.OUTINFO = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.OUTINFO.push(res);
            } else {
              this.OUTINFO = JSON.parse("[" + res + "]")
            }
          }
          this.makeChart1()
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    getStoreQTYData() {
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 매장별 재고 현황
      let sql = "SELECT COLCD, COLCDNM, SIZE, CASE "
      sql += "WHEN A.OUTQTY > 0 THEN ROUND(A.SQTY/A.OUTQTY * 100, 1) ELSE 0 END AS QTY_RATE FROM "
      sql += "(SELECT STYCD, VDCD, COLCD, COLCDNM, PSIZE || MAX('(') || PSIZENM || MAX(')') SIZE, SUM(SQTY) SQTY, SUM(OUTQTY) OUTQTY FROM BISY021 "
      sql += "WHERE STYCD = '" + this.data.STYCD + "' "; /* 스타일 */
      sql += "AND VDCD = '" + this.dr_L[this.selectStore].VDCD + "' "  /* 매장 */
      sql += "GROUP BY STYCD, VDCD, COLCD, COLCDNM, PSIZE, PSIZENM) A "
      sql += "ORDER BY A.COLCDNM, A.SIZE, A.SQTY, A.OUTQTY "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
            this.makeChart3(0, "", "", [])
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res)
            } else {
              list = JSON.parse("[" + res + "]")
            }

            let item
            this.dr_C_ItemList = []
            for (let i=0;i<list.length;i++) {
              item = _.find(this.dr_C_ItemList, {COLCD: list[i].COLCD})
              if (item) {
                item.PSIZELIST.push({
                  SIZE: list[i].SIZE,
                  QTY_RATE: list[i].QTY_RATE
                })
              } else {
                this.dr_C_ItemList.push({
                    COLCD: list[i].COLCD,
                    COLCDNM: list[i].COLCDNM,
                    PSIZELIST: [ {
                       SIZE: list[i].SIZE,
                       QTY_RATE: list[i].QTY_RATE
                    } ]
                })
              }
            }
            for (let i=0;i<this.dr_C_ItemList.length;i++) {
              this.makeChart3(i, this.dr_C_ItemList[i].COLCD, this.dr_C_ItemList[i].COLCDNM, this.dr_C_ItemList[i].PSIZELIST)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStoreQTYColSz() {
      this.dr_C_ItemList = []
      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 매장별 재고현황 색상/사이즈
      let sql = "SELECT " + this.tabType + ", COLCD, COLCDNM || MAX('/') || PSIZE || MAX('(') || PSIZENM || MAX(')') COLSZ, SUM(OUTQTY) OUTQTY, SUM(SQTY) SQTY, SUM(OUTQTY)-SUM(SQTY) STOQTY FROM " + table;
      sql += "WHERE STYCD = '" + this.data.STYCD + "' ";
      sql += "AND VDCD = '" + this.dr_L[this.selectStore].VDCD + "' " //셀렉박스 값에 따라 바뀌어야함
      sql += "GROUP BY " + this.tabType + ", COLCD, COLCDNM, PSIZE, PSIZENM ";
      sql += "ORDER BY COLCDNM || MAX('/') || PSIZE || MAX('(') || PSIZENM || MAX(')')";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.COLSZINFO = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.COLSZINFO.push(res);
            } else {
              this.COLSZINFO = JSON.parse("[" + res + "]")
            }
            let colorCode
            this.dr_C_ItemList = []
            for (let i=0;i<this.COLSZINFO.length;i++) {
              if (colorCode != this.COLSZINFO[i].COLCD) {
                colorCode = this.COLSZINFO[i].COLCD
                this.dr_C_ItemList.push({COLCDNM:"", PSIZELIST:[]})
              }
            }
            // 매장별 재고현황 그래프
            this.getStoreQTYData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getColorCode() {
      // 컬러코드
      let sql = "SELECT " + this.tabType + ", COLCD, COLCDNM, RGBCOLCD  FROM BICM013 "
      sql += "WHERE " + this.tabType + " = '" + this.data.CODE + "' ";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.COLORCODEList = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.COLORCODEList.push(res);
            } else {
              this.COLORCODEList = JSON.parse("[" + res + "]")
            }
            this.loadData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStoreListData() {
      this.dr_L = []

      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 매장별 판매순위
      let sql = "SELECT VDCD, VDNM, OUTQTY, SQTY, OUTQTY - SQTY STOQTY, CASE WHEN OUTQTY = 0 THEN 0 ELSE ROUND(SQTY/OUTQTY * 100,0) END AS QTY_RATE FROM ";
      sql += "(SELECT VDCD, VDNM, SUM(OUTQTY) OUTQTY, SUM(SQTY) SQTY FROM " + table;
      sql += "WHERE STYCD = '" + this.data.STYCD + "' ";
      sql += "AND VDNM IS NOT NULL ";
      sql += "AND VDNM NOT IN ('입고불량','매장불량') ";
      sql += "GROUP BY VDCD, VDNM) ";
      // sql += "ORDER BY CASE WHEN OUTQTY = 0 THEN 0 ELSE ROUND(SQTY/OUTQTY * 100,0) END DESC"
      sql += "ORDER BY SQTY DESC"

      this.req2svr.getData(sql).then(
        res => {
          this.dr_L = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_L.push(res)
            } else {
              // let list = JSON.parse("[" + res + "]")
              this.dr_L = JSON.parse("[" + res + "]")
              this.selectStore = 0

              this.storeChange()
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDistributionListData() {
      this.dr_D = []

      let table = ""
      // if(this.ReOrder){
      //   table = "BISY020 ";
      // } else {
      //   table = "BISY021 ";
      // }

      table = "BISY021 ";

      // 팝업 유통채널
      let sql = "SELECT B.SHTPNM SHTPNM, CASE WHEN A.OUTQTY = 0 THEN 0 ELSE ROUND(B.OUTQTY / A.OUTQTY * 100,1) END AS RESULT FROM( ";
      sql += "SELECT STYCD, SUM(OUTQTY) OUTQTY FROM " + table;
      sql += "WHERE STYCD = '" + this.data.STYCD + "' ";
      sql += "GROUP BY STYCD) A, ";
      sql += "(SELECT STYCD, SHTPNM, SUM(OUTQTY) OUTQTY FROM " + table;
      sql += "WHERE STYCD = '" + this.data.STYCD + "' ";
      sql += "GROUP BY STYCD, SHTPNM) B ";
      sql += "WHERE A.STYCD = B.STYCD ";
      sql += "AND   B.SHTPNM IS NOT NULL ";
      sql += "ORDER BY B.SHTPNM";


      this.req2svr.getData(sql).then(
        res => {
          this.dr_D = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_D.push(res)
            } else {
              // let list = JSON.parse("[" + res + "]")
              this.dr_D = JSON.parse("[" + res + "]")
            }
          }
          this.makeChart2()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    makeChart1() {
      let data = []
      for(var i=0; i<this.OUTINFO.length; i++){
        if(this.OUTINFO[i].ORD == 0) {
          data.push({ TITLE: "메인", RESULT: this.OUTINFO[i].OUTQTY })
        } else {
          data.push({ TITLE: this.OUTINFO[i].ORD+"차", RESULT: this.OUTINFO[i].OUTQTY })
        }
        // data.push({ TITLE: this.OUTINFO[i].ORD+"차", RESULT: this.OUTINFO[i].OUTQTY })
      }
  
      AmCharts.makeChart("salesChartdiv", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "TITLE",
        columnWidth: 0.5,
        rotate: true,
        colors: [ "#4e68f1", "#ff7f92", "#ffb83c", "#a3e326" ],
        startDuration: 1,
        fontSize: 13,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "[[TITLE]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            type: "column",
            valueField: "RESULT",
            labelPosition: "right",
            showAllValueLabels: true
          },
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
            titleRotation: 0
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart2() {
      let list = this.dr_D

      AmCharts.makeChart("distributionChartdiv", {
        type: "pie",
        startEffect: "easeOutSine",
        balloonText:
          "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        innerRadius: "77%",
        labelRadius: 1,
        startRadius: "20%",
        labelText: "[[title]]<br>[[percents]]%",
        accessibleLabel: "[[title]]: [[percents]]",
        colors: [ "#3f93f5", "#ff7f92", "#6964d7", "#ffb83c", "#a3e326", ],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "SHTPNM",
        valueField: "RESULT",
        fontSize: 17,
        balloon: {
          adjustBorderColor: false,
          disableMouseEvents: false,
          fixedPosition: false,
          offsetY: 1
        },
        legend: {
          enabled: false,
          align: "center",
          fontSize: 16,
          markerType: "circle",
          valueText: ""
        },
        titles: [],
        dataProvider: list
      });
    },
    hex2rgba_convert(hex, opacity){
      hex = hex.replace('#','');
      let r = parseInt(hex.substring(0, hex.length/3), 16);
      let g = parseInt(hex.substring(hex.length/3, 2*hex.length/3), 16);
      let b = parseInt(hex.substring(2*hex.length/3, 3*hex.length/3), 16);

      let result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
      return result;
    },
    makeChart3(index, COLCD, COLCDNM, list) {
      let data = list
      let hexColor = this.findColorCode(COLCD)

      let ordedrList = _.orderBy(list, function(o) { return Number(o.QTY_RATE) }, 'desc')
      let alpha
      for (let i=0;i<list.length;i++) {
        alpha = _.findIndex(ordedrList, {SIZE:list[i].SIZE}) * 30
        list[i].color = this.hex2rgba_convert(hexColor, 100 - alpha)
      }

      AmCharts.makeChart("pSizeChartdiv" + index, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SIZE",
        columnSpacing: 0,
        columnWidth: 0.4,
        startDuration: 0.7,
        fontSize: 12,
        categoryAxis: {
          autoRotateAngle: 0,
          autoGridCount: false,
          axisColor: "#AAB3B3",
          gridAlpha: 0,
          gridThickness: 0,
          titleBold: false
        },
        trendLines: [],
        graphs: [
          {
            colorField: "color",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            labelPosition: "top",
            lineColorField: "color",
            title: "graph 1",
            type: "column",
            valueField: "QTY_RATE",
            showAllValueLabels: true
          }
        ],
        guides: [],
        valueAxes: [
          {
            stackType: "regular",
            id: "ValueAxis-1",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false
          }
        ],
        titles: [
          {
            bold: false,
            id: "Title-1",
            size: 18,
            text: COLCDNM + " 판매율(%)",
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      });
    },
    toBack() {
      this.$emit("close")
    },
    findColorCode(value) {
      let item = _.find(this.COLORCODEList, {COLCD: value})
      if (item != null) {
        return item.RGBCOLCD
      } else {
        return ""
      }
    },
    clickSelectStore(index) {
      this.selectStore = index
      // 매장별 재고현황 색상/사이즈
      this.getStoreQTYColSz()
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