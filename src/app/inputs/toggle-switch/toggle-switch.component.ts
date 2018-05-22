import { Component, Input } from '@angular/core';

@Component
({
	selector: 'app-toggle-switch',
	templateUrl: './toggle-switch.component.html',
	styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent
{
	@Input() on = false;
	@Input() enabled = true;
	@Input() name = 'app-toggle-switch';
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
	}
}
