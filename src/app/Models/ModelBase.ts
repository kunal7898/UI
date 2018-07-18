// Class for generic Property assingment
export class ModelBase<T>{
    constructor(public model? : Partial<T>){
        Object.assign(this,model);
        }
}