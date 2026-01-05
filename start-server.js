const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const buildDir = path.resolve(__dirname, '.next');

// Verifica se o build já existe e está atualizado
const needsBuild = !fs.existsSync(buildDir) || 
                   !fs.existsSync(path.join(buildDir, 'BUILD_ID'));

if (needsBuild) {
  console.log('🚀 Building Next.js application...');
  try {
    // Executa o build
    execSync('npm run build', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname),
      env: { ...process.env, NODE_ENV: 'production' }
    });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed!', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Build already exists, skipping build step...');
}

console.log('🌐 Starting Next.js server...');
// Executa o servidor (este processo será gerenciado pelo PM2)
// Usa spawn ao invés de execSync para manter o processo rodando
const server = spawn('npm', ['run', 'start'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname),
  env: { ...process.env, NODE_ENV: 'production' },
  shell: true
});

// Propaga sinais para o processo filho
process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
});

// Aguarda o processo do servidor
server.on('exit', (code) => {
  process.exit(code);
});

