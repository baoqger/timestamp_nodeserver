var express = require('express');

var app = express();

var port = process.env.PORT || 8000;

app.set('view engine', 'ejs');

// the static resource path
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/*', function(req, res) {
  let timeString = req.url.slice(1);
  if (timeString.match(/^\d+$/i)) {
    let unixTimestamp = new Date(timeString * 1000);
    let commonTime = unixTimestamp.toLocaleDateString();
    res.json({
      unix: timeString,
      natural: commonTime,
    });
  } else {
    const month = timeString.split(',')[0];
    const day = timeString.split(',')[1];
    const year = timeString.split(',')[2];
    const unixTime = new Date(Date.UTC(year, month-1, day)).getTime()/1000;
    res.json({
      unix: unixTime,
      natural: unixTime ? `${year}-${month}-${day}` : null,
    });
  }
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});