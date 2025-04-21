<template>
  <div id="map" class="map"></div>
</template>

<script>
export default {
  name: 'mapView',
  props: {
    CODE: String,
    selectRegion: String,
    selectPoint: Object,
    orgPoints: {
      type: Array,
      default: []
    },
    selectPoints: {
      type: Array,
      default: []
    },
    selectRegionData: Array
  },
  mounted() {
    if (!this.map) {
      this.initMap()
    }
    this.makeClusterer()
    this.createMarker()
  },
  data() {
    return {
      map: null,
      selectedOverlay: null,
      regionData: [
        { title:"서울", region: "서울특별시", address:"서울 중구 세종대로 110", x: 126.97782838162229, y: 37.5663176911162 },
        { title:"경기/인천", region: "경기도", address:"경기 수원시 팔달구 효원로 1", x: 127.00961997318083, y: 37.20466697525489 },
        { title:"경남/부산", region: "부산광역시", address:"부산 연제구 중앙대로 1001", x: 129.07557382720248, y: 35.18047136224503 },
        { title:"전남/광주", region: "광주광역시", address:"광주 서구 내방로 111", x: 126.85146313155619, y: 35.16009995286081 },
        { title:"충북", region: "충청북도", address:"충북 청주시 상당구 상당로 82", x: 127.49142620309796, y: 36.7253871605017 },//x: 127.49142620309796, y: 36.6353871605017 },
        { title:"전북", region: "전라북도", address:"전북 전주시 완산구 효자로 225", x: 127.1063730225348, y: 35.81944884760622 },
        { title:"강원", region: "강원도", address:"강원 춘천시 중앙로 1", x: 127.72790849961663, y: 37.88007264531883 },
        { title:"제주", region: "제주특별자치도", address:"제주특별자치도 제주시 문연로", x: 126.49918470734579, y: 33.48965386177746 },
        { title:"경북/대구", region: "대구광역시", address:"대구 중구 공평로 88", x: 128.60121997494812, y: 35.87155388234073 },
        { title:"충남/대전", region: "대전광역시", address:"대전 서구 둔산로 100", x: 127.38463356074284, y: 36.350384545306405 },
        // { title:"인천", region: "인천광역시", address:"인천 남동구 정각로 29", x: 126.60470101069768, y: 37.386255357739664 },//x: 126.70470101069768, y: 37.456255357739664 },
        // { title:"울산", region: "울산광역시", address:"울산 남구 중앙로 201", x: 129.3112562930758, y: 35.537947829800935 },
        // { title:"충남", region: "충청남도", address:"충남 홍성군 홍북읍 충남대로 21", x: 126.67280235025746, y: 36.658991528553734 },
        // { title:"전남", region: "전라남도", address:"전남 무안군 삼향읍 오룡길 1", x: 126.46538052720297, y: 34.8174889273971 },
        // { title:"경북", region: "경상북도", address:"경북 안동시 풍천면 도청대로 455", x: 128.50536884110124, y: 36.57615304011321 },
        // { title:"경남", region: "경상남도", address:"경남 창원시 의창구 중앙대로 300", x: 128.62194141363738, y: 35.23780242683257 },//x: 128.69194141363738, y: 35.23780242683257 },        
      ],
      selectCODE: "",
      markers: [],
      clusterers: []
    }
  },
  watch: {
    CODE: function(value) {      
      if (this.selectCODE != value) {
        this.initMap()
        this.chageCODE(value)
      }
    },
    selectPoint: function(value) {
      let marker = _.find(this.markers, {VDCD: value.VDCD})
      if (marker) {
        if (this.selectPoints && this.selectPoints.length <= 0) {
          this.showAllMakers()
        } else {
          this.showSelectMakers(this.selectPoints)
        }
        this.makeMarkerDetail(this.map, marker.marker, marker.overlay, this.markers, value)
      }
    },
    orgPoints: function(value) {
      if (!value || value <= 0) {
        return
      }
      if (this.markers.length > 0 && this.selectCODE == this.CODE) {
        this.changeBounds(value)
        return
      }
      if (this.selectCODE != this.CODE) {
        this.chageCODE(this.CODE)
      } else {
        this.createMarker()
      }
    },
    selectPoints: function(value) {
      if (!value || value <= 0) {
        return
      }
      this.hideAllOverlays()
      this.hideAllMakers()
      this.hideClusterer()
      this.changeBounds(value)
    },
    selectRegionData: function(value) {
      if (!value || value <= 0) {
        return
      }
      this.hideAllOverlays()
      this.hideAllMakers()
      this.hideClusterer()
      // 커스텀 클러스터 생성
      this.changeClusterer()
    }
  },
  methods: {
    chageCODE(CODE) {
      if (this.map) {
        this.map.setLevel(12)
        this.map.setCenter(new daum.maps.LatLng(36.20, 127.7558))
      }
      this.selectCODE = CODE
      this.markers = []
      this.changeClusterer()
      this.createMarker()
    },
    initMap() {
      this.map = new daum.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
          center : new daum.maps.LatLng(36.20, 127.7558), // 지도의 중심좌표 
          level : 12, // 지도의 확대 레벨 
      });
      this.map.setMinLevel(5)
      this.map.setMaxLevel(13)

      daum.maps.event.addListener(this.map, 'zoom_changed', this.zoomChanged)
    },
    createMarker() {
      if (!this.orgPoints || this.orgPoints.length <= 0 || (this.orgPoints.length == 1 && this.orgPoints[0].VDCD == "")) {
        return
      }

      this.markers = []

      let imageSrc = require('@/assets/images/img_map_marker.png'), // 마커이미지의 주소입니다
          imageSize = new daum.maps.Size(27, 40), // 마커이미지의 크기입니다
          imageOption = {offset: new daum.maps.Point(14, 40)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      let markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption)
      
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      let bounds = null
      let pointList = this.orgPoints
      for (let i = 0; i < pointList.length; i++) {
        if (pointList[i].LAT == "" || pointList[i].LAT == 0 || pointList[i].LNG == "" || pointList[i].LNG == 0) {
          continue
        }
        if (bounds == null) {
          bounds = new daum.maps.LatLngBounds()
        }

        // 데이터에서 좌표 값을 가지고 마커를 표시합니다
        // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
        let marker = new daum.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: new daum.maps.LatLng(pointList[i].LAT, pointList[i].LNG),
            title : pointList[i].VDSNM, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커이미지 설정 
        })

        let content = '<div>'
        content += '<div class="map_overlay" style="left:-145px; padding:12px 0px;">'
        content += ' <div class="inner">'
        content += '   <div class="title">'
        content += '     <strong class="txt">' + pointList[i].VDSNM + '</strong>'
        content += '     <div class="chip_view">'
        content += '       <span class="chip chip_sty04"><span class="chip_text">' + pointList[i].SHTPNM + '</span></span>'
        if (pointList[i].SHGUNM != pointList[i].SHTPNM) {
          content += '       <span class="chip chip_sty05"><span class="chip_text">' + pointList[i].SHGUNM + '</span></span>'
        }
        content += '     </div>'
        content += '     <button id="overlayClose" type="button" class="btn_close"><i class="material-icons">close</i></button>'
        content += '   </div>'
        content += ' <div class="content">'
        content += ' <div class="info">'
        content += '   ' + pointList[i].ADDR1 + '<br>' + pointList[i].ADDR2
        content += '   <span class="txt_sub">매장 : '+ pointList[i].TELNO +'</span>'
        content += '   </div>'
        content += '     <a href="javascript:void(0);" id="overlayDetail" class="btn_n btn_detail">매장 상세보기</a>'
        content += '   </div>'
        content += ' </div>'
        content += '</div>' + '</div>'

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        let overlay = new daum.maps.CustomOverlay({
            content: content,
            clickable: true,
            // map: this.map,
            position: new daum.maps.LatLng(pointList[i].LAT, pointList[i].LNG),
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        daum.maps.event.addListener(marker, 'click', this.makeClicklListener(this.map, marker, overlay, this.markers, pointList[i]))

        this.markers.push({VDCD: pointList[i].VDCD, marker: marker, overlay: overlay})

        bounds.extend(marker.getPosition())
      }
      
      if (bounds != null) {
        // 지도 범위 재설정
        this.map.setBounds(bounds)
        let _this = this
        setTimeout(function() { _this.zoomChanged() }, 0)
      }
    },
    changeBounds(points) {
      let bounds = null
      for (let i = 0; i < points.length; i++) {
        if (points[i].LAT == "" || points[i].LAT == 0 || points[i].LNG == "" || points[i].LNG == 0) {
          continue
        }
        if (bounds == null) {
          bounds = new daum.maps.LatLngBounds()
        }
        bounds.extend(new daum.maps.LatLng(points[i].LAT, points[i].LNG))
      }
      this.showSelectMakers(points)
      if (bounds != null) {
        // 지도 범위 재설정
        this.map.setBounds(bounds)
        let _this = this
        setTimeout(function() { _this.zoomChanged() }, 0)
      }
    },
    makeClicklListener(map, marker, overlay, markers, data) {
      let _this = this
      return function() {
        for (let i = 0; i < markers.length; i++ ) {
          markers[i].overlay.setMap(null)
          markers[i].marker.setZIndex(1)
        } 

        marker.setZIndex(5)
        overlay.setZIndex(5)
        overlay.setMap(map);
        map.setCenter(marker.getPosition())

        map.setBounds(new daum.maps.LatLngBounds().extend(marker.getPosition()))

        document.getElementById('overlayClose').addEventListener('click', function() {
          overlay.setMap(null)
          marker.setZIndex(1)
        }, false);

        document.getElementById('overlayDetail').addEventListener('click', function() {
          _this.$emit("toDetail", data.VDCD)
        }, false);
      }
    },
    makeMarkerDetail(map, marker, overlay, markers, data) {
      let _this = this
      for (let i = 0; i < markers.length; i++ ) {
        markers[i].overlay.setMap(null)
        markers[i].marker.setZIndex(1)
      } 

      marker.setZIndex(5)
      overlay.setZIndex(5)
      overlay.setMap(map);
      map.setCenter(marker.getPosition())

      map.setBounds(new daum.maps.LatLngBounds().extend(marker.getPosition()))

      document.getElementById('overlayClose').addEventListener('click', function() {
        overlay.setMap(null)
        marker.setZIndex(1)
      }, false);

      document.getElementById('overlayDetail').addEventListener('click', function() {
        _this.$emit("toDetail", data.VDCD)
      }, false);
    },
    hideAllOverlays() {
      for (let i = 0; i < this.markers.length; i++ ) {
        this.markers[i].overlay.setMap(null)
      } 
    },
    hideAllMakers() {
      for (let i = 0; i < this.markers.length; i++ ) {
        this.markers[i].marker.setMap(null)
      } 
    },
    showAllMakers() {
      for (let i = 0; i < this.markers.length; i++ ) {
        this.markers[i].marker.setMap(this.map)
      } 
    },
    showSelectMakers(points) {
      for (let i = 0; i < this.markers.length; i++ ) {
        this.markers[i].marker.setMap(null);
      }

      let VDCD, data
      for (let i = 0; i < points.length; i++ ) {
        VDCD = points[i].VDCD
        data = _.find(this.markers, function(o) {
          if (o.VDCD == VDCD) {
            return o
          }
        })
        if (data) {
          data.marker.setMap(this.map);
        }
      }   
    },
    showClusterer() {
      let countData
      for (let i = 0; i < this.clusterers.length; i++ ) {
        countData = _.find(this.selectRegionData, {RENNM: this.clusterers[i].regionData.title})
        if (!countData) {
          this.clusterers[i].customOverlay.setMap(null)
        } else {
          this.clusterers[i].customOverlay.setMap(this.map)
        }
      } 
    },
    hideClusterer() {
      // document.getElementById('overlayClose')
      for (let i = 0; i < this.clusterers.length; i++ ) {
        this.clusterers[i].customOverlay.setMap(null)
      } 
    },
    changeClusterer() {
      if (!this.selectRegionData || this.selectRegionData.length <= 0) {
        return
      }
      let title, count, content, countData
      for (let i=0;i<this.clusterers.length;i++) {
        title = this.clusterers[i].regionData.title
        count = this.clusterers[i].regionData.CNT
        countData = _.find(this.selectRegionData, {RENNM: title})
        if (!countData) {
          this.clusterers[i].customOverlay.setMap(null)
          continue
        }
        if (count == countData.CNT) {
          continue
        }
        content = '<div class="map_clusterer">' + title + '<br>' +
                  ' <div class="number">' + countData.CNT + '</div>' +
                  '</div>'

        this.clusterers[i].regionData.CNT = countData.CNT
        this.clusterers[i].customOverlay.setContent(content)
      }
      let _this = this
      setTimeout(function() { _this.zoomChanged() }, 0)
    },
    makeClusterer() {
      let content, position, customOverlay, map = this.map
      for (let i=0;i<this.regionData.length;i++) {
        content = '<div class="map_clusterer">' +
                    this.regionData[i].title + '<br>' +
                  ' <div class="number">' + 0 + '</div>' +
                  '</div>';

        // 커스텀 오버레이가 표시될 위치입니다 
        position = new daum.maps.LatLng(this.regionData[i].y, this.regionData[i].x);  
        
        // 커스텀 오버레이를 생성합니다
        customOverlay = new daum.maps.CustomOverlay({
          position: position,
          content: content,
          map: map
        });

        this.clusterers.push({regionData: this.regionData[i], customOverlay: customOverlay})
      }
      this.hideAllMakers()
    },
    zoomChanged() {
      if (!this.map) {
        return
      }
      let level = this.map.getLevel()
      if (level > 11) {
        this.hideAllOverlays()
        this.hideAllMakers()

        this.showClusterer()
      } else {
        this.hideClusterer()
        if (this.selectPoints && this.selectPoints.length <= 0) {
          this.showAllMakers()
        } else {
          this.showSelectMakers(this.selectPoints)
        }
      }
    }
  }
}
</script>
