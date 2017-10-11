<template>
  <div class="feedback list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>姓名</th>
        <th>联系电话</th>
        <th>反馈时间</th>
        <th class="so-long">反馈内容</th>
        <th>是否受理
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="statusFilter(0)">未受理</a></p>
            <p><a href="javascript:void (0);" @click="statusFilter(1)">已受理</a></p>
            <p><a href="javascript:void (0);" @click="statusFilter(2)">全部</a></p>
          </div>
        </th>
        <th>受理时间</th>
      </tr>

      <tr class="list-row" v-for="item in list">
        <td>{{item.name}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.create_time | getTime}}</td>
        <td class="so-long">
          <router-link :to="'/feedback/details/'+item.id">
            {{item.content}}
          </router-link>
        </td>
        <td>{{item.status==1 ? '已受理':'未受理'}}</td>
        <td>{{item.end_time | getTime}}</td>
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
        status :2
      }
    },
    methods:{

      // 分页回调
      currentPage(page){
        this.page=page;
        this.getList();
      },

      //是否受理筛选
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
        axios.post('/apis/jcwyadminphp/feedback/feedbackList',{
          status :this.status,
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
  .list .list-row .so-long,
  .list .list-header .so-long{
    width: 648px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>