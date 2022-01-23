const { authJwt } = require("../middleware");
const controller = require("../controllers/mobile.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


app.post("/mytek/telephonie/mobile/:limit", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.Scrape);

app.post("/mytek/telephonie/mobile/:limit/:keyword", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.ScrapeFilter);

app.delete("/mytek/telephonie/mobile", [authJwt.verifyToken, authJwt.isAdmin], controller.RemoveAll);

app.delete("/mytek/telephonie/mobile/:title", [authJwt.verifyToken, authJwt.isAdmin], controller.RemoveByTitle);

app.get("/mytek/telephonie/mobile", authJwt.verifyToken, controller.DisplayAll);

};