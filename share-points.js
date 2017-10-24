var http = require('http');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "phpmyadmin",
    password: "password",
    database: "sats"
});

con.connect(function(err) {
	if (err) throw err
	
});

var urls = [];
var playersList = [];
var selectedPlayersList = [];

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

var today = yyyy+'-'+mm+'-'+dd;

var mainURL = 'http://online.basket.ee/s2/list/'+today+'/data.json';

http.get(mainURL, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var resp = JSON.parse(body);

        var code = resp.data;

        var num = 1

        for (snippet in code) {
            if (code[snippet].chid == "1" && code[snippet].live == 1) {

                var gid = code[snippet].sporting_id_live

                urls.push('http://www.fibalivestats.com/data/' + gid + '/data.json')

                console.log("Miskit toimub...")

            } else {

                console.log("No live games yet...")

            }

        }

        if (urls.length != 0) {

            console.log("URLs are here...")

            for (j = 0; j < urls.length; j++) {

                http.get(urls[j], function(res) {
                    var body = '';

                    res.on('data', function(chunk) {
                        body += chunk;
                    });

                    res.on('end', function() {
                        var resp = JSON.parse(body);

                        var players = [resp.tm["1"].pl, resp.tm["2"].pl];

                        for (i = 0; i < players.length; i++) {

                            for (player in players[i]) {

                                var fullName = players[i][player].internationalFamilyName + ", " + players[i][player].internationalFirstName;

                                var pts = players[i][player].sPoints;
                                var asts = players[i][player].sAssists;
                                var rebs = players[i][player].sReboundsTotal;

                                var total = pts + asts + rebs

                                var total = pts + asts + rebs

                                playersList.push({
                                    name: fullName,
                                    points: pts,
                                    assists: asts,
                                    rebounds: rebs,
                                    total: total
                                })

                            }

                        }

                        var period = resp.period

                    });
                }).on('error', function(e) {
                    console.log("Got an error: ", e);
                });
            };

        } else {

            console.log("No games in this league tonight...");

        };

    });
}).on('error', function(e) {
    console.log("Got an error: ", e);
});

function sharePoints() {

    console.log("Sharing points...")

    var picksURL = 'http://45.79.84.251:8080/picks';

    if (urls.length != 0) {

        http.get(picksURL, function(res) {
            var body = '';
        
            res.on('data', function(chunk) {
                body += chunk;
            });
        
            res.on('end', function() {
                var resp = JSON.parse(body);
        
                var code = resp.data;
        
                for (snippet in code) {
                    if (code[snippet].date_str == today) {
        
                        var uid = code[snippet].uid

                        var pg = code[snippet].pg
                        var sg = code[snippet].sg
                        var sf = code[snippet].sf
                        var pf = code[snippet].pf
                        var c = code[snippet].c
                        var sixthMan = code[snippet].sixth_man
            
                        for (var pgIndex = 0; pgIndex < playersList.length && playersList[pgIndex].name !== pg; pgIndex++) {
            
                        }
            
                        for (var sgIndex = 0; sgIndex < playersList.length && playersList[sgIndex].name !== sg; sgIndex++) {
            
                        }
            
                        for (var sfIndex = 0; sfIndex < playersList.length && playersList[sfIndex].name !== sf; sfIndex++) {
            
                        }
            
                        for (var pfIndex = 0; pfIndex < playersList.length && playersList[pfIndex].name !== pf; pfIndex++) {
            
                        }
            
                        for (var cIndex = 0; cIndex < playersList.length && playersList[cIndex].name !== c; cIndex++) {
            
                        }
            
                        for (var sixthManIndex = 0; sixthManIndex < playersList.length && playersList[sixthManIndex].name !== sixthMan; sixthManIndex++) {
            
                        }
            
                        var playersListLength = playersList.length - 1
            
                        var pgTotal;
            
                        if (pgIndex > playersListLength) {
            
                            pgTotal = 0
            
                        } else {
            
                            pgTotal = playersList[pgIndex].total
            
                        }
            
                        var sgTotal;
            
                        if (sgIndex > playersListLength) {
            
                            sgTotal = 0
            
                        } else {
            
                            sgTotal = playersList[sgIndex].total
            
                        }
            
                        var sfTotal;
            
                        if (sfIndex > playersListLength) {
            
                            sfTotal = 0
            
                        } else {
            
                            sfTotal = playersList[sfIndex].total
            
                        }
            
                        var pfTotal;
            
                        if (pfIndex > playersListLength) {
            
                            pfTotal = 0
            
                        } else {
            
                            pfTotal = playersList[pfIndex].total
            
                        }
            
                        var cTotal;
            
                        if (cIndex > playersListLength) {
            
                            cTotal = 0
            
                        } else {
            
                            cTotal = playersList[cIndex].total
            
            
                        }
            
                        var sixthManTotal;
            
                        if (sixthManIndex > playersListLength) {
            
                            sixthManTotal = 0
            
                        } else {
            
                            sixthManTotal = playersList[sixthManIndex].total
            
            
                        }
            
                        if (isNaN(pgTotal)) {
                            pgTotal = 0
                        } else {
                            console.log("PG kombes")
                        }
            
                        if (isNaN(sgTotal)) {
                            sgTotal = 0
                        } else {
                            console.log("SG kombes")
                        }
            
                        if (isNaN(sfTotal)) {
                            sfTotal = 0
                        } else {
                            console.log("SF kombes")
                        }
            
                        if (isNaN(pfTotal)) {
                            pfTotal = 0
                        } else {
                            console.log("PF kombes")
                        }
            
                        if (isNaN(cTotal)) {
                            cTotal = 0
                        } else {
                            console.log("C kombes")
                        }
            
                        if (isNaN(sixthManTotal)) {
                            sixthManTotal = 0
                        } else {
                            console.log("Sixth Man kombes")
                        }
            
                        var sum = pgTotal + sgTotal + sfTotal + pfTotal + cTotal + sixthManTotal
  
                        var sql = mysql.format('UPDATE `picks` SET `pg_pts` =?, `sg_pts` =?, `sf_pts` =?, `pf_pts` =?, `c_pts` =?, `sixth_man_pts` =?, `earned` =? WHERE `picks`.`uid` =?', [pgTotal, sgTotal, sfTotal, pfTotal, cTotal, sixthManTotal, sum, uid])
                        con.query(sql, function(err, result) {
                            if (err) throw err;
                            console.log("Points updated...");
                        });
        
                    } else {
        
                        console.log("Some other day...")
        
                    }
        
                }
        
            });
        }).on('error', function(e) {
            console.log("Got an error: ", e);
        });

    } else {
        console.log("No games, no picks...")
    }

}

var myVar;

function alertFunction() {
    myVar = setTimeout(sharePoints, 12000)
}

alertFunction()