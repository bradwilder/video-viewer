import { Component, Input, OnDestroy } from '@angular/core';
import { TablePagerService } from './table-pager.service';
import { Subscription } from 'rxjs/Subscription';

@Component
({
	selector: 'app-table-pager',
	templateUrl: './table-pager.component.html',
	styleUrls: ['./table-pager.component.scss']
})
export class TablePagerComponent implements OnDestroy
{
	@Input() down = true;
	totalPagesSubsription: Subscription;
	currentPageOptions = [];
	
	constructor(private tablePagerService: TablePagerService)
	{
		this.totalPagesSubsription = this.tablePagerService.totalPagesChanged.subscribe(totalPages =>
		{
			this.currentPageOptions = [];
			for (let i = 1; i <= totalPages; i++)
			{
				this.currentPageOptions.push({key: i, value: i});
			}
		});
	}
	
	private getItems()
	{
		return this.wrapDropdownItems(TablePagerService.perPageValues);
	}
	
	private wrapDropdownItems(numbers: number[])
	{
		return numbers.map(number => {return {key: number, value: number};});
	}
	
	ngOnDestroy()
	{
		this.totalPagesSubsription.unsubscribe();
	}
}
