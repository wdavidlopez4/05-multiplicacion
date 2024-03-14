import { yarg } from './config/plugins'

//funcion anonima auto -invocada
( async () => {
    console.log(yarg.b, yarg.l, yarg.s)
    await Promise.resolve('resolver promesa')
})();