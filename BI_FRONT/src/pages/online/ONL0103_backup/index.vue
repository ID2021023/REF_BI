<template>
  <div class="wrap">
    <!-- drawer_열리는 클래스 : on -->
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
        <!-- Title button -->
        <!-- <button type="button" class="btn_n btn_icon btn_prev" @click="prev">
          <i class="material-icons">arrow_back_ios</i>
        </button> -->
        <!-- Title -->
        <h2 class="layout_title">온라인 매출 실적
          <span class="txt_date">
              <strong class="point_col1">{{year}}년 {{month}}월 {{toDay-1}}일</strong>
          </span>
        </h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;">
          <button type="button" class="btn_n" style="height:55px;"  @click="showYearly()">년도별 매출 현황</button>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">온/오프라인 매출 실적</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 천원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet yellow np">
                  <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                    <colgroup style="width: 1%">
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
                        <th rowspan="2">구분</th>
                        <th colspan="4">당일 ({{ month }}월 {{ toDay-1 }}일)</th>
                        <th colspan="4">당월({{ month }}월)</th>
                        <th colspan="4">연간누적({{ year }}년)</th>
                      </tr>
                      <tr>
                        <th>전체 매출</th>
                        <th>자사몰 매출</th>
                        <th>외부몰 매출</th>
                        <th>비율(%)</th>

                        <th>전체 매출</th>
                        <th>자사몰 매출</th>
                        <th>외부몰 매출</th>
                        <th>비율(%)</th>

                        <th>전체 매출</th>
                        <th>자사몰 매출</th>
                        <th>외부몰 매출</th>
                        <th>비율(%)</th>
                      </tr>
                    </thead>

                    <tbody id="sales_status" class="tbody_s">
                      <tr v-for="(data , index) in baseSaleList" v-bind:key="index" v-bind:class="totalClass(data.ITEM)">
                        <td style="font-weight: bold;">{{data.BRCD}}</td>

                        <td class="tr">{{ data.DAYTOT  | currency }}</td>
                        <td class="tr">{{ data.DAYJASA | currency }}</td>
                        <td class="tr">{{ data.DAYOUT | currency }}</td>
                        <td class="tr">{{ data.DAYRAT }}</td>
                        
                        <td class="tr">{{ data.MONTOT  | currency }}</td>
                        <td class="tr">{{ data.MONJASA | currency }}</td>
                        <td class="tr">{{ data.MONOUT | currency }}</td>
                        <td class="tr">{{ data.MONRAT }}</td>

                        <td class="tr">{{ data.YEARTOT  | currency }}</td>
                        <td class="tr">{{ data.YEARJASA | currency }}</td>
                        <td class="tr">{{ data.YEAROUT | currency }}</td>
                        <td class="tr">{{ data.YEARRAT }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt">월별 온라인 매출 실적</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
                <div style="margin-left: 10px; margin-right: 10px;">
                  <button type="button" class="btn_n" style="height:40px; vertical-align: top;"  @click="showDaily()"><label>일별 매출 현황</label></button>
                </div>
              </div>
              <div class="cont">
                <div class="tbl_sheet yellow np">
                  <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
                    <colgroup style="width: 1%">
                      <col />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                      <col />
                      <col />
                      <col class="bg_point_col19" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>년도</th>
                        <th colspan="3" v-for="s in 12" v-bind:key="s" v-bind:class="monthClass(s)" v-on:click="setChartData(s)" >{{s}} 월</th>
                      </tr>
                      <tr>
                        <th>구분</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>

                        <th>자사</th>
                        <th>외부</th>
                        <th>합계</th>
                      </tr>
                    </thead>

                    <tbody id="sales_status" class="tbody_s">
                      <tr v-for="(data , index) in brdSaleMslList" v-bind:key="index">
                        <td style="font-weight: bold;">{{data.BRCD}}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT1 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT1 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT1 | currency }}</td>
                        
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT2 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT2 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT2 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT3 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT3 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT3 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT4 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT4 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT4 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT5 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT5 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT5 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT6 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT6 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT6 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT7 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT7 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT7 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT8 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT8 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT8 | currency }}</td>
                        
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT9 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT9 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT9 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT10 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT10 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT10 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT11 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT11 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT11 | currency }}</td>

                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{ data.JASASILAMT12 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.OUTSILAMT12 | currency }}</td>
                        <td class="tr" v-bind:style="{fontWeight:data.BRCD=='TOTAL'?'bold':''}">{{  data.TOTSILAMT12 | currency }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_6 npr npl">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt" >일별 온라인 매출 추이</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 천원 &gt;</span>
              </div>
              <div class="cont">
                <div class="graph_area mr30" >
                  <div class="graph_view">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_md_6 npr npl">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt" >월별 온라인 매출 추이</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
              </div>
              <div class="cont">
                <div class="graph_area mr30" >
                  <div class="graph_view">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv2" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt" >잇미샤 월별 온/오프 판매비중</strong>
                <div class="layout_spacer"></div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet tbl_hover_none np">
                  <table class="tbl tbl_center">
                      <colgroup>
                        <col width="150px"/>
                        <col class="bg_point_col19" />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>{{year}} 년</th>
                          <th v-for="(s, index) in 12" v-bind:key="index">{{s}} 월</th>
                        </tr>
                      </thead>

                      <tbody class="tbody_s">
                        <tr v-for="(data , index) in itOnffImptMslList" :key="index" v-bind:class="totalClass(data.ITEM)">
                          <!-- <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" @click="addRow(data, index)">{{ data.ITEMNM }}</td> -->
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" >{{ data.ITEMNM }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT_TOT | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT1  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT2  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT3  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT4  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT5  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT6  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT7  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT8  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT9  | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT10 | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT11 | currency }}</td>
                          <td v-bind:style="{fontWeight:data.ITEM=='00'?'bold':''}" class="tr">{{ data.AMT12 | currency }}</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_12">
            <div class="cont_box">
              <div class="tit">
                <strong class="tit_txt" >test table</strong>
                <div class="layout_spacer"></div>
                <div style="margin-right: 10px;" v-for="(mon , index1) in monthList" v-bind:key="index1">
                  <button type="button" v-if="mon == clickedMonth" class="btn_primary" @click="getCalendarData(mon)" style="padding: 15px; display: block;">{{mon}} 월</button>
                  <button type="button" v-else class="btn_info" @click="getCalendarData(mon)" style="padding: 15px; display: block;">{{mon}} 월</button>
                </div>
                <span class="txt">&lt; 단위: 백만원 &gt;</span>
              </div>
              <div class="cont">
                <div class="tbl_sheet tbl_hover_none np">
                  <table class="tbl table_condensed tbl_center">
                    <thead>
                      <tr>
                        <th v-for="(weekName, index) in weekNames" v-bind:key="index">
                          {{weekName}}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in currentCalendarMatrix" :key="index" style="height: 100px !important;">
                        <td v-for="(date, index2) in row" :key="index2" style="padding:20px; ">
                          <span v-if="isToday(year, clickedMonth, date.day)" class="w100 tl pl10t" style="display: inline-block;">
                            <span class="rounded">{{date.day}}</span>
                          </span>
                          <span v-else class="w100 tl pl10" style="display: inline-block;">
                            {{date.day}}
                          </span>
                          <br/>
                          <span v-if="date.day != ''">
                            자사: {{date.JASASILAMT | currency}}
                          </span>
                          <span v-else></span>
                          <br/>
                          <span v-if="date.day != ''">
                            외부: {{date.OUTSILAMT | currency}}
                          </span>
                          <span v-else></span>
                          <br/>
                          <span v-if="date.day != ''">
                            합계: {{date.TOTSILAMT | currency}}
                          </span>
                          <span v-else></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <detail-msly-popup
        v-if="isDetailMslVisible"
        @close="closeDetailMsl"
        :year="year"
      /> -->
    <yearly-popup
        v-if="isYearlyVisible"
        @close="closeYearly"
        :year="year"
     />
    <daily-popup
        v-if="isDailyVisible"
        @close="closeDaily"
        :year="year"
    />
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'

// import DetailMslyPopup from '@/pages/online/ONL0104_1'
import YearlyPopup from '@/pages/online/ONL0103_1'
import DailyPopup from '@/pages/online/ONL0103_2'

export default {
  name: "ONL0103",
  components: {
    sideMenu,
    // DetailMslyPopup,
    YearlyPopup,
    DailyPopup
  },
  props: {
    data: Object
  },
  mounted() {
    this.setLoadData();
  },
  created() {

    // this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
  },
  data() {
    return {
      drawer: null,
      brand: 1,
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      toDay: new Date().getDate(),
      msg: 'This is OnLineSale page',
      // brandSaleList: [
      //   {"BRCD": "MI", "SUCD": "1",  "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "301", "OUTSILAMT3": "0", "TOTSILAMT3": "301", "JASASILAMT2": "422", "OUTSILAMT2": "0", "TOTSILAMT2": "422", "JASASILAMT1": "776", "OUTSILAMT1": "0", "TOTSILAMT1": "776", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "MO", "SUCD": "12", "JASASILAMT4": "0", "OUTSILAMT4": "0", "TOTSILAMT4": "0", "JASASILAMT3": "1357", "OUTSILAMT3": "0", "TOTSILAMT3": "1357", "JASASILAMT2": "2126", "OUTSILAMT2": "0", "TOTSILAMT2": "2126", "JASASILAMT1": "2675", "OUTSILAMT1": "0", "TOTSILAMT1": "2675", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "IT", "SUCD": "14", "JASASILAMT4": "264", "OUTSILAMT4": "1482", "TOTSILAMT4": "1746", "JASASILAMT3": "1127", "OUTSILAMT3": "1932", "TOTSILAMT3": "3059", "JASASILAMT2": "2665", "OUTSILAMT2": "1985", "TOTSILAMT2": "4650", "JASASILAMT1": "4519", "OUTSILAMT1": "3503", "TOTSILAMT1": "8022", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "IN", "SUCD": "23", "JASASILAMT4": "671", "OUTSILAMT4": "2760", "TOTSILAMT4": "3431", "JASASILAMT3": "1400", "OUTSILAMT3": "593", "TOTSILAMT3": "1993", "JASASILAMT2": "846", "OUTSILAMT2": "73", "TOTSILAMT2": "919", "JASASILAMT1": "1441", "OUTSILAMT1": "682", "TOTSILAMT1": "2123", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      //   {"BRCD": "SO", "SUCD": "3",  "JASASILAMT4": "29", "OUTSILAMT4": "662", "TOTSILAMT4": "691", "JASASILAMT3": "129", "OUTSILAMT3": "956", "TOTSILAMT3": "1085", "JASASILAMT2": "", "OUTSILAMT2": "", "TOTSILAMT2": "", "JASASILAMT1": "", "OUTSILAMT1": "", "TOTSILAMT1": "", "JASASILAMT": "0", "OUTSILAMT": "0", "TOTSILAMT": "0"},
      // ],
      itOnffImptList: [],
      month_start: 1,
      brdSaleMslList: [],
      itOnffImptMslList: [],
      // isDetailMslVisible: false,
      isYearlyVisible: false,
      isDailyVisible: false,
      baseSaleList: [],
      dailySaleList: [],
      monthlySaleList: [],

      weekNames: ["월요일", "화요일", "수요일","목요일", "금요일", "토요일", "일요일"],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [],
      clickedMonth: new Date().getMonth()+1,
      monthList: [],
    }
  },
  methods: {
    toMain: function () {
      this.$router.replace("/");
    },
    setLoadData: function () {
      for(var i=0; i<this.month; i++) {
        this.monthList.push(i+1)
      }

      this.currentMonthStartWeekIndex = this.getStartWeek(this.year, this.month);
      this.endOfDay = this.getEndOfDay(this.year, this.month);
      this.initCalendar();

      this.getSaleByBrdDetailData()
      this.getITOnOffSaleList()
      //this.getITOnOffDetailData()
      this.getBaseSaleList()
      this.setChartData(this.month)
    },
    getSaleByBrandList: function () {
      this.req2svr.getSaleByBrandList(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            //console.log("getSaleByBrandList", res);
            let thisYearData = JSON.parse("[" + res + "]");
            for(var i in this.brandSaleList) {
              for(var j in thisYearData) {
                if(this.brandSaleList[i].BRCD == thisYearData[j].MAINGU) {
                  this.brandSaleList[i]["JASASILAMT"] = thisYearData[j]["JASASILAMT"];
                  this.brandSaleList[i]["OUTSILAMT"] = thisYearData[j]["OUTSILAMT"];
                  this.brandSaleList[i]["TOTSILAMT"] = thisYearData[j]["TOTSILAMT"];
                }
              }
            }
            let totObj = {
              BRCD : "TOTAL", "SUCD": "",
              "JASASILAMT" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT); }), 
              "OUTSILAMT"  : _.sumBy(this.brandSaleList, function(o) { return Number(o.OUTSILAMT); }), 
              "TOTSILAMT"  : _.sumBy(this.brandSaleList, function(o) { return Number(o.TOTSILAMT); }),
              "JASASILAMT1": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }), 
              "OUTSILAMT1" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }), 
              "TOTSILAMT1" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT1); }),
              "JASASILAMT2": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }), 
              "OUTSILAMT2" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }), 
              "TOTSILAMT2" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT2); }),
              "JASASILAMT3": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }), 
              "OUTSILAMT3" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }), 
              "TOTSILAMT3" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT3); }),
              "JASASILAMT4": _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }), 
              "OUTSILAMT4" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }), 
              "TOTSILAMT4" : _.sumBy(this.brandSaleList, function(o) { return Number(o.JASASILAMT4); }),
            };
            this.brandSaleList.push(totObj);
            //console.log(this.brandSaleList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getITOnOffSaleList: function () {
      this.req2svr.getITOnOffSaleList(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            //console.log(res);
            let itYearData = JSON.parse("[" + res + "]");
            console.log("itYearData >>> ", itYearData);
            this.getITOnOffDetailData(itYearData)
            // for(var i in this.itOnffImptList) {
            //   for(var j in itYearData) {
            //     if(this.itOnffImptList[i].ITEM == itYearData[j].ITEM) {
            //       this.itOnffImptList[i].AMT = itYearData[j].AMT;
            //     }
            //   }
            // }

            // let offDataObj = {
            //   ITEM: "44", ITEMNM: "오프라인", 
            //   AMT_17: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_17), 
            //   AMT_18: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_18), 
            //   AMT_19: Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT_19), 
            //   AMT:    Number(_.find(this.itOnffImptList, {'ITEM': '00'}).AMT)
            // };
            // for(var i in this.itOnffImptList) {
            //   if(this.itOnffImptList[i].ITEM != "00") {
            //     offDataObj["AMT_17"]  -= Number(this.itOnffImptList[i]["AMT_17"]);
            //     offDataObj["AMT_18"]  -= Number(this.itOnffImptList[i]["AMT_18"]);
            //     offDataObj["AMT_19"]  -= Number(this.itOnffImptList[i]["AMT_19"]);
            //     offDataObj["AMT"]     -= Number(this.itOnffImptList[i]["AMT"]);
            //   }
            // }
            
            // this.itOnffImptList.push(offDataObj);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getBaseSaleList: function () { 
      this.req2svr.getBaseSaleList().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            console.log("getBaseSaleList >>> ", JSON.parse("[" + res + "]"));
            this.baseSaleList = JSON.parse("[" + res + "]");

            let totObj = {
              "BRCD": "합계",
              "SORT": "999",
              "ITEM": "00",
              "DAYTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYTOT); }),
              "DAYJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYJASA); }),
              "DAYOUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.DAYOUT); }),
              "DAYRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.DAYRAT); }),
              "MONTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONTOT); }),
              "MONJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONJASA); }),
              "MONOUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.MONOUT); }),
              "MONRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.MONRAT); }),
              "YEARTOT": _.sumBy(this.baseSaleList, function(o) { return Number(o.YEARTOT); }),
              "YEARJASA": _.sumBy(this.baseSaleList, function(o) { return Number(o.YEARJASA); }),
              "YEAROUT": _.sumBy(this.baseSaleList, function(o) { return Number(o.YEAROUT); }),
              "YEARRAT": _.meanBy(this.baseSaleList, function(o) { return Number(o.YEARRAT); })
            }

            this.baseSaleList.push(totObj);
            
            //console.log(this.brandSaleList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getSaleByBrdDetailData: function () {
      this.req2svr.getSaleByBrdDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.brdSaleMslList = JSON.parse("[" + res + "]");
            let totObj = {
              BRCD : "TOTAL", "SUCD": ""
            };

            for(var i=0; i < 12; i++) {
              totObj["JASASILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["JASASILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["OUTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["OUTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
              totObj["TOTSILAMT"+(i+1)] = this.brdSaleMslList.map(x => Number(x["TOTSILAMT"+(i+1)])).reduce(function (pre, value) { return pre + value; });
            }
            this.brdSaleMslList.push(totObj);
            console.log("this.brdSaleMslList >>> ", this.brdSaleMslList);
            //this.makeMonthlyChart(this.month, this.brdSaleMslList)
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    getITOnOffDetailData: function (itYearData) {
      this.req2svr.getITOnOffDetailData(this.year).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.itOnffImptMslList = JSON.parse("[" + res + "]");
            for(var i in this.itOnffImptMslList) {
              for(var j in itYearData) {
                if(this.itOnffImptMslList[i]["ITEM"] == itYearData[j]["ITEM"]) {
                  this.itOnffImptMslList[i]["AMT_TOT"] = itYearData[j]["AMT"]
                }
              }
              this.itOnffImptMslList[i]["ITEMNM"] = this.getItemNm(this.itOnffImptMslList[i]["ITEM"]);
            }

            let offDataObj = {
              ITEM: "44", ITEMNM: "오프라인",
              "AMT_TOT": this.itOnffImptMslList.map(x => Number(x["AMT_TOT"])).reduce(function (pre, value) { return pre - value; })
            };

            for(var i=0; i < 12; i++) {
              offDataObj["AMT"+(i+1)] = this.itOnffImptMslList.map(x => Number(x["AMT"+(i+1)])).reduce(function (pre, value) { return pre - value; });
            }
            this.itOnffImptMslList.push(offDataObj);
            console.log("getITOnOffDetailData >> ", this.itOnffImptMslList);
          }
        },
        rej => {
          console.log("rej", rej);
          let ItYearData = JSON.parse("[" + res + "]");
        }
      )
    },
    setChartData: function (mon) {
      if(mon <= this.month) {
        this.clickedMonth = mon
        this.getMonthlySaleList(mon)
        this.getDailySaleList(mon)
        this.getCalendarData(mon)
      }
    },
    getMonthlySaleList: function (mon) {
      // let startDate = this.year.toString() + "0101"
      let startDate = (this.year-1).toString() + this.twinNum(mon) + "01"
      let endDate = this.year.toString() + this.twinNum(mon) + ( new Date(this.year, mon, 0) ).getDate().toString();
      console.log("!!MonthlyDate >>> ", startDate, " / ", endDate);
      this.req2svr.getMonthlySaleList(startDate, endDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.monthlySaleList = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count == 1) {
              this.monthlySaleList.push(res);
            } else if(count > 1) {
              this.monthlySaleList = JSON.parse("[" + res + "]")
            }
            this.makeMonthlyChart(mon, this.monthlySaleList)
            console.log("monthlySaleList >>> ", this.monthlySaleList);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeMonthlyChart: function (mon, source) {
      /*
      let data = [];
      var set_day = new Date(this.year, mon, this.toDay);
      var set_month = mon
      for(var i = 0; i < 13; i++) {
        var chartObj = new Object();
        chartObj.MONTH = set_day.getFullYear()+"/"+set_month
        data.push(chartObj);
        for(let j in brandData) {
          if(brandData[j].MAINGU != "TOTAL") {
            // data[i][brandData[j].BRCD+"_AMT"] = Number(brandData[j]["TOTSILAMT"+(i+1)])
            data[i][brandData[j].BRCD+"_AMT"] = this.getRandomArbitrary(20,900)
          }
        }
        set_day.setMonth(set_day.getMonth()-(1))
        // console.log("set_month >> ", set_month, " / " , set_day.getMonth(), " / ", i+1);
        set_month = set_day.getMonth() == 0 ? 12: set_day.getMonth();
      }
      console.log("makeMonthlyChart >>> ", data)
      */
      
      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#67B7DC", "#A367DC", "#6771DC", "#DC6788"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: false,
          fontSize: 12
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "MI(백만원) : [[value]]",
            id: "AmGraph-Mi",
            valueField: "MISILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "MI(백만원)",
            bulletSize: 1,
            bullet: "diamond",
            markerType: "diamond"
          },
          {
            balloonText: "MO(백만원) : [[value]]",
            id: "AmGraph-MO",
            valueField: "MOSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "MO(백만원)",
            bulletSize: 1,
            bullet: "triangleUp",
            markerType: "triangleUp"
          },
          {
            balloonText: "IT(백만원) : [[value]]",
            id: "AmGraph-IT",
            valueField: "ITSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "IT(백만원)",
            bulletSize: 1,
            bullet: "round",
            markerType: "round"
          },
          {
            balloonText: "IN(백만원) : [[value]]",
            id: "AmGraph-IN",
            valueField: "INSILAMT",
            fillAlphas: 0,
            lineAlpha: 0.99,
            title: "IN(백만원)",
            bulletSize: 1,
            bullet: "square",
            markerType: "square"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: true,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 15,
          position: "top"
        },
        titles: [],
        dataProvider: source
      });
      /*
      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        theme: "none",
        categoryField: "SALEDT",
        categoryAxis: {
          gridPosition: "start",
          position: "left"
        },
        colors: ["#67B7DC", "#A367DC", "#6771DC", "#DC6788"],
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        graphs: [
          {
            balloonText: "MI:[[value]]",
            labelText: "[[value]]",
            fillAlphas: 0.8,
            id: "MISILAMT-1",
            lineAlpha: 0.2,
            title: "MI(백만원)",
            type: "column",
            valueField: "MISILAMT"
          }, {
            balloonText: "MO:[[value]]",
            labelText: "[[value]]",
            fillAlphas: 0.8,
            id: "MOSILAMT-2",
            lineAlpha: 0.2,
            title: "MO(백만원)",
            type: "column",
            valueField: "MOSILAMT"
          }, {
            balloonText: "IT:[[value]]",
            labelText: "[[value]]",
            fillAlphas: 0.8,
            id: "ITSILAMT-3",
            lineAlpha: 0.2,
            title: "IT(백만원)",
            type: "column",
            valueField: "ITSILAMT"
          }, {
            balloonText: "IN:[[value]]",
            labelText: "[[value]]",
            fillAlphas: 0.8,
            id: "INSILAMT-4",
            lineAlpha: 0.3,
            title: "IN(백만원)",
            type: "column",
            valueField: "INSILAMT"
          }
        ],
        valueAxes: [
          {
            id: "ValueAxis-1",
            position: "top",
            axisAlpha: 0
          }
        ],
        legend: {
          enabled: true,
          align: "center",
          fontSize: 15,
          position: "top",
          markerSize: 10
        },
        dataProvider: source,
      });
      */
    },
    getDailySaleList: function (mon) {
      let startDate = this.year.toString() + this.twinNum(mon) + "01"
      let endDate = this.year.toString() + this.twinNum(mon) + ( new Date(this.year, mon, 0) ).getDate().toString();
      console.log("!!DailyDate >>> ", startDate, " / ", endDate);
      this.req2svr.getDailySaleList(startDate, endDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.dailySaleList = [];
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count == 1) {
              this.dailySaleList.push(res);
            } else if(count > 1) {
              this.dailySaleList = JSON.parse("[" + res + "]")
            }
            this.makeDailyChart(mon, this.dailySaleList)
            console.log("dailySaleList >>> ", this.dailySaleList);
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeDailyChart: function (mon, source) {
      //let data = source

      AmCharts.makeChart("chartdiv", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: ["#67B7DC", "#A367DC", "#6771DC", "#DC6788"],
        sequencedAnimation: false,
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: false,
          fontSize: 12
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "MI(백만원) : [[value]]",
            id: "AmGraph-Mi",
            valueField: "MISILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "MI(백만원)",
            bulletSize: 1,
            bullet: "diamond",
            markerType: "diamond"
          },
          {
            balloonText: "MO(백만원) : [[value]]",
            id: "AmGraph-MO",
            valueField: "MOSILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "MO(백만원)",
            bulletSize: 1,
            bullet: "triangleUp",
            markerType: "triangleUp"
          },
          {
            balloonText: "IT(백만원) : [[value]]",
            id: "AmGraph-IT",
            valueField: "ITSILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "IT(백만원)",
            bulletSize: 1,
            bullet: "round",
            markerType: "round"
          },
          {
            balloonText: "IN(백만원) : [[value]]",
            id: "AmGraph-IN",
            valueField: "INSILAMT",
            fillAlphas: 0,
            lineAlpha: 1,
            title: "IN(백만원)",
            bulletSize: 1,
            bullet: "square",
            markerType: "square"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 15,
          position: "top"
        },
        titles: [],
        dataProvider: source
      });
    },
    getItemNm: function (item) {
      let returnNm = '';
      switch(item) {
        case '00': {
          returnNm = '매출합계';
          break;
        }
        case '11': {
          returnNm = '네이버(스타일윈도)';
          break;
        }
        case '22': {
          returnNm = '백화점몰';
          break;
        }
        case '33': {
          returnNm = '잇미샤몰';
          break;
        }
        case '44': {
          returnNm = '오프라인';
          break;
        }
      }
      return returnNm;
    },
    toDetail: function (value) {
      this.$router.push({
          name: 'ONL0104',
          params: {
            data: { 
              year: value
            }
          }
      })
    },
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === '00'
      }
    },
    monthClass: function (mon) {      
      return {
        'teamSelector': mon <= this.month
      }
    },
    addRow: function (row, idx) {
      if(row.ITEM != "TOTAL") {
        if(this.itOnffImptList[idx+1] != null && this.itOnffImptList[idx+1].ITEM == row.ITEM) {
          let arr = new Array();
          this.itOnffImptList.forEach((value, index) => {
            if(value.ITEM == row.ITEM && value.ITEMNM.indexOf(">>") == 0) {
              arr.push(index);
            }
          });
          this.itOnffImptList.splice(arr[0], arr.length);
        } else {
          this.itOnffImptList.splice(idx+1, 0, {ITEM: row.ITEM, ITEMNM: ">> " + row.ITEMNM + " 1", AMT_17: "1234", AMT_18: "5678", AMT_19: "91011", AMT: ""}, {ITEM: row.ITEM, ITEMNM: ">> " + row.ITEMNM + " 2", AMT_17: "1234", AMT_18: "5678", AMT_19: "91011", AMT: ""})
        }
      }
    },
    // showDetailMsl(year) {
    //   this.year = year
    //   this.isDetailMslVisible = true;
    // },
    // closeDetailMsl() {
    //   this.isDetailMslVisible = false;
    // },
    showYearly() {
      this.isYearlyVisible = true;
    },
    closeYearly() {
      this.isYearlyVisible = false;
    },
    showDaily() {
      this.isDailyVisible = true;
    },
    closeDaily() {
      this.isDailyVisible = false;
    },
    twinNum: function (num) {
      if(num.toString().length == 1) {
        return "0"+num.toString();
      } else {
        return num.toString();
      }
    },
    getRandomArbitrary: function (min, max) {
      return Number(Math.random() * (max - min) + min).toFixed(0);
    },
    initCalendar:function(){
      this.currentCalendarMatrix = [];
      let day=1;
      let currDay = new Date(this.year, this.month, this.toDay)
      for(let i=0; i<6; i++){
        let calendarRow = [];
        for(let j=0; j<7; j++){
          let tempObj = new Object();
          if(i==0 && j<this.currentMonthStartWeekIndex){
            tempObj.day = ""
            tempObj.JASASILAMT = ""
            tempObj.OUTSILAMT = ""
            tempObj.TOTSILAMT = ""
          }
          else if(day<=this.endOfDay){
            tempObj.day = day
            let compDay = new Date(this.year, this.clickedMonth, day)
            if(compDay > currDay) {
              tempObj.JASASILAMT = ""
              tempObj.OUTSILAMT = ""
              tempObj.TOTSILAMT = ""
            } else {
              tempObj.JASASILAMT = Number(this.getRandomArbitrary(150000, 300000))
              tempObj.OUTSILAMT = Number(this.getRandomArbitrary(50000, 100000))
              tempObj.TOTSILAMT = tempObj.JASASILAMT + tempObj.OUTSILAMT
            }
            day++;
          }
          else{
            tempObj.day = ""
            tempObj.JASASILAMT = ""
            tempObj.OUTSILAMT = ""
            tempObj.TOTSILAMT = ""
          }
          if(i==5 && tempObj.day == "" && day > this.endOfDay) {
          } else {
            calendarRow.push(tempObj);
          }
        }
        this.currentCalendarMatrix.push(calendarRow);
      }

      let lastIndex = this.currentCalendarMatrix.length-1
      if(this.currentCalendarMatrix[0].length > this.currentCalendarMatrix[lastIndex].length && this.currentCalendarMatrix[lastIndex].length != 0) {
        let tempCount = this.currentCalendarMatrix[0].length - this.currentCalendarMatrix[lastIndex].length
        for(let i=0; i < tempCount; i++) {
          let tempObj = new Object();
          tempObj.day = ""
          tempObj.JASASILAMT = ""
          tempObj.OUTSILAMT = ""
          tempObj.TOTSILAMT = ""
          this.currentCalendarMatrix[lastIndex].push(tempObj)
        }
      }
      // console.log("!!!!!!????? >>>> ", this.currentCalendarMatrix)
    },
    getEndOfDay: function(year, month){
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              return 31;
              break;
            case 4:
            case 6:
            case 9:
            case 11:
              return 30;
              break;
            case 2:
              if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
              return 29;   
              }
              else{
                  return 28;
              }
              break;
            default:
              console.log("unknown month " + month);
              return 0;
              break;
        }
    },
    getStartWeek: function(targetYear, targetMonth){
      let year = this.rootYear;
      let month = 1;
      let sumOfDay = this.rootDayOfWeekIndex;
      while(true){
        if(targetYear > year){
          for(let i=0; i<12; i++){
            sumOfDay += this.getEndOfDay(year, month+i);
          }
          year++;
        }
        else if(targetYear == year){
          if(targetMonth > month){
            sumOfDay += this.getEndOfDay(year, month);
            month++;
          }
          else if(targetMonth == month){
            return (sumOfDay)%7;
          }
        }
      }
    },
    onClickPrev: function(month){
      month--;
      if(month<=0){
        this.month = 12;
        this.year -= 1;
      }
      else{
        this.month -= 1;
      }
      this.init();
    },
    onClickNext: function(month){
      month++;
      if(month>12){
        this.month = 1;
        this.year += 1;
      }
      else{
        this.month += 1;
      }
      this.init();
    },
    isToday: function(year, month, day){
      let date = new Date();
      return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
    },
    getCalendarData: function(mon) {
      this.currentMonthStartWeekIndex = this.getStartWeek(this.year, mon);
      this.endOfDay = this.getEndOfDay(this.year, mon);
      this.clickedMonth = mon
      this.initCalendar();
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
    comma: function(num) {
      let str
      if(num != "" && num != null && num != "undefined") {
        str = num.toString();
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } else {
        return "";
      }
      
    }
  }
}
</script>