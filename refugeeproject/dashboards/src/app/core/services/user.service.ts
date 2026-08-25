import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersData: User[] = [
    { id: 'U1', name: 'Hans Müller', email: 'hans.m@example.com', phone: '+49 170 1234567', neighborhood: 'Mitte', status: 'active', joinDate: '2023-01-15', totalBookings: 12, totalSpent: 450, profileComplete: true },
    { id: 'U2', name: 'Amina Al-Fayed', email: 'amina.a@example.com', phone: '+49 152 2345678', neighborhood: 'Kreuzberg', status: 'active', joinDate: '2023-03-22', totalBookings: 8, totalSpent: 200, profileComplete: true },
    { id: 'U3', name: 'Jürgen Schmidt', email: 'j.schmidt@example.com', phone: '+49 171 3456789', neighborhood: 'Neukölln', status: 'suspended', joinDate: '2023-05-10', totalBookings: 3, totalSpent: 75, profileComplete: false },
    { id: 'U4', name: 'Tariq Hassan', email: 'tariq.h@example.com', phone: '+49 160 4567890', neighborhood: 'Friedrichshain', status: 'active', joinDate: '2023-06-05', totalBookings: 25, totalSpent: 1200, profileComplete: true },
    { id: 'U5', name: 'Sabine Meyer', email: 's.meyer@example.com', phone: '+49 172 5678901', neighborhood: 'Prenzlauer Berg', status: 'active', joinDate: '2023-07-18', totalBookings: 1, totalSpent: 30, profileComplete: true },
    { id: 'U6', name: 'Fatima Ahmed', email: 'fatima.ahmed@example.com', phone: '+49 151 6789012', neighborhood: 'Wedding', status: 'banned', joinDate: '2023-08-02', totalBookings: 0, totalSpent: 0, profileComplete: false },
    { id: 'U7', name: 'Michael Weber', email: 'm.weber@example.com', phone: '+49 173 7890123', neighborhood: 'Moabit', status: 'active', joinDate: '2023-09-14', totalBookings: 5, totalSpent: 180, profileComplete: true },
    { id: 'U8', name: 'Zahra Noori', email: 'zahra.n@example.com', phone: '+49 162 8901234', neighborhood: 'Charlottenburg', status: 'active', joinDate: '2023-10-25', totalBookings: 14, totalSpent: 550, profileComplete: true },
    { id: 'U9', name: 'Klaus Wagner', email: 'klaus.w@example.com', phone: '+49 174 9012345', neighborhood: 'Schöneberg', status: 'active', joinDate: '2023-11-08', totalBookings: 2, totalSpent: 50, profileComplete: true },
    { id: 'U10', name: 'Mohammed Ali', email: 'm.ali@example.com', phone: '+49 157 0123456', neighborhood: 'Tempelhof', status: 'active', joinDate: '2023-12-19', totalBookings: 9, totalSpent: 320, profileComplete: true },
    { id: 'U11', name: 'Lukas Becker', email: 'lukas.b@example.com', phone: '+49 175 1234509', neighborhood: 'Mitte', status: 'active', joinDate: '2024-01-05', totalBookings: 4, totalSpent: 110, profileComplete: false },
    { id: 'U12', name: 'Aisha Farah', email: 'aisha.f@example.com', phone: '+49 163 2345098', neighborhood: 'Neukölln', status: 'active', joinDate: '2024-02-12', totalBookings: 7, totalSpent: 260, profileComplete: true }
  ];

  private usersSignal = signal<User[]>(this.usersData);
  users = computed(() => this.usersSignal());

  getUsers() { return this.usersSignal(); }
  getUserById(id: string) { return this.usersSignal().find(u => u.id === id); }
  
  updateUser(id: string, data: Partial<User>) {
    this.usersSignal.update(users => users.map(u => u.id === id ? { ...u, ...data } : u));
  }
  
  suspendUser(id: string, reason?: string) {
    this.updateUser(id, { status: 'suspended' });
  }
  
  banUser(id: string) {
    this.updateUser(id, { status: 'banned' });
  }
  
  deleteUser(id: string) {
    this.usersSignal.update(users => users.filter(u => u.id !== id));
  }
  
  getStats() {
    const users = this.usersSignal();
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      suspended: users.filter(u => u.status === 'suspended').length,
      banned: users.filter(u => u.status === 'banned').length
    };
  }
}
