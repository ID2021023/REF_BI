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
        <!-- groups -->
        <div class="groups">
          <!-- select -->
          <div class="select_box" style="min-width:100px;">
            <select class="select" v-model="season" @change="chageSeason">
            <option v-for="(data, index) in season_options" :key="data" :value="index">{{ data }}</option>
            </select>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
        <div class="content">
            <!-- 테이블 -->
            <div class="tbl_sheet sheet_scroll tbl_right tbl_hover_none" style="height:100%;">
              <div class="thead_wrap">
                <table class="tbl tbl_center">
                  <colgroup>
                    <col style="width:10%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col />                            
                    <col style="width:14%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>계획</th>
                      <th>FIX</th>
                      <th>투입</th>
                      <th>입고</th>
                      <th>판매 (중국포함)</th>
                      <th>재고</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="tbody_wrap">
                <table class="tbl tbl_center">
                  <colgroup>
                    <col style="width:10%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col style="width:14%;" />
                    <col />                            
                    <col style="width:14%;" />
                  </colgroup>
                  <tbody v-for="(data, index) in tableData" :key="index" :class="{sum: index==0}">
                      <tr :class="{ table_backround: index == 0 }">
                        <th v-if="index == 0" rowspan="2">
                          <strong class="tit_row_all">{{ data.TITLE }}</strong>
                        </th>
                        <th v-else rowspan="2" class="teamSelector" @click="toDetail">
                            <strong class="tit_row_all">{{ data.TITLE }}</strong>
                        </th>
                        <td>
                            <!-- 계획 -->
                            <div class="list_box_s tbl_list_s">
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">M(개)</dt>
                                        <dd class="txt"><strong>{{ data.YSMODEL | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">수량(개)</dt>
                                        <dd class="txt"><strong>{{ data.YSQTY | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">금액(백만원)</dt>
                                        <dd class="txt"><strong>{{ data.YSAMT | currency }}</strong></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <!-- FIX -->
                            <div class="list_box_s tbl_list_s">
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">M(개)</dt>
                                        <dd class="txt"><strong>{{ data.FMODEL | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">수량(개)</dt>
                                        <dd class="txt"><strong>{{ data.FQTY | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">금액(백만원)</dt>
                                        <dd class="txt"><strong>{{ data.FAMT | currency }}</strong></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <!-- 투입 -->
                            <div class="list_box_s tbl_list_s">
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">M(개)</dt>
                                        <dd class="txt"><strong>{{ data.PLNMODEL | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">수량(개)</dt>
                                        <dd class="txt"><strong>{{ data.PLNQTY | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">금액(백만원)</dt>
                                        <dd class="txt"><strong>{{ data.PLNAMT | currency }}</strong></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <!-- 입고 -->
                            <div class="list_box_s tbl_list_s">
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">M(개)</dt>
                                        <dd class="txt"><strong>{{ data.INMODEL | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">수량(개)</dt>
                                        <dd class="txt"><strong>{{ data.INQTY | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">금액(백만원)</dt>
                                        <dd class="txt"><strong>{{ data.INAMT | currency }}</strong></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <!-- 판매 -->
                            <div class="list_box_s tbl_list_s">
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">수량(개)</dt>
                                        <dd class="txt"><strong>{{ data.SQTY | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">금액(백만원)</dt>
                                        <dd class="txt"><strong>{{ data.SAMT | currency }}</strong></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td>
                            <!-- 재고 -->
                            <div class="list_box_s tbl_list_s">
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">수량(개)</dt>
                                        <dd class="txt"><strong>{{ data.STOCKQTY | currency }}</strong></dd>
                                    </dl>
                                </div>
                                <div class="view">
                                    <dl class="list_var">
                                        <dt class="tit">금액(백만원)</dt>
                                        <dd class="txt"><strong>{{ data.STOCKAMT | currency }}</strong></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr :class="{ table_backround: index == 0 }">
                        <td></td>
                        <td>
                            <div class="graph_cont gc_s">
                                <span class="view">
                                    <span class="tit">계획대비 픽스율</span>
                                    <span class="txt_num">{{ data.FIXPER }}<small>%</small></span>
                                </span>
                                <strong class="graph line_bar">
                                    <span class="bar" :style="{ width: convertPercent(data.FIXPER) + '%' }"></span>
                                </strong>
                            </div>
                        </td>
                        <td>
                            <div class="graph_cont gc_s">
                                <span class="view">
                                    <span class="tit">픽스대비 투입율</span>
                                    <span class="txt_num">{{ data.PLNPER }}<small>%</small></span>
                                </span>
                                <strong class="graph line_bar">
                                    <span class="bar" :style="{ width: convertPercent(data.PLNPER) + '%' }"></span>
                                </strong>
                            </div>
                        </td>
                        <td>
                            <div class="graph_cont gc_s">
                                <span class="view">
                                    <span class="tit">투입대비 입고율</span>
                                    <span class="txt_num">{{ data.INPER }}<small>%</small></span>
                                </span>
                                <strong class="graph line_bar">
                                    <span class="bar" :style="{ width: convertPercent(data.INPER) + '%' }"></span>
                                </strong>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col_md_6 graph_cont gc_s">
                                    <span class="view">
                                        <span class="tit">(수량)<br />입고대비 판매율</span>
                                        <span class="txt_num">{{ data.SPERQTY }}<small>%</small></span>
                                    </span>
                                    <strong class="graph line_bar">
                                        <span class="bar" :style="{ width: convertPercent(data.SPERQTY) + '%' }"></span>
                                    </strong>
                                </div>
                                <div class="col_md_6 graph_cont gc_s">
                                    <span class="view">
                                        <span class="tit">(금액)<br />입고대비 판매율</span>
                                        <span class="txt_num">{{ data.SPERAMT }}<small>%</small></span>
                                    </span>
                                    <strong class="graph line_bar">
                                        <span class="bar" :style="{ width: convertPercent(data.SPERAMT) + '%' }"></span>
                                    </strong>
                                </div>
                            </div>                                    
                        </td>
                        <td></td>
                    </tr>
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
  name: "PRO0102",
  components: {
    sideMenu
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
    let yy = moment(this.data.year).format("YY")
    this.season_options.push(yy + " P")
    this.season_options.push(yy + " S")
    this.season_options.push(yy + " F")
    this.season_options.push(yy + " W")

    if (this.data.season == "SUMMER") {
      this.season = 1
    } else if (this.data.season == "FALL") {
      this.season = 2
    } else if (this.data.season == "WINTER") {
      this.season = 3
    } else {
      this.season = 0
    }
    
    // this.loadData() 중복
  },
  computed: {
    req2svr: () => req2svr,
    yearCodeList() {
      return this.$store.getters.getYearCodeList
    },
    seasonTitle() {
      if (this.season == 1) {
        return "Summer"
      } else if (this.season == 2) {
        return "Fall"
      } else if (this.season == 3) {
        return "Winter"
      }
      return "Spring"
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
      return this.data.year + " " + this.seasonTitle
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
      season: null,
      season_options: [],
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
      let YSCD = "'" + yearCode + "1', '" + yearCode + "2', '" + yearCode + "3'"
      if (this.season == 1) {
          YSCD = "'" + yearCode + "4', '" + yearCode + "5', '" + yearCode + "6'"
      } else if (this.season == 2) {
        YSCD = "'" + yearCode + "7', '" + yearCode + "8', '" + yearCode + "9'"
      } else if (this.season == 3) {
        YSCD = "'" + yearCode + "A', '" + yearCode + "B', '" + yearCode + "C'"
      }

      this.req2svr.getData(this.tabType, this.data.code, yearCode, this.addZero(this.season + 1), YSCD).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.tableData = []
            let list = JSON.parse("[" + res + "]")
            let item = _.find(list, { YSGU: yearCode + this.addZero(this.season + 1) })
            if (item) {
              this.tableData.push(item)
              this.tableData[this.tableData.length-1].TITLE = this.seasonTitle.toUpperCase() + " TOTAL"
            }
            item = _.find(list, { YSGU: yearCode + this.$store.getters.getMonthCode(Number(this.season*3 + 1)) })
            if (item) {
              this.tableData.push(item)
              this.tableData[this.tableData.length-1].TITLE = this.data.year + "-" + this.addZero(this.season*3 + 1)
            }
            item = _.find(list, { YSGU: yearCode + this.$store.getters.getMonthCode(Number(this.season*3 + 2)) })
            if (item) {
              this.tableData.push(item)
              this.tableData[this.tableData.length-1].TITLE = this.data.year + "-" + this.addZero(this.season*3 + 2)
            }
            item = _.find(list, { YSGU: yearCode + this.$store.getters.getMonthCode(Number(this.season*3 + 3)) })
            if (item) {
              this.tableData.push(item)
              this.tableData[this.tableData.length-1].TITLE = this.data.year + "-" + this.addZero(this.season*3 + 3)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    chageSeason() {
      this.loadData()
    },
    toMain() {
      this.$router.replace("/")
    },
    toDetail() {
      this.$router.push({
          name: 'PRO0103',
          params: {
            data: { 
              code: this.data.code,
              year: this.data.year,
              season: this.data.season

            }
          }
      })
    },
    toBack() {
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
    addZero(number) {
      return parseInt(number, 10) < 10 ? "0" + number : number
    },
    convertPercent(value) {
      var x
      if (value) {
        x = Number(value) > 100 ? 100 : Number(value)
      } else {
        x = 0
      }
      return x
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