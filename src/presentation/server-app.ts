import { CreateTable } from "../domain/case-uses/create-table"
import { SaveFile } from "../domain/case-uses/save-file"

interface RunOptions{
    base: number,
    limit: number,
    showTable: boolean,
    nombre: string,
    destino: string
}

export class ServerApp{

    static run({base, limit, showTable, nombre, destino}: RunOptions){
        console.log('server runnig...')
        
        const table = new CreateTable().execute({base, limit})
        
        const wasCreated = new SaveFile().execute({
            fileContent: table, 
            fileName: nombre, 
            fileDestination: destino})

        if(showTable){
            console.log(table);
        }

        (wasCreated)
            ? console.log('archivo creado')
            : console.error('no creado');
    }
}