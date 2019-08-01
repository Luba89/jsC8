# Manipulating streams

## fabric.stream

`fabric.stream(streamName, type, local): Stream`

Returns a _Stream_ instance representing the stream with the given stream name.

**Arguments**

- **streamName**: `string`

  The name of the stream to use.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("testStream", true);
```

## fabric.getStreams

`async fabric.getStreams(): Object`

Get list of all streams under given database.

**Examples**

```js
const fabric = new Fabric();
const streams = await fabric.getStreams();
// To change the fabric and tenant, fabric.useFabric and fabric.useTenant respectively
```

## fabric.listPersistentStreams

`async fabric.listPersistentStreams(local)`

Get list of persistent streams under the given stream db. Returns either a list of global or of local streams.

**Arguments**

- **local**: `boolean`

  Should the streams be local or global.

**Examples**

```js
const fabric = new Fabric();
const streams = await fabric.listPersistentStreams(true);
// To change the fabric and tenant, fabric.useFabric and fabric.useTenant respectively
```

## fabric.clearBacklog

`async fabric.clearBacklog()`

Clear backlog for all streams for given subscription.

**Examples**

```js
const fabric = new Fabric();
await fabric.clearBacklog();
```

## fabric.clearSubscriptionBacklog

`async fabric.clearSubscriptionBacklog(subscription)`

Clear backlog for all streams for given subscription.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

**Examples**

```js
const fabric = new Fabric();
await fabric.clearSubscriptionBacklog("my-subscription");
```

## fabric.unsubscribe

`async fabric.unsubscribe(subscription)`

Unsubscribes the given subscription on all streams on a stream db.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

**Examples**

```js
const fabric = new Fabric();
await fabric.unsubscribe("my-subscription");
```

## stream.createStream

`async stream.createStream()`

Create asynchronously a stream for a given database.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
```

## stream.expireMessagesOnAllSubscriptions

`async stream.expireMessagesOnAllSubscriptions(expireTime)`

Expire messages on all subscriptions of a stream.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.expireMessagesOnAllSubscriptions(5);
```

## stream.backlog

`async stream.backlog()`

Get estimated backlog for offline stream.

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.backlog();
```

## stream.getStreamStatistics

`async stream.getStreamStatistics()`

Get the statistics for the given stream.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.getStreamStatistics();
```

## stream.deleteSubscription

`async stream.deleteSubscription(subscription)`

Delete a subscription.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.deleteSubscription("my-subscription");
```

## stream.resetSubscriptionToPosition

`async stream.resetSubscriptionToPosition(subscription)`

Reset subscription to message position closest to given position.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.resetSubscriptionToPosition("my-subscription");
```

## stream.expireMessages

`async stream.expireMessages(subscription, expireTimeInSeconds)`

Expire messages on a stream subscription.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

- **expireTimeInSeconds**: `integer`

  Expiration time in seconds.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.expireMessages("my-subscription", 5);
```

## stream.resetCursor

`async stream.resetCursor(subscription)`

Disconnect all active consumers for a cursor and reset the cursor.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.resetCursor("my-subscription");
```

## stream.resetSubscriptionToTimestamp

`async stream.resetSubscriptionToTimestamp(subscription, timestamp)`

Reset subscription to message position closest to absolute timestamp (in miliseconds).

**Arguments**

- **subscription**: `string`

  The name of the subscription.

- **timestamp**: `integer`

  Timestamp in miliseconds.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.resetSubscriptionToTimestamp("my-subscription", 2000);
```

## stream.skipNumberOfMessages

`async stream.skipNumberOfMessages(subscription, numMessages)`

Skip num messages on a topic subscription.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

- **numMessages**: `integer`

  Number of messages to skip.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.skipNumberOfMessages("my-subscription", 2);
```

## stream.skipAllMessages

`async stream.skipAllMessages(subscription)`

Skip all messages on a stream subscription.

**Arguments**

- **subscription**: `string`

  The name of the subscription.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.skipAllMessages("my-subscription");
```

## stream.getSubscriptionList

`async stream.getSubscriptionList()`

Get the list of persistent subscriptions for a given stream.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.getSubscriptionList();
```

## stream.terminateStream

`async stream.terminateStream()`

Terminate a stream. A stream that is terminated will not accept any more messages to be published and will let consumer to drain existing messages in backlog.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
await stream.terminateStream();
```

## stream.consumer

`stream.consumer(subscriptionName, callbackObj, dcName)`

Creates a consumer for a stream.

**Arguments**

- **subscriptionName**: `string`

  The name of the subscription.

- **callbackObj**: `{ onopen, onclose, onerror, onmessage }`

  An object having required callbacks. `onmessage` is necessary.

- **dcName**: `string``

  The dcName for the consumer.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
stream.consumer("my-subscription", {onmessage: (msg)=>{console.log(msg)}}, "test.macrometa.io");
```

## stream.producer

`stream.producer(message, dcName, callbackObj)`

Creates a producer for a stream.

**Arguments**

- **message**: `string`

  The message to be published to the stream.

- **dcName**: `string``

  The dcName for the producer.

- **callbackObj**: `object``

  The object containing onopen, onclose, onmessage, onerror callbacks.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
stream.producer("hello world", "test.macrometa.io");
```

## stream.closeConnections

`stream.closeConnections`

Closes all the websocket connections made by producer and consumers.

**Examples**

```js
const fabric = new Fabric();
const stream = fabric.stream("my-stream", true);
await stream.createStream();
stream.closeConnections();
```