import express,{Application} from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';


const app = express();
const port = process.env.PORT || 8000;

app.use.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
/*CORS to allow client requests coming from a host that differs from your server’s host.
The last thing you should do when using hosting services, 
like Heroku, is to trust their proxy. It is important if you configured Express to send cookies over HTTPS only.
 */
app.use(cors());
app.use(
    cookieSession({
      secret: 'yourSecret',
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    }),
  );

app.enable('trust proxy');

app.use(
    cors({
      credentials: true,
      origin: 'https://your-client-address.com',
    }),
  );

/*const response = await fetch(`${apiUrl}`,{
    credentials:
})*/
