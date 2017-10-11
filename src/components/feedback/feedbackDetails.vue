<template>
  <div class="feedbackDetails detail-box">

    <div class="detail-center">

      <p><span class="span-title">反馈时间</span><span>：{{detail.create_time | getTime(1)}}</span></p>
      <p><span class="span-title">姓名</span><span>：{{detail.name}}</span></p>
      <p><span class="span-title">联系电话</span><span>：{{detail.phone}}</span></p>

      <h3 class="detail-title">反馈内容</h3>
      <p>{{detail.content}}</p>


      <div class="detail-form">
        <span>是否受理：</span>
        <el-radio-group v-model="status" class="detail-form-radio">
          <el-radio :disabled="detail.status!=0" label="0">未受理</el-radio>
          <el-radio label="1">已受理</el-radio>
        </el-radio-group>
      </div>

      <a class="detail-btn" href="javascript:void (0);" @click="postAudit">确 定</a>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Arr from '../../assets/js/arr'

  export default {
    mounted(){
      this.getData();
    },
    data() {
      return {
        id: this.$route.params.id,
        detail:'',
        status:'0'
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/feedback/feedbackDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.status = this.detail.status;
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        });
      },

      // 提交审核
      postAudit(){

        if(this.detail.status!=0||this.status==0){return false;}
        this.$confirm('确定提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toPost()
        }).catch(() => {});

      },
      toPost(){
        axios.post('/apis/jcwyadminphp/feedback/feedbackResults',{
          id:this.id,
          type:this.status,
        }).then((res)=>{
          if(res.data.code=='200'){this.$message.success('提交成功！');}
          else{this.$message.warning(res.data.code+":"+res.data.message);}
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        })
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
  @import "../details.less";
  .detail-form{
    width: 360px;
  }
</style>