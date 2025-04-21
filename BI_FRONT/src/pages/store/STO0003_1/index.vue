<template>
    <div class="wrap_side_scroll" id="scroll" @click="clear(interval)">
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
                <!-- Title button -->
                <button type="button" class="btn_n btn_icon btn_prev" @click="prev">
                    <i class="material-icons">arrow_back_ios</i>
                </button>
                <!-- Title -->
                <h2 class="layout_title">월매출<small class="txt_date"><strong class="point_col1">{{ SelectCodeName }} 사업부</strong></small></h2>
                <div class="layout_spacer"></div>
                <!-- groups -->
                <div class="groups">
                    <div class="toggle_group">
                        <span class="sub_title mr10">(최종 정보수정일: {{ makeDataDate }})</span>
                    </div>
                    <!-- select 사업부 -->
                    <!-- <div class="select_box" style="min-width:180px;">
                        <select class="select" v-model="selectSucd" @change="changeSucd">
                            <option v-for="data in SUCDs" :key="data.MCODE" :value="data.MCODE">{{ data.CODNM }}</option>
                        </select>
                    </div> -->
                    <!-- select 년도 -->
                    <div class="select_box" style="min-width:130px;">
                        <select class="select" v-model="year" @change="chageDate">
                            <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
                        </select>
                    </div>
                    <!-- select 월 -->
                    <div class="select_box" style="min-width:86px;">
                        <select class="select" v-model="month" @change="chageDate">
                            <option v-for="data in m_options" :key="data" :value="data">{{ data }}월</option>
                        </select>
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
                        <template v-for="data in salesTotal">
                        <li :key="data.SUCD">
                            <!-- card_MI 사업부 -->
                            <div
                            class="card card_mini"
                            @click="changeBusiness(data.SUCD)"
                            :class="{on : selectSucd == data.SUCD}"
                            >
                            <div class="card_title">
                                <h4 class="card_title_text">{{ data.SUNM }}</h4>
                            </div>
                            <div class="card_content">
                                <strong class="em_obj" v-if="data.SILAMT">
                                {{ Math.round(Number(data.SILAMT)/1000000) | currency }}<small class="txt">백만원</small>
                                </strong>
                                <strong class="em_obj" v-else>
                                0<small class="txt">백만원</small>
                                </strong>
                                <dl class="list_obj">
                                <dt class="tit">전년대비</dt>
                                <dd class="txt" v-if="data.JSILAMT">
                                    {{ Math.round((data.SILAMT-data.JSILAMT)/1000000) | currency }}
                                </dd>
                                <dd class="txt" v-else>
                                    0 %
                                </dd>
                                </dl>
                            </div>
                            </div>
                        </li>
                        </template>
                        </ul>
                    </div>
                </div>
                <div class="list_box">
                    <!-- 계산 카드 리스트 -->
                    <ul class="list_card">
                        <li>
                            <!-- card_ -->
                            <div class="card card_mini">
                                <div class="card_title">
                                    <h4 class="card_title_text">{{ year }}년 매장수</h4>
                                </div>
                                <div class="card_content">
                                    <strong class="em_obj">
                                        {{ currentData.CNT | currency }}<small class="txt">개</small>
                                    </strong>
                                    <dl class="list_obj">
                                        <dt style="font-size: 18px;">전년</dt>
                                        <dd class="txt">{{ lastData.CNT | currency }}</dd><dt class="txt" style="font-size: 18px;">개</dt>
                                        <dt class="tit">전년대비</dt>
                                        <i style="font-size: 28px;"
                                           :class="[currentData.CNT-lastData.CNT > 0 ? 'col_primary' : 'col_danger', 'material-icons']"
                                        >{{ currentData.CNT-lastData.CNT > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                                        <dd class="txt" style="padding-left: 0;">{{ Math.abs(currentData.CNT-lastData.CNT) | currency }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- card -->
                            <div class="card card_mini">
                                <div class="card_title">
                                    <h4 class="card_title_text">{{ year }}년 {{ month }}월 누계</h4>
                                </div>
                                <div class="card_content">
                                    <strong class="em_obj">
                                        {{ Math.round(currentData.NOWMON/1000000) | currency }}<small class="txt">백만원</small>
                                    </strong>
                                    <dl class="list_obj">
                                        <dt style="font-size: 18px;">전년</dt>
                                        <dd class="txt">{{ Math.round(lastData.NOWMON/1000000) | currency }}</dd>
                                        <dt class="tit">전년대비</dt>
                                        <i style="font-size: 28px;"
                                           :class="[currentData.NOWMON-lastData.NOWMON > 0 ? 'col_primary' : 'col_danger', 'material-icons']"
                                        >{{ currentData.NOWMON-lastData.NOWMON > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                                        <dd class="txt" style="padding-left: 0;">{{ (Math.abs(Math.round((currentData.NOWMON-lastData.NOWMON)/1000000))) | currency }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- card -->
                            <div class="card card_mini">
                                <div class="card_title">
                                    <h4 class="card_title_text">{{ year }}년 월 평균</h4>
                                </div>
                                <div class="card_content">
                                    <strong class="em_obj">
                                        {{ Math.round(currentData.AVGMON/1000000) | currency }}<small class="txt">백만원</small>
                                    </strong>
                                    <dl class="list_obj">
                                        <dt style="font-size: 18px;">전년</dt>
                                        <dd class="txt">{{ Math.round(lastData.AVGMON/1000000) | currency }}</dd>
                                        <dt class="tit">전년대비</dt>
                                        <i style="font-size: 28px;"
                                           :class="[currentData.AVGMON-lastData.AVGMON > 0 ? 'col_primary' : 'col_danger', 'material-icons']"
                                        >{{ currentData.AVGMON-lastData.AVGMON > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                                        <dd class="txt" style="padding-left: 0;">{{ Math.abs(Math.round((currentData.AVGMON-lastData.AVGMON)/1000000)) | currency }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- card -->
                            <div class="card card_mini">
                                <div class="card_title">
                                    <h4 class="card_title_text">매장별 평균</h4>
                                </div>
                                <div class="card_content">
                                    <strong class="em_obj">
                                        {{ Math.round(currentData.AVGVDCD/1000000) | currency }}<small class="txt">백만원</small>
                                    </strong>
                                    <dl class="list_obj">
                                        <dt style="font-size: 18px;">전년</dt>
                                        <dd class="txt">{{ Math.round(lastData.AVGVDCD/1000000) | currency }}</dd>
                                        <dt class="tit">전년대비</dt>
                                        <i style="font-size: 28px;"
                                           :class="[currentData.AVGVDCD-lastData.AVGVDCD > 0 ? 'col_primary' : 'col_danger', 'material-icons']"
                                        >{{ currentData.AVGVDCD-lastData.AVGVDCD > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
                                        <dd class="txt" style="padding-left: 0;">{{ Math.abs(Math.round((currentData.AVGVDCD-lastData.AVGVDCD)/1000000)) | currency }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col_md_4">
                        <div class="cont_box">
                            <div class="tit">
                                <strong class="tit_txt">신장매장 및 감소매장</strong>
                                <div class="layout_spacer"></div>
                                <span class="txt">(단위 : 백만원)</span>
                            </div>
                            <div class="cont" style="height:340px;">
                                <div class="graph_area">
                                    <!-- 그래프 1 -->
                                    <div class="graph_view" style="width:50%;">
                                        <!-- 텍스트 값 -->
                                        <div class="graph_result">
                                            <dl>
                                                <dt class="tit" style="font-weight: bold">전체 매장수</dt>
                                                <dd class="tit" style="font-weight: bold">{{ storeTotCnt | currency }}</dd>
                                            </dl>
                                        </div>
                                        <!-- 그래프 -->
                                        <div class="graph">
                                            <div id="chartdiv1" style="width: 100%; height:230px;">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 그래프 2 -->
                                    <div class="graph_view" style="width:50%;">
                                        <!-- 텍스트 값 -->
                                        <div class="graph_result">
                                            <dl>
                                                <dt class="tit" style="font-weight: bold">매출증감 총 금액</dt>
                                                <dd class="tit" style="font-weight: bold">{{ storeTotMoney | currency }} <small style="font-size: 11px">백만원</small></dd>
                                            </dl>
                                        </div>
                                        <!-- 그래프 -->
                                        <div class="graph">
                                            <div id="chartdiv2" style="width: 100%; height:230px;"></div>
                                        </div>
                                    </div>
                                    <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기 -->
                                    <!-- <div class="graph_category">
                                        <ul>
                                            <li><span class="ico_dot" style="background-color:#C0DEFA;"></span>20%이내</li>
                                            <li><span class="ico_dot" style="background-color:#79BDF4;"></span>50%이내</li>
                                            <li><span class="ico_dot" style="background-color:#0090ED;"></span>50%이상</li>
                                            <li><span class="ico_dot" style="background-color:#FF8A97;"></span>감소</li>
                                            <li><span class="ico_dot" style="background-color:#d0c3fd;"></span>신규</li>
                                        </ul>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col_md_8">
                        <!-- <div class="cont_box">
                            <div class="tit">
                                <strong class="tit_txt">신규 및 철수매장</strong>
                                <div class="layout_spacer"></div>
                                <span class="txt">(단위 : 백만원)</span>
                            </div>
                            <div class="cont" style="height: 310px;">
                                <div class="graph_area">
                                    
                                    <div class="graph_view" style="width:50%;">
                                        <div class="graph_result gr_s">
                                            <span class="point_col1">신규매장</span>
                                        </div>
                                        <div class="graph">
                                            <div id="chartdiv3" style="width: 100%; height: 220px;"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="graph_view" style="width:50%;">
                                        <div class="graph_result gr_s">
                                            <span style="color: #FF8A97;">철수매장</span>
                                        </div>
                                        <div class="graph">
                                            <div id="chartdiv4" style="width: 100%; height: 220px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="cont_box">
                            <div class="tit">
                                <div class="tab">
                                    <ul>
                                        <li :class="{on: tab == 0}"><a href="javascript:void(0);" @click="chageTab(0)">지표별 매장 요약</a></li>
                                        <li :class="{on: tab == 1}"><a href="javascript:void(0);" @click="chageTab(1)">유통형태별 매장 요약</a></li>
                                    </ul>
                                </div>
                                <div class="layout_spacer"></div>
                                <span class="txt">(단위 : 백만원)</span>
                            </div>
                            <div class="cont" v-show="tab == 0">
                                <div class="graph_box">
                                    <!-- 타이틀 있을때 -->
                                    <div class="tit" style="padding: 8px 0;">
                                        구분
                                        <div class="select_box">
                                            <select class="select select_s" v-model="selectGubun" @change="changeGubun()">
                                                <option value="0">매장수</option>
                                                <option value="1">월누계</option>
                                                <option value="2">월평균</option>
                                                <option value="3">매장별 평균</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- 기본 그래프만 넣을때 -->
                                    <div class="graph_area gv_line" style="padding-bottom: 8px;">
                                        <!-- 그래프 1 -->
                                        <div class="graph_view np col_md_4">
                                            <!-- 칩 -->
                                            <span class="chip chip_m"><span class="chip_text txt_bold">유통형태별 비중</span></span>
                                            <!-- 그래프 -->
                                            <div class="graph" style="">
                                                <!-- <div class="col_md_6" style="position:relative; left:70px">
                                                    <div class="graph">
                                                        <div id="chartdiv5" style="width: 100%; height: 330px;">
                                                        </div>
                                                    </div>
                                                </div> -->
                                                <div class="" style="width: 100%">
                                                    <div class="graph">
                                                        <div id="chartdiv6" style="width: 100%; height: 205px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 그래프 2 -->
                                        <div class="graph_view np col_md_7">
                                            <!-- 칩 -->
                                            <!-- 구분 select opction에 따라 명칭 변경 -->
                                            <span class="chip chip_m" style=" border-color: #00C0D0;">
                                                <span class="chip_text txt_bold" style="color: #00C0D0;" v-if="selectGubun == 0">매장수 비교</span>
                                                <span class="chip_text txt_bold" style="color: #00C0D0;" v-else-if="selectGubun == 1">{{month}}월 누계 비교(백만원)</span>
                                                <span class="chip_text txt_bold" style="color: #00C0D0;" v-else-if="selectGubun == 2">월평균 비교</span>
                                                <span class="chip_text txt_bold" style="color: #00C0D0;" v-else-if="selectGubun == 3">매장별 평균 비교</span>
                                            </span>
                                            <!-- 그래프 -->
                                            <div class="graph">
                                                <div id="chartdiv7" style="width: 100%; height: 200px;"></div>
                                            </div>
                                            <!-- <div class="graph" style="height: 170px;">
                                                <div class="col_md_3">
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">백화점</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv7" style="width: 100%; height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_3">
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">몰</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv8" style="width: 100%; height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_3">
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">대리점</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv9" style="width: 100%; height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_3">
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">온라인 및 기타</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv10" style="width: 100%; height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기 -->
                                            <div class="graph_category" style="padding: 10px 0;">
                                                <ul>
                                                    <li><span class="ico_dot" style="background-color:#00D8E1;"></span>{{ year-1 }}년</li>
                                                    <li><span class="ico_dot" style="background-color:#00BECF;"></span>{{ year }}년</li>
                                                    <!-- <li><span class="ico_dot" style="background-color:#C6C6C7;"></span>증가</li>
                                                    <li><span class="ico_dot" style="background-color:#FFA89F;"></span>감소</li> -->
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="cont" v-show="tab == 1">
                                <div class="graph_box">
                                    <!-- 타이틀 있을때 -->
                                    <div class="tit" style="padding: 8px 0;">구분
                                        <div class="select_box">
                                            <select class="select select_s" v-model="selectShtpGubun" @change="changeShtpGubun()">
                                                <option value="전체">유통형태 전체</option>
                                                <option value="백화점">백화점</option>
                                                <option value="몰">몰</option>
                                                <option value="대리점">대리점</option>
                                                <option value="기타">온라인 및 기타</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- 기본 그래프만 넣을때 -->
                                    <div class="graph_area" style="padding-bottom: 8px;">
                                        <!-- 그래프 2 -->
                                        <div class="graph_view np">
                                            <!-- 그래프 -->
                                            <div class="graph">
                                                <div class="col_md_3" style="padding: 0px 10px 3px;">
                                                    <!-- 텍스트 값 -->
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">매장수</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv11" style="width: 100%; height: 200px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_3" style="padding: 0px 10px 3px;">
                                                    <!-- 텍스트 값 -->
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">{{month}}월 누계</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv12" style="width: 100%; height: 200px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_3" style="padding: 0px 10px 3px;">
                                                    <!-- 텍스트 값 -->
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">월 평균</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv13" style="width: 100%; height: 200px;">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_3" style="padding: 0px 10px 3px;">
                                                    <!-- 텍스트 값 -->
                                                    <div class="graph_result">
                                                        <dl>
                                                            <dt class="tit">매장별 평균</dt>
                                                        </dl>
                                                    </div>
                                                    <div class="graph">
                                                        <div id="chartdiv14" style="width: 100%; height: 200px;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기 -->
                                            <div class="graph_category" style="padding: 10px 0;">
                                                <ul>
                                                    <li><span class="ico_dot" style="background-color:#8BBEF9;"></span>{{ year-1 }}년</li>
                                                    <li><span class="ico_dot" style="background-color:#3F93F5;"></span>{{ year }}년</li>
                                                    <!-- <li><span class="ico_dot" style="background-color:#C6C6C7;"></span>증가</li>
                                                    <li><span class="ico_dot" style="background-color:#FFA89F;"></span>감소</li> -->
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom:20px;">
                    <a href="javascript:void(0);" @click="openSalesStatusPopup" class="btn_n btn_primary btn_xl btn_flex tc" style="border-radius: 10px;">
                        <span class="w100 txt_bold h6">전년 대비 월 평균 매출 현황 상세보기</span>
                        <div class="layout_spacer"></div>
                    </a>
                </div>
            </div>
        </div>
        <storeMonthSalesStatusPopup v-if="isStoreMonthSalesStatusPopup" @close="closePopup" :data="monthSalesPopupData" />
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import mapView from '@/components/mapView'
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

import storeMonthSalesStatusPopup from '@/pages/store/STO0004'

export default {
  name: "STO0003_1",
  components: {
    sideMenu,
    mapView,
    datePick,
    storeMonthSalesStatusPopup
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    this.loadData()
    this.lotate();
  },
  created() {
    // this.year = moment().subtract(1, "month").format("YYYY")
    this.year = moment().format("YYYY")
    // this.month = moment().subtract(1, "month").format("M");
    this.month = moment().format("M");

    for (var i = 0; i < 3; i++) {
        this.y_options[i] = this.year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    for (var i = 0; i < 12; i++) {
        this.m_options[i] = 12 - i;
    }
    this.m_options = _.sortBy(this.m_options)

    // this.selectSucd = this.data.selectedCODE
    // this.choice = this.data.choice
    // this.year = this.data.year
    // this.month = this.data.month
  },
  computed: {
    req2svr: () => req2svr,
    SUCDs() {
      return this.$store.getters.getSTOList
    },
    currentData(){
        return _.head(this.currentStatusData) || {}
    },
    lastData(){
        return _.head(this.lastStatusData) || {}
    },
    SelectCodeName() {
        return this.$store.getters.getSUCDCODNM(this.selectSucd)
        // return this.selectSucd
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
  },
  data() {
    return {
      drawer: null,
      year: "",
      month: "",
      y_options: [],
      m_options: [],
      selectGubun: 0,
      selectShtpGubun: "전체",
      currentStatusData: [],
      lastStatusData: [],
      openData: [],
      closeData: [],
      monthlyAverageData: {},
      storeAverageData: {},
      storeCntData: [], // 신장매장 및 감소매장  - 매장수
      storeMoneyData: [], // 신장매장 및 감소매장  - 금액
      choice: null, // 월간
      selectSucd: 1,
      isStoreMonthSalesStatusPopup: false,
      makeDataDate: null,
      storeTotCnt: 0, // 신장매장 및 감소매장 - 전체 매장수
      storeTotMoney: 0, // 신장매장 및 감소매장 - 매출증감 총 금액
      tab: 0,
      cuIndexData: [], // 지표별 매장 요약 - 올해 유통형태별비중
      lastIndexData: [], // 지표별 매장 요약 - 작년 유통형태별비중 
      cuMonthAvgData: [], // 지표별 매장 요약 - 올해 월평균
      lastMonthAvgData: [], // 지표별 매장 요약 - 작년 월평균
      cuMonthStoreAvgData: [], // 지표별 매장 요약 - 올해 매장별 평균
      lastMonthStoreAvgData: [], // 지표별 매장 요약 - 작년 매장별 평균
      monthSalesPopupData: {},
      salesTotal: [],
      selectedCODE: "1",
      interval: null,
      gubuns: [
            {category_en: "department", category_ko: "백화점"},
            {category_en: "mall",       category_ko: "몰"},
            {category_en: "agency",     category_ko: "대리점"},
            {category_en: "online",     category_ko: "온라인및기타"}
        ]
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
        name: "FIN0101",
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
    loadData() {
        this.getSalesTotal()
        this.getMakeDataDate()
        // 상단카드 현재년도
        this.getMainCurrentStatus()
        // 상단카드 작년
        this.getMainLastStatus()
        // 신규 및 철수매장
        this.getOpenCloseStore()
        // 지표별 매장 요약 > 매장수 > 유통형태별비중 > 작년
        this.getLastIndexStore().then(() => this.getCuIndexStore()).then(() => this.getCompareStore())
    },
    chageDate() {
        // 상단카드 현재년도
        this.getMainCurrentStatus()
        // 상단카드 작년
        this.getMainLastStatus()
        // 신규 및 철수매장
        this.getOpenCloseStore()
        // 지표별 매장 요약 > 매장수 > 유통형태별비중 > 작년
        this.getLastIndexStore().then(() => this.getCuIndexStore()).then(() => this.changeGubun()).then(() => this.changeShtpGubun())        
    },
    changeSucd() {
        // 상단카드 현재년도
        this.getMainCurrentStatus()
        // 상단카드 작년
        this.getMainLastStatus()
        // 신규 및 철수매장
        this.getOpenCloseStore()
        // 지표별 매장 요약 > 매장수 > 유통형태별비중 > 작년
        this.getLastIndexStore().then(() => this.getCuIndexStore()).then(() => this.changeGubun())
        this.changeShtpGubun()
    },
    changeBusiness(sucd) {
        this.selectSucd = sucd
        this.changeSucd();
    },
    getSalesTotal() {
        this.req2svr.getSalesTotal(this.year, this.month).then(
            res => {
                this.salesTotal = []
                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length;
                    if(count < 1) {
                    } else if(count == 1) {
                        this.salesTotal.push(res);
                    } else {
                        this.salesTotal = JSON.parse("[" + res + "]");
                        for(let i in this.salesTotal) {
                            if(this.salesTotal[i].SUCD == "3") {
                                let dongyoung = _.find(this.salesTotal, { 'SUCD': '5' });
                                this.salesTotal[i].SILAMT = Number(this.salesTotal[i].SILAMT) + Number(dongyoung.SILAMT)
                                this.salesTotal[i].JSILAMT = Number(this.salesTotal[i].JSILAMT) + Number(dongyoung.JSILAMT)
                            }
                            let tempObj = _.find(this.CODECardsList, { 'MCODE': this.salesTotal[i].SUCD })
                            if(tempObj) {
                                this.salesTotal[i]["SUNM"] = tempObj.CODNM;
                            }
                        }
                        _.remove(this.salesTotal, function(o) { return o.SUCD == '5'; });
                        let totOnj = {
                            SILAMT: _.sumBy(this.salesTotal, function(o) { return Number(o.SILAMT); }),
                            JSILAMT: _.sumBy(this.salesTotal, function(o) { return Number(o.JSILAMT); }),
                            SORT: "0",
                            SUCD: "0",
                            SUNM: "전체"
                        }
                        // this.salesTotal.unshift(totOnj)
                        // console.log("salesTotal >>> ", this.salesTotal);
                    }
                }
            },
            rej => {
                console.log("rej", rej);
            }
        )
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
    getMainCurrentStatus() {
      // 상단카드 현재년도
      this.req2svr.getMainCurrentStatus(this.selectSucd, this.year, this.month).then(
        res => {
          this.currentStatusData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.currentStatusData.push(res);
            } else {
              this.currentStatusData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMainLastStatus() {
      // 상단카드 작년
      this.req2svr.getMainLastStatus(this.selectSucd, this.year, this.month).then(
        res => {
          this.lastStatusData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.lastStatusData.push(res);
            } else {
              this.lastStatusData = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getOpenCloseStore() {
        // 신규 및 철수매장
        this.req2svr.getOpenCloseStore(this.selectSucd, this.year, this.month).then(
            res => {
                let listData = []
                this.openData = []
                this.closeData = []

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        listData.push(res)
                    } else {
                        listData = JSON.parse("[" + res + "]")
                    }

                    this.openData.push({category:"매장수", result:_.get(listData, '0.CNT'), color:"rgb(140, 190, 249)"})
                    this.openData.push({category:"매출증감", result:Math.round(_.get(listData, '0.MONCHANGE')/1000000), color:"rgb(63, 147, 245)"})
                    this.closeData.push({category:"매장수", result:"-"+_.get(listData, '1.CNT'), color:"rgb(247, 154, 149)"})
                    this.closeData.push({category:"매출증감", result:Math.round(_.get(listData, '1.MONCHANGE')/1000000), color:"rgb(241, 87, 78)"})

                    this.openCloseMakeChart2(this.openData, 3)
                    this.openCloseMakeChart2(this.closeData, 4)

                    let cnt = _.get(listData, '0.CNT')
                    let money = Math.round(_.get(listData, '0.MONCHANGE')/1000000)

                    let wthdr_cnt = _.get(listData, '1.CNT')
                    let wthdr_money = Math.round(_.get(listData, '1.MONCHANGE')/1000000)
                    this.getInDeCreaseStore(cnt,money,wthdr_cnt,Math.abs(wthdr_money))
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )
    },
    
    getInDeCreaseStore(cnt,money,cntWthdr,moneyWthdr) {
        // 신장매장 및 감소매장
        this.req2svr.getInDeCreaseStore(this.selectSucd, this.year, this.month).then(
            res => {
                let listData = []
                this.storeCntData = []
                this.storeMoneyData = []

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.listData.push(res)
                    } else {
                        this.listData = JSON.parse("[" + res + "]")
                    }

                    // 매장수
                    let cntIn20Under = _.filter(this.listData, function(v){return v.MONCHANGERR > 0 && v.MONCHANGERR < 20}).length
                    let cntIn50Under = _.filter(this.listData, function(v){return v.MONCHANGERR >= 20 && v.MONCHANGERR < 50}).length
                    let cntIn50Over = _.filter(this.listData, function(v){return v.MONCHANGERR >= 50}).length
                    let cntDe = _.filter(this.listData, function(v){return v.AMT != 0 && v.MONCHANGERR < 0}).length
                    let cntNew = cnt

                    // this.storeCntData.push({category:"신장/신규", in20under:cntIn20Under, in50under:cntIn50Under, in50over:cntIn50Over, new:cntNew, de:'', minus_de:'', wthdr:'', minus_wthdr:'', tot:this.currency(cntIn20Under+cntIn50Under+cntIn50Over+Number(cntNew))})
                    // this.storeCntData.push({category:"감소/철수", in20under:'', in50under:'', in50over:'', new:'', de:cntDe, minus_de:this.currency("-"+cntDe), wthdr:Number(cntWthdr), minus_wthdr:this.currency("-"+cntWthdr), tot:this.currency("-"+(cntDe+Number(cntWthdr)))})
                    
                    this.storeCntData.push({category:"신장", in20under:cntIn20Under, in50under:cntIn50Under, in50over:cntIn50Over, tot:this.currency(cntIn20Under+cntIn50Under+cntIn50Over)})
                    this.storeCntData.push({category:"감소", de:cntDe, minus_de:this.currency("-"+cntDe), tot:this.currency("-"+cntDe)})
                    this.storeCntData.push({category:"신규", new:cntNew, tot:this.currency(cntNew)})
                    this.storeCntData.push({category:"철수", wthdr:Number(cntWthdr), minus_wthdr:this.currency("-"+cntWthdr), tot:this.currency("-"+cntWthdr)})

                    // 전체 매장수는 신장매장+감소매장+신규매장은 제외
                    this.storeTotCnt = 0
                    for(let i=0; i<this.storeCntData.length; i++) {
                        // this.storeTotCnt += 
                        // this.storeCntData[i].in20under?Number(this.storeCntData[i].in20under):0 + 
                        // this.storeCntData[i].in50under?Number(this.storeCntData[i].in50under):0 + 
                        // this.storeCntData[i].in50over?Number(this.storeCntData[i].in50over):0 + 
                        // this.storeCntData[i].de?Number(this.storeCntData[i].de):0 +
                        // this.storeCntData[i].new?Number(this.storeCntData[i].new):0
                        if(!this.storeCntData[i].wthdr) {
                            this.storeTotCnt += Number(Math.abs(this.storeCntData[i].tot.replace(/,/g,"")))
                        }
                    }

                    // 금액
                    let moneyIn20Under = _(this.listData).filter(v => v.MONCHANGERR >= 0 && v.MONCHANGERR < 20).sumBy(({AMT}) => + Number(AMT))
                    let moneyIn50Under = _(this.listData).filter(v => v.MONCHANGERR >= 20 && v.MONCHANGERR < 50).sumBy(({AMT}) => + Number(AMT))
                    let moneyIn50Over = _(this.listData).filter(v => v.MONCHANGERR >= 50).sumBy(({AMT}) => + Number(AMT))
                    let moneyDe = _(this.listData).filter(v => v.AMT != 0 && v.MONCHANGERR < 0).sumBy(({AMT}) => + Number(AMT))
                    let moneyNew = money

                    // this.storeMoneyData.push({category:"신장/신규", in20under:Math.round(moneyIn20Under/1000000), in50under:Math.round(moneyIn50Under/1000000), in50over:Math.round(moneyIn50Over/1000000), new:Number(moneyNew), de:'', minus_de:'', wthdr:'', minus_wthdr:'', tot:this.currency(Math.round(moneyIn20Under/1000000)+Math.round(moneyIn50Under/1000000)+Math.round(moneyIn50Over/1000000)+moneyNew)})
                    // this.storeMoneyData.push({category:"감소/철수", in20under:'', in50under:'', in50over:'', new:'', de:Math.round(moneyDe/1000000), minus_de:this.currency("-"+Math.round(moneyDe/1000000)), wthdr:Number(moneyWthdr), minus_wthdr:this.currency("-"+moneyWthdr), tot:this.currency("-"+(Math.round(moneyDe/1000000)+moneyWthdr))})
                    
                    this.storeMoneyData.push({category:"신장", in20under:Math.round(moneyIn20Under/1000000), in50under:Math.round(moneyIn50Under/1000000), in50over:Math.round(moneyIn50Over/1000000), tot:this.currency(Math.round(moneyIn20Under/1000000)+Math.round(moneyIn50Under/1000000)+Math.round(moneyIn50Over/1000000))})
                    this.storeMoneyData.push({category:"감소", de:Math.round(moneyDe/1000000), minus_de:this.currency("-"+Math.round(moneyDe/1000000)), tot:this.currency("-"+Math.round(moneyDe/1000000))})
                    this.storeMoneyData.push({category:"신규", new:moneyNew, tot:this.currency(moneyNew)})
                    this.storeMoneyData.push({category:"철수", wthdr:Number(moneyWthdr), minus_wthdr:this.currency("-"+moneyWthdr), tot:this.currency(Number(moneyWthdr))})

                    // 전체 매장수는 신장매장+감소매장(신규매장은 제외)
                    this.storeTotMoney = 0
                    
                    for(let i=0; i<this.storeMoneyData.length; i++) {
                        // this.storeTotMoney += 
                        // this.storeMoneyData[i].in20under?Number(this.storeMoneyData[i].in20under):0 + 
                        // this.storeMoneyData[i].in50under?Number(this.storeMoneyData[i].in50under):0 + 
                        // this.storeMoneyData[i].in50over?Number(this.storeMoneyData[i].in50over):0 - 
                        // this.storeMoneyData[i].de?Number(this.storeMoneyData[i].de):0 +
                        // this.storeMoneyData[i].new?Number(this.storeMoneyData[i].new):0
                        if(!this.storeMoneyData[i].wthdr) {
                            this.storeTotMoney += Number(this.storeMoneyData[i].tot.replace(/,/g,""))
                        }
                    }
                    this.openCloseChart1(this.storeCntData, 1)
                    this.openCloseChart1(this.storeMoneyData, 2)
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )
    },
    getLastIndexStore() {
        // 지표별 매장 요약 > 매장수 > 유통형태별비중 > 작년
        return this.req2svr.getLastIndexStore(this.selectSucd, this.year, this.month).then(
            res => {
                let listData = []
                this.lastIndexData = []

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.listData.push(res)
                    } else {
                        this.listData = JSON.parse("[" + res + "]")
                    }

                    // 매장수
                    this.lastIndexData.tot = _.sumBy(this.listData, function(o) { return Number(o.CNT) })
                    this.lastIndexData.department = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({CNT}) => + Number(CNT))
                    this.lastIndexData.mall = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({CNT}) => + Number(CNT))
                    this.lastIndexData.agency = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({CNT}) => + Number(CNT))
                    this.lastIndexData.online = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({CNT}) => + Number(CNT))

                    let department = ((this.lastIndexData.department/this.lastIndexData.tot)*100).toFixed(1)
                    let mall = ((this.lastIndexData.mall/this.lastIndexData.tot)*100).toFixed(1)
                    let agency = ((this.lastIndexData.agency/this.lastIndexData.tot)*100).toFixed(1)
                    let online = ((this.lastIndexData.online/this.lastIndexData.tot)*100).toFixed(1)

                    // 금액
                    this.lastIndexData.tot_amt = _.sumBy(this.listData, function(o) { return Number(o.SILAMT) })
                    this.lastIndexData.department_amt = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({SILAMT}) => + Number(SILAMT))
                    this.lastIndexData.mall_amt = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({SILAMT}) => + Number(SILAMT))
                    this.lastIndexData.agency_amt = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({SILAMT}) => + Number(SILAMT))
                    this.lastIndexData.online_amt = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({SILAMT}) => + Number(SILAMT))

                    let paramData = []

                    paramData.push({category:"백화점", data:department})
                    paramData.push({category:"몰", data:mall})
                    paramData.push({category:"대리점", data:agency})
                    paramData.push({category:"온라인 및 기타", data:online})

                    // 유통형태별 비중 작년 매장수 그래프
                    this.indexChart(paramData, 5, 'cnt', this.lastIndexData.tot)
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )

    },
    getCuIndexStore() {
        // 지표별 매장 요약 > 매장수 > 유통형태별비중 > 현재년도
        return this.req2svr.getCuIndexStore(this.selectSucd, this.year, this.month).then(
            res => {
                let listData = []
                this.cuIndexData = []

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.listData.push(res)
                    } else {
                        this.listData = JSON.parse("[" + res + "]")
                    }

                    // 매장수
                    this.cuIndexData.tot = _.sumBy(this.listData, function(o) { return Number(o.CNT) })
                    this.cuIndexData.department = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({CNT}) => + Number(CNT))
                    this.cuIndexData.mall = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({CNT}) => + Number(CNT))
                    this.cuIndexData.agency = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({CNT}) => + Number(CNT))
                    this.cuIndexData.online = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({CNT}) => + Number(CNT))

                    let department = ((this.cuIndexData.department/this.cuIndexData.tot)*100).toFixed(1)
                    let mall = ((this.cuIndexData.mall/this.cuIndexData.tot)*100).toFixed(1)
                    let agency = ((this.cuIndexData.agency/this.cuIndexData.tot)*100).toFixed(1)
                    let online = ((this.cuIndexData.online/this.cuIndexData.tot)*100).toFixed(1)

                    // 금액
                    this.cuIndexData.tot_amt = _.sumBy(this.listData, function(o) { return Number(o.SILAMT) })
                    this.cuIndexData.department_amt = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({SILAMT}) => + Number(SILAMT))
                    this.cuIndexData.mall_amt = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({SILAMT}) => + Number(SILAMT))
                    this.cuIndexData.agency_amt = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({SILAMT}) => + Number(SILAMT))
                    this.cuIndexData.online_amt = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({SILAMT}) => + Number(SILAMT))

                    let paramData = []

                    paramData.push({category:"백화점", data:department})
                    paramData.push({category:"몰", data:mall})
                    paramData.push({category:"대리점", data:agency})
                    paramData.push({category:"온라인 및 기타", data:online})

                    // 유통형태별 비중 올해 매장수 그래프
                    this.indexChart(paramData, 6, 'cnt', this.cuIndexData.tot)
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )

    },
    getCompareStore() {
        let tot_data = []
        let color = ""
        // 지표별 매장 요약 > 매장수
        let department = ((this.cuIndexData.department/this.cuIndexData.tot)*100).toFixed(1)
        let mall = ((this.cuIndexData.mall/this.cuIndexData.tot)*100).toFixed(1)
        let agency = ((this.cuIndexData.agency/this.cuIndexData.tot)*100).toFixed(1)
        let online = ((this.cuIndexData.online/this.cuIndexData.tot)*100).toFixed(1)

        let paramData_department = []
        paramData_department.push({category:(this.year-1) + "년", absdata:this.lastIndexData.department, ogdata:this.lastIndexData.department, color: "#4fdbe2"})
        paramData_department.push({category:this.year + "년", absdata:this.cuIndexData.department, ogdata:this.cuIndexData.department, color: "#00becf"})
        if(this.cuIndexData.department-this.lastIndexData.department > 0) {
            color = "rgb(198, 198, 199)"
        } else {
            color = "#ffa89f"
        }
        paramData_department.push({category:"증감", absdata:Math.abs(this.cuIndexData.department-this.lastIndexData.department), ogdata:this.cuIndexData.department-this.lastIndexData.department, color: color})
        tot_data.push({
            category_en:"department", category: "백화점", 
            lastyear: this.year-1, cuyear: this.year, 
            lastdata: this.lastIndexData.department, cudata: this.cuIndexData.department, 
            abs_incredata: Math.abs(this.cuIndexData.department-this.lastIndexData.department), incredata: this.cuIndexData.department-this.lastIndexData.department,
            incredata_color: color
        })
        

        let paramData_mall = []
        paramData_mall.push({category:(this.year-1) + "년", absdata:this.lastIndexData.mall, ogdata:this.lastIndexData.mall, color: "#4fdbe2"})
        paramData_mall.push({category:this.year + "년", absdata:this.cuIndexData.mall, ogdata:this.cuIndexData.mall, color: "#00becf"})
        if(this.cuIndexData.mall-this.lastIndexData.mall > 0) {
            color = "rgb(198, 198, 199)"
        } else {
            color = "#ffa89f"
        }
        paramData_mall.push({category:"증감", absdata:Math.abs(this.cuIndexData.mall-this.lastIndexData.mall), ogdata:this.cuIndexData.mall-this.lastIndexData.mall, color: color})
        tot_data.push({
            category_en:"mall", category: "몰", 
            lastyear: this.year-1, cuyear: this.year, 
            lastdata: this.lastIndexData.mall, cudata: this.cuIndexData.mall, 
            abs_incredata: Math.abs(this.cuIndexData.mall-this.lastIndexData.mall), incredata: this.cuIndexData.mall-this.lastIndexData.mall,
            incredata_color: color
        })
        

        let paramData_agency = []
        paramData_agency.push({category:(this.year-1) + "년", absdata:this.lastIndexData.agency, ogdata:this.lastIndexData.agency, color: "#4fdbe2"})
        paramData_agency.push({category:this.year + "년", absdata:this.cuIndexData.agency, ogdata:this.cuIndexData.agency, color: "#00becf"})
        if(this.cuIndexData.agency-this.lastIndexData.agency > 0) {
            color = "rgb(198, 198, 199)"
        } else {
            color = "#ffa89f"
        }
        paramData_agency.push({category:"증감", absdata:Math.abs(this.cuIndexData.agency-this.lastIndexData.agency), ogdata:this.cuIndexData.agency-this.lastIndexData.agency, color: color})
        tot_data.push({
            category_en:"agency", category: "대리점", 
            lastyear: this.year-1, cuyear: this.year, 
            lastdata: this.lastIndexData.agency, cudata: this.cuIndexData.agency, 
            abs_incredata: Math.abs(this.cuIndexData.agency-this.lastIndexData.agency), incredata: this.cuIndexData.agency-this.lastIndexData.agency,
            incredata_color: color
        })
        

        let paramData_online = []
        paramData_online.push({category:(this.year-1) + "년", absdata:this.lastIndexData.online, ogdata:this.lastIndexData.online, color: "#4fdbe2"})
        paramData_online.push({category:this.year + "년", absdata:this.cuIndexData.online, ogdata:this.cuIndexData.online, color: "#00becf"})
        if(this.cuIndexData.online-this.lastIndexData.online > 0) {
            color = "rgb(198, 198, 199)"
        } else {
            color = "#ffa89f"
        }
        paramData_online.push({category:"증감", absdata:Math.abs(this.cuIndexData.online-this.lastIndexData.online), ogdata:this.cuIndexData.online-this.lastIndexData.online, color: color})
        tot_data.push({
            category_en:"online", category: "온라인 및 기타", 
            lastyear: this.year-1, cuyear: this.year, 
            lastdata: this.lastIndexData.online, cudata: this.cuIndexData.online, 
            abs_incredata: Math.abs(this.cuIndexData.online-this.lastIndexData.online), incredata: this.cuIndexData.online-this.lastIndexData.online,
            incredata_color: color
        })
        
        // 매장수 차트
        // this.storeChart(paramData_department, 7)
        // this.storeChart(paramData_mall, 8)
        // this.storeChart(paramData_agency, 9)
        // this.storeChart(paramData_online, 10)
        this.storeChart_temp(tot_data)
    },
    getMonthAcc() {
        let tot_data = []
        let color = ""
        // 지표별 매장 요약 > 매장수 > 월 누계
        let last_department = ((this.lastIndexData.department_amt/this.lastIndexData.tot_amt)*100).toFixed(1)
        let last_mall = ((this.lastIndexData.mall_amt/this.lastIndexData.tot_amt)*100).toFixed(1)
        let last_agency = ((this.lastIndexData.agency_amt/this.lastIndexData.tot_amt)*100).toFixed(1)
        let last_online = ((this.lastIndexData.online_amt/this.lastIndexData.tot_amt)*100).toFixed(1)

        let last_paramData = []
        last_paramData.push({category:"백화점", data:last_department})
        last_paramData.push({category:"몰", data:last_mall})
        last_paramData.push({category:"대리점", data:last_agency})
        last_paramData.push({category:"온라인 및 기타", data:last_online})

        let cu_department = ((this.cuIndexData.department_amt/this.cuIndexData.tot_amt)*100).toFixed(1)
        let cu_mall = ((this.cuIndexData.mall_amt/this.cuIndexData.tot_amt)*100).toFixed(1)
        let cu_agency = ((this.cuIndexData.agency_amt/this.cuIndexData.tot_amt)*100).toFixed(1)
        let cu_online = ((this.cuIndexData.online_amt/this.cuIndexData.tot_amt)*100).toFixed(1)

        let cu_paramData = []
        cu_paramData.push({category:"백화점", data:cu_department})
        cu_paramData.push({category:"몰", data:cu_mall})
        cu_paramData.push({category:"대리점", data:cu_agency})
        cu_paramData.push({category:"온라인 및 기타", data:cu_online})

        // 유통형태별 비중 작년,올해 누계 그래프
        this.indexChart(last_paramData, 5, 'money', this.lastIndexData.tot_amt)
        this.indexChart(cu_paramData, 6, 'money', this.cuIndexData.tot_amt)

        let paramData_department = []
        paramData_department.push(
            {
                category:(this.year-1) + "년", 
                absdata:Math.round(this.lastIndexData.department_amt/1000000), 
                ogdata:Math.round(this.lastIndexData.department_amt/1000000), 
                color: "#4fdbe2"
            }
        )
        paramData_department.push(
            {
                category:this.year + "년", 
                absdata:Math.round(this.cuIndexData.department_amt/1000000), 
                ogdata:Math.round(this.cuIndexData.department_amt/1000000), 
                color: "#00becf"                
            }
        )
        if(this.cuIndexData.department_amt - this.lastIndexData.department_amt > 0) {
            paramData_department.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.department_amt-this.lastIndexData.department_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.department_amt-this.lastIndexData.department_amt)/1000000), 
                    color: "rgb(198, 198, 199)"                    
                }
            )
        } else {
            paramData_department.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.department_amt-this.lastIndexData.department_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.department_amt-this.lastIndexData.department_amt)/1000000), 
                    color: "#ffa89f"
                }
            )
        }
            
        let paramData_mall = []
        paramData_mall.push(
            {
                category:(this.year-1) + "년", 
                absdata:Math.round(this.lastIndexData.mall_amt/1000000), 
                ogdata:Math.round(this.lastIndexData.mall_amt/1000000), 
                color: "#4fdbe2"
            }
        )
        paramData_mall.push(
            {
                category:this.year + "년", 
                absdata:Math.round(this.cuIndexData.mall_amt/1000000), 
                ogdata:Math.round(this.cuIndexData.mall_amt/1000000), 
                color: "#00becf"
            }
        )
        if(this.cuIndexData.mall_amt - this.lastIndexData.mall_amt > 0) {
            paramData_mall.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.mall_amt-this.lastIndexData.mall_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.mall_amt-this.lastIndexData.mall_amt)/1000000), 
                    color: "rgb(198, 198, 199)"
                }
            )
        } else {
            paramData_mall.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.mall_amt-this.lastIndexData.mall_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.mall_amt-this.lastIndexData.mall_amt)/1000000), 
                    color: "#ffa89f"
                }
            )
        }

        let paramData_agency = []
        paramData_agency.push(
            {
                category:(this.year-1) + "년", 
                absdata:Math.round(this.lastIndexData.agency_amt/1000000), 
                ogdata:Math.round(this.lastIndexData.agency_amt/1000000), 
                color: "#4fdbe2"
            }
        )
        paramData_agency.push(
            {
                category:this.year + "년", 
                absdata:Math.round(this.cuIndexData.agency_amt/1000000), 
                ogdata:Math.round(this.cuIndexData.agency_amt/1000000), 
                color: "#00becf"
            }
        )
        if(this.cuIndexData.agency_amt - this.lastIndexData.agency_amt > 0) {
            paramData_agency.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.agency_amt-this.lastIndexData.agency_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.agency_amt-this.lastIndexData.agency_amt)/1000000), 
                    color: "rgb(198, 198, 199)"
                }
            )
        } else {
            paramData_agency.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.agency_amt-this.lastIndexData.agency_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.agency_amt-this.lastIndexData.agency_amt)/1000000), 
                    color: "#ffa89f"
                }
            )
        }
            
        let paramData_online = []
        paramData_online.push(
            {
                category:(this.year-1) + "년", 
                absdata:Math.round(this.lastIndexData.online_amt/1000000), 
                ogdata:Math.round(this.lastIndexData.online_amt/1000000), 
                color: "#4fdbe2"
            }
        )
        paramData_online.push(
            {
                category:this.year + "년", 
                absdata:Math.round(this.cuIndexData.online_amt/1000000), 
                ogdata:Math.round(this.cuIndexData.online_amt/1000000), 
                color: "#00becf"
            }
        )
        if(this.cuIndexData.online_amt - this.lastIndexData.online_amt > 0) {
            paramData_online.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.online_amt-this.lastIndexData.online_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.online_amt-this.lastIndexData.online_amt)/1000000), 
                    color: "rgb(198, 198, 199)"
                }
            )
        } else {
            paramData_online.push(
                {
                    category:"증감", 
                    absdata:Math.abs(Math.round((this.cuIndexData.online_amt-this.lastIndexData.online_amt)/1000000)), 
                    ogdata:Math.round((this.cuIndexData.online_amt-this.lastIndexData.online_amt)/1000000), 
                    color: "#ffa89f"
                }
            )
        }


        for(let i in this.gubuns) {
            if(this.cuIndexData[this.gubuns[i].category_en+"_amt"]-this.lastIndexData[this.gubuns[i].category_en+"_amt"] > 0) {
                color = "rgb(198, 198, 199)"
            } else {
                color = "#ffa89f"
            }
            tot_data.push({
                category_en:this.gubuns[i].category_en, category: this.gubuns[i].category_ko, 
                lastyear: this.year-1, cuyear: this.year, 
                lastdata: Math.round(this.lastIndexData[this.gubuns[i].category_en+"_amt"]/1000000), 
                cudata: Math.round(this.cuIndexData[this.gubuns[i].category_en+"_amt"]/1000000), 
                abs_incredata: Math.abs(Math.round((this.cuIndexData[this.gubuns[i].category_en+"_amt"]-this.lastIndexData[this.gubuns[i].category_en+"_amt"])/1000000)), 
                incredata: Math.round((this.cuIndexData[this.gubuns[i].category_en+"_amt"]-this.lastIndexData[this.gubuns[i].category_en+"_amt"])/1000000),
                incredata_color: color
            })
        }
            
        // 월 누계 차트
        // this.storeChart(paramData_department, 7)
        // this.storeChart(paramData_mall, 8)
        // this.storeChart(paramData_agency, 9)
        // this.storeChart(paramData_online, 10)
        this.storeChart_temp(tot_data)
    },
    getMonthAvg() {
        // 지표별 매장 요약 > 월평균
        return this.req2svr.getMonthAvg(this.selectSucd, this.year, this.month).then(
            res => {
                let listData = []
                this.cuMonthAvgData = []
                this.lastMonthAvgData = []

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.listData.push(res)
                    } else {
                        this.listData = JSON.parse("[" + res + "]")
                    }

                    // 유통형태별 작년 월평균
                    this.lastMonthAvgData.tot = _.sumBy(this.listData, function(o) { return Number(o.LY_MONTH_AVG) })
                    this.lastMonthAvgData.department = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({LY_MONTH_AVG}) => + Number(LY_MONTH_AVG))
                    this.lastMonthAvgData.mall = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({LY_MONTH_AVG}) => + Number(LY_MONTH_AVG))
                    this.lastMonthAvgData.agency = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({LY_MONTH_AVG}) => + Number(LY_MONTH_AVG))
                    this.lastMonthAvgData.online = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({LY_MONTH_AVG}) => + Number(LY_MONTH_AVG))

                    // 유통형태별 작년 월평균 비중
                    let last_department = ((this.lastMonthAvgData.department/this.lastMonthAvgData.tot)*100).toFixed(1)
                    let last_mall = ((this.lastMonthAvgData.mall/this.lastMonthAvgData.tot)*100).toFixed(1)
                    let last_agency = ((this.lastMonthAvgData.agency/this.lastMonthAvgData.tot)*100).toFixed(1)
                    let last_online = ((this.lastMonthAvgData.online/this.lastMonthAvgData.tot)*100).toFixed(1)

                    // 유통형태별 올해 월평균
                    this.cuMonthAvgData.tot = _.sumBy(this.listData, function(o) { return Number(o.CY_MONTH_AVG) })
                    this.cuMonthAvgData.department = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({CY_MONTH_AVG}) => + Number(CY_MONTH_AVG))
                    this.cuMonthAvgData.mall = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({CY_MONTH_AVG}) => + Number(CY_MONTH_AVG))
                    this.cuMonthAvgData.agency = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({CY_MONTH_AVG}) => + Number(CY_MONTH_AVG))
                    this.cuMonthAvgData.online = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({CY_MONTH_AVG}) => + Number(CY_MONTH_AVG))

                    // 유통형태별 올해 월평균 비중
                    let cu_department = ((this.cuMonthAvgData.department/this.cuMonthAvgData.tot)*100).toFixed(1)
                    let cu_mall = ((this.cuMonthAvgData.mall/this.cuMonthAvgData.tot)*100).toFixed(1)
                    let cu_agency = ((this.cuMonthAvgData.agency/this.cuMonthAvgData.tot)*100).toFixed(1)
                    let cu_online = ((this.cuMonthAvgData.online/this.cuMonthAvgData.tot)*100).toFixed(1)

                    let last_paramData = []
                    last_paramData.push({category:"백화점", data:last_department})
                    last_paramData.push({category:"몰", data:last_mall})
                    last_paramData.push({category:"대리점", data:last_agency})
                    last_paramData.push({category:"온라인 및 기타", data:last_online})

                    let cu_paramData = []
                    cu_paramData.push({category:"백화점", data:cu_department})
                    cu_paramData.push({category:"몰", data:cu_mall})
                    cu_paramData.push({category:"대리점", data:cu_agency})
                    cu_paramData.push({category:"온라인 및 기타", data:cu_online})

                    // 유통형태별 비중 작년,올해 월평균 금액 그래프
                    this.indexChart(last_paramData, 5, 'monry', this.lastMonthAvgData.tot)
                    this.indexChart(cu_paramData, 6, 'monry', this.cuMonthAvgData.tot)

                    let paramData_department = []
                    paramData_department.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthAvgData.department/1000000), 
                            ogdata:Math.round(this.lastMonthAvgData.department/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_department.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthAvgData.department/1000000), 
                            ogdata:Math.round(this.cuMonthAvgData.department/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthAvgData.department - this.lastMonthAvgData.department > 0) {
                        paramData_department.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.department-this.lastMonthAvgData.department)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.department-this.lastMonthAvgData.department)/1000000), 
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_department.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.department-this.lastMonthAvgData.department)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.department-this.lastMonthAvgData.department)/1000000), 
                                color: "#ffa89f"
                            }
                        )
                    }
                    
                    let paramData_mall = []
                    paramData_mall.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthAvgData.mall/1000000), 
                            ogdata:Math.round(this.lastMonthAvgData.mall/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_mall.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthAvgData.mall/1000000), 
                            ogdata:Math.round(this.cuMonthAvgData.mall/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthAvgData.mall - this.lastMonthAvgData.mall > 0) {
                        paramData_mall.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.mall-this.lastMonthAvgData.mall)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.mall-this.lastMonthAvgData.mall)/1000000), 
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_mall.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.mall-this.lastMonthAvgData.mall)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.mall-this.lastMonthAvgData.mall)/1000000), 
                                color: "#ffa89f"
                            }
                        )
                    }

                    let paramData_agency = []
                    paramData_agency.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthAvgData.agency/1000000), 
                            ogdata:Math.round(this.lastMonthAvgData.agency/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_agency.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthAvgData.agency/1000000), 
                            ogdata:Math.round(this.cuMonthAvgData.agency/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthAvgData.agency - this.lastMonthAvgData.agency > 0) {
                        paramData_agency.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.agency-this.lastMonthAvgData.agency)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.agency-this.lastMonthAvgData.agency)/1000000), 
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_agency.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.agency-this.lastMonthAvgData.agency)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.agency-this.lastMonthAvgData.agency)/1000000), 
                                color: "#ffa89f"
                            }
                        )
                    }
                    
                    let paramData_online = []
                    paramData_online.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthAvgData.online/1000000), 
                            ogdata:Math.round(this.lastMonthAvgData.online/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_online.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthAvgData.online/1000000), 
                            ogdata:Math.round(this.cuMonthAvgData.online/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthAvgData.online - this.lastMonthAvgData.online > 0) {
                        paramData_online.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.online-this.lastMonthAvgData.online)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.online-this.lastMonthAvgData.online)/1000000), 
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_online.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round((this.cuMonthAvgData.online-this.lastMonthAvgData.online)/1000000)), 
                                ogdata:Math.round((this.cuMonthAvgData.online-this.lastMonthAvgData.online)/1000000), 
                                color: "#ffa89f"
                            }
                        )
                    }

                    let tot_data = []
                    let color = ""

                    for(let i in this.gubuns) {
                        if(this.cuMonthAvgData[this.gubuns[i].category_en]-this.lastMonthAvgData[this.gubuns[i].category_en] > 0) {
                            color = "rgb(198, 198, 199)"
                        } else {
                            color = "#ffa89f"
                        }
                        tot_data.push({
                            category_en:this.gubuns[i].category_en, category: this.gubuns[i].category_ko, 
                            lastyear: this.year-1, cuyear: this.year, 
                            lastdata: Math.round(this.lastMonthAvgData[this.gubuns[i].category_en]/1000000), 
                            cudata: Math.round(this.cuMonthAvgData[this.gubuns[i].category_en]/1000000), 
                            abs_incredata: Math.abs(Math.round((this.cuMonthAvgData[this.gubuns[i].category_en]-this.lastMonthAvgData[this.gubuns[i].category_en])/1000000)), 
                            incredata: Math.round((this.cuMonthAvgData[this.gubuns[i].category_en]-this.lastMonthAvgData[this.gubuns[i].category_en])/1000000),
                            incredata_color: color
                        })
                    }

                    // 월평균 차트
                    // this.storeChart(paramData_department, 7)
                    // this.storeChart(paramData_mall, 8)
                    // this.storeChart(paramData_agency, 9)
                    // this.storeChart(paramData_online, 10)   
                    this.storeChart_temp(tot_data)
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )
    },
    getMonthStoreAvg() {
        // 지표별 매장 요약 > 매장별평균
        return this.req2svr.getMonthStoreAvg(this.selectSucd, this.year, this.month).then(
            res => {
                let listData = []
                this.cuMonthStoreAvgData = []
                this.lastMonthStoreAvgData = []

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.listData.push(res)
                    } else {
                        this.listData = JSON.parse("[" + res + "]")
                    }

                    // 유통형태별 비중 작년 매장별 합산
                    this.lastMonthStoreAvgData.tot = _.sumBy(this.listData, function(o) { return Number(o.LAST_SILAMT) })
                    this.lastMonthStoreAvgData.department = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({LAST_SILAMT}) => + Number(LAST_SILAMT))
                    this.lastMonthStoreAvgData.mall = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({LAST_SILAMT}) => + Number(LAST_SILAMT))
                    this.lastMonthStoreAvgData.agency = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({LAST_SILAMT}) => + Number(LAST_SILAMT))
                    this.lastMonthStoreAvgData.online = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({LAST_SILAMT}) => + Number(LAST_SILAMT))

                    // 유통형태별 비중 작년 매장 개수 합산
                    // this.lastMonthStoreAvgData.department_cnt = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({LAST_CNT}) => + Number(LAST_CNT))
                    // this.lastMonthStoreAvgData.mall_cnt = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({LAST_CNT}) => + Number(LAST_CNT))
                    // this.lastMonthStoreAvgData.agency_cnt = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({LAST_CNT}) => + Number(LAST_CNT))
                    // this.lastMonthStoreAvgData.online_cnt = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({LAST_CNT}) => + Number(LAST_CNT))

                    // 유통형태별 비중 작년 매장별 평균 비중
                    let last_department = ((this.lastMonthStoreAvgData.department/this.lastMonthStoreAvgData.tot)*100).toFixed(1)
                    let last_mall = ((this.lastMonthStoreAvgData.mall/this.lastMonthStoreAvgData.tot)*100).toFixed(1)
                    let last_agency = ((this.lastMonthStoreAvgData.agency/this.lastMonthStoreAvgData.tot)*100).toFixed(1)
                    let last_online = ((this.lastMonthStoreAvgData.online/this.lastMonthStoreAvgData.tot)*100).toFixed(1)

                    // 유통형태별 비중 올해 매장별 합산
                    this.cuMonthStoreAvgData.tot = _.sumBy(this.listData, function(o) { return Number(o.CU_SILAMT) })
                    this.cuMonthStoreAvgData.department = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({CU_SILAMT}) => + Number(CU_SILAMT))
                    this.cuMonthStoreAvgData.mall = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({CU_SILAMT}) => + Number(CU_SILAMT))
                    this.cuMonthStoreAvgData.agency = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({CU_SILAMT}) => + Number(CU_SILAMT))
                    this.cuMonthStoreAvgData.online = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({CU_SILAMT}) => + Number(CU_SILAMT))

                    // 유통형태별 비중 올해 매장 개수 합산
                    // this.cuMonthStoreAvgData.department_cnt = _(this.listData).filter(v => v.SHTPNM == "백화점").sumBy(({CU_CNT}) => + Number(CU_CNT))
                    // this.cuMonthStoreAvgData.mall_cnt = _(this.listData).filter(v => v.SHTPNM == "몰").sumBy(({CU_CNT}) => + Number(CU_CNT))
                    // this.cuMonthStoreAvgData.agency_cnt = _(this.listData).filter(v => v.SHTPNM == "대리점").sumBy(({CU_CNT}) => + Number(CU_CNT))
                    // this.cuMonthStoreAvgData.online_cnt = _(this.listData).filter(v => v.SHTPNM != "백화점" && v.SHTPNM != "몰" && v.SHTPNM != "대리점").sumBy(({CU_CNT}) => + Number(CU_CNT))

                    // 유통형태별 비중 올해 매장별 평균 비중
                    let cu_department = ((this.cuMonthStoreAvgData.department/this.cuMonthStoreAvgData.tot)*100).toFixed(1)
                    let cu_mall = ((this.cuMonthStoreAvgData.mall/this.cuMonthStoreAvgData.tot)*100).toFixed(1)
                    let cu_agency = ((this.cuMonthStoreAvgData.agency/this.cuMonthStoreAvgData.tot)*100).toFixed(1)
                    let cu_online = ((this.cuMonthStoreAvgData.online/this.cuMonthStoreAvgData.tot)*100).toFixed(1)

                    let last_paramData = []
                    last_paramData.push({category:"백화점", data:last_department})
                    last_paramData.push({category:"몰", data:last_mall})
                    last_paramData.push({category:"대리점", data:last_agency})
                    last_paramData.push({category:"온라인 및 기타", data:last_online})

                    let cu_paramData = []
                    cu_paramData.push({category:"백화점", data:cu_department})
                    cu_paramData.push({category:"몰", data:cu_mall})
                    cu_paramData.push({category:"대리점", data:cu_agency})
                    cu_paramData.push({category:"온라인 및 기타", data:cu_online})

                    // 유통형태별 비중 작년,올해 매장별평균 금액 그래프
                    this.indexChart(last_paramData, 5, 'monry', this.lastMonthStoreAvgData.tot)
                    this.indexChart(cu_paramData, 6, 'monry', this.cuMonthStoreAvgData.tot)

                    let paramData_department = []
                    paramData_department.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthStoreAvgData.department/1000000), 
                            ogdata:Math.round(this.lastMonthStoreAvgData.department/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_department.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthStoreAvgData.department/1000000), 
                            ogdata:Math.round(this.cuMonthStoreAvgData.department/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthStoreAvgData.department - this.lastMonthStoreAvgData.department > 0) {
                        paramData_department.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.department/1000000) - Math.round(this.lastMonthStoreAvgData.department/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.department/1000000) - Math.round(this.lastMonthStoreAvgData.department/1000000)),
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_department.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.department/1000000) - Math.round(this.lastMonthStoreAvgData.department/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.department/1000000) - Math.round(this.lastMonthStoreAvgData.department/1000000)),
                                color: "#ffa89f"
                            }
                        )
                    }
                    
                    let paramData_mall = []
                    paramData_mall.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthStoreAvgData.mall/1000000), 
                            ogdata:Math.round(this.lastMonthStoreAvgData.mall/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_mall.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthStoreAvgData.mall/1000000), 
                            ogdata:Math.round(this.cuMonthStoreAvgData.mall/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthStoreAvgData.mall - this.lastMonthStoreAvgData.mall > 0) {
                        paramData_mall.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.mall/1000000) - Math.round(this.lastMonthStoreAvgData.mall/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.mall/1000000) - Math.round(this.lastMonthStoreAvgData.mall/1000000)),
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_mall.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.mall/1000000) - Math.round(this.lastMonthStoreAvgData.mall/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.mall/1000000) - Math.round(this.lastMonthStoreAvgData.mall/1000000)),
                                color: "#ffa89f"
                            }
                        )
                    }

                    let paramData_agency = []
                    paramData_agency.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthStoreAvgData.agency/1000000), 
                            ogdata:Math.round(this.lastMonthStoreAvgData.agency/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_agency.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthStoreAvgData.agency/1000000), 
                            ogdata:Math.round(this.cuMonthStoreAvgData.agency/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthStoreAvgData.agency - this.lastMonthStoreAvgData.agency > 0) {
                        paramData_agency.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.agency/1000000) - Math.round(this.lastMonthStoreAvgData.agency/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.agency/1000000) - Math.round(this.lastMonthStoreAvgData.agency/1000000)),
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_agency.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.agency/1000000) - Math.round(this.lastMonthStoreAvgData.agency/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.agency/1000000) - Math.round(this.lastMonthStoreAvgData.agency/1000000)),
                                color: "#ffa89f"
                            }
                        )
                    }

                    let paramData_online = []
                    paramData_online.push(
                        {
                            category:(this.year-1) + "년", 
                            absdata:Math.round(this.lastMonthStoreAvgData.online/1000000), 
                            ogdata:Math.round(this.lastMonthStoreAvgData.online/1000000), 
                            color: "#4fdbe2"
                        }
                    )
                    paramData_online.push(
                        {
                            category:this.year + "년", 
                            absdata:Math.round(this.cuMonthStoreAvgData.online/1000000), 
                            ogdata:Math.round(this.cuMonthStoreAvgData.online/1000000), 
                            color: "#00becf"
                        }
                    )
                    if(this.cuMonthStoreAvgData.online - this.lastMonthStoreAvgData.online > 0) {
                        paramData_online.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.online/1000000) - Math.round(this.lastMonthStoreAvgData.online/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.online/1000000) - Math.round(this.lastMonthStoreAvgData.online/1000000)),
                                color: "rgb(198, 198, 199)"
                            }
                        )
                    } else {
                        paramData_online.push(
                            {
                                category:"증감", 
                                absdata:Math.abs(Math.round(this.cuMonthStoreAvgData.online/1000000) - Math.round(this.lastMonthStoreAvgData.online/1000000)),
                                ogdata:Math.round(Math.round(this.cuMonthStoreAvgData.online/1000000) - Math.round(this.lastMonthStoreAvgData.online/1000000)),
                                color: "#ffa89f"
                            }
                        )
                    }

                    let tot_data = []
                    let color = ""

                    for(let i in this.gubuns) {
                        if(this.cuMonthStoreAvgData[this.gubuns[i].category_en]-this.lastMonthStoreAvgData[this.gubuns[i].category_en] > 0) {
                            color = "rgb(198, 198, 199)"
                        } else {
                            color = "#ffa89f"
                        }
                        tot_data.push({
                            category_en:this.gubuns[i].category_en, category: this.gubuns[i].category_ko, 
                            lastyear: this.year-1, cuyear: this.year, 
                            lastdata: Math.round(this.lastMonthStoreAvgData[this.gubuns[i].category_en]/1000000), 
                            cudata: Math.round(this.cuMonthStoreAvgData[this.gubuns[i].category_en]/1000000), 
                            abs_incredata: Math.abs(Math.round((this.cuMonthStoreAvgData[this.gubuns[i].category_en]-this.lastMonthStoreAvgData[this.gubuns[i].category_en])/1000000)), 
                            incredata: Math.round((this.cuMonthStoreAvgData[this.gubuns[i].category_en]-this.lastMonthStoreAvgData[this.gubuns[i].category_en])/1000000),
                            incredata_color: color
                        })
                    }

                    // 매장별평균 차트
                    // this.storeChart(paramData_department, 7)
                    // this.storeChart(paramData_mall, 8)
                    // this.storeChart(paramData_agency, 9)
                    // this.storeChart(paramData_online, 10)
                    this.storeChart_temp(tot_data)
                }
            },
            rej => {
                console.log("rej", rej);
            }
        )

    },
    getShtpStore(key) {
        // 유통형태별 매장 요약 > 매장수
        let paramData = []
        // paramData.push({category:this.year-1, result:this.lastIndexData[key], color:"rgb(140, 190, 249)"})
        // paramData.push({category:this.year, result:this.cuIndexData[key], color:"rgb(63, 147, 245)"})
        // paramData.push({category:"증감", result:this.cuIndexData[key]-this.lastIndexData[key], color:"rgb(255, 168, 159)"})
        let text = ""
        if(this.cuIndexData[key]-this.lastIndexData[key] > 0) { text = "증가" } 
        else if(this.cuIndexData[key]-this.lastIndexData[key] < 0) { text = "감소" } 
        else { text = "동일" }

        paramData.push({category:this.year-1,   lastdata:this.lastIndexData[key],   color:"rgb(140, 190, 249)"})
        paramData.push({category:this.year,     cudata:this.cuIndexData[key],       color:"rgb(63, 147, 245)", result:this.currency(this.cuIndexData[key]-this.lastIndexData[key]), text: text})

        // this.openCloseMakeChart2(paramData, 11)
        this.openCloseMakeChart3(paramData, 11)
    },
    getMonthAcc2(key) {
        // 유통형태별 매장 요약 > 월 누계
        let paramData = []
        
        // paramData.push({category:this.year-1, result:Math.round(this.lastIndexData[key]/1000000), color:"rgb(140, 190, 249)"})
        // paramData.push({category:this.year, result:Math.round(this.cuIndexData[key]/1000000), color:"rgb(63, 147, 245)"})
        // paramData.push({category:"증감", result:Math.round((this.cuIndexData[key]-this.lastIndexData[key])/1000000), color:"rgb(255, 168, 159)"})
        
        // this.openCloseMakeChart2(paramData, 12)

        let text = ""
        if(Math.round((this.cuIndexData[key]-this.lastIndexData[key])/1000000) > 0) { text = "증가" } 
        else if(Math.round((this.cuIndexData[key]-this.lastIndexData[key])/1000000) < 0) { text = "감소" } 
        else { text = "동일" }
        paramData.push({category:this.year-1,   lastdata:Math.round(this.lastIndexData[key]/1000000),   color:"rgb(140, 190, 249)"})
        paramData.push({category:this.year,     cudata:Math.round(this.cuIndexData[key]/1000000),       color:"rgb(63, 147, 245)", result:this.currency(Math.round((this.cuIndexData[key]-this.lastIndexData[key])/1000000)), text: text })
        
        this.openCloseMakeChart3(paramData, 12)
    },
    getMonthlySalesAverage() {
        // 유통형태별 매장 요약 > 월 평균
        this.req2svr.getMonthlySalesAverage(this.selectSucd, this.year, this.month, this.selectShtpGubun).then(
            res => {
                this.monthlyAverageData = {}

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.monthlyAverageData = res
                    } else {
                        this.monthlyAverageData = (JSON.parse("[" + res + "]"))[0]
                    }
                    
                    let paramData = []
                    // paramData.push({category:this.year-1, result:Math.round(this.monthlyAverageData.LAST_AVGMON/1000000), color:"rgb(140, 190, 249)"})
                    // paramData.push({category:this.year, result:Math.round(this.monthlyAverageData.CU_AVGMON/1000000), color:"rgb(63, 147, 245)"})
                    // paramData.push({category:"증감", result:Math.round((this.monthlyAverageData.INDE_MONTH_AVG)/1000000), color:"rgb(255, 168, 159)"})

                    // this.openCloseMakeChart2(paramData, 13)

                    let text = ""
                    if(Math.round((this.monthlyAverageData.INDE_MONTH_AVG)/1000000) > 0) { text = "증가" } 
                    else if(Math.round((this.monthlyAverageData.INDE_MONTH_AVG)/1000000) < 0) { text = "감소" } 
                    else { text = "동일" }
                    paramData.push({category:this.year-1, lastdata:Math.round(this.monthlyAverageData.LAST_AVGMON/1000000), color:"rgb(140, 190, 249)"})
                    paramData.push({category:this.year,   cudata:Math.round(this.monthlyAverageData.CU_AVGMON/1000000),     color:"rgb(63, 147, 245)", result: this.currency(Math.round((this.monthlyAverageData.INDE_MONTH_AVG)/1000000)), text: text})

                    this.openCloseMakeChart3(paramData, 13)
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )
    },
    getStoreSalesAverage() {
        // 유통형태별 매장 요약 > 매장별 평균
        this.req2svr.getStoreSalesAverage(this.selectSucd, this.year, this.month, this.selectShtpGubun).then(
            res => {
                this.storeAverageData = {}

                if (res.MACHBASE_ERROR) {
                    console.log("res", res)
                } else {
                    let count = (JSON.stringify(res).match(/{/g) || []).length

                    if(count < 1) {
                    } else if(count == 1) {
                        this.storeAverageData = res
                    } else {
                        this.storeAverageData = (JSON.parse("[" + res + "]"))[0]
                    }
                    
                    let paramData = []
                    // paramData.push({category:this.year-1, result:Math.round(this.storeAverageData.LAST_AVGVDCD/1000000), color:"rgb(140, 190, 249)"})
                    // paramData.push({category:this.year, result:Math.round(this.storeAverageData.CU_AVGVDCD/1000000), color:"rgb(63, 147, 245)"})
                    // paramData.push({category:"증감", result:Math.round((this.storeAverageData.AA)/1000000), color:"rgb(255, 168, 159)"})

                    // this.openCloseMakeChart2(paramData, 14)

                    let text = ""
                    if(Math.round((this.storeAverageData.AA)/1000000) > 0) { text = "증가" } 
                    else if(Math.round((this.storeAverageData.AA)/1000000) < 0) { text = "감소" } 
                    else { text = "동일" }
                    paramData.push({category:this.year-1, lastdata:Math.round(this.storeAverageData.LAST_AVGVDCD/1000000),  color:"rgb(140, 190, 249)"})
                    paramData.push({category:this.year,   cudata:Math.round(this.storeAverageData.CU_AVGVDCD/1000000),      color:"rgb(63, 147, 245)", result:this.currency(Math.round((this.storeAverageData.AA)/1000000)), text: text})

                    this.openCloseMakeChart3(paramData, 14)
                }
            },
            rej => {
            console.log("rej", rej);
            }
        )
    },
    changeGubun() {
        if(this.selectGubun == 0) {
            // 지표별 매장 요약 > 매장수 > 유통형태별비중
            this.getLastIndexStore().then(() => this.getCuIndexStore()).then(() => this.getCompareStore())
        } else if(this.selectGubun == 1) {
            // 지표별 매장 요약 > 월별누계 > 월별 누계 비교
            this.getMonthAcc()
        } else if(this.selectGubun == 2) {
            this.getMonthAvg()
        } else if(this.selectGubun == 3) {
            this.getMonthStoreAvg()            
        }

    },
    changeShtpGubun() { 
        this.getMonthlySalesAverage()
        this.getStoreSalesAverage()
        if(this.selectShtpGubun == "전체") {
            // 유통형태별 매장 요약
            this.getShtpStore("tot")
            this.getMonthAcc2("tot_amt")
        } else if(this.selectShtpGubun == "백화점") {
            this.getShtpStore("department")
            this.getMonthAcc2("department_amt")
        } else if(this.selectShtpGubun == "몰") {
            this.getShtpStore("mall")
            this.getMonthAcc2("mall_amt")            
        } else if(this.selectShtpGubun == "대리점") {
            this.getShtpStore("agency")
            this.getMonthAcc2("agency_amt")            
        } else if(this.selectShtpGubun == "기타") {
            this.getShtpStore("online")
            this.getMonthAcc2("online_amt")            
        }
    },
    chageTab(val) {
        this.tab = val

        if(val == 0){
            this.selectShtpGubun = "전체"
            this.changeGubun()
        } else {
            this.changeShtpGubun()
        }
    },
    prev() {
      this.$router.replace("/StoreMain");
    },
    indexChart(val, index, gubun, tot) {
        let year
        let summary
        let text
        if(index == 5){
            year = this.year-1 + "년"
            if(gubun == 'cnt') {
                summary = this.currency(tot)
                text = "(개)"
            } else {
                summary = this.currency(Math.round(tot/1000000))
                text = "(백만원)"
            }
        } else {
            year = this.year + "년"
            if(gubun == 'cnt') {
                summary = this.currency(tot)
                text = "(개)"
            } else {
                summary = this.currency(Math.round(tot/1000000))
                text = "(백만원)"
            }
        }

        let divName = "chartdiv" + index;
        let data = _.orderBy(val, function(o) { return Number(o.data) }, 'desc');

        AmCharts.makeChart(divName, {
            type: "pie",
            startEffect: "easeOutSine",
            balloonText: "[[title]]<br>([[value]]%)</span>",
            innerRadius: "60%",
            labelRadius: 1,
            startRadius: "60%",
            // radius: "25%",
            labelText: "[[title]]<br>([[value]]%)",
            accessibleLabel: "[[title]]: [[value]]%",
            colors: ["#3f93f5", "#c2c2c3", "#8cbef9", "#c5defc", "#c08bd9", "#dec8e3"],
            startDuration: 0.5,
            startEffect: "easeInSine",
            titleField: "category",
            valueField: "data",
            fontFamily: "GothamBold",
            fontSize: 13,
            allLabels: [
                {
                    align: "center",
                    id: "label-1",
                    text: year,
                    y: "40%"
                },
                {
                    align: "center",
                    id: "Label-2",
                    size: 20,
                    text: summary,
                    y: "44%",
                    fontFamily: "GothamBold"
                }
                ,
                {
                    align: "center",
                    id: "Label-3",
                    text: text,
                    y: "55%"
                }
            ],
            dataProvider: data
        });
    },
    storeChart(val, index) {
        let divName = "chartdiv" + index

        // AmCharts graphs 에서 labelText값으로 value를 쓰면 자동으로 ,가 찍히지만 
        // -값 표현을 위해 absdata를 사용중이므로 ogdata를 currency로 가공
        for(let i=0; i<val.length; i++) {
            val[i].ogdata = this.currency(val[i].ogdata)
        }

        AmCharts.makeChart(divName, {
            type: "serial",
            categoryField: "category",
            //rotate: true,
            startDuration: 1,
            fontFamily: "GothamBold",
            fontSize: 13,
            categoryAxis: {
                gridPosition: "start",
                axisColor: "#8DAFD6",
                gridThickness: 0,
                tickLength: 0
            },
            trendLines: [],
            graphs: [
                {
                    balloonText: "[[category]]:[[ogdata]]",
                    colorField: "color",
                    fillAlphas: 1,
                    id: "AmGraph-1",
                    labelText: "[[ogdata]]",
                    showAllValueLabels: true,
                    lineColorField: "color",
                    // title: "graph 1",
                    type: "column",
                    valueField: "absdata"
                }
            ],
            guides: [],
            valueAxes: [
                {
                    id: "ValueAxis-1",
                    // stackType: "regular",
                    axisThickness: 0,
                    gridThickness: 0,
                    labelsEnabled: false,
                    tickLength: 0,
                    totalText: "[[ogdata]]"
                }
            ],
            allLabels: [],
            balloon: {},
            dataProvider: val
        });
    },
    storeChart_temp(val) {
        let divName = "chartdiv7"

        // AmCharts graphs 에서 labelText값으로 value를 쓰면 자동으로 ,가 찍히지만 
        // -값 표현을 위해 absdata를 사용중이므로 ogdata를 currency로 가공
        for(let i=0; i<val.length; i++) {
            if(val[i].incredata > 0) {
                val[i].incretext = "증가" 
            } else if(val[i].incredata < 0) {
                val[i].incretext = "감소" 
            } else {
                val[i].incretext = "동일" 
            }
            val[i].incredata = this.currency(val[i].incredata)
        }
        let color = ["rgb(140, 190, 249)", "rgb(63, 147, 245)"]
        fontFamily: "GothamBold",
        // console.log(val)

        AmCharts.makeChart(divName, {
            type: "serial",
            categoryField: "category",
            theme: "none",
            legend: {
                enabled: false,
                horizontalGap: 10,
                useGraphSettings: true
            },
            fontSize: 15,
            dataProvider: val,
            valueAxes: [ {
                stackType: "regular",
                axisAlpha: 0,
                gridAlpha: 0,
                fontSize: 15,
            } ],
            graphs: [ {
                balloonText: "<b>[[category]]</b><br><span style='font-size:14px'>[[title]]: <b>[[value]]</b></span>",
                fillAlphas: 0.8,
                labelText: "[[value]]",
                labelPosition: "top",
                showAllValueLabels: true,
                lineAlpha: 0.3,
                title: this.year-1,
                type: "column",
                newStack: true,
                color: "#000000",
                lineColor: color[0],
                valueField: "lastdata"
            }, {
                balloonText: "<b>[[category]]</b><br><span style='font-size:14px'>[[title]]: <b>[[value]]</b></span><br><span>전년대비:<b>[[incretext]]([[incredata]])</b></span>",
                fillAlphas: 0.8,
                labelText: "[[value]]",
                labelPosition: "top",
                showAllValueLabels: true,
                lineAlpha: 0.3,
                title: this.year,
                type: "column",
                newStack: true,
                color: "#000000",
                lineColor: color[1],
                valueField: "cudata"
            }],
            categoryAxis: {
                gridPosition: "start",
                axisAlpha: 0,
                gridAlpha: 0,
                position: "left"
            }
        });
    },
    openCloseChart1(val, index) {
        let divName = "chartdiv" + index;
        let data = val
        // for(let i=0; i<val.length; i++) {
        //     if(val[i].category == "감소매장") {
        //         val[i].minus_de = "-" + this.currency(val[i].minus_de)    
        //     }
        // }

        let title = ["신장매장 20%이내","신장매장 50%이내", "신장매장 50%이상", "감소매장", "신규매장", "철수매장"]

        AmCharts.makeChart(divName, {
            type: "serial",
            startEffect: "easeOutSine",
            categoryField: "category",
            colors: ["#C5DEFC", "#8CBEF9", "#3F93F5", "#FF8A97", "#D0C3FD", "#FF5C33"],
            marginRight: 100,
            rotate: true,
            startDuration: 1,
            fontSize: 15,
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
                    fixedColumnWidth: 40,
                    valueField: "in20under"
                },
                {
                    balloonText: "[[title]]:[[value]]",
                    fillAlphas: 1,
                    id: "AmGraph-2",
                    labelText: "[[value]]",
                    title: title[1],
                    type: "column",
                    fixedColumnWidth: 40,
                    valueField: "in50under"
                },
                {
                    balloonText: "[[title]]:[[value]]",
                    fillAlphas: 1,
                    id: "AmGraph-3",
                    labelText: "[[value]]",
                    title: title[2],
                    type: "column",
                    fixedColumnWidth: 40,
                    valueField: "in50over"
                },
                {
                    balloonText: "[[title]]:[[minus_de]]",
                    fillAlphas: 1,
                    id: "AmGraph-4",
                    labelText: "[[minus_de]]",
                    title: title[3],
                    type: "column",
                    fixedColumnWidth: 40,
                    valueField: "de"
                },
                {
                    balloonText: "[[title]]:[[value]]",
                    fillAlphas: 1,
                    id: "AmGraph-5",
                    labelText: "[[value]]",
                    title: title[4],
                    type: "column",
                    fixedColumnWidth: 40,
                    valueField: "new"
                },
                {
                    balloonText: "[[title]]:[[minus_wthdr]]",
                    fillAlphas: 1,
                    id: "AmGraph-6",
                    labelText: "[[minus_wthdr]]",
                    title: title[5],
                    type: "column",
                    fixedColumnWidth: 40,
                    valueField: "wthdr"
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
                titleRotation: 0,
                totalText: "[[tot]]"
            }
            ],
            allLabels: [],
            balloon: {},
            dataProvider: data
        })
    },
    openCloseMakeChart2(val, index) {
        let divName = "chartdiv" + index;
        let data = val
        
        AmCharts.makeChart(divName, {
            type: "serial",
            startEffect: "easeOutSine",
            categoryField: "category",
            columnSpacing: 0,
            columnWidth: 0.4,
            startDuration: 0.7,
            fontSize: 15,
            categoryAxis: {
                axisColor: "#AAB3B3",
                gridAlpha: 0,
                axisThickness: 0,
                gridThickness: 0
            },
            trendLines: [],
            graphs: [
                {
                    colorField: "color",
                    fillAlphas: 1,
                    fixedColumnWidth: 20,
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
            allLabels: [],
            balloon: {},
            dataProvider: data
        });
    },
    openCloseMakeChart3(val, index) {
        let divName = "chartdiv" + index;
        let data = val
        
        AmCharts.makeChart(divName, {
            type: "serial",
            startEffect: "easeOutSine",
            categoryField: "category",
            columnSpacing: 0,
            columnWidth: 0.4,
            startDuration: 0.7,
            fontSize: 15,
            categoryAxis: {
                axisColor: "#AAB3B3",
                gridAlpha: 0,
                axisThickness: 0,
                gridThickness: 0
            },
            trendLines: [],
            graphs: [
                {
                    balloonText: "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                    colorField: "color",
                    fillAlphas: 1,
                    // fixedColumnWidth: 20,
                    id: "AmGraph-1",
                    labelText: "[[value]]",
                    labelPosition: "top",
                    lineColorField: "color",
                    title: "graph 1",
                    type: "column",
                    valueField: "lastdata",
                    showAllValueLabels: true
                },
                {
                    balloonText: "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span><br><span>전년대비:<b>[[text]]([[result]])</b></span>",
                    colorField: "color",
                    fillAlphas: 1,
                    // fixedColumnWidth: 20,
                    id: "AmGraph-2",
                    labelText: "[[value]]",
                    labelPosition: "top",
                    lineColorField: "color",
                    title: "graph 2",
                    type: "column",
                    valueField: "cudata",
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
            allLabels: [],
            balloon: {},
            dataProvider: data
        });
    },
    openSalesStatusPopup() {
      this.monthSalesPopupData = {
          selectSucd: this.selectSucd, 
          year: this.year, 
          month: this.month
      }
      this.isStoreMonthSalesStatusPopup = true
      $('#scroll').scrollTop(0)
    },
    closePopup() {
      this.isStoreMonthSalesStatusPopup = false
    },
    toMain() {
      this.$router.replace("/")
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

