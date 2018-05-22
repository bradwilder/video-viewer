export class Video
{
	fileName: string;
	fileSize: number;
	lastModified: Date;
	width: number;
	height: number;
	time: number;
	pending: boolean;
	series: string;
	
	static getDisplayName(video: Video)
	{
		return video.fileName.slice(0,-4);
	}
	
	static getDisplayTime(video: Video)
	{
		var date = new Date();
		date.setSeconds(video.time);
		return date.toISOString().substr(11, 8);
	}
	
	static getLastModified(video: Video)
	{
		var date = new Date(video.lastModified);
		var month = date.getMonth() + 1;
		var monthStr = month < 10 ? '0' + month : month;
		
		var day = date.getDate();
		var dayStr = day < 10 ? '0' + day : day;
		
		return monthStr + "/" + dayStr + "/" + date.getFullYear();
	}
}