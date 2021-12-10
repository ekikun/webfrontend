<template>
    <div>
        <el-container>
            <el-header id="header"><CustomHead/></el-header>
            <el-main><CustomView /></el-main>
        </el-container>
    </div>
</template>

<script>
import CustomHead from '../components/CustomHead';
import CustomView from '../components/CustomView';

export default {
    name:'CustomIndex',
    data(){
        return {
            login_flag: '',
            data:''
        }
    },
    components:{
        CustomHead, CustomView
    },
    created(){
        this.login_flag = sessionStorage.getItem('token') != null;
        if(!this.login_flag){
            sessionStorage.setItem('loginCallback', '/user')
            console.log('从Index进入Login')
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>

</style>