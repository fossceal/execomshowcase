const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Can pass directory as an argument, or use default
const targetDir = process.argv[2] || path.join('assets', 'images', 'members');
const dir = path.isAbsolute(targetDir) ? targetDir : path.join(__dirname, targetDir);

console.log(`Processing directory: ${dir}`);

if (!fs.existsSync(dir)) {
    console.error(`Directory does not exist: ${dir}`);
    process.exit(1);
}

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        if (file.endsWith('.png')) {
            const filePath = path.join(dir, file);
            const newFilePath = path.join(dir, file.replace(/\.png$/, '.webp'));

            sharp(filePath)
                .webp({ quality: 80 })
                .toFile(newFilePath)
                .then(info => {
                    console.log(`Converted: ${file} -> ${path.basename(newFilePath)}`);
                })
                .catch(err => {
                    console.error("Error converting file:", file, err);
                });
        }
    });
});
