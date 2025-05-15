import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class TokenService {
    constructor() { 
    }
    
    saveToken(token: string): void{
      localStorage.setItem('token',token);
    }
  

  
    saveUserId(userId: string): void{
      localStorage.setItem('userId',userId)
    }
  
    isLogged(): boolean {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      return !! isLoggedIn
    }
  
    clearToken(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
    }
  
    getToken(): string|null{
      return localStorage.getItem('token')
    }
    
    getRole(): string|null{
      return localStorage.getItem('userRole')
    }
  
    getUserId(): number{
      return JSON.parse(localStorage.getItem('userId') || '')
    }
  }