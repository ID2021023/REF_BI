let port

if (process.env.NODE_ENV === 'production') {
    port = 5001
}else{
    port = 5001
    // port = 6001
}


export default () => {
    return 'http://100.100.200.12:' + port + '/machbase'
}