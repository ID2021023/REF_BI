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
          <li><a href="javascript:void(0);" @click="link('WEE0201')">주간판매 BEST 20</a></li>
          <li class="on"><a href="javascript:void(0);" @click="link('WEE0301')">신상품 반응조사</a></li>
        </ul>
      </div>
    </div>

        <header class="header wrap">
            <div class="header_inner np" style="margin-top: -20px;">
                <!-- Title -->
                <h2 class="layout_title ">
                    <small class="txt_date np">
                        <strong class="point_col1">{{ choiceYear }}년 {{ choiceMonth }}월 {{ choiceDay }}일</strong>
                    </small>
                </h2>

                <div class="layout_spacer"></div>

                <!-- groups -->
                <div class="groups">
                    <div class="toggle_group">
                        <span class="sub_title mr10">(최종 정보수정일: {{ makeDataDate }})</span>
                    </div>
                    <button type="button" class="btn_n" style="height:55px;" @click="excelDownLoad('exceldown_tbody')">다운로드</button>
                    <!-- date -->
                    <div style="margin-left:10px; line-height:55px;">출고</div>
                    <div class="input_group input_icon_group" style="width:210px; margin-right:10px;">
                        <!-- date -->
                        <form action="#">
                            <label class="btn_icon_nl" for="date">
                                <i class="material-icons">calendar_today</i>
                            </label>
                            <div class="input_text" type="text" id="date">
                              <date-pick
                                v-model="outFromDate"
                                startWeekOnSunday
                                :inputAttributes="{readonly: true}"
                              ></date-pick>
                              <!-- @input="changeData" -->
                            </div>
                        </form>
                    </div>
                    <div style="line-height:55px;">~</div>
                    <div class="input_group input_icon_group"  style="width:210px;">
                        <!-- date -->
                        <form action="#">
                            <label class="btn_icon_nl" for="date">
                                <i class="material-icons">calendar_today</i>
                            </label>
                            <div class="input_text" type="text" id="date">
                              <date-pick
                                v-model="outToDate"
                                startWeekOnSunday
                                :inputAttributes="{readonly: true}"
                              ></date-pick>
                              <!-- @input="changeData" -->
                            </div>
                        </form>
                    </div>
                    <!-- date -->
                    <div style="margin-left:10px; line-height:55px;">기준일</div>
                    <div class="input_group input_icon_group"  style="width:210px;">
                        <!-- date -->
                        <form action="#">
                            <label class="btn_icon_nl" for="date">
                                <i class="material-icons">calendar_today</i>
                            </label>
                            <div class="input_text" type="text" id="date">
                              <date-pick
                                v-model="standardDate"
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

        <div class="container wrap">
            <div class="content">
                <div class="w100">
                    <div class="cont_box">
                        <div class="tit">
                            <strong class="tit_txt">신상품 반응조사</strong>
                            <div class="layout_spacer"></div>
                            <span class="txt">기간판매 : {{ saleStartDate }} ~ {{ saleEndDate }} <span v-if="selectSucd == '1'">/ 기준 : 중국 수주량 별도</span></span>
                        </div>
                        <div class="container">
                            <div class="content">
                                <!-- 테이블 -->
                                <iframe id="txtArea1" style="display:none;" />
                                <div v-if="noResult" style="margin:20px">검색결과가 없습니다.</div>
                                <div v-if="!noResult" class="tbl_sheet tbl_hover_none np">
                                    <table id="exceldown_tbody" class="tbl tbl_center">
                                        <colgroup>
                                            <col style="width:2.5%;" />
                                            <col style="width:6%;" />
                                            <col style="width:6%;" />
                                            <col style="width:3.5%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3.3%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3%;" />
                                            <col style="width:3.3%;" />
                                            <col style="width:3.3%;" />
                                            <col style="width:3.3%;" />
                                            <col style="width:3.3%;" />
                                            <col style="width:8%;" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th rowspan="2">NO</th>
                                                <th colspan="2" rowspan="2">STYLE</th>
                                                <th rowspan="2">M</th>
                                                <th rowspan="2">총 기획</th>
                                                <th rowspan="2">총 생산</th>
                                                <th rowspan="2">중국 수출</th>
                                                <th rowspan="2">국내 기획</th>
                                                <th rowspan="2">국내 생산</th>
                                                <th rowspan="2">미입고</th>
                                                <th colspan="2">판매</th>
                                                <th rowspan="2">초출고</th>
                                                <th rowspan="2">판매 일수</th>
                                                <th rowspan="2">일평균<br>판매량</th>
                                                <th rowspan="2">현재고</th>
                                                <th rowspan="2">주요판매점</th>
                                            </tr>
                                            <tr>
                                                <th>수량</th>
                                                <th>%</th>
                                            </tr>
                                        </thead>
                                        <tbody class="tbody_s">
                                            <tr class="bg_point_col19">
                                                <td colspan="3">TTL</td>
                                                <td class="bg_point_col19">{{ styleListData.length | currency }}M</td>
                                                <td>{{ styleTotData.TOTPQTY | currency }}</td>
                                                <td>{{ styleTotData.INQTY | currency }}</td>
                                                <td>{{ styleTotData.CHINASQTY | currency }}</td>
                                                <td>{{ styleTotData.DOMPQTY | currency }}</td>
                                                <td>{{ styleTotData.DOMQTY | currency }}</td>
                                                <td>{{ styleTotData.UNSTOCKED | currency }}</td>
                                                <td>{{ styleTotData.SQTY | currency }}</td>
                                                <td>{{ styleTotData.SALES }}%</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <!-- <td>{{ styleTotData.SALDT }}</td>
                                                <td>{{ styleTotData.DAYQTY | currency }}</td> -->
                                                <td>{{ styleTotData.STOCK | currency }}</td>
                                                <td></td>
                                            </tr>
                                            <!--NO.1-->
                                            <template v-for="(data,index) in styleListData">
                                            <tr :key="'A'+index">
                                                <th rowspan="2"><span class="tit_row">{{ index+1 }}</span></th>
                                                <td rowspan="2">
                                                    <div>{{ data.STYCD }}</div>
                                                    <div>{{ data.SOJAENM }}</div>
                                                    <div>\{{ data.TAGPRI | currency }}</div>
                                                    <div>{{ data.SUSTNM }}</div>
                                                </td>
                                                <td rowspan="2">
                                                    <img v-if="data.DIMAGEPATH" style="width: 100%" :src="data.DIMAGEPATH" :alt="data.STYCD"  />
                                                    <img v-else style="width: 100%" src="@/assets/images/temp_style_8.jpg" :alt="data.STYCD"  />
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.COLCD }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.TOTPQTY | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.INQTY | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.CHINASQTY | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.DOMPQTY | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.DOMQTY | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.UNSTOCKED | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt txt_bold">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.SQTY | currency }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt txt_bold">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.SALES }}%</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.CONVERT_OUTDT }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.SALDT }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt txt_bold" >
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.DAYQTY }}</div>
                                                    </template>
                                                </td>
                                                <td class="vt">
                                                    <template v-for="(detail,index) in data.total">
                                                        <div :key="index">{{ detail.STOCK | currency }}</div>
                                                    </template>
                                                </td>
                                                <!-- <td rowspan="2" class="tl">
                                                    <div>* 밑단 머메이드 디테일의 슬림핏 OP제시 (+벨티드 옵션)</div>
                                                    <div>* 핏 양호하며 소셜위주 판매 有 (예복,모임,강의 등) </div>
                                                    <div>* 밑단 머메이드 상동 넥라인 등 전체적인 핏양호하며, 슬림하게 연출가능 </div>
                                                    <div>*2 칼라 모두 판매 무난하게 이루어지며, 출고시점 매장 관심도 高></div>
                                                </td> -->
                                                <td rowspan="2">
                                                    <div class="row txt_bold">
                                                        <template v-for="(store,index) in data.store">
                                                            <!-- <div class="col_md_6 np" :data-tooltip-text="store.VDSNM">{{ store.VDSNM }} {{ store.SQTY }}</div> -->
                                                            <div class="col_md_6 npb" :data-tooltip-text="store.VDSNM" :key="index">
                                                                <div class="fl one_line w70">{{ store.VDSNM }}</div>
                                                                <div class="fr">{{ store.SQTY }}</div>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr :key="'B'+index">
                                                <td>S-TTL</td>
                                                <td>{{ data.sttl.TOTPQTY | currency }}</td>
                                                <td>{{ data.sttl.INQTY | currency }}</td>
                                                <td>{{ data.sttl.CHINASQTY | currency }}</td>
                                                <td>{{ data.sttl.DOMPQTY | currency }}</td>
                                                <td>{{ data.sttl.DOMQTY | currency }}</td>
                                                <td>{{ data.sttl.UNSTOCKED | currency }}</td>
                                                <td class="txt_bold">{{ data.sttl.SQTY | currency }}</td>
                                                <td class="txt_bold">{{ data.sttl.SALES }}%</td>
                                                <td></td>
                                                <td></td>
                                                <td class="txt_bold">{{ data.sttl.DAYQTY }}</td>
                                                <td>{{ data.sttl.STOCK | currency }}</td>
                                            </tr>
                                            </template>
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
  name: "WEE0301",
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
      choiceYear: null,
      choiceMonth: null,
      outFromDate: null,
      outToDate: null,
      standardDate: null, // 기준일
      saleStartDate: null, // 기간판매 시작 날짜
      saleEndDate: null, // 기간판매 끝 날짜
      paramOutFromDate: null, // 파라미터로 넘길 기준일
      paramOutToDate: null, // 파라미터로 넘길 기준일 끝 날짜
    //   paramStandardDate: null, // 파라미터로 넘길 기준일 끝 날짜
      foreign: "f_include",
      foreignList: [ // 해외매장 배열 하드코딩
        { id: "f_include", title: "해외매장 포함" },
        { id: "f_except", title: "해외매장 제외" },
        { id: "f_store", title: "해외매장" }
      ],
      styleListData: [], // 신상품반응조사 STYCD 데이터
      styleDetailData: [], // 스타일별 상세 리스트
      styleStoreData: [], // 스타일별 매장
      styleTotData: {MCNT:"", TOTPQTY:"", INQTY:"", CHINASQTY:"", DOMPQTY:"", DOMQTY:"", UNSTOCKED:"", SQTY:"", SALES:"", SALDT:"", STOCK:"", DAYQTY:""}, // 전체 합산 데이터
      noResult: false,
    }
  },
  created() {
    // 출고 달력 디폴트 from날짜
    this.outFromDate = moment().subtract(14, 'days').format('YYYY-MM-DD')
    // 출고 달력 디폴트 to날짜
    this.outToDate = moment().format('YYYY-MM-DD')
    // 기준일 달력 디폴트 날짜
    this.standardDate = moment().day('0').format('YYYY-MM-DD')

    let outFromMoment = moment(this.outFromDate, 'YYYY-MM-DD')
    let outToMoment = moment(this.outToDate, 'YYYY-MM-DD')
    let standardMoment = moment(this.standardDate, 'YYYY-MM-DD')

    // 선택한 년도
    this.choiceYear = standardMoment.clone().format('YYYY')
    // 선택한 월
    this.choiceMonth = standardMoment.clone().format('MM')
    // 선택한 일
    this.choiceDay = standardMoment.clone().format('DD')

    // 기간판매 시작 날짜
    this.saleStartDate = standardMoment.clone().subtract(6, 'days').format('YY-MM-DD')
    // 기간판매 끝 날짜
    this.saleEndDate = standardMoment.clone().format('YY-MM-DD')

    // 파라미터로 넘길 출고일 from날짜
    this.paramOutFromDate = outFromMoment.clone().format('YYYYMMDD')
    // 파라미터로 넘길 출고일 to날짜
    this.paramOutToDate = outToMoment.clone().format('YYYYMMDD')
    // 파라미터로 넘길 기준일 from날짜
    this.paramStFromDate = standardMoment.clone().subtract(6, 'days').format('YYYYMMDD')
    // 파라미터로 넘길 기준일 to날짜
    this.paramStToDate = standardMoment.clone().format('YYYYMMDD')

    console.log("3 data >>> "+this.data+" / "+this.selectSucd)
    if(this.data) {
      this.selectSucd = this.data.selectSucd
    } else {
      this.selectSucd = this.authCodeList[0].MCODE
    }
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
  },
  methods: {
    loadData() {
      if (this.CODECardsList.length <= 0) {
        return
      }

      this.get0301MakeDataDate()
      this.getStyle()
    },
    changeData() {
        let outFromMoment = moment(this.outFromDate, 'YYYY-MM-DD')
        let outToMoment = moment(this.outToDate, 'YYYY-MM-DD')
        let standardMoment = moment(this.standardDate, 'YYYY-MM-DD')

        // 선택한 년도
        this.choiceYear = standardMoment.clone().format('YYYY')
        // 선택한 월
        this.choiceMonth = standardMoment.clone().format('MM')
        // 선택한 일
        this.choiceDay = standardMoment.clone().format('DD')

        // 기간판매 시작 날짜
        this.saleStartDate = standardMoment.clone().subtract(6, 'days').format('YY-MM-DD')
        // 기간판매 끝 날짜
        this.saleEndDate = standardMoment.clone().format('YY-MM-DD')

        // 파라미터로 넘길 출고일 from날짜
        this.paramOutFromDate = outFromMoment.clone().format('YYYYMMDD')
        // 파라미터로 넘길 출고일 to날짜
        this.paramOutToDate = outToMoment.clone().format('YYYYMMDD')
        // 파라미터로 넘길 기준일 from날짜
        this.paramStFromDate = standardMoment.clone().subtract(6, 'days').format('YYYYMMDD')
        // 파라미터로 넘길 기준일 to날짜
        this.paramStToDate = standardMoment.clone().format('YYYYMMDD')

        this.loadData()
    },
    changeSucd(code) {
      this.selectSucd = code
      this.changeData()
      // this.loadData()
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
    get0301MakeDataDate(){
      this.req2svr.get0301MakeDataDate().then(
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
    getStyle() {
        // 신상품반응조사 MAINSTYCD 데이터
        this.req2svr.getStyle(this.selectSucd,
                            this.paramOutFromDate, this.paramOutToDate,
                            this.paramStFromDate, this.paramStToDate).then(
        async res => {
            // 신상품반응조사 MAINSTYCD 데이터
            this.styleListData = []

            if (res.MACHBASE_ERROR) {
                console.log("res", res)
                if(res.MACHBASE_ERROR.indexOf("-100") > -1){
                    this.noResult = true;
                    this.styleTotData = { MCNT:"",TOTPQTY:"", INQTY:"", CHINASQTY:"", DOMPQTY:"", DOMQTY:"", UNSTOCKED:"", SQTY:"", SALES:"", SALDT:"", STOCK:"", DAYQTY:"" }
                } else {
                    this.noResult = false;
                }
            } else {
                this.noResult = false;
                
                let count = (JSON.stringify(res).match(/{/g) || []).length

                if(count < 1) {
                } else if(count == 1) {
                    this.styleListData.push(res)
                } else {
                    this.styleListData = JSON.parse("[" + res + "]")
                }

                // 로우별 S-TTL 데이터 초기세팅(안해주면 에러남)
                for(let i=0; i<this.styleListData.length; i++) {
                    this.$set(this.styleListData[i], 'sttl', { TOTPQTY:"", INQTY:"", CHINASQTY:"", DOMPQTY:"", DOMQTY:"", UNSTOCKED:"", SQTY:"", SALES:"", SALDT:"", STOCK:"", DAYQTY:"" })
                }

                // 신상품반응조사 매장별 판매수량 호출
                let promises = []
                for(let i=0; i<this.styleListData.length ;i++) {
                    promises.push(this.getStyleDetail(i , this.styleListData[i].STYCD))
                    this.getStyleStore(i , this.styleListData[i].STYCD)
                }

                // getStyleDetail for문 끝내고 this.getStylTTL() 호출하기 위함
                await Promise.all(promises)

                this.getStylTTL()

                console.log("styleListData >>> ", this.styleListData)
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyleDetail(i , stycd) {
        // 주간판매 현황 BEST 20 (판매수량 기준) 매장별 판매수량
        return this.req2svr.getStyleDetail(stycd, this.selectSucd,
                                        this.paramOutFromDate, this.paramOutToDate,
                                        this.paramStFromDate, this.paramStToDate).then(
        res => {
            // 스타일별 상세 리스트
            this.styleDetailData = []
            
            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length;
            
                if(count < 1) {
                } else if(count == 1) {
                    this.styleDetailData.push(res)
                } else {
                    this.styleDetailData = JSON.parse("[" + res + "]")
                }
                
                for(let i=0; i<this.styleDetailData.length; i++) {
                    let today = moment().format("YYYYMMDD")
                    // 판매일수
                    this.styleDetailData[i].SALDT = moment(this.standardDate).diff(this.styleDetailData[i].OUTDT , "days")
                    // 일평균 판매량
                    this.styleDetailData[i].DAYQTY = (this.styleDetailData[i].SQTY/this.styleDetailData[i].SALDT).toFixed(1)
                }

                // 로우별 컬러별 데이터 total 데이터
                let TOTPQTY = _.sumBy(this.styleDetailData, function(o) { return Number(o.TOTPQTY) })
                let INQTY = _.sumBy(this.styleDetailData, function(o) { return Number(o.INQTY) })
                let CHINASQTY = _.sumBy(this.styleDetailData, function(o) { return Number(o.CHINASQTY) })
                let DOMPQTY = _.sumBy(this.styleDetailData, function(o) { return Number(o.DOMPQTY) })
                let DOMQTY = _.sumBy(this.styleDetailData, function(o) { return Number(o.DOMQTY) })
                let UNSTOCKED = _.sumBy(this.styleDetailData, function(o) { return Number(o.UNSTOCKED) })
                let SQTY = _.sumBy(this.styleDetailData, function(o) { return Number(o.SQTY) })
                let SALES = 0
                let SALDT = _.sumBy(this.styleDetailData, function(o) { return Number(o.SALDT) })
                let STOCK = _.sumBy(this.styleDetailData, function(o) { return Number(o.STOCK) })
                let DAYQTY = 0

                if((INQTY-CHINASQTY) != 0) {
                    SALES = (SQTY/(INQTY-CHINASQTY) * 100).toFixed(1)
                }

                if(SALDT != 0) {
                    DAYQTY = (SQTY/SALDT).toFixed(1)
                }

                // 로우별 S-TTL 데이터
                let sttl = { TOTPQTY:"", INQTY:"", CHINASQTY:"", DOMPQTY:"", DOMQTY:"", UNSTOCKED:"", SQTY:"", SALES:"", SALDT:"", STOCK:"", DAYQTY:"" }
                sttl = { TOTPQTY:TOTPQTY, INQTY:INQTY, CHINASQTY:CHINASQTY, DOMPQTY:DOMPQTY, DOMQTY:DOMQTY, 
                UNSTOCKED:UNSTOCKED, SQTY:SQTY, SALES:SALES, SALDT:SALDT, STOCK:STOCK, DAYQTY:DAYQTY }

                this.$set(this.styleListData[i], 'sttl', sttl)

                // 로우별 컬러별 데이터
                this.$set(this.styleListData[i], 'total', this.styleDetailData)
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStyleStore(i , stycd) {
        // 스타일별 매장
        this.req2svr.getStyleStore(stycd, this.selectSucd,
                                this.paramOutFromDate, this.paramOutToDate,
                                this.paramStFromDate, this.paramStToDate).then(
        res => {
            // 스타일별 매장
            this.styleStoreData = []
            
            if (res.MACHBASE_ERROR) {
                console.log("res", res)
            } else {
                let count = (JSON.stringify(res).match(/{/g) || []).length;
            
                if(count < 1) {
                } else if(count == 1) {
                    this.styleStoreData.push(res)
                } else {
                    this.styleStoreData = JSON.parse("[" + res + "]")
                }

                // 매장 8개씩 자름
                this.styleStoreData = this.styleStoreData.slice(0, 8)

                this.$set(this.styleListData[i], 'store', this.styleStoreData)
            }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getStylTTL() {
        let MCNT = 0
        let TOTPQTY = 0
        let INQTY = 0
        let CHINASQTY = 0
        let DOMPQTY = 0
        let DOMQTY = 0
        let UNSTOCKED = 0
        let SQTY = 0
        let SALES = 0
        let SALDT = 0
        let STOCK = 0
        let DAYQTY = 0

        // 전체 합산 데이터
        for(let i=0; i<this.styleListData.length; i++) {
            MCNT += Number(this.styleListData[i].total.length)
            TOTPQTY += Number(this.styleListData[i].sttl.TOTPQTY)
            INQTY += Number(this.styleListData[i].sttl.INQTY)
            CHINASQTY += Number(this.styleListData[i].sttl.CHINASQTY)
            DOMPQTY += Number(this.styleListData[i].sttl.DOMPQTY)
            DOMQTY += Number(this.styleListData[i].sttl.DOMQTY)
            UNSTOCKED += Number(this.styleListData[i].sttl.UNSTOCKED)
            SQTY += Number(this.styleListData[i].sttl.SQTY)
            SALDT += Number(this.styleListData[i].sttl.SALDT)
            STOCK += Number(this.styleListData[i].sttl.STOCK)
        }

        this.styleTotData.MCNT = MCNT
        this.styleTotData.TOTPQTY = TOTPQTY
        this.styleTotData.INQTY = INQTY
        this.styleTotData.CHINASQTY = CHINASQTY
        this.styleTotData.DOMPQTY = DOMPQTY
        this.styleTotData.DOMQTY = DOMQTY
        this.styleTotData.UNSTOCKED = UNSTOCKED
        this.styleTotData.SQTY = SQTY
        this.styleTotData.SALDT = SALDT
        this.styleTotData.STOCK = STOCK

        if((INQTY-CHINASQTY) != 0) {
            this.styleTotData.SALES = (Number(SQTY)/(Number(INQTY)-Number(CHINASQTY)) * 100).toFixed(1)
        }

        if(SALDT != 0) {
            this.styleTotData.DAYQTY = (Number(SQTY)/Number(SALDT)).toFixed(1)
        }
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
        var testimg = $(".DIMAGEPATH");
        alert($(this).exif("Orientation"))
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