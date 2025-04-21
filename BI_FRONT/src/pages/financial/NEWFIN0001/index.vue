  <template>
  <div class="wrap main" style="height: -webkit-fill-available; min-height:1010px;">
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
              <li>
                <strong class="txt_brand">사업부 전체</strong>
                <span class="txt_num">
                  {{ Math.round(SU_TOT_SALE_TOT/1000) | currency }}
                  <small class="txt_num">
                    ({{ Math.round(rate(SU_TOT_SALE_TOT, SU_TOT_AMT)) | currency }} %)
                  </small>
                </span>
              </li>
              <template v-for="data in dr_H">
              <li v-if="data.TEXT != 'CO'" :key="data.TEXT">
                <strong class="txt_brand">{{ data.TEXT }}</strong>
                <span class="txt_num">
                  {{ Math.round(data.SALE_TOT/1000) | currency }}
                  <small class="txt_num">
                    ({{ Math.round(rate(data.SALE_TOT, data.AMT)) | currency }} %)
                  </small>
                </span>
              </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="toggle_group tg_sty03">
          <label class="tg_btn" for="option-1" @click="changeGubun(1)">
            <input type="radio" id="option-1" class="tg_radio" name="options" value="1" checked="checked" v-model="selectedGubun" />
            <span class="btn_n point_box11 txt_label">전체</span>
          </label>
          <label class="tg_btn" for="option-2" @click="changeGubun(2)">
            <input type="radio" id="option-2" class="tg_radio" name="options" value="2" v-model="selectedGubun" />
            <span class="btn_n point_box11 txt_label">패션사업</span>
          </label>
          <label class="tg_btn" for="option-3" @click="changeGubun(3)">
            <input type="radio" id="option-3" class="tg_radio" name="options" value="3" v-model="selectedGubun" />
            <span class="btn_n point_box11 txt_label">미래성장사업</span>
          </label>
          <label class="tg_btn" for="option-4" @click="changeGubun(4)">
            <input type="radio" id="option-4" class="tg_radio" name="options" value="4" v-model="selectedGubun" />
            <span class="btn_n point_box11 txt_label">중단사업</span>
          </label>
        </div>
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
                          {{ Math.abs(Number(data.RSLTAMT) - Number(data.LMRSLTAMT)) | currency }}
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
                          {{ Math.abs(Number(data.TOT_RSLTAMT) - Number(data.TOT_LMRSLTAMT)) | currency }}
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
  name: "NEWFIN0001",
  components: {
    sideMenu,
    animatedNumber
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    this.getData()
  },
  created() {
    this.f_year = this.s_year = this.h_year
    this.f_month = this.s_month = this.h_month

    // 매출, 현금, 영업이익B 기준일
    this.getRecentBIFN050Date()
    // 재고 기준일
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
        { CATEGORY: "전체", TITLE: "매출", PLNAMT: "0", RSLTAMT: "0", TOT_PLNAMT: "0", TOT_RSLTAMT: "0" },
        { CATEGORY: "전체", TITLE: "현금", PLNAMT: "0", RSLTAMT: "0", LMRSLTAMT: "0", TOT_PLNAMT: "0", TOT_RSLTAMT: "0", TOT_LMRSLTAMT: "0" },
        { CATEGORY: "전체", TITLE: "영업이익B", PLNAMT: "0", RSLTAMT: "0", TOT_PLNAMT: "0", TOT_RSLTAMT: "0" },
      ],
      dr_S: [
        { TITLE: "제품 재고 누적총액", TOT1: "0" },
        { TITLE: "원자재 재고 누적총액", TOT1: "0" }
      ],
      selectedGubun: 1,
      SUCDs: [],
      SUCDList: [],
      SU_TOT_AMT: 0,
      SU_TOT_SALE_TOT: 0
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
      this.req2svr.getRecentBIFN050Date().then(
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
      this.req2svr.getRecentBIFN051Date().then(
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
    changeGubun(code){
      if(code == 1){
        this.selectedGubun = 1
        this.SUCDs = this.$store.getters.getSUCDList
        let i
        for(i=0; i<this.dr_C.length; i++){
          this.dr_C[i].CATEGORY = "전체"
        }
      } else if(code == 2){
        this.selectedGubun = 2
        this.SUCDs = this.$store.getters.getFasionSUCDList
        let i
        for(i=0; i<this.dr_C.length; i++){
          this.dr_C[i].CATEGORY = "패션사업"
        }
      } else if(code == 3){
        this.selectedGubun = 3
        this.SUCDs = this.$store.getters.getFutureSUCDList
        let i
        for(i=0; i<this.dr_C.length; i++){
          this.dr_C[i].CATEGORY = "미래성장사업"
        }
      } else if(code == 4){
        this.selectedGubun = 4
        this.SUCDs = this.$store.getters.getStopSUCDList
        let i
        for(i=0; i<this.dr_C.length; i++){
          this.dr_C[i].CATEGORY = "중단사업"
        }
      }
      this.SUCDList = _.map(this.SUCDs, 'CODE')
      // 매출, 현금, 영업이익B
      this.getFinancialDatas()
      // 재고
      this.getStockDatas()
    },
    getData() {
      // 디폴트 전체 사업부
      this.SUCDs = this.$store.getters.getSUCDList
      this.SUCDList = _.map(this.SUCDs, 'CODE')
      // 데일리 리포트
      this.getDailySalesData()
      // 매출, 현금, 영업이익B
      this.getFinancialDatas()
      // 재고
      this.getStockDatas()

      if(this.data){
        if(this.data.GUBUN == "전체"){
          this.changeGubun(1)
        } else if(this.data.GUBUN == "패션사업"){
          this.changeGubun(2)
        } else if(this.data.GUBUN == "미래성장사업"){
          this.changeGubun(3)
        } else if(this.data.GUBUN == "중단사업"){
          this.changeGubun(4)
        }
      }
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
      let authMCodeList = _.map(this.authCodeList, 'MCODE')

      this.req2svr.getDailySalesData(this.tabType, date, authMCodeList.toString()).then(
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
            console.log("dr_H1 >>>", this.authCodeList)
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_H[i] = _.assign(this.dr_H[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }));
              }
            }
            console.log("dr_H1 >>>", list)
            console.log("dr_H2 >>>", this.dr_H)

            _.forEach(this.dr_H, function(value, key) {
              if(value["MCODE"] == 3) {
                let map = _.find(list, {MCODE: '5'})
                value["AMT"] = Number(value["AMT"]) + Number(map["AMT"]);
                value["SALE_TOT"] = Number(value["SALE_TOT"]) + Number(map["SALE_TOT"]);
              }
            });

            for(let k=0;k<this.dr_H.length;k++){
              this.SU_TOT_AMT += Number(this.dr_H[k].AMT)
              this.SU_TOT_SALE_TOT += Number(this.dr_H[k].SALE_TOT)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleData() {
      this.req2svr.getSaleData(this.f_year, this.f_month, this.SUCDList.toString()).then(
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
      this.req2svr.getTotSaleData(this.f_year, this.f_month, this.SUCDList.toString()).then(
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
      this.req2svr.getCashData(this.f_year, this.f_month, this.SUCDList.toString()).then(
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
      this.req2svr.getTotCashData(this.f_year, this.f_month, this.SUCDList.toString()).then(
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
      this.req2svr.getProfitData(this.f_year, this.f_month, this.SUCDList.toString()).then(
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
      this.req2svr.getTotProfitData(this.f_year, this.f_month, this.SUCDList.toString()).then(
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
      let month = this.s_month
      if (this.s_month.toString().length == 1) {
        month = "0" + this.s_month
      }
      let date = this.s_year + month + "15"
      let currentYear = moment(date).format("YYYY")
      let currentMonth = moment(date).format("M")
      // let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      // let lastMonth = moment(date).subtract(1, 'month').format("M")
      // let lastYear = moment(date).subtract(1, 'year').format("YYYY")

      this.req2svr.getStockData(date, currentYear).then(
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
            this.makeChart2("productchartdiv", list)
            // this.makeChart2("productchartdiv", list, yearCode, fs_yearCode, fe_yearCode, du_yearCode)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getResourceData() {
      let month = this.s_month
      if (this.s_month.toString().length == 1) {
        month = "0" + this.s_month;
      } else {
        month = this.s_month;
      }
      let date = this.s_year + month + "15"
      let currentYear = moment(date).format("YYYY")
      // let currentMonth = moment(date).format("M")
      // let lastMonthYear = moment(date).subtract(1, 'month').format("YYYY")
      // let lastMonth = moment(date).subtract(1, 'month').format("M")
      // let lastYear = moment(date).subtract(1, 'year').format("YYYY")
      // 정상
      let yearCode = this.$store.getters.getYearCode(Number(currentYear))
      // 이월 시작
      let fs_yearCode = this.$store.getters.getYearCode(Number(currentYear-5))
      // 이월 끝
      let fe_yearCode = this.$store.getters.getYearCode(Number(currentYear-1))
      // 불용
      let du_yearCode = this.$store.getters.getYearCode(Number(currentYear-6))

      this.req2svr.getResourceData(date, currentYear, yearCode, fs_yearCode, fe_yearCode, du_yearCode, this.SUCDList.toString()).then(
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
            this.makeChart3("resourcechartdiv", list, yearCode, fs_yearCode, fe_yearCode, du_yearCode)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    link(val) {
      let cate = this.dr_C[0].CATEGORY
      let year = moment().format("YYYY")
      let month = moment().format("M")

      if (val == "dailyReport") {
        this.$router.push("/DailyReportDetail");
      } else if (val == "매출" && cate == "전체") {
        this.$router.push("/NewDailyReportSales");
      } else if (val == "매출" && (cate == "패션사업" || cate == "미래성장사업" || cate == "중단사업")) {
        this.$router.push({
          name: 'NEWFIN0202',
          params: {
            data: {
              choice: 1, // 당월,누적
              year: this.f_year, // 최신 데이터가 있는 년도
              month: this.f_month, // 최신 데이터가 있는 월
              gubun: 1, // 사업부,브랜드
              GUBUN: cate, // 패션,미래성장,중단
              fromMain: true // 메인에서 서브로 직접이동
            }
          }
        })
      } else if (val == "현금" && cate == "전체") {
        this.$router.push("/NewDailyReportCash");
      } else if (val == "현금" && (cate == "패션사업" || cate == "미래성장사업" || cate == "중단사업")) {
        this.$router.push({
          name: 'NEWFIN0302',
          params: {
            data: {
              choice: 1, // 당월,누적
              year: this.f_year, // 최신 데이터가 있는 년도
              month: this.f_month, // 최신 데이터가 있는 월
              gubun: 1, // 사업부,브랜드
              GUBUN: cate, // 패션,미래성장,중단
              fromMain: true // 메인에서 서브로 직접이동
            }
          }
        })
      } else if (val == "영업이익B" && cate == "전체") {
        this.$router.push("/NewDailyReportProfit");
      } else if (val == "영업이익B" && (cate == "패션사업" || cate == "미래성장사업" || cate == "중단사업")) {
        this.$router.push({
          name: 'NEWFIN0402',
          params: {
            data: {
              choice: 1, // 당월,누적
              year: this.f_year, // 최신 데이터가 있는 년도
              month: this.f_month, // 최신 데이터가 있는 월
              gubun: 1, // 사업부,브랜드
              GUBUN: cate, // 패션,미래성장,중단
              fromMain: true // 메인에서 서브로 직접이동
            }
          }
        })
      } else if (val == "stock" && cate == "전체") {
        this.$router.push("/NewDailyReportStock");
      } else if (val == "stock" && (cate == "패션사업" || cate == "미래성장사업" || cate == "중단사업")) {
        this.$router.push({
          name: 'NEWFIN0502',
          params: {
            data: {
              gubun: 1, // 사업부,브랜드
              GUBUN: cate, // 패션,미래성장,중단
              fromMain: true // 메인에서 서브로 직접이동
            }
          }
        })
      } else {
        this.$router.replace("/NewDailyReport");
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
        startDuration: 0.3,
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
    makeChart2(divName, val) {
      // let alpha = [1, 0.7, 0.45, 0.3, 0.15]
      let alpha = [1, 0.85, 0.70, 0.55, 0.40, 0.25, 0.1]

      let prevCount = 0
      let data = [ { category: "정상" }, { category: "이월" }, { category: "불용" } ]
      for (let i=0;i<val.length;i++) {
        // if(val[i].PRDTYY >= yearCode) {
        if(val[i].STOCK == "N") {
          data[0]["value"+i] = Number(val[i].TOT1)
          data[0].PRDTYY = val[i].PRDTYY
          val[i].color = "#9879e8"
          val[i].alpha = alpha[i - prevCount - 1]

          data[1]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].STOCK == "C") {
        // } else if(val[i].PRDTYY >= fs_yearCode && val[i].PRDTYY <= fe_yearCode) {
          data[1]["value"+i] = Number(val[i].TOT1)
          data[1].PRDTYY = val[i].PRDTYY
          val[i].color = "#23c4d2"
          val[i].alpha = alpha[i]
          prevCount = i
          
          data[0]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].STOCK == "U") {
        // } else if(val[i].PRDTYY <= du_yearCode) {
          data[2]["value"+i] = Number(val[i].TOT1)
          data[2].PRDTYY = val[i].PRDTYY
          val[i].color = "#ff0000"
          val[i].alpha = alpha[i - prevCount - 1]

          data[0]["value"+i] = 0
          data[1]["value"+i] = 0
        }
      }
      console.log("data >>> ", data, ", val >>>", val)

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 30,
        columnWidth: 0.55,
        startDuration: 0.3,
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
    makeChart3(divName, val, yearCode, fs_yearCode, fe_yearCode, du_yearCode) {
      // let alpha = [1, 0.7, 0.45, 0.3, 0.15]
      let alpha = [1, 0.85, 0.70, 0.55, 0.40, 0.25, 0.1]

      let prevCount = 0
      let data = [ { category: "정상" }, { category: "이월" }, { category: "불용" } ]
      for (let i=0;i<val.length;i++) {
        if(val[i].PRDTYY >= yearCode) {
          data[0]["value"+i] = Number(val[i].TOT1)
          data[0].PRDTYY = val[i].PRDTYY
          val[i].color = "#9879e8"
          val[i].alpha = alpha[i - prevCount - 1]

          data[1]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].PRDTYY >= fs_yearCode && val[i].PRDTYY <= fe_yearCode) {
          data[1]["value"+i] = Number(val[i].TOT1)
          data[1].PRDTYY = val[i].PRDTYY
          val[i].color = "#23c4d2"
          val[i].alpha = alpha[i]
          prevCount = i
          
          data[0]["value"+i] = 0
          data[2]["value"+i] = 0
        } else if(val[i].PRDTYY <= du_yearCode) {
          data[2]["value"+i] = Number(val[i].TOT1)
          data[2].PRDTYY = val[i].PRDTYY
          val[i].color = "#ff0000"
          val[i].alpha = alpha[i - prevCount - 1]

          data[0]["value"+i] = 0
          data[1]["value"+i] = 0
        }
      }

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 30,
        columnWidth: 0.55,
        startDuration: 0.3,
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