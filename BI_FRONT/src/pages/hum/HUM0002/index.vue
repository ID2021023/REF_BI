<template>
  <div class="wrap">

    <!-- data-watermark 에 사번 입력 -->
    <!-- <div v-show="waterMark">
      <div class="watermark_wrap" style="top: 25%">
        <p class="watermark" :data-watermark="EmpCd"></p>
        <p class="watermark" :data-watermark="EmpCd"></p>
        <p class="watermark" :data-watermark="EmpCd"></p>
      </div>
      <div class="watermark_wrap" style="top: 75%">
        <p class="watermark" :data-watermark="EmpCd"></p>
        <p class="watermark" :data-watermark="EmpCd"></p>
        <p class="watermark" :data-watermark="EmpCd"></p>
      </div>
    </div> -->

    <!-- side menu -->
    <div class="layout_drawer" :class="{on: drawer}" style="z-index:100001;" v-show="waterMark">
      <h1 class="tit_drawer teamSelector" @click="toMain">
        <img src="@/assets/images/img_logo.png" alt="sisun">
      </h1>
      <side-menu @click="drawer = !drawer"></side-menu>
    </div>

    <!-- drawer button -->
    <div role="button" class="btn_drawer" @click.stop="drawer = !drawer" style="z-index:100001;" v-show="waterMark">
      <i v-show="!drawer" class="material-icons">menu</i>
      <i v-show="drawer" class="material-icons">arrow_back_ios</i>
    </div>
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <!-- Title button -->
        <button type="button" class="btn_n btn_icon btn_prev mr10" @click="prev">
          <i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <!-- tabs -->
        <div class="toggle_group">
            <label class="tg_btn" v-for="data in COMPANYList" :key="data.CODE" :class="{'is-checked': selectedCOMPANYCD == data.CODE}">
            <input name="options" class="tg_radio" id="option-1" type="radio" style="display:none" :value="data.CODE" v-model="selectedCOMPANYCD" @click="changeCODE(data.CODE)">
            <span class="btn_n txt_label">{{ data.CODNM}}</span>
            </label>
            <!-- <label class="tg_btn"  style="margin-left:20px;border:1px">
              <input name="options" type="text" style="height:40px" v-model="searchName">
              <input name="options" type="button" value="검색" style="width:40px;height:40px" @click="searchSD()">
            </label> -->
        </div>
      </div>
    </header>
    
    <div class="container">
      <div class="content">
        <div class="tbl_sheet sheet_scroll tbl_right">
                    <div class="thead_wrap">
                        <table class="tbl">
                            <colgroup>
                                <!--No. -->
                                <col style="width: 80px">
                                <!--일련번호 -->
                                <col style="width: 80px" v-show="showYnVal">
                                <!--지역(시/도) -->
                                <col style="width: 120px">
                                <!--지역(시/군/구) -->
                                <col style="width: 150px">
                                <!--SD 성명 -->
                                <col style="width: 130px">
                                <!--생년 -->
                                <col style="width: 100px">
                                <!--연락처 -->
                                <col style="width: 150px">
                                <!--브랜드 -->
                                <col style="width: 120px">
                                <!--매장형태 -->
                                <col style="width: 100px">
                                <!--유통사 -->
                                <col style="width: 100px">
                                <!--매장명 -->
                                <col style="width: 150px">
                                <!--17 연매출 -->
                                <col style="width: 120px">
                                <!--18 연매출 -->
                                <col style="width: 120px">
                                <!--매출기준 등급 -->
                                <col style="width: 150px">
                                <!--특이사항 -->
                                <col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col" style="position: relative">No.
                                        <label class="tbl_dropdown" style="position: absolute; right: 0;" for="tbl-toogle-no">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-no" checked="checked" :value="showYnVal" @click="showYN()">
                                            <div class="tbl_dropbtn">
                                              <i v-if="showYnVal == true" class="material-icons">arrow_left</i>
                                              <i v-else-if="showYnVal == false" class="material-icons">arrow_right</i>
                                            </div>
                                            <!-- checked false 인경우 arrow_right 로 설정해주세요 -->
                                        </label>
                                    </th>
                                    <th scope="col" v-show="showYnVal">일련번호</th>
                                    <th scope="col">지역(시/도)
                                        <label class="tbl_dropdown" for="tbl-toogle-ct">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-ct">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content scroll_cont" style="z-index:100000;" v-show="waterMark">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-ct-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-ct-1" type="checkbox" @change="selectAllSi(false)" v-model="selectedAllSi">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">전체 시/도</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in siList" :key="data.SI">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.SI" v-model="selectedSi" @change="selectSi">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.SI }}</span>
                                                </label>
                                            </div>
                                        </label>
                                    </th>

                                    <th scope="col">지역(시/군/구)
                                        <label class="tbl_dropdown" for="tbl-toogle-st">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-st">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content scroll_cont" style="z-index:100000;" v-show="waterMark">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-st-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-st-1" type="checkbox"  @change="selectAllGu(false)" v-model="selectedAllGu">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">전체 시/군/구</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in guList" :key="data.GU">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.GU" v-model="selectedGu" @change="selectGu">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.GU }}</span>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">SD 성명
                                      <label class="tbl_dropdown" for="tbl-toogle-sdname">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-sdname">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                               
                                                <label class="tbl_ra_btn" for="tbl-dropdown-sd-1">
                                                   오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-sd-1" name="tbl-dropdown-sd" v-model="sort.NAME" value="asc" @change="doSort('NAME')"/>
                                                    
                                                    <i class="ico radio"></i>
                                                </label>
                                                
                                                <label class="tbl_ra_btn" for="tbl-dropdown-sd-2">
                                                   내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-sd-2" name="tbl-dropdown-sd" v-model="sort.NAME" value="desc" @change="doSort('NAME')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>
                                                
                                                <label class="tbl_ra_btn" for="tbl-dropdown-sd-3">
                                                   검색
                                                    <!-- <input type="radio" class="tbl_ra" id="tbl-dropdown-sd-3" name="tbl-dropdown-sd" v-model="sort.NAME" value="search" /> -->
                                                    
                                                    <!-- <i class="ico radio"></i> -->
                                                    <input type="text" class="input_text sm w100" v-model="filterText.NAME" @keyup.enter="doFilter(filterCallback)" />
                                                </label>
                                               
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">생년
                                      <label class="tbl_dropdown" for="tbl-toogle-birth">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-birth">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                               
                                                <label class="tbl_ra_btn" for="tbl-dropdown-bt-1">
                                                   오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-bt-1" name="tbl-dropdown-bt" v-model="sort.BIRTHYEAR" value="asc" @change="doSort('BIRTHYEAR')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>
                                                
                                                <label class="tbl_ra_btn" for="tbl-dropdown-bt-2">
                                                   내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-bt-2" name="tbl-dropdown-bt" v-model="sort.BIRTHYEAR" value="desc" @change="doSort('BIRTHYEAR')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>
                                                
                                                <label class="tbl_ra_btn" for="tbl-dropdown-bt-3">
                                                   검색
                                                    <!-- <input type="radio" class="tbl_ra" id="tbl-dropdown-bt-3" name="tbl-dropdown-bt" v-model="sort.BIRTHYEAR" value="search" /> -->
                                                    
                                                    <!-- <i class="ico radio"></i> -->
                                                    <input type="text" class="input_text sm w100" v-model="filterText.BIRTHYEAR" @keyup.enter="doFilter(filterCallback)" />
                                                </label>
                                               
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">연락처</th>
                                    <th v-if="selectedCOMPANYCD == 1" scope="col">사업부
                                      <!-- <span class="tooltip">
                                            <i class="material-icons point_col5" style="font-size: 18px; margin-top: -5px;">error</i>
                                            <span class="tooltiptext sm">미샤상설과 복합상설은 미샤브랜드에 포함되어 있습니다.</span>
                                        </span> -->
                                      <label class="tbl_dropdown" for="tbl-toogle-b1" v-show="selectedCOMPANYCD == 1">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-b1">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>

                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-bl-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-bl-1" type="checkbox" @change="selectAllBrand(false)" v-model="selectedAllBrand">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">전체 사업부</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in BRCDList" :key="data.SUCD">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.SUCD" v-model="selectedBrand" @change="selectBrand">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.SUNM }}</span>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th v-else-if="selectedCOMPANYCD == 2" scope="col">브랜드</th>
                                    <th scope="col">매장형태
                                        <label class="tbl_dropdown" for="tbl-toogle-ty">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-ty">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>

                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-ty-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-ty-1" type="checkbox"  @change="selectAllCHGU(false)" v-model="selectedAllCHGU">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">전체 매장형태</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in CHGUList" :key="data.CODE">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.CODE" v-model="selectedCHGU" @change="selectCHGU">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.CODNM }}</span>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">유통사
                                      <label class="tbl_dropdown" for="tbl-toogle-ch" v-show="selectedCOMPANYCD == 1">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-ch">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>

                                            <div class="tbl_dropdown_content scroll_cont" style="z-index:100000;" v-show="waterMark">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-ch-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-ch-1" type="checkbox"  @change="selectAllCHGUCOM(false)" v-model="selectedAllCHGUCOM">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">전체 유통사</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in CHGUCOMList" :key="data.CHGUCOM">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.CHGUCOM" v-model="selectedCHGUCOM" @change="selectCHGUCOM">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.CHGUCOM }}</span>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">매장명</th>
                                    <th scope="col">{{ currentYear-2 }} 연매출
                                      <label class="tbl_dropdown" for="tbl-toogle-year1">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-year1">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                               
                                                <label class="tbl_ra_btn" for="tbl-dropdown-year1-1">
                                                   오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-year1-1" name="tbl-dropdown-year1" v-model="sort.TWOYEAR_AGO_AMT" value="asc" @change="doSort('TWOYEAR_AGO_AMT')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>
                                                
                                                <label class="tbl_ra_btn" for="tbl-dropdown-year1-2">
                                                   내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-year1-2" name="tbl-dropdown-year1" v-model="sort.TWOYEAR_AGO_AMT" value="desc" @change="doSort('TWOYEAR_AGO_AMT')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>                                      
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">{{ currentYear-1 }} 연매출
                                      <label class="tbl_dropdown" for="tbl-toogle-year2">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-year2">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                               
                                                <label class="tbl_ra_btn" for="tbl-dropdown-year2-1">
                                                   오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-year2-1" name="tbl-dropdown-year2" v-model="sort.ONEYEAR_AGO_AMT" value="asc" @change="doSort('ONEYEAR_AGO_AMT')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>
                                                
                                                <label class="tbl_ra_btn" for="tbl-dropdown-year2-2">
                                                   내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-year2-2" name="tbl-dropdown-year2" v-model="sort.ONEYEAR_AGO_AMT" value="desc" @change="doSort('ONEYEAR_AGO_AMT')" />
                                                    
                                                    <i class="ico radio"></i>
                                                </label>                                      
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">매출기준 등급
                                        <label class="tbl_dropdown" for="tbl-toogle-sl">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-sl">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>

                                            <div class="tbl_dropdown_content" style="z-index:100000;" v-show="waterMark">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-sl-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-sl-1" type="checkbox"  @change="selectAllAmtRating(false)" v-model="selectedAllAmtRating">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">전체 등급</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in AMTRATINGList" :key="data.CODNM">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.CODNM" v-model="selectedAmtRating" @change="selectAmtRating">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.CODNM }}</span>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th scope="col">특이사항</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="tbody_wrap">
                        <table class="tbl tbl_center">
                            <colgroup>
                                <!--No. -->
                                <col style="width: 80px">
                                <!--일련번호 -->
                                <col style="width: 80px" v-show="showYnVal">
                                <!--지역(시/도) -->
                                <col style="width: 120px">
                                <!--지역(시/군/구) -->
                                <col style="width: 150px">
                                <!--SD 성명 -->
                                <col style="width: 130px">
                                <!--생년 -->
                                <col style="width: 100px">
                                <!--연락처 -->
                                <col style="width: 150px">
                                <!--브랜드 -->
                                <col style="width: 120px">
                                <!--매장형태 -->
                                <col style="width: 100px">
                                <!--유통사 -->
                                <col style="width: 100px">
                                <!--매장명 -->
                                <col style="width: 150px">
                                <!--17 연매출 -->
                                <col style="width: 120px">
                                <!--18 연매출 -->
                                <col style="width: 120px">
                                <!--매출기준 등급 -->
                                <col style="width: 150px">
                                <!--특이사항 -->
                                <col>
                            </colgroup>
                            <tbody>
                                <tr v-show="SDList.length == 0">
                                  <td colspan="15">검색결과가 없습니다.</td>
                                </tr>
                                <tr v-for="(data , index) in SDList" :key="data.HRID" class="watermark" :style="{'background-image':Bg}">
                                    <th class="tc" scope="row">{{ index+1 }}</th>
                                    <td v-show="showYnVal">{{ data.HRID }}</td>
                                    <td class="tl">{{ data.SI }}</td>
                                    <td class="tl">{{ data.GU }}</td>
                                    <td class="tl" style="cursor:pointer" @click="selectedCOMPANYCD == '2' ? toOtherSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID) : toSdDetail(data.VDCD, data.SNO, data.BRCD, data.SUCD, data.HRID, data.CHGUCD)">
                                      <!-- <img class="circle mr10" :src="data.PHOTOPATH">{{ data.NAME }} -->
                                      <img v-if="data.PHOTOPATH != ''" class="circle mr10" :src="data.PHOTOPATH">
                                      <img v-else class="circle mr10" src="@/assets/images/bg_designer_b_w.png">
                                      {{ data.NAME }}
                                    </td>
                                    <td>{{ data.BIRTHYEAR }}</td>
                                    <td>{{ data.PHONE }}</td>
                                    <td v-if="selectedCOMPANYCD == 1">{{ data.SUNM }}</td>
                                    <td v-else-if="selectedCOMPANYCD == 2">{{ data.BRNM }}</td>
                                    <td>{{ data.CHGUNM }}</td>
                                    <td>{{ data.CHGUCOM }}</td>
                                    <td v-if="selectedCOMPANYCD == 1">{{ data.STORENM }}</td>
                                    <td v-else-if="selectedCOMPANYCD == 2">{{ data.VDSNM }}</td>
                                    <td v-if="selectedCOMPANYCD == 1" class="tr">{{ data.TWOYEAR_AGO_AMT }} <span v-show="data.TWOYEAR_AGO_AMT">억</span></td>
                                    <td v-else-if="selectedCOMPANYCD == 2" class="tr">{{ data.TWOYEAR_AGO_AMT }} <span v-show="data.TWOYEAR_AGO_AMT">억</span></td>
                                    <td v-if="selectedCOMPANYCD == 1" class="tr">{{ data.ONEYEAR_AGO_AMT }} <span v-show="data.ONEYEAR_AGO_AMT">억</span></td>
                                    <td v-else-if="selectedCOMPANYCD == 2" class="tr">{{ data.ONEYEAR_AGO_AMT }} <span v-show="data.ONEYEAR_AGO_AMT">억</span></td>
                                    <td>{{ data.AMTRATINGNM }}</td>
                                    <td class="tooltip">
                                        <div class="ellip">{{ data.TOTGRADE }}</div>
                                        <span v-show="data.TOTGRADE" class="tooltiptext">{{ data.TOTGRADE }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
      </div>
    </div>
    <sdDetailPopup
      v-if="isSdDetailPopup"
      :data="detailPopupData"
      @close="closeListPopup"
    ></sdDetailPopup>
    <otherSdDetailPopup
      v-if="isOtherSdDetailPopup"
     :data="otherDetailPopupData"
      @close="closeListPopup"
    ></otherSdDetailPopup>
  </div>
</template>

<script>
import moment from "moment"
import _ from 'lodash'
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'
import sdDetailPopup from '@/pages/hum/HUM0201'
import otherSdDetailPopup from '@/pages/hum/HUM0301'

export default {
  name: "HUM0002",
  components: {
    sideMenu,
    sdDetailPopup,
    otherSdDetailPopup
  },
  props: {
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.date = moment().subtract(1, "days").format("YYYY-MM-DD")
    this.currentYear = moment().format("YY")

    let userAgent = window.navigator.userAgent;
    this.isChrome = userAgent.indexOf('Chrome')>0;

    // 브랜드 리스트
    //this.BRCDList = this.getBRCDList

    // 매출기준 등급 리스트
    this.AMTRATINGList = this.getAMTRATINGList    

    // 매장형태 리스트
    this.CHGUList = this.getCHGUList

    // 유통사 리스트(자사만 유통사 있음)
    if(this.selectedCOMPANYCD == 1){
      this.getCHGUCOMList()
    }
  },
  computed: {
    req2svr: () => req2svr,
    // 자사,타사
    COMPANYList() {
      return this.$store.getters.getSDCOMPANYCDList
    },
    // 브랜드 리스트
    getBRCDList() {
      return this.$store.getters.getHUMList
    },
    // 매장형태 리스트
    getCHGUList() {
      return this.$store.getters.getCHGUCDList
    },
    // 매출기준 등급 리스트
    getAMTRATINGList() {
      return this.$store.getters.getAMTRATINGCDList
    },
    EmpCd() {
      return this.$store.getters.getEmpCd
    },
    Bg(){
      return "url(\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20version%3D'1.1'%20height%3D'160px'%20width%3D'80px'%3E%3Ctext%20transform%3D'translate(10%2C%20100)%20rotate(-25)'%20fill%3D'rgba(204%2C204%2C204%2C%200.6)'%20font-size%3D'20px'%3E"+this.$store.getters.getEmpCd+"%3C%2Ftext%3E%3C%2Fsvg%3E\")"
      // return "transparent url(\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20version%3D'1.1'%20viewBox%3D'0%200%20100%20100'%20height%3D'85px'%20width%3D'100px'%3E%3Ctext%20transform%3D'translate(10%2C%20100)%20rotate(-25)'%20fill%3D'rgba(204%2C204%2C204%2C%200.6)'%20font-size%3D'20px'%3E"+this.$store.getters.getEmpCd+"%3C%2Ftext%3E%3C%2Fsvg%3E\") repeat center"
    }
  },
  data() {
    return {
      drawer: null,
      isChrome: false,
      selectedCOMPANYCD: 1,
      tempSDList: [],
      SDList: [],
      BRCDList: [],
      selectedBrand: [],
      selectedAllBrand: true,
      AMTRATINGList: [],
      selectedAmtRating: [],
      selectedAllAmtRating: true,
      CHGUList: [],
      CHGUCOMList: [],
      selectedCHGU: [],
      selectedAllCHGU: true,
      selectedCHGUCOM: [],
      selectedAllCHGUCOM: true,
      siList: [],
      selectedSi: [],
      selectedAllSi: true,
      guList: [],
      selectedGu: [],
      selectedAllGu: true,
      date: "",
      makeDataDate: null,
      isSdDetailPopup: false,
      isOtherSdDetailPopup: false,
      initAllAmtRating: false,
      initAllCHGU: false,
      initAllCHGUCOM: false,
      currentYear: "",
      showYnVal: true,
      searchName: "",
      sort: {"NAME": "", "BIRTHYEAR": "", "ONEYEAR_AGO_AMT": "", "TWOYEAR_AGO_AMT": ""},
      filterText: {"NAME": "", "BIRTHYEAR": ""},
      waterMark: true
    }
  },
  methods: {
    loadData(){
      //this.selectAllBrand(true)
      //this.selectedAllBrand = true      
      // this.getCHGUCOMList()
      this.selectAllAmtRating(true)
      //this.selectedAllAmtRating = true
      this.selectAllCHGU(true)
      // this.selectAllCHGUCOM(true)
      //this.selectedAllCHGU = true
      //this.getSiList()
      this.getSUCDList()
      this.initAllAmtRating = true
      this.initAllCHGU = true
      this.initAllCHGUCOM = true
    },
    getCHGUCOMList(){
      this.req2svr.getCHGUCOMList(this.selectedCOMPANYCD).then(
        res => {
          this.CHGUCOMList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.CHGUCOMList.push(res);
            } else {
              this.CHGUCOMList = JSON.parse("[" + res + "]")
            }
            this.selectAllCHGUCOM(true)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSDList() {
      this.SDList = []

      //각 필터 중 하나라도 선택한 항목이 없으면 SD 목록이 없도록 함
      if(this.selectedSi.length==0 || this.selectedGu.length==0 || (this.selectedCOMPANYCD==1 && this.selectedBrand.length==0)  
        || this.selectedAmtRating.length==0 || this.selectedCHGU.length==0 || this.selectedCHGUCOM.length==0){
        return
      }

      this.req2svr.getSDList(this.selectedCOMPANYCD, this.selectedSi.toString(), this.selectedGu.toString(), this.selectedBrand.toString(), this.selectedAmtRating.toString(), this.selectedAllAmtRating,
        this.initAllAmtRating, this.selectedCHGU.toString(), this.selectedAllCHGU, this.initAllCHGU, this.selectedCHGUCOM.toString(), this.selectedAllCHGUCOM, this.initAllCHGUCOM).then(
        res => {
          this.SDList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.SDList.push(res);
            } else {
              this.SDList = JSON.parse("[" + res + "]")
            }
            this.tempSDList = this.SDList //DB에서 SD 목록 가져왔을 때는 항상 TempList에 저장
            //현재 sorting 되어 있는 컬럼명 가져와서 다시 sorting
            let sortTarget = _.findKey(this.sort, function(o){
              return o != "" && o != "search"
            })
            if(sortTarget){
              this.doSort(sortTarget)
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    changeCODE(code) {
      this.selectedCOMPANYCD = code
      this.selectedAllBrand = true
      this.selectedAllAmtRating = true
      this.selectedAllCHGU = true
      this.selectedAllCHGUCOM = true
      this.selectedAllSi = true
      this.selectedAllGu = true
      this.showYnVal = true
      this.sort = {"NAME": "", "BIRTHYEAR": "", "ONEYEAR_AGO_AMT": "", "TWOYEAR_AGO_AMT": ""},
      this.filterText = {"NAME": "", "BIRTHYEAR": ""}

      if(code == 1){
        this.getCHGUCOMList()
      } else if(code == 2){
        this.CHGUCOMList = []
      }

      this.loadData()
    },
    getSUCDList() {
      this.BRCDList = [];

      this.req2svr.getBrandCodeList(this.selectedCOMPANYCD).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.BRCDList.push(res);
              this.selectAllBrand(true)
            } else {
              this.BRCDList = JSON.parse("[" + res + "]")
              this.selectAllBrand(true)
            }
          }
          this.getSiList()
        },
        rej => {
          console.log("rej", rej);
        }
      )  
    },
    getSiList() {
      this.siList = [];
      
      this.req2svr.getSiList(this.selectedCOMPANYCD).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.siList.push(res);
              this.selectAllSi(true)
            } else {
              this.siList = JSON.parse("[" + res + "]")
              this.selectAllSi(true)
            }
            this.getGuList()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )  
    },
    getGuList() {
      this.guList = [];
      //this.selectedAllGu = false
      //선택된 시가 없을 경우 구 목록을 삭제하고 SD리스트가 없도록 함
      if(this.selectedSi.length == 0){
        this.getSDList()
        return
      }

      this.req2svr.getGuList(this.selectedCOMPANYCD, this.selectedSi.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.guList.push(res);
              this.selectAllGu(true)
            } else {
              this.guList = JSON.parse("[" + res + "]")
              this.selectAllGu(true)

            }
            // if(count > 0) {
            //   this.guList = JSON.parse("[" + res + "]")     
            //   this.selectAllGu(true)
            // }
            this.getSDList()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )  
    },
    selectBrand() {
      if(this.BRCDList.length == this.selectedBrand.length){
        this.selectedAllBrand = true
      }else{
        this.selectedAllBrand = false
      }
      this.getSDList()
    },
    selectAllBrand(init) {
      this.selectedBrand = [];
      if(this.selectedAllBrand){
        for(let i in this.BRCDList){
          this.selectedBrand.push(this.BRCDList[i].SUCD)
        }
      }
      if(!init)
        this.getSDList()
    },
    selectAmtRating() {
      if(this.AMTRATINGList.length == this.selectedAmtRating.length){
        this.selectedAllAmtRating = true
        this.initAllAmtRating = true
      }else{
        this.selectedAllAmtRating = false
        this.initAllAmtRating = false
      }
      this.getSDList()
    },
    selectAllAmtRating(init) {
      if(this.initAllAmtRating == true){
        this.initAllAmtRating = false
      } else {
        this.initAllAmtRating = true
      }
      this.selectedAmtRating = [];
      if(this.selectedAllAmtRating){
        for(let i in this.AMTRATINGList){
          this.selectedAmtRating.push(this.AMTRATINGList[i].CODNM)
        }
      }
      if(!init)
        this.getSDList()
    },
    selectCHGU() {
      if(this.CHGUList.length == this.selectedCHGU.length){
        this.selectedAllCHGU = true
        this.initAllCHGU = true
      }else{
        this.selectedAllCHGU = false
        this.initAllCHGU = false
      }
      this.getSDList()
    },
    selectAllCHGU(init) {
      if(this.initAllCHGU == true){
        this.initAllCHGU = false
      } else {
        this.initAllCHGU = true
      }
      this.selectedCHGU = [];
      if(this.selectedAllCHGU){
        for(let i in this.CHGUList){
          this.selectedCHGU.push(this.CHGUList[i].CODE)
        }
      }
      if(!init)
        this.getSDList()
    },
    selectCHGUCOM() {
      if(this.CHGUCOMList.length == this.selectedCHGUCOM.length){
        this.selectedAllCHGUCOM = true
        this.initAllCHGUCOM = true
      }else{
        this.selectedAllCHGUCOM = false
        this.initAllCHGUCOM = false
      }
      this.getSDList()
    },
    selectAllCHGUCOM(init) {
      if(this.initAllCHGUCOM == true){
        this.initAllCHGUCOM = false
      } else {
        this.initAllCHGUCOM = true
      }
      this.selectedCHGUCOM = [];
      if(this.selectedAllCHGUCOM){
        for(let i in this.CHGUCOMList){
          this.selectedCHGUCOM.push(this.CHGUCOMList[i].CHGUCOM)
        }
      }
      if(!init)
        this.getSDList()
    },
    selectSi(){
      if(this.siList.length == this.selectedSi.length){
        this.selectedAllSi = true
      }else{
        this.selectedAllSi = false
      }
      
      this.selectedAllGu = true
      this.getGuList()
    },
    selectAllSi(init) {
      this.selectedSi = [];

      if(this.selectedAllSi){
        let tempArray = [];
        for(let i in this.siList){
          tempArray.push(this.siList[i].SI)
        }
        this.selectedSi = tempArray
      }
      if(!init){
        this.selectedAllGu = true
        this.getGuList()
      }
    },
    selectGu(){
      if(this.guList.length == this.selectedGu.length){
        this.selectedAllGu = true
      }else{
        this.selectedAllGu = false
      }
      
      this.getSDList()
    },
    selectAllGu(init) {
      this.selectedGu = [];
      if(this.selectedAllGu){
        let tempArray = [];
        for(let i in this.guList){
          tempArray.push(this.guList[i].GU)
        }
        this.selectedGu = tempArray
      }
      if(!init)
        this.getSDList()
    },
    prev() {
      this.$router.replace("/HumMain");
    },
    toMain() {
      this.$router.replace("/")
    },
    toSdDetail(VDCD,SNO,BRCD,SUCD,HRID,CHGUCD){
      this.waterMark = false
      this.detailPopupData = {VDCD: VDCD, SNO: SNO, BRCD:BRCD, SUCD:SUCD, HRID:HRID, CHGUCD:CHGUCD}
      this.isSdDetailPopup = true
    },
    toOtherSdDetail(VDCD,SNO,BRCD,SUCD,HRID){
      this.waterMark = false
      this.otherDetailPopupData = {VDCD: VDCD, SNO: SNO, BRCD:BRCD, SUCD:SUCD, HRID:HRID}
      this.isOtherSdDetailPopup = true
    },
    closeListPopup() {
      this.isSdSalesListPopup = false
      this.isSdDetailPopup = false
      this.isOtherSdDetailPopup = false
      this.waterMark = true
    },
    showYN(){
      if(this.showYnVal == true){
        this.showYnVal = false
      } else {
        this.showYnVal = true
      }
    },
    searchSD(){

      this.req2svr.searchSD(this.selectedCOMPANYCD, this.searchName).then(
        res => {
          this.SDList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.SDList.push(res);
            } else {
              this.SDList = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    doSort(target){

      //현재 컬럼과 검색필터인 컬럼 제외한 컬럼의 sort 초기화
      for(let key in this.sort){
        let value = this.sort[key]
        if(key != target && value != "search"){
          this.sort[key] = ""
        }
      }

      //현재 컬럼의 검색 기능이 있을 경우 초기화
      // if(_.has(this.filterText, target))
      //   this.filterText[target] = ""
      //다른 컴럼의 검색 조건이 있을 수 있으므로 다시 검색해 줌
      this.SDList = this.tempSDList
      this.doFilter(this.filterCallback)

      let value = this.sort[target] //올림차순, 내림차순
      if(value != ""){
        if(target == "NAME"){
          this.SDList = _.orderBy(this.SDList, target, value)
        }else{
          this.SDList = _.orderBy(this.SDList, function(o){ return Number(o[target]) }, value)
        }
      }
    },
    doFilter(callback){
      this.SDList = this.tempSDList
      
      _.forEach(this.filterText, function(value, key){
          callback(value, key)
        })
    },
    filterCallback(value, key){
      this.SDList = _.filter(this.SDList, function(o){ return o[key].indexOf(value) > -1})
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