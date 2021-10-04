module.exports={
    chainWebpack:config=>{
        // 发布模式
        config.when(process.env.NODE_ENV==='production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals',{
        
                'vue-quill-editor':'VueQuillEditor'
            })
        })
        // 开发模式
        config.when(process.env.NODE_ENV==='development',config=>{
            config.entry('app').clear().add('./src/main.js')
        })
    }
}