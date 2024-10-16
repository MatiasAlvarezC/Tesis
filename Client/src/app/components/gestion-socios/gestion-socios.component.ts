import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-gestion-socios',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,],
  templateUrl: './gestion-socios.component.html',
  styleUrl: './gestion-socios.component.css'
})
export class GestionSociosComponent implements OnInit {
  
  displayedColumns: string[] = ['Id','Nombre','Apellido','Email','Contraseña','FechaDeNacimiento','Dni'];
  dataSource: MatTableDataSource<User>

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private usersService: UsersService) {
    this.dataSource = new MatTableDataSource<User>([]);  // Inicializamos la tabla vacía
  }
  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos desde la base de datos
      const data: User[] = await this.usersService.obtenerDatos();
      this.dataSource = new MatTableDataSource<User>(data);  // Pasa los datos a la tabla
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  ngAfterViewInit(): void {
    // Conecta el paginador a la tabla después de que la vista ha sido inicializada
    this.dataSource.paginator = this.paginator;
  }
  // Método para aplicar un filtro en la tabla
  aplicarFiltro(event: Event) {
    const filtroValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  }
}
