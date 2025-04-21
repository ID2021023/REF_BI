<template>
  <!-- 20.03.02 구매,생산 메뉴를 가려 달라는 요청에 의해 div테그 주석처리 -->
  <!-- <div class="wrap main" style="height: -webkit-fill-available;"> -->

  <div class="wrap main">
    <!-- header -->
    <header class="header">
      <!-- Title -->
      <div class="main_title">
        <div class="logo"><img src="@/assets/images/img_logo_b.png" alt="sisun" /></div>
        <strong class="txt">BI Service</strong>
      </div>  
    </header>
    <div class="container">
      <div class="content">
        <div class="main_btn_list">
          <ul class="list">
            <li>
              <div class="btns">
                <div class="sub_btns">
                  <a href="javascript:void(0);" @click="link('/DailyReportDetail')" class="btn_sub">일매출</a>
                  <a href="javascript:void(0);" @click="link('/OnLineSale')" class="btn_sub">온라인</a>
                  <!-- <a href="javascript:void(0);" @click="link('/StoreSalesStatus2')" class="btn_sub">월매출</a> -->
                </div>
                <a href="javascript:void(0);" @click="link('/DailyReportDetail')" class="btn_main">
                  <i class="material-icons">today</i>매출
                </a>                            
              </div>
            </li>
            <li>
              <div class="btns">
                <div class="sub_btns">
                  <a href="javascript:void(0);" @click="link('/NewStyleMain')" class="btn_sub">스타일</a>
                  <a href="javascript:void(0);" @click="link('/StoreMain')" class="btn_sub">매장</a>
                </div>
                <a href="javascript:void(0);" @click="link('/SalesMain')" class="btn_main">
                  <i class="material-icons">business_center</i>영업
                </a>                            
              </div>
            </li>
            <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/WeeklyClothSale')" class="btn_main">
                  <i class="material-icons">insert_drive_file</i>주간보고
                </a>
              </div>
            </li>
            <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/Crm')" class="btn_main">
                  <i class="material-icons">supervisor_account</i>CRM
                </a>
              </div>
            </li>
            <!-- <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/ProductMain')" class="btn_main">
                  <i class="material-icons">list_alt</i>생산
                </a>
              </div>
            </li>
            <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/BuyMain')" class="btn_main">
                  <i class="material-icons">local_mall</i>구매
                </a>
              </div>
            </li> -->
            <li>
              <div class="btns">
                  <a href="javascript:void(0);" @click="link('/OnLineMain')" class="btn_main">
                      <i class="material-icons">shopping_cart</i>온라인
                  </a>
              </div>
            </li>
            <li>
              <div class="btns">
                <div class="sub_btns">
                  <a href="javascript:void(0);" @click="link('/NewDailyReport')" class="btn_sub">재무종합</a>
                  <a href="javascript:void(0);" @click="link('/NewDailyReportSales')" class="btn_sub">매출</a>
                  <a href="javascript:void(0);" @click="link('/NewDailyReportCash')" class="btn_sub">현금</a>
                  <a href="javascript:void(0);" @click="link('/NewDailyReportProfit')" class="btn_sub">영업이익B</a>
                </div>
                <a href="javascript:void(0);" @click="link('/NewDailyReport')" class="btn_main">
                  <i class="material-icons">assessment</i>재무
                </a>                            
              </div>
            </li>
            <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/HumMain')" class="btn_main">
                  <i class="material-icons">perm_contact_calendar</i>인재DB
                </a>
              </div>
            </li>
          </ul>
        </div>            
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main",
  methods: {
    link(val) {
      this.$router.push(val)

      /* 이전 소스 - 운영 반영 후 이상 없을 시 삭제 필요
      let DailyReport = _.find(this.authGbnCd, {GBNCD: "BI0001"})
      let SalesMain = _.find(this.authGbnCd, {GBNCD: "BI0002"})
      let Crm = _.find(this.authGbnCd, {GBNCD: "BI0003"})
      let ProductMain = _.find(this.authGbnCd, {GBNCD: "BI0004"})
      let BuyMain = _.find(this.authGbnCd, {GBNCD: "BI0005"})
      let OnLineMain = _.find(this.authGbnCd, {GBNCD: "BI0006"})
      let Human = _.find(this.authGbnCd, {GBNCD: "BI0007"})

      if((val == "/NewDailyReport") && DailyReport){
        this.$router.push(val);
      } else if((val == "/SalesMain" || val == "/NewStyleMain" || val == "/StoreMain") && SalesMain){
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
      }
      */
    }
  },
  computed: {
    /* 메뉴 권한코드(이전 소스 - 운영 반영 후 이상 없을 시 삭제 필요)
    authGbnCd() {
      return this.$store.getters.getAuthGbnCd
    }
    */
  }
}
</script>