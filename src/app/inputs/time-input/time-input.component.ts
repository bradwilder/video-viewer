import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component
({
	selector: 'app-time-input',
	templateUrl: './time-input.component.html',
	styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent
{
	@Input() hours: number = 0;
	@Input() minutes: number = 0;
	@Input() seconds: number = 0;
	@Input() tol: number = 0;
	@Input() enabled = true;
	@Input() font = '';
	@Output() hoursChange = new EventEmitter<number>();
	@Output() minutesChange = new EventEmitter<number>();
	@Output() secondsChange = new EventEmitter<number>();
	@Output() tolChange = new EventEmitter<number>();
	
	// setEnabled(enabled: boolean)
	// {
	// 	this.enabled = enabled;
	// 	this.onChange();
	// }
	
	onHoursChange()
	{
		this.hoursChange.emit(this.hours);
	}
	
	onMinutesChange()
	{
		this.minutesChange.emit(this.minutes);
	}
	
	onSecondsChange()
	{
		this.secondsChange.emit(this.seconds);
	}
	
	onTolChange()
	{
		this.tolChange.emit(this.tol);
	}
}
