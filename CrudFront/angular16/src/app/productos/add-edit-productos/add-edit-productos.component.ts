import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-edit-productos',
  templateUrl: './add-edit-productos.component.html',
  styleUrls: ['./add-edit-productos.component.css']
})
export class AddEditProductosComponent implements OnInit {
  productForm: FormGroup | any;

  constructor(private http:HttpClient, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      nombreProducto: new FormControl('', [Validators.required]),
      gratuito: new FormControl(false),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      fechaCreacion: new FormControl('', [Validators.required]),
      horaCreacion: new FormControl('', [Validators.required, Validators.pattern('^[0-2]?[0-9]$'), Validators.max(23)]),
      minutoCreacion: new FormControl('', [Validators.required, Validators.pattern('^[0-5]?[0-9]$'), Validators.max(59)]),
      segundoCreacion: new FormControl('', [Validators.required, Validators.pattern('^[0-5]?[0-9]$'), Validators.max(59)])
    });


    this.productForm.get('gratuito').valueChanges.subscribe((gratuito: boolean) => {
      if (gratuito) {
        this.productForm.get('precio').setValue(0);
        this.productForm.get('precio').disable();
      } else {
        this.productForm.get('precio').enable();
      }
    });

  this.loadProductDataIfExists();
  }

  goToProduct(): void {
    this.router.navigate(['/productos']);
  }
  onSubmit() {
    // Combine the time components into one string
    const hours = this.productForm.get('horaCreacion').value.padStart(2, '0');
    const minutes = this.productForm.get('minutoCreacion').value.padStart(2, '0');
    const seconds = this.productForm.get('segundoCreacion').value.padStart(2, '0');
    const tiempoCreacion = `${hours}:${minutes}:${seconds}`;


    const id = this.productForm.get('id').value;
    if (id) {

      const formData = {
        ProductId: this.productForm.id,
        NombreProducto: this.productForm.get('nombreProducto').value,
        Gratuito: this.productForm.get('gratuito').value,
        Precio: this.productForm.get('precio').value,
        Stock: this.productForm.get('stock').value,
        FechaCreacion: this.productForm.get('fechaCreacion').value,
        TiempoCreacion: tiempoCreacion
      };
      if (this.productForm.valid) {
        this.http.put(`http://127.0.0.1:8000/productos/${id}`, formData)
          .subscribe({
            next: (response) => {
              console.log('Producto actualizado', response);
              this.goToProduct();
            },
            error: (error) => {
              console.error('Ocurrió un error al actualizar!', error);
            }
          });
      } else{
        alert('El formulario no es valido')
        console.error('Form is not valid');
      }
    } else {

      const formData = {
        NombreProducto: this.productForm.get('nombreProducto').value,
        Gratuito: this.productForm.get('gratuito').value,
        Precio: this.productForm.get('precio').value,
        Stock: this.productForm.get('stock').value,
        FechaCreacion: this.productForm.get('fechaCreacion').value,
        TiempoCreacion: tiempoCreacion
      };
      if (this.productForm.valid) {
      this.http.post('http://127.0.0.1:8000/productos/', formData)
        .subscribe({
          next: (response) => {
            console.log('Producto agregado', response);
            this.goToProduct();
          },
          error: (error) => {
            console.error('Ocurrió un error al agregar!', error);
          }
        });
    } else{
        alert('El formulario no es valido')
        console.error('Form is not valid');
      }
    }
  }

  loadProductDataIfExists() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.http.get(`http://127.0.0.1:8000/productos/${id}`).subscribe((productData: any) => {
          if (productData.length >= 7) {
            const timeParts = productData[4].split(':');
            const productObject = {
              id: productData[0],
              nombreProducto: productData[1],
              precio: productData[2],
              stock: productData[3],
              horaCreacion: timeParts[0],
              minutoCreacion: timeParts[1],
              segundoCreacion: timeParts[2],
              fechaCreacion: productData[5],
              gratuito: productData[6]
            };

            this.productForm.patchValue(productObject);
            console.log(productObject);
          } else {
            console.error('Received data is not in the expected format!');
          }
        });
      }
    });
  }

}
