import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppBreadcrumbService {

    private itemsSource = new Subject<any[]>();

    itemsHandler = this.itemsSource.asObservable();

    setItems(items: any[]) {
        this.itemsSource.next(items);
    }
}
