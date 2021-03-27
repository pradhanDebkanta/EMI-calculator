function calculateHomeLoanEMI(btnName) {
	var loanAmount = document.querySelector("#loanAmount").value;
	var interstRate = document.querySelector("#interestRate").value;
	var numberOfMonths = parseFloat(document.querySelector("#loanTerm").value);
	var x = document.querySelector('#ddlTermType').selectedIndex;
	var selectedTermType = document.getElementsByTagName("option")[x].value;

	var totalMonths;
	const maxRangeOfEMI = 30; // in year

	//THIS IS USE FOR REMOVE THE TABLE ROW THAT IS CREATED IN 1ST STEP
	//	IF I DON'T CLEAR THOSE TABLE ROW THEN THIS ROW WILL BE REMAIN THER AND SHOW NEXT TIME


	var tBodyRow = document.getElementById(btnName);
	var tbRowLen = tBodyRow.rows.length;
	let j = tbRowLen - 1;
	while (j >= 1) {
		tBodyRow.deleteRow(j);
		j--;

	}

	//	END HERE THE ABOVE CONDITION


	if (loanAmount <= 0 || interstRate <= 0 || numberOfMonths <= 0) {
		alert("Please Enter positive (+Ve) number");
		return false;
	}

	if (selectedTermType == "years") {
		numberOfMonths = numberOfMonths * 12;
		totalMonths = numberOfMonths; // my target is to pickup "totalMonths" value from here
		var decimal = numberOfMonths - Math.floor(numberOfMonths);
		if (decimal) {
			alert('Loan Term entered is incorrect!');
			return false;

		}
	} else {
		totalMonths = numberOfMonths; // my target is to pickup "totalMonths" value from here
	}

	if (!numberOfMonths || numberOfMonths > maxRangeOfEMI * 12) {
		alert(`Loan Term should not be more than ${maxRangeOfEMI*12} months or ${maxRangeOfEMI} years!`);
		//			document.querySelector("#loanTerm").val = '';
		return false;
	}

	// this under statement is working when above condition is not satisfied


	const monthlyInterestRatio = (interstRate / 12) / 100; // it is interest ratio of 1 rupee for 1 month
	const totalPrincipal = loanAmount;
	const power = Math.pow(1 + monthlyInterestRatio, totalMonths);
	const monthlyEmi = (totalPrincipal * monthlyInterestRatio * power) / (power - 1);
	const totalEmi = monthlyEmi * totalMonths;

	const monthlyPrincipalArray = []; // THIS IS THE PRINCIPAL AMOUNT THAT I PAY IN EVERY MONTH
	monthlyPrincipalArray[0] = 0;

	const otPrincipalArray = []; // THIS IS THE OUTSTANDING PRINCIPAL AMOUNT THAT I HAVE TO PAY IN REMAINING MONTH
	otPrincipalArray[0] = totalPrincipal;

	const monthlyInterestArray = []; // THIS IS THE INTEREST AMOUNT THAT I PAY IN EVERY MONTH
	monthlyInterestArray[0] = 0;


	for (let i = 1; i <= totalMonths; i++) {
		let interest = otPrincipalArray[i - 1] * monthlyInterestRatio;
		let monthlyPrincipal = monthlyEmi - interest;
		otPrincipalArray[i] = otPrincipalArray[i - 1] - monthlyPrincipal;
		monthlyInterestArray[i] = interest;
		monthlyPrincipalArray[i] = monthlyPrincipal;

	}


	// this is for creating table row

	//	tBodyRow.classList.remove('hidden');

	let count = 1;
	var row, cell0, cell1, cell2, cell3, cell4, cell5;
	for (count; count <= totalMonths; count++) {

		row = tBodyRow.insertRow(count);
		cell0 = row.insertCell(0);
		cell1 = row.insertCell(1);
		cell2 = row.insertCell(2);
		cell3 = row.insertCell(3);
		cell4 = row.insertCell(4);
		cell5 = row.insertCell(5);

		cell0.innerHTML = `${count}`; // THIS COLUMN IS COUNT NO: OF EMI
		cell1.innerHTML = `${monthlyEmi.toFixed(2)}`; // THIS COLUMN IS COUNT EMI
		cell2.innerHTML = `${monthlyPrincipalArray[count].toFixed(2)}`; // THIS COLUMN IS COUNT MONTHLY PRINCIPAL THAT I PAY IN EMI
		cell3.innerHTML = `${monthlyInterestArray[count].toFixed(2)}`; // THIS COLUMN IS COUNT MONTHLY INTEREST THAT I PAY IN EMI
		cell4.innerHTML = `${otPrincipalArray[count].toFixed(2)}`; // THIS COLUMN IS COUNT OUTSTANDING PRINCIPAL THAT I HAVE TO PAY
		cell5.innerHTML = `${(totalEmi-monthlyEmi*count).toFixed(2)}`; // THIS COLUMN IS COUNT OUTSTANDING EMI THAT I HAVE TO PAY
		row = row.classList.add("table-success");
	}
	row = tBodyRow.insertRow(count);
	cell0 = row.insertCell(0);
	cell1 = row.insertCell(1);
	cell2 = row.insertCell(2);
	cell3 = row.insertCell(3);
	cell4 = row.insertCell(4);
	cell5 = row.insertCell(5);
	cell0.innerHTML = "Total";
	cell1.innerHTML = `EMI: ${totalEmi.toFixed(2)}`;
	cell2.innerHTML =  `Principal: ${loanAmount}`;
	cell3.innerHTML = `Interest: ${(totalEmi-loanAmount).toFixed(2)}`;
	cell4.innerHTML = "----";
	cell5.innerHTML = "----";
	row = row.classList.add("table-info");


}

//THIS IS FOR RESET BUTTON

function reset(myTable) {
	//alert("Are you reset data?");
	document.getElementById('loanAmount').value = '';
	document.getElementById('interestRate').value = '';
	document.getElementById('loanTerm').value = '';
	let tableBody = document.getElementById(myTable);
	let tBodylen = tableBody.rows.length;
	let j = tBodylen - 1;
	while (j >= 1) {
		tableBody.deleteRow(j);
		j--;
	}
}
