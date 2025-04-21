import Vue from 'vue'
import Router from 'vue-router'

import MAI0001 from '@/pages/main/MAI0001'
import MAI0002 from '@/pages/main/MAI0002'
import FIN0001 from '@/pages/financial/FIN0001'
import FIN0101 from '@/pages/financial/FIN0101'
import FIN0201 from '@/pages/financial/FIN0201'
import FIN0301 from '@/pages/financial/FIN0301'
import FIN0401 from '@/pages/financial/FIN0401'
import FIN0501 from '@/pages/financial/FIN0501'
import NEWFIN0001 from '@/pages/financial/NEWFIN0001'
import NEWFIN0201 from '@/pages/financial/NEWFIN0201'
import NEWFIN0202 from '@/pages/financial/NEWFIN0202'
import NEWFIN0301 from '@/pages/financial/NEWFIN0301'
import NEWFIN0302 from '@/pages/financial/NEWFIN0302'
import NEWFIN0401 from '@/pages/financial/NEWFIN0401'
import NEWFIN0402 from '@/pages/financial/NEWFIN0402'
import NEWFIN0501 from '@/pages/financial/NEWFIN0501'
import NEWFIN0502 from '@/pages/financial/NEWFIN0502'
import SAL0001 from '@/pages/sales/SAL0001'
import STY0001 from '@/pages/style/STY0001'
import STY0101 from '@/pages/style/STY0101'
import STY0102 from '@/pages/style/STY0102'
import STY0201 from '@/pages/style/STY0201'
import NEWSTY0001 from '@/pages/style/NEWSTY0001'
import NEWSTY0101 from '@/pages/style/NEWSTY0101'
import STO0001 from '@/pages/store/STO0001'
// import STO0003 from '@/pages/store/STO0003'
import STO0003_1 from '@/pages/store/STO0003_1'
import CRM0001 from '@/pages/crm/CRM0001'
import PRO0101 from '@/pages/product/PRO0101'
import PRO0102 from '@/pages/product/PRO0102'
import PRO0103 from '@/pages/product/PRO0103'
import BUY0101 from '@/pages/buy/BUY0101'
import BUY0102 from '@/pages/buy/BUY0102'
import ONL0101 from '@/pages/online/ONL0101'
import ONL0102 from '@/pages/online/ONL0102'
import ONL0103 from '@/pages/online/ONL0103'
import HUM0001 from '@/pages/hum/HUM0001'
import HUM0002 from '@/pages/hum/HUM0002'
import HUM0003 from '@/pages/hum/HUM0003'
import HUM0101 from '@/pages/hum/HUM0101'
import HUM0103 from '@/pages/hum/HUM0103'
import HUM0201 from '@/pages/hum/HUM0201'
import HUM0301 from '@/pages/hum/HUM0301'
import HUM0401 from '@/pages/hum/HUM0401'
import HUM0501 from '@/pages/hum/HUM0501'
import WEE0101 from '@/pages/wee/WEE0101'
import WEE0201 from '@/pages/wee/WEE0201'
import WEE0301 from '@/pages/wee/WEE0301'
import WEE0401 from '@/pages/wee/WEE0401'
// import T0001 from '@/pages/test/T0001'
import ERR0001 from '@/pages/error/common'
import STORE from '@/store'
import req2svr from "./req2svr";

Vue.use(Router)

const getCookie = function(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};

const deleteCookie = function(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const requireAuth = (to, from, next) => {
  if (to.path == "/") {
    let empcd = getCookie("empcd")
    let token = getCookie("token")

    if (empcd && token) {
      empcd = decodeURI(empcd)
      token = decodeURI(token)

      STORE.commit('setAuthToken', token)
      STORE.commit('setEmpCd', empcd)

      sessionStorage.setItem("token" , token)
      sessionStorage.setItem("empcd" , empcd)

      deleteCookie("empcd")
      deleteCookie("token")
    }
  }
  checkAuthToken(to, from, next)
}

const checkAuthToken = (to, from, next) => {
  let token = sessionStorage.getItem("token")
  let empcd = sessionStorage.getItem("empcd")
  let isRoot = to.path == "/" ? true : false

  if (empcd && token) {
    STORE.commit('setAuthToken', token)
    STORE.commit('setEmpCd', empcd)
  }

  // 로컬 테스트 용 start(배포시 전체 주석 처리)
  if (!empcd && !token) {
    token = "smzH^8^N9}N`B[t."
    // empcd = "1180206" // all : 문무홍(1180206)
    empcd = "1190410" // all : 권희진(1180502)
    // empcd = "1040308" // 사업부, 브랜드 제한
    STORE.commit('setAuthToken', token)
    STORE.commit('setEmpCd', empcd)
    sessionStorage.setItem("token" , token)
    sessionStorage.setItem("empcd" , empcd)
  }
  // 로컬 테스트 용 end

  if(token == null || token == "undefined" || empcd == null || empcd == "undefined") {
    alert("접속권한이 없습니다.")
    history.back()
  } else {
    // alert("시스템 점검중 입니다.")
    // next("/Error")
    authCheckToken(next, isRoot, to.path)
  }
}

const authCheckToken = (next, isRoot, path) => {
  // 토큰 검사
  req2svr.accessControl().then(
    res => {
          authCheckMenu(next, isRoot, path)
    },
    rej => {
      console.log("rej", rej)
      alert(rej.response.data)
      next("/Error")
      // history.back()
    }
  )
}

const authCheckMenu = (next, isRoot, path) => {
  if (STORE.getters.getAuthGbnCd.length > 0) {
    authCheckPage(next, isRoot, path)
    return
  }
  let empcd = STORE.getters.getEmpCd

  req2svr.getAssignedMenuList(empcd).then(
    res => {
      if (res.MACHBASE_ERROR) {
        console.log("res", res)
        if (isRoot, path) {
          authCheckPage(next, isRoot, path)
        } else {
          alert("메뉴 권한이 없습니다.")
          history.back()
        }
      } else {
        let list = []
        let count = (JSON.stringify(res).match(/{/g) || []).length;
        
        if(count < 1) {
        } else if(count == 1) {
          list.push(res);
        } else {
          list = JSON.parse("[" + res + "]")
        }
        STORE.commit('setAuthGbnCd', list)
        authCheckPage(next, isRoot, path)
      }
    },
    rej => {
      console.log("rej", rej)
      alert("응답이 없습니다.")
      history.back()
    }
  )
}

const authCheckPage = (next, isRoot, path) => {
  if (STORE.getters.getAuthProCd.length > 0) {
    authCheckSU(next, isRoot, path)
    return
  }
  let empcd = STORE.getters.getEmpCd

  req2svr.getAssignedPageList(empcd).then(
    res => {
      if (res.MACHBASE_ERROR) {
        console.log("res", res)
        if (isRoot, path) {
          authCheckSU(next, isRoot, path)
        } else {
          alert("메뉴 권한이 없습니다.")
          history.back()
        }
      } else {
        let list = []
        let count = (JSON.stringify(res).match(/{/g) || []).length;
        
        if(count < 1) {
        } else if(count == 1) {
          list.push(res);
        } else {
          list = JSON.parse("[" + res + "]")
        }
        STORE.commit('setAuthProCd', list)
        authCheckSU(next, isRoot, path)
      }
    },
    rej => {
      console.log("rej", rej)
      alert("응답이 없습니다.")
      history.back()
    }
  )
}

const authCheckSU = (next, isRoot, path) => {
  if (STORE.getters.getAuthSUCDCode.length > 0) {
    authCheckBR(next, isRoot, path)
    return
  }
  let empcd = STORE.getters.getEmpCd

  req2svr.getAssignedSUList(empcd).then(
    res => {
      if (res.MACHBASE_ERROR) {
        console.log("res", res)
        if (isRoot, path) {
          authCheckBR(next, isRoot, path)
        } else {
          alert("사업부 권한이 없습니다.")
          history.back()
        }
      } else {
        let list = []
        let count = (JSON.stringify(res).match(/{/g) || []).length;
        
        if(count < 1) {
        } else if(count == 1) {
          list.push(res);
        } else {
          list = JSON.parse("[" + res + "]")
        }
        let GBNCD, itemList = []
        for (let i=0;i<list.length;i++) {
          if (GBNCD != list[i].GBNCD) {
            GBNCD = list[i].GBNCD
            itemList.push(_.filter(list, _.matches({ GBNCD: GBNCD})))
          }
        }
        STORE.commit('setAuthSUCDCode', itemList)
        authCheckBR(next, isRoot, path)
      }
    },
    rej => {
      console.log("rej", rej)
      alert("응답이 없습니다.")
      history.back()
    }
  )
}

const authCheckBR = (next, isRoot, path) => {
  if (STORE.getters.getAuthBRCDCode.length > 0) {
    initCommonData(next, isRoot, path)
    return
  }
  let empcd = STORE.getters.getEmpCd

  req2svr.getAssignedBrandList(empcd).then(
    res => {
      if (res.MACHBASE_ERROR) {
        console.log("res", res)
        if (isRoot, path) {
          initCommonData(next, isRoot, path)
        } else {
          alert("브랜드 권한이 없습니다.")
          history.back()
        }
      } else {
        let list = []
        let count = (JSON.stringify(res).match(/{/g) || []).length;
        
        if(count < 1) {
        } else if(count == 1) {
          list.push(res);
        } else {
          list = JSON.parse("[" + res + "]")
        }
        let GBNCD, itemList = []
        for (let i=0;i<list.length;i++) {
          if (GBNCD != list[i].GBNCD) {
            GBNCD = list[i].GBNCD
            itemList.push(_.filter(list, _.matches({ GBNCD: GBNCD})))
          }
        }
        STORE.commit('setAuthBRCDCode', itemList)
        initCommonData(next, isRoot, path)
      }
    },
    rej => {
      console.log("rej", rej)
      alert("응답이 없습니다.")
      history.back()
    }
  )
}

const initCommonData = (next, isRoot, path) => {
  getFDRList(next, isRoot, path)
}

const getFDRList = (next, isRoot, path) => {
  if (STORE.getters.getFDRList.length > 0) {
    getFINLIST(next, isRoot, path)
    return
  }

  req2svr.getFDRList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setFDRList', JSON.parse("[" + res + "]"))
    }
    getFINLIST(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getFINLIST = (next, isRoot, path) => {
  if (STORE.getters.getFINList.length > 0) {
    getSALList(next, isRoot, path)
    return
  }

  req2svr.getFINLIST().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setFINList', JSON.parse("[" + res + "]"))
    }
    getSALList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSALList = (next, isRoot, path) => {
  if (STORE.getters.getSALList.length > 0) {
    getWRPList(next, isRoot, path)
    return
  }

  req2svr.getSALList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSALList', JSON.parse("[" + res + "]"))
    }
    getWRPList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getWRPList = (next, isRoot, path) => {
  if (STORE.getters.getWRPList.length > 0) {
    getSTYList(next, isRoot, path)
    return
  }

  req2svr.getWRPList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setWRPList', JSON.parse("[" + res + "]"))
    }
    getSTYList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSTYList = (next, isRoot, path) => {
  if (STORE.getters.getSTYList.length > 0) {
    getSTOList(next, isRoot, path)
    return
  }

  req2svr.getSTYList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSTYList', JSON.parse("[" + res + "]"))
    }
    getSTOList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSTOList = (next, isRoot, path) => {
  if (STORE.getters.getSTOList.length > 0) {
    getCRMList(next, isRoot, path)
    return
  }

  req2svr.getSTOList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSTOList', JSON.parse("[" + res + "]"))
    }
    getCRMList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getCRMList = (next, isRoot, path) => {
  if (STORE.getters.getCRMList.length > 0) {
    getPROList(next, isRoot, path)
    return
  }

  req2svr.getCRMList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setCRMList', JSON.parse("[" + res + "]"))
    }
    getPROList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getPROList = (next, isRoot, path) => {
  if (STORE.getters.getPROList.length > 0) {
    getBUYList(next, isRoot, path)
    return
  }

  req2svr.getPROList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setPROList', JSON.parse("[" + res + "]"))
    }
    getBUYList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getBUYList = (next, isRoot, path) => {
  if (STORE.getters.getBUYList.length > 0) {
    getHUMList(next, isRoot, path)
    return
  }

  req2svr.getBUYList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setBUYList', JSON.parse("[" + res + "]"))
    }
    getHUMList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getHUMList = (next, isRoot, path) => {
  if (STORE.getters.getHUMList.length > 0) {
    getSDCOMPANYCDList(next, isRoot, path)
    return
  }

  req2svr.getHUMList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setHUMList', JSON.parse("[" + res + "]"))
    }
    getSDCOMPANYCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSDCOMPANYCDList = (next, isRoot, path) => {
  if (STORE.getters.getSDCOMPANYCDList.length > 0) {
    getSECOMPANYCDList(next, isRoot, path)
    return
  }

  req2svr.getSDCOMPANYCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSDCOMPANYCDList', JSON.parse("[" + res + "]"))
    }
    getSECOMPANYCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSECOMPANYCDList = (next, isRoot, path) => {
  if (STORE.getters.getSECOMPANYCDList.length > 0) {
    getJAEJIGCDList(next, isRoot, path)
    return
  }

  req2svr.getSECOMPANYCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSECOMPANYCDList', JSON.parse("[" + res + "]"))
    }
    getJAEJIGCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getJAEJIGCDList = (next, isRoot, path) => {
  if (STORE.getters.getJAEJIGCDList.length > 0) {
    getCHGUCDList(next, isRoot, path)
    return
  }

  req2svr.getJAEJIGCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setJAEJIGCDList', JSON.parse("[" + res + "]"))
    }
    getCHGUCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getCHGUCDList = (next, isRoot, path) => {
  if (STORE.getters.getCHGUCDList.length > 0) {
    getAMTRATINGCDList(next, isRoot, path)
    return
  }

  req2svr.getCHGUCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setCHGUCDList', JSON.parse("[" + res + "]"))
    }
    getAMTRATINGCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getAMTRATINGCDList = (next, isRoot, path) => {
  if (STORE.getters.getAMTRATINGCDList.length > 0) {
    getSUCDCardList(next, isRoot, path)
    return
  }

  req2svr.getAMTRATINGCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setAMTRATINGCDList', JSON.parse("[" + res + "]"))
    }
    getSUCDCardList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSUCDCardList = (next, isRoot, path) => {
  if (STORE.getters.getSUCDCardList.length > 0) {
    getSUCDList(next, isRoot, path)
    return
  }
  // 사업부 카드 CODE
    req2svr.getSUCDCardList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSUCDCardList', JSON.parse("[" + res + "]"))
    }
    getSUCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getSUCDList = (next, isRoot, path) => {
  if (STORE.getters.getSUCDList.length > 0) {
    getBRCDList(next, isRoot, path)
    return
  }
  // 사업부 CODE
  req2svr.getSUCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setSUCDList', JSON.parse("[" + res + "]"))
    }
    getBRCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getBRCDList = (next, isRoot, path) => {
  if (STORE.getters.getBRCDList.length > 0) {
    getBRCDCardList(next, isRoot, path)
    return
  }
  // 브랜드 CODE
  req2svr.getBRCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setBRCDList', JSON.parse("[" + res + "]"))
    }
    getBRCDCardList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getBRCDCardList = (next, isRoot, path) => {
  if (STORE.getters.getBRCDCardList.length > 0) {
    getFasionSUCDList(next, isRoot, path)
    return
  }
  // 브랜드 카드 CODE
  req2svr.getBRCDCardList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setBRCDCardList', JSON.parse("[" + res + "]"))
    }
    getFasionSUCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getFasionSUCDList = (next, isRoot, path) => {
  if (STORE.getters.getFasionSUCDList.length > 0) {
    getFutureSUCDList(next, isRoot, path)
    return
  }
  // 패션사업 사업부 CODE
  req2svr.getFasionSUCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      let count = (JSON.stringify(res).match(/{/g) || []).length;
      if(count < 1) {
      } else if(count == 1) {
        let list = []
        list.push(res)
        STORE.commit('setFasionSUCDList', list)
      } else {
        STORE.commit('setFasionSUCDList', JSON.parse("[" + res + "]"))
      }
    }
    getFutureSUCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getFutureSUCDList = (next, isRoot, path) => {
  if (STORE.getters.getFutureSUCDList.length > 0) {
    getStopSUCDList(next, isRoot, path)
    return
  }
  // 미래성장사업 사업부 CODE
  req2svr.getFutureSUCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      let count = (JSON.stringify(res).match(/{/g) || []).length;
      if(count < 1) {
      } else if(count == 1) {
        let list = []
        list.push(res)
        STORE.commit('setFutureSUCDList', list)
      } else {
        STORE.commit('setFutureSUCDList', JSON.parse("[" + res + "]"))
      }
    }
    getStopSUCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getStopSUCDList = (next, isRoot, path) => {
  if (STORE.getters.getStopSUCDList.length > 0) {
    getFasionBRCDList(next, isRoot, path)
    return
  }
  // 중단사업 사업부 CODE
  req2svr.getStopSUCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      let count = (JSON.stringify(res).match(/{/g) || []).length;
      if(count < 1) {
      } else if(count == 1) {
        let list = []
        list.push(res)
        STORE.commit('setStopSUCDList', list)
      } else {
        STORE.commit('setStopSUCDList', JSON.parse("[" + res + "]"))
      }
    }
    getFasionBRCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getFasionBRCDList = (next, isRoot, path) => {
  if (STORE.getters.getFasionBRCDList.length > 0) {
    getFutureBRCDList(next, isRoot, path)
    return
  }
  // 패션사업 브랜드 CODE
  req2svr.getFasionBRCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      let count = (JSON.stringify(res).match(/{/g) || []).length;
      if(count < 1) {
      } else if(count == 1) {
        let list = []
        list.push(res)
        STORE.commit('setFasionBRCDList', list)
      } else {
        STORE.commit('setFasionBRCDList', JSON.parse("[" + res + "]"))
      }
    }
    getFutureBRCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getFutureBRCDList = (next, isRoot, path) => {
  if (STORE.getters.getFutureBRCDList.length > 0) {
    getStopBRCDList(next, isRoot, path)
    return
  }
  // 미래성장사업 브랜드 CODE
  req2svr.getFutureBRCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      let count = (JSON.stringify(res).match(/{/g) || []).length;
      if(count < 1) {
      } else if(count == 1) {
        let list = []
        list.push(res)
        STORE.commit('setFutureBRCDList', list)
      } else {
        STORE.commit('setFutureBRCDList', JSON.parse("[" + res + "]"))
      }
    }
    getStopBRCDList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getStopBRCDList = (next, isRoot, path) => {
  if (STORE.getters.getStopBRCDList.length > 0) {
    getYearCodeList(next, isRoot, path)
    return
  }
  // 중단사업 브랜드 CODE
  req2svr.getStopBRCDList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      let count = (JSON.stringify(res).match(/{/g) || []).length;
      if(count < 1) {
      } else if(count == 1) {
        let list = []
        list.push(res)
        STORE.commit('setStopBRCDList', list)
      } else {
        STORE.commit('setStopBRCDList', JSON.parse("[" + res + "]"))
      }
    }
    getYearCodeList(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const getYearCodeList = (next, isRoot, path) => {
  if (STORE.getters.getYearCodeList.length > 0) {
    authCheckURL(next, isRoot, path)
    return
  }
  // 연도 CODE
  req2svr.getYearCodeList().then((res) => {
    if (res.MACHBASE_ERROR) {
      console.log("res", res)
    } else {
      STORE.commit('setYearCode', JSON.parse("[" + res + "]"))
    }
    authCheckURL(next, isRoot, path)
  }, (rej) => {
    console.log('rej', rej)
  })
}

const authCheckURL = function(next, isRoot, path) {
    let DailyReport = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0001"})
    let SalesMain = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0002"})
    let Crm = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0003"})
    let ProductMain = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0004"})
    let BuyMain = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0005"})
    let OnLineMain = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0006"})
    let Human = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0007"})
    let Weekly = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0008"})
    let Sale = _.find(STORE.getters.getAuthGbnCd, {GBNCD: "BI0009"})

    if (path == "/" || path == "/Main") {
      next()
    } else if ( (path == "/DailyReportDetail"
    || path == "/OnLineSale"
    || path == "/StoreSalesStatus2") && Sale ) {
      next()
    } else if ( (path == "/DailyReportDetail"
    || path == "/NewDailyReport"
    || path == "/NewDailyReportSales"
    || path == "/NewDailyReportCash"
    || path == "/NewDailyReportProfit"
    || path == "/NewDailyReportStock"
    || path == "/NewDailyReportSalesPart"
    || path == "/NewDailyReportCashPart"
    || path == "/NewDailyReportProfitPart"
    || path == "/NewDailyReportStockPart" ) && DailyReport ) {
      next()
    } else if ( (path == "/SalesMain" || path == "/NewStyleMain" || path == "/StoreMain"
      || path == "/NewStyleProductDetail"
      || path == "/StyleProductStatus"
      || path == "/StyleDesignerDetail") && SalesMain ) {
      next()
    } else if (path == "/Crm" && Crm && Crm.GBNCD ) {
      next()
    } else if ( (path == "/ProductMain"
      || path == "/ProductDetail"
      || path == "/ProductYearDetail") && ProductMain ) {
      next()
    } else if ( (path == "/BuyMain" || path == "/BuyDetail") && BuyMain ) {
      next()
    } else if ( (path == "/OnLineMain" || path == "/OnLineDetail") && OnLineMain ) {
      next()
    } else if( (path == "/HumMain" 
      || path == "/HumSdList" 
      || path == "/HumSeList" 
      || path == "/HumRegionSdList" 
      || path == "/HumSdSalesList" 
      || path == "/HumSdDetail" 
      || path == "/HumOcSdDetail") && Human ) {
      next()
    } else if( (path == "/WeeklyClothSale"
      || path == "/WeeklyBest20"
      || path == "/WeeklyResearch"
      || path == "/WeeklyProgress") && Weekly ) {
      next()
    } else if (path == "/Error") { 
      next()
    } else {
      alert("권한이 없습니다.")
      // if (!isRoot) {
      //   history.back()
      // }
    }
}

export default new Router({
  routes: [
    // 권한테스트 링크 화면
    // { name: 'Test', component: T0001, path: '/Test'},
    // 메인화면
    { name: 'MAI0001', component: MAI0001, path: '/', beforeEnter: requireAuth },
    { name: 'MAI0002', component: MAI0002, path: '/Main', beforeEnter: requireAuth },

    // 매출 
    // // 일매출
    { name: 'FIN0101', component: FIN0101, path: '/DailyReportDetail', beforeEnter: requireAuth,
    props: (route) => ({ data: route.params.data }) },
    // // 온라인 
    { name: 'ONL0103', component: ONL0103, path: '/OnLineSale', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    // // 월매출
    { name: 'STO0003_1', component: STO0003_1, path: '/StoreSalesStatus2', beforeEnter: requireAuth },
    
    // 재무
    { name: 'FIN0001', component: FIN0001, path: '/DailyReport', beforeEnter: requireAuth },
    { name: 'FIN0201', component: FIN0201, path: '/DailyReportSales', beforeEnter: requireAuth },
    { name: 'FIN0301', component: FIN0301, path: '/DailyReportProfit', beforeEnter: requireAuth },
    { name: 'FIN0401', component: FIN0401, path: '/DailyReportCash', beforeEnter: requireAuth },
    { name: 'FIN0501', component: FIN0501, path: '/DailyReportStock', beforeEnter: requireAuth },
    
    // 재무 고도화
    { name: 'NEWFIN0001', component: NEWFIN0001, path: '/NewDailyReport', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0201', component: NEWFIN0201, path: '/NewDailyReportSales', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0202', component: NEWFIN0202, path: '/NewDailyReportSalesPart', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0301', component: NEWFIN0301, path: '/NewDailyReportCash', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0302', component: NEWFIN0302, path: '/NewDailyReportCashPart', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0401', component: NEWFIN0401, path: '/NewDailyReportProfit', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0402', component: NEWFIN0402, path: '/NewDailyReportProfitPart', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0501', component: NEWFIN0501, path: '/NewDailyReportStock', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWFIN0502', component: NEWFIN0502, path: '/NewDailyReportStockPart', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    
    // 영업
    { name: 'SAL0001', component: SAL0001, path: '/SalesMain', beforeEnter: requireAuth },
    
    // 스타일
    { name: 'STY0001', component: STY0001, path: '/StyleMain', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'STY0101', component: STY0101, path: '/StyleProductDetail', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'STY0102', component: STY0102, path: '/StyleProductStatus', beforeEnter: requireAuth },
    // 스타일 고도화 메인
    { name: 'NEWSTY0001', component: NEWSTY0001, path: '/NewStyleMain', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'NEWSTY0101', component: NEWSTY0101, path: '/NewStyleProductDetail', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    // TODO : 디자이너 추후 지원
    // { name: 'STY0201', component: STY0201, path: '/StyleDesignerDetail', beforeEnter: requireAuth },
    // 매장
    { name: 'STO0001', component: STO0001, path: '/StoreMain', beforeEnter: requireAuth },
    // { name: 'STO0003', component: STO0003, path: '/StoreSalesStatus', beforeEnter: requireAuth,
    //   props: (route) => ({ data: route.params.data })
    // },
    
    // CRM
    { name: 'CRM0001', component: CRM0001, path: '/Crm', beforeEnter: requireAuth },
    
    // 생산
    { name: 'PRO0101', component: PRO0101, path: '/ProductMain', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'PRO0102', component: PRO0102, path: '/ProductDetail', beforeEnter: requireAuth ,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'PRO0103', component: PRO0103, path: '/ProductYearDetail', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    
    // 구매
    { name: 'BUY0101', component: BUY0101, path: '/BuyMain', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'BUY0102', component: BUY0102, path: '/BuyDetail', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    
    // 온라인
    { name: 'ONL0101', component: ONL0101, path: '/OnLineMain', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    { name: 'ONL0102', component: ONL0102, path: '/OnLineDetail', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    
    // 인재DB메인
    { name: 'HUM0001', component: HUM0001, path: '/HumMain', beforeEnter: requireAuth },
    // 전체 SD LIST
    { name: 'HUM0002', component: HUM0002, path: '/HumSdList', beforeEnter: requireAuth },
    // 전체 시니어 LIST
    { name: 'HUM0003', component: HUM0003, path: '/HumSeList', beforeEnter: requireAuth },
    // 지역별 SD 매출 TOP20
    { name: 'HUM0101', component: HUM0101, path: '/HumRegionSdList', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    // 지역별 SD 매출순위
    { name: 'HUM0103', component: HUM0103, path: '/HumSdSalesList', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    // 자사 SD Detail 기본정보, 매출정보, Style Top10
    { name: 'HUM0201', component: HUM0201, path: '/HumSdDetail', beforeEnter: requireAuth,
      props: (route) => ({ data: route.params.data })
    },
    // 타사 SD Detail 기본정보
    { name: 'HUM0301', component: HUM0301, path: '/HumOcSdDetail', beforeEnter: requireAuth },
    // 시니어 자사 Detail 기본정보
    { name: 'HUM0401', component: HUM0401, path: '/HumSeDetail', beforeEnter: requireAuth },
    // 시니어 타사 Detail 기본정보
    { name: 'HUM0501', component: HUM0501, path: '/HumSeDetail2', beforeEnter: requireAuth },

    // 주간보고(복종별 판매 및 할인율)
    { name: 'WEE0101', component: WEE0101, path: '/WeeklyClothSale', beforeEnter: requireAuth, 
      props: (route) => ({ data: route.params.data })
    },
    // 주간보고(주간판매 BEST 20)
    { name: 'WEE0201', component: WEE0201, path: '/WeeklyBest20', beforeEnter: requireAuth, 
      props: (route) => ({ data: route.params.data })
    },
    // 주간보고(신상품 반응조사)
    { name: 'WEE0301', component: WEE0301, path: '/WeeklyResearch', beforeEnter: requireAuth, 
      props: (route) => ({ data: route.params.data })
    },
    // 주간보고(주간판매 추이)
    { name: 'WEE0401', component: WEE0401, path: '/WeeklyProgress', beforeEnter: requireAuth, 
      props: (route) => ({ data: route.params.data })
    },
    // ERROR
    { name: 'Error', component: ERR0001, path: '/Error' }
  ]
})