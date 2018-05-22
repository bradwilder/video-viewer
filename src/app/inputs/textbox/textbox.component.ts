import { Component, Input } from '@angular/core';

@Component
({
	selector: 'app-textbox',
	templateUrl: './textbox.component.html',
	styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent
{
	@Input() text = '';
	@Input() enabled = true;
	@Input() placeholder = '';
	@Input() font = '';
	@Input() size = 50;
	@Input() name = 'app-textbox';
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
	}
}
