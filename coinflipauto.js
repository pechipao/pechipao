var input = document.getElementById("user_bet_value");
var boton = document.getElementsByClassName("coinflip_container_coin_play coinflip_start bet_ready")[0];
var texto = document.getElementsByClassName("coinflip_information aa")[0];
var apuesta = document.getElementById("user_bet_value").value;
var nivel = 0;

function automatizar() {
    boton.click();
    if (texto.innerHTML = "Unfortunately you lose. Try again.") {
        apuesta = "0.06";
        setTimeout(function() {
            if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                apuesta = "0.11";
                boton.click();
                setTimeout(function() {
                    if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                        apuesta = "0.22";
                        boton.click();
                        setTimeout(function() {
                            if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                                apuesta = "0.44";
                                boton.click();
                                setTimeout(function() {
                                    if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                                        apuesta = "0.88";
                                        boton.click();
                                        setTimeout(function() {
                                            if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                                                apuesta = "1.76";
                                                boton.click();
                                                setTimeout(function() {
                                                    if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                                                        apuesta = "3.52";
                                                        boton.click();
                                                        setTimeout(function() {
                                                            if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                                                                apuesta = "7";
                                                                boton.click();
                                                                setTimeout(function() {
                                                                    if (texto.innerHTML = "Unfortunately you lose. Try again.") {
                                                                        apuesta = "0.05";
                                                                        boton.click();
                                                                    }
                                                                    else {
                                                                        apuesta = "0.05"
                                                                        automatizar();
                                                                    }
                                                                },3000)
                                                            }
                                                            else {
                                                                apuesta = "0.05"
                                                                automatizar();
                                                            }
                                                        },3000)
                                                    }
                                                    else {
                                                        apuesta = "0.05"
                                                        automatizar();
                                                    }
                                                },3000)
                                            }
                                            else {
                                                apuesta = "0.05"
                                                automatizar();
                                            }
                                        },3000)
                                    }
                                    else {
                                        apuesta = "0.05"
                                        automatizar();
                                    }
                                },3000)
                            }
                            else {
                                apuesta = "0.05"
                                automatizar();
                            }
                        },3000)
                    }
                    else {
                        apuesta = "0.05"
                        automatizar();
                    }
                },3000)
            }
            else {
                apuesta = "0.05"
                automatizar();
            }
        },3000)
    }
    else {
        apuesta = "0.05"
        automatizar();
    }
}
