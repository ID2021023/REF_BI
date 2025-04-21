DELIMITER //

-- =====================================================================================================
-- MYSQL 호환 ORACLE 함수 생성
-- =====================================================================================================
-- TO_CHAR 함수 생성
CREATE FUNCTION TO_CHAR(input_value DATETIME, format_mask VARCHAR(100)) 
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(100);
    
    -- 날짜 형식 처리
    SET result = CASE
        -- 연도 형식
        WHEN format_mask = 'YYYY' THEN DATE_FORMAT(input_value, '%Y')
        WHEN format_mask = 'YY' THEN DATE_FORMAT(input_value, '%y')
        -- 월 형식
        WHEN format_mask = 'MM' THEN DATE_FORMAT(input_value, '%m')
        WHEN format_mask = 'MON' THEN DATE_FORMAT(input_value, '%b')
        WHEN format_mask = 'MONTH' THEN DATE_FORMAT(input_value, '%M')
        -- 일 형식
        WHEN format_mask = 'DD' THEN DATE_FORMAT(input_value, '%d')
        WHEN format_mask = 'DAY' THEN DATE_FORMAT(input_value, '%W')
        WHEN format_mask = 'DY' THEN DATE_FORMAT(input_value, '%a')
        -- 시간 형식
        WHEN format_mask = 'HH24' THEN DATE_FORMAT(input_value, '%H')
        WHEN format_mask = 'HH' THEN DATE_FORMAT(input_value, '%h')
        WHEN format_mask = 'MI' THEN DATE_FORMAT(input_value, '%i')
        WHEN format_mask = 'SS' THEN DATE_FORMAT(input_value, '%s')
        -- 일반적인 형식 조합
        WHEN format_mask = 'YYYY-MM-DD' THEN DATE_FORMAT(input_value, '%Y-%m-%d')
        WHEN format_mask = 'DD-MON-YYYY' THEN DATE_FORMAT(input_value, '%d-%b-%Y')
        WHEN format_mask = 'YYYY-MM-DD HH24:MI:SS' THEN DATE_FORMAT(input_value, '%Y-%m-%d %H:%i:%s')
        WHEN format_mask = 'DD-MON-YYYY HH24:MI:SS' THEN DATE_FORMAT(input_value, '%d-%b-%Y %H:%i:%s')
        -- 기타 형식은 여기에 추가
        ELSE DATE_FORMAT(input_value, '%Y-%m-%d %H:%i:%s') -- 기본 형식
    END;
    
    RETURN result;
END //

-- 숫자 형식을 위한 TO_CHAR 함수도 추가
CREATE FUNCTION TO_CHAR_NUMBER(input_value DECIMAL(20,6), format_mask VARCHAR(100))
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(100);
    
    -- 숫자 형식 처리
    SET result = CASE
        WHEN format_mask = '999,999.99' THEN FORMAT(input_value, 2)
        WHEN format_mask = '999,999' THEN FORMAT(input_value, 0)
        WHEN format_mask = '999.99' THEN FORMAT(input_value, 2)
        WHEN format_mask = '999' THEN FORMAT(input_value, 0)
        -- 기타 형식은 여기에 추가
        ELSE CAST(input_value AS CHAR)
    END;
    
    RETURN result;
END //

-- =====================================================================================================
-- DECODE 함수 생성
CREATE FUNCTION DECODE(
    expr VARCHAR(255),
    search1 VARCHAR(255), result1 VARCHAR(255),
    search2 VARCHAR(255), result2 VARCHAR(255),
    search3 VARCHAR(255), result3 VARCHAR(255),
    search4 VARCHAR(255), result4 VARCHAR(255),
    search5 VARCHAR(255), result5 VARCHAR(255),
    search6 VARCHAR(255), result6 VARCHAR(255),
    search7 VARCHAR(255), result7 VARCHAR(255),
    search8 VARCHAR(255), result8 VARCHAR(255),
    search9 VARCHAR(255), result9 VARCHAR(255),
    search10 VARCHAR(255), result10 VARCHAR(255),
    default_result VARCHAR(255)
)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    IF expr = search1 OR (expr IS NULL AND search1 IS NULL) THEN
        RETURN result1;
    ELSEIF expr = search2 OR (expr IS NULL AND search2 IS NULL) THEN
        RETURN result2;
    ELSEIF expr = search3 OR (expr IS NULL AND search3 IS NULL) THEN
        RETURN result3;
    ELSEIF expr = search4 OR (expr IS NULL AND search4 IS NULL) THEN
        RETURN result4;
    ELSEIF expr = search5 OR (expr IS NULL AND search5 IS NULL) THEN
        RETURN result5;
    ELSEIF expr = search6 OR (expr IS NULL AND search6 IS NULL) THEN
        RETURN result6;
    ELSEIF expr = search7 OR (expr IS NULL AND search7 IS NULL) THEN
        RETURN result7;
    ELSEIF expr = search8 OR (expr IS NULL AND search8 IS NULL) THEN
        RETURN result8;
    ELSEIF expr = search9 OR (expr IS NULL AND search9 IS NULL) THEN
        RETURN result9;
    ELSEIF expr = search10 OR (expr IS NULL AND search10 IS NULL) THEN
        RETURN result10;
    ELSE
        RETURN default_result;
    END IF;
END //

-- =====================================================================================================
-- NVL 함수 생성
CREATE FUNCTION NVL(p1 VARCHAR(255), p2 VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    RETURN IFNULL(p1, p2);
END //

-- =====================================================================================================
-- TO_NUMBER 함수 생성
CREATE FUNCTION TO_NUMBER(input_value VARCHAR(255))
RETURNS DECIMAL(20,6)
DETERMINISTIC
BEGIN
    DECLARE result DECIMAL(20,6);
    
    -- 숫자 변환 시도
    SET result = CAST(input_value AS DECIMAL(20,6));
    
    -- 변환 실패 시 NULL 반환
    IF result IS NULL THEN
        RETURN NULL;
    ELSE
        RETURN result;
    END IF;
END //

-- =====================================================================================================
-- 오라클 호환 함수 생성
-- NVL2 함수 생성
CREATE FUNCTION NVL2(expr1 VARCHAR(255), expr2 VARCHAR(255), expr3 VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    IF expr1 IS NOT NULL THEN
        RETURN expr2;
    ELSE
        RETURN expr3;
    END IF;
END //

-- INSTR 함수 생성
CREATE FUNCTION INSTR(str VARCHAR(255), substr VARCHAR(255), pos INT)
RETURNS INT
DETERMINISTIC
BEGIN
    IF pos IS NULL OR pos <= 0 THEN
        SET pos = 1;
    END IF;
    RETURN LOCATE(substr, str, pos);
END //

-- LPAD 함수 생성
CREATE FUNCTION LPAD(str VARCHAR(255), len INT, pad_str VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);
    SET result = str;
    WHILE LENGTH(result) < len DO
        SET result = CONCAT(pad_str, result);
    END WHILE;
    RETURN LEFT(result, len);
END //

-- RPAD 함수 생성
CREATE FUNCTION RPAD(str VARCHAR(255), len INT, pad_str VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);
    SET result = str;
    WHILE LENGTH(result) < len DO
        SET result = CONCAT(result, pad_str);
    END WHILE;
    RETURN LEFT(result, len);
END //

-- TRUNC 함수 생성 (날짜용)
CREATE FUNCTION TRUNC(input_value VARCHAR(255), format_or_places VARCHAR(10))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);

    -- 시도 1: 날짜 포맷 처리
    IF format_or_places IN ('YYYY', 'MM', 'DD', 'HH24', 'MI') THEN
        SET result = CASE format_or_places
            WHEN 'YYYY' THEN DATE_FORMAT(STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s'), '%Y-01-01 00:00:00')
            WHEN 'MM' THEN DATE_FORMAT(STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s'), '%Y-%m-01 00:00:00')
            WHEN 'DD' THEN DATE_FORMAT(STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d 00:00:00')
            WHEN 'HH24' THEN DATE_FORMAT(STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:00:00')
            WHEN 'MI' THEN DATE_FORMAT(STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:%i:00')
            ELSE input_value
        END;
    ELSE
        -- 시도 2: 숫자 절삭 처리
        SET result = CAST(TRUNCATE(CAST(input_value AS DECIMAL(20,6)), CAST(format_or_places AS UNSIGNED)) AS CHAR);
    END IF;

    RETURN result;
END //

-- ROUND 함수 생성 (숫자용)
CREATE FUNCTION ROUND(input_number DECIMAL(20,6), decimal_places INT)
RETURNS DECIMAL(20,6)
DETERMINISTIC
BEGIN
    RETURN ROUND(input_number, decimal_places);
END //

-- ADD_MONTHS 함수 생성
CREATE FUNCTION ADD_MONTHS(input_date DATETIME, months INT)
RETURNS DATETIME
DETERMINISTIC
BEGIN
    RETURN DATE_ADD(input_date, INTERVAL months MONTH);
END //

-- MONTHS_BETWEEN 함수 생성
CREATE FUNCTION MONTHS_BETWEEN(date1 DATETIME, date2 DATETIME)
RETURNS DECIMAL(10,6)
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(MONTH, date2, date1);
END //

-- NEXT_DAY 함수 생성
CREATE FUNCTION NEXT_DAY(input_date DATETIME, day_of_week INT)
RETURNS DATETIME
DETERMINISTIC
BEGIN
    DECLARE result DATETIME;
    SET result = input_date;
    WHILE DAYOFWEEK(result) != day_of_week DO
        SET result = DATE_ADD(result, INTERVAL 1 DAY);
    END WHILE;
    RETURN result;
END //

-- =====================================================================================================
-- TO_DATE 함수 생성
CREATE FUNCTION TO_DATE(input_value VARCHAR(255), format_mask VARCHAR(100))
RETURNS DATETIME
DETERMINISTIC
BEGIN
    DECLARE result DATETIME;
    
    -- 날짜 형식 처리
    SET result = CASE
        -- 기본 형식
        WHEN format_mask = 'YYYY-MM-DD' THEN STR_TO_DATE(input_value, '%Y-%m-%d')
        WHEN format_mask = 'YYYYMMDD' THEN STR_TO_DATE(input_value, '%Y%m%d')
        WHEN format_mask = 'DD-MON-YYYY' THEN STR_TO_DATE(input_value, '%d-%b-%Y')
        WHEN format_mask = 'YYYY-MM-DD HH24:MI:SS' THEN STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s')
        WHEN format_mask = 'YYYYMMDDHH24MISS' THEN STR_TO_DATE(input_value, '%Y%m%d%H%i%s')
        -- 기타 형식은 여기에 추가
        ELSE STR_TO_DATE(input_value, '%Y-%m-%d %H:%i:%s') -- 기본 형식
    END;
    
    RETURN result;
END //

DELIMITER ;
