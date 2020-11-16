import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { AuthGuard } from 'app/authetication/auth.guard';


@NgModule({
    declarations: [
        SampleComponent
    ],
    imports: [
        TranslateModule,
        FuseSharedModule
    ],
    exports: [
        SampleComponent
    ],
    providers: [
        AuthGuard
    ]
})

export class SampleModule { }
