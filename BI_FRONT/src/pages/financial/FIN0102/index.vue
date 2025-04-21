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
          <h2 class="layout_title">{{dr_H.TEXT}}&nbsp;
            <span v-if="p_choice==1">일간</span>
            <span v-else-if="p_choice==2">월간누적</span>
            <span v-else>연간누적</span>
            <span>매출 TOP</span>
            <small class="txt_date">
              <span v-show="headerDate == today" class="chip chip_m">
                <span class="chip_text">TODAY</span>
              </span>
              <strong :class="{point_col1: headerDate == today}">{{headerDate}}</strong>
            </small>
          </h2>
          <div class="layout_spacer"></div>
          <div class="groups pr20">
            <div class="toggle_group tg_sty01">
              <label class="tg_btn" :class="{'is-checked': p_tb_choice === 1}">
                <input type="radio" id="option-s" class="tg_radio" name="select_table" :value="1" v-model="p_tb_choice" style="display:none" @click="p_chageTable(1)" />
                <span class="btn_n txt_label">판매유형</span>
              </label>
              <label class="tg_btn" :class="{'is-checked': p_tb_choice === 2}">
                <input type="radio" id="option-p" class="tg_radio" name="select_table" :value="2" v-model="p_tb_choice" style="display:none" @click="p_chageTable(2)" />
                <span class="btn_n txt_label">전년대비</span>
              </label>
            </div>
          </div>
          <div class="groups pr20">
            <div class="toggle_group tg_sty01">
              <label class="tg_btn" :class="{'is-checked': p_choice === 1}" id="select_day">
                <input type="radio" id="option-d" class="tg_radio" name="select" :value="1" v-model="p_choice" style="display:none" @click="p_chageType(1)" :disabled="p_tb_choice == 2"/>
                <span class="btn_n txt_label">당일</span>
              </label>
              <label class="tg_btn" :class="{'is-checked': p_choice === 2}">
                <input type="radio" id="option-m" class="tg_radio" name="select" :value="2" v-model="p_choice" style="display:none" @click="p_chageType(2)" />
                <span class="btn_n txt_label">당월</span>
              </label>
              <label class="tg_btn" :class="{'is-checked': p_choice === 3}">
                <input type="radio" id="option-a" class="tg_radio" name="select" :value="3" v-model="p_choice" style="display:none" @click="p_chageType(3)" />
                <span class="btn_n txt_label">당년</span>
              </label>
            </div>
          </div>
          <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
          <!-- groups -->
          <div class="groups">
            <!-- date -->
            <div class="input_group input_icon_group" style="width:210px;">
              <form action="#">
                <label class="btn_icon_nl" for="date">
                  <i class="material-icons">calendar_today</i>
                </label>
                <div class="input_text" type="text" id="date">
                  <date-pick
                    v-model="selectDate"
                    @input="p_changeDate"
                    startWeekOnSunday
                    :inputAttributes="{readonly: true}"
                  ></date-pick>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="content">
          <!-- 테이블 -->
          <div class="tbl_sheet sheet_scroll tbl_right sheet_scroll_sty01" style="height:100%;" id="table_1">
            <div class="thead_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:4%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')" style="width:4%;"/>
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" rowspan="2">매장 매출순위</th>
                    <th scope="col" rowspan="2">매출합계<br>(천원)</th>
                    <th scope="col" rowspan="2">수량합계<br>(개)</th>
                    <th scope="col" colspan="6">정상</th>
                    <th scope="col" colspan="6">할인</th>
                    <th scope="col" colspan="6">균일</th>
                    <th scope="col" rowspan="2" v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')">선수금</th>
                  </tr>
                  <tr>
                    <th class="tc">판매액</th>
                    <th class="tc">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc">수량</th>
                    <th class="tc">판매액</th>
                    <th class="tc">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc">수량</th>
                    <th class="tc">판매액</th>
                    <th class="tc">수량</th>
                    <th class="tc">반품액</th>
                    <th class="tc">수량</th>
                    <th class="tc">매출액</th>
                    <th class="tc">수량</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tbody_wrap" style="height:650px;">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:4%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')" style="width:4%;"/>
                </colgroup>
                <tbody>
                  <tr v-for="(data, index) in storeList" :key="index">
                    <th scope="row" @click="clickStore(data.VDCD, data.VDSNM, data.BRCD, data.SUCD)">
                      <span class="num_box">
                        <strong>{{index+1}}</strong>
                      </span>
                      <label>{{data.VDSNM}}</label>
                    </th>
                    <!-- 합계 -->
                    <td>{{ Math.round(data.SALE_TOT/1000) | currency}}</td>
                    <td>
                      <span class="point_col1">{{data.QTY_TOT | currency}}</span>
                    </td>
                    <!-- 정상(판매) -->
                    <td>{{ Math.round(data.JAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.JQTY | currency}}</span></td>
                    <!-- 정상(반품) -->
                    <td>{{ Math.round(data.R_JAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.R_JQTY | currency}}</span></td>
                    <!-- 정상(매출) -->
                    <td>{{ Math.round((Number(data.JAMT)+Number(data.R_JAMT))/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{Number(data.JQTY)+Number(data.R_JQTY) | currency}}</span></td>
                    <!-- 할인(판매) -->
                    <td>{{ Math.round(data.DCAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.DCQTY | currency}}</span></td>
                    <!-- 할인(반품) -->
                    <td>{{ Math.round(data.R_DCAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.R_DCQTY | currency}}</span></td>
                    <!-- 할인(매출) -->
                    <td>{{ Math.round((Number(data.DCAMT)+Number(data.R_DCAMT))/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{Number(data.DCQTY)+Number(data.R_DCQTY) | currency}}</span></td>
                    <!-- 균일(판매) -->
                    <td>{{ Math.round(data.GAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.GQTY | currency}}</span></td>
                    <!-- 균일(반품) -->
                    <td>{{ Math.round(data.R_GAMT/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{data.R_GQTY | currency}}</span></td>
                    <!-- 균일(매출) -->
                    <td>{{ Math.round((Number(data.GAMT)+Number(data.R_GAMT))/1000) | currency}}</td>
                    <td><span class="txt_num point_col1">{{Number(data.GQTY)+Number(data.R_GQTY) | currency}}</span></td>
                    <td v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')">{{ Math.round(data.ADVDEPAMT/1000) | currency}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tfoot_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:10%;"/>
                  <col style="width:5%;"/>
                  <col style="width:4%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col style="width:4%;"/>
                  <col style="width:3%;"/>
                  <col v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')" style="width:4%;"/>
                </colgroup>
                <tfoot>
                  <tr>
                    <th scope="col"><strong>합계</strong></th>
                    <td><strong>{{ Math.round(totalData.SALE_TOT/1000) | currency}}</strong></td>
                    <td><small class="point_col1">{{totalData.QTY_TOT | currency}}</small></td>
                    <!-- 정상(판매) -->
                    <td><strong>{{ Math.round(totalData.JAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.JQTY | currency}}</small></td>
                    <!-- 정상(반품) -->
                    <td><strong>{{ Math.round(totalData.R_JAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_JQTY | currency}}</small></td>
                    <!-- 정상(매출) -->
                    <td><strong>{{ Math.round((totalData.JAMT+totalData.R_JAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.JQTY+totalData.R_JQTY | currency}}</small></td>
                    <!-- 할인(판매) -->
                    <td><strong>{{ Math.round(totalData.DCAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.DCQTY | currency}}</small></td>
                    <!-- 할인(반품) -->
                    <td><strong>{{ Math.round(totalData.R_DCAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_DCQTY | currency}}</small></td>
                    <!-- 할인(매출) -->
                    <td><strong>{{ Math.round((totalData.DCAMT+totalData.R_DCAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.DCQTY+totalData.R_DCQTY | currency}}</small></td>
                    <!-- 균일(판매) -->
                    <td><strong>{{ Math.round(totalData.GAMT/1000) | currency}}</strong>
                    <td><small class="txt_num point_col1">{{totalData.GQTY | currency}}</small></td>
                    <!-- 균일(반품) -->
                    <td><strong>{{ Math.round(totalData.R_GAMT/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.R_GQTY | currency}}</small></td>
                    <!-- 균일(매출) -->
                    <td><strong>{{ Math.round((totalData.GAMT+totalData.R_GAMT)/1000) | currency}}</strong></td>
                    <td><small class="txt_num point_col1">{{totalData.GQTY+totalData.R_GQTY | currency}}</small></td>
                    <!-- 선수금 -->
                    <td v-if="(dr_H.MCODE == '1') || (dr_H.MCODE == 'MI')"><strong>{{ Math.round(totalData.ADVDEPAMT/1000) | currency}}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <!-- 테이블 -->
          <div class="tbl_sheet sheet_scroll tbl_right sheet_scroll_sty01" style="height:100%; display:none;"  id="table_2">
            <div class="thead_wrap" style="height:45px;">
              <table class="tbl">
                <colgroup>
                  <col width="20%"/>
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
                    <th scope="col" >매장 매출순위</th>
                    <th scope="col" >매출합계 (천원)</th>
                    <th scope="col" >수량합계 (개)</th>
                    <th scope="col" >매장 목표</th>
                    <th scope="col" >전년 매출합계(천원)</th>
                    <th scope="col" >전년대비 신장률</th>
                    <th scope="col" >달성율</th>
                    <th scope="col" >담당영업</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tbody_wrap" style="height:690px;">
              <table class="tbl">
                <colgroup>
                  <col width="20%"/>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <tbody>
                  <tr v-for="(data, index) in listData2" :key="index">
                    <th scope="row">
                      <span class="num_box">
                        <strong>{{index+1}}</strong>
                      </span>
                      {{data.VDSNM}}
                    </th>
                    <!-- 합계 -->
                    <td>{{ Math.round(data.SALE_TOT/1000) | currency}}</td>
                    <td>
                      <span class="point_col1">{{data.QTY_TOT | currency}}</span>
                    </td>
                    <!-- 매장 목표 -->
                    <td>{{ Math.round(data.TARGETAMT/1000) | currency}}</td>
                    <!-- 전년 매출합계 -->
                    <td><span class="txt_num point_col1">{{Math.round(data.PRE_SALE_TOT/1000) | currency}}</span></td>
                    <!-- 전년대비 신장률 -->
                    <td><span class="txt_num point_col1">{{data.GROWTH_RATE | currency}}%</span></td>
                    <!-- 달성률 -->
                    <td><span class="txt_num point_col1">{{data.ACHIEVEMENT_RATE | currency}}%</span></td>
                    <!-- 담당영업 -->
                    <td class="tc">{{ data.MEMPNM }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tfoot_wrap">
              <table class="tbl">
                <colgroup>
                  <col width="20%" />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <tfoot>
                  <tr>
                    <th scope="col"><strong>합계</strong></th>
                    <td><strong>{{ Math.round(totalData2.SALE_TOT/1000) | currency}}</strong></td>
                    <td><small class="point_col1">{{totalData2.QTY_TOT | currency}}</small></td>
                    <!-- 매장목표 -->
                    <td><strong>{{ Math.round(totalData2.TARGETAMT/1000) | currency}}</strong></td>
                    <!-- 전년 매출합계 -->
                    <td><small class="txt_num point_col1">{{ Math.round(totalData2.PRE_SALE_TOT/1000) | currency}}</small></td>
                    <!-- 전년대비 신장률 -->
                    <td><small class="txt_num point_col1">{{totalData2.GROWTH_RATE | currency}}%</small></td>
                    <!-- 달성율 -->
                    <td><small class="txt_num point_col1">{{totalData2.ACHIEVEMENT_RATE | currency}}%</small></td>
                    <!-- 담당영업 -->
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <store-bydt-popup
        v-if="isStoreByDtVisible"
        @close="closeStoreByDt"
        :dr_STORE="dr_STORE"
        :currentDate="currentDate"
        :select_p_choice="select_p_choice"
      />
    </div>
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"

import storeBydtPopup from '@/pages/financial/FIN0104'

export default {
  name: "FIN0102",
  components: {
    datePick,
    storeBydtPopup
  },
  props: {
    dr_H: {
      type: Object,
      default: null
    },
    dr_L: {
      type: Array,
      default: []
    },
    orderType: {
      type: String,
      default: 'desc'
    },
    currentDate: {
      type: String,
      default: moment().format("YYYY-MM-DD")
    },
    select_p_choice: {
      type: Number,
      default: 0
    }
  },
  created() {
    let i;
    // this.listData = _.cloneDeep(this.dr_L)
    this.selectDate = moment(this.currentDate).format("YYYY-MM-DD");
    let cuerrentYear = Number(moment(this.currentDate).format("YYYY"));
    for (i = 0; i < 3; i++) {
      this.yearList.push(String(cuerrentYear - i));
    }
    this.selectYear = this.yearList[0];
    let cuerrentMonth = Number(moment(this.currentDate).format("MM"));
    for (i = 0; i < 12; i++) {
      if (cuerrentMonth - i < 1) {
        break;
      }
      this.monthList.push(String(cuerrentMonth - i));
    }
    this.selectMonth = this.monthList[0];
    this.p_choice = this.select_p_choice

    this.getMakeDataDate()
    this.getStoreList()
  },
  computed: {
    req2svr: () => req2svr,
    headerDate() {
      return moment(this.selectDate).format("YYYY.MM.DD (ddd)");
    },
    minDate() {
      return moment().subtract(2, 'year').startOf('year').format("YYYY-MM-DD");
    },
    maxDate() {
      return moment().format("YYYY-MM-DD");
    },
    today() {
      return moment().format("YYYY.MM.DD (ddd)");
    },
    totalData() {
      return {
        SALE_TOT: _.sumBy(this.listData, function(o) { return Number(o.SALE_TOT); }),
        QTY_TOT: _.sumBy(this.listData, function(o) { return Number(o.QTY_TOT); }),
        JAMT: _.sumBy(this.listData, function(o) { return Number(o.JAMT); }),
        R_JAMT: _.sumBy(this.listData, function(o) { return Number(o.R_JAMT); }),
        JQTY: _.sumBy(this.listData, function(o) { return Number(o.JQTY); }),
        R_JQTY: _.sumBy(this.listData, function(o) { return Number(o.R_JQTY); }),
        DCAMT: _.sumBy(this.listData, function(o) { return Number(o.DCAMT); }),
        R_DCAMT: _.sumBy(this.listData, function(o) { return Number(o.R_DCAMT); }),
        DCQTY: _.sumBy(this.listData, function(o) { return Number(o.DCQTY); }),
        R_DCQTY: _.sumBy(this.listData, function(o) { return Number(o.R_DCQTY); }),
        GAMT: _.sumBy(this.listData, function(o) { return Number(o.GAMT); }),
        R_GAMT: _.sumBy(this.listData, function(o) { return Number(o.R_GAMT); }),
        GQTY: _.sumBy(this.listData, function(o) { return Number(o.GQTY); }),
        R_GQTY: _.sumBy(this.listData, function(o) { return Number(o.R_GQTY); }),
        ADVDEPAMT: _.sumBy(this.listData, function(o) { return Number(o.ADVDEPAMT) })
      }
    },
    totalData2() {
      return {
        SALE_TOT: _.sumBy(this.listData2, function(o) { return Number(o.SALE_TOT); }),
        QTY_TOT: _.sumBy(this.listData2, function(o) { return Number(o.QTY_TOT); }),
        PRE_SALE_TOT: _.sumBy(this.listData2, function(o) { return Number(o.PRE_SALE_TOT); }),
        TARGETAMT: _.sumBy(this.listData2, function(o) { return Number(o.TARGETAMT); }),
        GROWTH_RATE: Math.round(_.meanBy(this.listData2, function(o) { return Number(o.GROWTH_RATE); })),
        ACHIEVEMENT_RATE: Math.round(_.meanBy(this.listData2, function(o) { return Number(o.ACHIEVEMENT_RATE); }))
      }
    },
    storeList() {
      if (this.orderType == 'asc') {
        return _.orderBy(this.listData, function(o) { return Number(o.SALE_TOT) }, 'asc')
      } else {
        return _.orderBy(this.listData, function(o) { return Number(o.SALE_TOT) }, 'desc')
      }
    },
    tabType() {
      return this.$store.getters.getFDRList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
  },
  data() {
    return {
      selectDate: null,
      selectYear: null,
      selectMonth: null,
      yearList: [],
      monthList: [],
      listData: [],
      listData2: [],
      makeDataDate: null,
      p_choice: 1,
      p_tb_choice: 1,
      isStoreByDtVisible: false,
      dr_STORE: null,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getMakeDataDate(){
      let sql = "SELECT TO_CHAR(MAX(CREATEDATE), 'YY.MM.DD HH24:MI') CREATEDATE FROM BISL060";

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.makeDataDate = res.CREATEDATE;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    p_chageType(value) {
      if(this.p_tb_choice == "2" && value == "1") {
        // this.p_choice = 2;
        // return;
      } else {
        this.p_choice = value;
        this.getStoreList();
        this.getsalesRanking();
      }
    },
    p_chageTable(value) {
      this.p_tb_choice = value;
      if(this.p_tb_choice == 1) {
        this.p_choice = 1;
        document.getElementById("table_1").style.display = "block";
        document.getElementById("table_2").style.display = "none";
        this.getStoreList();
      } else {
        this.p_choice = 2;
        document.getElementById("table_1").style.display = "none";
        document.getElementById("table_2").style.display = "block";
        this.getsalesRanking();
      }
    },
    p_changeDate() {
      if(this.p_tb_choice == 1) {
        this.getStoreList();
      } else if (this.p_tb_choice == 2) {
        this.getsalesRanking();
      } else {
        // 오류~
      }
    },
    getsalesRanking() {
      this.req2svr.getsalesRanking(this.orderType, this.tabType, this.dr_H.MCODE, this.p_choice, this.selectDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              this.listData2 = JSON.parse("[" + res + "]");
              console.log("listData2 >>> ", this.listData2)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStoreList() {
      let start_date;
      if(this.p_choice == 1) {
        start_date = moment(this.selectDate).format("YYYYMMDD");
      } else if(this.p_choice == 2) {
        start_date = moment(this.selectDate).format("YYYYMM")+"01";
      } else {
        start_date = moment(this.selectDate).format("YYYY")+"0101";
      }
      let end_date = moment(this.selectDate).format("YYYYMMDD");

      this.req2svr.getStoreList(start_date, end_date, this.tabType, this.dr_H.MCODE).then(
        res => {
          this.listData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.listData.push(res);
            } else {
              this.listData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    clickStore(vdcd, vdnm, brcd, sucd) {
      console.log("매장!!!! >> ", vdcd, " / ", vdnm, " / ", sucd)
      console.log(typeof sucd)
      console.log(sucd == '12')
      console.log(sucd == "12")
      console.log(sucd == 12)
      let param_brcd = '';
      if(sucd == '12') { 
        param_brcd = 'MO'; 
      } else if(sucd == '21') { 
        param_brcd = 'FO'; 
      } else {
        param_brcd = brcd 
      }
      this.dr_STORE = {VDCD: vdcd, VDNM: vdnm, BRCD: param_brcd};
      this.showStoreByDt();
    },
    showStoreByDt() {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        return
      }
      this.isStoreByDtVisible = true;
    },
    closeStoreByDt() {
      this.isStoreByDtVisible = false;
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