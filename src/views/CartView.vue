<template>

    <div>
        <el-container>
            <el-header><CustomHead/></el-header>
            <el-main><Cart/></el-main>
        </el-container>


    </div>
</template>

<script>
    import Cart from "@/components/Cart"
    import CustomHead from "@/components/CustomHead";

    export default {
        name: 'CartView',
        data(){
            return{
            }
        },
        components: {CustomHead, Cart},
        methods:{
            test(){

            }
        }
    }
</script>
