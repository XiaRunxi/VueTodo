<template>
  <div class="home">

    <todo-item v-for="(item,index) in todoData" :key="index" :todo="item"></todo-item>
    <todo-input class="mt10" @listenAddTodo="addTodoEvent"></todo-input>
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
      todoService:null
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
          
          this.todoData=rs;
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
      }
  },
  created(){
     this.todoService=new TodoDataService();
     this.getTodo();
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
