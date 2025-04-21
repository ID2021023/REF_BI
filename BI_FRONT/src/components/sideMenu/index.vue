<template>
  <nav class="navigation">
    <a class="navigation_link" href="javascript:void(0);" @click="link('/DailyReportDetail')"><i class="material-icons">today</i>매출</a>
    <div class="sub_link">
      <ul class="sub_link_list">
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/DailyReportDetail')">일매출</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/OnLineSale')">온라인</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/StoreSalesStatus2')">월매출</a></li>
      </ul>
    </div>
    <a class="navigation_link" href="javascript:void(0);" @click="link('/SalesMain')"><i class="material-icons">business_center</i>영업</a>
    <div class="sub_link">
      <ul class="sub_link_list">
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/NewStyleMain')">스타일</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/StoreMain')">매장</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/WeeklyReport')">주간회의</a></li>
      </ul>
    </div>
    <a class="navigation_link" href="javascript:void(0);" @click="link('/WeeklyClothSale')"><i class="material-icons">insert_drive_file</i>주간보고</a>
    <a class="navigation_link" href="javascript:void(0);" @click="link('/Crm')"><i class="material-icons">supervisor_account</i>CRM</a>
    <!-- <a class="navigation_link" href="javascript:void(0);" @click="link('/ProductMain')"><i class="material-icons">list_alt</i>생산</a> -->
    <!-- <a class="navigation_link" href="javascript:void(0);" @click="link('/BuyMain')"><i class="material-icons">local_mall</i>구매</a> -->
    <a class="navigation_link" href="javascript:void(0);" @click="link('/OnLineMain')"><i class="material-icons">shopping_cart</i>온라인</a>
    <a class="navigation_link" href="javascript:void(0);" @click="link('/NewDailyReport')"><i class="material-icons">assessment</i>재무</a>
    <div class="sub_link">
      <ul class="sub_link_list">
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/NewDailyReport')">재무종합</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/NewDailyReportSales')">매출</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/NewDailyReportCash')">현금</a></li>
        <li><a class="navigation_link" href="javascript:void(0);" @click="link('/NewDailyReportProfit')">영업이익B</a></li>
      </ul>
    </div>
    <a class="navigation_link" href="javascript:void(0);" @click="link('/HumMain')"><i class="material-icons">perm_contact_calendar</i>인재DB</a>
  </nav>
</template>

<script>
export default {
  name: "SideMenu",
  methods: {
    link(val) {
      sessionStorage.setItem("loatation", false)
      this.$emit("click", val)
      this.$router.push(val);

      /* 이전 소스 - 운영 반영 후 이상 없을 시 삭제 필요
      let DailyReport = _.find(this.authGbnCd, {GBNCD: "BI0001"})
      let SalesMain = _.find(this.authGbnCd, {GBNCD: "BI0002"})
      let Crm = _.find(this.authGbnCd, {GBNCD: "BI0003"})
      let ProductMain = _.find(this.authGbnCd, {GBNCD: "BI0004"})
      let BuyMain = _.find(this.authGbnCd, {GBNCD: "BI0005"})
      let OnLineMain = _.find(this.authGbnCd, {GBNCD: "BI0006"})
      let Human = _.find(this.authGbnCd, {GBNCD: "BI0007"})

      if((val == "/DailyReport") && DailyReport){
        this.$router.push(val);
      } else if((val == "/SalesMain" || val == "/StyleMain" || val == "/StoreMain") && SalesMain){
        this.$router.push(val);
      } else if(val == "/Crm" && Crm && Crm.GBNCD){
        this.$router.push(val);
      } else if(val == "/ProductMain" && ProductMain){
        this.$router.push(val);
      } else if(val == "/BuyMain" && BuyMain){
        this.$router.push(val);
      } else if(val == "/OnLineMain" && OnLineMain){
        this.$router.push(val);
      } else if(val == "/HumMain" && Human) {
        this.$router.push(val);
      } else {
        alert("권한이 없습니다.")
      }*/
    },
  },
  computed: {
    // 메뉴 권한코드
    authGbnCd() {
      return this.$store.getters.getAuthGbnCd
    }
  }
}
</script>