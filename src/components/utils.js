
const Utils = {
	decorateUrl: (undecoratedUrl) => {
		return '/static' + undecoratedUrl.substring(1)
	}
}

//console.log(Utils.decorateUrl('./img/bla'))

export default Utils

