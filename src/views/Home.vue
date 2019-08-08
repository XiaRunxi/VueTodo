<template>
  <div class="home">

    <todo-item v-for="(item,index) in todoData" :key="index" :todo="item"  @updateTodo="updateTodo"></todo-item>
    <todo-input class="mt10" @listenAddTodo="addTodoEvent"></todo-input>
    <a href="#" @click="displayComplate($event)" v-if="!hasShowComplate && complateData.length>0">查看已完成的任务</a>
    <a href="#" @click="displayComplate($event)" v-if="hasShowComplate && complateData.length>0">收起已完成的任务</a>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a href="#" @click="clearComplate($event)" v-if="complateData.length>0">清空</a>
    <div v-if="hasShowComplate">
        <todo-item v-for="(item,index) in complateData" :key="index" :todo="item" @updateTodo="updateTodo"></todo-item>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TodoItem from "@/components/TodoItem.vue"
import TodoDataService from '@/model/TodoDataService.js'
import TodoInput from "@/components/Input.vue"
import Todo from "@/model/Todo.js"
export default{
  name: 'home',
  components: {
    HelloWorld,
    TodoItem,
    TodoInput
  },
  data(){
    return {
      todoData:[],
      complateData:[],
      todoService:null,
      hasShowComplate:false
    }
  },
  methods:{
     addTodoEvent(e){
        console.info(e);
        var obj=new Todo();
        obj.name=e;
        this.addTodo(obj);
      },
      getTodo(){
        this.todoService.getData().then((rs)=>{
          if(rs.length>0){
              this.todoData=rs.filter(f=>!f.isComplate);
          }
          
        },(rej)=>{
            console.error(rej);
        })
      },
      addTodo(obj){
        this.todoService.addData(obj).then((rs)=>{
                this.getTodo();
              },(rej)=>{
                console.info(rej);
              });
      },
      updateTodo(obj){
        this.todoService.updateData(obj).then(rs=>{
          console.info('修改成功')
          this.getTodo();
          this.complateTodo();
        },rej=>{
          console.err(rej);
        })
      },
      complateTodo(){
          this.todoService.getData().then((rs)=>{
          if(rs.length>0){
              this.complateData=rs.filter(f=>f.isComplate);
          }
          
        },(rej)=>{
            console.error(rej);
        })
      },
      displayComplate(e){
          this.hasShowComplate=!this.hasShowComplate;
      },
      clearComplate(e){
        this.todoService.clearComplateData().then(rs=>{
            this.complateTodo();
            this.hasShowComplate=false;
        },err=>{
            console.err(err);
        })
      }

  },
  created(){
     this.todoService=new TodoDataService();
     this.getTodo();
     this.complateTodo();
  }
}
</script>

<style lang="scss" scoped>
  .home{
    max-width:750px;
    margin: 0 auto;
  }
  .mt10{
    margin-top: 10px;
  }
</style>
