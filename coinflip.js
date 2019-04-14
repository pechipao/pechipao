setTimeout(function() {
	var hola = setInterval(function() {
		console.log("hola2");
	},1000)
	
	var accountBalance = 0;
	
	function validateBetMessage(bet) {
		var parsedBet = parseInt(bet);
	
		if (isNaN(parsedBet) || !isFinite(bet) || bet % 1 !== 0 )
			return "Not a valid number.";
		return "ok";
	}
	
	function playAgain() {
		$('#play-again').hide();
	 
		flipBack("tails");
		$("#result").delay(550).fadeOut(200, function () {
			$("#betCoins").fadeIn(200, function () {
			});
		});
	
		return false;
	}
	
	function maskBet() {
		var valid = "0123456789",
			strVal = $('#bet').val();
		if (valid.indexOf(strVal.substring(strVal.length - 1, strVal.length)) == "-1")
			$('#bet').val(strVal.substring(0, strVal.length - 1));
	
		validateBet();
	}
	
	function validateBet() {
		var bet = $('#bet').val();
	
		var ok = validateBetMessage(bet);
		if (ok != 'ok') {
			$("#betError").html(ok);
			return false;
		}
		$("#betError").html('');
	
		return true;
	}
	
	function flipFlip(side, top) {
		$('#flip-tails').css('background-position', '0px ' + top + 'px');
	}
	
	function flipResult(side) {
		var top    = 0,
			height = 300,
			time   = 0;
	
		$('#flip-activated').hide();
	
		$('#flip-' + side).css('background-position', '0px 0px')
		$('#flip-' + side).show();
	
		for (var i = 0; i <= 12; i++) {
			time = time + 80;
			setTimeout("flipFlip('" + side + "'," + top + ");", time);
			top = top - height;
		}
	}
	
	function flipBack(side) {
		var top    = -3600,
			height = 300,
			time   = 0;
	
		$('#flip-activated').hide();
	
		for (var i = 0; i <= 12; i++) {
			time = time + 80;
			top = top + height;
			setTimeout("flipFlip('" + side + "'," + top + ");", time);
		}
	
		setTimeout("$('#flip-standing').show();", time)
	}
	
	$(document).ready(function () {
	
		$('#bet').keyup(maskBet);
		$('#play-again').delegate('a', 'click', playAgain);
	
	
		accountBalance = 100000;
		validateBet();
	
	
		$(document).delegate('.playGameLink', 'click', function (e) {
			e.preventDefault();
	
			// if we already have an ajax request pending, then don't try again
	
			// parse the bet
			var bet   = $('#bet').val(),
				guess = "tails",
				url   = $(this).attr('href');
	
			bet = parseInt(bet);
	
			if (!validateBet(bet))
				return;
	
			// Wait for completion.  Disallows multiple invisible bets.
	
			// Fade the coins out and show the "flipping" text
			var fadeDuration = 200;
	
			$('#flip-standing').hide();
			$('#flip-activated').show();
	
			$('.selectedBalance').html("<b>"+(accountBalance-bet)+"</b> BAPs Available"); //DEDUCT BET FROM BALANCE
	
	
			$("#betCoins").fadeOut(fadeDuration, function () {
				$("#result").html('You called, "' + guess.toUpperCase() + '!"');
				$("#result").show();
			});
	
			$.ajax({
				url: url,
				type: 'post',
				data: {
					bet: bet,
					guess: "tails"
				},
				dataType: 'json',
				success: function (data) {
					//$('#flipActivated').hide();
						flipResult("tails");
	
						$('#play-again').attr('side', "tails");
						$("#result").delay(550).hide();
						$("#result").html(data.resultHTML);
						$("#result").fadeIn(fadeDuration, function () {
	
							$('.selectedBalance').html("<b>"+(100000)+"</b> BAPs Available"); //ADD PAYOUT
	
							accountBalance = 100000;
	
							$('#totalPlays').html(Number(data["plays"]).toNumber());
							$('#totalPrizes').html(Number(data["prizes"]).toNumber());
							$('.lastPlays').html(data.latestPlays);
	
							$('#play-again').show();
						});
				},
				error:function (jqXHR, textStatus, errorThrown) {
					console.log("AJAX error:" + textStatus );
					$('#result').html(errorThrown);
				},
				complete:function () {
					validateBet();
				}
			});
		})
	});
},1000)