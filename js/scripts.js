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

function Ticket(movieName, releaseDate, time, show, age) {
  this.movieName = movieName,
  this.releaseDate = releaseDate,
  this.time = time,
  this.show = show,
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
var newCheckout = new Checkout();

function displayTicketDetails(checkout){
  var ticketList = $("#tickets");
  var htmlTicketsToDisplay = "";
  checkout.tickets.forEach(function(ticket){
    htmlTicketsToDisplay += buildTicketCard(ticket);
  });
  ticketList.html(htmlTicketsToDisplay);
}

function buildTicketCard(ticket){
  var markup = `
        <div id="$ID$" class="card">
          <div class="card-body">
            <button class="remove" type="button">X</button>
            <div class="card-text"><strong>$TITLE$</strong></div>
            <div class="card-text">$TIME$</div>
            <div class="card-text">$AGE$</div>
            <div class="card-text">$$COST$</div>
          </div>
        </div>
        `
  markup = markup.replace("$ID$", ticket.id);
  markup = markup.replace("$TITLE$", ticket.movieName);
  markup = markup.replace("$TIME$", ticket.show);
  markup = markup.replace("$AGE$", ticket.age);
  markup = markup.replace("$COST$", ticket.total);

  return markup;
}

function attachTicketRemoveListeners(){
  $("#tickets").on("click", ".remove", function(event){
    newCheckout.removeTicket(parseInt(event.target.closest(".card").id));
    displayTicketDetails(newCheckout);
  });
}

$(document).ready(function(){
  attachTicketRemoveListeners();

  $(".form").submit(function(event){
    event.preventDefault();
    var releaseDate = parseInt($("#title").val());
    var time = parseInt($("#time").val());
    var age = $("input:radio[name=age]:checked").val();
    var name = $("#title").find("option:selected").text();
    var show = $("#time").find("option:selected").text();

    if(age){
      var newMovie = new Ticket(name, releaseDate, time, show, age);
      newMovie.calcTicketPrice();
      newCheckout.addTicket(newMovie);
      newCheckout.updateTotal();
      displayTicketDetails(newCheckout);
    }
  });
});
