contract_address = '0x2f5d01e8cd881d78382c574683b58b63c018a138';
var contractInstance;
function initContract() {
	instance.owner = web3.eth.accounts[0];
	console.log(instance.owner);
	$("#contractAddress").html(contract_address);
	$("#contractOwner").html(instance.owner);
}
function registerLender(){
  lenderAddress = $("#lenderAddress").val();
  instance.registerLender({from: lenderAddress},function(){
    $("#registeredResult").html("Registered Successfully...!!!");
  });
}
function lendMoney(address,amount){
	instance.lend({from:address,value:amount},function(err,res){
		vij = web3.eth.getTransactionReceipt(res);
		console.log(JSON.stringify(vij));
		instance.Deposit(function(err,data){$("#getLendResult").html("Lend Successfully.."+JSON.stringify(data))});
	});
}
function withdrawMoney(address,amount){
	instance.withdrawFunds(amount,{from:address},function(err,res){
		vij = web3.eth.getTransactionReceipt(res);
		console.log(JSON.stringify(vij));
		$("#getWithdrawResult").html("Withdraw Successful.."+JSON.stringify(vij));
	});
}
function getBalance(address){
		instance.getBalance(address,{from:address},function(err,res){
				$("#getBalanceResult").html(web3.eth.getBalance(address).toNumber()+"(wei)");
		});
}
window.onload = function() {
	if (typeof web3 !== 'undefined') {
	    web3 = new Web3(web3.currentProvider);
	} else {
	    // set the provider you want from Web3.providers
	    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}
	if(!web3.isConnected()) {
	    console.error("Ethereum - no conection to RPC server");
	} else {
	    console.log("Ethereum - connected to RPC server");
	}
	ab ='[{"constant":false,"inputs":[{"name":"money","type":"uint256"}],"name":"withdrawFunds","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"borrowerBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lenders","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pay_debts","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"money","type":"uint256"}],"name":"borrow_money","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"registerLender","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"lend","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowers","outputs":[{"name":"amount","type":"uint256"},{"name":"borrowed","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"registerBorrower","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lenderBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"lender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"contract_bal","type":"uint256"},{"indexed":false,"name":"sender_addrs","type":"address"},{"indexed":false,"name":"sender_bal","type":"uint256"}],"name":"DebtPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"contract_bal","type":"uint256"},{"indexed":false,"name":"sender_addrs","type":"address"},{"indexed":false,"name":"sender_bal","type":"uint256"}],"name":"Money_Borrowed","type":"event"}]';

	abi = JSON.parse(ab);
	console.log(abi);
	SystemContract = web3.eth.contract(abi);
	instance = SystemContract.at(contract_address);
	console.log(web3.eth.accounts)
  initContract();

	$("#register").click(function() {
		var val = $("#lenderAddress").val();
		console.log("Lender's Address:"+val);
		registerLender();
	});
	$("#lend").click(function() {
		var val = $("#amount").val();
		var lenderAddress = $("#lenderAddress").val();
		$("#getLendResult").show();
		lendMoney(lenderAddress, web3.toWei(val));
	});
	$("#withdraw").click(function() {
		var val = $("#amount").val();
		var address = $("#withdrawAddress").val();
		$("#getWithdrawResult").show();
		withdrawMoney(address,web3.toWei(val));
	});
	$("#getBalance").click(function() {
		var val = $("#walletAddress").val();
		$("#getBalanceResult").show();
		getBalance(val);
	});
};
