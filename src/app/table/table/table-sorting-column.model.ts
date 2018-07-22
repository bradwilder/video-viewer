export class TableSortingColumn
{
	name: string;
	private sortFunction: (objectA, objectB) => number;
	
	constructor(name: string, sortFunction: (objectA, objectB) => number)
	{
		this.name = name;
		this.sortFunction = sortFunction;
	}
	
	getSortFunction(asc: boolean): (objectA, objectB) => number
	{
		if (asc)
		{
			return (objectA, objectB) => this.sortFunction(objectA, objectB);
		}
		else
		{
			return (objectA, objectB) => this.sortFunction(objectB, objectA);
		}
	}
}