module.exports = {
    apps:[
        {
            name: 'app-backups',
            script: 'next start -p 8000',
            interpreter: "node",
            args: 'start',
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