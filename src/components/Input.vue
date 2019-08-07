<template>
    <div id="input-area">
        <input type="text" v-model="todoName" placeholder="＋ 添加任务" @keyup.enter="inputEvent($event)">
    </div>
</template>
<script>
    export default {
        name:"Input",
        data(){
            return {
                todoName:'',
                inputEvent(e){
                    console.info(e);
                    if(this.todoName){
                        this.$emit("listenAddTodo",this.todoName);
                        this.todoName='';
                        document.querySelector("#input-area").scrollIntoView();
                    }
                    
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    input{
        width: 100%;
        border: 1px solid #eee;
        height: 40px;
        font-size: 20px;
        margin-bottom: 50px;
    }
</style>