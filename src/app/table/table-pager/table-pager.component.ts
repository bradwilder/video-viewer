import { Component, EventEmitter } from '@angular/core';
import { TablePagerService } from './table-pager.service';

@Component
({
	selector: 'app-table-pager',
	templateUrl: './table-pager.component.html',
	styleUrls: ['./table-pager.component.scss']
})
export class TablePagerComponent
{
	constructor(private tablePagerService: TablePagerService) {}
	
	private getItems()
	{
		return TablePagerService.getPerPageOptions();
	}
}
