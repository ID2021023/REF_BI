<template>
    <transition name="modal">
    <!-- 팝업용 레이아웃 클래스 : popup_layout -->
    <div class="wrap popup_layout pl_r">
        <!-- popup close button -->
        <div class="btn_pop_close" role="button" @click="close()"><i class="material-icons">close</i></div>
        <!-- header -->
        <header class="header">
            <div class="header_inner">
                <h2 class="layout_title">전년 대비 월 평균 매출 현황 상세보기<small class="txt_date"><strong class="point_col1">{{ SelectCodeName }} 사업부</strong></small></h2>
                <div class="layout_spacer"></div>
                <!-- groups -->
                <div class="groups">
                    <div class="toggle_group">
                        <span class="sub_title mr10">(최종 정보수정일: {{ makeDataDate }})</span>
                    </div>
                    <!-- select -->
                    <div class="select_box" style="min-width:180px;">
                        <select class="select" v-model="selectSucd" @change="changeSucd">
                            <!-- <option :value="0">사업부</option> -->
                            <option v-for="data in SUCDs" :key="data.MCODE" :value="data.MCODE">{{ data.CODNM }}</option>
                        </select>
                    </div>
                    <!-- select -->
                    <div class="select_box" style="min-width:130px;">
                        <select class="select" v-model="year" @change="chageDate">
                        <option v-for="data in y_options" :key="data" :value="data">{{ data }}년</option>
                        </select>
                    </div>
                    <!-- select -->
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
                <!-- 테이블 -->
                <div class="tbl_sheet sheet_scroll tbl_right">
                    <div class="thead_wrap">
                        <table class="tbl">
                            <colgroup>
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 20%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 9%;" />
                                <col style="width: 7%;" />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowspan="2">유통형태

                                        <label class="tbl_dropdown" for="tbl-toogle-ct">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-ct">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content box_right">
                                                <label class="tbl_tg_btn" for="tbl-dropdown-dt-1">
                                                    <input class="tbl_cg_check" id="tbl-dropdown-dt-1" type="checkbox" @change="selectAllSHTPNM(false)" v-model="selectedAllSHTPNM">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">유통형태 전체</span>
                                                </label>
                                                <label class="tbl_tg_btn" v-for="data in SHTPNMList" :key="data.SHTPNM">
                                                    <input class="tbl_cg_check" type="checkbox" :value="data.SHTPNM" v-model="selectedSHTPNM" @change="selectSHTPNM">
                                                    <span class="tbl_cg_box"><i class="material-icons">done</i></span>
                                                    <span class="noline btn_n">{{ data.SHTPNM }}</span>
                                                </label>
                                            </div>
                                        </label>

                                    </th>
                                    <th rowspan="2">매장코드</th>
                                    <th rowspan="2">매장명</th>
                                    <th colspan="2">{{ year-1 }}년</th>
                                    <th colspan="2">{{ year }}년</th>
                                    <th colspan="2">증감</th>
                                    <th rowspan="2">비고</th>
                                </tr>
                                <tr>
                                    <th>매출액
                                        <label class="tbl_dropdown" for="tbl-toogle-sales-amount1">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-sales-amount1">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content ">

                                                <label class="tbl_ra_btn" for="tbl-dropdown-sale1-1">
                                                    오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-sale1-1" name="tbl-dropdown-sale1" v-model="sort.LASTYEARAMT" value="asc" @change="doSort('LASTYEARAMT')" />

                                                    <i class="ico radio"></i>
                                                </label>

                                                <label class="tbl_ra_btn" for="tbl-dropdown-sale1-2">
                                                    내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-sale1-2" name="tbl-dropdown-sale1" v-model="sort.LASTYEARAMT" value="desc" @change="doSort('LASTYEARAMT')" />

                                                    <i class="ico radio"></i>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th>월 평균
                                        <label class="tbl_dropdown" for="tbl-toogle-monthly-average1">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-monthly-average1">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content">

                                                <label class="tbl_ra_btn" for="tbl-dropdown-average1-1">
                                                    오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-average1-1" name="tbl-dropdown-average1" v-model="sort.LASTYEARMONAMT" value="asc" @change="doSort('LASTYEARMONAMT')" />

                                                    <i class="ico radio"></i>
                                                </label>

                                                <label class="tbl_ra_btn" for="tbl-dropdown-average1-2">
                                                    내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-average1-2" name="tbl-dropdown-average1" v-model="sort.LASTYEARMONAMT" value="desc" @change="doSort('LASTYEARMONAMT')" />

                                                    <i class="ico radio"></i>
                                                </label>
                                            </div>
                                        </label>
                                    </th>

                                    <th>매출액
                                        <label class="tbl_dropdown" for="tbl-toogle-sales-amount2">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-sales-amount2">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content">

                                                <label class="tbl_ra_btn" for="tbl-dropdown-sale2-1">
                                                    오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-sale2-1" name="tbl-dropdown-sale2" v-model="sort.AMT" value="asc" @change="doSort('AMT')" />

                                                    <i class="ico radio"></i>
                                                </label>

                                                <label class="tbl_ra_btn" for="tbl-dropdown-sale2-2">
                                                    내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-sale2-2" name="tbl-dropdown-sale2" v-model="sort.AMT" value="desc" @change="doSort('AMT')" />

                                                    <i class="ico radio"></i>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th>월 평균
                                        <label class="tbl_dropdown" for="tbl-toogle-monthly-average2">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-monthly-average2">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content">

                                                <label class="tbl_ra_btn" for="tbl-dropdown-average2-1">
                                                    오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-average2-1" name="tbl-dropdown-average2" v-model="sort.MONAMT" value="asc" @change="doSort('MONAMT')" />

                                                    <i class="ico radio"></i>
                                                </label>

                                                <label class="tbl_ra_btn" for="tbl-dropdown-average2-2">
                                                    내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-average2-2" name="tbl-dropdown-average2" v-model="sort.MONAMT" value="desc" @change="doSort('MONAMT')" />

                                                    <i class="ico radio"></i>
                                                </label>
                                            </div>
                                        </label>
                                    </th>

                                    <th>월 평균 증감
                                        <label class="tbl_dropdown" for="tbl-toogle-increase-and-decrease">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-increase-and-decrease">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content">

                                                <label class="tbl_ra_btn" for="tbl-dropdown-increase-and-decrease1-1">
                                                    오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-increase-and-decrease1-1" name="tbl-dropdown-increase-and-decrease1" v-model="sort.MONCHANGE" value="asc" @change="doSort('MONCHANGE')" />

                                                    <i class="ico radio"></i>
                                                </label>

                                                <label class="tbl_ra_btn" for="tbl-dropdown-increase-and-decrease1-2">
                                                    내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-increase-and-decrease1-2" name="tbl-dropdown-increase-and-decrease1" v-model="sort.MONCHANGE" value="desc" @change="doSort('MONCHANGE')" />

                                                    <i class="ico radio"></i>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                    <th>증감율
                                        <label class="tbl_dropdown" for="tbl-toogle-increase-and-decrease2">
                                            <input class="tbl_dropbtn_checkbox" type="checkbox" id="tbl-toogle-increase-and-decrease2">
                                            <div class="tbl_dropbtn"><i class="material-icons">more_vert</i></div>
                                            <div class="tbl_dropdown_content">

                                                <label class="tbl_ra_btn" for="tbl-dropdown-increase-and-decrease2-1">
                                                    오름차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-increase-and-decrease2-1" name="tbl-dropdown-increase-and-decrease2" v-model="sort.MONCHANGERR" value="asc" @change="doSort('MONCHANGERR')" />

                                                    <i class="ico radio"></i>
                                                </label>

                                                <label class="tbl_ra_btn" for="tbl-dropdown-increase-and-decrease2-2">
                                                    내림차순
                                                    <input type="radio" class="tbl_ra" id="tbl-dropdown-increase-and-decrease2-2" name="tbl-dropdown-increase-and-decrease2" v-model="sort.MONCHANGERR" value="desc" @change="doSort('MONCHANGERR')" />

                                                    <i class="ico radio"></i>
                                                </label>
                                            </div>
                                        </label>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="tfoot_wrap">
                        <table class="tbl">
                            <colgroup>
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 20%;"/>
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="" />
                            </colgroup>
                            <tfoot>
                                <tr>
                                    <th colspan="3">TOTAL</th>
                                    <th class="tr">{{ Math.round(totalData.LASTYEARAMT/1000) | currency }}</th>
                                    <th class="tr">{{ Math.round(totalData.LASTYEARMONAMT/1000) | currency }}</th>
                                    <th class="tr">{{ Math.round(totalData.AMT/1000) | currency }}</th>
                                    <th class="tr">{{ Math.round(totalData.MONAMT/1000) | currency }}</th>
                                    <th class="tr">{{ Math.round(totalData.MONCHANGE/1000) | currency }}</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="tbody_wrap tbl_hover_none" style="margin-top: 43px; height: 680px;">
                        <table class="tbl tbl_right">
                            <colgroup>
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 20%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 8%;" />
                                <col style="width: 9%;" />
                                <col style="width: 7%;" />
                                <col style="" />
                            </colgroup>
                            <tbody>
                                <tr v-for="(data, index) in listData" :key="index">
                                    <td class="tc">{{ data.SHTPNM }}</td>
                                    <td class="tc">{{ data.MVDCD }}</td>
                                    <td class="tl">{{ data.VDSNM }}</td>
                                    <td>{{ Math.round(data.LASTYEARAMT/1000) | currency }}</td>
                                    <td>{{ Math.round(data.LASTYEARMONAMT/1000) | currency }}</td>
                                    <td>{{ Math.round(data.AMT/1000) | currency }}</td>
                                    <td>{{ Math.round(data.MONAMT/1000) | currency }}</td>
                                    <td>{{ Math.round(data.MONCHANGE/1000) | currency }}</td>
                                    <td class="tc bg_point_col19">{{ data.MONCHANGERR }}%</td>
                                    <td class="tl">{{ data.NOTE }}</td>

                                    <!-- <td class="tl">{{ (data.VDSNM == 1)?"철수":"" }}</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
        <store-month-sales-status-popup
        v-if="isStoreMonthSalesStatusPopup"
        @close="closePopup"
        :data="detailPopupData"
        />
    </div>
    </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import mapView from '@/components/mapView'
import sideMenu from '@/components/sideMenu'
import datePick from "vue-date-pick"

export default {
  name: "STO0004",
  components: {
    sideMenu,
    mapView,
    datePick
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.year = moment().subtract(1, "month").format("YYYY")
    this.month = moment().subtract(1, "month").format("M");

    for (var i = 0; i < 3; i++) {
      this.y_options[i] = this.year - i;
    }
    this.y_options = _.sortBy(this.y_options)

    for (var i = 0; i < 12; i++) {
      this.m_options[i] = 12 - i;
    }
    this.m_options = _.sortBy(this.m_options)

    this.selectSucd = this.data.selectSucd
    this.year = this.data.year
    this.month = this.data.month

    this.getSHTPNMList()
  },
  computed: {
    req2svr: () => req2svr,
    SUCDs() {
      // let returns = this.$store.getters.getFDRList
      let returns = _.remove(this.$store.getters.getFDRList, function(n) {
        return n.MCODE != '10';
      });
      console.log("SUCDs >>> ", returns)
      return returns
    },
    SelectCodeName() {
        return this.$store.getters.getSUCDCODNM(this.selectSucd)
    }
  },
  data() {
    return {
      drawer: null,
      year: "",
      month: "",
      y_options: [],
      m_options: [],
      listData: [],
      tempListData: [],
      sort: {"LASTYEARAMT": "", "LASTYEARMONAMT": "", "AMT": "", "MONAMT": "", "MONCHANGE": "", "MONCHANGERR": ""},
      filterText: {},
      selectSucd: 1,
      isStoreMonthSalesStatusPopup: false,
      SHTPNMList: [],      
      selectedSHTPNM: [],
      selectedAllSHTPNM: true,
      initAllSHTPNM: false,
      totalData: {},
      makeDataDate: null
    }
  },
  methods: {
    loadData() {
        this.selectAllSHTPNM(true)
        this.selectedAllSHTPNM = true
        this.initAllSHTPNM = true
        this.getMakeDataDate()
        this.getMonthlySalesStatus()
    },
    chageDate() {
        this.loadData()
    },
    changeSucd() {
        this.loadData()
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
    getMonthlySalesStatus() {
      this.req2svr.getMonthlySalesStatus(this.selectSucd, this.year, this.month).then(
        res => {
          this.listData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.listData.push(res);
            } else {
              this.listData = JSON.parse("[" + res + "]");
            }

            for(let i=0; i<this.listData.length; i++) {
              if(this.listData[i].VDSNM.includes("철수")) {
                this.listData[i].NOTE = "철수"
              } else if(this.listData[i].LASTYEARMONAMT == 0) {
                this.listData[i].NOTE = "신규"
              } else {
                this.listData[i].NOTE = ""
              }
            }

            this.tempListData = this.listData //DB에서 SD 목록 가져왔을 때는 항상 TempList에 저장
            this.getTotalData()
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
    getTotalData(){
        this.totalData.LASTYEARAMT = _.sumBy(this.listData, (o) => {
            return Number(o.LASTYEARAMT)
        })
        this.totalData.LASTYEARMONAMT = _.sumBy(this.listData, (o) => {
            return Number(o.LASTYEARMONAMT)
        })
        this.totalData.AMT = _.sumBy(this.listData, (o) => {
            return Number(o.AMT)
        })
        this.totalData.MONAMT = _.sumBy(this.listData, (o) => {
            return Number(o.MONAMT)
        })
        this.totalData.MONCHANGE = _.sumBy(this.listData, (o) => {
            return Number(o.MONCHANGE)
        })
    },
    getSHTPNMList(){
      this.req2svr.getSHTPNMList().then(
        res => {
          this.SHTPNMList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.SHTPNMList.push(res);
            } else {
              this.SHTPNMList = JSON.parse("[" + res + "]")
            }
            this.selectAllSHTPNM(true)
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    selectSHTPNM() {
        if(this.SHTPNMList.length == this.selectedSHTPNM.length){
            this.selectedAllSHTPNM = true
            this.initAllSHTPNM = true
        }else{
            this.selectedAllSHTPNM = false
            this.initAllSHTPNM = false
        }        
        this.doFilter()
    },
    selectAllSHTPNM(init) {
        if(this.initAllSHTPNM == true){
          this.initAllSHTPNM = false
        } else {
          this.initAllSHTPNM = true
        }
        this.selectedSHTPNM = [];
        if(this.selectedAllSHTPNM){
          for(let i in this.SHTPNMList){
            this.selectedSHTPNM.push(this.SHTPNMList[i].SHTPNM)
          }
        }
        if(!init){
          this.doFilter()
        }
    },
    doFilter(){
      this.listData = _.filter(this.tempListData, (o) => {
        return _.includes(this.selectedSHTPNM, o.SHTPNM)
      })
      this.getTotalData()
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
      this.listData = this.tempListData
      this.doFilter()

      let value = this.sort[target] //올림차순, 내림차순
      if(value != ""){
        if(target == "NAME"){
          this.listData = _.orderBy(this.listData, target, value)
        }else{
          this.listData = _.orderBy(this.listData, function(o){ return Number(o[target]) }, value)
        }
      }
    },
    toMain() {
      this.$router.replace("/")
    },
    close() {
      this.$emit("close")
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

