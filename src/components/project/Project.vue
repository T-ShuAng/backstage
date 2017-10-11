<template>
  <div class="project list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>项目logo</th>
        <th>用户名</th>
        <th>性别</th>
        <th class="t-long">项目标题</th>
        <th>发布时间</th>
        <th>是否删除
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="deleteFilter(1)">是</a></p>
            <p><a href="javascript:void (0);" @click="deleteFilter(2)">否</a></p>
            <p><a href="javascript:void (0);" @click="deleteFilter(3)">全部</a></p>
          </div>
        </th>
        <th>状态
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="examineFilter(0)">审核中</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(1)">进行中</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(2)">未通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(3)">已完成</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(4)">已结束</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(5)">全部</a></p>
          </div>
        </th>
        <!--<th>是否中止
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="stopFilter(1)">是</a></p>
            <p><a href="javascript:void (0);" @click="stopFilter(2)">否</a></p>
            <p><a href="javascript:void (0);" @click="stopFilter(3)">全部</a></p>
          </div>
        </th>-->
        <th>操作</th>
      </tr>

      <tr class="list-row" v-for="(item,index) in list">
        <td><img :src="'/public/static/'+item.project_logo"></td>
        <td>{{item.user_name}}</td>
        <td>{{item.user_sex | getStr('sexArr')}}</td>
        <td class="t-long"><router-link :to="'/project/details/'+item.id">{{item.project_title}}</router-link></td>
        <td>{{item.demand_time | getTime}}</td>
        <td>{{item.is_delete==1 ? '是':'否'}}</td>
        <td>{{item.examine |  getStr('examineArr')}}</td>
       <!-- <td>{{item.stop | getStr('isArr')}}
          <i class="el-icon-caret-bottom" style="color:#6f8fe9;"></i>
          <div class="dropdown" @click="postStop(item.id,item.stop,index)">
            <span v-show="item.stop==2">是</span>
            <span v-show="item.stop==1">否</span>
          </div>
        </td>-->
        <td><router-link :to="'/project/edit/'+item.id">编辑</router-link></td>
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
    name: 'project',
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
        examine:5,
        isDelete:3,

        id:this.$route.query.id
      }
    },
    methods:{

      // 分页回调
      currentPage(page){
        this.page=page;
        this.getList();
      },

      // 是否删除筛选
      deleteFilter(val){
        this.page=1;
        this.isDelete=val;
        this.getList();
      },

      //状态筛选
      examineFilter(val){
        this.page=1;
        this.examine=val;
        this.getList();
      },

     /* //是否中止筛选
      stopFilter(val){
        this.page=1;
        this.isStop=val;
        this.getList();
      },

      //是否中止提交
      postStop(id,val,index){
        let stop;
        val==1 ? stop=2:stop=1;

        axios.post('/apis/jcwyadminphp/demand/projectstop',{
          id,
          stop
        }).then((res)=>{
          if(res.data.code==='200'){
            this.list[index].stop=stop;
            this.$message.success('操作成功！');
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        })
      },*/

      // 列表颜色
      interleave (){
        let userRow = document.querySelectorAll(".list-row");
        for(let i=0;i<userRow.length;i++){
          i%2 === 1 ? userRow[i].style.background = "#f3f5f7" : "";
        }
      },

      // 请求函数
      getList(){
        let url = '/apis/jcwyadminphp/demand/projectList';
        axios.post(url,{
          id:this.id,
          examine:this.examine,
          delete:this.isDelete,
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