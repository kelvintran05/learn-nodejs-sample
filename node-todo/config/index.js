var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://' + configValues.uname + 
        ':' + configValues.pwd + 
        '@ds251588.mlab.com:51588/nodetodosample';
    }
}