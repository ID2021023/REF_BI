<style type="text/css">
  #layer_fixed
  {
      height:40px;
      width:100%;
      color: #555;
      font-size:12px;
      position:fixed;
      z-index:999;
      top:0px;
      left:0px;
      -webkit-box-shadow: 0 1px 2px 0 #777;
      box-shadow: 0 1px 2px 0 #777;
      background-color:#87CEFA ;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
</style>
<template>
  <div class="wrap">
    <iframe id="main_frame" title="" src="http://localhost:8080/#/DailyReportDetail" width="100%" height="100%"></iframe>
    
    <div id="layer_fixed">
	    <table cellspacing="0" cellpadding="0" style="width:100%; height:100%;">
		    <tr>
		      <td style="align: center; vertical-align:middle; padding-left: 20px; padding-right: 20px;">
		      	<label class="switch">
						  <input type="checkbox" checked>
						  <span class="slider round"  @click="playAndstop"></span>
						</label>		      	 
          </td>
		    </tr>
	    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MAI0002",
  data() {
    return {
      dev: true, // 개발서버:true , 운영서버:false (사번/패스워드 입력필드 노출,비노출 구분값)
      deptnum: null,
      pwnum: null,
      pwcheck: false,
      token: "sisun",
      no: 0,
      flag: true,
      arrURLS: [ "http://localhost:8080//#/DailyReportDetail", "http://localhost:8080//#/OnLineSale", "http://localhost:8080//#/NewDailyReport" ],
      interval: null,
    };
  },
  mounted() {
    this.start();

  },
  methods: {
    playAndstop(){
      if(this.flag){
        clearInterval(this.interval);
        this.flag = false;
        
        console.log("______end interval");			
      }else{
        this.start();
        this.flag = true;
        console.log("______start interval");			
      }
    },
    start() {
      this.no = 0;
      this.flag = true;
      this.arrURLS = [ "http://localhost:8080//#/DailyReportDetail", "http://localhost:8080//#/OnLineSale", "http://localhost:8080//#/NewDailyReport" ];
      this.interval = null;
      console.log(this.arrURLS)
      console.log(this.no)
      this.interval = setInterval (()=>{
        document.getElementById("main_frame").src = this.arrURLS[this.no];
        this.no = this.no + 1;
        if(this.no == 3) this.no=0;
      },10000);
    },
    clickLisner(evt) {
      console.log(evt);
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