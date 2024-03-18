import { SaveFile } from '../../../src/domain/case-uses/save-file'
import fs from 'fs'

describe('domain/case-uses/save-file', () => {
    afterEach(() => {
        fs.rmSync('outputs', { recursive: true });
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
    })
})