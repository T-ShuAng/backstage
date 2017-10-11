<template>
  <div class="capital-edit edit-box">

    <div class="edit-center">
      <p><span>发布时间：</span><span>{{detail.demand_time | getTime(1)}}</span></p>
      <p><span>是否删除：</span><span>{{detail.is_delete | getStr('isArr')}}</span></p>

      <el-form :model="detail" :rules="rules" ref="ruleForm" label-position="top">

        <h3 class="edit-title">个人信息</h3>

        <el-form-item label="姓名" prop="user_name" class="short-input">
          <el-input v-model="detail.user_name" :maxlength="10">
            <template slot="append">{{detail.user_name.length}}/10</template>
          </el-input>
        </el-form-item>

        <el-form-item label="性别" :rules="[{required: true}]">
          <el-radio-group v-model="detail.user_sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <h3 class="edit-title">资金信息</h3>

        <el-form-item label="资金标题" prop="capital_title">
          <el-input v-model="detail.capital_title" :maxlength="14">
            <template slot="append">{{detail.capital_title.length}}/14</template>
          </el-input>
        </el-form-item>

        <el-form-item label="一句话介绍" prop="brief_introduction">
          <el-input v-model="detail.brief_introduction" :maxlength="20">
            <template slot="append">{{detail.brief_introduction.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="投资金额" prop="investment_min" class="db-input">
          <el-input v-model.number="detail.investment_min" style="margin-right: 0;">
            <template slot="append">万元</template>
          </el-input>
          <span>--</span>
          <el-input v-model.number="detail.investment_max" @blur="onlyNum">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="投资类型" :required="true">
          <el-radio-group v-model="detail.capital_type">
            <el-radio label="1">金融机构资金</el-radio>
            <el-radio label="2">非金融机构资金</el-radio>
            <el-radio label="3">民间资金</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="所在地区" :required="true" class="short-input">
          <el-select v-model="detail.capital_area" placeholder="请选择">
            <el-option label="北京市" value="1"></el-option>
            <el-option label="上海市" value="2"></el-option>
            <el-option label="广州市" value="3"></el-option>
            <el-option label="深圳市" value="4"></el-option>
            <el-option label="天津市" value="5"></el-option>
            <el-option label="杭州市" value="6"></el-option>
            <el-option label="成都市" value="7"></el-option>
            <el-option label="苏州市" value="8"></el-option>
            <el-option label="南京市" value="9"></el-option>
            <el-option label="武汉市" value="10"></el-option>
            <el-option label="国内其他" value="11"></el-option>
            <el-option label="海外" value="12"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属行业" :required="true" class="short-input">
          <el-select v-model="detail.capital_industry" placeholder="请选择">
            <el-option label="电商" value="1"></el-option>
            <el-option label="社交" value="2"></el-option>
            <el-option label="硬件" value="3"></el-option>
            <el-option label="文娱传媒" value="4"></el-option>
            <el-option label="工具" value="5"></el-option>
            <el-option label="消费生活" value="6"></el-option>
            <el-option label="金融" value="7"></el-option>
            <el-option label="医疗健康" value="8"></el-option>
            <el-option label="企业服务" value="9"></el-option>
            <el-option label="旅游" value="10"></el-option>
            <el-option label="房产居家" value="11"></el-option>
            <el-option label="教育" value="12"></el-option>
            <el-option label="汽车交通" value="13"></el-option>
            <el-option label="物流" value="14"></el-option>
            <el-option label="人工智能" value="15"></el-option>
            <el-option label="无人机" value="16"></el-option>
            <el-option label="机器人" value="17"></el-option>
            <el-option label="VR/AR" value="18"></el-option>
            <el-option label="体育" value="19"></el-option>
            <el-option label="农业" value="20"></el-option>
            <el-option label="共享经济" value="21"></el-option>
            <el-option label="出海" value="22"></el-option>
            <el-option label="消费升级" value="23"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标签">
          <el-input v-model="detail.capital_label" :maxlength="20">
            <template slot="append">{{detail.capital_label.length}}/20</template>
          </el-input>
        </el-form-item>


        <h3 class="edit-title">公司logo <span class="none-text">(没有可不填)</span></h3>
        <el-upload
                accept="image/jpeg,image/gif,image/png"
                class="logo-uploader"
                action="/apis/jcwyadminphp/demand/capitalModify"
                nmae="company_logo"
                ref="upload"
                :data="{id:detail.id}"
                :show-file-list="false"
                :on-error="upLogoErr"
                :auto-upload="false"
                :on-change="changeLogo"
                :on-success="handleAvatarSuccess">
          <img v-if="logoUrl" :src="logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" style="margin-top: 20px;" @click="$refs.upload.submit()" >点击上传</el-button>


        <h3 class="edit-title">投资信息</h3>

        <el-form-item label="投资阶段" prop="investment_phase">
          <el-checkbox-group v-model="detail.investment_phase">
            <el-checkbox label="1">种子期</el-checkbox>
            <el-checkbox label="2">初创期</el-checkbox>
            <el-checkbox label="3">成长期</el-checkbox>
            <el-checkbox label="4">扩张期</el-checkbox>
            <el-checkbox label="5">成熟期</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="投资地区" prop="investment_area">
          <el-checkbox-group v-model="detail.investment_area">
            <el-checkbox label="1">北京市</el-checkbox>
            <el-checkbox label="2">上海市</el-checkbox>
            <el-checkbox label="3">广州市</el-checkbox>
            <el-checkbox label="4">深圳市</el-checkbox>
            <el-checkbox label="5">天津市</el-checkbox>
            <el-checkbox label="6">杭州市</el-checkbox>
            <el-checkbox label="7">成都市</el-checkbox>
            <el-checkbox label="8">苏州市</el-checkbox>
            <el-checkbox label="9">南京市</el-checkbox>
            <el-checkbox label="10">武汉市</el-checkbox>
            <el-checkbox label="11">国内其他</el-checkbox>
            <el-checkbox label="12">海外</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="投资行业" prop="investment_industry">
          <el-checkbox-group v-model="detail.investment_industry">
            <el-checkbox label="1">电商</el-checkbox>
            <el-checkbox label="2">社交</el-checkbox>
            <el-checkbox label="3">硬件</el-checkbox>
            <el-checkbox label="4">文娱传媒</el-checkbox>
            <el-checkbox label="5">工具</el-checkbox>
            <el-checkbox label="6">消费生活</el-checkbox>
            <el-checkbox label="7">金融</el-checkbox>
            <el-checkbox label="8">医疗健康</el-checkbox>
            <el-checkbox label="9">企业服务</el-checkbox>
            <el-checkbox label="10">旅游</el-checkbox>
            <el-checkbox label="11">房产居家</el-checkbox>
            <el-checkbox label="12">教育</el-checkbox>
            <el-checkbox label="13">汽车交通</el-checkbox>
            <el-checkbox label="14">物流</el-checkbox>
            <el-checkbox label="15">人工智能</el-checkbox>
            <el-checkbox label="16">无人机</el-checkbox>
            <el-checkbox label="17">机器人</el-checkbox>
            <el-checkbox label="18">VR/AR</el-checkbox>
            <el-checkbox label="19">体育</el-checkbox>
            <el-checkbox label="20">农业</el-checkbox>
            <el-checkbox label="21">共享经济</el-checkbox>
            <el-checkbox label="22">出海</el-checkbox>
            <el-checkbox label="23">消费升级</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="起投金额" prop="start_price"  class="short-input">
          <el-input v-model.number="detail.start_price" :maxlength="10">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="回报要求" prop="return_request"  class="short-input">
          <el-input v-model.number="detail.return_request" :maxlength="10">
            <template slot="append">%每年</template>
          </el-input>
        </el-form-item>

        <el-form-item label="需要资料" prop="required_data">
          <el-checkbox-group v-model="detail.required_data">
            <el-checkbox label="1">商业计划书</el-checkbox>
            <el-checkbox label="2">公司证书</el-checkbox>
            <el-checkbox label="3">财务报表</el-checkbox>
            <el-checkbox label="4">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="其他要求" class="textarea-input">
          <el-input v-model="detail.required_other" type="textarea" :maxlength="200" placeholder=""></el-input>
          <span class="show-num">{{detail.required_other.length}}/200</span>
        </el-form-item>

        <el-form-item label="资金描述" class="textarea-input height-input">
          <el-input v-model="detail.capital_describe" type="textarea" :maxlength="500"></el-input>
          <span class="show-num">{{detail.capital_describe.length}}/500</span>
        </el-form-item>

        <div class="bottom-btn">
          <a href="javascript:void (0);" class="primary-btn" @click="postData">确定</a>
          <a href="javascript:void (0);" class="reset-btn">取消</a>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Arr from '../../assets/js/arr'

  export default {

    mounted(){this.getData();},
    data() {
      return {
        oldData:'',
        logoUrl:'',
        id: this.$route.params.id,
        detail:{
          user_name: "",
          capital_title: "",
          brief_introduction: "",
          capital_label: "",
          required_other: "",
          capital_describe: ""
        },


        rules:{
          user_name:[{ required: true, message: '请输入名字', trigger: 'blur' }],
          capital_title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
          brief_introduction:[{ required: true, message: '请输入一句话介绍', trigger: 'blur' }],
          investment_min:[{type:'number', required: true, message: '请输入投资金额，值为数字' }],
          investment_phase:[{type:'array', required: true, message: '请选择投资阶段', trigger: 'change' }],
          investment_area:[{type:'array', required: true, message: '请选择投资地区', trigger: 'change' }],
          investment_industry:[{type:'array', required: true, message: '请选择投资行业', trigger: 'change' }],
          start_price:[{type:'number', required: true, message: '请输入起投金额', trigger: 'blur' }],
          return_request:[{type:'number', required: true, message: '请输入回报要求', trigger: 'blur' }],
          required_data:[{type:'array', required: true, message: '请选择需要资料', trigger: 'change' }],

        }

      }
    },
    methods: {

      handleAvatarSuccess(res, file) {
        if(res.code==200){
          this.$message.success("上传成功");
          this.detail.project_logo = res.data.project_logo;
        }else{this.$message.warning(res.code+":"+res.message)}
      },

      upLogoErr(err, file, fileList){this.$message.error('出错了！上传失败')},

      changeLogo(file){this.logoUrl = URL.createObjectURL(file.raw);},

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/capitaldetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.detail.investment_phase = res.data.data.investment_phase.split(',');
            this.detail.investment_area = res.data.data.investment_area.split(',');
            this.detail.investment_industry = res.data.data.investment_industry.split(',');
            this.detail.required_data = res.data.data.required_data.split(',');
            this.logoUrl ='/public/static/'+this.detail.company_logo;

            this.oldData = JSON.stringify(this.detail);

          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        });
      },

      // 提交
      postData(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let newData = JSON.stringify(this.detail);
            if(newData===this.oldData){return false;}
            this.detail.company_logo = undefined;
            console.log(this.detail);

            axios.post("/apis/jcwyadminphp/demand/capitalModify",this.detail).then((res)=>{
              if(res.data.code==200){this.$message.success("修改成功");}
              else{this.$message.warning(res.data.code+":"+res.data.message);}
            }).catch((err)=>{
              this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
            })

          } else {this.$message.warning("请填写必填项");return false;}
        });
      },

      onlyNum(event){
        let val = event.target.value;
        this.detail.investment_max = val.replace(/\D/g,'');
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
  @import "../edit.less";
</style>

<style>
  .logo-uploader .el-upload{
    width: 196px;
    height:196px;
    border-radius: 4px;
    background: #eee;
    text-align: center;
    line-height: 196px;
    color: #999;
    border: 2px dashed #ccc;
  }
  .portrait-uploader  .el-upload{
    width: 90px;
    height:90px;
    border-radius: 50%;
    background: #eee;
    text-align: center;
    line-height: 90px;
    color: #999;
  }
  .el-upload img{
    width: 100%;
    height: 100%;
  }
  .el-form-item,.textarea-input{clear: both;}
  .textarea-input textarea{ height: 120px;}
  .height-input textarea{ height: 260px;}
  .db-input{ clear:both; }
  .short-input .el-input,
  .db-input .el-input{
    width: 230px;
    margin-right: 16px;
  }
  .edit-center .el-checkbox{
    width:100px;
    margin-left: 0;
    margin-right: 20px;
  }
  .el-checkbox__label{ font-size: 16px; }

</style>