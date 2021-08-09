const appHeaders = (req, res, next) => {
    res.setHeader('Accept', 'text/plain,application/json,text/html')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', ['*'])
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next();
};

module.exports = { appHeaders };