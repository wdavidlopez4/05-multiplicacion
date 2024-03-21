import fs from 'fs'

export interface ISaveFile{
    execute: ( options : IOptions ) => boolean
}

export interface IOptions{
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements ISaveFile{
    constructor(){

    }

    execute({fileContent, fileDestination = 'outputs', fileName = 'table'}: IOptions) {
        try {
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            return true;

        } catch (error) {
            //console.log(error); //winston para hacer log
            return false;
        }
    }
}