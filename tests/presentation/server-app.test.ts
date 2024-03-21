import { ServerApp } from '../../src/presentation/server-app' 

describe('presentation/server-app', () =>{

    test('crear una instancia de serverApp y verificar que sea estatico el metodo', () =>{
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    })
})