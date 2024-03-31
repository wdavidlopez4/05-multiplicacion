import { SaveFile } from '../../src/domain/case-uses/save-file';
import { ServerApp } from '../../src/presentation/server-app' 
import { CreateTable } from '../../src/domain/case-uses/create-table';

describe('presentation/server-app', () =>{

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        nombre: 'test-fileName',
        destino: 'outputs'
    }

    test('crear una instancia de serverApp y verificar que sea estatico el metodo', () =>{
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('probar el funcionamiento de server-app con las opciones', () => {

        //crear los espias de las funciones
        const logSpy = jest.spyOn(console, 'log');
        const createTable = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFile = jest.spyOn(SaveFile.prototype, 'execute');

        //ejecucion
        ServerApp.run(options);

        //verificar
        expect( logSpy ).toHaveBeenCalledTimes(2); //cuantas veses de llama el console.log
        expect(logSpy ).toHaveBeenCalledWith('server runnig...') //que el console.log se le pase una ver ese mensaje
        expect( logSpy ).toHaveBeenLastCalledWith('archivo creado') //que el console.log se le pase al final este mensaje

        expect( createTable ).toHaveBeenCalledTimes(1);
        expect( createTable ).toHaveBeenCalledWith({base: options.base, limit: options.limit}); //prueba de que resiba estos parametros
        
        expect( saveFile ).toHaveBeenCalledTimes(1);
        expect( saveFile ).toHaveBeenCalledWith({ //prueba de que se llame a este metodo con estos parametos y que fileContext sea string
            fileContent: expect.any(String), 
            fileName: options.nombre, 
            fileDestination: options.destino
        });

    });

    test('probando el funcionamiento con valores mock', () => {

        //estos metodos fn() son iguales que los spyOn
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        //reemplazamos las funciones que utilizamos para hacer mock
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('server runnig...');
        expect(createMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})
        expect(saveFileMock).toHaveBeenCalledWith({
            "fileContent": "1 x 2 = 2", 
            "fileDestination": "outputs", 
            "fileName": "test-fileName"});
        
        expect(logErrorMock).toHaveBeenCalledTimes(0);
    });
})