<template>
  <div class="capitalDetails detail-box">

    <div class="detail-center">

      <div class="detail-portrait">
        <img :src="'/public/static/'+detail.company_logo" alt="">
      </div>

      <p><span class="span-title">发布时间</span><span>：{{detail.demand_time| getTime(1)}}</span></p>
      <p><span class="span-title">是否删除</span><span>：{{detail.is_delete==1? '是':'否'}}</span></p>

      <h3 class="detail-title">个人信息</h3>
      <p><span class="span-title">姓名</span><span>：{{detail.user_name}}</span></p>
      <p><span class="span-title">性别</span><span>：{{detail.user_sex | getStr('sexArr')}}</span></p>

      <h3 class="detail-title">基本信息</h3>
      <p><span class="span-title">资金标题</span><span>：{{detail.capital_title}}</span></p>
      <p><span class="span-title">投资金额</span><span>：{{detail.investment_min}}万~{{detail.investment_max}}万</span></p>
      <p><span class="span-title">资金类型</span><span>：{{detail.capital_type | getStr('moneyTypeArr')}}</span></p>
      <p><span class="span-title">所在地区</span><span>：{{detail.capital_area | getStr('areaArr')}}</span></p>
      <p><span class="span-title">所属行业</span><span>：{{detail.capital_industry | getStr('industryArr')}}</span></p>
      <p><span class="span-title">标签</span><span>：{{detail.capital_label}}</span></p>
      <p><span class="span-title">一句话介绍</span><span>：{{detail.brief_introduction}}</span></p>

      <h3 class="detail-title">投资信息</h3>
      <p><span class="span-title">投资阶段</span><span>：{{detail.investment_phase | getStr('phaseArr')}}</span></p>
      <p><span class="span-title">投资地区</span><span>：{{detail.investment_area | getStr('areaArr')}}</span></p>
      <p><span class="span-title">投资行业</span><span>：{{detail.investment_industry | getStr('industryArr')}}</span></p>
      <p><span class="span-title">起投金额</span><span>：{{detail.start_price}}万</span></p>
      <p><span class="span-title">回报要求</span><span>：{{detail.return_request}}%每年</span></p>
      <p><span class="span-title">需要资料</span><span>：{{detail.required_data | getStr('needInformationArr')}}</span></p>

      <h3 class="detail-title">其他要求</h3>
      <p>{{detail.required_other}}</p>

      <h3 class="detail-title">资金描述</h3>
      <p style="text-indent: 2em;">{{detail.capital_describe}}</p>

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
        examine:'0',
        remark:'',
        message:''
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/capitaldetails',{
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
        axios.post('/apis/jcwyadminphp/demand/capitalReview',{
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
  .detail-form{ width: 668px; }
</style>