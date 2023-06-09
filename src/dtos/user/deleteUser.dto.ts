

import z from "zod"

export interface DeleteUserInputDTO{
    token:string,
    idToDelete:string
    
}
export type DeleteUserOutputDTO= undefined

export const DeleteUserScherma= z.object({
    token:z.string().min(1),
    idToDelete:z.string().min(1)
}).transform(data=> data as DeleteUserInputDTO)
   