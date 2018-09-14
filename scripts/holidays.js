const cheerio = require('cheerio')

const HOLIDAYS = [
    'NEW_YEARS',
    'GOOD_FRIDAY',
    'EASTER_MONDAY',
    'VICTORIA_DAY'
]

module.exports = function(robot) {

    robot.hear(/load holidays/i, function(res){
        robot.http("https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-centre-pay/feries-holidays-eng.html")
            .get()(function(err, response, body){
                if (err) {
                    console.log("Error: ", err.message);
                    return res.reply("An error has occured")
                }
                const $ = cheerio.load(body)

                HOLIDAYS.map(function(day){
                    console.log($('td').next().is('td'))
                })

                //console.log(HOLIDAYS)

                //robot.brain.set('NEW_YEARS', )

                // console.log("New years: " + $('td').slice(1,2).text())
                // console.log("Good Friday: " + $('td').slice(3,4).text())
                // console.log("Easter Monday: " + $('td').slice(5,6).text())
                // console.log("Victoria Day: " + $('td').slice(7,8).text())

                //console.log($('tr').children().text())
                
                //$('td').map(function)
                //console.log($('tr').text())
                //$('tr').map
                res.reply('hello')
                //res.reply($('tr').text())
            })
    })
}