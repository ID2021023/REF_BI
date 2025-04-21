<template>
      <div class="wrap main scroll_cont_y">
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
    <div class="wrap main">
    <!-- header -->
    <header class="header">
      <div class="header_inner">
                    <strong class="layout_title"><span class="txt_year" style="padding: 0 10px 60px 0">{{ year }}</span><em class="txt_month vertical_bar">{{ month }}</em>
                        <div class="layout_subtitle">Regional<br>Style Director Pool</div>
                    </strong>
                    <div class="layout_spacer"></div>
                    <!-- daily report -->
                    <div class="card" style="height: 120px">
                        <div class="card_title">
                            <div class="card_title_text">
                                <strong class="txt_s" style="width: 130px; padding-top: 0px;">매장형태별</strong>
                                <span class="txt_s" style="padding-top: 3px;">
                                    SD Pool <small>(명)</small>
                                </span>
                            </div>
                        </div>
                        <div class="card_content">
                            <ul class="list_card" style="padding-top: 10px">
                                <li v-for="data in CHGUCDList" :key="data.CHGUCD">
                                    <strong class="txt_brand">{{ data.CHGUNM }}</strong>
                                    <span class="txt_num" style="font-size: 30px">{{ data.CNT }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <div class="cont_head pl10 pr10">
                        <button type="button" class="btn_n btn_dark point_box11 pl20 pr20 mr10" @click="TotSDList()">전체 SD LIST</button>
                        <button type="button" class="btn_n btn_dark point_box11 pl20 pr20" @click="TotSEList()">전체 Senior LIST</button>
                        <div class="layout_spacer"></div>
                        <div class="groups">
                            <!-- select -->
                            <div class="select_box" style="width:220px">
                                <select class="select" v-model="selectedBRCD" @change="chageOption">
                                    <option value="all">SD전체</option>
                                    <option value="our">자사 SD전체</option>
                                    <option v-for="data in BRCDList" :key="data.MCODE" :value="data.MCODE">{{ data.CODNM }}</option>
                                    <option value="other">타사</option>
                                </select>
                            </div>
                            <!-- select -->
                            <div class="select_box" style="width:220px;">
                                <select class="select" v-model="selectedCHGUCD" @change="chageOption">
                                    <option :value="0">매장형태 전체</option>
                                    <option v-for="data in CHGUList" :key="data.CODE" :value="data.CODE">{{ data.CODNM }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- scrolling card -->
                    <div class="list_box2 lb_sty03">
                            <ul class="list_card">
                                <li @click="toStoreDetail('전국')" style="max-width:304px">
                                    <!-- Total SD -->
                                    <div class="card03 card_mini btn_primary">
                                        <div class="card_title">
                                            <h4 class="card_title_text point_box1" style="padding: 4px;">Total SD</h4>
                                        </div>
                                        <div class="card_content">
                                            <strong class="em_obj">{{ TotSDCnt }}<small class="txt">명</small></strong>
                                        </div>
                                    </div>
                                </li>
                                <li v-for="data in RegionSDList" :key="data.SI" style="max-width:304px">
                                    <!-- 서울 -->
                                    <div class="card02 card_mini btn_primary" @click="toStoreDetail(data.SI)">
                                        <div class="card_title">
                                            <h4 class="card_title_text point_box11" style="padding: 4px">{{ data.SI }}</h4>
                                        </div>
                                        <div class="card_content">
                                            <strong class="em_obj">{{ data.CNT }}<small class="txt">명</small></strong>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                    </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr"
import mapView from '@/components/mapView'
import sideMenu from '@/components/sideMenu'

export default {
  name: "HUM0001",
  components: {
    sideMenu
  },
  props: {
  },
  mounted() {
    this.loadData()
  },
  created() {
    this.year = moment().format("YYYY")
    this.month = moment().format("M")

    // this.selectedCODE = this.authCodeList[0].MCODE
  },
  computed: {
    req2svr: () => req2svr,
    // 브랜드 리스트
    BRCDList() {
      let HUMList = this.$store.getters.getHUMList
      for(var i=0; i<HUMList.length; i++){
        let data = _.find(this.authCodeList, {MCODE:HUMList[i].MCODE})
        if (data) {
          HUMList[i].VISIBLE = true
        } else {
          HUMList[i].VISIBLE = false
        }
      }
      return HUMList
    },
    // 매장형태 리스트
    CHGUList() {
      let CHGUList = this.$store.getters.getCHGUCDList

      return CHGUList
    }
  },
  data() {
    return {
      drawer: null,
      selectedCODE: null,
      selectedBRCD: "all",
      selectedCHGUCD: 0,
      TotSDCnt: "",
      CHGUCDList: [],
      RegionSDList: [],
      date: "",
      year: "",
      month: "",
      makeDataDate: null,
      yesterday : moment().subtract(1, "days").format("YYYYMMDD")
    }
  },
  methods: {
    loadData() {
      if (this.BRCDList.length <= 0) {
        return
      }
      // 전체 SD 인원수
      this.getTotSDCnt()
      
      // 매장 형태별 SD Pool
      this.getCHGUSDCnt()

      // 브랜드별, 매장형태별 지역당 SD 인원수
      this.getRegionSDCnt()
    },
    getCHGUSDCnt() {
      this.CHGUCDList = []            

      this.req2svr.getStoreCountByType().then(
        res => {
          this.CHGUCDList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.CHGUCDList.push(res);
            } else {
              this.CHGUCDList = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getTotSDCnt() {
      this.TotSDCnt = ""
            
      this.req2svr.getTotalSDCount(this.selectedBRCD, this.selectedCHGUCD).then(
        res => {
          this.TotSDCnt = ""
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.TotSDCnt = res.CNT;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    getRegionSDCnt() {

      this.RegionSDList = []

      this.req2svr.getRegionSDCount(this.selectedBRCD, this.selectedCHGUCD).then(
        res => {
          this.RegionSDList = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.RegionSDList.push(res);
            } else {
              this.RegionSDList = JSON.parse("[" + res + "]")
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    chageOption() {
      this.getTotSDCnt()
      this.getRegionSDCnt()
    },
    toMain() {
      this.$router.replace("/")
    },
    TotSDList() {
      this.$router.push("/HumSdList")
    },
    TotSEList() {
      this.$router.push("/HumSeList")
    },
    toStoreDetail(si){
      this.$router.push({
          name: 'HUM0101',
          params: {
            data: 
            { 
              CODE: this.selectedBRCD == 'all' ? 'our' : this.selectedBRCD,
              REGION: si,
              CHGUCD: this.selectedCHGUCD == 0 ? '전체' : this.selectedCHGUCD
            }
          }
      })
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

