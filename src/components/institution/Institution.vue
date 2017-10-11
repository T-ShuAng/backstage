<template>
  <div class="institution list">
    <table class="list-table" cellspacing="0px">

      <tr class="list-header">
        <th>机构logo</th>
        <th class="t-long">名称</th>
        <th class="t-long">注册地址</th>
        <th>申请时间</th>
        <th>状态
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="examineFilter(0)">未审核</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(1)">已通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(2)">未通过</a></p>
            <p><a href="javascript:void (0);" @click="examineFilter(3)">全部</a></p>
          </div>
        </th>
        <th>是否显示
          <i class="el-icon-caret-bottom"></i>
          <div class="dropdown">
            <p><a href="javascript:void (0);" @click="showFilter(1)">是</a></p>
            <p><a href="javascript:void (0);" @click="showFilter(2)">否</a></p>
            <p><a href="javascript:void (0);" @click="showFilter(3)">全部</a></p>
          </div>
        </th>
        <th>操作</th>
      </tr>

      <tr class="list-row" v-for="(item,index) in list">
        <td><img :src="'/public/static/'+item.institution_logo" alt=""></td>
        <td class="t-long"><router-link :to="'/institution/details/'+item.id">{{item.institution_name}}</router-link></td>
        <td class="t-long">{{item.reg_address}}</td>
        <td>{{item.create_time | getTime}}</td>
        <td>{{item.examine | getStr('proveArr')}}</td>
        <td>{{item.is_show==2 ? '否':'是'}}
          <i class="el-icon-caret-bottom" style="color:#6f8fe9;"></i>
          <div class="dropdown" @click="postStop(item.id,item.is_show,index)">
            <span v-show="item.is_show==2">是</span>
            <span v-show="item.is_show==1">否</span>
          </div>
        </td>
        <td><router-link :to="'/institution/edit/'+item.id">编辑</router-link></td>
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
        examine:3,
        isShow:3
      }
    },
    methods:{

      // 分页回调
      currentPage(page){
        this.page=page;
        this.getList();
      },

      // 是否显示筛选
      showFilter(val){
        this.page=1;
        this.isShow=val;
        this.getList();
      },

      //状态筛选
      examineFilter(val){
        this.page=1;
        this.examine=val;
        this.getList();
      },

      //提交是否显示
      postStop(id,val,index){
        let show;
        val==1 ? show=2:show=1;

        this.$prompt('请输入理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          if(!value){this.$message.warning("请输入理由"); return false}
          axios.post('/apis/jcwyadminphp/demand/institutionShow',{
            id,
            show,
            remark:value
          }).then((res)=>{
            if(res.data.code==='200'){
              this.list[index].is_show=show;
              this.$message.success('操作成功！');
            }else{
              this.$message.warning(res.data.code+":"+res.data.message);
            }
          }).catch((err)=>{
            this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
          })


        }).catch(() => {console.log("取消")});

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
        axios.post('/apis/jcwyadminphp/demand/Institutionlist',{
          examine:this.examine,
          show:this.isShow,
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