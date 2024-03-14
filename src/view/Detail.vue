<template>
    <div>
        <div>detail page</div>
        <div class="contentWrap">
            <span>"app/getAaa":</span>
            <span>{{ $store.getters["app/getAaa"] }}</span>
        </div>
        <button @click="handleAdd">加1</button>
        <button @click="handleSub">减1</button>
    </div>
</template>

<script>
export default {
    name: "detail",
    methods:{
        handleAdd(){
            console.log("handleAdd", this.$store)
            this.$store.dispatch("app/setAaa", this.$store.state.app.aaa + 1)
        },
        handleSub(){
            console.log("handleAdd")
            this.$store.dispatch("app/setAaa", this.$store.state.app.aaa -1)
        }
    }
}
</script>

<style scoped>
    .contentWrap{
        height: 500px;
        background: pink;
        margin: 20px 0;
    }
</style>
