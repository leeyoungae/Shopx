const wxApi = {
   getPages() {
     var pages = getCurrentPages() //获取加载的页面
     var currentPage = pages[pages.length - 1] //获取当前页面的对象
     var url = currentPage.route //当前页面url
     var str = url.split("/")[1];
     return str;
   },
  getSetting(){
    return new Promise((resolve,reject) =>{
      wx.getSetting({
        success: (res) => {
          resolve(res.authSetting);
        }
      })
    })
  },
  wxLogin(){
    wx.BaaS.login().then(res => {
      console.log(res)
    }, res => {
      if (res instanceof Error) {
        if (res.code === 600) {
          console.log('网络已断开')
        } else if (err.code === 601) {
          console.log('请求超时')
        }
      } else {
        console.log('用户拒绝授权')
        console.log('用户基本信息', res)
      }
    });
  },
  goTopage(url,type){
    if (type =="redirect"){
      wx.redirectTo({
        url: url
      })
    }else{
      wx.navigateTo({
        url: url
      })
    }    
  },
  Modal(content){    
  },
  toast(text,type){
    let tit = text ;
    let showType = type;
    if(!type){
      showType ="success";
    }
    wx.showToast({
      title: tit,
      icon: showType,
      duration: 2000
    })
  },
  setTitle(val){
    wx.setNavigationBarTitle({
      title:val
    })
  },
  onShare(retitle,reurl){
    return {
      title: retitle,
      path: reurl,
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getHeight(id){
    var resd = new Promise((resolve, reject)=> {
      var query = wx.createSelectorQuery();
      query.select(id).boundingClientRect(function(res){
      })
      query.exec(function (res) {
          resolve(res)
      })
    })
    return resd;
  },
  wxRequest(_url){
    var p = new Promise(function(resolve,reject){
        wx.request({
          url: _url,
          success: function(res) {
            resolve(res.data)
          }
        })
    })
    return p ;
  },
  wxmlQuery(id){
      var wxml = new Promise(function(resolve,reject){
        var query = wx.createSelectorQuery();
        query.select(id).boundingClientRect()
        query.exec(function (res) {
          resolve(res)
        })
      })
      return wxml;
  }

}

export default {
    wxApi
}
