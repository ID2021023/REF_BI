<template>
  <transition name="modal">
    <!-- 팝업용 레이아웃 클래스 : popup_layout -->
    <div class="wrap popup_layout">
      <!-- popup close button -->
      <div class="btn_pop_close" role="button" @click="close()">
        <i class="material-icons">close</i>
      </div>
      <!-- header -->
      <header class="header">
        <div class="header_inner">
          <h2 class="layout_title">년도별 매출현황
            <span class="txt_date">
              <!-- <strong class="point_col1">{{ headSubTitle-4 }} ~ {{ headSubTitle }}</strong> -->
            </span>
          </h2>
          <div class="layout_spacer"></div>
        </div>
      </header>
      <div class="container">
        <div class="content">
          <div class="row">
            <div class="col_md_12">
              <div class="cont_box">
                <div class="tit">
                  <strong class="tit_txt">브랜드 별 온라인 매출 추이</strong>
                  <div class="layout_spacer"></div>
                  <span class="txt">&lt; 단위: 백만원 &gt;</span>
                </div>
                <div class="cont">
                  <div class="tbl_sheet yellow np">
                    <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                      <colgroup style="width: 1%">
                        <col />
                        <col />
                        <col />
                        <col class="bg_point_col19" />
                        <col />
                        <col />
                        <col class="bg_point_col19" />
                        <col />
                        <col />
                        <col class="bg_point_col19" />
                        <col />
                        <col />
                        <col class="bg_point_col19" />
                        <col />
                        <col />
                        <col class="bg_point_col19" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>년도</th>
                          <th colspan="3">{{ year-4 }}</th>
                          <th colspan="3">{{ year-3 }}</th>
                          <th colspan="3">{{ year-2 }}</th>
                          <th colspan="3">{{ year-1 }}</th>
                          <th colspan="3">{{ year }}</th>
                        </tr>
                        <tr>
                          <th>구분</th>

                          <th>자사</th>
                          <th>외부</th>
                          <th>합계</th>

                          <th>자사</th>
                          <th>외부</th>
                          <th>합계</th>

                          <th>자사</th>
                          <th>외부</th>
                          <th>합계</th>

                          <th>자사</th>
                          <th>외부</th>
                          <th>합계</th>

                          <th>자사</th>
                          <th>외부</th>
                          <th>합계</th>
                        </tr>
                      </thead>

                      <tbody id="sales_status" class="tbody_s">
                        <tr v-for="(data , index) in brandSaleList" v-bind:key="index">
                          <td style="font-weight: bold;">{{data.BRCD}}</td>

                          <td class="tr">{{ data.JASASILAMT4  | currency }}</td>
                          <td class="tr">{{ data.OUTSILAMT4 | currency }}</td>
                          <td class="tr">{{ data.TOTSILAMT4 | currency }}</td>
                          
                          <td class="tr">{{ data.JASASILAMT3  | currency }}</td>
                          <td class="tr">{{ data.OUTSILAMT3 | currency }}</td>
                          <td class="tr">{{ data.TOTSILAMT3 | currency }}</td>
                          
                          <td class="tr">{{ data.JASASILAMT2  | currency }}</td>
                          <td class="tr">{{ data.OUTSILAMT2 | currency }}</td>
                          <td class="tr">{{ data.TOTSILAMT2 | currency }}</td>
                          
                          <td class="tr">{{ data.JASASILAMT1  | currency }}</td>
                          <td class="tr">{{ data.OUTSILAMT1 | currency }}</td>
                          <td class="tr">{{ data.TOTSILAMT1 | currency }}</td>

                          <td class="tr">{{ data.JASASILAMT  | currency }}</td>
                          <td class="tr">{{ data.OUTSILAMT | currency }}</td>
                          <td class="tr">{{ data.TOTSILAMT | currency }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col_md_12">
              <div class="cont_box">
                <div class="tit">
                  <strong class="tit_txt" >잇미샤 년도별 온/오프 판매비중</strong>
                  <div class="layout_spacer"></div>
                  <span class="txt">&lt; 단위: 천원 &gt;</span>
                </div>
                <div class="cont">
                  <div class="tbl_sheet tbl_hover_none np">
                    <table class="tbl tbl_center">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                          <tr>
                              <th>구분</th>
                              <th>{{ year-3 }}</th>
                              <th>{{ year-2 }}</th>
                              <th>{{ year-1 }}</th>
                              <th>{{ year }}</th>
                          </tr>
                        </thead>

                        <tbody class="tbody_s">
                          <tr v-for="(data , index) in itOnffImptList" :key="index" v-bind:class="totalClass(data.ITEM)">
                            <!-- <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" @click="addRow(data, index)">{{ data.ITEMNM }}</td> -->
                            <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" >{{ data.ITEMNM }}</td>
                            <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT_17  | currency }}</td>
                            <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT_18  | currency }}</td>
                            <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT_19  | currency }}</td>
                            <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT  | currency }}</td>
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
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"

export default {
  name: "ONL0104_1",
  components: {
    
  },
  props: {
  },
  created() {
    this.loadData();
  },
  computed: {
    req2svr: () => req2svr,
    headSubTitle() {
      return this.year == null ? new Date().getFullYear() : this.year
    }
  },
  data() {
    return {
      drawer: null,
      year: new Date().getFullYear(),
      month: 1,
      brandSaleList: [
        {"BRCD": "MI", "SUCD": "1",  "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "301", "OUTSILAMT3": "0", "TOTSILAMT3": "301", "JASASILAMT2": "422", "OUTSILAMT2": "0", "TOTSILAMT2": "422", "JASASILAMT1": "776", "OUTSILAMT1": "0", "TOTSILAMT1": "776", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "MO", "SUCD": "12", "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "1357", "OUTSILAMT3": "0", "TOTSILAMT3": "1357", "JASASILAMT2": "2126", "OUTSILAMT2": "0", "TOTSILAMT2": "2126", "JASASILAMT1": "2675", "OUTSILAMT1": "0", "TOTSILAMT1": "2675", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "IT", "SUCD": "14", "JASASILAMT4": "264", "OUTSILAMT4": "1482", "TOTSILAMT4": "1746", "JASASILAMT3": "1127", "OUTSILAMT3": "1932", "TOTSILAMT3": "3059", "JASASILAMT2": "2665", "OUTSILAMT2": "1985", "TOTSILAMT2": "4650", "JASASILAMT1": "4519", "OUTSILAMT1": "3503", "TOTSILAMT1": "8022", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "IN", "SUCD": "23", "JASASILAMT4": "671", "OUTSILAMT4": "2760", "TOTSILAMT4": "3431", "JASASILAMT3": "1400", "OUTSILAMT3": "593", "TOTSILAMT3": "1993", "JASASILAMT2": "846", "OUTSILAMT2": "73", "TOTSILAMT2": "919", "JASASILAMT1": "1441", "OUTSILAMT1": "682", "TOTSILAMT1": "2123", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
        {"BRCD": "SO", "SUCD": "3",  "JASASILAMT4": "29", "OUTSILAMT4": "662", "TOTSILAMT4": "691", "JASASILAMT3": "129", "OUTSILAMT3": "956", "TOTSILAMT3": "1085", "JASASILAMT2": "", "OUTSILAMT2": "", "TOTSILAMT2": "", "JASASILAMT1": "", "OUTSILAMT1": "", "TOTSILAMT1": "", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      ],
      itOnffImptList: [
        {ITEM: "00", ITEMNM: "매출합계", AMT_17: "44148980", AMT_18: "47417298", AMT_19: "58089170", AMT: ""},
        //{ITEM: "11", ITEMNM: "네이버(스타일윈도)", AMT_17: "3570534", AMT_18: "5888477", AMT_19: "9932276", AMT: ""},
        {ITEM: "22", ITEMNM: "백화점몰", AMT_17: "1932000", AMT_18: "1985000", AMT_19: "3503000", AMT: ""},
        {ITEM: "33", ITEMNM: "잇미샤몰", AMT_17: "1127000", AMT_18: "2665000", AMT_19: "4519000", AMT: ""},
        //{ITEM: "OFFLIN", ITEMNM: "오프라인", AMT_17: "37519446", AMT_18: "36878821", AMT_19: "40134894", AMT: ""}
      ],
      itOnffImptMslList: []
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadData() {
      this.getSaleByBrandList()
      this.getITOnOffSaleList()
      this.getITOnOffDetailData()
    },
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === '00'
      }
    },
    getSaleByBrandList: function () {
      this.req2svr.getSaleByBrandList(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            //console.log("res", res);
            let thisYearData = JSON.parse("[" + res + "]");
            for(var i in this.brandSaleList) {
              for(var j in thisYearData) {
                if(this.brandSaleList[i].BRCD == thisYearData[j].MAINGU) {
                  this.brandSaleList[i]["JASASILAMT"] = thisYearData[j]["JASASILAMT"];
                  this.brandSaleList[i]["OUTSILAMT"] = thisYearData[j]["OUTSILAMT"];
                  this.brandSaleList[i]["TOTSILAMT"] = thisYearData[j]["TOTSILAMT"];
                }
              }
            }
            let totObj = {
              BRCD : "TOTAL", "SUCD": "",
              "JASASILAMT" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT); }), 
              "OUTSILAMT"  : _.sumBy(this.brandSaleList, function(o) { return Number(o.OUTSILAMT); }), 
              "TOTSILAMT"  : _.sumBy(this.brandSaleList, function(o) { return Number(o.TOTSILAMT); }),
              "JASASILAMT1": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }), 
              "OUTSILAMT1" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }), 
              "TOTSILAMT1" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }),
              "JASASILAMT2": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }), 
              "OUTSILAMT2" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }), 
              "TOTSILAMT2" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }),
              "JASASILAMT3": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }), 
              "OUTSILAMT3" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }), 
              "TOTSILAMT3" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }),
              "JASASILAMT4": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }), 
              "OUTSILAMT4" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }), 
              "TOTSILAMT4" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }),
            };
            this.brandSaleList.push(totObj);
            //console.log(this.brandSaleList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getITOnOffSaleList: function () {
      this.req2svr.getITOnOffSaleList(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            //console.log(res);
            let itYearData = JSON.parse("[" + res + "]");
            for(var i in this.itOnffImptList) {
              for(var j in itYearData) {
                if(this.itOnffImptList[i].ITEM == itYearData[j].ITEM) {
                  this.itOnffImptList[i].AMT = itYearData[j].AMT;
                }
              }
            }

            let offDataObj = {
              ITEM: "44", ITEMNM: "오프라인", 
              AMT_17: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_17), 
              AMT_18: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_18), 
              AMT_19: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_19), 
              AMT:    Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT)
            };
            for(var i in this.itOnffImptList) {
              if(this.itOnffImptList[i].ITEM != "00") {
                offDataObj["AMT_17"]  -= Number(this.itOnffImptList[i]["AMT_17"]);
                offDataObj["AMT_18"]  -= Number(this.itOnffImptList[i]["AMT_18"]);
                offDataObj["AMT_19"]  -= Number(this.itOnffImptList[i]["AMT_19"]);
                offDataObj["AMT"]     -= Number(this.itOnffImptList[i]["AMT"]);
              }
            }
            
            this.itOnffImptList.push(offDataObj);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getITOnOffDetailData: function () {
      this.req2svr.getITOnOffDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.itOnffImptMslList = JSON.parse("[" + res + "]");
            for(var i in this.itOnffImptMslList) {
              this.itOnffImptMslList[i]["ITEMNM"] = this.getItemNm(this.itOnffImptMslList[i]["ITEM"]);
            }

            let offDataObj = {
              ITEM: "44", ITEMNM: "오프라인"
            };

            for(var i=0; i < 12; i++) {
              offDataObj["AMT"+(i+1)] = this.itOnffImptMslList.map(x => Number(x["AMT"+(i+1)])).reduce(function (pre, value) { return pre - value; });
            }
            this.itOnffImptMslList.push(offDataObj);
            console.log("getITOnOffDetailData >> ", this.itOnffImptMslList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getItemNm: function (item) {
      let returnNm = '';
      switch(item) {
        case '00': {
          returnNm = '매출합계';
          break;
        }
        case '11': {
          returnNm = '네이버(스타일윈도)';
          break;
        }
        case '22': {
          returnNm = '백화점몰';
          break;
        }
        case '33': {
          returnNm = '잇미샤몰';
          break;
        }
        case '44': {
          returnNm = '오프라인';
          break;
        }
      }
      return returnNm;
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