module.exports = {
    apps:[
        {
            name: 'app-backups',
            script: 'start-server.js',
            interpreter: 'node',
            cwd:'.',
            autorestart: true,
            watch:false,
            max_memory_restart:'1G',
            env:{
                NODE_ENV: 'production',
                PORT:8000,
                NODE_TLS_REJECT_UNAUTHORIZED:'0'
            }
        }
    ]
}