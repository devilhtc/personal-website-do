import axios from 'axios'


var educationList = []
axios.get('/data/education')
	.then( (response) => {
		console.log(response.data)
		educationList = response.data
	})
	.catch( (err) => {
		console.log(err)
	})
	
export default educationList


/*

const educationList = [
	{
		title: "Stanford University",
		description: [
			"EE MS, 2016 - Present",
			"GPA 3.89"
		],
		bgImgUrl: "/static/img/schools/stanford-logo.png",
		links: {
		}
	},
	{
		title: "Duke University",
		description: [
			"Physics BS, 2014 - 2016",
			"GPA 3.93",
			"Graduated with High Extinction"
		],
		bgImgUrl: "/static/img/schools/duke-logo.png",
		links: {
		}
	},
	{
		title: "Shanghai Jiao Tong University",
		description: [
			"Physics BS, 2012 - 2014",
			"GPA 3.84",
			"Ranked 1/72"
		],
		bgImgUrl: "/static/img/schools/sjtu-logo.png",
		links: {
		}
	}
]
*/