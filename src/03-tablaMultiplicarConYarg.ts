import { yarg } from './config/plugins'
import fs from 'fs'

const { b: base, l:limite, s: showTable  } = yarg
let outputMessage : string = '';
const outputPath : string = 'outputs';
const hederMessage : string = 
`   
    ====================================
            tabla de multiplicar
    ====================================\n
`;

for( let i : number = 1; i <= limite; i++){
    outputMessage += `${base} x ${i} = ${base*i} \n`;
}

outputMessage = hederMessage + outputMessage;

if(showTable){
    console.log(outputMessage);
}

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);

console.log('tarea completada.');