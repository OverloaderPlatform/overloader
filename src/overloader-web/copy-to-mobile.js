import { readdir, mkdir, copyFile } from 'fs/promises';
import { join } from 'path';

async function copyDir(src, dest) {
    await mkdir(dest, { recursive: true });
    const entries = await readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await copyFile(srcPath, destPath);
        }
    }
}

async function main() {
    const src = 'dist';
    const dest = '../overloader-mobile/dist';

    try {
        await copyDir(src, dest);
        console.log('📂 Dist folder copied successfully!');
    } catch (err) {
        console.error('❌ Error copying dist folder:', err);
    }
}

main();