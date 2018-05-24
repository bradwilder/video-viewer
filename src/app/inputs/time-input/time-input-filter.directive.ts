import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive
({
	selector: '[app-number-input]'
})
export class TimeInputFilterDirective
{
	@Input() max: number = 0;
	
	constructor(private el: ElementRef) {}
	
	@HostListener('keydown', ['$event']) onKeyDown(event)
	{
		let e = <KeyboardEvent> event;
		
		if
		(
			[46, 8].includes(e.keyCode) ||       // Allow: backspace, delete
			(e.keyCode == 65 && e.ctrlKey) ||    // Allow: Ctrl+A
			(e.keyCode == 67 && e.ctrlKey) ||    // Allow: Ctrl+C
			(e.keyCode == 88 && e.ctrlKey) ||    // Allow: Ctrl+X
			(e.keyCode >= 35 && e.keyCode <= 40) // Allow: home, end, left, right, up, down
		)
		{
			return;
		}
		
		// Ensure that it is a number
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
		{
			e.preventDefault();
		}
		
		let nativeEl = this.el.nativeElement;
		let newValue = parseInt(nativeEl.value.substring(0, nativeEl.selectionStart) + String.fromCharCode(e.keyCode) + nativeEl.value.substring(nativeEl.selectionEnd, nativeEl.value.length));
		if (newValue > this.max)
		{
			e.preventDefault();
		}
	}
}