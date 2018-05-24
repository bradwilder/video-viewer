export class Video
{
	_id: string;
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
		const hours = Math.floor(video.time / 3600);
		const hoursStr = hours < 10 ? (hours === 0 ? '00' : '0' + hours) : hours;
		const minutes = Math.floor((video.time % 3600) / 60);
		const minutesStr = minutes < 10 ? (minutes === 0 ? '00' : '0' + minutes) : minutes;
		const seconds = video.time % 60;
		const secondsStr = seconds < 10 ? (seconds === 0 ? '00' : '0' + seconds) : seconds;
		
		return hoursStr + ':' + minutesStr + ':' + secondsStr;
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