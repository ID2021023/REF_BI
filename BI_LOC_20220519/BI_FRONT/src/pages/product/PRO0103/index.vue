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
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner" style="padding-right:18px">
        <!-- Title button -->
        <button type="button" class="btn_n btn_icon btn_prev" @click="toBack"><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">{{ headerTitle }}
          <small class="txt_date point_col1">
            {{ headerTitleSub }}
          </small>
        </h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ DATAST }}</small></div>
        <button type="button" class="btn_n btn" style="margin-right: 10px;" @click="excelDownLoad('exceldown_thead','exceldown_tbody')">다운로드</button>
        <button type="button" class="btn_n btn" @click="toFirst">처음으로</button>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <!-- 테이블 -->
        <div class="tbl_sheet sheet_scroll sheet_scroll_sty02 tbl_hover_none" style="height:100%;">
          <iframe id="txtArea1" style="display:none"></iframe>
          <div class="thead_wrap">
            <table id="exceldown_thead" class="tbl tbl_right">
              <colgroup>
                <col />
                <col style="width:6%;" />
                <col />
                <col />
                <col />                    
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th colspan="2" rowspan="2">구분</th>
                  <th colspan="3">계획</th>
                  <th colspan="4">FIX</th>
                  <th colspan="4">투입</th>
                  <th colspan="4">입고</th>
                  <th colspan="5">판매 (중국포함)</th>
                  <th colspan="2">재고</th>
                </tr>
                <tr>
                  <th>M</th>
                  <th>수량</th>
                  <th>금액<br>(백만원)</th>
                  <th>M</th>
                  <th>수량</th>
                  <th>금액<br>(백만원)</th>
                  <th>계획대비 픽스율</th>
                  <th>M</th>
                  <th>수량</th>
                  <th>금액<br>(백만원)</th>
                  <th>픽스대비 투입율</th>
                  <th>M</th>
                  <th>수량</th>
                  <th>금액<br>(백만원)</th>
                  <th>투입대비 입고율</th>
                  <th>M</th>
                  <th>수량</th>
                  <th>금액<br>(백만원)</th>
                  <th>(수량)<br>입고대비 판매율</th>
                  <th>(금액)<br>입고대비 판매율</th>
                  <th>수량</th>
                  <th>금액<br>(백만원)</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="tbody_wrap">
            <table id="exceldown_tbody" class="tbl tbl_right">
              <colgroup>
                <col />
                <col style="width:6%;" />
                <col />
                <col />
                <col />                    
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <!-- 총계와 월을 tbody로 나눔 class="sum"-->
              <tbody v-for="monthData in tableData" :key="monthData.TITLE" :class="{sum: monthData.TITLE=='총계', s_sum: monthData.TITLE.indexOf('소계') != -1}">
                <template v-for="(data, index) in monthData">
                <tr>
                  <th v-if="index == 0" :rowspan="(monthData.length)"><strong class="tit_row_all">{{monthData.TITLE}}</strong></th>
                  <th rowspan="1"><span class="tit_row">{{data.SUBGU}}</span></th>
                  <td>{{ data.YSMODEL | currency }}</td>
                  <td>{{ data.YSQTY | currency }}</td>
                  <td>{{ data.YSAMT | currency }}</td>

                  <td>{{ data.FMODEL | currency }}</td>
                  <td>{{ data.FQTY | currency }}</td>
                  <td>{{ data.FAMT | currency }}</td>
                  <td>{{ data.FIXPER | nanToDot }}%</td>

                  <td>{{ data.PLNMODEL | currency }}</td>
                  <td>{{ data.PLNQTY | currency }}</td>
                  <td>{{ data.PLNAMT | currency }}</td>
                  <td>{{ data.PLNPER | currency }}%</td>

                  <td>{{ data.INMODEL | currency }}</td>
                  <td>{{ data.INQTY | currency }}</td>
                  <td>{{ data.INAMT | currency }}</td>
                  <td>{{ data.INPER | nanToDot }}%</td>

                  <td>{{ data.SMODEL | currency }}</td>
                  <td>{{ data.SQTY | currency }}</td>
                  <td>{{ data.SAMT | currency }}</td>
                  <td>{{ data.SQTYPER | nanToDot }}%</td>
                  <td>{{ data.SAMTPER | nanToDot }}%</td>

                  <td>{{ data.STOCKQTY | currency }}</td>
                  <td>{{ data.STOCKAMT | currency }}</td>
                </tr>
                <!-- 
                  < !-- TODO : 작년 데이터  -- >
                  <tr class="sub">
                  <td></td>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  < !-- TODO : 투입 -- >
                  <td></td>
                  <td>-</td>
                  <td>-</td>
                  <td></td>
                  < !-- TODO : 입고 - 수량, 금액 -- >
                  <td></td>
                  <td>-</td>
                  <td>-</td>
                  <td></td>
                  < !-- TODO : 판매 - 수량, 금액 -- >
                  <td></td>
                  <td>-</td>
                  <td>-</td>
                  < !-- TODO : 재고 - 수량, 금액 -- >
                  <td></td>
                  <td>-</td>
                  <td>-</td>
                </tr> -->
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'

export default {
  name: "PRO0103",
  components: {
    sideMenu,
  },
  props: {
    data: Object
  },
  mounted() {
    this.loadData()
  },
  created() {
    if (!this.data) {
      this.$router.replace("/ProductMain")
      return
    }
  },
  computed: {
    req2svr: () => req2svr,
    yearCodeList() {
      return this.$store.getters.getYearCodeList
    },
    headerTitle() {
      if (!this.data) {
        return ""
      }
      if (this.isTabTypeSU) {
        return this.$store.getters.getSUCDCODNM(this.data.code) + " 사업부 "
      } else {
        return this.$store.getters.getBRCDCODNM(this.data.code)
      }
    },
    headerTitleSub() {
      if (!this.data) {
        return ""
      }
      return this.data.year
    },
    isTabTypeSU() {
      return this.$store.getters.getPROList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getPROList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    }
  },
  data() {
    return {
      drawer: null,
      tableData: [],
      DATAST: null
    }
  },
  methods: {
    getMakeDataDate() {
      this.req2svr.getMakeDataDate().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DATAST = res.CREATEDATE;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    loadData() {
      if (this.yearCodeList.length <= 0) {
          return
      }
      this.getMakeDataDate()

      this.tableData = []
      let yearCode = this.$store.getters.getYearCode(Number(this.data.year))

      this.req2svr.getMonthlyDetailData(this.tabType, this.data.code, yearCode).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.tableData = []
            let i, item
            let list = JSON.parse("[" + res + "]")
            let seasonList = []
            for (i=0;i<4;i++) {
              item = _.filter(list, _.matches({ YSGU: yearCode + '0' + String(i + 1) }))
              if (item.length > 0) {
                seasonList.push(item)
                seasonList[seasonList.length-1].TITLE = this.seasonTitle(i) + "소계"
              }
            }
            item = _.filter(list, _.matches({ YSGU: "TOTAL" }))
            if (item.length > 0) {
              this.tableData.push(item)
              this.tableData[this.tableData.length-1].TITLE = "총계"
            }
            for (i=0;i<12;i++) {
              item = _.filter(list, _.matches({ YSGU: yearCode + String(i + 1) }))
              if (item.length > 0) {
                this.tableData.push(item)
                this.tableData[this.tableData.length-1].TITLE = i + 1 + "월"

                if ((i+1)%3 == 0) {
                  this.tableData.push(seasonList[((i+1)/3)-1])                
                }
              }              
            }
            if (this.tableData.length <= 3) {
              this.tableData.push(seasonList[0])                
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    seasonTitle(season) {
      if (season == 1) {
        return "Summer"
      } else if (season == 2) {
        return "Fall"
      } else if (season == 3) {
        return "Winter"
      }
      return "Spring"
    },
    toMain() {
      this.$router.replace("/")
    },
    toBack() {
      this.$router.replace({
          name: 'PRO0102',
          params: {
            data: { 
              code: this.data.code,
              year: this.data.year,
              season: this.data.season
            }
          }
      })
    },
    toFirst() {
      this.$router.replace({
          name: 'PRO0101',
          params: {
            data: { 
              code: this.data.code,
              year: this.data.year,
              season: this.data.season
            }
          }
      })
    },
    excelDownLoad(id1, id2) {
      var tab_text = ""
      tab_text += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      tab_text += '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
      tab_text += '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
      tab_text += '<x:Name>Sheet1</x:Name>'
      tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
      tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'
      tab_text += "<table border='2px'><tr bgcolor='#87AFC6'>"
      var textRange; var j=0,k=0;
      var tab1 = document.getElementById(id1); // id of table
      var tab2 = document.getElementById(id2); // id of table
      var sa;

      for(j = 0 ; j < tab1.rows.length ; j++) {
        tab_text=tab_text+tab1.rows[j].innerHTML+"</tr>"
      }

      for(k = 0 ; k < tab2.rows.length ; k++) {
        tab_text=tab_text+tab2.rows[k].innerHTML+"</tr>"
      }

      tab_text = tab_text+"</table>";
      tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); // remove if u want links in your table
      tab_text = tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
      tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

      var ua = window.navigator.userAgent
      var msie = ua.indexOf("MSIE ")

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { // If Internet Explorer
        txtArea1.document.open("txt/html","replace")
        txtArea1.document.write(tab_text)
        txtArea1.document.close()
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"다운로드.xls")
      } else if(ua.indexOf('Edge') > -1){ // If edge
        var blob = new Blob([tab_text], {type: 'data:application/vnd.ms-excel'})
        window.navigator.msSaveBlob(blob, '다운로드.xls')
      } else { //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text))
      }
      return (sa)
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