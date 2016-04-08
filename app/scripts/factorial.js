module.exports = {
  factorial1: function(n) {
  	if(n==0){
  		return 1;
  	}
  	else {
  		return n*factorial1(n-1);
  	}
  }
};

