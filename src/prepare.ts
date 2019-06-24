import * as fs from 'fs-extra';

const content = `<link href="/custom.css" rel="stylesheet">`;
const indexHtml = fs.readFileSync('./aws-content/index.html').toString();

// add css link
if (!indexHtml.includes(content)) {
    const finalHtml = indexHtml.replace(/<\s*\/\s*head\s*>/, content.concat(`</head>`));
    // fs.writeFileSync('./aws-content/index.html', finalHtml);
    fs.writeFileSync('./aws-content/index.html', finalHtml);
}

// copy assets
fs.copy('./assets', './aws-content');


