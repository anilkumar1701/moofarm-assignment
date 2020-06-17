
var responses                                   = require('./responses');

exports.calcuateWalletPrices               = calcuateWalletPrices;


async function calcuateWalletPrices(req, res) {
	try {

    var deposit = req.body.deposit, bonus =req.body.bonus, winnings =req.body.winnings;

    var service_charge = req.body.service_charge;
    var  discount = req.body.discount;
    var temp_bonus = 0;
    var temp_deposit = 0;


    // if(bonus == 0 || deposit == 0)   return responses.balanceCheck(res);

    service_charge = (service_charge - (service_charge * (discount/100)));
    var bonus_can_be_use = service_charge*0.1


    var wallet = (deposit + (service_charge * (10/100)) + winnings);
    if(wallet >=  service_charge){
        wallet = wallet;
    }else{
        return responses.balanceCheck(res);
    }

    var deducted_bonus = 0, deducted_deposit =0, deducted_winning =0, final_price =0;

    if(bonus && bonus >= bonus_can_be_use) {
        bonus = bonus - bonus_can_be_use;
    }
    else{
       temp_bonus = Math.abs(bonus_can_be_use - bonus);     
       bonus = 0;
    }
let depositcopy = JSON.parse(JSON.stringify(deposit));
    if(bonus>0){
        deposit = (depositcopy - (service_charge - bonus_can_be_use)) < 0 ? 0 : (depositcopy - (service_charge - bonus_can_be_use)); 
        temp_deposit = (depositcopy - (service_charge - bonus_can_be_use)) < 0 ? Math.abs((depositcopy - (service_charge - bonus_can_be_use))) : 0;
    }
    else{
        deposit = (depositcopy - (service_charge -  bonus_can_be_use  + temp_bonus)) < 0 ? 0 : (depositcopy - (service_charge - bonus_can_be_use  + temp_bonus)); 
        temp_deposit = (depositcopy - (service_charge - bonus_can_be_use + temp_bonus)) < 0 ? Math.abs((depositcopy - (service_charge - bonus_can_be_use + temp_bonus))) : 0;
    }

    if(deposit == 0 && temp_deposit > 0) {
        winnings = winnings - temp_deposit;
    }

    final_price =  bonus + deposit + winnings;


    return responses.actionCompleteResponse(res, {bonus : bonus.toFixed(2), deposit: deposit.toFixed(2), winnings: winnings.toFixed(2), total : final_price.toFixed(2)});

	} catch (error) {
        responses.somethingWentWrongError(res);
	}
}