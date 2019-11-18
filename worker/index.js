const keys = require('./keys');
const Redis = require('ioredis');

const redisClient = new Redis(keys.redisPort,keys.redisHost);
const sub = new Redis(keys.redisPort,keys.redisHost);

function fib(index) {
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2)
}

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert')
