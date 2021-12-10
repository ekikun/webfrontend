<template>
    <div>
        <el-table
                :data="cartList"
                border
                style="width: 100%"
                >
            <el-table-column
                    label="商品名称"
                    width="680">
                <template scope="scope">
                    <div style="margin-left: 50px">
                        <img :src="scope.row.productImurl" style="height: 50px;width: 50px">
                        <span style="font-size: 18px;padding-left: 200px;">{{scope.row.productName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="单价"
                    width="150"
                    prop="productPrice">
            </el-table-column>
            <el-table-column
                    label="数量"
                    width="200">
                <template scope="scope">
                    <div>
                        <el-input
                                v-model="scope.row.cartCount" @change="handleInput(scope.row)">
                            <el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
                            <el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
                        </el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="小计"
                    width="150"
                    prop="totalMoney">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="danger" @click="handleDelete(scope.row)">
                        删除<i class="el-icon-delete2 el-icon--right"></i>
                    </el-button>
                    <el-button type="primary" @click="handleSave(scope.row)">
                        保存<i class="el-icon-delete2 el-icon--right"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-button type="info" style="float: right">{{"商品总额：" + this.moneyTotal.toFixed(2)}}</el-button>
        <el-button  id="paybutton" style="float: right" type="primary" @click="handlePay()">支付</el-button>
        <el-dialog :visible="dialogVisible" @close="closeDialog">
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleBuy">确 定</el-button>
                <el-button type="primary" @click="handleSaveAddress">保存信息</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                form:{
                    userName:sessionStorage.getItem("loginName"),
                    userEmail:'',
                    userAddress:''
                },
                cartList: [{}],
                moneyTotal:0,
                formLabelWidth:'100px',
                multipleSelection:[],
                dialogVisible: false,
            }
        },
        methods: {
            formatter(row, column) {
                column;
                return row.address;
            },
            getCartView(){
                axios.get(this.$store.state.baseUrl+'/cart/all?userName='+sessionStorage.getItem("loginName"),{
                    headers: {
                        'satoken':sessionStorage.getItem('token')
                    }
                }).then(response=>{
                    if(response.data.code==0){
                        this.cartList = response.data.data
                        var total = 0
                        this.cartList.forEach((item)=>{
                            total+= (item.cartCount * item.productPrice)
                        })
                        this.moneyTotal = total;
                        console.log(this.cartList, total);
                    }else alert(response.data.msg)
                },err=>{
                    alert(err);
                })
            },add(row){
                if(typeof row.cartCount=='string'){
                    row.cartCount=parseInt(row.cartCount);
                }
                row.cartCount+=1
                console.log("当前数量"+ row.cartCount)
                this.moneyTotal +=  row.productPrice 
            },del(row){
                if(typeof row.cartCount=='string'){
                    row.cartCount=parseInt(row.cartCount);
                }
                if(row.cartCount>1){
                    row.cartCount-=1
                    this.moneyTotal -=  row.productPrice    
                }
                console.log("当前数量"+ row.cartCount)
            },
            closeDialog() {
                this.form.userEmail = ''
                this.form.userAddress = ''
                this.dialogVisible = false;
            }
            ,handleDelete(row){
                axios.post(this.$store.state.baseUrl+'/cart/deleteCart',row,{
                    headers: {
                        'content-type':'application/json',
                        'satoken': sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                         this.getCartView()
                    }else alert(response.data.msg)
                },err=>{
                    alert(err);
                })
            },
            handleSave(row){
                axios.post(this.$store.state.baseUrl+"/cart/updateCart", row,{
                    headers:{
                        'content-type':'application/json',
                        'satoken': sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                        alert("保存成功")
                    }else alert(response.data.msg)
                })
            },
            handlePay(){
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
            },handleClose(done) {
                this.$confirm('放弃支付？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },handleBuy(){
                this.dialogVisible = false
                var buys = new Array()
                var timeStr = new Date().toString()
                this.cartList.forEach((cart)=>{
                    var buy = {
                            userName:sessionStorage.getItem("loginName"),
                            productId:cart.productId,
                            buyCount:cart.cartCount,
                            buyTime:timeStr
                        }
                    buys.push(buy)
                })
                console.log(typeof buys)
                console.log(typeof this.cartList)
                var buylist = {
                    userName:sessionStorage.getItem("loginName"),
                    buyList:JSON.stringify(buys)
                }
                axios.post(this.$store.state.baseUrl+"/product/buys",JSON.stringify(buylist),{
                    headers:{
                        'content-Type':'application/json',
                        'satoken': sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                        alert(response.data.data)
                    }else alert(response.data.msg)
                })

                /axios.post(this.$store.state.baseUrl+"/cart/deleteCarts",{
                    cartBoList:this.cartList
                },{
                    headers:{
                        'content-type':'application/json',
                        'satoken': sessionStorage.getItem("token")
                    }
                }).then((response)=>{
                    if(response.data.code==0){
                        alert(response.data.data)
                    }else alert(response.data.msg)
                })
                
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
        }
        ,mounted() {
            if(sessionStorage.getItem('token') == null){
                sessionStorage.setItem('loginCallback','/index');
                this.$router.push('/login');
            }
            this.getCartView();
        }
    }
</script>

<style scoped>
    #paybutton{
        margin-right: 30px;
    }
</style>