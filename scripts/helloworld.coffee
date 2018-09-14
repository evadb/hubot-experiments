module.exports = (robot) ->
    robot.hear /Hello hubot/i, (res) -> 
        res.reply "Hello world!"