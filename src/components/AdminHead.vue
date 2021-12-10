<template>
    <div class="head">
        <el-row>
            <el-col style="color: red" :span="5" :offset="2"><h1 class="title">KIKI商城管理</h1></el-col>
            <el-col :span="2" :offset="15">
                <el-button id="button_log" @click="logout()" type="danger" round>{{loginFlag?'登出系统':'登录'}}</el-button>
                <el-avatar v-show="avatar" :size="50" :src="circleUrl"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
export default{
        name:'AdminHead',
        data(){
            return {
                loginFlag:sessionStorage.getItem("token")!=null
            }
        },
        methods:{
            logout(){
            sessionStorage.removeItem("token");
            axios.get(this.$store.state.baseUrl+"/logout", {
                headers:{
                    'statoken':sessionStorage.getItem("token")
                }
            })
            sessionStorage.setItem('loginCallback', '/admin')
            sessionStorage.setItem('token', '');
            sessionStorage.setItem('role', '');
            sessionStorage.setItem('loginName', '');
            this.loginName = "";
            this.$router.push("/login");
            }
        }
    };
</script>

<style scoped>
    .title{
        color:whitesmoke;
    }

    .head {
        margin-top: 20px;
        background-color: #3c8dbc;
    }

    #button_log{
        margin-top: 10px;
        margin-right: 40px;
    }
</style>
