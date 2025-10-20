// import statement(s)

const getElement = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    getElement("#new_game").addEventListener("click", () => {
        // start new game

        // update page
        getElement("#roll").disabled = false;
        getElement("#new_game").disabled = true;
        getElement("#point").textContent = "0";
        getElement("#current_roll").textContent = "0";
        getElement("#message").textContent = "";
    });

    getElement("#roll").addEventListener("click", () => {
        // roll, check if users wins or loses
        
        // update page
        
    });
}); 