export function counter(callback, wait_time){
  
  let time = 0
  // let end = false;
  
	let interval = setInterval(() => {
		time += 0.1
		time = parseFloat(time.toFixed(1))
		if(parseFloat(time.toFixed(1)) >= wait_time){
			if(callback){
				callback()
				clearInterval(interval)
			}
			
		}
	}, 100)

	return{
		stop: () => clearInterval(interval),
		gettime: ()=> parseFloat(time.toFixed(1))

	}
}


// module.exports = {counter}