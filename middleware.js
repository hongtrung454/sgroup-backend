function validate(req, res, next) {
        let  unvalid = /^[^\r\n0-9]+[1-9][0-9]*$/
      const fullname = req.body && req.body.fullname;
      const age = req.body && req.body.age;
      if ( age > 0) {
        next();
      } else {
        res.status(400);
        res.send("Thong tin khong hop le")
      }
    }
    //unvalid.test(fullname) && 
    module.exports = validate;