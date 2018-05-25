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
		return TablePagerService.getPerPageOptions();
	}
}
