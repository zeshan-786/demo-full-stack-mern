import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Contact } from './contact.model';
import { User } from 'app/models/user';
import { backendUrl } from 'app/shared/constants';

@Injectable()
export class AdminService implements Resolve<any>
{
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;

    onContactsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;


    onFilterChanged: Subject<any>;

    contacts: Contact[];
    user: any;

    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    admins: User[]

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getAllAdmins()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        console.log(searchText);
                        this.searchText = searchText;
                        this.getAllAdmins();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getAllAdmins(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(`${backendUrl}/admin`)
                .subscribe((response: User[]) => {
                    this.admins = response;

                    if (this.searchText && this.searchText !== '') {
                        this.admins = FuseUtils.filterArrayByString(this.admins, this.searchText);
                    }
                    console.log(this.admins);
                    this.onContactsChanged.next(this.admins);
                    resolve(this.admins);
                }, reject);
        }
        );
    }

}
