import {} from 'jest';
import * as childProcess from 'child_process';
import * as fs from 'fs';

test('GET /test', async() => {
    childProcess.spawnSync('./absolute', ['build_server']);
    expect(fs.existsSync('./out')).toBe(true);

    childProcess.spawnSync('./absolute', ['clean']);
    expect(fs.existsSync('./out')).toBe(false);
});