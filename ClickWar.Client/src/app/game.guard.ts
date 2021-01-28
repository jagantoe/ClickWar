// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SignalrService } from './signalr.service';
@Injectable()
export class GameGuard implements CanActivate {
    constructor(public signalrService: SignalrService, public router: Router) { }
    canActivate(): boolean {
        if (!this.signalrService.getConnectionid()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}