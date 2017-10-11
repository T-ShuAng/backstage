<template>
  <div class="entrepreneurDetails detail-box">

    <div class="detail-center">

      <div class="detail-portrait">
        <img :src="'/public/static/'+detail.user_image">
      </div>

      <p><span class="span-title">资料注册时间</span><span>：{{detail.reg_time | getTime}}</span></p>
      <p><span class="span-title">身份</span><span>：{{detail.user_identity | getStr('identityArr')}}</span></p>


      <h3 class="detail-title">基本信息</h3>
      <p><span class="span-title">姓名</span><span>：{{detail.user_name}}</span></p>
      <p><span class="span-title">性别</span><span>：{{detail.user_sex | getStr('sexArr')}}</span></p>
      <p><span class="span-title">手机号码</span><span>：{{detail.phone}}</span></p>
      <p><span class="span-title">一句话介绍</span><span>：{{detail.brief_introduction}}</span></p>

      <h3 class="detail-title">个人简介</h3>
      <p>{{detail.user_introduce}}</p>

      <h3 class="detail-title">工作经历</h3>
      <div class="detail-center-box" v-for="item in detail.work">
        <p><span class="span-title">工作时间</span><span>：{{item.work_start_time | getTime(true)}}</span></p>
        <p><span class="span-title">工作内容</span><span>：{{item.job_content}}</span></p>
      </div>

      <h3 class="detail-title">教育经历</h3>
      <div class="detail-center-box" v-for="item in detail.education">
        <p><span class="span-title">学校名称</span><span>：{{item.school_name}}</span></p>
        <p><span class="span-title">在校时间</span><span>：{{item.education_start_time | getTime(true)}} 至 {{item.education_end_time | getTime(true)}}</span></p>
        <p><span class="span-title">学历</span><span>：{{item.education | getStr('educationArr')}}</span></p>
        <p><span class="span-title">专业</span><span>：{{item.education_major}}</span></p>
        <p><span class="span-title">在校经历</span><span>：{{item.school_experience}}</span></p>
      </div>

      <h3 class="detail-title">创业经历</h3>
      <div class="detail-center-box" v-for="item in detail.experience">
        <p><span class="span-title">创业时间</span><span>：{{item.experience_start_time | getTime(true)}}</span></p>
        <p><span class="span-title">创业内容</span><span>：{{item.experience_detail}}</span></p>
      </div>
      
      <p>
        <router-link :to="'/entre/audit/'+detail.id+'?type=user_id'" class="bottom-label">身份认证</router-link>
        <router-link :to="'/project/list?id='+detail.id" class="bottom-label">发布的项目</router-link>
        <router-link :to="'/deliver/list?user_id='+detail.id" class="bottom-label">投递的BP</router-link>
      </p>

      <a class="detail-btn" href="javascript:history.back();">返 回</a>
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
        detail:''
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/user/userDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
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
  @import "../details.less";
  .detail-portrait{
    border-radius: 50%;
    border: none;
  }
  .detail-center span{max-width:730px;}

  .bottom-label{
    display: inline-block;
    color: #6f8fe9;
    margin-right: 60px;
    margin-top: 40px;
  }

</style>