<template>
   <div>
        <el-card>
            <el-menu default-active="0" :unique-opened="true" @select="handleSelect">
                <el-menu-item index="0">
                    <i class="el-icon-menu"></i>
                    <span>商品管理</span>
                </el-menu-item>
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span >商品报表</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-user"></i>
                    <span >用户浏览记录</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-user"></i>
                    <span>用户购买记录</span>
                </el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'AdminMenu',
     methods: {
            handleSelect(index) {
                switch (index) {
                    case '0':
                        this.$store.state.componentsname = 'default';
                        break;
                    case '1':
                        this.$store.state.componentsname = 'SellStatistics';
                        break;
                    case '2':
                        this.$store.state.componentsname = 'UserViewTrace';
                        break;
                    case '3':
                        this.$store.state.componentsname = 'UserBuyTrace';
                        break;
                }
            }
        },
        mounted() {
            this.$store.state.componentsname = 'default'; // 默认的选择状态
        },
    };
</script>

<style scoped>
span{
    color: #000;
}
</style>