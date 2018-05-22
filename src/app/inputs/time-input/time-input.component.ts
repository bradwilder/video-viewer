import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component
({
	selector: 'app-time-input',
	templateUrl: './time-input.component.html',
	styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent
{
	@Input() value: {time: number, tol: number} = {time: 0, tol: 0}
	@Input() enabled = true;
	@Input() font = '';
	@Output() changed = new EventEmitter<{time: number, tol: number}>();
	private hours = 0;
	private minutes = 0;
	private seconds = 0;
	private tol = 0;
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
		this.onChange();
	}
	
	onHourChanged()
	{
		this.updateValue();
		this.onChange();
	}
	
	onMinuteChanged()
	{
		this.updateValue();
		this.onChange();
	}
	
	onSecondChanged()
	{
		this.updateValue();
		this.onChange();
	}
	
	onTolChanged()
	{
		this.updateValue();
		this.onChange();
	}
	
	updateValue()
	{
		this.value.time = this.hours * 3600 + this.minutes * 60 + this.seconds;
		this.value.tol = this.tol;
	}
	
	onChange()
	{
		this.changed.emit(this.value);
	}
}
