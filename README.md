# API TCP ports service

Public service to check TCP ports on demmand.

Most blockchain proyects needs to do port forwarding to work propertly or improve their performance. Due to this reason, DAppNode has developed a new service to track dappnode users ports on demmand and provide a better support in this field.

This API does not track UDP ports due to its untraceability.

### Request

http://**API-domain**/**dappnode-publicIp**?**tcpPorts="1194,8092,4000"**

### Response

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

##### Response Example:

**[{"tcpPort":8092,"status":"open"},{"tcpPort":1194,"status":"closed"}]**

#### License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
