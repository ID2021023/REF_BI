  <template>
  <div class="wrap main" style="height: -webkit-fill-available;">
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
        <!-- Title -->
        <strong class="layout_title">
          <span class="txt_year">{{h_year}}</span>
          <em class="txt_month">{{h_month}}</em>
        </strong>
        <div class="layout_spacer"></div>
        <!-- daily report -->
        <div class="card">
          <div class="card_title">
            <div class="card_title_text teamSelector" @click="link('dailyReport')">
            <strong class="txt_date">{{today}} <i class="material-icons">play_circle_outline</i></strong>
            <span class="txt_s">
              Daily Report <small>(천원)</small>
            </span>
            </div>
          </div>
          <div class="card_content">
            <ul class="list_card">
              <li v-for="data in dr_H" :key="data.TEXT">
                <strong class="txt_brand">{{ data.TEXT }}</strong>
                <span class="txt_num">
                  {{ Math.round(data.SALE_TOT/1000) | currency }}
                  <small class="txt_num">
                    ({{ Math.round(rate(data.SALE_TOT, data.AMT)) | currency }} %)
                  </small>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col_md_3 teamSelector"
            v-for="(data, index) in dr_C"
            :key="data.TITLE"
            @click="link(data.TITLE)"
          >
            <!-- card -->
            <div class="card">
              <div class="card_title">
                <h3 class="card_title_text">{{ data.TITLE }}</h3>
                <small>({{f_year}}.{{Number(f_month) > 9 ? f_month : "0" + f_month}} 기준, 백만원)</small>
              </div>
              <div class="card_content">
                <div class="cont">
                  <!-- top box -->
                  <div class="cont_top">
                    <h4 class="tit_cont">당월</h4>
                    <!-- 숫자 카운트 : counter -->
                    <strong class="em_obj" :class="{fail: Number(data.RSLTAMT) < 0}">
                      <animated-number :number="data.RSLTAMT"></animated-number>
                    </strong>
                    <dl class="list_obj">
                      <dt class="tit">목표</dt>
                      <dd class="txt">{{ data.PLNAMT | currency }}</dd>
                    </dl>
                  </div>
                  <!-- 그래프 -->
                  <div class="graph">
                    <div :id="'goalchartdiv' + index" style="position: relative; width: 100%; height: 240px;"></div>
                  </div>
                </div>
                <div class="cont">
                  <!-- top box -->
                  <div class="cont_top">
                    <h4 class="tit_cont">누계</h4>
                    <strong class="em_obj" :class="{fail: Number(data.TOT_RSLTAMT) < 0}">
                      <animated-number :number="data.TOT_RSLTAMT"></animated-number>
                    </strong>
                    <dl class="list_obj">
                      <dt class="tit">목표</dt>
                      <dd class="txt">{{ data.TOT_PLNAMT | currency }}</dd>
                    </dl>
                  </div>
                  <!-- graph -->
                  <div class="graph">
                    <div :id="'resultchartdiv' + index" style="position: relative; width: 100%; height: 240px;"></div>
                  </div>
                </div>
              </div>
              <div class="card_box">
                <div class="list_box_s">
                  <div class="view">
                    <dl class="list_var" v-if="data.TITLE == '현금'">
                      <dt class="tit">당월 증감</dt>
                      <dd class="txt tr">
                        <i class="material-icons" :class="[Number(data.RSLTAMT) - Number(data.LMRSLTAMT) > 0 ? 'col_primary' : 'col_danger']">
                          {{ Number(data.RSLTAMT) - Number(data.LMRSLTAMT) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                        </i>
                        <strong>
                          {{ Number(data.RSLTAMT) - Number(data.LMRSLTAMT) > 0 ? '+' : '' }}{{ Number(data.RSLTAMT) - Number(data.LMRSLTAMT) | currency }}
                        </strong>
                        <span class="txt_t">(백만원)</span>
                      </dd>
                    </dl>
                    <dl class="list_var" v-else-if="data.TITLE == '영업이익B'">
                      <dt class="tit">당월 달성률</dt>
                      <dd class="txt" v-if="Number(data.PLNAMT) < 0 && Number(data.RSLTAMT) > 0">
                        <span class="txt_box2">흑자전환</span>
                      </dd>
                      <dd class="txt" v-else-if="Number(data.RSLTAMT) < 0">
                        <span class="txt_box" v-if="Number(data.PLNAMT) >= 0 && Number(data.RSLTAMT) < 0">적자전환</span>
                        <span class="txt_box" v-if="Number(data.PLNAMT) < 0 && Number(data.PLNAMT) < Number(data.RSLTAMT)">적자감소</span>
                        <span class="txt_box" v-if="Number(data.PLNAMT) < 0 && Number(data.PLNAMT) > Number(data.RSLTAMT)">적자증가</span>
                      </dd>
                      <dd class="txt" v-else>
                        <strong>{{ rate2(data.RSLTAMT, data.PLNAMT).toFixed(1) | nanToDot }}</strong><span class="txt_s">%</span>
                      </dd>
                    </dl>
                    <dl class="list_var" v-else>
                      <dt class="tit">당월 달성률</dt>
                      <dd class="txt">
                        <strong>{{ rate(data.RSLTAMT, data.PLNAMT).toFixed(1) | nanToDot }}</strong><span class="txt_s">%</span>
                      </dd>
                    </dl>
                    <!-- graph line bar -->
                    <strong class="graph line_bar" v-if="data.TITLE != '현금'">
                      <span class="bar" :style="{width:Math.round(rate2(data.RSLTAMT,data.PLNAMT)) +'%'}"></span>
                    </strong>
                  </div>
                  <div class="view">
                    <dl class="list_var" v-if="data.TITLE == '현금'">
                      <dt class="tit">누계 증감</dt>
                      <dd class="txt tr">
                        <i class="material-icons" :class="[Number(data.TOT_RSLTAMT) - Number(data.TOT_LMRSLTAMT) > 0 ? 'col_primary' : 'col_danger']">
                          {{ Number(data.TOT_RSLTAMT) - Number(data.TOT_LMRSLTAMT) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                        </i>
                        <strong>
                          {{ Number(data.TOT_RSLTAMT) - Number(data.TOT_LMRSLTAMT) > 0 ? '+' : '' }}{{ Number(data.TOT_RSLTAMT) - Number(data.TOT_LMRSLTAMT) | currency }}
                        </strong>
                        <span class="txt_t">(백만원)</span>
                      </dd>
                    </dl>
                    <dl class="list_var" v-else-if="data.TITLE == '영업이익B'">
                      <dt class="tit">누계 달성률</dt>
                      <dd class="txt" v-if="Number(data.TOT_PLNAMT) < 0 && Number(data.TOT_RSLTAMT) > 0">
                        <span class="txt_box2">흑자전환</span>
                      </dd>
                      <dd class="txt" v-else-if="Number(data.TOT_RSLTAMT) < 0">
                        <span class="txt_box" v-if="Number(data.TOT_PLNAMT) >= 0 && Number(data.TOT_RSLTAMT) < 0">적자전환</span>
                        <span class="txt_box" v-if="Number(data.TOT_PLNAMT) < 0 && Number(data.TOT_PLNAMT) < Number(data.TOT_RSLTAMT)">적자감소</span>
                        <span class="txt_box" v-if="Number(data.TOT_PLNAMT) < 0 && Number(data.TOT_PLNAMT) > Number(data.TOT_RSLTAMT)">적자증가</span>
                      </dd>
                      <dd class="txt" v-else>
                        <strong>{{ rate2(data.TOT_RSLTAMT, data.TOT_PLNAMT).toFixed(1) | nanToDot }}</strong><span class="txt_s">%</span>
                      </dd>
                    </dl>
                    <dl class="list_var" v-else>
                      <dt class="tit">누계 달성률</dt>
                      <dd class="txt">
                        <strong>{{ rate(data.TOT_RSLTAMT, data.TOT_PLNAMT).toFixed(1) | nanToDot }}</strong><span class="txt_s">%</span>
                      </dd>
                    </dl>
                    <!-- graph line bar -->
                    <strong class="graph line_bar" v-if="data.TITLE != '현금'">
                      <span class="bar" :style="{width:Math.round(rate2(data.TOT_RSLTAMT, data.TOT_PLNAMT)) +'%'}"></span>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_3 teamSelector" @click="link('stock')">
            <!-- card -->
            <div class="card light">
              <div class="card_title">
                <h3 class="card_title_text">재고</h3>
                <small>({{s_year}}.{{Number(s_month) > 9 ? s_month : "0" + s_month}} 기준, 백만원)</small>
              </div>
              <div class="card_box">
                <div class="list_box_s">
                  <div class="view" v-for="data in dr_S" :key="data.TITLE">
                    <dl class="list_var">
                      <dt class="tit" style="text-align:center">{{data.TITLE}}</dt>
                      <dd class="txt tr" style="text-align:center !important;">
                        <strong style="font-size: 36px;">{{ data.TOT1 | currency}}</strong>
                        <span class="txt_t" style="margin-top:10px">(백만원)</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="card_content">
                <div class="cont">
                  <!-- 그래프 -->
                  <div class="graph">
                    <div id="productchartdiv" style="position: relative; width: 100%; height: 390px;"></div>
                  </div>
                </div>
                <div class="cont">
                  <!-- 그래프 -->
                  <div class="graph">
                    <div id="resourcechartdiv" style="position: relative; width: 100%; height: 390px;"></div>
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
import req2svr from "./req2svr";
import sideMenu from '@/components/sideMenu'
import animatedNumber from '@/components/animatedNumber'

export default {
  name: "FIN0001",
  components: {
    sideMenu,
    animatedNumber
  },
  mounted() {
    this.getData()
  },
  created() {
    this.f_year = this.s_year = this.h_year
    this.f_month = this.s_month = this.h_month

    this.getRecentBIFN050Date()
    this.getRecentBIFN051Date()
  },
  data() {
    return {
      drawer: null,
      f_year: null,
      f_month: null,
      s_year: null,
      s_month: null,
      dr_H: [],
      dr_C: [
        { TITLE: "매출", PLNAMT: "0", RSLTAMT: "0", TOT_PLNAMT: "0", TOT_RSLTAMT: "0" },
        { TITLE: "현금", PLNAMT: "0", RSLTAMT: "0", LMRSLTAMT: "0", TOT_PLNAMT: "0", TOT_RSLTAMT: "0", TOT_LMRSLTAMT: "0" },
        { TITLE: "영업이익B", PLNAMT: "0", RSLTAMT: "0", TOT_PLNAMT: "0", TOT_RSLTAMT: "0" },
      ],
      dr_S: [
        { TITLE: "제품 재고 누적총액", TOT1: "0" },
        { TITLE: "원자재 재고 누적총액", TOT1: "0" }
      ]
    };
  },
  computed: {
    h_year() {
      return moment().format("YYYY");
    },
    h_month() {
      return moment().format("MM");
    },
    today() {
      return moment().subtract(1, "days").format("YYYY.MM.DD");
    },
    req2svr: () => req2svr,
    CODECardsList() {
      let FDRList = this.$store.getters.getFDRList
      for(var i=0; i<FDRList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:FDRList[i].MCODE})
        if (data) {
          FDRList[i].VISIBLE = true
        } else {
          FDRList[i].VISIBLE = false
        }
      }
      return FDRList
    },
    isTabTypeSU() {
      return this.$store.getters.getFDRList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getFDRList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[0]
      }
      return this.$store.getters.getAuthBRCDCode[0]
    },
    SUCDs() {
      return this.$store.getters.getSUCDList
    },
    yearCodes() {
      return this.$store.getters.getYearCodeList
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
    getRecentBIFN050Date() {
      let sql = "SELECT MAX(TO_NUMBER(YYYY)) YYYY, MAX(TO_NUMBER(MM)) MM FROM BIFN050 ";
      sql += "WHERE YYYY = (SELECT MAX(YYYY) FROM BIFN050)";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.f_year = res.YYYY;
            this.f_month = res.MM;

            this.getFinancialDatas()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getRecentBIFN051Date() {
      let sql = "SELECT MAX(TO_NUMBER(YYYY)) YYYY, MAX(TO_NUMBER(MM)) MM FROM BIFN051 ";
      sql += "WHERE YYYY = (SELECT MAX(YYYY) FROM BIFN051)";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.s_year = res.YYYY;
            this.s_month = res.MM;

            this.getStockDatas()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getData() {
      this.getDailySalesData()
      this.getFinancialDatas()
      this.getStockDatas()
    },
    getFinancialDatas() {
      this.getSaleData()
      this.getTotSaleData()
      this.getCashData()
      this.getTotCashData()
      this.getProfitData()
      this.getTotProfitData()
    },
    getStockDatas() {
      this.getStockData()
      this.getResourceData()
    },
    getDailySalesData() {
      let i
      let date = moment().subtract(1, "days").format("YYYYMMDD");
      this.dr_H = []
      for (i=0;i<this.authCodeList.length;i++) {
        let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
        if (data) {
          this.dr_H.push({ TEXT: this.authCodeList[i].CODNM, MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, AMT: 0 })
        }
      }
      // 사업부별 일매출, 달성률
      let sql = "SELECT SUNM, " + this.tabType + " MCODE, TARGETAMT AMT, SUM(JAMT+DCAMT+GAMT+ADVDEPAMT)AS SALE_TOT FROM BISL061 ";
      sql += "WHERE " + this.tabType + " IN ("
      for (i=0;i<this.authCodeList.length;i++) {
        sql += "'" + this.authCodeList[i].MCODE + "'"
        if (i < this.authCodeList.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND SALEDT = '" + date + "' ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BISL061) ";
      sql += "GROUP BY SUNM, " + this.tabType + ", AMT";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_H[i] = _.assign(this.dr_H[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }));
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleData() {
      let i
      // 매출 당월합계, 당월목표합계
      let sql = "SELECT SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT FROM ( ";
      sql += "SELECT SUCD, PLNAMT, RSLTAMT FROM BIFN050 ";
      sql += "WHERE SECGBN = '01' ";
      sql += "AND YYYY = '" + this.f_year + "' ";
      sql += "AND MM = '" + this.f_month + "' ";
      sql += "AND SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
      sql += "ORDER BY SUCD)"

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C[0] = _.assign(this.dr_C[0], res);
          }
          this.makeChart("goalchartdiv0", this.dr_C[0])
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getTotSaleData() {
      let i
      let month = this.f_month
      // 매출 누계합계, 누계목표합계
      if (this.f_year != moment().format("YYYY")) {
        month = "12"
      }
      let sql = "SELECT SUM(PLNAMT) TOT_PLNAMT, SUM(RSLTAMT) TOT_RSLTAMT FROM ( ";
      sql += "SELECT SUCD, PLNAMT, RSLTAMT FROM BIFN050 ";
      sql += "WHERE SECGBN = '01' ";
      sql += "AND YYYY = '" + this.f_year + "' ";
      sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " ";
      sql += "AND SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050) ";
      sql += "ORDER BY SUCD)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C[0] = _.assign(this.dr_C[0], res);
          }
          this.makeChart("resultchartdiv0", this.dr_C[0], true)
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCashData() {
      let i
      // 현금 당월합계, 당월목표합계
      let sql = "SELECT SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT, SUM(LMRSLTAMT) LMRSLTAMT FROM BIFN050 ";
      sql += "WHERE SECGBN = '02' ";
      sql += "AND YYYY = '" + this.f_year + "' ";
      sql += "AND MM = '" + this.f_month + "' ";
      sql += "AND SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C[1] = _.assign(this.dr_C[1], res);
          }
          this.makeChart("goalchartdiv1", this.dr_C[1])
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getTotCashData() {
      let i
      let month = this.f_month
      // 현금 누계합계, 누계목표합계
      if (this.f_year != moment().format("YYYY")) {
        month = "12"
      }

      let sql = "SELECT SUM(PLNAMT) TOT_PLNAMT, SUM(RSLTAMT) TOT_RSLTAMT, SUM(LYRSLTAMT) TOT_LMRSLTAMT FROM BIFN050 ";
      sql += "WHERE SECGBN = '02' ";
      sql += "AND YYYY = '" + this.f_year + "' ";
      sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " ";
      sql += "AND SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C[1] = _.assign(this.dr_C[1], res);
          }
          this.makeChart("resultchartdiv1", this.dr_C[1], true)
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getProfitData() {
      let i
      // 영업이익 당월합계, 당월목표합계
      let sql = "SELECT SUM(PLNAMT) PLNAMT, SUM(RSLTAMT) RSLTAMT FROM BIFN050 ";
      sql += "WHERE SECGBN = '05' ";
      sql += "AND YYYY = '" + this.f_year + "' ";
      sql += "AND MM = '" + this.f_month + "' ";
      sql += "AND SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C[2] = _.assign(this.dr_C[2], res);
          }
          this.makeChart("goalchartdiv2", this.dr_C[2])
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getTotProfitData() {
      let i
      let month = this.f_month
      // 영업이익 누계합계, 누계목표합계
      if (this.f_year != moment().format("YYYY")) {
        month = "12"
      }

      let sql = "SELECT SUM(PLNAMT) TOT_PLNAMT, SUM(RSLTAMT) TOT_RSLTAMT FROM BIFN050 ";
      sql += "WHERE SECGBN = '05' ";
      sql += "AND YYYY = '" + this.f_year + "' ";
      sql += "AND TO_NUMBER(MM) BETWEEN 1 AND " + month + " ";
      sql += "AND SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN050)";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_C[2] = _.assign(this.dr_C[2], res);
          }
          this.makeChart("resultchartdiv2", this.dr_C[2], true)
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStockData() {
      let i
      let month = this.s_month
      if (this.s_month.toString().length == 1) {
        month = "0" + this.s_month
      } else {
        month = this.s_month;
      }
      let date = this.s_year + month + "15"
      let currentYear = moment(date).format("YYYY")
      let currentMonth = moment(date).format("M")
      let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      let lastMonth = moment(date).subtract(1, 'month').format("M")
      let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      let yearCode = this.$store.getters.getYearCode(Number(currentYear))

      // 사업부별 재품제고 누적합계, 전월증감함계, 기말증감합계 그래프
      let sql = "SELECT PRDTYY, LM_1_TOT, CU_1_TOT, (LM_1_TOT+CU_1_TOT) TOT1, LM_2_TOT, CU_2_TOT, (LM_2_TOT+CU_2_TOT) TOT2, LM_3_TOT, CU_3_TOT, (LM_3_TOT+CU_3_TOT) TOT3, LM_4_TOT, CU_4_TOT, (LM_4_TOT+CU_4_TOT) TOT4 FROM ( "
      sql += "SELECT PRDTYY, SUM(LM_1_TOT) LM_1_TOT, SUM(CU_1_TOT) CU_1_TOT, SUM(LM_2_TOT) LM_2_TOT, SUM(CU_2_TOT) CU_2_TOT, SUM(LM_3_TOT) LM_3_TOT, SUM(CU_3_TOT) CU_3_TOT, SUM(LM_4_TOT) LM_4_TOT, SUM(CU_4_TOT) CU_4_TOT FROM ( "
      sql += "SELECT PRDTYY, LM_1_TOT, LM_2_TOT, LM_3_TOT, LM_4_TOT, 0 AS CU_1_TOT, 0 AS CU_2_TOT, 0 AS CU_3_TOT, 0 AS CU_4_TOT FROM ( "
      sql += "SELECT PRDTYY, SUM(STAMT) LM_1_TOT, SUM(LMSTAMT) LM_2_TOT, SUM(LYSTAMT) LM_3_TOT, SUM(LESTAMT) LM_4_TOT FROM BIFN051 "
      sql += "WHERE SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND PRDTYY < '" + yearCode + "' ";
      sql += "AND SECGBN = '04' "
      sql += "AND YYYY = '" + currentYear + "' "
      sql += "AND MM = '" + currentMonth + "' "
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY PRDTYY) "
      sql += "UNION ALL "
      sql += "SELECT PRDTYY, 0 AS LM_1_TOT, 0 AS LM_2_TOT, 0 AS LM_3_TOT, 0 AS LM_4_TOT, CU_1_TOT, CU_2_TOT, CU_3_TOT, CU_4_TOT FROM ( "
      sql += "SELECT PRDTYY, SUM(STAMT) CU_1_TOT, SUM(LMSTAMT) CU_2_TOT, SUM(LYSTAMT) CU_3_TOT, SUM(LESTAMT) CU_4_TOT FROM BIFN051 "
      sql += "WHERE SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND PRDTYY >= '" + yearCode + "' "
      sql += "AND SECGBN = '04' "
      sql += "AND YYYY = '" + currentYear + "' "
      sql += "AND MM = '" + currentMonth + "' "
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY PRDTYY) "
      sql += ")GROUP BY PRDTYY "
      sql += ") ORDER BY PRDTYY"

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.dr_S[0].TOT1 = _.sumBy(list, function(o) {return Number(o.TOT1)})
            this.makeChart2("productchartdiv", list, yearCode);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getResourceData() {
      let i
      let month = this.s_month
      if (this.s_month.toString().length == 1) {
        month = "0" + this.s_month;
      } else {
        month = this.s_month;
      }
      let date = this.s_year + month + "15"
      let currentYear = moment(date).format("YYYY")
      let currentMonth = moment(date).format("M")
      let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      let lastMonth = moment(date).subtract(1, 'month').format("M")
      let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      let yearCode = this.$store.getters.getYearCode(Number(currentYear))

      // 사업부별 재품제고 누적합계, 전월증감함계, 기말증감합계 그래프
      let sql = "SELECT PRDTYY, LM_1_TOT, CU_1_TOT, (LM_1_TOT+CU_1_TOT) TOT1, LM_2_TOT, CU_2_TOT, (LM_2_TOT+CU_2_TOT) TOT2, LM_3_TOT, CU_3_TOT, (LM_3_TOT+CU_3_TOT) TOT3, LM_4_TOT, CU_4_TOT, (LM_4_TOT+CU_4_TOT) TOT4 FROM ( "
      sql += "SELECT PRDTYY, SUM(LM_1_TOT) LM_1_TOT, SUM(CU_1_TOT) CU_1_TOT, SUM(LM_2_TOT) LM_2_TOT, SUM(CU_2_TOT) CU_2_TOT, SUM(LM_3_TOT) LM_3_TOT, SUM(CU_3_TOT) CU_3_TOT, SUM(LM_4_TOT) LM_4_TOT, SUM(CU_4_TOT) CU_4_TOT FROM ( "
      sql += "SELECT PRDTYY, LM_1_TOT, LM_2_TOT, LM_3_TOT, LM_4_TOT, 0 AS CU_1_TOT, 0 AS CU_2_TOT, 0 AS CU_3_TOT, 0 AS CU_4_TOT FROM ( "
      sql += "SELECT PRDTYY, SUM(STAMT) LM_1_TOT, SUM(LMSTAMT) LM_2_TOT, SUM(LYSTAMT) LM_3_TOT, SUM(LESTAMT) LM_4_TOT FROM BIFN051 "
      sql += "WHERE SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND PRDTYY < '" + yearCode + "' ";
      sql += "AND SECGBN = '03' "
      sql += "AND YYYY = '" + currentYear + "' "
      sql += "AND MM = '" + currentMonth + "' "
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY PRDTYY) "
      sql += "UNION ALL "
      sql += "SELECT PRDTYY, 0 AS LM_1_TOT, 0 AS LM_2_TOT, 0 AS LM_3_TOT, 0 AS LM_4_TOT, CU_1_TOT, CU_2_TOT, CU_3_TOT, CU_4_TOT FROM ( "
      sql += "SELECT PRDTYY, SUM(STAMT) CU_1_TOT, SUM(LMSTAMT) CU_2_TOT, SUM(LYSTAMT) CU_3_TOT, SUM(LESTAMT) CU_4_TOT FROM BIFN051 "
      sql += "WHERE SUCD IN ("
      for (i=0;i<this.SUCDs.length;i++) {
        sql += "'" + this.SUCDs[i].CODE + "'"
        if (i < this.SUCDs.length - 1) {
          sql += ","
        }
      }
      sql += ") ";
      sql += "AND PRDTYY >= '" + yearCode + "' "
      sql += "AND SECGBN = '03' "
      sql += "AND YYYY = '" + currentYear + "' "
      sql += "AND MM = '" + currentMonth + "' "
      sql += "AND CREATEDATE = (SELECT MAX(CREATEDATE) FROM BIFN051) ";
      sql += "GROUP BY PRDTYY) "
      sql += ")GROUP BY PRDTYY "
      sql += ") ORDER BY PRDTYY"

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.dr_S[1].TOT1 = _.sumBy(list, function(o) {return Number(o.TOT1)})
            this.makeChart2("resourcechartdiv", list, yearCode);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    link(val) {
      if (val == "dailyReport") {
        this.$router.push("/DailyReportDetail");
      } else if (val == "매출") {
        this.$router.push("/DailyReportSales");
      } else if (val == "현금") {
        this.$router.push("/DailyReportCash");
      } else if (val == "영업이익B") {
        this.$router.push("/DailyReportProfit");
      } else if (val == "stock") {
        this.$router.push("/DailyReportStock");
      } else {
        this.$router.replace("/DailyReport");
      }
    },
    toMain() {
      this.$router.replace("/")
    },
    makeChart(divName, val, isTot) {
      var data = [
        { category: "목표", value: val.PLNAMT, color: Number(val.PLNAMT) < 0 ? "#f1574e" : "#888888" },
        { category: "실적", value: val.RSLTAMT, color: Number(val.RSLTAMT) < 0 ? "#f1574e" : "#3f93f5" }
      ];
      if (isTot) {
        data = [
          { category: "목표", value: val.TOT_PLNAMT, color: Number(val.TOT_PLNAMT) < 0 ? "#f1574e" : "#888888" },
          { category: "실적", value: val.TOT_RSLTAMT, color: Number(val.TOT_RSLTAMT) < 0 ? "#f1574e" : "#3f93f5" }
        ] 
      }

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 0,
        columnWidth: 0.55,
        startDuration: 0.7,
        fontSize: 15,
        autoMarginOffset: 0,
        categoryAxis: {
          autoGridCount: false,
          axisAlpha: 0,
          axisColor: "#ced4da",
          color: "#ced4da",
          gridAlpha: 0,
          gridThickness: 0,
          gridPosition: "start"
        },
        graphs: [
          {
            colorField: "color",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            labelOffset: 10,
            labelPosition: "top",
            lineColorField: "color",
            color: "#ced4da",
            title: "graph 1",
            type: "column",
            valueField: "value",
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
        dataProvider: data
      });
    },
    makeChart2(divName, val, yearCode) {
      let alpha = [1, 0.7, 0.45, 0.3, 0.15]

      let prevCount = 0
      let data = [ { category: "이월" }, { category: "정상" } ]
      for (let i=0;i<val.length;i++) {
        if (val[i].PRDTYY < yearCode) {
          data[0]["value"+i] = Number(val[i].TOT1)
          data[0].PRDTYY = val[i].PRDTYY
          val[i].color = "#23c4d2"
          val[i].alpha = alpha[i]

          data[1]["value"+i] = 0
          prevCount = i
        } else {
          data[1]["value"+i] = Number(val[i].TOT1)
          data[1].PRDTYY = val[i].PRDTYY
          val[i].color = "#9879e8"
          val[i].alpha = alpha[i - prevCount - 1]

          data[0]["value"+i] = 0
        }
      }

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 30,
        columnWidth: 0.55,
        startDuration: 0.7,
        fontSize: 15,
        categoryAxis: {
          autoRotateAngle: 0,
          autoGridCount: false,
          axisAlpha: 0,
          axisColor: "#ced4da",
          color: "#ced4da",
          fontSize: 18,
          gridAlpha: 0,
          gridThickness: 0,
          titleBold: false
        },
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[0] ? val[0].alpha : 1,
            id: "AmGraph-1",
            title: val[0] ? val[0].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value0",
            labelPosition: "middle",
            labelText: val[0] ? val[0].PRDTYY : "",
            lineColor: val[0] ? val[0].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[1] ? val[1].alpha : 1,
            id: "AmGraph-2",
            title: val[1] ? val[1].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value1",
            labelPosition: "middle",
            labelText: val[1] ? val[1].PRDTYY : "",
            lineColor: val[1] ? val[1].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[2] ? val[2].alpha : 1,
            id: "AmGraph-3",
            title: val[2] ? val[2].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value2",
            labelPosition: "middle",
            labelText: val[2] ? val[2].PRDTYY : "",
            lineColor: val[2] ? val[2].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[3] ? val[3].alpha : 1,
            id: "AmGraph-4",
            title: val[3] ? val[3].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value3",
            labelPosition: "middle",
            labelText: val[3] ? val[3].PRDTYY : "",
            lineColor: val[3] ? val[3].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[4] ? val[4].alpha : "",
            id: "AmGraph-5",
            title: val[4] ? val[4].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value4",
            labelPosition: "middle",
            labelText: val[4] ? val[4].PRDTYY : "",
            lineColor: val[4] ? val[4].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[5] ? val[5].alpha : 1,
            id: "AmGraph-6",
            title: val[5] ? val[5].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value5",
            labelPosition: "middle",
            labelText: val[5] ? val[5].PRDTYY : "",
            lineColor: val[5] ? val[5].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[6] ? val[6].alpha : 1,
            id: "AmGraph-7",
            title: val[6] ? val[6].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value6",
            labelPosition: "middle",
            labelText: val[6] ? val[6].PRDTYY : "",
            lineColor: val[6] ? val[6].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[7] ? val[7].alpha : 1,
            id: "AmGraph-8",
            title: val[7] ? val[7].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value7",
            labelPosition: "middle",
            labelText: val[7] ? val[7].PRDTYY : "",
            lineColor: val[7] ? val[7].color : ""
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: val[8] ? val[8].alpha : 1,
            id: "AmGraph-9",
            title: val[8] ? val[8].PRDTYY : "",
            lineThickness: 0,
            type: "column",
            valueField: "value8",
            labelPosition: "middle",
            labelText: val[8] ? val[8].PRDTYY : "",
            lineColor: val[8] ? val[8].color : ""
          }
        ],
        valueAxes: [
          {
            id: "ValueAxis-1",
            stackType: "regular",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false
          }
        ],
        dataProvider: data
      });
    },
    rate(value, target) {
      let v = Number(value)
      let t = Number(target)
      if (t < 0) {
        return (1 + ((v-t)/Math.abs(t)))*100
      } else {
        return (v/t)*100
      }
    },
    rate2(value, target) {
      let v = Number(value)
      let t = Number(target)
      if (t < 0 && v < 0) {
        return 0
      } else if (t < 0) {
        return (1 + ((v-t)/Math.abs(t)))*100
      } else {
        return (v/t)*100
      }
    }
  }
};
</script>