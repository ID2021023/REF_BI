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
                <!-- groups -->
                <div class="toggle_group tg_sty01">
                    <label class="tg_btn">
                        <input type="radio" class="tg_radio" name="select" :value="1" v-model="choice" :class="{'is-checked': choice === 1}" @click="chageChoice(1)" />
                        <span class="btn_n txt_label">원자재</span>
                    </label>
                    <label class="tg_btn">
                        <input type="radio" class="tg_radio" name="select" :value="2" v-model="choice" :class="{'is-checked': choice === 2}" @click="chageChoice(2)" />
                        <span class="btn_n txt_label">부자재</span>
                    </label>
                    <label class="tg_btn">
                        <input type="radio" class="tg_radio" name="select" :value="3" v-model="choice" :class="{'is-checked': choice === 3}" @click="chageChoice(3)" />
                        <span class="btn_n txt_label">임가공</span>
                    </label>
                    <label class="tg_btn">
                        <input type="radio" class="tg_radio" name="select" :value="4" v-model="choice" :class="{'is-checked': choice === 4}" @click="chageChoice(4)" />
                        <span class="btn_n txt_label">완사입</span>
                    </label>
                </div>
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
                    <colgroup v-if="choice == 1" >
                        <col style="width:10%;" />
                        <col style="width:14%;" />
                        <col style="width:14%;" />
                        <col style="width:14%;" />
                        <col style="width:22%;"/>                            
                        <col style="width:14%;" />
                    </colgroup>
                    <colgroup v-else-if="choice == 2">
                        <col style="width:10%;" />
                        <col style="width:14%;" />
                        <col style="width:14%;" />
                        <col style="width:14%;" />
                        <col style="width:22%;"/>           
                    </colgroup>
                    <colgroup v-else>
                        <col style="width:10%;" />
                        <col style="width:14%;" />
                        <col style="width:20%;" />
                        <col style="width:20%;" />      
                    </colgroup>
                    <thead>
                        <tr>
                            <th>시즌</th>
                            <th>계획</th>
                            <th>발주</th>
                            <th>입고</th>
                            <th v-show="choice == 1 || choice == 2" >출고</th>
                            <th v-show="choice == 1">재고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="noResult">
                            <tr>
                                <td v-if="choice == 1" colspan="6">No Data</td>
                                <td v-if="choice == 3 || choice == 4" colspan="4">No Data</td>
                                <td v-else colspan="5">No Data</td>
                            </tr>
                        </template>
                        <template v-else v-for="data in BUY_LIST">
                        <tr>
                            <th rowspan="2" class="teamSelector" @click="toDetail(data.TITLE)">
                                <em class="txt_year">{{ data.TITLE }}</em>
                                <span class="txt_month">
                                    <span class="txt">{{ data.MONTH }}</span>
                                </span>
                            </th>
                            <td>
                                <div class="list_box_s tbl_list_s">
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">금액(백만원)</dt>
                                            <dd class="txt"><strong>{{ Math.round(data.YSAMT/1000000)| currency }}</strong></dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="list_box_s tbl_list_s">
                                  <div class="view">
                                        <dl class="list_var">
                                            <!-- <dt class="tit">금액(백만원)</dt>
                                            <dd class="txt"><strong>{{ Math.round(data.YSAMT/1000000) | currency }}</strong></dd> -->
                                            <dt class="tit"> </dt>
                                        </dl>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="list_box_s tbl_list_s">
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">수량</dt>
                                            <dd class="txt"><strong>{{ data.ORQTY | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">금액(백만원)</dt>
                                            <dd class="txt"><strong>{{ Math.round(data.ORAMT/1000000) | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="list_box_s tbl_list_s">
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">수량</dt>
                                            <dd class="txt"><strong>{{ data.INQTY | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">금액(백만원)</dt>
                                            <dd class="txt"><strong>{{ Math.round(data.INAMT/1000000) | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                </div>
                            </td>
                            <td v-show="choice == 1 || choice == 2" >
                                <div class="list_box_s tbl_list_s">
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">수량</dt>
                                            <dd class="txt"><strong>{{ data.OUTQTY | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt v-show="choice == 1 || choice == 2" class="tit">금액(백만원)</dt>
                                            <dt v-show="choice == 3 || choice == 4" class="tit">공급금액(백만원)</dt>
                                            <dd class="txt"><strong>{{ Math.round(data.OUTAMT/1000000) | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                </div>
                            </td>
                            <td v-show="choice == 1">
                                <div class="list_box_s tbl_list_s">
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">수량</dt>
                                            <dd class="txt"><strong>{{ data.STOCKQTY | currency }}</strong></dd>
                                        </dl>
                                    </div>
                                    <div class="view">
                                        <dl class="list_var">
                                            <dt class="tit">금액(백만원)</dt>
                                            <dd class="txt"><strong>{{ Math.round(data.STOCKAMT/1000000) | currency }}</strong></dd>
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
                                        <span class="tit">계획대비 발주율</span>
                                        <span class="txt_num">{{ data.ORRATE | currency }}<small>%</small></span>
                                    </span>
                                    <strong class="graph line_bar">
                                        <span class="bar" :style="{width: convertPercent(data.ORRATE) +'%'}"></span>
                                    </strong>
                                </div>
                            </td>
                            <td>
                                <div class="graph_cont gc_s">
                                    <span class="view">
                                        <span class="tit">계획대비 입고율</span>
                                        <span class="txt_num">{{ data.INRATE | currency }}<small>%</small></span>
                                    </span>
                                    <strong class="graph line_bar">
                                        <span class="bar" :style="{width: convertPercent(data.INRATE) +'%'}"></span>
                                    </strong>
                                </div>
                            </td>
                            <td v-show="choice == 1 || choice == 2">
                                <div class="row">
                                    <div class="col_md_6 graph_cont gc_s">
                                        <span class="view">
                                            <span class="tit">(수량)<br />입고대비 출고율</span>
                                            <span class="txt_num">{{ data.OUTQTYRATE | currency }}<small>%</small></span>
                                        </span>
                                        <strong class="graph line_bar">
                                            <span class="bar" :style="{width: convertPercent(data.OUTQTYRATE) +'%'}"></span>
                                        </strong>
                                    </div>
                                    <div v-show="choice == 1 || choice == 2" class="col_md_6 graph_cont gc_s">
                                        <span class="view">
                                            <span class="tit">(금액)<br />입고대비 출고율</span>
                                            <span class="txt_num">{{ data.OUTAMTRATE | currency }}<small>%</small></span>
                                        </span>
                                        <strong class="graph line_bar">
                                            <span class="bar" :style="{width: convertPercent(data.OUTAMTRATE) +'%'}"></span>
                                        </strong>
                                    </div>
                                </div>                                    
                            </td>
                            <td v-show="choice == 1">
                              <!-- <div class="graph_cont gc_s">
                                    <span class="view">
                                        <span class="tit">계획대비 재고율</span>
                                        <span class="txt_num">{{ data.STOCKRATE }}<small>%</small></span>
                                    </span>
                                    <strong class="graph line_bar">
                                        <span class="bar" :style="{width: convertPercent(data.STOCKRATE) +'%'}"></span>
                                    </strong>
                                </div> -->
                            </td>
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
  name: "BUY0101",
  components: {
    sideMenu
  },
  props: {
    data: Object
  },
  created() {
    if (this.data) {
      this.year = this.data.year
      this.CODETab = this.data.code
      this.choice = this.data.gubun
    } else {
      this.year = moment().format("YYYY")
      this.CODETab = this.authCodeList[0].MCODE
      this.choice = 1
    }

    let year = moment().format("YYYY")
    for (var i = 0; i < 3; i++) {
      this.y_options[i] = year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
      let BUYList = this.$store.getters.getBUYList
      for(var i=0; i<BUYList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:BUYList[i].MCODE})
        if (data) {
          BUYList[i].VISIBLE = true
        } else {
          BUYList[i].VISIBLE = false
        }
      }
      return BUYList
    },
    isTabTypeSU() {
      return this.$store.getters.getBUYList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getBUYList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[4]
      }
      return this.$store.getters.getAuthBRCDCode[4]
    },
    yearCodeList() {
        return this.$store.getters.getYearCodeList
    }
  },
  data() {
    return {
      drawer: null,
      choice: 1,
      CODETab: 0,
      year: null,
      y_options: [],
      BUY_LIST: [],
      yearCode: null,
      noResult: false,
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
      this.getMakeDataDate()
      this.getBuyData()
    },
    chageDate() {
      this.getBuyData()
    },
    chageChoice(val){
      this.choice = val
      this.getBuyData()
    },
    changeCODE(val) {
      this.CODETab = val
      this.getBuyData()
    },
    getBuyData(){
      this.BUY_LIST = []
      this.yearCode = this.$store.getters.getYearCode(Number(this.year))

      this.req2svr.getBuyData(this.choice, this.tabType, this.CODETab, this.yearCode).then(
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
            this.BUY_LIST = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.BUY_LIST.push(res);
            } else {
              this.BUY_LIST = JSON.parse("[" + res + "]")
            }
          }

          for (var i=0;i<this.BUY_LIST.length;i++) {
            if (this.BUY_LIST[i].SEASON.indexOf("1") > -1) {
                this.BUY_LIST[i].TITLE = "SPRING";
                this.BUY_LIST[i].MONTH = "(1~3월)";
            } else if(this.BUY_LIST[i].SEASON.indexOf("2") > -1) {
                this.BUY_LIST[i].TITLE = "SUMMER";
                this.BUY_LIST[i].MONTH = "(4~6월)";
            } else if(this.BUY_LIST[i].SEASON.indexOf("3") > -1) {
                this.BUY_LIST[i].TITLE = "FALL";
                this.BUY_LIST[i].MONTH = "(7~9월)";
            } else if(this.BUY_LIST[i].SEASON.indexOf("4") > -1) {
                this.BUY_LIST[i].TITLE = "WINTER";
                this.BUY_LIST[i].MONTH = "(10~12월)";
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
    toDetail() {
      this.$router.push({
        name: 'BUY0102',
        params: {
          data: { 
            code: this.CODETab,
            year: this.year,
            gubun: this.choice
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