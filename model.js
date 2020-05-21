const messageJsonBlock = {
    "blocks": [{
      "type": "section", "text": { "type": "mrkdwn", "text": "Hello, thanks for calling me... :slightly_smiling_face: Would you like to configure your water timings  :timer_clock:?" }, "accessory": {
        "type": "button", "action_id": "open_modal_button", // We need to add this
        "text": { "type": "plain_text", "text": "Configure :gear:", "emoji": true }, "value": "launch_button_click"
      }
    }]
  }

  const modalJsonBlock = {
    "type": "modal",
    "callback_id": "cute_animal_modal_submit", // We need to add this  
    "title": {
      "type": "plain_text",
      "text": "Water Reminder App",
      "emoji": true
    },
    "submit": {
      "type": "plain_text",
      "text": "Done",
      "emoji": true
    },
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Welcome to water reminder app!"
        }
      },
      {
        "type": "input",
        "block_id": "cute_animal_selection_block", // put this here to identify the selection block
        "element": {
          "type": "static_select",
          "action_id": "cute_animal_selection_element", // put this here to identify the selection element
          "placeholder": {
            "type": "plain_text",
            "text": "Select your wake up time",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "7am",
                "emoji": true
              },
              "value": "7"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "8am",
                "emoji": true
              },
              "value": "8"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "10am",
                "emoji": true
              },
              "value": "10"
            }
          ]
        },
        "label": {
          "type": "plain_text",
          "text": "When does your day start:",
          "emoji": true
        }
      },
      {
        "type": "input",
        "block_id": "cute_animal_name_block", // put this here to identify the input.
        "element": {
          "type": "plain_text_input",
          "action_id": "cute_animal_name_element" // put this here to identify the selection element
  
        },
        "label": {
          "type": "plain_text",
          "text": "How many litres of water do you have in a day",
          "emoji": true
        }
      }
    ]
  }
  
  const reminderBlock = {
      "blocks": [
      {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text":"* One hour has past...Time for a glass of water*"
              }
          
          },
          {
              "type": "image",
              "title": {
                  "type": "plain_text",
                  "text": "Have a water break! ",
                  "emoji": true
              },
              "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDiYszQO_9q5Ao4oMeEbfo_bUitzhXAuBkCuNgVUv9ydjh6nWc&usqp=CAU",
              "alt_text": "Example Image"
          }
      ]
  }

module.exports = {
    messageJsonBlock : messageJsonBlock,
    modalJsonBlock : modalJsonBlock,
    reminderBlock : reminderBlock
}
  