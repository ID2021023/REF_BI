<template>
  <div class="wrap">
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
    <div class="layout_obfuscator"></div>
    <!-- header -->
    <header class="header">
      <div class="header_inner">
        <!-- Title button -->
        <button type="button" class="btn_n btn_icon btn_prev" @click="toBack"><i class="material-icons">arrow_back_ios</i></button>
        <!-- Title -->
        <h2 class="layout_title">월별 매출 상세보기<span class="txt_date"><strong class="point_col1">{{ headSubTitle }}</strong></span></h2>
        <div class="layout_spacer"></div>
        <div style="margin-right: 10px;"><small class="txt_s">데이터 기준일 : {{ DATAST }}</small></div>
      </div>
    </header>
    <div class="container">
      <div class="content">
        <!-- 테이블 -->
        <div class="tbl_sheet tbl_hover_none">
          <table class="tbl tbl_right">
            <colgroup>
              <col style="width: 6%;" />
              <col style="width: 10%;" />
              <col style="width: 14%;" />
              <col style="width: 14%;" />
              <col style="width: 14%;" />                    
              <col style="width: 14%;" />
              <col style="width: 14%;" />
              <col style="width: 14%;" />
            </colgroup>
          <thead>
            <tr>
              <th colspan="2">구분</th>
              <th>당월목표</th>
              <th>누계목표</th>
              <th>매출합계</th>
              <th>누계목표대비 달성율</th>
              <th>전년동기매출</th>
              <th>전년동기대비 신장률</th>
            </tr>
          </thead>
          <!-- 총계와 월을 tbody로 나눔 -->
          <tbody v-for="(monthData, i) in tableData" :key="i" :class="{sum: i == 0}">
            <template v-for="(item, index) in monthData">
              <tr :key="index">
                <th v-if="index == 0" :rowspan="monthData.length"><strong class="tit_row_all">{{ changeYMtoTitle(item.YM) }}</strong></th>
                <th v-if="data.gubun == 2" class="tc"><span class="tit_row">{{ item.GUBUN }}</span></th>
                <th v-else class="tc"><span class="tit_row">{{ item.SUBGU }}</span></th>
                <td>{{ item.TOTPLNAMT | currency }}</td>
                <td>{{ item.PLNAMT | currency }}</td>
                <td>{{ item.SAMT | currency }}</td>
                <td>{{ item.ACC_RATE }}%
                  <span v-if="Number(item.ACC_RATE) >= 100" class="chip round_chip chip_ss success"></span>
                  <span v-if="Number(item.ACC_RATE) >= 95 && Number(item.ACC_RATE) < 99" class="chip round_chip chip_ss warning"></span>
                  <span v-if="Number(item.ACC_RATE) < 95" class="chip round_chip chip_ss danger"></span>
                </td>
                <td>{{ item.LYSAMT | currency }}</td>
                <td>{{ item.UP_RATE }}%</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import moment from "moment"
import req2svr from "./req2svr";
import sideMenu from '@/components/sideMenu'

export default {
  name: "ONL0102",
  components: {
    sideMenu
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    this.loadData()
  },
  created() {
    if (!this.data) {
      this.$router.replace("/ONL0101")
      return
    }
    // this.loadData();
  },
  data() {
    return {
      drawer: null,
      tableData: [],
      DATAST: null,
      startDate: null,
      endDate: null
    };
  },
  computed: {
    headSubTitle() {
      //return moment(this.data.date).format("YYYY") + " " + this.data.CODNM
      return this.data.CODNM + " " + moment(this.data.date).format("YY") + ".01.01" + " ~ " + moment(this.data.date).format("YY.MM.DD")
    },
    req2svr: () => req2svr,
  },
  methods: {
    getMakeDataDate() {
      this.req2svr.getMakeDataDate().then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res);
          } else {
            this.DATAST = res.CREATEDATE;
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    loadData() {
      this.getMakeDataDate()

      if (this.data.gubun == 2) {
        this.getBrandDetailData()
      } else {
        this.getMallDetailData()
      }
    },
    getBrandDetailData() {
      let year = moment(this.data.date).format("YYYY")
      let yeardate = moment(this.data.date).format("YYYYMMDD")

      this.req2svr.getBrandDetailData(year, yeardate, this.data.SUBGU).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.tableData = []
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            let array = _.groupBy(list, _.iteratee('YM'))
            var _tableData = this.tableData
            _.forEach(array, function(value, key) {
              if (value.length == 2) {
                _tableData.push([value[0]])
              } else {
                _tableData.push(value)
              }
            })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    getMallDetailData() {
      this.tableData = []
      let year = moment(this.data.date).format("YYYY")
      let yeardate = moment(this.data.date).format("YYYYMMDD")
      
      this.req2svr.getMallDetailData(year, yeardate, this.data.MAINGU).then(
        res => {
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            this.tableData = []
            let list = []
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              list.push(res);
            } else {
              list = JSON.parse("[" + res + "]")
            }
            let array = _.groupBy(list, _.iteratee('YM'))
            var _tableData = this.tableData
            _.forEach(array, function(value, key) {
              if (value.length == 2) {
                _tableData.push([value[0]])
              } else {
                _tableData.push(value)
              }
            })
          }
        },
        rej => {
          console.log("rej", rej);
        }
      );
    },
    toMain() {
      this.$router.replace("/")
    },
    toBack() {
      this.$router.replace({
          name: 'ONL0101',
          params: {
            data: { 
              gubun: this.data.gubun,
              date: this.data.date,
              MAINGU: this.data.MAINGU,
              SUBGU: this.data.SUBGU,
              CODNM: this.data.CODNM
            }
          }
      })
    },
    rate(value, target) {
      let v = Number(value)
      let t = Number(target)
      if (t < 0) {
        return (1 + ((v-t)/Math.abs(t)))*100
      } else {
        return (v/t)*100
      }
    },
    changeYMtoTitle(value) {
      if (Number(value.slice(4, 6)) == "00") {
        return "총계"
      } else {
        return Number(value.slice(4, 6)) + "월"
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
};
</script>