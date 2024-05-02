from django.db import models

# Create your models here.


class Productos(models.Model):
    ProductId = models.AutoField(primary_key=True)
    NombreProducto = models.CharField(null=False, max_length=100)
    Gratuito = models.BooleanField(default=False)
    Precio = models.DecimalField(null=False, max_digits=10, decimal_places=2)
    Stock = models.IntegerField(null=False)
    TiempoCreacion = models.TimeField(null=False)
    FechaCreacion = models.DateField()
