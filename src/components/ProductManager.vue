<template>
    <div overflow:auto>
        <el-button
                size="mini"
                type="primary"
                @click="clickAddButton">增加
        </el-button>
        <el-table
                :data="products"
                style="width: 100%">
            <el-table-column
                    label="商品名称"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.productName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品数量" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.productCount }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品类型" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.productType }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"><span>编辑</span>
                    </el-button>
                    <el-popconfirm title="你确定要删除该商品吗">
                        <el-button slot="reference"
                                   size="mini"
                                   @click="handleDelete(scope.$index,scope.row)"
                                   type="danger"><span>删除</span>
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="商品查看编辑" :visible="dialogFormVisible" @close="closeDialog" style="height: 700px" id="el-dia">
            <el-form>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品类型" :label-width="formLabelWidth">
                    <el-input v-model="form.productType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="form.productCount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品单价" :label-width="formLabelWidth">
                    <el-input v-model="form.productPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品描述" :label-width="formLabelWidth">
                    <el-input v-model="form.productDescription" autocomplete="off" autosize type="textarea"
                              aria-rowcount="5"></el-input>
                </el-form-item>
                <el-form-item label="商品图片上传" :label-width="formLabelWidth" type="textarea">
                    <el-upload class="avatar-uploader" :action="this.$store.state.baseUrl+'/product/uploadImg'"
                               :show-file-list="false" :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload" :headers="imgHead">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog" type="info">取消</el-button>
                <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'ProductManager',
        data() {
            return {
                products: [{}],
                dialogFormVisible: false,
                form: {
                    productId:-1,
                    productName:'',
                    productType:'',
                    productCount:0,
                    productPrice:0,
                    productDescription:'',
                    productImurl:''
                },
                productData:{
                    productId:-1,
                    productName:'',
                    productType:'',
                    productCount:0,
                    productPrice:0,
                    productDescription:'',
                    productImurl:''
                },
                imgHead:{
                    'satoken':sessionStorage.getItem('token')
                },
                imageUrl: '',
                imageFileName: '',
                formLabelWidth: '120px',
                currentMove: 0,
                labelPosition: 'right'
            }
        },
        methods: {
            handleEdit(index, row) {
                index;
                console.log(index, row);
                var productId = row.productId;
                this.getProductById(productId);
                this.addOrupdate = 2;
                this.dialogFormVisible = true; // 编辑弹窗可见
            },
            getProductById(productId) {
                axios
                    .get(this.$store.state.baseUrl + "/product/getProductById?id=" + productId, {
                        headers: {
                            'content-type': 'application/json',
                            'satoken': sessionStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        if(response.data.code==0){
                            console.log(response.data.data.imageUrl+response.data.data.productDescription)
                            this.form.productName = response.data.data.productName;
                            this.form.productCount = response.data.data.productCount;
                            this.form.productPrice = response.data.data.productPrice;
                            this.form.productId = response.data.data.productId;
                            this.form.productType = response.data.data.productType;
                            this.form.productDescription = response.data.data.productDescription;
                            this.imageUrl = response.data.data.productImurl;
                            var imageSplit = this.imageUrl.split("/")
                            this.imageFileName = imageSplit.slice(-1)
                        }else{
                            alert(response.data.msg)
                        }
                    }, err => {
                        alert(err)
                    })
            },
            handleDelete(index, row) {
                console.log(index, row);
                console.log(row.productId);
                axios.post(this.$store.state.baseUrl + "/product/delete",JSON.stringify({
                        productId:row.productId,
                        productName: row.productName,
                        productType: row.productType,
                        productCount: row.productCount,
                        productPrice: row.productPrice,
                        productDescription: row.productDescription,
                        productImurl: row.imageUrl
                }), {
                    headers: {
                        
                        'content-type':'application/json',
                        'satoken': sessionStorage.getItem("token")
                    }
                }).then((response) => {
                    {
                        if(response.data.code==0){
                            alert("成功删除")
                        }
                        this.getAllProduct();
                    }

                }, (err) => {
                    alert(err);
                })

            },
            handleAvatarSuccess(res) {
                console.log(res);
                this.imageFileName = res.data.imgName;
                this.imageUrl = res.data.imgUrl;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 100;
                if (!isJPG) {
                    this.$message.error('上传商品图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传商品图片大小不能超过 100MB!');
                }
                return isJPG && isLt2M;
            },
            getAllProduct() {
                axios
                    .get(this.$store.state.baseUrl + "/product/all", {
                        headers: {
                            'satoken': sessionStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        this.products = response.data.data;
                    }, err => {
                        console.log("error");
                        console.log(err);
                    })
            },
            handleAdd() {

            },
            addProduct() {
                axios.post(this.$store.state.baseUrl + "/product/add", JSON.stringify({
                        
                        productName: this.form.productName,
                        productType: this.form.productType,
                        productCount: this.form.productCount,
                        productPrice: this.form.productPrice,
                        productDescription: this.form.productDescription,
                        productImurl: this.imageUrl
                }), {
                        headers: {
                            'content-type':'application/json',
                            'satoken': sessionStorage.getItem('token')
                        }
                    }
                ).then((response) => {
                    if(response.data.code==0){
                        alert('添加成功');
                    }else alert(response.data.msg)
                }, (response) => {
                    alert(response);
                })
            },
            updateProduct() {
                axios.post(this.$store.state.baseUrl + "/product/update", JSON.stringify({
                        productId:this.form.productId,
                        productName: this.form.productName,
                        productType: this.form.productType,
                        productCount: this.form.productCount,
                        productPrice: this.form.productPrice,
                        productDescription: this.form.productDescription,
                        productImurl: this.imageUrl
                }), {
                    headers: {
                        'content-type':'application/json',
                        'satoken': sessionStorage.getItem('token')
                    }
                }).then(response => {
                    response;
                    alert("修改成功")
                }, err => {
                    alert(err)
                })
            }
            ,
            clickAddButton() {
                this.dialogFormVisible = true;
                this.addOrupdate = 1;
            },
            handleDialogConfirm() {
                if (this.addOrupdate == 1) {
                    this.addProduct();
                    this.dialogFormVisible = false;
                    this.getAllProduct();
                    this.clearForm();
                } else {
                    this.updateProduct();
                    this.dialogFormVisible = false;
                    this.getAllProduct();
                    this.clearForm();
                }

            },
            clearForm() {
                    this.form.productName = ''
                    this.form.productCount = ''
                    this.form.productPrice = ''
                    this.form.productId = -1
                    this.form.productType = ''
                    this.form.productDescription = ''
                    this.imageUrl = ''
                    this.imageFileName = ''
            },
            closeDialog() {
                this.clearForm();
                this.dialogFormVisible = false;
            },
            change(e) {
                console.log(e);
                console.log(this.form.productName);
            }
        },
        mounted() {
            if (sessionStorage.getItem('token') == null) {
                sessionStorage.setItem('loginCallBack', "/admin")
                this.$router.push({
                    path: '/login'
                })
            }
            this.getAllProduct();
        }
    }
</script>

<style scoped>
    span{
        color: #000;
    }

    #el-dia{
        overflow: auto;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>