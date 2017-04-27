module.exports = {
	appName: 'financiero',
	base: 'app/',
	build: 'build/',
	server: {
		port: 3300,
        browserSyncPort: 4400,
		buildPath: '/build/',
		base: 'app/',
		gulpbuildPath: 'app/',
		aplicationStart: '3300/',
		cssConcatenated: 'financiero/resources/design/design.css',
		fileCacheSize: {
	      maxCapacity: 1000 
	    },
		proyectTitle: 'financiero'
	}
}