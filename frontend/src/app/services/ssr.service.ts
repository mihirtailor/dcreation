import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SsrService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    isServer(): boolean {
        return isPlatformServer(this.platformId);
    }
}
