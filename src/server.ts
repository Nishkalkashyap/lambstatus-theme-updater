import * as express from 'express';
import * as fs from 'fs-extra';
import * as node from 'node-sass';

const res = node.renderSync({
    file: './css/index.scss'
});

fs.writeFileSync('./aws-content/custom.css', res.css.toString());

const app = express();
app.use(express.static('./aws-content'));
app.listen(8080);