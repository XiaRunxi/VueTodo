
export default class TodoService{
    todoData=[];
    constructor(){
        this.todoData=[];
    }
    getData(){
        return new Promise((resolve,reject)=>{
            if(this.todoData.length===0){
                reject('当前没有Todo数据');
            }else{
                resolve(this.todoData);
            }
            
        });
    }
    addData(data){
        return new Promise((resolve,reject)=>{
            if(data){
                this.todoData.push(data);
                resolve(this.todoData);
            }else{
                reject('当前Todo数据为空');
            }
        })
    }
}