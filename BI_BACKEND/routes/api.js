// var express = require('express');
// var axios = require('axios');
// const db = require('../api/config/db.js')
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     console.log("============== API Call ======================");
// //   res.send('respond with a resource');
//     let sql = req.query.sql;
//     console.log("sql:"+ sql);

//     axios.get(db.DB_URL + '?q=' + sql).then(x => x.data).then(reault => res.send(reault))
// });

// router.get('/:sql', function (req, res, next) {
//     var sql = req.params.sql;
//     console.log("========Test 쇼===========");
//     console.log("sql:"+ decodeURIComponent(sql));
//     axios.get(db.DB_URL + '?q=' + sql).then(x => x.data).then(reault => res.send(reault))
//   });

// module.exports = router;


var express = require('express');
var axios = require('axios');
const db = require('../api/config/db')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("===== API Call ======");
//   res.send('respond with a resource');
    let sql = req.query.sql;
    console.log("sql:"+ sql);

    axios.get(db.DB_URL + '?q=' + sql)
        .then(x => x.data)
        .then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        });
});

/* 
 * SQL 쿼리 실행 엔드포인트
 * q 파라미터를 통해 SQL 쿼리를 받아 실행
 */
router.get('/query', function(req, res, next) {
    console.log("====== SQL Query API Call ======");
    
    // URL 쿼리 파라미터에서 'q'로 SQL 쿼리 추출
    let sql = req.query.q;
    if (!sql) {
        return res.status(400).send(JSON.stringify({ error: "SQL 쿼리가 제공되지 않았습니다. 'q' 파라미터를 사용하세요." }));
    }
    
    console.log("SQL 쿼리 실행:", sql);
    
    // 직접 DB 모드에서는 실제 쿼리 실행
    db.query(sql)
        .then(results => {
            console.log("쿼리 결과(results):", results);
            
            // 결과 건수에 따라 반환 형식 분기
            let responseData;
            if (results.length === 1) {
                // 결과가 1건인 경우 단일 객체로 반환
                responseData = results[0];
            } else {
                // 결과가 0건 또는 여러 건인 경우 배열로 반환
                responseData = results;
            }
            res.send(responseData);
            // JSON 문자열로 변환하여 전송
            //res.setHeader('Content-Type', 'application/json');
            //res.send(JSON.stringify(responseData));
        })
        .catch(err => {
            console.error("쿼리 실행 오류:", err);
            // 오류도 JSON 문자열로 변환하여 전송
            res.status(500).send(JSON.stringify({ 
                error: "쿼리 실행 중 오류가 발생했습니다.",
                sql: sql,
                message: err.message,
                MACHBASE_ERROR: true 
            }));
        });
});

// 주의: 이 와일드카드 라우트는 항상 맨 마지막에 위치해야 함
router.get('/:sql', function (req, res, next) {
    var sql = req.params.sql;
    console.log("========Test 쇼===========");
    console.log("sql:"+ decodeURIComponent(sql));
    
    axios.get(db.DB_URL + '?q=' + sql)
        .then(x => x.data)
        .then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        });
});

module.exports = router;