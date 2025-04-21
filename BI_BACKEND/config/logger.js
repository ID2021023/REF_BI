const winston = require('winston');
const path = require('path');

// 로그 파일 경로 설정
const logDir = path.join(__dirname, '../logs');

// 로거 설정
const logger = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'bi-backend' },
    transports: [
        // 에러 로그 파일
        new winston.transports.File({ 
            filename: path.join(logDir, 'error.log'), 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // 모든 로그 파일
        new winston.transports.File({ 
            filename: path.join(logDir, 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // 콘솔 출력
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// 개발 환경에서는 info 레벨까지만 로깅
if (process.env.NODE_ENV === 'development') {
    logger.level = 'info';
}

module.exports = logger; 