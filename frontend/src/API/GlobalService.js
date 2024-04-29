

export default class GlobalService {

    static Navigation = [
      {
        Link: "/",
        Name: "Главная"
       },
       {
        Link: "/",
        Name: "Корзина"
       },
       {
        Link: "/",
        Name: "Оформить заказ"
       },
       {
        Link: "/Publishers",
        Name: "Издатели"
       },
       {
        Link: "/Auth",
        Name: "Личный кабинет"
       },
    ]

    static setCookie(cookieName, cookieValue, expirationDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
      }

    static getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for(var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
      }

      static GetLoginAndPassword() {
        let login = sessionStorage.getItem("UserLogin")
        let password = sessionStorage.getItem("UserPassword")
        if (login && password)
            return {Login: login, Password: password}
        login = GlobalService.getCookie("UserLogin")
        password = GlobalService.getCookie("UserPassword")
        return {Login: login, Password: password}
      }

}
