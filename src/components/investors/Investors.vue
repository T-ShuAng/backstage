<template>
  <div class="investors list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>职业照</th>
        <th>用户姓名</th>
        <th class="t-long">公司名称</th>
        <th>职位</th>
        <th>长住地区</th>
        <th>提交时间</th>
        <th>状态
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="examineFilter(1)">已通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(2)">未通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(3)">未审核</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(4)">全部</a></p>
          </div>
        </th>
        <th>操作</th>
      </tr>

      <tr class="list-row" v-for="item in list">
        <td><img :src="'/public/static/'+item.major_image" alt=""></td>
        <td><router-link :to="'/investor/audit/'+item.inve_id">{{item.user_name}}</router-link></td>
        <td class="t-long">{{item.company_name}}</td>
        <td>{{item.inve_position}}</td>
        <td>{{item.resident_area| getStr('areaArr')}}</td>
        <td>{{item.reg_time | getTime}}</td>
        <td>{{item.is_prove| getStr('proveArr')}}</td>
        <td><router-link :to="'/investorAudit/edit/'+item.inve_id">编辑</router-link></td>
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
        examine:4
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

      // 列表颜色
      interleave (){
        let userRow = document.querySelectorAll(".list-row");
        for(let i=0;i<userRow.length;i++){
          i%2 === 1 ? userRow[i].style.background = "#f3f5f7" : "";
        }
      },

      // 请求函数
      getList(){
        axios.post('/apis/jcwyadminphp/demand/investorList',{
          examine:this.examine,
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
  .list .list-row img{
    border-radius: 50%;
  }
</style>