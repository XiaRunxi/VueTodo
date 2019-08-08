
let uuidv1 = require('uuid/v1');
export default class TodoService{
    todoData=[];
    
    constructor(){
        this.todoData=[];
    }
    getData(){
        return new Promise((resolve,reject)=>{
            let localData=localStorage.getItem('todo');

            if(!localData){
                reject('当前没有Todo数据');
            }else{
                !this.todoData && (this.todoData=[]);
                console.info(this.todoData.length);
                
                this.todoData=JSON.parse(localData);
                resolve(this.todoData);
            }
            
        });
    }
    addData(data){
        return new Promise((resolve,reject)=>{
            if(data){
                data.id=uuidv1();
                this.todoData.push(data);
                localStorage.setItem('todo',JSON.stringify(this.todoData));
                resolve(this.todoData);
            }else{
                reject('当前Todo数据为空');
            }
        })
    }

    updateData(todo){
        return new Promise((resolve,reject)=>{
            let localData=JSON.parse(localStorage.getItem('todo'));
            let obj=localData.find(f=>f.id===todo.id);
            if(obj){
                obj.isComplate=todo.isComplate;
                localStorage.setItem('todo',JSON.stringify(localData));
                resolve(true);
            }else{
                reject(false);
            }
        })

        
    }

    clearComplateData(){
        return new Promise((resolve,reject)=>{
            let localData=JSON.parse(localStorage.getItem('todo'));
            let newData=localData.filter(f=>!f.isComplate).map(m=>m);
            localStorage.setItem('todo',JSON.stringify(newData));
            resolve(true);

        })
    }
}