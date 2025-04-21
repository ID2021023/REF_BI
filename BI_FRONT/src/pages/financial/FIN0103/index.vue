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
            <span>일목표 대비 매출실적</span>
            <small class="txt_date">
              <span v-show="headerDate == today" class="chip chip_m">
                <span class="chip_text">TODAY</span>
              </span>
              <strong :class="{point_col1: headerDate == today}">{{headerDate}}</strong>
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
      <div class="container" style="overflow-y: hidden;">
        <div class="content">
          <small>단위: 천원</small>
          <div class="tbl_sheet sheet_scroll tbl_right sheet_scroll_sty01" v-bind:style="{width:MCODE=='A'?'2650px':MCODE=='3'?'100%':'fit-content'}" id="table_1">
            <div class="thead_wrap" style="height:auto;">
              <table class="tbl">
                <colgroup>
                  <col style="width:90px;">
                  <col style="width:100px;">
                  <col style="width:100px;">
                  <col style="width:60px;">
                  <col style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:60px;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">{{ thisMonth }} 월</th>
                    <th scope="col" colspan="4">전체</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '1')" colspan="4">MI</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '4')" colspan="4">IT</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')" colspan="4">SO(합계)</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')" colspan="4">SO(정상)</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')" colspan="4">SO(동영)</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '12')" colspan="4">MO</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '21')" colspan="4">FO</th>
                    <!-- <th scope="col" v-for="(data,index) in proDates" :key="index">{{ data }}</th> -->
                  </tr>
                  <tr>
                    <th scope="col">월목표</th>
                    <th scope="col" colspan="4">{{ totalGoal.TOTAMT | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '1')" colspan="4">{{ totalGoal.MIAMT  | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '4')" colspan="4">{{ totalGoal.ITAMT  | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')" colspan="4">{{ totalGoal.TSOAMT | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')" colspan="4">{{ totalGoal.SOAMT  | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')" colspan="4">{{ totalGoal.SOAMT1 | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '12')" colspan="4">{{ totalGoal.MOAMT | currency }} 천원</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '21')" colspan="4">{{ totalGoal.FOAMT | currency }} 천원</th>
                    <!-- <th scope="col" v-for="(data,index) in proDates" :key="index">{{ data }}</th> -->
                  </tr>
                  <tr>
                    <th scope="col">일자 | 요일</th>
                    <th scope="col">일-목표</th>
                    <th scope="col">일-실적</th>
                    <th scope="col">달성율</th>
                    <th scope="col">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '1')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '1')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '1')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '1')">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '4')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '4')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '4')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '4')">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '3')">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '12')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '12')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '12')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '12')">진도율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '21')">일-목표</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '21')">일-실적</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '21')">달성율</th>
                    <th scope="col" v-if="(MCODE == 'A' || MCODE == '21')">진도율</th>
                    <!-- <th scope="col" v-for="(data,index) in proDates" :key="index">{{ data }}</th> -->
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tbody_wrap" v-bind:style="{width:MCODE=='A'?'2670px':MCODE=='3'?'100%':'fit-content', height:'600px'}" style="height:600px;">
              <table class="tbl">
                <colgroup>
                  <col style="width:90px;">
                  <col style="width:100px;">
                  <col style="width:100px;">
                  <col style="width:60px;">
                  <col style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:60px;">
                </colgroup>
                <tbody>
                  <tr v-for="(data, index) in dr_LIST" :key="index">
                    <td scope="row" class="tc" @click="showStoreList(data.DAY)" v-bind:style="{'color': data.COLOR}">
                      <label>{{ data.DAY }} | {{thisDay(thisYear, thisMonth, data.DAY)}}</label>
                    </td>
                    <td class="tc" v-bind:style="{'color': data.COLOR}">{{ Math.round(data.TOTTARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-bind:style="{'color': data.COLOR}">{{ Math.round(data.TOTSAMT/1000) | currency }}</td>
                    <td class="tc" v-bind:style="{'color': data.COLOR}">{{ ((data.TOTSAMT/1000)/(data.TOTTARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-bind:style="{'color': data.COLOR}">{{ ((data.CUMTOTAMT/1000)/totalGoal.TOTAMT*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '1')" v-bind:style="{'background-color':MCODE=='1'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.MITARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '1')" v-bind:style="{'background-color':MCODE=='1'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.MISAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '1')" v-bind:style="{'background-color':MCODE=='1'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.MISAMT/1000)/(data.MITARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '1')" v-bind:style="{'background-color':MCODE=='1'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMMIAMT/1000)/totalGoal.MIAMT*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '4')" v-bind:style="{'background-color':MCODE=='4'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.ITTARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '4')" v-bind:style="{'background-color':MCODE=='4'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.ITSAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '4')" v-bind:style="{'background-color':MCODE=='4'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.ITSAMT/1000)/(data.ITTARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '4')" v-bind:style="{'background-color':MCODE=='4'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMITAMT/1000)/totalGoal.ITAMT*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.TSOTARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.TSOSAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.TSOSAMT/1000)/(data.TSOTARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMTSOAMT/1000)/totalGoal.TSOAMT*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.SOTARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.SOSAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.SOSAMT/1000)/(data.SOTARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMSOAMT/1000)/totalGoal.SOAMT*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.SOTARGETAMT1/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.SOSAMT1/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.SOSAMT1/1000)/(data.SOTARGETAMT1/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '3')" v-bind:style="{'background-color':MCODE=='3'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMSOAMT1/1000)/totalGoal.SOAMT1*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '12')" v-bind:style="{'background-color':MCODE=='12'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.MOTARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '12')" v-bind:style="{'background-color':MCODE=='12'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.MOSAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '12')" v-bind:style="{'background-color':MCODE=='12'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.MOSAMT/1000)/(data.MOTARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '12')" v-bind:style="{'background-color':MCODE=='12'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMMOAMT/1000)/totalGoal.MOAMT*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '21')" v-bind:style="{'background-color':MCODE=='21'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.FOTARGETAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '21')" v-bind:style="{'background-color':MCODE=='21'?'#F3F6F0':'', 'color': data.COLOR}">{{ Math.round(data.FOSAMT/1000) | currency }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '21')" v-bind:style="{'background-color':MCODE=='21'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.FOSAMT/1000)/(data.FOTARGETAMT/1000)*100).toFixed(1) }}</td>
                    <td class="tc" v-if="(MCODE == 'A' || MCODE == '21')" v-bind:style="{'background-color':MCODE=='21'?'#F3F6F0':'', 'color': data.COLOR}">{{ ((data.CUMFOAMT/1000)/totalGoal.FOAMT*100).toFixed(1) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tfoot_wrap">
              <table class="tbl">
                <colgroup>
                  <col style="width:90px;">
                  <col style="width:100px;">
                  <col style="width:100px;">
                  <col style="width:60px;">
                  <col style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '1')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '4')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '3')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '12')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:100px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:60px;">
                  <col v-if="(MCODE == 'A' || MCODE == '21')" style="width:60px;">
                </colgroup>
                <tfoot>
                  <tr class="tbl_total">
                    <th scope="col"><strong>합계</strong></th>
                    <td><strong>{{ totalGoal.TOTAMT | currency}}</strong></td>
                    <td><strong>{{ Math.round(totalData.TOTSAMT/1000) | currency}}</strong></td>
                    <td><small class="point_col1">{{((totalData.TOTSAMT/1000)/(totalData.TOTTARGETAMT/1000)*100).toFixed(1) | nanToDot}}</small></td>
                    <td><small class="point_col1">{{((totalData.TOTSAMT/1000)/totalGoal.TOTAMT*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '1')"><strong>{{ totalGoal.MIAMT| currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '1')"><strong>{{ Math.round(totalData.MISAMT/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '1')"><small class="point_col1">{{((totalData.MISAMT/1000)/(totalData.MITARGETAMT/1000)*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '1')"><small class="point_col1">{{((totalData.MISAMT/1000)/totalGoal.MIAMT*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '4')"><strong>{{ totalGoal.ITAMT | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '4')"><strong>{{ Math.round(totalData.ITSAMT/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '4')"><small class="point_col1">{{((totalData.ITSAMT/1000)/(totalData.ITTARGETAMT/1000)*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '4')"><small class="point_col1">{{((totalData.ITSAMT/1000)/totalGoal.ITAMT*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><strong>{{ totalGoal.TSOAMT | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><strong>{{ Math.round(totalData.TSOSAMT/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><small class="point_col1">{{((totalData.TSOSAMT/1000)/(totalData.TSOTARGETAMT/1000)*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><small class="point_col1">{{((totalData.TSOSAMT/1000)/totalGoal.TSOAMT*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><strong>{{ totalGoal.SOAMT | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><strong>{{ Math.round(totalData.SOSAMT/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><small class="point_col1">{{((totalData.SOSAMT/1000)/(totalData.SOTARGETAMT/1000)*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><small class="point_col1">{{((totalData.SOSAMT/1000)/totalGoal.SOAMT*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><strong>{{ totalGoal.SOAMT1 | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><strong>{{ Math.round(totalData.SOSAMT1/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><small class="point_col1">{{((totalData.SOSAMT1/1000)/(totalData.SOTARGETAMT1/1000)*100).toFixed(1)  | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '3')"><small class="point_col1">{{((totalData.SOSAMT1/1000)/totalGoal.SOAMT1*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '12')"><strong>{{ totalGoal.MOAMT | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '12')"><strong>{{ Math.round(totalData.MOSAMT/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '12')"><small class="point_col1">{{((totalData.MOSAMT/1000)/(totalData.MOTARGETAMT/1000)*100).toFixed(1)  | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '12')"><small class="point_col1">{{((totalData.MOSAMT/1000)/totalGoal.MOAMT*100).toFixed(1) | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '21')"><strong>{{ totalGoal.FOAMT | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '21')"><strong>{{ Math.round(totalData.FOSAMT/1000) | currency}}</strong></td>
                    <td v-if="(MCODE == 'A' || MCODE == '21')"><small class="point_col1">{{((totalData.FOSAMT/1000)/(totalData.FOTARGETAMT/1000)*100).toFixed(1)  | nanToDot}}</small></td>
                    <td v-if="(MCODE == 'A' || MCODE == '21')"><small class="point_col1">{{((totalData.FOSAMT/1000)/totalGoal.FOAMT*100).toFixed(1) | nanToDot}}</small></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <store-list-popup
          v-if="isStoreListVisible"
          @close="closeStoreList"
          :dr_H="dr_H"
          :dr_L="dr_L"
          :orderType="'desc'"
          :currentDate="pop_select_date"
          :select_p_choice="1"
        />
    </div>
  </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"

import storeListPopup from '@/pages/financial/FIN0102'

export default {
  name: "FIN0103",
  components: {
    datePick,
    storeListPopup,
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
    selectedCODE: {
      type: String,
      default: null
    },
    currentDate: {
      type: String,
      default: moment().format("YYYY-MM-DD")
    }
  },
  created() {
    this.selectDate = moment(this.currentDate).format("YYYY-MM-DD");
    let cuerrentYear = Number(moment(this.currentDate).format("YYYY"));
    let cuerrentMonth = Number(moment(this.currentDate).format("MM"));
    this.MCODE = this.selectedCODE

    this.getMakeDataDate()
    this.getMonthGoal()
    this.getPerformanceList()
  },
  computed: {
    req2svr: () => req2svr,
    headerDate() {
      return moment(this.selectDate).format("YYYY.MM.DD (ddd)");
    },
    today() {
      return moment().format("YYYY.MM.DD (ddd)");
    },
    thisYear() {
      return moment(this.selectDate).format("YYYY");
    },
    thisMonth() {
      return moment(this.selectDate).format("MM");
    },
    totalData() {
      return {
        TOTTARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.TOTSAMT!="0"?Number(o.TOTTARGETAMT):0; }),
        TOTSAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.TOTSAMT); }),
        MITARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.MISAMT!="0"?Number(o.MITARGETAMT):0; }),
        MISAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.MISAMT); }),
        ITTARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.ITSAMT!="0"?Number(o.ITTARGETAMT):0; }),
        ITSAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.ITSAMT); }),
        TSOTARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.TSOSAMT!="0"?Number(o.TSOTARGETAMT):0; }),
        TSOSAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.TSOSAMT); }),
        SOTARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.SOSAMT!="0"?Number(o.SOTARGETAMT):0; }),
        SOSAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.SOSAMT); }),
        SOTARGETAMT1: _.sumBy(this.dr_LIST, function(o) { return o.SOSAMT1!="0"?Number(o.SOTARGETAMT1):0; }),
        SOSAMT1: _.sumBy(this.dr_LIST, function(o) { return Number(o.SOSAMT1); }),
        MOTARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.MOSAMT!="0"?Number(o.MOTARGETAMT):0; }),
        MOSAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.MOSAMT); }),
        FOTARGETAMT: _.sumBy(this.dr_LIST, function(o) { return o.FOSAMT!="0"?Number(o.FOTARGETAMT):0 }),
        FOSAMT: _.sumBy(this.dr_LIST, function(o) { return Number(o.FOSAMT); }),
      }
    },
    totalGoal() {
      return {
        TOTAMT: this.dr_TOT.TOTAMT/1000,
        MIAMT: this.dr_TOT.MIAMT/1000,
        ITAMT: this.dr_TOT.ITAMT/1000,
        TSOAMT: this.dr_TOT.TSOAMT/1000,
        SOAMT: this.dr_TOT.SOAMT/1000,
        SOAMT1: this.dr_TOT.SOAMT1/1000,
        MOAMT: this.dr_TOT.MOAMT/1000,
        FOAMT: this.dr_TOT.FOAMT/1000,
        INAMT: this.dr_TOT.INAMT/1000
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
      makeDataDate: null,
      MCODE: '',
      dr_LIST: [],
      dr_TOT: {},
      isStoreListVisible: false,
      pop_select_date: null,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    thisDay(year, mon, date) {
      return moment(year+mon+date, 'YYYYMMDD').format("ddd")
    },
    changeDate() {
      this.getMonthGoal()
      this.getPerformanceList()
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
    getMonthGoal() {
      this.req2svr.getMonthGoal(moment(this.selectDate).format("YYYYMM")).then(
        res => {
          this.dr_TOT = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_TOT = res;
            } else {
              this.dr_TOT = JSON.parse("[" + res + "]");
            }
            console.log("dr_TOT >>> ", this.dr_TOT)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getPerformanceList() {
      this.req2svr.getPerformanceList(this.tabType, this.MCODE, moment(this.selectDate).format("YYYYMMDD")).then(
        res => {
          this.dr_LIST = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.dr_LIST.push(res);
            } else {
              this.dr_LIST = JSON.parse("[" + res + "]");
              let PRE_TOTTARGET = 0, PRE_TOTAMT = 0
              //ARATE 달성율 PRATE 진도율 CUMTARGETAMT CUMAMT 누적
              for(var i in this.dr_LIST) {
                if(i == 0) {
                  this.dr_LIST[i]["CUMTOTTARGETAMT"] = Number(this.dr_LIST[0]["TOTTARGETAMT"]);
                  this.dr_LIST[i]["CUMTOTAMT"] = Number(this.dr_LIST[0]["TOTSAMT"]);
                } else {
                  this.dr_LIST[i]["CUMTOTTARGETAMT"] = Number(this.dr_LIST[i-1]["CUMTOTTARGETAMT"]) + Number(this.dr_LIST[i]["TOTTARGETAMT"])
                  this.dr_LIST[i]["CUMTOTAMT"] = Number(this.dr_LIST[i-1]["CUMTOTAMT"]) + Number(this.dr_LIST[i]["TOTSAMT"])
                }
                if(this.MCODE == "A" || this.MCODE == "1") {
                  if(i == 0) {
                    this.dr_LIST[i]["CUMMITARGETAMT"] = Number(this.dr_LIST[0]["MITARGETAMT"]);
                    this.dr_LIST[i]["CUMMIAMT"] = Number(this.dr_LIST[0]["MISAMT"]);
                  } else {
                    this.dr_LIST[i]["CUMMITARGETAMT"] = Number(this.dr_LIST[i-1]["CUMMITARGETAMT"]) + Number(this.dr_LIST[i]["MITARGETAMT"])
                    this.dr_LIST[i]["CUMMIAMT"] = Number(this.dr_LIST[i-1]["CUMMIAMT"]) + Number(this.dr_LIST[i]["MISAMT"])
                  }
                }
                if(this.MCODE == "A" || this.MCODE == "4") {
                  if(i == 0) {
                    this.dr_LIST[i]["CUMITTARGETAMT"] = Number(this.dr_LIST[0]["ITTARGETAMT"]);
                    this.dr_LIST[i]["CUMITAMT"] = Number(this.dr_LIST[0]["ITSAMT"]);
                  } else {
                    this.dr_LIST[i]["CUMITTARGETAMT"] = Number(this.dr_LIST[i-1]["CUMITTARGETAMT"]) + Number(this.dr_LIST[i]["ITTARGETAMT"])
                    this.dr_LIST[i]["CUMITAMT"] = Number(this.dr_LIST[i-1]["CUMITAMT"]) + Number(this.dr_LIST[i]["ITSAMT"])
                  }
                }
                if(this.MCODE == "A" || this.MCODE == "3") {
                  if(i == 0) {
                    this.dr_LIST[i]["CUMTSOTARGETAMT"] = Number(this.dr_LIST[0]["TSOTARGETAMT"]);
                    this.dr_LIST[i]["CUMTSOAMT"] = Number(this.dr_LIST[0]["TSOSAMT"]);
                    this.dr_LIST[i]["CUMSOTARGETAMT"] = Number(this.dr_LIST[0]["SOTARGETAMT"]);
                    this.dr_LIST[i]["CUMSOAMT"] = Number(this.dr_LIST[0]["SOSAMT"]);
                    this.dr_LIST[i]["CUMSOTARGETAMT1"] = Number(this.dr_LIST[0]["SOTARGETAMT1"]);
                    this.dr_LIST[i]["CUMSOAMT1"] = Number(this.dr_LIST[0]["SOSAMT1"]);
                  } else {
                    this.dr_LIST[i]["CUMTSOTARGETAMT"] = Number(this.dr_LIST[i-1]["CUMTSOTARGETAMT"]) + Number(this.dr_LIST[i]["TSOTARGETAMT"])
                    this.dr_LIST[i]["CUMTSOAMT"] = Number(this.dr_LIST[i-1]["CUMTSOAMT"]) + Number(this.dr_LIST[i]["TSOSAMT"])
                    this.dr_LIST[i]["CUMSOTARGETAMT"] = Number(this.dr_LIST[i-1]["CUMSOTARGETAMT"]) + Number(this.dr_LIST[i]["SOTARGETAMT"])
                    this.dr_LIST[i]["CUMSOAMT"] = Number(this.dr_LIST[i-1]["CUMSOAMT"]) + Number(this.dr_LIST[i]["SOSAMT"])
                    this.dr_LIST[i]["CUMSOTARGETAMT1"] = Number(this.dr_LIST[i-1]["CUMSOTARGETAMT1"]) + Number(this.dr_LIST[i]["SOTARGETAMT1"])
                    this.dr_LIST[i]["CUMSOAMT1"] = Number(this.dr_LIST[i-1]["CUMSOAMT1"]) + Number(this.dr_LIST[i]["SOSAMT1"])
                  }
                }
                if(this.MCODE == "A" || this.MCODE == "12") {
                  if(i == 0) {
                    this.dr_LIST[i]["CUMMOTARGETAMT"] = Number(this.dr_LIST[0]["MOTARGETAMT"]);
                    this.dr_LIST[i]["CUMMOAMT"] = Number(this.dr_LIST[0]["MOSAMT"]);
                  } else {
                    this.dr_LIST[i]["CUMMOTARGETAMT"] = Number(this.dr_LIST[i-1]["CUMMOTARGETAMT"]) + Number(this.dr_LIST[i]["MOTARGETAMT"])
                    this.dr_LIST[i]["CUMMOAMT"] = Number(this.dr_LIST[i-1]["CUMMOAMT"]) + Number(this.dr_LIST[i]["MOSAMT"])
                  }
                }
                if(this.MCODE == "A" || this.MCODE == "21") {
                  if(i == 0) {
                    this.dr_LIST[i]["CUMFOTARGETAMT"] = Number(this.dr_LIST[0]["FOTARGETAMT"]);
                    this.dr_LIST[i]["CUMFOAMT"] = Number(this.dr_LIST[0]["FOSAMT"]);
                  } else {
                    this.dr_LIST[i]["CUMFOTARGETAMT"] = Number(this.dr_LIST[i-1]["CUMFOTARGETAMT"]) + Number(this.dr_LIST[i]["FOTARGETAMT"])
                    this.dr_LIST[i]["CUMFOAMT"] = Number(this.dr_LIST[i-1]["CUMFOAMT"]) + Number(this.dr_LIST[i]["FOSAMT"])
                  }
                }

                this.dr_LIST[i]["SALEDT"] = moment(this.selectDate).format("YYYYMM") + this.dr_LIST[i].DAY
                if(moment(this.dr_LIST[i]["SALEDT"]).format("d") == "6") {
                  this.dr_LIST[i]["COLOR"] = "#0779E4"
                } else if(moment(this.dr_LIST[i]["SALEDT"]).format("d") == "0") {
                  this.dr_LIST[i]["COLOR"] = "#EB3737"
                } else {
                  this.dr_LIST[i]["COLOR"] = "#000000"
                }
              }
              console.log("dr_LIST >>> ", this.dr_LIST)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    showStoreList(day) {
      let date = this.thisYear + "-" + this.thisMonth + "-" + day;
      this.pop_select_date = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
      console.log("pop_select_date >>>", this.pop_select_date)
      this.isStoreListVisible = true;
    },
    closeStoreList() {
      this.isStoreListVisible = false;
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
};
</script>