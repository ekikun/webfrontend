<template>
   <div class="box" align="center">
            <div class="serach">
                <el-input
                    class="sinput"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputdata">
                    <el-button slot="append" type="primary" class="button" @click="getData">
                        搜索一下
                    </el-button> 
                </el-input>
            </div>
            <div class="contents">
                <p>
                    {{content}}
                </p>
            </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default{
        name:"Test",
        data(){
            return{
                inputdata:'',
                content:''
            };
        },
        methods:{
            getData(){
               var that = this
               axios.get("http://localhost:8081/api/product/all")
                .then((response)=>{
                    that.content = response.data
                }, err=>{
                    alert(err)
                })
            }
        }    
    };
</script>

<style lang="scss">
    .serach{
        text-align: center;
        align-content: center;
        width: 500px;
        height: 300px;
        padding: 30px auto;
    }
</style>
