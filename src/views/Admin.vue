<template>
    <el-container>
        <el-header height="150px">
            <AdminHead />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <AdminMenu />
            </el-aside>
            <el-main>
                <router-view :name="this.$store.state.componentsname" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import AdminHead from '../components/AdminHead';
import AdminMenu from '../components/AdminMenu';

export default {
    name:'Admin',
    data(){
        return {
            data:'',
            login_flag: sessionStorage.getItem("token") != null
        }
    },
    components:{
        AdminHead, AdminMenu
    },
    created(){
        this.login_flag = sessionStorage.getItem('token') != null;
        if(!this.login_flag){
            sessionStorage.setItem('loginCallback', '/admin')
            console.log('从Admin进入Login')
            this.$router.push('/login');
        }else{
            if(sessionStorage.getItem("role")!='admin'){
                alert("无权访问")
                this.$router.push('/index')
            }
        }
    }
};
</script>