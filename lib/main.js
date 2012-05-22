/*
 * Copyright (c) 2012, Clément MATHIEU
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const widgets = require("widget");
const clipboard = require("clipboard");
const self = require("self");
const tabs = require("tabs");

var format = function (pattern, items) {
    items = typeof items === 'object' ? items : Array.prototype.slice.call(arguments, 1);
    return pattern.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") {
            return "{";
        }
        if (m == "}}") {
            return "}";
        }
        return items[n];
    });

};
var widget = widgets.Widget({
    id:    "copyUrlW",
    label: "Copy title & url",
    contentURL: self.data.url("icon-copy.png"),
    onClick: function () {
        const tab = tabs.activeTab;
        clipboard.set(tab.title + " " + tab.url, "text");
        clipboard.set(format("<a href='{0}}'>{1}</a>", [tab.url, tab.title]), "html");
    }

});

exports.formats = format;
exports.widget  = widget;
