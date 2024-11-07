import fs from 'fs';
import path from 'path';

const fixFile = () => {
    const filePath = './dist/index.html';
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove all asterisks
    content = content.replace(/\*/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed index.html');
};

fixFile();