import Client from '../../client/Client'

export default class API{
  client: Client

  constructor(_client: Client){
    this.client = _client
  }

  get(hash: string, resultEncoding?: string): Promise<Buffer> {
    return this.client.sendRPC('ipfs_get', [hash, resultEncoding || 'base64'], '0x7d0').then(response => {
      if(response.result) return Buffer.from(response.result, resultEncoding || 'base64')
      else Promise.reject(response.error || 'Hash not found')
    })
  }


  put(data: Buffer, dataEncoding?: string): Promise<string> {
    return this.client.sendRPC('ipfs_put', [data.toString(dataEncoding), dataEncoding || 'base64'], '0x7d0').then(response => {
      if(response.result) return response.result
      else Promise.reject(response.error || 'Hash not found')
    })
  }
}
