<template>
  <div class="talent-edit edit-box">

    <div class="edit-center">
      <p><span>资料注册时间：</span><span>2017-02-02</span></p>
      <p><span>身份：</span><span>人才</span></p>

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

        <el-form-item label="性别":rules="[{required: true}]">
          <el-radio-group v-model="entreForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" prop="name" class="short-input">
          <el-input v-model="entreForm.name" :maxlength="3"></el-input>
        </el-form-item>

        <el-form-item label="一句话介绍" prop="name">
          <el-input v-model="entreForm.name" :maxlength="20">
            <template slot="append">{{entreForm.name.length}}/20</template>
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

        <el-form-item label="技能标签" prop="name">
          <el-input v-model="entreForm.name" :maxlength="30">
            <template slot="append">{{entreForm.name.length}}/30</template>
          </el-input>
        </el-form-item>

        <el-form-item label="工作年限" prop="" class="short-input">
          <el-select v-model="entreForm.region" placeholder="请选择">
            <el-option label="在校学生" value="1"></el-option>
            <el-option label="应届毕业生" value="2"></el-option>
            <el-option label="1-3年" value="3"></el-option>
            <el-option label="3-5年" value="4"></el-option>
            <el-option label="5-10年" value="5"></el-option>
            <el-option label="10年以上" value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="目前状态" prop="" class="short-input">
          <el-select v-model="entreForm.region" placeholder="请选择">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item>


        <h3 class="edit-title">求职意向</h3>

        <el-form-item label="期望岗位" prop="" class="short-input">
          <el-select v-model="entreForm.region" placeholder="请选择">
            <el-option label="合伙人" value="1"></el-option>
            <el-option label="后端开发" value="2"></el-option>
            <el-option label="移动开发" value="3"></el-option>
            <el-option label="前端开发" value="4"></el-option>
            <el-option label="人工智能" value="5"></el-option>
            <el-option label="测试" value="6"></el-option>
            <el-option label="运维" value="7"></el-option>
            <el-option label="DBA" value="8"></el-option>
            <el-option label="项目开发" value="9"></el-option>
            <el-option label="企业软件" value="10"></el-option>
            <el-option label="硬件开发" value="11"></el-option>
            <el-option label="产品经理" value="12"></el-option>
            <el-option label="产品设计师" value="13"></el-option>
            <el-option label="视觉设计" value="14"></el-option>
            <el-option label="交互设计" value="15"></el-option>
            <el-option label="用户研究" value="16"></el-option>
            <el-option label="运营" value="17"></el-option>
            <el-option label="编辑" value="18"></el-option>
            <el-option label="客服" value="19"></el-option>
            <el-option label="市场/营销" value="20"></el-option>
            <el-option label="公关" value="21"></el-option>
            <el-option label="销售" value="22"></el-option>
            <el-option label="供应链" value="23"></el-option>
            <el-option label="采购" value="24"></el-option>
            <el-option label="投资" value="25"></el-option>
            <el-option label="人力资源" value="26"></el-option>
            <el-option label="行政" value="27"></el-option>
            <el-option label="财务" value="28"></el-option>
            <el-option label="法务" value="29"></el-option>
            <el-option label="投融资" value="30"></el-option>
            <el-option label="风控" value="31"></el-option>
            <el-option label="审计税务" value="32"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="期望薪资" prop="name" class="db-input">
          <el-input v-model="entreForm.name" :maxlength="4" style="margin-right: 0;">
            <template slot="append">K/月</template>
          </el-input>
          <span>--</span>
          <el-input v-model="entreForm.name" :maxlength="4">
            <template slot="append">K/月</template>
          </el-input>
        </el-form-item>

        <el-form-item label="期望行业" prop="type">
          <el-checkbox-group v-model="entreForm.type">
            <el-checkbox label="电商" name="type"></el-checkbox>
            <el-checkbox label="社交" name="type"></el-checkbox>
            <el-checkbox label="硬件" name="type"></el-checkbox>
            <el-checkbox label="文娱传媒" name="type"></el-checkbox>
            <el-checkbox label="工具" name="type"></el-checkbox>
            <el-checkbox label="消费生活" name="type"></el-checkbox>
            <el-checkbox label="金融" name="type"></el-checkbox>
            <el-checkbox label="医疗健康" name="type"></el-checkbox>
            <el-checkbox label="企业服务" name="type"></el-checkbox>
            <el-checkbox label="旅游" name="type"></el-checkbox>
            <el-checkbox label="房产居家" name="type"></el-checkbox>
            <el-checkbox label="教育" name="type"></el-checkbox>
            <el-checkbox label="汽车交通" name="type"></el-checkbox>
            <el-checkbox label="物流" name="type"></el-checkbox>
            <el-checkbox label="人工智能" name="type"></el-checkbox>
            <el-checkbox label="无人机" name="type"></el-checkbox>
            <el-checkbox label="机器人" name="type"></el-checkbox>
            <el-checkbox label="VR/AR" name="type"></el-checkbox>
            <el-checkbox label="体育" name="type"></el-checkbox>
            <el-checkbox label="农业" name="type"></el-checkbox>
            <el-checkbox label="共享经济" name="type"></el-checkbox>
            <el-checkbox label="出海" name="type"></el-checkbox>
            <el-checkbox label="消费升级" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="期望地区" prop="type">
          <el-checkbox-group v-model="entreForm.type">
            <el-checkbox label="北京市" name="type"></el-checkbox>
            <el-checkbox label="上海市" name="type"></el-checkbox>
            <el-checkbox label="广州市" name="type"></el-checkbox>
            <el-checkbox label="深圳市" name="type"></el-checkbox>
            <el-checkbox label="天津市" name="type"></el-checkbox>
            <el-checkbox label="杭州市" name="type"></el-checkbox>
            <el-checkbox label="成都市" name="type"></el-checkbox>
            <el-checkbox label="苏州市" name="type"></el-checkbox>
            <el-checkbox label="南京市" name="type"></el-checkbox>
            <el-checkbox label="武汉市" name="type"></el-checkbox>
            <el-checkbox label="国内其他" name="type"></el-checkbox>
            <el-checkbox label="海外" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="我的优势" class="textarea-input height-input">
          <el-input
                  v-model="entreForm.name"
                  type="textarea"
                  :maxlength="500"
                  placeholder="请勿透露公司名称、具体地址和联系方式、否则系统将自动驳回您的发布信息">
          </el-input>
          <span class="show-num">{{entreForm.name.length}}/500</span>
        </el-form-item>


        <h3 class="edit-title">工作经历</h3>

        <div class="edit-item-box">
          <span class="edit-item-close">×</span>
          <el-form-item label="任职时间" prop="data" class="db-input">
            <el-date-picker type="date" :editable="false" v-model="entreForm.date"></el-date-picker>
            <el-date-picker type="date" :editable="false" v-model="entreForm.date"></el-date-picker>
          </el-form-item>

          <el-form-item label="职位" prop="name">
            <el-input v-model="entreForm.name" :maxlength="20">
              <template slot="append">{{entreForm.name.length}}/20</template>
            </el-input>
          </el-form-item>

          <el-form-item label="公司名称" prop="name">
            <el-input v-model="entreForm.name" :maxlength="20">
              <template slot="append">{{entreForm.name.length}}/20</template>
            </el-input>
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
          <el-form-item label="投资时间" prop="data" class="short-input">
            <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="entreForm.date"></el-date-picker>
          </el-form-item>
          <el-form-item label="投资内容" class="textarea-input">
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
          date:"",
          type:[]
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