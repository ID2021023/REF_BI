<template>
  <div id="map" class="map"></div>
</template>

<script>
import req2svr from "./req2svr"

export default {
  name: 'mapViewHr',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    CODE: String, // 브랜드
    selectRegionProp: String, // 선택한 시/도
    selectChgucdProp: String, // 유통망
    selectRegionSIData: Array, // 전체 시/도 SD명수
    selectRegionGUNGUData: Array, // 전체 구/군 SD명수
    value: String
  },
  mounted() {
    this.initMap()
    this.makeregionGUNGUData()
  },
  computed: {
    req2svr: () => req2svr
  },
  data() {
    return {
      map: null,
      selectedOverlay: null,
      regionData: [
        { title:"서울특별시", region: "서울특별시", x: 126.97282510513197, y: 37.65426400586177 },
        // { title:"서울특별시", region: "서울특별시", x: 126.97782838162229, y: 37.5663176911162 },
        { title:"경기도", region: "경기도", x: 127.00961997318083, y: 37.20466697525489 },
        { title:"부산광역시", region: "부산광역시", x: 129.07557382720248, y: 35.18047136224503 },
        { title:"광주광역시", region: "광주광역시", x: 126.85146313155619, y: 35.16009995286081 },
        { title:"충청북도", region: "충청북도", x: 127.49142620309796, y: 36.7253871605017 },
        { title:"전라북도", region: "전라북도", x: 127.1063730225348, y: 35.81944884760622 },
        { title:"강원도", region: "강원도", x: 128.28029525212267, y: 37.64220819888208 },
        // { title:"강원도", region: "강원도", x: 127.72790849961663, y: 37.88007264531883 },
        { title:"제주특별자치도", region: "제주특별자치도", x: 126.49918470734579, y: 33.48965386177746 },
        { title:"대구광역시", region: "대구광역시", x: 128.60121997494812, y: 35.87155388234073 },
        { title:"세종특별자치시", region: "세종특별자치시", x: 127.28919533809494, y: 36.480068515997694 },
        { title:"대전광역시", region: "대전광역시", x: 127.38831568392317, y: 36.2091833856941 },
        // { title:"대전광역시", region: "대전광역시", x: 127.38463356074284, y: 36.350384545306405 },
        { title:"인천광역시", region: "인천광역시", x: 126.70646608961437, y: 37.433202871734174 },
        // { title:"인천광역시", region: "인천광역시", x: 126.60470101069768, y: 37.386255357739664 },
        { title:"울산광역시", region: "울산광역시", x: 129.3112562930758, y: 35.537947829800935 },
        { title:"충청남도", region: "충청남도", x: 126.67280235025746, y: 36.658991528553734 },
        { title:"전라남도", region: "전라남도", x: 126.46538052720297, y: 34.8174889273971 },
        { title:"경상북도", region: "경상북도", x: 128.50536884110124, y: 36.57615304011321 },
        { title:"경상남도", region: "경상남도", x: 128.50933687546203, y: 35.358643661353995 }
        // { title:"경상남도", region: "경상남도", x: 128.62194141363738, y: 35.23780242683257 }
      ],
      regionGUNGUData: [],
      selectCODE: "",
      SIclusterers: [], // 전체 시,도 클러스터
      GUNGUclusterers: [], // 전체 구,군 클러스터
      boundData: [], // 선택한 지역 클러스터
      setSelectRegion: "" // 선택한 지역 파라미터 받는 변수
    }
  },
  watch: {
    CODE: function(value) {
      if (this.selectCODE != value) {
        this.chageCODE(value)
      }
    },
    selectRegionProp: function(value) {
      this.setSelectRegion = value

      let _this = this
      setTimeout(function() {
        _this.changeBounds(value)
      }, 300);
    },
    setSelectRegion: function(value) {
      let _this = this
      setTimeout(function() {
        _this.changeBounds(value)
      }, 300);
    },
    
    selectRegionSIData: function(value) {
      if (!value || value <= 0) {
        return
      }
      // 커스텀 클러스터 생성
      this.changeSIClusterer()
    },
    selectRegionGUNGUData: function(value) {
      if (!value || value <= 0) {
        return
      }
      // 커스텀 클러스터 생성
      this.changeGUNGUClusterer()

      setTimeout(() => {
        this.changeBounds(this.value)
      }, 300);
    }
  },
  methods: {
    makeregionGUNGUData(){
      this.regionGUNGUData = []

      this.req2svr.getRegionData().then(
        res => {
          this.regionGUNGUData = []
          if (res.MACHBASE_ERROR) {
            console.log("res", res)
          } else {
            let count = (JSON.stringify(res).match(/{/g) || []).length;
            if(count < 1) {
            } else if(count == 1) {
              this.regionGUNGUData.push(res);
              this.setData()
            } else {
              this.regionGUNGUData = JSON.parse("[" + res + "]")
              this.setData()
            }
          }
        },
        rej => {
          console.log("rej", rej);
        }
      )
    },
    chageCODE(CODE) {
      if (this.map) {
        this.map.setLevel(12)
        this.map.setCenter(new daum.maps.LatLng(36.20, 127.7558))
      }
      this.selectCODE = CODE
      this.changeSIClusterer()
    },
    setData(){
      this.setSelectRegion = this.selectRegionProp
      this.makeGUClusterer()
    },
    initMap() {
      if (!this.map) {
        this.map = new daum.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
            center : new daum.maps.LatLng(36.20, 127.7558), // 지도의 중심좌표 
            level : 12, // 지도의 확대 레벨 
        });
        this.map.setMinLevel(7)
        this.map.setMaxLevel(13)

        daum.maps.event.addListener(this.map, 'zoom_changed', this.zoomChanged)

        this.makeSIClusterer()
      }
    },
    changeBounds(value) {
      let bounds = null
      this.boundData = []

      for(let i=0; i<this.regionGUNGUData.length; i++){
        if(this.regionGUNGUData[i].region == value){
          this.boundData.push(this.regionGUNGUData[i])
        }
      }
      
      for (let i = 0; i < this.boundData.length; i++) {
        if (this.boundData[i].y == "" || this.boundData[i].y == 0 || this.boundData[i].x == "" || this.boundData[i].x == 0) {
          continue
        }
        if (bounds == null) {
          bounds = new daum.maps.LatLngBounds()
        }
        bounds.extend(new daum.maps.LatLng(this.boundData[i].y, this.boundData[i].x))
      }

      // 지도 범위 재설정
      if(value == '전국'){
        this.map.setMaxLevel(13)
        this.map.setLevel(12)
        this.map.setZoomable(false)
        this.map.setCenter(new daum.maps.LatLng(36.20, 127.7558))
        this.hideGUClusterer()
        let _this = this
        setTimeout(function() { _this.zoomChanged() }, 0)
      } else {
        this.map.setZoomable(true)
        this.map.setMaxLevel(11)
        if (bounds != null) {
          // 선택한 지역의 클러스터만 지도에 표기
          this.makeSelectGUNGUClusterer(bounds,this.boundData)
        }
      }
  },
  makeSelectGUNGUClusterer(bounds,boundData) {
    this.hideGUClusterer()

    if(boundData[0].region == "인천광역시"){
      this.map.setLevel(8)
      this.map.setCenter(new daum.maps.LatLng(37.456264034426354, 126.70456760904355))
    } else if(boundData[0].region == "부산광역시"){
      this.map.setLevel(8)
      this.map.setCenter(new daum.maps.LatLng(35.18047136224503, 129.07557382720248))
    } else if(boundData[0].region == "경상북도"){
      this.map.setLevel(11)
      this.map.setCenter(new daum.maps.LatLng(36.419754664361875, 128.69852362716102))
    } else if(boundData[0].region == "광주광역시"){
      this.map.setLevel(8)
      this.map.setCenter(new daum.maps.LatLng(35.16009995286081, 126.85146313155619))
    } else if(boundData[0].region == "대구광역시"){
      this.map.setLevel(8)
      this.map.setCenter(new daum.maps.LatLng(35.87155388234073, 128.60121997494812))
    } else if(boundData[0].region == "대전광역시"){
      this.map.setLevel(8)
      this.map.setCenter(new daum.maps.LatLng(36.350384545306405, 127.38463356074284))
    } else if(boundData[0].region == "울산광역시"){
      this.map.setLevel(9)
      this.map.setCenter(new daum.maps.LatLng(35.537947829800935, 129.3112562930758))
    } else if(boundData[0].region == "서울특별시"){
      this.map.setLevel(8)
      this.map.setCenter(new daum.maps.LatLng(37.56734678637603, 126.97868606709355))
    } else if(boundData[0].region == "경기도"){
      this.map.setLevel(10)
      this.map.setCenter(new daum.maps.LatLng(37.56734678637603, 126.97868606709355))
    } else {
      this.map.setBounds(bounds)
    }
    this.changeGUNGUClusterer()
  },
  changeSIClusterer() {
      if (!this.selectRegionSIData || this.selectRegionSIData.length <= 0) {
        return
      }
      let title, count, content, countData
      for (let i=0;i<this.SIclusterers.length;i++) {
        title = this.SIclusterers[i].regionData.title
        countData = _.find(this.selectRegionSIData, {SI: title})
        if (!countData) {
          count = 0
        } else {
          count = countData.CNT
        }

        content = document.createElement('div')
        content.onclick = () => {
          this.clicklListener(this.SIclusterers[i].regionData.title)
        }
        content.innerHTML = ''

        let innerHTML = '<span class="chip chip_xl bg_point_col1 point_col11 point_box18" style="height:35px;line-height:35px;">'
        innerHTML += '<span class="chip_text">' + title + ' ' + count +'</span>'
        innerHTML += '</span>'
        content.innerHTML = innerHTML

        this.SIclusterers[i].regionData.CNT = count
        this.SIclusterers[i].customOverlay.setContent(content)
      }

      this.map.setLevel(12)
      this.map.setCenter(new daum.maps.LatLng(36.20, 127.7558))

      this.hideGUClusterer()
      this.showSIClusterer()
    },
    changeGUNGUClusterer() {
      if (!this.selectRegionGUNGUData || this.selectRegionGUNGUData.length <= 0) {
        return
      }
      let region, title, count, content, countData
      for (let i=0;i<this.GUNGUclusterers.length;i++) {
        region = this.GUNGUclusterers[i].regionData.region
        title = this.GUNGUclusterers[i].regionData.title
        countData = _.find(this.selectRegionGUNGUData, {SI:region, GU: title})
        if (!countData) {
          count = 0
        } else {
          count = countData.CNT
        }

        content  = '<div>'
        content += '<span class="chip chip_xl bg_point_col1 point_col11 point_box18" style="height:35px;line-height:35px;">'
        content += '<span class="chip_text">' + title + ' ' + count + '</span>'
        content += '</span>'
        content += '</div>'

        this.GUNGUclusterers[i].regionData.CNT = count
        this.GUNGUclusterers[i].customOverlay.setContent(content)
      }
      let _this = this
      setTimeout(function() { _this.zoomChanged() }, 0)
    },
    makeSIClusterer() {
      let map = this.map
      this.SIclusterers = []

      for (let i=0;i<this.regionData.length;i++) {
        let content, position, customOverlay 
        content  = '<div>'
        content += '<span class="chip chip_xl bg_point_col1 point_col11 point_box18" style="height:35px;line-height:35px;">'
        content += '<span class="chip_text">' + this.regionData[i].title + ' 0</span>'
        content += '</span>'
        content += '</div>'

        // 커스텀 오버레이가 표시될 위치입니다 
        position = new daum.maps.LatLng(this.regionData[i].y, this.regionData[i].x);  
        
        // 커스텀 오버레이를 지역별로 생성합니다
        customOverlay = new daum.maps.CustomOverlay({
          position: position,
          content: content,
          map: map
        });

        // 지역별로 클러스터 생성
        this.SIclusterers.push({regionData: this.regionData[i], customOverlay: customOverlay})
      }
    },
    makeGUClusterer() {
      let map = this.map
      this.GUNGUclusterers = []
      let content, position, customOverlay, currentRegion, clusterItem
      for (let i=0;i<this.regionGUNGUData.length;i++) {
        content  = '<div>'
        content += '<span class="chip chip_xl bg_point_col1 point_col11 point_box18" style="height:35px;line-height:35px;">'
        content += '<span class="chip_text">' + this.regionGUNGUData[i].title + ' 0</span>'
        content += '</span>'
        content += '</div>'

        currentRegion = this.regionGUNGUData[i]
        clusterItem = _.find(this.GUNGUclusterers, function(o) {
          if (currentRegion.title == o.regionData.title
          && currentRegion.x == o.regionData.x
          && currentRegion.y == o.regionData.y
          ) {
            return o
          }
        })
        if (clusterItem) {
          clusterItem.customOverlay.setMap(null)
          clusterItem.customOverlay.setContent(content)
        } else {
          // 커스텀 오버레이가 표시될 위치입니다 
          position = new daum.maps.LatLng(this.regionGUNGUData[i].y, this.regionGUNGUData[i].x);  
          
          // 커스텀 오버레이를 지역별로 생성합니다
          customOverlay = new daum.maps.CustomOverlay({
            position: position,
            content: content,
            map: map
          });

          // 지역별로 클러스터 생성
          this.GUNGUclusterers.push({regionData: this.regionGUNGUData[i], customOverlay: customOverlay})
        }
      }
      let _this = this
      setTimeout(function() { _this.zoomChanged() }, 0)
    },
    clicklListener(title) {
      // this.setSelectRegion = title
      // this.selectRegion = title
      this.$emit('change', title)
    },
    showSIClusterer() {
      for (let i = 0; i < this.SIclusterers.length; i++ ) {
        this.SIclusterers[i].customOverlay.setMap(this.map)
      } 
    },
    showGUClusterer() {
      for (let i = 0; i < this.GUNGUclusterers.length; i++ ) {
        if(this.setSelectRegion == "전국"){
          this.GUNGUclusterers[i].customOverlay.setMap(this.map)
        } else {
          if (this.setSelectRegion == this.GUNGUclusterers[i].regionData.region) {
            this.GUNGUclusterers[i].customOverlay.setMap(this.map)
          }
        }
      } 
    },
    hideSIClusterer() {
      // document.getElementById('overlayClose')
      for (let i = 0; i < this.SIclusterers.length; i++ ) {
        this.SIclusterers[i].customOverlay.setMap(null)
      } 
    },
    hideGUClusterer() {
      // document.getElementById('overlayClose')
      for (let i = 0; i < this.GUNGUclusterers.length; i++ ) {
        this.GUNGUclusterers[i].customOverlay.setMap(null)
      } 
    },
    zoomChanged() {
      if (!this.map) {
        return
      }
      let level = this.map.getLevel()
      if (level > 11) {
        this.hideGUClusterer()
        this.showSIClusterer()
      } else {
        this.hideSIClusterer()
        this.showGUClusterer()
      }
    }
  }
}
</script>
