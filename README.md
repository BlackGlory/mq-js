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

#### order

```ts
MQClient#order(queueId: string, options?: { token?: string }): Promise<string>
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
MQManager#Configuration.setUnique(id: string, val: boolean): Promise<void>
```

##### removeUnique

```ts
MQManager#Configuration.removeUnique(id: string): Promise<void>
```

##### setDraftTimeout

```ts
MQManager#Configuration.setDraftTimeout(id: string, val: number): Promise<void>
```

##### removeDraftTimeout

```ts
MQManager#Configuration.removeDraftTimeout(id: string): Promise<void>
```

##### setOrderedTimeout

```ts
MQManager#Configuration.setOrderedTimeout(id: string, val : number): Promise<void>
```

##### removeOrderedTimeout

```ts
MQManager#Configuration.removeOrderedTimeout(id: string): Promise<void>
```

##### setActiveTimeout

```ts
MQManager#Configuration.setActiveTimeout(id: string, val: number): Promise<void>
```

##### removeActiveTimeout

```ts
MQManager#Configuration.removeActiveTimeout(id: string): Promise<void>
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
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}>
```

##### setProduceTokenRequired

```ts
MQManager#TokenPolicy.setProduceTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeProduceTokenRequired

```ts
MQManager#TokenPolicy.removeProduceTokenRequired(id: string): Promise<void>
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
  produce: boolean
  consume: boolean
  clear: boolean
}>>
```

##### addProduceToken

```ts
MQManager#Token.addProduceToken(id: string, token: string): Promise<void>
```

##### removeProduceToken

```ts
MQManager#Token.removeProduceToken(id: string, token: string): Promise<void>
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
