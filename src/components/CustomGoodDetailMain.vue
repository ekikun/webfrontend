<template>
    <div>
        <el-header>
            <el-breadcrumb id="breadcrumb" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-container v-if="productDetail!=null">
            <el-aside id="aside" width="600px">
                <img :src="productDetail.productImurl" width="467px" height="467px">
            </el-aside>
            <el-main>
                <h1 style="font-size: 65px">{{this.productDetail.productName}}</h1>
                <p style="font-size: 30px">{{this.productDetail.productDescription}}</p>
                <el-divider></el-divider>
                <p style="color: #f25807;font-size: 65px">{{this.productDetail.productPrice}}元</p>
                <el-divider></el-divider>
                <div id="xiao5">
                    <el-input
                        v-model="count" @change="handleInput()">
                        <el-button slot="prepend" @click="del()"><i class="el-icon-minus"></i></el-button>
                        <el-button slot="append" @click="add()"><i class="el-icon-plus"></i></el-button>
                    </el-input><input id="xiao3" type="button" value="加入购物车" @click="addProductToCart" /><input id="xiao6" type="button" value="购买" @click="handleBuy" />
                </div>
            </el-main>
            <el-dialog :visible="dialogVisible"  @close="closeDialog">
                <el-form>
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.userName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" :label-width="formLabelWidth">
                        <el-input v-model="form.userEmail" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户地址" :label-width="formLabelWidth">
                        <el-input v-model="form.userAddress" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="buyProduct">确 定</el-button>
                    <el-button type="primary" @click="handleSaveAddress">保存信息</el-button>
                </span>
        </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios';


    export default {
        name: "CustomGoodDetailMain",
        data() {
            return {
                form:{
                    userName:sessionStorage.getItem("loginName"),
                    userEmail:'',
                    userAddress:''
                },
                productDetail: null,
                count:0,
                productId: 0,
                dialogVisble:false
            }
        },
        methods: {
            getProductDetailById(){
                axios.
                    get(this.$store.state.baseUrl+'/product/getProductById?id='+this.productId,{
                        headers:{
                            'satoken':sessionStorage.getItem('token')
                        }
                }).then(response=>{
                    if(response.data.code==0){
                        this.productDetail = response.data.data
                        let timeStr = new Date().toString()
                        axios.post(this.$store.state.baseUrl+"/userview/add",{
                            userName:sessionStorage.getItem("loginName"),
                            productId:this.productDetail.productId,
                            productName:this.productDetail.productName,
                            viewTime:timeStr
                        },{
                            headers:{
                                'content-type':'application/json',
                                'satoken': sessionStorage.getItem("token")
                            }
                        }).then((response)=>{
                            if(response.data.code==0){
                                console.log(response.data.data)
                                console.log('发送了一条记录，在:',timeStr)
                            }
                        }, err=>{
                            alert(err)
                        })
                    }else alert(response.data.msg)
                })
            },
            closeDialog() {
                this.form.userEmail = ''
                this.form.userAddress = ''
                this.dialogVisible = false;
            }
            ,addProductToCart(){
                axios.post(this.$store.state.baseUrl+'/cart/addCart',JSON.stringify({
                    userName:sessionStorage.getItem("loginName"),
                    productId:this.productDetail.productId,
                    productName:this.productDetail.productName,
                    cartCount:this.count,
                    productPrice:this.productDetail.productPrice,
                    productImurl:this.productDetail.productImurl
                }),{
                    headers: {
                        'content-type':'application/json',
                        'satoken':sessionStorage.getItem("token")
                    }
                }).then(response=>{
                    if(response.data.code==0){
                        alert("添加成功")
                    }
                },err=>{
                    alert(err);
                })
            },
            buyProduct(){
                var timeStr = new Date().toString()
                axios.post(this.$store.state.baseUrl+"/product/buy",JSON.stringify({
                    userName:sessionStorage.getItem("loginName"),
                    productId:this.productDetail.productId,
                    buyCount:this.count,
                    buyTime:timeStr
                }),{
                    headers:{
                        'content-type':'application/json',
                        'satoken':sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                        alert(response.data.data)
                    }else alert(response.data.msg)
                })
            },
            handleBuy(){
                this.dialogVisible = true
                axios.get(this.$store.state.baseUrl+"/userAddress?userName="+sessionStorage.getItem("loginName"),{
                    headers:{
                        'satoken':sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                        this.form.userEmail = response.data.data.userEmail,
                        this.form.userAddress = response.data.data.userAddress
                    }else alert(response.data.msg)
                })
            },
            add(){
                if(typeof this.count=="string"){
                    this.count = parseInt(this.count)
                }
                this.count+=1
            },
            del(){
                 if(typeof this.count=="string"){
                    this.count = parseInt(this.count)
                }
                this.count-=1
            },
            handleSaveAddress(){
                axios.post(this.$store.state.baseUrl+"/addUserAddress", JSON.stringify({
                     userName:this.form.userName,
                     userEmail:this.form.userEmail,
                     userAddress:this.form.userAddress
                }),{
                    headers:{
                    'content-type':'application/json',
                    'satoken': sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                        alert("保存成功")
                    }else alert(response.data.msg)
                },err=>{
                    alert(err) 
                })
            }
        },mounted() {
            if(sessionStorage.getItem("token") == null){
                this.$router.push('login');
            }
            console.log(this.$route.query.productId);
            this.productId = this.$route.query.productId;
            this.getProductDetailById();
        }
    }
</script>
<style>
    @import "../static/style/detail.css";
    
    #breadcrumb{
        margin-top: 15px;
    }

    #aside{
        margin-left:30px;
    }
</style>