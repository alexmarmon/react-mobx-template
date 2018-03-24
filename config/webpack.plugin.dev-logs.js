const chalk = require('chalk')
const DraftLog = require('draftlog')
const cliSpinners = require('cli-spinners')

DraftLog(console)

const { frames } = cliSpinners.dots
let log = console.draft()
let count = 0
let frame = 0
let needsCleared = false
let interval

function Loading(text) {
  // Next frame
  frame = (frame + 1) % frames.length
  if (text === 'Done' || text === 'Updated') return `${chalk.green(text)} ${chalk.green('\u2714')}`
  else if (text === 'Warning') return `${chalk.red(text)} ${chalk.red('\u2715')}`
  else if (text === 'Error') return `${chalk.red(text)} ${chalk.red('\u2715')}`
  return `${chalk.yellow(text)} ${chalk.blue(frames[frame])}`
}

function DevLogs(options) {}
/* eslint-disable */
DevLogs.prototype.apply = function (compiler) {
  compiler.plugin('compile', (params) => {
    // first build, compiling
    if (count === 0) {
      interval = setInterval(() => log(Loading('Building')), cliSpinners.dots.interval)
    }

    // after first build, adding changes
    if (count > 0) {
      interval = setInterval(() => log(Loading('Updating')), cliSpinners.dots.interval)
    }
  })

  compiler.plugin('done', (stats, callback) => {
    if (count === 0) {
      console.log(chalk.green(`\nApp available at localhost:${process.env.PORT}\n`))
    }

    if (needsCleared) {
      log('')
      console.log('')
      log = console.draft()
      needsCleared = false
      console.log('')
    }

    const info = stats.toString({ 
      colors: true,
      chunks: false,
      modules: false,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      children: false 
    })

    if (stats.hasWarnings()) {
      needsCleared = true
      clearInterval(interval)
      log(Loading('Warning'))
      console.log(info)
    }

    if (stats.hasErrors()) {
      needsCleared = true
      clearInterval(interval)
      log(Loading('Errors'))
      console.log(info)
    }

    if (count === 0 && !stats.hasWarnings() && !stats.hasErrors()) {
      clearInterval(interval)
      log(Loading('Done'))
    }

    if (count > 0 && !stats.hasWarnings() && !stats.hasErrors()) {
      clearInterval(interval)
      log(Loading('Updated'))
    }
    
    // increment counter
    count++
  })
}
/* eslint-enable */

module.exports = DevLogs
