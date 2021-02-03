export interface TcpPortScan {
	tcpPort: number;
	status: 'open' | 'closed';
}
