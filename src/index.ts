import helmet from 'helmet';
import express from 'express';
import { port } from './params/params';
import { parseSanitizeTcpPortsReq } from './middleware/parseSanitizeTcpPortsReq';
import { portsMiddleware } from './middleware/portsMiddleware';
import { HttpError } from './Errors/httpError';
import { hostMiddleware } from './middleware/hostMiddleware';
import { scanPorts } from './scanner/scanPorts';

const app = express();

app.use(helmet());

// /publicIp?tcpPorts=435,456

app.get('/:host', async (req, res) => {
	try {
		// Data
		const tcpPorts = parseSanitizeTcpPortsReq(req);
		const host = req.params.host;

		// Data middlewares
		hostMiddleware(host);
		portsMiddleware(tcpPorts);

		const scan = await scanPorts({ tcpPorts, host });
		//console.log(scan);

		res.json(scan);
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

app.listen(port, () => {
	console.log(`Scan ports app listening at http://localhost:${port}`);
});
