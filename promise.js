Promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		if (typeof promises[Symbol.iterator] !== "function") {
			reject("Type error");
		}
		if (promises.length === 0) {
			resolve([]);
		} else {
			const res = []
			let count = 0
			const len = promises.length
			for (let i = 0; i < len; i++) {
				Promise.resolve(promises[i])
				.then((data) =>{
					res[i] = data
					if (++count === len) {
						resolve(res)
					}
				})
				.catch((err) => {
					reject(err)
				})
			}
		}
	}
}
