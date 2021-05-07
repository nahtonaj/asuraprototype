import boto3
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer
import json

print('Loading function')
dynamo = boto3.resource('dynamodb')
table = dynamo.Table('SlangProfile-f3kuftvyhfao7csa444jdw24s4-demo')

__ds = TypeDeserializer()
__sr = TypeSerializer()

def deserialize_item(d: dict) -> dict:
    """Dynamo has crazy serialization and they don't always get rid of it for us."""
    return {k: __ds.deserialize(value=v) for k, v in d.items()}

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,GET",
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
    }


def lambda_handler(event, context):
    '''Demonstrates a simple HTTP endpoint using API Gateway. You have full
    access to the request and response payload, including headers and
    status code.

    To scan a DynamoDB table, make a GET request with the TableName as a
    query string parameter. To put, update, or delete an item, make a POST,
    PUT, or DELETE request respectively, passing in the payload to the
    DynamoDB API as a JSON body.
    '''
    print("Received event: " + json.dumps(event, indent=2))

    operations = {
        'DELETE': lambda dynamo, x: dynamo.delete_item(**x),
        'GET': lambda dynamo, x: dynamo.scan(**x),
        'POST': lambda dynamo, x: dynamo.put_item(**x),
        'PUT': lambda dynamo, x: dynamo.update_item(**x),
    }

    operation = event['httpMethod']
    if operation in operations:
        payload = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])
        print(payload)
        return respond(None, operations[operation](table, payload))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))