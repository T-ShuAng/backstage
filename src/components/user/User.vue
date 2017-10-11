<template>
  <div class="user list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>姓名</th>
        <th>性别</th>
        <th>联系电话</th>
        <th>类型
          <i class="el-icon-caret-bottom"></i>
            <div class="dropdown">
              <p><a href="javascript:void (0);" @click="identityFilter(1)">创业者</a></p>
              <p><a href="javascript:void (0);" @click="identityFilter(2)">投资人</a></p>
              <p><a href="javascript:void (0);" @click="identityFilter(3)">人才</a></p>
              <p><a href="javascript:void (0);" @click="identityFilter(4)">全部</a></p>
            </div>
        </th>
        <th>注册时间</th>
        <th>登录时间</th>
        <th>登录IP</th>
        <th>修改时间</th>
        <th>黑名单
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="blackFilter(1)">是</a></p>
            <p><a href="javascript:void (0);" @click="blackFilter(2)">否</a></p>
            <p><a href="javascript:void (0);" @click="blackFilter(3)">全部</a></p>
          </div>
        </th>
       <!-- <th>操作</th>-->
      </tr>

      <tr class="list-row" v-for="(item,index) in list">
        <td><a href="javascript:void (0);" @click="linkDetail(item.id,item.user_identity)">{{item.user_name}}</a></td>
        <td>{{item.user_sex | getStr('sexArr')}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.user_identity | getStr('identityArr')}}</td>
        <td>{{item.reg_time | getTime}}</td>
        <td>{{item.login_time | getTime}}</td>
        <td>{{item.login_ip}}</td>
        <td>{{item.update_time | getTime}}</td>
        <td>{{item.is_black | getStr('isArr')}}
          <i class="el-icon-caret-bottom" style="color:#6f8fe9;"></i>
          <div class="dropdown" @click="isBlack(item.id,item.is_black,index)">
            <span v-show="item.is_black==2" >是</span>
            <span v-show="item.is_black==1" >否</span>
          </div>
        </td>
      <!--  <td><a href="javascript:void (0);" @click="linkEdit(item.id,item.user_identity)">编辑</a></td>-->
      </tr>
    </table>

    <div class="list-page">
      <el-pagination
              layout="prev, pager, next"
              @current-change="currentPage"
              :page-count="allPage">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'
  import Arr from '../../assets/js/arr'

  export default {
    mounted(){
      this.getList();
    },
    updated(){
      this.interleave();
    },
    data() {
      return{
        list:"",
        allPage:1,
        identity:4,
        black:3,
        page:1
      }
    },
    methods:{

      linkDetail(id,identity){
        router.push(`/user/information${identity}/${id}`)
      },

      linkEdit(id,identity){
        router.push(`/user/edit${identity}/${id}`)
      },

      // 类型筛选
      identityFilter(val){
        this.identity=val;
        this.page=1;
        this.getList();
      },

      // 黑名单筛选
      blackFilter(val){
        this.black=val;
        this.page=1;
        this.getList();
      },

      // 分页回调
      currentPage(page){
        this.page = page;
        this.getList();
      },

      //黑名单
      isBlack(id,black,index){
        let isBlack;
        black==1 ? isBlack=2:isBlack=1;

        axios.post('/apis/jcwyadminphp/user/userBlack',{
          id,
          black:isBlack
        }).then((res)=>{
          if(res.data.code==='200'){
            this.list[index].is_black=isBlack;
            this.$message.success('操作成功！');
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        })
      },

      // 列表颜色
      interleave(){
        let userRow = document.querySelectorAll(".list-row");
        for(let i=0;i<userRow.length;i++){
          i%2 === 1 ? userRow[i].style.background = "#f3f5f7" : "";
        }
      },

      // 请求函数
      getList(){
        axios.post('/apis/jcwyadminphp/user/userlist',{
          identity:this.identity,
          black:this.black,
          page:this.page
        }).then((res)=>{
          if(res.data.code=='200'){
            this.list = res.data.data;
            this.allPage = res.data.end_page;
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
            this.allPage=1;
            this.list='';
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
          this.allPage=1;
          this.list='';
        });
      }

    },
    filters:{
      getStr(val,arr){return Arr.toStr(val,Arr[arr])},
      getTime(val,str){return Arr.toTime(val,str)}
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../list.less";

</style>
