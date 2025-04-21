<template>
    <transition name="modal">
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
                                                        <span class="cont">{{ (leftInfoData.ONEAVGAMT/100000000).toFixed(1) | currency }} 억</span>
                                                    </div>
                                                    <!-- <div class="desc">
                                                        <span class="title">(월평균)</span>
                                                        <span class="cont">{{ (leftInfoData.ONEAVGAMT/100000000).toFixed(1) | currency }} 억</span>
                                                    </div> -->
                                                </span>
                                            </li>
                                            <li>
                                                <em class="txt_month">{{ currentYear -2 }}</em>
                                                <span class="graph_cont">
                                                    <div class="view">
                                                        <span class="title">연매출합계</span>
                                                        <span class="cont point_col15">{{ (leftInfoData.TWOAVGAMT/100000000).toFixed(1) | currency }} 억</span>
                                                    </div>
                                                    <!-- <div class="desc">
                                                        <span class="title">(월평균)</span>
                                                        <span class="cont">{{ (leftInfoData.TWOAVGAMT/100000000).toFixed(1) | currency }} 억</span>
                                                    </div> -->
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
                                        <span class="cont point_col16">{{leftInfoData.SUNM}}</span>
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
                                        <strong class="title">최초 데이터생성일</strong>
                                        <span class="cont">{{leftInfoData.REGDT}}</span>
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
                                        <input name="tg1" class="tg_radio" id="tg1_1" type="radio" checked="checked" value="1">
                                        <span class="btn_n txt_label">기본정보</span>
                                    </label>
                                    <div class="layout_spacer"></div>
                                    <span class="sub_title">
                                      (최종 정보수정일: {{leftInfoData.UPDDT}})
                                    </span>
                                </div>



                                <!-- 메인 정보 영역-->

                                <div class="hum_list_box mb20">
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
                                    <div class="list_card">
                                        <ul class="list">
                                            <li class="list_card_item">
                                                <span class="list_card_item_main">
                                                    <small class="sm_label"></small><br>
                                                    <em class="em_cate"></em>
                                                </span>
                                                <em class="em_grade fr"></em>
                                            </li>
                                            <li class=list_card_item_sub>
                                              <span style="margin-right: 10px">
                                              </span>
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
                                        <div class="cont_box">
                                            <div class="tit">
                                                <strong class="tit_txt">특이사항</strong>
                                            </div>

                                            <ul class="special_wrap cont inner noline">
                                                <li class="special_item watermark" :style="{background:Bg, 'background-color':'#FFFFF1'}" v-for="(data, index) in specialComment" :key="data.index">
                                                    <div class="tc num" v-show="data != 0">{{ index+1 }}</div>
                                                    <div class="tc txt">
                                                        {{ data }}
                                                    </div>
                                                </li>
                                            </ul>
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
                                                        <strong>{{data.REGDEPTNM}} {{data.REGNAME}} {{data.POSITNNM}} </strong>
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
                        </div>

                        <div class="watermark" :style="{background:BgBlk}" style="position: absolute; left: 30px; width: 390px; height: 100%"></div>

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"

export default {
  name: "HUM0401",
  components: {
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
  },
  created() {
    this.currentYear = moment().format("YYYY")
    this.lastMonth = moment().subtract(1, 'M').format("MM")
  },
  computed: {
    req2svr: () => req2svr,
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
        ratingInfoData: [],
        SpecialNote: {},
        leftInfoData: {},
        bagicInfoData: {},
        bagicInfoTopData: {},
        salesManagerData : {},
        salesManInfo : [],
        salesManInfoLength: null,
        salesManCnt: 0,
        specialComment: [],
        career: [],
        managerComment: [],
        brcd: null,
        vdcd: null,
        sno: null,
        sucd: null,
        currentYear: null,
        lastMonth: null,
    }
  },
  methods: {
    initData() {
      this.brcd = this.data.BRCD
      this.vdcd = this.data.VDCD
      this.sno = this.data.SNO
      this.sucd = this.data.SUCD
      this.hrid = this.data.HRID
    },
    loadData() {
        // SD 정보
        this.getLeftInfoData()
        //기본정보 - Top
        this.getBagicInfoTopData()
        // 기본정보 - 주요경력
        this.getSalesManagerData()
        // 기본정보 - 영업담당
          this.getSalesManInfo()
        // 기본정보 - 특이사항
        this.getSpecialNote()   
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
    getLeftInfoData(){
      this.leftInfoData = {}

      this.req2svr.getLeftInfoData3(this.vdcd, this.currentYear).then(
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


      this.req2svr.getBagicInfoTopData3(this.vdcd, this.currentYear, this.lastMonth).then(
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
    getSpecialNote(){
      this.SpecialNote = {}

      this.req2svr.getSpecialNote3(this.vdcd).then(
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
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSalesManagerData(){
      this.salesManagerData = {}

      this.req2svr.getSalesManagerData3(this.vdcd).then(
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