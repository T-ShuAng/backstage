<template>
  <div class="consult list">

    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th class="t-long">标题</th>
        <th>类型
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="typeFilter(1)">行业新闻</a></p>
            <p><a href="javascript:void (0);" @click="typeFilter(2)">站内新闻</a></p>
            <p><a href="javascript:void (0);" @click="typeFilter(3)">创业指南</a></p>
            <p><a href="javascript:void (0);" @click="typeFilter(4)">失败案例</a></p>
            <p><a href="javascript:void (0);" @click="typeFilter(5)">全部</a></p>
          </div>
        </th>
        <th class="t-long">来源</th>
        <th>发布时间</th>
        <th>浏览量</th>
        <th>删除</th>
        <th>操作</th>
      </tr>

      <tr class="list-row" v-for="(item,index) in list">
        <td class="t-long"><router-link :to="'/consult/details/'+item.id">{{item.title}}</router-link></td>
        <td>{{item.type | getStr('newsArr')}}</td>
        <td class="t-long">{{item.author}}</td>
        <td>{{item.add_time | getTime}}</td>
        <td>{{item.count}}</td>
        <td ><a href="##" @click="deleteItem(item.id,index)">删除</a></td>
        <td><router-link :to="'/consult/edit/'+item.id">编辑</router-link></td>
      </tr>
    </table>

    <router-link class="add-btn" to="/consult/add">添加</router-link>

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
        type :5
      }
    },
    methods:{

      // 分页回调
      currentPage(page){
        this.page=page;
        this.getList();
      },

      //类型筛选
      typeFilter(val){
        this.page=1;
        this.type=val;
        this.getList();
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
        axios.post('/apis/jcwyadminphp/Information/infolist',{
          type :this.type,
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
      },

      // 删除
      deleteItem(id,index){
        this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            axios.post('/apis/jcwyadminphp/Information/infoDelete',{id}).then((res)=>{
            if(res.data.code=='200'){
              this.$message.success("删除成功");
              this.list.splice(index,1);
            }else{this.$message.warning(res.data.code+":"+res.data.message);}
          }).catch((err)=>{
            this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
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
  .add-btn{
    display: block;
    width: 100px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    height: 40px;
    background: #6f8fe9;
    margin: 20px auto;
    border-radius: 4px;
  }
</style>