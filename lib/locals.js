/*
 * locals - A Locals Middleware
 * LICENSE: MIT
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Active 9 LLC.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 */

var fs = require("fs"),
    path = require("path");

var localsdir = "",
    baselanguage = "",
    languages = [],
    list = {};
    
module.exports = function (options) {

	if (options.localsdir) {
		localsdir = options.localsdir;
	}
	if (options.baselanguage) {
		baselanguage = options.baselanguage;
	}
	if (options.languages) {
		languages = options.languages;
	}
	if (options.list) {
		list = options.list;
	}
	
	return {

		load: function (localdir) {
			if(localdir) {
				loadcals(localdir);
				loadlangs(localdir);
			} else {
				loadcals(options.localsdir);
				loadlangs(options.localsdir);
			}
		},

		loadcals: function (localdir) {
			fs.readdir(localdir, function (err, files) {
				if (err) {
					throw err;
				}

				files.map(function (file) {
					return path.join(p, file);
				}).filter(function (file) {
					return fs.statSync(file).isDir();
				}).forEach(function (file) {
					list.push(file);
					console.log("%s (%s)", file, path.extname(file));
				});
			});
		},

		loadlangs: function (localdir) {
			for (lang in languages) {
				fs.readdir(p, function (err, files) {
					if (err) {
						throw err;
					}

					files.map(function (file) {
						return path.join(p, file);
					}).filter(function (file) {
						return fs.statSync(file).isFile();
					}).forEach(function (file) {
						var ln = file.replace('.json');
						var translation = {
							ln: require(localdir +'/'+ lang +'/'+ file)
						}
						list.push(translation);
						console.log("%s (%s)", file, path.extname(file));
					});
				});
			}
		},

		set: function (lang) {
			baselanguage = lang;
		},

		translate: function (toLanguage, data) {
			
		}
	}

}