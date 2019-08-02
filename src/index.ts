// tslint:disable: no-console
import { app } from "./app";
import { getConfig } from './utils/config';
import{setdata} from'./storeData/data';
//create a server
const port = +(getConfig('PORT', 3000))
app.set("port",port);

const server = app.listen(app.get("port"), () => {
  console.log(
    " App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log(" Press CTRL-C to stop\n");
});
setdata();


