<template>
    <div class="todo-item">
        <div class="todo-item-select" :class="{'selected':todo.isComplate}"  @click="complateEvent($event)"></div>
        <div class="todo-item-show-area" :class="{'complate-color':todo.isComplate}">
            {{todo.name}}
            <div class="todo-item-complate-line" v-if="todo.isComplate"></div>
        </div>
        
        
    </div>
    
</template>

<script>
    import { Todo } from "@/model/Todo.js";
    export default {
        name:'TodoItem',
        data:function(){
            return {
                todoName:''
            }
        },
        props:{
            todo:{
                type:Todo
            }
        },
        created(){

        },
        methods:{
            complateEvent(e){
               this.todo.isComplate=!this.todo.isComplate;
            },
        }
        
    }
</script>
<style lang="scss" scoped>
    .todo-item{
        font-size: 18px;
        border-bottom: 1px solid #eee;
        height: 50px;
        display: flex;
        align-items: center;
        &-select{
            border:1px solid #dedede;
            box-sizing: border-box;
            width: 25px;
            height:25px;
            border-radius: 15px;
            margin-right: 10px;
            cursor: pointer;
            transition: background .5s;
            &.selected{
                border:3px solid #dedede;
                background: gray;
            }
        }
        &-show-area{
            position: relative;
            flex: 1;
            
            &.complate-color{
                color: #bfbfbf;
            }
        }
        &-complate-line{
            border-bottom: 1px solid #bfbfbf;
            width: 100%;
            position: absolute;
            top:50%;
        }
    }
</style>