const chalk = require('chalk')
const os = require('os')
const shell = require('shelljs')
const SSH2Shell = require('ssh2shell')

const remotePath = '/web/admin.izxxz.com'
const dist = 'dist'
const gitRemote = 'git@gitlab.liasica.com:xixianbus/bi-front-dist.git'
const hostIp = '117.34.209.229'

function logSubhead (message) {
    console.log(os.EOL + chalk.bold.underline(message))
}

function logOk (message) {
    console.log(chalk.green(message))
}

function logError (message) {
    console.log(chalk.red(message))
}

function logFatal (message) {
    console.log(os.EOL + chalk.red.bold('Fatal error : ' + message))
    process.exit(1)
}

logSubhead('Building ...')
shell.exec('yarn build')

logSubhead('Go to dist ...')
if (shell.cd(dist).code === 0) {
    logOk(`>>> Go to ${dist} successed <<<`)
} else {
    logFatal(`>>> Go to ${dist} error <<<`)
}

logSubhead('Git command ...')

const { code } = shell.exec(
    `git init; git add -A; git commit -m 'deploy'; git push -f ${gitRemote} master`
)
if (code === 0) {
    logOk('>>> Git successed <<<')
} else {
    logError('>>> Git error <<<')
}

logSubhead('Connecting server...')

const host = {
    server: {
        host: hostIp,
        port: 22,
        userName: 'root',
        privateKey: require('fs').readFileSync(
            `/Users/${os.userInfo().username}/.ssh/id_rsa`
        )
    },
    idleTimeOut: 500000,
    commands: [
        `cd ${remotePath}`,
        'git fetch --all',
        'git reset --hard origin/master',
        'git pull -f'
    ],
    onCommandComplete: (command, response, sshObj) => {
        if (sshObj.commands.length === 3) {
            logOk('>>> Server connected <<<')
            logSubhead(`>>> Run command ${command} <<<`)
        }
        console.info(response)
        logOk(`>>> Command ${command} completed <<<`)
        if (sshObj.commands.length > 0) {
            logSubhead(`>>> Run command ${sshObj.commands[0]} <<<`)
        }
    }
}
const conn = new SSH2Shell(host)

conn.connect()
