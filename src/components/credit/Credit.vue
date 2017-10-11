<template>
  <div class="credit list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>姓名</th>
        <th>联系电话</th>
        <th>需求贷款额度(元)</th>
        <th>房产
          <!--<i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);">有</a></p>
            <p><a href="javascript:void (0);">无</a></p>
            <p><a href="javascript:void (0);">全部</a></p>
          </div>-->
        </th>
        <th>汽车
          <!--<i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);">有</a></p>
            <p><a href="javascript:void (0);">无</a></p>
            <p><a href="javascript:void (0);">全部</a></p>
          </div>-->
        </th>
        <th>公积金
         <!-- <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);">有</a></p>
            <p><a href="javascript:void (0);">无</a></p>
            <p><a href="javascript:void (0);">全部</a></p>
          </div>-->
        </th>
        <th>信用卡
          <!--<i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);">有</a></p>
            <p><a href="javascript:void (0);">无</a></p>
            <p><a href="javascript:void (0);">全部</a></p>
          </div>-->
        </th>
        <th>商业保险
          <!--<i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);">有</a></p>
            <p><a href="javascript:void (0);">无</a></p>
            <p><a href="javascript:void (0);">全部</a></p>
          </div>-->
        </th>
        <th>有无其他贷款
          <!--<i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);">有</a></p>
            <p><a href="javascript:void (0);">无</a></p>
            <p><a href="javascript:void (0);">全部</a></p>
          </div>-->
        </th>
        <th>提交时间</th>
        <th>是否查看
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="statusFilter(0)">未查看</a></p>
            <p><a href="javascript:void (0);" @click="statusFilter(1)">已查看</a></p>
            <p><a href="javascript:void (0);" @click="statusFilter(2)">全部</a></p>
          </div>
        </th>
      </tr>

      <tr class="list-row" v-for="item in list">
        <td><router-link :to="'/credit/details/'+item.id">{{item.name}}</router-link></td>
        <td>{{item.phone}}</td>
        <td>{{item.demand_credits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
        <td>{{item.is_estate==1 ? '有':'无'}}</td>
        <td>{{item.is_car==1 ? '有':'无'}}</td>
        <td>{{item.is_fund==1 ? '有':'无'}}</td>
        <td>{{item.is_card==1 ? '有':'无'}}</td>
        <td>{{item.is_insurance==1 ? '有':'无'}}</td>
        <td>{{item.is_other_loan==1 ? '有':'无'}}</td>
        <td>{{item.create_time | getTime}}</td>
        <td>{{item.status==1 ? '已查看':'未查看'}}</td>
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
      this.getList();
    },
    updated(){
      this.interleave();
    },
    data() {
      return {
        list:"",
        allPage:1,
        page:1,
        status:2
      }
    },
    methods:{

      // 分页回调
      currentPage(page){
        this.page=page;
        this.getList();
      },

      //是否查看筛选
      statusFilter(val){
        this.page=1;
        this.status=val;
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
        axios.post('/apis/jcwyadminphp/credit/creditlist',{
          status:this.status,
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
  .list .list-header>th,
  .list .list-row>td{
    width: 130px;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>