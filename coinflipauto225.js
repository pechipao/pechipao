var input = document.getElementById("user_bet_value");
var boton = document.getElementsByClassName("coinflip_container_coin_play coinflip_start bet_ready")[0];
var texto = document.getElementsByClassName("coinflip_information aa")[0];
var nivel = 0;

function automatizar() {
    boton.click();
    if (texto.innerHTML == "Unfortunately you lose. Try again.") {
        document.getElementById("user_bet_value").value = "0.06";
        setTimeout(function() {
            if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                document.getElementById("user_bet_value").value = "0.11";
                boton.click();
                setTimeout(function() {
                    if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                        document.getElementById("user_bet_value").value = "0.22";
                        boton.click();
                        setTimeout(function() {
                            if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                                document.getElementById("user_bet_value").value = "0.44";
                                boton.click();
                                setTimeout(function() {
                                    if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                                        document.getElementById("user_bet_value").value = "0.88";
                                        boton.click();
                                        setTimeout(function() {
                                            if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                                                document.getElementById("user_bet_value").value = "1.76";
                                                boton.click();
                                                setTimeout(function() {
                                                    if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                                                        document.getElementById("user_bet_value").value = "3.52";
                                                        boton.click();
                                                        setTimeout(function() {
                                                            if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                                                                document.getElementById("user_bet_value").value = "7";
                                                                boton.click();
                                                                setTimeout(function() {
                                                                    if (texto.innerHTML == "Unfortunately you lose. Try again.") {
                                                                        document.getElementById("user_bet_value").value = "0.05";
                                                                        boton.click();
                                                                    }
                                                                    else {
                                                                        document.getElementById("user_bet_value").value = "0.05"
                                                                        automatizar();
                                                                    }
                                                                },3000)
                                                            }
                                                            else {
                                                                document.getElementById("user_bet_value").value = "0.05"
                                                                automatizar();
                                                            }
                                                        },3000)
                                                    }
                                                    else {
                                                        document.getElementById("user_bet_value").value = "0.05"
                                                        automatizar();
                                                    }
                                                },3000)
                                            }
                                            else {
                                                document.getElementById("user_bet_value").value = "0.05"
                                                automatizar();
                                            }
                                        },3000)
                                    }
                                    else {
                                        document.getElementById("user_bet_value").value = "0.05"
                                        automatizar();
                                    }
                                },3000)
                            }
                            else {
                                document.getElementById("user_bet_value").value = "0.05"
                                automatizar();
                            }
                        },3000)
                    }
                    else {
                        document.getElementById("user_bet_value").value = "0.05"
                        automatizar();
                    }
                },3000)
            }
            else {
                document.getElementById("user_bet_value").value = "0.05"
                automatizar();
            }
        },3000)
    }
    else {
        document.getElementById("user_bet_value").value = "0.05"
        automatizar();
    }
}
