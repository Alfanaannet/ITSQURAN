require('./lib/setup');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Express app!')
})

app.listen(6025)
const chalk = require('chalk');
const config = require('./config.json');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(__dirname + `/index.js`, {
	token: process.env.BOT_TOKEN,
	mode: 'process',
	respawn: true,
	totalShards: 'auto'
});
manager.on('shardCreate', (shard) => console.log(chalk.green(`Shard[${shard.id}] is ready!`)));
manager
	.spawn({ delay: 10000, timeout: -1 })
	.then((shards) => {
		shards.forEach((shard) => {
			shard.on('message', (message) => {
				console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
			});
		});
	})
	.catch(console.error);
