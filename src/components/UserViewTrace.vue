<template>
    <div>
        <h1>用户查看日志</h1>
        <el-table
            :data="tableData"
            height="250"
            style="width: 100%">
                <el-table-column
                    prop="userId"
                    label="用户id"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="productId"
                    label="商品Id"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="商品名称">
                </el-table-column>    
                <el-table-column
                    prop="viewTime"
                    label="查看时间">
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'UserViewTrace',
        data() {
            return {
                tableData: [{}]
            }
        },
        methods: {
            getAllTypesStatus() {
                axios.get(this.$store.state.baseUrl + "/userview/all", {
                    headers: {
                        'satoken': sessionStorage.getItem("token")
                    }
                }).then((response) => {
                    if(response.data.code==0){
                        this.tableData = response.data.data;
                    }else{
                        alert(response.data.msg)
                    }
                }, err => {
                    alert(err)
                })
            }
        },
        mounted() {
            if (sessionStorage.getItem('token') == null) {
                sessionStorage.setItem('loginCallBack', "/admin")
                alert('请先登录管理员账号')
                this.$router.push({
                    path: '/login'
                })
            }
            this.getAllTypesStatus();
        }
    }
</script>
<style scoped>

</style>