check-ports-service
Public service to check TCP ports of the requesting client.

### Request

##### Structure:

http://**domain(to be defined)**/**dappnode publicIp**?**tcpPorts="ports separated by commas"**

##### Example:

http://**domain(to be defined)**/**172.123.456.324**?**tcpPorts=1194,8092,4332&udpPorts=8080,5674**

### Response

##### structure:

```
{
  "tcpPorts": {
    port: number,
    status: "open" | "closed | "error"
  }[],

  "udpPorts": {
    port: number,
    status: "open" | "closed" | "error"
  }[]
}
```

##### Example:

**[{"tcpPort":8092,"status":"open"},{"tcpPort":1194,"status":"closed"}]**
