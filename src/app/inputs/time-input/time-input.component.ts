import { Component, Input } from '@angular/core';

@Component
({
	selector: 'app-time-input',
	templateUrl: './time-input.component.html',
	styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent
{
	@Input() enabled = true;
	@Input() font = '';
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
	}
}
