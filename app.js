const geoip = require('geoip-lite');


// Middleware to block Russian IPs
app.use((req, res, next) => {
    // Get client IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Perform GeoIP lookup
    const geo = geoip.lookup(ip);
    
    // Block if the country is Russia (RU)
    if (geo && geo.country === 'RU') {
        return res.status(403).send('Access denied - Russian IP blocked - Glory to Ukraine!');
    }
    
    next();
});
