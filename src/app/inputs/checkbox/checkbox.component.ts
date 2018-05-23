import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component
({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent
{
	@Input() checked = false;
	@Input() enabled = true;
	@Input() name = 'app-checkbox';
	@Output() checkedChange = new EventEmitter<boolean>();
	
	// setEnabled(enabled: boolean)
	// {
	// 	this.enabled = enabled;
	// 	this.onChange();
	// }
	
	onChange()
	{
		this.checkedChange.emit(this.checked);
	}
}
