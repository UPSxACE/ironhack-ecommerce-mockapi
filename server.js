const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const rules = auth.rewriter({
  // Permission rules
  users: 600,
  categories: 644,
  products: 644,
  rates: 644,
  // Other rules
  "/posts/:category": "/posts?category=:category",
});

const app = jsonServer.create();
const router = jsonServer.router("db.json");

// /!\ Bind the router db to the app
app.db = router.db;

// You must apply the auth middleware before the router
app.use(cors(corsOptions));
app.use(rules);
app.use(auth);
app.use(router);
app.listen(process.env.PORT);
