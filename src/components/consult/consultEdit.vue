<template>
  <div class="consultEdit">

    <div class="top-content">
      <el-form :model="detail" :rules="rules" ref="ruleForm" label-position="top">

        <el-upload
                accept="image/png,image/bmp,image/jpeg,image/gif"
                action="/"
                class="img-uploader"
                ref="upload"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleAvatarSuccess">
          <img v-if="detail.image" :src="detail.image" class="avatar">
          <div v-else style="margin-top: 60px;">
            <i class="el-icon-picture" style="font-size: 60px"></i>
            <p>图片小于1M(jpg,png,gif,bmp)</p>
            <p>尺寸为796*406 px</p>
          </div>
        </el-upload>
        <!--<el-button type="info" class="btn" @click="submitUpload()">上传图片 836*426</el-button>-->

        <el-form-item label="类型" prop="type" class="short-input">
          <el-select v-model="detail.type" placeholder="请选择">
            <el-option label="行业新闻" value="1"></el-option>
            <el-option label="站内新闻" value="2"></el-option>
            <el-option label="创业指南" value="3"></el-option>
            <el-option label="失败案例" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="detail.title" :maxlength="30">
            <template slot="append">{{detail.title.length}}/30</template>
          </el-input>
        </el-form-item>

        <el-form-item label="来源" prop="author">
          <el-input v-model="detail.author" :maxlength="6">
            <template slot="append">{{detail.author.length}}/6</template>
          </el-input>
        </el-form-item>

        <el-form-item label="标签" prop="label">
          <el-input v-model="detail.label" :maxlength="8">
            <template slot="append">{{detail.label.length}}/8</template>
          </el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="introduction"  class="textarea-input">
          <el-input
                  v-model="detail.introduction"
                  type="textarea"
                  :maxlength="50"
                  placeholder="请输入文章摘要">
          </el-input>
          <span class="show-num">{{detail.introduction.length}}/50</span>
        </el-form-item>

      </el-form>

    </div>


    <div class="editor-box">
      <p class="editor-head">文章正文：</p>
      <div id="editor">
        <div id="toolbar"></div>
        <div id="editorText"></div>
      </div>
    </div>


    <el-button type="info" size="large" class="submit-btn" @click="postData('ruleForm')">发布</el-button>

  </div>
</template>



<script>
  import WangEditor from 'wangeditor'
  import axios from 'axios'
  import Arr from '../../assets/js/arr'

  export default {
    mounted(){
      if(this.id){
        this.getData();
      }

      this.editor = new WangEditor( "#toolbar","#editorText" );
      this.editor.customConfig.uploadImgShowBase64 = true;
      //editor.customConfig.uploadImgServer = '/localhost:8080/';
      this.editor.create();

    },
    data() {
      return {
        id:this.$route.params.id,
        imageUrl:'',
        editor:'',
        detail:{
          id:undefined,
          image:"",
          type:"1",
          title:"",
          author:"",
          label:"",
          introduction:"",
          content:""
        },

        rules:{
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
          author:[{ required: true, message: '请输入来源', trigger: 'blur' }],
          label:[{ required: true, message: '请输入标签', trigger: 'blur' }],
          introduction:[{ required: true, message: '请输入摘要', trigger: 'blur'}]
        }
      }
    },
    methods: {

      // 获取数据
      getData(){
        axios.post("/apis/jcwyadminphp/Information/infoDetails",{id:this.id}).then((res)=>{
          if(res.data.code==200){
            this.detail.id = res.data.data.id;
            this.detail.title = res.data.data.title;
            this.detail.introduction = res.data.data.introduction;
            this.detail.content = res.data.data.content;
            this.detail.image = '/public/static/'+res.data.data.image;
            this.detail.label = res.data.data.label;
            this.detail.type = res.data.data.type;
            this.detail.author = res.data.data.author;
            this.editor.txt.html(this.detail.content);
          }
          else{this.$message.warning(res.data.code+":"+res.data.message);}
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        });
      },

      handleAvatarSuccess(file,fileList,event) {
        if(file.size>1024*1024){this.$message.warning("请选择小于1M的图片");return false;}
        this.imageUrl = URL.createObjectURL(file.raw);


        let reader = new FileReader();
        reader.onload = (ev)=>{this.detail.image = (ev.target.result);};
        reader.readAsDataURL(file.raw);

      },

      /*submitUpload(){
        this.$refs.upload.submit();
      },*/
      // 提交数据
      postData(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.detail.content=this.editor.txt.html();

            if( !this.editor.txt.text() ){this.$message.warning("请输入文章正文");return false;}
            if(!this.detail.image){this.$message.warning("请选择标题图片");return false;}

            let url = "/apis/jcwyadminphp/Information/infoAdd";
            if(this.id) {url = '/apis/jcwyadminphp/Information/infoModify'; }
            axios.post(url,this.detail).then((res)=>{
              if(res.data.code==200){this.$message.success("提交成功！")}
              else{this.$message.warning(res.data.code+":"+res.data.message);}
            }).catch((err)=>{
              this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
            });

          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .consultEdit{
    width: 100%;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 30px;
    padding:1px 0;
  }
  .top-content{
    width: 500px;
    margin: 30px auto;
    overflow: hidden;
  }
  .img-uploader{
    margin-bottom: 30px;
  }
  .img-uploader .avatar{
    max-width: 100%;
    max-height: 100%;
    width: 100%;
  }
  .btn{
    margin-top: 20px;
  }
  .short-input{
    width: 320px;
    float: left;
    margin-right: 60px;
  }

  .textarea-input{
    width: 500px;
    clear: both;
    height: 100px;
    margin-bottom: 42px;
  }
  .show-num{
    color:#999;
    float: right;
    margin-right: 10px;
    margin-top: -26px;
    line-height: 20px;
    position: relative;
    z-index: 1;
  }

  .editor-box{
    width: 700px;
    margin: 30px auto;
  }
  #editor{
    border: 1px solid #ccc;
    border-radius: 6px;
    overflow: hidden;
    background: #f3f5f7;
  }
  #toolbar{
    border-bottom: 1px solid #ccc;
    background: #fff;
  }
  #editorText{
    min-height: 400px;
    margin:auto;
    background: #fff;
  }

  .submit-btn{
    display: block;
    margin:30px auto;
  }

</style>
<style>
  #editorText .w-e-text{
    overflow-y: auto;
    min-height: 400px;
  }

  .img-uploader .el-upload{
    width: 500px;
    height:255px;
    border-radius: 6px;
    background: #efefef;
    text-align: center;
    color: #999;
    font-size: 20px;
  }
  .el-select{width: 100%;}
  .textarea-input textarea{
    height: 90px;
  }
  .top-content .el-form-item{clear: both;}

  #editorText img{
    width: 100%;
  }
</style>