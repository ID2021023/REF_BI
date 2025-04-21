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
              @click="changeSucd(data.MCODE , data.CODNM)"
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
          <li class="on"><a href="javascript:void(0);" @click="link('WEE0401')">주간판매 동향</a></li>
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
                        <select class="select" v-model="foreign">
                            <option v-for="(data,index) in foreignList" :key="index" :value="data.id">{{ data.title }}</option>
                        </select>
                    </div> -->
                </div>
            </div>
        </header>

        <div class="container wrap">
            <div class="content">
                <div class="w100">
                    <div class="cont_box">
                        <div class="tit">
                            <strong class="tit_txt">전년대비 판매수량 추이</strong>
                            <div class="layout_spacer"></div>
                            <!-- <span class="txt">중국포함 1,029pcs 626,455 / 805pcs 388,290</span> -->
                        </div>

                        <div class="cont" style="height:400px;">
                            <div class="graph_area">
                                
                                <!-- 그래프 -->
                                <div class="graph" id="salesChart1" style="height:300px;width=100%"></div>
                                <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기 -->
                                <!-- <div class="graph_category">
                                    <ul>
                                        <li><span class="ico_dot" style="background-color:#CED4DA;"></span>2018 주간판매수량</li>
                                        <li><span class="ico_dot" style="background-color:#3F93F5;"></span>2019 주간판매수량</li>
                                        <li><span class="ico_dot" style="background-color:#FFADBA;"></span>2018 누적판매수량</li>
                                        <li><span class="ico_dot" style="background-color:#FA637A;"></span>2019 누적판매수량</li>
                                    </ul>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w100">
                    <div class="cont_box">
                        <div class="tit">
                            <strong class="tit_txt">{{ selectSunm }} 주간판매</strong>
                            <div class="layout_spacer"></div>
                            <span class="txt">단위 : 백만원 / 기준일 : {{ standardStartDate }} ~ {{ standardEndDate }}</span>
                        </div>
                        <div class="container">
                            <div class="content">
                                <iframe id="txtArea1" style="display:none"></iframe>
                                <!-- 테이블 -->
                                <div class="tbl_sheet tbl_hover_none np">
                                    <table id="exceldown_tbody" class="tbl tbl_center">
                                        <colgroup>
                                            <col />
                                            <col />
                                            <col />
                                            <col style="width:2.5%;" />
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
                                            <col style="width:2.5%;" />
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
                                        <thead class="tbl_hover_none">
                                            <tr>
                                                <th colspan="12">{{ choiceYear }}</th>
                                                <th colspan="11">{{ lastYear }}</th>
                                                <th colspan="2">-</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1" rowspan="2">정상</th>
                                                <th colspan="2">생산/판매</th>
                                                <th colspan="1" rowspan="2">구분</th>
                                                <th colspan="7">주간별판매</th>
                                                <th colspan="1" rowspan="2">전주<br>판매비</th>
                                                <th colspan="1" rowspan="2">정상</th>
                                                <th colspan="2">생산/판매</th>
                                                <th colspan="1" rowspan="2">구분</th>
                                                <th colspan="7">주간별판매</th>
                                                <th colspan="2">택가/판매가/할인율</th>
                                            </tr>
                                            <tr>
                                                <th>수량</th>
                                                <th>금액</th>
                                                <th>{{ choiceBe6Week }}</th>
                                                <th>{{ choiceBe5Week }}</th>
                                                <th>{{ choiceBe4Week }}</th>
                                                <th>{{ choiceBe3Week }}</th>
                                                <th>{{ choiceBe2Week }}</th>
                                                <th>{{ choiceBe1Week }}</th>
                                                <th>{{ choiceWeek }}</th>
                                                <th>수량</th>
                                                <th>금액</th>
                                                <th>{{ lastBe4Week }}</th>
                                                <th>{{ lastBe3Week }}</th>
                                                <th>{{ lastBe2Week }}</th>
                                                <th>{{ lastBe1Week }}</th>
                                                <th>{{ lastWeek }}</th>
                                                <th>{{ lastAf1Week }}</th>
                                                <th>{{ lastAf2Week }}</th>
                                                <th>{{ choiceYear }}</th>
                                                <th>{{ lastYear }}</th>
                                            </tr>
                                        </thead>
                                        <!-- SP계,SM계,FA계와 TOTAL을 tbody로 나눔 -->
                                        <tbody class="tbody_s">
                                            <!-- J4,L4 -->
                                            <template v-for="(data,index) in tableData">
                                            <tr :key="'A'+index">
                                                <!-- 선택년 -->
                                                <th rowspan="3" :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : '']">
                                                  <span class="tit_row" v-if="data.YSCD == 'SSUM' && data.SEASON == 'SPRING'">SP계</span>
                                                  <span class="tit_row" v-else-if="data.YSCD == 'SSUM' && data.SEASON == 'SUMMER'">SM계</span>
                                                  <span class="tit_row" v-else-if="data.YSCD == 'SSUM' && data.SEASON == 'FALL'">FA계</span>
                                                  <span class="tit_row" v-else-if="data.YSCD == 'SSUM' && data.SEASON == 'WINTER'">WI계</span>
                                                  <span class="tit_row" v-else>{{ data.YSCD }}</span>
                                                </th>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ data.INQTY | currency }}
                                                </td>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ Math.round(data.INAMT/1000000) | currency }}
                                                </td>

                                                <td>주간</td>
                                                <td class="tr">{{ data.SW7QTY | currency }}</td>
                                                <td class="tr">{{ data.SW6QTY | currency }}</td>
                                                <td class="tr">{{ data.SW5QTY | currency }}</td>
                                                <td class="tr">{{ data.SW4QTY | currency }}</td>
                                                <td class="tr">{{ data.SW3QTY | currency }}</td>
                                                <td class="tr">{{ data.SW2QTY | currency }}</td>
                                                <td class="tr">{{ data.SW1QTY | currency }}</td>
                                                <td rowspan="3">{{ rate(data.SW1QTY , saleDataTSUMHead.SW1QTY).toFixed(1) | nanToDot }}%</td>

                                                <!-- 작년 -->
                                                <th rowspan="3" :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : '']">
                                                  <span class="tit_row" v-if="data.YSCD == 'SSUM' && data.SEASON == 'SPRING'">SP계</span>
                                                  <span class="tit_row" v-else-if="data.YSCD == 'SSUM' && data.SEASON == 'SUMMER'">SM계</span>
                                                  <span class="tit_row" v-else-if="data.YSCD == 'SSUM' && data.SEASON == 'FALL'">FA계</span>
                                                  <span class="tit_row" v-else-if="data.YSCD == 'SSUM' && data.SEASON == 'WINTER'">WI계</span>
                                                  <span class="tit_row" v-else>{{ data.JYSCD }}</span>
                                                </th>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ data.JINQTY | currency }}
                                                </td>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ Math.round(data.JINAMT/1000000) | currency }}
                                                </td>

                                                <td>주간</td>
                                                <td class="tr">{{ data.JSW7QTY | currency }}</td>
                                                <td class="tr">{{ data.JSW6QTY | currency }}</td>
                                                <td class="tr">{{ data.JSW5QTY | currency }}</td>
                                                <td class="tr">{{ data.JSW4QTY | currency }}</td>
                                                <td class="tr">{{ data.JSW3QTY | currency }}</td>
                                                <td class="tr">{{ data.JSW2QTY | currency }}</td>
                                                <td class="tr">{{ data.JSW1QTY | currency }}</td>


                                                <td>{{ Math.round(data.PRICE/1000) | currency }}</td>
                                                <td>{{ Math.round(data.JPRICE/1000) | currency }}</td>
                                            </tr>
                                            <tr :key="'B'+index">
                                                <!-- 선택년 -->
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ data.SALQTY | currency }}
                                                </td>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ Math.round(data.SALAMT/1000000) | currency }}
                                                </td>

                                                <td>누계</td>
                                                <td class="tr">{{ data.NSW7QTY | currency }}</td>
                                                <td class="tr">{{ data.NSW6QTY | currency }}</td>
                                                <td class="tr">{{ data.NSW5QTY | currency }}</td>
                                                <td class="tr">{{ data.NSW4QTY | currency }}</td>
                                                <td class="tr">{{ data.NSW3QTY | currency | currency }}</td>
                                                <td class="tr">{{ data.NSW2QTY | currency }}</td>
                                                <td class="tr">{{ data.NSW1QTY | currency }}</td>

                                                <!-- 작년 -->
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ data.JSALQTY | currency }}
                                                </td>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  {{ Math.round(data.JSALAMT/1000000) | currency }}
                                                </td>

                                                <td>누계</td>
                                                <td class="tr">{{ data.JNSW7QTY | currency }}</td>
                                                <td class="tr">{{ data.JNSW6QTY | currency }}</td>
                                                <td class="tr">{{ data.JNSW5QTY | currency }}</td>
                                                <td class="tr">{{ data.JNSW4QTY | currency }}</td>
                                                <td class="tr">{{ data.JNSW3QTY | currency }}</td>
                                                <td class="tr">{{ data.JNSW2QTY | currency }}</td>
                                                <td class="tr">{{ data.JNSW1QTY | currency }}</td>


                                                <td>{{ Math.round(data.PRICE1/1000) | currency }}</td>
                                                <td>{{ Math.round(data.JPRICE1/1000) | currency }}</td>
                                            </tr>
                                            <tr :key="'C'+index">
                                                <!-- 선택년 -->
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  <strong>{{ data.INQTYPER }}%</strong>
                                                </td>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  <strong>{{ data.INAMTPER }}%</strong>
                                                </td>

                                                <td class="bg_point_col20">%</td>
                                                <td class="tr bg_point_col20">{{ data.SW7PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.SW6PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.SW5PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.SW4PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.SW3PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.SW2PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.SW1PER }}%</td>

                                                <!-- 작년 -->
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  <strong>{{ data.JINQTYPER }}%</strong>
                                                </td>
                                                <td :class="[data.YSCD == 'SSUM' && (data.SEASON == 'SPRING' || data.SEASON == 'SUMMER' || data.SEASON == 'FALL' ||data.SEASON == 'WINTER') ? 'bg_point_col19' : 'tr']">
                                                  <strong>{{ data.JINAMTPER }}%</strong>
                                                </td>

                                                <td class="bg_point_col20">%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW7PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW6PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW5PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW4PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW3PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW2PER }}%</td>
                                                <td class="tr bg_point_col20">{{ data.JSW1PER }}%</td>

                                                <td class="bg_point_col20">{{ data.SWRPICEPER }}%</td>
                                                <td class="bg_point_col20">{{ data.JSWRPICEPER }}%</td>
                                            </tr>
                                            </template>
                                        </tbody>


                                        <!-- TOTAL -->
                                        <tbody class="sum tbody_s" style="background-color:#FFFFE6 !important;">
                                            <tr>
                                                <th rowspan="3" class="bg_point_col19" style="background-color:#FFFFE6 !important;"><span class="tit_row">TOTAL</span></th>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;">{{ saleDataTSUMHead.INQTY | currency }}</td>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;">{{ Math.round(saleDataTSUMHead.INAMT/1000000) | currency }}</td>

                                                <td>주간</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW7QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW6QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW5QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW4QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW3QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW2QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW1QTY | currency }}</td>
                                                <td rowspan="3">{{ rate(saleDataTSUMHead.SW1QTY , saleDataTSUMHead.SW1QTY) | nanToDot }}%</td>

                                                <th rowspan="3"><span class="tit_row">TOTAL</span></th>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;">{{ saleDataTSUMHead.JINQTY | currency }}</td>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;">{{ Math.round(saleDataTSUMHead.JINAMT/1000000) | currency }}</td>

                                                <td>주간</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW7QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW6QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW5QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW4QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW3QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW2QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW1QTY | currency }}</td>


                                                <td>{{ Math.round(saleDataTSUMHead.PRICE/1000) | currency }}</td>
                                                <td>{{ Math.round(saleDataTSUMHead.JPRICE/1000) | currency }}</td>
                                            </tr>
                                            <tr>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;">{{ saleDataTSUMHead.SALQTY | currency }}</td>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;">{{ Math.round(saleDataTSUMHead.SALAMT/1000000) | currency }}</td>

                                                <td>누계</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW7QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW6QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW5QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW4QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW3QTY | currency | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW2QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.NSW1QTY | currency }}</td>

                                                <td class="tr" style="background-color:#FFFFE6 !important;">{{ saleDataTSUMHead.JSALQTY | currency }}</td>
                                                <td class="tr" style="background-color:#FFFFE6 !important;">{{ Math.round(saleDataTSUMHead.JSALAMT/1000000) | currency }}</td>

                                                <td>누계</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW7QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW6QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW5QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW4QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW3QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW2QTY | currency }}</td>
                                                <td class="tr">{{ saleDataTSUMHead.JNSW1QTY | currency }}</td>


                                                <td>{{ Math.round(saleDataTSUMHead.PRICE1/1000) | currency }}</td>
                                                <td>{{ Math.round(saleDataTSUMHead.JPRICE1/1000) | currency }}</td>
                                            </tr>
                                            <tr>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;"><strong>{{ saleDataTSUMHead.INQTYPER }}%</strong></td>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;"><strong>{{ saleDataTSUMHead.INAMTPER }}%</strong></td>

                                                <td>%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW7PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW6PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW5PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW4PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW3PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW2PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.SW1PER }}%</td>

                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;"><strong>{{ saleDataTSUMHead.JINQTYPER }}%</strong></td>
                                                <td class="tr bg_point_col19" style="background-color:#FFFFE6 !important;"><strong>{{ saleDataTSUMHead.JINAMTPER }}%</strong></td>

                                                <td>%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW7PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW6PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW5PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW4PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW3PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW2PER }}%</td>
                                                <td class="tr">{{ saleDataTSUMHead.JSW1PER }}%</td>

                                                <td>{{ saleDataTSUMHead.SWRPICEPER }}%</td>
                                                <td>{{ saleDataTSUMHead.JSWRPICEPER }}%</td>
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
    
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

export default {
  name: "WEE0401",
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
      red:null,
      drawer: null,
      selectSucd: null,
      selectSunm: "MI",
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
      choiceDay: null,
      choiceBe1Day: null,
      choiceYear: null,
      choiceMonth: null,
      choiceWeek: null,
      choiceBe1Week: null,
      choiceBe2Week: null,
      choiceBe3Week: null,
      choiceBe4Week: null,
      choiceBe5Week: null,
      choiceBe6Week: null,
      lastYear: null,
      lastWeek: null,
      lastAf1Week: null,
      lastAf2Week: null,
      lastBe1Week: null,
      lastBe2Week: null,
      lastBe3Week: null,
      lastBe4Week: null,
      lastBe5Week: null,
      lastBe6Week: null,
      foreign: "f_include",
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ],
      saleData: [], // 시즌별 데이터
      saleDataSSUM: [], // 분기별 데이터
      saleDataTSUM: [], // TOTAL 데이터
      // tableData: [], //  saleData+saleDataSSUM+saleDataTSUM 데이터
      saleDataGraph: [], // 그래프 데이터
      graphWeek: []  // 그래프 날짜
    }
  },
  created() {
    this.year = moment().format("YYYY");
    this.month = moment().format("M");

    // 달력 디폴트 날짜
    this.calDate = moment().day('Sunday').format('YYYY-MM-DD')
    // 기준일 시작 날짜
    this.standardStartDate = moment(this.calDate).subtract(6, 'days').format('YY-MM-DD')
    // 기준일 끝 날짜
    this.standardEndDate = moment(this.calDate).format('YY-MM-DD')

    let calDateMoment = moment(this.calDate, 'YYYY-MM-DD')

    // 선택한 날짜
    this.choiceDay = calDateMoment.clone().format('YYYYMMDD')
    // 선택한 날짜의 1년전
    this.choiceBe1Day = calDateMoment.clone().subtract(1, 'year').week(moment(calDateMoment).week()).day(0).format('YYYYMMDD')

    // 선택한 년도
    this.choiceYear = calDateMoment.clone().format('YYYY')
    // 선택한 월
    this.choiceMonth = calDateMoment.clone().format('MM')
    // 선택한 날짜
    this.choiceWeek = calDateMoment.clone().format('MM/DD')
    // 선택한 날짜 1주전
    this.choiceBe1Week = calDateMoment.clone().subtract(1, 'week').format('MM/DD')
    // 선택한 날짜 2주전
    this.choiceBe2Week = calDateMoment.clone().subtract(2, 'week').format('MM/DD')
    // 선택한 날짜 3주전
    this.choiceBe3Week = calDateMoment.clone().subtract(3, 'week').format('MM/DD')
    // 선택한 날짜 4주전
    this.choiceBe4Week = calDateMoment.clone().subtract(4, 'week').format('MM/DD')
    // 선택한 날짜 5주전
    this.choiceBe5Week = calDateMoment.clone().subtract(5, 'week').format('MM/DD')
    // 선택한 날짜 6주전
    this.choiceBe6Week = calDateMoment.clone().subtract(6, 'week').format('MM/DD')

    // 작년
    this.lastYear = calDateMoment.clone().subtract(1, 'year').format('YYYY')
    // 작년 날짜
    this.lastWeek = calDateMoment.clone().subtract(1, 'year').week(moment(calDateMoment).week()).day(0).format('MM/DD')
    // 작년 날짜 1주후
    this.lastAf1Week = moment(this.lastWeek, 'MM/DD').add(1, 'week').format('MM/DD')
    // 작년 날짜 2주후
    this.lastAf2Week = moment(this.lastWeek, 'MM/DD').add(2, 'week').format('MM/DD')
    // 작년 날짜 1주전
    this.lastBe1Week = moment(this.lastWeek, 'MM/DD').subtract(1, 'week').format('MM/DD')
    // 작년 날짜 2주전
    this.lastBe2Week = moment(this.lastWeek, 'MM/DD').subtract(2, 'week').format('MM/DD')
    // 작년 날짜 3주전
    this.lastBe3Week = moment(this.lastWeek, 'MM/DD').subtract(3, 'week').format('MM/DD')
    // 작년 날짜 4주전
    this.lastBe4Week = moment(this.lastWeek, 'MM/DD').subtract(4, 'week').format('MM/DD')
    // 작년 날짜 5주전
    this.lastBe5Week = moment(this.lastWeek, 'MM/DD').subtract(5, 'week').format('MM/DD')
    // 작년 날짜 6주전
    this.lastBe6Week = moment(this.lastWeek, 'MM/DD').subtract(6, 'week').format('MM/DD')

    console.log("4 data >>> "+this.data+" / "+this.selectSucd)
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
    tableData() {
      const tableData = []
      for(const saleData of this.saleData) {
        tableData.push(saleData)
        let item
        if(saleData.YSCD.includes("3")){
          item = _.find(this.saleDataSSUM, {SEASON: "SPRING"})
        } else if(saleData.YSCD.includes("6")){
          item = _.find(this.saleDataSSUM, {SEASON: "SUMMER"})
        } else if(saleData.YSCD.includes("9")){
          item = _.find(this.saleDataSSUM, {SEASON: "FALL"})
        } else if(saleData.YSCD.includes("C")){
          item = _.find(this.saleDataSSUM, {SEASON: "WINTER"})
        }
        tableData.push(item)
      }
      return _.compact(tableData)
    },
    saleDataTSUMHead() {
      return _.head(this.saleDataTSUM) || {}
    }
  },
  methods: {
    changeData() {
      // 기준일 시작 날짜
      this.standardStartDate = moment(this.calDate).subtract(6, 'days').format('YY-MM-DD')
      // 기준일 끝 날짜
      this.standardEndDate = moment(this.calDate).format('YY-MM-DD')

      let calDateMoment = moment(this.calDate, 'YYYY-MM-DD')

      // 선택한 날짜
      this.choiceDay = calDateMoment.clone().format('YYYYMMDD')
      // 선택한 날짜의 1년전
      this.choiceBe1Day = calDateMoment.clone().subtract(1, 'year').week(moment(calDateMoment).week()).day(0).format('YYYYMMDD')

      // 선택한 년도
      this.choiceYear = calDateMoment.clone().format('YYYY')
      // 선택한 월
      this.choiceMonth = calDateMoment.clone().format('MM')
      // 선택한 날짜
      this.choiceWeek = calDateMoment.clone().format('MM/DD')
      // 선택한 날짜 1주전
      this.choiceBe1Week = calDateMoment.clone().subtract(1, 'week').format('MM/DD')
      // 선택한 날짜 2주전
      this.choiceBe2Week = calDateMoment.clone().subtract(2, 'week').format('MM/DD')
      // 선택한 날짜 3주전
      this.choiceBe3Week = calDateMoment.clone().subtract(3, 'week').format('MM/DD')
      // 선택한 날짜 4주전
      this.choiceBe4Week = calDateMoment.clone().subtract(4, 'week').format('MM/DD')
      // 선택한 날짜 5주전
      this.choiceBe5Week = calDateMoment.clone().subtract(5, 'week').format('MM/DD')
      // 선택한 날짜 6주전
      this.choiceBe6Week = calDateMoment.clone().subtract(6, 'week').format('MM/DD')

      // 작년
      this.lastYear = calDateMoment.clone().subtract(1, 'year').format('YYYY')
      // 작년 날짜
      this.lastWeek = calDateMoment.clone().subtract(1, 'year').week(moment(calDateMoment).week()).day(0).format('MM/DD')
      // 작년 날짜 1주후
      this.lastAf1Week = moment(this.lastWeek, 'MM/DD').add(1, 'week').format('MM/DD')
      // 작년 날짜 2주후
      this.lastAf2Week = moment(this.lastWeek, 'MM/DD').add(2, 'week').format('MM/DD')
      // 작년 날짜 1주전
      this.lastBe1Week = moment(this.lastWeek, 'MM/DD').subtract(1, 'week').format('MM/DD')
      // 작년 날짜 2주전
      this.lastBe2Week = moment(this.lastWeek, 'MM/DD').subtract(2, 'week').format('MM/DD')
      // 작년 날짜 3주전
      this.lastBe3Week = moment(this.lastWeek, 'MM/DD').subtract(3, 'week').format('MM/DD')
      // 작년 날짜 4주전
      this.lastBe4Week = moment(this.lastWeek, 'MM/DD').subtract(4, 'week').format('MM/DD')
      // 작년 날짜 5주전
      this.lastBe5Week = moment(this.lastWeek, 'MM/DD').subtract(5, 'week').format('MM/DD')
      // 작년 날짜 6주전
      this.lastBe6Week = moment(this.lastWeek, 'MM/DD').subtract(6, 'week').format('MM/DD')

      // 작년 같은 시즌
      this.lastseasonStartYear = String.fromCharCode(this.seasonStartYear.charCodeAt()-1)
      this.lastseasonStartMonth = this.seasonStartMonth
      this.lastseasonEndYear = String.fromCharCode(this.seasonEndYear.charCodeAt()-1)
      this.lastseasonEndMonth = this.seasonEndMonth

      this.loadData()
    },
    bold(id){
      let yearId = id.substr(0,4)
      let splitId = id.split(yearId)

      if($("#"+(yearId-1)+splitId[1]).hasClass("click_text") == true) {
        $("#"+(yearId-1)+splitId[1]).removeClass('click_text')
      } else {
        $("#"+(yearId-1)+splitId[1]).addClass('click_text')
      }
    },
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }

      if(this.seasonStartYear == this.seasonEndYear ) {
        this.get0401MakeDataDate()
        this.getWeeklyGraph()
        this.getWeeklySale()
        this.getWeeklySSUM()
        this.getWeeklyTSUM()
      } else {
        alert("동일 시즌만 조회 가능 합니다.")
      }
    },
    changeSucd(code , codenm) {
      this.selectSucd = code
      this.selectSunm = codenm

      if(this.seasonStartYear == this.seasonEndYear ) {
        this.changeData()
        // this.getWeeklyGraph()
        // this.getWeeklySale()
        // this.getWeeklySSUM()
        // this.getWeeklyTSUM()
      } else {
        alert("동일 시즌만 조회 가능 합니다.")
      }
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
    get0401MakeDataDate(){
      this.req2svr.get0401MakeDataDate().then(
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
    getWeeklySale: function() {
      // 시즌별 데이터
      this.req2svr.getWeeklySale(this.selectSucd, 
                                 this.seasonStartYear, this.seasonStartMonth, 
                                 this.seasonEndYear, this.seasonEndMonth, 
                                 this.lastseasonStartYear, this.lastseasonStartMonth,
                                 this.lastseasonEndYear, this.lastseasonEndMonth,
                                 this.choiceDay, this.choiceBe1Day).then(
        res => {
          this.saleData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.saleData.push(res)
            } else {
              this.saleData = JSON.parse("[" + res + "]")
            }
            // this.getWeeklySSUM()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getWeeklySSUM: function() {
      // 분기별 데이터
      this.req2svr.getWeeklySSUM(this.selectSucd, 
                                 this.seasonStartYear, this.seasonStartMonth, 
                                 this.seasonEndYear, this.seasonEndMonth, 
                                 this.lastseasonStartYear, this.lastseasonStartMonth,
                                 this.lastseasonEndYear, this.lastseasonEndMonth,
                                 this.choiceDay, this.choiceBe1Day).then(
        res => {
          this.saleDataSSUM = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.saleDataSSUM.push(res)
            } else {
              this.saleDataSSUM = JSON.parse("[" + res + "]")
            }
            // this.getWeeklyTSUM()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getWeeklyTSUM: function() {
      // TOTAL 데이터
      this.req2svr.getWeeklyTSUM(this.selectSucd, 
                                 this.seasonStartYear, this.seasonStartMonth, 
                                 this.seasonEndYear, this.seasonEndMonth, 
                                 this.lastseasonStartYear, this.lastseasonStartMonth,
                                 this.lastseasonEndYear, this.lastseasonEndMonth,
                                 this.choiceDay, this.choiceBe1Day).then(
        res => {
          this.saleDataTSUM = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.saleDataTSUM.push(res)
            } else {
              this.saleDataTSUM = JSON.parse("[" + res + "]")
            }
          }
          // this.getWeeklyGraph()
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getWeeklyGraph(){
      // 그래프 데이터
      this.req2svr.getWeeklyGraph(this.selectSucd, 
                                 this.seasonStartYear, this.seasonStartMonth, 
                                 this.seasonEndYear, this.seasonEndMonth, 
                                 this.lastseasonStartYear, this.lastseasonStartMonth,
                                 this.lastseasonEndYear, this.lastseasonEndMonth,
                                 this.choiceDay, this.choiceBe1Day).then(
        res => {
          this.saleDataGraph = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.saleDataGraph.push(res)
            } else {
              this.saleDataGraph = JSON.parse("[" + res + "]")
            }
            this.makeWeeklyChart()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getWeeklyChartData(){
        let returnData = []

        const regex = /^SW/
        let renewData = _(this.saleDataGraph).groupBy('GU').mapValues(listData => {
          const objectData = _.head(listData) || {}
          const filteredData = _(objectData).toPairs().filter((v, k) => {
          return regex.test(_.head(v))
          } ).sortBy(v => {
            const key = _.head(v)
            return `${key.length}${key}`
          })
          .reverse()
          .value()
          return _.map(filteredData, v => _.get(v, '1'))
        }).value() 

        let calDateMoment = moment(this.calDate, 'YYYY-MM-DD')

        // 선택한 날짜 13주전
        for(let i=0; i<13; i++) {
          this.graphWeek[i] = calDateMoment.clone().subtract(13-i, 'week').format('MM/DD')
        }

        // 선택한 날짜
        this.graphWeek[13] = calDateMoment.clone().format('MM/DD')

        // 선택한 날짜 7주후
        for(let i=0; i<7; i++) {
          this.graphWeek[i+14] = calDateMoment.clone().add(i+1, 'week').format('MM/DD')
        }

        for(let i=0; i<21; i++){
          let data = {}
          data.month = this.graphWeek[i]
          // 작년 막대 그래프
          data.ly = renewData.LY[i]
          // 선택년 막대 그래프
          data.ty = renewData.TY[i]
          // 작년 꺽은선 그래프
          data.lyacc = renewData.LYACC[i]
          // 선택년 꺽은선 그래프
          data.tyacc = renewData.TYACC[i]
          
          returnData.push(data)
        }

        return returnData
    },
    makeWeeklyChart() {
      let chartData = this.getWeeklyChartData()

      AmCharts.makeChart("salesChart1", {
        "type": "serial",
        "categoryField": "month",
        "startDuration": 0.5,
        "startEffect": "easeInSine",
        "categoryAxis": {
          "gridPosition": "start",
          "gridThickness": 0
        },
        "chartCursor": {
          "enabled": true,
          "zoomable": false,
          "cursorPosition": "mouse"
        },
        "trendLines": [],
        "graphs": [
          {
            "fillAlphas": 1,
            "fixedColumnWidth": 20,
            "id": "AmGraph-1",
            "lineAlpha": 0,
            "lineColor": "#AAB3B3",
            "title": this.lastYear + " 주간판매수량",
            "type": "column",
            "labelText": "[[value]]",
            "labelOffset": 10,
            "labelPosition": "top",
			      "showBalloon": false,
            "valueField": "ly",
            "markerType": "circle"
          },
          {
            "fillAlphas": 1,
            "fixedColumnWidth": 20,
            "id": "AmGraph-2",
            "lineColor": "#2F8FFD",
            "title": this.choiceYear + " 주간판매수량",
            "type": "column",
            "labelText": "[[value]]",
            "labelOffset": 10,
            "labelPosition": "top",
            "showBalloon": false,
            "valueField": "ty",
            "markerType": "circle"
            
          },
          {
            "balloonText": this.lastYear + " 누적판매수량 : [[value]]개",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "id": "AmGraph-3",
            "lineColor": "rgb(255, 173, 186)",
            "title": this.lastYear + " 누적판매수량",
            "topRadius": 0,
            "valueAxis": "ValueAxis-2",
            "valueField": "lyacc",
            "markerType": "circle"
          },
          {
            "balloonText": this.choiceYear + " 누적판매수량 : [[value]]개",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "id": "AmGraph-4",
            "lineColor": "rgb(250, 99, 122)",
            "title": this.choiceYear + " 누적판매수량",
            "topRadius": 0,
            "valueAxis": "ValueAxis-2",
            "valueField": "tyacc",
            "markerType": "circle"
          }
        ],
        "guides": [],
        "valueAxes": [
          {
            "id": "ValueAxis-1",
            "autoGridCount": false,
            //"minimum": 0,
            "gridCount": 3,
            "gridThickness": 0,
            "tickLength": 0,
            // "title": "(개)",
            "titleBold": false,
            "titleRotation": 0
          },
          {
            "id": "ValueAxis-2",
            "autoGridCount": false,
            "position": "right",
            // "minimum": 0,
            "gridCount": 4,
            "gridThickness": 0,
            "tickLength": 0,
            // "title": "(개)",
            "titleBold": false,
            "titleRotation": 0
          }
        ],
        "balloon": {
          "borderThickness": 1
        },
        "legend": {
          "enabled": true,
          "align": "center",
          "fontSize": 18,
          "position": "bottom"
        },
        "dataProvider": chartData
      });
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