

const runCommand = async (args: string[]) => {
    //esparcimos los comandos de process y los que le paso por argumento 
    process.argv = [...process.argv, ...args];
    const {yarg} = await import('../../../src/config/plugins')

    return  yarg;
}

describe('config/plugins/yarg', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });


    test('probar los valores por efecto', async() => {
        const comandoObligatorio = ['-b', '5'];
        const yarg = await runCommand(comandoObligatorio);

        //verificamos los valores minimos que debe tener el yarg
        expect(yarg).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'multiplicacion-table',
                d: 'outputs'
              })
        )
    });

    test('probar los valores propios', async() => {
        const comandoObligatorio = ['-b', '5', '-l', '10'];
        const yarg = await runCommand(comandoObligatorio);
        
        //verificamos los valores minimos que debe tener el yarg
        expect(yarg).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'multiplicacion-table',
                d: 'outputs'
              })
        )
    })
})
