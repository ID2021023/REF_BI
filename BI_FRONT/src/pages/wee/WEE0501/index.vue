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
        <h2 class="layout_title">통합 영업본부 주간회의
          <small class="txt_date">
            <strong class="point_col1"></strong>
          </small>
        </h2>
        <div class="layout_spacer"></div>
        <div class="groups">
          <div class="select_box" style="min-width:50px; margin-right:10px;">
            <select class="select" v-model="seasonYear">
              <option v-for="(data, index) in yearList" :key="index" :value="data.CODE">{{ data.CODENM }}</option>
            </select>
          </div>
          <div class="select_box" style="min-width:50px; margin-right:10px;">
            <select class="select" v-model="month" @change="getWeek(year, month)">
              <option v-for="(data, index) in monthList" :key="index" :value="data.CODE">{{ data.CODENM }}</option>
            </select>
          </div>
          <div class="select_box" style="min-width:50px; margin-right:10px;">
            <select class="select" v-model="week" @change="getThisWeek(week)">
              <option v-for="(data, index) in weekList" :key="index" :value="data.weekend">{{ data.weekendStr }}</option>
            </select>
          </div>
          <button type="button" class="btn_n" style="height:55px;margin-left:10px;" @click="changeDate()">조회</button>
        </div>
      </div>
    </header>
    <!-- box2 -->
    <div class="cont_box" style="margin-bottom: 10px;">
      <div class="tit">
        <div class="tab">
          <ul>
            <li :class="{'on': gubun == 1}">
              <a href="javascript:void(0);" @click="tabVal(1, 'exceldown_tbody')">브랜드별 매출실적</a>
            </li>
            <li :class="{'on': gubun == 2}">
              <a href="javascript:void(0);" @click="tabVal(2, 'progress_tbody')">브랜드별 주요사항</a>
            </li>
            <li :class="{'on': gubun == 3}">
              <a href="javascript:void(0);" @click="tabVal(3, 'store_sale_tbody')">담당별 매장실적 달성율</a>
            </li>
            <li :class="{'on': gubun == 4}" style="display: none;">
              <a href="javascript:void(0);" @click="tabVal(4, 'business_edi_tbody')">동업계 RANK</a>
            </li>
          </ul>
        </div>
        <div class="layout_spacer"></div>
        <button type="button" class="btn_n mr10" @click="excelDownLoad(tableNm)" >다운로드</button>
        <div>
          <span class="txt" style="height: 30px; line-height: 40px;">&lt; {{ standardStartDate }} ~ {{ standardEndDate }}	&gt;</span>
          <span class="txt" v-if="gubun == 1">&#91;단위 : 백만원&#93;</span>
          <span class="txt" v-else-if="gubun == 3">&#91;단위 : 천원&#93;</span>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <div class="toggle_group" v-if="gubun == 3||gubun == 4">
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
          <!-- 테이블 -->
          <iframe id="txtArea1" style="display:none;" />
          <div class="tbl_sheet yellow np" v-show="gubun == 1">
            <table id="exceldown_tbody" class="tbl tbl_center tbl_scroll_horizontally">
              <colgroup>
                <col style="width: 8%" />
                <col style="width: 5%" />
                <col style="width: 9%" />
                <col style="width: 9%" />
                <col style="width: 9%" />
                <col style="width: 9%" />
                <col style="width: 5%" />
                <col style="width: 9%" />
                <col style="width: 9%" />
                <col style="width: 9%" />
                <col style="width: 5%" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" rowspan="2">브랜드</th>
                  <th scope="col" rowspan="2">유형</th>
                  <th scope="col" rowspan="2">{{month}}월목표</th>
                  <th scope="col" colspan="4">주간실적({{month}}.{{Number(standardStartDate.substr(8))}}~{{Number(standardEndDate.substr(8))}})</th>
                  <th scope="col" colspan="4">월누계실적({{month}}.1~{{Number(standardEndDate.substr(8))}})</th>
                  <th scope="col" colspan="2">신장율</th>
                  <th scope="col" rowspan="2">차주목표({{Number(nextStartDate.substr(4, 2))}}.{{Number(nextStartDate.substr(6))}}~{{Number(nextEndDate.substr(6))}})</th>
                </tr>
                <tr>
                  <th class="tc">전년</th>
                  <th class="tc">목표</th>
                  <th class="tc">실적</th>
                  <th class="tc">달성율</th>
                  <th class="tc">전년</th>
                  <th class="tc">목표</th>
                  <th class="tc">실적</th>
                  <th class="tc">달성율</th>
                  <th class="tc">주간</th>
                  <th class="tc">월누계</th>
                </tr>
              </thead>

              <tbody id="sales_status" class="tbody_s">
                <tr v-for="(data , index) in dr_S" :key="index">
                  <td class="tc" name="BRCD" rowspan="3" v-if="(data.BRCD!='SO')&&(data.BRCD!='TOTAL')&&data.SALEGU=='1'" style="font-weight:bold;">{{ data.BRCD }}</td>
                  <td class="tc" name="BRCD" rowspan="4" v-else-if="(data.BRCD=='SO')&&data.SALEGU=='1'" style="font-weight:bold;">{{ data.BRCD }}</td>
                  <td class="tc" name="BRCD" rowspan="4" v-else-if="(data.BRCD=='TOTAL')&&data.SALEGU=='1'" style="font-weight:bold;">{{ data.BRCD }}</td>
                  <td class="tc" name="SALEGU2"      v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">{{ data.SALEGU2 }}</td>
                  <td class="tr" name="MONPLNAMT"    v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.MONPLNAMT!=0&&data.MONPLNAMT!=''">{{ data.MONPLNAMT | currency }}</span>
                  </td>
                  <td class="tr" name="PREWEEKAMT"   v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.PREWEEKAMT!=0&&data.PREWEEKAMT!=''">{{ data.PREWEEKAMT | currency }}</span>
                  </td>
                  <td class="tr" name="WEEKPLNAMT"   v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.WEEKPLNAMT!=0&&data.WEEKPLNAMT!=''">{{ data.WEEKPLNAMT | currency }}</span>
                  </td>
                  <td class="tr" name="WEEKAMT"      v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.WEEKAMT!=0&&data.WEEKAMT!=''">{{ data.WEEKAMT | currency }}</span>
                  </td>
                  <td class="tr" name="WEEKRATE"
                      v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':'', 'background-color':data.SALEGU=='0'?'black':'', 'color':data.SALEGU=='0'?'white':''}"
                      >
                      <span>{{ data.WEEKRATE }}</span><span v-if="data.SALEGU=='0'">%</span>
                    </td>
                  <td class="tr" name="PREMONAMT"    v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.PREMONAMT!=0&&data.PREMONAMT!=''">{{ data.PREMONAMT | currency }}</span>
                  </td>
                  <td class="tr" name="MONSUMPLNAMT" v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.MONSUMPLNAMT!=0&&data.MONSUMPLNAMT!=''">{{ data.MONSUMPLNAMT | currency }}</span>
                  </td>
                  <td class="tr" name="MONAMT"       v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.MONAMT!=0&&data.MONAMT!=''">{{ data.MONAMT | currency }}</span>
                  </td>
                  <td class="tr" name="MONRATE"
                      v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':'', 'background-color':data.SALEGU=='0'?'black':'', 'color':data.SALEGU=='0'?'white':''}"
                    >
                      <span>{{ data.MONRATE }}</span><span v-if="data.SALEGU=='0'">%</span>
                  </td>
                  <td class="tc" name="WEEKAVERAGE"  v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <i class="material-icons" :class="[Number(data.WEEKAVERAGE) > 0 ? 'col_danger' : 'col_primary']" v-if="Number(data.WEEKAVERAGE)!=0&&data.WEEKAVERAGE!=''">
                      {{ Number(data.WEEKAVERAGE) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                    </i>
                    <span v-if="Number(data.WEEKAVERAGE)!=0&&data.WEEKAVERAGE!=''" :class="[Number(data.WEEKAVERAGE) > 0 ? 'col_danger' : 'col_primary']">
                      {{ (Math.abs(data.WEEKAVERAGE)).toFixed(1) }}%
                    </span>
                  </td>
                  <td class="tc" name="MONAVERAGE"  v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <i class="material-icons" :class="[Number(data.MONAVERAGE) > 0 ? 'col_danger' : 'col_primary']" v-if="Number(data.MONAVERAGE)!=0&&data.MONAVERAGE!=''">
                      {{ Number(data.MONAVERAGE) > 0 ? 'arrow_drop_up' : 'arrow_drop_down' }}
                    </i>
                    <span v-if="Number(data.MONAVERAGE)!=0&&data.MONAVERAGE!=''" :class="[Number(data.MONAVERAGE) > 0 ? 'col_danger' : 'col_primary']">
                      {{ (Math.abs(data.MONAVERAGE)).toFixed(1) }}%
                    </span>
                  </td>
                  <td class="tc" name="NEXTWEEKPLNAMT" v-bind:style="{'font-weight':data.SALEGU=='0'?'bold':''}">
                    <span v-if="data.NEXTWEEKPLNAMT!=0&&data.NEXTWEEKPLNAMT!=''">{{ data.NEXTWEEKPLNAMT | currency }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tbl_sheet yellow np" v-show="gubun == 2">
            <table id="progress_tbody" class="tbl tbl_center">
              <colgroup>
                <col style="width: 20%;" />
                <col style="width: 40%;" />
                <col style="width: 40%;" />
              </colgroup>
              <thead>
                <tr>
                  <th class="tc">브랜드</th>
                  <th class="tc">{{month}}월{{week}}주차 진행사항 ({{month}}/{{Number(standardStartDate.substr(8))}}~{{month}}/{{Number(standardEndDate.substr(8))}})</th>
                  <th class="tc">{{month}}월{{Number(week)+1}}주차 계획 ({{Number(nextStartDate.substr(4, 2))}}/{{Number(nextStartDate.substr(6))}}~{{Number(nextStartDate.substr(4, 2))}}/{{Number(nextEndDate.substr(6))}})</th>
                </tr>
              </thead>

              <tbody id="sales_status" class="tbody_s">
                <tr v-for="(data , index) in dr_P" :key="index">
                  <td class="tc" name="BRCD" style="font-weight:bold;">{{ data.BRCD }}</td>
                  <td class="tl" name="PROGRESS" v-html="data.PROGRESS"></td>
                  <td class="tl" name="PLAN" v-html="data.PLAN"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tbl_sheet yellow np" v-show="gubun == 3">
            <table class="tbl tbl_center" id="store_sale_tbody" style="width: 1880px;">
              <colgroup>
                <col style="width:71px;" />
                <col style="width:92px;" />
                <col style="width:211px;" />
                <col style="width:190px;" />
                <col style="width:140px;" />
                <col style="width:140px;" />
                <col style="width:140px;" />
                <col style="width:140px;" />
                <col style="width:140px;" />
                <col style="width:140px;" />
                <col style="width:112px;" />
                <col style="width:112px;" />
                <col style="width:140px;" />
                <col style="width:112px;" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" rowspan="2">순번</th>
                  <th scope="col" rowspan="2">담당자</th>
                  <th scope="col" rowspan="2">매장명</th>
                  <th scope="col" rowspan="2">매니저</th>
                  <th scope="col" rowspan="2">매출목표</th>
                  <th scope="col" colspan="3">주간매출({{Number(standardStartDate.substr(8))}}일 ~ {{Number(standardEndDate.substr(8))}}일)</th>
                  <th scope="col" colspan="5">월누계실적(1일 ~ {{Number(standardEndDate.substr(8))}}일)</th>
                  <th scope="col" rowspan="2">M/S</th>
                </tr>
                <tr>
                  <th class="tc">매출</th>
                  <th class="tc">전년동일</th>
                  <th class="tc">신장율</th>
                  <th class="tc">누계</th>
                  <th class="tc">전년동기간</th>
                  <th class="tc">신장율</th>
                  <th class="tc">진도율</th>
                  <th class="tc">전년월마감</th>
                </tr>
              </thead>
              <tbody style="display: block; height: 570px; overflow: hidden auto; width: 1900px;" id="store_sale_tbody2">
                <tr style="height: 0px;"></tr>
                <tr v-for="(data2 , index2) in dr_THIS" :key="index2">
                  <td class="tc" name="index" style="width:71px;" >{{ index2+1 }}</td>
                  <td class="tc" name="ERPNM" v-if="rowSpan(index2)" :rowspan="rowSpanNum(data2.BRCD, data2.MEMP)" style="width:92px;">{{ data2.ERPNM }}</td>
                  <td class="tl" name="VDSNM" v-if="data2.VDCD.indexOf('ZZ') == -1" style="width:211px;" >{{ data2.VDSNM }}</td>
                  <td class="tc bg_point_col24" name="VDSNM" v-else colspan="2">TTL</td>
                  <td class="tl" name="HNAME" v-if="data2.VDCD.indexOf('ZZ') == -1" style="width:190px;" >
                    {{ data2.HNAME }}
                    <span v-if="data2.BIRTH!=''&&data2.BIRTH!=null">({{ data2.BIRTH | currency }}")</span>
                  </td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="PLNAMT" style="width:140px;" >{{ data2.PLNAMT | currency }}</td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="NOWAMT" style="width:140px;" >{{ data2.NOWAMT | currency }}</td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="LASTAMT" style="width:140px;" >{{ data2.LASTAMT | currency }}</td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="WEEKRATE" style="width:140px;" >
                    <span v-if="Number(data2.WEEKRATE)!=0">{{ Number(data2.WEEKRATE) | currency }} %</span>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MONSUMAMT" style="width:140px;" >{{ data2.MONSUMAMT | currency }}</td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="LASTMONSUMAMT" style="width:140px;" >{{ data2.LASTMONSUMAMT | currency }}</td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MONRATE" style="width:112px;" >
                    <span v-if="Number(data2.MONRATE)!=0">{{ Number(data2.MONRATE) | currency }} %</span>
                  </td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MONAVG" style="width:112px;" >
                    <span v-if="Number(data2.MONSUMAMT)!=0&&Number(data2.PLNAMT)!=0">{{ Number(data2.MONAVG) | currency }} %</span>
                    <span v-else-if="Number(data2.MONSUMAMT)==0&&Number(data2.PLNAMT)==0"></span>
                    <span v-else-if="Number(data2.MONSUMAMT)!=0&&Number(data2.PLNAMT)==0"></span>
                    <span v-else-if="Number(data2.MONSUMAMT)==0&&Number(data2.PLNAMT)!=0">0 %</span>
                  </td>
                  <td class="tr" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="ENDMONAMT" style="width:140px;" >{{ data2.ENDMONAMT | currency }}</td>
                  <td class="tc" :class="data2.VDCD.indexOf('ZZ') > -1?'bg_point_col24':''" name="MS" style="width:112px;" >{{ data2.MS }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="tbl_total" style="border-top: 1px solid #ced4da;" v-for="(totalData , index3) in getTotData(selectedSUNM)" :key="index3">
                  <th scope="col" colspan="4"><strong>합계</strong></th>
                  <td class="tr"><strong>{{ totalData.PLNAMT | currency}}</strong></td>
                  <td class="tr bg_point_col25"><strong>{{ totalData.NOWAMT | currency}}</strong></td>
                  <td class="tr"><strong>{{ totalData.LASTAMT | currency}}</strong></td>
                  <td class="tr">
                    <strong v-if="Number(totalData.WEEKRATE)!=0">{{ totalData.WEEKRATE | currency}} %</strong>
                  </td>
                  <td class="tr bg_point_col25"><strong>{{ totalData.MONSUMAMT | currency}}</strong></td>
                  <td class="tr"><strong>{{ totalData.LASTMONSUMAMT | currency}}</strong></td>
                  <td class="tr">
                    <strong v-if="Number(totalData.MONRATE)!=0">{{ totalData.MONRATE | currency}} %</strong>
                  </td>
                  <td class="tr">
                    <strong v-if="Number(totalData.MONSUMAMT)!=0&&Number(totalData.PLNAMT)!=0">{{ totalData.MONAVG | currency }} %</strong>
                    <strong v-else-if="Number(totalData.MONSUMAMT)==0&&Number(totalData.PLNAMT)==0"></strong>
                    <strong v-else-if="Number(totalData.MONSUMAMT)!=0&&Number(totalData.PLNAMT)==0"></strong>
                    <strong v-else-if="Number(totalData.MONSUMAMT)==0&&Number(totalData.PLNAMT)!=0">0 %</strong>
                  </td>
                  <td class="tr"><strong>{{ totalData.ENDMONAMT | currency}}</strong></td>
                  <td class="tr"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="tbl_sheet yellow np" v-show="gubun == 4">
            <table class="tbl tbl_center" id="business_edi_tbody" style="width: 1880px;">
              <colgroup>
                <col style="width:120px;" />
                <template v-for="(item, index) in brdkeyList">
                  <col :key="index" style="width:108px;"/>
                </template>
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" >구분</th>
                  <template v-for="(item, index) in brdkeyList">
                    <th scope="col" :key="index" >{{item}}</th>
                  </template>
                </tr>
              </thead>
              <tbody style="display: block; height: 650px; overflow: hidden auto; width: 1900px;" id="business_edi_tbody2">
                <template v-for="n in Object.keys(ediRankData).length*(colList.length+1)">
                  <tr :key="n" v-if="n%(colList.length+1)==1">
                    <th class="tl" :colspan="brdkeyList.length+1" style="width:1900px;" >{{Object.keys(ediRankData)[Math.round(n/(colList.length+1))].split("_")[1]}} 매출</th>
                  </tr>
                  <tr :key="n" v-else>
                    <td class="tl" style="width:120px;" v-if="n%(colList.length+1)!=0" >{{colList[(n%(colList.length+1))-2].KR}}</td>
                    <td class="tl" style="width:120px;" v-else >{{colList[colList.length-1].KR}}</td>
                    <template v-for="(d, i) in brdkeyList">
                      <td :key="i" class="tr" style="width:108px;" v-if="n%(colList.length+1)==0" >{{getEdiColunmData(n/(colList.length+1)-1, d, colList[colList.length-1].EN) | currency}}</td>
                      <td :key="i" class="tr" style="width:108px;" v-else >{{getEdiColunmData(parseInt(n/(colList.length+1)), d, colList[(n-2)-(parseInt(n/(colList.length+1))*(colList.length+1))].EN) | currency}}</td>
                    </template>
                  </tr>
                </template>
              </tbody>
              <tfoot><tr></tr></tfoot>
            </table>
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
  name: "WEE0501",
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
  data() {
    return {
      year: "",
      month: "",
      week: "",
      yearList: [],
      monthList: [],
      weeklyTab:0,
      standardStartDate: null,
      standardEndDate: null,
      nextStartDate: null,
      nextEndDate: null,
      calDefaultDate: "",
      drawer: null,
      // 브랜드별 매출 실적
      dr_S: [],
      TOT_dr_S: [],
      weekList: [],
      dr_P: [],
      dr_C: [],
      dr_SC: [],
      seasonYear: null,
      thisWeeks: null,
      brandList: null,
      ediRankData: {},
      gubun: 1,
      tableNm: 'exceldown_tbody',
      dr_THIS: null,
      selectedSUCD: null,
      selectedSUNM: null,
      brdkeyList: [],
      colList: [
        {EN: "NML_SUM", KR: "정상"},
        {EN: "EVT_SUM", KR: "행사"},
        {EN: "SALE_TOT", KR: "합계"},
        {EN: "LAST_SALE_TOT", KR: "전년대비"},
        {EN: "GROWTH_RATE", KR: "신장율"},
        {EN: "TOT_STR_CNT", KR: "매장수(금년)"},
        {EN: "TOT_STORE_AVG", KR: "점평균(합계)"},
        {EN: "NML_RANK", KR: "매출순위(정상)"},
        {EN: "TOT_RANK", KR: "매출순위(합계)"},
      ]
    }
  },
  created() {
    this.brandList = ["MI", "MO", "FO", "IT", "SO"];
    // const today = moment('2020-08-31').format('YYYY-MM-DD')
    let defaultStartDate = moment().format('YYYY-MM') + "-01";
    this.calDefaultDate = moment().day('Sunday').format('YYYY-MM-DD')
    this.standardStartDate = moment(this.calDefaultDate).subtract(6, 'days').format('YYYY-MM-DD')
    if(moment(this.standardStartDate, 'YYYY-MM-DD').format('MM') != moment().format('MM') 
      && moment().format('YYYYMMDD') <= moment(this.standardStartDate).day('Sunday').add(14, 'days').format('YYYYMMDD')) {
      this.standardStartDate = defaultStartDate
    }
    let lastLastDay = moment().subtract(1,'months').endOf('month').day('Sunday').format('YYYYMMDD')
    console.log(this.stringCodeAt(lastLastDay))
    console.log(this.stringCodeAt(moment().format('YYYYMMDD')))
    console.log(this.stringCodeAt(moment(lastLastDay).add(7, 'days').format('YYYYMMDD')))
    if(lastLastDay < moment().format('YYYYMMDD') && moment().format('YYYYMMDD') <= moment(lastLastDay).add(7, 'days').format('YYYYMMDD')) {
      this.standardStartDate = moment(this.calDefaultDate).subtract(6, 'days').format('YYYY-MM-DD')
    }

    this.standardEndDate = this.calDefaultDate
    if((moment(this.calDefaultDate, 'YYYY-MM-DD').format('MM') != moment().format('MM') || moment(this.calDefaultDate, 'YYYY-MM-DD').format('MM') != moment(this.standardStartDate, 'YYYY-MM-DD').format('MM')) 
      && moment().format('MM') < moment(this.calDefaultDate).day('Sunday').add(7, 'days').format('MM')) {
      this.standardEndDate = moment(this.standardStartDate).endOf('month').format('YYYY-MM-DD');
    }
    if(moment().format('YYYYMMDD') == moment(this.calDefaultDate).format('YYYYMMDD')) {
      this.standardStartDate = moment().subtract(13, 'days').format('YYYY-MM-DD')
      this.standardEndDate = moment(this.standardStartDate).add(6, 'days').format('YYYY-MM-DD')
    }
    this.year = moment(this.standardStartDate).format("YYYY");
    this.month = moment(this.standardStartDate).format("M");

    console.log("calDefaultDate >>> ", this.calDefaultDate)
    console.log("standardStartDate >>> ", this.standardStartDate)
    console.log("standardEndDate >>> ", this.standardEndDate)

    let cuerrentYear = Number(moment().format("YYYY"));
    let code
    for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(cuerrentYear - (4 - i))
      this.yearList.push({CODE: String(code), CODENM: (cuerrentYear - (4 - i))})
    }
    this.seasonYear = this.yearList[this.yearList.length-1].CODE

    for (let i = 1; i < 13; i++) {
      this.monthList.push({CODE: String(i), CODENM: String(i)+"월"})
    }

    this.getWeek(this.year, this.month)
    let weekIndex = _.findIndex(this.weekList, {'startDay': moment(this.standardStartDate).format("YYYYMMDD"), 'endDay': moment(this.standardEndDate).format("YYYYMMDD")});
    this.thisWeeks = this.weekList[weekIndex]
    this.week = this.thisWeeks.weekend
    if(weekIndex != (this.weekList.length-1)) {
      this.nextStartDate = this.weekList[weekIndex+1].startDay;
      this.nextEndDate = this.weekList[weekIndex+1].endDay;
    } else{
      this.nextStartDate = this.year + this.twinNum(Number(this.month)+1) + "01"
      this.nextEndDate =  moment(this.nextStartDate).day('Sunday').add(7, 'days').format('YYYYMMDD')
    }

    this.selectedSUCD = this.authCodeList[0].MCODE
    this.selectedSUNM = _.find(this.authCodeList, {MCODE: this.selectedSUCD}).CODNM
  },
  mounted() {
    this.loadData()
  },
  computed: {
    req2svr: () => req2svr,
    CODECardsList() {
      let WRPList = this.$store.getters.getFDRList
      for(var i=0; i<WRPList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:WRPList[i].MCODE})
        if (data) {
          WRPList[i].VISIBLE = true
        } else {
          WRPList[i].VISIBLE = false
        }
      }
      console.log(WRPList)
      let returnList = [];
      /*
      for(let i in WRPList) {
        if(WRPList[i].MCODE != '10') {
          returnList.push(WRPList[i])
        }
      }
      */
      this.brandList = ["MI", "MO", "FO", "IT", "SO"];
      for(let i = 0; i < this.brandList.length; i++) {
        let data = _.find(WRPList, {CODNM:this.brandList[i]})
        if (data) {
          returnList.push({
            CODNM: data.CODNM,
            GBNCD: data.GBNCD,
            MCODE: data.MCODE,
            SORTORD: (i+1),
            VISIBLE: true
          })
        }
      }
      console.log(returnList)
      
      return returnList
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
    }
  },
  methods: {
    stringCodeAt: function (str) {
      let codeAtNum = 0;
      for(let i = 0; i < str.length; i++) {
        codeAtNum += str.charCodeAt(i);
      }
      return codeAtNum;
    },
    rowSpan: function (index2) {   
      if(index2 == 0) {
        return true;
      }   
      if(this.dr_THIS[index2].MEMP != this.dr_THIS[index2-1].MEMP) {
        return true;
      } else {
        return false;
      }
    },
    rowSpanNum: function (brcd, memp) {   
      let data = _.find(this.dr_SC, {'BRCD': brcd, 'MEMP': memp});
      return data.DATA.length;
    },
    subSum: function (index, index2) {   
      if(index2 == (this.dr_C[index].DATA.length-1)) {
        return true;
      }
      if(this.dr_C[index].DATA[index2].MEMP != this.dr_C[index].DATA[index2+1].MEMP) {
        return true;
      } else {
        return false;
      }
    },
    pointCutting: function (num) {
      return num.toString().split(".")[0]
    },
    getEdiColunmData: function (index, name, colNm) {
      let department = Object.keys(this.ediRankData)[index];
      let data = _.find(this.ediRankData[department], { 'BRAND': name });;
      if(data) {
        return data[colNm]
      } else {
        return ''
      }
    },
    getTotData: function (brcd) {
      // let objects = _.find(this.dr_C, ['BRCD', brcd]).DATA;
      let objects = this.dr_THIS;
      return [{
        'BRCD': brcd,
        'PLNAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.PLNAMT); }),
        'NOWAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.NOWAMT); }),
        'LASTAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTAMT); }),
        'WEEKRATE': Math.round((_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.NOWAMT); })/_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTAMT); })-1)*100),
        'MONSUMAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.MONSUMAMT); }),
        'LASTMONSUMAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTMONSUMAMT); }),
        'ENDMONAMT': _.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.ENDMONAMT); }),
        'MONRATE': Math.round((_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.MONSUMAMT); })/_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.LASTMONSUMAMT); })-1)*100),
        'MONAVG': Math.round(_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.MONSUMAMT); })/_.sumBy(objects, function(o) { return o.VDCD.indexOf('ZZ')==0?0:Number(o.PLNAMT); })*100),
      }]
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
    getWeek(yyyy, mm) {
      this.weekList = [];
      let fdate = yyyy + this.twinNum(mm) + "01";
      let weekend = 0, start_day = "", end_day = ""
      
      for(let i = 0; i < Number(moment(fdate, "YYYYMMDD").endOf('month').format('DD')); i++ ){
        if(i == 0) {
          start_day = fdate
          var _day = Number(moment(start_day, "YYYYMMDD").format('d'))
          if(_day == 0) {
            _day = 7;
          }
          end_day = moment(start_day, "YYYYMMDD").add(7-_day, 'day').format('YYYYMMDD')
          weekend += 1
          this.weekList.push({
            weekend: weekend, weekendStr: weekend+"주차",
            startDay: start_day, endDay: end_day
          })
        } else {
          var _date = yyyy + this.twinNum(mm) + this.twinNum(i+1);
          if(moment(_date, "YYYYMMDD").format('d') == '1') {
            start_day = _date
            end_day = moment(start_day, "YYYYMMDD").add(6, 'day').format('YYYYMMDD')
            if(moment(start_day).format('MM') != moment(end_day).format('MM')) {
              end_day = moment(start_day, "YYYYMMDD").endOf('month').format('YYYYMMDD')
            }
            weekend += 1
            this.weekList.push({
              weekend: weekend, weekendStr: weekend+"주차",
              startDay: start_day, endDay: end_day
            })
          }
        }
      }
      this.weekList.push({
        weekend: 0, weekendStr: "월마감",
        startDay: fdate, endDay: end_day
      })
    },
    getThisWeek: function (week) {
      this.week = week;
      this.thisWeeks = _.find(this.weekList, { 'weekend': week })
    },
    twinNum: function (num) {
      if(num.toString().length == 1) {
        return "0"+num.toString();
      } else {
        return num.toString();
      }
    },
    loadData() {
      /*
      if (this.CODECardsList.length <= 0) {
        return
      }
      */
      this.getSaleListByBrand();
      //this.getTakeChargeList();
      this.getEdiRankList();
    },
    changeDate() {
      let weekIndex = _.findIndex(this.weekList, ['weekend', this.week]);
      this.thisWeeks = this.weekList[weekIndex]
      this.standardStartDate = moment(this.thisWeeks.startDay, "YYYYMMDD").format("YYYY-MM-DD")
      this.standardEndDate = moment(this.thisWeeks.endDay, "YYYYMMDD").format("YYYY-MM-DD")

      if(weekIndex == this.weekList.length-1) {
        this.nextStartDate = this.year + this.twinNum(Number(this.month)+1) + "01"
        this.nextEndDate =  moment(this.nextStartDate).day('Sunday').add(7, 'days').format('YYYYMMDD')
      } else {
        this.nextStartDate = this.weekList[weekIndex+1].startDay
        this.nextEndDate = this.weekList[weekIndex+1].endDay
      }

      this.loadData()
    },
    getSaleListByBrand() {
      // 브랜드별 매출실적
      this.dr_S = []

      this.req2svr.getSaleListByBrand(this.year, this.month, this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            this.dr_S = []
            if(res["EXECUTE ERROR"] == "No more data to read.") {
              alert("해당 주차의 데이터가 없습니다. 이전 주차로 조회합니다.");
              if(this.week == 1) {
                if(this.month == '1') {
                  this.year = (Number(this.year)-1).toString()
                  this.month = '12'
                } else {
                  this.month = (Number(this.month)-1).toString()
                }
              } 
              this.getWeek(this.year, this.month)
              this.week = this.week-1
              let weekIndex = _.findIndex(this.weekList, ['weekend', this.week]);
              this.thisWeeks = this.weekList[weekIndex]
              console.log("여기 >>> ", this.weekList,  " / ", weekIndex);
              this.standardStartDate = moment(this.thisWeeks.startDay, "YYYYMMDD").format("YYYY-MM-DD");
              this.standardEndDate = moment(this.thisWeeks.endDay, "YYYYMMDD").format("YYYY-MM-DD");
              if(weekIndex != (this.weekList.length-1)) {
                this.nextStartDate = this.weekList[weekIndex+1].startDay;
                this.nextEndDate = this.weekList[weekIndex+1].endDay;
              } else{
                this.nextStartDate = this.year + this.twinNum(Number(this.month)+1) + "01"
                this.nextEndDate =  moment(this.nextStartDate).day('Sunday').add(7, 'days').format('YYYYMMDD')
              }

              this.getSaleListByBrand()
            }
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = [];
            if(count < 1) {
            } else if(count == 1) {
              this.dr_S.push(res);
            } else {
              this.dr_S = JSON.parse("[" + res + "]");
              
            }
            for(var i in this.dr_S) {
              this.dr_S[i].SALEGU2 = this.dr_S[i].SALEGU == "1"?"정상":this.dr_S[i].SALEGU == "2"?"이월":"2년차"
              this.dr_S[i].WEEKRATE = ""
              this.dr_S[i].MONRATE = ""
              this.dr_S[i].MONPLNAMT = Number(this.dr_S[i].MONPLNAMT) != 0 ? Number(this.dr_S[i].MONPLNAMT):''
              this.dr_S[i].PREWEEKAMT = Number(this.dr_S[i].PREWEEKAMT) != 0 ? Number(this.dr_S[i].PREWEEKAMT):''
              this.dr_S[i].WEEKPLNAMT = Number(this.dr_S[i].WEEKPLNAMT) != 0 ? Number(this.dr_S[i].WEEKPLNAMT):''
              this.dr_S[i].WEEKAMT = Number(this.dr_S[i].WEEKAMT) != 0 ? Number(this.dr_S[i].WEEKAMT):''
              this.dr_S[i].PREMONAMT = Number(this.dr_S[i].PREMONAMT) != 0 ? Number(this.dr_S[i].PREMONAMT):''
              this.dr_S[i].MONSUMPLNAMT = Number(this.dr_S[i].MONSUMPLNAMT) != 0 ? Number(this.dr_S[i].MONSUMPLNAMT):''
              this.dr_S[i].MONAMT = Number(this.dr_S[i].MONAMT) != 0 ? Number(this.dr_S[i].MONAMT):''
              this.dr_S[i].NEXTWEEKPLNAMT = Number(this.dr_S[i].NEXTWEEKPLNAMT) != 0 ? Number(this.dr_S[i].NEXTWEEKPLNAMT):''
            }
            var loop_index = this.dr_S.length/2

            let brand_tot = {}
            let temp = 0;
            
            let brand_list = ["MI", "MO", "FO", "IT", "SO"]
            for(let i in brand_list) {
              let index = _.findIndex(this.dr_S, {BRCD: brand_list[i], SALEGU: '1'});
              brand_tot = {
                COMCD: this.dr_S[index].COMCD, SUCD: this.dr_S[index].SUCD, BRCD: this.dr_S[index].BRCD, 
                YYYY: this.dr_S[index].YYYY, MM: this.dr_S[index].MM, WEEK: this.dr_S[index].WEEK,
                FROM_SALEDT: this.dr_S[index].FROM_SALEDT, TO_SALEDT: this.dr_S[index].TO_SALEDT, 
                SALEGU: '0', SALEGU2: '합계',
                MONPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), 
                WEEKRATE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKPLNAMT):0; }), 1), 
                PREMONAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONSUMPLNAMT):0; }), 
                MONAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), 
                MONRATE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONSUMPLNAMT):0; }), 1), 
                WEEKAVERAGE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREWEEKAMT):0; })-1, 2), 
                MONAVERAGE: this.getRate(_.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.PREMONAMT):0; })-1, 2), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.BRCD==brand_list[i]?Number(o.NEXTWEEKPLNAMT):0; })
              }
              if(brand_list[i] != 'SO') {
                this.dr_S.splice(index+2, 0, brand_tot);
              } else {
                this.dr_S.splice(index+3, 0, brand_tot);
              }

            }

            this.TOT_dr_S = [
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '1', SALEGU2: '정상', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.WEEKAMT):0; }), 
                WEEKRATE: '', 
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONAMT):0; }), 
                MONRATE: '', 
                WEEKAVERAGE:    _.meanBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.WEEKAVERAGE):0; }), 
                MONAVERAGE:     _.meanBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.MONAVERAGE):0; }), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == "1"? Number(o.NEXTWEEKPLNAMT):0; })
              },
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '2', SALEGU2: '이월', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.WEEKAMT):0; }), 
                WEEKRATE: '', 
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONAMT):0; }), 
                MONRATE: '', 
                WEEKAVERAGE:    _.meanBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.WEEKAVERAGE):0; }), 
                MONAVERAGE:     _.meanBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.MONAVERAGE):0; }), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == "2"? Number(o.NEXTWEEKPLNAMT):0; })
              },
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '3', SALEGU2: '2년차', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.WEEKAMT):0; }), 
                WEEKRATE: '', 
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONAMT):0; }), 
                MONRATE: '', 
                WEEKAVERAGE:    _.meanBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.WEEKAVERAGE):0; }), 
                MONAVERAGE:     _.meanBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.MONAVERAGE):0; }), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == "3"? Number(o.NEXTWEEKPLNAMT):0; })
              },
              {
                COMCD: '', SUCD:'', BRCD: 'TOTAL', YYYY: this.dr_S[0].YYYY, MM: this.dr_S[0].MM, WEEK: this.dr_S[0].WEEK,
                FROM_SALEDT: this.dr_S[0].FROM_SALEDT, TO_SALEDT: this.dr_S[0].TO_SALEDT, 
                SALEGU: '0', SALEGU2: '합계', 
                MONPLNAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONPLNAMT):0; }), 
                PREWEEKAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREWEEKAMT):0; }), 
                WEEKPLNAMT:     _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKPLNAMT):0; }), 
                WEEKAMT:        _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKAMT):0; }), 
                WEEKRATE:       this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKPLNAMT):0; }), 1),
                PREMONAMT:      _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREMONAMT):0; }), 
                MONSUMPLNAMT:   _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONSUMPLNAMT):0; }), 
                MONAMT:         _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONAMT):0; }), 
                MONRATE:        this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONSUMPLNAMT):0; }), 1), 
                WEEKAVERAGE:    this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.WEEKAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREWEEKAMT):0; }), 2), 
                MONAVERAGE:     this.getRate(_.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.MONAMT):0; }), _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.PREMONAMT):0; }), 2), 
                NEXTWEEKPLNAMT: _.sumBy(this.dr_S, function(o) { return o.SALEGU == "0"? Number(o.NEXTWEEKPLNAMT):0; })
              }
            ]

            this.dr_S = _.concat(this.dr_S, this.TOT_dr_S);

            this.getProgressData();
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
      
    },
    getProgressData() {
      // 브랜드별 주요사항
      this.dr_P = []
      
      this.req2svr.getProgressData(this.year, this.month, this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = []
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]");
            }
            for(let i in list) {
              this.dr_P.push({
                BRCD: list[i].BRCD,
                PROGRESS: list[i].PROGRESS.replace(/ /gi, "&nbsp;").split('	').join('&emsp;').replace(/(?:\r\n|\r|\n)/g, '<br />'),
                PLAN: list[i].PLAN.replace(/ /gi, "&nbsp;").split('	').join('&emsp;').replace(/(?:\r\n|\r|\n)/g, '<br />'),
              })
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
      
      

    },
    getTakeChargeList() {
      // 담당뎔 매장 실적 달성율
      this.dr_C = [];
      this.dr_SC = [];
      this.dr_THIS= {};

      this.req2svr.getTakeChargeList(this.year, this.twinNum(this.month), this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = []
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]");
            }
            if(list.length != 0) {
              this.getStoreSaleByCharge(list);
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStoreSaleByCharge(chargeList) {
      
      this.req2svr.getStoreSaleByCharge(this.year, this.twinNum(this.month), this.week).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            let list = []
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]");
            }
            if(list.length != 0) {
              let chargeObjList = new Array();
              for(let k = 0; k < this.brandList.length; k++) {
                let chargeObj = new Object();
                chargeObj["BRCD"] = this.brandList[k]
                chargeObj["DATA"] = new Array();
                for(let j = 0; j < list.length; j ++) {
                  if(chargeObj.BRCD == list[j].BRCD) {
                    chargeObj.DATA.push(list[j])
                  }
                }
                chargeObjList.push(chargeObj);
              }

              for(var i = 0; i < chargeList.length; i++) {
                chargeList[i]["DATA"] = new Array();
                for(var j = 0; j < list.length; j++) {
                  if(chargeList[i].BRCD == list[j].BRCD && chargeList[i].MEMP == list[j].MEMP) {
                    chargeList[i]["DATA"].push(list[j]);
                  }
                }
              }
              this.dr_C = chargeObjList;
              this.dr_SC = chargeList;
              this.dr_THIS = _.find(this.dr_C, ['BRCD', this.selectedSUNM]).DATA;
              console.log("dr_C >>> ", this.dr_C);
              console.log("dr_SC >>> ", this.dr_SC);
              console.log("dr_THIS >>> ", this.dr_THIS);
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getEdiRankList() {
      let data = [{"EDI":"LOTTE","NML_RANK":1,"TOT_RANK":1,"BRAND":"타 임","NML_SUM":"36821023","EVT_SUM":"","SALE_TOT":"36821023","LAST_SALE_TOT":"47929402","GROWTH_RATE":"-23 %","TOT_STR_CNT":23,"TOT_STORE_AVG":"1600914"},
                  {"EDI":"LOTTE","NML_RANK":2,"TOT_RANK":2,"BRAND":"구호","NML_SUM":"17195708","EVT_SUM":"","SALE_TOT":"17195708","LAST_SALE_TOT":"26447529","GROWTH_RATE":"-35 %","TOT_STR_CNT":21,"TOT_STORE_AVG":"818843"},
                  {"EDI":"LOTTE","NML_RANK":3,"TOT_RANK":3,"BRAND":"모조","NML_SUM":"14124156","EVT_SUM":"1656388","SALE_TOT":"15780545","LAST_SALE_TOT":"21409254","GROWTH_RATE":"-26 %","TOT_STR_CNT":27,"TOT_STORE_AVG":"584465"},
                  {"EDI":"LOTTE","NML_RANK":4,"TOT_RANK":4,"BRAND":"미샤","NML_SUM":"15435586","EVT_SUM":"","SALE_TOT":"15435586","LAST_SALE_TOT":"21380918","GROWTH_RATE":"-28 %","TOT_STR_CNT":24,"TOT_STORE_AVG":"643149"},
                  {"EDI":"LOTTE","NML_RANK":5,"TOT_RANK":5,"BRAND":"마 인","NML_SUM":"13036894","EVT_SUM":"","SALE_TOT":"13036894","LAST_SALE_TOT":"17075139","GROWTH_RATE":"-24 %","TOT_STR_CNT":17,"TOT_STORE_AVG":"766876"},
                  {"EDI":"LOTTE","NML_RANK":6,"TOT_RANK":6,"BRAND":"지고트","NML_SUM":"9199179","EVT_SUM":"2142055","SALE_TOT":"11341233","LAST_SALE_TOT":"17571131","GROWTH_RATE":"-35 %","TOT_STR_CNT":21,"TOT_STORE_AVG":"540059"},
                  {"EDI":"LOTTE","NML_RANK":14,"TOT_RANK":7,"BRAND":"미니멈","NML_SUM":"4628834","EVT_SUM":"3268255","SALE_TOT":"7897089","LAST_SALE_TOT":"11881227","GROWTH_RATE":"-34 %","TOT_STR_CNT":21,"TOT_STORE_AVG":"376052"},
                  {"EDI":"LOTTE","NML_RANK":11,"TOT_RANK":8,"BRAND":"아이잗컬렉션","NML_SUM":"5336257","EVT_SUM":"1771441","SALE_TOT":"7107698","LAST_SALE_TOT":"10151071","GROWTH_RATE":"-30 %","TOT_STR_CNT":12,"TOT_STORE_AVG":"592308"},
                  {"EDI":"LOTTE","NML_RANK":8,"TOT_RANK":9,"BRAND":"데무","NML_SUM":"5710795","EVT_SUM":"1278455","SALE_TOT":"6989250","LAST_SALE_TOT":"10487850","GROWTH_RATE":"-33 %","TOT_STR_CNT":19,"TOT_STORE_AVG":"367855"},
                  {"EDI":"LOTTE","NML_RANK":7,"TOT_RANK":10,"BRAND":"오브제","NML_SUM":"6829065","EVT_SUM":"","SALE_TOT":"6829065","LAST_SALE_TOT":"8813416","GROWTH_RATE":"-23 %","TOT_STR_CNT":17,"TOT_STORE_AVG":"401710"},
                  {"EDI":"LOTTE","NML_RANK":13,"TOT_RANK":11,"BRAND":"린","NML_SUM":"4823108","EVT_SUM":"1415776","SALE_TOT":"6238883","LAST_SALE_TOT":"10484685","GROWTH_RATE":"-40 %","TOT_STR_CNT":18,"TOT_STORE_AVG":"346605"},
                  {"EDI":"LOTTE","NML_RANK":12,"TOT_RANK":12,"BRAND":"데코","NML_SUM":"5217717","EVT_SUM":"593451","SALE_TOT":"5811168","LAST_SALE_TOT":"8989114","GROWTH_RATE":"-35 %","TOT_STR_CNT":20,"TOT_STORE_AVG":"290558"},
                  {"EDI":"LOTTE","NML_RANK":9,"TOT_RANK":13,"BRAND":"랑방","NML_SUM":"5663439","EVT_SUM":"","SALE_TOT":"5663439","LAST_SALE_TOT":"6623870","GROWTH_RATE":"-14 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"1132688"},
                  {"EDI":"LOTTE","NML_RANK":10,"TOT_RANK":14,"BRAND":"레니본","NML_SUM":"5535952","EVT_SUM":"110623","SALE_TOT":"5646576","LAST_SALE_TOT":"8876281","GROWTH_RATE":"-36 %","TOT_STR_CNT":17,"TOT_STORE_AVG":"332152"},
                  {"EDI":"LOTTE","NML_RANK":15,"TOT_RANK":15,"BRAND":"도호","NML_SUM":"3480988","EVT_SUM":"1149524","SALE_TOT":"4630512","LAST_SALE_TOT":"7077710","GROWTH_RATE":"-35 %","TOT_STR_CNT":12,"TOT_STORE_AVG":"385876"},
                  {"EDI":"LOTTE","NML_RANK":'',"TOT_RANK":'',"BRAND":"Theory","NML_SUM":"11695922","EVT_SUM":"","SALE_TOT":"11695922","LAST_SALE_TOT":"17202614","GROWTH_RATE":"-32 %","TOT_STR_CNT":20,"TOT_STORE_AVG":"584796"},
                  {"EDI":"SSG","NML_RANK":1,"TOT_RANK":1,"BRAND":"타 임","NML_SUM":"13114725","EVT_SUM":"","SALE_TOT":"13114725","LAST_SALE_TOT":"19874686","GROWTH_RATE":"-34 %","TOT_STR_CNT":8,"TOT_STORE_AVG":"1639341"},
                  {"EDI":"SSG","NML_RANK":2,"TOT_RANK":2,"BRAND":"구호","NML_SUM":"9669996","EVT_SUM":"","SALE_TOT":"9669996","LAST_SALE_TOT":"14839630","GROWTH_RATE":"-35 %","TOT_STR_CNT":12,"TOT_STORE_AVG":"805833"},
                  {"EDI":"SSG","NML_RANK":3,"TOT_RANK":3,"BRAND":"미샤","NML_SUM":"6279528","EVT_SUM":"","SALE_TOT":"6279528","LAST_SALE_TOT":"8771278","GROWTH_RATE":"-28 %","TOT_STR_CNT":12,"TOT_STORE_AVG":"523294"},
                  {"EDI":"SSG","NML_RANK":4,"TOT_RANK":4,"BRAND":"모조","NML_SUM":"4716818","EVT_SUM":"1308590","SALE_TOT":"6025407","LAST_SALE_TOT":"8659897","GROWTH_RATE":"-30 %","TOT_STR_CNT":10,"TOT_STORE_AVG":"602541"},
                  {"EDI":"SSG","NML_RANK":7,"TOT_RANK":5,"BRAND":"지고트","NML_SUM":"3144516","EVT_SUM":"1248579","SALE_TOT":"4393096","LAST_SALE_TOT":"6946759","GROWTH_RATE":"-37 %","TOT_STR_CNT":9,"TOT_STORE_AVG":"488122"},
                  {"EDI":"SSG","NML_RANK":5,"TOT_RANK":6,"BRAND":"랑방","NML_SUM":"4304087","EVT_SUM":"","SALE_TOT":"4304087","LAST_SALE_TOT":"5550463","GROWTH_RATE":"-22 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"1076022"},
                  {"EDI":"SSG","NML_RANK":6,"TOT_RANK":7,"BRAND":"데코","NML_SUM":"3548244","EVT_SUM":"171412","SALE_TOT":"3719655","LAST_SALE_TOT":"5996816","GROWTH_RATE":"-38 %","TOT_STR_CNT":9,"TOT_STORE_AVG":"413295"},
                  {"EDI":"SSG","NML_RANK":8,"TOT_RANK":8,"BRAND":"마 인","NML_SUM":"2966860","EVT_SUM":"","SALE_TOT":"2966860","LAST_SALE_TOT":"4343876","GROWTH_RATE":"-32 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"741715"},
                  {"EDI":"SSG","NML_RANK":13,"TOT_RANK":9,"BRAND":"린","NML_SUM":"1238788","EVT_SUM":"1317321","SALE_TOT":"2556108","LAST_SALE_TOT":"3433831","GROWTH_RATE":"-26 %","TOT_STR_CNT":9,"TOT_STORE_AVG":"284012"},
                  {"EDI":"SSG","NML_RANK":11,"TOT_RANK":10,"BRAND":"아이잗컬렉션","NML_SUM":"1581291","EVT_SUM":"742622","SALE_TOT":"2323914","LAST_SALE_TOT":"4055521","GROWTH_RATE":"-43 %","TOT_STR_CNT":6,"TOT_STORE_AVG":"387319"},
                  {"EDI":"SSG","NML_RANK":9,"TOT_RANK":11,"BRAND":"레니본","NML_SUM":"2089168","EVT_SUM":"67050","SALE_TOT":"2156219","LAST_SALE_TOT":"2381792","GROWTH_RATE":"-9 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"431244"},
                  {"EDI":"SSG","NML_RANK":12,"TOT_RANK":12,"BRAND":"미니멈","NML_SUM":"1296501","EVT_SUM":"801730","SALE_TOT":"2098231","LAST_SALE_TOT":"3540706","GROWTH_RATE":"-41 %","TOT_STR_CNT":8,"TOT_STORE_AVG":"262279"},
                  {"EDI":"SSG","NML_RANK":10,"TOT_RANK":13,"BRAND":"오브제","NML_SUM":"1623766","EVT_SUM":"","SALE_TOT":"1623766","LAST_SALE_TOT":"985211","GROWTH_RATE":"65 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"541255"},
                  {"EDI":"SSG","NML_RANK":14,"TOT_RANK":14,"BRAND":"도호","NML_SUM":"887879","EVT_SUM":"81848","SALE_TOT":"969727","LAST_SALE_TOT":"2014989","GROWTH_RATE":"-52 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"323,242"},
                  {"EDI":"SSG","NML_RANK":15,"TOT_RANK":15,"BRAND":"데무","NML_SUM":"355312","EVT_SUM":"85350","SALE_TOT":"440662","LAST_SALE_TOT":"","GROWTH_RATE":"0 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"146887"},
                  {"EDI":"HYUNDAI","NML_RANK":1,"TOT_RANK":1,"BRAND":"타 임","NML_SUM":"19937736","EVT_SUM":"","SALE_TOT":"19937736","LAST_SALE_TOT":"26945868","GROWTH_RATE":"-26 %","TOT_STR_CNT":14,"TOT_STORE_AVG":"1424124"},
                  {"EDI":"HYUNDAI","NML_RANK":2,"TOT_RANK":2,"BRAND":"구호","NML_SUM":"11937107","EVT_SUM":"","SALE_TOT":"11937107","LAST_SALE_TOT":"17737457","GROWTH_RATE":"-33 %","TOT_STR_CNT":13,"TOT_STORE_AVG":"918239"},
                  {"EDI":"HYUNDAI","NML_RANK":3,"TOT_RANK":3,"BRAND":"랑방","NML_SUM":"9889715","EVT_SUM":"","SALE_TOT":"9889715","LAST_SALE_TOT":"13510207","GROWTH_RATE":"-27 %","TOT_STR_CNT":10,"TOT_STORE_AVG":"988971"},
                  {"EDI":"HYUNDAI","NML_RANK":4,"TOT_RANK":4,"BRAND":"마 인","NML_SUM":"8848657","EVT_SUM":"","SALE_TOT":"8848657","LAST_SALE_TOT":"12382678","GROWTH_RATE":"-29 %","TOT_STR_CNT":13,"TOT_STORE_AVG":"680666"},
                  {"EDI":"HYUNDAI","NML_RANK":6,"TOT_RANK":5,"BRAND":"모조","NML_SUM":"5193731","EVT_SUM":"2168313","SALE_TOT":"7362043","LAST_SALE_TOT":"8485829","GROWTH_RATE":"-13 %","TOT_STR_CNT":10,"TOT_STORE_AVG":"736204"},
                  {"EDI":"HYUNDAI","NML_RANK":5,"TOT_RANK":6,"BRAND":"미샤","NML_SUM":"6841080","EVT_SUM":"","SALE_TOT":"6841080","LAST_SALE_TOT":"9078624","GROWTH_RATE":"-25 %","TOT_STR_CNT":11,"TOT_STORE_AVG":"621916"},
                  {"EDI":"HYUNDAI","NML_RANK":9,"TOT_RANK":7,"BRAND":"지고트","NML_SUM":"2865023","EVT_SUM":"2083364","SALE_TOT":"4948388","LAST_SALE_TOT":"7338496","GROWTH_RATE":"-33 %","TOT_STR_CNT":11,"TOT_STORE_AVG":"449853"},
                  {"EDI":"HYUNDAI","NML_RANK":7,"TOT_RANK":8,"BRAND":"오브제","NML_SUM":"4497230","EVT_SUM":"","SALE_TOT":"4497230","LAST_SALE_TOT":"6304654","GROWTH_RATE":"-29 %","TOT_STR_CNT":9,"TOT_STORE_AVG":"499692"},
                  {"EDI":"HYUNDAI","NML_RANK":8,"TOT_RANK":9,"BRAND":"데무","NML_SUM":"3078979","EVT_SUM":"1385843","SALE_TOT":"4464822","LAST_SALE_TOT":"7252648","GROWTH_RATE":"-38 %","TOT_STR_CNT":11,"TOT_STORE_AVG":"405893"},
                  {"EDI":"HYUNDAI","NML_RANK":11,"TOT_RANK":10,"BRAND":"린","NML_SUM":"1888603","EVT_SUM":"2306012","SALE_TOT":"4194615","LAST_SALE_TOT":"6197992","GROWTH_RATE":"-32 %","TOT_STR_CNT":9,"TOT_STORE_AVG":"466068"},
                  {"EDI":"HYUNDAI","NML_RANK":10,"TOT_RANK":11,"BRAND":"아이잗컬렉션","NML_SUM":"2559484","EVT_SUM":"1498561","SALE_TOT":"4058046","LAST_SALE_TOT":"6230421","GROWTH_RATE":"-35 %","TOT_STR_CNT":10,"TOT_STORE_AVG":"405805"},
                  {"EDI":"HYUNDAI","NML_RANK":12,"TOT_RANK":12,"BRAND":"도호","NML_SUM":"1385070","EVT_SUM":"1008761","SALE_TOT":"2393832","LAST_SALE_TOT":"3600370","GROWTH_RATE":"-34 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"478766"},
                  {"EDI":"HYUNDAI","NML_RANK":13,"TOT_RANK":13,"BRAND":"미니멈","NML_SUM":"1042571","EVT_SUM":"311121","SALE_TOT":"1353691","LAST_SALE_TOT":"1290640","GROWTH_RATE":"5 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"676846"},
                  {"EDI":"HYUNDAI","NML_RANK":14,"TOT_RANK":14,"BRAND":"레니본","NML_SUM":"775873","EVT_SUM":"78047","SALE_TOT":"853921","LAST_SALE_TOT":"1294571","GROWTH_RATE":"-34 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"213480"},
                  {"EDI":"HYUNDAI","NML_RANK":'',"TOT_RANK":'',"BRAND":"Theory","NML_SUM":"10240195","EVT_SUM":"877573","SALE_TOT":"11117768","LAST_SALE_TOT":"17014703","GROWTH_RATE":"-35 %","TOT_STR_CNT":13,"TOT_STORE_AVG":"855213"},
                  {"EDI":"GALLERIA","NML_RANK":1,"TOT_RANK":1,"BRAND":"타 임","NML_SUM":"7537657","EVT_SUM":"","SALE_TOT":"7537657","LAST_SALE_TOT":"10790388","GROWTH_RATE":"-30 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"1507531"},
                  {"EDI":"GALLERIA","NML_RANK":2,"TOT_RANK":2,"BRAND":"랑방","NML_SUM":"3973132","EVT_SUM":"","SALE_TOT":"3973132","LAST_SALE_TOT":"5338624","GROWTH_RATE":"-26 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"1324377"},
                  {"EDI":"GALLERIA","NML_RANK":3,"TOT_RANK":3,"BRAND":"구호","NML_SUM":"3954259","EVT_SUM":"","SALE_TOT":"3954259","LAST_SALE_TOT":"6020762","GROWTH_RATE":"-34 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"790852"},
                  {"EDI":"GALLERIA","NML_RANK":4,"TOT_RANK":4,"BRAND":"미샤","NML_SUM":"3038054","EVT_SUM":"","SALE_TOT":"3038054","LAST_SALE_TOT":"4397975","GROWTH_RATE":"-31 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"607611"},
                  {"EDI":"GALLERIA","NML_RANK":5,"TOT_RANK":5,"BRAND":"마 인","NML_SUM":"2076946","EVT_SUM":"","SALE_TOT":"2076946","LAST_SALE_TOT":"3174865","GROWTH_RATE":"-35 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"415389"},
                  {"EDI":"GALLERIA","NML_RANK":6,"TOT_RANK":6,"BRAND":"데코","NML_SUM":"1726126","EVT_SUM":"85807","SALE_TOT":"1811934","LAST_SALE_TOT":"2889746","GROWTH_RATE":"-37 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"452983"},
                  {"EDI":"GALLERIA","NML_RANK":7,"TOT_RANK":7,"BRAND":"아이잗컬렉션","NML_SUM":"1561097","EVT_SUM":"226644","SALE_TOT":"1787740","LAST_SALE_TOT":"2819805","GROWTH_RATE":"-37 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"446935"},
                  {"EDI":"GALLERIA","NML_RANK":9,"TOT_RANK":8,"BRAND":"도호","NML_SUM":"1093423","EVT_SUM":"495696","SALE_TOT":"1589119","LAST_SALE_TOT":"2311322","GROWTH_RATE":"-31 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"397280"},
                  {"EDI":"GALLERIA","NML_RANK":8,"TOT_RANK":9,"BRAND":"모조","NML_SUM":"1141131","EVT_SUM":"281402","SALE_TOT":"1422533","LAST_SALE_TOT":"2155289","GROWTH_RATE":"-34 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"474178"},
                  {"EDI":"GALLERIA","NML_RANK":10,"TOT_RANK":10,"BRAND":"레니본","NML_SUM":"1002517","EVT_SUM":"9448","SALE_TOT":"1011966","LAST_SALE_TOT":"1841618","GROWTH_RATE":"-45 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"337322"},
                  {"EDI":"GALLERIA","NML_RANK":11,"TOT_RANK":11,"BRAND":"데무","NML_SUM":"633729","EVT_SUM":"123076","SALE_TOT":"756804","LAST_SALE_TOT":"1187019","GROWTH_RATE":"-36 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"252268"},
                  {"EDI":"GALLERIA","NML_RANK":12,"TOT_RANK":12,"BRAND":"오브제","NML_SUM":"504593","EVT_SUM":"","SALE_TOT":"504593","LAST_SALE_TOT":"364597","GROWTH_RATE":"38 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"252297"},
                  {"EDI":"GALLERIA","NML_RANK":13,"TOT_RANK":13,"BRAND":"지고트","NML_SUM":"292591","EVT_SUM":"74490","SALE_TOT":"367081","LAST_SALE_TOT":"913554","GROWTH_RATE":"-60 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"183541"},
                  {"EDI":"GALLERIA","NML_RANK":14,"TOT_RANK":14,"BRAND":"린","NML_SUM":"232574","EVT_SUM":"84352","SALE_TOT":"316926","LAST_SALE_TOT":"304457","GROWTH_RATE":"4 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"158463"},
                  {"EDI":"GALLERIA","NML_RANK":'',"TOT_RANK":'',"BRAND":"Theory","NML_SUM":"2259206","EVT_SUM":"","SALE_TOT":"2259206","LAST_SALE_TOT":"3320137","GROWTH_RATE":"-32 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"564802"},
                  {"EDI":"AK","NML_RANK":1,"TOT_RANK":1,"BRAND":"타 임","NML_SUM":"2575964","EVT_SUM":"","SALE_TOT":"2575964","LAST_SALE_TOT":"4291540","GROWTH_RATE":"-40 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"858655"},
                  {"EDI":"AK","NML_RANK":2,"TOT_RANK":2,"BRAND":"구호","NML_SUM":"2057024","EVT_SUM":"","SALE_TOT":"2057024","LAST_SALE_TOT":"3073172","GROWTH_RATE":"-33 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"514256"},
                  {"EDI":"AK","NML_RANK":3,"TOT_RANK":3,"BRAND":"랑방","NML_SUM":"1211057","EVT_SUM":"","SALE_TOT":"1211057","LAST_SALE_TOT":"1651503","GROWTH_RATE":"-27 %","TOT_STR_CNT":1,"TOT_STORE_AVG":"1211057"},
                  {"EDI":"AK","NML_RANK":4,"TOT_RANK":4,"BRAND":"모조","NML_SUM":"661163","EVT_SUM":"180185","SALE_TOT":"841348","LAST_SALE_TOT":"1556990","GROWTH_RATE":"-46 %","TOT_STR_CNT":5,"TOT_STORE_AVG":"168270"},
                  {"EDI":"AK","NML_RANK":5,"TOT_RANK":5,"BRAND":"마 인","NML_SUM":"647515","EVT_SUM":"","SALE_TOT":"647515","LAST_SALE_TOT":"573408","GROWTH_RATE":"13 %","TOT_STR_CNT":1,"TOT_STORE_AVG":"647515"},
                  {"EDI":"AK","NML_RANK":6,"TOT_RANK":6,"BRAND":"오브제","NML_SUM":"622378","EVT_SUM":"","SALE_TOT":"622378","LAST_SALE_TOT":"420282","GROWTH_RATE":"48 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"311189"},
                  {"EDI":"AK","NML_RANK":7,"TOT_RANK":7,"BRAND":"레니본","NML_SUM":"552190","EVT_SUM":"11257","SALE_TOT":"563447","LAST_SALE_TOT":"936515","GROWTH_RATE":"-40 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"140862"},
                  {"EDI":"AK","NML_RANK":10,"TOT_RANK":8,"BRAND":"미니멈","NML_SUM":"334872","EVT_SUM":"224583","SALE_TOT":"559454","LAST_SALE_TOT":"853228","GROWTH_RATE":"-34 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"139864"},
                  {"EDI":"AK","NML_RANK":9,"TOT_RANK":9,"BRAND":"지고트","NML_SUM":"376180","EVT_SUM":"151812","SALE_TOT":"527993","LAST_SALE_TOT":"1167398","GROWTH_RATE":"-55 %","TOT_STR_CNT":4,"TOT_STORE_AVG":"131998"},
                  {"EDI":"AK","NML_RANK":8,"TOT_RANK":10,"BRAND":"미샤","NML_SUM":"527154","EVT_SUM":"","SALE_TOT":"527154","LAST_SALE_TOT":"734503","GROWTH_RATE":"-28 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"263577"},
                  {"EDI":"AK","NML_RANK":12,"TOT_RANK":11,"BRAND":"아이잗컬렉션","NML_SUM":"147394","EVT_SUM":"116651","SALE_TOT":"264045","LAST_SALE_TOT":"607810","GROWTH_RATE":"-57 %","TOT_STR_CNT":1,"TOT_STORE_AVG":"264045"},
                  {"EDI":"AK","NML_RANK":11,"TOT_RANK":12,"BRAND":"데코","NML_SUM":"159425","EVT_SUM":"8323","SALE_TOT":"167748","LAST_SALE_TOT":"614868","GROWTH_RATE":"-73 %","TOT_STR_CNT":3,"TOT_STORE_AVG":"55916"},
                  {"EDI":"AK","NML_RANK":13,"TOT_RANK":13,"BRAND":"데무","NML_SUM":"30258","EVT_SUM":"24953","SALE_TOT":"55211","LAST_SALE_TOT":"265831","GROWTH_RATE":"-79 %","TOT_STR_CNT":1,"TOT_STORE_AVG":"55211"},
                  {"EDI":"AK","NML_RANK":14,"TOT_RANK":14,"BRAND":"린","NML_SUM":"9824","EVT_SUM":"7218","SALE_TOT":"17042","LAST_SALE_TOT":"","GROWTH_RATE":"0 %","TOT_STR_CNT":1,"TOT_STORE_AVG":"17042"},
                  {"EDI":"AK","NML_RANK":'',"TOT_RANK":'',"BRAND":"Theory","NML_SUM":"961726","EVT_SUM":"202151","SALE_TOT":"1163877","LAST_SALE_TOT":"1998600","GROWTH_RATE":"-42 %","TOT_STR_CNT":2,"TOT_STORE_AVG":"581938"}];
      let keyList = Object.keys(_.keyBy(data, 'EDI'));
      console.log("keyList >>> ", keyList);
      let newData = new Object();
      for(let i in keyList) {
        newData[Number(i)+1 + "_" + keyList[i]] = [];
      }
      console.log("getEdiRankList >>> ", data);
      let index = 0;
      _.forEach(newData, function(value, key) {
        for(let i = 0; i < data.length; i++) {
          if(key.split("_")[1] == data[i].EDI) {
            newData[key].push(data[i]);
          }
        }
      });
      this.ediRankData = newData;


      let tmepKeys = Object.keys(_.keyBy(data, 'BRAND'));
      let totoEdiData = new Array();
      for(let i in tmepKeys) {
        let brdObj = new Object();
        brdObj["BRAND"]         = tmepKeys[i]
        brdObj["NML_SUM"]       = _.sumBy(data, function(o) { return o.BRAND == tmepKeys[i]?Number(o.NML_SUM.replace(/\,/g, '')):0; });
        brdObj["EVT_SUM"]       = _.sumBy(data, function(o) { return o.BRAND == tmepKeys[i]?Number(o.EVT_SUM.replace(/\,/g, '')):0; });
        brdObj["SALE_TOT"]      = _.sumBy(data, function(o) { return o.BRAND == tmepKeys[i]?Number(o.SALE_TOT.replace(/\,/g, '')):0; });
        brdObj["LAST_SALE_TOT"] = _.sumBy(data, function(o) { return o.BRAND == tmepKeys[i]?Number(o.LAST_SALE_TOT.replace(/\,/g, '')):0; });
        brdObj["TOT_STR_CNT"]   = _.sumBy(data, function(o) { return o.BRAND == tmepKeys[i]?Number(o.TOT_STR_CNT):0; });
        brdObj["TOT_STORE_AVG"] = _.sumBy(data, function(o) { return o.BRAND == tmepKeys[i]?Number(o.TOT_STORE_AVG.replace(/\,/g, '')):0; });
        totoEdiData.push(brdObj);
      }
      this.brdkeyList = tmepKeys;
      console.log("brdkeyList >>> ", this.brdkeyList);

      let nmlRankList = _.orderBy(totoEdiData, ['NML_SUM'], ['desc'])
      let totRankList = _.orderBy(totoEdiData, ['SALE_TOT'], ['desc'])

      for(let j in totoEdiData) {
        totoEdiData[j]["GROWTH_RATE"] = Math.round((totoEdiData[j].SALE_TOT/totoEdiData[j].LAST_SALE_TOT-1)*100);
        totoEdiData[j]["NML_RANK"]    = _.findIndex(nmlRankList, { 'NML_SUM': totoEdiData[j].NML_SUM })+1;
        totoEdiData[j]["TOT_RANK"]    = _.findIndex(totRankList, { 'SALE_TOT': totoEdiData[j].SALE_TOT })+1;
      }
      console.log("totoEdiData >>> ", totoEdiData);
      this.ediRankData["0_통합"] = totoEdiData;

      console.log("ediRankData >>> ", this.ediRankData);

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
    getRate(amt, amt2, gubun) {
      let _return
      if(amt == 0 || amt == "0" || amt == "" || amt2 == 0 || amt2 == "0" || amt2 == "") {
        _return = '0.0';
      } else {
        if(gubun == 1) {
          _return = (amt/amt2*100).toFixed(1)
        } else {
          _return = ((amt/amt2-1)*100).toFixed(1)
        }
      }
      return _return;
    },
    excelDownLoad(id1) {
      var tab_text = ""
      tab_text += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      tab_text += '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
      tab_text += '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
      tab_text += '<x:Name>Sheet1</x:Name>'
      tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
      tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'
      tab_text += "<table border='2px'><tr>"
      var textRange; var j=0,k=0;
      var tab1 = document.getElementById(id1); // id of table
      // var tab2 = document.getElementById(id2); // id of table
      var sa;

      for(j = 0 ; j < tab1.rows.length ; j++) {
        let innerHTML = tab1.rows[j].innerHTML.replace(/arrow_drop_down/g, "-").replace(/arrow_drop_up/g, "+")
        tab_text=tab_text+innerHTML+"</tr>"
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
    tabVal: function(gbn, tbl) {
      this.gubun = Number(gbn);
      this.tableNm = tbl;
      if(this.gubun == 3) {
        this.getTakeChargeList();
        if(this.dr_C.length != 0) {
          this.dr_THIS = _.find(this.dr_C, ['BRCD', this.selectedSUNM]).DATA;
        }
      }
    },
    toMain() {
      this.$router.replace("/")
    },
    changeCODE(code) {
      this.selectedSUCD = code
      this.selectedSUNM = _.find(this.authCodeList, {MCODE: this.selectedSUCD}).CODNM
      $("tr.on").removeClass("on")
      $(".click_text").removeClass("click_text")
      if(this.dr_C.length != 0) {
        this.dr_THIS = _.find(this.dr_C, ['BRCD', this.selectedSUNM]).DATA;
        let elmnt = document.getElementById("store_sale_tbody2");
        elmnt.scrollTop = 0;
      }
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