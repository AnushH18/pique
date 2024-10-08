import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import Routes from './routes/index.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));
app.use(Routes);
app.get('/', async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, { name: 'anush' });
    await emailQueue.add(emailQueueName, { to: "anushrh@gmail.com", subject: "testing queue", body: html });
    return res.json({ msg: 'Email sent successfully' });
});
import './jobs/index.js';
import { emailQueue, emailQueueName } from './jobs/emailJob.js';
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
