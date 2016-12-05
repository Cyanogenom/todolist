import { bootstrap } from "@angular/platform-browser-dynamic";
import { Component } from "@angular/core";

class eventStruct
{
	todo: string;
	deadline: Date;
	done: boolean;
	days_to_deadline: number;
	deadline_str: string;
	color_elem: number;

	constructor(todo = "Nothing", deadline = new Date(), done = false)
	{
		this.todo = todo;
		this.deadline = deadline;
		this.done = done;
		this.days_to_deadline = (new Date()).valueOf() - (this.deadline).valueOf();
		this.deadline_str = this.deadline.toDateString().substring(4) + " " + this.deadline.toTimeString().substring(0,5);
		var d: number = deadline.valueOf() - (new Date()).valueOf();
		if(d <= 259200000)
		{
			this.color_elem = 0;
		}
		else if(d <= 2*259200000)
		{
			this.color_elem = 1;
		}
		else
		{
			this.color_elem = 2;
		}
	}
}

@Component(
{
	selector: "show-event",
	inputs: ["event"],
	template: `
		<div class="event_class {{ 'l' + event.color_elem }}" >
			<a href (click) = "done()">
				<img src="{{ event.done ? 'img/check.png' : 'img/notcheck.png' }}">
			</a>
			<p> {{event.todo}} </p>
			<h4>Deadline: {{event.deadline_str}} </h4>
		</div>
	`
})
class eventShow
{
	event: eventStruct;
	constructor()
	{
		this.event = new eventStruct();
	}

	done(): boolean
	{
		if(!this.event.done)
		{
			this.event.done = true;
			this.event.color_elem = 4;
		}
		else
		{
			this.event.done = false;
			var d: number = this.event.deadline.valueOf() - (new Date()).valueOf();
			if(d <= 259200000)
			{
				this.event.color_elem = 0;
			}
			else if(d <= 2*259200000)
			{
				this.event.color_elem = 1;
			}
			else
			{
				this.event.color_elem = 2;
			}
		}
		return false;
	}
}

@Component(
{
	selector: "show-events",
	directives: [eventShow],
	template: `
		<show-event *ngFor="let event of events" [event] = "event"></show-event>
		<form class="add_event">
		<div class="add_field">
			<label for="lb1">ToDo: </label>
			<input type="text" id="lb1" #newtodo><br>
		</div>
		<div class="add_field">
			<label for="lb2">Deadline: </label>
			<input type="datetime-local" id="lb2" #newdate><br>
		</div>	

			<button class="submit_button" (click) = "add_event(newtodo, newdate)">
				Add
			</button>
		</form>
	`
})
class showAllEvents
{
	events: eventStruct[];
	constructor()
	{
		this.events = [new eventStruct()];
	}

	sort_array(): eventStruct[]
	{
		return this.events.sort((a: eventStruct, b: eventStruct) => a.color_elem - b.color_elem);
	}

	add_event(new_event: HTMLInputElement, new_date: HTMLInputElement): void
	{
		var d: Date;
		if(new_date.value != "")
		{
			d = (new Date(new_date.value));
			d.setHours(d.getHours()-3);
		}
		else
		{
			d = (new Date());	
		} 
		this.events.push(new eventStruct(new_event.value != "" ? new_event.value : "Nothing", d));
		new_event.value = "";
		new_date.value = "";
		this.events = this.sort_array();
	}
}

bootstrap(showAllEvents);