import { Component, Input } from '@angular/core';
import { TablePagerService } from './table-pager.service';

@Component
({
	selector: 'app-table-pager',
	templateUrl: './table-pager.component.html',
	styleUrls: ['./table-pager.component.scss']
})
export class TablePagerComponent
{
	@Input() down = true;
	
	constructor(private tablePagerService: TablePagerService) {}
	
	private getItems()
	{
		return this.wrapDropdownItems(TablePagerService.perPageValues);
	}
	
	private wrapDropdownItems(numbers: number[])
	{
		return numbers.map(number => {return {key: number, value: number};});
	}
}
