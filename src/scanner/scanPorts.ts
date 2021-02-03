import { TcpPortScan } from '../types/types';
import { scanPort } from './scanPort';

export async function scanPorts({ tcpPorts, host }: { tcpPorts: number[]; host: string }): Promise<TcpPortScan[]> {
	return Promise.all(tcpPorts.map(async (tcpPort) => await scanPort({ tcpPort, host })));
}
