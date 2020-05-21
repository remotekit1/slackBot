const express = require('express')
const cron = require("node-cron")
const fs = require("fs")
const blockKitModel = require('./model.js')
const slackServices = require('./services')
const bodyParser = require('body-parser')
const { createEventAdapter } = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const { WebClient, LogLevel ,ErrorCode } = require('@slack/web-api')
const dotenv = require('dotenv')
const _ = require('lodash')


dotenv.config()

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000
const app = express()
const token = process.env.SLACK_BOT_TOKEN
let actualUserList = []; 
/*
const slackEvents = createEventAdapter('35e32ea0f3e83dc6dc70a210aefc915c')
const slackInteractions = createMessageAdapter('35e32ea0f3e83dc6dc70a210aefc915c')
const token = `${process.env.SLACK_BOT_TOKEN}`
const token = 'xoxb-1128169847510-1147644347841-O9oWfHuk2I4Zb3O07skE6jpM'
const webClient = new WebClient(token)
*/

const webClient = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});

app.use('/slack/events', slackEvents.expressMiddleware())
app.use('/slack/actions', slackInteractions.expressMiddleware())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/*
*
@app_mentions
*
*/

slackEvents.on('app_mention', async (event) => {
  try {
    console.log("I got a mention in this channel", event.channel)
    const mentionResponseBlock = { ...blockKitModel.messageJsonBlock, ...{ channel: event.channel } }
    console.log(mentionResponseBlock)
    const res = await webClient.chat.postMessage(mentionResponseBlock)
    console.log('Message sent: ', res.ts)
  } catch (e) {
    console.log(JSON.stringify(e))
  }
})

slackInteractions.action({ actionId: 'open_modal_button' }, async (payload) => {
  try {
    console.log("button click recieved", payload)
    await webClient.views.open({
      trigger_id: payload.trigger_id,
      view: blockKitModel.modalJsonBlock
    }
    )
  } catch (e) {
    console.log(JSON.stringify(e))
  }

  // The return value is used to update the message where the action occurred immediately.
  // Use this to items like buttons and menus that you only want a user to interact with once.
  return {
    text: 'Processing...',
  }
})

slackInteractions.viewSubmission('cute_animal_modal_submit', async (payload) => {
  const blockData = payload.view.state

  const cuteAnimalSelection = blockData.values.cute_animal_selection_block.cute_animal_selection_element.selected_option.value
  const nameInput = blockData.values.cute_animal_name_block.cute_animal_name_element.value

  console.log(cuteAnimalSelection, nameInput)

  if (nameInput.length < 2) {
    return {
      "response_action": "errors",
      "errors": {
        "cute_animal_name_block": "Please mention the unit"
      }
    }
  }
  return {
    response_action: "clear"
  }
})

cron.schedule("59 * * * *",async function() {
  try{
  console.log("running a task every minute", actualUserList);

  const reminderBlockmessage = { ...blockKitModel.reminderBlock, ...{ channel: 'D014NMRAY5N' } }
  console.log(JSON.stringify(reminderBlockmessage))
   const res1 = await webClient.chat.postMessage(reminderBlockmessage)
   console.log('Reminder sent: ', res1.ts)




  } catch (e) {
    console.log(JSON.stringify(e))
  }
});

// Starts server
app.listen(port, function () {
  console.log('Bot is listening on port ' + port)

  // try {
  //   const res = await webClient.users.list()
  //   console.log('Users received: ', JSON.stringify(res))
  // } catch (e) {
  //   console.log(JSON.stringify(e))
  // }

  const usersList = (async () => {
    try {
      // This method call should fail because we're giving it a bogus user ID to lookup.
      const response = await webClient.users.list()
       
      _.filter(response.members, value => {
       if((value["is_bot"] != true) && (value["profile"]["real_name"] !== 'Slackbot')){
      
       actualUserList.push({
          userName: value.profile.real_name,
          userCh: value.id
        });
        return actualUserList;
      }
      });

      console.log(actualUserList);

    } catch (error) {
      // Check the code property, and when its a PlatformError, log the whole response.
      if (error.code === ErrorCode.PlatformError) {
        console.log(error.data);
      } else {
        // Some other error, oh no!
        console.log('Well, that was unexpected.');
      }
    }
  })();

})