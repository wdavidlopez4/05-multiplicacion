import { ServerApp } from "../src/presentation/server-app";

describe('app', () =>{

    test('prueba inicial', async () =>{
        //hacemos mock de la funcion que llama Server.Run
        const ServerRunMock = jest.fn();
        ServerApp.run = ServerRunMock;

        //llamamos al porcess ya que lo esta utilizando
        process.argv = ['node', 'app.ts', '-b', '10'];

        //hacemos el estimulo (ejecutasmos al app)
        await import('../src/app');

        //provamos
        expect(ServerRunMock).toHaveBeenCalledWith({
            "base": 10, 
            "destino": 
            "outputs", 
            "limit": 10, 
            "nombre": 
            "multiplicacion-table", 
            "showTable": false});
    })
})