<template>
  <div class="consultDetails detail-box">

    <div class="detail-center">
      <div class="top-img">
        <img :src="'/public/static/'+detail.image" alt="">
        <span>{{detail.type | getStr('newsArr')}}</span>
      </div>

      <h2 class="content-title">{{detail.title}}</h2>

      <div class="content-head">
        <div class="content-head-img">
          <img src="" alt="">
          <p>{{detail.release}}--{{detail.author}}</p>
          <span>{{detail.add_time | getTime}}</span>
        </div>
        <p class="content-head-text">{{detail.introduction}}</p>
      </div>

      <div class="content-center" v-html="detail.content"></div>

      <div class="label-box">
        <p class="label">标签 ：<span>{{detail.label}}</span></p>
        <p class="see"><i></i> <span>{{detail.count}}</span></p>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Arr from '../../assets/js/arr'

  export default {
    mounted(){
      this.getList();
    },
    data() {
      return {
        id:this.$route.params.id,
        detail:"",
      }
    },
    methods:{

      // 请求函数
      getList(){
        axios.post('/apis/jcwyadminphp/Information/infoDetails',{
          id:this.id
        }).then((res)=>{
          if(res.data.code=='200'){
            this.detail = res.data.data;
          }else{
            this.$message.warning(res.data.code+":"+res.data.message);
          }
        }).catch((err)=>{
          this.$message.error("出错啦 (*Φ皿Φ*) ！："+err.message);
        });
      }

    },
    filters:{
      getStr(val,arr){return Arr.toStr(val,Arr[arr])},
      getTime(val,str){return Arr.toTime(val,str)}
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .detail-box{
    width: 100%;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 30px;
    padding:20px 0 1px;
  }
  .detail-center{
    width: 825px;
    margin: auto;
    font-size:16px;
    color:#333;
  }
  .top-img{
    width: 825px;
    height: 420px;
    background: #eee;
    position: relative;
    margin-top: 20px;
  }
  .top-img>img{
    width: 100%;
    height: 100%;
  }
  .top-img>span{
    position: absolute;
    left: 20px;
    bottom: 20px;
    background: rgba(0,0,0,0.5);
    padding: 6px;
    color:#fff;
    border-radius: 4px;
  }

  .content-title{
    font-size: 20px;
    font-weight: bold;
    margin: 18px 0;
  }
  .content-head-img{
    overflow: hidden;
  }
  .content-head-img>img{
    display: inline-block;
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #eee;
    margin-right: 16px;
  }
  .content-head-img>p{
    margin-top: 6px;
  }
  .content-head-img>span{
    font-size: 14px;
    color: #666;
  }

  .content-head-text{
    margin: 40px auto 0;
    width: 520px;
    padding-bottom: 24px;
    font-size: 18px;
    color: #666;
    line-height: 32px;
    border-bottom: 1px dashed #eee;
  }

  .content-center{
    width: 100%;
    margin-top: 50px;
    font-size: 14px;
    line-height: 26px;
  }
  .content-center img{
    display: inline-block;
    width: 100%;
    background: #eee;
    margin: 18px 0;
  }

  .label-box{
    margin-top: 50px;
    margin-bottom: 70px;
    overflow: hidden;
    color: #666;
  }
  .label{
    float: left;
    font-size: 16px;
  }
  .see{
    float: right;
    font-size: 14px;
  }
  .see>i{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url("../../assets/img/see.png") no-repeat center;
  }

</style>