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
    });

    test('cuando no se crea el directorio', () =>{
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'este es un contenido de prueba',
            fileDestination:'outputs',
            fileName: 'table'
        };

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync')
                             .mockImplementation(() => { throw new Error('error al crear archivo'); });
        
        const result = saveFile.execute(options);
        expect(result).toBe(false);

        //resetear el mock por que si no, se ejecuta en los siquientes test
        mkdirSpy.mockRestore();
    });

    test('cuando no falle y no se escriba en el archivo', () =>{
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'este es un contenido de prueba',
        };

        const mkdirSpy = jest.spyOn(fs, 'writeFileSync')
                             .mockImplementation(() => { throw new Error('error al escribir'); });

        const result = saveFile.execute(options);
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });
})