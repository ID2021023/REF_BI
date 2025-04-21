DELIMITER //

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

DELIMITER ;


DELIMITER //

CREATE FUNCTION DECODE(
    expr VARCHAR(255),
    search1 VARCHAR(255),
    result1 VARCHAR(255),
    search2 VARCHAR(255),
    result2 VARCHAR(255),
    default_result VARCHAR(255)
)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    IF expr = search1 OR (expr IS NULL AND search1 IS NULL) THEN
        RETURN result1;
    ELSEIF expr = search2 OR (expr IS NULL AND search2 IS NULL) THEN
        RETURN result2;
    ELSE
        RETURN default_result;
    END IF;
END //

-- 더 많은 조건을 지원하는 DECODE 함수 (최대 5개 조건)
CREATE FUNCTION DECODE_EXT(
    expr VARCHAR(255),
    search1 VARCHAR(255),
    result1 VARCHAR(255),
    search2 VARCHAR(255),
    result2 VARCHAR(255),
    search3 VARCHAR(255),
    result3 VARCHAR(255),
    search4 VARCHAR(255),
    result4 VARCHAR(255),
    search5 VARCHAR(255),
    result5 VARCHAR(255),
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
    ELSE
        RETURN default_result;
    END IF;
END //

DELIMITER ;