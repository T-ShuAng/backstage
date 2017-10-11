<template>
  <div class="creditDetails detail-box">

    <div class="detail-center">

      <p><span class="span-title">提交时间</span><span>：{{detail.create_time | getTime(1)}}</span></p>

      <h3 class="detail-title">基本信息</h3>
      <p><span class="span-title">姓名</span><span>：{{detail.name}}</span></p>
      <p><span class="span-title">联系电话</span><span>：{{detail.phone}}</span></p>
      <p><span class="span-title">户籍地</span><span>：{{detail.domicile}}</span></p>
      <p><span class="span-title">婚姻状况</span><span>：{{detail.marital==1 ? '未婚':'已婚'}}</span></p>
      <p v-show="detail.marital==2"><span class="span-title">配偶有无负债</span><span>：{{detail.marital_liability | getStr('haveArr')}}</span></p>
      <p><span class="span-title">单位名称</span><span>：{{detail.enterprise_name}}</span></p>
      <p><span class="span-title">职业</span><span>：{{detail.major}}</span></p>
      <p><span class="span-title">工作地点</span><span>：{{detail.work_address}}</span></p>
      <p><span class="span-title">近半年银行流水(自雇)</span><span>：{{detail.year_bank}}</span></p>
      <p><span class="span-title">有无银行代发工资</span><span>：{{detail.bank_payroll | getStr('haveArr')}}</span></p>
      <p v-show="detail.bank_payroll==1"><span class="span-title">代发额度</span><span>：{{detail.bank_credits}}元</span></p>
      <p><span class="span-title">近三个月征信查询次数</span><span>：{{detail.reference_num | getStr('referenceNumArr')}}</span></p>
      <p><span class="span-title">征信情况</span><span>：{{detail.num_situation==1? '良好':'有逾期'}}</span></p>
      <p><span class="span-title">需求贷款额度</span><span>：{{detail.demand_credits}}元</span></p>

      <h3 class="detail-title">房产信息</h3>
      <p><span class="span-title">有无房产</span><span>：{{detail.is_estate | getStr('haveArr')}}</span></p>
      <div v-show="detail.is_estate==1">
        <p><span class="span-title">购买方式</span><span>：{{detail.estate_buy_patterns==1? '全款':'按揭'}}</span></p>
        <p><span class="span-title">购买时间</span><span>：{{detail.estate_buy_time | getTime(1)}}</span></p>
        <p><span class="span-title">购房金额/首付</span><span>：{{detail.estate_down_payment}}元</span></p>
        <p><span class="span-title">单价</span><span>：{{detail.estate_unit_price}}元/㎡</span></p>
        <p><span class="span-title">房屋面积</span><span>：{{detail.estate_building_area}}㎡</span></p>
        <p><span class="span-title">剩余还款</span><span>：{{detail.estate_remaining_payments}}元</span></p>
        <p><span class="span-title">还款/月</span><span>：{{detail.estate_monthly_payments}}元</span></p>
        <p><span class="span-title">房产位置</span><span>：{{detail.estate_address}}</span></p>
      </div>

      <h3 class="detail-title">汽车信息</h3>
      <p><span class="span-title">有无汽车</span><span>：{{detail.is_car | getStr('haveArr')}}</span></p>
      <div v-show="detail.is_car==1">
        <p><span class="span-title">购买方式</span><span>：{{detail.car_buy_patterns==1? '全款':'按揭'}}</span></p>
        <p><span class="span-title">购车金额/首付</span><span>：{{detail.car_down_payment}}元</span></p>
        <p><span class="span-title">购买时间</span><span>：{{detail.car_buy_time | getTime(1)}}</span></p>
        <p><span class="span-title">汽车品牌</span><span>：{{detail.car_brand}}</span></p>
        <p><span class="span-title">还款/月</span><span>：{{detail.car_monthly_payments}}元</span></p>
      </div>

      <h3 class="detail-title">公积金信息</h3>
      <p><span class="span-title">有无公积金</span><span>：{{detail.is_fund | getStr('haveArr')}}</span></p>
      <div v-show="detail.is_fund==1">
        <p><span class="span-title">购买年限</span><span>：{{detail.fund_buy_time}}年</span></p>
        <p><span class="span-title">年缴金额</span><span>：{{detail.fund_year_amount}}元</span></p>
      </div>

      <h3 class="detail-title">信用卡信息</h3>
      <p><span class="span-title">有无信用卡</span><span>：{{detail.is_card | getStr('haveArr')}}</span></p>
      <div v-show="detail.is_card==1">
        <p><span class="span-title">信用卡总额度</span><span>：{{detail.card_count_credits}}元</span></p>
        <p><span class="span-title">有无逾期</span><span>：{{detail.card_is_overdue | getStr('haveArr')}}</span></p>
        <p><span class="span-title">已使用额度</span><span>：{{detail.card_usage_quota}}元</span></p>
        <p><span class="span-title">单张最高额度</span><span>：{{detail.card_single_max}}元</span></p>
        <p><span class="span-title">近半年有无申请最低还款</span><span>：{{detail.card_min_apply | getStr('haveArr')}}</span></p>
      </div>

      <h3 class="detail-title">商业保险信息</h3>
      <p><span class="span-title">有无商业保险</span><span>：{{detail.is_insurance | getStr('haveArr')}}</span></p>
      <div v-show="detail.is_insurance==1">
        <p><span class="span-title">购买年限</span><span>：{{detail.insurance_buy_time}}年</span></p>
        <p><span class="span-title">年缴金额</span><span>：{{detail.insurance_year_amount}}元</span></p>
      </div>

      <h3 class="detail-title">贷款信息</h3>
      <p><span class="span-title">有无其他贷款</span><span>：{{detail.is_other_loan | getStr('haveArr')}}</span></p>
      <div v-show="detail.is_other_loan==1">
        <p><span class="span-title">详细情况</span><span>：{{detail.other_detail_situation}}</span></p>
        <p><span class="span-title">经办人</span><span>：{{detail.other_agent_name}}</span></p>
        <p><span class="span-title">经办人电话</span><span>：{{detail.other_agent_phone}}</span></p>
        <p><span class="span-title">办理日期</span><span>：{{detail.other_time | getTime(1)}}</span></p>
      </div>

      <div class="detail-form">
        <span>是否已查看：</span>
        <el-radio-group v-model="status" class="detail-form-radio">
          <el-radio :disabled="detail.status!=0" label="0">未看</el-radio>
          <el-radio label="1">已看</el-radio>
        </el-radio-group>
        <!--<el-input type="textarea" class="detail-form-input" v-model="input" placeholder="备注"></el-input>-->
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
        status:'0',
      }
    },
    methods:{

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/credit/creditdetails',{
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
        axios.post('/apis/jcwyadminphp/credit/creditresults',{
          id:this.id,
          status:this.status,
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
</style>