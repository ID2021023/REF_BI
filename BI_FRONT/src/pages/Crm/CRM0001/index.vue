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
      <div class="header_inner">
        <!-- tabs -->
        <div class="toggle_group">
          <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': selectedCODE == data.MCODE}">
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              :value="data.MCODE"
              v-model="selectedCODE"
              style="display:none"
              @click="changeCode(data.MCODE)"
              :disabled="!data.VISIBLE" 
            >
            <span class="btn_n txt_label">
              {{ data.CODNM }}
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="160" height="50" class="svg_bl">
                <path
                  class="A"
                  d="M53.06 21.13H56v8.83h-2.94zM26.02 28h-.05l-3.82-7H19v8.84h2.83l.02-6.03h.05l3.2 6.03h1.77l3.3-6.03h.04v6.03h2.58V21h-3.25L26 28zm78.4-2.9h-5.9v-4.07h-2.47v8.92h2.47v-3.8h5.9v3.8h2.5v-8.92h-2.5v4.07zM118.1 21l-4.87 9h2.08l1.45-2.45h4.74l1.45 2.45H125l-4.9-9zm1 2.43l.38.65-.4-.65zm-1.8 3.07l1.75-3.07 1.76 3.07zm18.8-5.5h-2l-4.87 9h2.08l1.45-2.45h4.74l1.4 2.45h2.1zm-2.78 5.5l1.76-3.07 1.76 3.07zm-55.6-3.95c2.1 0 2.88.88 3.24 1.42h2.44c-.44-1.26-2.35-3-5.68-3C74 21 71 23.17 71 25.46s2.86 4.46 6.73 4.46c2.6 0 4.8-1 5.68-2.9H81c-.55.87-1.6 1.2-3.24 1.2-2.53 0-4-1.3-4-2.77-.05-1.28 1.13-2.9 3.97-2.9z"
                ></path>
              </svg> -->
            </span>
          </label>
        </div>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ DATAST }}</small></div>
        <!-- groups -->
        <div class="groups">
          <div class="toggle_group tg_sty01">
            <label class="tg_btn" :class="{'is-checked': choice === 1}">
              <input
                type="radio"
                id="option-m"
                class="tg_radio"
                name="select"
                :value="1"
                v-model="choice"
                style="display:none"
                @click="openYear(1)"
              >
              <span class="btn_n txt_label">월간</span>
            </label>
            <label class="tg_btn" :class="{'is-checked': choice === 2}">
              <input
                type="radio"
                id="option-d"
                class="tg_radio"
                name="select"
                :value="2"
                v-model="choice"
                style="display:none"
                @click="closeMonth(2)"
              >
              <span class="btn_n txt_label">누적</span>
            </label>
          </div>
          <!-- select -->
          <div class="select_box" style="min-width:120px;">
            <select class="select" v-model="year" @change="chageDate">
              <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
            </select>
          </div>
          <!-- select -->
          <div v-show="choice == 1" class="select_box" style="min-width:90px;">
            <select class="select" v-model="month" @change="chageDate">
              <option v-for="data in m_options" :key="data" :value="data">{{ data }}월</option>
            </select>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col_md_6">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">매출비중 상위 3구간</strong>
                <div class="layout_spacer"></div>
                <span class="txt">(전체 구매고객 : {{ SAMT_GU_SALES_total | currency }}명)</span>
              </div>
              <div class="cont">
                <div class="list_num list_h list_sty01 list_h_sty01">
                  <ul class="list">
                    <li v-for="(data, index) in SAMT_GU_SALES_best3" :key="index" style="pointer-events:none">
                      <div class="num_box">{{index+1}}</div>
                      <strong class="txt_name">{{ data.GRADE }}
                        <em class="txt_result">({{ data.CNT | nanToDot }}명)</em>
                      </strong>
                      <!-- graph -->
                      <div class="graph img_bar">
                        <div class="graph_wrap">
                          <div class="bar" v-if="data.CNT > 0" :style="{ height : Math.round(data.CNT/SAMT_GU_SALES_total*100) + '%' }"></div>
                          <div class="bar" v-else style="height:0%"></div>
                        </div>
                        <p class="txt_num">{{ Math.round(data.CNT/SAMT_GU_SALES_total * 100) | nanToDot }}
                          <small class="txt">%</small>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt" v-if="choice == 1">1인당 월평균 매출액(객단가)</strong>
                <strong class="tit_txt" v-else-if="choice == 2">1인당 누적평균 매출액(객단가)</strong>
                <div class="layout_spacer"></div>
              </div>
              <div class="cont">
                <div class="row">
                  <div class="col_md_8">
                    <div class="list_num list_stripe list_sty01">
                      <ul class="list">
                        <li v-for="(data, index) in AGE_GU_DATA_average_list" :key="index" style="pointer-events:none">
                          <strong class="txt_name">
                            <span class="num_box">{{index+1}}</span>{{ data.GRADE }}
                          </strong>
                          <span class="txt_result">{{ Math.round(data.SAMT/data.AGE_GU_CNT / 1000) | currency }} 천원</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col_md_4">
                    <div class="result_view">
                      <dl>
                        <dt class="tit">당월
                          <br>1인당 월평균 매출액
                        </dt>
                        <dd class="txt_result">{{ Math.round(AGE_GU_DATA_average_total / 1000) | currency }}
                          <small class="txt">천원</small>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_6">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{'on': gubun == 1}">
                      <a href="javascript:void(0);" @click="tabVal('1')">고객 가입현황</a>
                    </li>
                    <li :class="{'on': gubun == 2}">
                      <a href="javascript:void(0);" @click="tabVal('2')">제품 판매현황</a>
                    </li>
                    <li :class="{'on': gubun == 3}">
                      <a href="javascript:void(0);" @click="tabVal('3')">고객 매출현황</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="cont">
                <div class="graph_box">
                  <!-- 기본 그래프만 넣을때 -->
                  <div class="graph_area"  v-show="gubun == 1">
                    <div class="graph_view" style="width:33%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:345px; float:left;">
                          <div id="chartdiv0" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="graph_view" style="width:33%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="font-family: Dotum; position:relative; width:100%; height:345px; float:left;">
                          <div id="chartdiv1" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="graph_view" style="width:33%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:345px; float:left;">
                          <div id="chartdiv2" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="graph_area"  v-show="gubun == 2">
                    <div class="graph_view" style="width:50%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv6" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="graph_view" style="width:50%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv7" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="graph_area"  v-show="gubun == 3">
                    <div class="graph_view" style="width:50%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; padding: 30px 0px 30px 30px; width:100%; height:300px;">
                          <div id="chartdiv13" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="graph_view" style="width:50%;">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; padding: 30px 0px; width:100%; height:300px;">
                          <div id="chartdiv14" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="graph_box" v-show="gubun == 1">
                  <div class="graph_area">
                    <!-- 그래프 2 -->
                    <div class="graph_view" style="width:50%;">
                      <div class="graph">
                        <div style="position:relative; padding: 0px 20px; width:70%; height:345px; float:left;">
                          <div id="chartdiv3" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="graph_view" style="width:50%;">
                      <div class="graph">                        
                        <div style="position:relative; padding: 0px 20px; width:70%; height:345px; float:left;">
                          <div id="chartdiv4" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="graph_view">
                      <div class="graph">                        
                        <div style="position:relative; padding: 0px 20px; width:100%; height:345px; float:left;">
                          <div id="chartdiv5" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
                <div class="graph_box" v-show="gubun == 2">
                  <!-- 타이틀 있을때 -->
                  <div class="tit">
                    연령대별 복종 선호도
                    <div class="select_box">
                      <select class="select select_s" v-model="age_sort_type" @change="makeAgeSortChart">
                        <option :value="1">금액기준</option>
                        <option :value="2">수량기준</option>
                      </select>
                    </div>
                  </div>
                  <div class="graph_area gv_line">
                    <!-- 그래프 1 -->
                    <div class="graph_view" style="width:20%;">
                      <!-- 칩 -->
                      <span class="chip chip_m"><span class="chip_text">29세 이하</span></span>
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv8" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <!-- 그래프 2 -->
                    <div class="graph_view" style="width:20%;">
                      <!-- 칩 -->
                      <span class="chip chip_m"><span class="chip_text">30대</span></span>
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv9" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <!-- 그래프 3 -->
                    <div class="graph_view" style="width:20%;">
                      <!-- 칩 -->
                      <span class="chip chip_m"><span class="chip_text">40대</span></span>
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv10" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <!-- 그래프 4 -->
                    <div class="graph_view" style="width:20%;">
                      <!-- 칩 -->
                      <span class="chip chip_m"><span class="chip_text">50대</span></span>
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv11" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                    <!-- 그래프 5 -->
                    <div class="graph_view" style="width:20%;">
                      <!-- 칩 -->
                      <span class="chip chip_m"><span class="chip_text">60세 이상</span></span>
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; width:100%; height:280px; float:left;">
                          <div id="chartdiv12" style="position:relative; width:100%; height:100%; float:left;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="graph_box" v-show="gubun == 3">
                  <div class="graph_area">
                    <!-- 그래프 2 -->
                    <div class="graph_view">
                      <!-- 그래프 -->
                      <div class="graph">
                        <div style="position:relative; padding:30px; width:100%; height:380px; float:left;">
                          <div id="chartdiv15" style="position:relative; width:100%; height:100%; float:left;"></div>
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
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'

export default {
  name: "FIN0001",
  components: {
    sideMenu
  },
  mounted() {
    this.loadData()

    this.tabVal(this.gubun)
  },
  created() {
    this.year = moment().format("YYYY");
    this.month = moment().format("M");

    for (var i = 0; i < 3; i++) {
      this.y_options[i] = this.year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    for (var i = 0; i < 12; i++) {
      this.m_options[i] = 12 - i;
    }
    this.m_options = _.sortBy(this.m_options)

    this.selectedCODE = this.authCodeList[0].MCODE
  },
  data() {
    return {
      drawer: null,
      y_options: [],
      m_options: [],
      selectedCODE: null,
      choice: 1,
      gubun: 1,
      year: "",
      month: "",
      DATAST: null,
      age_sort_type: 1,
      SAMT_GU_SALES: [
        // {GRADE:"0원 미만", SAMT_GU:"00", CNT:0},
        {GRADE:"0~50만원 미만", SAMT_GU:"01", CNT:0},
        {GRADE:"50~100만원 미만", SAMT_GU:"02", CNT:0},
        {GRADE:"100~150만원 미만", SAMT_GU:"03", CNT:0},
        {GRADE:"150~200만원 미만", SAMT_GU:"04", CNT:0},
        {GRADE:"200~250만원 미만", SAMT_GU:"05", CNT:0},
        {GRADE:"250~300만원 미만", SAMT_GU:"06", CNT:0},
        {GRADE:"300만원 이상", SAMT_GU:"07", CNT:0}
      ],
      AGE_GU_DATA: [     
        {GUBUN: "29세 이하", GRADE:"29세 이하", AVR:0, AGE_GU:"01", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "30대", GRADE:"30대(30~39세)", AVR:0, AGE_GU:"02", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "40대", GRADE:"40대(40~49세)", AVR:0, AGE_GU:"03", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "50대", GRADE:"50대(50~59세)", AVR:0, AGE_GU:"04", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "60세 이상", GRADE:"60세 이상", AVR:0, AGE_GU:"05", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0}
      ],
      AGE_GU_ITEM_DATA: [],
      CUSTOMER_CURRENT_MONTH: {},
      CUSTOMER_CURRENT_SALES_DIFF: [
        {GRADE:"29세 이하", AGE_GU:"01", NEW_SAMT:0, SAMT:0},
        {GRADE:"30대", AGE_GU:"02", NEW_SAMT:0, SAMT:0},
        {GRADE:"40대", AGE_GU:"03", NEW_SAMT:0, SAMT:0},
        {GRADE:"50대", AGE_GU:"04", NEW_SAMT:0, SAMT:0},
        {GRADE:"60세 이상", AGE_GU:"05", NEW_SAMT:0, SAMT:0}
      ],
      NEW_CUSTOMER_AGE_COUNT: [
        {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
        {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
        {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
        {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
        {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
      ],
      NEW_CUSTOMER_AGE_COUNT_DIFF: [],
      CURRENT_CUSTOMER_AGE_COUNT: [
        {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
        {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
        {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
        {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
        {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
      ],
      CURRENT_CUSTOMER_AGE_COUNT_DIFF: [],
      DORMANCY_CUSTOMER_AGE_COUNT: [
        {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
        {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
        {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
        {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
        {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
      ]
    };
  },
  computed: {
    req2svr: () => req2svr,
    SAMT_GU_SALES_best3() {
      return _.orderBy(this.SAMT_GU_SALES, function(o) { return Number(o.CNT) }, 'desc').slice(0, 3)
    },
    SAMT_GU_SALES_total() {
      return _.sumBy(this.SAMT_GU_SALES, function(o) { return Number(o.CNT) })
    },
    AGE_GU_DATA_average_list() {
      return _.orderBy(this.AGE_GU_DATA, function(o) { return (Number(o.SAMT) / Number(o.AGE_GU_CNT)) }, 'desc')
    },
    AGE_GU_DATA_average_total() {
      return _.sumBy(this.AGE_GU_DATA, function(o) { return (Number(o.SAMT)) }) / _.sumBy(this.AGE_GU_DATA, function(o) { return (Number(o.AGE_GU_CNT)) })
    },
    CODECardsList() {
      let CRMList = this.$store.getters.getCRMList
      for(var i=0; i<CRMList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:CRMList[i].MCODE})
        if (data) {
          CRMList[i].VISIBLE = true
        } else {
          CRMList[i].VISIBLE = false
        }
      }
      return CRMList
    },
    isTabTypeSU() {
      return this.$store.getters.getCRMList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getCRMList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[2]
      }
      return this.$store.getters.getAuthBRCDCode[2]
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
    openYear(value) {
      this.choice = value
      this.year = moment().format("YYYY");
      this.month = moment().format("M");

      this.loadData();
    },
    closeMonth(value) {
      this.choice = value
      this.year = moment().format("YYYY");
      this.month = moment().format("M");

      this.loadData();
    },
    tabVal(val) {
      if (val == "1") {
        this.gubun = 1;
      } else if (val == "2") {
        this.gubun = 2;
      } else if (val == "3") {
        this.gubun = 3;
      }
    },
    makeNewCustomerCountChart() {
      this.makeChart1("신규고객수", this.NEW_CUSTOMER_AGE_COUNT, 0)
    },
    makeCustomerCountChart() {
      this.makeChart1("구매고객수", this.CURRENT_CUSTOMER_AGE_COUNT, 1)
    },
    makeDormancyCustomerChart() {
      this.makeChart1("휴면고객수", this.DORMANCY_CUSTOMER_AGE_COUNT, 2)
    },
    makeNewCustomerDiffChart() {
      this.makeChart2("신규고객수 비교(명)", this.NEW_CUSTOMER_AGE_COUNT_DIFF, 3)
    },
    makeCustomerDiffChart() {
      this.makeChart2("구매고객수 비교(명)", this.CURRENT_CUSTOMER_AGE_COUNT_DIFF, 4)
    },
    makeAgeDataChart() {
      this.makeChart3(this.AGE_GU_DATA, 6, true)
      this.makeChart3(this.AGE_GU_DATA, 7)
    },
    makeAgeSortChart() {
      this.makeChart7(this.AGE_GU_ITEM_DATA[0], 8)
      this.makeChart7(this.AGE_GU_ITEM_DATA[1], 9)
      this.makeChart7(this.AGE_GU_ITEM_DATA[2], 10)
      this.makeChart7(this.AGE_GU_ITEM_DATA[3], 11)
      this.makeChart7(this.AGE_GU_ITEM_DATA[4], 12)
    },
    makeCustomerCurrentMonthChart() {
      this.makeChart4(this.CUSTOMER_CURRENT_MONTH, 13);
      this.makeChart5(this.CUSTOMER_CURRENT_MONTH, 14);
    },
    makeCustomerSalesDiffChart() {
      this.makeChart6(this.CUSTOMER_CURRENT_SALES_DIFF, 15);
    },
    changeCode(code) {
      this.selectedCODE = code
      this.loadData()
    },
    chageDate() {
      this.loadData()
    },
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      this.getMakeDataDate()
      this.getDataBest3()
      if (this.gubun == 1) {
        this.loadDataTab1()
        this.loadDataTab2()
        this.loadDataTab3()
      } else if (this.gubun == 2) {
        this.loadDataTab2()
        this.loadDataTab3()
        this.loadDataTab1()
      } else if (this.gubun == 3) {
        this.loadDataTab3()
        this.loadDataTab2()
        this.loadDataTab1()
      }
    },
    loadDataTab1() {
      this.getDataNewCustomerCount()
      this.getDataCurrentCustomerCount()
      this.getDataDormancyCustomerCount()
      this.getDataNewCustomerCountDiff()
      this.getDataCurrentCustomerCountDiff()
    },
    loadDataTab2() {
      this.getDataAgeData()
      this.getDataAgeItemData()
    },
    loadDataTab3() {
      this.getDataCustomerCurrentMonth()
      this.getDataCustomerSalesDiff()
    },
    currency(value) {
      var x = value.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");

      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    },
    getDataBest3: function() {
      this.SAMT_GU_SALES = [
        // {GRADE:"0원 미만", SAMT_GU:"00", CNT:0},
        {GRADE:"0~50만원 미만", SAMT_GU:"01", CNT:0},
        {GRADE:"50~100만원 미만", SAMT_GU:"02", CNT:0},
        {GRADE:"100~150만원 미만", SAMT_GU:"03", CNT:0},
        {GRADE:"150~200만원 미만", SAMT_GU:"04", CNT:0},
        {GRADE:"200~250만원 미만", SAMT_GU:"05", CNT:0},
        {GRADE:"250~300만원 미만", SAMT_GU:"06", CNT:0},
        {GRADE:"300만원 이상", SAMT_GU:"07", CNT:0}
      ]
      // 매출비중 상위 3 구간
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getSalesBest3(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {
          this.SAMT_GU_SALES = [
            // {GRADE:"0원 미만", SAMT_GU:"00", CNT:0},
            {GRADE:"0~50만원 미만", SAMT_GU:"01", CNT:0},
            {GRADE:"50~100만원 미만", SAMT_GU:"02", CNT:0},
            {GRADE:"100~150만원 미만", SAMT_GU:"03", CNT:0},
            {GRADE:"150~200만원 미만", SAMT_GU:"04", CNT:0},
            {GRADE:"200~250만원 미만", SAMT_GU:"05", CNT:0},
            {GRADE:"250~300만원 미만", SAMT_GU:"06", CNT:0},
            {GRADE:"300만원 이상", SAMT_GU:"07", CNT:0}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            // this.SAMT_GU_SALES[0] = _.assign(this.SAMT_GU_SALES[0], _.find(list, { SAMT_GU: "00" }))
            this.SAMT_GU_SALES[1] = _.assign(this.SAMT_GU_SALES[1], _.find(list, { SAMT_GU: "01" }))
            this.SAMT_GU_SALES[2] = _.assign(this.SAMT_GU_SALES[2], _.find(list, { SAMT_GU: "02" }))
            this.SAMT_GU_SALES[3] = _.assign(this.SAMT_GU_SALES[3], _.find(list, { SAMT_GU: "03" }))
            this.SAMT_GU_SALES[4] = _.assign(this.SAMT_GU_SALES[4], _.find(list, { SAMT_GU: "04" }))
            this.SAMT_GU_SALES[5] = _.assign(this.SAMT_GU_SALES[5], _.find(list, { SAMT_GU: "05" }))
            this.SAMT_GU_SALES[6] = _.assign(this.SAMT_GU_SALES[6], _.find(list, { SAMT_GU: "06" }))
            this.SAMT_GU_SALES[7] = _.assign(this.SAMT_GU_SALES[7], _.find(list, { SAMT_GU: "07" }))
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataAgeData: function() {
      this.AGE_GU_DATA = [
        {GUBUN: "29세 이하", GRADE:"29세 이하", AVR:0, AGE_GU:"01", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "30대", GRADE:"30대(30~39세)", AVR:0, AGE_GU:"02", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "40대", GRADE:"40대(40~49세)", AVR:0, AGE_GU:"03", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "50대", GRADE:"50대(50~59세)", AVR:0, AGE_GU:"04", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
        {GUBUN: "60세 이상", GRADE:"60세 이상", AVR:0, AGE_GU:"05", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0}
      ]
      // 연령대별 고객 매출, 판매품목수, 객단가
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getDataByAge(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {
          this.AGE_GU_DATA = [
            {GUBUN: "29세 이하", GRADE:"29세 이하", AVR:0, AGE_GU:"01", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
            {GUBUN: "30대", GRADE:"30대(30~39세)", AVR:0, AGE_GU:"02", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
            {GUBUN: "40대", GRADE:"40대(40~49세)", AVR:0, AGE_GU:"03", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
            {GUBUN: "50대", GRADE:"50대(50~59세)", AVR:0, AGE_GU:"04", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0},
            {GUBUN: "60세 이상", GRADE:"60세 이상", AVR:0, AGE_GU:"05", AGE_GU_CNT:0, SAMT:0, SQTY_CNT:0}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.AGE_GU_DATA[0] = _.assign(this.AGE_GU_DATA[0], _.find(list, { AGE_GU: "01" }));
            this.AGE_GU_DATA[1] = _.assign(this.AGE_GU_DATA[1], _.find(list, { AGE_GU: "02" }));
            this.AGE_GU_DATA[2] = _.assign(this.AGE_GU_DATA[2], _.find(list, { AGE_GU: "03" }));
            this.AGE_GU_DATA[3] = _.assign(this.AGE_GU_DATA[3], _.find(list, { AGE_GU: "04" }));
            this.AGE_GU_DATA[4] = _.assign(this.AGE_GU_DATA[4], _.find(list, { AGE_GU: "05" }));
          }
          this.makeAgeDataChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataAgeItemData: function() {
      // 연령대별 복종 선호도 그래프
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getItemDataByAge(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {
          this.AGE_GU_ITEM_DATA = []    
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.AGE_GU_ITEM_DATA.push(_(list).filter(item => item.AGE_GU == '01').value())
            this.AGE_GU_ITEM_DATA.push(_(list).filter(item => item.AGE_GU == '02').value())
            this.AGE_GU_ITEM_DATA.push(_(list).filter(item => item.AGE_GU == '03').value())
            this.AGE_GU_ITEM_DATA.push(_(list).filter(item => item.AGE_GU == '04').value())
            this.AGE_GU_ITEM_DATA.push(_(list).filter(item => item.AGE_GU == '05').value())
          }
          this.makeAgeSortChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataNewCustomerCount() {
      this.NEW_CUSTOMER_AGE_COUNT =  [
        {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
        {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
        {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
        {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
        {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
      ]
      // 신규 고객 수
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getNewCustomerCount(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {
          this.NEW_CUSTOMER_AGE_COUNT =  [
            {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
            {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
            {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
            {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
            {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.NEW_CUSTOMER_AGE_COUNT[0] = _.assign(this.NEW_CUSTOMER_AGE_COUNT[0], _.find(list, { AGE_GU: "01" }));
            this.NEW_CUSTOMER_AGE_COUNT[1] = _.assign(this.NEW_CUSTOMER_AGE_COUNT[1], _.find(list, { AGE_GU: "02" }));
            this.NEW_CUSTOMER_AGE_COUNT[2] = _.assign(this.NEW_CUSTOMER_AGE_COUNT[2], _.find(list, { AGE_GU: "03" }));
            this.NEW_CUSTOMER_AGE_COUNT[3] = _.assign(this.NEW_CUSTOMER_AGE_COUNT[3], _.find(list, { AGE_GU: "04" }));
            this.NEW_CUSTOMER_AGE_COUNT[4] = _.assign(this.NEW_CUSTOMER_AGE_COUNT[4], _.find(list, { AGE_GU: "05" }));
          }
          this.makeNewCustomerCountChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataNewCustomerCountDiff() {
      this.NEW_CUSTOMER_AGE_COUNT_DIFF = []
      // 신규 고객 수 기간 비교
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month + "15"
      let currentMonth = moment(date).format("YYYYMM")
      let lastYear = moment(date).subtract(1, 'year').endOf('month').format("YYYY")
      let lastYearMonth = moment(date).subtract(1, 'year').endOf('month').format("YYYYMM")
      let lastMonth = moment(date).subtract(1, 'month').endOf('month').format("YYYYMM")

      this.req2svr.getNewCustomerCountByPeriod(this.choice, lastYearMonth, lastMonth, currentMonth, this.year, month, lastYear, this.tabType, this.selectedCODE).then(
        res => {  
          this.NEW_CUSTOMER_AGE_COUNT_DIFF = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            if(this.choice == 1) {
              this.NEW_CUSTOMER_AGE_COUNT_DIFF.push({category:"전년동월", result:res.LY_CNT, color:"#bdedf1"})
              this.NEW_CUSTOMER_AGE_COUNT_DIFF.push({category:"전월", result:res.LM_CNT, color:"#7bdce4"})
              this.NEW_CUSTOMER_AGE_COUNT_DIFF.push({category:"당월", result:res.CU_CNT, color:"#23c4d2"})
            } else {
              this.NEW_CUSTOMER_AGE_COUNT_DIFF.push({category:"전년동기", result:res.LY_CNT, color:"#bdedf1"})
              this.NEW_CUSTOMER_AGE_COUNT_DIFF.push({category:"당년", result:res.CU_CNT, color:"#23c4d2"})

            }
          }
          this.makeNewCustomerDiffChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataCurrentCustomerCount() {
      this.CURRENT_CUSTOMER_AGE_COUNT = [
        {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
        {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
        {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
        {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
        {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
      ]
      // 구매 고객 수
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getCurrentCustomerCount(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {
          this.CURRENT_CUSTOMER_AGE_COUNT = [
            {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
            {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
            {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
            {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
            {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.CURRENT_CUSTOMER_AGE_COUNT[0] = _.assign(this.CURRENT_CUSTOMER_AGE_COUNT[0], _.find(list, { AGE_GU: "01" }));
            this.CURRENT_CUSTOMER_AGE_COUNT[1] = _.assign(this.CURRENT_CUSTOMER_AGE_COUNT[1], _.find(list, { AGE_GU: "02" }));
            this.CURRENT_CUSTOMER_AGE_COUNT[2] = _.assign(this.CURRENT_CUSTOMER_AGE_COUNT[2], _.find(list, { AGE_GU: "03" }));
            this.CURRENT_CUSTOMER_AGE_COUNT[3] = _.assign(this.CURRENT_CUSTOMER_AGE_COUNT[3], _.find(list, { AGE_GU: "04" }));
            this.CURRENT_CUSTOMER_AGE_COUNT[4] = _.assign(this.CURRENT_CUSTOMER_AGE_COUNT[4], _.find(list, { AGE_GU: "05" }));
          }
          this.makeCustomerCountChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataCurrentCustomerCountDiff() {
      this.CURRENT_CUSTOMER_AGE_COUNT_DIFF = []
      // 구매 고객 수 기간 비교
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month + "15"
      let currentMonth = moment(date).format("YYYYMM")
      let lastYear = moment(date).subtract(1, 'year').endOf('month').format("YYYY")
      let lastYearMonth = moment(date).subtract(1, 'year').endOf('month').format("YYYYMM")
      let lastMonth = moment(date).subtract(1, 'month').endOf('month').format("YYYYMM")

      this.req2svr.getCurrentCustomerCountByPeriod(this.choice, lastYearMonth, lastMonth, currentMonth, this.year, month, lastYear, this.tabType, this.selectedCODE).then(
        res => {
          this.CURRENT_CUSTOMER_AGE_COUNT_DIFF = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            if(this.choice == 1) {
              this.CURRENT_CUSTOMER_AGE_COUNT_DIFF.push({category:"전년동월", result:res.LY_CNT, color:"#edcdfd"})
              this.CURRENT_CUSTOMER_AGE_COUNT_DIFF.push({category:"전월", result:res.LM_CNT, color:"#db9dfb"})
              this.CURRENT_CUSTOMER_AGE_COUNT_DIFF.push({category:"당월", result:res.CU_CNT, color:"#c35bf8"})
            } else {
              this.CURRENT_CUSTOMER_AGE_COUNT_DIFF.push({category:"전년동기", result:res.LY_CNT, color:"#edcdfd"})
              this.CURRENT_CUSTOMER_AGE_COUNT_DIFF.push({category:"당년", result:res.CU_CNT, color:"#c35bf8"})
            }
          }
          this.makeCustomerDiffChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataDormancyCustomerCount() {
      this.DORMANCY_CUSTOMER_AGE_COUNT = [
        {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
        {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
        {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
        {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
        {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
      ]
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month + "01"
      if (moment(date).diff(moment()) >= 0) {
        this.makeDormancyCustomerChart()
        return
      }

      this.req2svr.getDormancyCustomerCount(this.tabType, this.selectedCODE).then(
        res => {
          this.DORMANCY_CUSTOMER_AGE_COUNT = [
            {GRADE:"29세 이하", AGE_GU:"01", AGE_GU_CNT:0},
            {GRADE:"30대", AGE_GU:"02", AGE_GU_CNT:0},
            {GRADE:"40대", AGE_GU:"03", AGE_GU_CNT:0},
            {GRADE:"50대", AGE_GU:"04", AGE_GU_CNT:0},
            {GRADE:"60세 이상", AGE_GU:"05", AGE_GU_CNT:0}
          ]
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.DORMANCY_CUSTOMER_AGE_COUNT[0] = _.assign(this.DORMANCY_CUSTOMER_AGE_COUNT[0], _.find(list, { AGE_GU: "01" }));
            this.DORMANCY_CUSTOMER_AGE_COUNT[1] = _.assign(this.DORMANCY_CUSTOMER_AGE_COUNT[1], _.find(list, { AGE_GU: "02" }));
            this.DORMANCY_CUSTOMER_AGE_COUNT[2] = _.assign(this.DORMANCY_CUSTOMER_AGE_COUNT[2], _.find(list, { AGE_GU: "03" }));
            this.DORMANCY_CUSTOMER_AGE_COUNT[3] = _.assign(this.DORMANCY_CUSTOMER_AGE_COUNT[3], _.find(list, { AGE_GU: "04" }));
            this.DORMANCY_CUSTOMER_AGE_COUNT[4] = _.assign(this.DORMANCY_CUSTOMER_AGE_COUNT[4], _.find(list, { AGE_GU: "05" }));
          }
          this.makeDormancyCustomerChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataCustomerCurrentMonth() {
      this.CUSTOMER_CURRENT_MONTH = {}
      // 당월 고객 매출 합계
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getSumSalesForCurrentMonth(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {
          this.CUSTOMER_CURRENT_MONTH = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.CUSTOMER_CURRENT_MONTH = res
          }
          this.makeCustomerCurrentMonthChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getDataCustomerSalesDiff() {
      this.CUSTOMER_CURRENT_SALES_DIFF = [
        {GRADE:"29세 이하", AGE_GU:"01", NEW_SAMT:0, SAMT:0},
        {GRADE:"30대", AGE_GU:"02", NEW_SAMT:0, SAMT:0},
        {GRADE:"40대", AGE_GU:"03", NEW_SAMT:0, SAMT:0},
        {GRADE:"50대", AGE_GU:"04", NEW_SAMT:0, SAMT:0},
        {GRADE:"60세 이상", AGE_GU:"05", NEW_SAMT:0, SAMT:0}
      ]
      // 고객 매출액 비교
      let month = this.month
      if (this.month.toString().length == 1) {
          month = "0" + this.month
      }
      let date = this.year + "" + month

      this.req2svr.getCustomerSalesDataByAge(this.choice, date, this.year, this.tabType, this.selectedCODE).then(
        res => {   
          this.CUSTOMER_CURRENT_SALES_DIFF = [
            {GRADE:"29세 이하", AGE_GU:"01", NEW_SAMT:0, SAMT:0},
            {GRADE:"30대", AGE_GU:"02", NEW_SAMT:0, SAMT:0},
            {GRADE:"40대", AGE_GU:"03", NEW_SAMT:0, SAMT:0},
            {GRADE:"50대", AGE_GU:"04", NEW_SAMT:0, SAMT:0},
            {GRADE:"60세 이상", AGE_GU:"05", NEW_SAMT:0, SAMT:0}
          ]       
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            this.CUSTOMER_CURRENT_SALES_DIFF[0] = _.assign(this.CUSTOMER_CURRENT_SALES_DIFF[0], _.find(list, { AGE_GU: "01" }));
            this.CUSTOMER_CURRENT_SALES_DIFF[1] = _.assign(this.CUSTOMER_CURRENT_SALES_DIFF[1], _.find(list, { AGE_GU: "02" }));
            this.CUSTOMER_CURRENT_SALES_DIFF[2] = _.assign(this.CUSTOMER_CURRENT_SALES_DIFF[2], _.find(list, { AGE_GU: "03" }));
            this.CUSTOMER_CURRENT_SALES_DIFF[3] = _.assign(this.CUSTOMER_CURRENT_SALES_DIFF[3], _.find(list, { AGE_GU: "04" }));
            this.CUSTOMER_CURRENT_SALES_DIFF[4] = _.assign(this.CUSTOMER_CURRENT_SALES_DIFF[4], _.find(list, { AGE_GU: "05" }));
          }
          this.makeCustomerSalesDiffChart()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    makeChart1(title, val, index) {
      let divName = "chartdiv" + index;
      let total = this.currency(_.sumBy(val, function(o) { return (Number(o.AGE_GU_CNT)) }))
      let data = val;

      AmCharts.makeChart(divName, {
        type: "pie",
        startEffect: "easeOutSine",
        balloonText:
          "[[title]]<br><b>[[value]]</b> ([[percents]]%)</span>",
        innerRadius: "77%",
        labelRadius: 0,
        startRadius: "20%",
        radius: "25%",
        labelText: "[[title]]<br>([[value]]명)",
        accessibleLabel: "[[title]]: [[percents]]",
        colors: ["#ff7f92", "#3f93f5", "#6964d7", "#ffb83c", "#a3e326"],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "GRADE",
        valueField: "AGE_GU_CNT",
        fontFamily: "GothamBold",
        fontSize: 12,
        allLabels: [
          {
            align: "center",
            id: "label-1",
            text: title,
            y: "40%"
          },
          {
            align: "center",
            id: "Label-2",
            size: 30,
            text: total,
            y: "44%",
            fontFamily: "GothamBold"
          },
          {
            align: "center",
            id: "Label-3",
            text: "(명)",
            y: "55%"
          }
        ],
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
        dataProvider: data
      });
    },
    makeChart2(title, val, index) {
      let divName = "chartdiv" + index;
      let data = val

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        columnSpacing: 0,
        columnWidth: 0.4,
        startDuration: 0.7,
        fontSize: 18,
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
            valueField: "result",
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
            text: title,
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      });
    },
    makeChart3(val, index, isCount) {
      let title = isCount ? "판매품목수" : "고객매출액"
      let divName = "chartdiv" + index;
      let sum = isCount ? _.sumBy(val, function(o) { return (Number(o.SQTY_CNT)) }) : Math.round(_.sumBy(val, function(o) { return (Number(o.SAMT)) }) / 1000000)
      sum = this.currency(sum)
      let list = isCount ? 
                    _(val).map(item => { item.RESULT = Number(item.SQTY_CNT)
                                          return item
                                        }).value() :
                    _(val).map(item => { item.RESULT = Math.round(Number(item.SAMT) / 1000000)
                                          return item
                                        }).value()

      AmCharts.makeChart(divName, {
        type: "pie",
        startEffect: "easeOutSine",
        balloonText:
          "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        innerRadius: "77%",
        labelRadius: 0,
        startRadius: "20%",
        labelText: isCount ? "[[title]]<br>([[value]]개)" : "[[title]]<br>([[value]]백만원)",
        accessibleLabel: "[[title]]: [[percents]]",
        colors: ["#ff7f92", "#3f93f5", "#6964d7", "#ffb83c", "#a3e326"],
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "GUBUN",
        valueField: "RESULT",
        fontSize: 17,
        allLabels: [
          {
            align: "center",
            id: "label-1",
            text: title,
            y: "38%"
          },
          {
            align: "center",
            id: "Label-2",
            size: 30,
            text: sum,
            y: "44%"
          },
          {
            align: "center",
            id: "Label-3",
            text: isCount ? "(개)" : "(백만원)",
            y: "56%"
          }
        ],
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
    makeChart4(val, index) {
      let text = ""
      if(this.choice == 1){
        text = "당월 고객매출합계 (백만원)"
      } else if(this.choice == 2){
        text = "누적 고객매출합계 (백만원)"
      }
      let divName = "chartdiv" + index;
      let data = []
      let total = this.currency(Math.round((Number(val.NEW_SAMT) + Number(val.SAMT)) / 1000000))
      data.push({TITLE: "신규고객매출", RESULT: Math.round(Number(val.NEW_SAMT) / 1000000), color: "#23c4d2"})
      data.push({TITLE: "기존고객매출", RESULT: Math.round(Number(val.SAMT) / 1000000), color: "#c35bf8"})

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "TITLE",
        rotate: true,
        colors: ["#23c4d2", "#c35bf8"],
        startDuration: 1,
        fontSize: 18,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0.26,
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
            // labelPosition: "right",
            title: "graph 1",
            type: "column",
            valueField: "RESULT",
            colorField: "color",
            lineThickness: 0,
            columnWidth: 0.7,
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
        titles: [
          {
            bold: false,
            id: "Title-1",
            size: 20,
            text: text,
          },
          {
            id: "Title-2",
            size: 15,
            text: "  ",
          },
          {
            id: "Title-2",
            size: 50,
            text: total,
          }
        ],
        dataProvider: data
      });
    },
    makeChart5(val, index) {
      let divName = "chartdiv" + index;
      let data = []
      let percent = Math.round((Number(val.NEW_SAMT) / (Number(val.NEW_SAMT) + Number(val.SAMT))) * 100)
      data.push({TITLE: "신규고객매출", RESULT: Math.round((Number(val.NEW_SAMT) / (Number(val.NEW_SAMT) + Number(val.SAMT))) * 100), color: "#23c4d2"})
      data.push({TITLE: "기존고객매출", RESULT: Math.round((Number(val.SAMT) / (Number(val.NEW_SAMT) + Number(val.SAMT))) * 100), color: "#ededed"})

      AmCharts.makeChart(divName, {
        type: "pie",
        startEffect: "easeOutSine",
        balloonText:
          "[[TITLE]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        innerRadius: "77%",
        labelRadius: -5,
        labelText: "",
        pullOutRadius: "0%",
        startRadius: "20%",
        accessibleLabel: "[[TITLE]]: [[percents]]",
        colors: ["#23c4d2", "#ededed"],
        gradientRatio: [],
        labelTickColor: "#FFFFFF",
        startDuration: 0.5,
        startEffect: "easeInSine",
        titleField: "TITLE",
        valueField: "RESULT",
        fontSize: 18,
        percentPrecision: 0,
        precision: 0,
        allLabels: [
          {
            align: "center",
            id: "label-1",
            text: "신규 고객",
            y: "23%"
          },
          {
            align: "center",
            id: "label-1",
            text: "매출비중",
            y: "33%"
          },
          {
            align: "center",
            id: "Label-2",
            size: 38,
            text: percent,
            y: "43%"
          },
          {
            align: "center",
            id: "Label-3",
            text: "(%)",
            y: "62%"
          }
        ],
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
        dataProvider: data
      });
    },
    makeChart6(val, index) {
      let divName = "chartdiv" + index;
      let data = _(val).map(item => { 
                            item.NEW_SAMT = Math.round(Number(item.NEW_SAMT) / 1000000)
                            item.SAMT = Math.round(Number(item.SAMT) / 1000000)
                            return item
                          }).value()

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "GRADE",
        colors: ["#23c4d2", "#c35bf8"],
        startDuration: 0.7,
        marginTop: 30,
        fontSize: 18,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0.26,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: "신규고객매출",
            columnWidth: 0.4,
            type: "column",
            valueField: "NEW_SAMT",
            markerType: "circle"
          },
          {
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            columnWidth: 0.4,
            title: "기존고객매출",
            type: "column",
            valueField: "SAMT",
            markerType: "circle"
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false,
            minorGridAlpha: 0,
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 18,
          position: "absolute",
          top: 25,
          left: 40
        },
        titles: [
          {
            id: "Title-1",
            size: 20,
            text: "고객 매출액 비교 (백만원)"
          }
        ],
        dataProvider: data
      });
    },
    makeChart7(val, index) {
      let sum = this.age_sort_type == "1" ?
        _.sumBy(val, function(o) { return Number(o.SAMT) }) : _.sumBy(val, function(o) { return Number(o.SQTY) })
      let data = this.age_sort_type == "1" ?
         _.orderBy(val, function(o) { return Number(o.SAMT) }, 'desc').slice(0, 3) :
        _.orderBy(val, function(o) { return Number(o.SQTY) }, 'desc').slice(0, 3)

      if (data.length > 0) {
        data[0].color = "#3f93f5"
        data[1].color = "#ff7f92"
        data[2].color = "#a3e326"
      }
  
      let list = this.age_sort_type == "1" ?
                        _(data).map(item => { item.RESULT = Math.round((Number(item.SAMT) / sum) * 100)
                              return item
                            }).value() : 
                        _(data).map(item => { item.RESULT = Math.round((Number(item.SQTY) / sum) * 100)
                              return item
                            }).value()

      let divName = "chartdiv" + index;

      AmCharts.makeChart(divName, {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "ITEM",
        colors: ["#3f93f5", "#ff7f92", "#a3e326"],
        columnSpacing: 0,
        columnWidth: 0.4,
        startDuration: 0.7,
        fontSize: 15,
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
            labelText: "[[value]] %",
            labelPosition: "top",
            lineColorField: "color",
            type: "column",
            valueField: "RESULT"
          }
        ],
        guides: [],
        valueAxes: [
          {
            maximum: 100,
            id: "ValueAxis-1",
            axisAlpha: 0,
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: list
      });
    },
    toMain() {
      this.$router.replace("/")
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
};
</script>