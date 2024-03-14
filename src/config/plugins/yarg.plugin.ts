/*
    process.argv: contienen las banderas que se envian desde la consola
    hideBin: oculta el el bin que se imprime desde la consola
    yarg: resive la bandera nos castea el valor (nos da formato al valor)
 */

import yargs, { number, option } from 'yargs'
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
    .options('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        description: 'es la base por la cual se va a multiplicar'
    })
    .options('l', {
        alias: 'limite',
        type: 'number',
        default: 10,
        describe: 'limite por el cual se va a multiplicar'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe : 'mostrar tabla de multiplicar'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplicacion-table',
        describe: 'nombre de archivo'
    })
    .option('d',{
        alias: 'descripcion',
        type: 'string',
        default: 'outputs',
        describe: 'destino de archivo'
    })
    .check((argv, options) => { //permite hacer validaciones a los argv
        if(argv.b < 1){
            throw 'ERROR: base debe ser mayor a 1'
        }

        return true;
    })
    .parseSync();