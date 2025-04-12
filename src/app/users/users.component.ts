import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['avatar', 'name', 'email', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();
  totalUsers = 0;
  loading = false;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchUsers(1);
  }

  fetchUsers(page: number) {
    this.loading = true;
    this.userService.getUsers(page).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
        this.totalUsers = res.total;
      },
      error: err => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    const currentPage = event.pageIndex + 1;
    this.fetchUsers(currentPage);
  }

  onView(users: any) {
    this.router.navigate(["/users/", users.id]);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
      });
    }
  }

  editUser(userDetails: any) {
    this.openDialog(userDetails);
  }

  onAddUser() {
    this.openDialog({});
  }

  openDialog(userData?: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: userData || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (userData) {
          this.userService.updateUser(userData.id, result).subscribe(
            res => {
              console.log('User updated:', res);
              this.fetchUsers(1);
            },
            err => console.error('Update error:', err)
          );
        } else {
          this.userService.addUser(result).subscribe(
            res => {
              console.log('User added:', res);
              this.fetchUsers(1);
            },
            err => console.error('Add error:', err)
          );
        }
      }
    });
  }
}
