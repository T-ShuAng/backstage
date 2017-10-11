<template>
  <div class="institution-edit edit-box">

    <div class="edit-center">
      <p><span>申请时间：</span><span>{{detail.create_time | getTime(1)}}</span></p>

      <el-form :model="detail" :rules="rules" ref="ruleForm" label-position="top">

        <h3 class="edit-title">机构信息</h3>

        <el-form-item label="机构名称" prop="institution_name">
          <el-input v-model="detail.institution_name" :maxlength="14">
            <template slot="append">{{detail.institution_name.length}}/14</template>
          </el-input>
        </el-form-item>

        <el-form-item label="营业执照注册号" prop="business_number">
          <el-input v-model="detail.business_number"></el-input>
        </el-form-item>

        <el-form-item label="营业执照副本" prop="business_image" :rules="[{required: true}]">
          <el-upload
                  accept="image/jpeg,image/gif,image/png"
                  class="license-uploader"
                  action="/apis/jcwyadminphp/demand/institutionModify"
                  name="business_image"
                  ref="imgUpload"
                  :data="{id:detail.id}"
                  :on-error="upLogoErr"
                  :on-change="changeImage"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" style="margin-top: 20px;" @click="$refs.imgUpload.submit()" >点击上传</el-button>
        </el-form-item>

        <el-form-item label="机构logo" :rules="[{required: true}]">
          <el-upload
                  accept="image/jpeg,image/gif,image/png"
                  class="logo-uploader"
                  action="/apis/jcwyadminphp/demand/institutionModify"
                  name="institution_logo"
                  ref="upload"
                  :data="{id:detail.id}"
                  :on-error="upLogoErr"
                  :on-change="changeLogo"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-success="fileUpSuccess">
            <img v-if="logoUrl" :src="logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" style="margin-top: 20px;" @click="$refs.upload.submit()" >点击上传</el-button>
        </el-form-item>

        <el-form-item label="机构简介" class="textarea-input height-input" prop="institution_introduction">
          <el-input v-model="detail.institution_introduction" type="textarea" :maxlength="500" placeholder=""></el-input>
          <span class="show-num">{{detail.institution_introduction.length}}/500</span>
        </el-form-item>

        <el-form-item label="机构注册地址" prop="reg_address">
          <el-input v-model="detail.reg_address" :maxlength="30">
            <template slot="append">{{detail.reg_address.length}}/30</template>
          </el-input>
        </el-form-item>

        <el-form-item label="投资阶段" prop="institution_phase">
          <el-checkbox-group v-model="detail.institution_phase">
            <el-checkbox label="1">种子期</el-checkbox>
            <el-checkbox label="2">初创期</el-checkbox>
            <el-checkbox label="3">成长期</el-checkbox>
            <el-checkbox label="4">扩张期</el-checkbox>
            <el-checkbox label="5">成熟期</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="投资行业" prop="institution_industry">
          <el-checkbox-group v-model="detail.institution_industry">
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

        <el-form-item label="投资地区" prop="institution_area">
          <el-checkbox-group v-model="detail.institution_area">
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


        <el-form-item label="最大可投金额" prop="institution_money" class="short-input">
          <el-input v-model.number="detail.institution_money">
            <template slot="append">万</template>
          </el-input>
        </el-form-item>

        <el-form-item label="企业邮箱" prop="email" :rules="[{type:'email',required: true}]">
          <el-input v-model="detail.email"></el-input>
        </el-form-item>


        <h3 class="edit-title">成功案例</h3>

        <div class="edit-item-box" v-for="(item,index) in detail.succeed">
          <span class="edit-item-close" @click="succeedEdit(item.id,index)">×</span>

          <el-form-item
                  label="投资时间"
                  :prop="'succeed.' + index + '.inve_time'"
                  :rules="{ type:'date',required: true, message: '请选择日期', trigger: 'change'}"
                  class="short-input">
            <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="item.inve_time"></el-date-picker>
          </el-form-item>

          <el-form-item
                  label="投资金额"
                  :prop="'succeed.' + index + '.inve_money'"
                  :rules="{ type:'number', message: '请输入数字', trigger: 'blur'}"
                  class="short-input">
            <el-input v-model.number="item.inve_money" >
              <template slot="append">万</template>
            </el-input>
          </el-form-item>

          <el-form-item
                  label="投资项目/企业名称"
                  :rules="{ required: true, message: '请输入内容', trigger: 'blur'}"
                  :prop="'succeed.' + index + '.inve_name'">
            <el-input v-model="item.inve_name" :maxlength="14">
              <template slot="append">{{item.inve_name.length}}/14</template>
            </el-input>
          </el-form-item>
        </div>
        <a href="javascript:void (0);" class="add-btn" @click="succeedEdit()">+ 添加</a>

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
        imageUrl:'',
        logoUrl:'',
        id: this.$route.params.id,
        detail:{
          institution_name:"",
          institution_introduction: "",
          reg_address: "",

        },

        rules:{
          institution_name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
          business_number:[{ required: true, message: '请输入注册号', trigger: 'blur' }],
          institution_introduction:[{ required: true, message: '请输入机构简介', trigger: 'blur' }],
          reg_address:[{ required: true, message: '请输入地址', trigger: 'blur' }],

          institution_phase:[{type:'array', required: true, message: '请选择阶段', trigger: 'change' }],
          institution_industry:[{type:'array', required: true, message: '请选择行业', trigger: 'change' }],
          institution_area:[{type:'array', required: true, message: '请选择地区', trigger: 'change' }],

          institution_money:[{type:'number', required: true, message: '请输入可投金额,值为数字', trigger: 'blur' }],
        }

      }
    },
    methods: {

      handleAvatarSuccess(res, file) {
        if(res.code==200){
          this.$message.success("上传成功");
        }else{this.$message.warning(res.code+":"+res.message)}
      },

      fileUpSuccess(res,file){
        if(res.code==200){
          this.$message.success("上传成功");
        }else{this.$message.warning(res.code+":"+res.message)}
      },

      upLogoErr(err, file, fileList){this.$message.error('出错了！上传失败')},

      changeLogo(file){this.logoUrl = URL.createObjectURL(file.raw);},

      changeImage(file){this.imageUrl = URL.createObjectURL(file.raw);},

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/InstitutionDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.detail.institution_phase = res.data.data.institution_phase.split(',');
            this.detail.institution_area = res.data.data.institution_area.split(',');
            this.detail.institution_industry = res.data.data.institution_industry.split(',');
            this.logoUrl ='/public/static/'+this.detail.institution_logo;
            this.imageUrl ='/public/static/'+this.detail.business_image;

            this.detail.id_delete={succeed:[]};
            this.detail.succeed.forEach((item,index)=>{
              this.detail.succeed[index].inve_time = new Date (item.inve_time*1000)
            });
            this.oldData = JSON.stringify(this.detail)
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
            this.detail.institution_logo=undefined;
            console.log(this.detail);

            axios.post("/apis/jcwyadminphp/demand/institutionModify",this.detail).then((res)=>{
              if(res.data.code==200){this.$message.success("修改成功");}
              else{this.$message.warning(res.data.code+":"+res.data.message);}
            }).catch((err)=>{
              this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
            })

          } else {this.$message.warning("请填写必填项");return false;}
        });
      },

      //成功增删
      succeedEdit(id,index){
        if(index!=undefined){
          this.detail.succeed.splice(index,1);
          if(id){this.detail.id_delete.succeed.push(id);}
        } else {
          this.detail.succeed.push({
            inve_time:'',
            inve_name:'',
            inve_money:''
          })
        }
      },


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
    width: 90px;
    height:90px;
    border-radius: 4px;
    background: #eee;
    text-align: center;
    line-height: 90px;
    color: #999;
    border: 2px dashed #ccc;
  }
  .license-uploader  .el-upload{
    width: 134px;
    height:134px;
    border-radius:4px;
    background: #eee;
    text-align: center;
    line-height: 134px;
    color: #999;
  }
  .el-upload .avatar{
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