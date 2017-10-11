<template>
  <div class="entre-edit edit-box">

    <div class="edit-center">
      <p><span>资料注册时间：</span><span>2017-02-02</span></p>
      <p><span>身份：</span><span>创业者</span></p>

      <el-form :model="entreForm" :rules="rules" label-position="top">

        <h3 class="edit-title">基本信息</h3>

        <el-form-item label="手机号码" prop="phone" class="short-input">
          <el-input v-model.number="entreForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="上传头像" prop="headPortrait" class="short-input">
          <el-upload
                  class="portrait-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="姓名" prop="name" class="short-input">
          <el-input v-model="entreForm.name" :maxlength="10">
            <template slot="append">{{entreForm.name.length}}/10</template>
          </el-input>
        </el-form-item>

        <el-form-item label="性别" :rules="[{required: true}]">
          <el-radio-group v-model="entreForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="一句话介绍" prop="name">
          <el-input v-model="entreForm.name" :maxlength="20">
            <template slot="append">{{entreForm.name.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="个人简介" prop="name" class="textarea-input">
          <el-input v-model="entreForm.name" type="textarea" :maxlength="500"></el-input>
          <span class="show-num">{{entreForm.name.length}}/500</span>
        </el-form-item>

        <h3 class="edit-title">工作经历</h3>
        <div class="edit-item-box">
          <span class="edit-item-close">×</span>
          <el-form-item label="时间" prop="data" class="short-input">
            <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="entreForm.date"></el-date-picker>
          </el-form-item>
          <el-form-item label="工作内容" class="textarea-input">
            <el-input v-model="entreForm.name" type="textarea" :maxlength="500"></el-input>
            <span class="show-num">{{entreForm.name.length}}/500</span>
          </el-form-item>
        </div>
        <a href="javascript:void (0);" class="add-btn">+ 添加</a>

        <h3 class="edit-title">教育经历</h3>
        <div class="edit-item-box">
          <span class="edit-item-close">×</span>
          <el-form-item label="学校名称" prop="name" class="short-input">
            <el-input v-model="entreForm.name" :maxlength="14">
              <template slot="append">{{entreForm.name.length}}/14</template>
            </el-input>
          </el-form-item>
          <el-form-item label="学历" prop="" class="short-input">
            <el-select v-model="entreForm.region" placeholder="请选择">
              <el-option label="中专及以下" value="1"></el-option>
              <el-option label="高中" value="2"></el-option>
              <el-option label="专科" value="3"></el-option>
              <el-option label="本科" value="4"></el-option>
              <el-option label="硕士" value="5"></el-option>
              <el-option label="博士" value="6"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="在校时间" prop="data" class="db-input">
            <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="entreForm.date"></el-date-picker>
            <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="entreForm.date"></el-date-picker>
          </el-form-item>

          <el-form-item label="专业" prop="name" class="short-input">
            <el-input v-model="entreForm.name" :maxlength="10">
              <template slot="append">{{entreForm.name.length}}/10</template>
            </el-input>
          </el-form-item>

          <el-form-item label="工作内容" prop="name" class="textarea-input">
            <el-input v-model="entreForm.name" type="textarea" :maxlength="500"></el-input>
            <span class="show-num">{{entreForm.name.length}}/500</span>
          </el-form-item>
        </div>
        <a href="javascript:void (0);" class="add-btn">+ 添加</a>

        <h3 class="edit-title">创业经历</h3>
        <div class="edit-item-box">
          <span class="edit-item-close">×</span>
          <el-form-item label="创业时间" prop="data" class="short-input">
            <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="entreForm.date"></el-date-picker>
          </el-form-item>
          <el-form-item label="创业内容" class="textarea-input">
            <el-input v-model="entreForm.name" type="textarea" :maxlength="500"></el-input>
            <span class="show-num">{{entreForm.name.length}}/500</span>
          </el-form-item>
        </div>
        <a href="javascript:void (0);" class="add-btn">+ 添加</a>

        <div class="bottom-btn">
          <a href="javascript:void (0);" class="primary-btn">确定</a>
          <a href="javascript:void (0);" class="reset-btn">取消</a>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl:'',
        entreForm:{
          phone:"",
          name:"",
          sex:"1",
          date:""
        },
        rules:{
          phone: [{type:'number', required: true, message: '请输入手机号码', trigger: 'blur' },
                  {type:'number', message: '长度为11位数字', trigger: 'blur' }],
          headPortrait:[{ required: true, message: '请选择头像', trigger: 'change' }],
          name:[{ required: true, message: '请输入名字', trigger: 'blur' }],

        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../edit.less";
</style>

<style>
  .portrait-uploader .el-upload{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #eee;
    text-align: center;
    line-height: 90px;
  }
  .portrait-uploader  .el-upload img{
    width: 100%;
    height: 100%;
  }
  .textarea-input{clear: both;}
  .textarea-input textarea{
    height: 120px;
  }
  .db-input{ clear:both; }
  .short-input .el-input,
  .db-input .el-input{
    width: 230px;
    margin-right: 16px;
  }

</style>