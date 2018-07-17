export namespace AppRequest{
    class ApiRequest{

    }
    class LoginRequest{
        public username : string;
        public password :  string;
        public grant_type : string = "password";

    }
}