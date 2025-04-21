<template>
  <!-- aside 붙었을때 클래스 : aside_layout -->
  <!-- <div class="wrap aside_layout"> -->
  <div class="wrap">
    <detailPopup v-if="showDetail" 
      :data="editData"
      @close="hideDetailPopup"
    ></detailPopup>
    <designdetailPopup
      v-if="showDesignDetail"
      :designerPopupData="designerPopupData"
      :CODE="this.SUCD"
      :gubun="gubun"
      :ReOrder="this.ReOrder"
      @close="hideDesignDetailPopup"
    />
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
        <button
          type="button"
          class="btn_n btn_icon btn_prev"
          @click="toBack"
        ><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">{{ TITLE }}
          <span v-if="MAINSTYCD != STYCODE && selectStyle != 0 && RESEQ > 0" class="chip chip_m chip_sty04 box_chip chip_re"><span class="chip_text">리오더</span><span class="txt_num">{{ CLOTH.RESEQ }}</span></span>
          <span v-if="MAINSTYCD != STYCODE && selectStyle != 0 && RESEQ == 0" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
          <span v-if="MAINSTYCD == STYCODE && selectStyle != 0" class="chip chip_m chip_sty02 box_chip chip_re"><span class="chip_text">메인</span></span>
        </h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ makeDataDate }}</small></div>
        <!-- 사업부별 추가 -->
        <div class="groups">
          <div class="select_box">
            <select class="select" v-model="selectStyle" @change="changeStyle()" style="min-width: 200px;">
              <option v-for="data in KINDOFSTYLE" :key="data.STYCD" :value="data.STYCD">{{ data.STYCD }}</option>
              <option :value="0">리오더포함 TOTAL</option>
            </select>
          </div>
          <div class="select_box">
            <select class="select" v-model="foreign" @change="changeData()" style="min-width: 200px;">
              <option v-for="data in ft_china" :key="data.CODE" :value="data.CODE">{{ data.TEXT }}</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <div class="container cont_info sty_style">
      <div class="content">
        <div class="row">
          <div class="col_md_3">
            <div class="box">
              <div class="inner">
                <div class="img_photo">
                  <!-- <img v-if="CLOTH.DIMAGEPATH" :src="CLOTH.DIMAGEPATH" :alt="CLOTH.STYCD"/> -->
                  <img style="height:100%;width:unset;" v-if="CLOTH.DIMAGEPATH" :src="CLOTH.DIMAGEPATH" :alt="CLOTH.STYCD"/>
                  <img style="height:100%;width:unset;" v-else-if="CLOTH.MAINDIMAGEPATH" :src="CLOTH.MAINDIMAGEPATH" :alt="CLOTH.STYCD" />
                </div>
                <div class="box_info" v-if="selectStyle != 0">
                  <button
                    type="button"
                    class="btn_n btn_view"
                    @click="toDetail"
                  ><i class="material-icons">add_circle_outline</i>VIEW STYLE INFO</button>
                </div>
              </div>
            </div>

            <div class="cont_box">
              <div class="cont">
                <div class="info_list">
                  <ul class="list">
                    <li>
                      <strong class="title">디자이너</strong>
                      <span class="cont">{{ CLOTH.EMPNAME }}</span>
                    </li>
                    <li>
                      <strong class="title">소재</strong>
                      <span class="cont">{{ CLOTH.SOJAENM }}</span>
                    </li>
                    <li>
                      <strong class="title">소재명/소재업체</strong>
                      <span class="cont" v-if="CLOTH.PRDTGU == '1'">{{ CLOTH.SOJAENMOG }}</span>
                      <span class="cont" v-else-if="CLOTH.PRDTGU == '2'">{{ CLOTH.SOJAENMOG }} / {{ CLOTH.CUSTNM }}</span>
                    </li>
                    <li>
                      <strong class="title">임가공업체</strong>
                      <span class="cont" v-if="CLOTH.PRDTGU == '1'">{{ CLOTH.CUSTNM }}</span>
                      <span class="cont" v-else-if="CLOTH.PRDTGU == '2'"></span>
                    </li>
                    <li>
                      <strong class="title">TAG가 (원)</strong>
                      <span class="cont">{{ CLOTH.TAGPRI | currency }}</span>
                    </li>
                    <li>
                      <strong class="title">현재가</strong>
                      <span class="cont">{{ CLOTH.MIN_SALEPRI | currency }} ~ {{ CLOTH.MAX_SALEPRI | currency }}</span>
                    </li>
                    <li>
                      <strong class="title">출고일</strong>
                      <span class="cont">{{ OUTDT }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col_md_9">
            <div class="row row_box">
              <div class="col_md_6" style="min-height:320px;">
                <!-- box1 -->
                <div class="cont_box">
                  <div class="tit">
                    <strong class="tit_txt">누적 판매실적</strong>
                    <span class="txt">(출고일 ~ 현재)</span>
                    <div class="layout_spacer"></div>
                    <span class="txt">(물류입고 : {{ INOUTQTY.INQTY | currency }}개 | 물류출고 : {{ INOUTQTY.OUTQTY | currency }}개)</span>
                  </div>
                  <div class="cont">
                    <div class="row">
                      <div class="col_md_7">
                        <div class="graph_cont">
                          <span class="view">
                            <span class="tit">수량기준<small>(누적판매율)</small></span>
                            <span class="txt_num">{{ ACC_SALE_DATA.ACC_QTY_RATE | nanToDot }}<small>%</small></span>
                          </span>
                          <strong class="graph line_bar">
                            <span class="bar" :style="{width: convertPercent(ACC_SALE_DATA.ACC_QTY_RATE) +'%'}"></span>
                          </strong>
                        </div>
                        <div class="graph_cont">
                          <span class="view">
                            <span class="tit">금액기준<small>(누적판매율)</small></span>
                            <span class="txt_num">{{ ACC_SALE_DATA.ACC_AMT_RATE | nanToDot }}<small>%</small></span>
                          </span>
                          <strong class="graph line_bar">
                            <span class="bar" :style="{width: convertPercent(ACC_SALE_DATA.ACC_AMT_RATE) +'%'}"></span>
                          </strong>
                        </div>
                      </div>
                      <!-- <div class="col_md_5">
                        <div class="result_view">
                          <dl>
                            <dt class="tit">누적판매금액</dt>
                            <dd class="txt_result">{{ Math.round(ACC_SALE_DATA.SILAMT/1000000) | currency }}<small class="txt">백만원</small></dd>
                          </dl>
                        </div>
                      </div> -->
                      <div class="col_md_5 np">
                        <div class="result_view_division">
                          <div class="vertical_division">
                            <div class="pb10">누적판매수량</div>
                            <div><strong class="em_obj">{{ ACC_SALE_DATA.SQTY | currency }}</strong></div>
                            <div>개</div>
                          </div>
                          <div class="vertical_division">
                            <div class="pb10">누적판매금액</div>
                            <div><strong class="em_obj">{{ Math.round(ACC_SALE_DATA.SILAMT/1000000) | currency }}</strong></div>
                            <div>백만원</div>
                          </div>
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
                    <strong class="tit_txt">기판실적</strong>
                    <span class="txt">({{ JRSTARTDATE }} ~ {{ JRENDDATE }})</span>
                  </div>
                  <div class="cont">
                    <div class="graph_area graph_list2">
                      <!-- 그래프 1 -->
                      <div class="graph_view" style="width:50%;">
                        <!-- 텍스트 값 -->
                        <div class="graph_result gr_s">
                          <dl>
                            <dt class="tit">수량</dt>
                            <dd class="txt_result txt_s">{{ dr_S.SQTY | currency }}<small>개</small></dd>
                          </dl>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph">
                          <div style="position:relative; width:100%; height:115px; float:left;">
                            <div id="chartdiv1" style="position:relative; width:100%; height:100%;"></div>
                          </div>
                        </div>
                      </div>
                      <!-- 그래프 2 -->
                      <div class="graph_view" style="width:50%;">
                        <!-- 텍스트 값 -->
                        <div class="graph_result gr_s">
                          <dl>
                            <dt class="tit">금액</dt>
                            <dd class="txt_result txt_s">{{ Math.round(dr_S.SILAMT/1000) | currency }}<small>천원</small></dd>
                            <!-- <dd class="txt_etc">
                              <span class="chip chip_m box_chip chip_sty01">
                                  <span class="chip_text">선수금</span>
                              </span>
                              <em class="point_col1">230 천원</em>
                            </dd> -->
                          </dl>
                        </div>
                        <!-- 그래프 -->
                        <div class="graph">
                          <div style="position:relative; width:100%; height:115px; float:left;">
                            <div id="chartdiv2" style="position:relative; width:100%; height:100%;"></div>
                          </div>
                        </div>
                      </div>
                      <!-- 카테고리 -->
                      <div class="graph_category">
                        <ul>
                          <li><span class="ico_dot" style="background-color:#3f93f5;"></span>정상매출</li>
                          <li><span class="ico_dot" style="background-color:#ff7f92;"></span>할인</li>
                          <li><span class="ico_dot" style="background-color:#ffb83c;"></span>균일</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- box2 -->
            <div class="cont_box">
              <div class="tit">
                <div class="tab">
                  <ul>
                    <li :class="{on: tab == 0}"><a href="javascript:void(0);" @click="chageTab(0)">판매수량 추이</a></li>
                    <li :class="{on: tab == 1}"><a href="javascript:void(0);" @click="chageTab(1)">판매금액 추이</a></li>
                    <li :class="{on: tab == 2}"><a href="javascript:void(0);" @click="chageTab(2)">판매율 추이</a></li>
                  </ul>
                </div>
                <div class="layout_spacer"></div>
                <span class="txt">(출고일~현재날짜)</span>
              </div>
              <div class="cont">
                <div class="graph_area col_md_12">
                  <div class="graph_view">
                    <div class="graph_category" style="position:relative; width:98%; height:360px;">
                      <div id="chartdiv3" style="position:relative; width:100%; height:100%; float:left;"></div>
                    </div>
                  </div>
                </div>

                <div class="cont_box" style="min-height:0;">
                  <div class="tit">
                    <div class="layout_spacer"></div>
                    <span class="txt" v-if="tab == 0">판매수량</span>
                    <span class="txt" v-else-if="tab == 1">판매금액 / 단위:천원</span>
                    <span class="txt" v-else-if="tab == 2">판매금액 기준 / 단위:천원</span>
                  </div>
                </div>

                <div class="tbl_sheet" v-if="tab == 0" style="width: 1390px; overflow-x: auto">
                    <table class="tbl tbl_center bb0" style="width: 1390px; table-layout: fixed">
                      <colgroup>
                        <col style="width:159px;">
                        <col style="width:159px;">
                        <col style="width:97px;" v-for="(data,index) in proDates" :key="index">
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">Main Style</th>
                          <th scope="col">Style-No.</th>
                          <th scope="col" v-for="(data,index) in proDates" :key="index">{{ data | currency }}</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(STYCD,index) in proClothNum" :key="index">
                          <td v-if="index == 0">{{ MAINSTYCD }}</td><td v-else>&nbsp;</td>
                          <td>{{ STYCD }}</td>
                          <td v-for="(data,index) in proDates" :key="index">{{ getSqtyProData(STYCD, data) | currency }}</td>
                        </tr>
                        <tr class="tbl_total">
                          <td>&nbsp;</td>
                          <td>합계</td>
                          <td v-for="(data,index) in proSqtyDataSum" :key="index">{{ data | currency }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  

                  <div class="tbl_sheet" v-if="tab == 1 || tab == 2" style="width: 1390px; overflow-x: auto">
                    <table class="tbl tbl_center bb0" style="width: 1390px; table-layout: fixed">
                      <colgroup>
                        <col style="width:159px;">
                        <col style="width:159px;">
                        <col style="width:97px;" v-for="(data,index) in proDates" :key="index">
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">Main Style</th>
                          <th scope="col">Style-No.</th>
                          <th scope="col" v-for="(data,index) in proDates" :key="index">{{ data }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(STYCD,index) in proClothNum" :key="index">
                          <td v-if="index == 0">{{ MAINSTYCD }}</td><td v-else>&nbsp;</td>
                          <td>{{ STYCD }}</td>
                          <td v-for="(data,index) in proDates" :key="index">{{ getAmtProData(STYCD, data) | currency }}</td>
                        </tr>
                        <tr class="tbl_total">
                          <td>&nbsp;</td>
                          <td>합계</td>
                          <td v-for="(data,index) in proAmtDataSum" :key="index">{{ data | currency }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

              </div> <!-- class="cont_box" -->
            </div> <!-- class="cont_box" -->
          </div> <!-- class="col_md_9" -->
        </div> <!-- class="row" -->
      </div> <!-- class="content" -->
    </div> <!-- class="container cont_info sty_style" -->

    <!-- aside_designer -->
    <!-- <div class="aside">
      < !-- <strong class="aside_title"><span><em class="txt">MI</em>Top 10</span></strong> -- >
      <div class="aside_title" style="background-color: #252733;"></div>
      <div class="list_cont scroll_cont">
        <ul class="list">
          <li v-for="data in DESIGNER" :key="data.DESIGNER" @click="toDesignDetail(data)">
            <a href="javascript:void(0);" class="btn_designer_view" >
              <span class="img_photo w">
                <img v-if="imageExist(data.PHOTOPATH)" :src="data.PHOTOPATH" :alt="data.EMPNAME"/>
                <img v-else src="@/assets/images/bg_designer_w.png"/>
              </span>
              <span class="txt_name">{{ data.EMPNAME }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import sideMenu from '@/components/sideMenu'
import detailPopup from '@/pages/style/NEWSTY0102'
import designdetailPopup from '@/pages/style/STY0201'

export default {
  name: "NEWSTY0101",
  components: {
    sideMenu,
    detailPopup,
    designdetailPopup
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.loadData()

    this.makeChart1()
    this.makeChart2()
    // this.makeChart3()
  },
  data() {
    return {
      proClothNum: [],
      proDates: [],
      proDataList: [],
      proSqtySumList: [],
      proAmtSumList: [],
      drawer: null,
      date: null,      
      year: "",
      month: "",
      saleStartDate: "",
      saleEndDate: "",
      MAINSTYCD: "",
      RESEQ: "",
      STYCODE: "",
      CLOTH: {},
      ACC_SALE_DATA: {},
      ACC_SALE_RATE: {},
      DESIGNER: [],
      KINDOFSTYLE: [],
      // 기판실적
      dr_S: {
        JSQTY: 0, DCSQTY: 0, GSQTY: 0, JSAMT: 0, DCSAMT: 0, GSAMT: 0,
        JRQTY: 0, DCRQTY: 0, GRQTY: 0, JRAMT: 0, DCRAMT: 0, GRAMT: 0,
        SQTY: 0, SILAMT: 0
      },
      showDetail: false,
      showDesignDetail: false,
      designerPopupData: "",
      gubun: "detail",
      SUCD: "",
      ReOrder: "",
      foreign: "",
      gubuns: "",
      gubun_a: "",
      INOUTQTY: {},
      selectStyle: null,
      editData: {},
      makeDataDate: null,
      kindOfStyleList: [],
      TITLE: "",
      ft_china: [
        {CODE: "f_include", TEXT: "해외매장 포함"},
        {CODE: "f_except", TEXT: "해외매장 제외"},
        {CODE: "f_store", TEXT: "해외매장 "}
      ],
      tab: 0,
      inoutStartDate: {}
    }
  },
  created() {
    if (!this.data) {
      this.$router.replace("/STY0001")
      return
    }

    this.editData = _.cloneDeep(this.data)

    this.showDetail = false
    this.showDesignDetail = false

    this.initData()

    this.year = moment().format("YYYY");
    this.month = moment().format("M");
  },
  computed: {
    req2svr: () => req2svr,
    OUTDT(){
      if (this.CLOTH.OUTDT) {
        return  moment(this.CLOTH.OUTDT).format("YYYY-MM-DD")
      }
      return ""
    },
    JRSTARTDATE(){
      return  moment(this.saleStartDate).format("YY-MM-DD")
    },
    JRENDDATE(){
      return  moment(this.saleEndDate).format("YY-MM-DD")
    },
    proDataFlat() {
      return _.flatten(this.proDataList)
    },
    proSqtyDataSum() {      
      return _(this.proDates).map(date => {
        return {sum: _(this.proDataFlat).filter({date}).sumBy(({SQTY}) => + Number(SQTY)), sort: date}
      } ).orderBy('sort').map('sum').value()
    },
    proAmtDataSum() {
      return _(this.proDates).map(date => {
        return {sum: _(this.proDataFlat).filter({date}).sumBy(({SILAMT}) => + Number(SILAMT)), sort: date}
      } ).orderBy('sort').map('sum').value()
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
  },
  methods: {
    getSqtyProData(STYCD, date) {
      let return_val = _.chain(this.proDataFlat).find({
        STYCD, date
      }).get('SQTY').value() || '0'

      if(return_val == 0){
        return_val = ' '
      }

      return return_val
    },
    getAmtProData(STYCD, date) {
      let return_val = _.chain(this.proDataFlat).find({
        STYCD, date
      }).get('SILAMT').value() || '0'

      if(return_val == 0){
        return_val = ' '
      }

      return return_val

    },
    initData() {
      // this.STYCODE = "MIHBWPT510"
      this.SUCD = this.data.sucd
      this.TITLE = this.data.STYCODE
      this.STYCODE = this.data.STYCODE
      this.MAINSTYCD = this.data.MAINSTYCD,
      this.RESEQ = this.data.RESEQ,
      this.saleStartDate = this.data.saleStartDate
      this.saleEndDate = this.data.saleEndDate
      this.ReOrder = this.data.ReOrder
      this.foreign = this.data.foreign
      this.gubun_a = this.data.gubun_a
      this.gubuns = this.data.gubuns
    },
    async loadData() {
      // 데이터 기준일
      this.getMakeDataDate()

      // const propmises = []

      // 리오더 스타일 불러오기
      await this.getKindOfStyle()
      // 옷 상세 정보
      await this.getClothData()
      // 누적판매 실적
      await this.getAccClothSaleData()
      // 기판실적 입고,출고
      await this.getInOutQty()
      // 기판실적
      await this.getClothJRData()
      // 누적 판매율 추이
      await this.getAccClothSaleRate()
      // 최초 출고일
      await this.getInOutDt()

      // await Promise.all(propmises)

      // 판매수량 추이 그래프
      return this.makeChart3()

      //  디자이너 정보
      // this.getDesignerData()
    },
    changeStyle: function() {
      // 상세화면을 위한 가공
      this.editData.STYCODE = this.selectStyle

      // 상세화면 타이틀
      if(this.selectStyle == 0){
        this.TITLE = "스타일 전체"
      } else {
        this.TITLE = this.selectStyle
      }

      // 스타일 변경시 선택한 스타일 코드 대입
      this.STYCODE = this.selectStyle

      // 스타일 변경시 데이터 로드
      this.changeData()
    },
    async changeData() {
      // 셀렉박스 옵션 바뀔때마다 리셋후 재설정
      this.proDataList = []

      const propmises = []

      // 옷 상세 정보
      propmises.push(this.getClothData())
      // 누적판매 실적
      propmises.push(this.getAccClothSaleData())
      // 기판실적 입고,출고
      propmises.push(this.getInOutQty())
      // 기판실적
      propmises.push(this.getClothJRData())
      // 누적 판매율 추이
      propmises.push(this.getAccClothSaleRate())
      // 최초 출고일
      propmises.push(this.getInOutDt())

      await Promise.all(propmises)

      if(this.tab == 0){
        return this.makeChart3()
      } else if(this.tab == 1){
        return this.makeChart4()
      } else if(this.tab == 2){
        return this.makeChart5()
      }
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
    getClothData: function() {
      // 의상 상세 정보
      let styleCode = this.STYCODE // 스타일중 하나 선택
      if(this.selectStyle == 0){ // 리오더포함 Total 선택일때 메인 스타일값 사져오기
        styleCode = this.KINDOFSTYLE[0].STYCD
      }
      
      return this.req2svr.getClothData(styleCode, this.SUCD).then(
        res => {
          this.CLOTH = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.CLOTH = res
            } else {
              this.CLOTH = (JSON.parse("[" + res + "]"))[0]
            }
          }

          // VIEW STYLE INFO에서 브랜드 코드를 필요로함
          this.editData.BRCD = this.CLOTH.BRCD

          if(this.STYCODE == this.MAINSTYCD){
            this.editData.MRGU = "M"
          } else {
            this.editData.MRGU = "R"
          }
          this.editData.RESEQ = this.CLOTH.RESEQ
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getKindOfStyle: function() {
      // 스타일 리오더 종류
      return this.req2svr.getKindOfStyle(this.MAINSTYCD, this.SUCD).then(
        res => {
          this.KINDOFSTYLE = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.KINDOFSTYLE.push(res)
            } else {
              this.KINDOFSTYLE = JSON.parse("[" + res + "]")
            }
            this.kindOfStyleList = _.map(this.KINDOFSTYLE, "STYCD")
          }

          // 최초 한번만 메인에서 물고 들어온 스타일 코드 디폴드 선택
          if(this.ReOrder == true){
            this.selectStyle = 0
            this.TITLE = "스타일 전체"
          } else {
            this.selectStyle = this.STYCODE
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getAccClothSaleData: function() {      
      return this.req2svr.getAccClothSaleData(this.gubun_a, this.gubuns, this.foreign, this.selectStyle, this.STYCODE, this.SUCD, this.kindOfStyleList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
            this.ACC_SALE_DATA = {ACC_QTY_RATE: 0, ACC_AMT_RATE: 0, SILAMT: 0, SQTY:0};
          } else {
            this.ACC_SALE_DATA = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getInOutQty: function() {
      // 기판실적 입고,출고      
      return this.req2svr.getInOutQty(this.selectStyle, this.STYCODE, this.SUCD, this.kindOfStyleList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.INOUTQTY = res;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )

    },
    getClothJRData: function() {      
      return this.req2svr.getClothJRData(this.gubun_a, this.gubuns, this.foreign, this.selectStyle, this.STYCODE, this.SUCD, this.saleStartDate, this.saleEndDate, this.kindOfStyleList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else {
              this.dr_S.SQTY = Number(res.SQTY) // 매출수량
              this.dr_S.SILAMT = Number(res.SILAMT) // 매출금액
              this.dr_S.JSQTY = Number(res.JSQTY) // 정상수량
              this.dr_S.DCSQTY = Number(res.DCSQTY) // 할인수량
              this.dr_S.GSQTY = Number(res.GSQTY) // 균일수량
              this.dr_S.JRQTY = Number(res.JRQTY) // 정상반품수량
              this.dr_S.DCRQTY = Number(res.DCRQTY) // 할인반품수량
              this.dr_S.GRQTY = Number(res.GRQTY) // 균일반품수량
              this.dr_S.JSAMT = Number(res.JSAMT) // 정상금액
              this.dr_S.DCSAMT = Number(res.DCSAMT) // 할인금액
              this.dr_S.GSAMT = Number(res.GSAMT) // 균일금액
              this.dr_S.JRAMT = Number(res.JRAMT) // 정상반품금액
              this.dr_S.DCRAMT = Number(res.DCRAMT) // 할인반품금액
              this.dr_S.GRAMT = Number(res.GRAMT) // 균일반품금액
            }
            this.makeChart1()
            this.makeChart2()
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getAccClothSaleRate: function() {

      return this.req2svr.getAccClothSaleRate(this.gubun_a, this.gubuns, this.foreign, this.selectStyle, this.STYCODE, this.SUCD, this.kindOfStyleList.toString()).then(
        res => {
          this.ACC_SALE_RATE = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.ACC_SALE_RATE.push(res);
            } else {
              let list = JSON.parse("[" + res + "]");
              for (let i=0;i<list.length;i++) {
                this.ACC_SALE_RATE.push(
                  {
                    ACC_QTY_RATE: list[i].ACC_QTY_RATE,
                    ACC_AMT_RATE: list[i].ACC_AMT_RATE,
                    INOUTDT: moment(list[i].INOUTDT).format("M/D"),
                  }
                )
              }
            }
          }
          // this.makeChart5();
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getInOutDt(val) {
      return this.req2svr.getInOutDt(this.selectStyle, this.STYCODE, this.kindOfStyleList.toString()).then(
        async res => {
          this.inoutStartDate = {}
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.inoutStartDate = res
            // 셀렉박스 옵션 바뀔때마다 리셋후 재설정
            this.proClothNum = []
            if(this.selectStyle == 0){
              this.proClothNum = _.map(this.KINDOFSTYLE, "STYCD")
            } else {
              this.proClothNum.push(this.selectStyle)
            }
            
          }

          // 마지막 날이 평일인 경우 그주에 6일을 더해 뒤의 일요일을 구함(요구사항)
          let endMoment = moment()
          let startMoment = moment(this.inoutStartDate.MIN_INOUTDT, 'YYYYMMDD').day('Mondey')
          // let startMoment = moment(this.inoutStartDate.MIN_INOUTDT, 'MM/DD')
          this.proDates = []

          const promises = []

          for(let i=0; startMoment.add(7, 'day') <= endMoment; i++){
            this.proDates.push(startMoment.format('YY/MM/DD'))
            
            let paramTo = startMoment.format('YYYYMMDD')
            let paramFrom = moment(paramTo).subtract(6, 'day').format('YYYYMMDD')

            // if(i == 0){
            //   paramFrom = moment(paramTo).subtract(7, 'day').format('YYYYMMDD')
            // } else {
            //   paramFrom = moment(paramTo).subtract(6, 'day').format('YYYYMMDD')
            // }

            promises.push(this.getSqtyData(paramFrom , paramTo))
          }

          if(moment().day() != 1){
            this.proDates.push(moment().subtract(1, 'day').format('YY/MM/DD'))

            let paramFrom = moment().day('1').format('YYYYMMDD')
            let paramTo = moment().subtract(1, 'day').format('YYYYMMDD')

            
            promises.push(this.getSqtyData(paramFrom , paramTo))
          }

          await Promise.all(promises)
          

        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getSqtyData(fromDate , toDate) {
      return this.req2svr.getSqtyData(fromDate, toDate, this.gubun_a, this.gubuns, this.foreign, this.selectStyle, this.STYCODE, this.kindOfStyleList.toString()).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.proDataList.push([res]);
            } else {
              this.proDataList.push(JSON.parse("[" + res + "]"))
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    chageTab: function(val) {
      this.tab = val

      if(this.tab == 0){
        this.makeChart3()
      } else if(this.tab == 1){
        this.makeChart4()
      } else if(this.tab == 2){
        this.makeChart5()
      }
    },
    getDesignerData: function() {
      // 디자이너 정보
      let sql ="SELECT DISTINCT STYCD, DESIGNER, EMPNAME, PHOTOPATH FROM  BISY021_DEV "
      sql += "WHERE STYCD = '" + this.STYCODE + "' "

      this.req2svr.getData(sql).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DESIGNER = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.DESIGNER.push(res);
            } else {
              this.DESIGNER = JSON.parse("[" + res + "]");
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
      
    },
    makeChart1() {
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: "판매", 
          JQTY_T: "정상", JQTY: this.dr_S.JSQTY, 
          DCQTY_T: "할인", DCQTY: this.dr_S.DCSQTY, 
          GQTY_T: "균일", GQTY: this.dr_S.GSQTY
        },
        { category: "반품", 
          JQTY_T: "정상", JQTY: Math.abs(this.dr_S.JRQTY),
          DCQTY_T: "할인", DCQTY: Math.abs(this.dr_S.DCRQTY),
          GQTY_T: "균일", GQTY: Math.abs(this.dr_S.GRQTY)
        },
      ];

      AmCharts.makeChart("chartdiv1", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
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
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCQTY"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GQTY"
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
            gridColor: "#AAB3B3",
            gridAlpha: 0.3,
            gridThickness: 0,
            labelsEnabled: false,
            titleRotation: 0,
            totalText: "[[total]]"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart2() {
      let title = ["정상", "할인", "균일"]
      let data = [
        { category: "판매", 
          JAMT_T: "정상", JAMT: Math.round(this.dr_S.JSAMT/1000),
          DCAMT_T: "할인", DCAMT: Math.round(this.dr_S.DCSAMT/1000),
          GAMT_T: "균일", GAMT: Math.round(this.dr_S.GSAMT/1000)
        },
        { category: "반품", 
          JAMT_T: "정상", JAMT: Math.round(Math.abs(this.dr_S.JRAMT/1000)),
          DCAMT_T: "할인", DCAMT: Math.round(Math.abs(this.dr_S.DCRAMT/1000)),
          GAMT_T: "균일", GAMT: Math.round(Math.abs(this.dr_S.GRAMT/1000))
        },
      ];

      AmCharts.makeChart("chartdiv2", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "category",
        rotate: true,
        colors: [ "#3f93f5", "#ff7f92", "#ffb83c", "#a3e326" ],
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
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: title[0],
            type: "column",
            valueField: "JAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-2",
            labelText: "[[value]]",
            title: title[1],
            type: "column",
            valueField: "DCAMT"
          },
          {
            balloonText: "[[title]]:[[value]]",
            fillAlphas: 1,
            id: "AmGraph-3",
            labelText: "[[value]]",
            title: title[2],
            type: "column",
            valueField: "GAMT"
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
            totalText: "[[total]]"
          }
        ],
        allLabels: [],
        balloon: {},
        dataProvider: data
      })
    },
    makeChart3() {
      const sqtyData = _.map(this.proSqtyDataSum.slice(-12), v => ({sum:v}))
      const accData = []

      for(let i=0; i<sqtyData.length; i++) {
        accData[i] = 0
        for(let k=0; k<=i; k++) {
          accData[i] += sqtyData[k].sum
        }
      }

      const chartData = _.zipWith(this.proDates.slice(-12), this.proSqtyDataSum.slice(-12), accData, (day, sum, acc) => ({day, sum, acc}))

      return AmCharts.makeChart("chartdiv3", {
        "type": "serial",
        "categoryField": "day",
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
            "lineColor": "#2F8FFD",
            "title": "주간별 판매수량",
            "type": "column",
            "labelText": "[[value]]",
            "labelOffset": 10,
            "labelPosition": "top",
			      "showBalloon": false,
            "valueField": "sum",
            "markerType": "circle"
          },
          {
            "balloonText": "누적 판매수량 : [[value]]개",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "id": "AmGraph-3",
            "lineColor": "rgb(250, 99, 122)",
            "title": "누적 판매수량",
            "topRadius": 0,
            "valueAxis": "ValueAxis-2",
            "valueField": "acc",
            "markerType": "circle"
          },
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
    makeChart4() {
      const amtData = _.map(this.proAmtDataSum.slice(-12), v => ({sum:v}))
      const accData = []

      for(let i=0; i<amtData.length; i++) {
        accData[i] = 0
        for(let k=0; k<=i; k++) {
          accData[i] += amtData[k].sum
        }
      }

      const chartData = _.zipWith(this.proDates.slice(-12), this.proAmtDataSum.slice(-12), accData, (day, sum, acc) => ({day, sum, acc}))

      return AmCharts.makeChart("chartdiv3", {
        "type": "serial",
        "categoryField": "day",
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
            "lineColor": "#2F8FFD",
            "title": "주간별 판매금액",
            "type": "column",
            "labelText": "[[value]]",
            "labelOffset": 10,
            "labelPosition": "top",
			      "showBalloon": false,
            "valueField": "sum",
            "markerType": "circle"
          },
          {
            "balloonText": "누적 판매금액 : [[value]]천원",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "id": "AmGraph-3",
            "lineColor": "rgb(250, 99, 122)",
            "title": "누적 판매금액",
            "topRadius": 0,
            "valueAxis": "ValueAxis-2",
            "valueField": "acc",
            "markerType": "circle"
          },
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
          "position": "bottom",
          "valueWidth": 70
        },
        "dataProvider": chartData
      });
    },
    makeChart5() {
      let data = this.ACC_SALE_RATE

      return AmCharts.makeChart("chartdiv3", {
        type: "serial",
        startEffect: "easeOutSine",
        categoryField: "INOUTDT",
        colors: ["#bd7adf", "#bababa", "#3f93f5"],
        sequencedAnimation: false,
        startEffect: "easeInSine",
        categoryAxis: {
          axisAlpha: 0.1,
          gridPosition: "start",
          gridAlpha: 0.05,
          tickLength: 0,
          startOnAxis: true,
          fontSize: 14
        },
        chartCursor: {
          enabled: true,
          zoomable: false,
          cursorPosition: "mouse"
        },
        trendLines: [],
        graphs: [
          {
            balloonText: "수량기준 누적판매율(%) : [[value]]",
            fillAlphas: 0,
            id: "AmGraph-1",
            lineAlpha: 0.99,
            title: "수량기준 누적판매율(%)",
            valueField: "ACC_QTY_RATE",
            markerType: "circle"
          },
          {
            balloonText: "금액기준 누적판매율(%) : [[value]]",
            fillAlphas: 0,
            fontSize: 0,
            id: "AmGraph-2",
            title: "금액기준 누적판매율(%)",
            valueField: "ACC_AMT_RATE",
            markerType: "circle"
          }
        ],
        guides: [],
        valueAxes: [
          {
            axisAlpha: 0.1,
            id: "ValueAxis-1",
            gridColor: "#FFFFFF",
            tickLength: 0,
            showFirstLabel: false,
            title: "",
            fontSize: 13
          }
        ],
        allLabels: [],
        balloon: {},
        legend: {
          enabled: true,
          align: "center",
          fontSize: 18,
          position: "top"
        },
        titles: [],
        dataProvider: data
      });
    },
    toBack() {
      this.$router.replace({
        name: 'NEWSTY0001',
        params: {
          data: 
          { 
            STYCODE: this.data.STYCODE,
            saleStartDate: this.data.saleStartDate,
            saleEndDate: this.data.saleEndDate,
            filterData: this.data.filterData,
            orderBy: this.data.orderBy,
            orderByFilters: this.data.orderByFilters
          }
        }
      })
    },
    toDetail() {
      this.showDetail = true
    },
    toDesignDetail(data) {
      this.showDesignDetail = true
      this.designerPopupData = data
    },
    hideDetailPopup() {
      this.showDetail = false
    },
    hideDesignDetailPopup() {
      this.showDesignDetail = false
    },
    toMain() {
      this.$router.replace("/")
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
    imageExist(url) {
      var img = new Image();
      img.src = url;
      return img.height != 0;
    }
  }
}
</script>