const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.processSignUp = functions.auth.user().onCreate((user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .catch((err) => console.log(err))
})
