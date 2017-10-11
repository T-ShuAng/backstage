<template>
  <div class="projectDetails detail-box">

    <div class="detail-center">

      <div class="detail-portrait">
        <img :src="'/public/static/'+detail.project_logo">
      </div>

      <p><span class="span-title">发布时间</span><span>：{{detail.demand_time | getTime(1)}}</span></p>
      <p><span class="span-title">是否删除</span><span>：{{detail==1? '是':'否'}}</span></p>

      <h3 class="detail-title">个人信息</h3>
      <p><span class="span-title">姓名</span><span>：{{detail.user_name}}</span></p>
      <p><span class="span-title">性别</span><span>：{{detail.user_sex | getStr('sexArr')}}</span></p>

      <h3 class="detail-title">项目信息</h3>
      <p><span class="span-title">项目标题</span><span>：{{detail.project_title}}</span></p>
      <p><span class="span-title">融资金额</span><span>：{{detail.financing_min}}万~{{detail.financing_max}}万</span></p>
      <p><span class="span-title">所在地区</span><span>：{{detail.financing_area| getStr('areaArr')}}</span></p>
      <p><span class="span-title">所属阶段</span><span>：{{detail.financing_phase| getStr('phaseArr')}}</span></p>
      <p><span class="span-title">所属行业</span><span>：{{detail.financing_industry| getStr('industryArr')}}</span></p>
      <p><span class="span-title">项目网址</span><span>：{{detail.project_website}}</span></p>
      <p><span class="span-title">标签</span><span>：{{detail.project_label}}</span></p>
      <p><span class="span-title">一句话介绍</span><span>：{{detail.brief_introduction}}</span></p>

      <h3 class="detail-title">项目介绍</h3>
      <p>{{detail.project_introduce}}</p>

      <h3 class="detail-title">项目亮点</h3>
      <p>{{detail.project_highlights}}</p>

      <h3 class="detail-title">商业计划书</h3>
      <p>
        <a href="JavaScript:void (0);" @click="show=!show" class="detail-btn detail-btn-see">查 看</a>
        <a v-show="detail.business_plan" :href="'/public/static/'+detail.business_plan" download class="detail-btn detail-btn-see">下载</a>
      </p>
      <div v-show="show">
        <img v-for="item in detail.business_plan_image" :src="'/public/static/'+item" alt="">
      </div>


      <h3 class="detail-title">团队成员</h3>
      <div class="'/public/static/'+detail-team" v-for="item in detail.team">
        <img :src="item.team_image" alt="">
        <p><span style="margin-right: 20px;">{{item.team_name}}</span><span>{{item.team_position}}</span></p>
        <p>{{item.team_introduce}}</p>
      </div>

      <h3 class="detail-title">发展历程</h3>
      <div>
        <p v-for="item in detail.course">
          <span class="span-time">{{item.course_time | getTime('short')}}</span>
          <span>{{item.course_event}}</span>
        </p>
      </div>

      <h3 class="detail-title">伙伴招募</h3>
      <div class="recruit" v-for="item in detail.recruiting">
        <h4>{{item.recruiting_position}}</h4>
        <p>{{item.recruiting_detail}}</p>
        <!--<p><span>工作职责：</span></p>
        <p>啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
        <p style="margin-top: 40px;"><span>工作要求：</span></p>
        <p>啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>-->
      </div>

      <div class="detail-form">
        <span>状态：</span>
        <el-radio-group v-model="examine" class="detail-form-radio">
          <el-radio :disabled="detail.examine!=0" label="0">审核中</el-radio>
          <el-radio :disabled="detail.examine!=1 && detail.examine!=0" label="1">进行中</el-radio>
          <el-radio :disabled="detail.examine!=2 && detail.examine!=0" label="2">未通过</el-radio>
          <el-radio :disabled="detail.examine!=3" label="3">已完成</el-radio>
          <el-radio :disabled="detail.examine!=4 && detail.examine!=1" label="4">已结束</el-radio>
        </el-radio-group>
        <el-input v-show="examine==2||examine==4" type="textarea" class="detail-form-input" v-model="remark" placeholder="备注"></el-input>
        <el-input type="textarea" style="margin-top: 30px;" class="detail-form-input" v-model="message" placeholder="系统消息"></el-input>
      </div>

      <a  class="detail-btn" href="javascript:void (0);" @click="postAudit()">确 定</a>
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
        remark:'',
        message:''
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/projectDetails',{
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
        if(this.examine==0||this.examine==3){this.$message.warning("不可提交");return false;}
        if(this.examine==this.detail.examine){return false;}

        if(!this.remark && this.examine==2){this.$message.warning("请输入备注");return false;}
        if(!this.remark && this.examine==4){this.$message.warning("请输入备注");return false;}
        if(!this.message){this.$message.warning("请输入系统消息");return false;}

        this.$confirm('是否提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toPost()
        }).catch(() => {});
      },

      toPost(){
        axios.post('/apis/jcwyadminphp/demand/projectReview',{
          id:this.id,
          examine:this.examine,
          remark:this.remark,
          message:this.message
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
  /*团队介绍*/
  .detail-team{
    margin-top: 20px;
    overflow: hidden;
  }
  .detail-form{ width: 668px; }
  .detail-team>img{
    float: left;
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ccc;
    margin-right: 30px;
  }
  .detail-team>p{
    max-width: 680px;
  }

  /*招募*/
  .recruit{
    margin-top: 20px;
    padding-bottom: 30px;
    border-bottom:1px solid #ededed;
  }
  .recruit>h4{ font-size: 20px;}
  .recruit:last-of-type{ border-bottom: none;}

</style>