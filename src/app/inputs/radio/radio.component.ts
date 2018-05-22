import { Component, Input } from '@angular/core';

@Component
({
	selector: 'app-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent
{
	@Input() data: Array<{key: string, value: string, checked: boolean}>;
	@Input() enabled = true;
	@Input() font = '';
	@Input() name = 'app-radio';
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
	}
}
