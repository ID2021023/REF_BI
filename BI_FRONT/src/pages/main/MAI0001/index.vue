<template>
  <div class="wrap main" style="height: -webkit-fill-available;">
    <!-- header -->
    <header class="header">
      <!-- Title -->
      <div class="main_title">
        <div class="logo"><img src="@/assets/images/img_logo_b.png" alt="sisun" /></div>
        <strong class="txt">BI Service</strong>
        <div v-if="dev" style="height: 102px; line-height: 102px;">
          <input type="text" style="margin-left: 30px; padding-left:10px; width:150px; height:50px; line-height: 50px;" placeholder="사번" v-model="deptnum">
        </div>
        <div v-if="dev" style="height: 102px; line-height: 102px;">
          <input type="password" style="margin-left: 30px; padding-left:10px; width:150px; height:50px; line-height: 50px;" placeholder="패스워드" v-model="pwnum" @keyup.enter="login()">
          <input type="button" style="margin-left: 10px; line-height: 50px; width:80px; border-radius:5px;" value="입력" @click="login()">
        </div>
        <div v-if="dev" style="height: 102px; line-height: 102px;">
          <input type="button" style="margin-left: 10px; line-height: 50px; width:80px; border-radius:5px;" value="lotate" @click="link2()">
        </div>
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
                  <a href="javascript:void(0);" @click="link('/StoreSalesStatus2')" class="btn_sub">월매출</a>
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
                  <a href="javascript:void(0);" @click="link('/WeeklyReport')" class="btn_sub">주간회의</a>
                </div>
                <a href="javascript:void(0);" @click="link('/SalesMain')" class="btn_main">
                  <i class="material-icons">business_center</i>영업
                </a>                            
              </div>
            </li>
            <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/WeeklyClothSale')" class="btn_main">
                  <i class="material-icons">insert_drive_file</i>주간회의
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
            <li>
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
            </li>
            <li>
              <div class="btns">
                  <a href="javascript:void(0);" @click="link('/OnLineMain')" class="btn_main">
                      <i class="material-icons">shopping_cart</i>온라인 
                  </a>
              </div>
            </li>
            <!-- <li>
              <div class="btns">
                <a href="javascript:void(0);" @click="link('/NewDailyReport')" class="btn_main">
                  <i class="material-icons">assessment</i>재무
                </a>
              </div>
            </li> -->
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
  data() {
    return {
      dev: true, // 개발서버:true , 운영서버:false (사번/패스워드 입력필드 노출,비노출 구분값)
      deptnum: null,
      pwnum: null,
      pwcheck: false,
      token: "sisun"
    };
  },
  mounted() {
    this.deptnum = sessionStorage.getItem("empcd")
    sessionStorage.setItem("loatation", false)
  },
  methods: {
    login(){
      if(this.token == this.pwnum){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("empcd")
        
        sessionStorage.setItem("token" , "smzH^8^N9}N`B[t.")
        sessionStorage.setItem("empcd" , this.deptnum)
        sessionStorage.setItem("loatation", false)
        
        window.location.reload()
      } else {
        alert("비밀번호가 일치하지 않습니다.")
      }
    },
    link(val) {
      sessionStorage.setItem("loatation", false)
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
      }
      */
    },
    link2() {
      sessionStorage.setItem("loatation", true)
      this.$router.push({
        // name: "MAI0002"
        name: "FIN0101"
      })
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