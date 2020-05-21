


// const usersList = (async (WebClient) => {
//     try {
//       // This method call should fail because we're giving it a bogus user ID to lookup.
//       const response = await webClient.users.list()
//       console.log('Users received: ', JSON.stringify(response.members))
//     } catch (error) {
//       // Check the code property, and when its a PlatformError, log the whole response.
//       if (error.code === ErrorCode.PlatformError) {
//         console.log(error.data);
//       } else {
//         // Some other error, oh no!
//         console.log('Well, that was unexpected.');
//       }
//     }
//   })();

//   module.exports = {
//     usersList : usersList
//   }