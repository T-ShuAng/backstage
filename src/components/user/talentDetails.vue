<template>
  <div class="talentDetails detail-box">

    <div class="detail-center">

      <div class="detail-portrait">
        <img :src="'/public/static/'+detail.user_image" alt="">
      </div>

      <p><span class="span-title">资料完善时间</span><span>：{{detail.talent.reg_time | getTime(1)}}</span></p>
      <p><span class="span-title">身 份</span><span>：{{detail.user_identity | getStr('identityArr')}}</span></p>


      <h3 class="detail-title">基本信息</h3>
      <p><span class="span-title">姓 名<i></i></span><span>：{{detail.user_name}}</span></p>
      <p><span class="span-title">性 别</span><span>：{{detail.user_sex | getStr('sexArr')}}</span></p>
      <p><span class="span-title">年 龄</span><span>：{{detail.talent.talent_age}}</span></p>
      <p><span class="span-title">学 历</span><span>：{{detail.talent.talent_education | getStr('educationArr')}}</span></p>
      <p><span class="span-title">技能标签</span><span>：{{detail.talent.talent_skill}}</span></p>
      <p><span class="span-title">工作年限</span><span>：{{detail.talent.work_year | getStr('workingYearArr')}}</span></p>
      <p><span class="span-title">目前状态</span><span>：{{detail.talent.talent_state | getStr('currentStateArr')}}</span></p>
      <p><span class="span-title">手机号码</span><span>：{{detail.phone}}</span></p>
      <p><span class="span-title">一句话介绍</span><span>：{{detail.brief_introduction}}</span></p>

      <h3 class="detail-title">求职意向</h3>
      <p><span class="span-title">期望岗位</span><span>：{{detail.talent.intentional_post | getStr('jobArr')}}</span></p>
      <p><span class="span-title">期望薪资</span><span>：{{detail.talent.talent_min_salary}}K/月-{{detail.talent.talent_max_salary}}K/月</span></p>
      <p><span class="span-title">期望行业</span><span>：{{detail.talent.desired_industry | getStr('industryArr')}}</span></p>
      <p><span class="span-title">期望地区</span><span>：{{detail.talent.desired_area | getStr('areaArr')}}</span></p>

      <h3 class="detail-title">我的优势</h3>
      <p>{{detail.user_introduce}}</p>

      <h3 class="detail-title">工作经历</h3>
      <div class="detail-center-box" v-for="item in detail.work">
        <p><span class="span-title">工作时间</span><span>：{{item.work_start_time | getTime(1)}} 至 {{item.work_end_time | getTime(1)}}</span></p>
        <p><span class="span-title">职 位</span><span>：{{item.position}}</span></p>
        <p><span class="span-title">公司名称</span><span>：{{item.company_name}}</span></p>
        <p><span class="span-title">工作内容</span><span>：{{item.job_content}}</span></p>
      </div>

      <h3 class="detail-title">教育经历</h3>
      <div class="detail-center-box" v-for="item in detail.education">
        <p><span class="span-title">学校名称</span><span>：{{item.school_name}}</span></p>
        <p><span class="span-title">在校时间</span><span>：{{item.education_start_time | getTime(1)}} 至 {{item.education_end_time | getTime(1)}}</span></p>
        <p><span class="span-title">学 历</span><span>：{{item.education | getStr('educationArr')}}</span></p>
        <p><span class="span-title">专 业</span><span>：计算机</span></p>
        <p><span class="span-title">在校经历</span><span>：在校经历在校经历在校经历在校经历在校经历在校经历在校经历在校经历在校经历</span></p>
      </div>

      <h3 class="detail-title">创业经历</h3>
      <div class="detail-center-box">
        <p><span class="span-title">创业时间</span><span>：2013-02-02</span></p>
        <p><span class="span-title">创业内容</span><span>：内容创业内容创业内容创业内容创业内容创业内容创业内容创业内容创业内容创业内容创业内容创业内容</span></p>
      </div>

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
            console.log(res.data);
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
  .detail-portrait {
    border-radius: 50%;
    border: none;
  }
  .detail-center span{
    max-width:730px;
  }

</style>