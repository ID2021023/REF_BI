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
          <label
            class="tg_btn"
            v-for="data in CODECardsList"
            :class="{'is-checked': CODETab == data.MCODE}"
            :key="data.MCODE"
          >
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              style="display:none"
              :value="data.MCODE"
              v-model="CODETab"
              @click="changeCODE(data.MCODE)"
              :disabled="!data.VISIBLE"
            >
            <span class="btn_n txt_label">{{data.CODNM}}</span>
          </label>
        </div>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ DATAST }}</small></div>
        <!-- groups -->
        <div class="groups">
        <!-- select -->
        <div class="select_box" style="min-width:100px;">
            <select class="select" v-model="year" @change="chageDate">
            <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
            </select>
        </div>
        </div>
    </div>
    </header>
    <div class="container">
      <div class="content">
        <!-- 테이블 -->
        <div class="tbl_sheet tbl_mix">
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
                <th>시즌</th>
                <th>계획</th>
                <th>FIX</th>
                <th>투입</th>
                <th>입고</th>
                <th>판매 (중국포함)</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="noResult">
                <tr>
                  <td colspan="7">No Data</td>
                </tr>
              </template>
              <template v-else v-for="data in PRO_LIST">
                <tr>
                  <th rowspan="2" class="teamSelector" @click="toDetail(data.TITLE)">
                    <em class="txt_year">{{ data.TITLE }}</em>
                    <span class="txt_month">
                      <strong class="txt">{{ data.MONTH }}</strong>
                    </span>
                  </th>
                  <td>
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
                <tr>
                  <td></td>
                  <td>
                    <div class="graph_cont gc_s">
                        <span class="view">
                            <span class="tit">계획대비 픽스율</span>
                            <span class="txt_num">{{ data.FIXPER | currency }}<small>%</small></span>
                        </span>
                        <strong class="graph line_bar">
                            <span class="bar" :style="{width: convertPercent(data.FIXPER) +'%'}"></span>
                        </strong>
                    </div>
                  </td>
                  <td>
                      <div class="graph_cont gc_s">
                          <span class="view">
                              <span class="tit">픽스대비 투입율</span>
                              <span class="txt_num">{{ data.PLNPER | currency }}<small>%</small></span>
                          </span>
                          <strong class="graph line_bar">
                              <span class="bar" :style="{width: convertPercent(data.PLNPER) +'%'}"></span>
                          </strong>
                      </div>
                  </td>
                  <td>
                      <div class="graph_cont gc_s">
                          <span class="view">
                              <span class="tit">투입대비 입고율</span>
                              <span class="txt_num">{{ data.INPER | currency }}<small>%</small></span>
                          </span>
                          <strong class="graph line_bar">
                              <span class="bar" :style="{width: convertPercent(data.INPER) +'%'}"></span>
                          </strong>
                      </div>
                  </td>
                  <td>
                      <div class="row">
                          <div class="col_md_6 graph_cont gc_s">
                              <span class="view">
                                  <span class="tit">(수량)<br />입고대비 판매율</span>
                                  <span class="txt_num">{{ data.SPERQTY | currency }}<small>%</small></span>
                              </span>
                              <strong class="graph line_bar">
                                  <span class="bar" :style="{width: convertPercent(data.SPERQTY) +'%'}"></span>
                              </strong>
                          </div>
                          <div class="col_md_6 graph_cont gc_s">
                              <span class="view">
                                  <span class="tit">(금액)<br />입고대비 판매율</span>
                                  <span class="txt_num">{{ data.SPERAMT | currency }}<small>%</small></span>
                              </span>
                              <strong class="graph line_bar">
                                  <span class="bar" :style="{width: convertPercent(data.SPERAMT) +'%'}"></span>
                              </strong>
                          </div>
                      </div>                                    
                  </td>
                  <td></td>
                </tr>
              </template>
            </tbody>
          </table>
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
  name: "PRO0101",
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
    if (this.data) {
      this.year = this.data.year
      this.CODETab = this.data.code
    } else {
      this.year = moment().format("YYYY")
      this.CODETab = this.authCodeList[0].MCODE
    }

 this.year = "2019"


    let year = moment().format("YYYY")
    for (var i = 0; i < 3; i++) {
      this.y_options[i] = year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    // this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
      let PROList = this.$store.getters.getPROList
      for(var i=0; i<PROList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:PROList[i].MCODE})
        if (data) {
          PROList[i].VISIBLE = true
        } else {
          PROList[i].VISIBLE = false
        }
      }
      return PROList
    },
    isTabTypeSU() {
      return this.$store.getters.getPROList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getPROList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[3]
      }
      return this.$store.getters.getAuthBRCDCode[3]
    },
    yearCodeList() {
        return this.$store.getters.getYearCodeList
    }
  },
  data() {
    return {
      drawer: null,
      year: null,
      y_options: [],
      PRO_LIST: [],
      CODETab: 0,
      yearCode: null,
      DATAST: null,
      noResult: false
    }
  },
  methods: {
    loadData() {
        if (this.CODECardsList.length <= 0) {
            return
        }
        if (this.yearCodeList.length <= 0) {
            return
        }
        this.getProData()
    },
    chageDate() {
        this.getProData()
    },
    changeCODE(val) {
      this.CODETab = val
      this.getProData()
    },
    getProData(){
        this.PRO_LIST = []
        this.yearCode = this.$store.getters.getYearCode(Number(this.year))

        this.req2svr.getProData(this.tabType, this.CODETab, this.yearCode).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            if(res.MACHBASE_ERROR.indexOf("-100") > -1){
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          } else {
            this.noResult = false;
            this.PRO_LIST = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.PRO_LIST.push(res);
            } else {
              this.PRO_LIST = JSON.parse("[" + res + "]")
            }
          }

          for (var i=0;i<this.PRO_LIST.length;i++) {
            if (this.PRO_LIST[i].SEASON.indexOf("01") > -1) {
              this.PRO_LIST[i].TITLE = "SPRING";
              this.PRO_LIST[i].MONTH = "(1~3월)";
            } else if(this.PRO_LIST[i].SEASON.indexOf("02") > -1) {
              this.PRO_LIST[i].TITLE = "SUMMER";
              this.PRO_LIST[i].MONTH = "(4~6월)";
            } else if(this.PRO_LIST[i].SEASON.indexOf("03") > -1) {
              this.PRO_LIST[i].TITLE = "FALL";
              this.PRO_LIST[i].MONTH = "(7~9월)";
            } else if(this.PRO_LIST[i].SEASON.indexOf("04") > -1) {
              this.PRO_LIST[i].TITLE = "WINTER";
              this.PRO_LIST[i].MONTH = "(10~12월)";
            }
          }

          this.getMakeDataDate()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
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
    toMain() {
      this.$router.replace("/")
    },
    toDetail(value) {
      this.$router.push({
          name: 'PRO0102',
          params: {
            data: { 
              code: this.CODETab,
              year: this.year,
              season: value
            }
          }
      })
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