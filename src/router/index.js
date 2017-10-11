import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


//懒加载
const User = () => import('../components/user/User.vue');
const Project = () => import('../components/project/Project.vue');
const Capital = () => import('../components/capital/Capital.vue');
const Institution = () => import('../components/institution/Institution.vue');
const Deliver = () => import('../components/deliver/Deliver.vue');
const Investors = () => import('../components/investors/Investors.vue');
const Entrepreneur = () => import( '../components/entrepreneur/Entrepreneur.vue');
const Feedback = () => import('../components/feedback/Feedback.vue');
const Consult = () => import('../components/consult/Consult.vue');
const Credit = () => import('../components/credit/Credit.vue');

const EntreDetails = () => import('../components/user/entrepreneurDetails.vue');
const InvestorDetails = () => import('../components/user/investorDetails.vue');
const TalentDetails = () => import('../components/user/talentDetails.vue');

const ProjectDetails = () => import('../components/project/projectDetails.vue');
const CapitalDetails = () => import('../components/capital/capitalDetails.vue');
const InstitutionDetails = () => import('../components/institution/institutionDetails.vue');
const DeliverDetails = () => import('../components/deliver/deliverDetails.vue');

const EntreAudit = () => import('../components/entrepreneur/entreAudit.vue');
const InvestorAudit = () => import('../components/investors/investorAudit.vue');

const FeedbackDetails = () => import('../components/feedback/feedbackDetails.vue');
const ConsultDetails = () => import('../components/consult/consultDetails.vue');
const CreditDetails = () => import('../components/credit/creditDetails.vue');

const EntreEdit = () => import('../components/user/entrepreneurEdit.vue');
const InvestorEdit = () => import('../components/user/investorEdit.vue');
const TalentEdit = () => import('../components/user/talentEdit.vue');
const ProjectEdit = () => import('../components/project/projectEdit.vue');
const CapitalEdit = () => import('../components/capital/capitalEdit.vue');
const InstitutionEdit = () => import('../components/institution/institutionEdit.vue');
const EntreAuditEdit = () => import('../components/entrepreneur/entreAuditEdit.vue');
const InvestorAuditEdit = () => import('../components/investors/investorAuditEdit.vue');
const ConsultEdit = () => import('../components/consult/consultEdit.vue');


export default new Router({
  mode: 'history',
  routes: [
//------------------列表-----------------------//
    //{path: '*', component: ''},
    {path: '/', redirect: '/user/list'},  //重定向
    {path: '/user/list', component: User, alias: '/' },             //别名
    {path: '/project/list', component: Project},
    {path: '/capital/list', component: Capital},
    {path: '/institution/list', component: Institution},
    {path: '/deliver/list', component: Deliver},
    {path: '/investors/list', component: Investors},
    {path: '/entrepreneur/list', component: Entrepreneur},
    {path: '/feedback/list', component: Feedback},
    {path: '/consult/list', component: Consult},
    {path: '/credit/list', component: Credit},
//------------------用户详情-----------------------//
    {path:'/user/information1/:id', component:EntreDetails},
    {path:'/user/information2/:id', component:InvestorDetails},
    {path:'/user/information3/:id', component:TalentDetails},

//-----------------详情------------------------//
    {path:'/project/details/:id', component:ProjectDetails},
    {path:'/capital/details/:id', component:CapitalDetails},
    {path:'/institution/details/:id', component:InstitutionDetails},
    {path:'/deliver/details/:id', component:DeliverDetails},
    {path:'/entre/audit/:id', component:EntreAudit},
    {path:'/investor/audit/:id', component:InvestorAudit},
    {path:'/feedback/details/:id', component:FeedbackDetails},
    {path:'/consult/details/:id', component:ConsultDetails},
    {path:'/credit/details/:id', component:CreditDetails},
//-----------------编辑------------------------//
    {path:'/user/edit1/:id', component:EntreEdit},
    {path:'/user/edit2/:id', component:InvestorEdit},
    {path:'/user/edit3/:id', component:TalentEdit},

    {path:'/project/edit/:id', component:ProjectEdit},
    {path:'/capital/edit/:id', component:CapitalEdit},
    {path:'/institution/edit/:id', component:InstitutionEdit},
    {path:'/entreAudit/edit/:id', component:EntreAuditEdit},
    {path:'/investorAudit/edit/:id', component:InvestorAuditEdit},
    {path:'/consult/edit/:id', component:ConsultEdit},
    {path:'/consult/add', component:ConsultEdit}
  ]
})
