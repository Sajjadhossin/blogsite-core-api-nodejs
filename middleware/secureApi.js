let secureApi = (req, res, next) => {
    if(req.headers.authorization === 'saj54534dfdf') {
        next();
    } else {
        res.send('authrization failed');
    }
}

module.exports = secureApi;