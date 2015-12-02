/**
 * @TODO enhance code with function in separate file and import them
 */

// Import filesystem
var path = require('path')
var fs = require('fs')
var readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout)

// Import cli
var program = require('commander')
var ncp = require('ncp').ncp
var chalk = require('chalk')

var parseApk = require('./lib/parseApk')

if (process.env.ARCHON_LANG === undefined) {
  process.env.ARCHON_LANG = 'en'
}

var compatibleLanguage = ['ar', 'en', 'fr', 'nl']   // Compatible language list
var lang = process.env.ARCHON_LANG                  // Support language

if (compatibleLanguage.indexOf(lang) > -1) {
  // In the array!
} else {
  // Not in the array
  lang = 'en'
}

var encoding = 'utf-8'                              // Text encoding
var localeFile = 'messages.' + lang + '.json'      // Name of locale file

// Reading the actually locale file
var messageFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', localeFile), encoding))

function success (appPath) {
  var successText = messageFile.directory.success         // Reading translated text
  successText = successText.replace('$appPath', appPath)  // Inject appPath to translated text
  console.log(chalk.green(successText))                   // Print success text
  process.exit(0)
}

module.exports = function (callback) {
  program
    .version('4.0.2')
    .option('-t, --tablet', messageFile.option.tablet)                  // Reading translated text
    .option('-s, --scale', messageFile.option.scale)                    // Reading translated text
    .option('-n, --ext-name [value]', messageFile.option.extentionName) // Reading translated text
    .usage('<' + messageFile.option.pathToApkFile + ' ...>')            // Reading translated text
    .parse(process.argv)

  if (process.argv.length === 2) {
    program.outputHelp()
    process.exit(0)
  }

  var apk = program.args[0]
  callback = callback || success

  if (!apk) {
    program.outputHelp()
    process.exit(0)
  }

  parseApk(apk, function (err, data) {
    if (err) {
      // Reading translated text
      console.log(chalk.yellow(messageFile.option.loadFaild))
    }

    var packageName = null

    try {
      packageName = data.package
    } catch (e) {
      // Reading translated text
      console.log(chalk.yellow(messageFile.parseApk.parsePackageName))
    }

    if (!packageName) {
      // Reading translated text
      console.log(chalk.yellow(messageFile.parseApk.Unknown_APKPackage_1))
      // Reading translated text
      console.log(messageFile.parseApk.Unknown_APKPackage_2)
      rl.prompt()
      rl.on('line', function (text) {
        text = text.trim()

        if (/\.apk$/.test(text)) {
          // Reading translated text
          console.log(chalk.red(messageFile.parseApk.PackageNames_NotEndWith_Apk_1))
          // Reading translated text
          console.log(messageFile.parseApk.PackageNames_NotEndWith_Apk_2)
          process.exit(0)
        } else if (text.indexOf(' ') !== -1) {
          // Reading translated text
          console.log(chalk.red(messageFile.parseApk.PackageNames_NotEndWith_Space_1))
          // Reading translated text
          console.log(messageFile.parseApk.PackageNames_NotEndWith_Space_2)
          process.exit(0)
        } else {
          createExtension(text)
        }
      })
        .on('close', function () {
          process.exit(0)
        })
    } else {
      createExtension(packageName)
    }

    function createExtension (packageName) {
      var templatePath = path.join(__dirname, '_template')
      var appPath = path.join(packageName + '.android')

      // TODO: refactor this if needed in the future
      ncp(templatePath, appPath, function (err) {
        if (err) {
          throw err
        }

        fs.writeFileSync(path.join(appPath, 'vendor', 'chromium', 'crx', 'custom-android-release-1400197.apk'), fs.readFileSync(apk))

        var manifest = JSON.parse(fs.readFileSync(path.join(templatePath, 'manifest.json'), encoding))
        var messages = JSON.parse(fs.readFileSync(path.join(templatePath, '_locales', lang, 'messages.json'), encoding))
        manifest.arc_metadata.name = packageName
        manifest.arc_metadata.packageName = packageName
        manifest.version = '1337'

        if (program.extName) {
          messages.extName.message = program.extName
        } else if (packageName) {
          messages.extName.message = packageName
        } else {
          messages.extName.message = 'App'
        }

        if (program.tablet) {
          manifest.arc_metadata.formFactor = 'tablet'
          manifest.arc_metadata.orientation = 'landscape'
        }

        if (program.scale) {
          manifest.arc_metadata.resize = 'scale'
        }

        fs.writeFileSync(path.join(appPath, 'manifest.json'), JSON.stringify(manifest, null, 2))
        fs.writeFileSync(path.join(appPath, '_locales', lang, 'messages.json'), JSON.stringify(messages, null, 2))

        // Done.
        callback(appPath)
      })
    }
  })
}
