import { Subject } from "rxjs/Subject";
import { TableSortingColumn } from "./table-sorting-column.model";

export class TableSortingService
{
	private sortedColumn: string;
	private sortedAsc: boolean;
	sortingChanged = new Subject<void>();
	
	private sortingColumns = {};
	
	addSortingColumn(column: TableSortingColumn, defaultSortOrder?: boolean)
	{
		this.removeSortingColumn(column.name);
		this.sortingColumns[column.name] = column;
		
		if (typeof defaultSortOrder !== 'undefined')
		{
			this.sortedColumn = column.name;
			this.sortedAsc = defaultSortOrder;
		}
	}
	
	private removeSortingColumn(name: string)
	{
		delete this.sortingColumns[name];
	}
	
	headerClicked(column: string)
	{
		if (this.sortedColumn === column)
		{
			this.sortedAsc = !this.sortedAsc;
		}
		else
		{
			this.sortedColumn = column;
		}
		this.sortingChanged.next();
	}
	
	sort(objects: Object[]): Object[]
	{
		if (this.sortedColumn)
		{
			let column = this.sortingColumns[this.sortedColumn];
			return objects.sort(column.getSortFunction(this.sortedAsc));
		}
	}
}