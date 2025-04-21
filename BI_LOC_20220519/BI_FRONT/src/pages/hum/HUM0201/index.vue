<template>
        <!-- 팝업용 레이아웃 클래스 : popup_layout -->
        <div class="wrap popup_layout">

        <!-- data-watermark 에 사번 입력 -->
        <!-- <div class="watermark_wrap" style="top: 25%">
          <p class="watermark" :data-watermark="EmpCd"></p>
          <p class="watermark" :data-watermark="EmpCd"></p>
          <p class="watermark" :data-watermark="EmpCd"></p>
        </div>
        <div class="watermark_wrap" style="top: 75%">
          <p class="watermark" :data-watermark="EmpCd"></p>
          <p class="watermark" :data-watermark="EmpCd"></p>
          <p class="watermark" :data-watermark="EmpCd"></p>
        </div> -->

        <!-- popup close button -->
        <div class="btn_pop_close" role="button" @click="close()"><i class="material-icons">close</i></div>
        <div class="container cont_info">
            <div class="content">
                <div class="row">
                    <div class="col_md_3 info_view">
                        <div class="box" style="top: -5px">
                            <div class="inner">
                                <div class="num_box2">
                                    <small>{{leftInfoData.SUNM}}</small>
                                    <hr>
                                    <strong>{{leftInfoData.AMTRATINGNM}}</strong>
                                </div>
                                <!-- 여성 : w, 남성 : m / 기본 사진을 여성으로 해놓았음 -->
                                <div class="img_photo w"><img :src="leftInfoData.PHOTOPATH" alt="" style="width:80%;" /></div>
                                <div class="box_info">
                                    <p class="txt ">{{leftInfoData.NAME}} SD
                                        <span class="chip chip_m point_col14 point_box14"><span class="chip_text">{{leftInfoData.JAEJIGNM}}</span></span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="inner">
                                <div class="graph_list">
                                    <ul class="list">
                                        <li>
                                            <em class="txt_month">{{ currentYear -1 }}</em>
                                            <span class="graph_cont">
                                                <div class="view">
                                                    <span class="title">연매출합계</span>
                                                    <span class="cont">{{ (leftInfoData.ONEYEAR_AGO_AMT/100000000).toFixed(1) | currency }} 억</span>
                                                </div>
                                                <div class="desc">
                                                    <span class="title">(월평균)</span>
                                                    <span class="cont">{{ (leftInfoData.ONEAVGAMT/100000000).toFixed(1) | currency }} 억</span>
                                                </div>
                                            </span>
                                        </li>
                                        <li>
                                            <em class="txt_month">{{ currentYear -2 }}</em>
                                            <span class="graph_cont">
                                                <div class="view">
                                                    <span class="title">연매출합계</span>
                                                    <span class="cont point_col15">{{ (leftInfoData.TWOYEAR_AGO_AMT/100000000).toFixed(1) | currency }} 억</span>
                                                </div>
                                                <div class="desc">
                                                    <span class="title">(월평균)</span>
                                                    <span class="cont">{{ (leftInfoData.TWOAVGAMT/100000000).toFixed(1) | currency }} 억</span>
                                                </div>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        

                        <div class="info_list list_sty01">
                            <ul class="list">
                                <li>
                                    <strong class="title">사업부</strong>
                                    <span class="cont">{{leftInfoData.SUNM}}</span>
                                </li>
                                <li>
                                    <strong class="title">근무지</strong>
                                    <span class="cont point_col16">{{leftInfoData.VDSNM}}({{leftInfoData.CHGUNM}})</span>
                                </li>
                                <li>
                                    <strong class="title">자택</strong>
                                    <span class="cont">{{leftInfoData.SI}} {{leftInfoData.GU}}</span>
                                </li>
                                <li>
                                    <strong class="title">출생년도 / 결혼여부</strong>
                                    <span v-if="leftInfoData.MARRYYN == 1" class="cont">{{leftInfoData.BIRTHYEAR}} / 기혼</span>
                                    <span v-else-if="leftInfoData.MARRYYN == 2" class="cont">{{leftInfoData.BIRTHYEAR}} / 미혼</span>
                                    <span v-else class="cont">{{leftInfoData.BIRTHYEAR}} / -</span>
                                </li>
                                <li>
                                    <strong class="title">입사일</strong>
                                    <span class="cont">{{leftInfoData.STDT}}</span>
                                </li>
                                <li>
                                    <strong class="title">연락처</strong>
                                    <span class="cont">{{leftInfoData.PHONE}}</span>
                                </li>
                                <li>
                                    <strong class="title">이메일</strong>
                                    <span class="cont">{{leftInfoData.EMAIL}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col_md_9">
                        <div class="inner">
                            <!-- Tab 그룹 영역 -->
                            <div class="toggle_group">
                                <label class="tg_btn" for="tg1_1">
                                    <input name="tg1" class="tg_radio" id="tg1_1" type="radio" v-model="gubun" value="1">
                                    <span class="btn_n txt_label" @click="controlTab(1)">기본정보</span>
                                </label>
                                <label class="tg_btn" for="tg1_2">
                                    <input name="tg1" class="tg_radio" id="tg1_2" type="radio" v-model="gubun" value="2">
                                    <span class="btn_n txt_label" @click="controlTab(2)">매출정보</span>
                                </label>
                                <label class="tg_btn" for="tg1_3">
                                    <input name="tg1" class="tg_radio" id="tg1_3" type="radio" v-model="gubun" value="3">
                                    <span class="btn_n txt_label" @click="controlTab(3)">Style Top 10</span>
                                </label>
                                <div class="layout_spacer"></div>
                                <span class="sub_title">
                                      (최종 정보수정일: {{leftInfoData.UPDDT}})
                                </span>
                            </div>

                            <!-- 기본정보-->
                            <div v-show="gubun == 1">
                                <!-- 메인 정보 영역 -->
                                <div class="hum_list_box mb20">
                                    <div class="list_card">
                                        <ul class="list">
                                            <li class="list_card_item">
                                                <span class="list_card_item_main">
                                                    <!-- LEFT -->
                                                    <small class="sm_label">매출기준 판매등급</small><br>
                                                    <em class="em_cate">[{{ bagicInfoTopData.CHGUNM }}]</em>
                                                </span>
                                                <em class="em_grade fr">{{ bagicInfoTopData.AMTRATINGNM }}</em>
                                            </li>
                                            <li class="list_card_item_sub">
                                              <span v-for="data in ratingInfoData" :key="data.MEMO" style="margin-right: 10px">
                                                <span class="chip round_chip">{{ data.MEMO }}</span><span class="txt">{{ data.CODNM }}</span>
                                              </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="list_card">
                                        <ul class="list">
                                            <li class="list_card_item">
                                                <span class="list_card_item_main">
                                                    <!-- LEFT -->
                                                    <em class="em_year">{{ currentYear }}</em><br>
                                                    <small>매출누계</small>
                                                </span>
                                                <span class="fr">
                                                    <em class="em_total vb">{{ Math.round(bagicInfoTopData.CUYEAR_AMT/1000000) | currency }}</em>
                                                    <small class="sm_unit">백만원</small>
                                                </span>

                                            </li>
                                            <li class="list_card_item_sub fr">
                                                <em class="em_ave">(월평균매출 {{ Math.round(bagicInfoTopData.CUYEAR_AVG/1000000) | currency }}백만원)</em>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <!-- 메인 정보 영역 끝 -->

                                <div class="grid_wrap">
                                    <div class="grid_col_1 grid_row_1">
                                        <!-- box1 -->
                                        <div class="cont_box">
                                            <div class="tit">
                                                <strong class="tit_txt">주요경력</strong>
                                            </div>
                                            <div class="cont scroll_cont" style="height: 100%">
                                                <ul class="history_view watermark" :style="{background:Bg}">
                                                    <li v-for="data in career" :key="data">• {{ data }} </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid_col_2 grid_row_1 grid_row_sp_2">
                                        <!-- box1 -->
                                        <div class="cont_box" style="height: 674px;">
                                            <div class="tit">
                                                <div class="tab">
                                                  <ul>
                                                    <li :class="{on: infoTab == 0}"><a href="javascript:void(0);" @click="chageInfoTab(0)">특이사항</a></li>
                                                    <li :class="{on: infoTab == 1}"><a href="javascript:void(0);" @click="chageInfoTab(1)">추가정보</a></li>
                                                  </ul>
                                                </div>
                                            </div>
                                            <div v-show="infoTab == 0" id="chartdiv" class="cont watermark" style="height:328px;" :style="{background:Bg}"></div>
                                            <ul  v-show="infoTab == 0" class="special_wrap cont">
                                                <li class="special_item watermark" :style="{background:Bg, 'background-color':'#FFFFF1'}" v-for="(data, index) in specialComment" :key="data.index">
                                                    <div class="tc num" v-show="data != 0">{{ index+1 }}</div>
                                                    <div class="tc txt">
                                                        {{ data }}
                                                    </div>
                                                </li>
                                            </ul>
                                            <div v-show="infoTab == 1" class="add_info_list">
                                              <ul class="list">
                                                <li class="watermark" :style="{background:Bg}">
                                                  <strong class="title">유통마진</strong>
                                                  <span class="cont">정상({{ additionalInfoData.CHGUMGNORMAL | nanToDot }}%)<span v-if="sucd != 1"> / 행사({{ additionalInfoData.CHGUMGEVENT | nanToDot }}%)</span></span>
                                                </li>
                                                <li class="watermark" :style="{background:Bg, 'background-color':'#e9ecef'}">
                                                  <strong class="title">매니저 수수료</strong>
                                                  <span class="cont">정상({{ additionalInfoData.SDMGNORMAL | nanToDot }}%)<span v-if="sucd != 1"> / 행사({{ additionalInfoData.SDMGEVENT | nanToDot }}%)</span><span v-if="sucd == 4"> / 온라인({{ additionalInfoData.SDMGONLINE | nanToDot }}%)</span><span v-if="sucd == 3">  / 위탁({{ additionalInfoData.SDMGTRUST | nanToDot }}%)</span></span>
                                                </li>
                                                <li class="watermark" :style="{background:Bg}">
                                                  <strong class="title">보증금</strong>
                                                  <span class="cont" v-if="chgucd == 3">현금 {{ additionalInfoData.SEC_CASH | currency }}원 / 부동산 {{ additionalInfoData.SEC_INSU | currency }}원</span>
                                                  <span class="cont" v-else>현금 {{ additionalInfoData.SEC_CASH | currency }}원 / 보증보험 {{ additionalInfoData.SEC_INSU | currency }}원</span>
                                                </li>
                                                <li class="watermark" :style="{background:Bg, 'background-color':'#e9ecef'}">
                                                  <strong class="title">바이어 현황</strong>
                                                  <span class="cont">
                                                    <p v-for="(buyer, index) in additionalInfoData.BUYERLIST" :key="index">{{ buyer }}</p>
                                                  </span>
                                                </li>
                                              </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid_col_1 grid_row_2">
                                        <!-- box1 -->
                                        <div class="cont_box">
                                            <div class="tit">
                                                <strong class="tit_txt">영업담당 (작성책임자)</strong>
                                                <div class="layout_spacer"></div>
                                                <div class="btns_wrap" v-show="salesManInfoLength > 1">
                                                  <a class="btn_icon" :class="{'disabled': salesManCnt == 0}" href="javascript:void(0);" @click="minusIndex()"><i class="material-icons">keyboard_arrow_left</i></a>
                                                  <a class="btn_icon" :class="{'disabled': salesManCnt == salesManInfoLength-1}" href="javascript:void(0);" @click="plusIndex()"><i class="material-icons">keyboard_arrow_right</i></a>
                                                </div>
                                            </div>
                                            <div class="people_card row np nm h100 watermark" :style="{background:Bg}" v-for="(data,index) in salesManInfo" :key="data.SEQ" v-show="index == salesManCnt">
                                                <div class="col_md_4">
                                                    <div class="people_photo_wrap">
                                                        <img class="point_box1 circle" src="@/assets/images/bg_designer_w.png">
                                                        <span class="chip round_chip bg_point_col1" v-show="index == 0">
                                                           <span class="chip_text">현</span> 
                                                        </span>
                                                    </div>

                                                    <div class="people_profile">
                                                        <strong>{{data.REGDEPTNM}} {{data.REGNAME}} {{data.POSITNNM}}</strong>
                                                        <div>
                                                            <span>
                                                                <i class="material-icons">phone</i>
                                                                <span class="txt vb">{{data.REGTEL}}</span>
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <span>
                                                                <i class="material-icons">stay_current_portrait</i>
                                                                <span class="txt vb">{{data.REGPHONE}}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col_md_8">
                                                    <ul class="people_comment_wrap">
                                                        <!-- <li class="people_comment" v-for="data in managerComment" :key="data"> -->
                                                        <li class="people_comment" v-for="comment in data.REGCOMMENT" :key="comment">
                                                            <span>
                                                                <i class="material-icons">mode_comment</i>
                                                                <span class="txt">{{ comment }}</span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 기본정보 끝 -->

                            <!-- 매출정보 -->
                            <div v-show="gubun == 2">
                                <div class="hum_summary_wrap">
                                    <span>
                                        <strong>{{leftInfoData.NAME}} SD {{ currentYear }} 매출</strong>
                                        <!-- <small>(19.03.17 ~ 19.04.16)</small> -->
                                    </span>

                                </div>

                                <div class="list_box mt20">
                                    <ul class="list_card">
                                        <li>
                                            <!-- card_누적매출합계 -->
                                            <div class="card card_mini">
                                                <div class="card_title">
                                                    <h4 class="card_title_text">누적매출합계</h4>
                                                </div>
                                                <div class="card_content">
                                                    <strong class="em_obj">{{ Math.round(accumulatedSalesData.TSAMT / 1000000) | currency }}<small class="txt">백만원</small></strong>
                                                    <dl class="list_obj">
                                                        <dt class="tit">선수금</dt>
                                                        <dd class="txt txt_s">{{ Math.round(salesInfoData.ADVDEPAMT / 1000000) | currency }} 백만원</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <!-- card_브랜드 평균할인율 -->
                                            <div class="card card_mini">
                                                <div class="card_title">
                                                    <h4 class="card_title_text">사업부 평균할인율</h4>
                                                </div>
                                                <div class="card_content">
                                                    <strong class="em_obj">
                                                        {{ salesInfoData.BR_DCAVG }}<small class="txt">%</small>
                                                    </strong>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <!-- card_평균할인율 -->
                                            <div class="card card_mini">
                                                <div class="card_title">
                                                    <h4 class="card_title_text">매장평균할인율</h4>
                                                </div>
                                                <div class="card_content">
                                                    <strong class="em_obj">{{ salesInfoData.DCAVG }}<small class="txt">%</small></strong>
                                                    <dl class="list_obj">
                                                        <dt class="tit">TAG가</dt>
                                                        <dd class="txt txt_s">{{ Math.round(salesInfoData.TTAGPRI / 1000000) | currency }} 백만원</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <!-- card_반품율 -->
                                            <div class="card card_mini">
                                                <div class="card_title">
                                                    <h4 class="card_title_text">반품율</h4>
                                                </div>
                                                <div class="card_content">
                                                    <strong class="em_obj">{{ salesInfoData.RPER }}<small class="txt">%</small></strong>
                                                    <dl class="list_obj">
                                                        <dt class="tit">판매</dt>
                                                        <dd class="txt txt_s">{{ salesInfoData.SQTY | currency }}</dd>
                                                        <dt class="tit">반품</dt>
                                                        <dd class="txt txt_s">{{ salesInfoData.RQTY | currency }}</dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div class="row row_box">
                                    <div class="col_md_6">
                                        <!-- box1 -->
                                        <div class="cont_box">
                                            <div class="tit">
                                                <strong class="tit_txt">누적 판매실적</strong>
                                            </div>
                                            <!-- //scrolling card -->
                                            <div class="cont">
                                                <div class="graph_area">
                                                    <!-- 그래프 1 -->
                                                    <div class="graph_view">
                                                        <!-- 텍스트 값 -->
                                                        <div class="graph_result">
                                                            <dl>
                                                                <dt class="tit">누적수량</dt>
                                                                <dd class="txt_result">{{ accumulatedSalesData.ACC_QTY | currency }}</dd>
                                                                <dt class="tit">(개)</dt>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                    <div class="graph_view">
                                                        <!-- 텍스트 값 -->
                                                        <div class="graph_result">
                                                            <dl>
                                                                <dt class="tit">누적매출합계</dt>
                                                                <dd class="txt_result">{{ Math.round(accumulatedSalesData.TSAMT / 1000000) | currency }}</dd>
                                                                <dt class="tit">(백만원)</dt>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                    <div class="graph_view">
                                                        <!-- 텍스트 값 -->
                                                        <div class="graph_result">
                                                            <dl>
                                                                <dt class="tit">객단가</dt>
                                                                <dd class="txt_result">{{ Math.round((accumulatedSalesData.TSAMT/accumulatedSalesData.ACC_QTY) / 1000) | currency }}</dd>
                                                                <dt class="tit">(천원)</dt>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col_md_6">
                                        <!-- box1 -->
                                        <div class="cont_box">
                                            <div class="tit">
                                                <strong class="tit_txt">온라인/오프라인 판매비중</strong>
                                            </div>
                                            <div class="cont">
                                                <div class="graph_area">
                                                    <!-- 그래프 1 -->
                                                    <div class="graph_view">
                                                        <!-- 텍스트 값 -->
                                                        <span class="summary mb20" style="margin: 0 !important;">
                                                            <span class="tit">누적매출합계</span>
                                                            <strong class="txt_result txt_s">{{ Math.round(accumulatedSalesData.TSAMT / 1000000) | currency }}</strong>
                                                            <!-- <strong class="txt_result txt_s">{{ Math.round(accumulatedSalesData.ONSAMT / 1000000) | currency }}</strong> -->
                                                            <em class="tit">백만원</em>
                                                        </span>

                                                        <!-- 그래프 -->
                                                        <div class="graph" style="position:relative; left:130px;">
                                                          <div id="onoffchartdiv" style="width:100%; height:100px;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div class="cont_box h100 mt20">
                                            <div class="tit">
                                                <div class="tab">
                                                    <ul>
                                                        <li :class="{'on': resultTab === 1}" @click="changeResultTab(1)"><a href="javascript:void(0)">목표대비 매출실적</a></li>
                                                        <li :class="{'on': resultTab === 2}" @click="changeResultTab(2)"><a href="javascript:void(0)">전년대비 매출실적</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class=graph_area>
                                                <!-- 카테고리/도트색상은 그래프와 동일하게 스타일로 넣어주기 -->
                                                <!-- <div class="graph_category">
                                                    <ul>
                                                        <li v-show="resultTab == 1"><span class="ico_dot" style="background-color:#bababa;"></span>당월목표(백만원)</li>
                                                        <li v-show="resultTab == 2"><span class="ico_dot" style="background-color:#bababa;"></span>전년실적(백만원)</li>
                                                        <li><span class="ico_dot" style="background-color:#3f93f5;"></span>당월실적(백만원)</li>
                                                        <li><span class="ico_dot" style="background-color:#1bcc98;"></span>달성률(%)</li>
                                                    </ul>
                                                </div> -->
                                                <!-- 그래프 -->
                                                <div class="graph" id="salesChart1" style="height:300px;width=100%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 매출정보 끝 -->

                            <!-- Style Top 10 -->
                            <div v-show="gubun == 3">
                                <!-- SALE PERIOD 필터 영역 -->
                                <div class="groups">

                                    <div class="layout_spacer"></div>
                                    <!-- select -->

                                    <div class="inner">
                                        <div class="pl10">SALE PERIOD</div>
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
                                    </div>
                                </div>
                                <!-- SALE PERIOD 필터 영역 끝 -->

                                <div class="mt30">
                                    <div class="layout_title">매장 TOP 10(수량기준)</div>
                                    <div class="slide_img_wrap mt10" v-show="SliceStoreTop10.length > 0">
                                        <div class="slide_btns">
                                            <a class="btn_slide btn_prev teamSelector" @click="slide_prev(1)"><i class="material-icons">arrow_back_ios</i></a>
                                            <a class="btn_slide btn_next teamSelector" @click="slide_next(1)"><i class="material-icons">arrow_forward_ios</i></a>
                                        </div>
                                        <div class="slide_view">
                                            <ul ref="slideArea1" style="position:relative;" :style="{left: slidePosition1+'px'}">
                                                <!-- <li 
                                                v-for="(data, index) in styleStoreTop10"
                                                :key="data.STYCD"
                                                :class="{on: clickedImg1 == data.STYCD}"
                                                @click="clothRate(1,data.STYCD, index+1)"
                                                style="background: #fff; align-items: center; cursor: unset;"
                                                >
                                                    <span class="num" style="left:0;">{{ index+1 }}</span>
                                                    <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCD" />
                                                    <img v-else src="@/assets/images/bg_clothes.png" style="max-width: 30%; height: auto;" />
                                                    <span class="txt_name">{{ data.STYCD }}</span> -->

                                                <!-- 썸네일 -->
                                                <li v-for="(data, index) in SliceStoreTop10" :key="data.STYCD" @click="clothRate(1, data.STYCD, index)">
                                                  <div class="slide_item_warp">
                                                      <!-- 리오더 표시 -->
                                                      <span v-if="data.MRGU == 'R'" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ data.RESEQ }}</span></span>
                                                      <span v-else-if="data.MRGU == 'M'" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
                                                      <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCD" />
                                                      <img v-else :src="data.MAINDIMAGEPATH" :alt="data.STYCD" />
                                                      <!-- <img v-else src="@/assets/images/bg_clothes.png" /> -->
                                                  </div>

                                                  <!-- 순번 -->
                                                  <span class="num" style="left:0;">{{ index+1 }}</span>


                                                  <!-- 매출상세 -->
                                                  <div class="slide_item_info">
                                                      <strong class="txt_name">{{ data.STYCD }}</strong>

                                                      <div class="style_info_list">
                                                          <div class="sales_view circle">
                                                              <dl>
                                                                  <dt class="tit">조회기간 판매수량</dt>
                                                                  <dd class="txt_num">{{ data.ACC_SALEQTY | currency }}<small class="txt_s">개</small></dd>
                                                                  <!-- <dt class="tit">누적매출금액</dt>
                                                                  <dd class="txt_num">{{ Math.round(data.ACC_SALEAMT/1000000) | currency }}<small class="txt_s">백만원</small></dd> -->
                                                              </dl>
                                                          </div>
                                                          <div class="sales_view_sub">
                                                              <dl>
                                                                  <dt class="tit">누적매출금액</dt>
                                                                  <dd class="txt_num">{{ Math.round(data.ACC_SALEAMT/1000000) | currency }}백만원</dd>
                                                              </dl>
                                                              <!-- <dl>
                                                                  <dt class="tit">조회기간 판매율</dt>
                                                                  <dd class="txt_num">{{ data.ACC_SALERATE }}%</dd>
                                                              </dl> -->
                                                          </div>
                                                      </div>
                                                  </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt30">
                                    <div class="layout_title">사업부 TOP 10(수량기준)</div>
                                    <div class="slide_img_wrap mt10" v-show="SliceBrandTop10.length > 0">
                                        <div class="slide_btns">
                                            <a class="btn_slide btn_prev teamSelector" @click="slide_prev(2)"><i class="material-icons">arrow_back_ios</i></a>
                                            <a class="btn_slide btn_next teamSelector" @click="slide_next(2)"><i class="material-icons">arrow_forward_ios</i></a>
                                        </div>
                                        <div class="slide_view">
                                            <ul ref="slideArea2" style="position:relative;" :style="{left: slidePosition2+'px'}">
                                                <!-- <li
                                                v-for="(data, index) in styleSucdTop10"
                                                :key="data.STYCD"
                                                :class="{on: clickedImg2 == data.STYCD}"
                                                @click="clothRate(2,data.STYCD, index+1)"
                                                style="background: #fff; align-items: center; center; cursor: unset;"
                                                >
                                                    <span class="num" style="left:0;">{{ index+1 }}</span>
                                                    <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCD" />
                                                    <img v-else src="@/assets/images/bg_clothes.png" style="max-width: 30%; height: auto;" />
                                                    <span class="txt_name">{{ data.STYCD }}</span>
                                                </li> -->
                                                <li v-for="(data, index) in SliceBrandTop10" :key="data.STYCD" @click="clothRate(2,data.STYCD, index)">
                                                  <div class="slide_item_warp">
                                                      <!-- 리오더 표시 -->
                                                      <span v-if="data.MRGU == 'R'" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ data.RESEQ }}</span></span>
                                                      <span v-else-if="data.MRGU == 'M'" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
                                                      <img v-if="data.DIMAGEPATH" :src="data.DIMAGEPATH" :alt="data.STYCD" />
                                                      <img v-else :src="data.MAINDIMAGEPATH" :alt="data.STYCD" />
                                                      <!-- <img v-else src="@/assets/images/bg_clothes.png" /> -->
                                                  </div>

                                                  <!-- 순번 -->
                                                  <span class="num" style="left:0;">{{ index+1 }}</span>


                                                  <!-- 매출상세 -->
                                                  <div class="slide_item_info">
                                                      <strong class="txt_name">{{ data.STYCD }}</strong>

                                                      <div class="style_info_list">
                                                          <div class="sales_view circle">
                                                              <dl>
                                                                  <dt class="tit">조회기간 판매수량</dt>
                                                                  <dd class="txt_num">{{ data.ACC_SALEQTY | currency }}<small class="txt_s">개</small></dd>
                                                                  <!-- <dt class="tit">누적매출금액</dt>
                                                                  <dd class="txt_num">{{ Math.round(data.ACC_SALEAMT/1000000) | currency }}<small class="txt_s">백만원</small></dd> -->
                                                              </dl>
                                                          </div>
                                                          <div class="sales_view_sub">
                                                              <dl>
                                                                  <dt class="tit">누적매출금액</dt>
                                                                  <dd class="txt_num">{{ Math.round(data.ACC_SALEAMT/1000000) | currency }}백만원</dd>
                                                              </dl>
                                                              <dl>
                                                                  <dt class="tit">조회기간 판매율</dt>
                                                                  <dd class="txt_num">{{ data.ACC_SALERATE }}%</dd>
                                                              </dl>
                                                          </div>
                                                      </div>
                                                  </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Style Top 10 끝 -->

                        </div>
                    </div>

                    <div class="watermark" :style="{background:BgBlk}" style="position: absolute; left: 30px; width: 390px; height: 100%"></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import datePick from "vue-date-pick"
import sideMenu from '@/components/sideMenu'

export default {
  name: "HUM0201",
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
    // 파라미터 받기
    this.initData()  
    this.loadData()

    this.onResize()
    // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  created() {
    this.saleStartDate = moment().startOf("month").format('YYYY-MM-DD')
    this.saleEndDate = moment().format('YYYY-MM-DD')
    this.currentYear = moment().format("YYYY")
    this.lastMonth = moment().subtract(1, 'M').format("MM")
  },
  computed: {
    req2svr: () => req2svr,
    SliceBrandTop10(){
      return this.styleSucdTop10.slice(0, 10)
    },
    SliceStoreTop10(){
      return this.styleStoreTop10.slice(0, 10)
    },
    EmpCd() {
      return this.$store.getters.getEmpCd
    },
    Bg(){
      return "transparent url(\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20version%3D'1.1'%20viewBox%3D'0%200%20100%20100'%20height%3D'85px'%20width%3D'100px'%3E%3Ctext%20transform%3D'translate(10%2C%20100)%20rotate(-25)'%20fill%3D'rgba(204%2C204%2C204%2C%200.6)'%20font-size%3D'20px'%3E"+this.$store.getters.getEmpCd+"%3C%2Ftext%3E%3C%2Fsvg%3E\") repeat center"
    },
    BgBlk(){
      return "transparent url(\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20version%3D'1.1'%20viewBox%3D'0%200%20100%20100'%20height%3D'85px'%20width%3D'100px'%3E%3Ctext%20transform%3D'translate(10%2C%20100)%20rotate(-25)'%20fill%3D'rgba(204%2C204%2C204%2C%200.3)'%20font-size%3D'20px'%3E"+this.$store.getters.getEmpCd+"%3C%2Ftext%3E%3C%2Fsvg%3E\") repeat center"
    }
  },
  data() {
    return {
      drawer: null,
      SpecialNote: {},
      additionalInfoData: {},
      ratingInfoData: [],
      leftInfoData: {},
      bagicInfoData: {},
      bagicInfoTopData: {},
      salesInfoData: {},
      accumulatedSalesData: {},
      salesResultData: [],
      styleTopData: {},
      salesManagerData : {},
      salesManInfo : [],
      salesManInfoLength: null,
      salesManCnt: 0,
      gubun: 1,
      choice: 1,
      resultTab: 1,
      infoTab: 0,
      specialComment: [],
      career: [],
      managerComment: [],
      brcd: null,
      sucd: null,
      vdcd: null,
      sno: null,
      hrid: null,
      chgucd: null,
      currentYear: null,
      lastMonth: null,
      saleStartDate: null,
      saleEndDate: null,
      styleStoreTop10: [],
      styleSucdTop10: [],
      slideCount1: 10,
      slideCount2: 10,
      slidePosition1: 0,
      slidePosition2: 0, 
      slideWidth1: 0,
      slideWidth2: 0,
      clickedImg1: "",
      clickedImg2: "",
      slideIconWidth: 270 // icon width + right margin,
    }
  },
  methods: {
    initData() {
      this.brcd = this.data.BRCD
      this.vdcd = this.data.VDCD
      this.sno = this.data.SNO
      this.sucd = this.data.SUCD
      this.hrid = this.data.HRID
      this.chgucd = this.data.CHGUCD
    },
    loadData() {
        
        // SD 정보
        this.getLeftInfoData()
        
        this.controlTab(1)      
    },
    getRatingInfoData(){                
        this.req2svr.getRatingInfoData(this.sucd, this.leftInfoData.CHGUCD).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.ratingInfoData = res
            } else {
              this.ratingInfoData = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesManagerData(){
        this.salesManagerData = {}
                
        this.req2svr.getSalesManagerData(this.vdcd).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.salesManagerData = res
            } else {
              this.salesManagerData = (JSON.parse("[" + res + "]"))[0]
            }

            if(this.salesManagerData.CAREER.trim() == "")
              this.career[0] = "작성된 내용이 없습니다."
            else
              this.career = this.salesManagerData.CAREER.split("\n")
            
            if(this.salesManagerData.REGCOMMENT.trim() == "")
              this.managerComment[0] = "작성된 내용이 없습니다."
            else
              this.managerComment = this.salesManagerData.REGCOMMENT.split("\n")
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesManInfo(){
      this.salesManInfo = []
                
      this.req2svr.getSalesManInfo(this.hrid).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.salesManInfo.push(res);
            } else {
              this.salesManInfo = JSON.parse("[" + res + "]")
            }

            this.salesManInfoLength = this.salesManInfo.length

            for(let i=0; i<this.salesManInfo.length; i++){
              if(this.salesManInfo[i].REGCOMMENT.trim() == "" || this.salesManInfo[i].REGCOMMENT.trim() == null)
                this.salesManInfo[i].REGCOMMENT = ["작성된 내용이 없습니다."]
              else
                this.salesManInfo[i].REGCOMMENT = this.salesManInfo[i].REGCOMMENT.split("\n")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    plusIndex(){
      if(this.salesManCnt < this.salesManInfoLength-1){
        this.salesManCnt = this.salesManCnt + 1
      }
    },
    minusIndex(){
      if(this.salesManCnt > 0){
        this.salesManCnt = this.salesManCnt - 1
      }
    },
    getSalesResultData(){
      this.salesResultData = []
              
      this.req2svr.getSalesResultData(this.vdcd, this.currentYear).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.salesResultData.push(res)
            } else {
              this.salesResultData = JSON.parse("[" + res + "]")
            }
            this.makeSalesChart()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getAccumulatedSalesData(){
      this.accumulatedSalesData = {}

      this.req2svr.getAccumulatedSalesData(this.vdcd, this.currentYear).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.accumulatedSalesData = res
            } else {
              this.accumulatedSalesData = (JSON.parse("[" + res + "]"))[0]
            }
            this.makeSalesAnalysisChart()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesInfoData(){
      this.salesInfoData = {}
              
      this.req2svr.getSalesInfoData(this.vdcd, this.sucd, this.currentYear).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.salesInfoData = res
            } else {
              this.salesInfoData = (JSON.parse("[" + res + "]"))[0]
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getLeftInfoData(){
      this.leftInfoData = {}

      this.req2svr.getLeftInfoData(this.vdcd, this.currentYear).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.leftInfoData = res
            } else {
              this.leftInfoData = (JSON.parse("[" + res + "]"))[0]
            }
            if(this.leftInfoData.STDT){
              this.leftInfoData.STDT = moment(this.leftInfoData.STDT).format('YYYY-MM-DD')
            }
            this.getRatingInfoData()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getBagicInfoTopData(){
      this.bagicInfoTopData = {}

      this.req2svr.getBagicInfoTopData(this.vdcd, this.currentYear, this.lastMonth).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.bagicInfoTopData = res
            } else {
              this.bagicInfoTopData = (JSON.parse("[" + res + "]"))[0]
            }

            if(this.bagicInfoTopData.CUYEAR_AVG) {
              this.bagicInfoTopData.CUYEAR_AVG = this.bagicInfoTopData.CUYEAR_AVG/Number(this.lastMonth)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyleStoreTop10(){
      this.clickedImg1 = ""

      let sDate = moment(this.saleStartDate).format('YYYYMMDD')
      let eDate = moment(this.saleEndDate).format('YYYYMMDD')
      
      this.req2svr.getStyleStoreTop10(this.vdcd, sDate, eDate).then(
        res => {
          this.styleStoreTop10 = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.styleStoreTop10.push(res);
            } else {
              this.styleStoreTop10 = JSON.parse("[" + res + "]");
            }
            // this.slideCount1 = this.styleStoreTop10.length + 1
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    getStyleSucdTop10(){

      this.clickedImg2 = ""

      let sDate = moment(this.saleStartDate).format('YYYYMMDD')
      let eDate = moment(this.saleEndDate).format('YYYYMMDD')
      
      this.req2svr.getStyleSucdTop10(this.sucd, sDate, eDate).then(
        res => {
          this.styleSucdTop10 = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.styleSucdTop10.push(res);
            } else {
              this.styleSucdTop10 = JSON.parse("[" + res + "]");
            }
            // this.slideCount2 = this.styleSucdTop10.length + 1
            
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    controlTab(val) {
      this.gubun = val
      switch(this.gubun){
        case 1:
          //기본정보 - Top
          this.getBagicInfoTopData()
          // 기본정보 - 주요경력
          this.getSalesManagerData()
          // 기본정보 - 영업담당
          this.getSalesManInfo()
          // 기본정보 - 특이사항
          this.getSpecialNote()
          // 기본정보 - 추가정보
          this.getAdditionalInfo()
          break;
        case 2:
          //매출정보 - Top
          this.getSalesInfoData()
          //매출정보 - 누적 판매실적
          this.getAccumulatedSalesData()
          //매출정보 - 매출실적
          this.getSalesResultData()
          break;
        case 3:
          if(this.styleStoreTop10.length == 0 && this.styleSucdTop10.length == 0){
            //STYLE TOP10 - 매장TOP10
            this.getStyleStoreTop10()
            //STYLE TOP10 - 브랜드TOP10
            this.getStyleSucdTop10()            
          }
          break;            
        default:
            break;
      }
    },
    getAdditionalInfo(){
        this.additionalInfoData = {}

        this.req2svr.getAdditionalInfo(this.vdcd, this.hrid).then(
        res => {
          this.additionalInfoData = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.additionalInfoData = res
            } else {
              this.additionalInfoData = (JSON.parse("[" + res + "]"))[0]
            }

            this.additionalInfoData.BUYERLIST = this.additionalInfoData.BUYER.split("\n");

          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSpecialNote(){
      this.SpecialNote = {}

      this.req2svr.getSpecialNote(this.vdcd).then(
        res => {
          this.SpecialNote = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.SpecialNote = res
            } else {
              this.SpecialNote = (JSON.parse("[" + res + "]"))[0]
            }

            // 특이사항 코멘트 데이터 생성
            this.specialComment = this.SpecialNote.TOTGRADE.split("\n")
            switch(this.specialComment.length % 3){
                case 1:
                    this.specialComment.push("")
                    this.specialComment.push("")
                    break;
                case 2:
                    this.specialComment.push("")
                    break;
                default:
                    break;
            }

            // 차트 그리기
            this.makeChart(this.SpecialNote)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    makeChart(val) {
      
      AmCharts.makeChart("chartdiv", {
        type: "radar",
	    categoryField: "country",
	    color: "#0A76F2",
	    graphs: [
		    {
			balloonText: "[[value]] ",
			fillAlphas: 0.3,
			fillColors: "#4A99C6",
			fontSize: 13,
			id: "AmGraph-1",
			labelPosition: "inside",
			labelText: "[[value]]",
			lineColor: "#4A99C6",
			lineThickness: 0.5,
			valueField: "liters"
		}
	    ],
	    guides: [],
	    valueAxes: [
            {
            id: "ValueAxis-1",
            minimum: 0,
            synchronizationMultiplier: -1,
            autoRotateCount: 5,
            axisAlpha: 0.16,
            color: "#000000",
            fillAlpha: 0.02,
            fontSize: 12,
            gridAlpha: 0.26,
						maximum: 10,
            labelsEnabled: false
            }
	    ],
        allLabels: [
            {
            align: "center",
            bold: true,
            color: "#000000",
            id: "Label-1",
            size: 35,
            text: val.GRADE_AVG,
            x: "0%",
            y: "45%"
            }
        ],
        balloon: {},
        titles: [],
        dataProvider: [
            {
            country: "매출(판단력)",
            liters: val.AMTGRADE
            },
            {
            country: "직원관리능력",
            liters: val.MNGGRADE
            },
            {
            country: "피팅적합도",
            liters: val.VISGRADE
            },
            {
            country: "협조성향",
            liters: val.COMGRADE
            },
            {
            country: "재고관리능력",
            liters: val.STKGRADE
            }
        ]
      });
    },
    getSalesChartData(){
        let returnData = []

        if(this.resultTab==1){        
            returnData = _.map(this.salesResultData, function(item){
                let data = {}
                data.month = +item.SALEMM + "월"
                data.tsamt = Math.round(item.TSAMT / 1000000)
                data.amt = Math.round(item.GAMT / 1000000)
                data.ratio = item.G_RATIO

                return data
            })
        }else{
            returnData = _.map(this.salesResultData, function(item){
                let data = {}
                data.month = +item.SALEMM + "월"
                data.tsamt = Math.round(item.TSAMT / 1000000)
                data.amt = Math.round(item.LTSAMT / 1000000)
                data.ratio = item.LTS_RATIO

                return data
            })            
        }

        return returnData
    },
    makeSalesChart() {
      let chartData = this.getSalesChartData()
      let title = ["당월목표(백만원)", "당월실적(백만원)", "달성률(%)"]

      AmCharts.makeChart("salesChart1", 
      {
        "type": "serial",
        "categoryField": "month",
        "startDuration": 0.5,
        "startEffect": "easeInSine",
        "categoryAxis": {
        "gridPosition": "start",
        "gridThickness": 0
      },
      "trendLines": [],
      "graphs": [
        {
          "balloonText": title[0] + " : [[value]]",
          "title": title[0],
          "fillAlphas": 1,
          "fixedColumnWidth": 30,
          "id": "AmGraph-1",
          "lineAlpha": 0,
          "lineColor": "#AAB3B3",
          // "title": "graph 1",
          "type": "column",
          "labelText": "[[value]]",
          "labelOffset": 10,
          "labelPosition": "bottom",
          // "showBalloon": false,
          "valueField": "amt"
        },
        {
          "balloonText": title[1] + " : [[value]]",
          "title": title[1],
          "fillAlphas": 1,
          "fixedColumnWidth": 30,
          "id": "AmGraph-2",
          "lineColor": "#2F8FFD",
          // "title": "graph 2",
          "type": "column",
          "labelText": "[[value]]",
          "labelOffset": 10,
          "labelPosition": "bottom",
          // "showBalloon": false,
          "valueField": "tsamt"
        },
        {
          "balloonText": title[2] + " : [[value]]%",
          "title": title[2],
          "bullet": "round",
          "bulletBorderThickness": 1,
          "id": "AmGraph-3",
          "lineColor": "#14EB90",
          // "title": "graph 3",
          "topRadius": 0,
          "valueAxis": "ValueAxis-2",
          //"labelText": "[[value]]",
          //"labelPosition": "top",
          //"showBalloon": false,
          "valueField": "ratio"
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
          "title": "(백만원)",
          "titleBold": false,
          //"showLastLabel": false,
          "titleRotation": 0
        },
        {
          "id": "ValueAxis-2",
          "position": "right",
          "minimum": 0,
          "autoGridCount": false,
          "gridAlpha": 0,
          "tickLength": 0,
          "title": "(%)",
          "titleBold": false,
          //"showLastLabel": false,
          "titleRotation": 0
        }
      ],
      "balloon": {
        "borderThickness": 1
      },
      legend: {
        enabled: true,
        align: "center",
        fontSize: 18,
        position: "top"
      },
      titles: [],
      "dataProvider": chartData
    }
  );
},
    makeSalesAnalysisChart() {

      let title = ["온라인", "오프라인"]
      let data = [
        { category: "", 
          ONLINE_T: "온라인", ONLINE: Math.round(this.accumulatedSalesData.ONSAMT/this.accumulatedSalesData.TSAMT*100),
          OFFLINE_T: "오프라인", OFFLINE: Math.round((this.accumulatedSalesData.TSAMT-this.accumulatedSalesData.ONSAMT)/this.accumulatedSalesData.TSAMT*100)
        }
      ];

      AmCharts.makeChart("onoffchartdiv", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
        columnWidth: 0.52,
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
            balloonText: "[[title]]:[[value]]%",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[title]]:[[value]]%",
            title: title[0],
            type: "column",
            valueField: "ONLINE"
          },
          {
            balloonText: "[[title]]:[[value]]%",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[title]]:[[value]]%",
            title: title[1],
            type: "column",
            valueField: "OFFLINE"
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
            labelsEnabled: false
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    changeManager(value){
        this.choice = value
    },
    changeResultTab(value){
        this.resultTab = value
        this.makeSalesChart()
    },
    chageInfoTab(value){
        this.infoTab = value
    },
    toMain() {
      this.$router.replace("/")
    },
    close() {
      this.$emit("close")
    },
    changeDate(value) {
        this.getStyleStoreTop10()
        this.getStyleSucdTop10()
    },
    onResize() {
      if (this.$refs.slideArea1) {
        this.slideWidth1 = this.$refs.slideArea1.clientWidth
      } else {
        this.slideWidth1 = 0
      }

      if (this.$refs.slideArea2) {
        this.slideWidth2 = this.$refs.slideArea2.clientWidth
      } else {
        this.slideWidth2 = 0
      }
    },
    clothRate(val, STYCD, index) {
      if(val == 1){
          this.clickedImg1 = STYCD
      } else {
          this.clickedImg2 = STYCD
      }
      this.changeSlidePosition(index, val)
    },
    changeSlidePosition(index, val) {
      if (this.slideWidth1 == 0 || this.slideWidth2 == 0) {
        this.onResize()
      }

      if(val == 1) {
        if (this.slidePosition1 > (-(this.slideIconWidth * (index+1)) + this.slideWidth1)) {
          this.slidePosition1 = -(this.slideIconWidth * (index+1)) + this.slideWidth1
        } else if ((-this.slideIconWidth * (index)) > this.slidePosition1) {
          this.slidePosition1 = -this.slideIconWidth * (index)
        }
        if (index == 0) {
          this.slidePosition1 = 0
        }
        if (this.slidePosition1 > 0) {
          this.slidePosition1 = 0
        }
        if ((this.slideCount1 * this.slideIconWidth) < (this.slideWidth1 - this.slidePosition1)) {
          this.slidePosition1 = this.slideWidth1  - (this.slideCount1 * this.slideIconWidth)
        }
      } else {
        if (this.slidePosition2 > (-(this.slideIconWidth * (index+1)) + this.slideWidth2)) {
          this.slidePosition2 = -(this.slideIconWidth * (index+1)) + this.slideWidth2
        } else if ((-this.slideIconWidth * (index)) > this.slidePosition2) {
          this.slidePosition2 = -this.slideIconWidth * (index)
        }
        if (index == 0) {
          this.slidePosition2 = 0
        }
        if (this.slidePosition2 > 0) {
          this.slidePosition2 = 0
        }
        if ((this.slideCount2 * this.slideIconWidth) < (this.slideWidth2 - this.slidePosition2)) {
          this.slidePosition2 = this.slideWidth2  - (this.slideCount2 * this.slideIconWidth)
        }
      }
    },
    slide_next(val) {
      if (this.slideWidth1 == 0 || this.slideWidth2 == 0) {
        this.onResize()
      }
      if(val == 1) {
        let iconMaxCount = Math.floor(this.slideWidth1 / this.slideIconWidth)
        let count = Math.floor(this.slideWidth1 / this.slideIconWidth) - Math.floor(this.slidePosition1 / this.slideIconWidth) + iconMaxCount
        this.slidePosition1 = -(this.slideIconWidth * count) + this.slideWidth1
        if ((this.slideCount1 * this.slideIconWidth) < (this.slideWidth1 - this.slidePosition1)) {
          this.slidePosition1 = this.slideWidth1  - (this.slideCount1 * this.slideIconWidth)
        }
      } else {
        let iconMaxCount = Math.floor(this.slideWidth2 / this.slideIconWidth)
        let count = Math.floor(this.slideWidth2 / this.slideIconWidth) - Math.floor(this.slidePosition2 / this.slideIconWidth) + iconMaxCount
        this.slidePosition2 = -(this.slideIconWidth * count) + this.slideWidth2
        if ((this.slideCount2 * this.slideIconWidth) < (this.slideWidth2 - this.slidePosition2)) {
          this.slidePosition2 = this.slideWidth2  - (this.slideCount2 * this.slideIconWidth)
        }
      }
    },
    slide_prev(val) {
      if (this.slideWidth1 == 0 || this.slideWidth2 == 0) {
        this.onResize()
      }
      let iconMaxCount = Math.floor(this.slideWidth1 / this.slideIconWidth)
      if(val == 1) {
        let iconMaxCount = Math.floor(this.slideWidth1 / this.slideIconWidth)
        let count = Math.floor(this.slidePosition1 / this.slideIconWidth) + iconMaxCount
        this.slidePosition1 = (this.slideIconWidth * count) 
        if (this.slidePosition1 > 0) {
          this.slidePosition1 = 0
        }
      } else {
        let iconMaxCount = Math.floor(this.slideWidth2 / this.slideIconWidth)
        let count = Math.floor(this.slidePosition2 / this.slideIconWidth) + iconMaxCount
        this.slidePosition2 = (this.slideIconWidth * count) 
        if (this.slidePosition2 > 0) {
          this.slidePosition2 = 0
        }
      }
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