// Description
//  A hubot script to fetch google analytics data
//
// Configuration:
// 
// 
// Commands:
//
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Eva Demers-Brett <eva.demers-brett@cds-snc.ca>


const {google} = require('googleapis');
const key = require('./key.json');

var analytics = google.analytics("v3");

module.exports = function(robot) {

    const scopes = [
        'https://www.googleapis.com/auth/analytics.readonly'
    ];

    var oAuth2Client = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        scopes,
        null
    );

    robot.hear(/list projects/i, function(res)
    {
        oAuth2Client.authorize(function(err)
        {
          analytics.management.webproperties.list(
              {
                auth: oAuth2Client,
                accountId: '~all',
              }, function(err, resp) {
                  if (err) {
                      console.log("Error: ", err.message);
                      return res.reply("An error has occured")
                  }
                
                var message = resp.data.items.map(function(item) {
                    return item.id + " - " + item.name
                }).join("\n")

                return res.reply(message)

              }
          );  
        });
    })
}