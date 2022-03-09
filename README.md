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
, basicAuth?: {
    username: string
  , password: string
  }
, keepalive?: boolean
, timeout?: number
})
```

```ts
interface IMQClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}
```

```ts
interface IMQClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}
```

#### draft

```ts
MQClient#draft(
  namespace: string
, priority?: number | null
, options?: IMQClientRequestOptions
): Promise<string>
```

#### set

```ts
MQClient#set(
  namespace: string
, id: string
, payload: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### setJSON

```ts
MQClient#setJSON(
  namespace: string
, id: string
, payload: Json
, options?: IMQClientRequestOptions
): Promise<void>
```

#### order

```ts
MQClient#order(namespace: string, options?: IMQClientRequestOptions): Promise<string>
```

#### get

```ts
MQClient#get(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<{
  priority: number | null
  payload: string
}>
```

#### getJSON

```ts
MQClient#getJSON(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<{
  priority: number | null
  payload: Json
}>
```

#### abandon

```ts
MQClient#abandon(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### complete

```ts
MQClient#complete(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### fail

```ts
MQClient#fail(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### renew

```ts
MQClient#renew(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### getAllFailedMessageIds

```ts
MQClient#getAllFailedMessageIds(
  namespace: string
, options?: IMQClientRequestOptions
): Promise<string[]>
```

#### abandonAllFailedMessages

```ts
MQClient#abandonAllFailedMessages(
  namespace: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### renewAllFailedMessages

```ts
MQClient#renewAllFailedMessages(
  namespace: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### clear

```ts
MQClient#clear(
  namespace: string
, id: string
, options?: IMQClientRequestOptions
): Promise<void>
```

#### stats

```ts
MQClient#stats(
  namespace: string
, options?: IMQClientRequestOptionsWithoutToken
): Promise<{
  namespace: string
  drafting: number
  waiting: number
  ordered: number
  active: number
  completed: number
  failed: number
}>
```

#### getAllNamespaces

```ts
MQClient#getAllNamespaces(
  options?: IMQClientRequestOptionsWithoutToken
): Promise<string[]>
```

### MQManager

```ts
new MQManager({
  server: string
, adminPassword: string
, keepalive?: boolean
, timeout?: number
})
```

```ts
interface IMQManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}
```

#### JsonSchema

##### getNamespaces

```ts
MQManager#JsonSchema.getNamespaces(
  options?: IMQManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
MQManager#JsonSchema.get(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<Json>
```

##### set

```ts
MQManager#JsonSchema.set(
  namespace: string
, schema: Json
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### remove

```ts
MQManager#JsonSchema.remove(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

#### Configuration

##### getNamespaces

```ts
MQManager#Configuration.getNamespaces(
  options?: IMQManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
MQManager#Configuration.get(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<{
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
MQManager#Configuration.setUnique(
  namespace: string
, val: boolean
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeUnique

```ts
MQManager#Configuration.removeUnique(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setDraftTimeout

```ts
MQManager#Configuration.setDraftTimeout(
  namespace: string
, val: number
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeDraftTimeout

```ts
MQManager#Configuration.removeDraftTimeout(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setOrderedTimeout

```ts
MQManager#Configuration.setOrderedTimeout(
  namespace: string
, val: number
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeOrderedTimeout

```ts
MQManager#Configuration.removeOrderedTimeout(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setActiveTimeout

```ts
MQManager#Configuration.setActiveTimeout(
  namespace: string
, val: number
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeActiveTimeout

```ts
MQManager#Configuration.removeActiveTimeout(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setConcurrency

```ts
MQManager#Configuration.setConcucrrency(
  namespace: string
, val: number
, optinos?: IMQManagerRequestOptions
): Promise<void>
```

##### removeConcurrency

```ts
MQManager#Configuration.removeConcurrency(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setThrottle

```ts
MQManager#Configuration.setThrottle(
  namespace: string
, val: {
    duration: number
    limit: number
  }
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeThrottle

```ts
MQManager#Configuration.removeThrottle(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

#### Blacklist

##### getNamespaces

```ts
MQManager#Blacklist.getNamespaces(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### add

```ts
MQManager#Blacklist.add(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### remove

```ts
MQManager#Blacklist.remove(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

#### Whitelist

##### getNamespaces

```ts
MQManager#Whitelist.getNamespaces(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### add

```ts
MQManager#Whitelist.add(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### remove

```ts
MQManager#Whitelist.remove(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

#### TokenPolicy

##### getNamespaces

```ts
MQManager#TokenPolicy.getNamespaces(
  options?: IMQManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
MQManager#TokenPolicy.get(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<{
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}>
```

##### setProduceTokenRequired

```ts
MQManager#TokenPolicy.setProduceTokenRequired(
  namespace: string
, val: boolean
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeProduceTokenRequired

```ts
MQManager#TokenPolicy.removeProduceTokenRequired(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setConsumeTokenRequired


```ts
MQManager#TokenPolicy.setConsumeTokenRequired(
  namespace: string
, val: boolean
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeConsumeTokenRequired

```ts
MQManager#TokenPolicy.removeConsumeTokenRequired(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### setClearTokenRequired

```ts
MQManager#TokenPolicy.setClearTokenRequired(
  namespace: string
, val: boolean
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeClearTokenRequired

```ts
MQManager#TokenPolicy.removeClearTokenRequired(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

#### Token

##### getNamespaces

```ts
MQManager#Token.getNamespaces(options?: IMQManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
MQManager#Token.getTokens(
  namespace: string
, options?: IMQManagerRequestOptions
): Promise<Array<{
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}>>
```

##### addProduceToken

```ts
MQManager#Token.addProduceToken(
  namespace: string
, token: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeProduceToken

```ts
MQManager#Token.removeProduceToken(
  namespace: string
, token: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### addConsumeToken

```ts
MQManager#Token.addConsumeToken(
  namespace: string
, token: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeConsumeToken

```ts
MQManager#Token.removeConsumeToken(
  namespace: string
, token: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### addClearToken

```ts
MQManager#Token.addClearToken(
  namespace: string
, token: string
, options?: IMQManagerRequestOptions
): Promise<void>
```

##### removeClearToken

```ts
MQManager#Token.removeClearToken(
  namespace: string
, token: string
, options?: IMQManagerRequestOptions
): Promise<void>
```
