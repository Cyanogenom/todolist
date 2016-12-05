System.register(["@angular/platform-browser-dynamic", "@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var platform_browser_dynamic_1, core_1;
    var eventStruct, eventShow, showAllEvents;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            eventStruct = (function () {
                function eventStruct(todo, deadline, done) {
                    if (todo === void 0) { todo = "Nothing"; }
                    if (deadline === void 0) { deadline = new Date(); }
                    if (done === void 0) { done = false; }
                    this.todo = todo;
                    this.deadline = deadline;
                    this.done = done;
                    this.days_to_deadline = (new Date()).valueOf() - (this.deadline).valueOf();
                    this.deadline_str = this.deadline.toDateString().substring(4) + " " + this.deadline.toTimeString().substring(0, 5);
                    var d = deadline.valueOf() - (new Date()).valueOf();
                    if (d <= 259200000) {
                        this.color_elem = 0;
                    }
                    else if (d <= 2 * 259200000) {
                        this.color_elem = 1;
                    }
                    else {
                        this.color_elem = 2;
                    }
                }
                return eventStruct;
            }());
            eventShow = (function () {
                function eventShow() {
                    this.event = new eventStruct();
                }
                eventShow.prototype.done = function () {
                    if (!this.event.done) {
                        this.event.done = true;
                        this.event.color_elem = 4;
                    }
                    else {
                        this.event.done = false;
                        var d = this.event.deadline.valueOf() - (new Date()).valueOf();
                        if (d <= 259200000) {
                            this.event.color_elem = 0;
                        }
                        else if (d <= 2 * 259200000) {
                            this.event.color_elem = 1;
                        }
                        else {
                            this.event.color_elem = 2;
                        }
                    }
                    return false;
                };
                eventShow = __decorate([
                    core_1.Component({
                        selector: "show-event",
                        inputs: ["event"],
                        template: "\n\t\t<div class=\"event_class {{ 'l' + event.color_elem }}\" >\n\t\t\t<a href (click) = \"done()\">\n\t\t\t\t<img src=\"{{ event.done ? 'img/check.png' : 'img/notcheck.png' }}\">\n\t\t\t</a>\n\t\t\t<p> {{event.todo}} </p>\n\t\t\t<h4>Deadline: {{event.deadline_str}} </h4>\n\t\t</div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], eventShow);
                return eventShow;
            }());
            showAllEvents = (function () {
                function showAllEvents() {
                    this.events = [new eventStruct()];
                }
                showAllEvents.prototype.sort_array = function () {
                    return this.events.sort(function (a, b) { return a.color_elem - b.color_elem; });
                };
                showAllEvents.prototype.add_event = function (new_event, new_date) {
                    var d;
                    if (new_date.value != "") {
                        d = (new Date(new_date.value));
                        d.setHours(d.getHours() - 3);
                    }
                    else {
                        d = (new Date());
                    }
                    this.events.push(new eventStruct(new_event.value != "" ? new_event.value : "Nothing", d));
                    new_event.value = "";
                    new_date.value = "";
                    this.events = this.sort_array();
                };
                showAllEvents = __decorate([
                    core_1.Component({
                        selector: "show-events",
                        directives: [eventShow],
                        template: "\n\t\t<show-event *ngFor=\"let event of events\" [event] = \"event\"></show-event>\n\t\t<form class=\"add_event\">\n\t\t<div class=\"add_field\">\n\t\t\t<label for=\"lb1\">ToDo: </label>\n\t\t\t<input type=\"text\" id=\"lb1\" #newtodo><br>\n\t\t</div>\n\t\t<div class=\"add_field\">\n\t\t\t<label for=\"lb2\">Deadline: </label>\n\t\t\t<input type=\"datetime-local\" id=\"lb2\" #newdate><br>\n\t\t</div>\t\n\n\t\t\t<button class=\"submit_button\" (click) = \"add_event(newtodo, newdate)\">\n\t\t\t\tAdd\n\t\t\t</button>\n\t\t</form>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], showAllEvents);
                return showAllEvents;
            }());
            platform_browser_dynamic_1.bootstrap(showAllEvents);
        }
    }
});
//# sourceMappingURL=app.js.map