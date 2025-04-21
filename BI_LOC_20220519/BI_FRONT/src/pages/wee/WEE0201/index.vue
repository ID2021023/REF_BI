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
          <label v-for="data in CODECardsList" :key="data.MCODE" class="tg_btn" :class="{'is-checked': selectSucd == data.MCODE}">
            <input
              type="radio"
              id="option-1"
              class="tg_radio"
              name="options"
              :value="data.MCODE"
              v-model="selectSucd"
              style="display:none"
              @click="changeSucd(data.MCODE)"
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
          <li><a href="javascript:void(0);" @click="link('WEE0101')">복종별 판매 및 할인율</a></li>
          <li><a href="javascript:void(0);" @click="link('WEE0401')">주간판매 동향</a></li>
          <li class="on"><a href="javascript:void(0);" @click="link('WEE0201')">주간판매 BEST 20</a></li>
          <li><a href="javascript:void(0);" @click="link('WEE0301')">신상품 반응조사</a></li>
        </ul>
      </div>
    </div>

        <header class="header wrap">
            <div class="header_inner np" style="margin-top: -20px;">
                <!-- Title -->
                <h2 class="layout_title ">
                    <small class="txt_date np">
                        <strong class="point_col1">{{ choiceYear }}년 {{ choiceMonth }}월</strong>
                    </small>
                </h2>

                <div class="layout_spacer"></div>

                <!-- groups -->
                <div class="groups">
                    <div class="toggle_group">
                        <span class="sub_title mr10">(최종 정보수정일 : {{ this.makeDataDate }})</span>
                    </div>
                    <button type="button" class="btn_n" style="height:55px;" @click="excelDownLoad('exceldown_tbody')">다운로드</button>
                    <div class="select_box" style="min-width:50px;">
                      <!-- <select class="select" v-model="seasonStartYear" @change="changeData()"> -->
                      <select class="select" v-model="seasonStartYear">
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box" style="min-width:50px; margin-right:10px;">
                      <!-- <select class="select" v-model="seasonStartMonth" @change="changeData()"> -->
                      <select class="select" v-model="seasonStartMonth">
                        <option v-for="(data, index) in monthList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div style="line-height:55px;">~</div>
                    <div class="select_box" style="min-width:50px;">
                      <!-- <select class="select" v-model="seasonEndYear" @change="changeData()"> -->
                      <select class="select" v-model="seasonEndYear">
                        <option v-for="(data, index) in yearList" :key="index" :value="data">{{ data }}</option>
                      </select>
                    </div>
                    <div class="select_box" style="min-width:50px;">
                      <!-- <select class="select" v-model="seasonEndMonth" @change="changeData()"> -->
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
                            <div class="input_text" type="text" id="date">
                              <date-pick
                                v-model="calDate"
                                startWeekOnSunday
                                :isDateDisabled="isFutureDate"
                                :inputAttributes="{readonly: true}"
                              ></date-pick>
                              <!-- @input="changeData" -->
                            </div>
                        </form>
                    </div>
                    <button type="button" class="btn_n" style="height:55px;margin-left:10px;" @click="changeData()">조회</button>
                    <!-- select -->
                    <!-- <div class="select_box" style="min-width:100px;">
                        <select class="select">
                            <option>해외매장 포함</option>
                            <option>해외매장 제외</option>
                            <option>해외매장</option>
                        </select>
                    </div> -->
                </div>
            </div>
        </header>

        <!-- box2 -->
        <div class="container wrap">
            <iframe id="txtArea1" style="display:none"></iframe>
            <div class="content" id="exceldown_tbody">
                <div class="row">
                    <div class="col_md_6 npb">
                        <div class="list_box">
                            <ul class="list_card">
                                <li>
                                    <div class="cont_info sty_style">
                                        <div class="cont">
                                            <div class="info_list list_sty02">
                                                <ul class="list ml20 mr20">
                                                    <li style="border-top: 1px solid #bbc2c8;">
                                                        <strong class="title w40">발주량(pcs) / 금액(백만원)</strong>
                                                        <span class="cont w30">{{ saleRateData.PQTY | currency }}</span>
                                                        <span class="cont w30">{{ Math.round(saleRateData.PAMT/1000000) | currency }}</span>
                                                    </li>
                                                    <li>
                                                        <strong class="title w40">입고량(pcs) / 금액(백만원)</strong>
                                                        <span class="cont w30">{{ saleRateData.INQTY | currency }}</span>
                                                        <span class="cont w30">{{ Math.round(saleRateData.INAMT/1000000) | currency }}</span>
                                                    </li>
                                                    <li>
                                                        <strong class="title w40">누판량(pcs) / 금액(백만원)</strong>
                                                        <span class="cont w30">{{ saleRateData.SQTY | currency }}</span>
                                                        <span class="cont w30">{{ Math.round(saleRateData.SILAMT/1000000) | currency }}</span>
                                                    </li>
                                                    <li class="txt_bold">
                                                        <strong class="title w40">재고량(pcs) / 금액(백만원)</strong>
                                                        <span class="cont w30">{{ saleRateData.STOCK | currency }}</span>
                                                        <span class="cont w30">{{ Math.round(saleRateData.STOCKAMT/1000000) | currency }}</span>
                                                    </li>
                                                </ul>

                                                <!-- <table id="excelDown1" style="display:none;">
                                                    <colgroup>
                                                        <col />
                                                        <col />
                                                        <col />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th>발주량(pcs) / 금액(백만원)</th>
                                                            <td>{{ saleRateData.PQTY | currency }}</td>
                                                            <td>{{ Math.round(saleRateData.PAMT/1000000) | currency }}</td>
                                                            <td rowspan="4">판매율<br>{{ saleRateData.SALERATE }}%<br>기판평균단가{{ saleRateData.AVGPRI | currency }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>입고량(pcs) / 금액(백만원)</th>
                                                            <td>{{ saleRateData.INQTY | currency }}</td>
                                                            <td>{{ Math.round(saleRateData.INAMT/1000000) | currency }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>누판량(pcs) / 금액(백만원)</th>
                                                            <td>{{ saleRateData.SQTY | currency }}</td>
                                                            <td>{{ Math.round(saleRateData.SILAMT/1000000) | currency }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>재고량(pcs) / 금액(백만원)</th>
                                                            <td>{{ saleRateData.STOCK | currency }}</td>
                                                            <td>{{ Math.round(saleRateData.STOCKAMT/1000000) | currency }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table> -->
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="col_md_4">
                                    <!-- card_ -->
                                    <div class="card card_mini">
                                        <div class="card_content">
                                            <div class="card_title">
                                                <h4 class="card_title_text">판매율</h4>
                                            </div>
                                            <strong class="em_obj">{{ saleRateData.SALERATE }}<small class="txt2">%</small></strong>
                                            
                                            <dl class="list_obj">
                                                <dt class="tit">기판평균단가</dt>
                                                <dd class="txt">{{ saleRateData.AVGPRI | currency }}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col_md_6 npb">
                        <div class="list_box">
                            <div class="cont_info sty_style">
                                <div class="cont">
                                    <div class="info_list list_sty02">
                                        <ul class="list ml20 mr20">
                                            <li style="border-top: 1px solid #bbc2c8;">
                                                <strong class="title w15 tc">(단위:백만원)</strong>
                                                <span class="cont w25">{{ standardStartDate }} ~ {{ standardEndDate }}</span>
                                                <span class="cont w25">{{ standardBe1StartDate }} ~ {{ standardBe1EndDate }}</span>
                                                <span class="cont w25">{{ standardBe2StartDate }} ~ {{ standardBe2EndDate }}</span>
                                            </li>
                                            <li>
                                                <strong class="title w15 tc">주간매출</strong>
                                                <template v-for="(data,index) in weeklySaleData">
                                                    <span class="cont w25" :key="index"  >{{ Math.round(data.TOTSILAMT/1000000) | currency }}</span>
                                                </template>
                                            </li>
                                            <li>
                                                <strong class="title w15 tc">BEST 20 매출</strong>
                                                <template v-for="(data,index) in weeklySaleData">
                                                    <span class="cont w25" :key="index"  >{{ Math.round(data.SILAMT/1000000) | currency }}</span>
                                                </template>
                                            </li>
                                            <li>
                                                <strong class="title w15 tc">비중</strong>
                                                <template v-for="(data,index) in weeklySaleData">
                                                    <span class="cont w25" :key="index"  >{{ data.RATE }}%</span>
                                                </template>
                                            </li>
                                        </ul>

                                        <!-- <table id="excelDown2" style="display:none;">
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <th>(단위:백만원)</th>
                                                    <td>{{ standardStartDate }} ~ {{ standardEndDate }}</td>
                                                    <td>{{ standardBe1StartDate }} ~ {{ standardBe1EndDate }}</td>
                                                    <td>{{ standardBe2StartDate }} ~ {{ standardBe2EndDate }}</td>
                                                </tr>
                                                <tr>
                                                    <th>주간매출</th>
                                                    <template v-for="(data,index) in weeklySaleData">
                                                        <td>{{ Math.round(data.TOTSILAMT/1000000) | currency }}</td>
                                                    </template>
                                                </tr>
                                                <tr>
                                                    <th>BEST 20 매출</th>
                                                    <template v-for="(data,index) in weeklySaleData">
                                                        <td>{{ Math.round(data.SILAMT/1000000) | currency }}</td>
                                                    </template>
                                                </tr>
                                                <tr>
                                                    <th>비중</th>
                                                    <template v-for="(data,index) in weeklySaleData">
                                                        <td>{{ data.RATE }}%</td>
                                                    </template>
                                                </tr>
                                            </tbody>
                                        </table> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w100">
                    <div class="cont_box">
                        <div class="tit">
                            <strong class="tit_txt">BEST 20 복종별 M수</strong>
                            <div class="layout_spacer"></div>
                            <span class="txt">기준일 : {{ standardStartDate }} ~ {{ standardEndDate }}</span>
                        </div>
                        <div class="container">
                            <div class="content">
                                <!-- 테이블 -->
                                <div class="tbl_sheet tbl_hover_none np">
                                    <table id="excelDown3" class="tbl tbl_center">
                                        <colgroup>
                                            <template v-for="(data,index) in mCountData">
                                                <col  :key="index" />
                                            </template>
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>구분</th>
                                                <template v-for="(data,index) in mCountData" >
                                                    <th :key="index" >{{ data.ITEM }}</th>
                                                </template>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th class="tc">수량(M)</th>
                                                <template v-for="(data,index) in mCountData">
                                                    <td :key="index" >{{ data.CNT }}</td>
                                                </template>
                                            </tr>
                                            <tr>
                                                <th class="tc">금액(%)</th>
                                                <template v-for="(data,index) in mCountData">
                                                    <td :key="index" >{{ data.RATE }}%</td>
                                                </template>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cont_box">
                    <div class="tit">
                        <strong class="tit_txt">주간판매 현황 BEST 20 (판매수량 기준)</strong>
                        <div class="layout_spacer"></div>
                        <span class="txt">기준일 : {{ standardStartDate }} ~ {{ standardEndDate }}</span>
                    </div>

                    <div class="cont">
                        <div class="style_list3" style="margin: -6px;">
                            <ul class="list">
                                <li class="col_md_3 np" v-for="(data,index) in style20Data" :key="index" style="cursor:pointer">
                                    <div class="box">
                                        <!-- <div class="inner" @click="openDetail(index)"> -->
                                            <div class="inner" @click="openDetail()">
                                            <div class="num_box">{{ index+1 }}</div>
                                            <div class="img_area">
                                                <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.MAINSTYCD" />
                                            </div>
                                            <div class="info">
                                                <div>
                                                    <div class="top_box">
                                                        <div class="txt_name fl">{{ data.MAINSTYCD }}</div>
                                                        <div class="txt_name fl one_line ilb">{{ data.SOJAENM }}</div>
                                                        <!-- <span class="chip point_col22 point_box22"><span class="chip_text"><strong>신민아AD</strong></span></span> -->
                                                        <div class="cont">[{{ data.total }}개店]</div>
                                                        <!-- <div class="cont">[222개店]</div> -->
                                                    </div>
                                                    <div class="left_box">
                                                        <div class="txt_top">
                                                            <div class="txt_main">{{ data.CUSTNM }}</div>
                                                        </div>
                                                        <div class="txt_top">
                                                            <div class="txt_main" v-if="data.MAINSTYCD.substr(7,1)=='2'">R&D</div>
                                                            <div class="txt_main" v-else>MAIN</div>
                                                        </div>
                                                        <div class="txt_bottom">
                                                            <div>{{ data.OUTDT }}</div>
                                                            <div>\{{ data.TAGPRI | currency }}</div>
                                                            <!-- <div>(41")</div> -->
                                                        </div>
                                                    </div>
                                                    <div class="right_box">
                                                        <ul class="style_info_list">
                                                            <li v-for="(storeData,index) in data.store" :key="index" :data-tooltip-text="storeData.VDCD">
                                                                <div class="tit one_line">{{ storeData.VDCD }}</div>
                                                                <div class="txt_num">{{ storeData.SQTY }}</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--inner_open class:on-->
                                        <!-- <div class="inner_open" :id="'color' + index"> -->
                                        <div class="inner_open" :class="{'on': colorShowYn == true}">
                                            <div class="content">
                                                <!-- 테이블 -->
                                                <div class="tbl_sheet tbl_hover_none">
                                                    <table class="tbl tbl_center">
                                                        <colgroup>
                                                            <col />
                                                            <col />
                                                            <col />
                                                            <col />
                                                            <col class="bg_point_col19" style="width: 12%" />
                                                            <col />
                                                            <col class="bg_point_col19" />
                                                            <col />
                                                            <col class="bg_point_col19" />
                                                            <col style="width: 12%" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>칼라</th>
                                                                <th>발주</th>
                                                                <th>입고</th>
                                                                <th>중국</th>
                                                                <th v-if="selectSucd == 1">미샤몰</th>
                                                                <th v-else-if="selectSucd == 12">미샤몰</th>
                                                                <th v-else-if="selectSucd == 4">잇미샤몰</th>
                                                                <th v-else-if="selectSucd == 3">SO몰</th>
                                                                <th>전주</th>
                                                                <th>기판</th>
                                                                <th>누판</th>
                                                                <th>재고</th>
                                                                <th>판매율</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(colorData,index) in data.color" :key="index">
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.COLCD }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.PQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.INQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.CHINASQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.ONLINESQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.PSQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.SQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.TOTSQTY }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}">{{ colorData.STOCK }}</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}" v-if="colorData.SALES">{{ colorData.SALES }}%</td>
                                                                <td :class="{'bg_point_col12': colorData.STYCD != colorData.MAINSTYCD}" v-else>{{ colorData.SALES }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
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
  name: "WEE0201",
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
      drawer: null,
      selectSucd: null,
      makeDataDate: null,
      year: "",
      month: "",
      yearList: [],
      monthList: [],
      seasonStartYear: null,
      seasonStartMonth: null,
      seasonEndYear: null,
      seasonEndMonth: null,
      lastseasonStartYear: null,
      lastseasonStartMonth: null,
      lastseasonEndYear: null,
      lastseasonEndMonth: null,
      calDate: null,
      standardStartDate: null,
      standardEndDate: null,
      paramStartDate: null,
      paramEndDate: null,
      choiceYear: null,
      choiceMonth: null,
      foreign: "f_include",
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ],
      styleListData: [], // 주간판매 현황 BEST 20 전체 데이터
      style20Data: [], // 주간판매 현황 BEST 20 데이터
      storeListData: [], // 매장별 판매수량 전체 리스트
      storeTotData: null, // 매장별 전체 몇개사
      store10Data: [], // 매장별 판매수량 상위10개
      storeColorListData: [],// 매장별 판매수량 리스트
      saleRateData: {}, // 발주량, 입고량, 누판량, 재고량
      weeklySaleData: [], // 기간별 주간매출, BEST20 매출, 비중
      mCountData: [], // BEST 20 복종별 M수
      maxCount: 0,
      colorShowYn: false
    }
  },
  created() {
    console.log("data >>> ", this.data)
    this.year = moment().format("YYYY");
    this.month = moment().format("M");

    // 달력 디폴트 날짜
    this.calDate = moment().day('Sunday').format('YYYY-MM-DD')

    let calDateMoment = moment(this.calDate, 'YYYY-MM-DD')

    // 기준일 시작 날짜
    this.standardStartDate = calDateMoment.clone().subtract(6, 'days').format('YY-MM-DD')
    // 기준일 끝 날짜
    this.standardEndDate = calDateMoment.clone().format('YY-MM-DD')
    // 기준일 1주전 시작 날짜
    this.standardBe1StartDate = calDateMoment.clone().subtract(13, 'days').format('YY-MM-DD')
    // 기준일 1주전 끝 날짜
    this.standardBe1EndDate = calDateMoment.clone().subtract(7, 'days').format('YY-MM-DD')
    // 기준일 2주전 시작 날짜
    this.standardBe2StartDate = calDateMoment.clone().subtract(20, 'days').format('YY-MM-DD')
    // 기준일 2주전 끝 날짜
    this.standardBe2EndDate = calDateMoment.clone().subtract(14, 'days').format('YY-MM-DD')

    // 파라미터로 넘길 기준일 시작 날짜
    this.paramStartDate = calDateMoment.clone().subtract(6, 'days').format('YYYYMMDD')
    // 파라미터로 넘길 기준일 끝 날짜
    this.paramEndDate = calDateMoment.clone().format('YYYYMMDD')
    // 파라미터로 넘길 기준일 1주전 시작 날짜
    this.paramBe1StartDate = calDateMoment.clone().subtract(13, 'days').format('YYYYMMDD')
    // 파라미터로 넘길 기준일 1주전 끝 날짜
    this.paramBe1EndDate = calDateMoment.clone().subtract(7, 'days').format('YYYYMMDD')
    // 파라미터로 넘길 기준일 2주전 시작 날짜
    this.paramBe2StartDate = calDateMoment.clone().subtract(20, 'days').format('YYYYMMDD')
    // 파라미터로 넘길 기준일 2주전 끝 날짜
    this.paramBe2EndDate = calDateMoment.clone().subtract(14, 'days').format('YYYYMMDD')

    // 선택한 년도
    this.choiceYear = calDateMoment.clone().format('YYYY')
    // 선택한 월
    this.choiceMonth = calDateMoment.clone().format('MM')

    console.log("2 data >>> "+this.data+" / "+this.selectSucd)
    if(this.data) {
      this.selectSucd = this.data.selectSucd
    } else {
      this.selectSucd = this.authCodeList[0].MCODE
    }

    let currentYear = Number(moment().format("YYYY"))
    let code
    for (let i = 0; i < 5; i++) {
      code = this.$store.getters.getYearCode(currentYear - (4 - i))
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
    this.lastseasonStartMonth = this.seasonStartMonth
    this.lastseasonEndYear = String.fromCharCode(this.seasonEndYear.charCodeAt()-1)
    this.lastseasonEndMonth = this.seasonEndMonth

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
    loadData() {
        if (this.CODECardsList.length <= 0) {
            return
        }

        this.get0201MakeDataDate()
        
        // 발주량, 입고량, 누판량, 재고량
        this.getSaleRate()

        // 기간별 주간매출, BEST20 매출, 비중
        this.getWeeklyBestSale()

        // BEST 20 복종별 M수
        this.getMCount()

        // 컬러별 갯수가 가장 많은 복종의 카운트 셀렉
        this.getMaxCnt()
    },
    changeData() {
        let calDateMoment = moment(this.calDate, 'YYYY-MM-DD')

        // 기준일 시작 날짜
        this.standardStartDate = calDateMoment.clone().subtract(6, 'days').format('YY-MM-DD')
        // 기준일 끝 날짜
        this.standardEndDate = calDateMoment.clone().format('YY-MM-DD')
        // 기준일 1주전 시작 날짜
        this.standardBe1StartDate = calDateMoment.clone().subtract(13, 'days').format('YY-MM-DD')
        // 기준일 1주전 끝 날짜
        this.standardBe1EndDate = calDateMoment.clone().subtract(7, 'days').format('YY-MM-DD')
        // 기준일 2주전 시작 날짜
        this.standardBe2StartDate = calDateMoment.clone().subtract(20, 'days').format('YY-MM-DD')
        // 기준일 2주전 끝 날짜
        this.standardBe2EndDate = calDateMoment.clone().subtract(14, 'days').format('YY-MM-DD')

        // 파라미터로 넘길 기준일 시작 날짜
        this.paramStartDate = calDateMoment.clone().subtract(6, 'days').format('YYYYMMDD')
        // 파라미터로 넘길 기준일 끝 날짜
        this.paramEndDate = calDateMoment.clone().format('YYYYMMDD')
        // 파라미터로 넘길 기준일 1주전 시작 날짜
        this.paramBe1StartDate = calDateMoment.clone().subtract(13, 'days').format('YYYYMMDD')
        // 파라미터로 넘길 기준일 1주전 끝 날짜
        this.paramBe1EndDate = calDateMoment.clone().subtract(7, 'days').format('YYYYMMDD')
        // 파라미터로 넘길 기준일 2주전 시작 날짜
        this.paramBe2StartDate = calDateMoment.clone().subtract(20, 'days').format('YYYYMMDD')
        // 파라미터로 넘길 기준일 2주전 끝 날짜
        this.paramBe2EndDate = calDateMoment.clone().subtract(14, 'days').format('YYYYMMDD')

        // 선택한 년도
        this.choiceYear = calDateMoment.clone().format('YYYY')
        // 선택한 월
        this.choiceMonth = calDateMoment.clone().format('MM')

        this.loadData()
    },
    changeSucd(code , codenm) {
      this.selectSucd = code
      this.colorShowYn = false
      // this.loadData()
      this.changeData()
    },
    convertPercent(value) {
      var x
      if (value) {
        x = Number(value) > 100 ? 100 : Number(value)
      } else {
        x = 0
      }
      return x
    },
    get0201MakeDataDate(){
      this.req2svr.get0201MakeDataDate().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.makeDataDate = res.CREATEDATE
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getSaleRate() {
        // 발주량, 입고량, 누판량, 재고량
        this.req2svr.getSaleRate(this.selectSucd, 
                            this.seasonStartYear, this.seasonStartMonth, 
                            this.seasonEndYear, this.seasonEndMonth, 
                            this.lastseasonStartYear, this.lastseasonStartMonth,
                            this.lastseasonEndYear, this.lastseasonEndMonth,
                            this.paramStartDate, this.paramEndDate).then(
        res => {
            this.saleRateData = {}
            
            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                this.saleRateData = res
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getWeeklyBestSale() {
        // 기간별 주간매출, BEST20 매출, 비중
        this.req2svr.getWeeklyBestSale(this.selectSucd, 
                            this.seasonStartYear, this.seasonStartMonth, 
                            this.seasonEndYear, this.seasonEndMonth, 
                            this.lastseasonStartYear, this.lastseasonStartMonth,
                            this.lastseasonEndYear, this.lastseasonEndMonth,
                            this.paramStartDate, this.paramEndDate,
                            this.paramBe1StartDate, this.paramBe1EndDate,
                            this.paramBe2StartDate, this.paramBe2EndDate).then(
        res => {
            this.weeklySaleData = []

            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length

                if(count < 1) {
                } else if(count == 1) {
                    this.weeklySaleData.push(res)
                } else {
                    this.weeklySaleData = JSON.parse("[" + res + "]")
                }
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMCount() {
        // BEST 20 복종별 M수
        this.req2svr.getMCount(this.selectSucd, 
                            this.seasonStartYear, this.seasonStartMonth, 
                            this.seasonEndYear, this.seasonEndMonth, 
                            this.lastseasonStartYear, this.lastseasonStartMonth,
                            this.lastseasonEndYear, this.lastseasonEndMonth,
                            this.paramStartDate, this.paramEndDate).then(
        res => {
            this.mCountData = []

            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length

                if(count < 1) {
                } else if(count == 1) {
                    this.mCountData.push(res)
                } else {
                    this.mCountData = JSON.parse("[" + res + "]")
                }
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getMaxCnt() {
        this.req2svr.getMaxCnt().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.maxCount = res.MAXCNT
            this.getStyle20()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getStyle20() {
        // 주간판매 현황 BEST 20 (판매수량 기준) 이미지, 이미지 
        this.req2svr.getStyle20(this.selectSucd, 
                            this.seasonStartYear, this.seasonStartMonth, 
                            this.seasonEndYear, this.seasonEndMonth, 
                            this.lastseasonStartYear, this.lastseasonStartMonth,
                            this.lastseasonEndYear, this.lastseasonEndMonth,
                            this.paramStartDate, this.paramEndDate).then(
        res => {
            // 주간판매 현황 BEST 20 전체 데이터
            this.styleListData = []
            // 주간판매 현황 BEST 20 데이터
            this.style20Data = []

            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length

                if(count < 1) {
                } else if(count == 1) {
                this.styleListData.push(res)
                } else {
                this.styleListData = JSON.parse("[" + res + "]")
                }

                // 이미지, 이미지 경로는 20개씩 자름
                this.style20Data = this.styleListData.slice(0, 20)
                

                // 베스트20개 만큼 매장별 판매수량 호출
                for(let i=0; i<this.style20Data.length ;i++){
                    this.getStyle20VDSNM(i , this.style20Data[i].MAINSTYCD)
                }
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyle20VDSNM(i , mainStycd) {
        // 주간판매 현황 BEST 20 (판매수량 기준) 매장별 판매수량
        this.req2svr.getStyle20VDSNM(mainStycd, this.selectSucd, 
                                 this.seasonStartYear, this.seasonStartMonth, 
                                 this.seasonEndYear, this.seasonEndMonth, 
                                 this.lastseasonStartYear, this.lastseasonStartMonth,
                                 this.lastseasonEndYear, this.lastseasonEndMonth,
                                 this.paramStartDate, this.paramEndDate).then(
        res => {
            // 매장별 판매수량 전체 리스트
            this.storeListData = []
            // 매장별 전체 몇개사
            this.storeTotData = null
            // 매장별 판매수량 상위10개
            this.store10Data = []
            
            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length;
            
                if(count < 1) {
                } else if(count == 1) {
                    this.storeListData.push(res)
                } else {
                    this.storeListData = JSON.parse("[" + res + "]")
                }

                // 매장별 전체 몇개사
                this.storeTotData = _.get(this.storeListData, '0.RN')
                // 매장별 판매수량은 10개씩 자름
                this.store10Data = this.storeListData.slice(1, 11)

                this.$set(this.style20Data[i], 'total', this.storeTotData)
                this.$set(this.style20Data[i], 'store', this.store10Data)

                // 베스트20개 만큼 매장별 컬러별 판매수량 호출
                this.getStyle20COLOR(i , mainStycd)
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyle20COLOR(i , mainStycd) {
        // 주간판매 현황 BEST 20 (판매수량 기준) 매장별 컬러별 판매수량
        this.req2svr.getStyle20COLOR(mainStycd, this.selectSucd, 
                                 this.seasonStartYear, this.seasonStartMonth, 
                                 this.seasonEndYear, this.seasonEndMonth, 
                                 this.lastseasonStartYear, this.lastseasonStartMonth,
                                 this.lastseasonEndYear, this.lastseasonEndMonth,
                                 this.paramStartDate, this.paramEndDate).then(
        res => {
            // 매장별 컬러별 판매수량 리스트
            this.storeColorListData = []

            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length;
                if(count < 1) {
                } else if(count == 1) {
                    this.storeColorListData.push(res)
                } else {
                    this.storeColorListData = JSON.parse("[" + res + "]")
                }

                // total 수량 데이터
                let  PQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.PQTY) })
                let  INQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.INQTY) })
                let  CHINASQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.CHINASQTY) })
                let  ONLINESQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.ONLINESQTY) })
                let  PSQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.PSQTY) })
                let  SQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.SQTY) })
                let  TOTSQTY = _.sumBy(this.storeColorListData, function(o) { return Number(o.TOTSQTY) })
                let  STOCK = _.sumBy(this.storeColorListData, function(o) { return Number(o.STOCK) })
                let  SALES = 0

                if((INQTY-CHINASQTY) != 0) {
                    let sale_rate = parseFloat((TOTSQTY/(INQTY-CHINASQTY))).toFixed(2)
                    SALES = Math.round((sale_rate * 100).toFixed(2))
                }

                // total 금액 데이터
                let  PQTYAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.PQTYAMT) })
                let  INAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.INAMT) })
                let  CHINAAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.CHINAAMT) })
                let  ONLINEAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.ONLINEAMT) })
                let  PSILAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.PSILAMT) })
                let  SILAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.SILAMT) })
                let  TOTSILAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.TOTSILAMT) })
                let  STOCKAMT = _.sumBy(this.storeColorListData, function(o) { return Number(o.STOCKAMT) })

                PQTYAMT = Math.round(PQTYAMT/1000000)
                INAMT = Math.round(INAMT/1000000)
                CHINAAMT = Math.round(CHINAAMT/1000000)
                ONLINEAMT = Math.round(ONLINEAMT/1000000)
                PSILAMT = Math.round(PSILAMT/1000000)
                SILAMT = Math.round(SILAMT/1000000)
                TOTSILAMT = Math.round(TOTSILAMT/1000000)
                STOCKAMT = Math.round(STOCKAMT/1000000)

                // maxCount 미만 일때 나머지 데이터를 공백으로 넣어서 maxCount개의 로우로 만듦
                if(this.storeColorListData.length < this.maxCount){
                    let emptyleng = this.maxCount - this.storeColorListData.length
                    for(let i=0; i<emptyleng; i++) {
                        this.storeColorListData.push({ COLCD:"", PQTY:"", INQTY: "", CHINASQTY: "", ONLINESQTY: "", PSQTY: "", SQTY: "", TOTSQTY: "", STOCK: "", SALES: "" })
                    }
                }

                // maxCount+1번 로우에 total 수량 push
                this.storeColorListData.push(({ COLCD:"TTL", PQTY:PQTY, INQTY:INQTY, CHINASQTY:CHINASQTY, ONLINESQTY:ONLINESQTY, PSQTY:PSQTY, SQTY:SQTY, TOTSQTY:TOTSQTY, STOCK:STOCK, SALES:SALES }))
                // maxCount+2번 로우에 total 금액 push
                this.storeColorListData.push(({ COLCD:"금액", PQTY:PQTYAMT, INQTY:INAMT, CHINASQTY:CHINAAMT, ONLINESQTY:ONLINEAMT, PSQTY:PSILAMT, SQTY:SILAMT, TOTSQTY:TOTSILAMT, STOCK:STOCKAMT, SALES:"" }))

                this.$set(this.style20Data[i], 'color', this.storeColorListData)

                console.log("style20Data >>> ", this.style20Data);
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    openDetail() {
        if(this.colorShowYn == true) {
            this.colorShowYn = false
        } else {
            this.colorShowYn = true
        }


        // if(index == 0 || index == 1 || index == 2 || index == 3 || index == 4) {
        //     if($("#color"+index).hasClass('on')) {
        //         for(let i=0; i<5; i++) {
        //             $("#color"+i).removeClass('on')    
        //        }
        //     } else {
        //         for(let i=0; i<5; i++) {
        //             $("#color"+i).addClass('on')    
        //        }
        //     }
        // } else if(index == 5 || index == 6 || index == 7 || index == 8 || index == 9) {
        //     if($("#color"+index).hasClass('on')) {
        //         for(let i=5; i<10; i++) {
        //            $("#color"+i).removeClass('on')
        //         }
        //     } else {
        //         for(let i=5; i<10; i++) {
        //            $("#color"+i).addClass('on')
        //         }
        //     }
        // } else if(index == 10 || index == 11 || index == 12 || index == 13 || index == 14) {
        //     if($("#color"+index).hasClass('on')) {
        //         for(let i=10; i<15; i++) {
        //             $("#color"+i).removeClass('on')
        //         }
        //     } else {
        //         for(let i=10; i<15; i++) {
        //             $("#color"+i).addClass('on')
        //         }
        //     }
        // } else if(index == 15 || index == 16 || index == 17 || index == 18 || index == 19) {
        //     if($("#color"+index).hasClass('on')) {
        //         for(let i=15; i<20; i++) {
        //             $("#color"+i).removeClass('on')
        //         }
        //     } else {
        //         for(let i=15; i<20; i++) {
        //             $("#color"+i).addClass('on')
        //         }
        //     }
        // }
    },
    link(val) {
      //this.$router.push(val)
      this.$router.push({
          name: val,
          params: {
            data: 
            {
              selectSucd: this.selectSucd
            }
          }
      })
    },
    excelDownLoad(id1) {
        let file = new Blob([$('#exceldown_tbody').html()], {type:"application/vnd.ms-excel"});
        let url = URL.createObjectURL(file);
        let a = $("<a />", {
        href: url,
        download: "다운로드.xls"}).appendTo("body").get(0).click();
    },
    excelDownLoadsdddd(table) {
      var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: '다운로드.xls' || 'Worksheet', table: table.innerHTML}
        var tab_text = uri + base64(format(template, ctx))

      var sa
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
        window.location.href = tab_text
        // sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text))
      }
      return (sa)



        // window.location.href = uri + base64(format(template, ctx))
    },
    excelDownLoadwwwwwww() {
      var contents = $("#exceldown_tbody").html();
      window.open('data:application/vnd.ms-excel,' + encodeURIComponent(contents));
    },
    excelDownLoad1112(id1) {
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
      console.log("tab1" , tab1)
      console.log("tab1.rows" , tab1.rows)
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
    },
    rate(value, target) {
      let v = Number(value)
      let t = Number(target)
      if (t < 0) {
        return (1 + ((v-t)/Math.abs(t)))*100
      } else {
        return (v/t)*100
      }
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