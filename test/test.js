var issue = 'https://github.com/vladikoff/chromeos-apk/issues' // issue tracker page
console.log(issue)

if (process.env.ARCHON_LANG === undefined) {
  process.env.ARCHON_LANG = 'en'
}

var compatibleLanguage = ['ar', 'en', 'fr', 'nl']
var lang = process.env.ARCHON_LANG

if (compatibleLanguage.indexOf(lang) > -1) {
  // In the array!
} else {
  // Not in the array
  lang = 'en'
}

console.warn('process.env.AW=' + process.env.AW)
console.log('process.env.ARCHON_LANG=' + process.env.ARCHON_LANG)
console.info('process.env.PATH=' + process.env.PATH)
console.warn('my lang = ' + lang)

var path = require('path')
var fs = require('fs')

var array1 = fs.readdirSync(path.join(__dirname, 'locales'))

console.log('\nmy file : ' + array1.toString())

var compa = []
array1.forEach(function (element) {
  if (element !== 'ROLE') {
    console.log('!== ROLE')
    compa.push(element.substring(9, 11))
  }
}, this)

console.log('compatible language = ' + compa.toString())
