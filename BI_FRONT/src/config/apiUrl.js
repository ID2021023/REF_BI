let url

if (process.env.NODE_ENV === 'production') {
    url = 'http://bi.sisun.com/api/'
    // url = 'http://bidev.sisun.com:8081/api/'
}else{
    // url = 'http://bidev.sisun.com:8081/api/'
    url = 'http://localhost:3000/api/'
}


export default (sql) => {
    if(sql)
        return url + encodeURIComponent(encodeURIComponent(sql))
    else
        return url
}