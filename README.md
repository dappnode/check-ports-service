# API TCP ports service

Public service to check TCP ports on demmand.

Most blockchain proyects needs to do port forwarding to work propertly or improve their performance. Due to this reason, DAppNode has developed a new service to track dappnode users ports on demmand and provide a better support in this field.

This API does not track UDP ports due to its untraceability.

## Specifications

### Request

http://**API-domain**/**dappnode-publicIp**?**tcpPorts="1194,8092,4000"**

### Response

Response structure

```
{
  "tcpPorts": {
    port: number,
    status: "open" | "closed | "error",
    message?: string
  }[],

  "udpPorts": {
    port: number,
    status: "open" | "closed" | "error",
    message?: string
  }[]
}
```

Response Example:

`[{"tcpPort":8092,"status":"open"},{"tcpPort":1194,"status":"closed"}]`

## Development

`docker-compose -f docker-compose.dev.yml build`
`docker-compose -f docker-compose.dev.yml up`

## Production

`docker-compose -f docker-compose.prod.yml build`
`docker-compose -f docker-compose.prod.yml up`

## CI/CD

This proyect has been setup in a remote machine with watchtower, which allows CI/CD.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
