import { JsonSchemaManager } from './json-schema-manager.js'
import { BlacklistManager } from './blacklist-manager.js'
import { WhitelistManager } from './whitelist-manager.js'
import { TokenPolicyManager } from './token-policy-manager.js'
import { TokenManager } from './token-manager.js'
import { ConfigurationManager } from './configuration-manager.js'

export interface IMQManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

export class MQManager {
  constructor(private options: IMQManagerOptions) {}

  JsonSchema = new JsonSchemaManager(this.options)
  Blacklist = new BlacklistManager(this.options)
  Whitelist = new WhitelistManager(this.options)
  TokenPolicy = new TokenPolicyManager(this.options)
  Token = new TokenManager(this.options)
  Configuration = new ConfigurationManager(this.options)
}
