var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '121.37.71.70',
  user     : 'root',
  password : 'Kinoira136',
  database : 'tida'
});
connection.connect();

function query(sql,callback){
    
 
   //查
   connection.query(sql,function (err, row) {
    
           if(err){
             console.log(err.message);
             return;
           }
           callback(err,row)
           
           //connection.release()

   });
    
}
connection.end
// function end()
// {
//     connection.end();
// }

// var mysql      = require('mysql');

// var pool = mysql.createPool({
//     host: '121.37.71.70', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
//     port: 3306, // mysql服务运行的端口
//     database: 'tida', // 选择的库
//     user: 'root', // 用户名
//     password: 'Kinoria136' // 用户密码   
// })

// //对数据库进行增删改查操作的基础
// function query(sql,callback){
//     pool.getConnection(function(err,connection){
//         connection.query(sql, function (err,rows) {
//             callback(err,rows)
//             connection.end()
//         })
//     })
// }

// var  sql = 'SELECT * FROM cover';
//    query(sql,(err,data)=>{
//         if(err) throw err;
//         console.log(data)

//     })

exports.query = query;
// exports.end = end;