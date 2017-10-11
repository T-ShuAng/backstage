<template>
  <div class="entreAudit-edit edit-box">

    <div class="edit-center">
      <p><span>提交时间：</span><span>{{detail.reg_time | getTime(1)}}</span></p>

      <el-form :model="detail" :rules="rules" label-position="top">

        <h3 class="edit-title">认证信息</h3>

        <el-form-item label="职业照" prop="major_image" :required="true" class="short-input">
          <el-upload
                  accept="image/jpeg,image/gif,image/png"
                  class="portrait-uploader"
                  action="/apis/jcwyadminphp/demand/entrepreneurshipModify"
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

        <el-form-item label="公司名称" prop="company_name">
          <el-input v-model="detail.company_name" :maxlength="20">
            <template slot="append">{{detail.company_name.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="职位" prop="entr_position">
          <el-input v-model="detail.entr_position" :maxlength="20">
            <template slot="append">{{detail.entr_position.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="公司主页" prop="company_website">
          <el-input v-model="detail.company_website" :maxlength="30">
            <template slot="append">{{detail.company_website.length}}/30</template>
          </el-input>
        </el-form-item>

        <el-form-item label="常驻地区" prop="resident_area"  :required="true" class="short-input">
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

        <el-form-item label="所属行业" prop="entr_industry" :required="true"  class="short-input">
          <el-select v-model="detail.entr_industry" placeholder="请选择">
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

        <el-form-item label="个人名片" prop="business_card" :required="true">
          <el-upload
                  accept="image/jpeg,image/gif,image/png"
                  class="businessCard-uploader"
                  action="/apis/jcwyadminphp/demand/entrepreneurshipModify"
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
          <a href="javascript:void (0);" class="primary-btn">确定</a>
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
          entr_position: "",
          company_website: ""
        },

        rules:{
          real_name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
          company_name:[{ required: true, message: '请输入公司名称', trigger: 'blur' }],
          entr_position:[{ required: true, message: '请输入职位', trigger: 'blur' }],
          company_website:[{ required: true, message: '请输入公司主页', trigger: 'blur' }]
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
        axios.post('/apis/jcwyadminphp/demand/entrepreneurshipDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
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

            axios.post("/apis/jcwyadminphp/demand/entrepreneurshipModify",this.detail).then((res)=>{
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