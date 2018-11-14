import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { AppModule, routes } from './app.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SongsComponent } from './songs/songs.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ChartsModule } from 'ng2-charts';
import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        SongsComponent,
        PlaylistsComponent,
        PlaylistComponent
      ],
      imports: [
        AngularMaterialModule,
        ChartsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', async(() => {
    const appElement = fixture.debugElement;
    const titleEl = appElement.query(By.css('.title'));
    const title = titleEl.nativeElement;
    expect(title.textContent).toBe('Spotify Charts');
  }));
});
