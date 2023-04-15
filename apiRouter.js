const bodyParser = require('body-parser');
const { application } = require('express');
const express = require('express');
const validating = require("./middleware");
var router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
require("dotenv").config();
const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// connection.query("select * from person", (err, result) =>
// {
//     console.log(err);
//     console.log(result);
    
// })
  
// var data = [c
//     {
//       id: 1,
//       fullname: "Nguyen Van A",
//       gender: true,
//       age: 18,
//     },
//     {
//       id: 2,
//       fullname: "Nguyen Van B",
//       gender: false,
//       age: 15,
//     },
//   ];
  function get_info(_id, callback)
  {
    
  
    connection.query("select * from person where id = ?",[_id], function(err, result) {
        if (err) {
            throw err;
        }
        return callback(result);
    })
  }
//   var info = '';
//   get_info(this.param, function(result){
//     info = result;
//     console.log(info);
//   })

router.get('/', (req,res) => {
    
    connection.query("select * from person", (err, result) =>
    {
        if(err)
        {
            console.log(err);
            throw err;
        }
        else {
        res.send(result);
        }
    })
    
});

router.get('/:id', (req, res)=>
{
    var id = req.params.id;
    
    //var data1 = data.find((item) => item.id === parseInt(id));
    get_info(id, function(result){
        info = result;
        if (info === null)
        {
            res.status(404);
            res.senđ("Khong tim thay nguoi dung ")
        }
        else
    {
        res.send(info);
    }
        //console.log(info);
      })
    // if (data1 === null)
    // {
    //     res.status(404);
    //     res.senđ("Khong tim thay nguoi dung ")
    // }
    // else
    // {
    //     res.send(data1);
    // }
})
router.post('/', (req, res, next)=>
{
    validating(req, res, next);

}, (req, res)=> {
    var gender = 0;
    if(req.body.gender === true) 
    {
        gender = 1
    }
    connection.query("insert into person(fullname, gender, age) values (? , ? , ?) ", [req.body.fullname, gender, req.body.age],
    function(err, result) {
        if(err)
        {
            console.log(err);
            throw err;
        }
        else {
        res.send('Da them thanh cong');
        } 
    })
    // var data1 = {
    //     id: ++idid,
    //     fullname: req.body.fullname,
    //     gender: req.body.gender,
    //     age: req.body.age
    // };
    // data.push(data1);
    // res.send("Them user thanh cong")
});

router.delete('/:id', (req, res) => {
    var id1 = req.params.id;
    connection.query("delete from person where id = ?", [id1], function(err, result) {
        if (err)
        {
            throw err;
        }
        else 
        {
            res.send("Da xoa thanh cong");
        }
    })
    // var data1 = data.find((item) => item.id === parseInt(id1));
    // if (data1.id1 === null)
    // {
    //     res.status(404);
    //     res.send("khong tim thay user")
    // }
    // else{
    //     data.splice(data.indexOf(data1))
    //     res.send(data);
    // }
});
router.put('/:id', (req, res, next) => {
    validating(req, res, next);
}, (req, res, next) => {
    var id = req.params.id;
    get_info(id, function(result){
        info = result;
        if (info === null)
        {
            res.status(404);
            res.senđ("Khong tim thay nguoi dung ")
        }
        else
    {
        var gender1 = 0
        if (req.body.gender === true )
        {
            gender1 = 1;
        }
        connection.query("update person set fullname = ?, gender = ?, age = ? where id = ?",[req.body.fullname, gender1, req.body.age, id], function(err, result) {
            if (err)
            {
                throw err;
            }
            else
            {
                res.send("da update thanh cong");
            }
            
        })
    }
        
      })
    // var index = data.findIndex((item) => item.id === parseInt(id));
    // if (index === -1) {
    //   res.status(404).send("Khong ton tai nguoi dung");
    // } else {
    //   data[index].fullname = req.body.fullname;
    //   data[index].gender = req.body.gender
    //   data[index].age = req.body.age;
    //   res.send(data);
    // }
}
);

module.exports = router;