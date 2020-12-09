# mq-js

## Install

```sh
npm install --save @blackglory/mq-js
# or
yarn add @blackglory/mq-js
```

## API

### MQClient

```ts
new MQClient({
  server: string
, token?: string
})
```

#### draft

```ts
MQClient#draft(
  queueId: string
, priority: number | null
, options?: { token?: string }
): Promise<string>
```

#### set

```ts
MQClient#set(
  queueId: string
, messageId: string
, payload: string
, options?: { token?: string }
): Promise<void>
```

#### setJSON

```ts
MQClient#setJSON(
  queueId: string
, messageId: string
, payload: Json
, options?: { token?: string }
): Promise<void>
```

#### active

```ts
MQClient#active(queueId: string, options?: { token?: string }): Promise<string>
```

#### get

```ts
MQClient#get(queueId: string, messageId: string, options?: { token?: string }): Promise<string>
```

#### getJSON

```ts
MQClient#getJSON(queueId: string, messageId: string, options?: { token?: string }): Promise<Json>
```

#### consume

```ts
MQClient#consume(queueId: string, messageId: string, options?: { token?: string }): Promise<void>
```

#### del

```ts
MQClient#del(queueId: string, messageId: string, options?: { token?: string }): Promise<void>
```

#### clear

```ts
MQClient#clear(queueId: string, messageId: string, options?: { token?: string }): Promise<void>
```

#### stats

```ts
MQClient#stats(queueId: string): Promise<{
  draft: number
  waiting: number
  active: number
  completed: number
}>
```

### MQManager

```ts
new MQManager({
  server: string
, adminPassword: string
})
```

#### JsonSchema

##### getIds

```ts
MQManager#JsonSchema.getIds(): Promise<string[]>
```

##### get

```ts
MQManager#JsonSchema.get(id: string): Promise<Json>
```

##### set

```ts
MQManager#JsonSchema.set(id: string, schema: Json): Promise<void>
```

##### remove

```ts
MQManager#JsonSchema.remove(id: string): Promise<void>
```

#### Configuration

##### getIds

```ts
MQManager#Configuration.getIds(): Promise<string[]>
```

##### get

```ts
MQManager#Configuration.get(id: string): Promise<{
  unique: boolean | null
  enqueueTimeout: number | null
  dequeueTimeout: number | null
  consumeTimeout: number | null
  concurrency: number | null
  throttle: {
    duration: number
    limit
  } | null
}>
```

##### setUnique

```ts
MQManager#Configuration.setUnique(id: string, val: boolean): Promise<void>
```

##### removeUnique

```ts
MQManager#Configuration.removeUnique(id: string): Promise<void>
```

##### setEnqueueTimeout

```ts
MQManager#Configuration.setEnqueueTimeout(id: string, val: number): Promise<void>
```

##### removeEnqueueTimeout

```ts
MQManager#Configuration.removeEnqueueTimeout(id: string): Promise<void>
```

##### setDequeueTimeout

```ts
MQManager#Configuration.setDequeueTimeout(id: string, val : number): Promise<void>
```

##### removeDequeueTimeout

```ts
MQManager#Configuration.removeDequeueTimeout(id: string): Promise<void>
```

##### setConsumeTimeout

```ts
MQManager#Configuration.setConsumeTimeout(id: string, val: number): Promise<void>
```

##### removeConsumeTimeout

```ts
MQManager#Configuration.removeConsumeTimeout(id: string): Promise<void>
```

##### setConcurrency

```ts
MQManager#Configuration.setConcucrrency(id: string, val: number): Promise<void>
```

##### removeConcurrency

```ts
MQManager#Configuration.removeConcurrency(id: string): Promise<void>
```

##### setThrottle

```ts
MQManager#Configuration.setThrottle(
  id: string
, val: {
    duration: number
    limit: number
  }
): Promise<void>
```

##### removeThrottle

```ts
MQManager#Configuration.removeThrottle(id: string): Promise<void>
```

#### Blacklist

##### getIds

```ts
MQManager#Blacklist.getIds(): Promise<string[]>
```

##### add

```ts
MQManager#Blacklist.add(id: string): Promise<void>
```

##### remove

```ts
MQManager#Blacklist.remove(id: string): Promise<void>
```

#### Whitelist

##### getIds

```ts
MQManager#Whitelist.getIds(): Promise<string[]>
```

##### add

```ts
MQManager#Whitelist.add(id: string): Promise<void>
```

##### remove

```ts
MQManager#Whitelist.remove(id: string): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
MQManager#TokenPolicy.getIds(): Promise<string[]>
```

##### get

```ts
MQManager#TokenPolicy.get(id: string): Promise<{
  publishTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}>
```

##### setPublishTokenRequired

```ts
MQManager#TokenPolicy.setPublishTokenRequired(id: string, val: boolean): Promise<void>
```

##### removePublishTokenRequired

```ts
MQManager#TokenPolicy.removePublishTokenRequired(id: string): Promise<void>
```

##### setConsumeTokenRequired


```ts
MQManager#TokenPolicy.setConsumeTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeConsumeTokenRequired

```ts
MQManager#TokenPolicy.removeConsumeTokenRequired(id: string): Promise<void>
```

##### setClearTokenRequired

```ts
MQManager#TokenPolicy.setClearTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeClearTokenRequired

```ts
MQManager#TokenPolicy.removeClearTokenRequired(id: string): Promise<void>
```

#### Token

##### getIds

```ts
MQManager#Token.getIds(): Promise<string[]>
```

##### getTokens

```ts
MQManager#Token.getTokens(id: string): Promise<Array<{
  token: string
  publish: boolean
  consume: boolean
  clear: boolean
}>>
```

##### addPublishToken

```ts
MQManager#Token.addPublishToken(id: string, token: string): Promise<void>
```

##### removePublishToken

```ts
MQManager#Token.removePublishToken(id: string, token: string): Promise<void>
```

##### addConsumeToken

```ts
MQManager#Token.addConsumeToken(id: string, token: string): Promise<void>
```

##### removeConsumeToken

```ts
MQManager#Token.removeConsumeToken(id: string, token: string): Promise<void>
```

##### addClearToken

```ts
MQManager#Token.addClearToken(id: string, token: string): Promise<void>
```

##### removeClearToken

```ts
MQManager#Token.removeClearToken(id: string, token: string): Promise<void>
```
