require("isomorphic-fetch");
const aws = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');

const aws_exports = require('./aws-exports');
// ↑
// module.exports = {
//     "aws_appsync_graphqlEndpoint": "xxxxxxxxxx",
//     "aws_appsync_region": "xxxxxxxxxxxx",
//     "aws_appsync_authenticationType": "xxxxxxxxxxxxxx",
// };

const mutationGql = gql(`
  mutation NotifyAddedMessage($id: ID!, $chatRoomId: Int!, $message: String!) {
    notifyAddedMessage(id: $id, chatRoomId: $chatRoomId, message: $message){
      id
      chatRoomId
      message
    }
  }`);

exports.handler = async (event) => {
  const snsMessage = JSON.parse(event.Records[0].Sns.Message)

  const id = snsMessage.id
  const chatRoomId = snsMessage.chatRoomId
  const message = snsMessage.message

  const client = new AWSAppSyncClient({
    disableOffline: true,
    url: aws_exports.aws_appsync_graphqlEndpoint,
    region: aws_exports.aws_appsync_region,
    auth: {
      type: aws_exports.aws_appsync_authenticationType,
      credentials: ()=> aws.config.credentials
    }
  })

  await client.mutate({
    mutation: mutationGql,
    variables: {
      id: id,
      chatRoomId: chatRoomId,
      message: message
    }
  });

  return {
    id: id,
    chatRoomId: chatRoomId,
    message: message
  }
};
