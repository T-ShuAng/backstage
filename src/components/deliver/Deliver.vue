<template>
  <div class="deliver list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>姓名</th>
        <th>联系电话</th>
        <th class="t-long">项目标题</th>
        <th class="t-long">接收方</th>
        <th>类型
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="typeFilter(1)">投资人</a></p>
            <p><a href="javascript:void (0);" @click="typeFilter(2)">投资机构</a></p>
            <p><a href="javascript:void (0);" @click="typeFilter(3)">全部</a></p>
          </div>
        </th>
        <th>状态
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="examineFilter(0)">未审核</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(1)">已通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(2)">未通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(3)">全部</a></p>
          </div>
        </th>
        <th>投递时间</th>
      </tr>

      <tr class="list-row" v-for="(item,index) in list">
        <td>{{item.user_name}}</td>
        <td>{{item.deli_phone}}</td>
        <td class="t-long"><router-link :to="'/deliver/details/'+item.id">{{item.deli_title}}</router-link></td>
        <td class="t-long">{{item.name}}</td>
        <td>{{item.deliver_type==1 ? '投资人':'投资机构'}}</td>
        <td>{{item.examine | getStr('proveArr')}}</td>
        <td>{{item.deli_time | getTime}}</td>
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
  import axios from 'axios'
  import Arr from '../../assets/js/arr'

  export default {
    mounted(){
      if(this.$route.query.type_id){this.type=1;}
      this.getList();
    },
    updated(){
      this.interleave();
    },
    data() {
      return {
        list:"",
        allPage:1,
        examine:3,
        type:3,

        user_id:this.$route.query.user_id,
        type_id:this.$route.query.type_id
      }
    },
    methods:{

      // 分页回调
      currentPage(page){
        this.page=page;
        this.getList();
      },

      //状态筛选
      examineFilter(val){
        this.page=1;
        this.examine=val;
        this.getList();
      },

      //类型筛选
      typeFilter(val){
        this.page=1;
        this.type=val;
        this.getList();
      },

      // 列表颜色
      interleave (){
        let userRow = document.querySelectorAll(".list-row");
        for(let i=0;i<userRow.length;i++){
          i%2 === 1 ? userRow[i].style.background = "#f3f5f7" : "";
        }
      },

      // 请求函数
      getList(){
        let url = '/apis/jcwyadminphp/demand/projectDeliverList';
        axios.post(url,{
          user_id:this.user_id,
          type_id:this.type_id,

          examine:this.examine,
          type:this.type,
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