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
, keepalive?: boolean
})
```

```ts
interface IMQClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}
```

```ts
interface IMQClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}
```

#### draft

```ts
MQClient#draft(
  queueId: string
, priority: number | null
, options?: IMQClientRequestOptions
): Promise<string>
```

#### set

```ts
MQClient#set(
  queueId: string
, messageId: string
, payload: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### setJSON

```ts
MQClient#setJSON(
  queueId: string
, messageId: string
, payload: Json
, options?: IMQClientRequestOptions
): Promise<void>
```

#### order

```ts
MQClient#order(queueId: string, options?: IMQClientRequestOptions): Promise<string>
```

#### get

```ts
MQClient#get(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<{
  priority: number | null
  payload: string
}>
```

#### getJSON

```ts
MQClient#getJSON(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<{
  priority: number | null
  payload: Json
}>
```

#### abandon

```ts
MQClient#abandon(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### complete

```ts
MQClient#complete(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### fail

```ts
MQClient#fail(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### renew

```ts
MQClient#renew(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### getAllFailedMessageIds

```ts
MQClient#getAllFailedMessageIds(queueId: string, options?: IMQClientRequestOptions): Promise<string[]>
```

#### abandonAllFailedMessages

```ts
MQClient#abandonAllFailedMessages(queueId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### renewAllFailedMessages

```ts
MQClient#renewAllFailedMessages(queueId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### clear

```ts
MQClient#clear(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<void>
```

#### stats

```ts
MQClient#stats(queueId: string, options?: IMQClientRequestOptionsWithoutToken): Promise<{
  id: string
  drafting: number
  waiting: number
  ordered: number
  active: number
  completed: number
  failed: number
}>
```

#### getAllQueueIds

```ts
MQClient#getAllQueueIds(options?: IMQClientRequestOptionsWithoutToken): Promise<string[]>
```

### MQManager

```ts
new MQManager({
  server: string
, adminPassword: string
})
```

```ts
interface IMQManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getIds

```ts
MQManager#JsonSchema.getIds(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### get

```ts
MQManager#JsonSchema.get(id: string, options?: IMQManagerRequestOptions): Promise<Json>
```

##### set

```ts
MQManager#JsonSchema.set(id: string, schema: Json, options?: IMQManagerRequestOptions): Promise<void>
```

##### remove

```ts
MQManager#JsonSchema.remove(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

#### Configuration

##### getIds

```ts
MQManager#Configuration.getIds(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### get

```ts
MQManager#Configuration.get(id: string, options?: IMQManagerRequestOptions): Promise<{
  unique: boolean | null
  draftTimeout: number | null
  orderedTimeout: number | null
  activeTimeout: number | null
  concurrency: number | null
  throttle: {
    duration: number
    limit
  } | null
}>
```

##### setUnique

```ts
MQManager#Configuration.setUnique(id: string, val: boolean, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeUnique

```ts
MQManager#Configuration.removeUnique(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setDraftTimeout

```ts
MQManager#Configuration.setDraftTimeout(id: string, val: number, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeDraftTimeout

```ts
MQManager#Configuration.removeDraftTimeout(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setOrderedTimeout

```ts
MQManager#Configuration.setOrderedTimeout(id: string, val : number, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeOrderedTimeout

```ts
MQManager#Configuration.removeOrderedTimeout(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setActiveTimeout

```ts
MQManager#Configuration.setActiveTimeout(id: string, val: number, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeActiveTimeout

```ts
MQManager#Configuration.removeActiveTimeout(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setConcurrency

```ts
MQManager#Configuration.setConcucrrency(id: string, val: number, optinos?: IMQManagerRequestOptions): Promise<void>
```

##### removeConcurrency

```ts
MQManager#Configuration.removeConcurrency(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setThrottle

```ts
MQManager#Configuration.setThrottle(
  id: string
, val: {
    duration: number
    limit: number
  }
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeThrottle

```ts
MQManager#Configuration.removeThrottle(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
MQManager#Blacklist.getIds(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### add

```ts
MQManager#Blacklist.add(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### remove

```ts
MQManager#Blacklist.remove(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
MQManager#Whitelist.getIds(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### add

```ts
MQManager#Whitelist.add(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### remove

```ts
MQManager#Whitelist.remove(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
MQManager#TokenPolicy.getIds(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### get

```ts
MQManager#TokenPolicy.get(id: string, options?: IMQManagerRequestOptions): Promise<{
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}>
```

##### setProduceTokenRequired

```ts
MQManager#TokenPolicy.setProduceTokenRequired(id: string, val: boolean, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeProduceTokenRequired

```ts
MQManager#TokenPolicy.removeProduceTokenRequired(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setConsumeTokenRequired


```ts
MQManager#TokenPolicy.setConsumeTokenRequired(id: string, val: boolean, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeConsumeTokenRequired

```ts
MQManager#TokenPolicy.removeConsumeTokenRequired(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### setClearTokenRequired

```ts
MQManager#TokenPolicy.setClearTokenRequired(id: string, val: boolean, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeClearTokenRequired

```ts
MQManager#TokenPolicy.removeClearTokenRequired(id: string, options?: IMQManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
MQManager#Token.getIds(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
MQManager#Token.getTokens(id: string, options?: IMQManagerRequestOptions): Promise<Array<{
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}>>
```

##### addProduceToken

```ts
MQManager#Token.addProduceToken(id: string, token: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeProduceToken

```ts
MQManager#Token.removeProduceToken(id: string, token: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### addConsumeToken

```ts
MQManager#Token.addConsumeToken(id: string, token: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeConsumeToken

```ts
MQManager#Token.removeConsumeToken(id: string, token: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### addClearToken

```ts
MQManager#Token.addClearToken(id: string, token: string, options?: IMQManagerRequestOptions): Promise<void>
```

##### removeClearToken

```ts
MQManager#Token.removeClearToken(id: string, token: string, options?: IMQManagerRequestOptions): Promise<void>
```
