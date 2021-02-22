import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenfinUtils } from '../../openfin/OpenfinUtils';
import { Router } from '@angular/router';

// importing OpenFin FDC3 service
import * as openfinFdc3 from 'openfin-fdc3';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
    public title = 'IG Stock App | OpenFin FDC3 | IgniteUI for Angular';

    constructor(private router: Router) {
        document.title = this.title;
    }

    public ngAfterViewInit(): void {
        console.log('app view loaded');

        const element = document.getElementById('openfinNote'); // as HTMLElement;

        if (!window.hasOwnProperty('fin')) {
            console.log('openfin is offline');
            // element.textContent = 'You can host this app in OpenFin window with "npm run-script openfin" command.';
            // element.setAttribute('style', 'background: #119dfa');
        } else {
            element.textContent = 'Select an app view to use igniteui-angular-fdc3 adapter';
        }
    }

    public async OnClickViewInstruments(): Promise<void> {
        if (window.hasOwnProperty('fin')) {
            console.log('openfin app OnClick ViewInstruments');
            OpenfinUtils.open('/grids/grid-instruments', 600, 515, 0, 550);
        } else {
            this.router.navigate(['/grids/grid-instruments']);
        }
    }

    public async OnClickViewPositions(): Promise<void> {
        if (window.hasOwnProperty('fin')) {
            console.log('openfin app OnClick ViewPositions');
            OpenfinUtils.open('/grids/grid-positions', 800, 615, 0, 350);
        } else {
            this.router.navigate(['/grids/grid-positions']);
        }
    }

    public async OnClickViewChart(): Promise<void> {
        if (window.hasOwnProperty('fin')) {
            console.log('openfin app OnClick ViewChart');
            OpenfinUtils.open('/charts/view-chart', 800, 555, 0, 10);
        } else {
            this.router.navigate(['/charts/view-chart']);
        }
    }

    public async OnClickViewSector(): Promise<void> {
        if (window.hasOwnProperty('fin')) {
            console.log('openfin app OnClick ViewSector');
            OpenfinUtils.open('/charts/view-sector', 800, 555, 0, 10);
        } else {
            this.router.navigate(['/charts/view-sector']);
        }
    }

    public async OnClickOpenExplorer(): Promise<void> {
        if (window.hasOwnProperty('fin')) {
            console.log('openfin app OnClick Explorer');
            OpenfinUtils.open('/explorer/explorer-actions', 600, 750, 850, 150);
        } else {
            this.router.navigate(['/explorer/explorer-actions']);
        }
    }

    public async OnClickNotify(): Promise<void> {
        console.log('openfin app OnClick Notify');

        OpenfinUtils.notify('Reminder', 'Weekly Meeting is starting soon...', 'category');
    }

}
