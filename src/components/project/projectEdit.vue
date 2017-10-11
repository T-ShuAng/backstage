<template>
  <div class="project-edit edit-box">

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

        <el-form-item label="性别" :required="true" >
          <el-radio-group v-model="detail.user_sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>


        <h3 class="edit-title">公司logo</h3>
        <el-form-item>
        <el-upload
                accept="image/jpeg,image/gif,image/png"
                class="logo-uploader"
                ref="upload"
                name="company_logo"
                action="/apis/jcwyadminphp/demand/projectModify"
                :data="{id:detail.id}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="upLogoErr"
                :auto-upload="false"
                :on-change="changeLogo">
          <img v-if="logoUrl" :src="logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" style="margin-top: 20px;" @click="$refs.upload.submit()" >点击上传</el-button>
        </el-form-item>


        <h3 class="edit-title">项目信息</h3>

        <el-form-item label="项目标题" prop="project_title">
          <el-input v-model="detail.project_title" :maxlength="14">
            <template slot="append">{{detail.project_title.length}}/14</template>
          </el-input>
        </el-form-item>

        <el-form-item label="一句话介绍" prop="brief_introduction">
          <el-input v-model="detail.brief_introduction" :maxlength="20">
            <template slot="append">{{detail.brief_introduction.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="融资金额" :prop="'financing_min'" class="db-input">
          <el-input v-model.number="detail.financing_min" :maxlength="6" style="margin-right: 0;">
            <template slot="append">万元</template>
          </el-input>
          <span>--</span>
          <el-input v-model.number="detail.financing_max" :maxlength="6">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="所在地区" :required="true" class="short-input">
          <el-select v-model="detail.financing_area" placeholder="请选择">
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

        <el-form-item label="所属阶段" :required="true" class="short-input">
          <el-select v-model="detail.financing_phase" placeholder="请选择">
            <el-option label="种子期" value="1"></el-option>
            <el-option label="初创期" value="2"></el-option>
            <el-option label="成长期" value="3"></el-option>
            <el-option label="扩张期" value="4"></el-option>
            <el-option label="成熟期" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属行业" prop="financing_industry">
          <el-checkbox-group v-model="detail.financing_industry">
            <el-checkbox name="financing_industry" label="1">电商</el-checkbox>
            <el-checkbox name="financing_industry" label="2">社交</el-checkbox>
            <el-checkbox name="financing_industry" label="3">硬件</el-checkbox>
            <el-checkbox name="financing_industry" label="4">文娱传媒</el-checkbox>
            <el-checkbox name="financing_industry" label="5">消费生活</el-checkbox>
            <el-checkbox name="financing_industry" label="6">金融</el-checkbox>
            <el-checkbox name="financing_industry" label="7">医疗健康</el-checkbox>
            <el-checkbox name="financing_industry" label="8">企业服务</el-checkbox>
            <el-checkbox name="financing_industry" label="9">旅游</el-checkbox>
            <el-checkbox name="financing_industry" label="10">房产居家</el-checkbox>
            <el-checkbox name="financing_industry" label="11">教育</el-checkbox>
            <el-checkbox name="financing_industry" label="12">汽车交通</el-checkbox>
            <el-checkbox name="financing_industry" label="13">物流</el-checkbox>
            <el-checkbox name="financing_industry" label="14">人工智能</el-checkbox>
            <el-checkbox name="financing_industry" label="15">无人机</el-checkbox>
            <el-checkbox name="financing_industry" label="16">机器人</el-checkbox>
            <el-checkbox name="financing_industry" label="17">VR/AR</el-checkbox>
            <el-checkbox name="financing_industry" label="18">体育</el-checkbox>
            <el-checkbox name="financing_industry" label="19">农业</el-checkbox>
            <el-checkbox name="financing_industry" label="20">共享经济</el-checkbox>
            <el-checkbox name="financing_industry" label="21">出海</el-checkbox>
            <el-checkbox name="financing_industry" label="22">消费升级</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="标签">
          <el-input v-model="detail.project_label" :maxlength="20">
            <template slot="append">{{detail.project_label.length}}/20</template>
          </el-input>
        </el-form-item>

        <el-form-item label="项目网站">
          <el-input v-model="detail.project_website" :maxlength="30">
            <template slot="append">{{detail.project_website.length}}/30</template>
          </el-input>
        </el-form-item>

        <el-form-item label="项目介绍"  prop="project_introduce" class="textarea-input height-input">
          <el-input
                  v-model="detail.project_introduce"
                  type="textarea"
                  :maxlength="500"
                  placeholder="">
          </el-input>
          <span class="show-num">{{detail.project_introduce.length}}/500</span>
        </el-form-item>

        <el-form-item label="项目亮点" class="textarea-input height-input">
          <el-input v-model="detail.project_highlights" type="textarea" :maxlength="500"></el-input>
          <span class="show-num">{{detail.project_highlights.length}}/500</span>
        </el-form-item>

        <el-form-item label="商业计划书">
          <el-upload
                  accept="application/pdf"
                  action="/apis/jcwyadminphp/demand/projectModify"
                  class="upload-demo"
                  name="business_plan"
                  :data="{id:detail.id}"
                  :on-error="upLogoErr"
                  :on-success="fileUpSuccess">
            <el-button size="large" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>


        <h3 class="edit-title">团队成员</h3>
        <div class="edit-item-box team-box" v-for="(item,index) in detail.team">
          <span class="edit-item-close" @click="teamEdit(item.id,index)">×</span>

          <el-form-item label="成员照片" :rules="{required: true, message: '请上传成员照片'}" :prop="'team.' + index + '.team_image'">
            <!--<el-upload
                    accept="image/jpeg,image/gif,image/png"
                    class="portrait-uploader"
                    action="/jcwyadminphp/demand/projectModify"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="changeImg">-->
            <div class="team-uploader">
              <input type="file" accept="image/jpeg,image/gif,image/png" @change="changeImg(index,$event)">
              <img v-if="item.team_image" :src="item.team_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>

            <!--</el-upload>-->
          </el-form-item>

          <el-form-item
                  label="姓名"
                  :prop="'team.' + index + '.team_name'"
                  :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}"
                  class="short-input">
            <el-input v-model="item.team_name" :maxlength="10">
              <template slot="append">{{item.team_name.length}}/10</template>
            </el-input>
          </el-form-item>

          <el-form-item label="职位" :prop="'team.' + index + '.team_position'" :rules="{required: true, message: '职位不能为空', trigger: 'blur'}">
            <el-input v-model="item.team_position" :maxlength="20">
              <template slot="append">{{item.team_position.length}}/20</template>
            </el-input>
          </el-form-item>

          <el-form-item
                  label="简介"
                  :prop="'team.' + index + '.team_introduce'"
                  :rules="{required: true, message: '简介不能为空', trigger: 'blur'}"
                  class="textarea-input">
            <el-input v-model="item.team_introduce" type="textarea" :maxlength="100"></el-input>
            <span class="show-num">{{item.team_introduce.length}}/100</span>
          </el-form-item>
        </div>
        <a href="javascript:void (0);" class="add-btn" @click="teamEdit()">+ 添加</a>


        <h3 class="edit-title">发展历程</h3>

        <div class="edit-item-box" v-for="(item,index) in detail.course">
          <span class="edit-item-close" @click="courseEdit(item.id,index)">×</span>

          <el-form-item
                  label="时间"
                  :prop="'course.' + index + '.course_time'"
                  :rules="{ type:'date',required: true, message: '请选择日期', trigger: 'change'}"
                  class="short-input">
            <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="item.course_time"></el-date-picker>
          </el-form-item>

          <el-form-item
                  label="简介"
                  :prop="'course.' + index + '.course_event'"
                  :rules="{required: true, message: '简介不能为空', trigger: 'blur'}"
                  class="textarea-input">
            <el-input v-model="item.course_event" type="textarea" :maxlength="200"></el-input>
            <span class="show-num">{{item.course_event.length}}/200</span>
          </el-form-item>

        </div>
        <a href="javascript:void (0);" class="add-btn" @click="courseEdit()">+ 添加</a>


        <h3 class="edit-title">伙伴招募</h3>

        <div class="edit-item-box" v-for="(item,index) in detail.recruiting">
          <span class="edit-item-close"  @click="recruitEdit(item.id,index)">×</span>
          <el-form-item
                  label="职位"
                  :prop="'recruiting.' + index + '.recruiting_position'"
                  :rules="{required: true, message: '职位不能为空', trigger: 'blur'}"
                  class="short-input">
            <el-input v-model="item.recruiting_position" :maxlength="20">
              <template slot="append">{{item.recruiting_position.length}}/20</template>
            </el-input>
          </el-form-item>

          <el-form-item
                  label="详细说明"
                  :prop="'recruiting.' + index + '.recruiting_detail'"
                  :rules="{required: true, message: '详细说明不能为空', trigger: 'blur'}"
                  class="textarea-input height-input">
            <el-input v-model="item.recruiting_detail" type="textarea" :maxlength="500"></el-input>
            <span class="show-num">{{item.recruiting_detail.length}}/500</span>
          </el-form-item>
        </div>
        <a href="javascript:void (0);" class="add-btn"  @click="recruitEdit()">+ 添加</a>

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
        logoUrl:'',
        id: this.$route.params.id,
        detail:{
          brief_introduction: "",
          project_highlights: "",
          project_introduce: "",
          project_label: "",
          project_title: "",
          project_website: "",
          user_name: ""
        },


        rules:{
          user_name:[{ required: true, message: '请输入名字', trigger: 'blur' }],
          project_title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
          brief_introduction:[{ required: true, message: '请输入一句话介绍', trigger: 'blur' }],
          financing_min:[{type:'number', required: true, message: '请输入融资金额值为数字' }],
          financing_industry:[{type:'array', required: true, message: '请选择行业', trigger: 'change' }],
          project_introduce:[{ required: true, message: '请输入项目介绍', trigger: 'blur' }],
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

      fileUpSuccess(res,file){
        if(res.code==200){
          this.$message.success("上传成功");
          this.detail.business_plan = res.data.business_plan;
        }else{this.$message.warning(res.code+":"+res.message)}
      },

      upLogoErr(err, file, fileList){this.$message.error('出错了！上传失败')},

      changeLogo(file){this.logoUrl = URL.createObjectURL(file.raw);},

      changeImg(index,event){
        if(event.target.files[0]){
          let reader = new FileReader();
          reader.onload = (ev)=>{this.detail.team[index].team_image = (ev.target.result);};
          reader.readAsDataURL(event.target.files[0]);
        }
      },

      //获取数据
      getData(){
        axios.post('/apis/jcwyadminphp/demand/projectDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
            this.detail.financing_industry = res.data.data.financing_industry.split(',');
            this.logoUrl ='/public/static/'+this.detail.project_logo;

            this.detail.id_delete={team:[], course:[], recruiting:[]};
            this.detail.course.forEach((item,index)=>{
              this.detail.course[index].course_time = new Date (item.course_time*1000)
            });
            this.detail.team.forEach((item,index)=>{
              this.detail.team[index].team_image = '/public/static/'+item.team_image
            });
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
            this.detail.team.forEach((item,index)=>{
              this.detail.team[index].team_image = item.team_image.replace("/public/static/","");
            });
            this.detail.project_logo=undefined;
            console.log(this.detail);

            axios.post("/apis/jcwyadminphp/demand/projectModify",this.detail).then((res)=>{
              if(res.data.code==200){this.$message.success("修改成功");}
              else{this.$message.warning(res.data.code+":"+res.data.message);}
            }).catch((err)=>{
              this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
            })

          } else {this.$message.warning("请填写必填项");return false;}
        });
      },

      //团队增删
      teamEdit(id,index){
        if(index!=undefined){
          this.detail.team.splice(index,1);
          if(id){this.detail.id_delete.team.push(id);}
        } else {
          this.detail.team.push({
            team_name:'',
            team_position:'',
            team_introduce:'',
            team_image:''
          })
        }
      },

      //发展历程增删
      courseEdit(id,index){
        if(index!=undefined){
          this.detail.course.splice(index,1);
          if(id){this.detail.id_delete.course.push(id);}
        } else {
          this.detail.course.push({
            course_time:'',
            course_event:''
          })
        }
      },

      //招募增删
      recruitEdit(id,index){
        if(index!=undefined){
          this.detail.recruiting.splice(index,1);
          if(id){this.detail.id_delete.recruiting.push(id);}
        } else {
          this.detail.recruiting.push({
            recruiting_position:'',
            recruiting_detail:''
          })
        }
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
  .team-uploader{
    width: 90px;
    height: 90px;
    overflow: hidden;
    text-align: center;
    line-height: 90px;
    border-radius: 50%;
    background: #ddd;
    position: relative;
    color:#ccc;
  }
  .team-uploader>input{
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .team-uploader .avatar{
    width: 100%;
    height: 100%;
    background: #ccc;
    position: absolute;
    left: 0;
    top: 0;
  }
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