import { Component, OnInit,  ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit{
  public dataSource: any;
  constructor(private http:HttpClient, private router: Router) {
  }
  @ViewChild('exampleModal') modal: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  ngOnInit() {
  this. obtenerData()
  }

  goToAddEditProduct(id?: string): void {
    if (id) {
      this.router.navigate(['/editar-producto', id]);
      console.log(id)
    } else {
      this.router.navigate(['/agregar-producto']);
    }
  }

  obtenerData() {
    this.http.get('http://127.0.0.1:8000/productos/').subscribe(
      (data: any) => {
        console.log("Datos recibidos:", data);
        const formattedData = data.map((item: any) => ({
          id: item[0],
          nombreProducto: item[1],
          gratuito: item[6],
          precio: item[2],
          stock: item[3],
          tiempoCreacion: item[4],
          fechaCreacion: item[5]
        }));
        this.dataSource = new MatTableDataSource<any>(formattedData);
        this.dataSource.paginator = this.paginator;
        console.log("Fuente de datos configurada:", this.dataSource);
      },
      error => {
        console.error("Error en la solicitud:", error);
        // Maneja errores de solicitud si es necesario.
      }
    );
  }

  eliminarProducto(id: number) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      this.http.delete(`http://127.0.0.1:8000/productos/${id}`).subscribe(
        () => {
          alert('Producto eliminado con éxito');
         this.dataSource.data = this.dataSource.data.filter((item: { id: number; }) => item.id !== id);
        },
        error => {
          console.error('Error al eliminar el producto', error);
          alert('Hubo un error al eliminar el producto');
        }
      );
    }
  }
}
