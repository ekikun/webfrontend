<template>
    <div>
        <CustomHead/>
        <CustomGoodDetailMain/>
    </div>
</template>

<script>
    import CustomGoodDetailMain from '../components/CustomGoodDetailMain';
    import CustomHead from '../components/CustomHead';
    export default {


        name: "CustomGoodDetailView",
        data() {
            return {}
        },
        components: {
            CustomHead,
            CustomGoodDetailMain
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>