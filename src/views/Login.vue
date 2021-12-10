<template>
    <div id="login">
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="100px" class="login-box" >
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" id="button_login" v-on:click="onSubmit('loginForm')" round>登录</el-button>
                <el-button type="primary" id="button_register" v-on:click="register()" round>去注册</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
                title="温馨提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>请输入账号和密码</span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },
                // 对话框显示和隐藏
                dialogVisible: false
            }
        },
        methods: {
            onSubmit(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                        this.tryLogin(this.form.username,this.form.password);
                    } else {
                        this.dialogVisible = true;
                        return false;
                    }
                });
            },
            register(){
                this.$router.push('/register')
            },
            handleClose(){

            },tryLogin(usrname,psword){
                axios.post(this.$store.state.baseUrl+'/login',
                    {   
                        userName:usrname,
                        passWord:psword
                    }
                ).then((response)=>{
                    var code = response.data.code
                    console.log(response.data)
                    if(code==2001){
                        alert(response.data.msg)
                        // 跳转到注册页面
                    }
                    if(code==2002){
                       alert(response.data.msg)
                       this.form.password = ''
                    }else if(code==2007){
                        alert(response.data.msg)
                    }else if(code==2003){
                        alert('没有访问权限')
                        // 跳转到激活页面
                    }
                    else if(code==0){
                        if(sessionStorage.getItem('loginCallback') == '/admin'){    
                                if(response.data.data.role != 'admin'){
                                    alert('请登录管理员账号')
                                    sessionStorage.setItem("loginCallback",'/index')
                                }else{
                                    sessionStorage.setItem('token', response.data.data.token);
                                    sessionStorage.setItem('role', response.data.data.role);
                                    sessionStorage.setItem('loginName', usrname);
                                    this.$router.push('/admin');
                                }  
                            }
                            else{
                                if(response.data.data.role=='user_unactivated'){
                                    alert("账号未激活，请先去邮箱激活账号!")
                                }else{
                                    sessionStorage.setItem('token', response.data.data.token);
                                    sessionStorage.setItem('role', response.data.data.role);
                                    sessionStorage.setItem('loginName', usrname);
                                    this.$router.push('/home');
                                }
                            }
                    }
                })    
        }
    },
    created(){
        console.log(sessionStorage.getItem('loginCallback'));
    }
};
</script>


<style scoped>

    #login{
        background:url("https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g6/M00/04/01/ChMkKWB_jw2INhCMAAOKMO3g-9UAANinwMZm7QAA4pI358.jpg");
        width:100%;
        height:100%;
        position:fixed;
        background-size:100% 100%;
    }

    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }

    #button_login{
        margin-left: 0px;
    }

    #button_register{
       margin-left: 40px; 
    }

    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }
</style>