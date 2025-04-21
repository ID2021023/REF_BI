<template>
  <div class="wrap">
    <!-- header -->
    <header class="header">
      <div class="header_inner" style="min-width: 1725px;">
        <div class="layout_spacer"></div>
        <!-- groups -->
        <div class="groups">
          <button type="button" class="btn_icon btn_filter button_checked" @click="close(false)"><i class="material-icons">tune</i></button>
          <!-- filter -->
          <div class="filter_wrap">
            <div class="filter_cont" style="min-height: 400px;">
              <!-- filter_brand -->
              <div class="filter_view">
                <strong v-if="isTabTypeSU" class="tit">BUSINESS</strong>
                <strong v-else class="tit">BRAND</strong>
                <div class="filter_box toggle_group tg_sty02 f_col">
                  <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn">
                    <input
                      type="radio"
                      id="filter-op-1-1"
                      class="tg_radio"
                      name="filter-op"
                      :value="data.MCODE"
                      v-model="CODE"
                      @click="changeCODE(data.MCODE)"
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
              </div>
              <!-- filter_category -->
              <div class="filter_view">
                <strong class="tit">category</strong>
                <div class="filter_box toggle_group tg_sty02 f_col" style="width:275px;">
                  <label v-for="(data, index) in categoryList" :key="index" class="tg_btn" :for="data.id">
                    <input
                      type="radio"
                      :id="data.id"
                      class="tg_radio"
                      name="filter-op-2"
                      :value="data.id"
                      v-model="category"
                    >
                    <span v-if="data.subList && category == data.id" class="btn_n txt_label" @click="changeCategory(data.id)">{{ data.subList[categorySub].title }}</span>
                    <span v-else class="btn_n txt_label" @click="changeCategory(data.id)">{{ data.title }}</span>
                    <span v-if="data.subList" class="btn_n btn_dropdown" @click.stop="showCategoryDropdown = true"><i class="material-icons">arrow_drop_down</i></span>
                    <!-- 드롭다운메뉴/라디오 체크시 나타나게 해놨는데 한번 더 클릭하면 없어지게 하거나 선택하면 없어지게 해야함 -->
                    <span v-if="data.subList && showCategoryDropdown" class="dropdown">
                      <span
                        v-for="(list, i) in data.subList" :key="list.id" 
                        class="drop_menu"
                        :class="{tg_btn_select: categorySub == i}"
                        @click="changeCategorySub(i)"
                      >{{ list.title }}</span>
                    </span>
                    <i v-if="!data.subList" class="material-icons">done </i>
                  </label>
                </div>
              </div>
              <!-- filter_cloth -->
              <div class="filter_view" v-show="category == 'c_style' || (category == 'styleTop' && categorySub == 1) || (category == 'styleWorst' && categorySub == 1)">
                <strong class="tit">cloth</strong>
                <div class="filter_box check_group cg_sty01">
                  <label class="tg_btn btn_all" for="filter-cl-a">
                    <input type="checkbox" id="filter-cl-a" class="cg_check" v-model="cloth_a" @click="changeClothAll(null)"/>
                    <span class="cg_box"><i class="material-icons">done</i></span>
                    <span class="btn_n btn_s txt_label">복종 전체</span>
                  </label>
                  <div class="scroll_cont">
                    <div class="list">
                      <label v-for="(data, index) in clothCodes" :key="index" class="tg_btn" :for="'filter-cl-' + index">
                        <input type="checkbox" :id="'filter-cl-' + index" @click="changeCloth(data)" :checked="data.checked" class="cg_check" />
                        <span class="cg_box"><i class="material-icons">done</i></span>
                        <span class="btn_n btn_s txt_label">{{ data.code }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- filter_fabric -->
              <div class="filter_view" v-show="category == 'f_style' || (category == 'styleTop' && categorySub == 2) || (category == 'styleWorst' && categorySub == 2)">
                <strong class="tit">fabric</strong>
                <div class="filter_box check_group cg_sty01">
                  <label class="tg_btn btn_all" for="filter-fa-a">
                    <input type="checkbox" id="filter-fa-a" class="cg_check" v-model="fabric_a" @click="changeFabricAll(null)"/>
                    <span class="cg_box"><i class="material-icons">done</i></span>
                    <span class="btn_n btn_s txt_label">소재 전체</span>
                  </label>
                  <div class="scroll_cont">
                    <div class="list">
                      <label v-for="(data, index) in fabricCodes" :key="index" class="tg_btn" :for="'filter-fa-' + index">
                        <input type="checkbox" :id="'filter-fa-' + index" @click="changeFabric(data)" :checked="data.checked" class="cg_check"/>
                        <span class="cg_box"><i class="material-icons">done</i></span>
                        <span class="btn_n btn_s txt_label">{{ data.code }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- filter_period -->
              <div class="filter_view">
                <!-- style -->
                <strong class="tit">style season</strong>
                <!-- 기간 선택 -->
                <div class="groups">
                  <!-- date -->
                  <div class="input_group input_icon_group" style="width:165px;">
                    <!-- date -->
                    <form action="#" style="width:78px; margin-right:7px;">
                      <div class="select_box">
                      <select class="select" v-model="seasonStartYear" @change="changeSeason" >
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                      </div>
                    </form>
                    <form action="#" style="width:78px;">
                      <div class="select_box">
                      <select class="select" v-model="seasonStartMonth" @change="changeSeason">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                      </div>
                    </form>
                  </div>
                  <!-- date -->
                  <div class="input_group input_icon_group" style="width:165px;">
                    <!-- date -->
                    <form action="#" style="width:78px; margin-right:7px;">
                      <div class="select_box">
                      <select class="select" v-model="seasonEndYear" @change="changeSeason">
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                      </div>
                    </form>
                    <form action="#" style="width:78px;">
                      <div class="select_box">
                      <select class="select" v-model="seasonEndMonth" @change="changeSeason">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                      </div>
                    </form>
                  </div>
                </div>                
                <!-- sale -->
                <strong class="tit">sale period</strong>
                <!-- 기간 선택 -->
                <div class="groups">
                  <!-- date -->
                  <div class="input_group input_icon_group" style="width:165px;">
                    <!-- date -->
                    <form action="#">
                      <!-- date -->
                      <label class="btn_icon_nl" for="startDate">
                        <i class="material-icons">calendar_today</i>
                      </label>
                      <div class="input_text" type="text" id="startDate">
                        <date-pick
                          v-model="saleStartDate"
                          @input="changeDate"
                          :displayFormat="'YYYYMMDD'"
                          :inputAttributes="{readonly: true}"
                          :selectableYearRange="5"
                          startWeekOnSunday
                        ></date-pick>
                      </div>
                    </form>
                  </div>
                  <!-- date -->
                  <div class="input_group input_icon_group" style="width:165px;">
                    <!-- date -->
                    <form action="#">
                      <!-- date -->
                      <label class="btn_icon_nl" for="endDate">
                        <i class="material-icons">calendar_today</i>
                      </label>
                      <div class="input_text" type="text" id="endDate">
                        <date-pick
                          v-model="saleEndDate"
                          :displayFormat="'YYYYMMDD'"
                          @input="changeDate"
                          :inputAttributes="{readonly: true}"
                          :selectableYearRange="5"
                          startWeekOnSunday
                        ></date-pick>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="ct_check_item">
                  <label class="tg_btn" for="reorder">
                    <input type="checkbox" id="reorder" class="cg_check" :checked="addReOrder" @click="reorderClick()"/>
                    <span class="cg_box" style="z-index:0;"><i class="material-icons">done</i></span>
                    <span class="txt_label">REORDER 포함</span>
                  </label>
                </div>
              </div>
              <!-- filter_condition -->
              <div class="filter_view">
                <strong class="tit" v-show="category == 'styleTop' || category == 'styleWorst'">Condition</strong>
                <div class="filter_box toggle_group tg_sty02 f_col" v-show="category == 'styleTop' || category == 'styleWorst'">
                  <label v-for="(data, index) in conditionList" :key="index" class="tg_btn" :for="'filter-op-4-' + index">
                    <input
                      type="radio"
                      :id="'filter-op-4-' + index"
                      class="tg_radio"
                      name="filter-op-4"
                      :value="index"
                      v-model="condition"
                    >
                    <span class="btn_n txt_label">{{data}}</span>
                    <i class="material-icons">done </i>
                  </label>
                </div>
                <strong class="tit" v-show="CODE != 'CO'">Division</strong>
                <div class="filter_box toggle_group tg_sty02 f_col" v-show="CODE != 'CO'">
                  <label class="tg_btn" for="filter-op-5-1">
                    <input type="radio" id="filter-op-5-1" class="tg_radio" value="0" v-model="sucd" />
                    <span class="btn_n txt_label">사업부 전체</span>
                    <i class="material-icons">done </i>
                  </label>
                  <label v-for="(data, index) in styleSUData" :key="data.SUCD" class="tg_btn" :for="'filter-op-5-' + (index+2)">
                    <input type="radio" :id="'filter-op-5-' + (index+2)" class="tg_radio" :value="data.SUCD" v-model="sucd" />
                    <span class="btn_n txt_label">{{ data.CODNM }}</span>
                    <i class="material-icons">done </i>
                  </label>
                </div>
              </div>
            </div>
            <div class="filter_btns">
              <button type="button" class="btn_n" @click="init">초기화</button>
              <button type="button" class="btn_n" @click="close(true)">필터적용</button>
            </div>
          </div>
          <div class="bg_popup_wrap"></div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"

export default {
  name: "STY0301",
  components: {
    datePick
  },
  props: {
    filterData: Object
  },
  created() {
    // this.saleStartDate = moment().startOf("years").format('YYYY-MM-DD')
    // this.saleEndDate = moment().format('YYYY-MM-DD')
    this.saleStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
    this.saleEndDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

    let cuerrentYear = Number(moment().format("YYYY"))
    let code
    for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(cuerrentYear - (4 - i))
      this.yearList.push(String(code))
    }
    this.seasonStartYear = this.yearList[this.yearList.length-1]
    this.seasonEndYear = this.yearList[this.yearList.length-1]

    for (let i = 1; i < 13; i++) {
      code = this.$store.getters.getMonthCode(i)
      this.monthList.push(String(code))
    }
    this.seasonStartMonth = 1
    this.seasonEndMonth = this.$store.getters.getMonthCode(moment().format('M'))

    if (this.CODE == null && this.CODECardsList && this.CODECardsList.length > 0) {
      this.CODE = this.authCodeList[0].MCODE
    }

    this.category = this.categoryList[0].id
    this.condition = 0
    this.addReOrder = true

    this.getClothCodeList()
    // 순차진행
    // this.getFabricsCodeList()
  },
  data() {
    return {
      CODE: null,
      saleStartDate: null,
      saleEndDate: null,
      yearList: [],
      monthList: [],
      seasonStartYear: null,
      seasonStartMonth: null,
      seasonEndYear: null,
      seasonEndMonth: null,
      addReOrder: true,
      category: null,
      categorySub: 0,
      showCategoryDropdown: false,
      categoryList: [
        { id: "styleTop", title: "Style Top 20", subList: [
            { id: "styleTop20", title: "Style Top 20" },
            { id: "c_styleTop20", title: "복종별 Style Top 20" },
            { id: "f_styleTop20", title: "소재별 Style Top 20" }
          ]
        },
        { id: "styleWorst", title: "Style Worst 20", subList: [
            { id: "styleWorst20", title: "Style Worst 20" },
            { id: "c_styleWorst20", title: "복종별 Style Worst 20" },
            { id: "f_styleWorst20", title: "소재별 Style Worst 20" }
          ]
        },
        { id: "c_style", title: "복종별 Style" },
        // { id: "f_style", title: "소재별 Style" },
      ],
      clothCodes: [{code:"", checked:false}],
      cloth_a: false,
      cloths: [],
      fabricCodes: [{code:"", checked:false}],
      fabric_a: false,
      fabrics: [],
      condition: 0,
      conditionList: [ "판매수량별", "판매율별", "매출금액별" ],
      styleSUData: [],
      sucd: 1
    }
  },
  computed: {
    req2svr: () => req2svr,
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    monthCodes() {
      return this.$store.getters.getMonthCodeList
    },
    CODECardsList() {
      let STYList = this.$store.getters.getSTYList
      for(var i=0; i<STYList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:STYList[i].MCODE})
        if (data) {
          STYList[i].VISIBLE = true
        } else {
          STYList[i].VISIBLE = false
        }
      }
      return STYList
    },
    isTabTypeSU() {
      return this.$store.getters.getSTYList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getSTYList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[1]
      }
      return this.$store.getters.getAuthBRCDCode[1]
    }
  },
  methods: {
    init() {
      // this.saleStartDate = moment().startOf("years").format('YYYY-MM-DD')
      // this.saleEndDate = moment().format('YYYY-MM-DD')
      this.saleStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
      this.saleEndDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

      let cuerrentYear = Number(moment().format("YYYY"))
      let code
      this.yearList = []
      for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(cuerrentYear - (4 - i))
        this.yearList.push(String(code))
      }
      this.seasonStartYear = this.yearList[this.yearList.length-1]
      this.seasonEndYear = this.yearList[this.yearList.length-1]

      this.monthList = []
      for (let i = 1; i < 13; i++) {
        code = this.$store.getters.getMonthCode(i)
        this.monthList.push(String(code))
      }
      this.seasonStartMonth = 1
      this.seasonEndMonth = this.$store.getters.getMonthCode(moment().format('M'))

      this.CODE = this.authCodeList[0].MCODE

      this.category = this.categoryList[0].id
      this.categorySub = 0
      this.condition = 0
      this.addReOrder = true

      // 초기화시 미샤 브랜드일땐 MI 사업부 Default
      if(this.CODE == "MI"){
        this.sucd = 1
      } else {
        this.sucd = 0
      }

      // 초기화시 미샤 브랜드일땐 MI 사업부 Default
      this.getchangeCODESucd()
    },
    initData() {
      if (this.filterData) {
        this.CODE = this.filterData.CODE

        this.saleStartDate = moment(this.filterData.saleStartDate).format('YYYY-MM-DD')
        this.saleEndDate = moment(this.filterData.saleEndDate).format('YYYY-MM-DD')

        this.seasonStartYear = this.filterData.seasonStartYear
        this.seasonStartMonth = this.filterData.seasonStartMonth
        this.seasonEndYear = this.filterData.seasonEndYear
        this.seasonEndMonth = this.filterData.seasonEndMonth

        this.addReOrder = this.filterData.addReOrder

        this.category = this.filterData.category
        this.categorySub = this.filterData.categorySub

        this.cloths = this.filterData.cloths
        if (this.cloths.length > 0) {
          for (let i=0;i<this.clothCodes.length;i++) {
            if (_.indexOf(this.filterData.cloths, this.clothCodes[i].code) > -1) {
              this.clothCodes[i].checked = true
            }
          }
        }
        if (this.cloths.length == this.clothCodes.length) {
          this.cloth_a = true
        }

        this.fabrics = this.filterData.fabrics
        if (this.fabrics.length > 0) {
          for (let i=0;i<this.fabricCodes.length;i++) {
            if (_.indexOf(this.fabrics, this.fabricCodes[i].code) > -1) {
              this.fabricCodes[i].checked = true
            }
          }
        }
        if (this.fabrics.length == this.fabricCodes.length) {
          this.fabric_a = true
        }
        this.condition = this.filterData.condition

        this.sucd = this.filterData.sucd

        // 미샤외의 브랜드 선택시 사업부 리셋
        // if(this.filterData.CODE == 'MI') {
        //   this.sucd = this.filterData.sucd
        // } else {
        //   this.sucd = 0
        // }
      }
    },
    getClothCodeList() {
      let sql = "SELECT * FROM BICM011 "
      sql += "WHERE GBNCD = 'MC027' "
      sql += "AND USEYN = 'Y' "
      sql += "ORDER BY CODE "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.clothCodes = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.clothCodes.push({code: res.CODE, checked: false});
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.clothCodes.push({code: list[i].CODE, checked: false});
              }
            }
          }
          this.getFabricsCodeList()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getFabricsCodeList() {
      let sql = "SELECT * FROM BICM011 "
      sql += "WHERE GBNCD = 'MC026' "
      sql += "AND USEYN = 'Y' "
      sql += "ORDER BY CODE "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.fabricCodes = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.fabricCodes.push({code: res.CODE, checked: false});
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.fabricCodes.push({code: list[i].CODE, checked: false});
              }
            }
          }
          this.getSucd()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSucd: function() {
      this.CODE = this.filterData.CODE

      // 사업부 조회
      let sql = "SELECT SUCD, LENGTH(SUCD) CNT FROM BISH010 ";
      if(this.CODE == "IT" || this.CODE == "SO") {
        sql += "WHERE (BRCD = '" + this.CODE + "' OR SUCD = '21')";  
      } else {
        sql += "WHERE BRCD = '" + this.CODE + "' ";  
      }
      sql += "GROUP BY SUCD, CNT ";
      sql += "ORDER BY CNT";

      this.req2svr.getData(sql).then(
        res => {
          this.styleSUData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.styleSUData.push(res)
              this.styleSUData[0].CODNM = this.$store.getters.getSUCDCODNM(res.SUCD)
            } else {
              this.styleSUData = JSON.parse("[" + res + "]")
              for (let i=0;i<this.styleSUData.length;i++) {
                this.styleSUData[i].CODNM = this.$store.getters.getSUCDCODNM(this.styleSUData[i].SUCD)
              }
              // this.styleSUData.unshift({CODNM: "사업부 전체"})
            }
          }
          this.initData()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getchangeCODESucd: function() {
      // 사업부 조회
      let sql = "SELECT SUCD, LENGTH(SUCD) CNT FROM BISH010 ";
      if(this.CODE == "IT" || this.CODE == "SO") {
        sql += "WHERE (BRCD = '" + this.CODE + "' OR SUCD = '21')";  
      } else {
        sql += "WHERE BRCD = '" + this.CODE + "' ";  
      }
      sql += "GROUP BY SUCD, CNT ";
      sql += "ORDER BY CNT";

      this.req2svr.getData(sql).then(
        res => {
          this.styleSUData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.styleSUData.push(res)
              this.styleSUData[0].CODNM = this.$store.getters.getSUCDCODNM(res.SUCD)
            } else {
              this.styleSUData = JSON.parse("[" + res + "]")
              for (let i=0;i<this.styleSUData.length;i++) {
                this.styleSUData[i].CODNM = this.$store.getters.getSUCDCODNM(this.styleSUData[i].SUCD)
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    changeCODE(code) {
      this.CODE = code
      this.getchangeCODESucd()

      if(this.CODE == 'MI') {
        this.sucd = 1
      } else {
        this.sucd = 0
      }  
    },
    changeDate(value) {
      this.date = moment(value).format('YYMMDD')
    },
    changeSeason() {
      this.$emit("changeSeason")
    },
    changeCategory(id) {
      if (this.category != id) {
        this.category = id
        this.categorySub = 0

        if (this.category == "c_style" && this.clothCodes.length > 0) {
          this.changeClothAll(true)
        } else if (this.category == "f_style" && this.fabricCodes.length > 0) {
          this.changeFabricAll(true)
        }
      }
      this.showCategoryDropdown = false
    },
    changeCategorySub(i) {
      this.categorySub = i
      this.showCategoryDropdown = false
      
      if (i == 1) {
        this.changeClothAll(true)
      } else if (i == 2) {
        this.changeFabricAll(true)
      }
    },
    changeClothAll(isAll) {
      if (isAll == null) {
        isAll = document.getElementById("filter-cl-a").checked
      }
      if (!isAll) {
        this.cloths = []
        for (let i=0;i<this.clothCodes.length;i++) {
          this.clothCodes[i].checked = false
        }
      } else {
        this.cloths = []
        for (let i=0;i<this.clothCodes.length;i++) {
          this.clothCodes[i].checked = true
          this.cloths.push(this.clothCodes[i].code)
        }
      }
      if (this.cloths.length == this.clothCodes.length) {
        this.cloth_a = true
      } else {
        this.cloth_a = false
      }
    },
    changeCloth(data) {
      data.checked = !data.checked
      if (data.checked) {
        this.cloths.push(data.code)
      } else {
        let index = this.cloths.indexOf(data.code)
        if (index > -1) {
          this.cloths.splice(index, 1)
        }
      }
      if (this.cloths.length == this.clothCodes.length) {
        this.cloth_a = true
      } else {
        this.cloth_a = false
      }
    },
    changeFabricAll(isAll) {
      if (isAll == null) {
        isAll = document.getElementById("filter-fa-a").checked
      }
      if (isAll == false) {
        this.fabrics = []
        for (let i=0;i<this.fabricCodes.length;i++) {
          this.fabricCodes[i].checked = false
        }
      } else if (isAll == true) {
        this.fabrics = []
        for (let i=0;i<this.fabricCodes.length;i++) {
          this.fabricCodes[i].checked = true
          this.fabrics.push(this.fabricCodes[i].code)
        }        
      }
      if (this.fabrics.length == this.fabricCodes.length) {
        this.fabric_a = true
      } else {
        this.fabric_a = false
      }
    },
    changeFabric(data) {
      data.checked = !data.checked
      if (data.checked) {
        this.fabrics.push(data.code)
      } else {
        let index = this.fabrics.indexOf(data.code)
        if (index > -1) {
          this.fabrics.splice(index, 1)
        }
      }
      if (this.fabrics.length == this.fabricCodes.length) {
        this.fabric_a = true
      } else {
        this.fabric_a = false
      }
    },
    reorderClick(){
      if(this.addReOrder) {
        this.addReOrder = false
      } else {
        this.addReOrder = true
      }
    },
    close(isSave) {
      let data = null
      // let param_sucd = null
      // 미샤외의 브랜드 선택시 사업부 리셋
      // if(this.CODE == 'MI') {
      //   param_sucd = this.sucd
      // } else {
      //   param_sucd = 0
      // }

      if (isSave) {
        data = {
          CODE: this.CODE,
          saleStartDate: this.saleStartDate,
          saleEndDate: this.saleEndDate,
          seasonStartYear: this.seasonStartYear,
          seasonStartMonth: this.seasonStartMonth,
          seasonEndYear: this.seasonEndYear,
          seasonEndMonth:this.seasonEndMonth,
          addReOrder: this.addReOrder,
          category: this.category,
          categorySub: this.categorySub,
          cloths: this.cloths,
          fabrics: this.fabrics,
          condition: this.condition,
          sucd: this.sucd
        }
      }
      this.$emit("close", data)
    },
  }
}
</script>