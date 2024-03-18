import { SaveFile } from '../../../src/domain/case-uses/save-file'
import fs from 'fs'

describe('domain/case-uses/save-file', () => {
    afterEach(() => {
        const existCarpeta = fs.existsSync('outputs');
        if(existCarpeta){
            fs.rmSync('outputs', { recursive: true });
        }
        
    });

    test('guardar archivo con valores por defecto', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'este es un contenido de prueba'
        };

        const result = saveFile.execute(options);
        const fileExiste = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});

        expect(result).toBe(true);
        expect(fileExiste).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('guardar archivo con valore propios', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'este es un contenido de prueba',
            fileDestination:'outputs',
            fileName: 'table'
        };
        const filePath = `${options.fileDestination}/${options.fileName}.txt`

        const result = saveFile.execute(options);
        const fileExiste = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});

        expect(result).toBe(true);
        expect(fileExiste).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })
})