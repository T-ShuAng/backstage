<template>
  <div class="entreAudit detail-box">

    <div class="detail-center">

      <div class="detail-portrait">
        <img :src="'/public/static/'+detail.major_image" alt="">
      </div>

      <p><span class="span-title">提交时间</span><span>：{{detail.reg_time | getTime(1)}}</span></p>

      <h3 class="detail-title">认证信息</h3>
      <p><span class="span-title">真实姓名</span><span>：{{detail.real_name}}</span></p>
      <p><span class="span-title">公司名称</span><span>：{{detail.company_name}}</span></p>
      <p><span class="span-title">职位</span><span>：{{detail.entr_position}}</span></p>
      <p><span class="span-title">公司主页</span><span>：{{detail.company_website}}</span></p>
      <p><span class="span-title">常住地区</span><span>：{{detail.resident_area | getStr('areaArr')}}</span></p>
      <p><span class="span-title">所属行业</span><span>：{{detail.entr_industry | getStr('industryArr')}}</span></p>

      <h3 class="detail-title">个人名片</h3>
      <p><img class="parent-img" :src="'/public/static/'+detail.business_card"></p>


      <div class="detail-form">
        <span>状态：</span>
        <el-radio-group v-model="examine" class="detail-form-radio">
          <el-radio :disabled="detail.is_prove!=3 && detail.is_prove!=1" label="1">已通过</el-radio>
          <el-radio :disabled="detail.is_prove!=3 && detail.is_prove!=2" label="2">未通过</el-radio>
          <el-radio :disabled="detail.is_prove!=3" label="3">未审核</el-radio>
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
      if(this.$route.query.type){this.getData('user_id');}
      else{this.getData();}

    },
    data() {
      return {
        id: this.$route.params.id,
        detail:'',
        examine:'3',
        remark:""
      }
    },
    methods:{

      //获取数据
      getData(type){
        axios.post('/apis/jcwyadminphp/demand/entrepreneurshipDetails',{
          id:this.id,
          type
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.examine = this.detail.is_prove;
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        });
      },

      // 提交审核
      postAudit(){

        if(this.examine==this.detail.is_prove){this.$message.warning("不可提交"); return false;}
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
        axios.post('/apis/jcwyadminphp/demand/certificationReview',{
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
  .detail-portrait{
    border-radius: 50%;
    border: none;
  }
  .parent-img{
    display: inline-block;
    max-width: 820px;
    background: #eee;
  }
</style>