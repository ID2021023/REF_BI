<template>
  <div class="wrap" @click="clear(interval)">
    <!-- side menu -->
    <div class="layout_drawer" :class="{on: drawer}">
      <h1 class="tit_drawer teamSelector" @click="toMain">
        <img src="@/assets/images/img_logo.png" alt="sisun">
      </h1>
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
        <h2 class="layout_title">일매출
          <small class="txt_date">
            <span v-show="headerDate == today" class="chip chip_m">
              <span class="chip_text">TODAY</span>
            </span>
            <strong class="point_col1">{{ headerDate }}</strong>
          </small>
        </h2>
        <div class="layout_spacer"></div>
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
                    @input="changeDate"
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
        <!-- scrolling card -->
        <div class="list_box lb_sty01">
          <div class="inner">
            <ul class="list_card">
              <template v-for="data in dr_H">
              <li :class="{'list_card_maxWidth': dr_H.length != CODECardsList.length}" :key="data.MCODE" >
                <!-- card_MI 사업부 -->
                <div
                  class="card card_mini"
                  @click="changeBusiness(data.MCODE)"
                  :class="{on : selectedCODE == data.MCODE}"
                >
                  <div class="card_title">
                    <h4 class="card_title_text">{{ data.TEXT }}</h4>
                  </div>
                  <div class="card_content">
                    <strong class="em_obj" v-if="data.SALE_TOT">
                      {{ Math.round(data.SALE_TOT/1000) | currency }}<small class="txt">천원</small>
                    </strong>
                    <strong class="em_obj" v-else>
                      0<small class="txt">천원</small>
                    </strong>
                    <!--
                    <strong class="em_obj fs30" v-if="data.AMT" >
                      <small class="txt">( </small>{{ Math.round(data.AMT/1000) | currency }}<small class="txt fs14">천원</small><small class="txt"> )</small>
                    </strong>
                    <strong class="em_obj fs30" v-else >
                      <small class="txt">( </small>0<small class="txt fs14">천원</small><small class="txt"> )</small>
                    </strong>
                    -->
                    <dl class="list_obj">
                      <dt class="tit">당월 매출 달성률</dt>
                      <dd class="txt" v-if="data.SALE_MONTH_TOT">
                        {{ Math.round(rate(data.SALE_MONTH_TOT, data.AMT)) | nanToDot }} %
                      </dd>
                      <dd class="txt" v-else>
                        0 %
                      </dd>
                      <!-- 초과-->
                      <span
                        class="chip round_chip success"
                        v-if="Math.round(rate(data.SALE_MONTH_TOT, data.AMT)) > 100"
                      >
                        <span class="chip_text">초과</span>
                      </span>
                      <!-- 정상-->
                      <span
                        class="chip round_chip warning"
                        v-else-if="Math.round(rate(data.SALE_MONTH_TOT, data.AMT)) >= 95 && Math.round(rate(data.SALE_MONTH_TOT, data.AMT)) <= 100"
                      >
                        <span class="chip_text">정상</span>
                      </span>
                      <!-- 주의-->
                      <span
                        class="chip round_chip danger"
                        v-else-if="Math.round(rate(data.SALE_MONTH_TOT, data.AMT)) < 95"
                      >
                        <span class="chip_text">주의</span>
                      </span>
                      <!-- 달성중 -->
                      <span class="chip round_chip primary" v-else>
                        <span class="chip_text">달성중</span>
                      </span>
                    </dl>
                    <!-- <dl class="list_obj">
                      <dt class="tit">일일 매출 달성률</dt>
                      <dd class="txt" v-if="data.SALE_TOT">
                        {{ Math.round(rate(data.SALE_TOT, data.AMT)) | nanToDot }} %
                      </dd>
                      <dd class="txt" v-else>
                        0 %
                      </dd>
                    </dl> -->
                  </div>
                </div>
              </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col_md_6">
            <!-- //scrolling card -->
            <div class="list_box">
              <ul class="list_card">
                <li>
                  <!-- card_당일 매출 목표 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당일 매출 목표</h4>
                    </div>
                    <div class="card_content">
                      <!-- <strong class="em_obj" v-if="dr_C.length > 0"> -->
                      <strong class="em_obj" style="font-size: 36px;color: #6B6E77;" v-if="dr_C.length > 0">
                        {{ Math.round(current_dr_C.AMT/1000) | currency }}<small class="txt">천원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당일 매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당일 매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(current_dr_C.SALE_TOT/1000) | currency }}<small class="txt">천원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당일 매출 달성률 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당일 매출 달성률</h4>
                    </div>
                    <div class="card_title">
                      <small class="txt_box">(당일 매출/당일 매출 목표) * 100</small>
                    </div>
                    <div class="card_content" >
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(rate(current_dr_C.SALE_TOT, current_dr_C.AMT)) | nanToDot }}
                        <small
                          class="txt2"
                        >%</small>
                        <!-- 초과-->
                        <span
                          class="chip round_chip success"
                          v-if="Math.round(rate(current_dr_C.SALE_TOT, current_dr_C.AMT)) > 100"
                        >
                          <span class="chip_text">초과</span>
                        </span>
                        <!-- 정상-->
                        <span
                          class="chip round_chip warning"
                          v-else-if="Math.round(rate(current_dr_C.SALE_TOT, current_dr_C.AMT)) >= 95 && Math.round(rate(current_dr_C.SALE_TOT, current_dr_C.AMT)) <= 100"
                        >
                          <span class="chip_text">정상</span>
                        </span>
                        <!-- 주의-->
                        <span
                          class="chip round_chip danger"
                          v-else-if="Math.round(rate(current_dr_C.SALE_TOT, current_dr_C.AMT)) < 95"
                        >
                          <span class="chip_text">주의</span>
                        </span>
                        <!-- 달성중 -->
                        <span class="chip round_chip primary" v-else>
                          <span class="chip_text">달성중</span>
                        </span>
                      </strong>
                    </div>
                  </div>
                </li>
                <li style="display: none;">
                  <!-- card_연 누적매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">연 누적매출 목표</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(current_dr_C.YEAR_AMT/1000000) | currency }}<small class="txt">백만원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li style="display: none;">
                  <!-- card_당년 현금 증감 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">연 누적매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(current_dr_C.SALE_YEAR_TOT/1000000) | currency }}<small class="txt">백만원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li style="display: none;">
                  <!-- card_월 누적매출 달성률 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">연 매출 달성률</h4>
                    </div>
                    <div class="card_title">
                      <small class="txt_box">(올해 매출/올해 매출 목표) * 100</small>
                    </div>
                    <div class="card_content" >
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) | nanToDot }}
                        <small
                          class="txt2"
                        >%</small>
                        <!-- 초과-->
                        <span
                          class="chip round_chip success"
                          v-if="Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) > 100"
                        >
                          <span class="chip_text">초과</span>
                        </span>
                        <!-- 정상-->
                        <span
                          class="chip round_chip warning"
                          v-else-if="Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) >= 95 && Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) <= 100"
                        >
                          <span class="chip_text">정상</span>
                        </span>
                        <!-- 주의-->
                        <span
                          class="chip round_chip danger"
                          v-else-if="Math.round(rate(current_dr_C.SALE_YEAR_TOT, current_dr_C.YEAR_AMT)) < 95"
                        >
                        <span class="chip_text">주의</span>
                        </span>
                        <!-- 달성중 -->
                        <span class="chip round_chip primary" v-else>
                          <span class="chip_text">달성중</span>
                        </span>
                      </strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col_md_6 npl">
            <div class="list_box">
              <ul class="list_card">
                <li>
                  <!-- card_월 누적매출 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당월 매출 목표</h4>
                    </div>
                    <div class="card_content">
                      <!-- <strong class="em_obj" v-if="dr_C.length > 0"> -->
                      <strong class="em_obj" style="font-size: 36px;color: #6B6E77;" v-if="dr_C.length > 0">
                        {{ Math.round(current_dr_C.MONTH_AMT/1000000) | currency }}<small class="txt">백만원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_당월 현금 증감 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당월 매출</h4>
                    </div>
                    <div class="card_content">
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(current_dr_C.SALE_MONTH_TOT/1000000) | currency }}<small class="txt">백만원</small>
                      </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <!-- card_월 누적매출 달성률 -->
                  <div class="card card_mini">
                    <div class="card_title">
                      <h4 class="card_title_text">당월 매출 달성률</h4>
                    </div>
                    <div class="card_title">
                      <small class="txt_box">(당월 매출/당월 매출 목표) * 100</small>
                    </div>
                    <div class="card_content" >
                      <strong class="em_obj" v-if="dr_C.length > 0">
                        {{ Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) | nanToDot }}
                        <small
                          class="txt2"
                        >%</small>
                        <!-- 초과-->
                        <span
                          class="chip round_chip success"
                          v-if="Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) > 100"
                        >
                          <span class="chip_text">초과</span>
                        </span>
                        <!-- 정상-->
                        <span
                          class="chip round_chip warning"
                          v-else-if="Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) >= 95 && Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) <= 100"
                        >
                          <span class="chip_text">정상</span>
                        </span>
                        <!-- 주의-->
                        <span
                          class="chip round_chip danger"
                          v-else-if="Math.round(rate(current_dr_C.SALE_MONTH_TOT, current_dr_C.MONTH_AMT)) < 95"
                        >
                          <span class="chip_text">주의</span>
                        </span>
                        <!-- 달성중 -->
                        <span class="chip round_chip primary" v-else>
                          <span class="chip_text">달성중</span>
                        </span>
                      </strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col_md_7" id="salesGraphDiv">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{'on': gubun == 2}">
                      <a href="javascript:void(0);" @click="tabVal(2)">매출추이</a>
                    </li>
                    <li :class="{'on': gubun == 1}">
                      <a href="javascript:void(0);" @click="tabVal(1)">매출유형</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" @click="showPerformanceList()">매출실적</a>
                    </li>
                  </ul>
                </div>
                <div class="layout_spacer"></div>
                <div class="groups">
                  <div class="toggle_group tg_sty01" id="comp_choice_div" v-if="gubun == 2">
                    <!-- <label class="tg_btn" :class="{'is-checked': comp_choice === 1}">
                      <input type="radio" id="option-a" class="tg_radio" name="comp_select" :value="1" v-model="comp_choice" style="display:none" @click="changeGraph(1)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">전체</span>
                    </label> -->
                    <label class="tg_btn" :class="{'is-checked': comp_choice === 2}">
                      <input type="radio" id="option-b" class="tg_radio" name="comp_select" :value="2" v-model="comp_choice" style="display:none" @click="changeGraph(2)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">목표대비</span>
                    </label>
                    <label class="tg_btn" :class="{'is-checked': comp_choice === 3}">
                      <input type="radio" id="option-c" class="tg_radio" name="comp_select" :value="3" v-model="comp_choice" style="display:none" @click="changeGraph(3)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">전년대비</span>
                    </label>
                  </div>
                  <div class="toggle_group tg_sty01">
                    <label class="tg_btn" :class="{'is-checked': choice === 1}">
                      <input type="radio" id="option-d" class="tg_radio" name="select" :value="1" v-model="choice" style="display:none" @click="changeType(1)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">일별</span>
                    </label>
                    <label class="tg_btn" :class="{'is-checked': choice === 3}" id="rdo_daily_cmlt">
                      <input type="radio" id="option-da" class="tg_radio" name="select" :value="3" v-model="choice" style="display:none" @click="changeType(3)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">일누적</span>
                    </label>
                    <label class="tg_btn" :class="{'is-checked': choice === 2}">
                      <input type="radio" id="option-m" class="tg_radio" name="select" :value="2" v-model="choice" style="display:none" @click="changeType(2)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">월별</span>
                    </label>
                    <label class="tg_btn" :class="{'is-checked': choice === 4}" id="rdo_monthly_cmlt">
                      <input type="radio" id="option-ma" class="tg_radio" name="select" :value="4" v-model="choice" style="display:none" @click="changeType(4)" />
                      <span class="btn_n txt_label" style="height: 40px; line-height: 40px; vertical-align: top;">월누적</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="cont">
                <div class="tr pr10 mt10" v-if="gubun==2"> 단위: 
                  <span v-if="choice_copy==1">천원</span>
                  <span v-else>백만원</span>
                </div>
                <div class="graph_area" v-show="gubun == 2" style="height: auto;">
                  <div class="graph_view" style="padding-top:0;">
                    <div class="graph" style="position:relative; width:100%; height:270px;">
                      <div id="chartdiv4" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>
                <div class="graph_area" v-show="gubun == 1">
                  <!-- 그래프 1 -->
                  <div class="graph_view graph_md" style="width:50%;">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">수량 (개)</dt>
                        <dd class="txt_result txt_s">{{ dr_S_TOT_TY | currency }}</dd>
                        <dd class="txt_etc" v-if="(selectedCODE == '1') || (selectedCODE == 'MI')">
                          <em>&nbsp;</em>
                        </dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:115px; float:left;">
                        <div id="chartdiv1" style="position:relative; width:100%; height:100%;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 그래프 2 -->
                  <div class="graph_view graph_md" style="width:50%;">
                    <!-- 텍스트 값 -->
                    <div class="graph_result">
                      <dl>
                        <dt class="tit">금액</dt>
                        <dd class="txt_result txt_s" v-if="choice_copy==1">
                          {{ dr_S_SALE_TOT + dr_S_ADVDEPAMT | currency }}
                          <span class="pl10" style="font-size: 18px; font-weight: 400; vertical-align: middle;">천원</span>
                        </dd>
                        <dd class="txt_result txt_s" v-if="choice_copy==2">
                          {{ Math.round((dr_S_SALE_TOT + dr_S_ADVDEPAMT)/1000) | currency }}
                          <span class="pl10" style="font-size: 18px; font-weight: 400; vertical-align: middle;">백만원</span>
                        </dd>
                        <dd class="txt_etc" v-if="(selectedCODE == '1') || (selectedCODE == 'MI')">
                          <span class="chip chip_m box_chip chip_sty01">
                            <span class="chip_text">선수금</span>
                          </span>
                          <em :class="{point_col5: dr_S_ADVDEPAMT < 0, point_col1: dr_S_ADVDEPAMT >= 0}">{{ dr_S_ADVDEPAMT | currency }}</em>
                        </dd>
                      </dl>
                    </div>
                    <!-- 그래프 -->
                    <div class="graph">
                      <div style="position:relative; width:100%; height:115px; float:left;">
                        <div id="chartdiv2" style="position:relative; width:100%; height:100%;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 카테고리 -->
                  <div class="graph_category">
                    <ul>
                      <li><span class="ico_dot" style="background-color:#3f93f5;"></span>정상매출</li>
                      <li><span class="ico_dot" style="background-color:#ff7f92;"></span>할인</li>
                      <li><span class="ico_dot" style="background-color:#ffb83c;"></span>균일</li>
                    </ul>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          <div class="col_md_5" id="salesTopDiv">
            <div class="cont_box h100">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{'on': gubun2 == 1}">
                      <a href="javascript:void(0);" @click="tabVal2(1)">당일 매출 상위</a>
                    </li>
                    <li :class="{'on': gubun2 == 2}">
                      <a href="javascript:void(0);" @click="tabVal2(2)">당월 매출 상위</a>
                    </li>
                    <li :class="{'on': gubun2 == 3}">
                      <a href="javascript:void(0);" @click="tabVal2(3)">당년 매출 상위</a>
                    </li>
                  </ul>
                </div>
                <div class="layout_spacer"></div>
                <button class="btn_icon btn_s btn_edge_sty01" @click="showStoreList('desc')">
                  <i class="material-icons">add</i>
                </button>
              </div>
              <div class="cont">
                <div class="list_num list_h list_sty01">
                  <ul class="list" style="display: block;">
                    <li v-for="(data, index) in dr_B" :key="index" style="width:30%;pointer-events:none; display: -webkit-inline-box; margin-top: 25px;">
                      <div class="num_box">{{ index+1 }}</div>
                      <strong class="txt_name">
                        {{ data.VDSNM }}
                        <em class="txt_result" v-if="gubun2==1" >({{ Math.round(data.SALE_TOT/1000) | currency }} 천원)</em>
                        <em class="txt_result" v-else>({{ Math.round(data.SALE_TOT/1000000) | currency }} 백만원)</em>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <store-list-popup
        v-if="isStoreListVisible"
        @close="closeStoreList"
        :dr_H="current_dr_H"
        :dr_L="dr_L"
        :orderType="storeListOrderType"
        :currentDate="selectDate"
        :select_p_choice="select_p_choice"
      />
    <performance-list-popup
        v-if="isPerformanceListVisible"
        @close="closePerformanceList"
        :dr_H="current_dr_H"
        :dr_L="dr_L"
        :selectedCODE="selectedCODE"
        :currentDate="selectDate"
      />
  </div>
</template>

<script>
import moment from "moment";
import req2svr from "./req2svr";
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

import storeListPopup from '@/pages/financial/FIN0102'
import performanceListPopup from '@/pages/financial/FIN0103'

export default {
  name: "FIN0101",
  components: {
    datePick,
    storeListPopup,
    performanceListPopup,
    sideMenu
  },
  props: {
    data: Object
  },
  mounted() {
    this.makeChart1()
    this.makeChart2()
  },
  created: function() {
    this.lotate()
    this.recentDate = moment().subtract(1, "days").format("YYYY-MM-DD")
    this.getRecentDate()
    this.getMakeDataDate()
    this.selectDate = moment().subtract(1, "days").format("YYYY-MM-DD")
    this.loadData()
    this.choice = 1
    this.choice_copy = 1
    this.comp_choice = 2
  },
  data() {
    return {
      drawer: null,
      selectDate: null,
      recentDate: null,
      gubun: 2,
      selectedCODE: "",
      // 사업부별 일매출
      dr_H: [],
      // 당일 매출, 당월 매출, 당월 매출 목표, 당월 매출 달성률
      dr_C: [],
      // 매출유형
      dr_S: {
        JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
        R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
        ADVDEPAMT: 0
      },
      // 매출추이
      dr_P: [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }],
      dr_LYP: [],
      // 당일 매장별 매출
      dr_L: [],
      dr_LM: [],
      isStoreListVisible: false,
      isPerformanceListVisible: false,
      storeListOrderType: 'desc',
      makeDataDate: null,
      sucdCodeList:[],
      SU_TOT_AMT: 0,
      SU_TOT_SALE_TOT: 0,
      choice: 1,
      choice_copy: 1,
      comp_choice: 2,
      select_p_choice: 1,
      chart4: null,
      gubun2: 1,
      dr_TP: [],
      dr_LYTP: [],
      interval: null
    };
  },
  computed: {
    req2svr: () => req2svr,
    headerDate() {
      return moment(this.selectDate).format("YYYY.MM.DD (ddd)");
    },
    today() {
      return moment().format("YYYY.MM.DD (ddd)");
    },
    current_dr_C() {
      let list = _.find(this.dr_C, {MCODE: this.selectedCODE})
      return list
    },
    current_dr_H() {
      let list = _.find(this.dr_H, {MCODE: this.selectedCODE})
      return list
    },
    dr_B() {
      return (_.orderBy(this.dr_L, function(o) { return Number(o.SALE_TOT); }, 'desc')).slice(0, 9)
    },
    dr_W() {
      if (this.dr_L.length < 3) {
        return []
      }
      return (_.orderBy(this.dr_L, function(o) { return Number(o.SALE_TOT); }, 'asc')).slice(0, 3)
    },
    dr_BM() {
      return (_.orderBy(this.dr_LM, function(o) { return Number(o.SALE_TOT); }, 'desc')).slice(0, 3)
    },
    dr_S_TOT_TY() {
      return this.dr_S.JQTY+this.dr_S.DCQTY+this.dr_S.GQTY+this.dr_S.R_JQTY+this.dr_S.R_DCQTY+this.dr_S.R_GQTY
    },
    dr_S_SALE_TOT() {
      return Math.round((this.dr_S.JAMT+this.dr_S.DCAMT+this.dr_S.GAMT+this.dr_S.R_JAMT+this.dr_S.R_DCAMT+this.dr_S.R_GAMT)/1000)
    },
    dr_S_ADVDEPAMT() {
      return Math.round((this.dr_S.ADVDEPAMT)/1000)
    },
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
        let list = this.$store.getters.getAuthSUCDCode[0]
        return list
      }
      return this.$store.getters.getAuthBRCDCode[0]
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
    lotate() {
      let lotation = sessionStorage.getItem("loatation")

      if(lotation == "true" || lotation == true) {
        this.interval = window.setTimeout (this.func, 10000);
      }
    },
    func() {
      this.$router.push({
        name: "ONL0103",
        params: {
          data: 
          {
            flag: true
          }
        }
      })
    },
    clear(timer) {
      clearInterval(timer)
    },
    getMakeDataDate(){
      this.req2svr.getMakeDataDate().then(
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
    getRecentDate(){
      this.req2svr.getRecentBISL061Date().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.recentDate = res.SALEDT
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    showStoreList(orderType) {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        return
      }
      this.storeListOrderType = orderType
      // console.log("selectDate >>>", this.selectDate)
      this.select_p_choice = this.gubun2;
      this.isStoreListVisible = true;
    },
    showPerformanceList() {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        return
      }
      this.isPerformanceListVisible = true;
    },
    closeStoreList() {
      this.isStoreListVisible = false;
    },
    closePerformanceList() {
      this.isPerformanceListVisible = false;
    },
    currency(value) {
      if (Number.isNaN(value)) {
          return 0
      }
      var x = value.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");

      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    },
    getData() {
      this.getTotalSalesData()
      //this.getDailySalesData()
      this.getCumulativeData()
    },
    getTotalSalesData() {
      let i
      let date = moment(this.selectDate).format("YYYYMMDD");
      let monthStartDate = moment(date).startOf('month').format("YYYYMMDD")

      this.dr_H = []
      /*
      for (i=0;i<this.authCodeList.length;i++) {
        let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
        if (data) {
          this.dr_H.push({ TEXT: this.authCodeList[i].CODNM, MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, AMT: 0 })
        }
      }
      //this.dr_H.unshift({TEXT: "전체", MCODE: "A", SUNM: "전체", SALE_TOT: 0, AMT: 0, SALE_MONTH_TOT: 0});
      */

      this.sucdCodeList = _.map(this.authCodeList, 'MCODE')

      this.req2svr.getTotalSalesData(this.tabType, this.sucdCodeList.toString(), date, monthStartDate).then(
        res => {
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
            // console.log("0. authCodeList >>>", this.authCodeList)
            
              /*
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_H[i] = _.assign(this.dr_H[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }))
              }
            }
             */
            for(i=0; i<list.length; i++) {
              let data = _.find(this.CODECardsList, {MCODE: list[i].MCODE})
              list[i].TEXT = data.CODNM;
            }
            

            let tot_obj = {
              TEXT: "전체", MCODE: "A",
              SUNM: "전체",
              SALE_TOT: _.sumBy(list, function(o) { return Number(o.SALE_TOT); }),
              SALE_MONTH_TOT: _.sumBy(list, function(o) { return o.SALE_MONTH_TOT?Number(o.SALE_MONTH_TOT):0; }),
              AMT: _.sumBy(list, function(o) { return Number(o.AMT); }),
            }

            list.unshift(tot_obj)
            this.dr_H = list
            // console.log("1. this.dr_H >>>", this.dr_H)
            //this.dr_H[0] = tot_obj;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );

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
            for (i=0;i<this.authCodeList.length;i++) {
              let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
              if (data) {
                this.dr_H[i] = _.assign(this.dr_H[i], _.find(list, { MCODE: this.authCodeList[i].MCODE }));
              }
            }

            let tot_obj = {
              TEXT: "전체", MCODE: "A",
              SUNM: "전체",
              SALE_TOT: _.sumBy(this.dr_H, function(o) { return Number(o.SALE_TOT); }),
              AMT: _.sumBy(this.dr_H, function(o) { return Number(o.AMT); }),
            }

            this.dr_H.unshift(tot_obj);
            // console.log("2. dr_H >>> " , this.dr_H);

            this.SU_TOT_AMT = _.sumBy(this.dr_H, function(o) { return Number(o.AMT); })
            this.SU_TOT_SALE_TOT = _.sumBy(this.dr_H, function(o) { return Number(o.SALE_TOT); })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCumulativeData() {
      this.dr_C = []
      /*
      for (i=0;i<this.authCodeList.length;i++) {
        let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
        if (data) {
          this.dr_C.push({ MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, SALE_MONTH_TOT: 0, AMT: 0 })
        }
      }
      //this.dr_C.unshift({ MCODE: "A", SUNM: "", SALE_TOT: 0, SALE_MONTH_TOT: 0, AMT: 0 })
      */
      
      let i
      let date = moment(this.selectDate).format("YYYYMMDD")
      let monthStartDate = moment(date).startOf('month').format("YYYYMMDD")

      this.sucdCodeList = _.map(this.authCodeList, 'MCODE')

      this.req2svr.getCumulativeData(this.tabType, this.sucdCodeList.toString(), date, monthStartDate).then(
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

            var tot_obj = {
              MCODE: "A", SUNM: "전체",
              SALE_TOT: _.sumBy(list, function(o) { return Number(o.SALE_TOT); }),
              SALE_MONTH_TOT: _.sumBy(list, function(o) { return Number(o.SALE_MONTH_TOT); }),
              AMT: _.sumBy(list, function(o) { return Number(o.AMT); }),
              SALE_YEAR_TOT: _.sumBy(list, function(o) { return o.MCODE != "10"? Number(o.SALE_YEAR_TOT):0; }),
              YEAR_AMT: _.sumBy(list, function(o) { return o.MCODE != "10"? Number(o.YEAR_AMT):0; }),
              MONTH_AMT: _.sumBy(list, function(o) { return o.MCODE != "10"? Number(o.MONTH_AMT):0; })
            }

            list.unshift(tot_obj)
            this.dr_C = list
            // console.log("dr_C >>> ", this.dr_C)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    changeDate() {
      this.loadData()
    },
    loadData() {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        
        this.dr_H = []
        for (let i=0;i<this.authCodeList.length;i++) {
          let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
          if (data) {
            this.dr_H.push({ TEXT: this.authCodeList[i].CODNM, MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, AMT: 0 })
          }
        }
        this.dr_H.unshift({TEXT: "전체", MCODE: "A", SUNM: "전체", SALE_TOT: 0, AMT: 0});
        // 당일 매출, 당월 매출, 당월 매출 목표, 당월 매출 달성률
        this.dr_C = []
        for (let i=0;i<this.authCodeList.length;i++) {
          let data = _.find(this.CODECardsList, {MCODE: this.authCodeList[i].MCODE})
          if (data) {
            this.dr_C.push({ MCODE: this.authCodeList[i].MCODE, SUNM: "", SALE_TOT: 0, SALE_MONTH_TOT: 0, AMT: 0 })
          }
        }
        this.dr_C.unshift({ MCODE: "A", SUNM: "전체", SALE_TOT: 0, AMT: 0, SALE_MONTH_TOT: 0});
        
        // 매출유형
        this.dr_S = {
          JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
          R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
          ADVDEPAMT: 0
        }
        // 매출추이
        this.dr_P = [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }]
        // 당일 매장별 매출
        this.dr_L = []

        this.gubun = 2

        this.makeChart1()
        this.makeChart2()
        this.makeChart4()
        
        return
      }

      this.getData();

      if (this.authCodeList.length > 0) {
        this.changeBusiness("A");
      }
    },
    changeBusiness(code) {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        return
      }
      this.choice = 1;
      this.choice_copy = 1;
      this.comp_choice = 2;
      this.selectedCODE = code
      let date = moment(this.selectDate).format("YYYYMMDD");
      this.getChartData1(code, date)
      this.getChartData2(code, date)
      this.getStoreList(code, date)
    },
    getChartData1(code, date) {
      // 초기화
      this.dr_S = {
        JQTY: 0, DCQTY: 0, GQTY: 0, JAMT: 0, DCAMT: 0, GAMT: 0,
        R_JQTY: 0, R_DCQTY: 0, R_GQTY: 0, R_JAMT: 0, R_DCAMT: 0, R_GAMT: 0,
        ADVDEPAMT: 0
      }
      this.makeChart1()
      this.makeChart2()

      this.getSalesChartCount(code, date)
      this.getSalesChartAMT(code, date)
    },
    getChartData2(code, date) {
      // 매출추이
      this.dr_LYP = []
      this.dr_P = [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0, SALEDT: "" }]
      this.makeChart4()

      /*
      let lastYear30day = moment(date).subtract(30, 'days').subtract(1, 'year').format("YYYYMMDD")
      let lastYearSelectDay = moment(date).subtract(1, 'year').format("YYYYMMDD")

      let lastYearMday = moment(date).subtract(1, 'year').format("YYYYMM") + "01"
      let lastYearLastday = moment(date).subtract(1, 'year').endOf('month').format("YYYYMMDD")
      */
      
      let monthStDt  = moment(this.selectDate, "YYYY-MM-DD").format("YYYYMM") + "01"
      let startDy = moment(monthStDt, "YYYYMMDD").format("d")

      let week = moment(monthStDt, "YYYYMMDD").format('WW')
      let lastYearFirstDay
      /* 1월 1일이 53주차 일 경우 전년도를 2년 전으로 하도록 변경 by heejin 2021.01.11 */
      if (week == 53) {
        lastYearFirstDay = moment(this.selectDate).subtract(2, 'year').format("YYYY") + "0101"
      } else {
        lastYearFirstDay = moment(this.selectDate).subtract(1, 'year').format("YYYY") + "0101"
      }
      let lastDayForWeek = lastYearFirstDay

      for(let i = 0; i < (Number(week)-1); i++) {
        lastDayForWeek = moment(lastDayForWeek, "YYYYMMDD").add(7,'days').format('YYYYMMDD')
      }
      let lastYearWeekDy = moment(lastDayForWeek, "YYYYMMDD").format("d")

      let paramStartDt = "";
      let addDays = 0;
      
      let lastWeekCnt  = moment(moment(this.selectDate, "YYYY-MM-DD").format("YYYY") + "0101", "YYYYMMDD").format('WW')

      if(startDy == lastYearWeekDy) {
        paramStartDt = lastDayForWeek
      } else if(startDy > lastYearWeekDy) {
        addDays = parseInt(startDy)-parseInt(lastYearWeekDy);
        if (lastWeekCnt == 53 && Number(week) != 53) {
          addDays += 7;
        }
        paramStartDt = moment(lastDayForWeek, "YYYYMMDD").add(addDays,'days').format('YYYYMMDD')
      } else {
        addDays = parseInt(startDy)+(7-parseInt(lastYearWeekDy));
        paramStartDt = moment(lastDayForWeek, "YYYYMMDD").add(addDays,'days').format('YYYYMMDD')
      }

      let endDate = Number(moment(this.selectDate).endOf('month').format("DD"))
      let lastYearLastday = moment(paramStartDt, "YYYYMMDD").add(endDate-1,'days').format('YYYYMMDD')
      // console.log("작년 첫번째 ", moment(monthStDt, "YYYYMMDD").format("ddd"), "요일: "+ paramStartDt + ", 더하기" + endDate + ", 마지막:", lastYearLastday)
      // console.log("작년 주차 ", moment(paramStartDt, "YYYYMMDD").format('WW'))

      this.req2svr.getChartData2(this.tabType, code, paramStartDt, lastYearLastday, this.choice_copy).then(
        res => {
          this.dr_LYP = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_LYP.push({
                AMT: 0,
                LY_SALE_TOT: Number(res.LY_SALE_TOT),
                SALEDT: res.SALEDT,
                SALE_TOT: 0,
                SUNM: res.SUNM
              })
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<list.length;i++) {
                this.dr_LYP.push({
                  AMT: 0,
                  LY_SALE_TOT: Number(list[i].LY_SALE_TOT),
                  SALEDT: list[i].SALEDT,
                  SALE_TOT: 0,
                  SUNM: list[i].SUNM,
                  SALEDT2: moment(this.selectDate, "YYYY-MM-DD").format("MM") + this.twinNum(i+1)
                })
              }
            }
          }
          this.getCurrentData(code, date)
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCurrentData(code, date) {
      //let last30day = moment(date).subtract(30, 'days').format("YYYYMMDD")
      let firstMday = moment(date).format("YYYYMM") + "01"

      this.req2svr.getCurrentData(this.tabType, code, firstMday, date, this.choice_copy).then(
        res => {
          this.dr_P = [{ SUNM: 0, MCODE: 0, LY_SALE_TOT: 0, AMT: 0, SALE_TOT: 0 }]
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_P = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              let currentlist = []
              if(count == 1) {
                currentlist.push(res);
              } else {
                currentlist = JSON.parse("[" + res + "]")
              }
              let list = []
              for (let i=0;i<currentlist.length;i++) {
                list.push({
                  AMT: currentlist[i].AMT,
                  LY_SALE_TOT: 0,
                  SALEDT: currentlist[i].SALEDT,
                  SALE_TOT: currentlist[i].SALE_TOT,
                  SUNM: currentlist[i].SUNM
                })
              }
              
              if(this.choice_copy == 1) {
                let count = Math.max(list.length, this.dr_LYP.length)
                let l1 = list.length > this.dr_LYP.length ? list : this.dr_LYP
                let l2 = list.length > this.dr_LYP.length ? this.dr_LYP : list
                
                let list2 = [];
                for (let i=0;i<count;i++) {
                  let data = _.find(l2, function(o) { return o.SALEDT.slice(4, 8) == l1[i].SALEDT2})
                  let AMT2 = data ? Number(data.AMT) : 0
                  let LY_SALE_TOT2 = data ? Number(data.LY_SALE_TOT) : 0
                  let SALE_TOT2 = data ? Number(data.SALE_TOT) : 0
  
                  let _AMT = Number(l1[i].AMT) != 0 ? Number(l1[i].AMT) : AMT2
                  let _LY_SALE_TOT = Number(l1[i].LY_SALE_TOT) != 0 ? Number(l1[i].LY_SALE_TOT) : LY_SALE_TOT2
                  let _SALE_TOT = Number(l1[i].SALE_TOT) != 0 ? Number(l1[i].SALE_TOT) : SALE_TOT2

                  let saleDt = Number(moment(l2[i].SALEDT, "YYYYMMDD").format("MMDD"))
                  let toDt = Number(moment(date).format("MMDD"))

                  if(saleDt <= toDt) {
                    
                    // console.log("SALE_TOT2>>> ", SALE_TOT2, " || _SALE_TOT >>>", _SALE_TOT)
                    list2.push({
                      AMT: Math.round(_AMT/1000),
                      LY_SALE_TOT: Math.round(_LY_SALE_TOT/1000),
                      SALE_TOT: Math.round(_SALE_TOT/1000),
                      SALEDT: Number(l2[i].SALEDT.slice(6, 8)),
                      SUNM: l1[i].SUNM
                    })
                  } else {
                    list2.push({
                      AMT: Math.round(_AMT/1000),
                      LY_SALE_TOT: Math.round(_LY_SALE_TOT/1000),
                      //SALE_TOT: 0,
                      SALEDT: Number(l2[i].SALEDT.slice(6, 8)),
                      SUNM: l1[i].SUNM
                    })
                  }
                }
                if(this.choice == 1) {
                  this.dr_P = list2;
                } else if(this.choice == 3) {
                  this.makeCumulativeData(list2);
                }
              } else {
                this.dr_P = list;
              }
              for(let i in this.dr_P) {
                if(this.dr_P[i].SALE_TOT) {
                  this.dr_P[i]["RATE"] = Math.round(this.dr_P[i]["SALE_TOT"]/this.dr_P[i]["AMT"]*100)
                  this.dr_P[i]["RATE2"] = Math.round(this.dr_P[i]["SALE_TOT"]/this.dr_P[i]["LY_SALE_TOT"]*100)
                }
                this.dr_P[i]["SALEDT2"] = moment(this.selectDate).format("YYYYMM") + this.twinNum(this.dr_P[i]["SALEDT"])
                if(moment(this.dr_P[i]["SALEDT2"]).format("d") == "6") {
                  this.dr_P[i]["LABELCOLOR"] = "#2962FF"
                  this.dr_P[i]["GRAPHCOLOR"] = "#2962FF"
                } else if(moment(this.dr_P[i]["SALEDT2"]).format("d") == "0") {
                  this.dr_P[i]["LABELCOLOR"] = "#B71C1C"
                  this.dr_P[i]["GRAPHCOLOR"] = "#B71C1C"
                } else {
                  this.dr_P[i]["LABELCOLOR"] = "#000000"
                  this.dr_P[i]["GRAPHCOLOR"] = "#8195CC"
                }
              }
              // console.log("dr_P >>> ", this.dr_P)
            }
          }
          this.makeChart4();
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getCumulativeSales(code, date) {
      this.req2svr.getCumulativeSales(this.tabType, code, date, this.choice_copy).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_P = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_P.push(res);
            } else {
              let list = JSON.parse("[" + res + "]")
              if(this.choice == 2) {
                //this.dr_P = list
                let month = moment(this.selectDate).format("MM");
                for(var i in list) {
                  if(list[i].SALEDT > month) {
                    this.dr_P.push({
                      LY_SALE_TOT: Number(list[i].LY_SALE_TOT),
                      SALEDT: list[i].SALEDT,
                      SUNM: list[i].SUNM,
                      SUCD: list[i].SUCD
                    })
                  } else {
                    this.dr_P.push({
                      AMT: Number(list[i].AMT),
                      LY_SALE_TOT: Number(list[i].LY_SALE_TOT),
                      SALE_TOT: Number(list[i].SALE_TOT),
                      SALEDT: list[i].SALEDT,
                      SUNM: list[i].SUNM,
                      SUCD: list[i].SUCD
                    })
                  }
                }
              } else if(this.choice == 4) {
                this.makeCumulativeData(list);
              }
              for(let i in this.dr_P) {
                if(this.dr_P[i].SALE_TOT) {
                  this.dr_P[i]["RATE"] = Math.round(this.dr_P[i]["SALE_TOT"]/this.dr_P[i]["AMT"]*100)
                  this.dr_P[i]["RATE2"] = Math.round(this.dr_P[i]["SALE_TOT"]/this.dr_P[i]["LY_SALE_TOT"]*100)
                }
              }
              // console.log("dr_P >>> ", this.dr_P)
            }
          }
          this.makeChart4();
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    makeCumulativeData(list) {
      let toDt, compDt
      for(var i in list) {
        let PRE_LY_SALE_TOT, PRE_SALE_TOT, PRE_AMT
        if(i-1 < 0) {
          PRE_LY_SALE_TOT = 0;
          PRE_SALE_TOT = 0;
          PRE_AMT = 0;
        } else {
          PRE_LY_SALE_TOT = Number(this.dr_P[i-1].LY_SALE_TOT);
          PRE_SALE_TOT = Number(this.dr_P[i-1].SALE_TOT);
          PRE_AMT = Number(this.dr_P[i-1].AMT);
        }
        if(this.choice == 4) {
          toDt = moment(this.selectDate).format("MM")
          compDt = Number(list[i].SALEDT)
          let tempObj = new Object();
          tempObj["LY_SALE_TOT"] = PRE_LY_SALE_TOT + Number(list[i].LY_SALE_TOT)
          if(compDt <= toDt) { 
            tempObj["AMT"] = PRE_AMT + Number(list[i].AMT) 
            tempObj["SALE_TOT"] = PRE_SALE_TOT + Number(list[i].SALE_TOT)
            tempObj["RATE"] = tempObj["SALE_TOT"]/tempObj["AMT"]*100
            tempObj["RATE2"] = tempObj["SALE_TOT"]/tempObj["LY_SALE_TOT"]*100
          }
          tempObj["SALEDT"] = list[i].SALEDT
          tempObj["SUNM"] = list[i].SUNM

          this.dr_P.push(tempObj);
        } else {
          toDt = moment(this.selectDate).format("DD")
          compDt = Number(list[i].SALEDT)
          this.dr_P.push({
            AMT: PRE_AMT + Number(list[i].AMT),
            LY_SALE_TOT: PRE_LY_SALE_TOT + Number(list[i].LY_SALE_TOT),
            SALE_TOT: compDt > toDt? "": (PRE_SALE_TOT + Number(list[i].SALE_TOT)),
            SALEDT: list[i].SALEDT,
            SUNM: list[i].SUNM
          })
        }
      }
      
    },
    getStoreList(code, date) {
      this.req2svr.getStoreList(date, this.tabType, code, this.gubun2).then(
        res => {
          this.dr_L = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.dr_L = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_L.push(res);
            } else {
              this.dr_L = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesChartCount(code, date) {
      this.req2svr.getSalesChartCount(this.tabType, code, date, this.choice).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.JQTY = Number(res.JQTY)
              this.dr_S.DCQTY = Number(res.DCQTY)
              this.dr_S.GQTY = Number(res.GQTY)
              this.dr_S.R_JQTY = Number(res.R_JQTY)
              this.dr_S.R_DCQTY = Number(res.R_DCQTY)
              this.dr_S.R_GQTY = Number(res.R_GQTY)
            }
              // console.log("??? getSalesChartCount >>>>", res)
            this.makeChart1()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesChartAMT(code, date) {
      this.req2svr.getSalesChartAMT(this.tabType, code, date, this.choice).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.JAMT = Number(res.JAMT)
              this.dr_S.DCAMT = Number(res.DCAMT)
              this.dr_S.GAMT = Number(res.GAMT)
              this.dr_S.R_JAMT = Number(res.R_JAMT)
              this.dr_S.R_DCAMT = Number(res.R_DCAMT)
              this.dr_S.R_GAMT = Number(res.R_GAMT)
              this.dr_S.ADVDEPAMT = Number(res.ADVDEPAMT)
            }
            this.makeChart2()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    prev(val) {
      this.$router.replace("/NewDailyReport");
    },
    tabVal(val) {
      if (moment(this.selectDate).diff(moment(this.recentDate)) > 0) {
        this.gubun = 1;
        return
      }
      let date = moment(this.selectDate).format("YYYYMMDD")
      if (val == "1" || val == 1) {
        this.gubun = 1;
        this.choice = this.choice_copy;
        //this.changeType(this.choice);
        this.getChartData1(this.selectedCODE, date)
        // document.getElementById("comp_choice_div").style.display = "none";
        document.getElementById("rdo_daily_cmlt").style.display = "none";
        document.getElementById("rdo_monthly_cmlt").style.display = "none";
        
      } else if (val == "2" || val == 2) {
        this.gubun = 2;
        if(this.choice_copy == 1) {
          this.getChartData2(this.selectedCODE, date);
        } else if(this.choice_copy == 2) {
          this.getCumulativeSales(this.selectedCODE, date);
        }
        //this.makeChart4();
        // document.getElementById("comp_choice_div").style.display = "block";
        document.getElementById("rdo_daily_cmlt").style.display = "block";
        document.getElementById("rdo_monthly_cmlt").style.display = "block";
      } 
    },
    tabVal2(value) {
      this.gubun2 = value;
      this.getStoreList(this.selectedCODE, moment(this.selectDate).format("YYYYMMDD"));
    },
    makeChart1() {
      let txt = '당일'
      if(this.choice_copy == 1) { txt = '당일'; } else if(this.choice_copy == 2) { txt = '당월'; } else { txt = '당년'; }
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: txt + "판매", 
          JQTY_T: "정상", JQTY: this.dr_S.JQTY, 
          DCQTY_T: "할인", DCQTY: this.dr_S.DCQTY, 
          GQTY_T: "균일", GQTY: this.dr_S.GQTY
        },
        { category: txt + "반품", 
          JQTY_T: "정상", JQTY: Math.abs(this.dr_S.R_JQTY),
          DCQTY_T: "할인", DCQTY: Math.abs(this.dr_S.R_DCQTY),
          GQTY_T: "균일", GQTY: Math.abs(this.dr_S.R_GQTY)
        },
      ];

      AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
        startDuration: 1,
        fontSize: 18,
        marginRight: 100,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GQTY"
          }
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
            titleRotation: 0,
            totalText: "[[total]]"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart2() {
      let txt = '당일';
      let data = [];
      if(this.choice_copy == 1) { 
        txt = '당일'; 
        data = [
          { category: txt + "판매", 
            JAMT_T: "정상", JAMT: Math.round(this.dr_S.JAMT/1000000),
            DCAMT_T: "할인", DCAMT: Math.round(this.dr_S.DCAMT/1000000),
            GAMT_T: "균일", GAMT: Math.round(this.dr_S.GAMT/1000000)
          },
          { category: txt + "반품", 
            JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_S.R_JAMT/1000000)),
            DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_S.R_DCAMT/1000000)),
            GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_S.R_GAMT/1000000))
          }
        ]
      } else if(this.choice_copy == 2) { 
        txt = '당월';
        data = [
          { category: txt + "판매", 
            JAMT_T: "정상", JAMT: Math.round(this.dr_S.JAMT/1000000),
            DCAMT_T: "할인", DCAMT: Math.round(this.dr_S.DCAMT/1000000),
            GAMT_T: "균일", GAMT: Math.round(this.dr_S.GAMT/1000000)
          },
          { category: txt + "반품", 
            JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_S.R_JAMT/1000000)),
            DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_S.R_DCAMT/1000000)),
            GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_S.R_GAMT/1000000))
          }
        ] 
      }
      let title = ["정상", "할인", "균일"]

      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        marginRight: 100,
        rotate: true,
        colors: [ "#3F93F5", "#FF7F92", "#FFB83C", "#A3E326" ],
        startDuration: 1,
        fontSize: 18,
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          gridAlpha: 0,
          tickLength: 0
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GAMT"
          }
        ],
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            stackType: "regular",
            autoGridCount: false,
            axisAlpha: 0,
            axisThickness: 0,
            gridColor: "#e0f6fd",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false,
            showFirstLabel: true,
            titleRotation: 0,
            totalText: "[[total]] (백만원)"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart4() {
      let data = this.dr_P
      let colors = ["#3F93F5", "#E56464"];
      let txt = "", legend_txt = "", balloon_txt = "", rate_txt="";
      if(this.choice_copy == 1) { 
        txt = "일별"; 
      } else if(this.choice_copy == 2) { 
        txt = "월별";
      } 

      let graph1;
      if(this.comp_choice == 2) {
        legend_txt = "실적";
        balloon_txt = "실적";
        rate_txt = "RATE"
        graph1 = function(txt) {
          return {
            balloonText: "목표: [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 1,
            lineThickness: 2,
            title: txt+"매출 목표",
            valueField: "AMT",
            markerType: "circle",
            bullet: "circle",
            bulletSize: 5,
            //type: "column",
          }
        }
      } else {
        legend_txt = "당년";
        balloon_txt = "당년";
        rate_txt = "RATE2"
        graph1 = function(txt) {
          return {
            balloonText: "전년: [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 1,
            lineThickness: 2,
            title: txt+"매출 전년",
            valueField: "LY_SALE_TOT",
            markerType: "circle",
            bullet: "circle",
            bulletSize: 5,
            // type: "column",
          }
        }
      } 
      let graphs = [ 
        {
          balloonText: balloon_txt+": [[value]] ([["+rate_txt+"]]%)",
          fillAlphas: 0.7,
          lineAlpha: 0,
          fontSize: 0,
          id: "AmGraph-2",
          title: txt+"매출 "+legend_txt,
          valueField: "SALE_TOT",
          //markerType: "circle"
          type: "column",
          fixedColumnWidth: 25,
          colorField: "GRAPHCOLOR"
        }, graph1(txt)
      ];
      this.chart4 = AmCharts.makeChart("chartdiv4", {
        type: "serial",
        //startEffect: "easeOutSine",
        categoryField: "SALEDT",
        colors: colors,
        sequencedAnimation: false,
        forceShow: true,
        //startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0,
          tickLength: 0,
          startOnAxis: false,
          fontSize: 13,
          autoWrap: false, 
          minHorizontalGap: 0,
          labelColorField: "LABELCOLOR",
          boldLabels: true
        },
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        trendLines: [],
        graphs: graphs,
        guides: [],
        valueAxes: [
          {
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: true,
            title: "",
            fontSize: 13,
            autoGridCount: false,
            minimum: 0
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 12,
          position: "bottom",
          //equalWidths: false,
          valueWidth: 0,
          //labelWidth: 50
          //width: 120
        },
        titles: [],
        dataProvider: data
      });
      
      //this.changeGraph(this.comp_choice);
    },
    toMain() {
      this.$router.replace("/")
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
    changeType(value) {
      this.choice = value;
      
      let date = moment(this.selectDate).format("YYYYMMDD");
      let code = this.selectedCODE;
      this.getChartData1(code, date);
      if(value == 1 || value == 3) {
        this.choice_copy = 1;
        this.getChartData2(code, date);
      } else if(value == 2 || value == 4) {
        this.choice_copy = 2
        this.getCumulativeSales(code, date);
      }
    },
    changeGraph(value) {
      this.comp_choice = value
      this.makeChart4();
      // switch(value) {
      //   case 1: // 전체
      //     if(this.chart4.graphs[0].hidden) this.chart4.showGraph(this.chart4.graphs[0])
      //     if(this.chart4.graphs[2].hidden) this.chart4.showGraph(this.chart4.graphs[2])
      //     break;
      //   case 2: // 목표대비
      //     if(!this.chart4.graphs[0].hidden) this.chart4.hideGraph(this.chart4.graphs[0])
      //     if(this.chart4.graphs[2].hidden) this.chart4.showGraph(this.chart4.graphs[2])
      //     break;
      //   case 3: // 전년대비
      //     if(this.chart4.graphs[0].hidden) this.chart4.showGraph(this.chart4.graphs[0])
      //     if(!this.chart4.graphs[2].hidden) this.chart4.hideGraph(this.chart4.graphs[2])
      //     break;
      //   default: break;
      // }
    },
    twinNum: function (num) {
      if(num.toString().length == 1) {
        return "0"+num.toString();
      } else {
        return num.toString();
      }
    },
    getWeekOfMonth: function (value) {
      let date = new Date(value);
      let _date = date.getDate()
	    let _dayOfWeek = date.getDay();
	     
      return parseInt((6 + _date - _dayOfWeek) / 7) + 1;
    }, getTempData: function(list) {
      this.dr_LYTP = [], this.dr_TP = []
      this.dr_TP = list

      let monthStDt  = moment(this.selectDate, "YYYY-MM-DD").format("YYYYMM") + "01"
      let startDy = moment(monthStDt, "YYYYMMDD").format("d")

      let week = moment(monthStDt, "YYYYMMDD").format('WW')
      let lastYearFirstDay = moment(this.selectDate).subtract(1, 'year').format("YYYY") + "0101"
      let lastDayForWeek = lastYearFirstDay

      for(let i = 0; i < Number(week)-1; i++) {
        lastDayForWeek = moment(lastDayForWeek, "YYYYMMDD").add(7,'days').format('YYYYMMDD')
      }
      let lastYearWeekDy = moment(lastDayForWeek, "YYYYMMDD").format("d")

      let paramStartDt = "";

      if(startDy == lastYearWeekDy) {
        paramStartDt = lastDayForWeek
      } else if(startDy > lastYearWeekDy) {
        paramStartDt = moment(lastDayForWeek, "YYYYMMDD").add(startDy-lastYearWeekDy,'days').format('YYYYMMDD')
      } else {
        paramStartDt = moment(lastDayForWeek, "YYYYMMDD").add(startDy+lastYearWeekDy,'days').format('YYYYMMDD')
      }

      let endDate = Number(moment(this.selectDate).endOf('month').format("DD"))
      let lastYearLastday = moment(paramStartDt, "YYYYMMDD").add(endDate-1,'days').format('YYYYMMDD')
      // console.log("작년 첫번째 ", moment(monthStDt, "YYYYMMDD").format("ddd"), "요일: "+ paramStartDt + ", 더하기" + endDate + ", 마지막:", lastYearLastday)
      // console.log("작년 주차 ", moment(paramStartDt, "YYYYMMDD").format('WW'))

      this.req2svr.getChartData2_1(this.tabType, this.selectedCODE, paramStartDt, lastYearLastday, this.choice_copy).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_LYTP.push({
                AMT: 0,
                LY_SALE_TOT: Number(res.LY_SALE_TOT),
                SALEDT: res.SALEDT,
                SALE_TOT: 0,
                SUNM: res.SUNM
              })
            } else {
              let list = JSON.parse("[" + res + "]")
              for (let i=0;i<list.length;i++) {
                this.dr_LYTP.push({
                  AMT: 0,
                  LY_SALE_TOT: Number(list[i].LY_SALE_TOT),
                  SALEDT: list[i].SALEDT,
                  SALE_TOT: 0,
                  SUNM: list[i].SUNM
                })
              }
            }
          }
          this.getTempData2()
        },
        rej => {
          console.log("rej", rej);
        }
      );
    }, getTempData2: function() {
      // console.log("this.dr_LYTP >>>", this.dr_LYTP)
      let unit = 0;
      if(this.choice_copy == 1) {
        unit = 1000
      } else {
        unit = 1000000
      }
      for(let i in this.dr_TP) {
        this.dr_TP[i]["LY_SALE_TOT"] = this.dr_LYTP[i]["LY_SALE_TOT"]/unit
        this.dr_TP[i]["SUNM"] = this.dr_LYTP[i]["SUNM"]
      }
      // console.log("this.dr_TP >>>", this.dr_TP)
      
    }
  }
};
</script>