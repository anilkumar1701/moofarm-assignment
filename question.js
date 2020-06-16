var responses                                   = require('./responses');

exports.findLeastSum               = findLeastSum;


async function findLeastSum(req, res) {
	try {
        console.log('aaaaaaa', req.body.numbers)
        let numbers = req.body.numbers;
        numbers = (Array.from(numbers, x => parseInt(x))).sort(function(a,b){return a-b});
        const split = req.body.split;
        var sub = [];
        var result  = 0;

        for(let i=0; i<numbers.length; i++){
            sub[i]  = Math.pow(numbers[i+1], 2) -  Math.pow(numbers[i], 2)
        }

        for(let j=0; j  < numbers.length-split; j++){
            result+= sub[j];
        }


    return responses.actionCompleteResponse(res, result);

	} catch (error) {
        console.log(error, error)
        responses.somethingWentWrongError(res);
	}
}