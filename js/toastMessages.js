const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const main = $("#toast");

const btnSuccess = $(".btn-suc");
const icons = {
    success: "fa-solid fa-circle-check",
    error: "fa-solid fa-circle-exclamation",
    info: "fa-solid fa-circle-info",
    warning: "fa-solid fa-circle-exclamation",
};
btnSuccess.onclick = function () {
    showToast({
        title: "Success",
        message: "This is a success toast",
        type: "success",
        duration: 10000,
    });
};

const btnError = $(".btn-err");
btnError.onclick = function () {
    showToast({
        title: "Error",
        message: "This is a Error toast",
        type: "error",
        duration: 10000,
    });
};

const btnInfo = $(".btn-inf");
btnInfo.onclick = function () {
    showToasts({
        title: "Info",
        message: "This is a Info toast",
        type: "info",
        duration: 10000,
    });
};

const btnWaring = $(".btn-war");
btnWaring.onclick = function () {
    showToasts({
        title: "Waring",
        message: "This is a Warning toast",
        type: "warning",
        duration: 10000,
    });
};
/// Cách riêng : Đây là hiện ra duy nhất 1 toast
function showToast({ title, message, type, duration }) {
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    if (main) {
        main.innerHTML = `
            <div class="toast toast--${type}">
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__content">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__text">
                    ${message}
                </p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            </div>
         `;
        const toast = $(".toast");
        toast.style.animation = `slideToast ease 1s, hideToast ease 1s ${delay}s forwards`;

        const autoRemove = setTimeout(() => {
            main.innerHTML = "";
        }, duration + 1000);
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.innerHTML = "";
                clearTimeout(autoRemove);
            }
        };
    }
}

// Cách F8: Hiện rạ nhiều Toast
function showToasts({ title, message, type, duration }) {
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    if (main) {
        const toast = document.createElement("div");
        toast.classList.add("toast", `toast--${type}`);
        toast.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
         <div class="toast__content">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__text">
            ${message}
            </p>
        </div>
        <div class="toast__close">
            <i class="fa-solid fa-xmark"></i>
        </div>
        `;
        main.appendChild(toast);
        toast.style.animation = `slideToast ease 1s, hideToast ease 1s ${delay}s forwards`;

        const autoRemove = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        };
    }
}
