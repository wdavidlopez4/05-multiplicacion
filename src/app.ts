import { yarg } from "./config/plugins";
import { ServerApp } from "./presentation/server-app";

//funcion anonima auto invocada
(async() => {
    main();
})()

async function main(){
    const {b: base, l: limit, s: showTable, n: nombre, d: destino} = yarg;
    
    ServerApp.run({base, limit, showTable, nombre, destino});
}



