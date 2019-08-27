// Back-End
function Checkout() {
  this.tickets = [],
  this.checkoutTotal = 0,
  this.currentId = 0
}

Checkout.prototype.assignId = function(){
  this.currentId += 1;
  return this.currentId;
}

Checkout.prototype.addTicket = function(ticket){
  ticket.id = this.assignId();
  this.tickets.push(ticket);
}

Checkout.prototype.updateTotal = function(){
  var total = 0;
  this.tickets.forEach(function(ticket){
      total += ticket.total;
  });
  this.checkoutTotal = total;
  return total;
}

Checkout.prototype.removeTicket = function(id){
  for(var i = 0; i < this.tickets.length; i++){
    if(this.tickets[i].id === id){
      var index = this.tickets.indexOf(this.tickets[i]);
      this.tickets.splice(index, 1);
    }
  }
}




function Ticket(releaseDate, time, age) {
  this.releaseDate = releaseDate,
  this.time = time,
  this.age = age,
  this.price = [0,0,0], // price array [base, time, age]
  this.total = 0
}

Ticket.prototype.calcTicketPrice = function(){
  this.addBasePrice();
  this.addTimePrice();
  this.addAgePrice();
  var total = 0;
  this.price.forEach(function(price){
    total += price;
  });
  this.total = total;
  return total;
}

Ticket.prototype.addBasePrice = function(){
  var releaseDate = this.releaseDate;
  if(releaseDate >= 20){
    this.price[0] = 1;
  } else if (releaseDate >= 5){
    this.price[0] = 3;
  } else {
    this.price[0] = 5;
  }
}

Ticket.prototype.addTimePrice = function(){
  var time = this.time;
  if(time <= 1100){
    this.price[1] = 1;
  } else if (time <= 1700){
    this.price[1] = 2;
  } else {
    this.price[1] = 3;
  }
}

Ticket.prototype.addAgePrice = function(){
  var ageType = this.age;
  if(ageType === "adult"){
    this.price[2] = 5;
  } else if(ageType === "child"){
    this.price[2] = 3;
  } else {
    this.price[2] = 2;
  }
}


// User Interface

$(document).ready(function(){

});
