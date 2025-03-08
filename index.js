//base by HANSTZ
//YouTube: @HANSTZ-TECH
//Whatsapp https://wa.me/255756530143
//GitHub: @Mrhanstz
//WhatsApp: https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31
//want more free bot scripts? follow my channel : https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31

// index.js
const { spawn } = require('child_process');
const path = require('path');

function start() {
  let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
  console.log([process.argv[0], ...args].join('\n'));

  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  p.on('message', data => {
    if (data === 'reset') {
      console.log('Restarting Bot...');
      restartBot(p);
    }
  });

  p.on('exit', (code, signal) => {
    console.error(`Bot exited with code: ${code}, signal: ${signal}`);
    if (shouldRestart(code)) {
      start();
    }
  });
}

function restartBot(process) {
  process.kill();
  delete process;
  start();
}

function shouldRestart(code) {
  return code === 1 || code === 0 || code === null;
}

start();
