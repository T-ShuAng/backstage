<template>
  <div class="deliverDetails detail-box">

    <div class="detail-center">


      <p><span class="span-title">投递时间</span><span>：{{detail.deli_time | getTime(1)}}</span></p>

      <h3 class="detail-title">个人信息</h3>
      <p><span class="span-title">姓名</span><span>：{{detail.deli_name}}</span></p>
      <p><span class="span-title">联系电话</span><span>：{{detail.deli_phone}}</span></p>

      <h3 class="detail-title">项目标题</h3>
      <p>{{detail.deli_title}}</p>

      <h3 class="detail-title">项目介绍</h3>
      <p>{{detail.deli_introduction}}</p>

      <h3 class="detail-title">商业计划书</h3>
      <p>
        <a href="JavaScript:void (0);" class="detail-btn detail-btn-see" @click="show=!show">查 看</a>
        <a v-show="detail.deli_plan" :href="'/public/static/'+detail.deli_plan" class="detail-btn detail-btn-see" download>下载</a>
      </p>
      <div v-show="show"><img v-for="item in detail.deli_plan" :src="'/public/static/'+item"></div>

      <div class="detail-form">
        <span>状态：</span>
        <el-radio-group v-model="examine" class="detail-form-radio">
          <el-radio :disabled="detail.examine!=0" label="0">未审核</el-radio>
          <el-radio :disabled="detail.examine!=0&&detail.examine!=1" label="1">已通过</el-radio>
          <el-radio :disabled="detail.examine!=0&&detail.examine!=2" label="2">未通过</el-radio>
        </el-radio-group>
        <el-input type="textarea" class="detail-form-input" v-model="remark" placeholder="备注"></el-input>
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
        show:false,
        id: this.$route.params.id,
        detail:'',
        examine:'0',
        remark:""
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/projectDeliverDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.examine = this.detail.examine;
            this.remark = this.detail.remark;
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        });
      },

      // 提交审核
      postAudit(){

        if(this.examine==this.detail.examine){this.$message.warning("不可提交"); return false;}
        if(!this.remark){this.$message.warning("请输入备注");return false;}

        this.$confirm('确定提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toPost()
        }).catch(() => {});

      },
      toPost(){
        axios.post('/apis/jcwyadminphp/demand/projectDeliverReview',{
          id:this.id,
          examine:this.examine,
          remark:this.remark
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
  .detail-form{ width: 408px;  }

</style>