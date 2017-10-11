/**
 * Created by Administrator on 2017/8/10 0010.
 */

export  default{
  
// 性别
  sexArr : ["-","男","女"],

//学历
  educationArr : ["-","中专及以下","高中","专科","本科","硕士","博士"],

//工作年限
  workingYearArr : ["-","在校学生","应届毕业生","1-3年","3-5年","5-10年","10年以上"],

//目前状态
  currentStateArr : ["-","在职","离职"],

//期望岗位、意向岗位
  jobArr : ["合伙人","后端开发","移动开发","前端开发","人工智能","测试","运维","DBA","项目开发","企业软件","硬件开发","产品经理","产品设计师","视觉设计","交互设计","用户研究","运营","编辑", "客服","市场/营销","公关","销售","供应链","采购","投资","人力资源","行政","财务","法务","投融资","风控","审计税务"],

//期望地区、常驻地区、所在地区
  areaArr : ["-","北京市","上海市","广州市","深圳市","天津市","杭州市","成都市","苏州市","南京市","武汉市","国内其他","海外"],

//关注领域、行业
  industryArr : ["-","电商","社交","硬件","文娱传媒","工具","消费生活","金融","医疗健康","企业服务","旅游","房产家居","教育","汽车交通","物流","人工智能","无人机","机器人","VR/AR","体育","农业","共享经济","出海","消费升级"],

//阶段
  phaseArr : ["-","种子期","初创期","成长期","扩张期","成熟期"],

//投资身份
  investmentIdArr : ["-","个人天使","机构投资"],

//资金类型
  moneyTypeArr : ["-","金融机构资金","非金融机构资金","民间资金"],

//需要资料
  needInformationArr : ["-","商业计划书","公司证书","财务报表","其他"],

//新闻类别
  newsArr : ["全部新闻","行业新闻","站内新闻","创业指南","失败案例"],

//动态
  dynamicArr : ["-","发布项目","发布资金","关注用户","收藏项目","收藏资金","收藏资讯"],

//身份
  identityArr : ["-","创业者","投资人","人才"],

// 是否
  isArr : ["-","是","否"],

// 审核
  examineArr : ["审核中","进行中","未通过","已完成","已结束"],

// 审核
  proveArr :  ["未审核","已通过","未通过","未审核"],

// 有无
  haveArr : ["-","有","无"],

//征信查询次数
  referenceNumArr : ["-","0次","1次","2次","3次","4次以上"],

//=====================================
  /*转换*/

toStr(str,arr){
  if(str){
    let newsArr = str.toString().split(",");
    let Arr2=[];
    let newsStr;
    for( let i=0;i<newsArr.length;i++){
      let Str2 = arr[ newsArr[i] ];
      Arr2.push(Str2);
      newsStr = Arr2.join("，");
    }
    return newsStr;
  }
},

  /*----时间戳-----*/
toTime(dataTime,short) {
  let date= new Date();
  date.setTime(dataTime*1000);
  let year = date.getFullYear();//年
  let mon = date.getMonth()+1;//月  月份的范围是从0~11,所以获得的月份要加1才是当前月
  let day = date.getDate();//日
  let D = date.getDay();//星期
  let hour = date.getHours();//时
  let min = date.getMinutes();//分
  let sec = date.getSeconds();//秒
  //console.log(year,mon+1,day,D,hour,min,sec);
  if(mon<10){mon="0"+mon}
  if(day<10){day="0"+day}
  if(hour<10){hour="0"+hour}
  if(min<10){min="0"+min}
  if(sec<10){sec="0"+sec}

  if(short==='short'){return (year+"-"+mon);}
  if(short){return (year+"-"+mon+"-"+day);}
  return (year+"-"+mon+"-"+day+" "+hour+":"+min+":"+sec);
}

}
