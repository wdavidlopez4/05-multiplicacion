import fs from 'fs'

let outputMessage : string = '';
const base : number = 5;
const outputPath : string = 'outputs';
const hederMessage : string = 
`   
    ====================================
            tabla de multiplicar
    ====================================\n
`;

for( let i : number = 1; i <= 10; i++){
    outputMessage += `${base} x ${i} = ${base*i} \n`;
}

outputMessage = hederMessage + outputMessage;
console.log(outputMessage);

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);

console.log('tarea completada.');