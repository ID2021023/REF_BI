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
    <div class="layout_obfuscwator"></div>
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <!-- Title button -->
        <button type="button" class="btn_n btn_icon btn_prev" @click="toBack"><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">월별 매출 상세보기<span class="txt_date"><strong class="point_col1">{{ headSubTitle }}</strong></span></h2>
        <div class="layout_spacer"></div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">브랜드 별 월별 온라인 매출 추이</strong>
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
                        <th colspan="3" v-for="s in 12" v-bind:key="s">{{s}} 월</th>
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

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>
                      </tr>
                    </thead>

                    <tbody id="sales_status" class="tbody_s">
                      <tr v-for="(data , index) in brdSaleMslList" v-bind:key="index">
                        <td style="font-weight: bold;">{{data.MAINGU}}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT1 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT1 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT1 | currency }}</td>
                        
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT2 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT2 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT2 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT3 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT3 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT3 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT4 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT4 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT4 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT5 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT5 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT5 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT6 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT6 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT6 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT7 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT7 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT7 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT8 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT8 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT8 | currency }}</td>
                        
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT9 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT9 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT9 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT10 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT10 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT10 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT11 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT11 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT11 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{ data.JASASILAMT12 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.OUTSILAMT12 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.MAINGU=='TOTAL'?'bold':''}">{{  data.TOTSILAMT12 | currency }}</td>
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
                <strong class="tit_txt" >잇미샤 월별 온/오프 판매비중</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet tbl_hover_none np">
                  <table class="tbl tbl_center">
                      <colgroup>
                        <col width="200px"/>
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th v-for="(s, index) in 12" v-bind:key="index">{{s}} 월</th>
                        </tr>
                      </thead>

                      <tbody class="tbody_s">
                        <tr v-for="(data , index) in itOnffImptMslList" :key="index" v-bind:class="totalClass(data.ITEM)">
                          <!-- <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" @click="addRow(data, index)">{{ data.ITEMNM }}</td> -->
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" >{{ data.ITEMNM }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT1  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT2  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT3  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT4  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT5  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT6  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT7  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT8  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT9  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT10 | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT11 | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT12 | currency }}</td>
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
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr";
import sideMenu from '@/components/sideMenu'

export default {
  name: "ONL0104",
  components: {
    sideMenu
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
    if (!this.data) {
      this.$router.replace("/OnLineSale")
      return
    }
    // this.loadData();
  },
  data() {
    return {
      drawer: null,
      year: this.data.year,
      month: 1,
      brdSaleMslList: [],
      itOnffImptMslList: []
    };
  },
  computed: {
    headSubTitle() {
      //return moment(this.data.date).format("YYYY") + " " + this.data.CODNM
      return this.data.year
    },
    req2svr: () => req2svr,
  },
  methods: {
    loadData() {
      this.getSaleByBrdDetailData();
      this.getITOnOffDetailData();
    },
    toMain() {
      this.$router.replace("/")
    },
    toBack() {
      this.$router.replace({
          name: 'ONL0103',
          params: {
            data: {
            }
          }
      })
    },
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === '00'
      }
    },
    getSaleByBrdDetailData: function () {
      this.req2svr.getSaleByBrdDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.brdSaleMslList = JSON.parse("[" + res + "]");
            let totObj = {
              MAINGU : "TOTAL", "SUCD": ""
            };

            for(var i=0; i < 12; i++) {
              totObj["JASASILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["JASASILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["OUTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["OUTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["TOTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["TOTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
            }
            this.brdSaleMslList.push(totObj);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
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
            console.log(this.itOnffImptMslList);
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