/**
 * Database configuration
 * 
 * MySQL 데이터베이스 연결 정보
 */

const mysql = require('mysql');
// const mysql = require('mysql2/promise');
const axios = require('axios');

// 데이터베이스 접근 모드 설정 (direct: 직접 DB 연결, http: HTTP API 사용)
const DB_MODE = process.env.DB_MODE || 'http';

const DB_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'ss_bi',
    password: 'ssb!',
    database: 'ss_bi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
};

// HTTP 요청 URL (필요한 경우)
const DB_URL = 'http://localhost:3000/api/query';

// MySQL 연결 생성 - HTTP 모드일 때는 생성하지 않음
//const connection = DB_MODE === 'direct' ? mysql.createConnection(DB_CONFIG) : null;

const connection = mysql.createConnection(DB_CONFIG);

// 연결 함수
function connect() {
    return new Promise((resolve, reject) => {
        // if (DB_MODE !== 'direct') {
        //     console.log('HTTP 모드로 설정되어 직접 DB 연결을 건너뜁니다.');
        //     resolve();
        //     return;
        // }
        
        connection.connect(err => {
            if (err) {
                console.error('MySQL 연결 실패: ', err);
                reject(err);
                return;
            }
            console.log('MySQL 데이터베이스 연결 성공');
            resolve();
        });
    });
}

// 직접 DB 쿼리 실행 함수
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject(new Error('MySQL 연결이 설정되지 않았습니다. DB_MODE가 \'direct\'로 설정되어 있는지 확인하세요.'));
            return;
        }
        
        connection.query(sql, params, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패: ', err);
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

// HTTP API를 통한 쿼리 실행
function httpQuery(sql) {
    return axios.get(DB_URL + '?q=' + encodeURIComponent(sql))
        .then(response => response.data)
        .catch(error => {
            console.error('HTTP 쿼리 실행 실패: ', error);
            throw error;
        });
}

// 통합 쿼리 함수 - 모드에 따라 적절한 쿼리 방식 선택
function execQuery(sql, params = []) {
    if (DB_MODE === 'direct') {
        console.log('[직접 DB 모드] 쿼리 실행:', sql);
        return query(sql, params);
    } else {
        console.log('[HTTP 모드] 쿼리 실행:', sql);
        return httpQuery(sql);
    }
}

// 연결 종료 함수
function close() {
    return new Promise((resolve, reject) => {
        if (DB_MODE !== 'direct') {
            resolve();
            return;
        }
        
        connection.end(err => {
            if (err) {
                console.error('MySQL 연결 종료 실패: ', err);
                reject(err);
                return;
            }
            console.log('MySQL 데이터베이스 연결 종료');
            resolve();
        });
    });
}

module.exports = {
    DB_CONFIG,
    DB_URL,
    DB_MODE,
    connect,
    query,
    httpQuery,
    execQuery,
    close,
    connection
}; 