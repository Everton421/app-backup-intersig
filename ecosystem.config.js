module.exports = {
    apps:[
        {
            name: 'app-backups',
            script: 'npm',
            args: 'start',
            cwd:'.',
            autorestart: true,
            watch:false,
            max_memory_restart:'2G',
            env:{
                NODE_ENV: 'production',
                PORT:8000 
            }
        }
    ]
}