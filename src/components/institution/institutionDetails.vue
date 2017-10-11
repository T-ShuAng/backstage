<template>
  <div class="institutionDetails detail-box">

    <div class="detail-center">

      <p><span class="span-title">申请时间</span><span>：{{detail.create_time | getTime(1)}}</span></p>

      <h3 class="detail-title">基本信息</h3>
      <p><span class="span-title">机构名称</span><span>：{{detail.institution_name}}</span></p>
      <p><span class="span-title">企业邮箱</span><span>：{{detail.email}}</span></p>
      <p><span class="span-title">机构注册地址</span><span>：{{detail.reg_address}}</span></p>
      <p><span class="span-title">营业执照注册号</span><span>：{{detail.business_number}}</span></p>

      <h3 class="detail-title">营业执照副本</h3>
      <p><img class="license-img" :src="'/public/static/'+detail.business_image"></p>

      <h3 class="detail-title">机构logo</h3>
      <p><img class="institu-logo" :src="'/public/static/'+detail.institution_logo" alt=""></p>

      <h3 class="detail-title">机构简介</h3>
      <p>{{detail.institution_introduction}}</p>

      <h3 class="detail-title">投资信息</h3>
      <p><span class="span-title">投资阶段</span><span>：{{detail.institution_phase | getStr('phaseArr')}}</span></p>
      <p><span class="span-title">投资行业</span><span>：{{detail.institution_industry | getStr('industryArr')}}</span></p>
      <p><span class="span-title">投资地区</span><span>：{{detail.institution_area | getStr('areaArr')}}</span></p>
      <p><span class="span-title">最大可投金额</span><span>：{{detail.institution_money}}万</span></p>

      <h3 class="detail-title">成功案例</h3>
      <table cellspacing="0" class="success-table">
        <tr class="success-table-title">
          <th width="25%">时间</th>
          <th>项目/企业名称</th>
          <th width="25%">金额</th>
        </tr>

        <tr class="success-table-row" v-for="item in detail.succeed">
          <td>{{item.inve_time}}</td>
          <td>{{item.inve_name}}</td>
          <td>{{item.inve_money}}万</td>
        </tr>
      </table>

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
        id: this.$route.params.id,
        detail:'',
        examine:'0',
        remark:""
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/InstitutionDetails',{
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
        axios.post('/apis/jcwyadminphp/demand/Institutionresults',{
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

  .detail-form{
    width: 408px;
  }

  .license-img{
    display: inline-block;
    max-width: 820px;
    width: 100%;
    background: #eee;
  }
  .institu-logo{
    display: inline-block;
    width: 198px;
    height: 198px;
    border: 2px dashed #eee;
    background: #ccc;
  }
  .success-table{
    width: 825px;
    margin-top: 20px;
  }
  .success-table-title{
    width: 825px;
    height: 50px;
    background: #efefef;
    border-radius: 4px;
  }
  .success-table-row{
    text-align: center;
    height: 50px;
  }
  .success-table-row td{
    border-bottom:1px solid #ddd;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>