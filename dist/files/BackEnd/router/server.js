import http from 'http'
import EventEmitter from 'events'

export class Application {
	constructor() {
		this.emitter = new EventEmitter();
		this.server = this._createServer();

	}

	listen(port, callback) {
		this.server.listen(port, callback)
	}

	addRouter(router) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path];
			Object.keys(endpoint).forEach((method) => {
				const handler = endpoint[method];
				this.emitter.on(this._getRouterMask(path, method), (req, res) => {
					handler(req, res)
				})
			})
		})
	}
	_createServer() {
		return http.createServer((req, res) => {
			const emitted = this.emitter.emit(this._getRouterMask(req.url, req.method), req, res)
			if (!emitted) {
				res.writeHead(404);
				res.end('file not find')
			}
		})
	}
	_getRouterMask(path, method) {
		return `[${path}]:[${method}]`
	}
}
