setInterval(function() {
	console.log("ratilla")
},100)


$(document).ready(function(){
	var total=8;

	var offset=25;
	var fromWhere=1;
	var toWhere=0;
	var page=0;
	var pages=fromWhere+'-'+toWhere+'/'+total;
	var lastPage=total/25;
	lastPage=Math.ceil(lastPage);

	if(total>offset){
		toWhere=1*offset;
	}else{
		toWhere=total;
	}

	for(i=1;i<lastPage+1;i++){
		x='<span class="bar bar_click">'+i+'</span>';
		$('#page_list').append(x);
	}

	$('.bar_click').click(function(){ 
		page=$(this).html()-1;
		fromWhere=page*offset;
		toWhere=fromWhere+offset;
		$.post( "coinflip.php", {action: "history", page: page }, function( data ) {
			data=JSON.parse(data);
			$('#all_his_list').html('<table class="table"><tr><th>Status</th><th>Bet value</th><th>Win</th><th>Date</th></tr></table>');
			for(i=0; i<data.length; i++){
				
						$('#all_his_list table').append('<tr><td>'+data[i]['status']+'</td><td>'+data[i]['bet']+'</td><td>'+data[i]['profit']+'</td><td>'+data[i]['date']+'</td></tr>');
				
			}
			$('#all_his_list').append('</table>');
		});
		fromWhere++;
		pages=fromWhere+'-'+toWhere+'/'+total;
		$('#pages_test').html(pages);
	});

	$.post( "coinflip.php", {action: "history", page: page }, function( data ) {
		data=JSON.parse(data);
		$('#all_his_list').html('<table class="table"><tr><th>Status</th><th>Bet value</th><th>Win</th><th>Date</th></tr></table>');
			for(i=0; i<data.length; i++){
				
						$('#all_his_list table').append('<tr><td>'+data[i]['status']+'</td><td>'+data[i]['bet']+'</td><td>'+data[i]['profit']+'</td><td>'+data[i]['date']+'</td></tr>');
				
			}
		$('#all_his_list').append('</table>');
	});

	pages=fromWhere+'-'+toWhere+'/'+total;
	$('#pages_test').html(pages);


	$('#page_left').click(function(){
		if(page>0){
			page--;
			fromWhere-=offset;
			toWhere=fromWhere+offset;
			$.post( "coinflip.php", {action: "history", page: page }, function( data ) {
				data=JSON.parse(data);
			$('#all_his_list').html('<table class="table"><tr><th>Status</th><th>Bet value</th><th>Win</th><th>Date</th></tr></table>');
			for(i=0; i<data.length; i++){
				
						$('#all_his_list table').append('<tr><td>'+data[i]['status']+'</td><td>'+data[i]['bet']+'</td><td>'+data[i]['profit']+'</td><td>'+data[i]['date']+'</td></tr>');
				
			}
				$('#all_his_list').append('</table>');
			});
			pages=fromWhere+'-'+toWhere+'/'+total;
			$('#pages_test').html(pages);
		}
	});

	$('#page_right').click(function(){
		if(page<lastPage-1){
			page++;
			fromWhere+=offset;
			toWhere=fromWhere+offset;
			if(toWhere>total){
				toWhere=total;
			}
			$.post( "coinflip.php", {action: "history", page: page }, function( data ) {
				data=JSON.parse(data);
				$('#all_his_list').html('<table class="table"><tr><th>Status</th><th>Bet value</th><th>Win</th><th>Date</th></tr></table>');
			for(i=0; i<data.length; i++){
				
						$('#all_his_list table').append('<tr><td>'+data[i]['status']+'</td><td>'+data[i]['bet']+'</td><td>'+data[i]['profit']+'</td><td>'+data[i]['date']+'</td></tr>');
				
			}
				pages=fromWhere+'-'+toWhere+'/'+total;
				$('#pages_test').html(pages);
			});
		}
	});


});




var last_bet=0;
var flipCoinHistory = 0;
var flipCoinFullHistory = [{"0":"0.05","1":"lose","2":"2019-04-13 23:15:32","profit":0,"status":"Loss"},{"0":"0.05","1":"lose","2":"2019-04-13 23:15:36","profit":0,"status":"Loss"},{"0":"0.05","1":"lose","2":"2019-04-13 23:15:39","profit":0,"status":"Loss"},{"0":"0.05","1":"lose","2":"2019-04-13 23:15:42","profit":0,"status":"Loss"},{"0":"0.1","1":"lose","2":"2019-04-13 23:20:43","profit":0,"status":"Loss"},{"0":"0.1","1":"lose","2":"2019-04-13 23:35:07","profit":0,"status":"Loss"},{"0":"0.05","1":"win","2":"2019-04-14 00:02:51","profit":0,"status":"Loss"},{"0":"0.1","1":"lose","2":"2019-04-14 00:06:20","profit":0,"status":"Loss"}];
var i;

$( document ).ready(function() {

$('.bets_history').addClass('vis_his_tab');
$('#cur_his_btn').addClass('vis_his_btn');

});


var avalible_saldo=10.10;




$(function(){
	var flip_status = false;
	$('.coinflip_start').click(function(){
		if((!$('.coinflip_container_coin_head').hasClass('coin_selected') && !$('.coinflip_container_coin_tail').hasClass('coin_selected')) || parseFloat($('#user_saldo').text())<parseFloat($('#user_bet_value').val())){
			if(parseFloat(avalible_saldo)>parseFloat($('#user_bet_value').val())){
				$( ".coinflip_information" ).removeClass('lossing').removeClass('winning').addClass('aa').html('Eres una rata.');
			}else{
				$( ".coinflip_information" ).removeClass('lossing').removeClass('winning').addClass('aa').html('You need to pick the coin first');
			}
			
			$('.coinflip_start').addClass('shake_anim');
			setTimeout(function(){
				$('.coinflip_start').removeClass('shake_anim');
			}, 300);
		}else if(($('.coinflip_start').attr('data-type')=='head' || $('.coinflip_start').attr('data-type')=='tail') && $('.coinflip_start').hasClass('bet_ready')){
			last_bet=$('.coinflip_play').find('input').val();

			if(flip_status===false)
			{
				flip_status = true;
				var typed = $(this).data('type');
				$('.coinflip_result > img').attr('src','/img/coinflip_rzut.gif?2');
				setTimeout(function(){
					$('.coinflip_start').addClass('flip_anim');
					setTimeout(function(){
						$('.coinflip_start').removeClass('flip_anim');
					}, 300);
				}, 300);

				$.post( "coinflip.php", { data: $('.coinflip_start').attr('data-type') , action: "flip", bet: last_bet }, function( data ) {
 					data=JSON.parse(data);
					$( ".coinflip_information" ).html( data.info );
					flip_status = false;

					if(data.status=='lose'){
					setTimeout(function(){
							$('.dwarf').attr('src','/img/coinflip_lose.png?10');
							setTimeout(function(){
								$('.dwarf').attr('src','/img/coinflip_skrzat.gif?10');
							}, 1500);
						$('.coinflip_information').removeClass('winning').addClass('aa').addClass('aa');
						$('.loses').text(parseInt($('.loses').text())+1);
						$('#user_saldo').text(data.new_balance);
						
						$('.bets_history tbody').prepend('<tr><td>'+data.status_text+'</td><td>'+last_bet+'</td><td>'+data.profit+'</td><td>'+data.date+'</td></tr>');
						// $('#all_his').prepend('lost '+last_bet+'</p>');
					}, 700);

					}else if(data.status=='win'){
						setTimeout(function(){
								$('.dwarf').attr('src','/img/coinflip_win.png?10');
								setTimeout(function(){
									$('.dwarf').attr('src','/img/coinflip_skrzat.gif?10');
						}, 2500);
						$('.coinflip_information').removeClass('lossing').addClass('aa').addClass('aa');
						$('.wins').text(parseInt($('.wins').text())+1);
						$('#user_saldo').text(data.new_balance);
						$('.bets_history tbody').prepend('<tr><td>'+data.status_text+'</td><td>'+last_bet+'</td><td>'+data.profit+'</td><td>'+data.date+'</td></tr>');
						// $('#all_his').prepend('<p>won '+last_bet+'</p>');
					}, 700);

					}else if(data.status=='not_enough_money')
					{
						$('.coinflip_information').removeClass('lossing').removeClass('winning').addClass('aa');
						$('.coinflip_information').html('You don\'t have enough money.');
					}else if(data.status=='too_big_amount')
					{
						$('.coinflip_information').removeClass('lossing').removeClass('winning').addClass('aa');
						$('.coinflip_information').html('The bet amount must not be greater than 50$.');
					}else if(data.status=='too_low_amount')
					{
						$('.coinflip_information').removeClass('lossing').removeClass('winning').addClass('aa');
						$('.coinflip_information').html('The bet amount must not be smaller than 0.05$.');
					}
					//$('.vis_his_tab').animate({ scrollTop: $('.vis_his_tab')[0].scrollHeight}, 1000);
				});


			}
			else
			{
				$( ".coinflip_information" ).html('Wait for results' );
			}
		}else{

		}

	});

	$('.coinflip_container_coin_head').click(function(){
		if(avalible_saldo>0){
				if($( ".coinflip_information" ).html()=='You need to pick the coin first')
			{
				$( ".coinflip_information" ).html('');
			}
			if($(this).hasClass('coin_selected')){
				$(this).removeClass('coin_selected');
				$('.coinflip_start').removeClass('bet_ready');
		    $('.user_bet').text('');
				$('.user_bet_diplay').css('opacity','0');
				$('.user_on').text('');
				$('.coinflip_start').attr('data-type','');
			}else{
				$('.coin_selected').removeClass('coin_selected');
				$(this).addClass('coin_selected');
				$('.coinflip_start').addClass('bet_ready');
		    $('.user_bet').text($('.coinflip_play').find('input').val());
				$('.user_bet_diplay').css('opacity','1');
				$('.user_on').text('head');
				$('.coinflip_start').attr('data-type','head');
			}
		}else{
			
		}
	});

	$('.coinflip_container_coin_tail').click(function(){
		if(avalible_saldo>0){
			if($( ".coinflip_information" ).html()=='You need to pick the coin first')
			{
				$( ".coinflip_information" ).html('');
			}
			if($(this).hasClass('coin_selected')){
				$(this).removeClass('coin_selected');
				$('.coinflip_start').removeClass('bet_ready');
		    $('.user_bet').text('');
				$('.user_bet_diplay').css('opacity','0');
				$('.user_on').text('');
				$('.coinflip_start').attr('data-type','');
			}else{
				$('.coin_selected').removeClass('coin_selected');
				$(this).addClass('coin_selected');
				$('.coinflip_start').addClass('bet_ready');
		    $('.user_bet').text($('.coinflip_play').find('input').val());
				$('.user_bet_diplay').css('opacity','1');
				$('.coinflip_start').attr('data-type','tail');
				$('.user_on').text('tail');
			}
		}else{
			
		}
	});

	$('#user_bet_value').on('input',function(e){
		if($('.coinflip_play').find('input').val()>50)
		{
			$('.coinflip_start').addClass('shake_anim');
			setTimeout(function(){
				$('.coinflip_start').removeClass('shake_anim');
			}, 300);
			$( ".coinflip_information" ).removeClass('lossing').removeClass('winning').addClass('aa').html('The bet amount must not be greater than 50$.');
			// $('.coinflip_play').find('input').val(50);
		}else if($('.coinflip_play').find('input').val()<0.05){
			$('.coinflip_start').addClass('shake_anim');
			setTimeout(function(){
				$('.coinflip_start').removeClass('shake_anim');
			}, 300);
			$( ".coinflip_information" ).html('The bet amount must not be smaller than 0.05$.');
			// $('.coinflip_play').find('input').val(0.05);
		}else{
			$('.user_bet').text($('.coinflip_play').find('input').val());
			if($( ".coinflip_information" ).html()=='The bet amount must not be greater than 50$.' || $( ".coinflip_information" ).html()=='The bet amount must not be smaller than 0.05$.')
			{
				$( ".coinflip_information" ).html('');
			}
		}
	});

	$('#user_bet_value').focus(function(){
		$('.coinflip_start').removeClass('bet_ready');
	});


	$('#user_bet_value').on('focusout',function(e){
		if($('.coinflip_play').find('input').val()<0.05 || $('.coinflip_play').find('input').val()>50){
			// $('.coin_selected').removeClass('coin_selected');
			// $('.user_bet_diplay').css('opacity','0');
			$('.coinflip_start').addClass('shake_anim');
			setTimeout(function(){
				$('.coinflip_start').removeClass('shake_anim');
			}, 300);
			if($('.coinflip_play').find('input').val()<0.05){
				$( ".coinflip_information" ).html('The bet amount must not be smaller than 0.05$.');
			}else{
				$( ".coinflip_information" ).html('The bet amount must not be greater than 50$.');
			}
			if(last_bet==0){
				// $('.coinflip_play').find('input').val(0.01);
			}else{
				// $('.coinflip_play').find('input').val(last_bet);
			}
		}else{
			$('.coinflip_start').addClass('bet_ready');
		}
	});


});
$(document).ready(function(){
		$('#user_bet_value').focus(function(){

		});
Math.round
	$('.tabcontent').css('min-height',Math.round($('.coinflip_container').outerHeight()/2)+'px');


});

function bet_not_ready(){
	$('.coinflip_start').removeClass('bet_ready');
}


function his_tab(where,what){
	$('.vis_his_btn').removeClass('vis_his_btn');
	$(what).addClass('vis_his_btn');
	$('.vis_his_tab').removeClass('vis_his_tab');
	$(where).addClass('vis_his_tab');
}