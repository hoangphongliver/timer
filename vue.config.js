module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
        // configure the workbox plugin
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/sw.js',
            // ...other Workbox options...
        }
    }
}