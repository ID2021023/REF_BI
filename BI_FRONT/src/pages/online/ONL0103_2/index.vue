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
          <h2 class="layout_title">{{codeText}}&nbsp;일별 매출현황
            <span class="txt_date">
              <!-- <strong class="point_col1">{{ headSubTitle-4 }} ~ {{ headSubTitle }}</strong> -->
            </span>
          </h2>
          <div class="layout_spacer"></div>
          <button type="button" class="btn_n mr10" @click="fnExcelReport()" >다운로드</button>
          <div class="select_box" style="width:220px;">
            <select class="select" v-model="selectMonth" @change="chageMonth">
              <option v-for="(data, index) in monthFilters" :key="index" :value="data.ITEM">{{ data.NAME }}</option>
            </select>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="content">
          <div class="tbl_sheet yellow np">
            <table class="tbl tbl_center" id="tbl_excel" style="width: 1775px;">
              <colgroup>
                <col class="bg_point_col20" v-bind:style="{width:MCODE=='00'?'150px':'151px', fontWeight: 'bold'}"/>
                <col v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'MI')" v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'MI')" v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'MI')" v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'IT')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'IT')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'IT')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'MO')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'MO')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'MO')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'IN')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'IN')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
                <col v-if="(MCODE == '00' || MCODE == 'IN')"  v-bind:style="{width:MCODE=='00'?'109px':'270px'}"/>
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th colspan="3">전체</th>
                  <th v-if="(MCODE == '00' || MCODE == 'MI')" colspan="3">MI</th>
                  <th v-if="(MCODE == '00' || MCODE == 'IT')" colspan="3">IT</th>
                  <th v-if="(MCODE == '00' || MCODE == 'MO')" colspan="3">MO</th>
                  <th v-if="(MCODE == '00' || MCODE == 'IN')" colspan="3">IN</th>
                </tr>
                <tr>
                  <th>일자 | 요일</th>

                  <th>전체</th>
                  <th>온라인</th>
                  <th>비율(%)</th>

                  <th v-if="(MCODE == '00' || MCODE == 'MI')">전체</th>
                  <th v-if="(MCODE == '00' || MCODE == 'MI')">온라인</th>
                  <th v-if="(MCODE == '00' || MCODE == 'MI')">비율(%)</th>

                  <th v-if="(MCODE == '00' || MCODE == 'IT')">전체</th>
                  <th v-if="(MCODE == '00' || MCODE == 'IT')">온라인</th>
                  <th v-if="(MCODE == '00' || MCODE == 'IT')">비율(%)</th>
                  
                  <th v-if="(MCODE == '00' || MCODE == 'MO')">전체</th>
                  <th v-if="(MCODE == '00' || MCODE == 'MO')">온라인</th>
                  <th v-if="(MCODE == '00' || MCODE == 'MO')">비율(%)</th>

                  <th v-if="(MCODE == '00' || MCODE == 'IN')">전체</th>
                  <th v-if="(MCODE == '00' || MCODE == 'IN')">온라인</th>
                  <th v-if="(MCODE == '00' || MCODE == 'IN')">비율(%)</th>
                </tr>
              </thead>
              <tbody style="display: block; height: 680px; overflow: hidden auto; width: 1805px;">
                <tr v-for="(data , index) in dr_DS" v-bind:key="index">
                  <td v-bind:style="{width:MCODE=='00'?'150px':'152px', 'color': data.COLOR}" scope="row" class="tc">{{ data.DAY }} {{makeDay(data.DAY)}}</td>

                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'271px', 'color': data.COLOR}">{{ data.TDAYTOT | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'271px', 'color': data.COLOR}">{{ data.TDAYON | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}">{{ makeRate(data.TDAYON, data.TDAYTOT) }}</td>

                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'MI')">{{ data.MIDAYTOT | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'MI')">{{ data.MIDAYON | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'MI')">{{ makeRate(data.MIDAYON, data.MIDAYTOT) }}</td>

                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'IT')">{{ data.ITDAYTOT | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'IT')">{{ data.ITDAYON | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'IT')">{{ makeRate(data.ITDAYON, data.ITDAYTOT) }}</td>

                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'MO')">{{ data.MODAYTOT | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'MO')">{{ data.MODAYON | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'MO')">{{ makeRate(data.MODAYON, data.MODAYTOT) }}</td>

                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'IN')">{{ data.INDAYTOT | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'IN')">{{ data.INDAYON | currency }}</td>
                  <td class="tr" v-bind:style="{width:MCODE=='00'?'109px':'270px', 'color': data.COLOR}" v-if="(MCODE == '00' || MCODE == 'IN')">{{ makeRate(data.INDAYON, data.INDAYTOT) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="tbl_total" style="border-top: 1px solid #ced4da;">
                  <th scope="col"><strong>합계</strong></th>
                  <td class="tr"><strong>{{ totalData.TDAYTOT | currency}}</strong></td>
                  <td class="tr"><strong>{{ totalData.TDAYON | currency}}</strong></td>
                  <td class="tr"><small class="point_col1">{{ makeRate(totalData.TDAYON, totalData.TDAYTOT) }}</small></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'MI')"><strong>{{ totalData.MIDAYTOT| currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'MI')"><strong>{{ totalData.MIDAYON | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'MI')"><small class="point_col1">{{ makeRate(totalData.MIDAYON, totalData.MIDAYTOT) }}</small></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'IT')"><strong>{{ totalData.ITDAYTOT | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'IT')"><strong>{{ totalData.ITDAYON | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'IT')"><small class="point_col1">{{ makeRate(totalData.ITDAYON, totalData.ITDAYTOT) }}</small></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'MO')"><strong>{{ totalData.MODAYTOT | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'MO')"><strong>{{ totalData.MODAYON | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'MO')"><small class="point_col1">{{ makeRate(totalData.MODAYON, totalData.MODAYTOT) }}</small></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'IN')"><strong>{{ totalData.INDAYTOT | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'IN')"><strong>{{ totalData.INDAYON | currency}}</strong></td>
                  <td class="tr" v-if="(MCODE == '00' || MCODE == 'IN')"><small class="point_col1">{{ makeRate(totalData.INDAYON, totalData.INDAYTOT) }}</small></td>
                </tr>
              </tfoot>
            </table>
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
    selectedCODE: {
      type: String,
      default: null
    },
    currentDate: {
      type: String,
      default: moment().format("YYYY-MM-DD")
    },
    codeText: {
      type: String,
      default: null
    }
  },
  created() {
    this.loadData();
    
  },
  computed: {
    req2svr: () => req2svr,
    totalData() {
      return {
        TDAYTOT : _.sumBy( this.dr_DS, function(o) { return Number(o.TDAYTOT); }),
        TDAYON  : _.sumBy( this.dr_DS, function(o) { return Number(o.TDAYON); }),
        TDAYRAT : _.meanBy(this.dr_DS, function(o) { return Number(o.TDAYRAT); }),
        MIDAYTOT: _.sumBy( this.dr_DS, function(o) { return Number(o.MIDAYTOT); }),
        MIDAYON : _.sumBy( this.dr_DS, function(o) { return Number(o.MIDAYON); }),
        MIDAYRAT: _.meanBy(this.dr_DS, function(o) { return Number(o.MIDAYRAT); }),
        MODAYTOT: _.sumBy( this.dr_DS, function(o) { return Number(o.MODAYTOT); }),
        MODAYON : _.sumBy( this.dr_DS, function(o) { return Number(o.MODAYON); }),
        MODAYRAT: _.meanBy(this.dr_DS, function(o) { return Number(o.MODAYRAT); }),
        ITDAYTOT: _.sumBy( this.dr_DS, function(o) { return Number(o.ITDAYTOT); }),
        ITDAYON : _.sumBy( this.dr_DS, function(o) { return Number(o.ITDAYON); }),
        ITDAYRAT: _.meanBy(this.dr_DS, function(o) { return Number(o.ITDAYRAT); }),
        INDAYTOT: _.sumBy( this.dr_DS, function(o) { return Number(o.INDAYTOT); }),
        INDAYON : _.sumBy( this.dr_DS, function(o) { return Number(o.INDAYON); }),
        INDAYRAT: _.meanBy(this.dr_DS, function(o) { return Number(o.INDAYRAT); }),
      }
    },
  },
  data() {
    return {
      drawer: null,
      monthList: [],
      originalTestList: [],
      //brandList: ["MI", "MO", "IT", "IN"],
      testList: [],
      testList2: [],
      testList3: [],
      dr_DS: [],
      MCODE: "",
      selectDate: null,
      selectMonth: null,
      monthFilters: []
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadData() {
      // this.getSaleByBrandList()
      // this.getITOnOffSaleList()
      this.MCODE = this.selectedCODE
      this.selectDate = moment(this.currentDate).format("YYYYMMDD");
      this.selectMonth = moment(this.currentDate).format("MM");
      console.log("팝업 >>> ", this.MCODE, " / ", this.selectDate, " / ", this.selectMonth )
      for(var i=0; i<this.selectMonth; i++) {
        this.monthFilters.push({
          NAME: (i+1) + " 월", ITEM: this.twinNum(i+1)
        })
      }
      this.getPopMonthlySaleList(this.selectMonth)
      //this.chageMonth(this.selectMonth)
    },
    getPopMonthlySaleList: function (mon) {
      this.req2svr.getMonthlySaleList_POP(moment(this.selectDate).format("YYYYMMDD"), this.selectMonth).then(
        res => {
          this.dr_DS = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_DS.push(res);
            } else {
              this.dr_DS = JSON.parse("[" + res + "]");

              for(let i in this.dr_DS) {
              this.dr_DS[i]["SALEDT"] = moment(this.selectDate).format("YYYYMM") + this.dr_DS[i]["DAY"]
              if(moment(this.dr_DS[i]["SALEDT"]).format("d") == "6") {
                this.dr_DS[i]["COLOR"] = this.hexToRgb("#0779e4")
              } else if(moment(this.dr_DS[i]["SALEDT"]).format("d") == "0") {
                this.dr_DS[i]["COLOR"] = this.hexToRgb("#eb3737")
              } else {
                this.dr_DS[i]["COLOR"] = this.hexToRgb("#eeee")
              }
            }
            }
            console.log("dr_DS >>> ", this.dr_DS)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    chageMonth: function (select) {
      console.log("selectMonth !!! ", select.target.value)
      this.selectMonth = select.target.value;
      this.getPopMonthlySaleList(select.target.value);
    },
    fnExcelReport: function () {
      // 우선 id 를 이용하여 table 을 가져옵니다.
      var table = document.getElementById('tbl_excel');

      for(var i = 0; i < table.childNodes[0].childNodes[0].childNodes.length; i++){
        if(table.childNodes[0].childNodes[0].childNodes[i].firstChild !== null){
          table.childNodes[0].childNodes[0].childNodes[i].classList.add("head-title");
        }
      }

      var styles = "<style>\n";
      styles += ".table{width: 100%;}\n";
      styles += ".head-title{border-top: 1px solid #dee2e6; border-bottom: 2px solid #dee2e6; background-color: #a1cffd;}\n";
      styles += "</style>";

      var browser = navigator.userAgent.toLowerCase();
      if(browser.indexOf('trident') != -1){
        // IE인 경우
        // excel 다운로드 시 파일명
        var saveFileName = this.codeText + " 일별매출현황.xls";
        var oWin = window.open("about:blank", "_blank",  "width=150px; height=150px;");
        // oWin.document.write(styles);
        oWin.document.write(table.outerHTML);
        var success = oWin.document.execCommand("SaveAs", false, saveFileName);
        oWin.close();
      } else {
        // IE 외의 브라우저인 경우
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template =  '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + styles + '</head><body>{table}</body></html>';
        // var template =  '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>';
        var base64 = function(s){return window.btoa(unescape(encodeURIComponent(s)))}
        var format = function(s, c){return s.replace(/{(\w+)}/g, function(m, p){return c[p];})}
        var ctx = {worksheet : 'DAILY' || 'Worksheet', table : table.outerHTML.split('₩').join('')}
        var a = document.createElement('a');
        a.href = uri + base64(format(template, ctx))
        a.download = this.codeText + ' 일별매출현황.xls';
        a.click();
      }

      table.classList.add('table-striped');
      for(var i = 0; i < table.childNodes[0].childNodes[0].childNodes.length; i++){
        if(table.childNodes[0].childNodes[0].childNodes[i].firstChild !== null){
          table.childNodes[0].childNodes[0].childNodes[i].classList.remove("head-title");
        }
      }
    },
    twinNum: function (num) {
      let returnNum = num.toString();

      if(num.toString().length == 1) {
        returnNum = "0" + num;
      }
      return returnNum;
    },
    hexToRgb( hexType ){ 

      var hex = hexType.replace( "#", "" ); 
      var value = hex.match( /[a-f\d]/gi ); 


      // 헥사값이 세자리일 경우, 여섯자리로. 
      if ( value.length == 3 ) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2]; 


      value = hex.match( /[a-f\d]{2}/gi ); 

      var r = parseInt( value[0], 16 ); 
      var g = parseInt( value[1], 16 ); 
      var b = parseInt( value[2], 16 ); 

      var rgbType = "rgb(" + r + ", " + g + ", " + b + ")"; 

      return rgbType; 
    },
    makeRate(on, tot) {
      let late = 0
      if(Number(tot) == 0 || Number(on) == 0) {
        late = 0
      } else {
        late = (Number(on)/Number(tot)*100).toFixed(1)
      }
      return late;
    },
    makeDay(day) {
      let date = moment(this.selectDate).format("YYYYMM") + day
      return "| "+moment(date, "YYYYMMDD").format("ddd")
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
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN" || x == null || x == "") {
        x = 0
      }
      return x
    },
    comma: function(num) {
      let str
      if(num != "" && num != null && num != "undefined") {
        str = num.toString();
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } else {
        return "";
      }
      
    }
  }
};
</script>