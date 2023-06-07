export const fixacao= (input:string)=>{
    if(typeof input !== "string" ){
        return []
    }

    return input.split("")
    
};