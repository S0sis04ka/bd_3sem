window.addEventListener('load', main, false);

id = 1;
key = 1;
zoo = [];
food_market = [];
diet = [];
var BUDGET;
var EXPENSES;
var CUR_DATE = -1;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function diet_node(product, id) {
	this.id = id;
	this.key = product.key;
	this.amount = product.amount;
	this.row;
}

function compare_by_profit(a, b) {
	return b.profit - a.profit;
}

function dateDifference(date2, date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function add_row_zoo(animal) {
	var table = table_zoo;
	var new_row = table.insertRow();

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.id);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.name);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.cost);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.amount);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var button_death = document.createElement("button");
	button_death.innerHTML = "Умер";
	new_cell.appendChild(button_death);

	button_death.onclick = function() {
		var table_z = table_zoo;
		var table_d = table_diet;
		for (var i = 0; i < zoo.length; i++) {
			if (zoo[i].id == animal.id) {
				zoo[i].amount--;
				if (zoo[i].amount <= 0) {
					table_z.deleteRow(i+1);
					zoo.splice(i, 1);

					for (var j = 0; j < diet.length; j++) {
						if (diet[j].id == animal.id) {
							table_d.deleteRow(diet[j].row);
							diet.splice(j, 1);
							for (var k = j; k < diet.length; k++) {
								diet[k].row--;
							}
							j--;
						}
					}
					console.log(diet);
				}
				else {
					table_z.rows[i+1].cells[3].innerHTML = zoo[i].amount;
				}
			}
		}
		update_expenses();
	}
}

function add_row_diet(diet_node) {
	var table = table_diet;
	var new_row = table.insertRow();

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(diet_node.id);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(diet_node.key);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(diet_node.amount);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(food_market[diet_node.key-1].cost);
	new_cell.appendChild(new_text);
}

function add_row_products(product) {
	var table = table_products;
	var new_row = table.insertRow();

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(product.key);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(product.name);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(product.cost);
	new_cell.appendChild(new_text);
}

function add_row_market(animal) {
	var table = table_market;
	var new_row = table.insertRow();

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.id);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.name);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(animal.cost);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var button_buy = document.createElement("button");
	button_buy.innerHTML = "Купить";
	new_cell.appendChild(button_buy);

	button_buy.onclick = function() {
		console.log("buy " + animal.name);
		if (BUDGET < animal.cost) {
			alert('Not enough money');
			return;
		}

		BUDGET -= animal.cost;
		budget_container.value = BUDGET;
		var found = false;
		for (var i = 0; i < zoo.length; i++) {
			if (zoo[i].id == animal.id) {
				zoo[i].amount++;
				var table = table_zoo;
				table.rows[i+1].cells[3].innerHTML = zoo[i].amount;

				found = true;
			}
		}

		if (!found) {
			zoo.push(animal);
			zoo[zoo.length-1].amount = 1;
			add_row_zoo(zoo[zoo.length-1]);

			for (var i = 0; i < animal.food.length; i++) {
				var found_in_diet = false;
				for (var j = 0; j < diet.length; j++) {
					if (animal.food[i].key == diet[j].key && animal.id == diet[j].id) {
						found_in_diet = true;
					}
				}

				if (!found_in_diet) {
					diet.push(new diet_node(animal.food[i], animal.id));
					diet[diet.length-1].row = diet.length;
					console.log(diet);
					add_row_diet(diet[diet.length-1]);
				}
			}
		}
		update_expenses();

	}

	var new_cell = new_row.insertCell();
	var button_sell = document.createElement("button");
	button_sell.innerHTML = "Продать";
	new_cell.appendChild(button_sell);

	button_sell.onclick = function() {
		console.log("sell " + animal.name);
		var table_z = table_zoo;
		var table_d = table_diet;
		var found = false;
		for (var i = 0; i < zoo.length; i++) {
			if (zoo[i].id == animal.id) {
				found = true;
				BUDGET += animal.cost;
				budget_container.value = BUDGET;
				zoo[i].amount--;
				if (zoo[i].amount <= 0) {
					table_z.deleteRow(i+1);
					zoo.splice(i, 1);

					for (var j = 0; j < diet.length; j++) {
						if (diet[j].id == animal.id) {
							table_d.deleteRow(diet[j].row);
							diet.splice(j, 1);
							for (var k = j; k < diet.length; k++) {
								diet[k].row--;
							}
							j--;
						}
					}
					console.log(diet);
				}
				else {
					table_z.rows[i+1].cells[3].innerHTML = zoo[i].amount;
				}
			}
		}
		if (!found) {
			alert('Nothing to sell');
		}
		update_expenses();
	}

	var new_cell = new_row.insertCell();
	var button_diet = document.createElement("button");
	button_diet.innerHTML = "Рацион";
	new_cell.appendChild(button_diet);

	button_diet.onclick = function() {
		var text = '';
		for (var i = 0; i < animal.food.length; i++) {
			text += (i+1) + ') ' + animal.food[i].name + ' ' + animal.food[i].amount + ' шт.\n';
		}
		alert(text);
	}
}

function product(key, name, cost) {
	this.key = key;
	this.name = name;
	this.cost = cost
}

function add_food_market(name, cost) {
	food_market.push(new product(key++, name, cost));
}

function animal_product(key, amount) {
	this.key = key;
	for (var i = 0; i < food_market.length; i++) {
		if (food_market[i].key == key) {
			this.name = food_market[i].name;
			this.cost = food_market[i].cost;
		}
	}
	this.amount = amount;
}

function animal(name, food, cost) {
	this.id = id;
	this.name = name;
	this.food = food;
	this.cost = cost;
	this.profit;
	this.amount = 1;
}

function animal_for_sale(zoo_copy_index, date) {
	this.zoo_copy_index = zoo_copy_index;
	this.date = date;
	this.amount = 0;
}

function update_adding_diet(new_product) {
	var table = add_animal_diet;
	var new_row = table.insertRow();

	var new_cell = new_row.insertCell();
	var new_text = document.createTextNode(new_product.name);
	new_cell.appendChild(new_text);

	var new_cell = new_row.insertCell();
	var new_number = document.createElement("number");
	new_cell.appendChild(new_number);

	var new_cell = new_row.insertCell();
	var new_check = document.createElement("radio");
	new_cell.appendChild(new_check);
}

function update_expenses() {
	EXPENSES = 0;
	console.log(zoo);
	for (var i = 0; i < zoo.length; i++) {
		var cur_animal = zoo[i];
		console.log(cur_animal);
		for (var j = 0; j < zoo[i].food.length; j++) {
			var cur_food = zoo[i].food[j];
			for (var k = 0; k < food_market.length; k++) {
				if (cur_food.key == food_market[k].key) {
					EXPENSES += food_market[k].cost * cur_food.amount * cur_animal.amount;
					console.log(EXPENSES);
				}
			}
		}
	}
	console.log(EXPENSES);
	expenses_span.innerHTML = EXPENSES;
}

function add_animal_market(name, cost) {
	var new_animal = new animal(name, [new animal_product(1 + Math.floor(Math.random() * food_market.length), Math.floor(Math.random() * 10) + 1),
			 new animal_product(1 + Math.floor(Math.random() * food_market.length), Math.floor(Math.random() * 10) + 1)], cost);
	add_row_market(new_animal);
	console.log(Math.floor(Math.random() * food_market.length + 1));
	id++;
}

function main() {
	console.log('connected');
	BUDGET = parseInt(budget_container.value);
	console.log(BUDGET);

	add_food_market('хлеб', 10);
	add_food_market('молоко', 5);
	add_food_market('солома', 15);
	add_food_market('корм', 18);
	add_food_market('трава', 20);
	add_food_market('вода', 15);
	add_food_market('мясо', 30);
	add_food_market('орехи', Math.floor(Math.random() * 60) + 1);
	add_food_market('морковь', Math.floor(Math.random() * 60) + 1);
	add_food_market('яблоко', Math.floor(Math.random() * 60) + 1);


	for (var i = 0; i < food_market.length; i++) {
		add_row_products(food_market[i]);
	}

	console.log(food_market);


	var market = [];
	var elephant = new animal('слон', [new animal_product(1, 1), new animal_product(2, 4)], 100);
	id++;
	var tiger = new animal('тигр', [new animal_product(3, 4), new animal_product(1, 2)], 50);
	id++;
	add_row_market(elephant);
	add_row_market(tiger);
	market.push(elephant);
	market.push(tiger);
	console.log(market);

	add_animal_market('жираф', 150);
	add_animal_market('пингвин', Math.floor(Math.random() * 500) + 1);
	add_animal_market('носорог', Math.floor(Math.random() * 500) + 1);
	add_animal_market('лев', Math.floor(Math.random() * 500) + 1);
	add_animal_market('попугай', Math.floor(Math.random() * 500) + 1);
	add_animal_market('волк', Math.floor(Math.random() * 500) + 1);
	add_animal_market('динозавр', Math.floor(Math.random() * 500) + 1);




	prediction_button.onclick = function() {
		console.log(BUDGET);
		cur_date = new Date(date.value);
		pay_date = new Date(cur_date.getFullYear() + 1 + '-01-01');
		var days_left = dateDifference(pay_date, cur_date);
		if (BUDGET < EXPENSES * days_left) {
			var needed_money = EXPENSES * days_left - BUDGET;
			var text;
			var animals_amount = 0;
			for (var i = 0; i < zoo.length; i++) {
				animals_amount += zoo[i].amount;
				zoo[i].profit = zoo[i].cost;
				for (var j = 0; j < zoo[i].food.length; j++) {
					zoo[i].profit += zoo[i].food[j].cost * zoo[i].food[j].amount * days_left;
				}
			}

			var min_amount_to_sell = Math.trunc(animals_amount * 0.3);
			var zoo_copy = zoo.slice();
			zoo_copy.sort(compare_by_profit);
			console.log(zoo_copy);
			console.log('min to sell:' + min_amount_to_sell);
			var sell_profit = 0;
			var count = 0;
			var animal_ind = 0;
			var sell_animals = [];
			var stop = false;
			while (!stop) {
				for (var i = 0; i < zoo_copy.length; i++) {
					sell_animals.push(new animal_for_sale(i, cur_date));
					for (var j = 0; j < zoo_copy[i].amount; j++) {
						sell_profit += zoo_copy[i].profit;
						sell_animals[i].amount++;
						count++;
						if (needed_money <= sell_profit || count >= min_amount_to_sell) {
							stop = true;
							break;
						}
					}
					if (stop) break;
				}
				
			}

			if (count > 0) {
				var last_animal_to_sell = sell_animals[sell_animals.length - 1];
				sell_animals[sell_animals.length - 1].amount--;
				if (sell_animals[sell_animals.length - 1].amount == 0) {
					sell_animals.splice(sell_animals.length - 1, 1);
				}

				var over_profit = sell_profit - needed_money;
				var leftover_days = 0;
				console.log(last_animal_to_sell);
				var last_animal_cost_daily = (zoo_copy[last_animal_to_sell.zoo_copy_index].profit - zoo_copy[last_animal_to_sell.zoo_copy_index].cost) / days_left; 
				while (over_profit - zoo_copy[last_animal_to_sell.zoo_copy_index].cost  >= last_animal_cost_daily) {
					over_profit -= last_animal_cost_daily;
					leftover_days++;
				}

				console.log('check:' + (sell_profit - last_animal_cost_daily * leftover_days));
				last_animal_to_sell.date = last_animal_to_sell.date.addDays(leftover_days - 1);
			}
			console.log(leftover_days);
			console.log(sell_animals);

			var text = '';
			for (var i = 0; i < sell_animals.length; i++) {
				text += 'Продать ' + sell_animals[i].amount + ' ' + zoo_copy[i].name + ' ' + 
							cur_date.getDate() + '/' + (cur_date.getMonth() + 1) + '/' + cur_date.getFullYear() + '\n';
			}

			if (count > 0) {
				text += 'Продать 1 ' + zoo_copy[last_animal_to_sell.zoo_copy_index].name + ' ' + 
							last_animal_to_sell.date.getDate() + '/' + (last_animal_to_sell.date.getMonth() + 1) + '/' + last_animal_to_sell.date.getFullYear() + '\n'
			}

			console.log(text);
			console.log(sell_profit);
			if (needed_money > sell_profit) {
				alert('Не хватает ' + needed_money + ' до конца года\n' + 'Ругательное письмо в мэрию');
			}
			else {
				alert('Не хватает ' + needed_money + ' до конца года\n' + 'Рекомендации:\n' + text);	
			}
		}
		else {
			alert('Денег до конца года хватает\n' + 'Благодарственное письмо в мэрию');
		}

	}

	date.onchange = function() {
		new_date = new Date(date.value);
		if (CUR_DATE != -1) {
			BUDGET -= EXPENSES * dateDifference(new_date, CUR_DATE);
			budget_container.value = BUDGET;
		}
		CUR_DATE = new_date;

	}

	// add_product_button.onclick = function() {
	// 	var new_food = new product(key++, add_product_name.value, add_product_cost.value);
	// 	add_row_products(new_food);
	// 	update_adding_diet(new_food);
	// 	add_product_name.value = "";
	// 	add_product_cost.value = "";
	// 	console.log('Добавлен продукт:');
	// 	console.log(new_food);
	// }

	budget_container.onchange = function() {
		BUDGET = parseInt(budget_container.value);
	}


}






