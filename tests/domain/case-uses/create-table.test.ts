import { CreateTable} from '../../../src/domain/case-uses/create-table'

describe('domain/case-uses/create-table', () => {
    
    test('crear tabla con valores por defecto', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 });

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
    });

    test('crear tabla con valores propios', () =>{
        const createTable = new CreateTable();

        const options ={
            base: 11,
            limit: 13
        };

        const table = createTable.execute(options);
        expect(table).toContain('11 x 1 = 11');
        expect(table).toContain('11 x 13 = 143');

    })
})