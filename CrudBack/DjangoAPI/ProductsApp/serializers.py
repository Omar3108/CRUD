from rest_framework import serializers
from .models import Productos


class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = ('ProductId',
                  'NombreProducto',
                  'Gratuito',
                  'Precio',
                  'Stock',
                  'TiempoCreacion',
                  'FechaCreacion')
