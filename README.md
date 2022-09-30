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
interface IStats {
  namespace: string
  drafting: number
  waiting: number
  ordered: number
  active: number
  completed: number
  failed: number
}

interface IMQClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IMQClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

interface IMQClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class MQClient {
  constructor(options: IMQClientOptions)

  draft(
    namespace: string
  , priority: number | null = null
  , options: IMQClientRequestOptions = {}
  ): Promise<string>

  set(
    namespace: string
  , id: string
  , payload: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  setJSON<T>(
    namespace: string
  , id: string
  , payload: T
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  order(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<string>

  get(
    namespace: string
  , id: string
  , options?: IMQClientRequestOptions
  ): Promise<{ priority: number | null, payload: string }>

  getJSON<T>(
    namespace: string
  , id: string
  , options?: IMQClientRequestOptions
  ): Promise<{ priority: number | null, payload: T }>

  abandon(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  complete(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  fail(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  renew(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  getAllFailedMessageIds(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<string[]>

  abandonAllFailedMessages(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  renewAllFailedMessages(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void>

  clear(namespace: string, options: IMQClientRequestOptions = {}): Promise<void>

  stats(
    namespace: string
  , options: IMQClientRequestOptionsWithoutToken = {}
  ): Promise<IStats>

  getAllNamespaces(
    options: IMQClientRequestOptionsWithoutToken = {}
  ): Promise<string[]>
}
```

### MQManager
```ts
interface IMQManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

class MQManager {
  constructor(options: IMQManagerOptions)

  JsonSchema: JsonSchemaClient
  Blacklist: BlacklistClient
  Whitelist: WhitelistClient
  TokenPolicy: TokenPolicyClient
  Token: TokenClient
  Configuration: ConfigurationClient
}
```

#### JsonSchemaClient
```ts
class JsonSchemaClient {
  getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]>
  get(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<unknown>
  set(
    namespaces: string
  , schema: Json
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  remove(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
}
```

#### BlacklistClient
```ts
class BlacklistClient {
  getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]>
  add(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void>
  remove(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistClient
```ts
class WhitelistClient {
  getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]>
  add(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void>
  remove(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void>
}
```

#### TokenPolicyClient
```ts
interface ITokenPolicy {
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}

class TokenPolicyClient {
  getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]>
  get(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<ITokenPolicy>
  setProduceTokenRequired(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeProduceTokenRequired(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  setConsumeTokenRequired(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeConsumeTokenRequired(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  setClearTokenRequired(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeClearTokenRequired(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenClient
```ts
interface ITokenInfo {
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}

class TokenClient {
  getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]>
  getTokens(
    namespace: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<ITokenInfo[]>
  addProduceToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeProduceToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  addConsumeToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeConsumeToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  addClearToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeClearToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
}
```

#### ConfigurationClient
```ts
interface IConfiguration {
  unique: boolean | null
  draftingTimeout: number | null
  orderedTimeout: number | null
  activeTimeout: number | null
  concurrency: number | null
}

class ConfigurationClient {
  getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]>
  get(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<IConfiguration>
  setUnique(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeUnique(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  setDraftingTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeDraftingTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  setOrderedTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeOrderedTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  setActiveTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeActiveTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  setConcurrency(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
  removeConcurrency(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void>
}
```
