<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
                    default-active="0"
                    class="el-menu-vertical-demo"
                    @select="handleOpen">
                <el-menu-item v-for="(item, i) in typeList" :key="item" :index="i+''">
                    <span slot="title">{{item}}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <div class="single-good" v-for="(item) in productList" :key="item.productId">
                    <div >
                        <router-link :to="{path:'/goodDetail',query:{productId:item.productId}}">
                            <img :src="item.productImurl" width="160" height="160"/>
                        </router-link>
                    </div>
                    <div >
                        {{item.productName}}
                    </div>
                    <div >
                        {{item.productPrice}}元
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "CustomView",
        data() {
            return {
                typeList: [{}],
                productType: '',
                productList: [{}],
                tflag: 0
            }
        },
        methods: {
            handleOpen(index){
                console.log(index);
                this.getProductsByType(index);
            },getAllTypes(){
                console.log('getAllType');
                axios.
                    get(this.$store.state.baseUrl+'/product/types',{
                        headers: {
                            'staoken': sessionStorage.getItem('token')
                        }
                    }).then(response=>{
                        if(response.data.code==0){
                             this.typeList = response.data.data
                             this.handleOpen('0')
                        }else alert(response.data.msg)
                       
                })

            },getProductsByType(index){
                axios.
                    get(this.$store.state.baseUrl+'/product/byType?type='+this.typeList[index],{
                        headers: {
                            'statoken':sessionStorage.getItem("token")
                        }
                }).then(response=>{
                     if(response.data.code==0){
                             this.productList = response.data.data
                             console.log(this.productList)
                     }else alert(response.data.msg)
                })
            }
        },mounted() {
            if(sessionStorage.getItem('token') == null){
                sessionStorage.setItem('loginCallback','/index');
                this.$router.push('/login');
            }
            this.getAllTypes();
            
        }
    }
</script>

<style>
    span{
        color: black;
    }
    .single-good{
        margin: 30px;
        float: left;
    }
</style>
