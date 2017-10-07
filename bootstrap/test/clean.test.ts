import {} from 'jest';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

test('GET /test', async() => {
    childProcess.spawnSync(path.resolve('./absolute'), ['build_server'], { shell: true });
    expect(fs.existsSync('./out')).toBe(true);

    childProcess.spawnSync(path.resolve('./absolute'), ['clean'], { shell: true });
    expect(fs.existsSync('./out')).toBe(false);
});
