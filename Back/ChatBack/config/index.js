/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:31:10 
 * @Last Modified time: 2018-06-17 22:31:10 
 * Centralized config file, all configurations should be done here
 */

module.exports = {
    server: {
        port: 3000,
        host: "localhost"
    },
    db: {
        url: "mongodb://localhost/babble"
    }
}