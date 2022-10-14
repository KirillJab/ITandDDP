export const Login = () => `
<div id="modal-container" class="show">
    <div id="modal">
        <h1>Пожалуйста, войдите в свой аккаунт</h1>
        <div class="underline"></div>
        <div class="inputs">
            <input type="email" placeholder="email" id="email">
            <input type="password" placeholder="password" id="password" minlength="6">
        </div>
        <div class="controls">
            <button class="button" id="sign-up">
                <span>Регистрация</span>
            </button>
            <button class="button" id="sign-in">
                <span>Войти</span>
            </button>
        </div>
        <a id="sign-in-with-google">Войти через Google</a>
    </div>
</div>`;
