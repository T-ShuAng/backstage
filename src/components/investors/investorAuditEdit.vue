<template>
  <div class="investorAudit-edit edit-box">

    <div class="edit-center">
      <p><span>提交时间：</span><span>{{detail.reg_time | getTime(1)}}</span></p>

      <el-form :model="detail" ref="ruleForm" :rules="rules" label-position="top">

        <h3 class="edit-title">认证信息</h3>

        <el-form-item label="职业照" prop="major_image" :required="true" class="short-input">
          <el-upload
                  accept="image/jpeg,image/gif,image/png"
                  class="portrait-uploader"
                  action="/apis/jcwyadminphp/demand/investorModify"
                  name="major_image"
                  ref="upload"
                  :data="{id:detail.id}"
                  :on-error="upLogoErr"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="changeImage"
                  :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" style="margin-top: 20px;" @click="$refs.upload.submit()" >点击上传</el-button>
        </el-form-item>

        <el-form-item label="真实姓名" prop="real_name" class="short-input">
          <el-input v-model="detail.real_name" :maxlength="10">
            <template slot="append">{{detail.real_name.length}}/10</template>
          </el-input>
        </el-form-item>

        <el-form-item label="投资身份" prop="inve_identity" :required="true" class="short-input">
          <el-select v-model="detail.inve_identity" placeholder="请选择">
            <el-option label="个人天使" value="1"></el-option>
            <el-option label="机构投资" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公司名称" prop="company_name">
          <el-input v-model="detail.company_name" :maxlength="20">
            <template slot="append">{{detail.company_name.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="职位" prop="inve_position">
          <el-input v-model="detail.inve_position" :maxlength="20">
            <template slot="append">{{detail.inve_position.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="公司主页" prop="company_website">
          <el-input v-model="detail.company_website" :maxlength="30">
            <template slot="append">{{detail.company_website.length}}/30</template>
          </el-input>
        </el-form-item>

        <el-form-item label="常驻地区" prop="resident_area" :required="true" class="short-input">
          <el-select v-model="detail.resident_area" placeholder="请选择">
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

        <el-form-item label="单笔投资" prop="single_investment" class="short-input">
          <el-input v-model.number="detail.single_investment" :maxlength="10">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="偏好阶段" prop="investment_phase">
          <el-checkbox-group v-model="detail.investment_phase">
            <el-checkbox label="1">种子期</el-checkbox>
            <el-checkbox label="2">初创期</el-checkbox>
            <el-checkbox label="3">成长期</el-checkbox>
            <el-checkbox label="4">扩张期</el-checkbox>
            <el-checkbox label="5">成熟期</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="投资地区" prop="inve_area">
          <el-checkbox-group v-model="detail.inve_area">
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

        <el-form-item label="关注领域" prop="focus_areas">
          <el-checkbox-group v-model="detail.focus_areas">
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

        <el-form-item label="个人名片" prop="business_card" :required="true">
          <el-upload
                  accept="image/jpeg,image/gif,image/png"
                  class="businessCard-uploader"
                  action="/apis/jcwyadminphp/demand/investorModify"
                  name="business_card"
                  ref="imgUpload"
                  :data="{id:detail.id}"
                  :on-error="upLogoErr"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="changeCard"
                  :on-success="fileUpSuccess">
            <img v-if="cardUrl" :src="cardUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="businessCard-text">建议上传名片尺寸：90mm*50mm</span>
          <span class="businessCard-text">请上传真实有效的个人名片，名片上的公司名称应该与所认领的公司名称保持一致；请勿上传其他不相关的证件，以免影响审核通过率；上传图片支持2M以内的PNG、JPG、GIF格式。</span>
          <el-button type="primary" style="margin-top: 20px;" @click="$refs.imgUpload.submit()" >点击上传</el-button>
        </el-form-item>

        <div class="bottom-btn">
          <a href="javascript:void (0);" class="primary-btn" @click=" postData()">确定</a>
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
        cardUrl:'',
        id: this.$route.params.id,
        detail:{
          real_name:"",
          company_name: "",
          inve_position: "",
          company_website: ""
        },

        rules:{
          real_name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
          company_name:[{ required: true, message: '请输入公司名称', trigger: 'blur' }],
          inve_position:[{ required: true, message: '请输入职位', trigger: 'blur' }],
          company_website:[{ required: true, message: '请输入公司主页', trigger: 'blur' }],

          investment_phase:[{type:'array', required: true, message: '请选择阶段', trigger: 'change' }],
          focus_areas:[{type:'array', required: true, message: '请选择领域', trigger: 'change' }],
          inve_area:[{type:'array', required: true, message: '请选择地区', trigger: 'change' }],

          single_investment:[{type:'number', required: true, message: '请输入投资金额,值为数字', trigger: 'blur' }],
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

      changeImage(file){this.imageUrl = URL.createObjectURL(file.raw);},

      changeCard(file){this.cardUrl = URL.createObjectURL(file.raw);},


      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/investorDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.detail.investment_phase = res.data.data.investment_phase.split(',');
            this.detail.inve_area = res.data.data.inve_area.split(',');
            this.detail.focus_areas = res.data.data.focus_areas.split(',');
            this.imageUrl ='/public/static/'+this.detail.major_image;
            this.cardUrl ='/public/static/'+this.detail.business_card;

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
            this.detail.major_image=undefined;
            console.log(this.detail);

            axios.post("/apis/jcwyadminphp/demand/investorModify",this.detail).then((res)=>{
              if(res.data.code==200){this.$message.success("修改成功");}
              else{this.$message.warning(res.data.code+":"+res.data.message);}
            }).catch((err)=>{
              this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
            })

          } else {this.$message.warning("请填写必填项");return false;}
        });
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
  .businessCard-text{
    width: 280px;
    display: inline-block;
    line-height: 20px;
    color: #aaa;
    font-size: 16px;
    float: left;
  }
</style>

<style>
  .portrait-uploader .el-upload{
    width: 90px;
    height: 90px;
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
   .businessCard-uploader .el-upload{
     width: 180px;
     height: 100px;
     border-radius: 6px;
     background: #eee;
     text-align: center;
     border: 2px dashed #ccc;
     line-height: 100px;
     color: #999;
   }
  .businessCard-uploader{
    float: left;
    margin-right: 20px;
  }
  .textarea-input{clear: both;}
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