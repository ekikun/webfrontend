<template>
    <div class="register_ok">
        <h2 > 
            恭喜用户{{userName}}注册成功
        </h2>
         <el-link id="login_link" type="primary" icon="el-icon-s-promotion"  href="/login"><span>去登陆</span></el-link>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Activate",
        data(){
            return {
                activatedFlag: 0,
                userName: this.$route.query.username
            }
        },methods:{
            tryActivate(){
                axios.post(this.$store.state.baseUrl+"/userActivate",{
                    username: this.userName
                })
                    .then(response=>{
                        console.log(response);

                    },(err)=>{
                        alert('激活失败，请尝试重新激活'+err);
                    })
            }
        },
        created(){
            console.log(this.userName);
            this.tryActivate(); // 加载完成后请求
        }

    };
</script>

<style scoped>

h2{
    text-align: center;
    margin-top: 50px;
}

#login_link{
    margin-left: 450px;
    
    align-content: center;
}

span{
    color: black;
    size: 100px;
}

.register_ok{
    align-content: center;
    align-items: center;
    height: 200px;
    margin-top: 30px;
    margin-right: 300px;
    margin-left: 300px;
    background: antiquewhite;
}

</style>