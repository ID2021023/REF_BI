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
        <h2 class="layout_title">{{ headerTitle }} {{ gubunTitle }} 상세보기
          <small class="txt_date point_col1">
            {{ headerSubTitle }}
          </small>
        </h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ DATAST }}</small></div>
        <button type="button" class="btn_n btn" @click="excelDownLoad('exceldown_thead','exceldown_tbody')">다운로드</button>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <!-- 테이블 -->
        <div class="tbl_sheet sheet_scroll sheet_scroll_sty03 tbl_hover_none">
          <iframe id="txtArea1" style="display:none"></iframe>
          <div class="thead_wrap">
            <table id="exceldown_thead" class="tbl tbl_right">
              <colgroup>
                <col style="width:7%;"/>
                <col style="width:7%;"/>
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
                <col v-if="data.gubun == 1" />
                <col v-if="data.gubun == 1" />
                <col v-if="data.gubun == 1" />
              </colgroup>
              <thead>
                <tr>
                  <th rowspan="2">Month</th>
                  <th rowspan="2">계획<br>(천원)</th>
                  <th rowspan="2">구분</th>
                  <th colspan="3">발주</th>
                  <th colspan="3">입고</th>
                  <th colspan="4">출고</th>
                  <th v-if="data.gubun == 1" colspan="2">재고</th>
                  <!-- <th v-if="data.gubun == 1" colspan="3">재고</th> -->
                </tr>
                <tr>
                  <th>수량</th>
                  <th>금액(천원)</th>
                  <th>계획대비 발주율</th>
                  <th>수량</th>
                  <th>금액(천원)</th>
                  <th>계획대비 입고율</th>
                  <th>수량</th>
                  <th>금액(천원)</th>
                  <th>(수량)<br>입고대비 출고율</th>
                  <th>(금액)<br>입고대비 출고율</th>
                  <th v-if="data.gubun == 1">수량</th>
                  <th v-if="data.gubun == 1">금액(천원)</th>
                  <!-- <th v-if="data.gubun == 1">재고율</th> -->
                </tr>
              </thead>
            </table>
          </div>
          <div class="tbody_wrap">
            <table  id="exceldown_tbody" class="tbl tbl_right">
              <colgroup>
                <col style="width:7%;"/>
                <col style="width:7%;"/>
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
                <col v-if="data.gubun == 1" />
                <col v-if="data.gubun == 1" />
                <col v-if="data.gubun == 1" />
              </colgroup>
              <!-- 총계와 월을 tbody로 나눔 -->
              <tbody v-for="monthData in tableData" :key="monthData.TITLE" :class="{sum: monthData.TITLE=='총계', s_sum: monthData.TITLE.indexOf('소계') != -1}">
                <template v-for="(item, index) in monthData">
                <tr>
                  <th v-if="index == 0" :rowspan="(monthData.length*2)"><strong class="tit_row_all">{{monthData.TITLE}}</strong></th>

                  <td class="tc" v-if="index == 0" :rowspan="(monthData.length*2)">{{ Math.round(monthData.YSAMT/1000) | currency }}</td>

                  <th><span class="tit_row tc">{{item.SOJAENM}}</span></th>

                  <td class="tr">{{ item.ORQTY | currency }}</td>
                  <td class="tr">{{ Math.round(item.ORAMT/1000) | currency }}</td>
                  <td class="tr">{{ item.ORRATE | nanToDot }}%</td>

                  <td class="tr">{{ item.INQTY | currency }}</td>
                  <td class="tr">{{ Math.round(item.INAMT/1000) | currency }}</td>
                  <td class="tr">{{ item.INRATE | nanToDot }}%</td>

                  <td class="tr">{{ item.OUTQTY | currency }}</td>
                  <td class="tr">{{ Math.round(item.OUTAMT/1000) | currency }}</td>
                  <td class="tr">{{ item.OUTQTYRATE | nanToDot }}%</td>
                  <td class="tr">{{ item.OUTAMTRATE | nanToDot }}%</td>

                  <td v-if="data.gubun == 1" class="tr">{{ item.STOCKQTY | currency }}</td>
                  <td v-if="data.gubun == 1" class="tr">{{ Math.round(item.STOCKAMT/1000) | currency }}</td>
                  <!-- <td v-if="data.gubun == 1" class="tr">{{ item.STOCKAMTRATE | nanToDot }}%</td> -->
                </tr>
                <!-- TODO : 작년 데이터 -->
                <tr class="sub">
                  <td class="tc">전년동기</td>
                  <!-- TODO : 발주 -->
                  <td>{{ item.LASTYEAR.ORQTY | currency }}</td>
                  <td>{{ Math.round(item.LASTYEAR.ORAMT/1000) | currency }}</td>
                  <td>{{ item.LASTYEAR.ORRATE | nanToDot }}%</td>
                  <!-- TODO : 입고 - 수량, 금액 -->
                  <td>{{ item.LASTYEAR.INQTY | currency }}</td>
                  <td>{{ Math.round(item.LASTYEAR.INAMT/1000) | currency }}</td>
                  <td>{{ item.LASTYEAR.INRATE | nanToDot }}%</td>
                  <!-- TODO : 출고 - 수량, 금액 -->
                  <td>{{ item.LASTYEAR.OUTQTY | currency }}</td>
                  <td>{{ Math.round(item.LASTYEAR.OUTAMT/1000) | currency }}</td>
                  <td>{{ item.LASTYEAR.OUTQTYRATE | nanToDot }}%</td>
                  <td>{{ item.LASTYEAR.OUTAMTRATE | nanToDot }}%</td>
                  <!-- TODO : 재고 - 수량, 금액 -->
                  <td v-if="data.gubun == 1">{{ item.LASTYEAR.STOCKQTY | currency }}</td>
                  <td v-if="data.gubun == 1">{{ Math.round(item.LASTYEAR.STOCKAMT/1000) | currency }}</td>
                  <!-- <td v-if="data.gubun == 1">{{ item.LASTYEAR.STOCKAMTRATE | nanToDot }}%</td> -->
                </tr>
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
  name: "BUY0102",
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
      this.$router.replace("/BuyMain")
      return
    }
    // this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    yearCodeList() {
      return this.$store.getters.getYearCodeList
    },
    headerTitle() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getSUCDCODNM(this.data.code) + " 사업부 "
      } else {
        return this.$store.getters.getBRCDCODNM(this.data.code)
      }
    },
    gubunTitle() {
      if (this.data.gubun == 2) {
        return "부자재"
      } else if (this.data.gubun == 3) {
        return "임가공"
      } else if (this.data.gubun == 4) {
        return "완사입"
      }
      return "원자재"
    },
    headerSubTitle() {
      if (!this.data) {
        return ""
      }
      return this.data.year
    },
    isTabTypeSU() {
      return this.$store.getters.getBUYList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getBUYList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
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
    loadData() {
      this.getMakeDataDate()

      this.currentYear()
    },
    currentYear() {
      this.tableData = []
      let yearCode = this.$store.getters.getYearCode(Number(this.data.year))

      this.req2svr.getCurrentYearData(this.data.gubun, this.data.code, yearCode).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.tableData = []
            let i
            let list = JSON.parse("[" + res + "]")
            let seasonList = []
            for (i=0;i<4;i++) {
              item = _.filter(list, _.matches({ MONTH: yearCode + '0' + String(i + 1) }))
              if (item.length > 0) {
                for (let j=0;j<item.length;j++) {
                  item[j].LASTYEAR = {
                    INAMT:"-", INQTY:"-", INRATE:"-", MONTH:"-", ORAMT:"-", ORQTY:"-", ORRATE:"-",
                    OUTAMT:"-", OUTAMTRATE:"-", OUTQTY:"-", OUTQTYRATE:"-", SEQ:"-", SOJAENM:"-", STOCKAMT:"-",
                    STOCKAMTRATE:"-", STOCKQTY:"-", YSAMT:"-"
                  }
                }
                seasonList.push(item)
                seasonList[seasonList.length-1].TITLE = this.seasonTitle(i) + "소계"
                let totalData = _.find(item, { SOJAENM: "TOTAL" })
                seasonList[seasonList.length-1].YSAMT = totalData ? totalData.YSAMT : 0
              }
            }
            let item = _.filter(list, _.matches({ MONTH: "0" }))
            if (item.length > 0) {
              for (let j=0;j<item.length;j++) {
                item[j].LASTYEAR = {
                  INAMT:"-", INQTY:"-", INRATE:"-", MONTH:"-", ORAMT:"-", ORQTY:"-", ORRATE:"-",
                  OUTAMT:"-", OUTAMTRATE:"-", OUTQTY:"-", OUTQTYRATE:"-", SEQ:"-", SOJAENM:"-", STOCKAMT:"-",
                  STOCKAMTRATE:"-", STOCKQTY:"-", YSAMT:"-"
                }
              }
              this.tableData.push(item)
              this.tableData[this.tableData.length-1].TITLE = "총계"
              let totalData = _.find(item, { SOJAENM: "TOTAL" })
              this.tableData[this.tableData.length-1].YSAMT = totalData ? totalData.YSAMT : 0
            }
            let monthCode
            for (i=0;i<12;i++) {
              monthCode = this.$store.getters.getMonthCode(i+1)
              item = _.filter(list, _.matches({ MONTH: yearCode + monthCode }))
              if (item.length > 0) {
                for (let j=0;j<item.length;j++) {
                  item[j].LASTYEAR = {
                    INAMT:"-", INQTY:"-", INRATE:"-", MONTH:"-", ORAMT:"-", ORQTY:"-", ORRATE:"-",
                    OUTAMT:"-", OUTAMTRATE:"-", OUTQTY:"-", OUTQTYRATE:"-", SEQ:"-", SOJAENM:"-", STOCKAMT:"-",
                    STOCKAMTRATE:"-", STOCKQTY:"-", YSAMT:"-"
                  }
                }
                this.tableData.push(item)
                this.tableData[this.tableData.length-1].TITLE = (i + 1) + "월"
                let totalData = _.find(item, { SOJAENM: "TOTAL" })
                this.tableData[this.tableData.length-1].YSAMT = totalData ? totalData.YSAMT : 0

                if ((i+1)%3 == 0) {
                  this.tableData.push(seasonList[((i+1)/3)-1])                
                }
              }
            }
            if (this.tableData.length <= 3) {
              this.tableData.push(seasonList[0])                
            }
            this.lastYear()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    lastYear() {
      let yearCode = this.$store.getters.getYearCode(Number(this.data.year) - 1)
      // let currentYearCode = this.$store.getters.getYearCode(Number(this.data.year))

      this.req2svr.getLastYearData(this.data.gubun, this.data.code, yearCode).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = JSON.parse("[" + res + "]")
            let monthList, monthItem
            for (let i=0;i<list.length;i++) {
              if (list[i].MONTH == '0') {
                monthList = _.find(this.tableData, { TITLE: "총계" }) 
              } else if (list[i].MONTH.slice(0, 2) == (yearCode + "0")) {
                monthList = _.find(this.tableData, { TITLE: this.seasonTitle(list[i].MONTH.slice(2, 3)) + "소계" })
              } else {
                monthList = _.find(this.tableData, { TITLE: this.$store.getters.getMonthCodeToMonth(list[i].MONTH.slice(1, 2)) + "월" })
              }
              if (monthList) {
                monthItem = _.find(monthList, { SOJAENM: list[i].SOJAENM })
                if (monthItem) {
                  monthItem.LASTYEAR = list[i]
                }
              }  
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    toMain() {
      this.$router.replace("/")
    },
    toBack() {
      this.$router.replace({
          name: 'BUY0101',
          params: {
            data: { 
              code: this.data.code,
              year: this.data.year,
              gubun: this.data.gubun
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
    },
    addZero(number) {
      return parseInt(number, 10) < 10 ? "0" + number : number
    },
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