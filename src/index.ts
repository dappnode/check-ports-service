import helmet from "helmet";
import express from "express";
import rateLimit from "express-rate-limit";

import { port } from "./params/params";
import { HttpError } from "./utils/httpError";
import { tcpPortsScan } from "./tcpScan/tcpPortsScan";
import {
  isValidIp,
  arePortsInRange,
  isInLimitNumberOfPorts,
} from "./utils/requestAssertions";
import { parseSanitizePortsReq } from "./utils/parseSanitizeTcpPortsReq";
import { PortsScan } from "./types/types";

const app = express();
app.set("trust proxy", 1);

const limiter = rateLimit({
  // default error message when too many requests: 'Too many requests, please try again later.'
  // error code when too many requests: 429
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs

  // Parse the response to JSON when rate limit is triggered
  handler: (_, res) => {
    const errorResponse = {
      status: "error",
      message: "Too many requests, please try again later!",
      code: 429,
    };

    res.status(429).json(errorResponse);
  },
});

//  apply to all requests
app.use(limiter);
app.use(helmet());

// /173.249.41.199?tcpPorts=8092,1914&udpPorts=123,346,4325

app.get("/:host", async (req, res) => {
  try {
    // Data declaration
    let ports: { tcpPorts?: number[]; udpPorts?: number[] };
    let portsScanResponse: PortsScan = {};

    // Data sanitization
    ports = parseSanitizePortsReq(req);
    const host = req.params.host;
    if (!isValidIp(host)) throw new HttpError("Public ip not valid", 400);

    // TCP ports scan and ports assertions
    if (ports.tcpPorts) {
      if (!arePortsInRange(ports.tcpPorts))
        throw new HttpError("Port must be > 0 and < 65535", 400);
      if (!isInLimitNumberOfPorts(ports.tcpPorts))
        throw new HttpError("Too many ports introduced, no more than 20", 400);

      try {
        portsScanResponse.tcpPorts = await tcpPortsScan({
          ports: ports.tcpPorts,
          host,
        });
      } catch (e) {
        throw new HttpError(`Error scanning tcp ports. Error: ${e}`, 500);
      }
    }

    // UDP ports scan and data assertions
    /* if (ports.udpPorts) {
			return;
		} */

    res.json(portsScanResponse);
  } catch (e) {
    if (res.headersSent) {
      res.end();
    }
    if (e instanceof HttpError) {
      res.status(e.code).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
});

const server = app.listen(port, () => {
  console.log(`Scan ports app listening at http://localhost:${port}`);
});

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
function shutdown() {
  console.log("Closing server...");
  server.close((err) => console.log(err || "Bye"));
}
