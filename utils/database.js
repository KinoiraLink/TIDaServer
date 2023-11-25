const db = require('./db')

var arr = [
    {id : 12 ,coverUrl: '/images/柯基.png'},
    {id : 13 ,coverUrl: '/images/柯基.png'},
    {id : 14 ,coverUrl: '/images/柯基.png'},
    {id : 15 ,coverUrl: '/images/柯基.png'}
]

//对数组插入for循环，并插到mysql的cover下

arr.map(val=>{
    let sql = `INSERT INTO cover VALUES (${val.id}, '${val.coverUrl}')`;
    db.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data)

    })
})
var  sql = 'SELECT * FROM cover';
db.query(sql,(err,data)=>{
    if(err) throw err;
    console.log(data)
})