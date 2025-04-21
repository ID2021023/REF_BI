<template>
  <div>
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
    <header class="header wrap">
      <div class="header_inner">
        <!-- tabs -->
        <div class="toggle_group">
          <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': selectedSUCD == data.MCODE}">
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              :value="data.MCODE"
              v-model="selectedSUCD"
              style="display:none"
              @click="changeCODE(data.MCODE)"
              :disabled="!data.VISIBLE"
            >
            <span class="btn_n txt_label">{{ data.CODNM }}</span>
          </label>
        </div>
      </div>
    </header>

    <div class="w100 bg_point_col11 mb20">
      <!-- tabs -->
      <div class="tabs">
        <ul class="tab_list">
          <!--활성화 class on-->
          <li class="on"><a href="javascript:void(0);" @click="link('WEE0101')">복종별 판매 및 할인율</a></li>
          <li><a href="javascript:void(0);" @click="link('WEE0401')">주간판매 동향</a></li>
          <li><a href="javascript:void(0);" @click="link('WEE0201')">주간판매 BEST 20</a></li>
          <li><a href="javascript:void(0);" @click="link('WEE0301')">신상품 반응조사</a></li>
        </ul>
      </div>
    </div>

          <header class="header wrap">
            <div class="header_inner np" style="margin-top: -20px;">
                <!-- Title -->
                <h2 class="layout_title ">
                    <small class="txt_date np">
                        <strong class="point_col1">{{ year }}년 {{ month }}월</strong>
                    </small>
                </h2>

                <div class="layout_spacer"></div>

                <!-- groups -->
                <div class="groups">
                    <div class="toggle_group">
                        <span class="sub_title mr10">(최종 정보수정일: 19.08.05)</span>
                    </div>
                    <button type="button" class="btn_n" style="height:55px;" @click="excelDownLoad('exceldown_tbody')">다운로드</button>
                    <div class="select_box" style="min-width:50px;">
                      <!-- <select class="select" v-model="seasonStartYear" @change="loadData"> -->
                      <select class="select" v-model="seasonStartYear">
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box" style="min-width:50px; margin-right:10px;">
                      <!-- <select class="select" v-model="seasonStartMonth" @change="loadData"> -->
                      <select class="select" v-model="seasonStartMonth">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div style="line-height:55px;">~</div>
                    <div class="select_box" style="min-width:50px;">
                      <!-- <select class="select" v-model="seasonEndYear" @change="loadData"> -->
                      <select class="select" v-model="seasonEndYear">
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box" style="min-width:50px;">
                      <!-- <select class="select" v-model="seasonEndMonth" @change="loadData"> -->
                      <select class="select" v-model="seasonEndMonth">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <!-- date -->
                    <div class="input_group input_icon_group"  style="width:210px;">
                        <!-- date -->
                        <form action="#">
                            <label class="btn_icon_nl" for="date">
                                <i class="material-icons">calendar_today</i>
                            </label>
                            <div class="input_text" type="text" id="startdate">
                              <date-pick
                                v-model="calStartDate"
                                startWeekOnSunday
                                :inputAttributes="{readonly: true}"
                              ></date-pick>
                              <!-- @input="chageDate" -->
                            </div>
                        </form>
                    </div>
                    <!-- date -->
                    <div class="input_group input_icon_group"  style="width:210px;">
                        <!-- date -->
                        <form action="#">
                            <label class="btn_icon_nl" for="date">
                                <i class="material-icons">calendar_today</i>
                            </label>
                            <div class="input_text" type="text" id="enddate">
                              <date-pick
                                v-model="calDefaultDate"
                                startWeekOnSunday
                                :inputAttributes="{readonly: true}"
                              ></date-pick>
                              <!-- @input="chageDate" -->
                            </div>
                        </form>
                    </div>
                    <button type="button" class="btn_n" style="height:55px;margin-left:10px;" @click="chageDate()">조회</button>
                </div>
            </div>
        </header>

        <!-- box2 -->
        <div class="cont_box">
            <div class="tit">
                <div class="tab">
                    <ul>
                        <li :class="{on: weeklyTab == 0}"><a href="javascript:void(0);" @click="changeWeeklyTab(0)">전년대비 복종별 판매현황 ({{ seasonStartYear + seasonStartMonth }}~{{ seasonEndYear + seasonEndMonth }})</a></li>
                        <li :class="{on: weeklyTab == 1}"><a href="javascript:void(0);" @click="changeWeeklyTab(1)">SUMMARY</a></li>
                    </ul>
                </div>
                <div class="layout_spacer"></div>
                <span class="txt">단위 : 백만원 / 기준일 : {{ standardStartDate }} ~ {{ standardEndDate }}</span>
            </div>
            <div class="container" v-show="weeklyTab == 0">
                <div class="content">
                    <!-- 테이블 -->
                    <iframe id="txtArea1" style="display:none;" />
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
                                <col class="bg_point_col19" />
                                <col class="bg_point_col19" />
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
                                <col class="bg_point_col19" />
                                <col class="bg_point_col19" />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowspan="3">복종</th>
                                    <th v-bind:colspan="(selectedSUCD == 3)?13:11">{{ year }}</th>
                                    <th v-bind:colspan="(selectedSUCD == 3)?13:11">{{ year-1 }}</th>
                                    <th rowspan="3">전년대비<br>금액<br>소진율</th>
                                    <th colspan="7" v-if="selectedSUCD == 3">증감율(금액)</th>
                                </tr>
                                <tr>
                                    <th rowspan="2">M수</th>
                                    <th v-bind:colspan="(selectedSUCD == 3)?4:3">입고</th>
                                    <th colspan="2">기간판매</th>
                                    <th rowspan="2">비중</th>
                                    <th v-bind:colspan="(selectedSUCD == 3)?3:2">누계판매</th>
                                    <th colspan="2">소진율</th>

                                    <th rowspan="2">M수</th>
                                    <th v-bind:colspan="(selectedSUCD == 3)?4:3">입고</th>
                                    <th colspan="2">기간판매</th>
                                    <th rowspan="2">비중</th>
                                    <th v-bind:colspan="(selectedSUCD == 3)?3:2">누계판매</th>
                                    <th colspan="2">소진율</th>

                                    <th colspan="2" v-if="selectedSUCD == 3">입고</th>
                                    <th colspan="2" v-if="selectedSUCD == 3">누계판매</th>
                                    <th colspan="3" v-if="selectedSUCD == 3">기간판매</th>
                                </tr>
                                <tr>
                                    <th>수량</th>
                                    <th>금액</th>
                                    <th v-if="selectedSUCD == 3">실TAG금액</th>
                                    <th>비중</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                    <th>수량</th>
                                    <th>금액(실판가)</th>
                                    <th v-if="selectedSUCD == 3">판매율</th>
                                    <th>수량</th>
                                    <th>금액</th>

                                    <th>수량</th>
                                    <th>금액</th>
                                    <th v-if="selectedSUCD == 3">실TAG금액</th>
                                    <th>비중</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                    <th>수량</th>
                                    <th>금액(실판가)</th>
                                    <th v-if="selectedSUCD == 3">판매율</th>
                                    <th>수량</th>
                                    <th>금액</th>

                                    <th colspan="2" v-if="selectedSUCD == 3">금액오차</th>
                                    <th v-if="selectedSUCD == 3">금액오차</th>
                                    <th v-if="selectedSUCD == 3">누계판매</th>
                                    <th v-if="selectedSUCD == 3">금액오차</th>
                                    <th v-if="selectedSUCD == 3">누계판매</th>
                                    <th v-if="selectedSUCD == 3">비중</th>
                                </tr>
                            </thead>

                            <tbody id="sales_status" class="tbody_s">
                                <!-- JK -->
                                <!--선택 class:on-->
                                <!-- <tr v-for="(data , index) in SalesStatusData" :key="data.ITEM" v-bind:class="totalClass(data.ITEM)" @click="highlight(index)"> -->
                                <tr v-for="(data , index) in SalesStatusData" :key="data.ITEM" v-bind:class="totalClass(data.ITEM)">
                                    <td>{{ data.ITEM }}</td>
                                    <td class="tr" name="MCNT" @click="bold('MCNT', index)">{{ data.MCNT }}</td>
                                    <td class="tr" name="INQTY" @click="bold('INQTY', index)">{{ data.INQTY | currency }}</td>
                                    <td class="tr" name="INAMT" @click="bold('INAMT', index)">{{ data.INAMT | currency }}</td>
                                    <td class="tr" name="SOINAMT" @click="bold('SOINAMT', index)" v-if="selectedSUCD == 3">{{ data.SOINAMT | currency }}</td>
                                    <td name="TINAMT" @click="bold('TINAMT', index)">{{ data.TINAMT }}%</td>
                                    <td class="tr" name="SQTY" @click="bold('SQTY', index)">{{ data.SQTY | currency }}</td>
                                    <td class="tr" name="SILAMT" @click="bold('SILAMT', index)">{{ data.SILAMT | currency }}</td>
                                    <td name="TSILAMT" @click="bold('TSILAMT', index)">{{ data.TSILAMT }}%</td>
                                    <td class="tr" name="ACCSQTY" @click="bold('ACCSQTY', index)">{{ data.ACCSQTY | currency }}</td>
                                    <td class="tr" name="ACCSILAMT" @click="bold('ACCSILAMT', index)">{{ data.ACCSILAMT | currency }}</td>
                                    <td name="SOPER" @click="bold('SOPER', index)" v-if="selectedSUCD == 3">{{ data.SOPER }}%</td>
                                    <td name="PERQTY" @click="bold('PERQTY', index)">{{ data.PERQTY }}%</td>
                                    <td name="PERAMT" @click="bold('PERAMT', index)">{{ data.PERAMT }}%</td>

                                    <td class="tr" name="MCNT" @click="bold('MCNT', index)">{{ data.JMCNT | currency }}</td>
                                    <td class="tr" name="INQTY" @click="bold('INQTY', index)">{{ data.JINQTY | currency }}</td>
                                    <td class="tr" name="INAMT" @click="bold('INAMT', index)">{{ data.JINAMT | currency }}</td>
                                    <td class="tr" name="SOINAMT" @click="bold('SOINAMT', index)" v-if="selectedSUCD == 3">{{ data.JSOINAMT | currency }}</td>
                                    <td name="TINAMT" @click="bold('TINAMT', index)">{{ data.TJINAMT }}%</td>
                                    <td class="tr" name="SQTY" @click="bold('SQTY', index)">{{ data.JSQTY | currency }}</td>
                                    <td class="tr" name="SILAMT" @click="bold('SILAMT', index)">{{ data.JSILAMT | currency }}</td>
                                    <td name="TSILAMT" @click="bold('TSILAMT', index)">{{ data.TJSILAMT }}%</td>
                                    <td class="tr" name="ACCSQTY" @click="bold('ACCSQTY', index)">{{ data.JACCSQTY | currency }}</td>
                                    <td class="tr" name="ACCSILAMT" @click="bold('ACCSILAMT', index)">{{ data.JACCSILAMT | currency }}</td>
                                    <td name="SOPER" @click="bold('SOPER', index)" v-if="selectedSUCD == 3">{{ data.JSOPER }}%</td>
                                    <td name="PERQTY" @click="bold('PERQTY', index)">{{ data.JPERQTY }}%</td>
                                    <td name="PERAMT" @click="bold('PERAMT', index)">{{ data.JPERAMT }}%</td>
                                    <td>{{ data.RESULT }}%</td>

                                    <td class="tr" v-if="selectedSUCD == 3">{{ data.ERRINAMT | currency }}</td>
                                    <td class="tr" v-if="selectedSUCD == 3">
                                        <!-- icon 빨간색 : col_danger -->
                                        <i class="material-icons col_danger">arrow_drop_down</i>{{ data.ERRINPER }}%
                                    </td>
                                    <td class="tr" v-if="selectedSUCD == 3">{{ data.ERRINAMT | currency }}</td>
                                    <td class="tr" v-if="selectedSUCD == 3">
                                        <!-- icon 빨간색 : col_danger -->
                                        <i class="material-icons col_danger">arrow_drop_down</i>{{ data.ERRACCPER }}%
                                    </td>
                                    <td class="tr" v-if="selectedSUCD == 3">{{ data.ERRSAMT | currency }}</td>
                                    <td class="tr" v-if="selectedSUCD == 3">{{ data.ERRSPER }}%</td>
                                    <td class="tr" v-if="selectedSUCD == 3">
                                        <!-- icon 빨간색 : col_danger -->
                                        <i class="material-icons col_danger">arrow_drop_down</i>{{ data.SORTORD }}%
                                    </td>
                                </tr>

                                <tr class="bg_point_col11">
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tbl_sheet tbl_hover_none np">
                        <table class="tbl tbl_center">
                            <colgroup>
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
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>{{ year }}</th>
                                    <th>시즌</th>
                                    <th>1월</th>
                                    <th>2월</th>
                                    <th>3월</th>
                                    <th>4월</th>
                                    <th>5월</th>
                                    <th>6월</th>
                                    <th>7월</th>
                                    <th>8월</th>
                                    <th>9월</th>
                                    <th>10월</th>
                                    <th>11월</th>
                                    <th>12월</th>

                                    <th>{{ year-1 }}</th>
                                    <th>시즌</th>
                                    <th>1월</th>
                                    <th>2월</th>
                                    <th>3월</th>
                                    <th>4월</th>
                                    <th>5월</th>
                                    <th>6월</th>
                                    <th>7월</th>
                                    <th>8월</th>
                                    <th>9월</th>
                                    <th>10월</th>
                                    <th>11월</th>
                                    <th>12월</th>
                                </tr>
                            </thead>

                            <tbody class="tbody_s">
                                <!-- <tr class="bg_point_col20">
                                    <td colspan="2" class="bg_point_col21">목표</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>

                                    <td colspan="2" class="bg_point_col21">목표</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                    <td>13%</td>
                                </tr> -->
                                <tr v-for="(data , index) in salesResultData" :key="data.SALEGUNM" v-bind:class="(index+1 == salesResultData.length)?'bg_point_col19':''">
                                    <td v-if="index==0" class="bg_point_col21" v-bind:rowspan="salesResultData.length">실적</td>
                                    <td class="bg_point_col21">{{ data.YCD }}</td>
                                    <td>{{ data.S01PER }}%</td>
                                    <td>{{ data.S02PER }}%</td>
                                    <td>{{ data.S03PER }}%</td>
                                    <td>{{ data.S04PER }}%</td>
                                    <td>{{ data.S05PER }}%</td>
                                    <td>{{ data.S06PER }}%</td>
                                    <td>{{ data.S07PER }}%</td>
                                    <td>{{ data.S08PER }}%</td>
                                    <td>{{ data.S09PER }}%</td>
                                    <td>{{ data.S10PER }}%</td>
                                    <td>{{ data.S11PER }}%</td>
                                    <td>{{ data.S12PER }}%</td>

                                    <td v-if="index==0" class="bg_point_col21" v-bind:rowspan="salesResultData.length">실적</td>
                                    <td class="bg_point_col21">{{ data.YCD }}</td>
                                    <td>{{ data.JS01PER }}%</td>
                                    <td>{{ data.JS02PER }}%</td>
                                    <td>{{ data.JS03PER }}%</td>
                                    <td>{{ data.JS04PER }}%</td>
                                    <td>{{ data.JS05PER }}%</td>
                                    <td>{{ data.JS06PER }}%</td>
                                    <td>{{ data.JS07PER }}%</td>
                                    <td>{{ data.JS08PER }}%</td>
                                    <td>{{ data.JS09PER }}%</td>
                                    <td>{{ data.JS10PER }}%</td>
                                    <td>{{ data.JS11PER }}%</td>
                                    <td>{{ data.JS12PER }}%</td>
                                </tr>
                                <!-- <tr class="bg_point_col19">
                                    <td colspan="2" class="bg_point_col21">차이</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td colspan="2" class="bg_point_col21">차이</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> -->
                                <tr class="bg_point_col11">
                                </tr>
                                <tr class="bg_point_col20">
                                    <td class="bg_point_col21">월매출</td>
                                    <td class="bg_point_col21">{{ cMonthlySalesTotal | currency }}</td>
                                    <td>{{ monthlySalesData.S01QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S02QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S03QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S04QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S05QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S06QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S07QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S08QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S09QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S10QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S11QTY | currency }}</td>
                                    <td>{{ monthlySalesData.S12QTY | currency }}</td>

                                    <td class="bg_point_col21">월매출</td>
                                    <td class="bg_point_col21">{{ lMonthlySalesTotal | currency }}</td>
                                    <td>{{ monthlySalesData.JS01QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS02QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS03QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS04QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS05QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS06QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS07QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS08QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS09QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS10QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS11QTY | currency }}</td>
                                    <td>{{ monthlySalesData.JS12QTY | currency }}</td>
                                </tr>
                                <tr v-for="(data , index) in foreignerData" :key="data.SALEGUNM">
                                    <td v-if="index==0" class="bg_point_col21" v-bind:rowspan="foreignerData.length">외국인</td>
                                    <td class="bg_point_col21">{{ data.SALEGUNM.replace("외국인", "").replace("할인", "") }}</td>
                                    <td>{{ data.S01QTY | currency }}</td>
                                    <td>{{ data.S02QTY | currency }}</td>
                                    <td>{{ data.S03QTY | currency }}</td>
                                    <td>{{ data.S04QTY | currency }}</td>
                                    <td>{{ data.S05QTY | currency }}</td>
                                    <td>{{ data.S06QTY | currency }}</td>
                                    <td>{{ data.S07QTY | currency }}</td>
                                    <td>{{ data.S08QTY | currency }}</td>
                                    <td>{{ data.S09QTY | currency }}</td>
                                    <td>{{ data.S10QTY | currency }}</td>
                                    <td>{{ data.S11QTY | currency }}</td>
                                    <td>{{ data.S12QTY | currency }}</td>

                                    <td v-if="index==0" class="bg_point_col21" v-bind:rowspan="foreignerData.length">외국인</td>
                                    <td class="bg_point_col21">{{ data.SALEGUNM.replace("외국인", "").replace("할인", "") }}</td>
                                    <td>{{ data.JS01QTY | currency }}</td>
                                    <td>{{ data.JS02QTY | currency }}</td>
                                    <td>{{ data.JS03QTY | currency }}</td>
                                    <td>{{ data.JS04QTY | currency }}</td>
                                    <td>{{ data.JS05QTY | currency }}</td>
                                    <td>{{ data.JS06QTY | currency }}</td>
                                    <td>{{ data.JS07QTY | currency }}</td>
                                    <td>{{ data.JS08QTY | currency }}</td>
                                    <td>{{ data.JS09QTY | currency }}</td>
                                    <td>{{ data.JS10QTY | currency }}</td>
                                    <td>{{ data.JS11QTY | currency }}</td>
                                    <td>{{ data.JS12QTY | currency }}</td>
                                </tr>
                                <tr class="bg_point_col19">
                                    <td class="bg_point_col21">계</td>
                                    <td class="bg_point_col21">{{ cForeignerSumTotal | currency }}</td>
                                    <td>{{ foreignerSumData.S01QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S02QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S03QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S04QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S05QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S06QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S07QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S08QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S09QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S10QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S11QTY | currency }}</td>
                                    <td>{{ foreignerSumData.S12QTY | currency }}</td>

                                    <td class="bg_point_col21">계</td>
                                    <td class="bg_point_col21">{{ lForeignerSumTotal | currency }}</td>
                                    <td>{{ foreignerSumData.JS01QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS02QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS03QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS04QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS05QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS06QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS07QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS08QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS09QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS10QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS11QTY | currency }}</td>
                                    <td>{{ foreignerSumData.JS12QTY | currency }}</td>
                                </tr>
                                <tr class="bg_point_col19">
                                    <td class="bg_point_col21">비중</td>
                                    <td class="bg_point_col21">{{ importanceData.CTOTAL | currency }}%</td>
                                    <td>{{ importanceData.S01QTY | currency }}%</td>
                                    <td>{{ importanceData.S02QTY | currency }}%</td>
                                    <td>{{ importanceData.S03QTY | currency }}%</td>
                                    <td>{{ importanceData.S04QTY | currency }}%</td>
                                    <td>{{ importanceData.S05QTY | currency }}%</td>
                                    <td>{{ importanceData.S06QTY | currency }}%</td>
                                    <td>{{ importanceData.S07QTY | currency }}%</td>
                                    <td>{{ importanceData.S08QTY | currency }}%</td>
                                    <td>{{ importanceData.S09QTY | currency }}%</td>
                                    <td>{{ importanceData.S10QTY | currency }}%</td>
                                    <td>{{ importanceData.S11QTY | currency }}%</td>
                                    <td>{{ importanceData.S12QTY | currency }}%</td>

                                    <td class="bg_point_col21">비중</td>
                                    <td class="bg_point_col21">{{ importanceData.LTOTAL | currency }}%</td>
                                    <td>{{ importanceData.JS01QTY | currency }}%</td>
                                    <td>{{ importanceData.JS02QTY | currency }}%</td>
                                    <td>{{ importanceData.JS03QTY | currency }}%</td>
                                    <td>{{ importanceData.JS04QTY | currency }}%</td>
                                    <td>{{ importanceData.JS05QTY | currency }}%</td>
                                    <td>{{ importanceData.JS06QTY | currency }}%</td>
                                    <td>{{ importanceData.JS07QTY | currency }}%</td>
                                    <td>{{ importanceData.JS08QTY | currency }}%</td>
                                    <td>{{ importanceData.JS09QTY | currency }}%</td>
                                    <td>{{ importanceData.JS10QTY | currency }}%</td>
                                    <td>{{ importanceData.JS11QTY | currency }}%</td>
                                    <td>{{ importanceData.JS12QTY | currency }}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="container" v-show="weeklyTab == 1">
                <div class="content">
                    <div class="list_box noline">
                        <!-- 계산 카드 리스트 -->
                        <ul class="list_card" style="border-bottom: 1px solid #E0E2E5">
                            <li>
                                <!-- card_ -->
                                <div class="card card_mini">
                                    <div class="card_title">
                                        <h4 class="card_title_text">입고</h4>
                                    </div>
                                    <div class="card_content">
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">수량</dt>
                                            </dl>{{ totalData.INQTY | currency }}<small class="txt mr50"></small>
                                        </strong>
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">금액</dt>
                                            </dl>{{ totalData.INAMT | currency }}<small class="txt">백만원</small>
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <!-- card_ -->
                                <div class="card card_mini">
                                    <div class="card_title">
                                        <h4 class="card_title_text">기간판매</h4>
                                    </div>
                                    <div class="card_content">
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">수량</dt>
                                            </dl>{{ totalData.SQTY | currency }}<small class="txt mr50"></small>
                                        </strong>
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">금액</dt>
                                            </dl>{{ totalData.SILAMT | currency }}<small class="txt">백만원</small>
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <!-- card_ -->
                                <div class="card card_mini">
                                    <div class="card_title">
                                        <h4 class="card_title_text">누적판매</h4>
                                    </div>
                                    <div class="card_content">
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">수량</dt>
                                            </dl>{{ totalData.ACCSQTY | currency }}<small class="txt mr50"></small>
                                        </strong>
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">금액</dt>
                                            </dl>{{ totalData.ACCSILAMT | currency }}<small class="txt">백만원</small>
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <!-- card_ -->
                                <div class="card card_mini">
                                    <div class="card_title">
                                        <h4 class="card_title_text">소진율</h4>
                                    </div>
                                    <div class="card_content">
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">수량</dt>
                                            </dl>{{ totalData.PERQTY }}<small class="txt2">%</small>
                                        </strong>
                                        <strong class="em_obj">
                                            <dl class="list_obj ilb mr10">
                                                <dt class="tit block">금액</dt>
                                            </dl>{{ totalData.PERAMT }}<small class="txt2">%</small>
                                        </strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="cont" style="height:400px;" v-show="weeklyTab == 1">
                <div class="graph_area">
                    <!-- 그래프 1 -->
                    <div class="graph_view">
                        <!-- 텍스트 값 -->
                        <div class="graph_result">
                            <strong style="color:#3F93F5;">
                            매출실적 추이(%)</strong>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph" style="position:relative; width:100%; height:270px;">
                          <div id="chartdiv1" style="position:relative; float:left; width:100%; height:270px;"></div>
                        </div>
                        <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기
                        <div class="graph_category">
                            <ul>
                                <li><span class="ico_dot" style="background-color:#3F93F5;"></span>당년</li>
                                <li><span class="ico_dot" style="background-color:#B5B5B5;"></span>목표</li>
                                <li><span class="ico_dot" style="background-color:#8EC2FF;"></span>전년</li>
                            </ul>
                        </div> -->
                    </div>
                    <!-- 그래프 2 -->
                    <div class="graph_view">
                        <!-- 텍스트 값 -->
                        <div class="graph_result">
                            <strong style="color:#3AAF70;">
                            외국인 비중(%)</strong>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph" style="position:relative; width:100%; height:270px;">
                          <div id="chartdiv2" style="position:relative; float:left; width:100%; height:270px;"></div>
                        </div>
                        <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기
                        <div class="graph_category">
                            <ul>
                                <li><span class="ico_dot" style="background-color:#3AAF70;"></span>당년</li>
                                <li><span class="ico_dot" style="background-color:#B5B5B5;"></span>목표</li>
                                <li><span class="ico_dot" style="background-color:#9CDDB9;"></span>전년</li>
                            </ul>
                        </div> -->
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
import datePick from "vue-date-pick"

export default {
  name: "WEE0101",
  components: {
    sideMenu,
    datePick
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.loadData()
  },
  data() {
    return {
      weeklyTab:0,
      clickYn: false,
      drawer: null,
      selectedSUCD: null,
      year: "",
      month: "",
      yearList: [],
      monthList: [],
      SalesStatusData : [],
      monthlySalesData : {},
      foreignerSumData : {},
      foreignerData : [],
      salesResultData : [],
      totalData : {},
      importanceData : {},
      cMonthlySalesTotal : 0,
      lMonthlySalesTotal : 0,
      cForeignerSumTotal : 0,
      lForeignerSumTotal : 0,
      seasonStartYear: null,
      seasonStartMonth: null,
      seasonEndYear: null,
      seasonEndMonth: null,
      lastseasonStartYear: null,
      lastseasonStartMonth: null,
      calDefaultDate: "",
      standardStartDate: null,
      standardEndDate: null,
      //켈린더 추가
      calStartDate: "",
      startDate: "",
      endDate: "",
      startYear: "",
      startMonth: "",
      // 매출추이
      dr_P: [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }],
      foreign: "f_include",
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ]
    }
  },
  created() {
    this.calDefaultDate = moment().day('Sunday').format('YYYY-MM-DD')
    this.standardStartDate = moment(this.calDefaultDate).subtract(6, 'days').format('YY-MM-DD')
    this.standardEndDate = this.calDefaultDate
    this.year = moment(this.calDefaultDate).format("YYYY");
    this.month = moment(this.calDefaultDate).format("M");
    //켈린더 하나더 추가
    this.calStartDate = moment().day(-6).format('YYYY-MM-DD')
    this.startDate = moment(this.calStartDate).subtract(6, 'days').format('YY-MM-DD')
    this.endDate = this.calStartDate
    this.startYear = moment(this.calStartDate).format("YYYY");
    this.startMonth = moment(this.calStartDate).format("M");

    if(this.data) {
      this.selectedSUCD = this.data.selectSucd
    } else {
      this.selectedSUCD = this.authCodeList[0].MCODE
    }

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
    
    this.lastseasonStartYear = String.fromCharCode(this.seasonStartYear.charCodeAt()-1)
    this.lastseasonEndYear = String.fromCharCode(this.seasonEndYear.charCodeAt()-1)
    // 매출추이
    this.dr_P = [{"AMT":36,"LY_SALE_TOT":37,"SALE_TOT":49,"SALEDT":"10/8","SUNM":"미샤"},{"AMT":86,"LY_SALE_TOT":80,"SALE_TOT":144,"SALEDT":"10/9","SUNM":"미샤"},{"AMT":36,"LY_SALE_TOT":36,"SALE_TOT":70,"SALEDT":"10/10","SUNM":"미샤"},{"AMT":175,"LY_SALE_TOT":24,"SALE_TOT":73,"SALEDT":"10/11","SUNM":"미샤"},{"AMT":110,"LY_SALE_TOT":190,"SALE_TOT":134,"SALEDT":"10/12","SUNM":"미샤"},{"AMT":390,"LY_SALE_TOT":136,"SALE_TOT":170,"SALEDT":"10/13","SUNM":"미샤"},{"AMT":0,"LY_SALE_TOT":393,"SALE_TOT":0,"SALEDT":"10/14","SUNM":"미샤"},{"AMT":4,"LY_SALE_TOT":0,"SALE_TOT":26,"SALEDT":"10/15","SUNM":"미샤"},{"AMT":4,"LY_SALE_TOT":20,"SALE_TOT":31,"SALEDT":"10/16","SUNM":"미샤"},{"AMT":4,"LY_SALE_TOT":5,"SALE_TOT":-5,"SALEDT":"10/17","SUNM":"미샤"},{"AMT":1970,"LY_SALE_TOT":-3,"SALE_TOT":1932,"SALEDT":"10/18","SUNM":"미샤"},{"AMT":689,"LY_SALE_TOT":2024,"SALE_TOT":483,"SALEDT":"10/19","SUNM":"미샤"},{"AMT":1489,"LY_SALE_TOT":671,"SALE_TOT":1461,"SALEDT":"10/20","SUNM":"미샤"},{"AMT":24,"LY_SALE_TOT":1496,"SALE_TOT":26,"SALEDT":"10/21","SUNM":"미샤"},{"AMT":30,"LY_SALE_TOT":41,"SALE_TOT":13,"SALEDT":"10/22","SUNM":"미샤"},{"AMT":30,"LY_SALE_TOT":36,"SALE_TOT":29,"SALEDT":"10/23","SUNM":"미샤"},{"AMT":30,"LY_SALE_TOT":16,"SALE_TOT":44,"SALEDT":"10/24","SUNM":"미샤"},{"AMT":49,"LY_SALE_TOT":31,"SALE_TOT":104,"SALEDT":"10/25","SUNM":"미샤"},{"AMT":49,"LY_SALE_TOT":38,"SALE_TOT":107,"SALEDT":"10/26","SUNM":"미샤"},{"AMT":140,"LY_SALE_TOT":51,"SALE_TOT":189,"SALEDT":"10/27","SUNM":"미샤"},{"AMT":24,"LY_SALE_TOT":115,"SALE_TOT":21,"SALEDT":"10/28","SUNM":"미샤"},{"AMT":30,"LY_SALE_TOT":19,"SALE_TOT":27,"SALEDT":"10/29","SUNM":"미샤"},{"AMT":36,"LY_SALE_TOT":36,"SALE_TOT":29,"SALEDT":"10/30","SUNM":"미샤"},{"AMT":93,"LY_SALE_TOT":141,"SALE_TOT":222,"SALEDT":"10/31","SUNM":"미샤"},{"AMT":251,"LY_SALE_TOT":31,"SALE_TOT":121,"SALEDT":"11/1","SUNM":"미샤"},{"AMT":198,"LY_SALE_TOT":343,"SALE_TOT":141,"SALEDT":"11/2","SUNM":"미샤"},{"AMT":240,"LY_SALE_TOT":192,"SALE_TOT":378,"SALEDT":"11/3","SUNM":"미샤"},{"AMT":23,"LY_SALE_TOT":302,"SALE_TOT":74,"SALEDT":"11/4","SUNM":"미샤"},{"AMT":31,"LY_SALE_TOT":18,"SALE_TOT":49,"SALEDT":"11/5","SUNM":"미샤"},{"AMT":31,"LY_SALE_TOT":30,"SALE_TOT":33,"SALEDT":"11/6","SUNM":"미샤"},{"AMT":41,"LY_SALE_TOT":30,"SALE_TOT":46,"SALEDT":"11/7","SUNM":"미샤"}]
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
      let WRPList = this.$store.getters.getWRPList
      for(var i=0; i<WRPList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:WRPList[i].MCODE})
        if (data) {
          WRPList[i].VISIBLE = true
        } else {
          WRPList[i].VISIBLE = false
        }
      }
      return WRPList
    },
    isTabTypeSU() {
      return this.$store.getters.getWRPList[0].GBNCD == "S" ? true : false
    },
    tabType() {
      return this.$store.getters.getWRPList[0].GBNCD == "S" ? "SUCD" : "BRCD"
    },
    authCodeList() {
      if (this.isTabTypeSU) {
        return this.$store.getters.getAuthSUCDCode[1]
      } else {
        return this.$store.getters.getAuthBRCDCode[1]
      }
    },
    yearCodes() {
      return this.$store.getters.getYearCodeList
    },
    monthCodes() {
      return this.$store.getters.getMonthCodeList
    },
  },
  methods: {
    highlight(idx) {
      let tr = $("#sales_status > tr").filter(":eq(" + idx + ")")
      
      if(tr.hasClass("on") == true) {
        tr.removeClass('on')
      } else {
        $("tr.on").removeClass("on")
        tr.addClass('on')
      }
    },
    totalClass: function (ITEM) {      
      return {
        'bg_point_col20': ITEM === 'TOTAL'
      }
    },
    bold(id, idx) {
      let tr = $("#sales_status > tr").filter(":eq(" + idx + ")")
      let td = tr.find("td[name="+id+"]")
      
      if(tr.hasClass("on") == false) {
        $("tr.on").removeClass("on")
        tr.addClass('on')
      }

      if(td.hasClass("click_text") == true) {
        td.removeClass('click_text')
      } else {
        $(".click_text").removeClass("click_text")
        td.addClass('click_text')
      }
    },
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }
      this.getDataByClothingType()
      this.getForeignerData()
      const promise1 = new Promise((resolve,reject) => {
        this.getSalesResultData().then(() => resolve())
        
      })
      const promise2 = new Promise((resolve,reject) => {
        this.getMonthlySalesData().then(() => resolve())
        
      })
      const promise3 = new Promise((resolve,reject) => {
        this.getForeignerSumData().then(() => resolve())
      })

      Promise.all([promise1,promise2,promise3]).then(() => this.getImportanceData())
    },
    changeCODE(code) {
      this.selectedSUCD = code
      $("tr.on").removeClass("on")
      $(".click_text").removeClass("click_text")
      this.chageDate()
      // this.loadData()
    },
    chageDate() {
      this.standardStartDate = moment(this.calDefaultDate).subtract(6, 'days').format('YY-MM-DD')
      this.standardEndDate = this.calDefaultDate
      this.year = moment(this.calDefaultDate).format("YYYY");
      this.month = moment(this.calDefaultDate).format("M");
      //켈린더 추가
      this.startDate = moment(this.calStartDate).subtract(6, 'days').format('YY-MM-DD')
      this.endDate = this.calStartDate
      this.startYear = moment(this.calStartDate).format("YYYY");
      this.startMonth = moment(this.calStartDate).format("M");
      this.loadData()
    },
    getImportanceData() {
      this.importanceData = {}

      this.importanceData["CTOTAL"] = ((this.cForeignerSumTotal / this.cMonthlySalesTotal) * 100).toFixed(0)
      this.importanceData["LTOTAL"] = ((this.lForeignerSumTotal / this.lMonthlySalesTotal) * 100).toFixed(0)

      let keys = _.keys(this.monthlySalesData)
      for(let i=0; i<keys.length; i++){
        let fData = this.foreignerSumData[keys[i]]
        let mData = this.monthlySalesData[keys[i]]
        this.importanceData[keys[i]] = ((fData / mData) * 100).toFixed(0)
      }
      
      this.makeSalesResultChart()
      this.makeForeignerChart()
    },
    getDataByClothingType(){
      this.SalesStatusData = []
      let selectedDate = moment(this.calDefaultDate).format('YYYYMMDD')
      let week = moment(selectedDate).week()
      let day = moment(selectedDate).day()
      let lastYearDate = moment(selectedDate).subtract(1, 'year').week(week).day(day).format('YYYYMMDD')
      //켈린더 추가
      let startDate = moment(this.calStartDate).format('YYYYMMDD')
      let startWeek = moment(startDate).week()
      let startDay = moment(startDate).day()
      let startYearDate = moment(startDate).subtract(1, 'year').week(startWeek).day(startDay).format('YYYYMMDD')

      let fromSeason = this.seasonStartYear + this.seasonStartMonth
      let toSeason = this.seasonEndYear + this.seasonEndMonth
      let fromLastYearSeason = this.lastseasonStartYear + this.seasonStartMonth
      let toLastYearSeason = this.lastseasonEndYear + this.seasonEndMonth

      this.req2svr.getDataByClothingType(this.selectedSUCD, selectedDate, startDate, lastYearDate, startYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.SalesStatusData.push(res);
            } else {
              this.SalesStatusData = JSON.parse("[" + res + "]")
            }
            let total = this.SalesStatusData[count-1]
            this.SalesStatusData = _.map(this.SalesStatusData, function(data){
              if(total.INAMT == 0 || total.INAMT == "")
                data.TINAMT = 0
              else
                data.TINAMT = (data.INAMT/total.INAMT*100).toFixed(0)
                
              if(total.SILAMT == 0 || total.SILAMT == "")
                data.TSILAMT = 0
              else
                data.TSILAMT = (data.SILAMT/total.SILAMT*100).toFixed(0)
                
              if(total.JINAMT == 0 || total.JINAMT == "")
                data.TJINAMT = 0
              else
                data.TJINAMT = (data.JINAMT/total.JINAMT*100).toFixed(0)
                
              if(total.JSILAMT == 0 || total.JSILAMT == "")
                data.TJSILAMT = 0
              else
                data.TJSILAMT = (data.JSILAMT/total.JSILAMT*100).toFixed(0)
              
              data.RESULT = data.TSILAMT - data.TJSILAMT

              return data
            })

            this.totalData = this.SalesStatusData[count-1]
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSalesResultData(){
      this.salesResultData = {}
      let selectedDate = moment(this.calDefaultDate).format('YYYYMMDD')
      let week = moment(selectedDate).week()
      let day = moment(selectedDate).day()
      let lastYearDate = moment(selectedDate).subtract(1, 'year').week(week).day(day).format('YYYYMMDD')

      return this.req2svr.getSalesResultData(this.selectedSUCD, selectedDate, lastYearDate).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.salesResultData.push(res);
            } else {
              this.salesResultData = JSON.parse("[" + res + "]")
              for(var i in this.salesResultData) {
                if(this.salesResultData[i].YCD == 'ZZ'){
                  this.salesResultData[i].YCD = '합계';
                }
              }
            }
            
            /*
            //합계 행 추가 로직 끝
            let resultTotal = {}
            resultTotal.YCD = "합계"
            _.forEach(this.salesResultData, function(o){
              _.forEach(o, function(value, key){                
                if(key != "YCD"){
                  if(resultTotal[key])
                    resultTotal[key] += Number(value)
                  else
                    resultTotal[key] = Number(value)
                }
              })
            })
            this.salesResultData.push(resultTotal)
            //합계 행 추가 로직 끝
            */
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getMonthlySalesData(){
      this.monthlySalesData = {}
      this.cMonthlySalesTotal = 0
      this.lMonthlySalesTotal = 0
      let selectedDate = moment(this.calDefaultDate).format('YYYYMMDD')
      let week = moment(selectedDate).week()
      let day = moment(selectedDate).day()
      let lastYearDate = moment(selectedDate).subtract(1, 'year').week(week).day(day).format('YYYYMMDD')
      let fromSeason = this.seasonStartYear + this.seasonStartMonth
      let toSeason = this.seasonEndYear + this.seasonEndMonth
      let fromLastYearSeason = this.lastseasonStartYear + this.seasonStartMonth
      let toLastYearSeason = this.lastseasonEndYear + this.seasonEndMonth

      return this.req2svr.getMonthlySalesData(this.selectedSUCD, selectedDate, lastYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.monthlySalesData = res
            } else {
              this.monthlySalesData = (JSON.parse("[" + res + "]"))[0]
            }
            let values = _.values(this.monthlySalesData)
            for(let i=0; i<values.length; i++){
              if(i < 12){                
                this.cMonthlySalesTotal += Number(values[i])
              }else{
                this.lMonthlySalesTotal += Number(values[i])
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getForeignerData(){
      this.foreignerData = []
      let selectedDate = moment(this.calDefaultDate).format('YYYYMMDD')
      let week = moment(selectedDate).week()
      let day = moment(selectedDate).day()
      let lastYearDate = moment(selectedDate).subtract(1, 'year').week(week).day(day).format('YYYYMMDD')
      let fromSeason = this.seasonStartYear + this.seasonStartMonth
      let toSeason = this.seasonEndYear + this.seasonEndMonth
      let fromLastYearSeason = this.lastseasonStartYear + this.seasonStartMonth
      let toLastYearSeason = this.lastseasonEndYear + this.seasonEndMonth

      this.req2svr.getForeignerData(this.selectedSUCD, selectedDate, lastYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.foreignerData.push(res);
            } else {
              this.foreignerData = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getForeignerSumData(){
      this.foreignerSumData = {}
      this.cForeignerSumTotal = 0
      this.lForeignerSumTotal = 0
      let selectedDate = moment(this.calDefaultDate).format('YYYYMMDD')
      let week = moment(selectedDate).week()
      let day = moment(selectedDate).day()
      let lastYearDate = moment(selectedDate).subtract(1, 'year').week(week).day(day).format('YYYYMMDD')
      let fromSeason = this.seasonStartYear + this.seasonStartMonth
      let toSeason = this.seasonEndYear + this.seasonEndMonth
      let fromLastYearSeason = this.lastseasonStartYear + this.seasonStartMonth
      let toLastYearSeason = this.lastseasonEndYear + this.seasonEndMonth

      return this.req2svr.getForeignerSumData(this.selectedSUCD, selectedDate, lastYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.foreignerSumData = res
            } else {
              this.foreignerSumData = (JSON.parse("[" + res + "]"))[0]
            }
            let values = _.values(this.foreignerSumData)
            for(let i=0; i<values.length; i++){
              if(i < 12){                
                this.cForeignerSumTotal += Number(values[i])
              }else{
                this.lForeignerSumTotal += Number(values[i])
              }
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    link(val) {
      //this.$router.push(val)
      this.$router.push({
        name: val,
        params: {
          data: 
          {
            selectSucd: this.selectedSUCD
          }
        }
      })
    },
    changeWeeklyTab(val) {
      this.weeklyTab = val
      this.chageDate()
      
      // if(val == 1){
      //   this.makeSalesResultChart()
      //   this.makeForeignerChart()
      // }
    },
    excelDownLoad(id1) {
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
      // var tab2 = document.getElementById(id2); // id of table
      var sa;

      for(j = 0 ; j < tab1.rows.length ; j++) {
        tab_text=tab_text+tab1.rows[j].innerHTML+"</tr>"
      }

      // for(k = 0 ; k < tab2.rows.length ; k++) {
      //   tab_text=tab_text+tab2.rows[k].innerHTML+"</tr>"
      // }

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
    makeSalesResultChart() {
      let data = []
      let tempData = _.filter(_.values(this.salesResultData[this.salesResultData.length-1]), function(v){ 
        return v != "합계"
        })
      for(let i=0; i<new Date().getMonth()+1; i++){
        let obj = {}
        obj.MONTH = (i+1) + "월"
        obj.CVALUE = this.$options.filters.nanToDot(tempData[i])
        obj.LVALUE = this.$options.filters.nanToDot(tempData[i+12])

        data.push(obj)
      }      

      AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "MONTH",
        colors: ["#3F93F5", "#9CDDB9"],
        // colors: ["#3F93F5", "#B5B5B5", "#9CDDB9"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: true,
          fontSize: 14
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "당년(백만원) : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            id: "AmGraph-1",
            // lineAlpha: 0.99,
            title: "당년",
            valueField: "CVALUE",
            markerType: "circle"
          },
          {
            balloonText: "전년(백만원) : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            id: "AmGraph-2",
            title: "전년",
            valueField: "LVALUE",
            markerType: "circle"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: false,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 18
          // position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    makeForeignerChart() {
      let data = []
      let tempData = this.importanceData
      delete tempData.LTOTAL
      delete tempData.CTOTAL
      tempData = _.values(tempData)
      for(let i=0; i<new Date().getMonth()+1; i++){
        let obj = {}
        obj.MONTH = (i+1) + "월"
        obj.CVALUE = this.$options.filters.nanToDot(tempData[i])
        obj.LVALUE = this.$options.filters.nanToDot(tempData[i+12])

        data.push(obj)
      }  

      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "MONTH",
        colors: ["#3F93F5", "#9CDDB9"],
        // colors: ["#3F93F5", "#B5B5B5", "#9CDDB9"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: true,
          fontSize: 14
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "당년(백만원) : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            id: "AmGraph-1",
            // lineAlpha: 0.99,
            title: "당년",
            valueField: "CVALUE",
            markerType: "circle"
          },
          {
            balloonText: "전년(백만원) : [[value]]",
            bullet: "round",
            bulletSize: 6,
            fillAlphas: 0,
            id: "AmGraph-2",
            title: "전년",
            valueField: "LVALUE",
            markerType: "circle"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: false,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 18
          // position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    isFutureSDate(date) {
      return date.getDay() > 1;
    },
    //켈린더 추가
    isFutureDate(date) {
      return date.getDay() > 0;
    },
    toMain() {
      this.$router.replace("/")
    },
    imageExist(url) {
      var img = new Image();
      img.src = url;
      return img.height != 0;
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