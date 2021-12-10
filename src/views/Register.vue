<template>
    <div id="register">
        <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">注册账号</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="ruleForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password">
                    <!--<template slot="append">
                        <a class="forgetPW" @click="$router.replace('forgetPassword')">忘记密码？</a>
                    </template>-->
                </el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="repassword">
                <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.repassword">
                    <!--<template slot="append">
                        <a class="forgetPW" @click="$router.replace('forgetPassword')">忘记密码？</a>
                    </template>-->
                </el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input type="text" placeholder="请输入电子邮箱" v-model="ruleForm.email">
                    <!--<template slot="append">
                        <a class="forgetPW" @click="$router.replace('forgetPassword')">忘记密码？</a>
                    </template>-->
                </el-input>
            </el-form-item>
            <el-form-item id="div_btn_register">
                <el-button type="primary" v-on:click="onSubmit('loginForm')">注册</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                title="温馨提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>请输入账号和密码</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Register",
        data() {
           /* var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.repassword !== '') {
                        console.log(this.$refs);
                        this.$refs.ruleForm.validateField('repassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };*/
            return {

                ruleForm: {
                    username: '',
                    password: '',
                    repassword: '',
                    email: ''
                },

                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],repassword: [
                        {required: true,message: '请再次输入密码' , trigger:'blur'}
                    ],email: [
                        {type: 'email',required: true,message: '请输入正确的邮箱地址邮箱', trigger:'blur'}
                    ]
                },
                // 对话框显示和隐藏
                dialogVisible: false
            };
        },
        methods: {
            onSubmit(formName) {
                console.log(formName);
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        if(this.ruleForm.password != this.ruleForm.repassword){
                            alert('两次输入的密码必须一样')
                            return;
                        }
                        this.register();

                    } else {
                        this.dialogVisible = true;
                        return false;
                    }
                });

            },
            handleClose(){

            },register(){
                axios.post(this.$store.state.baseUrl+"/register",{
                    username: this.ruleForm.username,
                    password: this.ruleForm.password,
                    email: this.ruleForm.email
                }).then((response)=>{
                    if(response.data.code == 2006){
                        alert('账户已存在')
                        return;
                    }else if(response.data.code == 2007){
                        alert('服务器错误');
                        return;
                    }
                    alert('注册成功，请到邮箱里面激活您的账号');
                    this.$router.push("/login");
                },err=>{
                    alert('注册失败'+err);

                })

            }

        }
    }
</script>


<style scoped>
    #register{
    
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

    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }

    #div_btn_register{
        align-content: center;
    }
</style>