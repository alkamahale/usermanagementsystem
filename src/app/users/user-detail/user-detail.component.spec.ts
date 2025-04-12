import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '1',
    },
  };
}

class MockUserService {
  getUserById(id: number) {
    return of({ data: { id, name: 'Test User' } });
  }
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: UserService, useClass: MockUserService },
      ],
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data', () => {
    expect(component.user).toEqual({ id: 1, name: 'Test User' });
  });
});
