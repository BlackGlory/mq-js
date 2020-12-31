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

```ts
interface MQClientRequestOptions {
  signal?: AbortSignal
  token?: string
}
```

#### draft

```ts
MQClient#draft(
  queueId: string
, priority: number | null
, options?: MQClientRequestOptions
): Promise<string>
```

#### set

```ts
MQClient#set(
  queueId: string
, messageId: string
, payload: string
, options?: MQClientRequestOptions
): Promise<void>
```

#### setJSON

```ts
MQClient#setJSON(
  queueId: string
, messageId: string
, payload: Json
, options?: MQClientRequestOptions
): Promise<void>
```

#### order

```ts
MQClient#order(queueId: string, options?: MQClientRequestOptions): Promise<string>
```

#### get

```ts
MQClient#get(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<string>
```

#### getJSON

```ts
MQClient#getJSON(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<Json>
```

#### complete

```ts
MQClient#complete(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<void>
```

#### abandon

```ts
MQClient#abandon(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<void>
```

#### clear

```ts
MQClient#clear(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<void>
```

#### stats

```ts
MQClient#stats(queueId: string, options?: MQClientRequestOptions): Promise<{
  id: string
  drafting: number
  waiting: number
  ordered: number
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

```ts
interface MQManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getIds

```ts
MQManager#JsonSchema.getIds(options?: MQManagerRequestOptions): Promise<string[]>
```

##### get

```ts
MQManager#JsonSchema.get(id: string, options?: MQManagerRequestOptions): Promise<Json>
```

##### set

```ts
MQManager#JsonSchema.set(id: string, schema: Json, options?: MQManagerRequestOptions): Promise<void>
```

##### remove

```ts
MQManager#JsonSchema.remove(id: string, options?: MQManagerRequestOptions): Promise<void>
```

#### Configuration

##### getIds

```ts
MQManager#Configuration.getIds(options?: MQManagerRequestOptions): Promise<string[]>
```

##### get

```ts
MQManager#Configuration.get(id: string, options?: MQManagerRequestOptions): Promise<{
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
MQManager#Configuration.setUnique(id: string, val: boolean, options?: MQManagerRequestOptions): Promise<void>
```

##### removeUnique

```ts
MQManager#Configuration.removeUnique(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setDraftTimeout

```ts
MQManager#Configuration.setDraftTimeout(id: string, val: number, options?: MQManagerRequestOptions): Promise<void>
```

##### removeDraftTimeout

```ts
MQManager#Configuration.removeDraftTimeout(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setOrderedTimeout

```ts
MQManager#Configuration.setOrderedTimeout(id: string, val : number, options?: MQManagerRequestOptions): Promise<void>
```

##### removeOrderedTimeout

```ts
MQManager#Configuration.removeOrderedTimeout(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setActiveTimeout

```ts
MQManager#Configuration.setActiveTimeout(id: string, val: number, options?: MQManagerRequestOptions): Promise<void>
```

##### removeActiveTimeout

```ts
MQManager#Configuration.removeActiveTimeout(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setConcurrency

```ts
MQManager#Configuration.setConcucrrency(id: string, val: number, optinos?: MQManagerRequestOptions): Promise<void>
```

##### removeConcurrency

```ts
MQManager#Configuration.removeConcurrency(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setThrottle

```ts
MQManager#Configuration.setThrottle(
  id: string
, val: {
    duration: number
    limit: number
  }
, options?: MQManagerRequestOptions
): Promise<void>
```

##### removeThrottle

```ts
MQManager#Configuration.removeThrottle(id: string, options?: MQManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
MQManager#Blacklist.getIds(options?: MQManagerRequestOptions): Promise<string[]>
```

##### add

```ts
MQManager#Blacklist.add(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### remove

```ts
MQManager#Blacklist.remove(id: string, options?: MQManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
MQManager#Whitelist.getIds(options?: MQManagerRequestOptions): Promise<string[]>
```

##### add

```ts
MQManager#Whitelist.add(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### remove

```ts
MQManager#Whitelist.remove(id: string, options?: MQManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
MQManager#TokenPolicy.getIds(options?: MQManagerRequestOptions): Promise<string[]>
```

##### get

```ts
MQManager#TokenPolicy.get(id: string, options?: MQManagerRequestOptions): Promise<{
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}>
```

##### setProduceTokenRequired

```ts
MQManager#TokenPolicy.setProduceTokenRequired(id: string, val: boolean, options?: MQManagerRequestOptions): Promise<void>
```

##### removeProduceTokenRequired

```ts
MQManager#TokenPolicy.removeProduceTokenRequired(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setConsumeTokenRequired


```ts
MQManager#TokenPolicy.setConsumeTokenRequired(id: string, val: boolean, options?: MQManagerRequestOptions): Promise<void>
```

##### removeConsumeTokenRequired

```ts
MQManager#TokenPolicy.removeConsumeTokenRequired(id: string, options?: MQManagerRequestOptions): Promise<void>
```

##### setClearTokenRequired

```ts
MQManager#TokenPolicy.setClearTokenRequired(id: string, val: boolean, options?: MQManagerRequestOptions): Promise<void>
```

##### removeClearTokenRequired

```ts
MQManager#TokenPolicy.removeClearTokenRequired(id: string, options?: MQManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
MQManager#Token.getIds(options?: MQManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
MQManager#Token.getTokens(id: string, options?: MQManagerRequestOptions): Promise<Array<{
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}>>
```

##### addProduceToken

```ts
MQManager#Token.addProduceToken(id: string, token: string, options?: MQManagerRequestOptions): Promise<void>
```

##### removeProduceToken

```ts
MQManager#Token.removeProduceToken(id: string, token: string, options?: MQManagerRequestOptions): Promise<void>
```

##### addConsumeToken

```ts
MQManager#Token.addConsumeToken(id: string, token: string, options?: MQManagerRequestOptions): Promise<void>
```

##### removeConsumeToken

```ts
MQManager#Token.removeConsumeToken(id: string, token: string, options?: MQManagerRequestOptions): Promise<void>
```

##### addClearToken

```ts
MQManager#Token.addClearToken(id: string, token: string, options?: MQManagerRequestOptions): Promise<void>
```

##### removeClearToken

```ts
MQManager#Token.removeClearToken(id: string, token: string, options?: MQManagerRequestOptions): Promise<void>
```
