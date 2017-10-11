<template>
  <div id="app">

    <!-- 头部导航 -->

    <div class="header">
      <h1 class="logo"><a href="/"><img src="./assets/img/logo.png" alt="聚创伟夜"></a></h1>
      <h2 class="header-title">后台管理系统</h2>

      <div class="header-search">
        <input type="text" placeholder="Search">
        <i></i>
      </div>

      <div class="header-user">
        <img src="" alt="">
        <span>ShuAng</span>
      </div>

      <div class="header-inform">
        <i class="header-icon"></i>
        <i class="badge">99</i>
        <span>通知</span>
      </div>

      <div class="header-exit">
        <i class="header-icon"></i>
        <span>退出</span>
      </div>
    </div>

    <div class="nav-bg"></div>
    <div class="nav">
      <ul class="nav-box">

        <li class="nav-item">
          <div class="nav-item-title">
            <i class="nav-icon icon1"></i>
            <span class="nav-title-text">用户管理</span>
            <i class="nav-arrow"></i>
          </div>
          <div class="nav-item-list">
            <router-link to="/user/list" active-class="nav-list-on">用户列表</router-link>
          </div>
        </li>

        <li class="nav-item">
          <div class="nav-item-title">
            <i class="nav-icon icon2"></i>
            <span class="nav-title-text">管理员管理</span>
            <i class="nav-arrow"></i>
          </div>
        </li>

        <li class="nav-item">
          <div class="nav-item-title">
            <i class="nav-icon icon3"></i>
            <span class="nav-title-text">审核管理</span>
            <i class="nav-arrow"></i>
          </div>
          <div class="nav-item-list"><router-link to="/project/list" active-class="nav-list-on">项目列表</router-link></div>
          <div class="nav-item-list"><router-link to="/capital/list" active-class="nav-list-on">资金列表</router-link></div>
          <div class="nav-item-list"><router-link to="/institution/list" active-class="nav-list-on">机构列表</router-link></div>
          <div class="nav-item-list"><router-link to="/deliver/list" active-class="nav-list-on">投递BP列表</router-link></div>
          <div class="nav-item-list"><router-link to="/investors/list" active-class="nav-list-on">投资人认证列表</router-link></div>
          <div class="nav-item-list"><router-link to="/entrepreneur/list" active-class="nav-list-on">创业者认证列表</router-link></div>
        </li>


        <li class="nav-item">
          <div class="nav-item-title">
            <i class="nav-icon icon4"></i>
            <span class="nav-title-text">意见反馈</span>
            <i class="nav-arrow"></i>
          </div>
          <div class="nav-item-list">
            <router-link to="/feedback/list" active-class="nav-list-on">反馈列表</router-link>
          </div>
        </li>

        <li class="nav-item">
          <div class="nav-item-title">
            <i class="nav-icon icon5"></i>
            <span class="nav-title-text">资讯管理</span>
            <i class="nav-arrow"></i>
          </div>
          <div class="nav-item-list">
            <router-link to="/consult/list" active-class="nav-list-on">资讯列表</router-link>
          </div>
        </li>

        <li class="nav-item">
          <div class="nav-item-title">
            <i class="nav-icon icon6"></i>
            <span class="nav-title-text">信贷融资</span>
            <i class="nav-arrow"></i>
          </div>
          <div class="nav-item-list">
            <router-link to="/credit/list" active-class="nav-list-on">信贷列表</router-link>
          </div>
        </li>

      </ul>
    </div>

    <div class="view-bar">
      <span> <i class="view-bar-icon" :style="pathName.rootIcon"></i>{{pathName.rootName}}</span>
      <span  v-show="pathName.layer==3"> <i class="el-icon-arrow-right"></i> <router-link :to="pathName.parentPath">{{pathName.parentName}}</router-link></span>
      <span> <i class="el-icon-arrow-right"></i> {{pathName.name}}</span>
    </div>

    <div class="view">
      <router-view></router-view>
    </div>

  </div>
</template>

<script type="text/babel">
import router from './router'
import path from './assets/js/pathArr'
export default {
  name: 'app',
  mounted(){
    let navItem = document.querySelectorAll('.nav-item');
    for (let i = 0; i < navItem.length; i++) {

      let len = navItem[i].querySelectorAll('.nav-item-list').length;
      navItem[i].style.height = 56+40*len+'px';
      navItem[i].querySelector(".nav-arrow").style.transform = 'rotate(90deg)';

      navItem[i].querySelector(".nav-item-title").onclick = function () {
        let h = getComputedStyle(navItem[i], false).height || navItem[i].currentStyle.height;
        h = parseInt(h);
        if(h > 60){
          navItem[i].style.height = '56px';
          navItem[i].querySelector(".nav-arrow").style.transform = 'rotate(0deg)'
        } else{
          navItem[i].style.height = h+40*len+'px';
          navItem[i].querySelector(".nav-arrow").style.transform = 'rotate(90deg)'
        }
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'fetchData'
  },
  data(){
    return{
      pathName:path.pathArr[0],
    }
  },
  methods:{
    //面包屑导航数据
    fetchData(){
      for(let i=0;i<path.pathArr.length;i++){
        if(this.$route.path.indexOf(path.pathArr[i].path)!==-1){
          this.pathName = path.pathArr[i];
        }
      }
    }

  }
}


</script>

<style lang="less">
  @import "App.less";

</style>
